## Purpose

Defines how a chosen outfit is presented next to the model photo: where each piece is placed around her, how a piece is framed and labelled, and which slot is left empty when the outfit does not fill it.

## Requirements

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

### Requirement: A dress hides the bottom slot

When the chosen top is a full-length piece, the application SHALL leave the bottom slot empty and SHALL NOT display a bottom piece on the model.

#### Scenario: Choosing a dress clears the bottom

- **WHEN** a piece marked as full-length is chosen as the top while a bottom piece is already chosen
- **THEN** no bottom piece is displayed on the model, and the bottom slot is shown as inactive

### Requirement: A piece's name is shown as text

The application SHALL display every name the user typed exactly as text wherever it appears, and SHALL NOT interpret any part of it as markup or code.

#### Scenario: A name that looks like a tag

- **WHEN** a piece named `<img src=x onerror=alert(1)>` is added
- **THEN** the closet shows those characters as its name, and no image element or script is created from it

### Requirement: The board works from the keyboard

Every element that acts when clicked, including closet cards, saved looks, model photos, suggested pieces and calendar days, SHALL be reachable with the Tab key, SHALL act on Enter or Space, and SHALL show a visible focus indicator.

#### Scenario: Choosing a piece without a mouse

- **WHEN** the user tabs to a closet card and presses Enter
- **THEN** the piece is put on the board exactly as a click would
