## 1. Dependencies and Environment

- [x] 1.1 Install `@supabase/supabase-js` as a runtime dependency
- [x] 1.2 Create `.env.example` with `VITE_SUPABASE_URL=` and `VITE_SUPABASE_PUBLISHABLE_KEY=`, safety comments, and "never put secret keys here" warning

## 2. Supabase Client

- [x] 2.1 Create `src/lib/supabaseClient.ts` — initialise singleton `SupabaseClient` from env vars, log a console warning if either var is missing

## 3. Contact Service Layer

- [x] 3.1 Create `src/services/contact/types.ts` — export `ContactMessageInput` and `ContactSubmitResult` types
- [x] 3.2 Create `src/services/contact/providers/supabaseContactProvider.ts` — `submitViaSupabase` function that inserts to `contact_messages` and returns `ContactSubmitResult`
- [x] 3.3 Create `src/services/contact/contactService.ts` — `submitContact` function delegating to `supabaseContactProvider`, wrapping errors in `ContactSubmitResult`

## 4. Contact Page Form

- [x] 4.1 Rewrite `src/pages/Contact.tsx` with a functional form (name, email, phone, subject, message fields)
- [x] 4.2 Add client-side validation: required fields `name`, `email`, `message`; inline error messages per field
- [x] 4.3 Add form submission handler: loading state (button disabled + indicator), success state (clear/hide form, show message), error state (show message, re-enable button)
- [x] 4.4 Ensure all styling uses existing CSS custom properties and Tailwind utility classes — no new design tokens

## 5. Database Documentation

- [x] 5.1 Create `docs/supabase/contact-backend.sql` with `CREATE TABLE public.contact_messages`, `ALTER TABLE ENABLE ROW LEVEL SECURITY`, and insert-only `CREATE POLICY` for `anon`
- [x] 5.2 Create `docs/backend-roadmap.md` with V1–V4 staged migration plan, V1 marked active, V2–V4 documented only

## 6. Verification

- [x] 6.1 Run `npm run build` — confirm it passes with no TypeScript errors
- [x] 6.2 Run `npm run test` — confirm existing tests still pass (contact form tests may need updating if snapshot-based)
- [x] 6.3 Confirm no Cloudflare Functions, auth, storage, or payment code was introduced
- [x] 6.4 Confirm unrelated pages (Home, About, Projects, Workshops, Events, Gallery, Videos) are unchanged
