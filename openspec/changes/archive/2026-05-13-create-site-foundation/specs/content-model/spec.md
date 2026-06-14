## ADDED Requirements

### Requirement: Typed local content modules

Page content SHALL be sourced from typed TypeScript modules under `src/content/`. Each page that has more than a heading SHALL import its display strings from a content module rather than hardcoding them inline in the component.

#### Scenario: Page reads content from a typed module

- **WHEN** a V1 page component renders its body content
- **THEN** the displayed strings originate from a typed export under `src/content/`
- **AND** the export's type is defined explicitly (no implicit `any`)

### Requirement: Content types are centralized

Content-related TypeScript types (e.g. `HomeContent`, `PageContent`, shared shapes for projects, workshops, events, gallery items, videos) SHALL be defined in a single location (e.g. `src/content/types.ts`) and imported by each content module.

#### Scenario: Types are imported, not redeclared

- **WHEN** a content module declares its export
- **THEN** the shape annotation is imported from the central types module
- **AND** the type is not redeclared ad-hoc inside the content module

### Requirement: Placeholder content is replaceable without code changes

Each content module SHALL be structured so that replacing placeholder strings, lists, or media URLs with real values requires editing only the content module — not the page component, layout, or routing code.

#### Scenario: Swapping placeholder for real content

- **WHEN** real content becomes available for a page
- **THEN** updating only the file under `src/content/` for that page is sufficient to display the new content
- **AND** no changes to component, routing, or layout files are required
