# Review 4: duplication and simplicity

**Scope:** the whole repository, looking only for logic written out twice. When it is, one copy can change and the other cannot, and the app starts to disagree with itself.

## Findings

| # | Where | Finding | Severity | Action |
|---|---|---|---|---|
| 1 | `js/app.js` suggest and drawExtras | The weather rule (warmth 3 below 8°, 2 below 17°, else 1; rainy at 50% or a rain code) was written out in both places. Changing a threshold in one would make "Dress me" and "also works today" disagree. | Medium | **Fixed:** one `dayRule(day)` used by both. |
| 2 | `js/app.js` matchMe | The "random piece per slot" loop was written twice, once for the final look and once for every spin frame. | Low | **Fixed:** one local `randomLook()`. |
| 3 | `js/app.js` drawStage and drawExtras | `models.find(m => m.id === modelId) \|\| models[0]` was repeated. | Low | **Fixed:** `currentModel()`. |
| 4 | `js/app.js` state and resetDemo | The empty look `{ top: null, … }` was spelled out twice, separately from `SLOTS`. | Low | **Fixed:** `emptyLook()` is built from `SLOTS`. |
| 5 | `js/app.js` addItem, uploadModel, wearLook | The long "storage is full … not saved. Remove some uploaded photos and try again." text appeared three times. | Low | **Fixed:** `notSaved(what)`. The wording is unchanged, so the test's `/^storage is full/` still matches. |
| 6 | `spike/measure.js`, `spike/capacity.js` | Each has its own small storage-size helpers, overlapping with the test's fake storage. | — | **Kept:** the spike is frozen evidence for HW4, and changing it now would make its committed output no longer match its code. |

## Check

`node --test`: 1 pass, 0 fail. No behaviour change was intended in this review, and the storage test agrees.
