# Lesson-depth completion ledger

This ledger tracks the requested second editorial pass: deeper explanations, fully worked examples, evidence-led troubleshooting and solved exercises in both English and Tamil. English protocol names, packet fields, commands and equations remain unchanged in Tamil mode.

The base course still contains all 65 bilingual chapters. A chapter is marked **depth complete** here only after its supplement passes automated structure, bilingual-text and minimum-depth checks. This avoids presenting planned material as finished.

## Completed depth supplements

| Chapters | Subject | Added depth per chapter | Status |
| --- | --- | --- | --- |
| 31–36 | Addressing, link, switched-topology, IPv6 translation, TCP recovery and congestion-control engineering | 3 extended theory sections, 2 multi-step worked cases, 2 troubleshooting investigations, 3 solved exercises, cross-topic connections | Depth complete and validated |

## Remaining editorial pass

| Chapters | Status |
| --- | --- |
| 37–48 | Advanced networking depth pass pending |
| 49–54 | Guided-project lesson depth pass pending |
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
