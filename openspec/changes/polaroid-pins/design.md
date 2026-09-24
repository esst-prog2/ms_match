## Context

See proposal.md - Why. The previous change left `.pin` driven by three CSS custom properties written from JavaScript, blending with `multiply`, and a block of drag handling in `js/app.js` that stored a position per model photo. This change takes all of that out and puts a fixed, decorated card back in its place. The card styling that existed before is still in the stylesheet, shared by the closet items and the saved looks, so most of what is needed is already there.

## Goals / Non-Goals

**Goals:**

- A card that reads as a polaroid at a glance, without loading an image for the frame or the pin.
- Less code than before this change, not more: the drag machinery goes and nothing replaces it.
- The scan and match animations keep working, since they are the app's signature.

**Non-Goals:**

- Letting the user move a piece. That is what this change removes.
- Any change to how an outfit is chosen, to the forecast, to saved looks or to the calendar.

## Decisions

**The polaroid frame is padding, not an image.**
A polaroid is a white card with an even border on three sides and a deep one at the bottom. That is `padding: 8px 8px 30px` on the card with a white background, which needs no asset, scales with the card and prints the same at any size. A background image would have to be sliced to stay crisp at different widths.

**The name goes in the lower margin as text, positioned absolutely.**
The margin exists because of the bottom padding, so the caption is placed into it rather than adding a second element in flow. This keeps the photo's box independent of how long the name is, and a long name is clipped rather than pushing the frame out of shape.

**The pin is drawn with a pseudo-element, not an emoji or an SVG file.**
A small circle with an inner highlight and a short stem reads as a pushpin at this size, costs one `::before`, and takes the palette's colours so it matches the rest of the page. An emoji would render differently on every platform, and an SVG file would be one more request for a decoration this small. The washi tape that used to sit in the same place is dropped: two things holding one card looks like an accident.

**Positions return to the four corner values the stylesheet used before, unchanged.**
They were tuned against these model photos and they worked. Re-deriving them would be churn without a reason.

**Leftover `msmatch.placement` data is ignored rather than deleted.**
The key is simply never read again. Deleting it would mean shipping a migration step that runs once and then sits in the code forever, for data that occupies a few hundred bytes and harms nothing. If the try-on idea ever returns, the data is still there.

## Risks / Trade-offs

**The polaroid frame is white, and so is the page behind the model.** A card could lose its edge against a pale background. → The card keeps the wine border and pink shadow the other cards use, which separates it from anything behind it.

**A long piece name will not fit the margin.** → The caption is clipped on one line rather than wrapping, so the frame keeps its shape; the full name stays available as the image's tooltip.

**Removing adjust mode removes a feature that was specified and built.** → It only existed to serve placement on the body. The spec delta removes those requirements explicitly rather than leaving them unimplemented.

## Migration Plan

Nothing stored changes shape and nothing has to be converted. `msmatch.placement` stops being read on the first load of the new version; a browser that still holds it is unaffected. The custom properties and the adjust markup are removed in the same change that restores the fixed positions, so there is no state in which half of each applies. Rolling back means reverting the commit.
