## ADDED Requirements

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

The Header SHALL render a visible toggle button that switches between light and dark themes on click.

#### Scenario: Toggle button is visible in light mode

- **WHEN** the site is in light mode
- **THEN** a moon (or equivalent dark-mode) icon is visible in the Header

#### Scenario: Toggle button is visible in dark mode

- **WHEN** the site is in dark mode
- **THEN** a sun (or equivalent light-mode) icon is visible in the Header

#### Scenario: Toggle switches theme

- **WHEN** the user clicks the theme toggle button
- **THEN** the theme switches and the icon updates to reflect the new state

#### Scenario: Toggle is keyboard accessible

- **WHEN** a keyboard user focuses and activates the toggle button
- **THEN** the theme switches identically to a mouse click

#### Scenario: Toggle has an accessible label

- **WHEN** a screen reader reads the toggle button
- **THEN** it announces "Switch to dark mode" or "Switch to light mode" matching the current action

---

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
