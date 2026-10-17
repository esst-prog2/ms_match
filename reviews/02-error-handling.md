# Review 2: error handling and data loss

**Scope:** the whole repository, looking only at what happens when something goes wrong: a write that storage refuses, a file that is not a photo, no network, a corrupted stored value, and actions that throw away the user's own data.

## Findings

| # | Where | Finding | Severity | Action |
|---|---|---|---|---|
| 1 | `js/app.js` resetDemo, "clear all" | One click on *reset demo closet* deletes every piece I photographed, and *clear all* deletes every saved look and the whole calendar, with no question asked and no undo. | High (silent loss of my own data) | **Fixed:** both ask `confirm()` first, but only when there is something of mine to lose. |
| 2 | `js/app.js` saveLook | When storage refused a new look, `save()` showed "storage is full", then saveLook overwrote it with "look saved" and kept the look in memory. After a reload it was gone. This is the same silent loss the spec forbids for pieces. | Medium | **Fixed:** the look is taken back out and the "storage is full" message stays. |
| 3 | `js/app.js` wearLook | Three writes, none checked: the status said "saved to the calendar" even when it was not. | Medium | **Fixed:** the status only says so when all three writes got through. |
| 4 | `js/app.js` saveLook | A look's date came from `toISOString()`, which is UTC. In Budapest a look saved between 00:00 and 02:00 got yesterday's date, while the calendar uses the local day. | Medium | **Fixed:** uses the same local `dayKey()` as the calendar. |
| 5 | `js/app.js` addItem, uploadModel | A file that is not a readable image made `shrink()` reject. The promise was never caught, so nothing happened on screen and the error only showed in the console. | Medium | **Fixed:** caught, with the status "that file could not be read as a photo". |
| 6 | `js/app.js` shrink | `URL.createObjectURL` was never released, so every uploaded photo stayed in memory until the tab closed. | Low | **Fixed:** `revokeObjectURL` on load and on error. |
| 7 | `js/app.js` addItem | A name made only of spaces passed the `required` check and was saved as an empty name. | Low | **Fixed:** refused with "give the piece a name first". |
| 8 | `js/app.js` state | `load()` returns whatever JSON is stored. A closet that is not an array (edited by hand, or from an older version) crashed the whole page at start. | Low | **Fixed:** a stored list with the wrong shape falls back to the default. |
| 9 | `js/app.js` loadWeather | An HTTP error from Open-Meteo only failed later, as a TypeError on `.daily`. It was already caught, so nothing visible was wrong. | Low | **Fixed** for clarity: `res.ok` is checked first. |
| 10 | `js/app.js` | Uploaded model photos (up to 900 px) cannot be removed in the app, although the "storage is full" message tells the user to remove uploaded photos. | Medium | **Not fixed** in this branch, since it is a new feature (a remove button for model photos). Recorded in the planning log as the next change. |

## Check

`node --test`: 1 pass, 0 fail. The storage test still shows that piece 71 is refused and not shown as added.
