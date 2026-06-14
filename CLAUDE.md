# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Entry points & shared context (any agent)

This repo is wired so **any** coding agent — Claude Code, MiniMax Code, or Codex — works from the same context, no matter which file it auto-loads first:

- **`AGENTS.md`** (repo root) is the agent-neutral front door. Non-Claude agents read it first; it routes them here and to the shared layer below. Keep it in sync when the conventions here change materially.
- **`docs/project-memory.md`** is the repo-resident, portable record of durable decisions and status (roadmap, reusable-kit model, multi-agent plan). **Read this file at the start of every session before taking any action.** Claude Code's private memory mirrors it — treat `docs/project-memory.md` as **canonical** when they differ, and update it as decisions change.

Division of labour: **CLAUDE.md** owns _conventions_, **`docs/project-memory.md`** owns _decisions & status_, **`openspec/`** owns the _behavior specs and the flow_.

## How to work in this repo

**Be a thoughtful collaborator, not a yes-man.** The owner is learning and explicitly wants pushback — challenge weak ideas, surface risky assumptions, and ask clarifying questions before building.

**Plain-language guide for this user (English is the owner's second language).** The owner is non-technical and learning — they want to _understand_ what you say _and_ pick up the real vocabulary over time. So:

- **Pair both words.** Give the plain meaning and the correct technical term together — e.g. "the speed curve of the motion (called _easing_)". Never dumb it down or hide the real word.
- **Define on first use, once.** Explain each new technical, domain, or OpenSpec term the first time it appears — e.g. _change_ = a named unit of work; _spec_ = the WHEN/THEN behavior contract; _artifact_ = a proposal/design/tasks file. Don't define everything at once; explain as each term naturally comes up.
- **Show how you knew.** When you learn something from the codebase the owner didn't mention, add one line on how you found it — e.g. _"I checked `src/App.tsx` — that's where the page routes live."_ This builds their vocabulary over time.
- **Keep it light.** Short sentences and concrete examples beat dense paragraphs.
- **Everywhere.** This applies in normal chat **and** inside every skill.

**Quality gate.** Don't ship a first draft. If the result is weak, improve it until it's production-ready or clearly explain the remaining gap. Prefer the smallest safe change over a broad rewrite; don't add dependencies without asking.

**Verify before claiming done** — run the relevant checks and report the actual results:

- Logic/build changes → `npm run build`, `npm run lint`, `npm run test`
- UI changes → `npm run dev`, view the page, check the browser console, compare against the intended design (screenshots help)
- Routing/page changes → also `npm run test:e2e`

Never state that something works if you haven't verified it.

**Finish with a short structured summary:** (1) what changed, (2) what you verified — exact commands and results, (3) what needs the owner, if anything, (4) risks or gaps, (5) suggested next step.

**Safety.** Never read, print, or commit `.env*` values or other secrets — refer to them by variable name. Ask before installs, deletes, migrations, deployments, or production-config changes. Commit or push only when asked.

**Context hygiene.** On long sessions, suggest `/compact` before quality degrades and `/clear` between unrelated tasks; use `/rewind` when heading the wrong way.

**Right-size the workflow to the change (don't over-verify).** This is a small solo site, not a team codebase — match the effort (process, _how much you do to confirm it works_) to the _volume_ (size) of the change. Default to the lightest path that fits; the owner can ask for heavier verification when they want it. Full reference: [`docs/reference/claude-openspec-cheatsheet.html`](docs/reference/claude-openspec-cheatsheet.html) ("Right-size by volume").

- **Tiny** (1 file, a few lines; copy/color/spacing, no new behavior) → edit + `npm run build`. No OpenSpec, no `/verify`, no `/code-review`.
- **Small** (1 component/logic file, self-contained, no new route or dependency) → edit + a quick `npm run dev` look (or `npm run test` if it's logic). OpenSpec usually not needed.
- **Medium** (2–8 files, new user-visible behavior, touches shared layout — e.g. motion, SEO/meta, dark mode, gallery lightbox) → OpenSpec propose → apply → **one** runtime proof (`/verify` **or** the e2e tests, not both) → `/codex:review` (uses OpenAI tokens, not Claude tokens — give it one line of context) → archive.
- **Large** (cross-cutting/architectural; new dependency, backend, data model, or auth/security) → the full flow, including `/security-review` when auth/data is touched. The only tier that earns the whole ceremony.

Avoid the common duplicates: `/run` is already inside `/verify` (use one); running the e2e suite **and** a deep `/verify` prove the same thing (pick one); `/verify` (runtime — does the app work?), `/code-review` (code — is it correct?), and `/opsx:verify` (spec — does the build match the change's artifacts?) are three different lenses — a small change needs at most one. When unsure which tier, size **up** one — under-verifying costs more than the extra step.

## Commands

```bash
npm run dev          # dev server at http://localhost:5173
npm run build        # tsc + vite build (output: dist/)
npm run preview      # serve dist/ locally for a final smoke check
npm run lint         # eslint
npm run test         # vitest unit tests (run once)
npm run test:e2e     # playwright e2e (starts dev server automatically)
npm run deploy       # build + wrangler deploy to Cloudflare Workers
```

Run a single test file: `npx vitest run src/__tests__/Header.test.tsx`

## Environment

Copy `.env.example` to `.env.local` and fill in the two Supabase values before running locally:

- `VITE_SUPABASE_URL` — Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` — Supabase anon/publishable key

These `VITE_*` variables are baked into the bundle at build time, so changing them requires a rebuild and redeploy.

## Architecture

**Stack:** React 19 + React Router 7 + Tailwind CSS v4 + TypeScript, built with Vite, deployed to Cloudflare Workers via Wrangler (SPA fallback to `index.html`).

**Routing:** All routes share a single `<Layout>` wrapper (Header + Footer + conditional `<BookingCTA>`). The BookingCTA is suppressed on `/contact`. Routes are defined in `src/App.tsx`.

**Content layer (`src/content/`):** All page copy lives as typed TypeScript objects — `profile.ts`, `projects.ts`, `workshops.ts`, `events.ts`, `media.ts`, `navigation.ts` (types in `types.ts`). All content is placeholder — **never fabricate biographical claims, dates, awards, festivals, or venue names** until the client provides verified copy.

**Contact form (`src/services/contact/`):** Provider-pattern service. `contactService.ts` is the public API; it delegates to `supabaseContactProvider.ts`, which inserts into the `contact_messages` Supabase table. The client in `src/lib/supabaseClient.ts` degrades gracefully (console warning) when env vars are missing. **This is the only backend** — do not introduce new backend/API/CMS code unless explicitly requested.

**Styling:** Global CSS variables (`--paper`, `--ink`, `--accent`, etc.) are declared in `src/index.css` and used inline and via Tailwind. Display headings use a serif stack (`--font-display`); body text uses system sans-serif (`--font-body`). Tailwind is loaded as a Vite plugin (v4 syntax — no `tailwind.config.js`). The visual identity (tokens, type, do/don't) is documented in [`docs/reference/style-guide.md`](docs/reference/style-guide.md) — read it before any UI work and keep it in sync when tokens change.

**Tests:** Unit tests use Vitest + Testing Library (jsdom). E2e tests use Playwright (Chromium only). Setup is in `src/test/setup.ts`.

## Skills & Plugins

Skills live in `.claude/skills/` and activate automatically when relevant, or invoke manually with `/skill-name`. For a printable visual reference of all commands and flows, see [`docs/reference/claude-openspec-cheatsheet.html`](docs/reference/claude-openspec-cheatsheet.html).

**Planning & idea intake**

| Skill           | When to use                                                                                                                                                             |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/idea-brief`   | **Start here** with a fuzzy idea you can't yet describe. Runs a plain-English interview and fills in the technical fields (routes, spec domains, scope).                |
| `/design-vocab` | You can picture a visual change but lack the term. Translates plain English ("add more space", "feels too heavy") into precise vocabulary and maps it to a spec domain. |

**UI design & building**

| Skill              | When to use                                                                                                                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `/frontend-design` | Building any page section or component from scratch. Produces polished, non-generic code.                                          |
| `/ui-ux-pro-max`   | Choosing a palette, style direction, or font pairing, or getting design-system recommendations.                                    |
| `/21st-components` | Want a real component example before writing from scratch — heroes, navbars, cards, modals, pricing. Links to 21st.dev categories. |

**OpenSpec change workflow** (see conventions below)

| Skill                   | When to use                                                                        |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `/opsx:explore`         | Think through a problem before committing — no code, just diagrams and options.    |
| `/opsx:propose <name>`  | Create a new change with all artifacts (proposal, design, tasks) in one step.      |
| `/opsx:new`             | Start a change and build its artifacts **incrementally** (alternative to propose). |
| `/opsx:continue [name]` | Create the next artifact for an in-progress change.                                |
| `/opsx:apply [name]`    | Implement tasks from an existing change.                                           |
| `/opsx:verify [name]`   | Confirm the implementation matches the change's artifacts before archiving.        |
| `/opsx:sync [name]`     | Promote a change's delta specs into the main specs.                                |
| `/opsx:archive [name]`  | Finalize and archive a completed change.                                           |
| `/workflow-guide`       | Interactive cheat sheet — ask "what command for X?" or "show me the full flow".    |

> The `.claude/commands/opsx/*` files and the four `openspec-*` skills are **generated by `openspec update`** and are overwritten on every update/version upgrade — **never hand-edit them.** Durable, cross-cutting guidance (communication style, right-size rules, etc.) lives here in CLAUDE.md, which OpenSpec never regenerates.

**Supabase & meta**

| Skill                               | When to use                                                                             |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| `/supabase`                         | Any Supabase task — schema, Auth, Edge Functions, RLS, migrations, the contact backend. |
| `/supabase-postgres-best-practices` | Reviewing or optimizing Postgres queries, schema design, or indexes.                    |
| `/skill-creator`                    | Creating a new custom skill or improving an existing one (runs eval loops).             |

**Codex (OpenAI) — installed plugin `codex@openai-codex`**

Uses OpenAI tokens (not Claude tokens). Run `/codex:setup` once after `codex login` to verify auth.

| Command                     | When to use                                                                                          |
| --------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/codex:review`             | Code review after applying a Medium change — replaces `/code-review high`. Give one line of context. |
| `/codex:adversarial-review` | Pressure-test risky areas before archiving: auth, data loss, Supabase RLS, race conditions.          |
| `/codex:rescue <task>`      | Delegate a bounded task to Codex: bug fixes, writing tests, mechanical refactors, lint/TS errors.    |
| `/codex:status`             | Check if the Codex runtime is active.                                                                |
| `/codex:setup`              | Verify Codex auth and toggle the stop-time review gate.                                              |

**Good `/codex:rescue` candidates** (mechanical, bounded, no project history needed):

- Fix a broken test: `/codex:rescue fix the failing smoke test in e2e/smoke.spec.ts`
- Write unit tests: `/codex:rescue write vitest tests for src/lib/useReveal.ts`
- Mechanical multi-file work: `/codex:rescue add Open Graph meta tags to all 5 pages using src/content/`
- TypeScript / lint errors: `/codex:rescue fix all TypeScript errors in the current build output`

**Keep in Claude** (needs conversation context or design judgment):

- OpenSpec proposals, design decisions, architecture choices
- UI/design direction and style-guide work
- Anything requiring the WHY behind a decision
- Recovery when a Codex run fails or produces wrong output

## OpenSpec authoring conventions

All non-trivial feature work flows through an OpenSpec change. Changes live in `openspec/changes/<name>/` with `proposal.md`, `design.md`, and `tasks.md`; check active ones with `openspec list`.

**Implementation guardrails** (when editing the app, not just artifacts): prefer existing React 19 / React Router 7 / Tailwind v4 patterns over new dependencies; preserve client-side routing and reuse the `Layout`/navigation patterns; reach for `src/content/` before any backend concept; use semantic HTML and keep interactive elements keyboard-accessible. (See Architecture above for the content-placeholder and single-backend rules.)

**Per-stage artifact rules:**

- **proposal.md** — State the user-visible outcome. Name affected routes (`src/App.tsx`) and components/pages. Include explicit non-goals. Note whether the change is static, content-driven (`src/content/`), or touches the Supabase contact backend.
- **specs/\*\*/spec.md** — Write `WHEN`/`THEN` scenarios testable in a browser. Cover routing, responsive behavior, accessibility, and empty/error states. Parse rule: every `#### Scenario:` needs exactly four hashtags, and every requirement needs at least one scenario.
- **design.md** — Only when the change warrants it. Justify any new dependency or abstraction; record data flow and component ownership; note any `Layout`/`BookingCTA` implications.
- **tasks.md** — Use `- [ ] X.Y` checkboxes (OpenSpec parses these for completion). Split into exploration, implementation, verification, and cleanup. Include build/runtime verification (`npm run build`, `npm run lint`, `npm run test`, `npm run test:e2e`) and run `openspec validate` before archiving.
