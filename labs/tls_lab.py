"""Isolated TLS 1.3 trust/hostname exercise. No system trust changes."""
import pathlib
import socket
import ssl
import subprocess
import tempfile
import threading


def main():
    if not ssl.HAS_TLSv1_3:
        raise RuntimeError('TLS 1.3 unavailable in this Python/OpenSSL build')
    with tempfile.TemporaryDirectory(prefix='atlas-tls-') as directory:
        root = pathlib.Path(directory)
        cert, key = root / 'cert.pem', root / 'key.pem'
        subprocess.run(['openssl', 'req', '-x509', '-newkey', 'rsa:2048',
                        '-nodes', '-keyout', str(key), '-out', str(cert),
                        '-days', '1', '-subj', '/CN=localhost',
                        '-addext', 'subjectAltName=DNS:localhost'],
                       check=True, capture_output=True, timeout=15)
        server = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
        server.minimum_version = ssl.TLSVersion.TLSv1_3
        server.maximum_version = ssl.TLSVersion.TLSv1_3
        server.load_cert_chain(cert, key)
        results = []
        with socket.socket() as listener:
            listener.bind(('127.0.0.1', 0))
            listener.listen(3)
            listener.settimeout(8)

            def serve():
                try:
                    for _ in range(3):
                        raw, _ = listener.accept()
                        with raw:
                            raw.settimeout(4)
                            try:
                                with server.wrap_socket(raw, server_side=True) as connection:
                                    connection.sendall(b'OK\n')
                            except ssl.SSLError:
                                pass  # Negative clients reject during handshake.
                except Exception as error:
                    results.append(error)

            worker = threading.Thread(target=serve, daemon=True)
            worker.start()
            for name, trusted, hostname, expected in [
                ('trusted localhost', True, 'localhost', True),
                ('wrong hostname', True, 'wrong.invalid', False),
                ('untrusted certificate', False, 'localhost', False),
            ]:
                client = ssl.create_default_context(cafile=str(cert) if trusted else None)
                client.minimum_version = ssl.TLSVersion.TLSv1_3
                try:
                    with socket.create_connection(listener.getsockname(), timeout=4) as raw:
                        with client.wrap_socket(raw, server_hostname=hostname) as connection:
                            assert expected, 'negative handshake unexpectedly accepted'
                            assert connection.version() == 'TLSv1.3'
                            data = b''
                            while len(data) < 3:
                                part = connection.recv(3 - len(data))
                                if not part:
                                    raise EOFError('short TLS payload')
                                data += part
                            assert data == b'OK\n'
                except ssl.SSLCertVerificationError:
                    assert not expected, 'trusted hostname unexpectedly rejected'
                print('PASS:', name)
            worker.join(9)
            assert not worker.is_alive() and not results, results
        print('PASS TLS 1.3 trust/hostname checks; temporary certificate removed on exit')


if __name__ == '__main__':
    main()
