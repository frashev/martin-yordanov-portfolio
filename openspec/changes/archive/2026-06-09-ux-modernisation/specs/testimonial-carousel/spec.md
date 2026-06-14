## ADDED Requirements

### Requirement: Testimonial Carousel

`TestimonialsSection` SHALL render testimonials as a carousel with explicit
controls, keyboard navigation, and autoplay that pauses under reduced-motion
settings while keeping all manual controls available.

#### Scenario: Buttons cycle testimonials

- **WHEN** a visitor activates the next or previous testimonial button
- **THEN** the carousel moves to the next or previous testimonial

#### Scenario: Arrow keys cycle testimonials

- **WHEN** keyboard focus is on the testimonials carousel
- **THEN** ArrowRight moves to the next testimonial
- **AND** ArrowLeft moves to the previous testimonial

#### Scenario: Active slide is announced politely

- **WHEN** the active testimonial changes
- **THEN** an `aria-live="polite"` region announces the active testimonial
  position

#### Scenario: Autoplay pauses under reduced motion

- **WHEN** `prefers-reduced-motion: reduce` is active
- **THEN** testimonial autoplay does not advance the carousel
- **AND** the autoplay progress indicator does not animate
- **AND** manual controls still cycle testimonials
