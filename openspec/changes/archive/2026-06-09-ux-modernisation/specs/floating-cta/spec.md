## ADDED Requirements

### Requirement: Floating Booking CTA

The application SHALL render a fixed-position booking call-to-action that
appears after the visitor scrolls past the hero area and is suppressed on the
Contact route.

#### Scenario: CTA appears after scroll depth

- **WHEN** a visitor opens a non-Contact route and scrolls at least 300px
- **THEN** a fixed "Book Nikoleta" link becomes visible and keyboard-focusable

#### Scenario: CTA is hidden before scroll depth

- **WHEN** a visitor opens a non-Contact route before scrolling 300px
- **THEN** the floating CTA is visually hidden
- **AND** it is not keyboard-focusable

#### Scenario: CTA is suppressed on Contact

- **WHEN** a visitor opens `/contact`
- **THEN** the floating CTA is not rendered
