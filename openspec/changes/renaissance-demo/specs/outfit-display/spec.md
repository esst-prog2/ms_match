## ADDED Requirements

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
