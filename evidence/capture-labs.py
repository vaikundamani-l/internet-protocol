#!/usr/bin/env python3
"""Controlled Linux loopback labs; standard library only. No synthetic captures."""
import argparse
import csv
import hashlib
import json
import os
from pathlib import Path
import platform
import socket
import struct
import threading
import time

ROOT = Path(__file__).resolve().parent
GET = b'GET /lab HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n'
RESPONSE = b'HTTP/1.1 200 OK\r\nContent-Length: 3\r\nConnection: close\r\n\r\nOK\n'
QUESTION = b'\x03lab\x07invalid\x00\x00\x01\x00\x01'
QUERY = struct.pack('!6H', 0x4c42, 0x0100, 1, 0, 0, 0) + QUESTION
ANSWER = struct.pack('!6H', 0x4c42, 0x8180, 1, 1, 0, 0) + QUESTION + b'\xc0\x0c\x00\x01\x00\x01\x00\x00\x00\x00\x00\x04\x7f\x00\x00\x01'


def save(name, obj):
    (ROOT / name).write_text(json.dumps(obj, indent=2, sort_keys=True) + '\n')


def probe():
    cap = None
    try:
        cap = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.htons(3))
        cap.bind(('lo', 0))
        return cap, {'available': True, 'interface': 'lo', 'api': 'AF_PACKET/SOCK_RAW'}
    except (OSError, AttributeError) as exc:
        if cap is not None:
            cap.close()
        return None, {'available': False, 'api': 'AF_PACKET/SOCK_RAW',
                      'error_type': type(exc).__name__, 'errno': getattr(exc, 'errno', None),
                      'error': str(exc)}


def decode(frame):
    if len(frame) < 34 or frame[12:14] != b'\x08\x00':
        return None
    ip = frame[14:]
    ihl = (ip[0] & 15) * 4
    size = int.from_bytes(ip[2:4], 'big')
    if ip[0] >> 4 != 4 or ihl < 20 or size < ihl or len(ip) < size:
        raise ValueError('Invalid IPv4 framing')
    if ip[12:16] != b'\x7f\x00\x00\x01' or ip[16:20] != b'\x7f\x00\x00\x01':
        return None
    if int.from_bytes(ip[6:8], 'big') & 0x3fff:
        raise ValueError('Fragmented lab packet')
    proto = ip[9]
    segment = ip[ihl:size]
    if proto not in (6, 17) or len(segment) < (20 if proto == 6 else 8):
        return None
    sport, dport = struct.unpack('!HH', segment[:4])
    if proto == 6:
        offset = (segment[12] >> 4) * 4
        if offset < 20 or offset > len(segment):
            raise ValueError('Invalid TCP framing')
        seq, ack = struct.unpack('!II', segment[4:12])
        flags = segment[13]
    else:
        offset = 8
        if int.from_bytes(segment[4:6], 'big') != len(segment):
            raise ValueError('Invalid UDP length')
        seq = ack = flags = 0
    return {'protocol': 'TCP' if proto == 6 else 'UDP', 'src': '127.0.0.1',
            'dst': '127.0.0.1', 'sport': sport, 'dport': dport,
            'seq': seq, 'ack': ack, 'flags': flags, 'payload': segment[offset:]}


def owned(packet, ports):
    if packet is None:
        return False
    pair = ports['http' if packet['protocol'] == 'TCP' else 'dns']
    return (packet['sport'], packet['dport']) in (tuple(pair), tuple(reversed(pair)))


def receive_http(conn):
    result = b''
    while b'\r\n\r\n' not in result:
        chunk = conn.recv(4096)
        if not chunk:
            raise ValueError('Truncated HTTP headers')
        result += chunk
        if len(result) > 65536:
            raise ValueError('Oversized HTTP')
    return result


