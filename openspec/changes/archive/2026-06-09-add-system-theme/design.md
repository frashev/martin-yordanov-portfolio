# Design — System theme mode

## The core distinction: _choice_ vs _resolved theme_

The current `useTheme` stores a single `Theme = "light" | "dark"`, conflating
"what the user picked" with "what is on screen". System mode forces them apart:

- **ThemeChoice** = `"light" | "dark" | "system"` — what the user selected; this
  is what we persist to `localStorage` under the `theme` key.
- **Resolved theme** = `"light" | "dark"` — what actually paints. When the choice
  is `system`, the resolved theme is derived from `prefers-color-scheme` and can
  change without a new click.

`data-theme="dark"` is still applied to `<html>` only when the _resolved_ theme
is dark; light resolves to the attribute being absent (unchanged from today).

## Cycle order

`Light → Dark → System → Light`. A single button keeps the existing minimal
Header (the non-goal rules out a segmented control). The icon reflects the
**choice**: sun = light, moon = dark, monitor = system — so the user can always
see whether they are pinned or following the device.

## Live OS following

In `system` mode only, `useTheme` subscribes to
`window.matchMedia("(prefers-color-scheme: dark)")` `change` events and re-resolves.
The listener is added/removed in a `useEffect` keyed on the choice, so it is only
active while in System mode (no wasted listeners, clean teardown).

## No-flash (FOWT) handling

The inline `index.html` script must paint the right theme before React loads.
New logic: `dark` → dark; `light` → light; `system` **or** no stored value →
follow OS. Today a stored `"system"` would be ignored (falls through to light),
so the script is updated to treat `system`/absent identically as "follow OS".

## Persistence & migration

Existing visitors have `"light"` or `"dark"` stored — both remain valid choices,
so no migration is needed. A first-time visitor has no stored value and behaves
as System (follows OS) until they click, which matches today's first-visit
behavior while now being an explicit, recoverable state.

## Accessibility

The button keeps its single-action semantics; `aria-label` announces the **next**
action (e.g. "Switch to dark mode", "Switch to system theme") so screen-reader and
keyboard users get the same cycle as mouse users.
