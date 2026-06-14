## Context

The repository's README is still the default Vite template (React + TypeScript + Vite boilerplate, ESLint configuration tips). It doesn't mention the project, the booking-site purpose, or how to deploy. The build pipeline (`tsc -b && vite build` → `dist/`) and the SPA fallback (`public/_redirects` → `/* → /index.html 200`) already exist from earlier changes; what's missing is documentation that lets a deployer wire Cloudflare Pages without reading the source.

## Goals / Non-Goals

**Goals:**

- Replace the boilerplate README with a project-specific one that is short, scannable, and actionable.
- Make the Cloudflare Pages configuration trivially copy-pasteable: build command, output directory, Node version, SPA fallback note.
- Capture the deployment contract in a spec so a future regression (e.g. someone changes the output directory or deletes `_redirects`) shows up as a spec mismatch.

**Non-Goals:**

- No CI/CD pipeline file in this change (no `.github/workflows/` or Cloudflare Pages config in-repo). Cloudflare Pages can be wired to the Git remote through its dashboard; that workflow is fine and doesn't require repo-side config.
- No custom domain, headers, or caching rules. Defaults are fine for V1.
- No Cloudflare Functions or Workers. The site is static.
- No automated deploy-verification step. Manual inspection of `dist/` after `npm run build` is sufficient.

## Decisions

### Replace the README rather than append

- The stock template content (React Compiler tips, ESLint expansion advice) is not relevant to this project and would actively mislead a deployer. Replacing it produces a cleaner artifact for the same effort as a careful append.
- Alternative considered: leave the template content and add a deployment section at the top. Rejected — the README would read like two documents glued together.

### Content outline (short, in this order)

1. **Title + one-paragraph description** — what the site is and who it's for.
2. **Tech stack** — one line: Vite + React + TypeScript + Tailwind v4 + react-router v7.
3. **Local development** — `npm install` then `npm run dev`.
4. **Scripts table** — `dev`, `build`, `preview`, `lint`, `test`, `test:e2e`.
5. **Project layout** — three bullets: `src/pages/`, `src/components/`, `src/content/`.
6. **Content** — one paragraph: copy is placeholder; real content goes into `src/content/`.
7. **Deploying to Cloudflare Pages** — exact values to enter, plus the `_redirects` note.

### Cloudflare Pages section spec

- Lists exactly the values Cloudflare Pages asks for during project creation: framework preset (None / Vite), build command (`npm run build`), build output directory (`dist`), root directory (project root).
- States the Node version. (Will be set to whatever the developer machine reports during `apply`; if `.nvmrc` is absent, the README will say "Node 20 or 22".)
- States the SPA fallback rule and that `public/_redirects` is the source.

### Deployment spec

- Three requirements: (1) build command and output directory match the documented values; (2) `dist/_redirects` is produced; (3) the README documents the Cloudflare Pages configuration.
- Scenarios are observable from outside the build (file existence, README content), not from running the deploy itself.

## Risks / Trade-offs

- **README becomes wrong if the build command or output directory change later** → Mitigation: the spec encodes the contract, so a change without updating the README will show up as a spec mismatch in a later OpenSpec change.
- **Node version stated in README drifts from CI / local** → Mitigation: state it as a range ("Node 20 or 22") rather than pinning. If we add a `.nvmrc` in a later change, the README can reference it.
- **Cloudflare Pages UI may evolve** → Acceptable: the values themselves (`npm run build`, `dist`) are framework-stable; the field labels around them are not load-bearing in the README.
