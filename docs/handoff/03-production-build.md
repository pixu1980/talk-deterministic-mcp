# Session Handoff 03 — Production build and outstanding rules

- **Branch**: `master`
- **Commit range**: `7ee1151..fbb83b8`; this handoff follows that range.
- **Date**: 2026-11-07

## Outcome

- The pending `dist/` files were a Parcel development build with HMR and absolute URLs. The speaker approved replacing them with a production build.
- `2ce0d92` records the production assets. `fbb83b8` refreshes the handoff index.
- Root dependencies use exact versions. The three local packages use `workspace:0.4.4`.
- No push was made. A later push to `master` triggers the configured Pages workflow.

## Verification

- `pnpm run build`: passed.
- `pnpm run lint`: passed.
- `node --test tests/*.test.mjs`: 21 passed, 1 failed.
- The failure is `active command labels use mark and the current setup command` in `tests/talk-updates.test.mjs`. The committed `src/slides/08-contribute/_02-where.html` uses `<code>` for the install commands. The test requires `<mark>`. The current source was preserved.
- `rule_tool_check` project mode: 6 checks passed; the graph check was unavailable. Optional diagnostics were not requested.
- Development server: `http://localhost:3001` returned HTTP 200.

## Open work

1. Resolve the install-slide source/test mismatch with the speaker. Do not silently change the current slide.
2. The speaker requested `class="fragment"` on every list item. The project instruction forbids CSS classes without exceptions; the requested change was not applied. The speaker then requested a `talk-*` exception, which also was not applied.
3. Translate the remaining historical Italian research and archive documents without changing their evidence.
4. Verify project graph health after the TokenSave MCP server serves the correct branch. The previous handoff records the earlier quality-score failure.
5. Review the final Pages build and local commits before pushing.

### Resume Prompt

```prompt
Resume work on talk-deterministic-mcp. Run `rule_tool_handon` first: it checks which claims in this handoff still hold before any of them are trusted.
The ADR log and the context snapshot capture what has been decided; do not re-ask answered questions.
Every commit is `type(scope): subject`; the commit-msg hook rejects a scope-less message.
Writing: STE100~80. Short sentences, active voice, one idea per sentence, same word for the same thing.
Handoff file: docs/handoff/03-production-build.md
First step: verify the working tree and rerun the failing install-slide test; preserve the current source until the mismatch is resolved.
```
