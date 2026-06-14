## MODIFIED Requirements

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

## ADDED Requirements

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
