# visual-theme Specification

## Purpose

Defines the visual design system for the Martin Yordanov portfolio: warm
paper-and-ink tokens, a terracotta accent, serif display headings, system body
text, shared card surfaces, and gallery media treatment.

## Requirements

### Requirement: Warm artistic theme tokens

The application SHALL define a coherent visual theme in `src/index.css`,
covering at minimum: a warm off-white page background, deep neutral text, a
warm accent color, a serif display stack for top-level headings, and a sans body
stack. The theme SHALL NOT depend on externally-loaded fonts.

#### Scenario: Tokens are applied globally

- **WHEN** the application loads any route
- **THEN** the body background uses the warm paper token
- **AND** body text uses the ink token
- **AND** `<h1>` and `<h2>` use the serif display stack

### Requirement: Shared Card primitive

The application SHALL provide a `Card` component that can render portfolio or
process items with consistent surface, padding, border, and spacing.

#### Scenario: Card is reused

- **WHEN** inspecting the Process page
- **THEN** process items are rendered via the shared `Card` component, not via ad-hoc per-page markup

### Requirement: Gallery media tiles

The application SHALL provide a `PlaceholderImage` component used by Gallery to
render a real image when `src` is present and a clearly marked placeholder tile
when it is not. Plain unlabeled grey boxes SHALL NOT be used as media
placeholders.

#### Scenario: Gallery uses the media tile

- **WHEN** the user is on `/gallery`
- **THEN** each tile renders through the `PlaceholderImage` component with a caption and accessible image text
