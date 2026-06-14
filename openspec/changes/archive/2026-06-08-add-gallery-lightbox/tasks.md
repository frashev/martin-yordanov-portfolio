## 1. Content Type Extensions

- [x] 1.1 Add `src?: string` and `alt?: string` to `GalleryItem` type in `src/content/types.ts`
- [x] 1.2 Add `embedUrl?: string` to `Video` type in `src/content/types.ts`

## 2. Lightbox Component

- [x] 2.1 Create `src/components/Lightbox.tsx` — accepts `open`, `onClose`, `caption?`, `src?` props; renders via `ReactDOM.createPortal` into `document.body`
- [x] 2.2 Overlay: `position: fixed` full-screen backdrop (semi-transparent `--ink` at ~70% opacity), centred content area
- [x] 2.3 Content area: shows `<img>` when `src` is set, `<PlaceholderImage aspect="square">` otherwise; caption below
- [x] 2.4 Close button (×) in top-right corner; `aria-label="Close"`
- [x] 2.5 Escape key listener on `document` while open; removed on close
- [x] 2.6 Backdrop click closes lightbox (click on content area does NOT close)
- [x] 2.7 Focus management: focus close button on open; restore focus to trigger element on close (accept trigger ref prop)
- [x] 2.8 ARIA: `role="dialog"`, `aria-modal="true"`, `aria-label="Photo lightbox"`
- [x] 2.9 Open/close fade animation gated behind `@media (prefers-reduced-motion: no-preference)` in `src/index.css`

## 3. VideoEmbed Component

- [x] 3.1 Create `src/components/VideoEmbed.tsx` — accepts `embedUrl?: string`, `title: string` props
- [x] 3.2 When `embedUrl` present: render `<div style="aspect-ratio: 16/9">` containing `<iframe>` with `src={embedUrl}`, `loading="lazy"`, `allow="autoplay; fullscreen"`, `allowFullScreen`, `title={title}`, `width="100%"`, `height="100%"`, no border
- [x] 3.3 When `embedUrl` absent: render `<PlaceholderImage aspect="video">` (existing component)

## 4. Update Gallery Page

- [x] 4.1 In `src/pages/Gallery.tsx`, wrap each `PlaceholderImage` in a `<button>` that calls `setSelected(i)` on click
- [x] 4.2 Add `selected: number | null` state; render `<Lightbox>` when `selected !== null`, passing the relevant `GalleryItem`'s `src`, `alt`, `caption`
- [x] 4.3 Store trigger button refs to restore focus on lightbox close
- [x] 4.4 Button styling: full-width, no default button appearance, cursor pointer, visible focus ring using `--accent`

## 5. Update Videos Page

- [x] 5.1 In `src/pages/Videos.tsx`, replace `<PlaceholderImage aspect="video">` inside cards with `<VideoEmbed embedUrl={v.embedUrl} title={v.title} />`

## 6. Lightbox CSS

- [x] 6.1 Add `.lightbox-overlay` and `.lightbox-content` styles to `src/index.css` — backdrop blur or dark overlay, centred content, max-width constraint, reduced-motion guard on fade animation

## 7. Verification

- [x] 7.1 `npm run build` — TypeScript + Vite build passes with no errors
- [ ] 7.2 `npm run dev` — click a gallery placeholder; lightbox opens, shows enlarged placeholder
- [ ] 7.3 Close via ×, Escape, and backdrop click all work
- [ ] 7.4 Videos page renders placeholder cards without errors
- [x] 7.5 Add a test `embedUrl` to one `Video` entry in `src/content/media.ts`, confirm iframe renders, then revert
- [x] 7.6 `npm run test` — existing unit tests still pass
- [x] 7.7 `openspec validate` — confirm artifacts valid

## 8. Review & Cleanup

- [x] 8.1 `/codex:review` — lightbox + video embed: new Lightbox and VideoEmbed components, Gallery and Videos pages updated, no new dependencies
- [ ] 8.2 `/opsx:archive add-gallery-lightbox` — finalize and archive
