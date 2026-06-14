## ADDED Requirements

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
