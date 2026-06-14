# Spec: page-meta

## Purpose

Every page in the site SHALL carry accurate, route-specific meta tags — document title, meta description, and Open Graph tags — so that browser tabs, search-engine snippets, and social-media previews all reflect the current page correctly.

---

## Requirements

### Requirement: Each page has a unique document title

Every route SHALL render a `<title>` that clearly identifies the page and the site.
Format: `<Page Name> — Nikoleta Kaito` (home page uses just `Nikoleta Kaito — Latin Dancer & Choreographer`).

#### Scenario: Home page title

- **WHEN** a visitor navigates to `/`
- **THEN** the browser tab and `document.title` read `Nikoleta Kaito — Latin Dancer & Choreographer`

#### Scenario: Inner page title

- **WHEN** a visitor navigates to `/projects`
- **THEN** `document.title` reads `Projects — Nikoleta Kaito`

#### Scenario: Title updates on route change

- **WHEN** a visitor navigates from `/` to `/contact`
- **THEN** `document.title` updates to `Contact — Nikoleta Kaito` without a full page reload

#### Scenario: All 8 routes have distinct titles

- **WHEN** each of the 8 routes (`/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact`) is visited
- **THEN** each renders a different, non-empty `<title>` value

---

### Requirement: Each page has a meta description

Every route SHALL render a `<meta name="description">` with a concise, page-specific description (under 160 characters).

#### Scenario: Meta description present on home

- **WHEN** a visitor or crawler loads `/`
- **THEN** `<meta name="description">` exists in `<head>` with a non-empty content value

#### Scenario: Meta description is page-specific

- **WHEN** `/projects` and `/workshops` are each loaded
- **THEN** their respective `<meta name="description">` values differ from each other and from the home page

#### Scenario: Description under 160 characters

- **WHEN** any route is loaded
- **THEN** the `<meta name="description">` content is 160 characters or fewer

---

### Requirement: Open Graph tags are present on every route

Every route SHALL render the four core OG tags: `og:title`, `og:description`, `og:type`, `og:url`.

#### Scenario: OG title matches page title

- **WHEN** `/projects` is loaded
- **THEN** `<meta property="og:title">` content matches the page `<title>` value

#### Scenario: OG type is set correctly

- **WHEN** any page is loaded
- **THEN** `<meta property="og:type">` is `website`

#### Scenario: OG URL reflects the current route

- **WHEN** `/workshops` is loaded
- **THEN** `<meta property="og:url">` contains `/workshops` in its value

---

### Requirement: Open Graph image is present on every route

Every route SHALL render `<meta property="og:image">` with a fallback monogram image until a real photo is available.

#### Scenario: OG image tag exists

- **WHEN** any route is loaded
- **THEN** `<meta property="og:image">` exists in `<head>` with a non-empty content value

#### Scenario: OG image is the monogram when no real photo is set

- **WHEN** a route has no custom `ogImage` defined in `seo.ts`
- **THEN** `og:image` uses the shared monogram fallback

---

### Requirement: Meta tags update correctly on client-side navigation

When the user navigates between routes without a full page reload, all meta tags SHALL update to reflect the new route's values. The title and OG tags SHALL be set as part of the route's first render (synchronously, before paint) rather than in a delayed effect, so the static `index.html` title is never visible to a user or unfurler.

#### Scenario: Title and description update on navigation

- **WHEN** a visitor clicks the nav link to `/events` from `/`
- **THEN** `document.title` and `<meta name="description">` update to the Events page values within one render cycle

#### Scenario: No stale OG tags after navigation

- **WHEN** a visitor navigates from `/projects` to `/contact`
- **THEN** `<meta property="og:title">` reflects the Contact page value, not the Projects page value

#### Scenario: Title is set during the first render

- **WHEN** a route first loads
- **THEN** `document.title` matches the route's title on the first render pass
- **AND** the static `index.html` title is not briefly visible to the user or to a JS-enabled unfurler

### Requirement: Base HTML title is a sensible fallback

The static `index.html` SHALL have a human-readable `<title>` as a fallback for the brief moment before React hydrates.

#### Scenario: Index.html fallback title

- **WHEN** the raw `index.html` is inspected (before JS loads)
- **THEN** `<title>` reads `Nikoleta Kaito` (not `nikoleta-kaito-website`)
