# Session Handoff 01 — Short deck rewrite

- **Branch**: `master`
- **Commits covered**: `661826f..HEAD` — 42143a3 `feat(slides)`, 7b8d947 `chore(dist)`, b9b2190 `docs(talk)`, plus the `chore(handoff)` commit adding this file
- **Date**: 2026-09-27

## What this session did

- Rewrote the deck from a 25-30 min benchmark deck (What/Why/How/Proof/Future) into a short deck built around six deterministic mechanisms: **Cache, Flight Recorder, Handoff/Handon, Personas, Areas, Guardrails**.
- New `src/slides/topics/features.html` (one section per mechanism), wired into `src/slides/topics/topics.html` between how and proof.
- Trimmed `_doodle`, `_main-topic`, topics 01-05, `summary/_topics`, `outro/_wrap-up`; commented out the links slide in `src/slides/outro/outro.html`.
- Surface numbers updated to `pnpm census`: 89 skills · 107 tools · 186 resources · 37 prompts · 40 slash commands.
- `src/styles/index.css`: `pre` blocks now wrap and center long request-path lines (theme clipped them at max-width).
- Rebuilt `dist/`: 52 files changed; stale hashed bundles and unused speaker/social/QR/font assets removed.
- Refreshed `README.md`, `docs/plans/execution-plan.md`, `docs/research/{benchmark-evidence,demo-runbook,slide-map}.md`: short-deck narrative ending in CTA, census numbers, `webidoo-ai-mcp` references sanitized to `pix-galaxy-mcp`.
- All commits are local on purpose; nothing pushed.

## Current state

- Working tree clean except this handoff file.
- `dist/` build was produced during the session; not re-verified against sources since the rewrite.
- No ADRs exist yet in this repo.

## Open work

- **10.3** a11y review (screen reader on key slides, contrast, focus).
- **10.4** rehearsal notes with per-section timing (demo runbook is partial).
- **9.2** regenerate QR codes with the real repo URL (blocked on deploy).
- **10.5** GitHub Pages deploy + live-deck link in README (needs tag `v*.*.*`).
- **Plan reconciliation**: M1 boxes are unchecked though the rename work appears done; the plan still narrates the long benchmark deck. Mark what is actually done and record the short-deck pivot as a decision (plan entry or `pix_tool_process_adr`).

### Resume Prompt

```prompt
Resume work on talk-deterministic-mcp. Run `pix_tool_handon` first: it checks which claims in this handoff still hold before any of them are trusted.
The ADR log and the context snapshot capture what has been decided; do not re-ask answered questions.
Every commit is `type(scope): subject`; the commit-msg hook rejects a scope-less message.
Handoff file: docs/handoff/01-short-deck-rewrite.md
First step: run `pnpm run build && pnpm run dev`, click through the six-mechanisms deck to confirm the committed dist matches sources, then reconcile docs/plans/execution-plan.md with the short-deck pivot (record the pivot as a decision, mark M1 state).
```
