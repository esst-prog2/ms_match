# Review 5: accessibility

**Scope:** `index.html`, `js/app.js` (the HTML it draws) and `css/style.css`, looking only at whether the app can be used without a mouse, with a screen reader, or with reduced motion.

## Findings

| # | Where | Finding | Severity | Action |
|---|---|---|---|---|
| 1 | `js/app.js` closet cards, saved looks, model picker, "also works today", calendar days | All of them are clicked to act, but they are `div`s and `img`s: Tab never reaches them, so the closet, the saved looks and the calendar cannot be used from the keyboard at all. | High | **Fixed:** they get `tabindex="0"` and `role="button"`, and one document-level handler makes Enter and Space click them. Closet cards and model photos also say whether they are chosen (`aria-pressed`). |
| 2 | `css/style.css` | No focus style at all, so even the real buttons show no sign of where the keyboard is. | High | **Fixed:** a `:focus-visible` ring in the app's pink. |
| 3 | `js/app.js` model picker, saved thumbnails, pairings, calendar thumbnails | Images without `alt`, so a screen reader reads out the data-URL or file name. | Medium | **Fixed:** `alt` is the piece's or model's name. |
| 4 | `js/app.js`, `index.html` | The "×" remove buttons, the calendar's ‹ › and the four slots' ‹ › arrows had no label, or the same "previous"/"next" for every slot. | Medium | **Fixed:** "remove white tee", "remove this look", "previous month", "next top", and so on. |
| 5 | `index.html` add form | The name field and both selects had only a placeholder or no label. | Medium | **Fixed:** `aria-label` on each. |
| 6 | `index.html` status line | Every result ("added to your closet", "storage is full …") appears only as text in the footer, which a screen reader does not announce. | Medium | **Fixed:** `role="status"` with `aria-live="polite"`. |
| 7 | `index.html` calendar | The calendar opens as a modal but was not marked as a dialog, and focus stayed behind it. | Low | **Fixed:** `role="dialog"`, `aria-modal`, labelled by its title, and focus moves to its close button. |
| 8 | `css/style.css` | The scanner sweep, the slot-machine spin and the endless ticker play for everyone. | Low | **Fixed:** cut to a single instant step under `prefers-reduced-motion`. |
| 9 | `index.html` collage and band images | `alt=""` on purely decorative photos. | — | Correct as it is. |

## Check

`node --test`: 1 pass, 0 fail. The keyboard path has not been tried by hand yet. To check it in Chrome with the keyboard only: Tab should reach the closet cards, Enter should put a piece on the model, and Escape should close the calendar.
