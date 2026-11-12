# Automated second-pass technical and Tamil review

## Implementation response in version 3

The findings below are retained as the original review record. TCP loss now produces ACKs only after arrivals, applies the selected receive window and recovers discarded ranges. QUIC branches distinguish all four transport/loss combinations and omit recovery without loss. Regression checks exercise these branches.

The chat source now uses one monotonic deadline across header and payload, with a slow-frame rejection test. Its English and Tamil prose explicitly separates terminal-input and accept waits from frame deadlines. The four-byte header wording was corrected. Telemetry prose distinguishes remote counter reset from collector restart; DHCP Tamil wording was simplified. The VXLAN model states the VTEP fragmentation prohibition and downstream fragmentation limitations. benchmarkStats exposes mean per-trial and aggregate rates separately.

These corrections and automated checks do not constitute independent human review. The observations below remain useful for understanding scope and follow-up.

Date: 2026-11-12. Scope: `core-a.js`, `core-b.js`, `advanced.js`, `services.js`, `projects.js`, `models.js`, and `engineering-models.js` in this directory.

This is an automated second-pass review using source inspection, selected in-memory model executions, and primary-source browsing. It is **not independent human editorial review**, native-speaker sign-off, certification, or evidence of complete correctness. Independence here means checking the supplied assets against external specifications and internal behavior; no independent human reviewer participated. Only this report was written; existing assets were not changed.

Severity: **High** = substantial security/data-loss exposure in the stated exercise; **Medium** = materially misleading behavior or instruction; **Low** = bounded wording, clarity, or diagnostic defect. No High issue was established in this bounded pass. Findings below are actionable; an omitted issue is not a clean bill of health.

## Findings

### 1. Medium — chat timeout and disconnect promises exceed implementation

**Evidence:** `projects.js:7,12` (lesson 49 summary and milestone 2), `projects.js:26–32` (`exact`), and the server/client branches around lines 75–94. The prose promises deterministic disconnect behavior and says a silent partner cannot occupy the exercise indefinitely. Each `recv` gets its own socket timeout; `exact` has no total frame deadline. A peer can drip bytes just before successive timeouts. More directly, a client waiting in `input()` cannot observe the relay closing its socket until the user enters something. Setting a socket timeout does not time out terminal input. The documented unbounded second `accept` is a separate, already acknowledged setup exception.

**Correction:** Narrow both language versions to “each blocking socket operation has a 30-second timeout; user input and server setup require cancellation.” If bounded frame completion and visible peer-disconnect behavior are intended acceptance criteria, add a monotonic deadline across header and payload reads and multiplex terminal input with connection state. Check a partial header arriving slowly and a client left at its input prompt when its peer exits. This was established by code inspection and the documented timeout semantics, not a real-time 30-second interactive test. [S1]

### 2. Medium — no-loss TCP trace describes QUIC and invents recovery

**Evidence:** `models.js:34`, `MODEL.quic`, associated with lesson 19 in `core-b.js`. Executing `compute({quic:false,loss:false})` produces the detail “QUIC can deliver available bytes for another stream without repairing A first” despite selecting TCP. It also unconditionally emits “Recovery completes” and says missing information is retransmitted although no loss occurred. The Tamil details repeat both errors.

**Correction:** Branch the delivery explanation on both transport and loss. For TCP/no loss, explain ordinary in-order delivery; emit recovery only when `loss` is true. Inspect all four combinations of the two controls. The written lesson’s distinction between TCP and QUIC stream delivery is substantively supported by RFC 9000; this finding concerns model branching, not that distinction. [S2]

### 3. Medium — loss trace emits an ACK in response to a packet the receiver never receives

**Evidence:** `models.js:22`, `MODEL['tcp-loss']`, used for core TCP reliability and advanced loss discussions. With `{lost:'2',window:500}`, the trace marks segment 2 as dropped and immediately emits another ACK 1500 before segment 3 arrives. The unconditional ACK event after every loop iteration teaches a causal response to an unobserved packet. A coincident delayed ACK is possible in a real trace, but this model supplies no such timer or explanation.

**Correction:** Emit receiver reactions only on arrivals, or explicitly model the separate delayed-ACK trigger. Keep the duplicate ACK caused by a later out-of-order arrival distinct from loss itself. Do not use the current event count to teach duplicate-ACK thresholds.

**Related limitation to clarify:** Changing `window` changes displayed numbers but does not change acceptance/buffering or final ACK 2500. The existing caveat about an earlier advertisement partially acknowledges this approximation. Relabel it as an informational parameter or explicitly represent old/current window edges; otherwise users can reasonably infer that the advertised 500-byte window is enforced when it is not. RFC 9293 defines receive-window acceptability; a full sender implementation is not required, but the displayed state needs consistent assumptions. [S3]

### 4. Medium — VXLAN oversize advice omits a protocol-specific fragmentation restriction

