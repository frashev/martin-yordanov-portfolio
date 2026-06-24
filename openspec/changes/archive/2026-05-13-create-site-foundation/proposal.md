## Why

Martin Yordanov needs a professional online presence to showcase his kinetic furniture and drawing-machine work and to make it easy for collaborators to contact him. We are starting from an empty Vite + React + TypeScript project and need to establish the foundation (routing, layout, navigation, placeholder content) before any real content or integrations are added.

## What Changes

- Add React Router and define routes for V1 pages: Home, About, Projects, Workshops, Events, Gallery, Videos, Contact.
- Add Tailwind CSS for styling.
- Add a shared `Header` (with responsive navigation) and `Footer` rendered on every route.
- Add a `Home` page with a Hero section and a primary booking CTA that links to the Contact page.
- Add placeholder pages for the remaining routes, each scaffolded with section headings and short placeholder copy.
- Introduce a typed local content layer (TypeScript files under `src/content/`) so future real content drops in without code changes.
- Add `public/_redirects` so SPA hosting (e.g. Netlify-style) falls back to `index.html` for client-side routes.
- Use only placeholder copy — do not invent awards, festivals, or collaborations attributed to Martin Yordanov.

## Capabilities

### New Capabilities

- `site-foundation`: App shell — routing, shared layout (Header/Footer), responsive navigation, SPA hosting fallback.
- `site-pages`: The V1 page set (Home, About, Projects, Workshops, Events, Gallery, Videos, Contact) and the Hero + booking CTA on Home.
- `content-model`: Typed TypeScript content files for page data, so placeholder content can be swapped for verified real content later.

### Modified Capabilities

<!-- None — this is the first change. -->

## Impact

- New runtime dependencies: `react-router-dom`, `tailwindcss` (+ `postcss`, `autoprefixer`).
- New files: `src/App.tsx` routes; `src/components/Header.tsx`, `src/components/Footer.tsx`, `src/components/Layout.tsx`; `src/pages/*.tsx`; `src/content/*.ts`; `public/_redirects`; Tailwind config and entry CSS.
- No backend, database, CMS, or Supabase integration is introduced.
- No Next.js migration — project remains Vite + React + TypeScript.
- `npm run dev` and `npm run build` must continue to work after this change.
