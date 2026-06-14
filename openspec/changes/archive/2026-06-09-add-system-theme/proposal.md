# Add a "System" theme mode (3-way theme control)

## Why

Today the Header theme control is two-state: Light ↔ Dark. The first visit
follows the operating-system preference (`prefers-color-scheme`), but the moment
a visitor clicks the toggle they are locked to a manual choice and can never get
back to "follow my device" without clearing storage. There is also no live
response: if the OS flips to dark at sunset, a visitor who once clicked stays on
their old manual choice.

This change adds a third **System** state so the control cycles
**Light → Dark → System**, and in System mode the site follows the OS preference
and updates live when it changes.

## What changes (user-visible outcome)

- The Header theme button cycles through three states with a distinct icon each:
  Light (sun), Dark (moon), System (monitor).
- Choosing **System** makes the site match the device's `prefers-color-scheme`
  and switch automatically if the device preference changes while the page is open.
- The chosen mode persists across reloads (Light / Dark / System), with no flash
  of the wrong theme on load.

## Affected surfaces

- **Components:** `src/components/Header.tsx` (toggle becomes 3-way + monitor icon).
- **Lib:** `src/lib/useTheme.ts` (tracks the _choice_ vs the _resolved_ theme; adds
  a live `matchMedia` listener for System mode).
- **No-flash script:** `index.html` (FOWT inline script handles the `system` value).
- **Tests:** `src/__tests__/Header.test.tsx` (update toggle assertions).
- **Spec:** `openspec/specs/dark-mode/spec.md` (toggle requirement modified; a new
  live-follow requirement added).

This is **static / client-only** — no content-layer or Supabase changes.

## Non-goals

- No new color tokens or palette changes (the existing warm dark palette stays).
- No per-page theme overrides; the mode is global.
- No UI beyond the existing single Header button (no dropdown/segmented control).
