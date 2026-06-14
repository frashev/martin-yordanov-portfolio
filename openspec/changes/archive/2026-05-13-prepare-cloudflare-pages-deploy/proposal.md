## Why

The site is ready to ship as a static SPA, but there is no written record of how to deploy it. A new collaborator (or future-us six months from now) opening the repo will see the default Vite template README and have to reverse-engineer the build command, the output directory, and the SPA fallback file. Cloudflare Pages is the target host; configuring it requires knowing exactly two values plus the SPA-fallback convention. This change writes those down in the README and verifies that the artifacts Cloudflare Pages needs (the `dist/` output and `_redirects`) are produced by `npm run build`.

## What Changes

- Replace the stock Vite template README with a project-specific README. Keep it short. Required sections: project overview (one paragraph), local development (install + `npm run dev`), available scripts table, a "Deploying to Cloudflare Pages" section that lists the build command (`npm run build`), the output directory (`dist`), the Node version expectation (whatever the project already uses; we'll surface what's installed), and a note that SPA routing relies on `public/_redirects`.
- Verify that `npm run build` produces `dist/index.html`, `dist/assets/*`, and `dist/_redirects` unchanged from `public/_redirects`. (This already works after `create-site-foundation`; we'll add a verification task and capture it in the spec so a regression is detectable.)
- No code changes to `src/` or `vite.config.ts`. No new dependencies. No backend, no server code, no Cloudflare Workers, no Functions.

## Capabilities

### New Capabilities

- `deployment`: Documents what the deployable artifact is, how it is produced, and what hosting configuration it expects (build command, output directory, SPA fallback file). Owned by the README.

### Modified Capabilities

<!-- None -->

## Impact

- Modified file: `README.md` (rewritten).
- No source, config, or dependency changes.
- `npm run build` must continue to produce `dist/` with the SPA fallback file.
- The change is purely documentation + verification of existing behavior.
