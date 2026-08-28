# Benchmark Evidence Pack — Talk "Deterministic MCP Server"

> **Scopo**: fonte unica e verificata per le slide della sezione PROOF (KPI tables). Tutti i numeri citati in deck devono venire da qui.
> **Fonti**:
>
> - `phonebook/docs/reports/webidoo-ai-mcp-phonebook-benchmark.md` (~/Projects/work/webidoo/poc/)
> - `bookmarks-manager/docs/reports/webidoo-ai-mcp-bookmarks-benchmark.md`
> - `pix-galaxy-mcp/README.md` (surface server v1.0.0)
>
> ⚠️ **Attenzione**: i report misurano `webidoo-ai-mcp` (variante con 207 tools, 21+1 risorse/router), NON `pix-galaxy-mcp` v1.0.0 (90 tools / 168 resources / 21 prompts / 80 skills). Nella talk vanno presentati come "stesso progetto rinominato" (decisione intervista) — il server demo è pix-galaxy-mcp, i benchmark provano il concetto.

---

## 1. Setup metodologico (da usare nelle slide "method")

### 1.1 Disegno del test

- **Stesso prompt utente (verbatim)** per i 3 modelli, per progetto
- 3 agenti diversi: `openai-codex` (GPT 5.6 Luna), `opencode-go` (DeepSeek v4 Flash), `github-copilot` (Claude Sonnet)
- 2 task: **phonebook** (client-only: Electron + React, UI Apple-style, design system) e **bookmarks-manager** (full-stack: React + Express/TS, scraping, SSRF guard, test a11y, ADR, handoff)
- Sessioni misurate da log JSONL reali (`~/.pi/agent/sessions/`), costi da `usage` fatturato dall'API

### 1.2 Le metriche "reali" (nota metodologica riusabile in slide)

| Campo usage  | Significato                             | Reale?                       |
| ------------ | --------------------------------------- | ---------------------------- |
| `input`      | Token nuovi (non cached) in questa call | ✅ sì, ma cumulato su N call |
| `output`     | Token generati                          | ✅ sì                        |
| `cacheRead`  | Token letti dalla cache                 | ⚠️ NON unique — N × context  |
| `cacheWrite` | Token messi in cache (nuovi)            | ✅ sì                        |

**Errore comune da sfatare**: sommare `input + cacheRead + output` NON dà i token totali — dà un multiplo del context window (es. 89 call × 105K = 19M di cacheRead ma context unico 276K).

**Le metriche che contano**: Peak context (MAX totalTokens), output cumulato, cost fatturato, cacheWrite, input uncached.

---

## 2. Benchmark 1 — Phonebook (client-only, 2026-07-11)

### 2.1 KPI master (3 modelli, stesso prompt)

| KPI                                 |         🥇 Sonnet 4.6 |            🥈 GPT 5.6 Luna |       🥉 DS4 v4 Flash |
| ----------------------------------- | --------------------: | -------------------------: | --------------------: |
| Iterazioni utente → MVP             |              **1** ✅ |        1 (2 retry tecnici) |              **4** ❌ |
| Tempo attivo sessione               |                 24:06 |                      18:30 |                 17:31 |
| Costo fatturato                     |               $5.3808 |                    $1.5390 |           **$0.0750** |
| LLM API call                        |                **57** |                         70 |                    71 |
| Output tokens (reale)               |           **103.676** |                     34.550 |                82.915 |
| Peak context (max 1 call)           | 200.944 (20,1% di 1M) | 136.865 (36,8% di 372K) ⚠️ | 223.447 (22,3% di 1M) |
| **Cache write (reale)**             |        **285.619** ✅ |                       0 ❌ |                  0 ❌ |
| Input uncached (reale)              |             **59** ⭐ |                    250.516 |               149.734 |
| LOC sorgente                        |             **5.708** |                     805 ⚠️ |                 4.239 |
| Componenti React                    |                **11** |          1 (monolitico) ⚠️ |                    10 |
| Tool MCP invocati                   |                     5 |                     **25** |                    14 |
| Tool MCP distinti                   |                     5 |                     **15** |                    14 |
| Score specifiche (6)                |               **6/6** |                      1.5/6 |                 4.5/6 |
| Aderenza MCP (11 criteri)           |              **8/11** |                       4/11 |                  7/11 |
| ADR generati                        |                     0 |                      **9** |                     2 |
| Test green al 1° colpo              |                   n/a |                  ✅ 2 file |                   n/a |
| Sample data                         | ✅ 24 contatti ricchi |                ⚠️ 3 inline |         ✅ 75 runtime |
| Design system                       |   ✅ tokens.css 7.5KB |                 ❌ assente |             ✅ 4 file |
| Microinterazione adoptedStyleSheets |                    ✅ |                         ❌ |                    ❌ |

### 2.2 Insight chiave (phonebook)

