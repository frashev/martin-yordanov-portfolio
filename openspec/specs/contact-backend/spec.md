# contact-backend Specification

## Purpose

Defines the V1 contact and booking submission path. The frontend inserts directly into a Supabase table (`public.contact_messages`) using the anon key under a Row Level Security policy that permits insert-only for unauthenticated users. No server-side secret or backend runtime is required in V1.

## Requirements

### Requirement: Supabase client singleton

The application SHALL initialise a single Supabase client instance in `src/lib/supabaseClient.ts` using `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. If either variable is absent at runtime the module SHALL log a developer-readable warning to the console and export a client that will surface a user-visible error on first use.

#### Scenario: Client initialised with valid env vars

- **WHEN** both `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are set
- **THEN** `supabaseClient` is a valid `SupabaseClient` instance

#### Scenario: Missing env vars produce a warning

- **WHEN** either env var is absent at module load time
- **THEN** the module logs a console warning identifying which variable is missing
- **AND** the exported client is still a value (no thrown exception at module scope)

### Requirement: Contact service provider interface

The application SHALL provide `src/services/contact/types.ts` exporting:

- `ContactMessageInput` with required fields `name: string`, `email: string`, `message: string` and optional fields `phone?: string`, `subject?: string`, `source?: string`.
- `ContactSubmitResult` with fields `ok: boolean`, `provider: "supabase"`, and optional `message?: string`.

#### Scenario: Types are importable

- **WHEN** any module imports from `src/services/contact/types.ts`
- **THEN** both `ContactMessageInput` and `ContactSubmitResult` are available as TypeScript types

### Requirement: Contact service submit function

`src/services/contact/contactService.ts` SHALL export a single async function `submitContact(input: ContactMessageInput): Promise<ContactSubmitResult>` that delegates to the active provider and returns its result.

#### Scenario: Successful submission delegates to provider

- **WHEN** `submitContact` is called with a valid `ContactMessageInput`
- **THEN** it calls the Supabase provider and returns `{ ok: true, provider: "supabase" }`

#### Scenario: Provider error is surfaced

- **WHEN** the Supabase provider throws or returns an error
- **THEN** `submitContact` returns `{ ok: false, provider: "supabase", message: <error description> }`

### Requirement: Supabase contact provider inserts to contact_messages

`src/services/contact/providers/supabaseContactProvider.ts` SHALL export `submitViaSupabase(input: ContactMessageInput): Promise<ContactSubmitResult>`. It SHALL call `supabase.from('contact_messages').insert({...})` mapping `ContactMessageInput` fields to table columns. On success it SHALL return `{ ok: true, provider: "supabase" }`. On error it SHALL return `{ ok: false, provider: "supabase", message: error.message }`.

#### Scenario: Insert succeeds

- **WHEN** `submitViaSupabase` is called with valid input and Supabase insert returns no error
- **THEN** the function returns `{ ok: true, provider: "supabase" }`

#### Scenario: Insert fails

- **WHEN** Supabase returns an error object from the insert call
- **THEN** the function returns `{ ok: false, provider: "supabase", message: <Supabase error message> }`

### Requirement: Database schema — contact_messages

The Supabase project SHALL have a `public.contact_messages` table with the following schema:

- `id uuid PRIMARY KEY DEFAULT gen_random_uuid()`
- `created_at timestamptz NOT NULL DEFAULT now()`
- `name text NOT NULL`
- `email text NOT NULL`
- `phone text`
- `subject text`
- `message text NOT NULL`
- `source text NOT NULL DEFAULT 'website'`
- `is_read boolean NOT NULL DEFAULT false`

Row Level Security SHALL be enabled on the table. An insert-only policy SHALL grant `INSERT` to the `anon` role. No `SELECT`, `UPDATE`, or `DELETE` policies SHALL be granted to any public role.

#### Scenario: Anon can insert a row

- **WHEN** a request is made with the publishable anon key to insert a row with valid `name`, `email`, `message`
- **THEN** the insert succeeds and the row is persisted

#### Scenario: Anon cannot read rows

- **WHEN** a request is made with the publishable anon key to select from `contact_messages`
- **THEN** the query returns zero rows (RLS blocks the read)

#### Scenario: Anon cannot delete rows

- **WHEN** a request is made with the publishable anon key to delete from `contact_messages`
- **THEN** the delete is rejected by RLS

### Requirement: Environment variable safety

`.env.example` SHALL document `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` with inline comments stating these are frontend-safe only when RLS is correctly enabled. The file SHALL also include explicit warnings never to put service role keys, secret keys, or Stripe secret keys in Vite environment variables.

#### Scenario: .env.example is present

- **WHEN** a developer clones the repository
- **THEN** `.env.example` exists at the repository root with both variable names, safety comments, and the "never put secret keys here" warning
