## 1. Update types

- [x] 1.1 In `src/content/types.ts`, add `Profile` (name, tagline, intro, bioParagraphs, bookingCtaLabel, contactEmail, contactIntro) and `NavItem` (to, label, end?)
- [x] 1.2 Remove `HomeContent`, `AboutContent`, `ContactContent`, and `ListPageContent<T>` from `src/content/types.ts`
- [x] 1.3 Keep `Project`, `Workshop`, `EventItem`, `GalleryItem`, `Video`; ensure they are still exported

## 2. New content modules

- [x] 2.1 Create `src/content/profile.ts` exporting `profile: Profile` with placeholder values (name, tagline, intro, bioParagraphs, bookingCtaLabel = "Book Nikoleta", contactEmail = "placeholder@example.com", contactIntro)
- [x] 2.2 Create `src/content/navigation.ts` exporting `primaryNav: readonly NavItem[]` for `/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact` (Home has `end: true`)
- [x] 2.3 Create `src/content/media.ts` exporting `gallery: GalleryItem[]` and `videos: Video[]` (move current placeholder items over)

## 3. Restructure existing domain modules

- [x] 3.1 Update `src/content/projects.ts` to export `projects: Project[]` directly (drop the `ListPageContent` wrapper)
- [x] 3.2 Update `src/content/workshops.ts` to export `workshops: Workshop[]` directly
- [x] 3.3 Update `src/content/events.ts` to export `events: EventItem[]` directly

## 4. Remove obsolete content modules

- [x] 4.1 Delete `src/content/home.ts`
- [x] 4.2 Delete `src/content/about.ts`
- [x] 4.3 Delete `src/content/contact.ts`
- [x] 4.4 Delete `src/content/gallery.ts`
- [x] 4.5 Delete `src/content/videos.ts`

## 5. Update components and pages

- [x] 5.1 Update `src/components/Header.tsx` to import `primaryNav` from `src/content/navigation.ts` and remove the inline `NAV_LINKS` array
- [x] 5.2 Update `src/pages/Home.tsx` to read `name`, `tagline`, `intro`, `bookingCtaLabel` from `profile`
- [x] 5.3 Update `src/pages/About.tsx` to read `bioParagraphs` from `profile` (page renders its own `<h1>About</h1>`)
- [x] 5.4 Update `src/pages/Contact.tsx` to read `contactEmail` and `contactIntro` from `profile` (page renders its own `<h1>Contact</h1>`)
- [x] 5.5 Update `src/pages/Projects.tsx` to iterate over `projects` directly; render `<h1>` and intro paragraph inline (placeholder)
- [x] 5.6 Update `src/pages/Workshops.tsx` similarly to iterate over `workshops`
- [x] 5.7 Update `src/pages/Events.tsx` similarly to iterate over `events`
- [x] 5.8 Update `src/pages/Gallery.tsx` to import `gallery` from `src/content/media.ts`
- [x] 5.9 Update `src/pages/Videos.tsx` to import `videos` from `src/content/media.ts`

## 6. Verification

- [x] 6.1 Run `npm run build` and confirm zero TypeScript and Vite errors
- [x] 6.2 Grep `src/` for any remaining import of the deleted files (`home.ts`, `about.ts`, `contact.ts`, `gallery.ts`, `videos.ts`) and fix any stragglers — no matches
- [x] 6.3 Grep `src/` for the literal string `Nikoleta` outside `src/content/profile.ts` and `Header.tsx` site title — only appears in Footer copyright (placeholder), Header site title, and types.ts comment; no fabricated claims
- [x] 6.4 Confirm each acceptance criterion by inspection: adding a project (append to `projects.ts`), updating contact email (change one line in `profile.ts`), and renaming a nav item (change one line in `navigation.ts`) each require editing exactly one file
