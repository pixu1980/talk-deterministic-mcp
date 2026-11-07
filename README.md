# Deterministic MCP Server

An English-language Reveal.js talk about shared engineering standards for people and coding agents. The presentation follows nine chapters across three acts, from the need for continuity to experiments, the solution, case studies and contribution.

## Requirements

- Node.js and pnpm.
- The sibling workspace `../talks-libraries/packages/*`, as configured in `pnpm-workspace.yaml`.

Install dependencies with `pnpm install`. The lockfile includes the sibling workspace importers; their manifests must match for a frozen install.

## Commands

```bash
pnpm dev       # Parcel development server on port 6001; predev clears dist and cache
pnpm run build # Production deck in dist/; prebuild clears dist and cache
pnpm run lint  # Biome lint
node --test tests/*.test.mjs
```

For a development build that does not modify the tracked production output, choose an available port and run:

```bash
pnpm exec parcel src/index.html -p 3001 --dist-dir .dev-dist
```

## Deck structure

`src/index.html` loads `src/slides/slides.html` with PostHTML includes. The chapter folders are:

| Chapter       | Directory                      |
| ------------- | ------------------------------ |
| Introductions | `src/slides/01-introductions/` |
| What I do     | `src/slides/02-what-i-do/`     |
| The need      | `src/slides/03-the-need/`      |
| Experiments   | `src/slides/04-experiments/`   |
| The idea      | `src/slides/05-idea/`          |
| The solution  | `src/slides/06-solution/`      |
| Case studies  | `src/slides/07-case-studies/`  |
| Contribute    | `src/slides/08-contribute/`    |
| Goodbye       | `src/slides/outro/`            |

A partial can contain more than one Reveal section when a topic needs more space. The restored outro uses the original `master` composition: wrap-up, TAF and thanks; its links include remains commented out. `src/slides/_archive/` contains earlier material and `src/slides/_boilerplate/` contains reusable examples; neither is part of the active composition.

The title uses `src/scripts/matrix-code.js`, which respects reduced-motion preferences. Images, QR codes and audio are in `src/assets/`; the case-study previews identify sample contacts and the mocked empty bookmarks API.

## Project documentation

- `docs/plans/execution-plan.md`: phases, current status and pending decisions.
- `docs/research/slide-map.md`: active slide inventory and source notes.
- `docs/research/benchmark-evidence.md`: historical benchmark evidence and limitations.
- `docs/research/demo-runbook.md`: historical demo notes; revalidate against the current server before use.

Benchmark results describe two projects and six recorded sessions, not a controlled no-server baseline. The current RuleMCP surface can differ from the historical counts; consult its current census rather than treating older numbers as live values.

## Accessibility and release

Run the tests and lint before building. The speaker confirmed that the TAF audio contains only music; its caption labels the outro music. The restored outro has the original thanks text and commented-out links. No live demo is planned. Check the final QR destinations and rehearse the talk before publishing. Do not treat a successful build as a deploy or a rehearsal.
