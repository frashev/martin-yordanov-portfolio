# Spec: Dark Mode

## Purpose

Defines the behaviour of the site's dark-mode feature — the warm dark colour palette, the Header toggle, localStorage persistence, OS-preference detection, no-flash guarantee, and the `--accent-2` token.

---

## Requirements

### Requirement: Site supports a warm dark colour theme

The site SHALL provide a dark theme that uses deep warm brown tones (not cold grey) for all surfaces, text, and borders. All colour tokens (`--paper`, `--ink`, `--ink-muted`, `--accent`, `--accent-soft`, `--card-surface`, `--soft-border`, `--header-bg`) SHALL have defined dark-mode values.

#### Scenario: Dark theme applies warm dark background

- **WHEN** the dark theme is active
- **THEN** the page background is a deep warm brown (not a grey or blue tone) and is visually distinct from the light background

#### Scenario: Dark theme applies warm light text

- **WHEN** the dark theme is active
- **THEN** body text colour is a warm off-white, readable against the dark background

#### Scenario: Accent colour remains warm in dark theme

- **WHEN** the dark theme is active
- **THEN** the primary accent colour is a lightened terracotta that provides sufficient contrast against the dark background

#### Scenario: All token-based components flip automatically

- **WHEN** the dark theme is active
- **THEN** Header, Footer, cards, and the contact form all reflect the dark palette without individual component changes

---

### Requirement: A toggle button in the Header switches the theme

The Header SHALL render a visible button that cycles the theme **choice** through
three states — Light, Dark, and System — on each click, in the order
Light → Dark → System → Light. The button SHALL display a distinct icon for each
choice (a sun for Light, a moon for Dark, a monitor for System) so the current
choice is identifiable.

#### Scenario: Button shows the light-mode icon when light is chosen

- **WHEN** the theme choice is Light
- **THEN** a sun (or equivalent light) icon is visible in the Header

#### Scenario: Button shows the dark-mode icon when dark is chosen

- **WHEN** the theme choice is Dark
- **THEN** a moon (or equivalent dark) icon is visible in the Header

#### Scenario: Button shows the system icon when system is chosen

- **WHEN** the theme choice is System
- **THEN** a monitor (or equivalent device) icon is visible in the Header

#### Scenario: Clicking cycles through all three choices

- **WHEN** the user clicks the theme button repeatedly
- **THEN** the choice advances Light → Dark → System → Light and the icon updates each time

#### Scenario: Toggle is keyboard accessible

- **WHEN** a keyboard user focuses and activates the button
- **THEN** the choice advances identically to a mouse click

#### Scenario: Toggle has an accessible label describing the next action

- **WHEN** a screen reader reads the button
- **THEN** it announces the next choice the click will select (e.g. "Switch to dark mode", "Switch to system theme", "Switch to light mode")

### Requirement: Theme choice persists across sessions

The user's chosen theme SHALL be saved to `localStorage` and restored on subsequent visits.

#### Scenario: Dark choice persists on reload

- **WHEN** the user switches to dark mode and reloads the page
- **THEN** the site loads in dark mode without a flash of light mode

#### Scenario: Light choice persists on reload

- **WHEN** the user switches to light mode and reloads the page
- **THEN** the site loads in light mode

---

### Requirement: OS preference is respected on first visit

When no saved theme exists in `localStorage`, the site SHALL default to the user's OS `prefers-color-scheme` setting.

#### Scenario: Dark OS preference → dark default

- **WHEN** a first-time visitor's OS is set to dark mode and no localStorage value exists
- **THEN** the site loads in dark mode

#### Scenario: Light OS preference → light default

- **WHEN** a first-time visitor's OS is set to light mode and no localStorage value exists
- **THEN** the site loads in light mode

#### Scenario: Saved choice overrides OS preference

- **WHEN** a returning visitor has saved "light" in localStorage but their OS is dark
- **THEN** the site loads in light mode (saved choice wins)

---

### Requirement: No flash of wrong theme on load

The correct theme SHALL be applied before the first paint so the user does not see a flash of the opposite theme.

#### Scenario: Dark-mode user sees no light flash

- **WHEN** a user with dark mode saved reloads the page
- **THEN** the page background is dark from the first visible frame (no white flash)

---

### Requirement: A second accent colour token is available

A golden amber `--accent-2` token SHALL be defined for both light and dark themes and be available for use in future UI work.

#### Scenario: accent-2 token is defined

- **WHEN** the computed styles of `<html>` are inspected
- **THEN** `--accent-2` resolves to a golden amber value in light mode and a lighter golden amber in dark mode

---

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

### Requirement: System mode follows the OS preference live

When the theme choice is System, the resolved theme SHALL match the operating
system's `prefers-color-scheme` setting, and SHALL update automatically if that
setting changes while the page is open — without requiring a reload or another click.

#### Scenario: System choice resolves to the OS preference

- **WHEN** the theme choice is System and the OS preference is dark
- **THEN** the site renders in dark mode

#### Scenario: System choice updates live when the OS preference changes

- **WHEN** the theme choice is System and the OS preference changes from light to dark while the page is open
- **THEN** the site switches to dark mode without a reload

#### Scenario: A pinned choice ignores OS changes

- **WHEN** the theme choice is Light (or Dark) and the OS preference changes
- **THEN** the resolved theme stays on the pinned choice

#### Scenario: System choice persists across reloads with no flash

- **WHEN** a visitor has chosen System and reloads the page
- **THEN** the page paints the current OS-preferred theme from the first frame (no flash of the opposite theme)