1. **Sonnet è l'unico ad aver usato attivamente il prompt caching**: 285.619 token scritti in cache, riletti a tariffa ridotta (10%) per 56/57 call → solo **59 token di input fresh** in tutta la sessione. Risparmio stimato **$30-40/sessione**.
2. **Metriche reali di context**: nessun modello ha sforato la propria window. GPT ha la window più piccola (372K) e l'ha usata al 36,8% → il più "sotto pressione".
3. **Costo del server MCP < 1% del costo totale del task** (costo tool stimato: Sonnet $0.012 su $5.38). Il collo di bottiglia è l'inferenza, non il tooling.
4. **Più tool ≠ meglio**: GPT ha invocato il MCP 25× (5× check + 4× fix) ma ha prodotto l'output meno aderente (805 LOC, 1 componente monolitico). Sonnet 5 tool in `mode:"full"` → 6/6 specifiche.
5. **LOC/prompt utente** (throughput reale): Sonnet 5.708 > DS4 1.060 > GPT 805 → Sonnet 5,4× più codice per ogni prompt.
6. Produzione: **bundle simili** (228-252 KB) nonostante LOC 7× diverse (merito del tree-shaking).

---

## 3. Benchmark 2 — Bookmarks Manager (full-stack, 2026-07-11)

### 3.1 KPI master (3 modelli, stesso prompt)

| KPI                                             |               🥇 Sonnet 5 |                🥈 GPT 5.6 Luna |       🥉 DS4 v4 Flash |
| ----------------------------------------------- | ------------------------: | -----------------------------: | --------------------: |
| Iterazioni utente → MVP                         |                  **1** ✅ |             2 (1 + 1 fix CORS) |              **3** ❌ |
| Tempo attivo sessione                           |                     19:24 |                          21:11 |                 13:49 |
| Costo fatturato                                 |                   $5.4903 |                        $1.8812 |           **$0.0674** |
| LLM API call                                    |                    **89** |                            114 |                   110 |
| Output tokens (reale)                           |                **97.280** |                         40.322 |                49.870 |
| Peak context (max 1 call)                       |     276.432 (27,6% di 1M) | 189.673 (**51,0%** di 372K) ⚠️ | 160.572 (16,1% di 1M) |
| **Cache write (reale)**                         |            **275.803** ✅ |                           0 ❌ |                  0 ❌ |
| Input uncached (reale)                          |                **178** ⭐ |                        255.496 |               119.602 |
| LOC sorgente                                    |                 **3.479** |                          2.132 |                 2.505 |
| Componenti React                                |                         6 |                              6 |    **10** (ma 0 test) |
| Tool MCP invocati                               |                        23 |                         **30** |                    10 |
| Tool MCP distinti                               |                        12 |                         **19** |                    10 |
| Score specifiche (8)                            |                 **6.5/8** |                          5.5/8 |                 3.5/8 |
| Aderenza MCP (10 criteri)                       |                  **9/10** |                           7/10 |                  4/10 |
| ADR generati                                    |                     **7** |                              6 |                     3 |
| Test (vitest + a11y)                            |                 ✅ 6 file |                      ✅ 6 file |                  ❌ 0 |
| Handoff                                         |                 ✅ datato |              ✅ Mintlify-style |         ✅ non datato |
| SSRF guard                                      | ✅ DNS-lookup + ipaddr.js |       ✅ range check + 2MB cap |     🟡 solo localhost |
| Zero-CSS-class (data-part + adoptedStyleSheets) |                        ✅ |   ❌ (`_global.css` 561 righe) |           🟡 monolite |
| Bundle frontend                                 |      **166K JS + 5K CSS** |                     391K JS ⚠️ |    n/a (mai buildato) |

### 3.2 Insight chiave (bookmarks)

1. **Stessa storia del phonebook, confermata su full-stack**: Sonnet 1 prompt → MVP completo; cache write 275.803 → input fresh **178 token** su 89 call → risparmio stimato **$50-70/sessione**.
2. **GPT al 51% della context window** (189K/372K) — ha headroom < 1× il peak: una sessione più lunga l'avrebbe portato al limite (truncation).
3. **Costo MCP < 6% del totale** (Sonnet $0.30 stimato su $5.49).
4. **Tool error rate**: Sonnet 2.9% vs GPT 11.3% vs DS4 12.5% — Sonnet pianifica prima di eseguire (meno trial-and-error).
5. **DS4 ha "barato" diversamente**: 10 componenti (più di tutti) ma 0 test, persistenza JSON file, SSRF solo localhost, mai buildato (`dist/` vuoto).
6. **Pattern d'uso MCP emergente**: GPT = loop check→fix (5×); Sonnet = `process_adr` (5×) + indice globale skill (`get_all_webidoo_skills_index` 1×, 11.565 chars) poi drill-down chirurgico; DS4 = pochi tool in `mode:"full"`.

---

## 4. Cross-benchmark: cosa resta vero in entrambi

