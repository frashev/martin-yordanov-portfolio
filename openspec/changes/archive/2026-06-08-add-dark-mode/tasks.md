## 1. CSS Tokens & Dark Palette

- [x] 1.1 Add `--header-bg` token to `:root` in `src/index.css` (value: `rgba(250,245,239,0.9)`) and add `--accent-2: #c9973a`
- [x] 1.2 Add `[data-theme="dark"]` block in `src/index.css` with all dark-mode token overrides (`--paper`, `--ink`, `--ink-muted`, `--accent`, `--accent-soft`, `--card-surface`, `--soft-border`, `--header-bg`, `--accent-2`)
- [x] 1.3 Replace the hard-coded `rgba(250, 245, 239, 0.9)` background in `src/components/Header.tsx` with `var(--header-bg)`

## 2. Flash-of-Wrong-Theme Fix

- [x] 2.1 Add an inline `<script>` to `index.html` (before any CSS) that reads `localStorage.getItem('theme')` and falls back to `prefers-color-scheme`, then sets `document.documentElement.setAttribute('data-theme', 'dark')` synchronously if dark is resolved

## 3. useTheme Hook

- [x] 3.1 Create `src/lib/useTheme.ts` — returns `[theme, toggleTheme]`
- [x] 3.2 On mount: read `localStorage` (try/catch), fall back to `prefers-color-scheme` if no saved value
- [x] 3.3 `toggleTheme`: flips `data-theme` on `<html>`, writes new value to `localStorage`
- [x] 3.4 Hook initialises with the same logic as the inline script (so React state matches the already-applied attribute)

## 4. Header Toggle Button

- [x] 4.1 Import and call `useTheme` in `src/components/Header.tsx`
- [x] 4.2 Add a `<ThemeToggle>` button (inline in Header or extracted to `src/components/ThemeToggle.tsx`) with sun/moon SVG icon
- [x] 4.3 Button `aria-label` updates dynamically: "Switch to dark mode" / "Switch to light mode"
- [x] 4.4 Position toggle between the nav links and the hamburger button (desktop); visible on mobile alongside hamburger

## 5. Cleanup: Replace Hard-coded Tailwind Colours

- [x] 5.1 Fix `src/pages/NotFound.tsx`: replace `text-neutral-900` with `style={{ color: "var(--ink)" }}` and `bg-rose-600`/`hover:bg-rose-700` with `var(--accent)` inline styles (matches the rest of the site's pattern)

## 6. Style Guide Update

- [x] 6.1 Update `docs/reference/style-guide.md` — add dark-mode token table and `--accent-2` entry to the Tokens section

## 7. Verification

- [x] 7.1 `npm run build` — TypeScript + Vite build passes with no errors
- [ ] 7.2 `npm run dev` — toggle light↔dark in browser; confirm warm palette, no cold grey
- [ ] 7.3 Confirm tab title and page layout look correct in both themes on at least 3 routes
- [ ] 7.4 Reload in dark mode — confirm no white flash before dark background appears
- [x] 7.5 `npm run test` — existing unit tests still pass
- [x] 7.6 `openspec validate` — confirm artifacts valid

## 8. Review & Cleanup

- [x] 8.1 `/codex:review` — dark mode change: CSS token overrides, useTheme hook, Header toggle, FOWT inline script, no new dependencies
- [ ] 8.2 `/opsx:archive add-dark-mode` — finalize and archive
