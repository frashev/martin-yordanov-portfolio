## Context

`Events.tsx` maps `events` into `<Card>` components with `title` + `location` + `summary`. `EventItem` is `{ title, summary, location }`. No date awareness exists anywhere. The site already uses `Intl` implicitly through the browser; no date library is present and none should be added (per the no-new-dependency rule).

## Goals / Non-Goals

**Goals:**

- Date-aware `EventItem` with optional time, multi-day, and ticket link
- Upcoming/past split with correct chronological sorting
- Human-readable date formatting with zero dependencies
- Polished empty states
- A domain-neutral model reusable by the kit

**Non-Goals:**

- Calendar grid / month view (a list grouped by upcoming/past is enough)
- Timezone handling beyond the visitor's local locale (dates are simple wall-clock event dates)
- iCal / "add to calendar" export (possible future spec)
- Recurring events (each occurrence is its own entry)

## Decisions

### Decision 1 — `date` is a plain ISO `YYYY-MM-DD` string, parsed locally

**Chosen:** Store `date: "2026-07-15"`. Compare and sort lexicographically (ISO date strings sort correctly as strings) and format with `Intl.DateTimeFormat`.

**Alternatives considered:**

- `Date` objects in content — not serializable-friendly, awkward in a typed content file.
- Full ISO datetime with timezone — overkill; event dates are wall-clock ("July 15"), not instants.

**Why:** ISO date strings are human-editable in `events.ts`, sort correctly without parsing, and the next site's author (or AI) can read them at a glance. Keep `time` a separate optional display string (e.g. `"20:00"`).

### Decision 2 — "Today" boundary uses local date, compared as ISO strings

**Chosen:** Compute today's ISO date once (`new Date()` → `YYYY-MM-DD` in local time). An event is **upcoming** when `event.date >= todayISO` (or `endDate >= todayISO` for multi-day so an in-progress multi-day event stays upcoming), else **past**. String comparison on ISO dates is correct and avoids `Date` parsing pitfalls.

**Why:** Simple, no off-by-one timezone bugs from `Date` math. An event happening _today_ counts as upcoming (still relevant to the visitor).

### Decision 3 — Sorting

**Chosen:** Upcoming ascending by date (soonest first — what a visitor wants to act on). Past descending (most recent first — recency matters more than ancient history).

### Decision 4 — Date formatting helper

**Chosen:** A small `formatEventDate(item)` helper using `Intl.DateTimeFormat(undefined, { day, month, year })`. For multi-day (`endDate` set), format as a range ("12–14 July 2026"). Prepend `time` when present.

**Why:** `Intl` respects the visitor's locale automatically and needs no dependency. Keeping it a named helper makes it testable and reusable.

### Decision 5 — Ticket button

**Chosen:** When `ticketUrl` is set, render an anchor styled like the accent CTA button with `target="_blank"` and `rel="noopener noreferrer"`. Label = `ticketLabel ?? "Get tickets"`. When absent, no button.

**Why:** External ticketing/RSVP links are the conversion action. `rel="noopener noreferrer"` is the security baseline for `target="_blank"`.

### Decision 6 — Card extension vs. new component

**Chosen:** Keep using `<Card>` but pass the formatted date through its existing `meta` slot (combined with location), and render the ticket button as part of the card's children. If that crowds the card, introduce a small `EventCard` wrapper — decide during implementation based on layout.

## Risks / Trade-offs

- **`date` becomes required on `EventItem`** → any existing event without a date would break the type. Mitigation: the demo `events.ts` is updated in the same change; there is no other consumer.
- **Demo dates go stale** → fixed future dates eventually become past, collapsing the Upcoming section over time. Mitigation: this is demo placeholder data; real client dates replace it. Acceptable for a pre-launch site, and the empty state handles "all past" gracefully.
- **String date comparison assumes well-formed ISO** → a malformed `date` would sort/compare wrong. Mitigation: the type enforces `string`; document the `YYYY-MM-DD` expectation in a comment in `events.ts`.

## Open Questions

None blocking implementation.
