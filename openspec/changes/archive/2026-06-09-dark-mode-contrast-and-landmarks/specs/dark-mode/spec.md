## ADDED Requirements

### Requirement: Dark mode tokens meet WCAG AA contrast ratios

All foreground CSS tokens used for body text, muted text, and interactive element labels SHALL provide at minimum a 4.5:1 contrast ratio against their typical dark-mode background token. Foreground tokens used exclusively for large text (≥ 18pt / 24px, or ≥ 14pt / 18.67px bold) or UI component graphics (icons, focus indicators) SHALL provide at minimum a 3:1 ratio. The warm-brown palette SHALL be preserved — adjustments are limited to lightening foreground values or darkening background values within the existing hue family.

#### Scenario: Body text passes AA contrast in dark mode

- **WHEN** the dark theme is active
- **THEN** the computed contrast ratio of `--ink` against `--paper` is at least 4.5:1

#### Scenario: Muted text passes AA contrast in dark mode

- **WHEN** the dark theme is active
- **THEN** the computed contrast ratio of `--ink-muted` against `--paper` is at least 4.5:1
- **AND** the computed contrast ratio of `--ink-muted` against `--card-surface` is at least 4.5:1

#### Scenario: Accent-coloured text passes the correct threshold in dark mode

- **WHEN** the dark theme is active and `--accent` is used as a text colour on `--paper`
- **THEN** the contrast ratio is at least 4.5:1 (normal text) or 3:1 (large text / UI icon), matching the actual usage

#### Scenario: Token values remain warm-toned after adjustment

- **WHEN** inspecting the adjusted dark-mode token values
- **THEN** the hue of each token stays within the warm brown / terracotta family (no shift to grey or blue)
