## MODIFIED Requirements

### Requirement: Lightbox is accessible

The overlay SHALL follow accessible modal (dialog) conventions.

#### Scenario: Focus moves to close button on open

- **WHEN** the lightbox opens
- **THEN** keyboard focus moves to the close (×) button

#### Scenario: Focus returns to trigger on close

- **WHEN** the lightbox closes
- **THEN** keyboard focus returns to the gallery item that opened it

#### Scenario: Overlay has correct ARIA attributes

- **WHEN** the lightbox is open
- **THEN** the overlay element has `role="dialog"` and `aria-modal="true"` and a visible or sr-only label

#### Scenario: Lightbox announces its caption via aria-labelledby

- **WHEN** the lightbox is open with a caption of "Performance on stage"
- **THEN** the dialog element has `aria-labelledby` pointing to an element containing the text "Performance on stage"
- **AND** assistive technology announces the dialog with that name

#### Scenario: Lightbox without a caption uses a generic name

- **WHEN** the lightbox is open with no caption, or with a caption that is empty or whitespace-only
- **THEN** the dialog element has `aria-labelledby` pointing to an element containing the text "Photo"
