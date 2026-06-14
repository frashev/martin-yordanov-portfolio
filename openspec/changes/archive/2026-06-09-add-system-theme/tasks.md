# Tasks — Add System theme mode

## 1. Exploration

- [x] 1.1 Confirm the current `useTheme` two-state model and the FOWT script in `index.html`
- [x] 1.2 Confirm `Header.test.tsx` assertions that depend on toggle behavior

## 2. Implementation

- [x] 2.1 `useTheme.ts`: introduce `ThemeChoice = "light" | "dark" | "system"`; persist the choice; expose `[choice, resolvedTheme, cycleTheme]`
- [x] 2.2 `useTheme.ts`: derive resolved theme in render + add a `matchMedia` `change` listener so System mode re-resolves live
- [x] 2.3 `Header.tsx`: cycle Light → Dark → System → Light; add a monitor icon; set `aria-label` to the next action
- [x] 2.4 `index.html`: update the FOWT inline script so `system`/absent both follow `prefers-color-scheme`

## 3. Verification

- [x] 3.1 `npm run build` and `npm run lint` pass
- [x] 3.2 Add + run `Header.test.tsx` (cycle) and `useTheme.test.tsx` (live-follow + pinned); `npm run test` passes (44)
- [x] 3.3 Runtime proof: cycled all three states in the browser (choice/attr/persist correct); on-load OS resolution verified for dark & light; live-follow proven by unit test (Playwright `emulateMedia` mutates `.matches` but does not dispatch `change`)
- [x] 3.4 `openspec validate add-system-theme --strict` passes

## 4. Cleanup

- [x] 4.1 Update `docs/project-memory.md` (mark system theme shipped)
- [ ] 4.2 Archive the change (`openspec archive add-system-theme`)
