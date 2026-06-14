# Backend Roadmap

This document describes the planned backend evolution for nikoleta-kaito.com.
V1 is active. V2, V3, and V4 are documented only — they must not be implemented
until explicitly decided.

---

## V1 — Active now

**Supabase direct insert for contact and booking submissions.**

- Frontend inserts directly into the `contact_messages` Supabase table.
- Uses the publishable (anon) key only — safe to include in browser bundles.
- Row Level Security enforces insert-only access for anonymous users.
- No public read, update, or delete access.
- No server-side secrets in frontend code.
- No user accounts, auth, payments, or media storage.
- Best fit for a lightweight portfolio site at current traffic.

Setup: run `docs/supabase/contact-backend.sql` in the Supabase SQL editor,
then add `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to your
Cloudflare Workers environment.

---

## V2 — Future: secure server-side proxy

**Add Cloudflare Pages Functions to handle contact submissions server-side.**

When to consider: spam volume increases, email notifications are needed,
or additional server-side validation is required.

- Add `functions/api/contact.ts` (Cloudflare Pages Function).
- The Function validates input, applies anti-spam checks (e.g. Turnstile),
  and writes to Supabase using the service role key.
- The frontend calls `/api/contact` instead of inserting directly.
- The Supabase `anon` insert policy is revoked; only the service role key
  (held server-side) can write.
- The `contactService.ts` provider is swapped to a `workerContactProvider`
  that POSTs to `/api/contact` — the Contact page UI requires no changes.
- Service role key is stored as a Cloudflare Worker secret, never in the
  browser bundle.

---

## V3 — Future: users, admin, and media

**Add Supabase Auth, admin pages, and dynamic media handling.**

When to consider: Nikoleta needs to edit content herself, manage bookings,
or publish a dynamic gallery.

- Add Supabase Auth for admin login (magic link or OAuth).
- Design RLS policies for admin-only read/update access before building UI.
- Add admin-only pages hidden behind auth guards.
- Make projects, events, and workshops editable from Supabase (requires
  migrating those content files to DB tables).
- Add Supabase Storage or Cloudinary for gallery images.
- Do not store large videos in Supabase Storage — prefer YouTube, Vimeo,
  or a dedicated video platform and embed.

---

## V4 — Future: payments

**Add payment processing for workshops, private lessons, or merchandise.**

When to consider: payment requirements are clear and tested on V3.

- Add Cloudflare Pages Functions or Supabase Edge Functions for payment
  endpoints — never expose payment secret keys in frontend code.
- Use Stripe Checkout or a similar provider.
- Create checkout sessions server-side; use webhooks to write payment
  status to Supabase.
- Add `bookings` and `payments` tables only once payment requirements
  are fully specified.
- Stripe secret keys (`sk_live_*`, `sk_test_*`) are stored as server-side
  secrets only, never in Vite environment variables.
