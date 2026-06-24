## Why

The site has no at-a-glance credibility signal — a visitor can't immediately grasp the scale of Martin's experience without reading paragraphs of bio copy. A stats band (a horizontal row of key numbers) delivers that in one glance, directly supporting the booking decision.

## What Changes

- New `StatItem` type added to `src/content/types.ts`.
- New `src/content/stats.ts` data file with 4 placeholder stat items (e.g. years of experience, countries, students trained, productions).
- New `StatsBand` reusable component renders a full-width row of number + label pairs.
- Component placed on **Home** page (below the testimonials section) and **About** page (below the bio paragraphs).
- No new routes, no new dependencies, no backend changes.

## Capabilities

### New Capabilities

- `stats-band`: Typed stat items content model + full-width display component, placed on Home and About pages.

### Modified Capabilities

<!-- None — purely additive. -->

## Impact

- `src/content/types.ts` — add `StatItem` type.
- `src/content/stats.ts` — new data file (placeholder numbers).
- `src/components/StatsBand.tsx` — new component.
- `src/pages/Home.tsx` — render `<StatsBand />` below the testimonials section.
- `src/pages/About.tsx` — render `<StatsBand />` below the bio paragraphs.
- No routing changes, no new packages, no Supabase changes.
