# AGENTS.md — entry point for any AI agent working in this repo

This is the **agent-neutral front door**. Whatever coding agent you are — Claude Code,
MiniMax Code, Codex, or another CLI — start here, then follow the pointers below. Nothing
important is duplicated: each file owns its topic, and this file only tells you where to
look. (`AGENTS.md` is the converging cross-tool standard; it plays the same role here that
`CLAUDE.md` plays for Claude Code.)

## What this is

A **React 19 + React Router 7 + Tailwind CSS v4 + TypeScript** site, built with Vite and
deployed to Cloudflare Workers. It's a portfolio/marketing site for Martin Yordanov's
kinetic furniture, drawing machines, and functional art objects, and it doubles as a
**reusable, spec-driven kit** for similar portfolio/marketing sites.

## Read in this order

1. **`CLAUDE.md`** — the single source of truth for conventions: how to work here, the
   architecture, the right-size workflow, review guardrails, and safety rules. Read it in
   full before changing code. It's written for Claude Code, so the **conventions,
   architecture, and workflow are universal and apply to you** — but the Skills,
   slash-command, and `~/.claude` memory sections are Claude-Code-specific tooling: apply
   the principle, skip the mechanics that don't fit your tool.
2. **`docs/project-memory.md`** — **read this file immediately, before taking any action.**
   Durable project decisions and status (roadmap, what's built, the reusable-kit model,
   open threads) that you can't derive from the code or git history.
3. **`openspec/`** — the work flow and the behavior contracts:
   - `openspec/specs/` — current specs (the `WHEN`/`THEN` behavior the site must satisfy).
   - `openspec/changes/` — in-progress and archived units of work (proposal + design + tasks).
   - The flow is **propose → apply → verify → archive**. It's all plain markdown, so any
     agent can read and follow it without Claude-specific tooling.
4. **`docs/reference/`** — `style-guide.md` (visual identity, tokens, do/don't) and the
   OpenSpec cheatsheet.
5. **`src/content/`** — the typed data layer. All page copy lives here as TypeScript
   objects; reach for it before any backend concept.

## Non-negotiable rules (full detail in `CLAUDE.md`)

- **Don't fabricate** biographical claims, dates, awards, festivals, or venue names — all
  content is placeholder until the client provides verified copy.
- **One backend only** (the Supabase contact form). Don't add new backend/API/CMS code
  unless explicitly asked.
- **Never** read, print, or commit `.env*` secrets — refer to them by variable name.
- **Commit or push only when asked.**

## Commands

See the **Commands** section in `CLAUDE.md` (`dev` / `build` / `lint` / `test` /
`test:e2e` / `deploy`).

## Two different MiniMax products — don't confuse them

- **MiniMax Code** = a full **coding agent** (like Claude Code: reads the repo, plans,
  edits files, runs builds). It's a supported _driver_ here — it should read this file.
- **`mmx-cli`** = a **media-generation** CLI (image/video/speech/music). It is _not_ a
  coding agent; it's a **tool the coding agent calls** to synthesize hero video, gallery
  imagery, or audio. Generated media is **content**: place it via the `src/content/` +
  content-readiness conventions, and never let it invent real-world claims about the client.
