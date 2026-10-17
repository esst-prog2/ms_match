## ADDED Requirements

### Requirement: My own data is not deleted without asking

Resetting the demo closet or clearing all saved looks SHALL ask for confirmation before deleting any piece, look or calendar day the user created, and SHALL change nothing if the user declines.

#### Scenario: Declining the reset

- **WHEN** the closet holds pieces the user added and the user chooses reset demo closet, then declines the question
- **THEN** every piece the user added is still in the closet

### Requirement: A look or a worn day is never lost in silence

When the browser refuses to store a saved look or the record of a worn day, the application SHALL tell the user that it was not saved, and SHALL NOT keep the look in the saved list as though it had been stored.

#### Scenario: Storage is full when saving a look

- **WHEN** the user saves a look and the browser rejects the write
- **THEN** a message explains that storage is full
- **AND** the saved looks list is the same as before the attempt

### Requirement: An unreadable photo is reported

When the chosen file cannot be read as an image, the application SHALL say so and SHALL NOT add a piece or a model photo.

#### Scenario: A file that is not a photo

- **WHEN** the user adds a piece with a file the browser cannot decode as an image
- **THEN** a message says the file could not be read as a photo, and the closet is unchanged
