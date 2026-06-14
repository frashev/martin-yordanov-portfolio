# Tasks: UX Modernisation

_See proposal.md for the full rationale. See `docs/ux-improvements-research-2026.md` for the research behind these decisions._

Progress key: `- [ ]` = todo · `- [x]` = done

---

## Phase 1 — Zero-dependency visual polish

### 1.1 View Transitions

- [x] 1.1.1 Add `viewTransition` prop to every `<Link>` in `src/components/Header.tsx`
- [x] 1.1.2 Verify smooth cross-fade in browser between at least 3 page pairs (Home→About, Home→Gallery, Home→Contact)
- [x] 1.1.3 Confirm no visual regression on Safari (fallback is instant navigation — acceptable)

### 1.2 Scroll-reveal hook

- [x] 1.2.1 Create `src/lib/useReveal.ts` — `IntersectionObserver`, returns a `ref` to attach to the container
- [x] 1.2.2 Add `.reveal` and `.reveal.revealed` CSS classes to `src/index.css` — translateY 20px→0, transition 0.5s ease; motion remains enabled even when `prefers-reduced-motion: reduce` is reported
- [x] 1.2.3 Apply `useReveal` to gallery cards (`GalleryGrid`)
- [x] 1.2.4 Apply to testimonial cards (`TestimonialsSection`)
- [x] 1.2.5 Apply to stats items (`StatsSection`)
- [x] 1.2.6 Apply to project cards (`Projects` page)
- [x] 1.2.7 Apply to workshop cards (`Workshops` page)
- [x] 1.2.8 Apply to section headings on Home page
- [x] 1.2.9 Write Vitest unit test for `useReveal.ts` — verify observer is disconnected on unmount

### 1.3 Performance hints in index.html

- [x] 1.3.1 Add `<link rel="preload" as="image" href="/hero-image.jpg">` to `index.html`
- [x] 1.3.2 Add `<link rel="preconnect" href="https://[supabase-project].supabase.co">` to `index.html` (use the host from `VITE_SUPABASE_URL` — do not hardcode the secret value, derive the host from the env var comment or ask the owner)

### 1.4 Floating booking CTA

- [x] 1.4.1 Create `src/components/FloatingCTA.tsx` — fixed bottom-right button, hidden until scroll ≥ 300px, hidden on `/contact`
- [x] 1.4.2 Add to `src/components/Layout.tsx` alongside the existing `<BookingCTA>`
- [x] 1.4.3 Style: matches `--accent` token, accessible focus ring, `aria-label="Book Nikoleta"`
- [x] 1.4.4 Verify it doesn't overlap the cookie/toast area or overlap the main CTA on short pages

### 1.5 Bento grid on Gallery

- [x] 1.5.1 Update gallery grid CSS to CSS Grid with `auto` column spanning — every 5th card spans 2 columns on ≥ md breakpoint
- [x] 1.5.2 Verify no CLS (Cumulative Layout Shift) introduced — images must have explicit dimensions

## Phase 2 — One new dependency (implement after owner approves)

### 2.1 Multi-step contact form

- [x] 2.1.1 **Decision checkpoint** — owner approves adding `react-hook-form`
- [x] 2.1.2 Install `react-hook-form`
- [x] 2.1.3 Refactor `src/pages/Contact.tsx` into a 3-step form: Step 1 (Name, Email) → Step 2 (Inquiry type: Performance / Workshop / Private lesson / Other) → Step 3 (Message, Submit)
- [x] 2.1.4 Add inline validation (real-time, not on-submit)
- [x] 2.1.5 Add visual step indicator (1 / 2 / 3 dots or progress bar)
- [x] 2.1.6 Verify same Supabase `contact_messages` table receives submissions unchanged
- [x] 2.1.7 Update `Contact.test.tsx` for new step flow

### 2.2 Testimonial carousel

