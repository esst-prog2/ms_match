## 1. Placement model

- [x] 1.1 Add a `PLACEMENT_DEFAULTS` table in `js/app.js` giving each of the four slots a default `{ x, y, scale }` in stage percentages, and verify by logging the table that every slot in `SLOTS` has an entry
- [x] 1.2 Add the `msmatch.placement` key to `STORE` and a `placement` state object loaded from it, and verify that a fresh browser profile starts with an empty object rather than an error
- [x] 1.3 Add a `placementFor(modelId, slot)` helper that returns the stored value when present and the default otherwise, and verify it returns the default for an unknown model id and the stored value after one is written by hand into `localStorage`

## 2. Pieces on the body

- [x] 2.1 Remove the four fixed `.pin-top` / `.pin-bottom` / `.pin-shoes` / `.pin-extra` corner rules from `css/style.css` and rewrite `.pin` so position and size come from CSS custom properties, and verify the stage renders with no pin visible before `drawStage()` runs
- [x] 2.2 Set those custom properties from `placementFor()` in `drawStage()`, and verify that choosing a top, a bottom, shoes and an extra puts each piece over its own region of the body on a built-in model
- [x] 2.3 Confirm the existing dress rule still holds after the rewrite, and verify that choosing a full-length piece as the top leaves no bottom piece on the model and dims the bottom slot

## 3. Blending out the background

- [x] 3.1 Apply `mix-blend-mode: multiply` to the pin images in `css/style.css`, and verify that a closet photo with a white background shows no opaque rectangle around the piece on a light built-in model
- [x] 3.2 Check the scan and match animations still read correctly with the blend applied, and verify by running "Match me" that the pieces remain visible throughout the spin and the "match!" pop

## 4. Adjustment mode

- [x] 4.1 Add an adjust toggle to the stage in `index.html` plus the state that tracks whether adjustment is on, and verify that toggling it changes the control's label and adds a class to the stage
- [x] 4.2 Implement dragging with `pointerdown` / `pointermove` / `pointerup` and pointer capture, writing the new centre back as stage percentages, and verify a piece follows the pointer and stays where it is released
- [x] 4.3 Add a scale control for the piece being adjusted, and verify a piece can be made visibly larger and smaller and keeps its centre
- [x] 4.4 Set `touch-action: none` on the pins while adjustment is on, and verify dragging a piece on a touch screen moves the piece instead of scrolling the page
- [x] 4.5 Confirm that with adjustment off the stage behaves exactly as before, and verify that clicking closet items and cycling the slot arrows still change the outfit

## 5. Remembering placement

- [x] 5.1 Write placement to `localStorage` under the current model id when a drag or a scale change ends, and verify the key appears in the browser's storage inspector with the expected shape
- [x] 5.2 Read placement back on load, and verify that adjusting a piece, reloading the page and selecting the same model photo shows the piece in its adjusted position
- [x] 5.3 Verify that adjusting a piece on one model photo and switching to another shows the second photo's own placement, unaffected by the first

## 6. Storage that fails loudly

- [x] 6.1 Change `save()` to return whether the write succeeded instead of only writing a status message, and verify it returns false when called with a value too large to store
- [x] 6.2 Make `addItem()` undo its in-memory push when `save()` reports failure and tell the user storage is full, and verify that after a failed add the closet contains the same pieces before and after a reload
- [x] 6.3 Make `uploadModel()` do the same for an uploaded model photo, and verify the application keeps working with the model photos it already had
- [x] 6.4 Verify that removing several uploaded pieces after a failure frees enough space for a new piece to be added successfully

## 7. Documentation

- [x] 7.1 Update sections 3, 4 and 5 of `README.md` so the demo, the size, the checks and the risks describe pieces placed on the model rather than an AI render with a fallback, and verify the five checks in section 4 match the scenarios in this change's specs
- [x] 7.2 Append one line per decision taken in this change to `PLANNING_LOG.md` in the existing format, and verify no earlier line was modified
