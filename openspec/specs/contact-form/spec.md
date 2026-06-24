# contact-form Specification

## Purpose

TBD - created by archiving change ux-modernisation. Update Purpose after archive.

## Requirements

### Requirement: Contact Form User Flow

The Contact page SHALL collect contact submissions through a three-step form
while continuing to submit the same `ContactMessageInput` shape to the existing
Supabase contact service.

#### Scenario: Step one collects identity

- **WHEN** a visitor opens `/contact`
- **THEN** the form first asks for name and email
- **AND** invalid or missing values are shown inline before the visitor can
  continue

#### Scenario: Step two collects inquiry type

- **WHEN** step one is valid and the visitor continues
- **THEN** the form asks for an inquiry type from Commission, Collaboration,
  Documentation, or Repair or technical question
- **AND** the selected inquiry type is submitted as the existing `subject` field

#### Scenario: Step three submits message

- **WHEN** step two is valid and the visitor continues
- **THEN** the form asks for an optional phone number and required message
- **AND** submitting a valid form calls the existing contact service without
  changing the Supabase table schema

#### Scenario: Step indicator shows progress

- **WHEN** a visitor moves through the form
- **THEN** a visible three-step progress indicator reflects the current step
