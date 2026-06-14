# UX/UI Improvements Research — 2026

Research conducted 2026-06-09 via three parallel agents covering:

- Modern dancer/performer portfolio sites (patterns from waynemcgregor.com, hofesh.co.uk, racheleperla.com, sloanrousosdance.com and others)
- 2026 web design trends (sources: Awwwards, Figma, Framer, Muzli, real-usage data)
- Modern web engineering features and technical improvements for React SPAs

The OpenSpec change tracking the implementation is `openspec/changes/ux-modernisation/`.

---

## Key Findings

### What top performer sites have in common

1. **Hero video or full-width performance image** opens the page — visitors decide within 3 seconds. A static text heading alone doesn't sell a performer.
2. **Scroll-triggered animations** are the baseline, not a luxury — content revealing as you scroll feels choreographed and alive.
3. **Performance reel first** on the Videos page — a compiled 2–5 minute highlight at the top, archive below. Clients book after watching the reel, not after reading text.
4. **Event calendar is prominent** — upcoming performances visible from the homepage or clearly in the nav, not buried. Sites without this lose bookings to competitors who make it easy.
5. **Micro-interactions on every action** — hover states, form feedback, button press confirmation. Visitors notice when nothing responds.
6. **Dedicated booking flow** — not just a contact form. Either a Calendly embed or a multi-step form that guides the visitor step-by-step.
7. **Video testimonials** outperform text by 72% for trust. Text cards are a starting point, not the goal.

### 2026 trends that are actively gaining (not fading)

- **Scroll-driven animations** — native CSS (`animation-timeline: scroll()`) or Intersection Observer + CSS classes. GPU-accelerated, no JS jank.
- **View Transitions API** — smooth cross-fade / slide page transitions, now natively supported in Chrome 126+, Edge 126+, Safari 18+. React Router 7 supports it with a single `viewTransition` prop on `<Link>`.
- **Kinetic variable-weight typography** — headings that shift weight on scroll. Requires variable font files but no JS library.
- **Bento grid layouts** — asymmetric CSS Grid (mix of 1×1, 1×2, 2×2 cards) for galleries and project showcases.
- **Strategic floating CTAs** — booking button that appears after scrolling ~300px, stays visible. Converts 25% better than a single bottom placement.
- **Cookie-free analytics** — Plausible or Fathom: one script tag, no consent banner, GDPR-compliant.

### Trends that are fading out (don't add these)

