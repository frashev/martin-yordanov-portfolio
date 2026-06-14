---
name: workflow-guide
description: Interactive cheat sheet and guide for Claude Code CLI commands and OpenSpec (opsx) commands — separately and in combination. Use when the user asks "how do I...", "what command should I use for...", "show me an example of...", "what is the flow for...", "when do I use explore vs propose", or anything about workflow, commands, or how the tools work together.
metadata:
  author: project
  version: "1.0"
---

You are an interactive **workflow guide** for this project. Your job is to answer questions about Claude Code CLI commands, OpenSpec (opsx) commands, and how they work together in the daily development flow.

**Rules for this skill:**

- Always answer with: the **command**, the **situation it fits**, the **why** (what problem it solves), and the **expected outcome**.
- Use plain English first, then the exact command in a code block.
- Give real, copy-paste-ready examples — not abstractions.
- If the user is vague ("how do I start a feature?"), walk them through the full combined flow.
- If the user asks about a specific command, give a focused answer for that command only.
- Always pair Claude Code commands and OpenSpec commands when they work together in a flow.

---

## Claude Code CLI Commands — Quick Reference

### Session & context

| When                                                     | Command       | Why                                                        | Outcome                                               |
| -------------------------------------------------------- | ------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| Starting a new task unrelated to what you just did       | `/clear`      | Removes old context so Claude isn't confused by prior work | Clean slate, no stale file references                 |
| Context window is filling up mid-task                    | `/compact`    | Compresses conversation history while preserving decisions | More room to keep working without losing what matters |
| You want to see what is eating your context budget       | `/context`    | Shows which files, tools, and MCPs are consuming tokens    | You can remove what you don't need                    |
| You want to see model, folder, and context % at a glance | `/statusline` | Persistent header so you always know your situation        | Always-visible status strip                           |
| Claude went in the wrong direction                       | `/rewind`     | Undo a bad branch without losing the whole session         | Restores to a prior checkpoint                        |
| Continuing work from a previous day                      | `/resume`     | Picks up the last session                                  | Resumes where you left off                            |

**Example — context management:**

```
You are 70% through context in a long feature session.
Use /compact before it degrades quality.

/compact Preserve:
- current OpenSpec change name and task list
- files changed and why
- build/test results
- decisions made

Drop: repeated explanations, failed command noise, exploratory chatter
```

---

### Code quality

| When                                       | Command                   | Why                                                         | Outcome                                                   |
| ------------------------------------------ | ------------------------- | ----------------------------------------------------------- | --------------------------------------------------------- |
| Before any multi-file change               | `/plan`                   | Forces Claude to think scope and order before touching code | A reviewable plan you can edit before edits start         |
| Reviewing what changed                     | `/diff`                   | Shows the current working diff in a readable way            | You see exactly what Claude changed                       |
| After implementation                       | `/code-review`            | Catches bugs, over-engineering, and missing tests           | A prioritized Must Fix / Should Fix / Nice to Have list   |
| You want fixes applied automatically       | `/code-review high --fix` | Review + apply safe fixes in one step                       | Cleaner diff, fewer follow-up prompts                     |
| After any auth, data, or dependency change | `/security-review`        | Checks secrets, auth bypass, SQL injection, RLS, config     | Security issues flagged before they ship                  |
| After a UI change                          | `/run` then `/verify`     | Starts the app and checks affected routes in a real browser | Visual proof the change works — build alone is not enough |

**Example — after implementing a contact form:**

```
# 1. Check the diff first
/diff

# 2. Review the code
/code-review high --fix

# 3. Run the app and verify the /contact route
/run
/verify

# 4. If it touches the Supabase backend, also run:
/security-review
```

---

### Plugins, skills, and tools

