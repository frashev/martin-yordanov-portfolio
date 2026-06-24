# Spec: Testimonials

## Purpose

Defines the testimonials content model and reusable `TestimonialsSection`
component for verified Martin portfolio quotes.

## Requirements

### Requirement: Testimonial content model

The system SHALL define a `Testimonial` type in `src/content/types.ts` with
required fields `quote`, `author`, and `role`, and an optional `avatarSrc`.
`src/content/testimonials.ts` SHALL export a typed `testimonials` array. Entries
SHALL be verified quotes or clearly marked placeholders.

#### Scenario: Type is defined

- **WHEN** a developer imports `Testimonial` from `src/content/types.ts`
- **THEN** TypeScript accepts an object with `quote`, `author`, `role`, and optional `avatarSrc`

### Requirement: TestimonialsSection component

The system SHALL provide a `TestimonialsSection` React component in
`src/components/TestimonialsSection.tsx` that accepts an optional `limit` prop
and renders quote cards for each testimonial, or the first `limit` items when
supplied.

#### Scenario: Renders testimonials without limit

- **WHEN** `<TestimonialsSection />` is rendered with no `limit` prop
- **THEN** all items from the `testimonials` array are visible on screen

#### Scenario: Respects limit prop

- **WHEN** `<TestimonialsSection limit={2} />` is rendered
- **THEN** no more than 2 quote cards are visible

#### Scenario: No avatar means no broken image

- **WHEN** a `Testimonial` entry has no `avatarSrc`
- **THEN** no `<img>` element with an empty `src` is rendered