def capture():
    cap, status = probe()  # Always probe before starting any servers.
    meta = {'schema': 1, 'provenance': 'Actual OS AF_PACKET packets only',
            'environment': {'system': platform.system(), 'release': platform.release(),
                            'python': platform.python_version(), 'euid': os.geteuid()},
            'probe': status, 'commands': ['python evidence/capture-labs.py capture',
                                         'python evidence/validate.py',
                                         'python evidence/capture-labs.py test'],
            'timestamp_policy': 'PCAP and CSV use monotonic elapsed time from capture start; no epoch time.',
            'deduplication': 'Discard PACKET_OUTGOING (4); retain other matching loopback copies. No byte-hash deduplication, so retransmissions remain.',
            'scope': 'lo only; IPv4 127.0.0.1 both directions; exact owned ephemeral TCP/UDP port pairs.',
            'capture_count': 0, 'artifacts': {},
            'limitations': ['Ethernet-style loopback framing; Linux AF_PACKET required.',
                            'Checksums may reflect local checksum offload; validator does not require wire checksum validity.',
                            'Userspace filtering occurs before storage; unrelated frames are never retained or written.']}
    for name in ('capture-labs.py', 'validate.py', 'README.md'):
        meta['artifacts'][name] = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
    if cap is None:
        meta['result'] = 'unavailable; no servers started; no packet fixtures generated'
        save('metadata.json', meta)
        print(json.dumps({'result': meta['result'], 'capture_count': 0}))
        return 2
    records, errors = [], []
    ready, stop = threading.Event(), threading.Event()
    discarded = [0]
    sockets = []
    try:
        for kind in (socket.SOCK_STREAM, socket.SOCK_STREAM, socket.SOCK_DGRAM, socket.SOCK_DGRAM):
            s = socket.socket(socket.AF_INET, kind)
            s.bind(('127.0.0.1', 0))
            s.settimeout(3)
            sockets.append(s)
        hs, hc, ds, dc = sockets
        hs.listen(1)
        ports = {'http': [hc.getsockname()[1], hs.getsockname()[1]],
                 'dns': [dc.getsockname()[1], ds.getsockname()[1]]}
        meta['ports'] = ports
        cap.settimeout(0.05)
        origin = time.monotonic_ns()

        def collect():
            ready.set()
            try:
                while not stop.is_set():
                    try:
                        frame, addr = cap.recvfrom(65535)
                    except socket.timeout:
                        continue
                    elapsed = (time.monotonic_ns() - origin) // 1000
                    if addr[0] != 'lo':
                        continue
                    # Ignore unrelated traffic before full parsing or persistence.
                    if len(frame) < 38 or frame[12:14] != b'\x08\x00':
                        continue
                    ip = frame[14:]
                    if ip[12:20] != b'\x7f\x00\x00\x01' * 2 or ip[9] not in (6, 17):
                        continue
                    ihl = (ip[0] & 15) * 4
                    pair = ports['http' if ip[9] == 6 else 'dns']
                    if len(ip) < ihl + 4 or struct.unpack('!HH', ip[ihl:ihl+4]) not in (tuple(pair), tuple(reversed(pair))):
                        continue
                    packet = decode(frame)
                    if not owned(packet, ports):
                        continue
                    if addr[2] == socket.PACKET_OUTGOING:
                        discarded[0] += 1
                        continue
                    records.append((elapsed, frame, packet))
            except Exception as exc:
                errors.append(str(exc))

        worker = threading.Thread(target=collect)
        worker.start()
        ready.wait(3)
        hc.connect(hs.getsockname())
        conn, _ = hs.accept()
        with conn:
            conn.settimeout(3)
            hc.sendall(GET)
            if receive_http(conn) != GET:
                raise ValueError('HTTP request mismatch')
            conn.sendall(RESPONSE)
            conn.shutdown(socket.SHUT_WR)
            reply = b''
            while True:
                chunk = hc.recv(4096)
                if not chunk:
                    break
                reply += chunk
            if reply != RESPONSE:
                raise ValueError('HTTP response mismatch')
        hc.close()
        dc.sendto(QUERY, ds.getsockname())
        query, peer = ds.recvfrom(4096)
        if peer != dc.getsockname() or query != QUERY:
            raise ValueError('DNS request mismatch')
        ds.sendto(ANSWER, peer)
        answer, peer = dc.recvfrom(4096)
        if peer != ds.getsockname() or answer != ANSWER:
            raise ValueError('DNS response mismatch')
        time.sleep(0.2)  # Drain final local ACK/FIN frames.
        stop.set()
        worker.join(3)
        if errors:
            raise ValueError('; '.join(errors))
        with (ROOT / 'loopback.pcap').open('wb') as out:
            out.write(struct.pack('<IHHIIII', 0xa1b2c3d4, 2, 4, 0, 0, 65535, 1))
            for us, frame, _ in records:
                out.write(struct.pack('<IIII', us // 1000000, us % 1000000, len(frame), len(frame)))
                out.write(frame)
        with (ROOT / 'packets.csv').open('w', newline='') as out:
            writer = csv.writer(out)
            writer.writerow(['index', 'relative_us', 'protocol', 'src', 'dst', 'sport', 'dport', 'seq', 'ack', 'flags', 'payload_bytes', 'annotation'])
            for i, (us, _, p) in enumerate(records, 1):
                annotation = ('HTTP application bytes' if p['payload'] else 'TCP control/ACK') if p['protocol'] == 'TCP' else 'DNS response' if p['payload'][2] & 128 else 'DNS query'
                writer.writerow([i, us] + [p[k] for k in ('protocol', 'src', 'dst', 'sport', 'dport', 'seq', 'ack', 'flags')] + [len(p['payload']), annotation])
        meta.update(result='captured', capture_count=len(records), outgoing_copies_discarded=discarded[0],
                    counts={proto: sum(p['protocol'] == proto for _, _, p in records) for proto in ('TCP', 'UDP')})
        for name in ('loopback.pcap', 'packets.csv', 'capture-labs.py', 'validate.py', 'README.md'):
            meta['artifacts'][name] = hashlib.sha256((ROOT / name).read_bytes()).hexdigest()
        save('metadata.json', meta)
        print(json.dumps({'result': 'captured', 'counts': meta['counts']}))
        return 0
    finally:
        stop.set()
        if 'worker' in locals():
            worker.join(4)
        cap.close()
        for s in sockets:
            s.close()


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('mode', choices=['capture', 'test'])
    args = parser.parse_args()
    rc = capture()
    if args.mode == 'test' and rc == 0:
        import subprocess
        import sys
        rc = subprocess.run([sys.executable, str(ROOT / 'validate.py')], check=False).returncode
    raise SystemExit(rc)
