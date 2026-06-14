---
name: 21st-components
description: Browse and integrate UI components from 21st.dev into this React/Tailwind project. Use this skill whenever the user wants to add a new section, component, or UI element — a hero, navigation bar, button, card, pricing section, testimonial block, footer, modal, form, or anything visual. Trigger even when the user just says "I want a [thing]" without mentioning 21st.dev — always check here first for real examples before writing from scratch.
---

# 21st.dev Components

21st.dev is a community library of copy-paste UI components. Each component comes with live previews and source code. Use it to find a starting point, then adapt to this project.

## How to use

1. Browse the relevant category below to find a component that fits
2. Copy its source code from the 21st.dev page
3. Adapt it to the project stack (see notes below)

## Component categories

### Marketing / page sections

| What you need            | Link                                                      |
| ------------------------ | --------------------------------------------------------- |
| Hero / above-the-fold    | https://21st.dev/community/components/s/hero              |
| Navigation / header      | https://21st.dev/community/components/s/navbar-navigation |
| Footer                   | https://21st.dev/community/components/s/footer            |
| Call to action           | https://21st.dev/community/components/s/call-to-action    |
| Features section         | https://21st.dev/community/components/s/features          |
| Pricing section          | https://21st.dev/community/components/s/pricing-section   |
| Testimonials             | https://21st.dev/community/components/s/testimonials      |
| Backgrounds / decorative | https://21st.dev/community/components/s/background        |
| Text animations          | https://21st.dev/community/components/s/text              |

### UI components

| What you need           | Link                                                   |
| ----------------------- | ------------------------------------------------------ |
| Buttons                 | https://21st.dev/community/components/s/button         |
| Cards                   | https://21st.dev/community/components/s/card           |
| Inputs / text fields    | https://21st.dev/community/components/s/input          |
| Modals / dialogs        | https://21st.dev/community/components/s/modal-dialog   |
| Tabs                    | https://21st.dev/community/components/s/tabs           |
| Accordions              | https://21st.dev/community/components/s/accordion      |
| Dropdowns / selects     | https://21st.dev/community/components/s/select         |
| Tooltips                | https://21st.dev/community/components/s/tooltip        |
| Sliders                 | https://21st.dev/community/components/s/slider         |
| Tables                  | https://21st.dev/community/components/s/table          |
| Badges                  | https://21st.dev/community/components/s/badge          |
| Carousels               | https://21st.dev/community/components/s/carousel       |
| Loaders / spinners      | https://21st.dev/community/components/s/spinner-loader |
| Notifications / toasts  | https://21st.dev/community/components/s/notification   |
| Avatars                 | https://21st.dev/community/components/s/avatar         |
| Sign-in / sign-up forms | https://21st.dev/community/components/s/sign-in        |

Browse everything: https://21st.dev/community/components

## Teaching as you go

When you suggest a component, name its design role and connect it to OpenSpec language so the user builds vocabulary for future briefs:

| Component type                          | Design term to use                      | OpenSpec spec domain                               |
| --------------------------------------- | --------------------------------------- | -------------------------------------------------- |
| Hero, footer, pricing, testimonials     | **marketing block** or **page section** | `site-pages`                                       |
| Button, card, modal, form, tabs         | **UI component**                        | `visual-theme` (styling) / `site-pages` (behavior) |
| Heading, label, placeholder, error text | **microcopy** or **UX writing**         | `content-model`                                    |
| Navigation bar, sidebar                 | **navigation component**                | `site-pages` + `visual-theme`                      |

Say it naturally: _"This is a hero section — in OpenSpec terms, it lives in the `site-pages` spec domain."_

## Adapting to this project

This site uses **React 19 + React Router 7 + Tailwind CSS v4 + TypeScript**, built with Vite and deployed to Cloudflare Workers.

When adapting a 21st.dev component:

- **Tailwind v4**: No `tailwind.config.js`. Utilities work the same but config-based customizations (custom colors, fonts) use CSS variables in `src/index.css` instead. The project already defines `--paper`, `--ink`, `--accent`, `--font-display`, `--font-body` — use those rather than hardcoding colors.
- **No new dependencies**: Reach for what's already installed (React 19, Tailwind v4, React Router 7) before adding a package. If a 21st.dev component requires shadcn/ui or Radix, check if a simpler version can be built without it.
- **Content**: All copy lives in `src/content/` as TypeScript objects. Drop static text from the component; wire it up to the content files instead.
- **Routing**: Internal links use `<Link>` from React Router, not `<a>`.
- **Accessibility**: Keep any `aria-*` attributes and keyboard handling from the original.
