## Context

The site uses a content layer (`src/content/`) for all page copy and a small set of reusable components (`Card`, `Reveal`, `StatsBand` will join them). The existing `TestimonialsSection` established the pattern: typed data file + presentational component + `Reveal` wrapper. `StatsBand` follows the same pattern but is structurally simpler — a single horizontal strip, no cards.

## Goals / Non-Goals

**Goals:**

- Add a `StatItem` type (`value` + `label`) and a `stats.ts` data file with 4 placeholder entries.
- Build a `StatsBand` component: full-width strip, numbers large and accented, labels small and muted.
- Render it on Home (below testimonials) and About (below bio) as a repeated trust anchor.
- Use existing design tokens only — no new CSS variables.

**Non-Goals:**

- No animated counting (number-count-up animation) — that adds JS complexity for marginal gain; can be added later as a tiny standalone enhancement.
- No icons per stat — keeps the band clean and fast to implement. Icon support can be added to `StatItem` later as an optional field.
- No per-page filtering — one shared array, same data on both pages.

## Decisions

**`value` is a string, not a number** — stats like "15+" or "3 continents" need a string anyway. Keeping it a string avoids a coerce-to-display-string step and gives content editors full control over formatting.

**Full-width band, not a card** — the stats band should feel structurally distinct from the testimonial cards. A borderless, lightly tinted full-bleed strip (using `--paper-alt` or a subtle `--soft-border` top/bottom) creates visual separation without a heavy box.

**4 stats** — a safe default for the grid (2×2 on mobile, 4×1 on desktop). More than 4 gets crowded on mobile; fewer than 3 looks sparse. The array can hold any count and the grid will reflow gracefully.

## Risks / Trade-offs

- **Placeholder numbers look arbitrary** → values are clearly marked `// PLACEHOLDER` in the data file; the no-fabrication rule in CLAUDE.md applies.
- **"Full-bleed" strip needs careful padding** → the band uses `w-full` with horizontal padding matching the site's max-width sections, keeping text aligned with the rest of the page.
