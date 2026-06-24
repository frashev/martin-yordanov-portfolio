## Context

Two prior changes shipped: `create-site-foundation` (routing, layout, baseline pages, Tailwind v4) and `add-content-model` (`profile`, `navigation`, `media`, plus per-domain typed arrays). The site renders, but its look is a sketch and the booking funnel relies entirely on the Home hero CTA. This change is purely a visual + structural refinement on top of the existing foundation. No new data, no new routes.

## Goals / Non-Goals

**Goals:**

- A coherent warm-artistic theme expressed through Tailwind utilities and a small CSS-token layer.
- Card-based rhythm across the four list pages (Projects, Workshops, Events, Videos).
- A site-wide recurring booking CTA so visitors deep in About, Gallery, or Videos can act without scrolling back to Home.
- Branded placeholder media tiles that signal "image here" / "video here" rather than looking like layout bugs.
- Reading-friendly About page.

**Non-Goals:**

- No real imagery, fonts loaded from Google, or third-party icon set in this change. (Icons are inline SVG; fonts are system-stack with a serif fallback.)
- No dark mode in this change.
- No animation library; only CSS transitions where they fall out naturally.
- No new routes or content fields. The Hero secondary "About" link points to an existing route.

## Decisions

### Theme tokens

- Defined as Tailwind utility classes used consistently across components. A small set of CSS custom properties in `src/index.css` for things Tailwind utilities don't capture cleanly (e.g. a paper-tone body background, the heading serif stack).
- Palette intent: warm off-white background, deep neutral ink for text, terracotta/rose accent for emphasis, a soft warm-gray for card surfaces and borders.
- Typography intent: a serif display stack for `<h1>`/`<h2>` (e.g. `Georgia, "Iowan Old Style", "Apple Garamond", serif`) via the existing system stack; sans for body.
- Rationale: Tailwind v4 supports `@theme` and arbitrary classes well; we keep tokens close to the components and avoid a separate design-system package. No web-font network request keeps the site fast and self-contained.

### Shared primitives

- `Card` (`src/components/Card.tsx`): renders a `<li>` (when used in a list) or `<article>` with the warm card surface, padding, rounded corners, subtle border, hover lift. Accepts children plus optional `title` and `meta` props for the common header pattern used by Projects, Workshops, Events, Videos.
- `BookingCTA` (`src/components/BookingCTA.tsx`): a centered banner section with a heading, short prompt, and the primary CTA button linking to `/contact`. Reads `bookingCtaLabel` from `profile`.
- `PlaceholderImage` (`src/components/PlaceholderImage.tsx`): a tile with an inline SVG icon (camera for images, play for videos), aspect ratio (`square` or `video`), and a small caption underneath. Used by Gallery and Videos.

### Site-wide CTA placement

- `Layout.tsx` reads the current path via `useLocation()` and renders `<BookingCTA />` between `<Outlet />` and `<Footer />` on every route except `/contact`.
- Alternative considered: render it inside each page component. Rejected — duplicates code and is easy to forget on future pages.

### Hero refresh

- Two-column on `md+` (text left, decorative placeholder right — an inline SVG monogram, still no shipped image). Single-column stacked below `md`.
- Primary CTA "Discuss a project" → `/contact`; secondary text link "Read about Martin" → `/about`.

### About reading layout

- `max-w-prose` for body; first paragraph gets an initial-letter drop cap via Tailwind utilities (`first-letter:` variants); section heading uses the serif stack.

### Gallery and Videos

- Gallery renders a 1/2/3/4-column responsive grid of `PlaceholderImage` (aspect square).
- Videos renders the existing 1/2/3-column grid; each card uses `PlaceholderImage` (aspect video) above the title/summary.

## Risks / Trade-offs

- **System serif stacks render differently per OS** → Acceptable: the theme tolerates serif-family variance; we are not pixel-matching a brand spec yet.
- **`first-letter:` drop cap looks awkward on very short first paragraphs** → Mitigation: the placeholder bio has three paragraphs, the first is multi-sentence; if real copy starts with one short sentence the maintainer can drop the utility in one place.
- **`BookingCTA` could feel repetitive on short pages** → Mitigation: the banner is compact (single row at `md+`) and visually distinct from card sections, so it reads as a footer-adjacent action rather than a third hero.
- **A future testimonials / press page would need to opt in to or out of `BookingCTA`** → Mitigation: the exclusion list lives in one `useLocation` check in `Layout.tsx`, easy to extend.
