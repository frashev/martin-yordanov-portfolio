# Content to replace before launch

**What this is:** every piece of the website that is currently **placeholder** (fake demo content) and must be swapped for Nikoleta's **real, verified** material before the site goes public.

**Why it exists:** right now these reminders are scattered as small comments inside ~12 code files, so they're easy to miss. This is the one place that lists them all.

**Hard rule:** never invent biography, dates, venues, awards, festivals, numbers, or quotes. If Nikoleta hasn't confirmed it, it stays placeholder. (This rule is also written into the code at `src/content/types.ts`.)

**How to read each item:** ☐ checkbox · _plain description_ · **From whom** (Nikoleta = she provides it · Owner = you set it once you have it) · `file where it lives`.

---

## 1. Photos & video · _the most visible placeholders_

- [ ] **Hero video** — the big moving header on the Home page is currently a stock clip of a flower (MDN sample), **not** Nikoleta. _From Nikoleta:_ one short performance/showreel clip (`.mp4`). _Owner:_ set `heroVideoSrc` in `src/content/profile.ts`. If there's no video yet, delete that line and the page uses the still photo instead.
- [ ] **Hero photo (poster)** — `public/hero-image.jpg` is a placeholder image (shown while the video loads, and on phones / reduced-motion). _From Nikoleta:_ one strong vertical portrait. _Owner:_ replace the file `public/hero-image.jpg` (keep the same name).
- [ ] **Gallery — 6 photos** — all are random stock images from a placeholder service (`picsum.photos`). _From Nikoleta:_ 6+ real photos with a short caption each. _Owner:_ edit the `gallery` list in `src/content/media.ts`.
- [ ] **Videos page — 3 videos + 1 featured reel** — currently point to unrelated YouTube clips. _From Nikoleta:_ real YouTube links + titles/descriptions. _Owner:_ edit `videos` and `performanceReel` in `src/content/media.ts`.
- [ ] **Instagram feed (Home "Studio Notes") — 4 posts** — fake placeholder tiles. _From Nikoleta:_ her real Instagram handle. _Owner:_ either swap the images in `src/content/socialFeed.ts`, or connect a real Instagram feed provider later.
- [ ] **Share image (Open Graph)** — `public/og-default.png` is the picture shown when the site is shared on social media / messaging. _From Nikoleta:_ a branded image (ideally 1200×630). _Owner:_ replace `public/og-default.png`.
- [ ] **Favicon** — `public/favicon.svg` is a generic icon (the little logo in the browser tab). _Owner:_ replace with a real logo/monogram when available.

## 2. Words & copy · _the writing_

- [ ] **Biography** — the About-page bio (3 paragraphs) is generic placeholder text. _From Nikoleta:_ her real story, training, and approach. _Owner:_ edit `bioParagraphs` (and `intro`, `tagline`, `role`) in `src/content/profile.ts`.
- [ ] **Projects — 4 entries** ("Fuego", "Raíces", etc.) are invented. _From Nikoleta:_ real project titles + descriptions. _Owner:_ `src/content/projects.ts`.
- [ ] **Workshops — 4 entries** are example offerings. _From Nikoleta:_ her real classes, formats, and durations. _Owner:_ `src/content/workshops.ts`.
- [ ] **Events — 4 entries** use made-up titles, **fake dates** (2026), and `example.com` ticket links. _From Nikoleta:_ real confirmed events only (or leave the list empty until there are some). _Owner:_ `src/content/events.ts`.
- [ ] **Page descriptions (SEO)** — the search-engine summaries are fine as a base but generic. _Owner (optional):_ refine in `src/content/seo.ts` once the real bio exists.

## 3. Numbers & quotes · _trust signals — easy to overlook, must be true_

- [ ] **Stats band — 4 numbers** ("15+ years", "20+ countries", "500+ students", "30+ shows") are **invented**. _From Nikoleta:_ real figures (or remove the ones she can't back up). _Owner:_ `src/content/stats.ts`.
- [ ] **Testimonials — 3 quotes** are written by us, attributed to fake people ("A. Marinova", "Cultural Centre Director"). _From Nikoleta:_ real quotes with real names + permission to publish. _Owner:_ `src/content/testimonials.ts`.

## 4. Links & booking · _things that currently go nowhere_

- [ ] **Social links — 4** (Instagram, Facebook, YouTube, TikTok) all currently link to `#` (nowhere). _From Nikoleta:_ her real profile URLs. _Owner:_ `social` list in `src/content/profile.ts`.
- [ ] **Contact email** — currently `hello@nikoletakaito.com` (placeholder). _From Nikoleta:_ the real inbox. _Owner:_ `contactEmail` in `src/content/profile.ts`.
- [ ] **Booking calendar** — the Contact page shows a "Live scheduling coming soon" card (safe placeholder; no live calendar yet). _From Nikoleta:_ a Calendly (or similar) scheduling link, once she sets up an account. _Owner:_ set `embedUrl` in `src/content/booking.ts` and the real calendar appears automatically.

## 5. Domain & launch settings · _Owner / technical, do at go-live_

- [ ] **Real domain** — the site is currently live only at `https://nikoleta-kaito.frashev.workers.dev`, but the SEO/sitemap files point to `https://nikoleta-kaito.com` (not yet connected). _Owner:_ when the real domain is ready, update it in **three** places: `siteUrl` in `src/content/seo.ts`, `public/robots.txt`, and `public/sitemap.xml`.
- [ ] **Supabase keys** — the contact form needs the live Supabase project keys baked in at build time (`.env.local`). Changing them requires a rebuild + redeploy. _Owner:_ confirm the correct values before launch.

---

### When everything above is done

Run a final check and redeploy:

```bash
npm run build      # confirms no errors
npm run test       # unit tests
npm run test:e2e   # browser tests
npm run deploy     # build + publish to Cloudflare
```

Then open the live site and click through every page to confirm the real content shows.

> Keeping it tidy: each time you replace an item, tick its box here. When the file has no unchecked boxes left, the site is content-ready for launch.
