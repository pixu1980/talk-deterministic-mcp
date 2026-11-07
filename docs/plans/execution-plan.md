# Execution Plan — "Deterministic MCP Server" (9-chapter rework)

> **Branch**: `feat/rework` (base `master`, no `main` in this repo)
> **Scope**: rebuild the deck narrative on the 9-chapter schema, keep the `master` template stack
> (`reveal.js` + Parcel + `posthtml-include` + `@pixu-talks/*`, English, `<small balance>`, `<mark>`, fragments).
> **Superseded**: the "What → Why → How → Proof → Future" plan, archived in `docs/archive/execution-plan-what-why-how.md`.

---

## 1. Interview decisions (round 2 — narrative rework)

| Topic            | Decision                                                                                                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| Duration         | **35-40 min**, ~30-34 slide declared, **35 planned** (some are bench reserve)                                  |
| Language         | **English** everywhere, `lang="en"` unchanged                                                                  |
| Structure        | **3 acts / 9 chapters**, chapter = vertical stack + opener; agenda stack removed                               |
| 1 Presentazioni  | Speaker bio only (`_pixu` component), no Dev Dojo / Webidoo block in this chapter                              |
| 2 Cosa faccio    | **Head of DevX @ Webidoo Engineering** + what working in a company demands from agents                         |
| 3 Il bisogno     | All five blocks of the rework `02-problem`: simple request, manual workflow, model drift, weak prompt contracts, policy outside the model. Plus the **rotation** frame |
| Rotation frame   | What rotates: **people** (turnover, onboarding) and **AI resources** (Claude/Codex/Gemini/Cursor)             |
| 4 Gli esperimenti| Benchmark (2 projects × 3 models), **failed experiments**, **company PoCs without numbers**; 1 slide per experiment, budget 5 |
| 5 L'idea         | Claim **"One rule set. Every coding agent. Every Dev."** (extension of the ported title claim) + 3 principles + conceptual diagram + the ported "One task. Many agents." story |
| 6 La soluzione   | Architecture request path, deterministic gateway, the six mechanisms, validated surface, multi-agent installer; budget 9-10 |
| Demo             | **Deferred**: slides are demo-ready, live demo decided after the first full build                             |
| 7 Case studies   | The 2 benchmark projects told as stories (not the KPI tables again) + the server in use by the DevX team; 1 slide per case, screenshot + one number |
| 8 Contribuite    | 4 asks: install it, write a skill, report what breaks, bring your team's standards                            |
| 9 Saluti         | Thanks + TAF + QR (slides repo, pixu.dev, Dev Dojo)                                                            |
| Numbers          | Validated set only: 80 skills · 90 tools · 21 prompts · 168 resources · 2 projects · 6 measured sessions        |
| Repo layout      | `src/slides/NN-capitolo/` per chapter, old files removed (content migrates)                                    |
| Docs             | This plan + `docs/research/slide-map.md` rewritten                                                             |
| ADR              | **Not requested**; ADR 001 becomes stale and is listed under open decisions                                     |
| Commits          | One Conventional Commit per chapter, plus one for the structure migration                                       |

---

## 2. Acts and chapters

