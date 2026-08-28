# Demo Runbook — Talk "Deterministic MCP Server"

> **Stato**: verificato 2026-07-11 con `pix-galaxy-mcp v1.0.0` (MCP SDK 1.30.0, Node 24.19.0, darwin/arm64).
> Ogni demo ha: prerequisiti → comandi → cosa mostrare → fallback.

---

## Demo 1 — Install + doctor (~1 min)

### Prerequisiti

- `pix-galaxy-mcp` installato globalmente (`which pix-galaxy-mcp` → `~/.pnpm/bin/pix-galaxy-mcp`)
- Node >= 20

### Comandi

```bash
pix-galaxy-mcp doctor
```

### Output atteso (verificato)

```
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

1. "90 tools registered" → allineato al numero del deck (verificato via `docs-accuracy` test: README non può divergere dalla realtà).
2. "Configured 2/23" → script `install --agent all` installa per tutti gli agent.
3. Doctor è lui stesso deterministico: output identico su qualsiasi macchina.

### Comando di riserva (se doctor fallisce)

```bash
pix-galaxy-mcp --help
```

### Fallback

Screenshot del doctor già salvato (TODO: catturare PNG prima della talk).

---

## Demo 2 — Gateway check/apply con anteprima (~2-3 min)

### Prerequisiti

- Server integrato con un agente (pi o claude: stress-tested con `agent integration`).
- File di esempio pronto (TODO M7: creare `~/tmp/gateway-demo/` con un componente minimale).

### Flusso

1. **Gateway** — chiamare il tool MCP `pix_tool_gateway` con il componente draft:
   ```json
   {
     "prompt": "build an accessible BookmarkCard component",
     "files": [{ "path": "src/components/BookmarkCard.tsx", "content": "<component draft>" }],
     "framework": "react"
   }
   ```
2. **Mostrare il risultato guardrail** → `allPass` / failure list (a11y, naming, structure…).
3. **Receipt** → hash del file + receipt token → prova che il codice validato è quello esatto.
4. **Apply dry-run** (`pix_tool_apply` con `dryRun: true`) → anteprima dei file che verrebbero scritti.
5. **Apply reale** con il receipt.

### Talking points

- "Validate before write" — il file che fallisce i check non atterra nel repo.
- Receipt legato all'hash esatto: codice modificato → receipt invalido.
- Dry-run = fail-safe: nessuna sorpresa in produzione.

### Fallback

Registrazione pre-registrata (Loom / cast screen 30s).

---

## Demo 3 — Benchmark re-run (~3-4 min)

### Prerequisiti

- Un agente con il server attivo (pi consigliato: già configurato ✅).
- Prompt ridotto (version abridged del bookmarks prompt — già in slide "The verbatim prompt").

### Flusso

1. Incollare il prompt abridged nella sessione agente.
2. Mostrare il primo tool call MCP del modello (es. `pix_tool_ai` / `pix_tool_gateway`).
3. Far notare il **receipt** prima di qualsiasi scrittura.
4. Chiusura: "this is the loop the benchmark measured — 1 prompt, watching the rails".

### Talking points

- Il server è il costante, il modello è la variabile.
- Il prompt è lo stesso del benchmark → il pubblico vede esattamente cosa è stato misurato.
- Aspettarsi un comportamento diverso dal vivo (tempo, modello) — è normale ed onesto dirlo.

### Fallback

Screenshot della sessione benchmark originale (dal report, Allegato B tool calls).

---

## Verifiche ambientali pre-talk (T-1 giorno)

```bash
# 1. server sano
pix-galaxy-mcp doctor

# 2. surface coincide col deck (90 tools / 10 minimal) — VERIFICATO 2026-07-11
pix-galaxy-mcp tools list | head
PIX_GALAXY_MCP_MINIMAL_TOOLS=1 pix-galaxy-mcp tools list | head  # → 10 registered

# 3. agent pi pronto
cat ~/.pi/agent/mcp.json | grep -A3 pix-galaxy

# 4. demo gateway su file di esempio
# (TODO M7: test end-to-end con componente minimale, registrare output JSON)

# 5. fallback materiale pronto
ls ~/tmp/gateway-demo/ 2>/dev/null || echo "creare ~/tmp/gateway-demo/"
```

## Note sulla demo dal vivo

- **Mai fare inference**: il server non chiama LLM → nessun rischio "il modello non risponde".
- I tempi delle demo sono misurati e inclusi nel timing totale (25-30 min).
- Se una demo fallisce: si salta alla prossima senza rottura narrativa (le slide demo sono "isolate" tra sezioni).
