## MODIFIED Requirements

### Requirement: Meta tags update correctly on client-side navigation

When the user navigates between routes without a full page reload, all meta tags SHALL update to reflect the new route's values. The title and OG tags SHALL be set as part of the route's first render (synchronously, before paint) rather than in a delayed effect, so the static `index.html` title is never visible to a user or unfurler.

#### Scenario: Title and description update on navigation

- **WHEN** a visitor clicks the nav link to `/events` from `/`
- **THEN** `document.title` and `<meta name="description">` update to the Events page values within one render cycle

#### Scenario: No stale OG tags after navigation

- **WHEN** a visitor navigates from `/projects` to `/contact`
- **THEN** `<meta property="og:title">` reflects the Contact page value, not the Projects page value

#### Scenario: Title is set during the first render

- **WHEN** a route first loads
- **THEN** `document.title` matches the route's title on the first render pass
- **AND** the static `index.html` title is not briefly visible to the user or to a JS-enabled unfurler
