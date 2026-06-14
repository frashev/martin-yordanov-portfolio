# visual-theme Specification

## Purpose

Defines the visual design system: CSS custom property tokens (warm off-white background, deep neutral ink, rose/terracotta accent, serif display stack, system-sans body stack), the shared `Card` primitive used by domain list pages, and the `PlaceholderImage` tile used by Gallery and Videos.

## Requirements

### Requirement: Warm artistic theme tokens

The application SHALL define a coherent visual theme expressed through Tailwind utilities and a small CSS-token layer in `src/index.css`, covering at minimum: a warm off-white page background, a deep neutral text color, a warm accent color (rose/terracotta family), a serif display stack for top-level headings, and a sans body stack. The theme SHALL NOT depend on any externally-loaded font.

#### Scenario: Tokens are applied globally

- **WHEN** the application loads any route
- **THEN** the body background uses the warm off-white token
- **AND** body text uses the neutral text token
- **AND** `<h1>` and `<h2>` use the serif display stack

#### Scenario: No external font requests

- **WHEN** the application boots
- **THEN** no network requests are made to load typography assets

### Requirement: Shared Card primitive

The application SHALL provide a `Card` component used by the Projects, Workshops, Events, and Videos pages to render each item with consistent surface, padding, border, and spacing.

#### Scenario: Card is reused

- **WHEN** inspecting Projects, Workshops, Events, and Videos pages
- **THEN** each item is rendered via the shared `Card` component, not via ad-hoc per-page markup

### Requirement: Branded placeholder media tile

The application SHALL provide a `PlaceholderImage` component used by Gallery (aspect square) and Videos (aspect video) to render a clearly-marked placeholder media tile with an inline SVG icon and a short caption. Plain unlabeled grey boxes SHALL NOT be used as media placeholders.

#### Scenario: Gallery uses the placeholder tile

- **WHEN** the user is on `/gallery`
- **THEN** each tile renders the `PlaceholderImage` component with an image icon and a caption identifying it as a placeholder

#### Scenario: Videos use the placeholder tile

- **WHEN** the user is on `/videos`
- **THEN** each video card includes the `PlaceholderImage` component with a video/play icon at video aspect ratio
