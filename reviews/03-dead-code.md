# Review 3: dead code and leftovers

**Scope:** the whole repository, looking only for code, data and comments that nothing uses or that describe something that no longer exists. The project went through two reversed designs (pieces laid on the body with drag-adjust, then polaroids), so leftovers were likely.

## How it was checked

- Every CSS class in `css/style.css` was searched for in `index.html` and `js/`: none is unused.
- Every `$('#id')` in `js/app.js` was matched to an id in `index.html`: all exist (`#model-upload` is created by `drawStage`).
- Every top-level function and constant in `js/app.js` is used more than once.
- Every `@keyframes` is referenced.
- A search for `adjust`, `drag`, `placement`, `blend` and `multiply` found no code left from the on-body version.
- No commented-out code in `js/`, `tests/` or `spike/`.

## Findings

| # | Where | Finding | Action |
|---|---|---|---|
| 1 | `js/app.js` wearLook | `look.wornAt` is written on every "wear it" and stored, but nothing ever reads it. The calendar (`history`) already records when a look was worn. | **Removed.** Looks already stored with it simply keep an unused field. |
| 2 | `css/style.css` scan effect | The comment still explains the effect in terms of `multiply` blending, which was removed with the on-body design on 2026-09-24. | **Rewritten** to describe what the rule does now. |
| 3 | `js/app.js` SCAN_MS | `2600` has to stay a bit longer than the 2.4 s sweep in the stylesheet, but nothing said so. | **Commented.** |
| 4 | `spike/` | The spike harness is not used by the app. | **Kept:** it is the committed evidence for the HW4 numbers that the README and the test rely on. |

## Check

`node --test`: 1 pass, 0 fail.