**Evidence:** `engineering-models.js:19`, `MODEL.vxlan`, relevant to advanced lesson 44. The oversize branch says fragmentation/PMTU behavior depends on outer IP policy. The arithmetic correctly counts 14 + 8 + 8 + 20 = 50 extra bytes for its stated IPv4 assumptions, but the operational advice is too generic for VXLAN.

**Correction:** State that RFC 7348 prohibits VTEP fragmentation; intermediate IPv4 routers may fragment, and a receiving VTEP may discard those fragments. Explain that adequate underlay MTU or suitable PMTU handling is needed rather than implying fragmentation is a generally reliable fallback. Preserve the IPv6 transit-fragmentation distinction. Update both English and Tamil. This is a missing qualification, not a demonstrated packet-processing defect in deployed equipment. [S4]

### 5. Low — a four-byte length field is called a “4097-byte header”

**Evidence:** `projects.js:13`, lesson 49 milestone 3: English “rejection of a 4097-byte header”; Tamil “4097-byte header வந்தால்”. The implementation at lines 35–38 reads a **four-byte** header whose decoded value may be 4097; the self-test at line 58 sends `struct.pack("!I", 4097)`.

**Correction:** English: “Reject a four-byte header declaring a 4097-byte payload before reading the payload.” Tamil: “4097 byte payload நீளத்தைக் குறிப்பிடும் நான்கு-byte header வந்தால், payload படிப்பதற்கு முன்பே நிராகரிக்க வேண்டும்.” This is a shared conceptual wording error, not a translation mismatch. Keep the existing encoded-byte versus character distinction.

### 6. Low — collector restart is presented as though it resets the device counter

**Evidence:** `advanced.js:358`, lesson 48 failure example: a collector restarts and the counter falls from 900000 to 1000. Tamil likewise says “Collector restart பிறகு counter ... குறைகிறது”. `engineering-models.js:12` more carefully calls a decrease a discontinuity requiring reset/wrap context.

**Correction:** Make the cause explicit: “The device/agent counter resets, or the collector switches counter identity, between samples.” Restarting a collector alone does not ordinarily reset a remote cumulative interface counter. Preserve the conservative “interval unavailable” response, but call the decrease a suspected discontinuity until counter identity/reset information confirms the cause. The lesson 58 agent-restart discussion in `services.js` is a useful internal consistency reference. This finding is a causal ambiguity, not evidence that the arithmetic is wrong.

### 7. Low — benchmark statistic needs an explicit averaging definition

**Evidence:** `models.js:15–18`, `benchmarkStats(times,bytes)`: `mbps` is the arithmetic mean of individual trial rates. In-memory execution with `[1,9]` seconds and 1,000,000 bytes per trial gives 4.444444 Mbit/s. The combined payload/time rate is instead 16,000,000 / 10 = 1.6 Mbit/s.

**Correction:** Name/document the field as mean per-trial Mbit/s, and expose aggregate Mbit/s separately if needed. Neither estimator is universally wrong; silently treating them as interchangeable is the problem. This is not a finding that project 54’s separately implemented median benchmark is incorrect. No caller/display audit beyond the requested files was performed.

## Tamil meaning-parity samples

This is automated comparison of representative passages, not exhaustive Tamil proofreading or human fluency/accessibility assessment. Technical English loanwords alone were not treated as mistranslation. Where no defect was found, the conclusion is **sampled, not exhaustive**.

| Category / evidence | Comparison and actionable outcome |
| --- | --- |
| Core: `core-a.js`, lesson 15, lease timers and worked example, lines 336–339 | Both preserve T1 = half, T2 = seven-eighths, continued use during a valid lease, and stopping at expiry. No numerical meaning mismatch found: sampled, not exhaustive. The Tamil phrase “ஏழில் அல்ல எட்டில் ஏழு பங்கு” adds a distracting correction absent from English; simplify to “பாதி மற்றும் எட்டில் ஏழு பங்கு”. Low editorial clarity issue. |
| Core: `core-b.js`, lesson 16, “Negative answers and trust”, line 12 | Both distinguish NXDOMAIN, NODATA and SERVFAIL, and separate DNSSEC authentication from encryption and website safety. No material parity defect found: sampled, not exhaustive. |
| Advanced: `advanced.js`, lesson 35, example and timer lab, lines 97–99 | Both retain 105 ms SRTT, 47.5 ms variation, 295 ms raw RTO and recommended 1000 ms floor; both retain the half-open SACK range. No numerical or modality mismatch found: sampled, not exhaustive. |
| Advanced: `advanced.js`, lesson 43, early-data section | Both preserve encrypted-but-replayable 0-RTT, weaker forward-secrecy properties, and application responsibility for replay-safe operations. No material parity defect found: sampled, not exhaustive. |
| Project: `projects.js`, lesson 49, milestones 1–3 | Both distinguish UTF-8 byte count from character count and EOF from an empty record. Both share the timeout overstatement and “4097-byte header” error in findings 1 and 5; translation parity does not make the shared claims correct. |
| Project: `projects.js`, lesson 51, resume milestone and failure example | Both require prefix-content verification rather than length alone, preserve changed-source rejection, and specify HTTP 409 for the described corrupted incomplete prefix. No material parity defect found in these passages: sampled, not exhaustive. This does not establish crash-safe file writes. |
| Service: `services.js`, lesson 55, enrollment/compromise section | Both distinguish trust on first use from independent verification and require independently re-establishing identity after old-key compromise. No material parity defect found: sampled, not exhaustive. |
| Service: `services.js`, lesson 56, alignment section and worked example | Both distinguish authentication from alignment and preserve the aligned-DKIM/unrelated-SPF outcome and receiver discretion. No material parity defect found: sampled, not exhaustive. |

