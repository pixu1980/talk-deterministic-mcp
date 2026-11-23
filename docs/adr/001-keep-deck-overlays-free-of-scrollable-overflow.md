# 001: Keep deck overlays free of scrollable overflow

- **Date**: 2026-11-23
- **Status**: accepted
- **Tags**: slides, css, reveal
- **Author**: Emiliano Pisu <pisuemiliano.1980@gmail.com>

## Context

The title slide dims the matrix rain with a radial-gradient veil. An absolutely positioned ::after with inset: -55% -12% made the slide look correct but pushed the text to the top of the slide.

## Decision

reveal.js centers a slide with top = (deck height - section.scrollHeight) / 2. Any descendant that overflows the slide increases scrollHeight, so the offset clamps to 0. Overlays on a slide must therefore be painted with properties that create no scrollable overflow: section background-image with background-size, not a positioned pseudo-element with a negative inset.

## Consequences

The veil is identical because background-size 124% 210% reproduces the old inset canvas. The child z-index lift is gone. Any future overlay on a slide must follow the same rule, and the test suite asserts that section[data-matrix] keeps its background-image and no ::after.

## What would end this

reveal.js stops using scrollHeight to center slides, or the deck moves to a layout engine that ignores descendant overflow.

## Alternatives Considered

1. Keep the absolutely positioned ::after and center the content with flex on the section (overrides reveal layout and breaks slides without a veil)
1. Set overflow: hidden on the section (clips the veil, and hides legitimate overflow in content slides)
1. Render the veil in a separate element outside the slide (extra markup and z-index bookkeeping for a decoration)
