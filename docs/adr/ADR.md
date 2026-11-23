# Architecture Decision Records

Every decision this project has taken, newest first. The numbered files in
this directory are the source of truth; this index is generated from them by
`rule_tool_process_adr`, so editing it by hand is work the next call throws away.

## Index

| #                                                            | Title                                          | Date       | Status   | Tags                |
| ------------------------------------------------------------ | ---------------------------------------------- | ---------- | -------- | ------------------- |
| [001](001-keep-deck-overlays-free-of-scrollable-overflow.md) | Keep deck overlays free of scrollable overflow | 2026-11-23 | accepted | slides, css, reveal |

## What each decision says

The opening sentence of each decision and of what it cost, lifted from the
file. Where a line stops short the rest is in the ADR.

| ADR                                                          | Decision                                                                                                                                                                                                                        | Consequence                                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [001](001-keep-deck-overlays-free-of-scrollable-overflow.md) | reveal.js centers a slide with top = (deck height - section.scrollHeight) / 2. Any descendant that overflows the slide increases scrollHeight, so the offset clamps to 0. Overlays on a slide must therefore be painted with... | The veil is identical because background-size 124% 210% reproduces the old inset canvas. |

## By theme

Tags carried by 3 or more decisions. A decision appears under every
theme it carries, and the early ADRs that predate the tag field are listed last.

## Operating rules

- Write an ADR with rule_tool_process_adr when the project ADR policy allows it (default: at handoff; mid-task only under full).
- Never rewrite an accepted decision. Supersede it with a new one that says why.
- Never edit this file. Edit the ADR and let the next call regenerate it.
