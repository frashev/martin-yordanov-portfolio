# site-foundation Specification

## Purpose

Defines the core application shell: client-side routing for the V1 page set, the shared Layout wrapper (Header, Footer, BookingCTA), responsive navigation, Tailwind CSS availability, and the Cloudflare Workers SPA routing configuration.

## Requirements

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

### Requirement: SPA deep-link routing via Cloudflare Workers

The `wrangler.toml` SHALL set `not_found_handling = "single-page-application"` so that Cloudflare Workers serves `index.html` for any path not matched by a static asset, enabling React Router to handle client-side routing on deep links.

#### Scenario: Deep link resolves to the SPA shell

- **WHEN** a user navigates directly to a V1 route (e.g. `/workshops`) in a deployed environment
- **THEN** Cloudflare Workers serves `index.html` and React Router renders the correct page

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

### Requirement: Skip-to-content link is the first focusable element

A skip link SHALL be the first interactive element in the document tab order on every V1 page. Activating the link SHALL move keyboard focus to the `<main>` landmark and SHALL NOT trigger a full page reload.

#### Scenario: Skip link is present and hidden until focused

- **WHEN** a user loads any V1 route
- **THEN** a link with the text "Skip to main content" (or equivalent) is the first focusable element in the DOM
- **AND** the link is not visible to sighted users until it receives keyboard focus
- **AND** the link is announced by assistive technology when reached by Tab

#### Scenario: Activating the skip link moves focus to main

- **WHEN** a keyboard user has focused the skip link and activates it
- **THEN** keyboard focus moves to the `<main>` element
- **AND** the `<main>` element has an `id` that the skip link's `href` references
- **AND** the page does not perform a full reload

#### Scenario: Main is focusable but not in the tab order

- **WHEN** the `<main>` element is rendered
- **THEN** the element is programmatically focusable (e.g. via `tabindex="-1"` or equivalent)
- **AND** the element is NOT in the sequential tab order (so a keyboard user does not have to Tab through an empty container to reach the footer)

### Requirement: Route change announces the new page to assistive technology

When a user navigates between V1 routes via client-side routing, the application SHALL move keyboard focus to the new page's `<h1>` (or to `<main>` if the new page has no `<h1>`) so that assistive technology announces the page change. The new page's `<h1>` is the canonical signal of "you are now on page X" for screen-reader users.

#### Scenario: Navigation moves focus to the new page's h1

- **WHEN** a user is on a V1 route (e.g. `/projects`) and activates a link to a different V1 route (e.g. `/workshops`)
- **THEN** after the route change, the `<h1>` element of the new page receives keyboard focus
- **AND** assistive technology announces the new page's title (the h1 text)

#### Scenario: Initial page load does not move focus

- **WHEN** a user loads the application for the first time (cold load, hash change, or deep link to a V1 route)
- **THEN** the application does NOT programmatically move focus to the `<h1>` on the initial render (so that native browser focus behaviour is preserved)

#### Scenario: Page with no h1 falls back to main

- **WHEN** a navigated-to V1 page does not contain an `<h1>` element
- **THEN** the application moves keyboard focus to the `<main>` element instead
- **AND** assistive technology announces the main landmark as the new focus target

### Requirement: Main landmark carries an accessible name

The `<main>` element SHALL carry an `aria-label` attribute with a concise, stable description (e.g. "Main content") so that assistive technology announces the landmark meaningfully when focus lands on it — whether via the skip link or via the route-announcement focus move.

#### Scenario: Main landmark is announced with a label

- **WHEN** a screen reader user activates the skip link or navigates between V1 routes
- **THEN** assistive technology announces the `<main>` element with the label "Main content" (or equivalent)
- **AND** the label does not change between route navigations (it is not route-specific)

#### Scenario: Main aria-label is present in the DOM

- **WHEN** any V1 route is rendered
- **THEN** `document.querySelector('main').getAttribute('aria-label')` returns a non-empty string

### Requirement: BookingCTA section is a named landmark

The `<section>` element rendered by `BookingCTA` SHALL carry an `aria-label` attribute so that it registers as a named landmark in the accessibility tree. Without a label, `<section>` is treated as a generic (non-landmark) container by assistive technology.

#### Scenario: BookingCTA section appears as a named landmark

- **WHEN** a screen reader user browses by landmarks on any V1 route where the BookingCTA is visible (all routes except `/contact`)
- **THEN** the BookingCTA section is listed as a named region landmark (e.g. "Book a session, region")

#### Scenario: Section aria-label is present in the DOM

- **WHEN** the BookingCTA is rendered
- **THEN** its root `<section>` element has a non-empty `aria-label` attribute
