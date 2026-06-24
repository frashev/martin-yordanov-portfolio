# Spec: stats-band

## Purpose

Defines the `StatsBand` component and its content model: a strip of verified or
neutral portfolio statistics that can be placed on Martin portfolio pages.

## Requirements

### Requirement: StatItem content model

The system SHALL define a `StatItem` type in `src/content/types.ts` with
required fields `value` and `label`. `src/content/stats.ts` SHALL export a typed
`stats: StatItem[]` array with verified Martin facts or neutral portfolio
content counts.

#### Scenario: Type is defined

- **WHEN** a developer imports `StatItem` from `src/content/types.ts`
- **THEN** TypeScript accepts an object with `value` and `label` string fields

#### Scenario: Data file exports array

- **WHEN** a developer imports `stats` from `src/content/stats.ts`
- **THEN** the value is an array of objects conforming to the `StatItem` type

### Requirement: StatsBand component

The system SHALL provide a `StatsBand` React component in
`src/components/StatsBand.tsx` that renders all items from the `stats` array as
value + label pairs.

#### Scenario: All stats rendered

- **WHEN** `<StatsBand />` is rendered
- **THEN** all items from the `stats` array are visible, each showing its value and label

### Requirement: Responsive layout

`StatsBand` SHALL render without horizontal overflow on mobile and desktop.

#### Scenario: Mobile layout

- **WHEN** the viewport width is less than 768 px
- **THEN** stat items wrap or grid without horizontal overflow
