# Continuation checkpoint

The course is published at https://vaikundamani-l.github.io/internet-protocol/.

## Completed and pushed

- 65 bilingual chapters, 210 chapter questions, 55 named teaching models.
- Three extended masterclasses, 30-question final practice exam, 12 graded calculations, mastery records and spaced revision.
- Paired bootstrap research tool, observed loopback packet downloads, real cryptography and TLS exercises.
- Separate commits for FRR identity/ownership, empty namespace-list handling, and simulation focus/contrast fixes.
- Real FRR 8.4.4 OSPF alternate-route/restoration and BGP import allow/deny checks passed in run 43348384576.
- Isolated namespace routing/firewall acceptance checks passed in that run.

## Lesson-depth editorial pass

- Chapters 31–50 now have extended bilingual theory, worked calculations, troubleshooting investigations and solved exercises.
- Chapter 39's multicast model now traces receiver membership, ASM/SSM tree state, RPF acceptance and downstream delivery with actual `(S,G)`, IP, UDP-port and interface state rather than a two-step availability diagram.
- Chapter 40's MPLS model now traces a two-label L3VPN packet through VRF classification, label push/swap/PHP, Route Target import and delivery/drop state, including stack bits and overhead.
- Chapter 41's DNS model now traces stub transport, cache branching, parent referral/glue, child authority, DNSSEC SECURE/INSECURE/BOGUS outcomes and authenticated positive or negative delivery.
- Chapter 42's browser-protocol model now traces cookie selection, CORS preflight/actual response gates and WebSocket Origin/session/upgrade/masking/message-authorization branches with concrete fields and close codes.
- The Chapter 42 CORS regression test now requires a failed preflight Origin check to stop the actual credentialed request; method/header permission alone can no longer produce a false `actualSent` state.
- Chapter 43 now separates PKIX path validation, RFC 9525 service identity, CertificateVerify/Finished transcript proofs, PSK+DHE resumption and 0-RTT replay; its model includes full/resumed fields, timing, HTTP 425 retry and duplicate-effect failure state.
- Chapter 44 now traces EVPN route import into VXLAN forwarding, exact inner/outer headers, VNI 5000, UDP/4789, per-hop outer Layer-2 rewrite, TTL change and decapsulation. Its model exposes distinct RT-import and MTU failure gates, while the lesson adds Type 2/Type 3, BUM, mobility, multihoming and SDN reconciliation depth.
- Chapter 44 follow-up QA corrected the EVPN advertisement and final decapsulation arrow directions and added chapter-specific Tamil, reduced-motion, mobile-overflow and accessibility browser checks.
- Chapter 44 references now include the primary ONF SDN Architecture 1.1 source for its SDN control/forwarding claims.
- Chapter 45 now traces AWS VPC longest-prefix routing, stateful Security Groups, ordered stateless Network ACLs, independent ALB health/client/backend conversations and documented all-unhealthy fail-open risk. Its model shows concrete front-end, health and backend tuples with TLS termination and separate route, policy, listener and return-path failure gates.
- Chapter 46 now traces a declared Kubernetes cross-node path from Service DNS and ClusterIP through EndpointSlice readiness, DNAT to targetPort, independent logical source-egress and destination-ingress requirements, VXLAN encapsulation, a distinct underlay-router hop, Node B decapsulation, reverse encapsulation and reverse NAT. Its model exposes concrete tuples, VNI/UDP/DF fields, bidirectional Layer-2 rewrites and independent DNS, endpoint, policy and MTU/ICMP failure gates.
- Chapter 47 now traces distinct mobile, GEO and constrained-IoT mechanisms. It correlates 5G handover with QUIC packet-number recovery and PDU-address continuity, derives GEO propagation/BDP/flight ceilings, and follows 6LoWPAN fragment offsets through CoAP Message ID/Token acknowledgement and duplicate-safe retransmission. Independent handover-route, fragment-reassembly, flight-cap and ACK-loss states have model and browser coverage.
- Chapter 48 now traces a bounded NETCONF route transaction from capability and identity checks through revision preconditions, candidate validation, confirmed commit, NMDA intended/operational state, ARP resolution, canary forwarding, Layer-2 rewrite, service response and confirmation or automatic rollback. Its second path rejects cross-epoch counter rates and correlates a W3C Trace Context request with interface rate and database latency.
- Chapter 49 now traces length-prefixed Python TCP chat through fragmented and coalesced stream reads, UTF-8 octet counting and two independent relay connections. The executable self-test and visualization reject oversized lengths, partial-frame EOF and slow-drip deadlines, and distinguish an empty frame from socket EOF.
- Chapter 50 now traces a Java ECHO/FILE grammar from operation and big-endian length through exact payload assembly, fixed-path `CREATE_NEW` storage and a framed SHA-256 acknowledgment. Its executable probes and visualization cover Tamil echo, byte-equal binary transfer, oversize and partial-EOF rejection, existing-file preservation and a shared whole-request deadline.
- `tests-depth.cjs` enforces the structure, Tamil pairing and minimum instructional depth for every added supplement.
- The exact chapter-by-chapter status is maintained in `LESSON_DEPTH.md`; chapters not listed as complete there remain pending.

## Current verification

Run: https://github.com/vaikundamani-l/internet-protocol/actions/runs/43348384576

All 30 browser checks passed: zero failed, skipped or flaky cases. Both workflow jobs passed. Raw browser, privileged-network and routing reports are now retained under evidence/. validation.json and VALIDATION.md record the tested commit and run. Preserve the original observed PCAP and its provenance rather than replacing it with unrelated output.

## Boundaries that remain

Independent human technical/Tamil editorial sign-off, physical-device/screen-reader/radio checks and production-scale security/load validation are not complete. Some lesson models share mechanisms; the course does not claim to implement every protocol or cover every Internet standard. Progress is browser-local with backup/import, without account-based synchronization.

Push each completed task separately. Check the current remote head before continuing, preserve user changes, and never describe a configured but unexecuted test as passed.
