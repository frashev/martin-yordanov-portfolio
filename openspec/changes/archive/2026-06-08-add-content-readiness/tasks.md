## 1. CSS

- [x] 1.1 Add `.gallery-image` wrapper and `.gallery-image img` / `.gallery-image img.is-loaded` styles to `src/index.css` — warm gradient background, `img` starts at `opacity: 0`, fade-in transition gated behind `@media (prefers-reduced-motion: no-preference)`

## 2. GalleryImage Component

- [x] 2.1 Create `src/components/GalleryImage.tsx` — accepts `src`, `alt`, `aspect?: "square" | "video"`, `className?` props
- [x] 2.2 Render a `.gallery-image` wrapper div with `aspect-ratio` matching the `aspect` prop (`1/1` for square, `16/9` for video)
- [x] 2.3 Render `<img>` with `loading="lazy"`, `onLoad` handler that adds `is-loaded` class to the img element
- [x] 2.4 On mount, check `img.complete` (cached images) and immediately add `is-loaded` if already loaded — use a callback ref for this

## 3. PlaceholderImage Upgrade

- [x] 3.1 Add `src?: string` and `alt?: string` to `PlaceholderImage` props in `src/components/PlaceholderImage.tsx`
- [x] 3.2 When `src` is provided: render `<GalleryImage src={src} alt={alt} aspect={aspect} />` instead of the gradient tile

## 4. Profile Type + Hero Slot

- [x] 4.1 Add `heroSrc?: string` and `heroAlt?: string` to `Profile` type in `src/content/types.ts`
- [x] 4.2 In `src/pages/Home.tsx`, replace the `<Monogram />` render with a conditional: show `<GalleryImage>` when `profile.heroSrc` is set, `<Monogram>` otherwise
- [x] 4.3 Hero `<GalleryImage>` should fill the right column naturally — use `className="w-full"` or equivalent sizing

## 5. Gallery.tsx Cleanup

- [x] 5.1 In `src/pages/Gallery.tsx`, replace the `item.src ? <img> : <PlaceholderImage>` conditional inside the button with a single `<PlaceholderImage src={item.src} alt={item.alt} caption={item.caption} aspect="square" />`

## 6. Verification

- [x] 6.1 `npm run build` — TypeScript + Vite build passes with no errors
- [ ] 6.2 `npm run dev` — Gallery, Videos, Home pages all look identical to before (backward-compatible)
- [x] 6.3 Temporarily add `heroSrc: "/og-default.svg"` to `profile.ts`; confirm hero photo renders and fades in; revert
- [ ] 6.4 Temporarily add `src` to one `GalleryItem`; confirm lightbox + fade-in still works; revert
- [x] 6.5 `npm run test` — existing unit tests still pass
- [x] 6.6 `openspec validate` — confirm artifacts valid

## 7. Review & Cleanup

- [x] 7.1 `/codex:review` — content readiness: GalleryImage component, PlaceholderImage upgrade, hero slot, Gallery cleanup, no new dependencies
- [ ] 7.2 `/opsx:archive add-content-readiness` — finalize and archive
