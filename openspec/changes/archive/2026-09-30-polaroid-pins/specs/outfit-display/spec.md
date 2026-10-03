## ADDED Requirements

### Requirement: Pieces are pinned around the model

The application SHALL show each chosen piece at a fixed position around the model photo rather than over the body: two above, two below, each slightly tilted, so that the model stays visible between them. A slot with no chosen piece SHALL show nothing.

#### Scenario: A full outfit is shown beside the model

- **WHEN** a top, a bottom, a pair of shoes and an extra are chosen
- **THEN** four pieces are visible around the model, none of them covering her face or torso

#### Scenario: An empty slot shows nothing

- **WHEN** no shoes are chosen
- **THEN** no shoe image is visible, and the remaining pieces stay where they are

#### Scenario: The piece keeps its own colour

- **WHEN** a piece is displayed
- **THEN** the photo is shown opaque, and nothing of the model behind it shows through it

### Requirement: Each piece is framed as a polaroid held by a pin

The application SHALL present every piece as a polaroid: the photo inside a white frame that is deeper along the bottom edge, with the piece's name written in that lower margin, and a pin holding the card in place.

#### Scenario: A piece carries its name

- **WHEN** a piece named "black jeans" is chosen
- **THEN** its card shows the photo above and the text "black jeans" in the wider margin below it

#### Scenario: Every card is pinned

- **WHEN** any piece is displayed
- **THEN** a pin is visible on the card, in the same place on each of them

## REMOVED Requirements

### Requirement: Pieces are placed on the body

**Reason**: Laying a flat photo over the body did not read as wearing the piece, and it hid the model. The pieces move back to fixed positions around her, covered by the new requirement "Pieces are pinned around the model".
**Migration**: None. Position was never data the user supplied; it is decided by the application.

### Requirement: The plain background of a piece does not show

**Reason**: The `multiply` blend that removed the background also drained the colour out of light garments, leaving them half transparent. With the pieces no longer over the body there is nothing for a background to clash with, so the blend is dropped and the photo is shown as it is.
**Migration**: None. Pieces already photographed against a white background keep working; that background is now simply part of the polaroid.

### Requirement: Placement can be adjusted per model photo

**Reason**: Adjusting only existed because a piece had to line up with a body in an arbitrary photo. Fixed positions around the model need no adjustment.
**Migration**: Placement saved under `msmatch.placement` is no longer read. The key can be left in the browser; it is ignored.

### Requirement: Adjusted placement survives a reload

**Reason**: There is no placement left to survive.
**Migration**: None.

### Requirement: Built-in models work without adjustment

**Reason**: Every model photo now works the same way, because no photo needs adjusting.
**Migration**: None.
