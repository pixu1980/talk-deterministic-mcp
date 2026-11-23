# Session Handoff 05 — Title veil and get-started QR

- **Branch**: `main` (no feature branch; every commit is local, nothing pushed)
- **Commit range**: `42d89f4..b61d96e`; this handoff follows that range.
- **Date**: 2026-11-23

## Outcome

- The title slide text is centered again. The veil started as `section[data-matrix]::after` with `inset: -55% -12%`. That overlay inflated the slide `scrollHeight`, so reveal.js clamped the centering offset to 0. The veil is now `section[data-matrix] { background-image: radial-gradient(...); background-size: 124% 210% }`, which paints the same canvas and adds no scrollable overflow. `6fdf3e9`.
- The get-started slide shows a QR figure instead of a command block. `figure[data-layout='qr']` centers the code and caps it at `min(40vw, 40vh)` with `aspect-ratio: 1`, so the square stays inside a 16:9 slide. `4738674`.
- The manual-workflow copy moved: "Five steps" sits on the first slide, "Every session and every handover starts from zero" on the review slide. `4738674`.
- The outro Slides Links panel is active again; the personal and devdojo panels stay commented out. `4738674`.
- Two stale tests now follow the current slides: the setup command test asserts the guide note, the repo link and the QR figure; the outro baseline test freezes `_wrap-up`, `_taf` and `_thanks` on commit `80f6224` and asserts the links panel as the only live section. `5d18525`.
- `docs/adr/001-keep-deck-overlays-free-of-scrollable-overflow.md` records the overlay rule. `b61d96e`.

## Verification

- `rule_tool_git action=audit force=true baseBranch=main`: base branch `main` (origin/main), merge base `42d89f4`, range `42d89f4..HEAD`, 0 feature commits, 0 Conventional Commit violations, 0 merge commits.
- The audit also reported "branch is base branch; there is no feature history to normalize". `close-feature` could not run, so the work landed as three atomic commits plus docs commits.
- `node --test tests/`: 25 tests, 23 pass, 2 fail. Both failures sit in files this session did not touch.
- `rule_tool_check skill=rule-styleguide-css mode=project` and `skill=rule-styleguide-html mode=project`: one failure each, `project-health` (quality signal 5018, threshold 7000). Unchanged by this work.
- `pnpm lint`: Prettier fails on `CHANGELOG.md`, `docs/archive/execution-plan-what-why-how.md` and `pnpm-workspace.yaml`. None of them changed here.
- `npx biome check src/styles/index.css`: reports the single-quoted attribute selectors that the committed file already used. The new rules follow that convention.
- Development server: `parcel src/index.html -p 3001 --dist-dir .dev-dist` returned HTTP 200. The served CSS holds `section[data-matrix] { background-image: ...; background-size: 124% 210% }` and `min(40vw, 40vh)`, and no `inset: -55%`.
- No browser check was possible. Centering and QR size are asserted by tests and by the served CSS, not by a screenshot.

## Findings

- reveal.js centers a slide with `top = Math.max((deckHeight - section.scrollHeight) / 2, 0)` (`node_modules/reveal.js/dist/reveal.mjs:2320`). One overflowing descendant is enough to pin the content to the top.
- `rule_tool_git` detects `master` as the base branch, which yields "no common ancestor". Pass `baseBranch: "main"` on every audit.
- `tests/dependencies.test.mjs` rejects `workspace:*`. It fails on `package.json` before this session.
- `tests/deployment.test.mjs` expects `master` in `.github/workflows/static.yml`, and commit `fd1ed56` moved the trigger to `main`. It fails before this session too.
- A stale `.parcel-cache` served old CSS after an edit. Clear `.parcel-cache` (or restart with a clean cache) before trusting the served stylesheet.
- `biome` ignores `tests/`. The test files are not linted.

## Open work

1. Run `pnpm build` and commit the refreshed `dist/` (`build(deck): refresh production assets`). The committed build still holds the old veil, the old slide copy and no `rule-mcp.png`.
2. Fix the two stale tests: accept `workspace:` specs in `tests/dependencies.test.mjs`, and assert `main` in `tests/deployment.test.mjs`.
3. Push the local commits to `main`, then confirm the Pages run publishes the deck.
4. Look at the title slide and the get-started slide in a real browser at 16:9. Confirm the text is centered and the QR is legible.
5. Decide whether the veil should extend past the slide box. Moving the same gradient to `main.reveal > matrix-code::before` would allow it.
6. `pnpm lint` still fails on three untouched files. Fix them or exclude them in `.prettierignore`.

### Resume Prompt

next session opens with this block.

```prompt
Resume work on talk-deterministic-mcp from `docs/handoff/05-title-veil-and-get-started-qr.md`. Run `rule_tool_handon` first: it checks which claims in this handoff still hold before any of them are trusted.
The ADR log and the context snapshot capture what has been decided; do not re-ask answered questions.
Every commit is `type(scope): subject`; the commit-msg hook rejects a scope-less message.
Writing: STE100~80. Short sentences, active voice, one idea per sentence, same word for the same thing.
First step: run `pnpm build` and commit the refreshed `dist/`, because the committed build predates the veil fix, the new slide copy and `rule-mcp.png`.
```
