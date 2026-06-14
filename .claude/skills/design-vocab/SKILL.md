---
name: design-vocab
description: Design vocabulary coach and layout terminology guide, powered by Impeccable's design system. Use this skill when the user is trying to describe a visual idea but doesn't know the right words — vague requests like "make it look better", "add some spacing", "I want it to feel more professional", "not sure how to describe this layout". Also use it during /idea-brief when the user is describing frontend changes, to surface precise terminology they can use. Give vocabulary suggestions, explain terms, and help the user say exactly what they mean.
---

# Design Vocabulary Guide

Use this when the user is trying to describe a visual idea but doesn't have the words. Your job is two-fold:

1. **Translate** vague descriptions into precise design terms
2. **Teach** — explain what each term means in plain language so the user builds their vocabulary over time

Don't just rename things. If they say "add more space", find out _where_ and _why_, then name it correctly.

---

## Domain 1: Typography — how text looks and feels

| Term                                  | Plain meaning                                                                        | Example use                                                           |
| ------------------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| **Typographic scale / modular scale** | A set of font sizes that relate to each other mathematically (e.g. 12, 16, 24, 36px) | "I want a consistent typographic scale so headings feel proportional" |
| **Type hierarchy**                    | Visual difference between heading, subheading, body, caption                         | "The page lacks type hierarchy — h1 and h2 look too similar"          |
| **Font pairing**                      | Two fonts used together (display + body)                                             | "I want a serif display font paired with a clean sans body"           |
| **Line length / measure**             | How wide a line of text is — ideal is 60–80 characters                               | "The body text line length is too wide, it's hard to read"            |
| **Leading**                           | Space between lines of text                                                          | "Increase the leading on the paragraph — it feels cramped"            |
| **Tracking**                          | Letter spacing, especially in headings                                               | "Add tracking to the uppercase heading to breathe"                    |
| **Fluid typography**                  | Font size that scales smoothly with viewport width                                   | "Use fluid typography so headings resize on mobile naturally"         |
| **Display typeface**                  | A decorative or expressive font used only for headlines                              | "This site calls for a display typeface that feels artistic"          |

---

## Domain 2: Color — how color is used purposefully

| Term                     | Plain meaning                                                                                   | Example use                                                                 |
| ------------------------ | ----------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Tinted neutrals**      | Grays with a slight color cast (warm or cool) instead of pure gray                              | "Use tinted neutrals instead of pure #888888 — it'll feel more intentional" |
| **OKLCH**                | A modern color format that produces perceptually even color scales                              | "Define the palette in OKLCH for consistent lightness across hues"          |
| **Semantic color roles** | Names like `--color-surface`, `--color-text-muted`, `--color-accent` rather than raw hex values | "Assign semantic color roles so the palette is easy to swap"                |
| **Color temperature**    | Whether the overall palette feels warm (amber, cream) or cool (slate, blue)                     | "The design should lean warm — match the artist's visual identity"          |
| **Contrast ratio**       | How readable text is against its background (WCAG requires 4.5:1 for body text)                 | "That muted text fails contrast ratio — bump the lightness"                 |
| **Dark mode**            | A variant where backgrounds are dark and text is light                                          | "The site should support dark mode using the same semantic tokens"          |

---

## Domain 3: Spatial design — how space organizes the page

| Term                             | Plain meaning                                                           | Example use                                                             |
| -------------------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Spacing system**               | A defined set of spacing values (4, 8, 16, 24, 32px…) used consistently | "Use the spacing system — don't mix arbitrary pixel values"             |
| **Visual hierarchy**             | Which elements draw the eye first, second, third                        | "The CTA is buried — it should be higher in the visual hierarchy"       |
| **Rhythm**                       | Consistent spacing patterns that give the page a predictable flow       | "The vertical rhythm is off — some sections have 40px gap, others 60px" |
| **White space / negative space** | Empty space used intentionally to give elements room                    | "Add more white space around the bio — it feels cluttered"              |
| **Density**                      | How much information is packed into a given area                        | "Lower the density on mobile — stack elements instead of cramming them" |
| **Grid system**                  | Invisible columns that align elements horizontally                      | "Align the project cards to a 12-column grid"                           |
| **Z-index scale**                | A defined stacking order for overlapping elements                       | "The modal is hiding behind the header — check the z-index scale"       |

---

## Domain 4: Motion — how things move

| Term                  | Plain meaning                                                           | Example use                                                            |
| --------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| **Easing curve**      | How animation speeds up or slows down (ease-in, ease-out, cubic-bezier) | "The button hover feels abrupt — use an ease-out curve"                |
| **Staggering**        | Animating a list of items one-by-one with a small delay between each    | "Stagger the project cards on scroll so they don't all appear at once" |
| **Reduced motion**    | Respecting the OS setting to minimize animation for users who prefer it | "Wrap animations in `prefers-reduced-motion` so it's accessible"       |
| **Transition intent** | Only animate things that communicate meaning, not for decoration        | "Don't animate the background on every hover — no transition intent"   |

