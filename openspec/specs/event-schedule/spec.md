# event-schedule Specification

## Purpose

Defines how events carry scheduling data (dates, times, multi-day ranges, ticket links) and how the Events page presents them — splitting upcoming from past, sorting chronologically, formatting dates for humans, rendering ticket buttons, and handling empty states.

## Requirements

### Requirement: Events carry a date and optional schedule details

Each event SHALL have a `date` (ISO `YYYY-MM-DD`) and MAY have a `time`, an `endDate` (for multi-day events), and a `ticketUrl` with optional `ticketLabel`.

#### Scenario: Event has a required date

- **WHEN** an event is defined in the content file
- **THEN** it includes a `date` value in `YYYY-MM-DD` format

#### Scenario: Optional schedule fields are supported

- **WHEN** an event defines `time`, `endDate`, `ticketUrl`, or `ticketLabel`
- **THEN** those values are available to the Events page for display

### Requirement: Events page splits upcoming and past

The Events page SHALL group events into an "Upcoming" section (date today or later) and a "Past" section (before today), based on the visitor's local date.

#### Scenario: Future event appears under Upcoming

- **WHEN** an event's date is later than today
- **THEN** it appears in the Upcoming section

#### Scenario: Past event appears under Past

- **WHEN** an event's date is earlier than today
- **THEN** it appears in the Past section

#### Scenario: Event happening today counts as upcoming

- **WHEN** an event's date equals today's date
- **THEN** it appears in the Upcoming section

#### Scenario: Multi-day event in progress counts as upcoming

- **WHEN** an event's `date` is before today but its `endDate` is today or later
- **THEN** it appears in the Upcoming section

### Requirement: Events are sorted chronologically within each section

Upcoming events SHALL be ordered soonest-first; past events SHALL be ordered most-recent-first.

#### Scenario: Upcoming sorted ascending

- **WHEN** the Upcoming section renders multiple events
- **THEN** the event with the nearest future date appears first

#### Scenario: Past sorted descending

- **WHEN** the Past section renders multiple events
- **THEN** the most recently passed event appears first

### Requirement: Event dates are formatted for humans

Each event SHALL display a human-readable date using the visitor's locale, with no external date library.

#### Scenario: Single-day date is formatted

- **WHEN** an event has a `date` and no `endDate`
- **THEN** the card shows a readable date such as "15 July 2026" in the visitor's locale

#### Scenario: Multi-day date shows a range

- **WHEN** an event has both `date` and a later `endDate`
- **THEN** the card shows a date range such as "12–14 July 2026"

#### Scenario: Time is shown when present

- **WHEN** an event has a `time` value
- **THEN** the formatted date includes the time

### Requirement: Events with a ticket link show a ticket button

When an event has a `ticketUrl`, the card SHALL render a button that opens the link in a new tab.

#### Scenario: Ticket button appears with a URL

- **WHEN** an event has a `ticketUrl`
- **THEN** the card shows a ticket/RSVP button labeled with `ticketLabel` or a default of "Get tickets"

#### Scenario: Ticket button opens safely in a new tab

- **WHEN** the user activates the ticket button
- **THEN** the link opens in a new tab with `rel="noopener noreferrer"`

#### Scenario: No button without a URL

- **WHEN** an event has no `ticketUrl`
- **THEN** no ticket button is rendered on that card

### Requirement: Empty states are handled gracefully

The Events page SHALL show a friendly message when nothing is upcoming, and SHALL omit the Past section entirely when no past events exist.

#### Scenario: No upcoming events

- **WHEN** there are no upcoming events
- **THEN** the Upcoming area shows a message such as "No upcoming events right now"

#### Scenario: No past events

- **WHEN** there are no past events
- **THEN** the Past section heading and list are not rendered
