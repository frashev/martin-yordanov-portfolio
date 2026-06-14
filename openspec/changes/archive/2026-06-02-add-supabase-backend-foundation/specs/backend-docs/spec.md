## ADDED Requirements

### Requirement: SQL DDL documentation for contact_messages

The repository SHALL contain `docs/supabase/contact-backend.sql` with runnable SQL that creates the `public.contact_messages` table, enables RLS, and applies the insert-only anon policy as specified in the contact-backend capability.

#### Scenario: SQL file is present and complete

- **WHEN** a developer opens `docs/supabase/contact-backend.sql`
- **THEN** it contains `CREATE TABLE`, `ALTER TABLE ENABLE ROW LEVEL SECURITY`, and `CREATE POLICY` statements matching the contact-backend schema spec

### Requirement: Backend roadmap document

The repository SHALL contain `docs/backend-roadmap.md` documenting four clearly labelled stages:

- **V1 — Active now**: Supabase direct insert, publishable key + RLS, no auth/payments/storage.
- **V2 — Future secure backend layer**: Cloudflare Pages Functions, server-side secrets, `/api/contact` endpoint, same contact service interface.
- **V3 — Future users, admin, and media**: Supabase Auth, admin pages behind RLS, Supabase Storage or Cloudinary for gallery, external video platform for large video files.
- **V4 — Future payments**: Cloudflare Pages Functions or Supabase Edge Functions for payment endpoints, Stripe Checkout, server-side secret handling, webhooks.

The document SHALL note that V2–V4 are documented only and not activated.

#### Scenario: Roadmap file is present with all four stages

- **WHEN** a developer opens `docs/backend-roadmap.md`
- **THEN** sections for V1, V2, V3, and V4 are all present with descriptions of each stage's scope and migration approach

#### Scenario: V1 is marked active

- **WHEN** a developer reads `docs/backend-roadmap.md`
- **THEN** V1 is clearly identified as the currently active stage
- **AND** V2–V4 are clearly identified as future/not yet activated
