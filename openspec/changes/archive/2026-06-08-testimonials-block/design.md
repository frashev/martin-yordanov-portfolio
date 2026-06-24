## Context

The site has a complete content layer (`src/content/`) where all page copy lives as typed TypeScript objects. Components like `Card` and `Reveal` already exist and follow the established style tokens (`--ink`, `--accent`, `--paper`, `--soft-border`). The `TestimonialsSection` fits this pattern exactly — a new content file + a new presentational component, no routing changes.

## Goals / Non-Goals

**Goals:**

- Add a `Testimonial` type and `testimonials.ts` data file.
- Build a `TestimonialsSection` component that renders quote cards with attribution.
- Render 2–3 testimonials on Home (trust signal above the fold) and a full list on Workshops (student-focused, close to the booking decision).
- Use existing design tokens and the `Reveal` scroll-reveal wrapper — no new CSS variables.

**Non-Goals:**

- No CMS, no database, no admin UI for managing quotes. Content is edited directly in `src/content/testimonials.ts` — same pattern as every other content file.
- No star ratings, no external review platform integration.
- No filtering by page (all testimonials are a single array; each page decides how many to show via a `limit` prop).

## Decisions

**Single array, limit prop** — one `testimonials: Testimonial[]` export, rendered via `<TestimonialsSection limit={3} />` on Home and without a limit on Workshops. Avoids duplicate data and keeps the component reusable (stats band, video hero page can reuse it too).

**Quote card, not a carousel** — a static horizontal scroll / wrapping grid beats a JS carousel: zero added dependencies, works without JS, accessible by default, and fits the minimal visual identity. On mobile it collapses to a single-column stack.

**Attribution model: name + role** — `Testimonial` has `quote`, `author`, and `role` (e.g. "Student, Contemporary Intensive 2024"). `avatarSrc` is optional — gracefully omitted when no photo is provided (which is the placeholder state).

## Risks / Trade-offs

- **Placeholder quotes look fake** → clearly marked `// PLACEHOLDER` in the data file; the README note in `types.ts` already warns against fabricating real claims. Quotes stay neutral and generic until Martin provides real ones.
- **Long quotes break card rhythm** → `role` is capped visually; `quote` gets `line-clamp-4` on Home's compact view. Workshops shows the full quote.
