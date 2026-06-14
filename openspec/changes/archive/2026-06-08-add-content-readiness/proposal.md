## Why

When the client's photos and videos arrive, every upload should be a one-line content change — not a code change. Right now dropping a real image src into `src/content/media.ts` will show a raw `<img>` with no loading treatment; the hero will keep showing the monogram regardless; and `PlaceholderImage` has no upgrade path. This change builds the infrastructure layer so real media "just works" the moment it lands.

## What Changes

- A new `<GalleryImage>` component wraps `<img>` with `loading="lazy"` and a CSS-only blur-up (fade-in) effect: shows the warm gradient placeholder while the image loads, then fades the real image in on `onLoad`. No library, no JS-based blur, no base64 blobs.
- `PlaceholderImage` gains an optional `src` and `alt` prop. When provided it delegates to `<GalleryImage>`; when absent it renders the existing gradient tile unchanged. Fully backward-compatible — zero callsite changes needed.
- `Profile` type gains two optional fields: `heroSrc?: string` and `heroAlt?: string`. When set, `Home.tsx` renders the hero photo in place of the monogram SVG. When absent the monogram renders as today.
- `src/content/profile.ts` is not changed — `heroSrc` is intentionally absent until the client provides a real photo.
- CSS for the blur-up/fade-in is added to `src/index.css`, gated behind `prefers-reduced-motion: no-preference` consistent with the site's motion strategy.
- No new npm dependencies.

## Capabilities

### New Capabilities

- `content-readiness`: Smart image component with lazy-load and CSS blur-up; hero photo slot in profile; PlaceholderImage upgrade path.

### Modified Capabilities

<!-- None — no existing spec-level behavior changes. -->

## Impact

- **Files added:** `src/components/GalleryImage.tsx`
- **Files modified:** `src/content/types.ts` (add `heroSrc?`, `heroAlt?` to `Profile`), `src/components/PlaceholderImage.tsx` (add `src?`, `alt?` props), `src/pages/Home.tsx` (hero photo slot), `src/index.css` (blur-up CSS)
- **No new npm dependencies**
- **No routing changes, no backend changes**
- **Backward-compatible:** site looks and behaves identically today; new fields are all optional
