## 1. Dependencies

- [x] 1.1 Install dev dependencies: `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`, `@playwright/test`
- [x] 1.2 Run `npx playwright install chromium` to fetch the browser binary

## 2. Vitest configuration

- [x] 2.1 Add a `/// <reference types="vitest/config" />` triple-slash directive at the top of `vite.config.ts`
- [x] 2.2 Extend `defineConfig` with a `test` block: `environment: "jsdom"`, `globals: false`, `setupFiles: ["./src/test/setup.ts"]`, `include: ["src/**/*.test.{ts,tsx}"]`, `css: true`
- [x] 2.3 Create `src/test/setup.ts` importing `@testing-library/jest-dom/vitest`
- [x] 2.4 Update `tsconfig.app.json` to exclude `src/**/*.test.ts`, `src/**/*.test.tsx`, `src/test`, and `e2e` from the production type check

## 3. Component tests

- [x] 3.1 Create `src/__tests__/Header.test.tsx`: render `<MemoryRouter><Header /></MemoryRouter>`, assert `primaryNav.length` links are present (use the imported array), and that clicking the toggle button reveals the mobile nav region
- [x] 3.2 Create `src/__tests__/Home.test.tsx`: render `<MemoryRouter><Home /></MemoryRouter>`, assert the heading text matches `profile.name`, the primary CTA's `href` resolves to `/contact` and its accessible name matches `profile.bookingCtaLabel`, and a link to `/about` is present
- [x] 3.3 Create `src/__tests__/Projects.test.tsx`: render `<MemoryRouter><Projects /></MemoryRouter>`, assert that the number of project headings (or `<article>` containers) equals `projects.length`

## 4. Playwright setup

- [x] 4.1 Create `playwright.config.ts` with `testDir: "e2e"`, chromium-only `projects`, and a `webServer` running `npm run dev` on `http://localhost:5173` with `reuseExistingServer: !process.env.CI`
- [x] 4.2 Create `e2e/smoke.spec.ts`: navigate to `/`, assert the `Nikoleta Kaito` heading + CTA label from `profile`, click "Projects" in the header, assert the Projects heading, click "Contact", assert the Contact heading + `profile.contactEmail`
- [x] 4.3 Update `.gitignore` to ignore `/playwright-report/` and `/test-results/`

## 5. npm scripts

- [x] 5.1 Add `"test": "vitest run"` to `package.json`
- [x] 5.2 Add `"test:e2e": "playwright test"` to `package.json`

## 6. Verification

- [x] 6.1 Run `npm run test` — all suites pass, exit 0
- [x] 6.2 Run `npm run test:e2e` — smoke spec passes, exit 0
- [x] 6.3 Run `npm run build` — passes without TypeScript or Vite errors; test files are not compiled into the production bundle
- [x] 6.4 Grep `src/__tests__/` and `e2e/` for the literal string `Placeholder —` used as a required assertion; confirm no such assertion exists
