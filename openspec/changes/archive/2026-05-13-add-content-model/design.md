## Context

`create-site-foundation` established a one-file-per-page content layout. It works, but it scatters identity (name, contact, bio) across `home.ts`, `about.ts`, and `contact.ts`, and splits "media" into `gallery.ts` + `videos.ts`. Navigation items also live inside `Header.tsx` as a `const` array, which means a "rename Workshops to Classes" decision is a component edit. The current change reshapes the layer to match how the data actually clusters.

## Goals / Non-Goals

**Goals:**

- Consolidate identity into a single `profile.ts`.
- Externalize the primary navigation list into `navigation.ts`.
- Co-locate gallery and videos in `media.ts` since they are the same domain (media assets).
- Make each domain file export a plain typed array (or object), so adding an item is one entry in one file.
- Keep all values placeholder-only.

**Non-Goals:**

- No new domains (no testimonials, press, services file in this change).
- No CMS or external data loading.
- No visual redesign — pages keep their current layout, only the data source changes.
- No new dependencies.

## Decisions

### File layout

- `profile.ts` exports `profile: Profile` with `{ name, tagline, intro, bioParagraphs, bookingCtaLabel, contactEmail, contactIntro }`.
- `navigation.ts` exports `primaryNav: readonly NavItem[]` where `NavItem = { to: string; label: string; end?: boolean }`.
- `projects.ts` exports `projects: Project[]`.
- `workshops.ts` exports `workshops: Workshop[]`.
- `events.ts` exports `events: EventItem[]`.
- `media.ts` exports `gallery: GalleryItem[]` and `videos: Video[]` (two named exports from one file — they share the "media" domain).
- `types.ts` keeps `Project`, `Workshop`, `EventItem`, `GalleryItem`, `Video`; adds `Profile`, `NavItem`; drops the page-content wrapper types.

Rationale: groups data by what changes together. Bio and contact email change together (same person updating "about me"); gallery and videos change together (a media drop); nav labels are an editorial decision separate from any single page.

### Page components own their headings, content modules own their data

- `Projects.tsx` renders its `<h1>Projects</h1>` and intro paragraph inline (still placeholder text), then iterates over `projects` from `projects.ts`.
- Alternative considered: keep `ListPageContent<T>` wrapper with `heading` / `intro` per file. Rejected because the heading is structural (it is always the page title) and lives more naturally next to the JSX. The acceptance criterion "adding a new project requires editing only `src/content/projects.ts`" is what matters; that is preserved.

### Navigation is content

- Adds a new requirement to the `content-model` capability: navigation labels and order are sourced from `navigation.ts`, not hardcoded in `Header.tsx`. `Header.tsx` keeps the open/closed state and styling but imports the link list.

### Removal of `home.ts`, `about.ts`, `contact.ts`, `gallery.ts`, `videos.ts`

- These five files are subsumed by `profile.ts` (first three) and `media.ts` (last two). They are deleted, not left as empty stubs, to avoid two sources of truth.

## Risks / Trade-offs

- **Page components now hold a tiny amount of copy (h1, intro paragraph)** → Mitigation: keep that copy explicitly placeholder so reviewers spot it; the data — which is what scales — still lives in content files.
- **One file exporting two arrays (`media.ts`) is a small departure from "one default export per file"** → Acceptable: it is two named exports, normal TypeScript, and the domain genuinely is one thing.
- **Churn across many page components in a single change** → Acceptable: the previous change is archived and the diff is mostly mechanical (swap import path, drop wrapper access).