| Claim                                                                                                             | Phonebook         |               Bookmarks               |
| ----------------------------------------------------------------------------------------------------------------- | ----------------- | :-----------------------------------: |
| Il modello che usa attivamente il caching (Sonnet) scrive ~280K cache_write → input fresh a singola cifra         | ✅ 59 token       |             ✅ 178 token              |
| Costo MCP server < 1-6% del costo totale task                                                                     | ✅ < 1%           |                ✅ < 6%                |
| 1 prompt → MVP corretto solo per Sonnet (il più caro in $)                                                        | ✅                |                  ✅                   |
| DeepSeek = best value monetario ($0.07-0.08) ma 3-4 iterazioni → TCO reale più alto (tempo utente ~€7-9 in retry) | ✅                |                  ✅                   |
| GPT usa più tool MCP ma aderenza peggiore                                                                         | ✅ 25 tool / 4/11 |           ✅ 30 tool / 7/10           |
| Nessuno dei 3 ha sfruttato caveman/tokensave in lettura                                                           | ✅ 0/3            | ✅ 0/3 (nonostante prompt esplicito!) |
| Bundle production decoupling dalle LOC sorgente                                                                   | ✅ 228-252KB      |            ✅ 166K vs 391K            |

### Il claim "~5% dello sforzo totale" dell'abstract

- Supportato da: costo MCP < 1-6% del costo monetario del task (entrambi i report).
- Da formulare in deck come: _"the MCP server accounted for ~5% (or less) of the total project cost/effort — the bottleneck is model inference, not tooling."_
- ⚠️ I report misurano **costo**, non ore-uomo. Se si vuole "effort" in senso di tempo/context, la metrica proxy è: tool result chars ≈ 68-108K chars su sessioni da 11-19M cacheRead → singola cifra percentuale. Coerente.

---

## 5. Riconciliazione numeri (open question da validare col proprietario)

| Metrica             | Abstract talk | README pix-galaxy-mcp v1.0.0 | Report (webidoo-ai-mcp)  | Verdetto da deck                                                                                             |
| ------------------- | ------------- | ---------------------------- | ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Tools               | 235           | **90**                       | 207                      | Usare 90 (pix-galaxy-mcp) + nota "la variante nei benchmark ne esponeva 207"                                 |
| Prompts + resources | 146           | 21 prompts + 168 resources   | 3 get_* + 1 router       | Usare 21/168 (pix-galaxy-mcp)                                                                                |
| Skills              | 70            | 80                           | n/d                      | Usare 80                                                                                                     |
| Progetti            | 4             | n/a                          | 2 (phonebook, bookmarks) | Casa base: 2 progetti dimostrati + eventuale citazione altri PoC (link-manager, token-forge…) senza metriche |
| Sessioni            | 12            | n/a                          | 6 (2 p × 3 m)            | Usare 6 misurate (2 report da cui derivano TUTTI i numeri slide)                                             |

**Decisione (intervista utente, M0)**: **usare i numeri verificati** — 90 tools / 168 resources / 21 prompts / 80 skills (pix-galaxy-mcp v1.0.0) e 2 progetti / 6 sessioni misurate. L'abstract della talk va corretto di conseguenza. Nota storica in speaker notes: la variante aziendale `webidoo-ai-mcp` espose più surface (207 tools) ai tempi dei benchmark (2026-07-11).

### Altri PoC esistenti (senza report benchmark, potenziali citazioni "ecosystem")

`link-manager`, `react-gantt`, `token-forge`, `vinyl-collection`, `calculator`, `jooice-scheduler`, `react-scheduler` — tutti in `~/Projects/work/webidoo/poc/`. Alcuni hanno ADR e docs (react-gantt: 10 ADR; react-scheduler: 13 ADR) → utili come slide "real world adoption" senza numeri.

---

## 6. Numeri "in pillole" per le slide finali

```
💰 COSTO TOTALE (2 task)   Sonnet $10.87 > GPT $3.42 > DS4 $0.14
🔄 PROMPT UTENTE           Sonnet 1-1 < GPT 1-2 < DS4 3-4
📞 LLM API CALL            Sonnet 57-89 < GPT 70-114 < DS4 71-110
📝 RIGHE CODICE            Sonnet 5708-3479 > DS4 4239-2505 > GPT 805-2132
🎯 ADERENZA MCP            Sonnet 8/11-9/10 > DS4 7/11-4/10 > GPT 4/11-7/10
💾 CACHE WRITE             Sonnet 285K-276K ✅ | GPT 0 ❌ = DS4 0 ❌
📤 OUTPUT TOKENS           Sonnet 104K-97K > DS4 83K-50K > GPT 35K-40K
🛠️ MCP TOOLS/MAX          Sonnet 5-23 < GPT 25-30 > DS4 14-10
🗜️ CAVEMAN / TOKENSAVE    0/3 letture in entrambi i test
```

**Messaggio "honest" per il deck** (esperimenti falliti / caveat):

- zero dei 3 modelli ha attivato caveman/tokensave in lettura — anche quando il prompt lo chiedeva esplicitamente (bookmarks)
- GPT "baro" su architettura (monolite phonebook, CSS a classi); DS4 "baro" su integrazione (0 test, no build, SSRF minimale)
- i modelli hanno interpretato i tool MCP in modo molto diverso (check/fix-loop vs mode:full vs indice globale)
- manca una sessione "baseline senza server" → il delta _grazie al_ server è dedotto, non misurato
