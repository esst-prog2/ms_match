## ADDED Requirements

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
