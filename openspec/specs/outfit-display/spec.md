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

### Requirement: A second, painterly look

The application SHALL offer a second page, `renaissance/index.html`, that runs the same closet, forecast, Match me, saved looks and calendar as the original page and shares their stored data, but presents the board in gilt frames on a gallery wall: the model photo in a carved gold frame and each chosen piece as a small framed study with its name below the photo. The original page SHALL keep its polaroid look unchanged.

#### Scenario: Both looks show the same outfit data

- **WHEN** a look is saved on `renaissance/index.html` and the original `index.html` is opened in the same browser
- **THEN** the original page lists the same saved look

#### Scenario: A piece in a frame carries its name

- **WHEN** a piece named "black jeans" is chosen on the renaissance page
- **THEN** it is shown in a gold frame around the model with the text "black jeans" below its photo

### Requirement: Painted women as models

The model picker on the renaissance page SHALL offer five women from public-domain paintings (Botticelli's Flora, Leonardo's Lady with an Ermine, Bronzino's Eleonora di Toledo, Gainsborough's Mrs Graham, Sargent's Madame X) in place of the built-in photos, followed by any photo the user uploaded. Flora SHALL be shown when no painted or uploaded model has been chosen. The original page SHALL keep its own built-in photos.

#### Scenario: A returning user who had chosen a photo model

- **WHEN** the stored model is one of the built-in photos and the renaissance page is opened
- **THEN** Flora is shown in the frame and is marked as chosen in the picker

#### Scenario: Choosing a painted model

- **WHEN** the user chooses Eleonora and reloads the renaissance page
- **THEN** Eleonora is still in the frame, and the original page still lists only its five photos

### Requirement: The atelier fits one desktop screen

On a desktop screen at least 961 pixels wide and 600 pixels tall, the renaissance page SHALL show the forecast, the framed model with its four pieces, the "also works today" pieces, Match me, the four chosen pieces and the save / wear buttons together on one screen below the top bar, once the Atelier link is followed.

#### Scenario: A laptop screen

- **WHEN** the page is 1536 × 760 pixels and the user clicks Atelier and then Match me
- **THEN** the bottom of the framed model, the last "also works today" piece and the Wear it today button are all inside the window

### Requirement: One piece can be spun again

On the renaissance page, each chosen piece SHALL offer a way to spin only that piece again. The new piece SHALL be from the same category, SHALL differ from the current one, and SHALL be the one whose warmth is closest to the day's need, rain-proof when rain is forecast and such a piece exists. A piece spun away SHALL NOT come back in that slot until the next Match me, unless every other piece of that category has been spun away too. A dress chosen as the top SHALL empty the bottom slot.

#### Scenario: Only the shoes change

- **WHEN** a full look is shown and the user re-spins the shoes
- **THEN** the shoes change to another pair and the top, bottom and extra stay the same

#### Scenario: A piece in the laundry stays away

- **WHEN** the closet holds three pairs of shoes and the user re-spins the shoes twice
- **THEN** the three pairs shown are all different

### Requirement: "Also works today" spins with Match me

On the renaissance page, while Match me spins, the "also works today" pieces SHALL flick through the closet as well, and SHALL settle on the day's suggestions when the outfit lands.

#### Scenario: Pressing Match me

- **WHEN** the user presses Match me
- **THEN** the "also works today" photos change several times during the spin and show the day's suggestions once the look is chosen

### Requirement: A daily fashion quote

The renaissance page SHALL show one fashion quote under the forecast column, with its author on its own line below it. The quote SHALL stay the same for a whole day and change on the next day, and SHALL fit in at most two lines on a desktop screen.

#### Scenario: Same day, same quote

- **WHEN** the page is reloaded later on the same day
- **THEN** the same quote and author are shown

#### Scenario: Next day, next quote

- **WHEN** the page is opened on the following day
- **THEN** a different quote is shown
