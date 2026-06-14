## ADDED Requirements

### Requirement: TextField component exists

The system SHALL provide a `TextField` React component in `src/components/TextField.tsx` that renders a labeled input or textarea with optional required-marker, optional-marker, error message, and disabled state. The component SHALL forward its rendered control's id to the wrapping label's `htmlFor`, and SHALL accept the standard React change handler signature.

#### Scenario: Component is importable

- **WHEN** a developer imports `TextField` from `src/components/TextField.tsx`
- **THEN** TypeScript accepts the import without errors

### Requirement: TextField supports single-line and multi-line inputs

The `TextField` component SHALL render a single-line `<input type="text">` (or the requested type) by default, and a multi-line `<textarea>` when the `multiline` prop is true. Both variants SHALL share the same label, error, focus-ring, and disabled styling.

#### Scenario: Default renders an input

- **WHEN** a developer renders `<TextField label="Name" />`
- **THEN** the DOM contains an `<input>` element with the matching `id` and `htmlFor` binding

#### Scenario: Multiline renders a textarea

- **WHEN** a developer renders `<TextField multiline label="Message" />`
- **THEN** the DOM contains a `<textarea>` element with the matching `id` and `htmlFor` binding

### Requirement: TextField links errors to the control via aria

When the `error` prop is a non-empty string, the `TextField` component SHALL set `aria-invalid="true"` on the rendered control and `aria-describedby` pointing to a wrapping element with `id` matching `${id}-error`. The error text itself SHALL be rendered with that id so screen readers announce the message when the field is focused.

#### Scenario: Empty fields show aria-invalid and describedby

- **WHEN** a `<TextField id="email" error="Email is required." />` is rendered
- **THEN** the input has `aria-invalid="true"`
- **AND** the input has `aria-describedby="email-error"`
- **AND** the visible error text is in an element with `id="email-error"`

#### Scenario: No error means no invalid attribute

- **WHEN** a `<TextField id="email" />` is rendered with no `error` prop
- **THEN** the input does not have an `aria-invalid` attribute
- **AND** the input does not have an `aria-describedby` attribute

### Requirement: TextField renders required or optional markers

The `TextField` component SHALL render a `*` (terracotta accent color) next to the label when `required` is true, and SHALL render `(optional)` (muted color) when `optional` is true. When neither is set, no marker SHALL be rendered.

#### Scenario: Required field shows asterisk

- **WHEN** a `<TextField label="Name" required />` is rendered
- **THEN** the label text is followed by a `*` styled in the accent color

#### Scenario: Optional field shows the word optional

- **WHEN** a `<TextField label="Phone" optional />` is rendered
- **THEN** the label text is followed by `(optional)` in the muted ink color

### Requirement: TextField has a visible focus ring

When the rendered input or textarea receives keyboard focus, it SHALL display a focus ring matching the warm palette — a 2px outline in the accent color, with 2px offset, identical to the existing lightbox close-button focus state.

#### Scenario: Focused field shows accent focus ring

- **WHEN** a user tabs to a rendered `TextField` control
- **THEN** the visible focus ring is the accent color, 2px wide, with 2px offset
