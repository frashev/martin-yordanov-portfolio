## 1. Content model

- [x] 1.1 Add `StatItem` type to `src/content/types.ts` (`value` and `label` both required strings)
- [x] 1.2 Create `src/content/stats.ts` with 4 placeholder entries marked `// PLACEHOLDER` (years experience, countries performed in, students trained, productions)

## 2. Component

- [x] 2.1 Create `src/components/StatsBand.tsx` — full-width strip rendering all items from `stats`
- [x] 2.2 Each stat item: large accented `value` + small muted `label`, centered
- [x] 2.3 Wrap the whole band in `<Reveal />` for scroll-reveal (reduced-motion-safe)
- [x] 2.4 Apply responsive grid: 2 columns on mobile, 4 columns (`sm:grid-cols-4`) on tablet+

## 3. Page integration

- [x] 3.1 Import and render `<StatsBand />` in `src/pages/Home.tsx` below the testimonials section
- [x] 3.2 Import and render `<StatsBand />` in `src/pages/About.tsx` below the bio paragraphs

## 4. Verification

- [x] 4.1 Run `npm run build` — zero TypeScript errors
- [x] 4.2 Run `npm run lint` — zero ESLint warnings
- [x] 4.3 Run `npm run dev`, open `/` — confirm stats band appears below testimonials
- [x] 4.4 Open `/about` — confirm stats band appears below bio text
- [x] 4.5 Resize to mobile — confirm 2-column grid, no overflow
- [x] 4.6 Check browser console — no errors or warnings

## 5. Cleanup

- [x] 5.1 Run `openspec validate --changes` — confirm no spec parse errors
