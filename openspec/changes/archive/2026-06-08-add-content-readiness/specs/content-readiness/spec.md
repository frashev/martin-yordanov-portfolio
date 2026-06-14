## ADDED Requirements

### Requirement: GalleryImage loads images lazily with a fade-in effect

The `<GalleryImage>` component SHALL render an `<img>` with `loading="lazy"` and a CSS fade-in that activates when the image finishes loading. A warm gradient background is visible while the image loads.

#### Scenario: Image is lazy-loaded

- **WHEN** a GalleryImage is inspected
- **THEN** the `<img>` element has `loading="lazy"` set

#### Scenario: Image fades in on load under normal motion

- **WHEN** the user has no reduced-motion preference and a GalleryImage's image finishes loading
- **THEN** the image transitions from invisible to fully visible with a smooth fade

#### Scenario: Image appears instantly under reduced-motion

- **WHEN** the user has reduced motion enabled
- **THEN** the image appears at full opacity immediately without any transition

#### Scenario: Cached images appear immediately without missing the load event

- **WHEN** an image is already in the browser cache when GalleryImage mounts
- **THEN** the image is immediately visible at full opacity (no stuck invisible state)

#### Scenario: Warm gradient shows while image loads

- **WHEN** a GalleryImage is rendered and the image has not yet loaded
- **THEN** a warm gradient background is visible in the image's space

---

### Requirement: PlaceholderImage upgrades to a real image when src is provided

When `PlaceholderImage` receives a `src` prop, it SHALL render a `<GalleryImage>` instead of the gradient placeholder tile. When `src` is absent, it SHALL render the existing gradient tile unchanged.

#### Scenario: PlaceholderImage without src renders gradient tile

- **WHEN** a PlaceholderImage is rendered with no src prop
- **THEN** the warm gradient tile with camera/play icon renders exactly as before

#### Scenario: PlaceholderImage with src renders the real image

- **WHEN** a PlaceholderImage is rendered with a src prop
- **THEN** the real image renders with lazy-load and fade-in behaviour (via GalleryImage)

#### Scenario: Existing callsites are unaffected

- **WHEN** existing components that use PlaceholderImage (Videos, About, etc.) are rendered without changes
- **THEN** they look and behave identically to before this change

---

### Requirement: Home page shows a hero photo when one is configured

When `profile.heroSrc` is set, the Home page SHALL render the hero photo in the right column in place of the monogram SVG. When absent, the monogram renders as today.

#### Scenario: Monogram shows when no heroSrc is set

- **WHEN** `profile.heroSrc` is not defined
- **THEN** the NK monogram SVG renders in the hero's right column

#### Scenario: Hero photo shows when heroSrc is set

- **WHEN** `profile.heroSrc` is a valid image URL
- **THEN** the hero renders the photo with lazy-load and fade-in, replacing the monogram

#### Scenario: Hero photo has correct alt text

- **WHEN** `profile.heroSrc` is set and `profile.heroAlt` is also set
- **THEN** the hero `<img>` uses `profile.heroAlt` as its alt attribute

---

### Requirement: Gallery.tsx uses PlaceholderImage for all items

The Gallery page SHALL use a single `<PlaceholderImage>` call for each item regardless of whether `item.src` is set, eliminating the manual conditional render.

#### Scenario: Gallery renders consistently with or without src

- **WHEN** a GalleryItem has no src value
- **THEN** the placeholder tile renders as before
- **WHEN** a GalleryItem has a src value
- **THEN** the real image renders via PlaceholderImage without a separate conditional in Gallery.tsx
