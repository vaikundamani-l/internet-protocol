# Controlled loopback capture evidence

Run from the project directory:

```
python evidence/capture-labs.py capture
python evidence/validate.py
python evidence/capture-labs.py test
```

Python standard library only; Linux AF_PACKET and permission to create a raw
socket (normally CAP_NET_RAW) are required. No privileges, network settings, or
firewall rules are changed. Capture/test exit 2 when capture is unavailable;
the validator also exits 2 when no fixture can be validated. Exit 0 means success.
Do not interpret a skipped test as successful packet verification.

The initial local probe failed with EPERM. The supplied PCAP and CSV were then
observed on a GitHub-hosted Linux runner in run 43229706143, source commit
199e686ce4c899e4e52ec31df573dd43d770f373. Twelve packets were retained: ten TCP
and two UDP. metadata.json records the capture environment and artifact hashes.
No owned servers start when a probe fails; no synthetic packets are substituted.
The README was updated after retrieval; its metadata hash tracks this edition.

On a supported host, capture binds AF_PACKET exclusively to lo, then reserves
four ephemeral ports on 127.0.0.1: one client and server each for TCP and UDP.
The local HTTP request is GET /lab with a 200 OK response containing OK and a
newline. The local DNS exchange asks for A lab.invalid and answers 127.0.0.1,
using an owned UDP server on an ephemeral port, without a resolver or upstream.
Both endpoints and exact port pairs must match before any packet is retained.
The raw socket may receive other loopback frames transiently; userspace discards
them without logging, retaining, or writing their contents. It never binds an
external interface or contacts an external service.

Linux presents outgoing and incoming loopback copies. Capture explicitly drops
PACKET_OUTGOING (type 4) and retains the incoming copy; the discarded matching
copy count is recorded. It does not hash-deduplicate equal frames, which could
erase real retransmissions. PCAP contains the actual Ethernet-style loopback
frames unchanged, including naturally varying sequence numbers, IP IDs and
ephemeral ports. There are no secrets, personal payloads or unrelated frames.
These are sanitized by controlled construction and filtering, not by rewriting
captured packet bytes. Local checksum offload can leave non-wire checksums.

PCAP timestamps are monotonic elapsed microseconds since collector startup,
encoded in the conventional seconds/microseconds fields, **not Unix epoch
timestamps**. CSV uses the same relative microseconds. No wall-clock capture
time or hostname is collected. Environment records OS/release, Python, and euid.

Successful capture writes loopback.pcap, packets.csv, and metadata.json. CSV
annotates TCP control/data and DNS direction. Metadata includes commands,
filter, deduplication, protocol counts, provenance, and SHA256 hashes of the
PCAP, CSV, scripts and README. Metadata cannot hash itself; hashes provide
integrity comparison, not an authenticated attestation. On unsupported runs
only metadata is written. Old packet artifacts are never silently deleted;
the validator rejects them alongside an unavailable status.

The independent validator imports no capture implementation. It verifies hashes,
PCAP record framing, relative time ordering, IPv4/TCP/UDP lengths and scope,
CSV correspondence, TCP handshake presence/no reset, contiguous HTTP streams
with consistent retransmission overlap, request/status/body length, and DNS
transaction ID, direction, question, flags, counts, and answer framing. It does
not validate checksum offload, every TCP state transition, or prove OS origin
cryptographically. Sequence-number wrap is not supported by its tiny HTTP
reassembler. Live capture and validator success remain unverified on this host.
