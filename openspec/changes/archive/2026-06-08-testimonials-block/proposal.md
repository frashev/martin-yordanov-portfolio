## Why

The site is structurally complete but currently has no social proof — no quotes from students, collaborators, or event organisers. Adding a testimonials section turns visitor interest into trust before they click "Book a session."

## What Changes

- New `Testimonial` type added to `src/content/types.ts`.
- New `src/content/testimonials.ts` data file with placeholder quotes (student, collaborator, event organiser — one of each).
- New `TestimonialsSection` reusable component renders a row of quote cards with attribution (name, role).
- Section placed on **Home** page (2–3 quotes, high-visibility trust signal) and **Workshops** page (student-focused quotes, directly relevant to the booking decision).
- No new routes, no new dependencies, no backend changes.

## Capabilities

### New Capabilities

- `testimonials`: Quote cards section — typed content model, reusable display component, placement on Home and Workshops pages.

### Modified Capabilities

<!-- None — this is purely additive. -->

## Impact

- `src/content/types.ts` — add `Testimonial` type.
- `src/content/testimonials.ts` — new data file (placeholder quotes).
- `src/components/TestimonialsSection.tsx` — new component.
- `src/pages/Home.tsx` — import and render `<TestimonialsSection />`.
- `src/pages/Workshops.tsx` — import and render `<TestimonialsSection />`.
- No routing changes, no new packages, no Supabase changes.
