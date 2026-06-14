## Why

The site has a coherent visual system and motion vocabulary, but a screen-reader
or keyboard-only user would hit a handful of real accessibility gaps today:

- The contact form fields are not linked to their error messages (WCAG 1.3.1,
  3.3.1). A blind user submitting an empty form hears nothing is wrong.
- The contact form's success and error regions are announced visually but not
  to assistive tech (WCAG 4.1.3).
- The contact form's submit button has near-invisible text in dark mode — a
  contrast ratio of ~1.8:1 against the terracotta `--accent` background, well
  below the WCAG AA threshold of 4.5:1.
- The submission spinner spins continuously even when the user has set
  `prefers-reduced-motion: reduce`, violating the project's own motion rule
  ("all added motion is gated behind `prefers-reduced-motion: no-preference`").
- The lightbox dialog is missing `aria-labelledby`, so screen readers announce
  "dialog" with no name.
- The theme toggle in the header has no visible focus ring matching the warm
  palette.

The contact form is also the single largest file in the app
([Contact.tsx](src/pages/Contact.tsx) is ~350 lines) because the same five input
blocks are 80% copy-pasted. Extracting a `<TextField>` component both shrinks
the file and subsumes the field-level accessibility work.

## What Changes

- **New `TextField` component** in [src/components/TextField.tsx](src/components/TextField.tsx)
  — labeled input or textarea with optional error, renders `aria-invalid` and
  `aria-describedby` automatically, includes its own focus ring matching the
  warm palette.
- **Refactor [Contact.tsx](src/pages/Contact.tsx)** to use `<TextField>` for
  all five fields. The file shrinks by ~50% and the accessibility work lands
  for free.
- **Submit button contrast** — replace `color: "var(--paper)"` with a fixed
  light text color (or a new `--accent-fg` token), matching the existing
  [BookingCTA pattern](src/components/BookingCTA.tsx#L28).
- **Submission spinner** — gate the `animate-spin` class behind
  `motion-safe:animate-spin`, and render a static state in the reduced-motion
  path (a static checkmark or "Sending…" text only).
- **Form status announcements** — wrap the success state and error banner in
  `role="status" aria-live="polite"`.
- **Lightbox** — render a visually-hidden `<h2 id="lightbox-caption">` from
  the caption and add `aria-labelledby="lightbox-caption"` to the dialog.
- **Theme toggle focus ring** — add `focus-visible:ring-2
focus-visible:ring-[color:var(--accent)]` matching the lightbox close button.
- **New tests** under [src/**tests**/](src/__tests__/):
  - `Contact.test.tsx` — covers the validation state machine (empty submit
    shows field errors, valid submit shows success), and the error-state path
    (network error shows the error banner).
  - `Events.test.tsx` — locks the upcoming/past date split with a mock date.
  - `PageMeta.test.tsx` — confirms `document.title` updates after render.
  - `Lightbox.test.tsx` — confirms Escape closes and the close button receives
    focus on open.

## Capabilities

### New Capabilities

- `text-field-component`: Reusable labeled input/textarea with built-in
  `aria-invalid` / `aria-describedby` linking to its error message.

### Modified Capabilities

- `editorial-motion`: Add a scenario confirming that **essential** feedback
  (the contact-form spinner) renders as a static visual under
  `prefers-reduced-motion: reduce`, not a hidden or absent spinner.
- `gallery-lightbox`: Add a scenario confirming the lightbox dialog has an
  accessible name via `aria-labelledby`.
- `page-meta`: Add a scenario confirming the document title is set after
  first render (not just in a delayed `useEffect` flash).

## Impact

- **New files:** `src/components/TextField.tsx`,
  `src/__tests__/Contact.test.tsx`, `src/__tests__/Events.test.tsx`,
  `src/__tests__/PageMeta.test.tsx`, `src/__tests__/Lightbox.test.tsx`.
- **Modified files:** `src/pages/Contact.tsx` (refactor to TextField,
  spinner + status fixes), `src/components/Lightbox.tsx` (labelledby),
  `src/components/Header.tsx` (theme toggle focus ring), possibly
  `src/index.css` (only if a `--accent-fg` token is chosen over a fixed
  `text-white`).
- **No new dependencies.** No backend changes. No content changes. No
  routing changes.
- **No new OpenSpec spec** for the contact form's state machine or the
  lightbox keyboard model — the existing `gallery-lightbox` and
  `contact-backend` specs are extended, not duplicated.

## Non-goals

- Full WCAG AAA audit — this is a targeted pass on real, observable gaps.
- Switching the static title in [index.html](index.html) per route — that's a
  separate SSG/SSR piece of work, not in scope.
- Refactoring every inline `style={{ color: "var(--ink)" }}` to Tailwind
  theme tokens — that's a larger mechanical refactor with no behavior change,
  not in scope here.
