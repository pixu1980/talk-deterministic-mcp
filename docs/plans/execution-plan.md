# Execution Plan - Talk "Deterministic MCP Server"

> **Repo**: `talk-deterministic-mcp` (skeleton talk-template, reveal.js + Parcel + `@pixu-talks/*`)
> **Soggetto**: `pix-galaxy-mcp` - MCP server deterministico per l'ecosistema pix-* skill
> **Fonti**: `~/Projects/pixu1980/ai/pix-galaxy-mcp/` (server) · `pix-galaxy-mcp-phonebook-benchmark.md` · `pix-galaxy-mcp-bookmarks-benchmark.md` (evidence)
> **Stile**: template attuale (`talk-deterministic-mcp`) + concetti riciclati da `talk-aidd-from-spec-to-app`

---

## Input dall'intervista

| Decisione              | Valore                                                                                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| Titolo lavorativo      | **Deterministic MCP Server**                                                                          |
| Evento                 | Da decidere (talk flessibile e riusabile)                                                             |
| Durata                 | 25-30 min (~20-25 slide)                                                                              |
| Lingua                 | **Inglese** (index.html attuale è `lang="it"` → da cambiare)                                          |
| Pubblico               | Dev, conosce poco MCP/agentic → serve un mini-intro a MCP                                             |
| Narrativa              | **What → Why → How → Proof → Future** (mix 30/40/30)                                                  |
| Benchmark              | **Entrambi** i report come proof-points (tabelle KPI ricreate in HTML/CSS)                            |
| Relazione server       | `pix-galaxy-mcp` = stesso progetto **rinominato** in `pix-galaxy-mcp` (narrato come evoluzione)       |
| Demo live              | ① install + doctor ② gateway check/apply con anteprima ③ benchmark riprodotto dal vivo                |
| Riferimento stilistico | talk-deterministic-mcp (template) + talk-aidd (concetti: skills, repeatability, adoption)             |
| Elementi template      | **TUTTI** (intro _pixu/_doodle/_main-topic, summary, boilerplate topics, outro TAF+links+QR, speaker) |
| Visual                 | Diagrammi architettura **SVG** + tabelle benchmark **KPI**                                            |
| Priorità               | Content-first (struttura completa navigabile) + analisi benchmark/riconciliazione numeri prima        |

## Abstract approvato (spina narrativa)

> What happens when a local MCP server is designed to **enforce engineering standards** rather than simply exposing tools?
> After six months of experiments: `pix-galaxy-mcp` - Agent-Skills-focused MCP server con control engine deterministico,
> usato in 4 progetti reali × 3 modelli → 12 sessioni di misura. Risultati che sfidano assunzioni comuni:
> il server MCP ≈ **5% dello sforzo totale** del progetto, e il **prompt caching** altera significativamente i costi.
> Analisi tecnica onesta basata su token fatturati, codice generato, compliance score, outcome architetturali ed esperimenti falliti.
> Il server non sostituisce la qualità del modello, ma trasforma convenzioni vaghe in **salvaguardie ingegneristiche misurabili**.

---

## ✅ Decisione (M0) - riconciliazione numeri: USARE I NUMERI VERIFICATI

> L'abstract della talk viene aggiornato: la deck usa **90 tools / 168 resources / 21 prompts / 80 skills** (README pix-galaxy-mcp v1.0.0) e **2 progetti benchmark / 6 sessioni misurate** (phonebook + bookmarks). I numeri 235/146/70/4/12 dell'abstract originale vengono corretti nel deck e nella descrizione. Nota storica in speaker notes: la variante aziendale `pix-galaxy-mcp` esponeva più surface (207 tools) ai tempi dei benchmark.

### Discrepanza documentata (per riferimento)

L'abstract originale citava numeri che NON combaciavano con le fonti attuali:

| Metrica             | Abstract talk | README pix-galaxy-mcp (v1.0.0) | Report (pix-galaxy-mcp)                           |
| ------------------- | ------------- | ------------------------------ | ------------------------------------------------- |
| Tools               | 235           | **90**                         | 207                                               |
| Prompts + resources | 146           | 21 prompts + 168 resources     | 207 tool + 3 risorse + 1 router                   |
| Skills              | 70            | 80                             | "skill folder" frontend/backend/...               |
| Progetti testati    | 4             | n/a                            | 2 (phonebook, bookmarks - unici report esistenti) |
| Sessioni misurate   | 12            | n/a                            | 6 (2 progetti × 3 modelli)                        |

