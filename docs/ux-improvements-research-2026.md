# UX/UI Improvements Research - 2026

Research conducted 2026-06-09 and retargeted for the Martin Yordanov portfolio.

The current site is a portfolio for kinetic furniture, drawing machines, and
functional art objects. Any future UX work should support inspection of real
project material, clear inquiry paths, and careful placeholder handling.

## Key Findings

### What strong maker portfolios have in common

1. **Large project media first** - visitors should immediately see the object,
   not only read a text claim.
2. **Motion that supports the subject** - scroll reveals and page transitions
   can echo the kinetic nature of the work without becoming spectacle.
3. **Process visibility** - mechanism details, materials, and build stages help
   visitors understand how the objects are made.
4. **Direct inquiry flow** - the contact form should guide commissions,
   collaborations, documentation requests, and repair or technical questions.
5. **Verified proof only** - testimonials, specs, dates, and client names must
   wait for Martin's confirmed copy.

### 2026 trends that fit this site

- **View Transitions API** - smooth cross-fade page transitions via React Router
  `viewTransition`.
- **Scroll-reveal animations** - Intersection Observer plus CSS classes.
- **Bento gallery layouts** - asymmetric CSS Grid for project imagery.
- **Cookie-free analytics** - Plausible or Fathom when the owner wants usage
  data.
- **Project video slots** - add only after Martin provides approved clips.

### Avoid

- Generic fade-in-everything on page load.
- Pure white backgrounds that fight the warm paper-and-ink system.
- Flash-heavy 3D for its own sake.
- Unverified claims about dates, clients, dimensions, or availability.

## Priority Ideas

### Already implemented or represented

- View transitions between routes.
- Scroll-reveal animation utilities.
- Floating inquiry CTA suppressed on `/contact`.
- Multi-step contact form using the existing Supabase-ready contact path.
- Bento-style gallery rendering.

### Needs content from Martin

- Approved project video clips for a future video section.
- Real biography and process language.
- Verified project specifications.
- Real testimonials with permission to publish.
- Real contact email, social links, and domain.

## Sources To Refresh Before New UX Work

- Current app routes in `src/App.tsx`.
- Current content in `src/content/`.
- Visual identity in `docs/reference/style-guide.md`.
- Active behavior contracts in `openspec/specs/`.
