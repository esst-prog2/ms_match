## Purpose

Defines how a chosen outfit is shown on the model photo: where each piece sits on the body, how a self-shot photo of a piece is blended so its plain background does not show, and how placement is adjusted and remembered for each model photo.

## ADDED Requirements

### Requirement: Pieces are placed on the body

The application SHALL position each chosen piece over the part of the model it belongs to: the top over the torso, the bottom over the legs, the shoes at the feet, and the extra beside the head. A slot with no chosen piece SHALL show nothing.

#### Scenario: A full outfit is shown on the model

- **WHEN** a top, a bottom, a pair of shoes and an extra are chosen
- **THEN** four pieces are visible on the model, each over its own region of the body, and none of them sits in a corner of the stage

#### Scenario: An empty slot shows nothing

- **WHEN** no shoes are chosen
- **THEN** no shoe image is visible on the model, and the remaining pieces stay where they are

### Requirement: A dress hides the bottom slot

When the chosen top is a full-length piece, the application SHALL leave the bottom slot empty and SHALL NOT display a bottom piece on the model.

#### Scenario: Choosing a dress clears the bottom

- **WHEN** a piece marked as full-length is chosen as the top while a bottom piece is already chosen
- **THEN** no bottom piece is displayed on the model, and the bottom slot is shown as inactive

### Requirement: The plain background of a piece does not show

The application SHALL composite each piece onto the model so that a light, plain photographic background reads as transparent, without requiring the user to cut the piece out beforehand.

#### Scenario: A piece photographed on a white background

- **WHEN** a piece whose photo has a plain white background is displayed on the model
- **THEN** the piece is visible and the white area around it does not appear as an opaque rectangle

### Requirement: Placement can be adjusted per model photo

The application SHALL let the user move and resize a piece on the model, and SHALL store the resulting position and scale for each slot separately for each model photo.

#### Scenario: Adjusting a piece on an uploaded photo

- **WHEN** the user drags the top piece to a new position on an uploaded model photo
- **THEN** the piece follows the drag and stays where it was released

#### Scenario: Two model photos keep separate placement

- **WHEN** the user adjusts a piece on one model photo and then switches to a different model photo
- **THEN** the second model photo shows its own placement, unaffected by the adjustment made to the first

### Requirement: Adjusted placement survives a reload

Placement stored for a model photo SHALL still apply after the browser is closed and the application is opened again.

#### Scenario: Placement is restored

- **WHEN** the user adjusts a piece, reloads the page and selects the same model photo
- **THEN** the piece appears in the adjusted position, not in its default position

### Requirement: Built-in models work without adjustment

Every model photo SHALL have a default placement for each slot, so that an outfit is displayed sensibly before the user has adjusted anything.

#### Scenario: A newly uploaded photo is usable immediately

- **WHEN** the user uploads a model photo and chooses an outfit without adjusting placement
- **THEN** each piece is displayed over its intended region of the body using the default placement
