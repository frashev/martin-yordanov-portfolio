# Spec: page-meta

## Purpose

Every page in the site SHALL carry accurate, route-specific meta tags -
document title, meta description, and Open Graph tags - so browser tabs,
search-engine snippets, and social previews reflect the current Martin
Yordanov portfolio page.

## Requirements

### Requirement: Each page has a unique document title

Every route SHALL render a `<title>` that clearly identifies the page and the
site. The Home page title SHALL identify Martin Yordanov and the kinetic
furniture / drawing-machine focus.

#### Scenario: Home page title

- **WHEN** a visitor navigates to `/`
- **THEN** the browser tab and `document.title` read `Martin Yordanov | Kinetic Furniture & Drawing Machines`

#### Scenario: Inner page title

- **WHEN** a visitor navigates to `/projects`
- **THEN** `document.title` reads `Projects | Martin Yordanov`

#### Scenario: Title updates on route change

- **WHEN** a visitor navigates from `/` to `/contact`
- **THEN** `document.title` updates to `Contact | Martin Yordanov` without a full page reload

#### Scenario: All 5 routes have distinct titles

- **WHEN** each of the 5 routes (`/`, `/projects`, `/process`, `/gallery`, `/contact`) is visited
- **THEN** each renders a different, non-empty `<title>` value

### Requirement: Each page has a meta description

Every route SHALL render a `<meta name="description">` with a concise,
page-specific description of the Martin Yordanov portfolio page.

#### Scenario: Meta description present on home

- **WHEN** a visitor or crawler loads `/`
- **THEN** `<meta name="description">` exists in `<head>` with a non-empty content value

#### Scenario: Meta description is page-specific

- **WHEN** `/projects` and `/process` are each loaded
- **THEN** their respective `<meta name="description">` values differ from each other and from the home page

### Requirement: Open Graph tags are present on every route

Every route SHALL render the four core OG tags: `og:title`, `og:description`,
`og:type`, `og:url`.

#### Scenario: OG title matches page title

- **WHEN** `/projects` is loaded
- **THEN** `<meta property="og:title">` content matches the page `<title>` value

#### Scenario: OG type is set correctly

- **WHEN** any page is loaded
- **THEN** `<meta property="og:type">` is `website`

#### Scenario: OG URL reflects the current route

- **WHEN** `/process` is loaded
- **THEN** `<meta property="og:url">` contains `/process` in its value

### Requirement: Open Graph image is present on every route

Every route SHALL render `<meta property="og:image">` with the shared fallback
image until a custom page image is configured.

#### Scenario: OG image tag exists

- **WHEN** any route is loaded
- **THEN** `<meta property="og:image">` exists in `<head>` with a non-empty content value

### Requirement: Meta tags update correctly on client-side navigation

The application SHALL update all meta tags to reflect the new route's values
when the user navigates between routes without a full page reload.

#### Scenario: Title and description update on navigation

- **WHEN** a visitor clicks the nav link to `/gallery` from `/`
- **THEN** `document.title` and `<meta name="description">` update to the Gallery page values within one render cycle

#### Scenario: No stale OG tags after navigation

- **WHEN** a visitor navigates from `/projects` to `/contact`
- **THEN** `<meta property="og:title">` reflects the Contact page value, not the Projects page value

### Requirement: Base HTML title is a sensible fallback

The static `index.html` SHALL have a human-readable `<title>` as a fallback for
the brief moment before React hydrates.

#### Scenario: Index.html fallback title

- **WHEN** the raw `index.html` is inspected before JS loads
- **THEN** `<title>` reads `Martin Yordanov`
