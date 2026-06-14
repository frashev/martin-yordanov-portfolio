# Spec: Testimonials

## Purpose

Defines the testimonials content model, the reusable `TestimonialsSection` component, its placement on the Home and Workshops pages, responsive layout behaviour, and scroll-reveal animation integration.

---

## Requirements

### Requirement: Testimonial content model

The system SHALL define a `Testimonial` type in `src/content/types.ts` with required fields `quote` (string), `author` (string), and `role` (string), and an optional `avatarSrc` (string).
A `src/content/testimonials.ts` file SHALL export a typed `testimonials: Testimonial[]` array with at least three placeholder entries covering different relationship types (student, collaborator, event organiser).

#### Scenario: Type is defined

- **WHEN** a developer imports `Testimonial` from `src/content/types.ts`
- **THEN** TypeScript accepts an object with `quote`, `author`, `role`, and optional `avatarSrc` without errors

#### Scenario: Data file exports array

- **WHEN** a developer imports `testimonials` from `src/content/testimonials.ts`
- **THEN** the value is a non-empty array of objects conforming to the `Testimonial` type

### Requirement: TestimonialsSection component

The system SHALL provide a `TestimonialsSection` React component in `src/components/TestimonialsSection.tsx` that accepts an optional `limit` prop (number) and renders quote cards for each testimonial (or the first `limit` items when supplied).
Each card SHALL display the `quote`, `author`, and `role`. When `avatarSrc` is present it SHALL render the avatar image; when absent no broken image placeholder SHALL appear.

#### Scenario: Renders all testimonials without limit

- **WHEN** `<TestimonialsSection />` is rendered with no `limit` prop
- **THEN** all items from the `testimonials` array are visible on screen

#### Scenario: Respects limit prop

- **WHEN** `<TestimonialsSection limit={2} />` is rendered
- **THEN** exactly 2 quote cards are visible

#### Scenario: No avatar — no broken image

- **WHEN** a `Testimonial` entry has no `avatarSrc`
- **THEN** no `<img>` element with an empty `src` is rendered

#### Scenario: Keyboard accessible

- **WHEN** a user navigates the page by keyboard only
- **THEN** all testimonial card text is reachable and readable (no interactive traps)

### Requirement: Home page placement

The Home page (`/`) SHALL render `<TestimonialsSection limit={3} />` below the hero section.
On the Home page, long quotes SHALL be visually truncated (max 4 lines) to preserve card rhythm.

#### Scenario: Testimonials visible on home

- **WHEN** a user visits `/`
- **THEN** a testimonials section with up to 3 quote cards is visible below the hero

#### Scenario: Quote truncation on home

- **WHEN** a testimonial quote exceeds 4 lines in the Home card
- **THEN** the card shows a truncated quote with an ellipsis, not a taller card

### Requirement: Workshops page placement

The Workshops page (`/workshops`) SHALL render `<TestimonialsSection />` (no limit) below the workshops list.
On the Workshops page, quotes SHALL render in full without truncation.

#### Scenario: Testimonials visible on workshops

- **WHEN** a user visits `/workshops`
- **THEN** a testimonials section is visible below the workshop cards

#### Scenario: Full quote on workshops

- **WHEN** a testimonial quote is longer than 4 lines
- **THEN** the full quote is visible on the Workshops page (no truncation)

### Requirement: Responsive layout

`TestimonialsSection` SHALL render as a single-column stack on mobile (< 768 px) and as a multi-column grid (2–3 columns) on tablet and desktop.

#### Scenario: Mobile layout

- **WHEN** the viewport width is less than 768 px
- **THEN** testimonial cards stack vertically, one per row, with no horizontal overflow

#### Scenario: Desktop layout

- **WHEN** the viewport width is 768 px or wider
- **THEN** testimonial cards are arranged in a multi-column grid (at least 2 columns)

### Requirement: Scroll-reveal animation

Each testimonial card SHALL be wrapped in the existing `Reveal` component so cards animate in as the user scrolls, consistent with the rest of the site's editorial motion.
The animation SHALL remain enabled when `prefers-reduced-motion: reduce` is active.

#### Scenario: Cards animate on scroll

- **WHEN** the user scrolls the testimonials section into view
- **THEN** each card slides into view with a staggered delay

#### Scenario: Reduced motion still animates

- **WHEN** `prefers-reduced-motion: reduce` is set in the OS
- **THEN** cards still slide into view with a staggered delay