- Generic fade-in-everything on page load (overused, boring)
- Pure white (#FFFFFF) backgrounds — feels dated and harsh
- Autoplay video that isn't muted
- Sticky navbars taking >20% of the viewport on mobile
- Flash-heavy 3D for its own sake (performance killer)

### Technical opportunities (zero or one dependency)

| Feature                      | Dependency | Notes                                       |
| ---------------------------- | ---------- | ------------------------------------------- |
| View Transitions             | **Zero**   | React Router 7 `viewTransition` prop        |
| Scroll-reveal animations     | **Zero**   | Intersection Observer + CSS classes         |
| CSS scroll-driven animations | **Zero**   | Native CSS, ~85% browser support            |
| Hero image preload           | **Zero**   | One `<link rel="preload">` in index.html    |
| Floating booking CTA         | **Zero**   | CSS position: fixed + scroll listener       |
| Supabase preconnect hint     | **Zero**   | One `<link rel="preconnect">` in index.html |
| Multi-step contact form      | **One**    | react-hook-form (~25KB)                     |
| Testimonial carousel         | **One**    | embla-carousel or keen-slider               |
| Calendly booking embed       | **One**    | External script (Calendly free tier)        |
| Instagram feed embed         | **One**    | react-ig-embed or Behold component          |
| Cookie-free analytics        | **One**    | Fathom or Plausible embed script            |

---

## Prioritized Implementation Plan

### Priority 1 — No new dependencies, no content needed (implement now)

**1. View Transitions between pages**
Add `viewTransition` to every `<Link>` in [Header.tsx](../src/components/Header.tsx). The browser handles smooth cross-fade page transitions natively. One prop per link.
Size: Tiny.

**2. Scroll-reveal animations on section entry**
A small `useReveal` hook using `IntersectionObserver` + a `.reveal` CSS class. Wrap gallery cards, testimonial cards, stats items, and section headings. GPU-accelerated, zero library.
Size: Small.

**3. Hero image preload**
Add `<link rel="preload" as="image" href="/hero-image.jpg">` to `index.html`. Fixes LCP (Largest Contentful Paint — how fast the biggest visible thing loads). One line.
Size: Tiny.

**4. Cookie-free analytics (Fathom or Plausible)**
No analytics running on the site right now — no data on what visitors do, which pages they visit, or whether the contact form converts. A single script tag fixes this, no consent banner needed.
Size: Tiny.

**5. Floating/sticky booking CTA**
A fixed-position "Book Nikoleta" button that slides in after the user scrolls past the first section. Disappears on the /contact page (same logic as the existing BookingCTA suppression).
Size: Small.

**6. Bento grid on gallery/projects**
Asymmetric CSS Grid — some cards span two columns, creating visual rhythm. Pure CSS, no layout restructuring needed.
Size: Small.

**7. Supabase preconnect hint**
`<link rel="preconnect" href="https://[project].supabase.co">` in index.html. Shaves 100–200ms off the cold connection when the contact form loads. One line.
Size: Tiny.

### Priority 2 — Needs a decision on one new dependency

**8. Multi-step contact form**
Current form: single step. Multi-step (Name+Email → Inquiry type → Message → Submit) converts 86% better on mobile. Needs `react-hook-form`. Still uses the same Supabase backend.

**9. Testimonial carousel**
Currently static cards. A carousel (Embla or Keen Slider, ~15KB) lets more testimonials fit without the page becoming too long.

### Priority 3 — Needs content from Nikoleta

**10. Video hero** _(code already ready — just needs an MP4)_
`heroVideoSrc` field in [profile.ts](../src/content/profile.ts) is commented out. When Nikoleta provides a performance video, this is a one-line uncomment. Single biggest visual upgrade possible.

**11. Performance reel on Videos page**
Videos page exists but no compiled highlight reel at top. Nikoleta needs to provide or approve a 2–5 min best-of clip.

**12. Calendly booking embed on Contact page**
Requires Nikoleta to create a Calendly account and set her availability. Then one embed snippet on the Contact page.

**13. Instagram live feed**
All social links are currently `#` placeholders. Once real Instagram URL is provided, a live grid on the homepage bottom keeps content fresh without manual updates.

---

## What the Site Already Does Well (Don't Touch)

- **3-way theme toggle** (Light / Dark / System) — genuinely ahead of most performer sites
- **Accessibility** — skip link, focus rings, landmark labels, contrast ratios, `prefers-reduced-motion` respected
- **SEO** — canonical, JSON-LD Person schema, og:image PNG, robots.txt, sitemap.xml all in place
- **Architecture** — content layer in `src/content/`, single Supabase backend, no unnecessary complexity
- **Dark mode** — token-driven (no hardcoded gradients after the June 9 fix), full 3-way system

---

## Sources (selected)

- waynemcgregor.com, hofesh.co.uk, racheleperla.com, sloanrousosdance.com, joanachicau.com
- Awwwards portfolio winners 2026 (awwwards.com/websites/portfolio/)
- Figma: Top Web Design Trends for 2026 (figma.com/resource-library/web-design-trends/)
- MDN View Transition API (developer.mozilla.org/en-US/docs/Web/API/View_Transition_API)
- React Labs blog: View Transitions, Activity, and more (react.dev/blog/2025/04/23/)
- MDN CSS scroll-driven animations
- Muzli: 100 Best Designer Portfolio Websites 2026
- Fathom Analytics (usefathom.com), Plausible (plausible.io)
- WiserNotify: Social proof statistics 2026
- TheeDigital: Top 20 Web Design Trends 2026
