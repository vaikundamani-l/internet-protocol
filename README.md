# Protocol Atlas — Internet Protocol Master Course

A free, responsive course website built with plain HTML, CSS and JavaScript. No build step, backend, paid service, or API key is required.

## Included

- Eight modules with 30 original core lessons, English explanations and Tamil concept notes.
- A topic-specific narrated walkthrough in every lesson, with play/pause, manual steps, reset and speed controls.
- Ubuntu exercises with expected observations, knowledge checks and primary-source links.
- IPv4 subnet calculator supporting /0 through /32, including /31 point-to-point and /32 host-route cases.
- Searchable curriculum, deep links, browser-local progress, responsive navigation, dark theme and reduced-motion support.

## Run locally

From this directory:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open http://127.0.0.1:8000. Stop with Ctrl+C. Google Fonts are optional: system-font fallbacks work without that external request.

## Free GitHub Pages hosting

In repository **Settings → Pages → Build and deployment**, select **Deploy from a branch**, branch **main**, folder **/(root)**, and save. The included `.nojekyll` ensures files are served directly. GitHub will show the deployment URL and status there. Publication must be enabled separately; source files alone do not prove the site is live.

## Files

- `index.html`: application shell
- `style.css`: responsive visual design and themes
- `lessons.js`: curriculum and original educational content
- `app.js`: navigation, walkthroughs, progress, quizzes and calculator
- `tests.cjs`: structural and calculation checks

## Educational scope

This is a substantial core course, not a claim to cover every Internet protocol or all expert implementation details. Every walkthrough is a simplified logical model, not a packet-accurate simulator or live traffic capture. Expert extensions and a capstone are documented in the final lesson. Practical labs need the listed system tools and, in some cases, administrator privileges. The website never executes shell commands.

Primary references include Internet Society history, RFC Editor specifications, Linux documentation, Wireshark documentation, Python documentation and iperf documentation. Explanations are original summaries; externally linked documents retain their own licenses. Progress is stored only in this browser and can be lost when browser data is cleared. There is no account sync, analytics, or accreditation claim.

## Verification

```sh
node --check app.js
node --check lessons.js
node tests.cjs
```