No additional concrete service-chapter technical defect was established in the selected SSH, mail, time, and discovery/encapsulation samples. These categories were sampled, not exhaustive; that statement is not approval of every service claim or lab.

## Primary-source claim checks

The following substantive claims were checked by browsing primary sources on the review date. “Supported” applies only to the listed claim under its stated assumptions.

| Asset claim | Primary evidence | Result / consequence |
| --- | --- | --- |
| Socket timeouts bound socket operations | [S1: Python socket documentation](https://docs.python.org/3/library/socket.html#socket.socket.settimeout) | Supported at operation scope; does not provide an entire-frame deadline or terminal-input timeout. Finding 1. |
| QUIC avoids cross-stream transport head-of-line blocking | [S2: RFC 9000 §13.3](https://www.rfc-editor.org/rfc/rfc9000.html#section-13.3) | Supported with qualifications: streams sharing a lost packet are affected together. Written lesson 19 qualifies shared constraints; model branching needs correction. |
| TCP receive-window and ACK behavior have sequence-space constraints | [S3: RFC 9293 §§3.8.6, 3.10.7.4](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.10.7.4) | Supported; the model’s unconditional ACK and informational window need clearer treatment. Finding 3. |
| VXLAN oversized outer packets require special care | [S4: RFC 7348 §4.3](https://www.rfc-editor.org/rfc/rfc7348.html#section-4.3) | Verified VTEP fragmentation prohibition and possible destination discard of fragments. Finding 4. |
| DHCP defaults T1 = 0.5 lease and T2 = 0.875 lease | [S5: RFC 2131 §4.4.5](https://www.rfc-editor.org/rfc/rfc2131.html#section-4.4.5) | Supports lesson 15’s four/seven-hour example for an eight-hour lease without explicit overrides. No substantive defect found in this sample. |
| RTT variation is updated before SRTT; subsecond RTO is recommended to be rounded up | [S6: RFC 6298 §§2.2–2.4](https://www.rfc-editor.org/rfc/rfc6298.html#section-2) | Supports lesson 35 and `engineering-models.js:14` under its negligible-clock-granularity assumption. The one-second floor is SHOULD, not an invariant of every implementation. |
| DNS64 normally preserves available native AAAA rather than synthesizing | [S7: RFC 6147 §5.1.1](https://www.rfc-editor.org/rfc/rfc6147.html#section-5.1.1) | Supports lesson 34’s suitable-native-AAAA qualification and the model’s default branch. Exclusion sets and DNSSEC remain outside the simple model. |
| DMARC needs a passing aligned SPF or DKIM identifier; RFC 9989 supersedes RFC 7489 | [S8: RFC 9989, abstract and §§4, 4.10.2](https://www.rfc-editor.org/rfc/rfc9989.html#section-4.10.2) | Both verified against the current document, published May 2026. Lesson 56’s supersession statement is correct; do not “correct” it back to RFC 7489. |

## Method, limits, and follow-up

All seven requested files were inspected at source level with targeted deeper samples; long bilingual files were examined in selections rather than subjected to exhaustive sentence-by-sentence adjudication. Selected classic-script assets were evaluated in a Node VM to inspect model output. Concrete executions included the no-loss TCP/QUIC case, lost-segment/window case, TTL=1 route case, and benchmark arithmetic above. No source edits, downloaded project files, generated test files, or persistent network configuration were made.

No interactive browser rendering, screen-reader audit, full project execution, privileged namespace/firewall lab, real SSH/mail transfer, packet capture, radio experiment, or physical network hardware validation was performed. The TTL=1 sample also emits a next-hop-directed lookup event before discard; whether its visualization falsely suggests transmission requires a separate UI inspection. It is not counted here as a confirmed forwarding defect.

No complete correctness, production readiness, or human review is claimed. Human follow-up should prioritize the timeout contract, model event causality, and consistent Tamil wording, then run the affected branches and project acceptance cases. A fluent Tamil technical editor should separately assess terminology, readability, and novice interpretation; this report cannot substitute for that editorial review.
