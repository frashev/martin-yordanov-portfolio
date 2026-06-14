## Why

The site already has most of the right bones for assistive technology: a `<main>` landmark, a `<header>` with labelled `<nav>`s, a labelled lightbox, and a per-page `<title>`. But three small, high-impact gaps keep keyboard and screen-reader users from having an experience equivalent to sighted, mouse-driven users:

1. **No skip-to-content link.** Tabbing into the page forces every user through the entire header (logo, primary nav, theme toggle, mobile toggle) before reaching the actual content. For a keyboard or switch-device user this is the single most annoying recurring tax on the site.
2. **The `<main>` landmark is not focusable**, so even after we add a skip link there is no target to jump to.
3. **No route-change announcement.** When `<Link>` swaps the page content, assistive tech is not told the page changed — so a screen-reader user navigating from `/projects` to `/workshops` hears no signal that they have arrived. The View Transitions API handles the visual cross-fade but not the assistive-tech story.

A `<h1>` audit found one minor related issue: `Contact.tsx` renders a second `<h1>` inside the success state, breaking the "exactly one h1 per page" rule.

## What Changes

- Add a **skip-to-content link** at the very top of `Layout`. Hidden by default with `sr-only` (a Tailwind utility for screen-reader-only content), visible on focus. The link targets `<main id="main">` and is the first focusable element in the tab order.
- Make the `<main>` element **programmatically focusable** by adding `id="main"` and `tabIndex={-1}`. `tabIndex={-1}` lets the skip link move focus there without putting the main element itself in the tab order.
- On every **client-side route change**, move focus to the new page's `<h1>` (or to `<main>` if the page has no h1) and let the browser's default scroll behaviour run. Screen readers re-announce the focused element, giving users a clear "you are now on the Workshops page" cue. Implementation lives in a small `useRouteAnnouncement` hook used by `Layout`.
- **Fix the double-`<h1>` in `Contact.tsx`**: the success-state heading is demoted from `<h1>` to `<h2>` (it is not the page title — the form heading is). Visual styling is preserved.
- **(Verify-only)** Audit the existing interactive elements in `Footer` and `BookingCTA` for visible focus rings. Add the same `focus-visible:ring-2 focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--paper)]` pattern if any are missing.

## Capabilities

### New Capabilities

_None._ This change modifies the existing site shell capability rather than introducing a new behavioural area.

### Modified Capabilities

- `site-foundation`: Two new requirements will be added — a "Skip-to-content link" requirement (skip link is present, focusable first, jumps to `<main id="main">`) and a "Route-change announcement" requirement (focus moves to the new page's `<h1>` on client-side navigation, screen readers re-announce the page title).

## Impact

- **Code:** `src/components/Layout.tsx` (skip link, focus target, route-announcement hook), `src/pages/Contact.tsx` (one h1 demotion), and possibly `src/components/Footer.tsx` / `src/components/BookingCTA.tsx` (focus-ring sweep, only if gaps found).
- **New file:** `src/lib/useRouteAnnouncement.ts` — small custom React hook (~30 lines) that listens to `useLocation` and moves focus to the first `<h1>` inside `<main>` after each route change. Returns nothing.
- **Dependencies:** None. The hook uses only `react` and `react-router` (already installed).
- **Tests:** A new `src/__tests__/Layout.test.tsx` covering (a) the skip link is the first focusable element, (b) activating the skip link moves focus to `<main>`, (c) on simulated route change, focus moves to the new page's h1. Existing tests unaffected.
- **Specs:** `openspec/specs/site-foundation/spec.md` gains two new requirements with WHEN/THEN scenarios.
- **Spec-driven reusable-kit model:** This change respects the kit model — no new dependency, no configuration, no platform concept. The skip link and route announcement are universal accessibility patterns and belong in any site that reuses this template.
