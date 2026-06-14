## Why

The dark-mode colour tokens and the HTML landmark structure have never been formally audited against WCAG 2 AA. Specifically, the `--accent` token (#c44535) in dark mode provides roughly 3.75:1 contrast on the dark background — below the 4.5:1 AA threshold for normal-weight text. Additionally, the `<main>` element has no accessible name (so screen readers announce it generically), and the `<section>` in `BookingCTA` has no label (making it invisible as a landmark to assistive technology). These are low-effort, high-signal gaps to close before client handoff.

## What Changes

- Audit all eight dark-mode CSS tokens in `src/index.css` against WCAG AA (4.5:1 for normal text, 3:1 for large text / UI components); adjust any token values that fail, keeping the warm palette intact.
- Add `aria-label` to `<main>` in `Layout.tsx` — a static `"Main content"` label so assistive technology announces it meaningfully when the skip link lands focus there or when `useRouteAnnouncement` falls back to `<main>`.
- Add `aria-label="Book a session"` to the `<section>` in `BookingCTA.tsx` so it registers as a named landmark in the accessibility tree.

**Non-goals**:

- Redesigning the colour palette or changing the light-mode tokens.
- Writing biographical copy (placeholder descriptions in `seo.ts` are already complete).
- Adding `aria-label` to the `::view-transition` pseudo-elements — these are not DOM nodes and cannot carry ARIA attributes; route announcements are handled by `useRouteAnnouncement`.

## Capabilities

### New Capabilities

_(none)_

### Modified Capabilities

- `dark-mode`: Add a WCAG AA contrast requirement for dark-mode tokens.
- `site-foundation`: Add requirements for `<main>` accessible name and named `<section>` landmarks.

## Impact

- **`src/index.css`** — one or more dark-mode token values tweaked to meet contrast thresholds.
- **`src/components/Layout.tsx`** — `aria-label="Main content"` added to `<main>`.
- **`src/components/BookingCTA.tsx`** — `aria-label="Book a session"` added to `<section>`.
- **No new dependencies.** All changes are CSS/JSX token and attribute edits.
