## ADDED Requirements

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
