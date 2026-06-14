## MODIFIED Requirements

### Requirement: Reduced-motion guard disables all non-essential motion

All entrance, scroll-reveal, route-transition, and decorative motion introduced by this capability SHALL be disabled when the user's environment reports `prefers-reduced-motion: reduce`. Under reduced motion, content SHALL appear in its final state immediately (fully visible, no transform offset) and route changes SHALL be instant. **Essential feedback that is itself motion-based (e.g. a spinning loading indicator) SHALL be rendered as a static visual under reduced motion rather than hidden, so the user still receives the feedback the motion was conveying.**

#### Scenario: Animations suppressed under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` loads any route
- **THEN** the hero, sections, and cards are rendered fully visible with no entrance offset or fade
- **AND** no element animates on scroll into view

#### Scenario: Route changes are instant under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` navigates between two routes
- **THEN** the new page replaces the old one without a cross-fade

#### Scenario: Motion plays for users without the preference

- **WHEN** a user without `prefers-reduced-motion: reduce` loads the Home page
- **THEN** the hero entrance and scroll-reveal animations play

#### Scenario: Contact form spinner is static under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` submits the contact form
- **THEN** the form enters the submitting state with a visible loading indicator
- **AND** the loading indicator is rendered as a static visual (not spinning, not hidden)
- **AND** the user receives the same loading feedback as a user without the reduced-motion preference, just without the rotation animation
