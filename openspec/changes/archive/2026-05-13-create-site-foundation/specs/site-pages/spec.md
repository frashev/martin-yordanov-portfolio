## ADDED Requirements

### Requirement: V1 page set

The application SHALL provide a dedicated page component for each V1 route: Home, About, Projects, Workshops, Events, Gallery, Videos, Contact. Each page SHALL render at least a top-level heading identifying the page and a short placeholder description.

#### Scenario: Each V1 page renders

- **WHEN** the user navigates to any of `/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact`
- **THEN** the corresponding page component renders with a visible heading identifying the page
- **AND** placeholder body copy is shown

### Requirement: Home page hero and booking CTA

The Home page SHALL include a Hero section with a name/title heading, a short tagline, and a primary call-to-action button labeled with booking intent (e.g. "Book Nikoleta"). The CTA SHALL link to the Contact page.

#### Scenario: Hero renders on Home

- **WHEN** the user is on `/`
- **THEN** a Hero section is visible with Nikoleta Kaito's name, a tagline, and a primary CTA button

#### Scenario: Booking CTA links to Contact

- **WHEN** the user activates the Hero's booking CTA on `/`
- **THEN** the application navigates client-side to `/contact`

### Requirement: Placeholder-only content

Page components SHALL display only placeholder copy. They SHALL NOT include fabricated awards, festivals, venues, partner names, dates, or biographical claims attributed to Nikoleta Kaito.

#### Scenario: No fabricated claims in V1 content

- **WHEN** any V1 page is rendered
- **THEN** all content originates from placeholder strings clearly marked as such
- **AND** no specific real-world achievement, award, festival, or collaboration is asserted about Nikoleta Kaito

### Requirement: Contact page exposes a placeholder contact path

The Contact page SHALL display at minimum a placeholder email address or a contact-form placeholder, clearly marked as a placeholder, so the booking CTA target is meaningful.

#### Scenario: Contact page surface

- **WHEN** the user is on `/contact`
- **THEN** the page renders a placeholder contact email or form region, clearly marked as a placeholder
