# Execution Plan — "Deterministic MCP Server" (9-chapter rework)

> **Branch**: `feat/rework` (base `master`, no `main` in this repo)
> **Scope**: rebuild the deck narrative on the 9-chapter schema, keep the `master` template stack
> (`reveal.js` + Parcel + `posthtml-include` + `@pixu-talks/*`, English, `<small balance>`, `<mark>`, fragments).
> **Superseded**: the "What → Why → How → Proof → Future" plan, archived in `docs/archive/execution-plan-what-why-how.md`.

---

## 1. Interview decisions (round 2 — narrative rework)

| Topic           | Decision                                                                                                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Duration        | **35-40 min**, ~30-34 slide declared, **35 planned** (some are bench reserve)                                                                                                                             |
| Language        | **English** everywhere, `lang="en"` unchanged                                                                                                                                                             |
| Structure       | **3 acts / 9 chapters**, chapter = vertical stack + opener; agenda stack removed                                                                                                                          |
| 1 Introductions | Speaker bio only (`_pixu` component), no Dev Dojo / Webidoo block in this chapter                                                                                                                         |
| Intro visual    | The intro keeps the reworked vocabulary (`data-part`, `data-kicker`, `figure[data-layout]`) **and** the matrix rain (`matrix-code.js` + CSS); the rest of the deck still uses the master theme vocabulary |
| 2 What I do     | **Head of DevX @ Webidoo Engineering** + what working in a company demands from agents                                                                                                                    |
| 3 The need      | All five blocks of the rework `02-problem`: simple request, manual workflow, model drift, weak prompt contracts, policy outside the model. Plus the **rotation** frame                                    |
| Rotation frame  | What rotates: **people** (turnover, onboarding) and **AI resources** (Claude/Codex/Gemini/Cursor)                                                                                                         |
| 4 Experiments   | Benchmark (2 projects × 3 models), **failed experiments**, **company PoCs without numbers**; 1 slide per experiment, budget 5                                                                             |
| 5 The idea      | Claim **"One rule set. Every coding agent. Every Dev."** (extension of the ported title claim) + 3 principles + conceptual diagram + the ported "One task. Many agents." story                            |
| 6 The solution  | Architecture request path, deterministic gateway, the six mechanisms, validated surface, multi-agent installer; budget 9-10                                                                               |
| Demo            | **Deferred**: slides are demo-ready, live demo decided after the first full build                                                                                                                         |
| 7 Case studies  | The 2 benchmark projects told as stories (not the KPI tables again) + the server in use by the DevX team; 1 slide per case, screenshot + one number                                                       |
| 8 Contribute    | 4 asks: install it, write a skill, report what breaks, bring your team's standards                                                                                                                        |
| 9 Goodbye       | Thanks + TAF + QR (slides repo, pixu.dev, Dev Dojo)                                                                                                                                                       |
| Numbers         | Validated set only: 80 skills · 90 tools · 21 prompts · 168 resources · 2 projects · 6 measured sessions                                                                                                  |
| Repo layout     | `src/slides/NN-chapter/` per chapter, old files removed (content migrates)                                                                                                                                |
| Docs            | This plan + `docs/research/slide-map.md` rewritten                                                                                                                                                        |
| ADR             | **Not requested**; ADR 001 becomes stale and is listed under open decisions                                                                                                                               |
| Commits         | One Conventional Commit per chapter, plus one for the structure migration                                                                                                                                 |

---

## 2. Acts and chapters

