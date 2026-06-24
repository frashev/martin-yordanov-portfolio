# site-foundation Specification

## Purpose

Defines the core application shell for the Martin Yordanov portfolio:
client-side routing for the V1 page set, the shared Layout wrapper, responsive
navigation, Tailwind CSS availability, and Cloudflare Workers SPA routing.

## Requirements

### Requirement: Client-side routing for V1 pages

The application SHALL provide client-side routes for `/` (Home), `/projects`,
`/process`, `/gallery`, and `/contact`. Unknown routes SHALL render a not-found
view that links back to Home.

#### Scenario: Navigating to a known route renders its page

- **WHEN** a user navigates to any V1 path such as `/projects`
- **THEN** the application renders the page component associated with that path inside the shared layout

#### Scenario: Unknown route renders not-found view

- **WHEN** a user navigates to a path not in the V1 set such as `/does-not-exist`
- **THEN** the application renders a not-found view with a link to Home

### Requirement: Shared layout with Header and Footer

The application SHALL render a shared `Header` above and a shared `Footer` below
every routed page.

#### Scenario: Header and Footer are present on every page

- **WHEN** the user is on any V1 route
- **THEN** both the `Header` and the `Footer` are visible in the DOM

### Requirement: Responsive navigation

The `Header` SHALL provide navigation links from `src/content/navigation.ts`.
On viewports at least 768px wide it SHALL display links inline; on narrower
viewports it SHALL collapse into a toggleable menu.

#### Scenario: Desktop navigation

- **WHEN** the viewport is 768px wide or wider
- **THEN** all primary navigation links are visible inline in the `Header`

#### Scenario: Mobile navigation toggle

- **WHEN** the viewport is narrower than 768px
- **THEN** navigation links are hidden behind a menu toggle button
- **AND** activating the toggle reveals the full primary navigation list

### Requirement: SPA deep-link routing via Cloudflare Workers

The `wrangler.toml` SHALL set `not_found_handling = "single-page-application"`
so Cloudflare Workers serves `index.html` for any path not matched by a static
asset.

#### Scenario: Deep link resolves to the SPA shell

- **WHEN** a user navigates directly to a V1 route such as `/process` in a deployed environment
- **THEN** Cloudflare Workers serves `index.html` and React Router renders the correct page

### Requirement: Build and dev scripts succeed

The project SHALL build and run without errors using the existing npm scripts.

#### Scenario: Dev server starts

- **WHEN** a developer runs `npm run dev`
- **THEN** the Vite dev server starts and serves the application without errors

#### Scenario: Production build succeeds

- **WHEN** a developer runs `npm run build`
- **THEN** the build completes without TypeScript or Vite errors and produces a `dist/` directory

### Requirement: Skip-to-content link is the first focusable element

A skip link SHALL be the first interactive element in the document tab order on
every V1 page. Activating the link SHALL move keyboard focus to the `<main>`
landmark and SHALL NOT trigger a full page reload.

#### Scenario: Skip link moves focus to main

- **WHEN** a keyboard user focuses the skip link and activates it
- **THEN** keyboard focus moves to the `<main>` element
- **AND** the page does not perform a full reload

### Requirement: Route change announces the new page to assistive technology

The application SHALL move keyboard focus to the new page's `<h1>` or to
`<main>` if the new page has no `<h1>` when a user navigates between V1 routes
via client-side routing.

#### Scenario: Navigation moves focus to the new page heading

- **WHEN** a user is on `/projects` and activates a link to `/gallery`
- **THEN** after the route change, the new page heading receives keyboard focus

### Requirement: Main and inquiry CTA landmarks are named

The `<main>` element SHALL carry an accessible name, and the `<section>`
rendered by `BookingCTA` SHALL carry an `aria-label` attribute so assistive
technology can announce the regions meaningfully.

#### Scenario: Landmark labels are present

- **WHEN** any V1 route is rendered
- **THEN** the `<main>` element has a non-empty `aria-label`
- **AND** any rendered `BookingCTA` section has a non-empty `aria-label`
