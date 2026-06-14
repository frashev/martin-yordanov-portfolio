## ADDED Requirements

### Requirement: Build command and output directory are stable

The project SHALL produce its deployable static site via `npm run build`, emitting the output to `dist/` at the repository root. The build command and the output directory SHALL NOT change without updating the deployment documentation.

#### Scenario: Build emits to dist

- **WHEN** a developer runs `npm run build` from a clean working tree
- **THEN** the command exits with code 0
- **AND** the `dist/` directory exists at the repository root
- **AND** `dist/index.html` and `dist/assets/` are present

### Requirement: SPA fallback file is emitted to dist

The build SHALL copy `public/_redirects` to `dist/_redirects` unchanged, so static hosts that honor the `_redirects` convention (including Cloudflare Pages) serve the SPA shell for any path.

#### Scenario: \_redirects is in the build output

- **WHEN** `npm run build` completes
- **THEN** `dist/_redirects` exists
- **AND** its contents include a rule rewriting `/*` to `/index.html` with status 200

### Requirement: README documents Cloudflare Pages configuration

The repository's `README.md` SHALL include a "Deploying to Cloudflare Pages" section that documents at minimum: the build command (`npm run build`), the build output directory (`dist`), and the role of `public/_redirects` for SPA routing.

#### Scenario: README lists the build command and output directory

- **WHEN** a reader opens `README.md`
- **THEN** they can find both the literal string `npm run build` as the build command and `dist` as the output directory in the deployment section

#### Scenario: README references the SPA fallback file

- **WHEN** a reader opens the deployment section in `README.md`
- **THEN** they can find a reference to `public/_redirects` and an explanation that it makes SPA deep links resolve to `index.html`
