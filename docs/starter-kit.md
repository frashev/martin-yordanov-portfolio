# Starter kit - how to reuse this site for a new client

This site is also a reusable template for future event/marketing sites (chef, DJ, conference, gallery, coach...). The reuse model is **spec-driven AI**: you describe the client in plain language, an AI agent reads these specs and conventions, and regenerates the code for the new domain. You never edit React.

This document answers: _"What do I copy, what do I rewrite, and how do I start?"_

---

## The model in plain terms

Think of it like a house blueprint. The **structure** (wiring, plumbing, load-bearing walls) is reused verbatim. The **interior** (rooms, colour, furniture) is redone for each client.

| Layer                   | What it is                                      | Copy or rewrite?                         |
| ----------------------- | ----------------------------------------------- | ---------------------------------------- |
| Universal specs         | The behavior contracts (what the site must do)  | **Copy verbatim**                        |
| Neutral components      | React building blocks (Card, Reveal, Lightbox)  | **Copy verbatim or as shells**           |
| Design system structure | CSS token names, dark-mode wiring, motion rules | **Copy structure, swap ~8 color values** |
| Conventions             | CLAUDE.md, AGENTS.md, the right-size workflow   | **Copy verbatim**                        |
| Content model           | TypeScript types for the data                   | **Rewrite for each domain**              |
| Pages & navigation      | The actual page set and routes                  | **Rewrite for each domain**              |
| Copy & imagery          | All text, photos, and media                     | **New per client - never reuse**         |

---

## What to copy verbatim to the new repo

### 1. Universal specs (`openspec/specs/`)

These 16 specs describe behaviors that work on any event/marketing site. Copy them to the new repo's `openspec/specs/`:

| Spec                   | What it covers                                                       |
| ---------------------- | -------------------------------------------------------------------- |
| `editorial-motion`     | Scroll-reveal, hero entrance, route cross-fade, reduced-motion rules |
| `dark-mode`            | 3-way Light/Dark/System theme, localStorage, no flash                |
| `page-meta`            | Per-page `<title>`, descriptions, Open Graph cards, JSON-LD          |
| `performance-hints`    | Route-scoped hero priority and Supabase preconnect hints             |
| `gallery-lightbox`     | Click-to-open photo lightbox (Esc/backdrop/focus trap)               |
| `gallery-bento`        | Asymmetric gallery grid with explicit media dimensions               |
| `video-embed`          | Responsive 16:9 YouTube/video embeds                                 |
| `content-readiness`    | Lazy-load + fade-in + error fallback for images                      |
| `contact-backend`      | Supabase contact form, provider pattern, graceful degradation        |
| `contact-form`         | Multi-step contact form using the existing contact service shape     |
| `text-field-component` | Accessible labeled input/textarea component                          |
| `testimonials`         | Quote content and section behavior                                   |
| `testimonial-carousel` | Carousel controls, keyboard support, and reduced-motion autoplay     |
| `stats-band`           | Full-width stat numbers strip, responsive grid                       |
| `event-schedule`       | Date-aware upcoming/past split with ticket links                     |
| `floating-cta`         | Scroll-triggered booking CTA suppressed on Contact                   |

Do **not** copy these 7 - they are domain-specific and need to be rewritten:

| Spec              | Why skip                                        |
| ----------------- | ----------------------------------------------- |
| `site-foundation` | Stack/framework choices - re-decide per project |
| `content-model`   | Data types - depends on the new domain          |
| `site-pages`      | Page set - depends on the client                |
| `visual-theme`    | Palette - new per client                        |
| `testing`         | Test setup - re-scaffold                        |
| `deployment`      | Deploy target - may differ                      |
| `backend-docs`    | Backend decisions - re-document                 |

### 2. Neutral components (`src/components/`)

Copy these 16 components verbatim or as shells. They have no client-specific logic when their content comes from the new domain's content files:

