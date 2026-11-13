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
- A validated lesson-depth supplement is being added chapter by chapter. Chapters 31–35 currently include extended bilingual theory, two multi-step worked cases, two evidence-led troubleshooting cases and three solved exercises each; see [LESSON_DEPTH.md](LESSON_DEPTH.md) for the exact ledger.
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
