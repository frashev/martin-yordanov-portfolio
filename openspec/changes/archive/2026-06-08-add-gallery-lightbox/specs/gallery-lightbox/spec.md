## ADDED Requirements

### Requirement: Gallery items are clickable and open a lightbox overlay

Each item in the gallery grid SHALL be an interactive element that, when activated, opens a full-size overlay showing the item's image (or placeholder).

#### Scenario: Click opens lightbox

- **WHEN** the user clicks a gallery item
- **THEN** a full-screen overlay appears showing the item enlarged

#### Scenario: Placeholder item opens in lightbox

- **WHEN** no real image src is set and the user clicks a gallery item
- **THEN** the lightbox opens showing the enlarged PlaceholderImage and caption

#### Scenario: Real image opens in lightbox

- **WHEN** a GalleryItem has a src value and the user clicks it
- **THEN** the lightbox opens showing the full-size image with its alt text

#### Scenario: Gallery items are keyboard accessible

- **WHEN** a keyboard user tabs to a gallery item and presses Enter or Space
- **THEN** the lightbox opens identically to a mouse click

---

### Requirement: Lightbox can be closed by three methods

The overlay SHALL close when the user clicks the × button, clicks the backdrop outside the image, or presses the Escape key.

#### Scenario: Close button dismisses lightbox

- **WHEN** the lightbox is open and the user clicks the × close button
- **THEN** the overlay closes and focus returns to the triggering gallery item

#### Scenario: Backdrop click dismisses lightbox

- **WHEN** the lightbox is open and the user clicks the semi-transparent backdrop area
- **THEN** the overlay closes

#### Scenario: Escape key dismisses lightbox

- **WHEN** the lightbox is open and the user presses Escape
- **THEN** the overlay closes and focus returns to the triggering gallery item

---

### Requirement: Lightbox is accessible

The overlay SHALL follow accessible modal (dialog) conventions.

#### Scenario: Focus moves to close button on open

- **WHEN** the lightbox opens
- **THEN** keyboard focus moves to the close (×) button

#### Scenario: Focus returns to trigger on close

- **WHEN** the lightbox closes
- **THEN** keyboard focus returns to the gallery item that opened it

#### Scenario: Overlay has correct ARIA attributes

- **WHEN** the lightbox is open
- **THEN** the overlay element has `role="dialog"` and `aria-modal="true"` and a visible or sr-only label

---

### Requirement: Lightbox animation respects reduced-motion preference

Any open/close animation SHALL be gated behind `prefers-reduced-motion: no-preference`.

#### Scenario: No animation under reduced-motion

- **WHEN** the user has reduced motion enabled and opens the lightbox
- **THEN** the overlay appears instantly with no fade or scale animation

#### Scenario: Fade animation under normal motion

- **WHEN** the user has no reduced motion preference and opens the lightbox
- **THEN** the overlay fades in smoothly

---

### Requirement: Gallery shows a polished "coming soon" state without real photos

When all GalleryItem entries have no src value, the gallery grid SHALL still render a polished placeholder grid.

#### Scenario: Placeholder grid renders without real photos

- **WHEN** no GalleryItem has a src value
- **THEN** the gallery grid renders the existing placeholder tiles in the correct grid layout

#### Scenario: Real photos replace placeholders without layout change

- **WHEN** a GalleryItem gains a src value
- **THEN** that tile renders a real image with no change to the surrounding grid layout
