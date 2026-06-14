## Context

All dark-mode colour tokens live in the `[data-theme="dark"]` block in `src/index.css`. The site uses CSS custom properties; no JS color calculation is involved. Landmark fixes are pure HTML attribute additions.

Current dark-mode token set:

- `--paper: #1a1310` (page background)
- `--ink: #f0e8df` (body text)
- `--ink-muted: #a89589` (secondary / caption text)
- `--accent: #c44535` (buttons, links, active states)
- `--accent-soft: #4a211a` (soft accent fill)
- `--accent-2: #d4a84a` (golden amber, secondary accent)
- `--card-surface: #221714` (card background)
- `--soft-border: #3d302a` (dividers, borders)
- `--header-bg: rgba(26, 19, 16, 0.92)` (header background, opaque-enough to treat as `#1a1310`)

## Goals / Non-Goals

**Goals:**

- Every token used for foreground text (or large text / UI icons) meets WCAG AA (4.5:1 for normal text, 3:1 for large text / UI components) against its typical dark-mode background.
- `<main>` carries an accessible name so assistive technology announces it meaningfully when the skip link or route-announcement hook lands focus on it.
- `<section>` in `BookingCTA` carries an accessible name so it appears as a named landmark in the accessibility tree.

**Non-Goals:**

- Changing light-mode tokens.
- Redesigning the palette beyond the minimal delta needed to pass the threshold.

## Decisions

**D1 — Contrast method: manual WCAG calculation, not an automated tool**
The site has no axe token-contrast plugin at build time. We calculate contrast ratios using the WCAG relative-luminance formula and adjust the hex value until the threshold is met. The adjustment strategy is to lighten the failing foreground (or darken the background) just enough to cross the threshold, preserving warmth.

Tokens to fix (estimated, verify with exact calculation):

- `--accent` (#c44535) on `--paper` (#1a1310): ≈ 3.75:1 → fails 4.5:1 for normal text. Target ≥ `#d05040` range. Note: accent is also used for large-text headings / button labels where 3:1 suffices — audit how it is actually used to determine required threshold.
- All other tokens pass on estimated review.

**D2 — `<main aria-label="Main content">`**
Static label. Does not change per route — the route heading already identifies the page (announced by `useRouteAnnouncement`), so a stable label on `<main>` is appropriate and avoids any prop-drilling to `Layout`.

**D3 — `<section aria-label="Book a session">` in BookingCTA**
Matches the visible CTA heading copy. No `aria-labelledby` because that would require adding an explicit `id` to the heading and creating a coupling; a static `aria-label` is simpler and sufficiently descriptive.

## Risks / Trade-offs

- [Accent token change] → The adjusted accent will be slightly lighter. If any component hardcodes the old hex value (not via token), it won't update. Mitigation: grep for hardcoded `#c44535` before shipping.
- [Opinionated static aria-label on main] → Screen readers will say "main, Main content region" or similar. Some auditors prefer `aria-labelledby` pointing to the h1 — but that requires the h1 to be inside `<main>`, which it is. A future improvement could use `aria-labelledby` once the page h1s have stable IDs. Accepted as low-risk for now.
