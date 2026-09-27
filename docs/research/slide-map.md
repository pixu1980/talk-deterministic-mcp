# Slide Map - "Deterministic MCP Server" (25-30 min, EN)

> Fonti per claim: **E** = benchmark-evidence.md · **R** = README pix-galaxy-mcp · **D** = docs/** (server) · **A** = talk-aidd (concetti riciclati)
> Template: tutti i componenti standard (intro/_pixu, _doodle, _main-topic, summary, boilerplate topics, outro TAF+links+QR, speaker)

## Struttura (target ~22 slide + 4 sezioni verticali topics)

### INTRO (~4 min, 4 slide)

| #   | Slide                                           | Contenuto                                                                                                                                                       | Fonte    | Template |
| --- | ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------- |
| 1   | `_pixu`                                         | Logo Pixu                                                                                                                                                       | -        | intro    |
| 2   | `_doodle`                                       | Doodle (MCP deterministico? robot/guardrail?)                                                                                                                   | -        | intro    |
| 3   | `_main-topic`                                   | **"What happens when a local MCP server is designed to enforce engineering standards rather than simply exposing tools?"** + agenda (What→Why→How→Proof→Future) | abstract | intro    |
| 4   | But what is an MCP server? (mini-intro per dev) | tool/resource/prompt, transport stdio/SSE, "il server NON chiama LLM" = deterministico                                                                          | R        | concept  |

### SUMMARY (~1 min, 1 slide)

| #   | Slide                  | Contenuto                         |
| --- | ---------------------- | --------------------------------- |
| 5   | `_topics` + `_dive-in` | Indice: WHAT/WHY/HOW/PROOF/FUTURE |

### TOPICS

#### WHAT - cosa è pix-galaxy-mcp (30%, ~5 slide verticali)

| #   | Slide                            | Contenuto                                                                                                                | Fonte | Template                   |
| --- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ----- | -------------------------- |
| 6   | Section opener                   | "What: a deterministic skill-server"                                                                                     | -     | boilerplate _01            |
| 7   | The ecosystem                    | 80 skills (frontend/backend/data/devops/toolchain/styleguide/process/platform/ai), installabile globalmente, local-first | R     | concept                    |
| 8   | Tools, Resources, Prompts        | 90 tools · 168 resources (pix://) · 21 prompts                                                                           | R     | code-walkthrough (tabella) |
| 9   | The deterministic control engine | guardrails (18 shared) + gateway `pix_gateway`/`pix_apply` + receipt                                                     | R/D   | concept                    |
| 10  | Minimal tool surface             | `PIX_GALAXY_MCP_MINIMAL_TOOLS=1` → 10 dispatcher tools (Cursor/Copilot, taglio token)                                    | R     | code+output                |

#### WHY - perché esiste (40%, ~6 slide)

| #   | Slide                                | Contenuto                                                                                                                         | Fonte | Template         |
| --- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- | ----- | ---------------- |
| 11  | Section opener                       | "Why: vibe coding without control is a slot machine" (riciclo da talk-aidd `_main-topic`)                                         | A     | boilerplate _01  |
| 12  | The problem                          | convenzioni vaghe → output non misurabile; costi; iterazioni                                                                      | A + E | concept          |
| 13  | Deterministic = model-agnostic       | mai LLM nel server → identico dietro Claude/GPT/Gemini/DeepSeek                                                                   | R     | concept          |
| 14  | Skills strutturate = qualità         | 1 prompt → MVP corretto al 1° colpo (solo Sonnet)                                                                                 | E     | concept          |
| 15  | Il claim del ~5% e il prompt caching | MCP < 1-6% del costo task; cache write ~280K → input fresh a singola cifra → $30-70 risparmiati                                   | E     | code-walkthrough |
| 16  | Esperimenti falliti (honest)         | 0/3 hanno attivato caveman/tokensave in lettura; modelli barano (monolite, no build, SSRF minimale); niente baseline senza server | E     | support-note     |

#### HOW - come è fatto (30%, ~5 slide)

| #   | Slide                        | Contenuto                                                                                             | Fonte | Template               |
| --- | ---------------------------- | ----------------------------------------------------------------------------------------------------- | ----- | ---------------------- |
| 17  | Section opener               | "How: architecture & gateway"                                                                         | -     | boilerplate _01        |
| 18  | Architettura                 | SVG: agent → transport stdio/SSE → MCP server SDK → registry tools/resources → skills+BM25+guardrails | R     | code-walkthrough (SVG) |
| 19  | Il gateway deterministico    | SVG flusso: prompt → pix_gateway → guardrails check → (receipt) → pix_apply; dry-run anteprima        | R/D   | code+output            |
| 20  | Guardrail engine + installer | 18 shared rules + framework-specific; installer multi-agent (23 agent), daemon, docker, `doctor`      | R     | concept                |

#### PROOF - i benchmark (proof-points, ~4 slide)

| #   | Slide                     | Contenuto                                                                             | Fonte  | Template        |
| --- | ------------------------- | ------------------------------------------------------------------------------------- | ------ | --------------- |
| 21  | Section opener            | "Proof: same prompt, 3 models, 2 projects" + metodo (sessioni reali, token fatturati) | E      | boilerplate _01 |
| 22  | Tabella KPI phonebook     | KPI master (3 modelli) ricreata in HTML/CSS                                           | E §2.1 | code+output     |
| 23  | Tabella KPI bookmarks     | KPI master (3 modelli) ricreata in HTML/CSS                                           | E §3.1 | code+output     |
| 24  | Insight + app screenshots | caching/costo/aderenza; screenshot phonebook+bookmarks realizzati                     | E §4   | code+output     |

#### FUTURE (~1-2 slide)

| #   | Slide             | Contenuto                                                                           | Fonte | Template |
| --- | ----------------- | ----------------------------------------------------------------------------------- | ----- | -------- |
| 25  | Future & adoption | roadmap (D), altre talk/it, ecosistema multi-MCP (tokensave), demo dei "next steps" | D     | concept  |

### OUTRO (~2 min, 4 slide)

| #   | Slide      | Contenuto                                                                                                                                       | Template |
| --- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| 26  | `_wrap-up` | 3 takeaway (deterministico=model-agnostic; skills strutturate=qualità; il server non sostituisce il modello ma rende le convenzioni misurabili) | outro    |
| 27  | `_thanks`  | TAF (musica)                                                                                                                                    | outro    |
| 28  | `_links`   | repo pix-galaxy-mcp, slides, github                                                                                                             | outro    |
| 29  | QR codes   | slides-repo, linkedin, pixu.dev                                                                                                                 | outro    |

## Demo (sotto-sezioni live, in WHAT/WHY/PROOF)

- **Demo 1** (dopo slide 10): install + `doctor` (~1 min)
- **Demo 2** (dopo slide 19): gateway check/apply con anteprima dry-run
- **Demo 3** (dopo slide 24): benchmark riprodotto dal vivo (1 prompt snippet, 1 modello)

## Invarianti

- **Lingua EN** (index.html → lang="en")
- Ogni claim numerico → annotazione fonte in `<aside class="notes">`
- Riciclo narrativo da talk-aidd: skills=procedures, slot machine, repeatability, adoption
- Tutte le tabelle benchmark ricreate in HTML/CSS (no screenshot)
