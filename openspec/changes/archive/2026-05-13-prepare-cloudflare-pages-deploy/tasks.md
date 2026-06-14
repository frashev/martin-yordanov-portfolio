## 1. Rewrite README

- [x] 1.1 Replace `README.md` with a project-specific document containing, in order: title + one-paragraph description; tech stack (Vite + React + TypeScript + Tailwind v4 + react-router v7); local development (`npm install`, `npm run dev`); scripts table (`dev`, `build`, `preview`, `lint`, `test`, `test:e2e`); project layout (`src/pages/`, `src/components/`, `src/content/`); content note (placeholder copy lives in `src/content/`); "Deploying to Cloudflare Pages" section
- [x] 1.2 In the Cloudflare Pages section, list explicitly: build command `npm run build`, build output directory `dist`, framework preset Vite (or None), Node version "Node 20 or 22", and a note that SPA routing is enabled via `public/_redirects` (rule `/* /index.html 200`)

## 2. Verify build artifacts

- [x] 2.1 Run `npm run build` and confirm `dist/index.html`, `dist/assets/`, and `dist/_redirects` all exist
- [x] 2.2 Confirm `dist/_redirects` content matches `public/_redirects` (no transformation)

## 3. Final verification

- [x] 3.1 Grep `README.md` for the literal strings `npm run build`, `dist`, and `_redirects` — all three must be present in the deployment section
- [x] 3.2 Confirm no source, config, or dependency changes were introduced by this change (only `README.md` and `openspec/` updates)
