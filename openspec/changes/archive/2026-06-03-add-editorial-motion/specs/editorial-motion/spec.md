## ADDED Requirements

### Requirement: Reduced-motion guard disables all non-essential motion

All entrance, scroll-reveal, route-transition, and decorative motion introduced by this capability SHALL be disabled when the user's environment reports `prefers-reduced-motion: reduce`. Under reduced motion, content SHALL appear in its final state immediately (fully visible, no transform offset) and route changes SHALL be instant. Essential feedback (focus rings, the existing form spinner) is out of scope and unaffected.

#### Scenario: Animations suppressed under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` loads any route
- **THEN** the hero, sections, and cards are rendered fully visible with no entrance offset or fade
- **AND** no element animates on scroll into view

#### Scenario: Route changes are instant under reduced motion

- **WHEN** a user with `prefers-reduced-motion: reduce` navigates between two routes
- **THEN** the new page replaces the old one without a cross-fade

#### Scenario: Motion plays for users without the preference

- **WHEN** a user without `prefers-reduced-motion: reduce` loads the Home page
- **THEN** the hero entrance and scroll-reveal animations play

### Requirement: Centralized motion timing tokens

The application SHALL define motion duration and easing as CSS custom properties in `src/index.css` and reference those tokens for every animation in this capability, rather than hard-coding ad-hoc durations per element. Durations SHALL fall in the subtle/fast range (approximately 200–400ms) and easing SHALL be an ease-out curve with no overshoot or bounce, consistent with `docs/reference/style-guide.md`.

#### Scenario: Tokens drive animation timing

- **WHEN** inspecting the computed styles of an animated element
- **THEN** its transition/animation duration resolves from a shared motion token
- **AND** the duration is within the ~200–400ms range

#### Scenario: No bounce easing

- **WHEN** any motion in this capability plays
- **THEN** the element settles into place without overshooting past its final position

### Requirement: Home hero staggered entrance

On the Home page, the hero elements (name, tagline, intro paragraph, and the call-to-action row) SHALL animate in as a staggered sequence on initial load — each appearing shortly after the previous — when motion is enabled. The animation SHALL run once per page load and SHALL NOT block interaction with the elements.

#### Scenario: Hero elements arrive in sequence

- **WHEN** a user without reduced motion loads `/`
- **THEN** the name, tagline, intro, and CTA row fade/rise into place one after another
- **AND** the CTAs are clickable as soon as they are visible

#### Scenario: Hero is fully visible immediately under reduced motion

- **WHEN** a user with reduced motion loads `/`
- **THEN** all hero elements are rendered fully visible with no staggered delay

### Requirement: Scroll-reveal for sections and cards

Content blocks below the initial fold — including `Card` items on the Projects, Workshops, Events, and Videos pages and major page sections — SHALL fade in and rise a small distance (~12px) as they scroll into the viewport, animating only once per element. Elements already within the viewport on load MAY animate as part of the entrance. A reusable helper (e.g. an `IntersectionObserver`-based hook/component) SHALL provide this behavior so pages do not re-implement it.

#### Scenario: Card reveals on scroll

- **WHEN** a user without reduced motion scrolls a card list page so an off-screen `Card` enters the viewport
- **THEN** that card fades in and rises into place
- **AND** it does not animate again on subsequent scrolls

#### Scenario: Reveal is a no-op under reduced motion

- **WHEN** a user with reduced motion visits a card list page
- **THEN** all cards are visible in their final position without scroll-triggered animation

#### Scenario: Content remains accessible without JavaScript-driven reveal

- **WHEN** the reveal helper has not yet observed an element
- **THEN** the element's content is still present in the DOM and readable by assistive technology

### Requirement: Route cross-fade transition

Navigating between routes SHALL apply a brief cross-fade between the outgoing and incoming page when the browser supports the View Transitions API and motion is enabled. Where the API is unsupported, navigation SHALL fall back to an immediate page swap with no error. The shared `Header` and `Footer` SHALL NOT flicker or remount during the transition.

#### Scenario: Cross-fade on supported browsers

- **WHEN** a user without reduced motion on a View-Transitions-capable browser navigates from one route to another
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

On viewports narrower than 768px, the mobile menu toggle in the `Header` SHALL display a recognizable hamburger icon (parallel horizontal lines) when closed and SHALL animate into an ✕ (close) shape when the menu opens, reversing on close. The button SHALL retain its accessible name and `aria-expanded` state across both visual states, and toggling SHALL continue to reveal/hide the navigation links.

#### Scenario: Closed state shows a hamburger

- **WHEN** the viewport is narrower than 768px and the menu is closed
- **THEN** the toggle button displays a multi-line hamburger icon (not a single bar)

#### Scenario: Icon animates to a close icon when opened

- **WHEN** a user without reduced motion activates the toggle
- **THEN** the hamburger lines animate into an ✕ shape
- **AND** the navigation links become visible

#### Scenario: Accessible state is preserved

- **WHEN** the menu is toggled open or closed
- **THEN** the button keeps an accessible label and its `aria-expanded` value reflects the open state

#### Scenario: Icon state is correct under reduced motion

- **WHEN** a user with reduced motion toggles the menu
- **THEN** the icon switches between hamburger and ✕ states without an animated tween, and the menu still opens and closes
