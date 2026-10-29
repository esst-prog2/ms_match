## Why

Section 1 of the README still describes the first look of Ms. Match: polaroids, a handwritten "match!", a live run in front of a projector. In the two weeks without class I built a second look in `renaissance/`, because the first one never felt like mine: I love painting and this elegant, gallery-like style, and a page I like looking at is a page I keep using. That is the look I want to show on 1 or 8 December. The demo is now five minutes of screenshots instead of a live run, and the description has to be three to six sentences, so section 1 has to change before 7 November, the last point it can.

## What Changes

- README section 1 describes the demo on the renaissance look, in five sentences, as screenshots: the atelier on one screen with Botticelli's Flora as the model, Match me, re-spinning a single piece, the daily muse and the stylist's note, wearing the look and finding it in the calendar.
- The README says in its own words why there is a second look (a completely new appearance, chosen because it motivates me to keep using the app), next to what the look adds.
- README sections 3 and 4 and "Running it" mention the renaissance look where they only describe polaroids, so the brief stays true for both looks.
- The specs record what the renaissance look adds, which the code already does on the `renaissance-style` branch.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `outfit-display`: adds requirements for the renaissance look: its framed board on one desktop screen, painted women as models, re-spinning one piece, "also works today" spinning with Match me, and the daily muse quote.

## Impact

- `README.md`: sections 1, 3, 4, the introduction and "Running it". No other file changes for this change.
- The behaviour it describes is already implemented in `renaissance/index.html` and `renaissance/style.css` (commits 8f2c9a8 to 955ef09); the original `index.html`, `css/` and `js/` keep the polaroid look.
- The green playsuit left the demo closet in the same two weeks (commit aaff01b); the demo text does not use it.
