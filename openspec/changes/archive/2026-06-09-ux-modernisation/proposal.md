# Change: UX Modernisation

_Research basis: `docs/ux-improvements-research-2026.md` (three-agent web research, 2026-06-09)._

## Why

The site launched with solid technical foundations (SEO, dark mode, accessibility, contact backend) but the visual experience is static — sections appear flat, page transitions are hard cuts, and there is no floating booking CTA. Modern maker portfolios (Wayne McGregor, Hofesh Shechter, Rachele Perla) all use scroll-driven reveals and cinematic page transitions as a baseline. Visitors judge a maker's quality within 3 seconds. A site that doesn't move feels like a brochure from 2019.

Analytics is intentionally split into its own standalone OpenSpec change so this visual polish change can finish without waiting for an analytics vendor signup.

## What Changes

All work in this change is **zero new dependencies** unless noted. Each item is scoped to the smallest safe implementation.

### Phase 1 — Zero-dependency visual polish (no content needed)

1. **View Transitions** — add `viewTransition` prop to every `<Link>` in `Header.tsx`. Native browser cross-fade between pages. Supported: Chrome 126+, Edge 126+, Safari 18+.

2. **Scroll-reveal hook** — `src/lib/useReveal.ts` using `IntersectionObserver`. One CSS class `.reveal` (translateY 20px → 0). Applied to: gallery cards, testimonial cards, stats items, section headings, project cards, workshop cards. Motion remains enabled even when `prefers-reduced-motion: reduce` is reported.

3. **Hero image preload** — `<link rel="preload" as="image" href="/hero-image.jpg">` in `index.html`. Fixes Largest Contentful Paint score.

4. **Supabase preconnect hint** — `<link rel="preconnect">` pointing to the Supabase host in `index.html`. Shaves 100–200ms off first contact form interaction.

5. **Floating inquiry CTA** — a fixed-position "Discuss a project" button that slides in after scrolling past the hero (≈300px). Suppressed on `/contact` (same logic as the existing `BookingCTA`). Pure CSS + a `useScrollDepth` hook (no library).

6. **Bento grid on Gallery page** — asymmetric CSS Grid (some items span 2 columns) replacing the uniform grid. Pure CSS Grid, no layout restructuring.

### Phase 2 — One new dependency (decision required per item)

7. **Multi-step contact form** — `react-hook-form` (25KB). Three steps: Name+Email → Inquiry type → Message+Submit. Same Supabase backend. Converts 86% better on mobile per research.

8. **Testimonial carousel** — `embla-carousel-react` (~15KB). Replaces static card row. Keyboard-accessible, with autoplay enabled even under `prefers-reduced-motion: reduce`.

### Phase 3 — Needs content from client (code is ready or trivial)

9. **Video hero** — `heroVideoSrc` field already exists in `profile.ts` (commented out). One-line uncomment when Martin provides an MP4. No build work needed.

10. **Calendly embed** — one embed snippet on the Contact page. Requires Martin to create a Calendly account and configure availability.

11. **Instagram live feed** — `react-ig-embed` or Behold component. Requires real Instagram URL (all social links currently `#`).

### Moved to standalone change

12. **Cookie-free analytics** — moved to `openspec/changes/add-cookie-free-analytics/` because it requires an owner decision and vendor signup before implementation.

## Capabilities

### New Capabilities

- `ux-motion`: Scroll-reveal animations and view transitions — entry points and components covered.
- `floating-cta`: Floating inquiry CTA behaviour — trigger depth, suppression rules, z-index contract.

### Modified Capabilities

- `editorial-motion`: Extended to cover the scroll-reveal hook (was previously only the initial entrance animations).
- `contact-form` _(Phase 2 only)_: Multi-step flow, validation schema, step state management.

## Non-Goals

- No 3D, WebGL, or scroll-parallax depth effects — too heavy for a small portfolio site, and content isn't ready for it.
- No gamified navigation — not appropriate for the brand.
- No AI chatbot — outside scope.
- No migration to Next.js — stack is correct for Cloudflare Workers deployment.

## Impact

- **Routes affected:** All (view transitions, scroll-reveal); `/` (floating CTA); `/gallery` (bento grid); `/contact` (multi-step form, Calendly).
- **Content layer:** No changes to `src/content/` for Phase 1. Phase 3 items require client content.
- **Supabase backend:** Unchanged in Phases 1 and 3. Phase 2 multi-step form still writes to the same `contact_messages` table.
- **New dependencies:** Zero for Phase 1. One per Phase 2 item (decision per item before implementation).
