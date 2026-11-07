# Slide Map — "Deterministic MCP Server" (9 chapters, EN, ~38 min)

> Plan of record: `docs/plans/execution-plan.md`. Previous map archived in `docs/archive/slide-map-what-why-how.md`.
> Sources: **E** = `docs/research/benchmark-evidence.md` · **R** = `pix-galaxy-mcp` README · **D** = server `docs/**` · **T** = talk template (`@pixu-talks/theme`).
> Numbers are the validated set: **80 skills · 90 tools · 21 prompts · 168 resources · 2 projects · 6 measured sessions**.

## Act 1 — Who I am, what the work needs

### 1. Presentazioni — 2 slides, 1.5 min — `src/slides/01-presentazioni/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 1 | `_01-title.html` | Deck title + claim "One rule set. Every coding agent. Every Dev." | — | `_doodle` (`section intro`) |
| 2 | `_02-speaker.html` | Emiliano Pisu — Head of DevX @ Webidoo Engineering, Sensei & Co-Host @ Dev Dojo IT, social links | T | `speaker` + `comparison` |

### 2. Cosa faccio — 3 slides, 3 min — `src/slides/02-cosa-faccio/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 3 | `_01-role.html` | Head of DevX: what the role owns (developer experience, standards, tooling for agents) | — | concept (`h3` + `small balance` + `ul`) |
| 4 | `_02-company.html` | What working in a company demands: many teams, many repos, agents entering the flow, nobody to onboard them | — | concept |
| 5 | `_03-community.html` | Dev Dojo IT as the other half: teaching the same standards outside the company | — | concept |

### 3. Il bisogno — 3 slides, 4 min — `src/slides/03-bisogno/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 6 | `_01-simple-request.html` | "The request looks simple" (blockquote: accessible app with tests, docs, design system) + **rotation frame**: people rotate, AI resources rotate | rework `02-problem` | `blockquote` + `small balance` |
| 7 | `_02-manual-workflow.html` | Without a shared server: explain every standard, find the guide, repeat missing rules, review, ask for fixes | rework `02-problem` | `ol` + `fragment` |
| 8 | `_03-weak-contracts.html` | Prompt rules are weak contracts (context cost, skipped instructions, review after the fact) + model drift + close: move the policy outside the model | rework `02-problem` | concept + `comparison`-free split figure |

## Act 2 — What we tried, what came out, what the idea is

### 4. Gli esperimenti — 5 slides, 7 min — `src/slides/04-esperimenti/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 9 | `_01-method.html` | Method: 2 projects × 3 models, real sessions, billed tokens; what is measured (cost, iterations, adherence, cache) and what is not (hours) | E §1 | concept + `table` |
| 10 | `_02-phonebook.html` | Phonebook (client-only): one number + screenshot slot | E §2 | code+output |
| 11 | `_03-bookmarks.html` | Bookmarks manager (full stack): one number + screenshot slot | E §3 | code+output |
| 12 | `_04-failures.html` | What did not work: 0/3 used caveman/tokensave in reading, models shortcut the process (monolith, no build, minimal SSRF guard) | E §4 | support note |
| 13 | `_05-poc.html` | Company PoCs without numbers: link-manager, react-gantt, token-forge, vinyl-collection | E §5 | concept (`ul` + `fragment`) |

### 5. L'idea — 4 slides, 4 min — `src/slides/05-idea/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 14 | `_01-claim.html` | The claim: one rule set, every coding agent, every dev — standards as executable contracts | — | concept (`h2` + `mark`) |
| 15 | `_02-principles.html` | Three principles: deterministic (no LLM in the server), local-first (skills on disk), measurable (guardrails + flight recorder) | R | `ol` + `fragment` |
| 16 | `_03-story.html` | "One task. Many agents." + agent row (Claude · Codex · Gemini · Cursor · Pi) | ported from `fix/visual-rework` | concept |
| 17 | `_04-diagram.html` | Conceptual diagram: prompt-only rules vs policy held by the server | — | inline SVG (`.diagram` classes) |

### 6. La soluzione — 10 slides, 11 min — `src/slides/06-soluzione/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 18 | `_01-architecture.html` | Agent → transport (stdio/SSE) → MCP SDK → registry → skills · BM25 · guardrails | R | SVG diagram |
| 19 | `_02-gateway.html` | Deterministic gateway: dry-run → check → receipt → apply | R/D | SVG + code |
| 20 | `_03-cache.html` | Cache: key = tool + args + digest of the skills used; editing one skill drops only its dependents | R | concept |
| 21 | `_04-flight-recorder.html` | Flight Recorder: every call measured locally, `/pix-stats`, nothing leaves the machine | R | concept |
| 22 | `_05-handoff.html` | Handoff / Handon: a session ends with a file, the next one verifies it | R | concept |
| 23 | `_06-personas.html` | Personas: 19 roles, one command each, request decides the depth | R | concept |
| 24 | `_07-areas.html` | Areas: 11 hubs route free text to leaf skills | R | concept |
| 25 | `_08-guardrails.html` | Guardrails: `/pix-check`, `/pix-fix`, a failed rule blocks the write | R | concept |
| 26 | `_09-surface.html` | Validated surface: 80 skills · 90 tools · 21 prompts · 168 resources | R | `table` |
| 27 | `_10-installer.html` | Multi-agent installer (23 agents), daemon, docker, `doctor`, local-first | R | concept |

### 7. Case studies — 4 slides, 4 min — `src/slides/07-case-studies/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 28 | `_01-phonebook.html` | Phonebook told as a story: screenshot + one number | E §2 | code+output |
| 29 | `_02-bookmarks.html` | Bookmarks manager told as a story: screenshot + one number | E §3 | code+output |
| 30 | `_03-devx-team.html` | The server in daily use by the DevX team (qualitative, no benchmark numbers) | — | concept |
| 31 | `_04-insight.html` | What stays true across the cases: cost, adherence, and the bottleneck being inference | E §4 | concept |

### 8. Contribuite — 2 slides, 2 min — `src/slides/08-contribuite/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 32 | `_01-cta.html` | Four asks: install it, write a skill, report what breaks, bring your team's standards | — | `ol` + `fragment` |
| 33 | `_02-where.html` | Where to start: repo, install command, `/pix-check` first run, docs site | R | code+output |

### 9. Saluti — 2 slides, 1.5 min — `src/slides/09-saluti/`

| # | File | Content | Source | Template |
| - | ---- | ------- | ------ | -------- |
| 34 | `_01-thanks.html` | Thanks + TAF | T | `outro` + `taf` |
| 35 | `_02-links.html` | QR: slides repo, pixu.dev, Dev Dojo | T | `comparison links` + `qrcode` |

## Invariants

- Every numeric claim carries its source in `<aside class="notes">`.
- No inline styles, no utility classes: theme attributes (`balance`, `flex`, `fragment`, `mark`, `note`).
- Chapter openers use the chapter name as `data-menu-title` so the menu stays readable.
- Slide counts per chapter are the budget; adding a slide needs a cut elsewhere.
- Bench reserve: chapters 4 and 7 can each drop one slide on stage without losing the narrative.
