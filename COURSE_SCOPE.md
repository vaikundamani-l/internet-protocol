# Coverage ledger — Protocol Atlas v2

The v2 syllabus contains 62 bilingual chapters across 13 modules. Every chapter includes prerequisites, objectives, at least three explanatory sections, a worked example, a failure case, an Ubuntu exercise, expected observations, cleanup guidance, three assessment questions and primary references. English and Tamil records are authored together; Tamil explanations retain English technical vocabulary.

## Earlier gaps and implemented responses

| Earlier gap | Current implementation | Boundary |
| --- | --- | --- |
| Short introductions | Rewritten chapters in `core-a.js`, `core-b.js`; advanced and service chapters | Chapters are substantial study units, not textbooks covering every implementation |
| Decorative packet walkthrough | Parameter-driven models in `models.js`, `engineering-models.js` | Deterministic educational computations; not real stacks or full emulators |
| History | Chapter 1: packet switching, NCP, 1983 transition, Web and administrative independence | Primary history reference extends chronology and contributors |
| Addressing exercises | Chapters 7–10, 31, 34; bit-level calculator, /31 and /32 cases, NAT64 model | IPv6 transition deployment needs provider-specific testing |
| Link engineering | Chapters 4–6, 32–33; source learning, VLAN, STP path and airtime models | No radio hardware emulation or complete IEEE state machine |
| TCP depth | Chapters 11–14, 35–36; gap/ACK recovery, framing, RTO equations, Reno-style growth | CUBIC/BBR are explained in writing; window model is explicitly not either algorithm |
| Routing depth | Chapters 21–24, 37–40; longest prefix, Dijkstra, BGP policy, MPLS, multicast | Full protocol convergence is studied through external implementation labs |
| Application services | Chapters 15–20, 41–43, 55–62 | Vendor quirks and deployment-specific authentication need further practice |
| Advanced infrastructure | Chapters 44–48: overlays, EVPN, SDN, VPC, Kubernetes, mobile/satellite/IoT, automation | Cloud labs avoid paid-resource provisioning; deployment labs require your own environment |
| Programming | Projects 49–54 with downloadable Python/Java source | Local educational implementations are not production-hardened products |
| Packet evidence | Synthetic ARP, DNS, TCP handshake and loss/recovery PCAP/CSV downloads | Clearly synthetic, not claimed to be observed live captures |
| Assessment | Three questions per chapter, calculation and diagnosis examples, saved scores | Self-study feedback, not an accredited qualification or invigilated exam |
| Research | Chapters 30, 54; randomized repeated measurements, baselines, variance, limitations and novelty review | Descriptive statistics do not establish causation or universal performance advantages |
| Tamil | Global Settings language applies to all course prose, assessments, simulation narration and lab guidance | Code, packet fields, technical vocabulary and primary-reference titles remain English |
| Learning tools | Notes, bookmarks, validated backup/import, print view, service-worker cache, reduced-motion support | Browser-local storage; no cross-device account sync |

## Model inventory

Models cover history, encapsulation, queueing, Ethernet learning, VLAN scope, ARP, IPv4 forwarding, subnet bits, IPv6 DAD/RA/SLAAC, MTU decisions, UDP loss/reordering, TCP handshake/gaps/close, DHCP, DNS, HTTP cache, TLS decisions, QUIC delivery, routing withdrawal, BGP policy, NAT, firewall state, framing, namespaces, diagnostic stages, RTO, Reno-style congestion, Dijkstra, STP path choice, VXLAN overhead, Kubernetes policy, NTP timestamps, SSH identity, mail delivery, mDNS, ICE/TURN selection, tunnel overhead, multicast membership, MPLS, NAT64, Wi-Fi airtime and telemetry counters. Some chapter-specific names share a related computation; model count is not a count of independently implemented protocol stacks.

Every model identifies the assumptions that matter. Many advanced protocols have far more state than is appropriate for an in-browser teaching model. The related written chapter and its primary sources remain essential.

## Verification boundaries

Automated tests validate schema and bilingual parity, all rendered tabs in both languages, model parameter cases and selected independent expected outputs, PCAP headers/checksums, offline asset existence and backup validation. Real-browser checks cover representative navigation, language persistence, simulation changes, assessment feedback and local notes. Python exercises can be tested on loopback. Namespace, firewall, radio, cloud and multi-device labs require capabilities or equipment not guaranteed in this workspace. Java compilation is reported separately when the JDK compiler is available.

The course does not claim that every Internet standard is covered, that completing pages guarantees expertise, or that the lab code is safe to deploy unchanged on a public network.
