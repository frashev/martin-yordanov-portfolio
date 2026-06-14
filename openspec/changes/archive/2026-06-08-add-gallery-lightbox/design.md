## Context

`Gallery.tsx` renders a CSS grid of `PlaceholderImage` components driven by `gallery: GalleryItem[]` from `src/content/media.ts`. `Videos.tsx` renders a card list with `PlaceholderImage aspect="video"` in each card. Both pages are fully placeholder today — no real URLs, no interactivity.

The lightbox must work in both the placeholder state (no `src`) and the real-media state (with `src`), so the swap when photos arrive requires only adding `src`/`alt` to the content file — zero component changes.

## Goals / Non-Goals

**Goals:**

- Click-to-expand lightbox on Gallery: works with placeholder and real images
- Keyboard and backdrop close; focus trap while open; reduced-motion safe
- Responsive video iframe with 16:9 aspect ratio; falls back to placeholder
- Swap-ready: adding `src` / `embedUrl` to `src/content/media.ts` is the only step needed when media arrives
- Zero new npm dependencies; dark-mode tokens used throughout

**Non-Goals:**

- Lightbox navigation arrows (prev/next) — out of scope; can add later
- Video autoplay, captions, or playlist support
- Lazy-loading images (covered by ⑤ `add-content-readiness`)

## Decisions

### Decision 1 — Lightbox via React Portal + CSS, no library

**Chosen:** `ReactDOM.createPortal` renders the overlay into `document.body`. The overlay is a `position: fixed` full-screen `<div>` with a semi-transparent backdrop and a centred content area.

**Alternatives considered:**

- `<dialog>` element — good for accessibility but requires polyfill care; `showModal()` / `close()` API doesn't map cleanly to React's declarative model without a ref dance.
- `react-image-lightbox` / `yet-another-react-lightbox` — would work but adds a dependency. The feature is small enough to build in ~60 lines.

**Why portal:** Renders above all other content regardless of stacking contexts. Clean React pattern, fully reversible.

### Decision 2 — Gallery item becomes a `<button>` wrapping `PlaceholderImage` (or `<img>`)

**Chosen:** Each `<li>` in the gallery grid contains a `<button>` that holds either `<PlaceholderImage>` (no `src`) or an `<img>` (with `src`). Clicking calls `setSelected(index)` which opens the lightbox.

**Why button, not anchor:** No navigation is involved — this is a pure UI action. `<button>` is the correct semantic element and gets keyboard activation for free.

### Decision 3 — `GalleryItem.src` and `Video.embedUrl` are optional

**Chosen:** Both fields are `string | undefined`. When absent the components render the existing placeholder. When present they render real content. No breaking change to existing content files.

**Migration path:** Edit `src/content/media.ts` → add `src: "/photos/show-1.jpg"` to a `GalleryItem` → done.

### Decision 4 — VideoEmbed renders an `<iframe>` with `loading="lazy"`

**Chosen:** A `<div style="aspect-ratio: 16/9">` wrapper containing an `<iframe>` with `loading="lazy"`, `allow="autoplay; fullscreen"`, no JS API. When `embedUrl` is absent, renders `<PlaceholderImage aspect="video">` with a "Video coming soon" sub-label.

**Why aspect-ratio CSS:** Zero-padding hack is legacy; CSS `aspect-ratio` is supported in all modern browsers and works with Tailwind v4.

### Decision 5 — Lightbox close: backdrop click, × button, Escape key

Focus management: when the lightbox opens, focus moves to the close button. When it closes, focus returns to the triggering element (stored in a ref). Escape listener attached on `document` while the lightbox is open, removed on close.

Reduced motion: the lightbox fade-in/scale animation is gated inside `@media (prefers-reduced-motion: no-preference)` — consistent with the site's existing motion strategy.

## Risks / Trade-offs

- **Placeholder lightbox UX is minimal** — clicking a placeholder opens a larger placeholder. This is intentional: it proves the interaction works and the layout is correct before real photos arrive. The user experience on placeholder content is acceptable for a pre-launch site.
- **iframe sandbox** — YouTube/Vimeo embed URLs require no sandbox attribute; omitting it allows autoplay and fullscreen which are expected. If a non-trusted URL were added this would be a risk — mitigated by the fact that `embedUrl` values come from `src/content/media.ts` which is source-controlled.

## Open Questions

None blocking implementation.