---

## Domain 5: Interaction — how the interface responds

| Term                | Plain meaning                                                             | Example use                                                              |
| ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| **Affordance**      | Visual cues that tell the user something is clickable/interactive         | "That button has no affordance — it looks like a label"                  |
| **Focus state**     | How an element looks when selected via keyboard (Tab key)                 | "The contact form inputs are missing a visible focus state"              |
| **Loading pattern** | How the UI behaves while waiting for data (spinner, skeleton, optimistic) | "Use a skeleton loader instead of a spinner — it reduces perceived wait" |
| **Empty state**     | What the user sees when a list or section has no content                  | "Add an empty state to the events list if there are no upcoming shows"   |
| **Optimistic UI**   | Showing the success state immediately before the server confirms it       | "The contact form could use optimistic UI to feel faster"                |

---

## Domain 6: Layout structure — how the page is built

| Term                       | Plain meaning                                                               | Example use                                                                     |
| -------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **Above the fold**         | What's visible before the user scrolls                                      | "The artist name and tagline must be above the fold"                            |
| **Hero section**           | The large first section of a page                                           | "Build a full-width hero section with the artist name and a background image"   |
| **Sticky / fixed header**  | A navigation bar that stays visible as the user scrolls                     | "The nav should be sticky so users can always reach the menu"                   |
| **Bento grid**             | A mosaic-style grid of unequal-size content blocks                          | "Use a bento grid for the project thumbnails instead of uniform cards"          |
| **Responsive breakpoints** | Screen widths where the layout changes (mobile / tablet / desktop)          | "Test at the 768px breakpoint — the two-column layout breaks"                   |
| **Container width**        | The max width of the content area inside the viewport                       | "Set a container width of 1200px so the layout doesn't stretch on wide screens" |
| **Fluid layout**           | A layout that stretches/shrinks smoothly rather than jumping at breakpoints | "Use a fluid layout for the bio section rather than fixed breakpoints"          |

---

## Domain 7: UX writing — the words in the interface

| Term                       | Plain meaning                                                             | Example use                                                                |
| -------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **Microcopy**              | Small bits of text: button labels, tooltips, placeholders, error messages | "The form microcopy is too technical — rewrite for a general audience"     |
| **CTA (call to action)**   | A button or link prompting the user to do something                       | "The booking CTA should be the most prominent element on the page"         |
| **Progressive disclosure** | Showing only what's needed at first, revealing more on demand             | "Use progressive disclosure on the bio — show a summary, expand on click"  |
| **Error message**          | Text that explains what went wrong and how to fix it                      | "The error message just says 'failed' — be specific about what to do next" |

---

## Anti-patterns to name and avoid

These are design choices that immediately make a site look generic or dated. Use these terms when you spot them:

- **AI slop** — the recognizable look of default AI-generated UI: Inter font, purple gradient, nested card shadows
- **Gradient text** — text with a gradient fill; overused, rarely adds value
- **Glassmorphism as default** — frosted/blurred card backgrounds; use only with clear purpose
- **Side-stripe borders** — a colored left border on a card used as decoration without semantic meaning
- **Bounce / elastic easing** — springy animation that feels dated and playful in the wrong context
- **Pure black / pure gray** — `#000000` or `#808080` with no tint; always prefer tinted neutrals
- **Nested cards** — a card inside a card inside a card; flatten the hierarchy instead
- **Reflexive section numbers** — "01. About / 02. Work / 03. Contact" without a reason for the numbering

---

## Connecting vocabulary to OpenSpec

Every design term maps to a spec domain — knowing this lets you describe future changes precisely in `/idea-brief` or `/opsx:propose`:

| Design area                                 | OpenSpec spec domain | Plain meaning                              |
| ------------------------------------------- | -------------------- | ------------------------------------------ |
| Typography, color palette, spacing, motion  | `visual-theme`       | How the whole site looks and feels         |
| Page layout, sections, responsive behavior  | `site-pages`         | What each page shows and how it's arranged |
| Headings, body copy, labels, error messages | `content-model`      | The words and data shown across the site   |
| Contact form, submission handling           | `contact-backend`    | The only backend feature on this site      |

**Example:** If you're asking about _leading_ and _typographic scale_, that's a `visual-theme` change. If you're asking about moving a section above the fold, that's a `site-pages` change.

## How to use this vocabulary

When describing what you want, instead of:

> "Make the text area look better and add some space"

Try:

> "Increase the leading on the body text, add more vertical rhythm between sections, and tighten the line length to 70 characters"

When you're not sure of the term, describe the feeling and I'll translate:

> "It feels too heavy / airy / cramped / chaotic / generic / corporate"

I'll map that to specific terms and suggest what to change.
