# Spec: stats-band

## Purpose

Defines the `StatsBand` component and its content model — a horizontal strip of career-metric statistics (value + label pairs) that appears on the Home and About pages with responsive layout and scroll-reveal animation.

---

## Requirements

### Requirement: StatItem content model

The system SHALL define a `StatItem` type in `src/content/types.ts` with required fields `value` (string) and `label` (string).
A `src/content/stats.ts` file SHALL export a typed `stats: StatItem[]` array with at least 4 placeholder entries representing meaningful career metrics.

#### Scenario: Type is defined

- **WHEN** a developer imports `StatItem` from `src/content/types.ts`
- **THEN** TypeScript accepts an object with `value` and `label` string fields without errors

#### Scenario: Data file exports array

- **WHEN** a developer imports `stats` from `src/content/stats.ts`
- **THEN** the value is an array of at least 4 objects conforming to the `StatItem` type

---

### Requirement: StatsBand component

The system SHALL provide a `StatsBand` React component in `src/components/StatsBand.tsx` that renders all items from the `stats` array as a horizontal strip of value + label pairs.
Each item SHALL display its `value` prominently (large, accented color) and its `label` beneath it (small, muted color).

#### Scenario: All stats rendered

- **WHEN** `<StatsBand />` is rendered
- **THEN** all items from the `stats` array are visible, each showing its value and label

#### Scenario: Value is visually prominent

- **WHEN** a user views the stats band
- **THEN** the `value` text is noticeably larger than the `label` text

---

### Requirement: Home page placement

The Home page (`/`) SHALL render `<StatsBand />` below the testimonials section.

#### Scenario: Stats band visible on home

- **WHEN** a user visits `/`
- **THEN** the stats band is visible below the testimonials section

---

### Requirement: About page placement

The About page (`/about`) SHALL render `<StatsBand />` below the bio paragraphs.

#### Scenario: Stats band visible on about

- **WHEN** a user visits `/about`
- **THEN** the stats band is visible below the bio text

---

### Requirement: Responsive layout

`StatsBand` SHALL render as a 2-column grid on mobile (< 768 px) and as a single row (4 columns) on tablet and desktop.

#### Scenario: Mobile layout

- **WHEN** the viewport width is less than 768 px
- **THEN** stat items are arranged in a 2-column grid with no horizontal overflow

#### Scenario: Desktop layout

- **WHEN** the viewport width is 768 px or wider
- **THEN** all stat items appear in a single horizontal row

---

### Requirement: Scroll-reveal animation

The `StatsBand` component SHALL wrap its content in the existing `Reveal` component so it animates in on scroll, consistent with the site's editorial motion system.
The animation SHALL remain enabled when `prefers-reduced-motion: reduce` is active.

#### Scenario: Band animates on scroll

- **WHEN** the user scrolls the stats band into view
- **THEN** the band slides into view

#### Scenario: Reduced motion still animates

- **WHEN** `prefers-reduced-motion: reduce` is set in the OS
- **THEN** the band still slides into view