`Card` - `Reveal` - `GalleryImage` - `Lightbox` - `VideoEmbed` - `PlaceholderImage` - `PageMeta` - `StructuredData` - `TextField` - `TestimonialsSection` - `StatsBand` - `FloatingCTA` - `HeroMedia` - `BookingEmbed` - `Header` (shell only) - `Footer` (shell only)

Usually rewrite or heavily adapt per domain: `BookingCTA` (the CTA label and route are client-specific), `Layout` (page set may differ), and `SocialFeed` (keep only if the new client has approved social content or a feed provider).

### 3. Conventions

Copy these files verbatim to the new repo root:

- `CLAUDE.md` - the AI agent conventions (update the Architecture section for the new stack if needed)
- `AGENTS.md` - the cross-agent front door
- `docs/reference/style-guide.md` - update the color token values for the new palette
- `docs/reference/claude-openspec-cheatsheet.html` - unchanged

### 4. Core library files

Copy verbatim:

`src/lib/useReveal.ts` - `src/lib/useTheme.ts` - `src/lib/useRouteAnnouncement.ts` - `src/lib/useScrollDepth.ts` - `src/lib/usePrefersReducedMotion.ts`

Copy `src/lib/supabaseClient.ts` only if the client needs the contact form.

---

## What to rewrite per domain

| What                      | Where                                     | Notes                                                                                                   |
| ------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| Palette (~8 color values) | `src/index.css`                           | Swap `--accent`, `--paper`, `--ink`, `--accent-2`, `--accent-soft` etc. Keep token names, change values |
| Content model types       | `src/content/types.ts`                    | Keep reusable shapes as useful; add/remove types for the new domain                                     |
| Content data files        | `src/content/*.ts`                        | Start fresh with placeholder copy, marked `// PLACEHOLDER`                                              |
| Page set + routes         | `src/App.tsx`, `src/pages/`               | New pages for the new domain                                                                            |
| Navigation                | `src/content/navigation.ts`               | New nav items                                                                                           |
| SEO                       | `src/content/seo.ts`                      | New titles/descriptions, and set `siteUrl` to the real domain                                           |
| Social-share image        | `public/og-default.png`                   | Create a 1200x630 PNG; do not rely on SVG because many scrapers do not render it                        |
| Robots + sitemap          | `public/robots.txt`, `public/sitemap.xml` | Update the domain and route list                                                                        |

---

## How to start a new client site (step by step)

1. **Create a new repo** - `npm create vite@latest my-new-site -- --template react-ts`
2. **Copy the starter kit files** - the specs, components, and conventions listed above
3. **Open a new Claude Code (or MiniMax Code) session** in the new repo
4. **Brief the agent** - paste this into the first message:

   > "This is a new [chef / DJ / conference] marketing site for [client name]. Read CLAUDE.md and docs/project-memory.md for conventions. The stack is React 19 + React Router 7 + Tailwind CSS v4. We're starting from the starter kit - universal specs are already in openspec/specs/. Begin by proposing the content model and page set for a [domain] site."

5. **Work through the OpenSpec flow** - propose -> apply -> verify -> archive, same as this site
6. **Swap the palette** - update `src/index.css` with the new client's colors
7. **Generate media** - use `mmx image generate` for placeholder hero images
8. **Wire the contact backend** - follow the `contact-backend` spec only if the client needs form submissions (Supabase project, env vars)

---

## Open question (not yet decided)

Should the starter kit live as a **separate `starter-kit/` repository** (clean, versioned, shareable) or stay as a **documented "copy these folders" ritual** in this repo?

- **Separate repo:** cleaner, easier to share with other developers, can be versioned independently. More setup work upfront.
- **Ritual in this repo (current approach):** simpler, no extra repo to maintain, works fine for a solo owner using AI agents. The downside: a fresh agent session on a new repo must be briefed manually on what to copy.

**Recommendation:** keep the ritual for now - it works well for one owner + AI agents. If you ever onboard a second developer or want to share the kit publicly, create the separate repo then.

---

_Last updated: 2026-06-10. Update this file whenever a new universal spec, neutral component, or starter-kit transfer rule is added._