**Esito M0.2/M0.3**: scansionati tutti i PoC webidoo → nessun altro report benchmark (link-manager, react-gantt, token-forge, vinyl-collection, calculator, jooice-scheduler, react-scheduler hanno solo docs/ADR). **Decisione utente (interview): usare i numeri verificati.**

---

## Milestone

### M0 - Evidence pack & riconciliazione numeri (PRIMA di scrivere)

- [x] **0.1** Leggere integralmente i 2 report benchmark; estrarre tabelle KPI, verdetti, insight chiave
- [x] **0.2** Scansionare i PoC webidoo per eventuali altri report/sessioni benchmark (link-manager, react-gantt, token-forge, vinyl-collection, calculator, jooice-scheduler, react-scheduler) → nessun altro report
- [x] **0.3** Riconciliare i numeri abstract vs README vs report; decisione utente = numeri verificati (90/168/21/80, 2 p, 6 sessioni)
- [x] **0.4** Produrre `docs/research/benchmark-evidence.md` (fonte unica per le slide KPI/Proof)
- [x] **0.5** Definire slide map preliminare (29 slide) con annotazione fonte per ogni claim → `docs/research/slide-map.md`

### M1 - Baseline progetto

- [ ] **1.1** Rinominare package `talk-template` → `talk-deterministic-mcp` in `package.json`
- [ ] **1.2** `index.html`: `lang="en"`, `<title>` → "Deterministic MCP Server"
- [ ] **1.3** README.md del talk: titolo, descrizione, link deck live
- [ ] **1.4** `pnpm install` e verifica `pnpm run dev` (skeleton boilerplate compila)

### M2 - Slide map & struttura contenuti

- [x] **2.1** Definire topics.html: sezioni **What / Why / How / Proof / Future** con slide per sezione (file: 01-what.html, 02-why.html, 03-how.html, 04-proof.html, 05-future.html)
- [x] **2.2** Recyclage concetti talk-aidd (skills, problem, model, repeatability) come bridge narrativo (sezioni why/future/adoption)
- [x] **2.3** Redigere `docs/research/slide-map.md`: per ogni slide → contenuto, fonte, elemento template usato

### M3 - Contenuti: INTRO + WHAT (30%)

- [x] **3.1** Intro: _pixu, _doodle, _main-topic (doodle: "Same prompt, three models… one deterministic pair of rails"; main-topic: titolo + domanda guida + KPI 60s)
- [x] **3.2** Mini-intro MCP per dev non esperti (slide "MCP in 60 seconds": tools/resources/prompts/transport)
- [x] **3.3** Cosa espone il server: 90 tools, 168 resources, 21 prompts, 80 skills + minimal tool surface (10 tools)
- [x] **3.4** Il control engine deterministico: guardrails 18, gateway pix_gateway/pix_apply, receipt, fail-safe (slide WHAT + HOW/Ops)

### M4 - Contenuti: WHY (40%)

- [x] **4.1** Il problema: vibe coding senza controllo, costi token, iterazioni, qualità non misurabile
- [x] **4.2** Perché deterministico: mai LLM nel server → model-agnostic (Claude/GPT/Gemini/DeepSeek)
- [x] **4.3** Perché skills strutturate: qualità e meno iterazioni (1 prompt → MVP corretto al 1° colpo) + prompt verbatim code-walkthrough
- [x] **4.4** Il claim del ~5% dello sforzo + prompt caching altera i costi (fonte: benchmark) + tabella TCO dollars-vs-user-time
- [x] **4.5** Esperimenti falliti raccontati onestamente (fonte: report/§ discussioni)

### M5 - Contenuti: HOW (30%)

- [x] **5.1** Architettura: agent → transport (stdio/SSE) → MCP server SDK → registry → skills/BM25/guardrails (SVG in M9)
- [x] **5.2** Gateway deterministico: pix_gateway → guardrails check → receipt → pix_apply (flusso, SVG in M9) + "Receipt, not opinion" code-walkthrough
- [x] **5.3** Guardrail engine: 18 shared rules + framework/backend-specific checks
- [x] **5.4** Minimal tool surface (10 tools) per client con cap (Cursor/Copilot) e taglio token (in WHAT) + config mcp.json code-walkthrough
- [x] **5.5** Installer multi-agent (23 agent), daemon, docker, `doctor`, fail-safe (slide Ops)

### M6 - Contenuti: PROOF (benchmark)

