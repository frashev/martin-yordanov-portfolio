## ADDED Requirements

### Requirement: Site-wide booking CTA

The application SHALL render a shared `BookingCTA` section on every routed page except `/contact`. The CTA SHALL include a heading, a short prompt, and a primary button labeled with `profile.bookingCtaLabel` that links to `/contact`.

#### Scenario: CTA appears on non-Contact pages

- **WHEN** the user is on any of `/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`
- **THEN** a `BookingCTA` section is visible above the footer
- **AND** its primary button navigates to `/contact`

#### Scenario: CTA is suppressed on Contact

- **WHEN** the user is on `/contact`
- **THEN** the `BookingCTA` section is not rendered

### Requirement: Domain pages render content as cards

The Projects, Workshops, Events, and Videos pages SHALL render each item using the shared `Card` component, producing consistent visual rhythm across these four pages.

#### Scenario: Each domain item is a card

- **WHEN** the user is on `/projects`, `/workshops`, `/events`, or `/videos`
- **THEN** every item in the rendered list uses the shared `Card` component as its container

### Requirement: Reading-friendly About layout

The About page SHALL constrain its body width for readability (max-width matched to comfortable line length) and SHALL apply a serif display heading consistent with the theme.

#### Scenario: About is reading-friendly

- **WHEN** the user is on `/about`
- **THEN** the bio paragraphs are constrained to a comfortable line length (no full-viewport-width text)
- **AND** the page heading uses the serif display stack from the theme

## MODIFIED Requirements

### Requirement: Home page hero and booking CTA

The Home page SHALL include a Hero section with the name, a tagline, a short intro, a primary call-to-action button labeled with `profile.bookingCtaLabel`, and a secondary link to `/about`. The primary CTA SHALL link to `/contact`. On viewports `md` and wider, the Hero SHALL use a two-column layout with the text on one side and a decorative inline-SVG element (no shipped image) on the other; below `md` it SHALL stack to a single column.

#### Scenario: Hero renders on Home

- **WHEN** the user is on `/`
- **THEN** a Hero section is visible with Martin Yordanov's name, a tagline, a short intro, a primary CTA button, and a secondary link to `/about`

#### Scenario: Booking CTA links to Contact

- **WHEN** the user activates the Hero's primary CTA on `/`
- **THEN** the application navigates client-side to `/contact`

#### Scenario: Hero is responsive

- **WHEN** the viewport is `md` (768px) or wider
- **THEN** the Hero renders in a two-column layout (text and decorative element)
- **AND** below `md` it collapses to a single stacked column
