# Protocol Atlas — Tamil & English Internet Course

[Open the course](https://vaikundamani-l.github.io/internet-protocol/)

An open-source, buildless HTML/CSS/JavaScript course with 65 bilingual chapters, 14 modules, parameter-driven teaching models, 210 practice questions and six guided projects. No API key, paid backend or account is required.

## Version 3 practice and evidence

- Three extended masterclasses: TCP engineering, DNS transport/validation investigations and isolated routing experiments.
- A 30-question final practice exam, 12 automatically graded calculations, separate mastery records and spaced revision.
- Paired bootstrap comparison with explicit uncertainty assumptions.
- CUBIC curve, BBR BDP/pacing, TCP states/windows, DNSSEC, CORS and flow-hashing models.
- Actual Web Crypto ECDH/HKDF/AES-GCM and tamper rejection, plus an isolated real TLS 1.3 Python lab.
- Observed loopback PCAP/CSV with provenance, separate from synthetic fixtures.
- Reproducible project, browser, accessibility and privileged namespace checks in GitHub Actions.

See [VALIDATION.md](VALIDATION.md), [MODEL_BOUNDARIES.md](MODEL_BOUNDARIES.md) and the bilingual Evidence page for results and limits. Human editorial review and physical-device validation are not claimed.

## Choose your language

Open **Settings → Course language → தமிழ் / English**. The choice persists across navigation and reloads. Tamil mode uses Tamil explanations, navigation, lab guidance, simulation narration and quiz feedback while preserving English technical vocabulary, code, protocol field names and reference titles. The header shortcut switches the same global setting.

## Learn and experiment

- Prerequisites, objectives, explanatory sections, worked examples, failure diagnosis, labs and primary sources in each chapter.
- A validated lesson-depth supplement is being added chapter by chapter. Chapters 31–51 currently include extended bilingual theory, two multi-step worked cases, two evidence-led troubleshooting cases and at least three solved exercises each; see [LESSON_DEPTH.md](LESSON_DEPTH.md) for the exact ledger.
- The Chapter 39 multicast animation is state-driven: it exposes receiver membership, ASM/SSM tree identity, RPF interface decisions and application delivery fields instead of using a decorative packet-only sequence.
- The Chapter 40 MPLS animation follows a real two-label L3VPN path: VRF lookup, ordered label push, core swap, optional PHP, Route Target import and PE2 delivery or drop.
- The Chapter 41 DNS animation exposes DoH versus UDP transport, warm/cold cache timing, referral NS and glue, authoritative answers, signed denial and DNSSEC validation failure instead of treating resolution as one box.
- The Chapter 42 browser-protocol animation traces cookies, credentialless preflight, credentialed PUT, CORS response exposure, WebSocket 101, masked frame bytes, object authorization and 1002/1008 failure paths.
- The Chapter 43 TLS animation traces a full certificate flight, SAN/path/transcript gates, PSK+DHE resumption, 0-RTT acceptance or HTTP 425 retry, and an observable unsafe replay branch.
- The Chapter 44 VXLAN animation now joins EVPN Type 2 import state to real VNI, MAC, UDP/4789 and outer-IP fields, shows router outer Layer-2 rewrite/TTL change, and branches visibly at RT-import and MTU failure gates before decapsulation.
- The Chapter 45 VPC animation separates the ALB health probe, client TLS connection and backend HTTP connection; it exposes concrete addresses and ports, route/policy/listener gates, Layer-2 transit changes and stateless ephemeral-port return failures.
- The Chapter 46 Kubernetes animation traces Service DNS, ClusterIP-to-targetPort translation, EndpointSlice readiness, both logical NetworkPolicy directions, VXLAN VNI/headers and DF-aware MTU, distinct router/Node B transformations, reverse encapsulation and reverse NAT, with each failure gate observable.
- The Chapter 47 path animation separates 5G PDU Session and QUIC continuity, calculates a queue-sensitive GEO propagation/BDP/flight-size path, and traces 6LoWPAN fragment reassembly plus CoAP ACK-loss duplicate suppression with concrete fields and failure gates.
- The Chapter 48 automation animation traces inventory/capability checks, revision-safe candidate edits, confirmed commit, intended-versus-operational route state, a real canary tuple with router Layer-2 rewrite, timed rollback and counter/trace correlation instead of treating an API success as delivery.
- The Chapter 49 framed-chat animation traces concrete length and payload octets across short or coalesced `recv()` observations, preserves parser buffer state, creates a new independent TCP flow at the relay, and exposes oversize, EOF and whole-frame deadline failures without pretending API read sizes are packet boundaries.
- The Chapter 50 Java-transfer animation traces the operation byte, big-endian length, raw payload, fixed destination and SHA-256 response with concrete sizes. It branches at allocation bounds, incomplete EOF, `CREATE_NEW` conflict and a monotonic slow-frame deadline, while keeping digest acknowledgment distinct from stored-byte and durability evidence.
- The Chapter 51 resumable-sharing animation traces redacted Bearer authorization, immutable metadata, prefix hashes, exact offsets and chunk sizes, per-chunk digest checks and atomic no-overwrite publication. Its 401, 409, identity, corrupt-body and final-name branches preserve and expose the last verified state.
- The Chapter 52 diagnostic animation separates local resolution, each IPv6/IPv4 TCP attempt and the HTTP status probe. It exposes SYN/RST refusal, bounded timeout, valid and malformed status lines, mixed-family outcomes and exact exit-code meaning without claiming that one exception proves a root cause.
- Change loss, cache, routing, queue, MTU, certificate, policy and timing inputs; inspect computed state and event traces.
- Bit-level IPv4 calculator, RTO equations, Dijkstra graph, BGP policy, NTP timing, VXLAN overhead and other focused models.
- Download synthetic PCAPs/annotated CSVs for ARP, DNS and TCP. These are locally generated teaching fixtures, not live captures.
- Download guided Python/Java project sources for framed chat, file transfer, resumable authenticated sharing, diagnostics, namespace routing and reproducible benchmarks.
- Save notes/bookmarks, record assessment scores, export/import learning data, print chapters and use the course offline after its initial cache installation.

See [COURSE_SCOPE.md](COURSE_SCOPE.md) for the explicit gap-to-feature ledger and model limitations. Not every Internet standard is covered, and these models do not implement complete production protocol stacks. Local lab projects are deliberately limited and must not be represented as hardened public services.

## Local use

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/`; stop with Ctrl+C. The course has no external font/CDN dependency. Primary references need Internet access. Service workers require localhost or HTTPS and supported browser settings. When an updated offline cache is ready, use the reload notice.

## Free GitHub Pages hosting

This repository uses **main → /(root)** under Settings → Pages. `.nojekyll` enables direct static serving. No build workflow is required. GitHub Pages publishes pushed changes automatically; confirm deployment status before assuming a new revision is live.

## Files

| File | Purpose |
| --- | --- |
| `core-a.js`, `core-b.js` | Expanded bilingual core chapters 1–30 |
| `advanced.js` | Advanced chapters 31–48 |
| `depth-*.js`, `depth-reader.js` | Extended bilingual lesson-depth records and their accessible renderer |
| `projects.js` | Guided projects and downloadable sources 49–54 |
| `services.js` | Service-protocol chapters 55–62 |
| `i18n.js` | Interface languages, module names and glossary |
| `models.js`, `engineering-models.js` | Pure parameter-driven model computations |
| `traces.js` | Synthetic Ethernet/IPv4 PCAP construction with checksums |
| `app.js` | Navigation, localized rendering, persistence, assessment and downloads |
| `sw.js`, `manifest.webmanifest` | Offline cache and install metadata |
| `tests-v2.cjs` | Content, model, rendering, PCAP and persistence checks |
| `lessons.js` | Archived v1 data; no longer loaded by the website |

## Verification

```sh
node --check app.js
node --check models.js
node --check engineering-models.js
node tests.cjs
node tests-depth.cjs
node verify-projects.cjs
```

`tests.cjs` delegates to `tests-v2.cjs`. The checks use only Node built-ins. Browser QA is separate. To run project exercises, download the matching source from its Ubuntu lab and follow that chapter. Root/network-namespace exercises need Linux capabilities; Java source needs a suitable JDK. Code is never executed by the course website itself.

Learning records remain in localStorage. Export before clearing browser storage. Backup import validates IDs, scores and note sizes before replacing records; it does not import executable HTML or code. No analytics or account synchronization are included. Explanations are original educational summaries; primary source documents retain their own licensing and status.
