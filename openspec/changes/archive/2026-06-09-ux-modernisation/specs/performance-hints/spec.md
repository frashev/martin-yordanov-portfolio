## ADDED Requirements

### Requirement: Critical Connection And Hero Hints

The application SHALL declare lightweight performance hints for the
above-the-fold hero image and the configured Supabase project host. The hero
image hint SHALL be route-scoped to the page that renders it (so it is not
fetched on routes that never show it).

#### Scenario: Hero image is prioritised on its own route

- **WHEN** the Home page renders its hero image
- **THEN** the hero `<img>` carries `fetchpriority="high"` and eager loading
- **AND** no global `<link rel="preload" as="image">` for the hero exists in `index.html` (which would fetch it on every route)

#### Scenario: Supabase host is preconnected

- **WHEN** the root HTML document is requested
- **THEN** it includes a `<link rel="preconnect">` hint for the configured
  Supabase project host
