## Context

The site is a React 19 + React Router 7 + Tailwind v4 SPA with a disciplined warm token system (`docs/reference/style-guide.md`) and almost no motion. The owner wants a modern "alive" feel ("Level 2 — editorial motion") but the style guide forbids AI-slop motion (bounce, parallax) and the owner runs with `prefers-reduced-motion` enabled. Project rules: no new dependencies without asking; prefer the smallest safe change; reuse existing `Layout`/`Header`/`Card` patterns.

This design covers the change because it is cross-cutting (touches global CSS, the layout shell, header, a shared primitive, and a page) and introduces a new reusable pattern (scroll-reveal), even though it adds no dependencies.

## Goals / Non-Goals

**Goals:**

- A single, centralized motion layer: timing/easing tokens in `src/index.css` plus one global `prefers-reduced-motion: reduce` guard that neutralizes everything.
- One reusable scroll-reveal primitive that pages opt into, rather than per-page animation code.
- Subtle, fast (~200–400ms), ease-out motion with no bounce, honoring the warm token system.
- Zero new runtime dependencies — pure CSS + native browser APIs (`IntersectionObserver`, View Transitions API).
- Full accessibility: content present in the DOM regardless of reveal state; focus states preserved; everything off under reduced motion.

**Non-Goals:**

- No animation library (`motion`/Framer Motion etc.). If future choreography demands it, that is a separate, explicitly-approved change.
- No parallax, scroll-scrubbing, or long/heavy hero animations.
- No color/token or copy changes; no new routes; no backend.

## Decisions

### Decision 1: Reduced-motion strategy — gate added motion behind `no-preference` (RESOLVED, refined during implementation)

Originally this design proposed a blunt universal `@media (prefers-reduced-motion: reduce) { * { animation/transition-duration: 0.01ms !important } }` guard. Implementation revealed that conflicts with the spec requirement that essential feedback (the contact-form spinner) stays **unaffected** — a universal guard would freeze it.

**Refined approach:** define every animating declaration for the new motion classes **inside** `@media (prefers-reduced-motion: no-preference)`. A visitor who requests reduced motion therefore never receives the animating styles in the first place — the baseline is always the final, visible state. This is inherently leak-proof for our additions and leaves unrelated UI (the spinner, focus rings) untouched. The only exception is the View Transitions pseudo-elements, which are not normal elements and need a small **targeted** `@media (prefers-reduced-motion: reduce)` guard that sets `animation: none` on `::view-transition-old/new/group(root)`.

Reveal/entrance elements default to their **final, visible state** so that if JS/observer never runs, nothing is stuck hidden. JS-driven pieces (the reveal hook) additionally check `matchMedia('(prefers-reduced-motion: reduce)')` and reveal immediately.

- **Why:** Gating at the source is leak-proof and surgical — no `!important` arms race, no collateral damage to essential motion. Matches the spec scenario "form spinner is out of scope and unaffected."
- **Alternatives considered:** Universal `*` guard (rejected — freezes the spinner, needs `!important` re-enables); per-component JS guards only (easy to forget one → leaks).

### Decision 2: Scroll-reveal via a small `IntersectionObserver` hook

Add `src/lib/useReveal.ts` exposing a hook that returns a `ref` and an `isRevealed` flag, plus a thin `Reveal` wrapper component for ergonomic use in lists. Elements render visible by default; when motion is enabled the wrapper adds a "pre-reveal" class (opacity 0, `translateY(12px)`) and removes it once the element intersects, transitioning via the motion tokens. Observe once, then `unobserve`.

- **Why:** `IntersectionObserver` is native, cheap, and well-supported; a shared helper keeps the four card pages and Home DRY and matches the spec's "reusable helper" requirement.
- **Alternatives considered:** Scroll-event listeners (jank, manual throttling); animating every item individually inline (duplication, drift from tokens).
- **Open implementation detail:** whether `Reveal` wraps each `Card` at the page level or `Card` self-reveals. Leaning page-level wrapping so `Card` stays a pure presentational primitive (keeps the `visual-theme` "shared Card primitive" contract clean). Stagger within a list via an index-based `transition-delay`, capped so long lists don't lag.

### Decision 3: Route cross-fade via the native View Transitions API

Wrap React Router navigations so they run inside `document.startViewTransition(...)` when available, applying a CSS cross-fade on the page-content region (not the persistent `Header`/`Footer`). Feature-detect and fall back to a plain swap.

