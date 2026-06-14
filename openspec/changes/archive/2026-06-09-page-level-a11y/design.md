## Context

The site is a single-page React 19 app: one `<Layout>` wraps the persistent `<Header>` and `<Footer>` and contains a single `<Outlet />` for the routed page. The accessibility-pass change (archived 2026-06-09) closed per-component gaps (form fields, lightbox, focus rings on theme/menu toggles) but left the **page-level** accessibility story untouched: there is no skip link, the `<main>` is not focusable, and route changes are silent for assistive tech. This change closes those three gaps and fixes a related `<h1>` regression in the Contact form's success state.

The new behaviour is small, self-contained, and touches only the shared layout and one page. No new dependency, no new architectural pattern, no new config. The spec-driven reusable-kit model already lists accessibility as a first-class concern, so this fits cleanly within the template.

## Goals / Non-Goals

**Goals:**

- Keyboard and switch-device users can reach page content in one Tab press (skip link) and hear that they have arrived at a new page on every navigation (route announcement).
- The fix is mechanical, fully tested, and uses only `react` + `react-router` (already installed).
- A single source of truth for the focus-move-on-route behaviour lives in a small reusable hook so future pages get the behaviour for free.

**Non-Goals:**

- Color-contrast audit of every page (would need a design-system review).
- Restructuring the layout (Header, Footer, Layout positions unchanged).
- Adding any new accessibility library (we keep the dependency surface flat).
- Per-page custom focus targets — every page uses the same `<main id="main">` and "first `<h1>` inside `<main>`" target.

## Decisions

### 1. Skip link: `<a href="#main">` at the top of `<Layout>`

**Decision:** Render a single `<a href="#main">Skip to main content</a>` as the first child of the `<div>` returned by `Layout`, before the `<Header>`. Style with Tailwind's `sr-only` utility, overridden on `:focus` to a visible top-left position. The link is rendered server-side and on every page (it lives in the persistent layout).

**Why:**

- A native `<a href="#main">` works without JavaScript and is the most robust pattern — it falls back to native hash-jump behaviour if focus management fails.
- The `sr-only` → visible-on-focus pattern is the standard idiom for skip links and matches WAI-ARIA Authoring Practices.

**Alternatives considered:**

- React Router's `<Link to="#main">` — rejected: it would call `e.preventDefault()` and lose the no-JS fallback.
- Programmatically moving focus on `Tab` key — rejected: changes native browser behaviour, confuses power users.

### 2. Focusable `<main>`: `id="main"` + `tabIndex={-1}`

**Decision:** Add `id="main"` and `tabIndex={-1}` to the existing `<main>` element.

**Why:**

- `tabIndex={-1}` makes the element programmatically focusable (it can receive focus via `element.focus()` or a hash-jump) without putting it in the sequential tab order. That is exactly what the skip link needs.
- The visual outline that would appear when `<main>` is focused is suppressed with `outline-none focus:outline-none` so it does not flash an ugly default ring.

**Alternatives considered:**

- `tabIndex={0}` — rejected: would put `<main>` in the tab order, so the user would have to Tab _through_ an empty element to reach the footer.
- A separate invisible focus target — rejected: over-engineered, harder to test.

### 3. Route-change focus: a small `useRouteAnnouncement` hook

**Decision:** Create `src/lib/useRouteAnnouncement.ts` exporting a `useRouteAnnouncement()` hook that:

1. Subscribes to `useLocation()` from `react-router`.
2. On each `pathname` change (after a microtask, so the new page has rendered), finds the first `<h1>` inside the new `<main>`. If one exists, calls `h1.focus({ preventScroll: true })`. If none exists, falls back to `<main id="main">`.
3. Then resets the URL's scroll position via `window.scrollTo(0, 0)` (or lets the browser's default behaviour run, whichever the implementation finds simpler — the spec doesn't dictate which).

**Why:**

- A hook in `src/lib/` matches the codebase's existing convention (e.g. `useTheme`, `useReveal`).
- Calling `focus({ preventScroll: true })` on the `<h1>` lets the browser's default hash-restore logic decide whether to scroll to top, which is what most users expect. The hook stays simple.
- The fallback to `<main>` covers the case where a future page has no `<h1>` (e.g. an error page).

**Alternatives considered:**

- Putting the focus logic directly in `Layout` — rejected: harder to test in isolation, harder to disable per-page if needed later.
- Using `react-router`'s `useNavigationType` + an effect — considered: not needed. `useLocation().pathname` is sufficient.
- A `react-aria` or `react-a11y` library — rejected: new dependency, project rule against adding deps without asking.

### 4. Contact form: demote success-state h1 to h2

**Decision:** In `src/pages/Contact.tsx`, change the success-state heading from `<h1>` to `<h2>`. Keep the visual styling the same.

**Why:**

- The page's "real" h1 is the form heading ("Send Nikoleta a message"). The success state is a sub-state of the same page, not a new page.
- An h2 is the right level — the success heading sits _under_ the page-level h1 conceptually.
- Aria-live (`role="status"`) is already on the success container from the accessibility-pass change, so screen readers still announce it.

**Alternatives considered:**

- Restructuring to navigate to a separate `/contact/thank-you` route — rejected: over-scope; the success state should be a state, not a route, for form submission.

## Risks / Trade-offs

- **Skip link visual flash on initial load.** [Risk] → [Mitigation] The skip link uses `sr-only` by default and only becomes visible on `:focus`, so there is no flash on load. Tested manually in dev.
- **Route-announcement double-focus on initial page load.** [Risk] → [Mitigation] The hook tracks the _previous_ pathname in a ref and only fires the focus move when the pathname actually changes. No focus move on the first render.
- **Programmatic focus can interfere with user mid-interaction.** [Risk] → [Mitigation] The hook only fires on route change (Link click, browser back/forward, programmatic navigation). A user typing in a form is not navigating, so focus is preserved.
- **`tabIndex={-1}` on `<main>` means screen-reader users hear "main landmark" on focus.** [Risk] → [Mitigation] Acceptable — `<main>` is the correct landmark for the focus target, and the screen reader will announce both the landmark and the h1 (because the h1 sits _inside_ the main and is what we actually focus). The landmark announcement is the polite convention.
- **View Transitions API interaction.** [Risk] → [Mitigation] `react-router`'s `viewTransition` prop animates the visual cross-fade. Focusing the new h1 _after_ the transition completes gives a smooth experience. The hook fires focus on a microtask after `useLocation` updates, which is short enough to feel instant.

## Migration Plan

No migration needed. The change is additive and the only removal is one `<h1>` → `<h2>` swap in `Contact.tsx`. Rollback is a single `git revert` of the change's commits. No data, no schema, no deploy-config changes.

## Open Questions

None. The change is small enough that all design decisions fit in this document. If the route-announcement behaviour turns out to be too aggressive (e.g. announces on every filter change in a future page), we can add an opt-out per page via a context or prop on `<Layout>`. Not needed for V1.
