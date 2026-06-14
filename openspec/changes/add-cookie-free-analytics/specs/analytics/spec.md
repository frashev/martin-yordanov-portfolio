## ADDED Requirements

### Requirement: Cookie-Free Page Analytics

The site SHALL load a cookie-free analytics provider only after the owner has
chosen a vendor and supplied the required site identifier.

#### Scenario: Analytics script loads globally

- **WHEN** a visitor opens any site route
- **THEN** the page includes the chosen analytics script with `defer`
- **AND** the script is configured for the owner-provided site identifier

#### Scenario: Cookie consent remains unnecessary

- **WHEN** the analytics provider is configured in cookie-free mode
- **THEN** the site does not add a cookie consent banner
- **AND** the analytics script does not intentionally set tracking cookies

#### Scenario: Dashboard receives traffic

- **WHEN** the deployed site receives a page load after analytics is configured
- **THEN** the chosen provider dashboard shows that page load
