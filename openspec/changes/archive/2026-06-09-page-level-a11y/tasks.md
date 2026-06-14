## 1. Skip link and focus target

- [x] 1.1 In [src/components/Layout.tsx](src/components/Layout.tsx), add a
      `<a href="#main">Skip to main content</a>` as the first child of the
      outer `<div>`, before `<Header>`. Style with `sr-only` and override
      on `:focus` to a visible top-left position. The link must be the
      first focusable element in the DOM.
- [x] 1.2 In the same file, add `id="main"` and `tabIndex={-1}` to the
      `<main>` element. Add `outline-none focus:outline-none` so the
      focus ring does not flash when focus is moved there.
- [x] 1.3 Verify by hand in `npm run dev`: Tab into the page — the skip
      link is the first stop; activating it moves focus to the main
      content; the URL hash updates to `#main`; the page does not reload.

## 2. Route announcement hook

- [x] 2.1 Create [src/lib/useRouteAnnouncement.ts](src/lib/useRouteAnnouncement.ts)
      exporting `useRouteAnnouncement()`. The hook subscribes to
      `useLocation()` from `react-router`, tracks the previous pathname
      in a ref, and on every pathname change (after a microtask):
      (a) finds the first `<h1>` inside the `<main>` element and calls
      `h1.focus({ preventScroll: true })`; (b) if no h1 exists, calls
      `document.getElementById("main")?.focus({ preventScroll: true })`.
      No effect on the initial render.
- [x] 2.2 In [src/components/Layout.tsx](src/components/Layout.tsx), call
      `useRouteAnnouncement()` once at the top of the component. The
      hook has no return value — calling it is enough to install the
      effect.

## 3. Contact h1 fix

- [x] 3.1 In [src/pages/Contact.tsx](src/pages/Contact.tsx), find the
      `<h1>` inside the success-state block (the one rendered after a
      successful form submission). Change it to `<h2>`. Keep the visual
      styling the same.
- [x] 3.2 Confirm the form still passes the existing
      [src/**tests**/Contact.test.tsx](src/__tests__/Contact.test.tsx)
      success-state test (it should — the test asserts on the success
      text, not the heading level).

## 4. Footer / BookingCTA focus-ring sweep (verify-only)

- [x] 4.1 Open [src/components/Footer.tsx](src/components/Footer.tsx) and
      [src/components/BookingCTA.tsx](src/components/BookingCTA.tsx). For
      every `<a>` and `<button>`, confirm that the same focus-ring
      pattern used in [src/components/Header.tsx](src/components/Header.tsx)
      (`focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-[color:var(--accent)] focus-visible:ring-offset-2
focus-visible:ring-offset-[color:var(--paper)]`) is present.
- [x] 4.2 If any interactive element is missing a focus ring, add the
      pattern. (Skip if everything is already correct — this is a
      verify-only task.)

## 5. Tests

- [x] 5.1 Create [src/**tests**/Layout.test.tsx](src/__tests__/Layout.test.tsx)
      with three tests:
      (a) the skip link is the first focusable element on every V1 page
      (render `Layout` with a MemoryRouter, query the DOM for the first
      `a`/`button`/`input`/etc. and assert it is the skip link);
      (b) activating the skip link calls `focus()` on the `<main>`
      element (use `userEvent.click` on the skip link and assert
      `document.activeElement` is the main);
      (c) on simulated route change (e.g. start at `/projects`, render,
      then re-render with `/workshops`), the `<h1>` of the new page
      receives focus. Use `vi.fn` to spy on the focus call if needed, or
      assert on `document.activeElement`.
- [x] 5.2 Add one test to [src/**tests**/Contact.test.tsx](src/__tests__/Contact.test.tsx)
      (or a new file) that confirms the page has exactly one `<h1>`
      after a successful submission. (Optional — covered by 5.1's h1
      assertions if Layout is rendered there.)

## 6. Verification

- [x] 6.1 `npm run build` — zero TypeScript errors
- [x] 6.2 `npm run lint` — zero ESLint warnings
- [x] 6.3 `npm run test` — all tests pass, including the new
      `Layout.test.tsx`
- [ ] 6.4 `npm run dev` — manually verify in a browser: Tab into the
      page, see the skip link, activate it, see focus jump to the main
      content. Navigate from one route to another, listen with a screen
      reader (or use Chrome DevTools' accessibility inspector), confirm
      the new page's title is announced.
- [x] 6.5 Run `openspec validate page-level-a11y --type change` — confirm
      the change parses without errors.

## 7. Post-review fixes (Codex review)

- [x] 7.1 **P2 — Page h1 elements are not focusable.** Codex flagged that
      none of the V1 page headings had `tabIndex`, so
      `h1.focus({ preventScroll: true })` in the route-announcement hook
      was a no-op in real browsers. Fix: add `tabIndex={-1}` to the
      page-level `<h1>` in
      [src/pages/Home.tsx](src/pages/Home.tsx),
      [src/pages/About.tsx](src/pages/About.tsx),
      [src/pages/Projects.tsx](src/pages/Projects.tsx),
      [src/pages/Workshops.tsx](src/pages/Workshops.tsx),
      [src/pages/Events.tsx](src/pages/Events.tsx),
      [src/pages/Gallery.tsx](src/pages/Gallery.tsx),
      [src/pages/Videos.tsx](src/pages/Videos.tsx),
      [src/pages/NotFound.tsx](src/pages/NotFound.tsx), and both
      `<h1>` instances in
      [src/pages/Contact.tsx](src/pages/Contact.tsx). Also remove the
      `outline-none focus:outline-none` suppression on the `<main>` in
      [src/components/Layout.tsx](src/components/Layout.tsx) so the
      default browser focus ring still shows when focus lands on main.
- [x] 7.2 **Lock-in test.** Add a test in
      [src/**tests**/Layout.test.tsx](src/__tests__/Layout.test.tsx)
      asserting that the page h1 has `tabindex="-1"` and that focus
      moves to it on route change. This is the regression guard for
      the P2 fix above.
