## Why

The previous change (`create-site-foundation`) shipped one content file per page (`home.ts`, `about.ts`, `projects.ts`, `workshops.ts`, `events.ts`, `gallery.ts`, `videos.ts`, `contact.ts`). In practice several of those files duplicate the same identity data (name, tagline, bio paragraphs, contact handle), and "gallery vs. videos" is one decision — media — split across two files. We also still have `NAV_LINKS` hardcoded inside `Header.tsx`, which makes navigation changes a component edit rather than a content edit.

This change consolidates and renames the content layer to match the requested structure: one `profile.ts` for identity (home + about + contact), one `navigation.ts` for nav items, one `media.ts` for gallery + videos, and the existing per-domain files (`projects.ts`, `workshops.ts`, `events.ts`). The result is fewer, more cohesive files; adding a new project or workshop is a single-file edit; updating the bio or contact email touches one place.

## What Changes

- Add `src/content/profile.ts` exporting a typed `profile` constant covering name, tagline, intro, bio paragraphs, booking CTA label, and contact details.
- Add `src/content/navigation.ts` exporting the typed primary nav list (currently hardcoded in `Header.tsx`).
- Add `src/content/media.ts` exporting typed `gallery` and `videos` arrays from a single file.
- Restructure existing `src/content/projects.ts`, `src/content/workshops.ts`, `src/content/events.ts` to export plain typed arrays (not page-content wrappers) so callers can iterate directly.
- Move all page-level headings/intro copy that used to live in the per-page content files into the page components themselves (placeholder strings only) — page components no longer need a "ListPageContent" wrapper.
- Update `Home`, `About`, `Contact`, `Gallery`, `Videos`, `Projects`, `Workshops`, `Events`, and `Header` to import from the new modules.
- Update `src/content/types.ts`: add `Profile`, `NavItem`, `MediaItem`, `Video`; remove now-unused `HomeContent`, `AboutContent`, `ContactContent`, `ListPageContent`.
- **BREAKING** (internal only — no external API): `src/content/home.ts`, `src/content/about.ts`, `src/content/contact.ts`, `src/content/gallery.ts`, `src/content/videos.ts` are removed.
- No fabricated facts about Martin Yordanov — all values remain explicitly placeholder.

## Capabilities

### New Capabilities

<!-- None — this change reshapes an existing capability. -->

### Modified Capabilities

- `content-model`: Requirements stay (typed modules, centralized types, single-file replaceability) but the concrete file layout is updated, and a new requirement is added that navigation items are also content-driven.

## Impact

- Files added: `src/content/profile.ts`, `src/content/navigation.ts`, `src/content/media.ts`.
- Files removed: `src/content/home.ts`, `src/content/about.ts`, `src/content/contact.ts`, `src/content/gallery.ts`, `src/content/videos.ts`.
- Files modified: `src/content/types.ts`, `src/content/projects.ts`, `src/content/workshops.ts`, `src/content/events.ts`, `src/components/Header.tsx`, and all eight page components.
- No new runtime dependencies.
- `npm run build` must continue to pass with no TypeScript errors.
