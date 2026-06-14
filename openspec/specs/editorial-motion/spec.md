# editorial-motion Specification

## Purpose

Define a cohesive, accessible motion system for the site: subtle entrance, scroll-reveal, route-transition, and micro-interaction animations driven by centralized timing tokens. Subtle, user-triggered motion remains enabled even when the user's environment reports reduced motion; continuous autoplay motion that the user did not trigger (the auto-advancing testimonial carousel and any looping hero video) is paused under reduced motion.

## Requirements

### Requirement: Motion remains enabled under reduced-motion settings

All entrance, scroll-reveal, route-transition, decorative micro-interaction (e.g. link underline, hamburger/close icon), and loading motion introduced by this capability SHALL remain enabled when the user's environment reports `prefers-reduced-motion: reduce`. This does NOT cover continuous autoplay motion, which is governed by the "Autoplay motion respects reduced-motion" requirement below.

#### Scenario: Animations run under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` loads any route
- **THEN** the hero, sections, and cards use the same entrance and reveal animations as other visitors

#### Scenario: Route changes cross-fade under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` navigates between two routes
- **THEN** the supported View Transition cross-fade still runs

#### Scenario: Motion plays for users without the preference

- **WHEN** a user without `prefers-reduced-motion: reduce` loads the Home page
- **THEN** the hero entrance and scroll-reveal animations play

#### Scenario: Contact form spinner animates under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` submits the contact form
- **THEN** the form enters the submitting state with a visible loading indicator
- **AND** the loading indicator spins

### Requirement: Autoplay motion respects reduced-motion

Continuous, self-running motion that the user did not trigger - specifically the auto-advancing testimonial carousel and any looping/autoplaying hero video - SHALL stop when the user's environment reports `prefers-reduced-motion: reduce`. Manual controls (buttons, arrow keys, dots) SHALL remain fully functional, and a still fallback (e.g. the video poster image) SHALL be shown in place of looping video.

#### Scenario: Carousel autoplay pauses under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` views the testimonials carousel
- **THEN** the carousel does not auto-advance

#### Scenario: Manual carousel controls still work under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` activates a next/previous button, a dot, or the arrow keys
- **THEN** the carousel moves to the chosen testimonial

#### Scenario: Looping hero video falls back to a still image under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` loads a page whose hero is configured with an autoplaying video
- **THEN** the hero shows the still poster image instead of the looping video

### Requirement: Centralized motion timing tokens

The application SHALL define motion duration and easing as CSS custom properties in `src/index.css` and reference those tokens for every animation in this capability, rather than hard-coding ad-hoc durations per element. Durations SHALL fall in the subtle/fast range (approximately 200-400ms) and easing SHALL be an ease-out curve with no overshoot or bounce, consistent with `docs/reference/style-guide.md`.

#### Scenario: Tokens drive animation timing

- **WHEN** inspecting the computed styles of an animated element
- **THEN** its transition/animation duration resolves from a shared motion token
- **AND** the duration is within the ~200-400ms range

#### Scenario: No bounce easing

- **WHEN** any motion in this capability plays
- **THEN** the element settles into place without overshooting past its final position

### Requirement: Home hero staggered entrance

On the Home page, the hero elements (name, tagline, intro paragraph, and the call-to-action row) SHALL animate in as a staggered sequence on initial load - each appearing shortly after the previous - when motion is enabled. The animation SHALL run once per page load and SHALL NOT block interaction with the elements.

#### Scenario: Hero elements arrive in sequence

- **WHEN** a user loads `/`
- **THEN** the name, tagline, intro, and CTA row rise into place one after another
- **AND** the CTAs are clickable as soon as they are visible

#### Scenario: Hero entrance still runs under reduced motion

- **WHEN** a user with reduced motion loads `/`
- **THEN** the hero elements use the same staggered entrance animation

### Requirement: Scroll-reveal for sections and cards

Content blocks below the initial fold - including `Card` items on the Projects, Workshops, Events, and Videos pages and major page sections - SHALL rise a small distance (~12px) as they scroll into the viewport, animating only once per element. Elements already within the viewport on load MAY animate as part of the entrance. A reusable helper (e.g. an `IntersectionObserver`-based hook/component) SHALL provide this behavior so pages do not re-implement it.

#### Scenario: Card reveals on scroll

- **WHEN** a user scrolls a card list page so an off-screen `Card` enters the viewport
- **THEN** that card rises into place
- **AND** it does not animate again on subsequent scrolls

#### Scenario: Reveal still runs under reduced motion

- **WHEN** a user with reduced motion visits a card list page
- **THEN** cards reveal as they enter the viewport

#### Scenario: Content remains accessible without JavaScript-driven reveal

- **WHEN** the reveal helper has not yet observed an element
- **THEN** the element's content is still present in the DOM and readable by assistive technology

### Requirement: Route cross-fade transition

Navigating between routes SHALL apply a brief cross-fade between the outgoing and incoming page when the browser supports the View Transitions API and motion is enabled. Where the API is unsupported, navigation SHALL fall back to an immediate page swap with no error. The shared `Header` and `Footer` SHALL NOT flicker or remount during the transition.

#### Scenario: Cross-fade on supported browsers

- **WHEN** a user on a View-Transitions-capable browser navigates from one route to another
- **THEN** the outgoing page briefly cross-fades into the incoming page

#### Scenario: Graceful fallback when unsupported

- **WHEN** a user navigates on a browser without View Transitions support
- **THEN** the new page renders immediately with no console error and no broken state

#### Scenario: Layout persists during transition

- **WHEN** a route transition plays
- **THEN** the `Header` and `Footer` remain in place and do not fade or remount

### Requirement: Link underline micro-interaction

Navigation and inline text links styled for this interaction SHALL reveal an accent-colored underline that wipes in on hover and on keyboard focus, and retract when the pointer/focus leaves. The interaction SHALL use the accent token, SHALL keep link text legible at all times, and SHALL NOT cause layout shift (the underline must not reflow surrounding content).

#### Scenario: Underline wipes in on hover

- **WHEN** a user hovers a link that uses this interaction
- **THEN** an accent-colored underline animates in beneath the link text

#### Scenario: Underline appears on keyboard focus

- **WHEN** a user tabs to the link with the keyboard
- **THEN** the link shows a visible focus state including the underline treatment

#### Scenario: No layout shift

- **WHEN** the underline appears or disappears
- **THEN** surrounding text and layout do not move

### Requirement: Animated hamburger/close icon

On viewports narrower than 768px, the mobile menu toggle in the `Header` SHALL display a recognizable hamburger icon (parallel horizontal lines) when closed and SHALL animate into a close shape when the menu opens, reversing on close. The button SHALL retain its accessible name and `aria-expanded` state across both visual states, and toggling SHALL continue to reveal/hide the navigation links.

#### Scenario: Closed state shows a hamburger

- **WHEN** the viewport is narrower than 768px and the menu is closed
- **THEN** the toggle button displays a multi-line hamburger icon (not a single bar)

#### Scenario: Icon animates to a close icon when opened

- **WHEN** a user activates the toggle
- **THEN** the hamburger lines animate into a close shape
- **AND** the navigation links become visible

#### Scenario: Accessible state is preserved

- **WHEN** the menu is toggled open or closed
- **THEN** the button keeps an accessible label and its `aria-expanded` value reflects the open state

#### Scenario: Icon animation also runs under reduced motion

- **WHEN** a user with reduced motion toggles the menu
- **THEN** the icon animates between hamburger and close states, and the menu still opens and closes
