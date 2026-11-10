# Session Handoff 04 — Published deck URL and deploy branch

- **Branch**: `main` (the default branch; `master` no longer exists on the remote)
- **Commit range**: `72fdc48..42dafbb`; this handoff follows that range.
- **Date**: 2026-11-10

## Outcome

- The published deck is live at <https://pixu1980.github.io/talk-deterministic-mcp/>. Local `curl` returned HTTP 200.
- The GitHub "About" homepage field now holds that URL. `gh repo view --json homepageUrl` confirmed the value.
- `README.md` shows the live URL under the title and in the GitHub Pages section.
- `91f7cfa` adds the URL to the README.
- `fd1ed56` changes the Pages workflow trigger from `master` to `main`. The default branch is `main`, and `git ls-remote --heads` lists only `main` and `backup/v1`. Pushes to `main` did not deploy before this change.
- `8c64a9f` aligns the README deploy instructions with `main`.
- `42dafbb` regenerates the handoff index, which was missing entry 03.
- No push was made. `main` is 4 commits ahead of `origin/main`.

## Verification

- `curl -o /dev/null -w "%{http_code}" https://pixu1980.github.io/talk-deterministic-mcp/`: 200.
- `gh repo view --json homepageUrl`: returns the site URL.
- `gh run list -w static.yml`: the last three runs succeeded on `master` before the rename. They produced the live content.
- `rule_tool_git action=audit`: 0 Conventional Commit violations, 0 merge commits, working tree safe to rewrite.
- `pnpm run lint`: failed on two files that this session did not touch — `docs/archive/execution-plan-what-why-how.md` and `pnpm-workspace.yaml` (Prettier formatting). `README.md` and `.github/workflows/static.yml` passed.
- Development server: `http://localhost:3000` returned HTTP 200 (`parcel src/index.html -p 3000 --dist-dir .dev-dist`).

## Findings

- `rule_tool_git` detects `master` as the base branch, so it reports "no common ancestor" and an empty range. Pass `baseBranch: "main"` on the next audit.
- `GET /repos/pixu1980/talk-deterministic-mcp/pages` still reports `source.branch: master`. `build_type` is `workflow`, so the source branch field is unused. Confirm nothing breaks after the first `main` run.
- `pnpm dev` binds port 6001. The project instruction scans ports 3000–6000.

## Open work

1. Push the four local commits to `main`, then confirm that a new Pages run triggers on `main` and the site still serves.
2. Fix the two Prettier failures, or exclude the archived document and `pnpm-workspace.yaml` in `.prettierignore`.
3. Move the `dev` script inside the 3000–6000 range, or record an exception.
4. Open items from handoff 03 remain: the install-slide source/test mismatch, the `fragment` class request, and the translation of historical Italian documents.

### Resume Prompt

```prompt
Resume work on talk-deterministic-mcp. Run `rule_tool_handon` first: it checks which claims in this handoff still hold before any of them are trusted.
The ADR log and the context snapshot capture what has been decided; do not re-ask answered questions.
Every commit is `type(scope): subject`; the commit-msg hook rejects a scope-less message.
Writing: STE100~80. Short sentences, active voice, one idea per sentence, same word for the same thing.
Handoff file: docs/handoff/04-pages-url-and-deploy-branch.md
First step: push the four local commits on `main` to `origin`, then check `gh run list -w static.yml` for a run with head branch `main` and load the live deck.
```
