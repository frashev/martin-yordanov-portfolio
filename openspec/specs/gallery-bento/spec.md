# gallery-bento Specification

## Purpose

TBD - created by archiving change ux-modernisation. Update Purpose after archive.

## Requirements

### Requirement: Gallery Bento Grid

The Gallery page SHALL use an asymmetric CSS Grid (bento) layout while
preserving explicit media dimensions to avoid layout shift. The layout SHALL
tessellate without a trailing empty cell for the standard image count.

#### Scenario: First card anchors the grid as a larger block

- **WHEN** the Gallery page is viewed at the medium breakpoint or wider
- **THEN** the first gallery card spans two grid columns and two grid rows
- **AND** the remaining cards fill around it with no empty gap in the grid

#### Scenario: Gallery images keep explicit dimensions

- **WHEN** gallery images render in the bento grid
- **THEN** each image wrapper has an explicit aspect ratio
- **AND** the layout does not depend on image load timing for dimensions