| Act                                 | Chapter         | Slides | Minutes | Files                                                                                                             |
| ----------------------------------- | --------------- | ------ | ------- | ----------------------------------------------------------------------------------------------------------------- |
| 1 — Who / why we are here           | 1 Introductions | 2      | 1.5     | `01-introductions/_01-title.html`, `_02-speaker.html`                                                             |
|                                     | 2 What I do     | 3      | 3       | `02-what-i-do/_01-role.html`, `_02-company.html`, `_03-community.html`                                            |
|                                     | 3 The need      | 3      | 4       | `03-the-need/_01-simple-request.html`, `_02-manual-workflow.html`, `_03-weak-contracts.html`                      |
| 2 — What we tried and what came out | 4 Experiments   | 5      | 7       | `04-experiments/_01-method.html`, `_02-phonebook.html`, `_03-bookmarks.html`, `_04-failures.html`, `_05-poc.html` |
|                                     | 5 The idea      | 4      | 4       | `05-idea/_01-claim.html`, `_02-principles.html`, `_03-story.html`, `_04-diagram.html`                             |
|                                     | 6 The solution  | 10     | 11      | `06-solution/_01-architecture.html` … `_10-installer.html`                                                        |
| 3 — Proof, call to action, goodbye  | 7 Case studies  | 4      | 4       | `07-case-studies/_01-phonebook.html`, `_02-bookmarks.html`, `_03-devx-team.html`, `_04-insight.html`              |
|                                     | 8 Contribute    | 2      | 2       | `08-contribute/_01-cta.html`, `_02-where.html`                                                                    |
|                                     | 9 Goodbye       | 2      | 1.5     | `09-goodbye/_01-thanks.html`, `_02-links.html`                                                                    |

Total: **35 slides, ~38 minutes**.

---

## 3. Phases

### Phase 0 — Structure and migration (deck must keep building)

- [x] **0.1** Create English-named chapter folders and retain the ported title and speaker slides.
- [x] **0.2** Move the story to the idea chapter and rewrite the need chapter.
- [x] **0.3** Rebuild the solution chapter around the request path and six mechanisms.
- [x] **0.4** Restore the original `master` outro under `src/slides/outro/` as requested; keep its original composition.
- [x] **0.5** Retain the archived sections and boilerplate under `src/slides/_archive/` and `src/slides/_boilerplate/`.
- [x] **0.6** Compose nine chapters in `src/slides/slides.html`.
- [x] **0.7** Verify the included deck runs; the original regrouping was committed as `3f15859`.

### Phase 1 — Act 1 (chapters 1-3)

- [x] **1.1** `01-introductions`: preserve the reworked title and matrix rain and the speaker bio from `fix/visual-rework`; the extended claim belongs in chapter 5.
- [x] **1.2** `02-what-i-do`: Head of DevX role, the company context (teams, standards, agents), Dev Dojo line
- [x] **1.3** `03-the-need/_01`: simple request + rotation frame (people rotate, AI resources rotate)
- [x] **1.4** `03-the-need/_02`: manual workflow without a shared server (5 steps list)
- [x] **1.5** `03-the-need/_03`: model drift + weak prompt contracts + "move the policy outside the model" close; the comparison is labeled illustrative
- [x] **1.6** Add speaker notes identifying interview-confirmed context and illustrative examples; reference `docs/research/benchmark-evidence.md` for measured results.
- [x] **1.7** Verify the development server and record the work in the combined narrative commit `e6b9549`.

### Phase 2 — Act 2 (chapters 4-6)

- [x] **2.1** `04-experiments/_01`: method slide (real sessions, billed tokens, what is measured, what is not)
- [x] **2.2** `04-experiments/_02`: phonebook results; application screenshot shown in chapter 7
- [x] **2.3** `04-experiments/_03`: bookmarks results; application screenshot shown in chapter 7
- [x] **2.4** `04-experiments/_04`: failed experiments (0/3 activated caveman/tokensave, models shortcut the process)
- [x] **2.5** `04-experiments/_05`: company PoCs without numbers (link-manager, react-gantt, token-forge, vinyl-collection)
- [x] **2.6** `05-idea/_01`: claim slide "One rule set. Every coding agent. Every Dev."
- [x] **2.7** `05-idea/_02`: three principles (deterministic, local-first, measurable)
- [x] **2.8** `05-idea/_03`: ported story "One task. Many agents." (agent row)
- [x] **2.9** `05-idea/_04`: conceptual comparison (prompt-only vs shared server)
- [x] **2.10** `06-solution/_01`: architecture request path, using a compact diagram
- [x] **2.11** `06-solution/_02`: deterministic gateway, check, receipt, apply
- [x] **2.12** `06-solution/_03`–`_08`: the six mechanisms, one slide each
- [x] **2.13** `06-solution/_09`: tools, resources and prompts; counts omitted because the current server census differs from the historical plan
- [x] **2.14** `06-solution/_10`: multi-agent installer and doctor
- [x] **2.15** Mark the demo slot (notes only) until the build is green
- [x] **2.16** Record the chapters in the combined narrative commit `e6b9549`, as requested.

