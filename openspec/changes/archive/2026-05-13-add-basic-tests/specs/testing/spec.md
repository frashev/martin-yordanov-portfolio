## ADDED Requirements

### Requirement: Component test runner

The project SHALL provide a Vitest-based test runner configured for React Testing Library + jsdom. Running `npm run test` SHALL execute the suite once (non-watch) and exit with code 0 on success.

#### Scenario: npm run test succeeds

- **WHEN** a developer runs `npm run test`
- **THEN** Vitest executes all test files matching `src/**/*.test.{ts,tsx}`
- **AND** the command exits with code 0 when all tests pass

#### Scenario: Test files are excluded from production build

- **WHEN** a developer runs `npm run build`
- **THEN** test files under `src/__tests__/` and `src/test/` are not included in the production bundle
- **AND** the build succeeds with no TypeScript errors caused by test-only types

### Requirement: Header navigation is covered by a component test

The component test suite SHALL include a test that renders the `Header` component inside a router and asserts that every entry in `primaryNav` is rendered as a link, and that the mobile menu toggle reveals navigation when activated.

#### Scenario: Header test asserts all nav links

- **WHEN** the Header test runs
- **THEN** it finds one rendered link per entry in `primaryNav`

#### Scenario: Header test exercises the mobile toggle

- **WHEN** the Header test simulates a click on the menu toggle button
- **THEN** the navigation links inside the mobile menu region become visible to queries

### Requirement: Home CTA wiring is covered by a component test

The component test suite SHALL include a test that renders the `Home` page inside a router and asserts that the primary booking CTA links to `/contact` and that a secondary link to `/about` is present.

#### Scenario: Home test asserts the CTA target

- **WHEN** the Home test runs
- **THEN** it finds a link whose `href` (or routing `to`) resolves to `/contact`
- **AND** that link's accessible name matches `profile.bookingCtaLabel`

#### Scenario: Home test asserts the secondary About link

- **WHEN** the Home test runs
- **THEN** it finds a link whose `href` (or routing `to`) resolves to `/about`

### Requirement: Projects page renders one card per content item

The component test suite SHALL include a test that renders the `Projects` page inside a router and asserts that the number of rendered project cards equals the length of the `projects` array imported from `src/content/projects.ts`.

#### Scenario: Projects test counts cards

- **WHEN** the Projects test runs
- **THEN** the number of card containers it queries equals `projects.length`

### Requirement: End-to-end smoke test runner

The project SHALL provide a Playwright runner. Running `npm run test:e2e` SHALL start (or reuse) the Vite dev server, execute Playwright specs under `e2e/`, and exit with code 0 on success.

#### Scenario: npm run test:e2e succeeds

- **WHEN** a developer runs `npm run test:e2e` with Playwright browsers installed
- **THEN** Playwright boots the dev server via its `webServer` configuration
- **AND** all specs under `e2e/` pass
- **AND** the command exits with code 0

### Requirement: Smoke test walks the booking funnel

The Playwright suite SHALL include a smoke spec that visits `/`, navigates via the header to `/projects` and `/contact`, and asserts on visible text identifying each page (the page heading and, on Home, the booking CTA label).

#### Scenario: Smoke spec covers Home, Projects, Contact

- **WHEN** the smoke spec runs
- **THEN** it loads `/` and asserts that the "Nikoleta Kaito" heading and the booking CTA labelled `profile.bookingCtaLabel` are visible
- **AND** it activates the Projects nav link and asserts that the Projects page heading is visible
- **AND** it activates the Contact nav link and asserts that the Contact page heading and the placeholder email are visible

### Requirement: Tests target structural cues, not placeholder copy

Test assertions SHALL target structural cues (route paths, accessible roles, content-array lengths, fields read from `profile`) rather than literal placeholder strings, so that swapping placeholder content for real content does not break the suite.

#### Scenario: No test asserts on placeholder marker strings

- **WHEN** inspecting any test file under `src/__tests__/` or `e2e/`
- **THEN** no assertion matches the literal string "Placeholder —" as required content