| When                                                  | Command            | Why                                                                     | Outcome                                               |
| ----------------------------------------------------- | ------------------ | ----------------------------------------------------------------------- | ----------------------------------------------------- |
| You want to install a new tool or extension           | `/plugin`          | Opens the plugin marketplace                                            | You can browse and install skills, hooks, MCP servers |
| You want to see what skills are available             | `/skills`          | Lists loaded skills with their trigger descriptions                     | You know what `/skill-name` commands exist            |
| You need fresh library docs (React, Tailwind, etc.)   | Context7 plugin    | Pulls current version-specific docs instead of relying on training data | Accurate, up-to-date API usage                        |
| You want to set what Claude can do without asking you | `/permissions`     | Configures safe actions (allow) vs. gated actions (ask)                 | Fewer interruptions for safe operations               |
| You want to repeat a task on a schedule               | `/loop [interval]` | Runs a command repeatedly (e.g. watch a build)                          | Automated polling without manual re-runs              |
| You want Claude to keep trying until it succeeds      | `/goal`            | Depth loop — Claude retries until a condition is met                    | Tests pass, metric improves, etc.                     |

---

## OpenSpec (opsx) Commands — Quick Reference

OpenSpec is **spec-first development**: describe the intended behavior before writing code, so the AI works from a contract rather than guessing.

### Core commands

| When                                              | Command                | Why                                                          | Outcome                                                                           |
| ------------------------------------------------- | ---------------------- | ------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| You have a fuzzy idea, not sure how to start      | `/opsx:explore`        | Think-through mode — no code, just options and risks         | Clarity on what to build and which approach to take                               |
| You have a clear idea and want to plan it         | `/opsx:propose <name>` | Creates all planning artifacts in one step                   | `proposal.md`, `design.md`, `tasks.md`, spec deltas — ready for review            |
| You have reviewed and approved the proposal       | `/opsx:apply [name]`   | Implements the change task-by-task                           | Code changes aligned with the approved plan                                       |
| Reality diverged from the plan mid-implementation | `/opsx:sync`           | Updates artifacts to match what you actually discovered      | Artifacts stay truthful — they describe what will be built, not what was imagined |
| Checking if the code matches what was promised    | `/opsx:verify [name]`  | Validates implementation against proposal, design, and tasks | A pass/fail verdict before you archive                                            |
| The change is done and verified                   | `/opsx:archive [name]` | Moves the change into the permanent spec history             | Living documentation of what the site does and why                                |

### CLI commands (not slash commands)

| When                                 | Command             | Why                                                               | Outcome                                  |
| ------------------------------------ | ------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| Starting a new project with OpenSpec | `openspec init`     | Wires OpenSpec into the repo and generates Claude-readable skills | The opsx slash commands become available |
| Checking what changes are active     | `openspec list`     | Shows all open changes and their status                           | You know what is in-flight               |
| Before archiving                     | `openspec validate` | Validates all artifacts for format and completeness               | No broken references or missing files    |

---

## Combined Flow — Feature Work

This is the full daily loop for any meaningful change. Skip steps only when you have a good reason.

```
Step 1: Think (if unclear)
/opsx:explore
→ Get options, risks, and a recommended approach. No edits.

Step 2: Plan
/opsx:propose <kebab-case-name>
→ Creates proposal.md, design.md, tasks.md, spec deltas.
→ STOP. Review the artifacts before continuing.

Step 3: Approve (you, the human)
→ Read proposal.md. Confirm scope and non-goals are right.
→ If unclear, go back to /opsx:explore.

Step 4: Implement
/opsx:apply [name]
→ Claude works through tasks.md one task at a time.
→ Small diffs. Existing patterns. No new dependencies without asking.

Step 5: Runtime verify
/run
/verify
→ Does the app actually work in a browser?
→ Check routes, mobile layout, keyboard nav, browser console.

Step 6: Code review
/code-review high --fix
→ Are there bugs, over-engineering, or missing tests?

Step 7: Spec verify
/opsx:verify [name]
→ Does the implementation match what was proposed?

Step 8: Archive
/opsx:archive [name]
→ Sync to main specs, close the change.
→ Then commit: git add . && git commit -m "feat: <summary>"
```

**Tip:** Context and proposal work best in separate sessions. Use `/clear` between the planning phase and the implementation phase.

---

## Combined Flow — Bug Fix

```
1. Paste: error message, stack trace, screenshot, or failing test.

2. Claude: reproduce or explain the reproduction steps.

3. Claude: find root cause — explore before editing.

4. Propose: the smallest safe fix. No refactors to unrelated code.

5. Add: a regression test so this can't silently break again.

6. Implement.

7. Verify:
   /run
   /verify (if UI affected)
   npm run test (if tests exist)
   npm run build

8. Review:
   /diff
   /code-review
```

