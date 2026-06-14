## Why

The site has shipped routing, content, and a theme pass, but there is currently no automated way to catch regressions. A wrong import path, a renamed `profile` field, or a broken Hero CTA would only surface when someone happens to load the page. This change adds a minimal but useful test layer: unit/integration tests for the most load-bearing pieces (the navigation header and the two pages most likely to change next — Home and Projects), and a single Playwright smoke test that exercises real navigation in a browser. The scope is deliberately small — enough to gate `npm run test` and `npm run test:e2e` on real signal without turning the project into a test-maintenance burden.

## What Changes

- Add Vitest + React Testing Library + jsdom as dev dependencies; configure Vitest via `vite.config.ts` (`test` block) and a `src/test/setup.ts` that wires `@testing-library/jest-dom`.
- Add component tests under `src/__tests__/`:
  - `Header.test.tsx` — renders all primary nav links and toggles the mobile menu.
  - `Home.test.tsx` — renders the name, tagline, and a "Book Nikoleta" CTA pointing to `/contact`; renders a secondary link to `/about`.
  - `Projects.test.tsx` — renders one card per item in `projects` content.
- Add Playwright as a dev dependency, with a `playwright.config.ts` that starts the Vite dev server via `webServer`. One spec file `e2e/smoke.spec.ts` opens `/`, navigates to Projects and Contact via the header, and asserts on the page heading and the Hero booking CTA.
- Add npm scripts:
  - `test`: `vitest run`
  - `test:e2e`: `playwright test`
- Update `tsconfig.app.json` (or add a small `tsconfig.test.json`) so test files compile under the existing strict settings without leaking test types into the production build.
- Update `.gitignore` for Playwright artifacts (`/playwright-report/`, `/test-results/`).

## Capabilities

### New Capabilities

- `testing`: Defines the automated test surface — what is covered, how `npm run test` and `npm run test:e2e` are wired, and the rules that keep tests stable against placeholder content (assertions target structural markers, not specific placeholder strings).

### Modified Capabilities

<!-- None -->

## Impact

- New dev dependencies: `vitest`, `@vitest/ui` (optional, skipped to keep scope tight), `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@playwright/test`.
- New files: `src/test/setup.ts`, `src/__tests__/Header.test.tsx`, `src/__tests__/Home.test.tsx`, `src/__tests__/Projects.test.tsx`, `playwright.config.ts`, `e2e/smoke.spec.ts`.
- Modified files: `package.json` (scripts + devDependencies), `vite.config.ts` (Vitest config), `tsconfig.app.json` or a sibling test tsconfig, `.gitignore`.
- No production runtime dependencies added.
- `npm run build` must continue to pass; tests live outside the production bundle.
