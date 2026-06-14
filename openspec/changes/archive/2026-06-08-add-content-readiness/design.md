## Context

`PlaceholderImage` currently renders a warm gradient tile with a camera/play icon. `GalleryItem.src` and `Video.embedUrl` are already optional (added in ④). `Profile` has no image field. `Home.tsx` renders a `<Monogram>` SVG as the visual centrepiece.

The goal is a zero-effort upgrade path: when content is ready, changing one value in `src/content/` should activate the real media with professional loading behaviour — no component rewrites needed.

## Goals / Non-Goals

**Goals:**

- `<GalleryImage>`: lazy-load + CSS fade-in on real image load; warm gradient background visible while loading
- `<PlaceholderImage>` upgrades itself when `src` is provided — delegates to `<GalleryImage>`
- Home hero shows a real photo when `profile.heroSrc` is set; monogram otherwise
- Motion gated behind `prefers-reduced-motion: no-preference`
- Zero new npm dependencies

**Non-Goals:**

- True blur-up (LQIP) — requires base64 thumbnails not yet available; a warm gradient fade-in is sufficient and consistent with the site's existing placeholder pattern
- Responsive `srcset` / `sizes` — out of scope; can be added when real photos arrive
- Image optimisation / WebP conversion — Cloudflare handles this at the edge

## Decisions

### Decision 1 — CSS fade-in, not LQIP blur

**Chosen:** Wrapper div with `background: linear-gradient(...)` (same warm gradient as PlaceholderImage). `<img>` starts at `opacity: 0`, transitions to `opacity: 1` via an `onLoad` handler that adds an `is-loaded` class.

**Alternatives considered:**

- True blur-up (base64 tiny image): requires pre-generated thumbnails per photo — not possible without real photos.
- `blur()` CSS filter on a full-size image initially: would show the real image blurred first, then unblur — more flicker than value.

**Why gradient fade:** Clean, instant implementation. Gradient placeholder already matches the site's aesthetic. Image fades in smoothly on load. No external data needed.

### Decision 2 — `GalleryImage` is a standalone component; `PlaceholderImage` wraps it

**Chosen:** `GalleryImage` owns the img+fade logic. `PlaceholderImage` keeps its current signature and adds `src?`/`alt?`; when `src` is present it renders `<GalleryImage>` instead of the gradient tile.

**Why separate:** `Gallery.tsx` already has conditional logic (`item.src ? <img> : <PlaceholderImage>`). With this change, that conditional collapses to just `<PlaceholderImage src={item.src} alt={item.alt} caption={item.caption} />` — cleaner and safer.

### Decision 3 — `Profile.heroSrc` is optional, Home hero degrades gracefully

**Chosen:** `Profile` type gains `heroSrc?: string` and `heroAlt?: string`. In `Home.tsx`, the right column renders `<GalleryImage>` when `heroSrc` is set, `<Monogram>` otherwise.

**Why:** The monogram is a strong branded element. It should remain the default until a real photo is ready, not be replaced by a broken `<img>` or a placeholder tile in the hero.

### Decision 4 — Simplify Gallery.tsx callsite

As part of this change, `Gallery.tsx` should collapse its `item.src ? <img> : <PlaceholderImage>` conditional into a single `<PlaceholderImage src={item.src} ...>` call. This is a cleanup that the new PlaceholderImage API enables.

## Risks / Trade-offs

- **`onLoad` doesn't fire for cached images in some browsers** — cached images may skip `onLoad`, leaving `opacity: 0` permanently. Mitigation: check `img.complete` immediately after setting the ref and add the `is-loaded` class synchronously if already loaded.
- **Fade-in disabled under reduced-motion** — the image will still load and display, just without the fade. Correct behaviour.

## Open Questions

None blocking implementation.
