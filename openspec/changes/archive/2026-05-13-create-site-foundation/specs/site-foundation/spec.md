## ADDED Requirements

### Requirement: Client-side routing for V1 pages

The application SHALL provide client-side routes for the V1 page set: `/` (Home), `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact`. Unknown routes SHALL render a not-found view that links back to Home.

#### Scenario: Navigating to a known route renders its page

- **WHEN** a user navigates to any V1 path (e.g. `/workshops`)
- **THEN** the application renders the page component associated with that path inside the shared layout

#### Scenario: Unknown route renders not-found view

- **WHEN** a user navigates to a path not in the V1 set (e.g. `/does-not-exist`)
- **THEN** the application renders a not-found view with a link to Home

### Requirement: Shared layout with Header and Footer

The application SHALL render a shared `Header` above and a shared `Footer` below every routed page, without remounting them on navigation.

#### Scenario: Header and Footer are present on every page

- **WHEN** the user is on any V1 route
- **THEN** both the `Header` and the `Footer` are visible in the DOM

#### Scenario: Layout persists across navigation

- **WHEN** the user navigates between two V1 routes
- **THEN** the `Header` and `Footer` are not unmounted and remounted; only the page content changes

### Requirement: Responsive navigation

The `Header` SHALL provide navigation links to every V1 page. On viewports at least 768px wide it SHALL display links inline; on narrower viewports it SHALL collapse into a toggleable menu.

#### Scenario: Desktop navigation

- **WHEN** the viewport is 768px wide or wider
- **THEN** all V1 navigation links are visible inline in the `Header`

#### Scenario: Mobile navigation toggle

- **WHEN** the viewport is narrower than 768px
- **THEN** navigation links are hidden behind a menu toggle button
- **AND** activating the toggle reveals the full list of V1 navigation links

#### Scenario: Active link indication

- **WHEN** the user is on a V1 route
- **THEN** the corresponding navigation link is rendered with a visual active state

### Requirement: SPA hosting fallback

The build output SHALL include a `_redirects` file at the site root that rewrites all paths to `/index.html` with HTTP 200, so static hosts that honor the convention can serve deep links.

#### Scenario: \_redirects file is present in build output

- **WHEN** `npm run build` completes successfully
- **THEN** `dist/_redirects` exists and contains a rule rewriting `/*` to `/index.html` with status 200

### Requirement: Tailwind CSS is available to all components

The application SHALL have Tailwind CSS configured so that utility classes applied in any component take effect at runtime in both development and production builds.

#### Scenario: Utility classes are applied

- **WHEN** a component uses a Tailwind utility class (e.g. `text-center`)
- **THEN** the corresponding style is applied in the rendered page in both `npm run dev` and the `npm run build` output

### Requirement: Build and dev scripts succeed

The project SHALL build and run without errors using the existing npm scripts.

#### Scenario: Dev server starts

- **WHEN** a developer runs `npm run dev`
- **THEN** the Vite dev server starts and serves the application without errors

#### Scenario: Production build succeeds

- **WHEN** a developer runs `npm run build`
- **THEN** the build completes without TypeScript or Vite errors and produces a `dist/` directory
