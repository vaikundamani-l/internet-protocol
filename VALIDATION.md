# Validation record

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
