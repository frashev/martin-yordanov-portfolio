## Why

The contact page currently has no working submission path — users cannot reach Nikoleta. A lightweight Supabase direct-insert integration provides a real backend for contact and booking requests without adding server infrastructure, auth, or payments in V1.

## What Changes

- Install `@supabase/supabase-js` (only new backend dependency in V1).
- Add `src/lib/supabaseClient.ts` — typed client reading `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- Add `src/services/contact/types.ts` — `ContactMessageInput` and `ContactSubmitResult` types.
- Add `src/services/contact/contactService.ts` — provider-agnostic submit function.
- Add `src/services/contact/providers/supabaseContactProvider.ts` — Supabase insert implementation.
- Update the Contact page to submit through the contact service with loading, success, and error states plus client-side validation.
- Add `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` and safety comments.
- Add `docs/supabase/contact-backend.sql` — DDL for `public.contact_messages` with RLS (insert-only for anon).
- Add `docs/backend-roadmap.md` — V1–V4 staged migration plan (documentation only).

## Capabilities

### New Capabilities

- `contact-backend`: Typed contact service layer with a Supabase provider that inserts submissions into `public.contact_messages`. Covers client init, provider pattern, form validation, loading/success/error states, and RLS-enforced insert-only policy. No server-side secrets in V1.
- `backend-docs`: SQL schema file and staged roadmap document covering V1 (direct insert) through V4 (payments), for future reference only.

### Modified Capabilities

- `site-pages`: Contact page gains a working form submission path (loading, success, error states) and client-side validation. Visual design remains consistent; no other pages change.

## Impact

- **New dependency**: `@supabase/supabase-js`.
- **New files**: `src/lib/supabaseClient.ts`, `src/services/contact/` (3 files), `.env.example`, `docs/supabase/contact-backend.sql`, `docs/backend-roadmap.md`.
- **Modified files**: `src/pages/Contact.tsx` (form behavior only), `package.json`, possibly `tsconfig` if `docs/` needs exclusion.
- **No changes** to routing, Header, Footer, Home, About, Projects, Workshops, Events, Gallery, Videos, or any other page.
- **Deployment**: Cloudflare Workers static-assets deploy unchanged. Env vars must be set in Cloudflare dashboard for production.
- **Security**: RLS enforces insert-only for `anon` role. No service role key or secret key anywhere in frontend code.
