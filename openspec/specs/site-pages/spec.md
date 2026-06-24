# site-pages Specification

## Purpose

Defines the Martin Yordanov portfolio page set and the content requirements for
each route. Pages use typed content from `src/content/`. The Contact page
provides the Supabase-ready inquiry form; all other pages are read-only.

## Requirements

### Requirement: V1 page set

The application SHALL provide dedicated page components for the V1 routes:
Home, Projects, Process, Gallery, and Contact. Each page SHALL render a
top-level heading or hero heading that identifies the page.

#### Scenario: Each V1 page renders

- **WHEN** the user navigates to any of `/`, `/projects`, `/process`, `/gallery`, or `/contact`
- **THEN** the corresponding page component renders inside the shared layout
- **AND** page copy or media relevant to Martin's portfolio is shown

### Requirement: Home page hero and project CTA

The Home page SHALL include a Hero section with Martin Yordanov's name, a
tagline, a short intro, a primary call-to-action button labeled with
`profile.bookingCtaLabel`, and a secondary link to `/projects`. The primary CTA
SHALL link to `/contact`.

#### Scenario: Hero renders on Home

- **WHEN** the user is on `/`
- **THEN** a Hero section is visible with Martin Yordanov's name, a tagline, a short intro, a primary CTA button, and a secondary link to `/projects`

#### Scenario: Project inquiry CTA links to Contact

- **WHEN** the user activates the Hero's primary CTA on `/`
- **THEN** the application navigates client-side to `/contact`

### Requirement: Verified-or-placeholder content

Page components SHALL NOT include fabricated awards, clients, dates, education,
locations, technical specifications, prices, availability, or biographical
claims attributed to Martin Yordanov.

#### Scenario: No fabricated claims in V1 content

- **WHEN** any V1 page is rendered
- **THEN** content is either based on supplied project material or clearly written as placeholder copy
- **AND** no unverified real-world achievement, client, date, location, or technical specification is asserted about Martin Yordanov

### Requirement: Contact page provides a functional submission form

The Contact page SHALL render a three-step HTML form that collects `name`,
`email`, `subject`, optional `phone`, and `message`. On submit the page SHALL
perform client-side validation. If validation passes, the page SHALL call
`submitContact` from `src/services/contact/contactService.ts` and display one of
three states: **Submitting**, **Success**, or **Error**.

#### Scenario: Required field validation prevents submission

- **WHEN** the user tries to continue or submit with one or more required fields empty
- **THEN** an inline error message appears next to each missing field
- **AND** no request is sent to Supabase

#### Scenario: Valid submission shows loading state

- **WHEN** the user submits the form with all required fields filled
- **THEN** the submit button shows a loading indicator
- **AND** form controls are disabled for the duration of the request

#### Scenario: Successful submission shows success message

- **WHEN** `submitContact` returns `{ ok: true }`
- **THEN** a success message is displayed to the user

#### Scenario: Failed submission shows error and re-enables form

- **WHEN** `submitContact` returns `{ ok: false }`
- **THEN** a user-readable error message is displayed
- **AND** the form can be corrected and submitted again

### Requirement: Site-wide project inquiry CTA

The application SHALL render a shared `BookingCTA` section on every routed page
except `/contact`. The CTA SHALL include a heading, a short prompt, and a
primary button labeled with `profile.bookingCtaLabel` that links to `/contact`.

#### Scenario: CTA appears on non-Contact pages

- **WHEN** the user is on any of `/`, `/projects`, `/process`, or `/gallery`
- **THEN** a `BookingCTA` section is visible above the footer
- **AND** its primary button navigates to `/contact`

#### Scenario: CTA is suppressed on Contact

- **WHEN** the user is on `/contact`
- **THEN** the `BookingCTA` section is not rendered
