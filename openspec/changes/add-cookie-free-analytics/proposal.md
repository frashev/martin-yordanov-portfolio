# Change: Add Cookie-Free Analytics

## Why

The site currently has no traffic or conversion visibility. A lightweight,
cookie-free analytics service would show which pages visitors read, where
traffic comes from, and whether the contact page is helping visitors reach out.

This is split out from `ux-modernisation` because it requires an owner decision
and vendor signup before implementation.

## What Changes

- Add one deferred analytics script tag to `index.html` after the owner chooses
  Fathom or Plausible and provides the required site identifier/domain.
- Keep analytics cookie-free so no cookie consent banner is required.
- Verify the analytics dashboard receives at least one page load after deploy.

## Non-Goals

- No invasive tracking, heatmaps, session replay, ads pixels, or user-level
  profiling.
- No cookie consent banner unless the chosen vendor/configuration later requires
  cookies.
- No new backend or database tables.

## Impact

- **Routes affected:** All pages, through a global script in `index.html`.
- **Content layer:** No changes.
- **Supabase backend:** Unchanged.
- **New dependencies:** None in npm. External vendor script only.
