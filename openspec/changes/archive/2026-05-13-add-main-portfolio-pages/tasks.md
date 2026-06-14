## 1. Theme tokens and base typography

- [x] 1.1 In `src/index.css`, define warm theme tokens (CSS custom properties) for: paper background, ink, muted ink, warm accent, soft border, card surface; and a `--font-display` serif stack and `--font-body` sans stack
- [x] 1.2 Apply the paper background and ink text to `body`; set `font-family` to `--font-body`
- [x] 1.3 Apply `--font-display` to `h1, h2` globally (or via a `.font-display` utility used in components)
- [x] 1.4 Confirm no external font is loaded (no `<link rel="stylesheet">` to a font host, no `@import url(...)` in CSS)

## 2. Shared primitives

- [x] 2.1 Create `src/components/Card.tsx` accepting `title?: string`, `meta?: string`, `children: ReactNode`, and rendering a card surface with warm border, padding, rounded corners, subtle hover transition
- [x] 2.2 Create `src/components/PlaceholderImage.tsx` accepting `aspect: "square" | "video"` and `caption?: string`, rendering a warm-toned tile with an inline SVG icon (camera or play) and the caption
- [x] 2.3 Create `src/components/BookingCTA.tsx` reading `profile.bookingCtaLabel` and rendering a centered banner section with a heading ("Let's work together" — placeholder), a short prompt, and a `<Link to="/contact">` primary button

## 3. Layout wiring

- [x] 3.1 Update `src/components/Layout.tsx` to import `useLocation` from `react-router` and render `<BookingCTA />` between `<Outlet />` and `<Footer />` when `pathname !== "/contact"`
- [x] 3.2 Apply theme classes (paper background, max-width container alignment) consistently in `Layout.tsx`, `Header.tsx`, and `Footer.tsx`

## 4. Hero refresh

- [x] 4.1 Update `src/pages/Home.tsx` to a two-column Hero at `md+` (text left, decorative inline-SVG monogram or geometric mark right) and single column below `md`
- [x] 4.2 Apply serif display heading to the name; warm accent to the tagline
- [x] 4.3 Add a secondary text link "Read about Nikoleta" → `/about` next to the primary CTA

## 5. About page refresh

- [x] 5.1 Constrain About body to `max-w-prose`; apply serif heading
- [x] 5.2 Apply a `first-letter:` drop-cap utility set to the first bio paragraph

## 6. Card-based domain pages

- [x] 6.1 Update `src/pages/Projects.tsx` to render each project via `<Card title={p.title}>` with `p.summary` as children; keep responsive grid
- [x] 6.2 Update `src/pages/Workshops.tsx` to render each workshop via `<Card title={w.title} meta={w.format}>` with `w.summary` as children
- [x] 6.3 Update `src/pages/Events.tsx` to render each event via `<Card title={e.title} meta={e.location}>` with `e.summary` as children
- [x] 6.4 Update `src/pages/Videos.tsx` to render each video via `<Card title={v.title}>`, placing `<PlaceholderImage aspect="video" />` above the summary

## 7. Gallery refresh

- [x] 7.1 Update `src/pages/Gallery.tsx` to render each item via `<PlaceholderImage aspect="square" caption={item.caption} />` in a 2/3/4-column responsive grid with warm tones and rounded corners

## 8. Contact page polish

- [x] 8.1 Apply the theme classes to `src/pages/Contact.tsx` (serif heading, warmer surface for the email panel); no `BookingCTA` is rendered here (already excluded via `Layout`)

## 9. Verification

- [x] 9.1 Run `npm run build` and confirm zero TypeScript and Vite errors
- [x] 9.2 Grep `src/pages/` for the `BookingCTA` component usage — should be zero (it is injected by `Layout`)
- [x] 9.3 Grep `src/pages/` for `aspect-square` or `aspect-video` placeholder boxes — should be zero outside `PlaceholderImage`
- [x] 9.4 Confirm by inspection that Projects, Workshops, Events, and Videos use the shared `Card` component (no ad-hoc `<li className="rounded-lg ...">` in those pages)
- [x] 9.5 Confirm no external font or image asset is referenced (search for `fonts.googleapis.com`, `@import url`, and any new file under `src/assets/`)
