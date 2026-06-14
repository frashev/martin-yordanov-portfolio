## 1. TextField component

- [x] 1.1 Create [src/components/TextField.tsx](src/components/TextField.tsx) with the
      following props: `id`, `label`, `name`, `value`, `onChange`, `type`
      (default `"text"`), `multiline` (boolean, switches to `<textarea>`),
      `required` (boolean — renders a `*` next to the label), `optional`
      (boolean — renders `(optional)` next to the label), `disabled`,
      `error`, `autoComplete`, `rows` (textarea only)
- [x] 1.2 Render the input/textarea with `aria-invalid={!!error}` and
      `aria-describedby={error ? \`${id}-error\` : undefined}` so screen
      readers announce the error
- [x] 1.3 Apply a focus ring matching the existing lightbox close button
      (`outline: 2px solid var(--accent); outline-offset: 2px;`) on
      `:focus-visible`
- [x] 1.4 Style the error message with `id={\`${id}-error\`}` so the
      describedby binding works
- [x] 1.5 When `error` is present, switch the input border color to
      `var(--accent)` matching the existing pattern in
      [Contact.tsx:148-154](src/pages/Contact.tsx#L148-L154)

## 2. Refactor Contact form to use TextField

- [x] 2.1 Replace the Name input block
      ([Contact.tsx:131-161](src/pages/Contact.tsx#L131-L161)) with
      `<TextField>`
- [x] 2.2 Replace the Email input block
      ([Contact.tsx:164-194](src/pages/Contact.tsx#L164-L194)) with
      `<TextField type="email" autoComplete="email">`
- [x] 2.3 Replace the Phone input block
      ([Contact.tsx:197-226](src/pages/Contact.tsx#L197-L226)) with
      `<TextField type="tel" optional>`
- [x] 2.4 Replace the Subject input block
      ([Contact.tsx:229-257](src/pages/Contact.tsx#L229-L257)) with
      `<TextField optional>`
- [x] 2.5 Replace the Message textarea block
      ([Contact.tsx:260-290](src/pages/Contact.tsx#L260-L290)) with
      `<TextField multiline rows={5}>`
- [x] 2.6 Confirm `npm run build` passes after each replacement (or at the
      end of all five)

## 3. Contact form accessibility fixes

- [x] 3.1 **Submit button contrast** — in the submit button
      ([Contact.tsx:307-343](src/pages/Contact.tsx#L307-L343)), change
      `color: "var(--paper)"` to a fixed light text color (or a new
      `--accent-fg` token if you'd rather the value live in the design
      system). Match the existing pattern in
      [BookingCTA.tsx:28](src/components/BookingCTA.tsx#L28)
- [x] 3.2 **Spinner reduced-motion** — change `animate-spin` to
      `motion-safe:animate-spin` on the spinner SVG
      ([Contact.tsx:319](src/pages/Contact.tsx#L319)). Verify that under
      `prefers-reduced-motion: reduce`, the spinner is **static and visible**
      (a still ring, not absent) so the user still gets loading feedback
- [x] 3.3 **Status announcements** — wrap the success state
      ([Contact.tsx:69-103](src/pages/Contact.tsx#L69-L103)) and the error
      banner
      ([Contact.tsx:293-304](src/pages/Contact.tsx#L293-L304)) in a region
      with `role="status" aria-live="polite"`

## 4. Lightbox labelledby

- [x] 4.1 In [Lightbox.tsx](src/components/Lightbox.tsx), add a visually-hidden
      `<h2 id="lightbox-caption">{caption ?? "Photo"}</h2>` inside the
      dialog content
- [x] 4.2 Add `aria-labelledby="lightbox-caption"` to the
      `role="dialog"` element
- [x] 4.3 Verify the close button still receives focus on open (the existing
      behavior)

## 5. Theme toggle focus ring

- [x] 5.1 In [Header.tsx:80-93](src/components/Header.tsx#L80-L93), add
      `focus-visible:outline-none focus-visible:ring-2
focus-visible:ring-[color:var(--accent)]` to the theme toggle button
- [x] 5.2 Apply the same to the mobile menu toggle button
      ([Header.tsx:95-116](src/components/Header.tsx#L95-L116)) for
      consistency

## 6. Tests

- [x] 6.1 Create [src/**tests**/Contact.test.tsx](src/__tests__/Contact.test.tsx)
      covering: (a) empty submit shows the three required field errors;
      (b) invalid email shows the email error and not the name/message
      errors; (c) valid submit transitions to the success state; (d) when
      `submitContact` rejects, the error banner appears
- [x] 6.2 Mock the contact service in the test file — the test must not hit
      Supabase
- [x] 6.3 Create [src/**tests**/Events.test.tsx](src/__tests__/Events.test.tsx)
      with a mock date and assert that an event with `date="2099-01-01"`
      appears under Upcoming, an event with `date="1999-01-01"` appears
      under Past, and an event with `endDate` crossing the mock date appears
      under Upcoming
- [x] 6.4 Create [src/**tests**/PageMeta.test.tsx](src/__tests__/PageMeta.test.tsx)
      that renders `<PageMeta title="Hello" description="World" />` in a
      MemoryRouter and asserts `document.title === "Hello"`
- [x] 6.5 Create [src/**tests**/Lightbox.test.tsx](src/__tests__/Lightbox.test.tsx)
      that opens the lightbox, presses Escape, and asserts the lightbox
      unmounts and focus returns to the trigger

## 7. Spec updates

- [x] 7.1 Add a scenario to
      [openspec/specs/editorial-motion/spec.md](openspec/specs/editorial-motion/spec.md)
      under the appropriate requirement: "WHEN the user has
      `prefers-reduced-motion: reduce` AND the contact form is in the
      submitting state, THEN the loading indicator is rendered as a static
      visual (not hidden, not spinning)"
- [x] 7.2 Add a scenario to
      [openspec/specs/gallery-lightbox/spec.md](openspec/specs/gallery-lightbox/spec.md):
      "WHEN the lightbox is open, THEN it has an accessible name via
      `aria-labelledby` reflecting the current caption"
- [x] 7.3 Add a scenario to
      [openspec/specs/page-meta/spec.md](openspec/specs/page-meta/spec.md)
      under "Meta tags update correctly on client-side navigation":
      "WHEN a route first loads, THEN the document title is set during the
      initial render (not after a delayed useEffect), so screen readers and
      unfurlers do not see the static `index.html` title flash"

## 8. Verification

- [x] 8.1 `npm run build` — zero TypeScript errors
- [x] 8.2 `npm run lint` — zero ESLint warnings
- [x] 8.3 `npm run test` — all tests pass, including the four new files
- [x] 8.4 `npm run test:e2e` — existing smoke + motion specs pass; add one
      Playwright assertion confirming the contact form's submit button text
      passes axe-core's color-contrast check
- [x] 8.5 `npm run dev` and visit `/contact` in a browser with
      `prefers-reduced-motion: reduce` enabled — confirm the submit button
      text is readable in both light and dark mode, and the spinner is
      static during submission
- [x] 8.6 Open the lightbox on `/gallery` with a screen reader (or use the
      browser's accessibility inspector) — confirm the dialog announces its
      caption as its name
- [x] 8.7 Run `openspec validate --changes` — confirm all changed specs
      parse without errors

## 9. Post-review fixes (Codex review)

- [x] 9.1 **P2 — TextField forwarding native input attributes.** Refactor
      [src/components/TextField.tsx](src/components/TextField.tsx) so native
      props (`type`, `autoComplete`, `maxLength`, `inputMode`, …) flow
      through to the underlying `<input>` / `<textarea>`. Split the
      variant-typed render into `InputField` (for
      `InputVariantProps` → `<input>`) and `TextareaField` (for
      `TextareaVariantProps` → `<textarea>`) so the spread is element-typed,
      not a union
- [x] 9.2 **P3 — Lightbox blank-caption fallback.** Change the caption
      fallback in [src/components/Lightbox.tsx](src/components/Lightbox.tsx)
      from `caption ?? "Photo"` to `caption?.trim() || "Photo"` so empty
      and whitespace-only captions still produce a non-empty
      `aria-labelledby` target
- [x] 9.3 **Lightbox test coverage.** Add two test cases to
      [src/**tests**/Lightbox.test.tsx](src/__tests__/Lightbox.test.tsx):
      (a) `caption=""` falls back to `"Photo"`; (b) `caption="   "`
      (whitespace) falls back to `"Photo"`
