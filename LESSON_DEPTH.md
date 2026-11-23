# Lesson-depth completion ledger

This ledger tracks the requested second editorial pass: deeper explanations, fully worked examples, evidence-led troubleshooting and solved exercises in both English and Tamil. English protocol names, packet fields, commands and equations remain unchanged in Tamil mode.

The base course still contains all 65 bilingual chapters. A chapter is marked **depth complete** here only after its supplement passes automated structure, bilingual-text and minimum-depth checks. This avoids presenting planned material as finished.

## Completed depth supplements

| Chapters | Subject | Added depth per chapter | Status |
| --- | --- | --- | --- |
| 31–49 | Addressing, link, switched-topology, IPv6 translation, TCP, routing, MPLS, DNS, browser protocol security, TLS, VXLAN/EVPN/SDN, cloud VPC/load-balancer, Kubernetes, mobile/satellite/constrained-IoT, network automation/observability engineering and Python TCP framed chat | 3 or more extended theory sections, 2 multi-step worked cases, 2 troubleshooting investigations, 3 or more solved exercises, cross-topic connections | Depth complete and validated |

Chapter 44's follow-up audit verified the depth contract and corrected the visualization so the EVPN Type 2 advertisement travels from the remote VTEP to the ingress VTEP and final decapsulation terminates at the remote VTEP/host. Reduced-motion, Tamil narration, mobile overflow and accessibility now have chapter-specific browser regression coverage.

Chapter 45 now separates route, Security Group, Network ACL, listener, target and application gates. Its visualization traces independent health, client and backend connections with real tuples, TLS termination, Layer-2 transit effects and distinct front-route, front-policy, backend and stateless-return failures.

Chapter 46 now separates Service DNS, ClusterIP identity, EndpointSlice readiness, targetPort translation, independent egress/ingress NetworkPolicy decisions and the CNI data path. Its declared VXLAN visualization traces DNAT, real inner/outer tuples, DF-aware tunnel overhead, distinct Node/underlay-router hops, forward and reverse Layer-2 rewrites and TTL changes, decapsulation, reverse NAT, and distinct DNS, endpoint, policy and MTU/ICMP failures. The policy gates are explicitly logical requirements rather than a claimed implementation evaluation order.

Chapter 47 now separates radio attachment, PDU Session, IP-address, transport and application continuity; derives the GEO propagation floor, BDP and flight-size ceiling; and traces 6LoWPAN fragmentation plus CoAP duplicate handling. Its visualization exposes a failed or recovered 5G handover, queue-sensitive GEO BDP/flight limits, and distinct IoT fragment-loss and ACK-loss branches with real tuples, packet numbers, fragment sizes/offsets, Message ID, Token and side-effect count.

Chapter 48 now separates source intent, NETCONF candidate/running state, NMDA intended and operational state, forwarding evidence and service outcome. Its visualization traces capability and identity discovery, revision-conflict rejection, YANG validation, confirmed commit, next-hop resolution, real canary tuple and router Layer-2 rewrite, confirmation or timed rollback, plus counter-discontinuity and trace-correlation investigations.

Chapter 49 now treats TCP as an ordered byte stream rather than a message transport. Its executable Python project and visualization cover four-octet big-endian framing, fragmented and coalesced reads, UTF-8 octet length, independent relay connections and sequence spaces, zero-length frames, oversized declarations, incomplete-frame EOF and a single whole-frame deadline. The lesson also distinguishes `sendall()` completion from peer parsing or display.

## Remaining editorial pass

| Chapters | Status |
| --- | --- |
| 50–54 | Guided-project lesson depth pass pending |
| 55–62 | Service-protocol depth pass pending |
| 63–65 | Capstone/review depth pass pending |
| 1–30 | Foundations and core depth pass pending |

## Validation contract

Run `node tests-depth.cjs`. For every installed depth record, the validator requires:

- three or more substantial bilingual theory sections;
- two or more worked examples with at least four explicit reasoning steps;
- two or more troubleshooting cases, each with evidence checks, cause, fix and verification;
- three or more exercises with hints and complete solutions;
- Tamil text paired with the English explanation while retaining English technical vocabulary;
- at least 650 English instructional words per chapter;
- matching script inclusion and offline-cache entries.

When all seven depth data assets are present, the same test requires exactly one validated supplement for every chapter ID from 1 through 65.
