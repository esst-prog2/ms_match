## Why

The project brief promised that an image-editing AI would render the chosen pieces onto a photo of me, with pinned photo cards as the fallback when that render failed. Having thought it through, the render is out: it costs money per outfit, its quality is unproven, and it would mean sending photos of me and my whole wardrobe to a third party. I would rather photograph my clothes myself and have those photos placed on the model.

That decision promotes the fallback to the product. The pinned cards were only ever meant to be a safety net, so today they sit in the four corners around the model as a mood board. If this is the final form, the pieces have to sit on the body instead, and they have to sit correctly on a photo of me rather than only on the built-in studio models.

## What Changes

- **BREAKING** The image-editing API render is dropped from the MVP. No API key, no per-outfit cost, no photo leaves the browser.
- Outfit pieces move from decorative corner positions to anatomical positions on the model: top over the torso, bottom over the legs, shoes at the feet, extra beside the head.
- Each piece is drawn with `mix-blend-mode: multiply` so the plain background of a self-shot clothing photo drops away without cutting the piece out by hand.
- Placement becomes adjustable. A piece can be dragged, and its position and scale are remembered per model photo, so an uploaded photo of me is set up once and then stays right.
- Built-in models keep working untouched: they get sensible defaults and need no adjustment.
- A closet photo is no longer lost in silence when browser storage is full. The failure is reported and the item is not added.

## Capabilities

### New Capabilities

- `outfit-display`: how a chosen outfit is shown on the model photo. Anatomical placement per slot, the dress rule that empties the bottom slot, the multiply blend, and per-model placement that survives a reload.
- `closet-storage`: how the closet, the uploaded model photos and the saved looks persist in the browser, and what must happen when the storage quota is reached.

### Modified Capabilities

None. The project has no specs yet, so both capabilities above are new.

## Impact

- `css/style.css`: `.pin` and the four `.pin-*` rules are rewritten. Fixed corner offsets and the fixed `26%` width give way to placement driven by inline values, plus the blend mode and a drag affordance.
- `js/app.js`: `drawStage()` applies stored placement; new code handles dragging, defaults per slot, and persistence keyed by model id. `save()` stops failing silently, and `addItem()` and `uploadModel()` react when it fails.
- `index.html`: the stage markup gains an adjust control; the four `.pin` elements stay.
- `localStorage`: one new key, `msmatch.placement`, mapping model id to per-slot `{ x, y, scale }`.
- `README.md`: sections 3, 4 and 5 describe the render and its fallback, and no longer match what the app does.
- No new dependency, no build step, no network call beyond the existing Open-Meteo forecast.

## Later levels

Not this change. Kept as a list so they are not lost:

- AI try-on render, if a free or cheap image API turns out to be good enough.
- IndexedDB instead of `localStorage`, once a real wardrobe outgrows roughly 50 to 60 photos.
- Automatic background cut-out, so a piece can sit on a dark model photo too.
- Accounts and sync between devices.
