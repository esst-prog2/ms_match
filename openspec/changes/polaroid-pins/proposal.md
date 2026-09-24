## Why

Seeing the last change running settled a question the specs could not. Laying the pieces flat on the model and blending their background away with `multiply` does remove the white rectangle, but it also washes the garment itself out: a light piece over a light photo turns half transparent and reads as a cheap overlay rather than as clothing. The effect undercuts the look the app is built around.

The pinned photo cards it replaced did not have that problem. They never pretended to be worn, they simply showed what the outfit is, and they looked deliberate. Going back to them and making them properly what they always hinted at - polaroids held to the board with a pin - is the better answer, and it costs nothing in blending tricks that only work under the right lighting.

## What Changes

- **BREAKING** Pieces are no longer placed over the body. They return to fixed positions around the model, two above and two below, slightly tilted, as a board of photos beside her.
- **BREAKING** The `multiply` blend is removed. A piece is shown as an opaque photo again, so it keeps its own colour and needs nothing of the background it was shot against.
- Each piece is framed as a polaroid: a white border that is deeper at the bottom, carrying the piece's name in the wide margin.
- A pin holds each polaroid in place, replacing the strip of washi tape.
- **BREAKING** Adjust mode is removed, along with dragging, the size slider and the per-model placement stored in `msmatch.placement`. With fixed positions there is nothing left to adjust.
- The dress rule, the outfit choosing, the forecast, saved looks and the calendar are untouched.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `outfit-display`: the requirements about where a piece sits, about the background blending away, about adjusting placement and about remembering it per model photo are all replaced by requirements describing polaroids pinned around the model.

## Impact

- `css/style.css`: `.pin` loses the placement custom properties, the blend and the adjust-mode rules, and gains the polaroid frame and the pin. The fixed corner positions come back.
- `js/app.js`: `PLACEMENT_DEFAULTS`, `placementFor()`, `setPlacement()`, `applyPlacement()`, `startDrag()`, `selectSlot()` and `setAdjusting()` are removed, with the listeners that drove them. `drawStage()` goes back to filling each pin and toggling `on`, and now also writes the piece's name into the polaroid margin.
- `index.html`: the adjust button and the adjust bar are removed.
- `localStorage`: the `msmatch.placement` key is no longer written or read. A key left over from the previous version is ignored and does no harm.
- `README.md`: sections 1, 2, 4 and 5 describe pieces laid on the body and a white background blending away, and no longer match.
- No change to the closet, the forecast, saved looks or the calendar.

## Later levels

Unchanged from the previous change, minus the parts this one settles:

- AI try-on render, if a free or cheap image API turns out to be good enough.
- IndexedDB instead of `localStorage`, once a real wardrobe outgrows roughly 50 to 60 photos.
- Accounts and sync between devices.
