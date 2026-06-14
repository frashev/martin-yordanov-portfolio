## 1. Exploration

- [x] 1.1 Calculate exact WCAG contrast ratios for all dark-mode tokens: `--ink`, `--ink-muted`, `--accent`, `--accent-2` against `--paper` and `--card-surface`
- [x] 1.2 Check every usage of `--accent` in components/pages to determine whether it is used as normal text (needs 4.5:1) or large text / UI icon (needs 3:1)
- [x] 1.3 Grep for any hardcoded hex values that match the current dark-mode accent (#c44535) to ensure the token change covers all usages

## 2. Dark-mode Contrast Fix

- [x] 2.1 Adjust any dark-mode token(s) in `src/index.css` that fail their required contrast threshold — lighten foreground or darken background within the warm-brown hue family
- [x] 2.2 Verify the adjusted values by re-calculating contrast ratios for each changed token

## 3. Landmark Attribute Additions

- [x] 3.1 Add `aria-label="Main content"` to `<main>` in `src/components/Layout.tsx`
- [x] 3.2 Add `aria-label="Book a session"` to `<section>` in `src/components/BookingCTA.tsx`

## 4. Verification

- [x] 4.1 Run `npm run build` — confirm no TypeScript or Vite errors
- [x] 4.2 Run `npm run lint` — confirm no ESLint errors
- [x] 4.3 Run `npm run test` — confirm all unit tests pass
- [x] 4.4 Run `npm run test:e2e` — confirm the accessibility e2e suite passes (includes the axe-core checks)
- [x] 4.5 Run `openspec validate` — confirm artifacts are valid before archive

## 5. Cleanup

- [ ] 5.1 Run `/opsx:archive dark-mode-contrast-and-landmarks` to finalize the change
