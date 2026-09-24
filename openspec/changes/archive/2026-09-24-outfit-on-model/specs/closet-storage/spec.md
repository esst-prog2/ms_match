## Purpose

Defines how the closet, the uploaded model photos, the saved looks and the record of what was worn survive between visits, and what the application must do when the browser refuses to store more.

## ADDED Requirements

### Requirement: The closet survives a reload

Pieces added to the closet SHALL still be present, with their photo, category, warmth level and rain flag, after the browser is closed and the application is opened again.

#### Scenario: An added piece is still there

- **WHEN** the user adds a piece with a photo and then reloads the page
- **THEN** the piece appears in the closet with the same photo, category, warmth level and rain flag

### Requirement: A worn look stays on its day

When a look is marked as worn on a given day, the application SHALL keep that record against that day, and SHALL still show it after a reload.

#### Scenario: The calendar remembers

- **WHEN** a look is worn on a day and the page is reloaded
- **THEN** the calendar still shows that look on that day

### Requirement: A piece is never lost in silence

When the browser refuses to store a new piece or model photo because its storage quota is exhausted, the application SHALL tell the user that the photo could not be saved, and SHALL NOT leave the piece appearing as though it had been added.

#### Scenario: Storage is full when adding a piece

- **WHEN** the user adds a piece and the browser rejects the write because storage is full
- **THEN** a message explains that storage is full and the piece was not saved
- **AND** the closet after a reload contains exactly the pieces it contained before the attempt

#### Scenario: Storage is full when uploading a model photo

- **WHEN** the user uploads a model photo and the browser rejects the write because storage is full
- **THEN** a message explains that storage is full
- **AND** the application keeps working with the model photos it already had

### Requirement: The user can recover space

The application SHALL allow the user to remove pieces and saved looks, and removing them SHALL free the storage they occupied.

#### Scenario: Removing a piece frees space

- **WHEN** storage is full and the user removes several uploaded pieces
- **THEN** adding a new piece succeeds afterwards
