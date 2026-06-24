# content-model Specification

## Purpose

TBD - created by archiving change create-site-foundation. Update Purpose after archive.

## Requirements

### Requirement: Typed local content modules

Page content SHALL be sourced from typed TypeScript modules under `src/content/`. Each page that has more than a heading SHALL import its display strings from a content module rather than hardcoding them inline in the component.

#### Scenario: Page reads content from a typed module

- **WHEN** a V1 page component renders its body content
- **THEN** the displayed strings originate from a typed export under `src/content/`
- **AND** the export's type is defined explicitly (no implicit `any`)

### Requirement: Content types are centralized

Content-related TypeScript types (`Profile`, `NavItem`, `Project`, `ProcessStep`, `GalleryItem`, `Video`, and related display types) SHALL be defined in a single location (`src/content/types.ts`) and imported by each content module. Page-content wrapper types (e.g. `HomeContent`, `ContactContent`, `ListPageContent<T>`) SHALL NOT exist in the type module; pages render headings and intro copy inline.

#### Scenario: Types are imported, not redeclared

- **WHEN** a content module declares its export
- **THEN** the shape annotation is imported from `src/content/types.ts`
- **AND** the type is not redeclared ad-hoc inside the content module

#### Scenario: No page-content wrapper types

- **WHEN** inspecting `src/content/types.ts`
- **THEN** no exported type wraps a `heading` + `intro` + `items` triple for the purpose of grouping page chrome with page data

### Requirement: Placeholder content is replaceable without code changes

Each content module SHALL be structured so that replacing placeholder strings, lists, or media URLs with real values requires editing only the content module — not the page component, layout, or routing code.

#### Scenario: Swapping placeholder for real content

- **WHEN** real content becomes available for a page
- **THEN** updating only the file under `src/content/` for that page is sufficient to display the new content
- **AND** no changes to component, routing, or layout files are required

### Requirement: Navigation items are sourced from a content module

The primary navigation link list (path, label, and active-match behavior) SHALL be sourced from a typed content module at `src/content/navigation.ts`. `Header.tsx` SHALL NOT hardcode the link list inline.

#### Scenario: Adding a nav link is a content-only edit

- **WHEN** a maintainer adds a new entry to `primaryNav` in `src/content/navigation.ts`
- **THEN** the new link appears in the header navigation
- **AND** no edit to `Header.tsx` or any other component is required

#### Scenario: Renaming a nav label is a content-only edit

- **WHEN** a maintainer changes the `label` of an existing entry in `primaryNav`
- **THEN** the rendered link text in `Header.tsx` updates accordingly
- **AND** no edit to `Header.tsx` is required

### Requirement: Profile identity lives in a single content module

Identity-related copy used across Home, Process, and Contact (name, tagline, intro, bio paragraphs, inquiry CTA label, contact email, and contact intro) SHALL be sourced from a single typed module at `src/content/profile.ts`.

#### Scenario: Updating contact email is a single-file edit

- **WHEN** a maintainer changes `contactEmail` in `src/content/profile.ts`
- **THEN** the Contact page and any other surface that displays the email reflects the new value
- **AND** no other file needs to be edited

#### Scenario: Updating the booking CTA label is a single-file edit

- **WHEN** a maintainer changes `bookingCtaLabel` in `src/content/profile.ts`
- **THEN** the Home hero CTA button text updates
- **AND** no edit to `Home.tsx` is required

### Requirement: Media items live in a single content module

Gallery items and optional future videos SHALL be sourced from a single typed module at `src/content/media.ts`, exporting `gallery`, `videos`, and `performanceReel`.

#### Scenario: Adding a gallery item is a single-file edit

- **WHEN** a maintainer appends a new entry to the `gallery` array in `src/content/media.ts`
- **THEN** the Gallery page renders the additional item
- **AND** no edit to `Gallery.tsx` is required

#### Scenario: Future video data remains content-scoped

- **WHEN** a maintainer appends a new entry to the `videos` array in `src/content/media.ts`
- **THEN** the video data remains typed and available for a future page or component
- **AND** no existing Martin route is required to render it immediately

### Requirement: Domain lists export plain typed arrays

The project content module SHALL export plain typed arrays for portfolio projects and process steps, without wrapping them in a per-page content object.

#### Scenario: Adding a project is a single-file edit

- **WHEN** a maintainer appends a new entry to the `projects` array in `src/content/projects.ts`
- **THEN** the Projects page renders the additional entry
- **AND** no edit to `Projects.tsx` is required
