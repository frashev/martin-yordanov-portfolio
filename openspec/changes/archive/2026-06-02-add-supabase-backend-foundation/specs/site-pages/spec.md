## MODIFIED Requirements

### Requirement: Contact page exposes a working contact form

The Contact page SHALL render a functional HTML form with the following fields:

- `name` (text, required)
- `email` (email, required)
- `phone` (text, optional)
- `subject` (text, optional)
- `message` (textarea, required)

On submit the page SHALL perform client-side validation. If any required field is empty, the page SHALL display an inline error adjacent to the offending field without submitting to the backend. If validation passes, the page SHALL call `submitContact` from `src/services/contact/contactService.ts` and display one of three states:

- **Submitting**: A loading indicator replaces the submit button; the form is not re-submittable.
- **Success**: A success message is shown and the form is cleared or hidden.
- **Error**: A user-readable error message is shown; the submit button is re-enabled.

All styling SHALL remain consistent with the existing site visual theme (CSS custom properties, Tailwind utility classes). No external form service SHALL be used.

#### Scenario: Required field validation prevents submission

- **WHEN** the user submits the form with one or more required fields empty
- **THEN** an inline error message appears next to each empty required field
- **AND** no request is sent to Supabase

#### Scenario: Valid submission shows loading state

- **WHEN** the user submits the form with all required fields filled
- **THEN** the submit button is replaced by a loading indicator
- **AND** the form fields are disabled for the duration of the request

#### Scenario: Successful submission shows success message

- **WHEN** `submitContact` returns `{ ok: true }`
- **THEN** a success message is displayed to the user
- **AND** the form is cleared or hidden

#### Scenario: Failed submission shows error and re-enables form

- **WHEN** `submitContact` returns `{ ok: false }`
- **THEN** a user-readable error message is displayed
- **AND** the submit button is re-enabled so the user can try again

#### Scenario: Missing env vars show user-visible error

- **WHEN** `VITE_SUPABASE_URL` or `VITE_SUPABASE_PUBLISHABLE_KEY` is not set
- **THEN** the form submission returns an error state with a user-visible message (not a raw JS exception)

## REMOVED Requirements

### Requirement: Contact page exposes a placeholder contact path

**Reason**: Replaced by the working contact form with real submission path.
**Migration**: The Contact page now renders a functional form; the placeholder email/form region is no longer needed.
