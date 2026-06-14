## ADDED Requirements

### Requirement: Videos page renders responsive iframes when embed URLs are provided

When a Video entry has an `embedUrl` value, the Videos page SHALL render a 16:9 responsive iframe embed in place of the placeholder.

#### Scenario: Embed URL renders iframe

- **WHEN** a Video entry has an embedUrl value
- **THEN** the video card renders a responsive 16:9 iframe with that URL

#### Scenario: iframe maintains aspect ratio at all widths

- **WHEN** the browser window is resized
- **THEN** the iframe maintains a 16:9 aspect ratio without horizontal overflow

#### Scenario: iframe has loading="lazy"

- **WHEN** a video card is inspected
- **THEN** the iframe element has `loading="lazy"` set

---

### Requirement: Videos page shows a polished placeholder when no embed URL is set

When a Video entry has no `embedUrl`, the card SHALL render a polished "coming soon" state using the existing placeholder component.

#### Scenario: Missing embedUrl renders placeholder

- **WHEN** a Video entry has no embedUrl
- **THEN** the card renders the PlaceholderImage with aspect="video" and a "Video coming soon" indicator

#### Scenario: Adding embedUrl activates the embed without layout change

- **WHEN** a Video entry gains an embedUrl value
- **THEN** the placeholder is replaced by the iframe with no change to surrounding card layout
