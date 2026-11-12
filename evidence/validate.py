#!/usr/bin/env python3
"""Independent PCAP/CSV and HTTP/DNS validator; does not import capture code."""
import csv
import hashlib
import json
from pathlib import Path
import struct

ROOT = Path(__file__).resolve().parent


def require(condition, message):
    if not condition:
        raise ValueError(message)


def main():
    meta = json.loads((ROOT / 'metadata.json').read_text())
    for name, digest in meta['artifacts'].items():
        require(Path(name).name == name, 'Invalid artifact name')
        require(hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == digest, 'SHA256 mismatch: ' + name)
    if not meta['probe']['available']:
        require(meta['capture_count'] == 0, 'Unavailable capture has nonzero count')
        require(not (ROOT / 'loopback.pcap').exists() and not (ROOT / 'packets.csv').exists(), 'Stale packet artifacts present')
        print('SKIP: AF_PACKET unavailable; zero captured packets; no fixtures to validate')
        return 2
    raw = (ROOT / 'loopback.pcap').read_bytes()
    require(len(raw) >= 24, 'Truncated PCAP header')
    require(struct.unpack('<IHHIIII', raw[:24]) == (0xa1b2c3d4, 2, 4, 0, 0, 65535, 1), 'PCAP format mismatch')
    rows = list(csv.DictReader((ROOT / 'packets.csv').open()))
    offset, previous, count = 24, -1, 0
    streams, dns = {}, []
    tcp_flags = []
    while offset < len(raw):
        require(offset + 16 <= len(raw), 'Truncated record header')
        sec, usec, size, original = struct.unpack('<IIII', raw[offset:offset+16])
        offset += 16
        require(size == original and size <= 65535 and offset + size <= len(raw), 'Invalid record size')
        stamp = sec * 1000000 + usec
        require(usec < 1000000 and stamp >= previous, 'Invalid relative timestamp')
        previous = stamp
        f = raw[offset:offset+size]
        offset += size
        require(len(f) >= 34 and f[12:14] == b'\x08\x00', 'Invalid Ethernet IPv4 framing')
        ip = f[14:]
        h = (ip[0] & 15) * 4
        total = int.from_bytes(ip[2:4], 'big')
        require(ip[0] >> 4 == 4 and 20 <= h <= total <= len(ip), 'Invalid IPv4 lengths')
        require(ip[12:20] == b'\x7f\x00\x00\x01' * 2 and not int.from_bytes(ip[6:8], 'big') & 0x3fff, 'Scope/fragment violation')
        require(ip[9] in (6, 17), 'Unexpected transport')
        seg = ip[h:total]
        require(len(seg) >= (20 if ip[9] == 6 else 8), 'Truncated transport')
        sp, dp = struct.unpack('!HH', seg[:4])
        proto = 'TCP' if ip[9] == 6 else 'UDP'
        ports = meta['ports']['http' if proto == 'TCP' else 'dns']
        require((sp, dp) in (tuple(ports), tuple(reversed(ports))), 'Port scope violation')
        seq = ack = flags = 0
        if proto == 'TCP':
            n = (seg[12] >> 4) * 4
            require(20 <= n <= len(seg), 'Invalid TCP offset')
            seq, ack = struct.unpack('!II', seg[4:12])
            flags = seg[13]
            tcp_flags.append(flags)
            payload = seg[n:]
            stream = streams.setdefault((sp, dp), {})
            for i, byte in enumerate(payload):
                pos = (seq + i) & 0xffffffff
                require(pos not in stream or stream[pos] == byte, 'Conflicting retransmission')
                stream[pos] = byte
        else:
            require(int.from_bytes(seg[4:6], 'big') == len(seg), 'UDP length mismatch')
            payload = seg[8:]
            dns.append((sp, dp, payload))
        require(count < len(rows), 'CSV missing packet')
        row = rows[count]
        values = dict(index=count+1, relative_us=stamp, protocol=proto, src='127.0.0.1', dst='127.0.0.1', sport=sp, dport=dp, seq=seq, ack=ack, flags=flags, payload_bytes=len(payload))
        require(all(row[k] == str(v) for k, v in values.items()), 'CSV/PCAP mismatch')
        count += 1
    require(count == len(rows) == meta['capture_count'], 'Packet count mismatch')
    require(any(f & 2 and not f & 16 for f in tcp_flags) and any(f & 18 == 18 for f in tcp_flags), 'Missing TCP handshake')
    require(not any(f & 4 for f in tcp_flags), 'Unexpected TCP reset')
    client, server = meta['ports']['http']
    messages = []
    for pair in ((client, server), (server, client)):
        data = streams.get(pair, {})
        require(bool(data), 'Missing HTTP stream')
        keys = sorted(data)
        require(keys == list(range(keys[0], keys[-1]+1)), 'TCP stream gap')
        messages.append(bytes(data[k] for k in keys))
    require(messages[0] == b'GET /lab HTTP/1.1\r\nHost: localhost\r\nConnection: close\r\n\r\n', 'HTTP request mismatch')
    header, body = messages[1].split(b'\r\n\r\n', 1)
    require(header.split(b'\r\n')[0] == b'HTTP/1.1 200 OK', 'HTTP status mismatch')
    fields = dict(line.split(b': ', 1) for line in header.split(b'\r\n')[1:])
    require(int(fields[b'Content-Length']) == len(body) and body == b'OK\n', 'HTTP body framing mismatch')
    require(len(dns) == 2, 'Expected exactly DNS query and response')
    dc, ds = meta['ports']['dns']
    q = next(p for sp, dp, p in dns if (sp, dp) == (dc, ds))
    a = next(p for sp, dp, p in dns if (sp, dp) == (ds, dc))
    question = b'\x03lab\x07invalid\x00\x00\x01\x00\x01'
    require(len(q) >= 12 and len(a) >= 12, 'Truncated DNS')
    qh, ah = struct.unpack('!6H', q[:12]), struct.unpack('!6H', a[:12])
    require(qh == (0x4c42, 0x0100, 1, 0, 0, 0) and ah == (qh[0], 0x8180, 1, 1, 0, 0), 'DNS transaction/header mismatch')
    require(q[12:] == question and a[12:12+len(question)] == question, 'DNS question mismatch')
    require(a[12+len(question):] == b'\xc0\x0c\x00\x01\x00\x01\x00\x00\x00\x00\x00\x04\x7f\x00\x00\x01', 'DNS answer framing mismatch')
    counts = {'TCP': sum(r['protocol'] == 'TCP' for r in rows), 'UDP': len(dns)}
    require(counts == meta['counts'], 'Protocol count mismatch')
    print(json.dumps({'validated_packets': count, 'counts': counts, 'http_status': 200, 'dns_pairs': 1}))
    return 0


if __name__ == '__main__':
    try:
        raise SystemExit(main())
    except (ValueError, KeyError, OSError, StopIteration, struct.error) as exc:
        print('FAIL:', str(exc))
        raise SystemExit(1)
