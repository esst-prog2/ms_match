## Context

See proposal.md - Why. What matters for the approach is the current shape of the stage: `index.html` holds one `.stage` box containing the model `<img>` and four absolutely positioned `.pin` divs, one per slot. `css/style.css` gives each pin a fixed corner offset, a fixed `26%` width and a fixed aspect ratio. `drawStage()` in `js/app.js` fills each pin with the chosen item's image and toggles an `on` class.

Two constraints shape everything below. The stage is responsive, so its pixel size differs between a phone and a laptop and changes when the window is resized. And the model photo is whatever the user uploaded, so nothing can be assumed about its framing beyond it being a standing figure.

## Goals / Non-Goals

**Goals:**

- Placement that means the same thing at any stage size and on any model photo.
- Adjustment cheap enough that the user does it once per model photo and forgets about it.
- The existing click-to-choose behaviour of the closet and the slots keeps working unchanged.

**Non-Goals:**

- Detecting where the body is in the photo. Defaults are fixed numbers; the user corrects them by hand.
- Rotation of a piece. Position and scale only.
- Any change to how the outfit is chosen, to the forecast, to saved looks or to the calendar.

## Decisions

**Placement is stored as percentages of the stage, not pixels.**
A pin's position is the percentage of stage width and height of its centre, and its scale is a multiplier on a base width expressed in percent. Pixels would be wrong the moment the window is resized or the app is opened on another screen, and the stored value would silently stop matching the photo. Percentages make the stored placement independent of the rendered size.

**Placement lives in one `localStorage` key, `msmatch.placement`, shaped as model id to slot to `{ x, y, scale }`.**
The alternative was to hang placement off each entry in the `models` array. That array already mixes built-in models with uploaded ones and is rewritten whenever a photo is uploaded, so placement would be easy to lose and would bloat the uploaded records. A separate key keeps it independent, and a missing entry simply means "use the default".

**Defaults are per slot, not per model.**
One set of numbers - top over the torso, bottom over the legs, shoes at the feet, extra beside the head - applies to every model photo that has no stored placement. This satisfies the requirement that a newly uploaded photo is usable immediately, and keeps the stored data empty until the user actually adjusts something.

**The plain background is removed with `mix-blend-mode: multiply`, not by cutting the piece out.**
Multiply keeps dark pixels and lets white ones disappear into whatever is behind them, which is exactly the shape of the problem: a garment photographed on a white sheet. It costs one CSS declaration and no processing. The alternatives were a canvas chroma-key, which needs a tolerance the user would have to tune, and asking the user to cut each piece out, which the project brief already rules out. The trade-off is recorded under Risks.

**Dragging uses Pointer Events.**
`pointerdown` / `pointermove` / `pointerup` with pointer capture covers mouse, trackpad, touch and pen in one code path. Separate mouse and touch handlers would duplicate the logic and behave differently on hybrid devices.

**Adjustment is an explicit mode, entered from a control on the stage.**
Outside that mode the stage behaves exactly as it does today and a stray drag cannot move anything. Inside it the pins accept drags and show a handle for scale. Without a mode, a drag on a pin would compete with the existing click handling and with page scrolling on touch devices.

**`save()` reports failure instead of swallowing it.**
Today it catches the quota error and writes a status message, but the caller has already pushed the item into the in-memory array, so the closet shows a piece that is not stored and the next reload loses it. `save()` returns whether the write succeeded, and `addItem()` and `uploadModel()` undo their in-memory change when it did not.

## Risks / Trade-offs

**Multiply fails on a dark model photo.** The blend darkens whatever is beneath it, so a garment on a white background placed over a dark photo leaves a visible dark patch rather than disappearing. → Sensible defaults ship with light built-in models, and the user can pick a lighter photo of herself. A real cut-out is on the later-levels list.

**A garment photographed on a dark background will lose its own dark areas.** Multiply cannot tell garment from backdrop. → Documented as guidance: photograph pieces on a plain light background, which the brief already assumes.

**Percentage placement assumes the stage keeps its aspect ratio.** If the stage box changes shape between devices, a piece tuned on one will drift on another. → The stage already uses a fixed aspect ratio; the implementation keeps it.

**Adjustment mode is another thing to discover.** A user who never finds it gets only the defaults. → The control sits on the stage rather than in a menu, and the defaults are chosen to be usable on their own.

**Quota detection is approximate.** Browsers differ in when and how they throw, and some throw only on the write that crosses the limit. → The application reacts to the failure it is given rather than trying to predict the limit, and the rollback keeps memory and storage consistent either way.

## Migration Plan

No stored data changes shape, so nothing has to be migrated. The new `msmatch.placement` key starts absent, which reads as "defaults everywhere". The four fixed corner rules in `css/style.css` are removed in the same change that starts writing inline placement, so there is no state in which both apply. Rolling back means reverting the commit; no stored data would have to be cleaned up, and a leftover `msmatch.placement` key is ignored by the previous version.
