# Visual style guide — Martin Yordanov

Single source of truth for the site's visual identity. Read this before any UI work; keep it in sync when tokens change in [`src/index.css`](../../src/index.css). The vocabulary used here is explained by the `/design-vocab` skill.

## Atmosphere

Warm, editorial, artisanal — a paper-and-ink feel with a single terracotta accent. The palette is intentionally **warm** (cream paper, brown-black ink) rather than the cool slate/blue defaults that make sites look generic. Lean calm and spacious over dense and busy.

## Color tokens

Defined as CSS variables in `src/index.css` (`:root`). Always reference the token, never a raw hex value.

### Light theme (`:root`)

| Token            | Value                   | Role                                         |
| ---------------- | ----------------------- | -------------------------------------------- |
| `--paper`        | `#faf5ef`               | Page background (warm cream)                 |
| `--ink`          | `#2a221d`               | Primary text (warm brown-black)              |
| `--ink-muted`    | `#6b5e55`               | Secondary / muted text                       |
| `--accent`       | `#b34a3a`               | Terracotta — primary accent, CTAs, links     |
| `--accent-soft`  | `#e9b4a8`               | Soft accent — hover tints, subtle highlights |
| `--accent-2`     | `#c9973a`               | Golden amber — second accent, future use     |
| `--card-surface` | `#fdfaf6`               | Card / raised-surface background             |
| `--soft-border`  | `#e8ddd2`               | Hairline borders, dividers                   |
| `--header-bg`    | `rgba(250,245,239,0.9)` | Sticky header backdrop (semi-transparent)    |

### Dark theme (`[data-theme="dark"]`)

Activated by the `useTheme` hook; persisted in `localStorage`; falls back to `prefers-color-scheme`. Always warm brown tones — never cold grey.

| Token            | Value                 | Role                                                     |
| ---------------- | --------------------- | -------------------------------------------------------- |
| `--paper`        | `#1a1310`             | Page background (deep warm brown)                        |
| `--ink`          | `#f0e8df`             | Primary text (warm off-white)                            |
| `--ink-muted`    | `#a89589`             | Secondary / muted text                                   |
| `--accent`       | `#c44535`             | Terracotta adjusted for WCAG AA contrast with white text |
| `--accent-soft`  | `#4a211a`             | Dark accent background                                   |
| `--accent-2`     | `#d4a84a`             | Golden amber (lighter for dark bg)                       |
| `--card-surface` | `#221714`             | Card background (slightly above paper)                   |
| `--soft-border`  | `#3d302a`             | Hairline borders, dividers                               |
| `--header-bg`    | `rgba(26,19,16,0.92)` | Sticky header backdrop                                   |

These are **tinted neutrals**, not pure grays — keep it that way. Never introduce pure `#000`, `#fff`, or cool grays (`#888`, slate tones); they clash with the warm system.

## Typography

| Token            | Stack                                                                    | Use                             |
| ---------------- | ------------------------------------------------------------------------ | ------------------------------- |
| `--font-display` | `"Iowan Old Style", "Apple Garamond", Georgia, "Times New Roman", serif` | Display headings (`h1`, `h2`)   |
| `--font-body`    | `system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`            | Body text, UI, smaller headings |

- `h1`/`h2` use the serif display stack at `font-weight: 500` with `letter-spacing: -0.01em` — restrained, not heavy.
- Pair one **serif display** with one **sans body**; don't add a third typeface.
- Keep body line length in the comfortable ~60–75 character range.

## Motion

"Editorial motion" — subtle, fast, intentional. Movement is polish, never spectacle.

Motion tokens live in `src/index.css` (`:root`) alongside the color tokens:

| Token             | Value                            | Use                                            |
| ----------------- | -------------------------------- | ---------------------------------------------- |
| `--motion-fast`   | `200ms`                          | Micro-interactions (link underline, hamburger) |
| `--motion-base`   | `320ms`                          | Reveals, hero entrance, route cross-fade       |
| `--ease-out`      | `cubic-bezier(0.22, 1, 0.36, 1)` | The one easing curve — ease-out, **no bounce** |
| `--reveal-offset` | `12px`                           | How far elements rise into place               |
| `--stagger-step`  | `80ms`                           | Delay between staggered items                  |

- Keep durations in the **~200–400ms** range and always use `--ease-out`. Never overshoot/bounce.
- Reusable pieces: the `.reveal` / `.entrance` utility classes, the `useReveal` hook (`src/lib/useReveal.ts`), and the `Reveal` wrapper (`src/components/Reveal.tsx`). Route cross-fades use React Router's `viewTransition` prop + the native View Transitions API (no library).
- Motion remains enabled by default. Do not gate site motion behind `prefers-reduced-motion`; Martin's kinetic-object brand should keep its sense of movement even when the OS reports reduced motion.
- Essential feedback (the contact-form spinner, focus rings) is **not** gated and must keep working.

## Contrast & accessibility

- Body text (`--ink` on `--paper`) must stay readable — keep contrast at WCAG 4.5:1 or better. `--ink-muted` is for secondary text only, never long-form body copy on `--paper` without checking contrast.
- Keep animation subtle and readable even when `prefers-reduced-motion: reduce` is reported.
- Keep interactive elements keyboard-accessible with a visible focus state.

## Do / Don't

**Do**

- Use the tokens above for every color and font decision.
- Keep generous white space and a calm vertical rhythm.
- Use real SVG icons (not emoji) sized consistently.
- Reuse the existing `Layout`, `Header`, `Footer`, `Card`, `BookingCTA` patterns.

**Don't** (the "AI slop" tells to avoid)

- Purple/blue gradients, glassmorphism by default, gradient text.
- Pure black/gray or cool slate tones that fight the warm palette.
- Nested cards (a card inside a card inside a card) — flatten instead.
- Bouncy/elastic easing — keep motion subtle and intentional.
- Reflexive "01. / 02. / 03." section numbering without a reason.

## Related

- `/design-vocab` — explains any term above in plain language.
- `/frontend-design`, `/ui-ux-pro-max`, `/21st-components` — building UI; have them honor this guide.
