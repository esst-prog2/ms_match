## Why

The HW6 whole-codebase review (see `reviews/`) changed behaviour the specs did not describe. A piece's name could run as code, one click deleted every piece I had photographed, a look that storage refused was still reported as saved, and the board could not be used without a mouse. The fixes are in the code. This change writes them into the specs, so the specs keep describing the code that ships.

## What Changes

- A piece's name is always shown as text, never interpreted as HTML.
- The board, the closet, the saved looks and the calendar can be used with the keyboard alone.
- Resetting the demo closet or clearing all saved looks asks before deleting anything I added myself.
- A saved look, or a day recorded as worn, is never reported as stored when storage refused it.
- A file that cannot be read as a photo is reported, and nothing is added.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `outfit-display`: adds the requirements that names are shown as text and that the board works from the keyboard.
- `closet-storage`: adds the requirements that my own data is not deleted without asking, that looks and worn days are never lost in silence, and that an unreadable photo is reported.

## Impact

- Already implemented on the `hw6-review` branch in `js/app.js`, `index.html` and `css/style.css`, and covered by `tests/rules.test.js`. No further code change.
