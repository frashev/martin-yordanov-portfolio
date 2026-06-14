## 1. Content Type

- [x] 1.1 Extend `EventItem` in `src/content/types.ts`: add `date: string` (ISO YYYY-MM-DD, required), `time?: string`, `endDate?: string`, `ticketUrl?: string`, `ticketLabel?: string`

## 2. Demo Content

- [x] 2.1 Update `src/content/events.ts`: add realistic ISO dates to all events — a mix of future (upcoming) and past dates so both sections are visible; add a `ticketUrl` + `ticketLabel` to at least one upcoming event; add a comment documenting the `YYYY-MM-DD` format expectation

## 3. Date Helper

- [x] 3.1 Create a `formatEventDate(item)` helper (in `src/lib/formatEventDate.ts` or inline in Events.tsx) using `Intl.DateTimeFormat(undefined, { day: "numeric", month: "long", year: "numeric" })`
- [x] 3.2 Multi-day: when `endDate` is set and later than `date`, render a range (e.g. "12–14 July 2026") via `Intl.DateTimeFormat.formatRange`
- [x] 3.3 Prepend `time` to the output when present

## 4. Upcoming/Past Split + Sort

- [x] 4.1 In `src/pages/Events.tsx`, compute today's local ISO date once
- [x] 4.2 Partition events: upcoming = `(endDate ?? date) >= todayISO`, past = otherwise
- [x] 4.3 Sort upcoming ascending by `date` (start); sort past descending by effective end date `(endDate ?? date)` — Codex fix for multi-day chronology

## 5. Render

- [x] 5.1 Render an "Upcoming" section heading + list; each card shows formatted date + location (via Card `meta`) and the summary
- [x] 5.2 When `ticketUrl` is set, render a ticket button: anchor styled like the accent CTA, `target="_blank"`, `rel="noopener noreferrer"`, label = `ticketLabel ?? "Get tickets"`
- [x] 5.3 Render a "Past" section heading + list only when past events exist
- [x] 5.4 Empty upcoming: show a friendly "No upcoming events right now" message
- [x] 5.5 Preserve existing `<Reveal>` staggered animation on the cards

## 6. Verification

- [x] 6.1 `npm run build` — TypeScript + Vite build passes
- [ ] 6.2 `npm run dev` — Events page shows Upcoming and Past sections, correctly sorted, with formatted dates
- [ ] 6.3 Confirm the ticket button appears on the event(s) with a `ticketUrl` and opens in a new tab
- [ ] 6.4 Confirm date formatting looks correct for single-day, multi-day, and timed events
- [x] 6.5 `npm run test` — existing unit tests still pass
- [x] 6.6 `openspec validate` — confirm artifacts valid

## 7. Review & Cleanup

- [x] 7.1 `/codex:review` — event schedule: extended EventItem, upcoming/past split + sort, Intl date formatting, ticket button, no new dependencies. Caught + fixed: past-events sort now uses effective end date.
- [ ] 7.2 `/opsx:archive add-event-schedule` — finalize and archive
