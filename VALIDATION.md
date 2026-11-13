# Validation record

Verified 2026-11-13: [run 43348384576](https://github.com/vaikundamani-l/internet-protocol/actions/runs/43348384576), source commit 68895d5526d7113b3f4e9b0837951b40e88c7322. Both workflow jobs passed.

- 30 browser cases passed with no failures, skips or flaky results across Chromium, Firefox, WebKit, Android emulation and iOS emulation. This includes both-language keyboard/axe checks, offline reload, notes, grading, input recovery and actual cryptography.
- Four isolated namespace/firewall checks passed, including cleanup.
- FRR 8.4.4 passed OSPF alternate-path/restoration and BGP import allow/deny checks.
- Python/Java projects, 65-chapter bilingual checks, 210 questions, 243 model parameter cases, observed packets and TLS trust/hostname negative tests passed.

Raw retained reports: [browser](evidence/browser-results.json), [firewall](evidence/privileged-results.json), [routing](evidence/routing-results.txt). Dependency versions from that run are recorded in package-lock.json.

The live Evidence & validation page reads validation.json. It distinguishes completed checks from pending or unavailable checks. CI artifacts preserve the raw reports.

Run locally:

```sh
node tests.cjs
node tests-v3.cjs
node verify-projects.cjs
python3 evidence/validate.py
```

The course-validation GitHub Actions job additionally runs isolated namespace/firewall checks with elevated privileges on a disposable runner, and Playwright tests on Chromium, Firefox, WebKit and two mobile emulations. Emulation is not a physical-device test. A passing axe scan is not a complete accessibility audit.

Observed loopback capture: [successful run 43229706143](https://github.com/vaikundamani-l/internet-protocol/actions/runs/43229706143), source commit 199e686ce4c899e4e52ec31df573dd43d770f373. Twelve observed packets: ten TCP and two UDP. Independent parser verified HTTP 200, payload reassembly and a matching DNS transaction. Metadata contains SHA-256 hashes and capture limitations.

Independent human technical review, fluent Tamil editorial sign-off, physical assistive-technology testing, real radio/hardware experiments, cloud-account labs and production-scale security/load validation have not been completed. These cannot be established by marking a checklist or by simulator output. The included projects remain bounded educational implementations.
