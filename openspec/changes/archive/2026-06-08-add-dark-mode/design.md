## Context

The site uses a CSS custom property token system declared in `:root` in `src/index.css`. All colors are already referenced as `var(--paper)`, `var(--ink)`, etc. throughout components. The sole exception is a hard-coded `rgba(250, 245, 239, 0.9)` backdrop value in `Header.tsx` — this must become a token.

`src/components/Header.tsx` already manages one piece of local state (`open` for mobile nav). The theme toggle will add a second concern. React Router 7 `<Layout>` wraps all routes; `<html>` is outside React's control in this Vite/SPA setup, so `document.documentElement.dataset.theme` is the correct mutation point.

## Goals / Non-Goals

**Goals:**

- All colors flip via `[data-theme="dark"]` CSS overrides — zero JS style manipulation
- `useTheme` hook: reads `localStorage`, falls back to `prefers-color-scheme`, writes on change
- Theme persists across sessions; OS preference auto-applied on first visit
- Toggle button in Header (sun/moon icon) accessible by keyboard and screen reader
- `--accent-2` golden amber token added to both light and dark palettes
- Header backdrop fixed to use a CSS variable (no hard-coded rgba)

**Non-Goals:**

- Per-page or per-component theme overrides
- Animated color transitions (can be added later; out of scope to keep this focused)
- System preference live-tracking after mount (would require an effect; complexity vs. value is low for a small personal site)

## Decisions

### Decision 1 — `[data-theme="dark"]` attribute on `<html>`, not a CSS class

**Chosen:** `document.documentElement.setAttribute('data-theme', 'dark')` / `removeAttribute('data-theme')`.

**Alternatives considered:**

- `.dark` class on `<html>` — conflicts with Tailwind's `darkMode: 'class'` if that's ever enabled; semantically less clear.
- CSS `@media (prefers-color-scheme: dark)` only — doesn't support manual user toggle.

**Why:** Attribute selectors are standard for theming, keep the class list clean, and Tailwind v4 doesn't use class-based dark mode by default.

### Decision 2 — `useTheme` hook in `src/lib/useTheme.ts`, no Context

**Chosen:** A hook that returns `[theme, toggleTheme]`. It reads `localStorage` on init, applies the attribute to `<html>`, and saves on change. Called once in `Header.tsx`.

**Why:** The toggle lives only in the Header. Context is overkill — all components read the theme via CSS variables automatically. The hook is the only consumer of theme state.

### Decision 3 — Warm dark palette (not cold grey)

**Chosen dark tokens:**

| Token                | Light                   | Dark                  |
| -------------------- | ----------------------- | --------------------- |
| `--paper`            | `#faf5ef`               | `#1a1310`             |
| `--ink`              | `#2a221d`               | `#f0e8df`             |
| `--ink-muted`        | `#6b5e55`               | `#a89589`             |
| `--accent`           | `#b34a3a`               | `#c44535`             |
| `--accent-soft`      | `#e9b4a8`               | `#4a211a`             |
| `--card-surface`     | `#fdfaf6`               | `#221714`             |
| `--soft-border`      | `#e8ddd2`               | `#3d302a`             |
| `--header-bg`        | `rgba(250,245,239,0.9)` | `rgba(26,19,16,0.92)` |
| `--accent-2` _(new)_ | `#c9973a`               | `#d4a84a`             |

**Why warm dark:** Cold grey themes feel off-brand for a dance/performance site. Deep warm browns extend the existing terracotta identity into darkness naturally.

### Decision 4 — Toggle button: inline SVG sun/moon icon, no icon library

**Chosen:** A `<button>` with an inline SVG that swaps between sun (☀) and moon (☽) based on the current theme. The SVG is ~8 lines, no dependency.

**Why:** No new npm package. Icon is small enough to inline. Accessible via `aria-label` that updates with the current action ("Switch to dark mode" / "Switch to light mode").

### Decision 5 — Hard-coded Header rgba → `--header-bg` CSS variable

`Header.tsx` currently has `background: "rgba(250, 245, 239, 0.9)"` as an inline style. This must be replaced with `var(--header-bg)` to support dark mode. `--header-bg` is added to both `:root` and `[data-theme="dark"]`.

## Risks / Trade-offs

- **Flash of wrong theme (FOWT)** → A user with `prefers-color-scheme: dark` and no `localStorage` entry will briefly see the light theme before React hydrates and applies the dark attribute. Mitigation: a small inline `<script>` in `index.html` that reads `localStorage` and sets `data-theme` synchronously before any CSS renders. This is the standard fix and the only JavaScript that needs to run before React.
- **`localStorage` unavailable** → In private/incognito or blocked-JS environments `localStorage.getItem` can throw. Mitigation: wrap reads/writes in try/catch, fall back to OS preference.
- **Tailwind utility colors** → A few components use Tailwind's `text-neutral-900` / `bg-rose-600` (e.g. `NotFound.tsx`). These won't flip automatically. Mitigation: fix them to use `var(--ink)` / `var(--accent)` in a cleanup pass within this change's tasks.

## Open Questions

None blocking implementation.
