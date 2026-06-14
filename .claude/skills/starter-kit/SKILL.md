---
name: starter-kit
description: >-
  Scaffold a brand-new client marketing/event website (chef, DJ, conference,
  gallery, coach, photographer, band, restaurant, festival, etc.) by reusing
  this site's spec-driven kit: universal OpenSpec specs, neutral React
  components, core lib helpers, and conventions. Use this skill whenever the
  user wants to start a new client site, spin up another portfolio, reuse this
  template, make a site like this one for someone else, begin from the starter
  kit, or describes a fresh marketing/event site for a different person or
  business. It guides what to copy verbatim, what to rewrite per domain, and
  the OpenSpec kickoff flow without adding runtime configurability.
---

# Starter Kit - Scaffold A New Client Site

Use this skill to turn the copy-ritual in `docs/starter-kit.md` into a repeatable workflow. Read `docs/starter-kit.md` first and treat it as the canonical source. If this skill and the doc disagree, follow the doc and update the skill.

## Explain The Model

Tell the user once: the kit is like a house blueprint. The structure is reused: specs, neutral components, conventions. The interior is rebuilt: content, pages, palette, imagery.

Use the correct vocabulary with plain meaning:

- A _spec_ is the behavior contract: the WHEN/THEN rules the site must satisfy.
- A _change_ is a named unit of work in OpenSpec.
- An _artifact_ is one of the proposal/design/tasks/spec files.

The reuse model is spec-driven: the owner approves behavior in plain language, and the agent regenerates React code for the new domain.

## Non-Negotiable Rule

Do not build runtime configurability. No brand-config files, block toggles, domain presets, or editable theme JSON. The kit is reusable; each output site is bespoke and rewritten per client.

## Before Starting

Ask only enough to begin:

1. Who is the client and what do they do?
2. What pages do they need?
3. What color feeling should the site have?
4. Do they need the Supabase contact form, or is email enough?

If the idea is fuzzy, run `/idea-brief` first, then return here.

## Copy The Structure

Use the exact current lists in `docs/starter-kit.md`. As of 2026-06-10, the universal specs are:

`editorial-motion` - `dark-mode` - `page-meta` - `performance-hints` - `gallery-lightbox` - `gallery-bento` - `video-embed` - `content-readiness` - `contact-backend` - `contact-form` - `text-field-component` - `testimonials` - `testimonial-carousel` - `stats-band` - `event-schedule` - `floating-cta`

Do not copy domain-specific specs:

`site-foundation` - `content-model` - `site-pages` - `visual-theme` - `testing` - `deployment` - `backend-docs`

Neutral components to copy verbatim or as shells:

`Card` - `Reveal` - `GalleryImage` - `Lightbox` - `VideoEmbed` - `PlaceholderImage` - `PageMeta` - `StructuredData` - `TextField` - `TestimonialsSection` - `StatsBand` - `FloatingCTA` - `HeroMedia` - `BookingEmbed` - `Header` (shell only) - `Footer` (shell only)

Usually rewrite or heavily adapt:

`BookingCTA` - `Layout` - `SocialFeed`

Core lib helpers:

`useReveal.ts` - `useTheme.ts` - `useRouteAnnouncement.ts` - `useScrollDepth.ts` - `usePrefersReducedMotion.ts`

Copy `supabaseClient.ts` only if the client needs the contact form.

## Rewrite The Interior

Rewrite per client:

- `src/content/types.ts`
- `src/content/*.ts`
- `src/App.tsx`
- `src/pages/`
- `src/content/navigation.ts`
- `src/content/seo.ts`
- `src/index.css` color values
- `public/og-default.png`
- `public/robots.txt`
- `public/sitemap.xml`

Never fabricate real bios, awards, dates, festivals, venues, social accounts, contact details, or client claims. Use placeholder copy until verified content exists.

## Kickoff Flow

Work in the new repo, not this one.

1. Create the new repo with Vite React TypeScript, then add Tailwind v4 and React Router 7.
2. Copy the structure listed in `docs/starter-kit.md`.
3. Brief a fresh agent with the starter prompt from `docs/starter-kit.md`.
4. Propose the content model and page set as the first OpenSpec change.
5. Swap the palette in `src/index.css` and check light/dark mode.
6. Generate placeholder media only as content; never as real-world proof.
7. Wire Supabase only if the client needs form submissions.
8. Verify with build, lint, tests as appropriate, plus one runtime check.

## Palette Gotcha

When swapping colors, grep for hardcoded `linear-gradient` and inline hex colors. Any hardcoded surface must either use tokens or have a `[data-theme="dark"]` override.

## Open Question

Surface this when relevant: the kit can stay as a copy-ritual in this repo or become a separate versioned starter-kit repo. Recommend the ritual until a second developer joins or the kit goes public.

## When Not To Use

- Editing this existing site: use the normal OpenSpec flow directly.
- A fuzzy idea with no new-client framing: use `/idea-brief` first.