- **Why:** Native, zero-dependency, exactly the "quick cross-fade" the owner approved; degrades cleanly.
- **Alternatives considered:** `motion`'s `AnimatePresence` (new dependency, rejected per rules); a hand-rolled CSS opacity transition keyed on `pathname` (workable fallback, but View Transitions is cleaner where supported — we may use the keyed-opacity approach as the fallback path).
- **Integration note:** React Router 7 may need its transition hook or a wrapper around the `Outlet`; exact wiring is an implementation task. The `Header`/`Footer` must be excluded from the transition so they don't flicker (satisfies the "layout persists" scenario).

### Decision 4: Hamburger icon as inline SVG with CSS-animated lines

Replace the single `<span>` bar with an inline SVG (or three spans) whose lines transform into an ✕ via CSS transitions tied to the `open` state. Keep `aria-expanded`, `aria-controls`, and the accessible label exactly as today; only the visual changes. Under reduced motion the lines snap between states (no tween) but still reflect open/closed.

- **Why:** Fixes a real visual bug (looks broken now), adds a satisfying micro-interaction, stays within "real SVG icons, sized consistently" from the style guide.
- **Alternatives considered:** An icon font or library icon (dependency / heavier); leaving it as-is (rejected — it reads as broken).

### Decision 5: Link underline micro-interaction via pseudo-element scaleX

Use a `::after` pseudo-element underline that animates `transform: scaleX(0 → 1)` from the link's start edge, in the accent color, on `:hover` and `:focus-visible`. Because it's a pseudo-element transform, it causes no layout shift.

- **Why:** Pure CSS, no reflow, keyboard-accessible via `:focus-visible`, reuses the accent token.
- **Alternatives considered:** Animating `text-decoration` (limited control, can reflow); border-bottom toggling (layout shift).

## Risks / Trade-offs

- **Motion leaks past the reduced-motion guard (JS-driven paths)** → JS pieces (reveal, view transitions) independently check `matchMedia` and no-op; the global CSS guard catches the rest. Add an e2e/unit assertion that emulates reduced motion.
- **Flash of hidden content if JS fails or is slow** → baseline state is _visible_; the hidden pre-reveal state is added only when motion is enabled, so failure mode is "no animation," never "invisible content."
- **View Transitions browser support is uneven** → feature-detect; fall back to instant swap (or a simple keyed opacity fade). No console errors in unsupported browsers (explicit scenario).
- **Header/Footer flicker during route transition** → scope the transition to page content only; verify the persistence scenario.
- **Stagger delays make long lists feel sluggish** → cap the per-item delay and the number of staggered items; reveal remaining items together.
- **Tailwind v4 / inline-style mix** → motion tokens live in `src/index.css` alongside the existing color tokens for consistency; document them in the style guide so future UI work reuses them.

## Migration Plan

Additive and incremental; no data or config migration. Suggested rollout order matches `tasks.md`: (1) tokens + global guard, (2) reveal helper, (3) hero stagger, (4) route cross-fade, (5) link underline, (6) hamburger. Each step is independently verifiable in `npm run dev`. Rollback is per-commit revert; removing the motion CSS classes returns the site to its current static behavior with no functional loss.

## Resolved (during implementation)

- **View Transitions wiring (was Open Question / task 1.1):** Use React Router 7's built-in `viewTransition` boolean prop on `Link`/`NavLink` in declarative mode. The router wraps the navigation in `document.startViewTransition` with automatic feature-detection and a plain-swap fallback when unsupported — no manual `Outlet` wrapping, no console errors. We style the default `::view-transition-old/new(root)` cross-fade with the motion tokens; the persistent `Header`/`Footer` stay mounted (React never remounts them) and, being pixel-identical across the swap, do not visibly fade.
- **Reveal placement (was Open Question / task 1.2):** Page-level `Reveal` wrapper component (renders a `<div>`, uses `useReveal`), so `Card` stays a pure presentational primitive (keeps the `visual-theme` "shared Card primitive" contract intact). Stagger via an index-based delay capped at 6 steps.
- **Concrete motion values (task 1.3):** `--motion-fast: 200ms` (underline, hamburger), `--motion-base: 320ms` (reveal, entrance, page fade), `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (monotonic ease-out, no overshoot/bounce), `--reveal-offset: 12px`, `--stagger-step: 80ms`. All within the ~200–400ms / no-bounce constraint.

## Open Questions

- None remaining for this change.
- Exact React Router 7 wiring for View Transitions (router-native hook vs. `Outlet` wrapper) — resolve when implementing Decision 3.
- Whether the Header desktop nav links also adopt the underline micro-interaction or keep the current color-shift — decide visually during build (both are token-compliant).
