## Context

The codebase is Vite + React + TypeScript with `react-router` v7 and Tailwind v4. No tests exist. We want a starting point that catches the most common regressions (broken routing, missing CTA, lost content rendering) without committing to wide coverage. Two runners are needed: a fast component-level runner (Vitest) and a real-browser smoke runner (Playwright).

## Goals / Non-Goals

**Goals:**

- Make `npm run test` and `npm run test:e2e` first-class commands that return exit 0 on success.
- Cover three load-bearing surfaces with component tests: Header (navigation), Home (CTA wiring), Projects (content-driven rendering).
- One Playwright smoke spec that walks Home → Projects → Contact and asserts on visible text.
- Keep test code separate from app code and excluded from production build artifacts.

**Non-Goals:**

- No coverage thresholds, snapshot tests, or visual regression in this change.
- No CI workflow file (separate concern; this change just makes the commands work locally).
- No accessibility testing (axe), no test-id sprinkling — tests use accessible queries (`getByRole`, `getByText`).
- No mocking framework. Tests render real components with the real content modules; placeholder content is stable enough.

## Decisions

### Vitest configuration via `vite.config.ts`

- Add a `test` block to the existing `defineConfig` (Vite + Vitest share config). Set `environment: "jsdom"`, `globals: true`, `setupFiles: ["./src/test/setup.ts"]`, and `include: ["src/**/*.test.{ts,tsx}"]` so Vitest does not pick up Playwright specs in `e2e/`.
- Add `@ts-expect-error` or a triple-slash reference `/// <reference types="vitest/globals" />` in `setup.ts` if needed; we'll prefer importing `expect`, `describe`, `it` explicitly from `vitest` to avoid global type pollution.
- Alternative considered: a separate `vitest.config.ts`. Rejected — co-locating with Vite config keeps plugin/alias settings in sync automatically.

### `src/test/setup.ts`

- Imports `@testing-library/jest-dom/vitest` to register matchers like `toBeInTheDocument()`.
- No other setup: jsdom is the default, RTL cleans up between tests automatically since v13.

### Component test approach

- Each test wraps the unit under test in a `MemoryRouter` (`react-router` v7) so `<Link>` / `<NavLink>` work without a real browser.
- Queries: `getByRole("link", { name: /home/i })`, `getByRole("heading", { name: /projects/i })`. Avoid asserting on placeholder copy verbatim ("Placeholder — ...") so a future content swap doesn't break tests; assert on structural cues (presence of N cards, link `to` attributes, heading text "Projects" since that is the page name, not placeholder copy).
- `Header.test.tsx`: renders `Header` inside `MemoryRouter`, asserts that 8 primary nav links are present, and verifies the mobile menu toggle button reveals navigation when clicked.
- `Home.test.tsx`: asserts that the page renders the name (from `profile`), a primary CTA link with `href="/contact"`, and a secondary link with `href="/about"`.
- `Projects.test.tsx`: asserts that the number of rendered cards matches `projects.length` from the content module (import the real array and compare).

### Playwright setup

- `playwright.config.ts` uses `webServer: { command: "npm run dev", url: "http://localhost:5173", reuseExistingServer: !process.env.CI, timeout: 60_000 }`.
- `testDir: "e2e"`. One browser (chromium) by default to keep the install footprint reasonable; user can extend later.
- `e2e/smoke.spec.ts`: opens `/`, asserts the "Martin Yordanov" heading is visible, clicks the "Projects" nav link, asserts the Projects heading, clicks "Contact", asserts the contact-page heading and the placeholder email is visible.
- Browsers must be installed once via `npx playwright install chromium`. Document this in `tasks.md`.

### `npm` scripts

- `"test": "vitest run"` (non-watch by default; CI-friendly).
- `"test:e2e": "playwright test"`.
- Keep `dev`, `build`, `lint`, `preview` unchanged.

### TypeScript

- `tsconfig.app.json` is used by `tsc -b` during `build`. To prevent test files from leaking into the production type check, add `"exclude": ["src/**/*.test.ts", "src/**/*.test.tsx", "src/test", "e2e"]` to it. Tests still type-check via Vitest's transform (no separate tsc step needed for them in this change).

### `.gitignore`

- Add `/playwright-report/` and `/test-results/` (Playwright defaults).

## Risks / Trade-offs

- **Tests coupled to placeholder content might break when real copy lands** → Mitigation: assert on structural identifiers (route headings, CTA target paths, content array length) not placeholder strings. The CTA text comes from `profile.bookingCtaLabel`, so the test should read that field rather than hardcode "Discuss a project".
- **Playwright pulls in a large browser download** → Acceptable: it is dev-only and one-time per machine. `tasks.md` includes the install step.
- **Two test commands instead of one combined `test`** → Intentional: `vitest run` should be fast and pre-commit-friendly; `test:e2e` boots a real server and is heavier.
- **Vitest config inside `vite.config.ts` needs a triple-slash ref to types** → Mitigation: add `/// <reference types="vitest/config" />` at the top of `vite.config.ts` if TS complains; otherwise rely on `@ts-expect-error` only if necessary.
