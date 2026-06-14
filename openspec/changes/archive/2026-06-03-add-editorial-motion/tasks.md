## 1. Exploration

- [x] 1.1 Confirm React Router 7's recommended way to hook navigations for the View Transitions API (router-native API vs. wrapping the `Outlet`); note findings in `design.md` Open Questions.
- [x] 1.2 Decide page-level `Reveal` wrapper vs. `Card` self-reveal; record the choice in `design.md`.
- [x] 1.3 Re-read `docs/reference/style-guide.md` and pick concrete motion values (durations, ease-out curve, stagger step, reveal offset) within the ~200–400ms / no-bounce constraint.

## 2. Motion foundation (tokens + reduced-motion guard)

- [x] 2.1 Add motion tokens to `src/index.css` `:root` (e.g. `--motion-fast`, `--motion-base`, `--ease-out`, `--reveal-offset`, `--stagger-step`).
- [x] 2.2 Reduced-motion handling: gate all added motion behind `@media (prefers-reduced-motion: no-preference)` (refined from a universal guard, see design.md Decision 1) plus a targeted `reduce` guard for View Transitions pseudo-elements.
- [x] 2.3 Add reusable utility classes/keyframes for fade-rise reveal and the entrance animation, all referencing the tokens.
- [x] 2.4 Add a short "Motion" section to `docs/reference/style-guide.md` documenting the tokens, timing, no-bounce rule, and reduced-motion behavior.

## 3. Scroll-reveal helper

- [x] 3.1 Create `src/lib/useReveal.ts` — an `IntersectionObserver` hook returning a `ref` + `isRevealed`, that observes once then unobserves, and no-ops when `prefers-reduced-motion: reduce` matches.
- [x] 3.2 Ensure the baseline (un-revealed / no-JS) state renders content fully visible; the hidden pre-reveal state is applied only when motion is enabled.
- [x] 3.3 Add a thin `Reveal` wrapper component (if chosen in 1.2) with optional index-based stagger delay, capped for long lists.
- [x] 3.4 Apply reveal to the card lists on Projects, Workshops, Events, and Videos pages and to major below-fold sections (Gallery grid, BookingCTA).

## 4. Home hero staggered entrance

- [x] 4.1 Apply the entrance animation to the hero name, tagline, intro, and CTA row in `src/pages/Home.tsx` with sequential delays.
- [x] 4.2 Confirm CTAs are interactive as soon as visible and that the hero is fully visible immediately under reduced motion. (Opacity-only entrance keeps elements clickable; `.entrance` baseline is visible under reduced motion.)

## 5. Route cross-fade transition

- [x] 5.1 Wire navigations through `document.startViewTransition(...)` when supported, scoped to page content (exclude `Header`/`Footer`). (Via React Router's `viewTransition` prop on nav links; `Header`/`Footer` stay mounted and pixel-identical so they don't fade.)
- [x] 5.2 Add CSS for the cross-fade using the motion tokens.
- [x] 5.3 Implement the feature-detection fallback (instant swap, or keyed opacity fade) with no console errors on unsupported browsers. (React Router falls back to a plain navigation when `startViewTransition` is absent.)

## 6. Link underline micro-interaction

- [x] 6.1 Add a reusable underline treatment (a `::after` pseudo-element animating `scaleX` in the accent color) on `:hover` and `:focus-visible`, with no layout shift.
- [x] 6.2 Apply it to nav links in `src/components/Header.tsx` and relevant inline text links (Footer links, Home "Read about" link); preserve visible focus states.

## 7. Animated hamburger / close icon

- [x] 7.1 Replace the single `<span>` bar in `src/components/Header.tsx` with a proper multi-line hamburger icon (three styled spans).
- [x] 7.2 Animate the lines into an ✕ on open and back on close, tied to the existing `open` state.
- [x] 7.3 Preserve the accessible label, `aria-controls`, and `aria-expanded`; ensure icon state is correct (no tween) under reduced motion. (Transition is gated behind `no-preference`; `.is-open` transforms apply regardless.)

## 8. Verification

- [x] 8.1 `npm run lint` passes.
- [x] 8.2 `npm run build` passes (tsc + vite).
- [x] 8.3 `npm run test` passes (9 tests); added `useReveal.test.ts` and a Header hamburger/aria-expanded toggle test.
- [x] 8.4 Added `e2e/motion.spec.ts`: (a) mobile toggle opens/closes the menu and (b) under emulated reduced motion the hero opacity is `1` (no entrance animation). Both pass. NOTE: a pre-existing, unrelated smoke failure remains (`smoke.spec.ts` asserts `profile.contactEmail` is visible, but the Contact page never renders it — present in the initial commit, out of scope here).
- [x] 8.5 `npm run dev` + real browser (Playwright MCP): verified hero renders, warm palette intact, hamburger animates to ✕, mobile menu opens; browser console clean (0 errors, 0 warnings).
- [x] 8.6 Reduced-motion verified via the emulated-reduce e2e test (hero fully visible, opacity `1`, nothing stuck hidden); motion is gated at the source so reduced-motion users receive no animating styles.

## 9. Cleanup

- [x] 9.1 Confirmed no new runtime dependencies — `package.json`/`package-lock.json` unchanged in the diff.
- [x] 9.2 Confirmed the style-guide "Motion" section matches the shipped tokens (200ms / 320ms / cubic-bezier(0.22,1,0.36,1) / 12px / 80ms).
- [x] 9.3 `openspec validate add-editorial-motion --strict` → valid.
