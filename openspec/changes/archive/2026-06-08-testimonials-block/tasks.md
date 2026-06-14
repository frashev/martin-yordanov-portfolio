## 1. Content model

- [x] 1.1 Add `Testimonial` type to `src/content/types.ts` (`quote`, `author`, `role` required; `avatarSrc` optional)
- [x] 1.2 Create `src/content/testimonials.ts` with 3 placeholder entries (student, collaborator, event organiser) marked `// PLACEHOLDER`

## 2. Component

- [x] 2.1 Create `src/components/TestimonialsSection.tsx` accepting optional `limit?: number` prop
- [x] 2.2 Render each testimonial as a quote card: blockquote text, author name, role; skip `<img>` when `avatarSrc` is absent
- [x] 2.3 Wrap each card in `<Reveal index={i}>` for staggered scroll-reveal (reduced-motion-safe via existing Reveal component)
- [x] 2.4 Apply responsive grid: single column on mobile, 2–3 columns on md+ using Tailwind grid classes
- [x] 2.5 Apply `line-clamp-4` to the quote text when rendered in compact/home context (pass a `compact` boolean prop, default `false`)

## 3. Page integration

- [x] 3.1 Import and render `<TestimonialsSection limit={3} compact />` in `src/pages/Home.tsx` below the hero section
- [x] 3.2 Import and render `<TestimonialsSection />` in `src/pages/Workshops.tsx` below the workshops list

## 4. Verification

- [x] 4.1 Run `npm run build` — zero TypeScript errors
- [x] 4.2 Run `npm run lint` — zero ESLint warnings
- [x] 4.3 Run `npm run dev`, open `/` and confirm 3 testimonial cards render below the hero
- [x] 4.4 Open `/workshops` and confirm testimonials render below workshop cards with full (untruncated) quotes
- [x] 4.5 Resize to mobile width — confirm single-column stacked layout, no horizontal overflow
- [x] 4.6 Check browser console — no errors or warnings

## 5. Cleanup

- [x] 5.1 Run `openspec validate` — confirm no spec parse errors
