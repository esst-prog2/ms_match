## 1. Take out the placement machinery

- [x] 1.1 Remove `PLACEMENT_DEFAULTS`, `PIN_BASE_W`, `placementFor()`, `setPlacement()`, `applyPlacement()`, the `placement` state and the `placement` entry in `STORE` from `js/app.js`, and verify `node --check js/app.js` passes and no reference to them remains
- [x] 1.2 Remove `startDrag()`, `selectSlot()`, `setAdjusting()`, `clamp()`, `pct()`, the `adjusting` and `activeSlot` state and the listeners for the adjust button, the stage pointer and the size slider, and verify the file has no remaining mention of "adjust"
- [x] 1.3 Remove the adjust button and the adjust bar from `index.html`, and verify the page loads with no console error and no leftover control on the stage

## 2. Put the polaroids back around the model

- [x] 2.1 Restore the four fixed corner positions for `.pin-top`, `.pin-extra`, `.pin-bottom` and `.pin-shoes` in `css/style.css` with their tilts, and restore the `pin-*` classes in `index.html`, and verify all four pieces appear around the model with the model's face and torso left clear
- [x] 2.2 Remove `mix-blend-mode` and the `--px` / `--py` / `--pw` custom properties from `.pin`, put the piece photo back to `object-fit: cover`, and verify a light garment over the light part of the model photo is fully opaque
- [x] 2.3 Remove the adjust-mode rules from `css/style.css` (`.adjust-btn`, `.stage.adjusting …`, `.adjust-bar`), and verify no rule in the file still mentions adjusting

## 3. Make the card a polaroid

- [x] 3.1 Give `.pin` the white polaroid frame with a deeper bottom margin and return it to the shared card styling with its border and shadow, and verify the frame is even on three sides and visibly deeper at the bottom
- [x] 3.2 Write the piece's name into the lower margin from `drawStage()` and style it to stay on one line, and verify a piece named "brown leather bag" shows its name clipped to one line without changing the frame's shape
- [x] 3.3 Draw the pin with a pseudo-element on `.pin` and remove the washi tape from it, and verify each visible card shows exactly one pin in the same position

## 4. Keep what was already working

- [x] 4.1 Confirm the dress rule survives, and verify that choosing a full-length piece as the top leaves no bottom card and dims the bottom slot
- [x] 4.2 Confirm the scan and match animations still read, and verify by running "Match me" that the cards stay visible through the spin and the "match!" pop
- [x] 4.3 Confirm the storage behaviour from the previous change is untouched, and verify that a rejected write still reports storage is full and leaves the closet unchanged after a reload

## 5. Documentation

- [x] 5.1 Update `README.md` sections 1, 2, 4 and 5 so the demo, the shape, the checks and the risks describe polaroids pinned around the model rather than pieces laid on the body, and verify no sentence still refers to blending or to adjusting placement
- [x] 5.2 Append one line per decision taken in this change to `PLANNING_LOG.md` in the existing format, and verify no earlier line was modified
