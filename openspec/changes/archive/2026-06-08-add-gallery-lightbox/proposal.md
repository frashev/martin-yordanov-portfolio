## Why

The Gallery and Videos pages show placeholder content but have no interactive behaviour — photos can't be viewed larger and videos can't play. Building the interaction layer now means the pages will be fully functional the moment real media arrives, with no additional code changes needed. Both features can be built, tested, and deployed independently of real content.

## What Changes

- A `<Lightbox>` component (React portal + CSS overlay) is added. Clicking any gallery item opens it full-size in a centred overlay. Close options: × button, click-outside backdrop, Escape key. Focus is trapped inside while open.
- `GalleryItem` type gains two optional fields: `src?: string` (image URL) and `alt?: string`. When `src` is absent the lightbox shows the `PlaceholderImage` enlarged; when present it shows a real `<img>`.
- `Gallery.tsx` is updated: each grid item becomes a button that triggers the lightbox.
- A `<VideoEmbed>` component renders a 16:9 responsive `<iframe>` for YouTube/Vimeo. When no embed URL is available it renders the existing `PlaceholderImage` with an improved "coming soon" label.
- `Video` type gains one optional field: `embedUrl?: string`. When absent the card shows the placeholder; when present the iframe auto-renders.
- `Videos.tsx` is updated to use `<VideoEmbed>` instead of raw `<PlaceholderImage>`.
- No new npm dependencies.

## Capabilities

### New Capabilities

- `gallery-lightbox`: Clicking a gallery item opens a full-size overlay with close controls and keyboard support.
- `video-embed`: Videos page renders responsive iframes when embed URLs are provided; falls back to a polished placeholder.

### Modified Capabilities

<!-- None — no existing spec-level behavior changes. -->

## Impact

- **Files added:** `src/components/Lightbox.tsx`, `src/components/VideoEmbed.tsx`
- **Files modified:** `src/content/types.ts` (extend `GalleryItem`, `Video`), `src/pages/Gallery.tsx`, `src/pages/Videos.tsx`
- **No new npm dependencies**
- **No routing changes, no backend changes**
- Dark mode: lightbox overlay uses `--paper`/`--ink` tokens — picks up dark theme automatically
