## Context

The site currently has a single hard-coded `<title>martin-yordanov-website</title>` in `index.html` and no `<meta>` or Open Graph tags anywhere. React Router 7 with Vite renders a client-side SPA — the HTML shell is static and the DOM is patched at runtime by React. Meta tag updates must therefore happen client-side (no SSR in this stack).

## Goals / Non-Goals

**Goals:**

- Unique, meaningful `<title>` and `<meta name="description">` on every route
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`, `og:image`) so social share cards render correctly
- All SEO copy co-located with the rest of the site's content in `src/content/`
- Zero new npm dependencies

**Non-Goals:**

- Server-side rendering or pre-rendering (not in scope for this stack)
- Structured data / JSON-LD (future change)
- Dynamic OG images per event/project (requires media upload — blocked on client)
- Canonical URLs or hreflang (not needed for a single-language site this size)

## Decisions

### Decision 1 — Client-side `document.head` mutation via `useEffect`, not a library

**Chosen:** A lightweight `<PageMeta>` component that uses `useEffect` to write directly to `document.title` and upsert `<meta>` nodes in `document.head`.

**Alternatives considered:**

- `react-helmet-async` — adds a dependency and ~7 kB; overkill for 8 static pages.
- React Router 7 `<title>` / `<meta>` JSX elements — React Router 7 does not yet support head element management in BrowserRouter mode (only in framework/SSR mode). Not applicable here.
- `@vite/plugin-react`'s `transformIndexHtml` — build-time only, cannot vary per route.

**Why this approach:** Direct DOM mutation in a `useEffect` is the established pattern for SPA meta tags without a library. It is ~20 lines, fully reversible, and has zero bundle cost beyond the component itself. Cleanup on unmount prevents stale tags when navigating between routes.

### Decision 2 — SEO copy lives in `src/content/seo.ts`, keyed by route

**Chosen:** A single `seo.ts` file exporting a `Record<string, SeoMeta>` keyed by route path (e.g. `"/"`, `"/projects"`). Each page imports its own entry.

**Why:** Keeps all copy in one place (the existing pattern for this project). Easy to hand to a copywriter as a single file. No schema changes to existing content types — `SeoMeta` is a new standalone type.

### Decision 3 — Placeholder OG image: inline SVG data-URI monogram

**Chosen:** A 1200×630 SVG with the "NK" monogram in the site's accent colour, encoded as a `data:image/svg+xml` base64 data-URI and embedded directly in `seo.ts` as the default `ogImage` value.

**Alternatives considered:**

- Static PNG in `/public/og-default.png` — requires an image asset; simpler but needs a file added and a deploy.
- No OG image until client uploads a photo — share cards without an image look sparse; the monogram is better than nothing.

**Why data-URI:** No new static file needed, no deploy asset to track, works in all OG scrapers. Downside: the string is ~300 chars in the source file — acceptable for a config file.

## Risks / Trade-offs

- **Social crawlers may not execute JS** → OG tags set by `useEffect` are invisible to non-JS scrapers (e.g. older Twitter/X card bots). Mitigation: Most modern crawlers (LinkedIn, Facebook, Slack, WhatsApp, iMessage) do execute JS or re-fetch after hydration. This is a known SPA trade-off; full solution requires SSR or pre-rendering, which is out of scope.
- **Stale tags on fast navigation** → if `useEffect` cleanup misses a tag, old values persist. Mitigation: the `PageMeta` component explicitly removes or overwrites every tag it owns on each render, and removes them on unmount.
- **All content is placeholder** → titles like "Martin Yordanov — Projects" are correct in structure but the descriptions will say "Placeholder…" until the client provides copy. Mitigation: the structure is right; copy swap is a Tiny change later.

## Open Questions

- None blocking implementation. OG image strategy (real photo vs. monogram) is already decided above.
