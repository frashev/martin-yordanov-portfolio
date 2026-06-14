## Why

The Events page is the marketing heart of the site, yet `EventItem` has no date — just `{ title, summary, location }`. A visitor can't tell what's upcoming, what's already happened, or how to get a ticket. For a site whose stated purpose is "marketing events across domains," a date-and-ticket model is the single most important missing primitive. Building it properly here also produces a domain-neutral, reusable schedule spec the next kit site (chef, DJ, conference) copies verbatim.

## What Changes

- `EventItem` gains: `date` (ISO `YYYY-MM-DD`), optional `time`, optional `endDate` (multi-day), optional `ticketUrl` + `ticketLabel`.
- The Events page splits items into **Upcoming** (date today or later) and **Past** (before today). Upcoming is sorted soonest-first; Past is sorted most-recent-first.
- Each event card shows a human-formatted date (via the built-in `Intl.DateTimeFormat` — no dependency), the location, and — when `ticketUrl` is set — a ticket/RSVP button that opens the external link in a new tab.
- Empty states: a friendly "No upcoming events right now" message when nothing is upcoming; the Past section is omitted entirely when empty.
- `events.ts` demo data is updated with realistic future and past dates so the split is visible immediately.

## Capabilities

### New Capabilities

- `event-schedule`: Date-aware event model with upcoming/past split, chronological sorting, formatted dates, and optional ticket links.

### Modified Capabilities

<!-- None — site-pages spec describes the Events route at page level, but this adds new schedule behavior rather than changing an existing requirement. Captured as a new capability. -->

## Impact

- **Files modified:** `src/content/types.ts` (extend `EventItem`), `src/content/events.ts` (demo dates), `src/pages/Events.tsx` (split, sort, format, ticket button)
- **No new npm dependencies** (`Intl.DateTimeFormat` is built into the browser)
- **No backend, no routing change**
- **Reusability:** the `EventItem` shape and the upcoming/past logic are domain-neutral — flagged as a universal spec for the events-marketing kit
- **Backward note:** `date` becomes required on `EventItem`; the demo `events.ts` is updated in the same change so the build stays green
