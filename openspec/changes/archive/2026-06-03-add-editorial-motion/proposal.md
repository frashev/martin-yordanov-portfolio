## Why

The site is visually tasteful but completely static — the only motion today is a hover color shift, a tiny card lift, and the form spinner. For a kinetic-object portfolio, a sense of life and movement is part of the brand, and modern visitors expect subtle, polished motion. This change adds "editorial motion" (Level 2): restrained entrance and interaction animation that makes the site feel alive without becoming flashy — while fully respecting the owner's `prefers-reduced-motion` setting and adding zero new dependencies.

## What Changes

- Add a **motion foundation** in `src/index.css`: shared CSS custom properties for duration and `ease-out` easing, plus reusable utility classes — all gated behind a single `@media (prefers-reduced-motion: reduce)` block that disables every animation.
- Add a small **reusable scroll-reveal helper** (a hook + wrapper using `IntersectionObserver`) so sections/cards fade in and rise ~12px as they enter the viewport, animating once.
- Apply a **staggered entrance** to the Home hero so the name, tagline, intro, and CTAs arrive in sequence on first load.
- Add **page cross-fade transitions** between routes using the browser-native View Transitions API (no library), with a graceful no-op fallback in unsupported browsers.
- Add a refined **link/nav underline micro-interaction** that wipes in from the accent color on hover/focus.
- Fix the **mobile menu button** in `Header.tsx`: it is currently a single `<span>` bar (looks broken). Replace it with a proper two/three-line hamburger icon that animates into an ✕ when open.
- **Non-goals:** no new dependencies, no content/copy changes (all copy stays placeholder), no backend changes, no new routes, no palette/token color changes, no scroll-scrubbed/parallax effects.

## Capabilities

### New Capabilities

- `editorial-motion`: Reduced-motion-aware animation system for the site — motion tokens and global reduced-motion guard, scroll-reveal on sections/cards, hero entrance stagger, route cross-fade transitions, link underline micro-interaction, and the animated hamburger/close icon. Defines behavior, timing constraints, and accessibility guarantees.

### Modified Capabilities

<!-- None. The existing site-foundation "Responsive navigation" toggle behavior and visual-theme tokens are unchanged at the requirement level; this change layers motion on top without altering those contracts. -->

## Impact

- **Code:**
  - `src/index.css` — motion tokens, easing, utility classes, reduced-motion guard.
  - New `src/lib/useReveal.ts` (or `src/hooks/`) — `IntersectionObserver` scroll-reveal helper, plus a small `Reveal` wrapper component if cleaner.
  - `src/components/Layout.tsx` — wire View Transitions API around route changes.
  - `src/components/Header.tsx` — animated hamburger→✕ icon; underline micro-interaction on nav links.
  - `src/components/Card.tsx` — opt into scroll-reveal.
  - `src/pages/Home.tsx` — hero staggered entrance.
- **Dependencies:** none added (pure CSS + native browser APIs).
- **Accessibility:** all motion disabled under `prefers-reduced-motion: reduce`; keyboard focus and visible focus states preserved.
- **Design system:** must honor `docs/reference/style-guide.md` (warm tokens, subtle/fast `~250–350ms` ease-out, no bounce). Style guide may need a short "Motion" section added (tracked in tasks).
- **Tests:** new unit test for the reveal helper; e2e check that the mobile toggle still works and that motion is suppressed under reduced-motion.
- **Roadmap:** proposal 1 of 5 (motion → SEO/meta → dark mode → gallery/video lightbox → content readiness).
