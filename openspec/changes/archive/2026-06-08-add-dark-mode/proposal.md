## Why

A warm dark theme reduces eye strain for evening browsing and is now a standard user expectation for any modern site — missing it feels like a gap. The existing token system (`--paper`, `--ink`, `--accent`, etc.) is already perfectly structured for this: adding dark-mode overrides is a CSS-only change with no structural rewrites.

## What Changes

- A `[data-theme="dark"]` attribute on `<html>` activates a second set of CSS custom property values in `src/index.css`. All colors flip to a warm deep-brown palette — **not cold grey**.
- A `<ThemeToggle>` button added to the `<Header>` lets the user switch between light and dark with one click.
- Theme choice is persisted in `localStorage` (`theme`) so it survives page reloads and cross-session visits.
- On first visit (no `localStorage` value), the site defaults to the user's OS preference (`prefers-color-scheme: dark`).
- A `useTheme` hook in `src/lib/` manages reading, writing, and syncing the theme state.
- A second warm accent token (`--accent-2`) is introduced: a golden amber (`#c9973a`) that complements the existing terracotta (`--accent`) and is available for future highlights, hover states, or decorative use.
- The `docs/reference/style-guide.md` "Tokens" section is updated with the new dark palette values and `--accent-2`.

## Capabilities

### New Capabilities

- `dark-mode`: Theme toggle, persistence, OS-preference detection, and warm dark CSS palette covering all existing tokens.

### Modified Capabilities

<!-- None — no existing spec-level behavior changes required. -->

## Impact

- **Files modified:** `src/index.css` (dark token overrides), `src/components/Header.tsx` (toggle button), `docs/reference/style-guide.md` (token docs)
- **Files added:** `src/lib/useTheme.ts`
- **No new npm dependencies**
- **No routing changes**
- **No backend changes**
- Reduced-motion guard already in place — toggle animation (if any) must respect it
