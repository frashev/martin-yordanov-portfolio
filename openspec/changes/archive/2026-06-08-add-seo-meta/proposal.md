## Why

A booking and performance site lives or dies on shareability — when someone sends the link on WhatsApp or posts it on Instagram, the platform shows a preview card with a title, description, and image. Without meta tags every page shows a blank or generic preview, which looks unprofessional and kills click-through. All content for placeholder copy already exists in `src/content/`; no client media is needed to ship this.

## What Changes

- A reusable `<PageMeta>` component sets `<title>`, `<meta name="description">`, and Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`) per route.
- Every page component (`Home`, `About`, `Projects`, `Workshops`, `Events`, `Gallery`, `Videos`, `Contact`) calls `<PageMeta>` with page-specific values.
- A fallback Open Graph image uses the site monogram/initials (SVG or static PNG) until a real hero photo is available — no media upload needed.
- A `seo` field (title, description, ogImage) is added to `src/content/` where per-page copy already lives, keeping all copy in one place.
- No new npm dependency — React Router 7 supports `<title>` and `<meta>` elements natively via its `<head>` management; if that is insufficient, use a lightweight inline `useEffect` on `document.title` + a `<Helmet>`-free approach with direct DOM meta tags.

## Capabilities

### New Capabilities

- `page-meta`: Per-page `<title>` + `<meta description>` + Open Graph tags rendered for all routes; correct values visible in browser tab, search results, and social share previews.

### Modified Capabilities

<!-- None — no existing spec-level behavior changes. -->

## Impact

- **Files added:** `src/components/PageMeta.tsx`, `src/content/seo.ts`
- **Files modified:** `src/content/types.ts` (add `SeoMeta` type), all 8 page components, `src/index.html` (base `<title>` fallback)
- **No new npm dependencies**
- **No backend changes**
- **No routing changes** — meta tags are cosmetic additions inside existing routes
