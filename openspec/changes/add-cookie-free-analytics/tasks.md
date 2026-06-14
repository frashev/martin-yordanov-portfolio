# Tasks: Add Cookie-Free Analytics

Progress key: `- [ ]` = todo · `- [x]` = done

## Decision

- [ ] 1.1 Owner chooses Fathom or Plausible.
- [ ] 1.2 Owner creates the analytics site/project and provides the required site identifier or domain.

## Implementation

- [ ] 2.1 Add the vendor script tag to `index.html` with `defer`.
- [ ] 2.2 Keep the script cookie-free and avoid adding any consent-banner code.

## Verification

- [ ] 3.1 `npm run build` passes.
- [ ] 3.2 Deploy the site.
- [ ] 3.3 Confirm at least one page load appears in the analytics dashboard.