- [x] **6.1** Tabella KPI phonebook (3 modelli: iterazioni, costi, tool call, cache) - ricreata in HTML/CSS
- [x] **6.2** Tabella KPI bookmarks (3 modelli) - ricreata in HTML/CSS
- [x] **6.3** Insight grafici: costo vs qualità, cache write, tool call MCP per modello (slide Insights)
- [x] **6.4** Screenshot/vetrine delle app prodotte nei PoC (phonebook, bookmarks) - card testuali ora, screenshot TODO: catturare da phonebook-sonnet46/bookmarks-sonnet5 prima della talk
- [x] **6.5** "Rispetto specifiche" comparison: MVP al 1° colpo vs follow-up + spec scores (slide Spec compliance)

### M7 - Demo live + runbook

- [x] **7.1** Runbook demo: install + `doctor` (verificato: v1.0.0, healthy, 90 tools) → `docs/research/demo-runbook.md`
- [x] **7.2** Runbook demo: gateway check/apply (`pix_tool_gateway` / `pix_tool_apply` - nomi reali verificati) con anteprima dry-run
- [x] **7.3** Runbook demo: benchmark riprodotto dal vivo (prompt abridged già in slide verbatim)
- [x] **7.4** Fallback: registrazioni/screenshot se la demo live rischia (annotato nel runbook); minimal mode verificato live = 10 tool

### M8 - FUTURE + takeaways + SUMMARY/OUTRO

- [x] **8.1** Future: roadmap del server (docs/04-roadmap-plans.md: Phase 3 token-saving già shipata) + slide "The final message"
- [x] **8.2** Takeaway principali (il messaggio chiave in 3 punti - wrap-up Works/Doesn't + Takeaways)
- [x] **8.3** Summary: _topics + _dive-in aggiornati; Outro: _wrap-up, _taf, _thanks, _links, QR codes (repo slides)
- [x] **8.4** Speaker slide standard (_pixu) mantenuta

### M9 - Asset & integrazione

- [x] **9.1** Diagrammi SVG architettura completi: arquitecture (agent→transport→SDK→registry→deterministic core) + gateway flow (prompt→gateway→guardrails→receipt→apply) in 03-how.html, classi .diagram centralizzate in styles/index.css, marker arrow condiviso, adattivi light/dark via currentColor + --r-highlight-color
- [ ] **9.2** QR codes: assets template presenti (slides-repo placeholder) - rigenerare i QR col repo reale al momento del primo deploy GH Pages (legato a M10.5)
- [x] **9.3** Fonti dei report benchmark marcate nelle slide Notes (benchmark-evidence refs in ogni slide Proof/Why)
- [x] **9.4** Verifica identità brand: brand.html standard, _pixu speaker mantenuto, tema @pixu-talks/theme con -->r-highlight-color per diagrammi

### M10 - QA & shipping

- [x] **10.1** `pnpm run build` → deck statico in dist/ ok (63 sezioni, CSS diagrammi inclusi)
- [x] **10.2** `pnpm run lint` + `pnpm run format` ok (9 errori residui = preesistenti della template: logo SVG senza title, TAF audio, button boilerplate - non dei file talk)
- [ ] **10.3** A11y review (lettore schermo su slide chiave), contrasti, focus - da fare: verificare diagrammi SVG (role img + aria-label già presenti) e tabelle su screen reader
- [ ] **10.4** Rehearsal notes per ogni sezione (timing 25-30 min) - runbook parziale; da completare con timing per sezione
- [ ] **10.5** Deploy GitHub Pages + README link live deck - servono tag v*.*.* e QR rigenerati (9.2)
- [x] **10.6** Commit intermedio fatto (6dbdc02). Tag rel(0.x.0) post-deploy

---

## Ordine di esecuzione

> Dopo il salvataggio di questo piano si esegue **M0.1–M0.5** (evidence pack first, come richiesto), poi si chiede conferma prima di procedere con M1.

## File di riferimento

- Server: `~/Projects/pixu1980/ai/pix-galaxy-mcp/README.md`, `docs/01-product-architecture.md`, `docs/02-tools-operations.md`, `docs/04-roadmap-plans.md`
- Report: `~/Projects/work/webidoo/poc/phonebook/docs/reports/pix-galaxy-mcp-phonebook-benchmark.md`, `~/Projects/work/webidoo/poc/bookmarks-manager/docs/reports/pix-galaxy-mcp-bookmarks-benchmark.md`
- Stile: `../talk-aidd-from-spec-to-app/src/slides/` (topics: 00-skills…07-adoption)