---

## Explore vs Propose — When to Use Which

```
/opsx:explore   — use when the PROBLEM is unclear
                  "I want to improve the gallery somehow"
                  "I'm not sure if I need a backend for this"
                  "There are two ways to do this, I can't decide"

/opsx:propose   — use when the SOLUTION is clear
                  "Add a filterable grid to the gallery page"
                  "Show only upcoming events on the home page"
                  "Make the contact form accessible"
```

**Flow for unclear tasks:**

```
/opsx:explore → think → /opsx:propose <name> → review → /opsx:apply
```

**Flow for clear tasks:**

```
/opsx:propose <name> → review → /opsx:apply
```

---

## Common Questions

**Q: I just want to make a quick visual change. Do I need OpenSpec?**

Skip OpenSpec for: typos, small text edits, color tweaks, obvious one-line fixes.
Use OpenSpec for: layout changes, new sections, navigation changes, anything that touches more than one component.

When in doubt, use `/opsx:propose` — it takes 2 minutes and saves you from scope creep.

---

**Q: When do I use `/code-review` vs `/security-review`?**

`/code-review` — always, after any non-trivial implementation.
`/security-review` — additionally, when you touch: auth, contact form, Supabase, environment variables, dependencies, or deployment config.

---

**Q: What is the difference between `/run` and `/verify`?**

`/run` — starts the dev server and gives Claude runtime context (console, errors, network).
`/verify` — uses that runtime context to check specific behavior: does the route load, does the form submit, does it look right on mobile?

Use both together after any UI change. A passing build does not prove the UI works.

---

**Q: My context is getting full. What do I do?**

```
# Option 1: compress and keep going
/compact

# Option 2: if the task is done or you're switching topics
/clear

# Option 3: if Claude is going the wrong way
/rewind
```

Rule of thumb: `/compact` before 80%, `/clear` between unrelated tasks.

---

**Q: I want to add something new but I don't have the right words for it. Where do I start?**

Start with `/idea-brief` — it runs a short interview in plain English and fills in the technical fields (routes, components, spec domains) for you. Then it tells you whether to use `/opsx:explore` or `/opsx:propose` next.

---

## Worked Example — Full Feature Walkthrough

**Goal:** Add a section to the Home page showing the three most recent upcoming events.

```
# You don't know if this needs a backend or can be static. Start with explore.
/opsx:explore
"I want to show upcoming events on the home page. Not sure if I need a
database for this or if it can be simple."

# Claude explores, looks at src/content/events.ts and the Events page,
# and recommends a static approach using the existing data file.

# Now you know the solution. Propose it.
/opsx:propose home-upcoming-events

# Claude creates:
# openspec/changes/home-upcoming-events/proposal.md
# openspec/changes/home-upcoming-events/design.md
# openspec/changes/home-upcoming-events/tasks.md
# + spec delta for site-pages

# You read proposal.md. Scope is right. Non-goals include: no new API,
# no CMS, reuse existing EventCard component if one exists.
# You approve.

# Clear context and implement.
/clear
/opsx:apply home-upcoming-events

# Claude works through tasks, reusing existing content patterns.

# Verify the result.
/run
/verify
# → Check / route, check mobile, check that only future events show.

# Code review.
/code-review high --fix

# Spec verify.
/opsx:verify home-upcoming-events

# Archive and commit.
/opsx:archive home-upcoming-events
git add . && git commit -m "feat: show upcoming events on home page"
```

---

## Three-Layer Summary

```
Layer 1 — Always on
  CLAUDE.md       How Claude should behave in this project
  /permissions    What it can do without asking you
  /statusline     Your session dashboard

Layer 2 — On demand (skills and commands)
  /opsx:explore   Think before committing
  /opsx:propose   Plan the change
  /opsx:apply     Build the change
  /run /verify    Prove it works
  /code-review    Review the diff
  /opsx:archive   Close the change

Layer 3 — Reference tools
  Context7        Fresh library docs
  /security-review  Security audit
  docs/reference/ Style guide, architecture, this cheat sheet
```
