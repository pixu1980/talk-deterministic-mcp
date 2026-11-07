# Demo Runbook — Historical "Deterministic MCP Server" Plan

> Historical status: verified on 2026-07-11 with `pix-galaxy-mcp v1.0.0` (MCP SDK 1.30.0, Node 24.19.0, Darwin/arm64). The current talk does **not** plan a live demo. The commands and counts below describe the historical server and must be revalidated before reuse.
>
> Each historical demo lists prerequisites, commands, talking points, and a fallback.

## Demo 1 — Install and doctor (~1 minute)

### Prerequisites

- `pix-galaxy-mcp` installed globally (`which pix-galaxy-mcp` returned `~/.pnpm/bin/pix-galaxy-mcp`).
- Node >= 20, as required by the historical setup.

### Command

```bash
pix-galaxy-mcp doctor
```

### Expected output at the time

```text
╔══════════════════════════════════════════════╗
║  🩺 pix-galaxy-mcp doctor                    ║
║  healthy                                     ║
╚══════════════════════════════════════════════╝

Status: ✅ healthy
🖥️ System      Version: 1.0.0 · SDK 1.30.0 · Node v24.19.0
🧰 MCP Tools   Registered: 90
🤖 Agents      Configured: 2/23 (claude, pi) ⚠️ missing: codex/cursor/copilot/…
🚀 Daemon      not running · launchd service not installed (available)
```

### Talking points

1. The 90 registered tools matched the historical deck and its `docs-accuracy` test.
2. `install --agent all` installed configuration for all supported agents; the example had 2 of 23 configured.
3. Doctor is deterministic, but actual output depends on the local machine and configuration.

If doctor fails, use `pix-galaxy-mcp --help`. The historical fallback was a doctor screenshot, which had not yet been captured.

## Demo 2 — Gateway check/apply with preview (~2–3 minutes)

### Prerequisites

- Server integrated with an agent, historically tested with pi or Claude.
- A minimal example component prepared in `~/tmp/gateway-demo/`; this was still a TODO in the original runbook.

### Flow

1. Call `pix_tool_gateway` with a draft component:

   ```json
   {
     "prompt": "build an accessible BookmarkCard component",
     "files": [{ "path": "src/components/BookmarkCard.tsx", "content": "<component draft>" }],
     "framework": "react"
   }
   ```

2. Show `allPass` or the failure list: accessibility, naming, structure and other guardrails.
3. Show the receipt: file hash and receipt token bind validation to the exact code.
4. Call `pix_tool_apply` with `dryRun: true` to preview the files.
5. Apply with the receipt only after validation.

Talking points: validate before writing; modified code invalidates the receipt; dry-run provides a preview. The planned fallback was a prerecorded 30-second screen capture.

## Demo 3 — Benchmark rerun (~3–4 minutes)

### Prerequisites

- An agent connected to the server; pi was recommended in the historical setup.
- An abridged version of the bookmarks prompt.

### Flow

1. Paste the abridged prompt into an agent session.
2. Show the first MCP tool call, for example `pix_tool_ai` or `pix_tool_gateway`.
3. Point out the receipt before writing.
4. Explain the measured workflow: one prompt while observing the guardrails.

Talking points: the server is held constant while the model changes; the audience sees the benchmark prompt. A live rerun may differ in timing and model behavior. The planned fallback was a screenshot of the original benchmark session from report appendix B.

## Historical environment checks

```bash
# 1. Server health
pix-galaxy-mcp doctor

# 2. Historical surface: 90 tools and 10 in minimal mode
pix-galaxy-mcp tools list | head
PIX_GALAXY_MCP_MINIMAL_TOOLS=1 pix-galaxy-mcp tools list | head

# 3. Check the pi agent configuration
cat ~/.pi/agent/mcp.json | grep -A3 pix-galaxy

# 4. Gateway example: end-to-end fixture and JSON output were still TODO

# 5. Check fallback material
ls ~/tmp/gateway-demo/ 2>/dev/null || echo "Create ~/tmp/gateway-demo/"
```

## Historical live-demo notes

- The server does not call an LLM itself; the agent can still call a model.
- The original plan included demo time in a 25–30 minute talk.
- If a demo failed, the speaker could skip to the next isolated section.