| Act | Chapter | Slides | Minutes | Files |
| --- | ------- | ------ | ------- | ----- |
| 1 — Who / why we are here | 1 Presentazioni | 2 | 1.5 | `01-presentazioni/_01-title.html`, `_02-speaker.html` |
| | 2 Cosa faccio | 3 | 3 | `02-cosa-faccio/_01-role.html`, `_02-company.html`, `_03-community.html` |
| | 3 Il bisogno | 3 | 4 | `03-bisogno/_01-simple-request.html`, `_02-manual-workflow.html`, `_03-weak-contracts.html` |
| 2 — What we tried and what came out | 4 Gli esperimenti | 5 | 7 | `04-esperimenti/_01-method.html`, `_02-phonebook.html`, `_03-bookmarks.html`, `_04-failures.html`, `_05-poc.html` |
| | 5 L'idea | 4 | 4 | `05-idea/_01-claim.html`, `_02-principles.html`, `_03-story.html`, `_04-diagram.html` |
| | 6 La soluzione | 10 | 11 | `06-soluzione/_01-architecture.html` … `_10-installer.html` |
| 3 — Proof, call to action, goodbye | 7 Case studies | 4 | 4 | `07-case-studies/_01-phonebook.html`, `_02-bookmarks.html`, `_03-devx-team.html`, `_04-insight.html` |
| | 8 Contribuite | 2 | 2 | `08-contribuite/_01-cta.html`, `_02-where.html` |
| | 9 Saluti | 2 | 1.5 | `09-saluti/_01-thanks.html`, `_02-links.html` |

Total: **35 slides, ~38 minutes**.

---

## 3. Phases

### Phase 0 — Structure and migration (deck must keep building)

- [ ] **0.1** Create `src/slides/NN-capitolo/` folders; move the ported intro slides (`_doodle` → `01-presentazioni/_01-title.html`, `_pixu` → `_02-speaker.html`)
- [ ] **0.2** Split `intro/_main-topic.html`: question → `03-bisogno/_01-simple-request.html`, story → `05-idea/_03-story.html`
- [ ] **0.3** Move `topics/features.html` → six files under `06-soluzione/` (cache, flight recorder, handoff, personas, areas, guardrails); `03-how.html` → architecture + gateway; `01-what.html` → surface
- [ ] **0.4** Move `outro/_taf.html` + `_thanks.html` → `09-saluti/_01-thanks.html`; `outro/_links.html` → `09-saluti/_02-links.html`
- [ ] **0.5** Archive `summary/_topics.html`, `_dive-in.html`, `outro/_wrap-up.html`, `topics/02-why.html`, `04-proof.html`, `05-future.html` under `src/slides/_archive/`; move `boilerplate/` → `src/slides/_boilerplate/`
- [ ] **0.6** Rewrite `src/slides/slides.html` with the 9-chapter composition (3 acts as comments)
- [ ] **0.7** Placeholder files for the empty chapters (02, 04, 07, 08) so includes resolve; verify `pnpm dev` and commit `refactor(slides): regroup the deck into nine chapters`

### Phase 1 — Act 1 (chapters 1-3)

- [ ] **1.1** `01-presentazioni`: title slide (deck claim, no duplicated claim in chapter 5 — see open decision O1) + speaker bio
- [ ] **1.2** `02-cosa-faccio`: Head of DevX role, the company context (teams, standards, agents), Dev Dojo line
- [ ] **1.3** `03-bisogno/_01`: simple request + rotation frame (people rotate, AI resources rotate)
- [ ] **1.4** `03-bisogno/_02`: manual workflow without a shared server (5 steps list, existing `data-layout` style kept in master vocabulary)
- [ ] **1.5** `03-bisogno/_03`: model drift + weak prompt contracts + "move the policy outside the model" close
- [ ] **1.6** Speaker notes with the source of every claim (`docs/research/benchmark-evidence.md`)
- [ ] **1.7** Verify `pnpm dev`, commit `feat(slides): act one — who I am and what the work needs`

### Phase 2 — Act 2 (chapters 4-6)

