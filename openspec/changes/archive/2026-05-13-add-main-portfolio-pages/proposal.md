## Why

The pages exist and the content model is in place, but the current look is a stark neutral/rose Tailwind sketch — it does not yet feel "elegant, artistic, warm, and professional," and the booking call-to-action is buried on the Home hero alone. Visitors landing on About, Projects, Workshops, Events, Gallery, or Videos have no in-page nudge toward booking. The placeholder media slots (gallery tiles, video thumbnails) are also plain grey boxes that don't communicate "this is where a photo / video goes."

This change is a visual and structural pass over the existing pages: introduce a warm artistic theme (palette, typography, spacing), turn each domain page into a consistent card-based layout, add a recurring "Book Nikoleta" CTA strip near the bottom of every page, and replace the plain grey placeholders with branded placeholder slots that clearly show their intended media role.

## What Changes

- Introduce a warm, artistic theme: serif display headings, sans body, an off-white / warm-paper background, a muted rose / terracotta accent, and softer borders. Apply via Tailwind utility classes and a small token layer in `src/index.css`.
- Add a shared `BookingCTA` section component, rendered near the bottom of every page (except `/contact` itself), reading `bookingCtaLabel` from `profile`.
- Add a shared `Card` component used by Projects, Workshops, Events, and Videos for a consistent visual rhythm.
- Add a shared `PlaceholderImage` component for gallery tiles and video thumbnails — a clearly-marked branded placeholder with an icon and caption, replacing the plain grey box.
- Refresh the Home page Hero with a stronger visual hierarchy and a secondary "About" link beside the primary CTA.
- Refresh About to be reading-friendly (max-width, line-height, drop cap on the first paragraph).
- Refresh Gallery to a warmer mosaic layout (still grid, but with rounded corners and warm tones).
- Keep every visual change inside Tailwind / CSS-token layer. No new dependencies; no images shipped (placeholders remain CSS/SVG-only).

## Capabilities

### New Capabilities

- `visual-theme`: A small, documented set of theme tokens (color, typography, spacing scale) and shared visual primitives (`Card`, `BookingCTA`, `PlaceholderImage`) used by pages.

### Modified Capabilities

- `site-pages`: Adds a requirement that the booking CTA is reachable from every non-Contact page, and that domain pages render their content as cards. Strengthens the Home Hero requirement (visual hierarchy + secondary action) without changing its booking behavior.

## Impact

- New files: `src/components/Card.tsx`, `src/components/BookingCTA.tsx`, `src/components/PlaceholderImage.tsx`.
- Modified files: `src/index.css` (theme tokens / base typography), `src/components/Layout.tsx` (inserts `BookingCTA` for non-Contact routes), `src/components/Header.tsx` and `Footer.tsx` (theme classes), every page in `src/pages/`.
- No new runtime dependencies. No backend, CMS, Next.js, or Supabase.
- `npm run build` must continue to pass with no TypeScript or Vite errors.
- Content files and routing are unchanged.
