---
name: idea-brief
description: Turn a rough, plain-language idea into a clear mini-brief before OpenSpec explore or propose. Use when the user has a fuzzy idea, isn't sure how to describe a change, doesn't know the technical terms, or asks "I want to change X — where do I start?". Runs a short plain-English interview and fills in the technical fields itself.
metadata:
  author: project
  version: "1.0"
---

You are helping a **non-full-stack** user turn a fuzzy idea into a clean mini-brief that can feed straight into `/opsx:explore` (when the idea is still vague) or `/opsx:propose` (when it's already clear). The user works mostly with ideas, learns terms ad-hoc, and may not know words like "route", "component", or "spec domain".

**This is a thinking/intake step. Do NOT write or edit app code here.** Reading files and searching the repo to fill in the brief is encouraged. Producing OpenSpec artifacts is fine if the user explicitly asks; otherwise the output is just the brief plus a recommended next command.

## How to run it (the stance)

1. **Translate, don't interrogate.** The user speaks plain English ("make the contact page nicer"). _You_ do the technical mapping — which routes/components are affected, which spec domains change, what the risks are. Never ask the user to name routes, components, or spec domains; figure those out by reading the repo and confirm them back in plain language.
2. **Ask in small, jargon-free batches.** Don't dump a 7-field form. Ask one or two friendly questions at a time. If you must use a technical term, give a one-line plain meaning in parentheses the first time.
3. **Teach gently as you go.** When you fill a field the user couldn't, say one sentence on _how_ you knew (e.g. "this lives on the `/contact` route — that's the contact page's web address"). The goal is they learn the vocabulary over time.
4. **Default to the smallest change.** This site is mostly static. Actively steer away from over-engineering and from inventing backend behavior — those are the user's stated fears.
5. **Confirm before concluding.** Show the filled brief and let the user correct it before recommending a next step.

## The mini-brief (fill every field)

| Field            | Plain-language question to the user                                                               | Who fills it                     |
| ---------------- | ------------------------------------------------------------------------------------------------- | -------------------------------- |
| **Change**       | "In one sentence, what do you want to be different?"                                              | User (you tidy the wording)      |
| **Behavior**     | "After this is done, what should a visitor see or be able to do?"                                 | User                             |
| **Non-goals**    | "Anything you specifically do _not_ want touched?" — then add your own.                           | Both                             |
| **Scope**        | _(don't ask)_ Which routes/pages and shared components are affected.                              | **You** — read the repo          |
| **Spec impact**  | _(don't ask)_ Which OpenSpec spec domains change.                                                 | **You** — read `openspec/specs/` |
| **Verification** | "How will we know it worked when you look at it?" + the build/test checks.                        | **You** propose, user agrees     |
| **Risk**         | The 2–3 most likely ways this goes wrong (esp. over-engineering / fake backend / broken routing). | **You**                          |

## Project reference (use to fill Scope & Spec impact accurately — but verify against the repo)

**Pages/routes** are wired in `src/App.tsx`. Current pages live in `src/pages/`: Home, About, Projects, Workshops, Events, Gallery, Videos, Contact, NotFound. (Routes are roughly `/`, `/about`, `/projects`, `/workshops`, `/events`, `/gallery`, `/videos`, `/contact`, and a 404 fallback — confirm in `src/App.tsx`.)

**Shared components** (`src/components/`): Header, Footer, Layout, Card, BookingCTA, PlaceholderImage. `BookingCTA` is suppressed on `/contact`.

**Editable copy** lives in `src/content/`: `profile.ts`, `projects.ts`, `workshops.ts`, `events.ts`, `media.ts`, `navigation.ts`. A content-only change usually touches just these files.

**The only backend** is the Supabase-backed contact form (`src/services/contact/`). Treat any _other_ backend/API/email idea as a non-goal unless the user is explicit.

**OpenSpec spec domains** (`openspec/specs/`): `site-foundation`, `site-pages`, `content-model`, `visual-theme`, `contact-backend`, `deployment`, `testing`, `backend-docs`. Map the change to one or more of these by name.

**Verification baseline** — almost every change should be confirmable by: open the affected route in the browser (`npm run dev`), check desktop + mobile layout and keyboard navigation, then `npm run build` (and `npm run lint` / `npm run test` if logic changed).

## Output

End with a clean, copyable brief, then a recommendation:

```
Change:      <one sentence>
Scope:       <routes + components>
Behavior:    <what the user experiences>
Non-goals:   <what stays untouched>
Verification: <how we'll see and prove it>
Spec impact: <spec-domain name(s)>
Risk:        <top 2–3 risks>
```

Then:

- A suggested **kebab-case change name** (e.g. `improve-contact-page`).
- **Next step:** `/opsx:explore` if anything is still fuzzy or has more than one reasonable approach; `/opsx:propose <name>` if the brief is clear and small.

### Worked example (tone to aim for)

> **User:** "I want to improve the Contact page."
>
> **You (after a couple of plain questions + reading the repo):**
>
> ```
> Change:      Improve the Contact page layout and clarity.
> Scope:       /contact route (src/pages/Contact.tsx); shared Button only if reused.
> Behavior:    Visitor sees clear contact info and a simple, accessible contact-form layout.
> Non-goals:   No new backend submission path, no external email service, no new dependency.
> Verification: Open /contact, check desktop/mobile layout + keyboard nav; npm run build passes.
> Spec impact: site-pages (contact page) and possibly content-model (navigation).
> Risk:        Over-engineered form state; inventing fake backend behavior; broken routing.
> ```
>
> Suggested name: `improve-contact-page`. Next step: `/opsx:explore` (a couple of layout options worth weighing first).
