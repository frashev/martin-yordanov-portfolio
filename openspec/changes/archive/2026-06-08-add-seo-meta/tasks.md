## 1. Content & Types

- [x] 1.1 Add `SeoMeta` type to `src/content/types.ts` (`title`, `description`, `ogImage?`)
- [x] 1.2 Create `src/content/seo.ts` with placeholder SEO copy for all 8 routes (`/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact`) plus a shared `defaultOgImage` monogram data-URI
- [x] 1.3 Update `index.html` base `<title>` from `martin-yordanov-website` to `Martin Yordanov`

## 2. PageMeta Component

- [x] 2.1 Create `src/components/PageMeta.tsx` — accepts `title`, `description`, `ogImage?`, `ogUrl?` props
- [x] 2.2 Implement `useEffect` that writes `document.title` and upserts `<meta name="description">`, `og:title`, `og:description`, `og:type`, `og:url`, `og:image` nodes in `document.head`
- [x] 2.3 Implement cleanup (remove or reset tags on unmount) to prevent stale values on navigation

## 3. Wire Up All Pages

- [x] 3.1 Add `<PageMeta>` to `src/pages/Home.tsx`
- [x] 3.2 Add `<PageMeta>` to `src/pages/About.tsx`
- [x] 3.3 Add `<PageMeta>` to `src/pages/Projects.tsx`
- [x] 3.4 Add `<PageMeta>` to `src/pages/Workshops.tsx`
- [x] 3.5 Add `<PageMeta>` to `src/pages/Events.tsx`
- [x] 3.6 Add `<PageMeta>` to `src/pages/Gallery.tsx`
- [x] 3.7 Add `<PageMeta>` to `src/pages/Videos.tsx`
- [x] 3.8 Add `<PageMeta>` to `src/pages/Contact.tsx`

## 4. Verification

- [x] 4.1 `npm run build` — TypeScript + Vite build passes with no errors
- [x] 4.2 `npm run dev` — open each route in browser, confirm tab title updates correctly on navigation
- [x] 4.3 Check browser DevTools → Elements → `<head>` on at least 3 routes: confirm `<meta name="description">` and all `og:*` tags are present and route-specific
- [x] 4.4 `npm run test` — existing unit tests still pass
- [x] 4.5 `openspec validate` — confirm artifacts are valid before archiving

## 5. Review & Cleanup

- [x] 5.1 `/codex:review` — SEO meta change: added PageMeta component + seo.ts content file, wired to 8 pages, no new dependencies
- [ ] 5.2 `/opsx:archive add-seo-meta` — finalize and archive the change
