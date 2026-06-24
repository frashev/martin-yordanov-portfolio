## Context

The site is a static React + Vite + TypeScript SPA deployed to Cloudflare Workers Static Assets (`martin-yordanov.com`). There is no server runtime — all code runs in the browser. The Contact page currently renders a form but does nothing on submit. The goal is to add a real submission path using Supabase as a managed backend, keeping the architecture entirely static and the frontend bundle the only deployable artefact.

Supabase's JavaScript client can call the Supabase REST/PostgREST API directly from the browser using the publishable anon key. Row Level Security restricts what anon users can do; V1 only grants `INSERT` on `contact_messages`.

## Goals / Non-Goals

**Goals:**

- Contact form submissions land in a Supabase `contact_messages` table.
- Architecture is provider-agnostic: swapping Supabase for a server endpoint (V2) requires only a new provider file, not a UI rewrite.
- Anon key is the only credential in frontend code.
- Missing env vars degrade gracefully (user-visible error, dev console warning).
- All form states (idle, submitting, success, error) are handled.

**Non-Goals:**

- Server-side validation, anti-spam, or email notifications (V2, via Cloudflare Pages Functions).
- Supabase Auth, Storage, Realtime, or Edge Functions.
- Admin dashboard or read access for any public user.
- Payments, Stripe, or any financial flow.
- Cloudflare Pages Functions or any server runtime in V1.
- Changes to any page other than Contact.

## Decisions

### 1. Provider pattern for the contact service

**Decision:** `contactService.ts` exports a single `submitContact(input)` function that delegates to the active provider (`supabaseContactProvider`). The provider is imported directly (no runtime config or factory).

**Why:** The V1→V2 migration (Proposal: swap Supabase direct-insert for a `/api/contact` fetch) requires only adding a new provider file and changing one import in `contactService.ts`. All consumer code (Contact page) stays the same.

**Alternative considered:** Pass provider as argument or use a context. Rejected — adds complexity with no V1 benefit; the provider is effectively a compile-time choice.

---

### 2. Publishable key only; rely on RLS

**Decision:** Only `VITE_SUPABASE_PUBLISHABLE_KEY` (anon key) is stored in env vars. No service role key anywhere in frontend code.

**Why:** The Supabase anon key is safe to expose; it is rate-limited and RLS determines what it can do. Granting `INSERT` on `contact_messages` to `anon` with no `SELECT`/`UPDATE`/`DELETE` policy means a malicious actor can only insert rows they will never be able to read back. Data exfiltration is not possible.

**Alternative considered:** Route submissions through a Cloudflare Worker that holds the service role key. This is the correct V2 architecture but adds an entire new deployment unit and per-request compute cost that is unnecessary for V1 contact volume.

---

### 3. Env var naming: `VITE_SUPABASE_PUBLISHABLE_KEY` not `VITE_SUPABASE_ANON_KEY`

**Decision:** Use `VITE_SUPABASE_PUBLISHABLE_KEY`.

**Why:** Supabase recently rebranded this key as "publishable" to reduce the confusion that causes developers to accidentally commit the service role ("secret") key. Using the new canonical name reinforces the correct mental model and aligns with Supabase dashboard labels.

---

### 4. Client singleton in `src/lib/supabaseClient.ts`

**Decision:** Create the client once at module load; export it as a singleton. Guard with a runtime check that warns loudly if env vars are absent.

**Why:** Supabase client holds a connection pool and auth state internally. Creating it per-request would waste resources and break session continuity (irrelevant in V1, but good practice). A module-level singleton is idiomatic for JS SDKs.

---

### 5. SQL DDL in `docs/supabase/contact-backend.sql`, not applied automatically

**Decision:** The SQL file is documentation only. The developer runs it manually in the Supabase SQL editor or applies it via migration tooling.

**Why:** V1 does not include a migration runner. Adding one (e.g., `supabase-js` migrations, Flyway) would be scope creep. The file serves as both the source of truth and a runbook for setting up a new Supabase project.

---

### 6. `source` column defaults to `'website'`

**Decision:** The `contact_messages` table includes a `source text default 'website'` column.

**Why:** Future booking widget, social link, or email CTA may submit to the same table. The source column lets Martin filter submissions by origin without a schema change.

## Risks / Trade-offs

| Risk                                               | Mitigation                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Anon key visible in browser network tab            | Expected and safe when RLS is correct. Document this clearly in `.env.example`.                                    |
| RLS misconfiguration grants unintended read access | SQL DDL in `docs/` explicitly grants only `INSERT` to `anon`. Developer must apply it exactly.                     |
| Supabase free-tier limits (500 MB DB, 2 GB egress) | Contact form volume on a portfolio site is trivially low. Not a practical risk.                                    |
| Env vars not set in Cloudflare dashboard           | Client init guard shows a user-visible error; no silent failure. README and `.env.example` document required vars. |
| `@supabase/supabase-js` bundle size (~40 kB gz)    | Acceptable for a portfolio site. Tree-shaking keeps unused modules out.                                            |

## Migration Plan

**V1 deploy steps:**

1. Create Supabase project (free tier).
2. Run `docs/supabase/contact-backend.sql` in Supabase SQL editor.
3. Copy `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` from Supabase dashboard → Settings → API.
4. Add both vars to Cloudflare Workers environment (dashboard or `wrangler secret put`).
5. `npm run deploy` — no other changes required.

**Rollback:** Delete both env vars from Cloudflare dashboard. The contact form will display a configuration error but the rest of the site is unaffected.

Future migration paths (V2 server-side proxy, V3 auth/admin, V4 payments) are documented in `docs/backend-roadmap.md`. They are not part of this change and must not be implemented now.

## Open Questions

- Should a `phone` field be present on the Contact form in V1, or remain optional/hidden? (It is in the DB schema but can be omitted from the UI form.)
- Does Martin want a `subject` dropdown (e.g. "Booking", "Workshop enquiry", "General") or a free-text subject field? Default: free-text optional field matching existing placeholder.