- [ ] **2.1** `04-esperimenti/_01`: method slide (real sessions, billed tokens, what is measured, what is not)
- [ ] **2.2** `04-esperimenti/_02`: phonebook case, one number + screenshot slot
- [ ] **2.3** `04-esperimenti/_03`: bookmarks case, one number + screenshot slot
- [ ] **2.4** `04-esperimenti/_04`: failed experiments (0/3 activated caveman/tokensave, models shortcut the process)
- [ ] **2.5** `04-esperimenti/_05`: company PoCs without numbers (link-manager, react-gantt, token-forge, vinyl-collection)
- [ ] **2.6** `05-idea/_01`: claim slide "One rule set. Every coding agent. Every Dev."
- [ ] **2.7** `05-idea/_02`: three principles (deterministic, local-first, measurable)
- [ ] **2.8** `05-idea/_03`: ported story "One task. Many agents." (agent row)
- [ ] **2.9** `05-idea/_04`: conceptual diagram (prompt-only vs server as policy)
- [ ] **2.10** `06-soluzione/_01`: architecture request path (SVG from the archived `03-how.html`)
- [ ] **2.11** `06-soluzione/_02`: deterministic gateway (dry-run, check, receipt, apply)
- [ ] **2.12** `06-soluzione/_03`–`_08`: the six mechanisms, one slide each
- [ ] **2.13** `06-soluzione/_09`: validated surface table (80/90/21/168)
- [ ] **2.14** `06-soluzione/_10`: multi-agent installer, local-first, doctor
- [ ] **2.15** Mark the demo slot (notes only) until the build is green
- [ ] **2.16** Commit per chapter: `feat(slides): experiments`, `feat(slides): the idea`, `feat(slides): the solution`

### Phase 3 — Act 3 (chapters 7-9)

- [ ] **3.1** `07-case-studies/_01`: phonebook as a story (screenshot + one number)
- [ ] **3.2** `07-case-studies/_02`: bookmarks manager as a story
- [ ] **3.3** `07-case-studies/_03`: the server in use by the DevX team (no benchmark numbers)
- [ ] **3.4** `07-case-studies/_04`: what stays true across cases (insight slide)
- [ ] **3.5** `08-contribuite/_01`: the four asks
- [ ] **3.6** `08-contribuite/_02`: where to start (repo, install command, docs)
- [ ] **3.7** `09-saluti/_01`: thanks + TAF; `_02`: QR codes
- [ ] **3.8** Commit `feat(slides): act three — case studies, contribute, saluti`

### Phase 4 — Docs, QA, release

- [ ] **4.1** `docs/research/slide-map.md`: 35-row map (chapter → file → content → source → template)
- [ ] **4.2** README: project structure and slide composition sections updated to the nine chapters
- [ ] **4.3** `pnpm run lint` (only the 9 pre-existing a11y errors may remain) + `pnpm run format` on touched files only
- [ ] **4.4** `pnpm run build` and inspect the static deck
- [ ] **4.5** Rehearsal timing per chapter, adjust the budget
- [ ] **4.6** Decide the live demo (O3) and the `dist/` rebuild policy (O5)

---

## 4. Open decisions

| # | Decision | Default if nobody answers |
| - | -------- | ------------------------- |
| O1 | Opening slide: does the title restate the claim used in `05-idea/_01`, or does it open with something else? | Bookend: title states it, chapter 5 answers with it |
| O2 | "Every Dev" wording in English — is it the final phrasing? | Keep as written; one line, easy to change |
| O3 | Live demo inside chapter 6 | Slides demo-ready, no live demo until asked |
| O4 | ADR 001 ("40-slide workflow story") is stale; supersede it or leave it? | Left as is, noted here |
| O5 | `dist/` committed build: rebuild at the end of each phase or once at the end? | Rebuild once, at the end |

---

## 5. Verification per phase

```bash
pnpm dev            # localhost:6001, deck navigable
pnpm run lint       # 9 pre-existing a11y errors tolerated
pnpm run build      # static deck in dist/
```

---

## 6. Sources

- Evidence: `docs/research/benchmark-evidence.md` (validated numbers, failed experiments)
- Demo: `docs/research/demo-runbook.md` (still valid; chapter 6 only)
- Ported narrative: `fix/visual-rework` → `slides/01-intro.html`, `slides/02-problem.html`
- Template: `@pixu-talks/theme` components (`speaker`, `comparison`, `dive-in`, `links`, `qrcode`)
