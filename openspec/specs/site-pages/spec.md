# site-pages Specification

## Purpose

Defines the V1 page set and their content requirements. All pages use placeholder copy from `src/content/`. The Contact page provides a fully functional Supabase-backed submission form; all other pages are read-only.

## Requirements

### Requirement: V1 page set

The application SHALL provide a dedicated page component for each V1 route: Home, About, Projects, Workshops, Events, Gallery, Videos, Contact. Each page SHALL render at least a top-level heading identifying the page and a short placeholder description.

#### Scenario: Each V1 page renders

- **WHEN** the user navigates to any of `/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact`
- **THEN** the corresponding page component renders with a visible heading identifying the page
- **AND** placeholder body copy is shown

### Requirement: Home page hero and booking CTA

The Home page SHALL include a Hero section with the name, a tagline, a short intro, a primary call-to-action button labeled with `profile.bookingCtaLabel`, and a secondary link to `/about`. The primary CTA SHALL link to `/contact`. On viewports `md` and wider, the Hero SHALL use a two-column layout with the text on one side and a decorative inline-SVG element (no shipped image) on the other; below `md` it SHALL stack to a single column.

#### Scenario: Hero renders on Home

- **WHEN** the user is on `/`
- **THEN** a Hero section is visible with Nikoleta Kaito's name, a tagline, a short intro, a primary CTA button, and a secondary link to `/about`

#### Scenario: Booking CTA links to Contact

- **WHEN** the user activates the Hero's primary CTA on `/`
- **THEN** the application navigates client-side to `/contact`

#### Scenario: Hero is responsive

- **WHEN** the viewport is `md` (768px) or wider
- **THEN** the Hero renders in a two-column layout (text and decorative element)
- **AND** below `md` it collapses to a single stacked column

### Requirement: Placeholder-only content

Page components SHALL display only placeholder copy. They SHALL NOT include fabricated awards, festivals, venues, partner names, dates, or biographical claims attributed to Nikoleta Kaito.

#### Scenario: No fabricated claims in V1 content

- **WHEN** any V1 page is rendered
- **THEN** all content originates from placeholder strings clearly marked as such
- **AND** no specific real-world achievement, award, festival, or collaboration is asserted about Nikoleta Kaito

### Requirement: Contact page provides a functional submission form

The Contact page SHALL render a functional HTML form with the following fields: `name` (text, required), `email` (email, required), `phone` (text, optional), `subject` (text, optional), `message` (textarea, required). On submit the page SHALL perform client-side validation. If any required field is empty, the page SHALL display an inline error adjacent to the offending field without submitting to the backend. If validation passes the page SHALL call `submitContact` from `src/services/contact/contactService.ts` and display one of three states: **Submitting** (loading indicator, form not re-submittable), **Success** (success message, form cleared or hidden), **Error** (user-readable message, submit button re-enabled). See the `contact-backend` spec for service layer and database requirements.

#### Scenario: Required field validation prevents submission

- **WHEN** the user submits the form with one or more required fields empty
- **THEN** an inline error message appears next to each empty required field
- **AND** no request is sent to Supabase

#### Scenario: Valid submission shows loading state

- **WHEN** the user submits the form with all required fields filled
- **THEN** the submit button is replaced by a loading indicator
- **AND** the form fields are disabled for the duration of the request

#### Scenario: Successful submission shows success message

- **WHEN** `submitContact` returns `{ ok: true }`
- **THEN** a success message is displayed to the user
- **AND** the form is cleared or hidden

#### Scenario: Failed submission shows error and re-enables form

- **WHEN** `submitContact` returns `{ ok: false }`
- **THEN** a user-readable error message is displayed
- **AND** the submit button is re-enabled so the user can try again

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
