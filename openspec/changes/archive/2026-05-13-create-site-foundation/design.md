## Context

The repository currently holds a fresh Vite + React + TypeScript scaffold with no routing, styling system, or pages. Martin Yordanov is a maker of kinetic furniture and drawing machines; the site needs to look credible and make booking obvious, but real biography, achievements, and media will only be supplied later. This change establishes the structural foundation so that subsequent changes (real content, gallery media, booking integration) can plug in without rewrites.

## Goals / Non-Goals

**Goals:**

- A static-first, multi-page SPA powered by Vite + React + TypeScript.
- Clear routing for all V1 pages with a shared Header/Footer layout.
- Responsive top navigation (desktop horizontal nav, mobile collapsible menu).
- A Hero + booking CTA on the Home page that drives users to Contact.
- Typed local content layer so placeholder copy can be replaced without touching components.
- Tailwind CSS configured and working.
- SPA hosting fallback via `public/_redirects`.

**Non-Goals:**

- No Next.js, SSR, or static-site generator other than Vite's default build.
- No backend, database, CMS, or Supabase.
- No real biographical claims, awards, festivals, or collaborator names.
- No analytics, i18n, CMS adapter, booking-form backend, or media optimization pipeline in this change.
- No design system beyond what Tailwind utility classes naturally provide.

## Decisions

### Routing: `react-router-dom` v6 with `BrowserRouter`

- Single `<BrowserRouter>` in `main.tsx`, routes declared in `App.tsx` using a `Layout` route that renders `<Header />`, `<Outlet />`, `<Footer />`.
- Rationale: standard, well-known API; pairs naturally with the shared layout pattern via `<Outlet />`.
- Alternatives considered: TanStack Router (more powerful but adds learning overhead for a simple static site); HashRouter (avoids the SPA redirect concern but produces uglier URLs).

### Styling: Tailwind CSS via PostCSS

- Install `tailwindcss`, `postcss`, `autoprefixer`; generate `tailwind.config.js` and `postcss.config.js`; import Tailwind directives from `src/index.css`.
- Rationale: fastest path to a responsive, consistent look without committing to a component library; trivially removable later.
- Alternatives considered: CSS Modules (more boilerplate for layout work); a component library like MUI/Chakra (heavier, opinionated, harder to restyle later).

### Layout: single `<Layout>` route component

- `Layout` renders `Header`, `<main>` with `<Outlet />`, and `Footer`. All pages are children of this route so the chrome is defined once.
- Header uses a `<nav>` with `NavLink`s for active styling; mobile menu toggles via local `useState` (no external dependency).

### Content model: typed TS modules under `src/content/`

- Each page reads from a typed export, e.g. `src/content/home.ts` exports `homeContent: HomeContent`. Types live in `src/content/types.ts`.
- Rationale: gives a single, obvious place to swap placeholder strings for real content later; type-checked at build time.
- Alternatives considered: Markdown + frontmatter (overkill for placeholders); JSON files (loses type safety); inline JSX (hard to find/replace).

### Placeholder copy policy

- Components display unmistakably generic copy (e.g. "Placeholder bio — to be provided by Martin") and never fabricated specifics. Comments in content files state this rule.
- Rationale: protects the subject from false claims and makes the "needs real content" status obvious during review.

### SPA hosting fallback: `public/_redirects`

- File contains `/*    /index.html   200` so static hosts (Netlify, Cloudflare Pages with that convention) serve the SPA shell for any deep link.
- Rationale: the requirements call it out explicitly; harmless on hosts that ignore the file.

## Risks / Trade-offs

- **Tailwind onboarding cost** → Mitigation: keep utility usage minimal and conventional; document the setup in a short README note if needed.
- **Placeholder content leaks to production** → Mitigation: make placeholder strings explicit ("Placeholder — …") and centralize them in `src/content/` so a single search reveals all of them before launch.
- **`_redirects` is host-specific** → Mitigation: it is a single inert line on hosts that do not recognize it; document the convention in the file as a comment.
- **No tests in this change** → Acceptable: this is structural scaffolding; acceptance is verified manually via `npm run dev` / `npm run build` and route checks.