- [x] 2.2.1 **Decision checkpoint** — owner approves adding `embla-carousel-react`
- [x] 2.2.2 Install `embla-carousel-react`
- [x] 2.2.3 Replace static testimonial card row with carousel
- [x] 2.2.4 Keyboard navigation: left/right arrows cycle cards
- [x] 2.2.5 `aria-live="polite"` on the active slide region
- [x] 2.2.6 Autoplay **pauses** when `prefers-reduced-motion: reduce` (manual buttons, dots, and arrow keys still work); progress indicator hidden — see Phase 4 (revised 2026-06-09 per owner decision)

---

## Phase 3 — Built with example content (replace before launch)

- [x] 3.1 **Video hero** — added placeholder `heroVideoSrc` in `src/content/profile.ts`, muted autoplay, poster image, and fallback image on video load failure
- [x] 3.2 **Performance reel** — added placeholder featured reel on Videos page above the archive grid
- [x] 3.3 **Calendly embed** — added inline placeholder booking embed on Contact page below the form
- [x] 3.4 **Instagram feed** — added lazy-loaded static social feed grid to Home page; replace with a real provider once a verified Instagram URL exists

---

## Phase 4 — Post-audit refinements (2026-06-09)

UX/UI + technical audit (Playwright walkthrough across light/dark, desktop/mobile) surfaced launch-safety and best-practice fixes:

- [x] 4.1 **Booking embed launch-safety** — the Phase 3 Calendly placeholder shipped a **live** iframe to a non-existent URL that returned a 404 and loaded third-party cookies. Replaced with a self-contained static placeholder card; `embedUrl` is now optional in `BookingEmbed` and only mounts an iframe when a verified URL exists. (`BookingEmbed.tsx`, `content/booking.ts`, `content/types.ts`)
- [x] 4.2 **Reduced-motion for autoplay** — added `src/lib/usePrefersReducedMotion.ts`; pause carousel autoplay + progress bar and fall back to the still hero poster under reduced motion (`TestimonialsSection.tsx`, `HeroMedia.tsx`). Reverses the earlier "always animate" rule per owner decision.
- [x] 4.3 **Hero hint waste** — replaced the global `<link rel="preload">` (downloaded on every route, console warning off-Home) with `fetchpriority="high"` + eager loading on the hero `<img>` only (`index.html`, `GalleryImage.tsx`, `HeroMedia.tsx`).
- [x] 4.4 **Bento tessellation** — the every-5th span left a trailing empty cell; first card now anchors a 2×2 block so the grid fills cleanly (`Gallery.tsx`).
- [x] 4.5 **Lightbox navigation** — added prev/next arrows, ←/→ keyboard nav, and an "n / total" position label, with the focus-trap updated to cycle the new controls (`Lightbox.tsx`, `Gallery.tsx`).
- [x] 4.6 **Embed privacy** — switched YouTube embeds to `youtube-nocookie.com` and removed the placeholder Rickroll video ID (`content/media.ts`).

---

## Verification

- [x] V.1 `npm run build` — clean (no TS errors, no lint errors)
- [x] V.2 `npm run test` — all existing tests pass + new useReveal test passes
- [x] V.3 `npm run dev` — scroll-reveals work on Home, Gallery, Testimonials; view transitions work between at least 3 pages; floating CTA appears after scrolling and disappears on /contact
- [ ] V.4 Lighthouse / PageSpeed Insights — LCP improved vs. baseline (hero preload should move it from ~3s to <2.5s). Attempted against deployed Workers URL on 2026-06-09; public PageSpeed API returned 429 Too Many Requests, and no local Lighthouse binary is installed.
- [x] V.5 `prefers-reduced-motion: reduce` — subtle motion stays (entrance, reveal, route cross-fade, link/hamburger micro-interactions, loading spinner); autoplay motion pauses (testimonial carousel + looping hero video). Verified via `npm run test:e2e` (13/13) on 2026-06-09

---

## Cleanup

- [x] C.1 Verified reveals in light + dark mode during the 2026-06-09 audit (Home/Gallery/Contact, desktop + mobile) — no elements looked wrong, none removed
- [ ] C.2 Archive this change: `openspec archive ux-modernisation`
- [x] C.3 Update `docs/project-memory.md` status section
