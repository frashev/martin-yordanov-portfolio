# deployment Specification

## Purpose

Defines how the site is built and deployed to Cloudflare Workers as a static-asset Worker. Wrangler and `wrangler.toml` handle deployment configuration; SPA deep-link routing is handled natively by the Workers runtime via `not_found_handling = "single-page-application"` — no `_redirects` file is required.

## Requirements

### Requirement: Build command and output directory are stable

The project SHALL produce its deployable static site via `npm run build`, emitting the output to `dist/` at the repository root. The build command and the output directory SHALL NOT change without updating the deployment documentation.

#### Scenario: Build emits to dist

- **WHEN** a developer runs `npm run build` from a clean working tree
- **THEN** the command exits with code 0
- **AND** the `dist/` directory exists at the repository root
- **AND** `dist/index.html` and `dist/assets/` are present

### Requirement: Deployment is via Cloudflare Workers static assets

The site SHALL be deployed as a Cloudflare Workers static-asset Worker configured in `wrangler.toml`. The Worker name SHALL be `martin-yordanov-portfolio`, the assets directory SHALL be `./dist`, and `not_found_handling` SHALL be set to `single-page-application` so all unmatched paths serve `index.html`.

#### Scenario: wrangler.toml is present and correct

- **WHEN** a developer opens `wrangler.toml`
- **THEN** the file specifies `name = "martin-yordanov-portfolio"`, `directory = "./dist"`, and `not_found_handling = "single-page-application"`

#### Scenario: Deploy command succeeds

- **WHEN** a developer runs `npm run deploy` (which runs `npm run build && wrangler deploy`)
- **THEN** the build completes and assets are uploaded to Cloudflare Workers without errors

### Requirement: README documents the deployment workflow

The repository's `README.md` SHALL include a deployment section that documents at minimum: the `npm run deploy` command, the requirement for `wrangler login`, and the role of `wrangler.toml`.

#### Scenario: README covers deployment

- **WHEN** a reader opens `README.md`
- **THEN** they can find the `npm run deploy` command and a reference to `wrangler.toml` in the deployment section