### Phase 3 — Act 3 (chapters 7-9)

- [x] **3.1** `07-case-studies/_01`: phonebook results and separate screenshot slide with bundled sample contacts
- [x] **3.2** `07-case-studies/_02`: bookmarks results and separate screenshot slide with a mocked empty API response
- [x] **3.3** `07-case-studies/_03`: qualitative DevX context and rotation need, without claiming adoption or measured outcomes
- [x] **3.4** `07-case-studies/_04`: limitations shared across cases
- [x] **3.5** `08-contribute/_01`: the four asks
- [x] **3.6** `08-contribute/_02`: repository, install commands and documentation
- [x] **3.7** Restore the original `master` outro, with accessible SVG and music caption. Its links remain commented out as in `master`; the QR assets were decoded and the slide-repository QR was corrected.
- [x] **3.8** Record the restored outro and final verification work in the follow-up commit.

### Phase 4 — Docs, QA, release

- [x] **4.1** Update `docs/research/slide-map.md` with the 44 active slides and source paths.
- [x] **4.2** Update the README for the actual nine-chapter composition and restored outro.
- [x] **4.3** Run Biome lint, the Node test suite, and Prettier checks on the updated documentation and tests.
- [x] **4.4** Build the final static deck; inspect all 41 slides with axe-core and check 39 horizontal slide positions at three viewport sizes. Manual review remains in the rehearsal checklist.
- [x] **4.5** A timed rehearsal is not required, per speaker confirmation.
- [x] **4.6** No live demo is planned, per speaker confirmation; rebuild `dist/` once for the final production check.
- [ ] **4.7** Translate remaining historical research and archived documents to English without changing evidence or quotations.
- [x] **4.8** Prepare GitHub Pages deployment: the committed-`dist/` workflow runs on pushes to `master` and supports manual dispatch; the README explains setup and release steps.
- [ ] **4.9** Investigate the rule-mcp project-health failure: rule-mcp reports 5034/10000; the newly tracked TokenSave branch reports 6088/10000, with equality at 0.0847. Both are below the 7000 threshold. The running TokenSave MCP server must be restarted to serve the newly tracked branch.

---

## 4. Open decisions

| #   | Decision                                                                                                    | Default if nobody answers                           |
| --- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| O1  | Opening slide: does the title restate the claim used in `05-idea/_01`, or does it open with something else? | Bookend: title states it, chapter 5 answers with it |
| O2  | "Every Dev" wording in English — is it the final phrasing?                                                  | Keep as written; one line, easy to change           |
| O3  | Live demo inside chapter 6                                                                                  | Resolved: no live demo                              |
| O4  | ADR 001 ("40-slide workflow story") is stale; supersede it or leave it?                                     | Left as is, noted here                              |
| O5  | `dist/` committed build: rebuild at the end of each phase or once at the end?                               | Resolved: rebuild once for the final check          |

---

## 5. Verification per phase

```bash
pnpm dev            # default development server
pnpm run lint       # Biome lint
node --test tests/*.test.mjs
pnpm run build      # static deck in dist/
```

---

## 6. Sources

- Evidence: `docs/research/benchmark-evidence.md` (validated numbers, failed experiments)
- Demo: `docs/research/demo-runbook.md` (historical; no live demo is planned and commands require revalidation)
- Ported narrative: `fix/visual-rework` → `slides/01-intro.html`, `slides/02-problem.html`
- Template: `@pixu-talks/theme` components (`speaker`, `comparison`, `dive-in`, `links`, `qrcode`)
