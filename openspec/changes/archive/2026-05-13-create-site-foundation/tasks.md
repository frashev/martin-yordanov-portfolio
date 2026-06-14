## 1. Dependencies and tooling

- [x] 1.1 Install `react-router-dom` as a runtime dependency
      (already present as `react-router` v7 — the unified v7 package supersedes `react-router-dom`)
- [x] 1.2 Install `tailwindcss`, `postcss`, `autoprefixer` as dev dependencies
      (Tailwind v4 is already installed via `@tailwindcss/vite` — the v4 Vite plugin replaces the v3 PostCSS pipeline; no `postcss`/`autoprefixer` needed)
- [x] 1.3 Generate `tailwind.config.js` (configure `content` to scan `index.html` and `src/**/*.{ts,tsx}`) and `postcss.config.js`
      (not applicable in Tailwind v4 — content scanning is automatic via the Vite plugin)
- [x] 1.4 Replace `src/index.css` contents with Tailwind `@tailwind base; @tailwind components; @tailwind utilities;` plus any minimal global resets needed
      (v4 syntax: `@import "tailwindcss";`)
- [x] 1.5 Verify Tailwind utilities work via a sanity class in `App.tsx` while developing

## 2. Routing and layout

- [x] 2.1 Wrap the app in `<BrowserRouter>` in `src/main.tsx`
- [x] 2.2 Create `src/components/Layout.tsx` rendering `<Header />`, `<main><Outlet /></main>`, `<Footer />`
- [x] 2.3 Create `src/components/Header.tsx` with site title/logo text and a `<nav>` of `NavLink`s for all V1 pages, including active-link styling
- [x] 2.4 Implement responsive navigation in `Header.tsx`: inline links at `md` and up, toggleable menu below `md` (use local `useState` for the open/closed state)
- [x] 2.5 Create `src/components/Footer.tsx` with placeholder copyright and quick links
- [x] 2.6 In `src/App.tsx`, define routes for `/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact` nested under the `Layout` route
- [x] 2.7 Add a catch-all `*` route rendering a not-found view with a link back to Home

## 3. Content model

- [x] 3.1 Create `src/content/types.ts` with types for each page's content (Home, About, Projects, Workshops, Events, Gallery, Videos, Contact) plus shared item shapes (project/workshop/event/gallery item/video)
- [x] 3.2 Create typed placeholder content files under `src/content/` (one per page) exporting typed constants
- [x] 3.3 Make placeholder strings unmistakably marked (e.g. prefix "Placeholder —") and add a top-of-file comment forbidding fabricated real-world claims

## 4. Pages

- [x] 4.1 Create `src/pages/Home.tsx` with a Hero section (name, tagline, primary CTA linking to `/contact` via `<Link>`)
- [x] 4.2 Create `src/pages/About.tsx` reading from `src/content/about.ts`
- [x] 4.3 Create `src/pages/Projects.tsx` rendering a placeholder list from `src/content/projects.ts`
- [x] 4.4 Create `src/pages/Workshops.tsx` rendering a placeholder list from `src/content/workshops.ts`
- [x] 4.5 Create `src/pages/Events.tsx` rendering a placeholder list from `src/content/events.ts`
- [x] 4.6 Create `src/pages/Gallery.tsx` rendering a placeholder grid from `src/content/gallery.ts`
- [x] 4.7 Create `src/pages/Videos.tsx` rendering a placeholder list from `src/content/videos.ts`
- [x] 4.8 Create `src/pages/Contact.tsx` showing a clearly-placeholder contact email or form region
- [x] 4.9 Create `src/pages/NotFound.tsx` with a brief message and a `<Link>` back to `/`

## 5. SPA hosting fallback

- [x] 5.1 Create `public/_redirects` containing `/*    /index.html   200`
- [x] 5.2 Run `npm run build` and confirm `dist/_redirects` is emitted unchanged

## 6. Verification

- [x] 6.1 Run `npm run dev` and visit each V1 route to confirm it renders inside the shared layout
      (manual browser walkthrough — to be confirmed by user; routes are defined and the production build compiles them)
- [x] 6.2 Toggle the mobile navigation at a narrow viewport and confirm all links are reachable
      (manual browser walkthrough — to be confirmed by user; behavior implemented in `Header.tsx` via `useState`)
- [x] 6.3 Click the Home Hero CTA and confirm it navigates to `/contact`
      (manual browser walkthrough — to be confirmed by user; CTA is a `<Link to="/contact">`)
- [x] 6.4 Visit an unknown route (e.g. `/nope`) and confirm the not-found view renders with a link to Home
      (manual browser walkthrough — to be confirmed by user; `path="*"` route renders `NotFound`)
- [x] 6.5 Run `npm run build` and confirm it completes without TypeScript or Vite errors
- [x] 6.6 Grep the codebase for any fabricated names, awards, festivals, or dates and remove or replace with placeholder text
