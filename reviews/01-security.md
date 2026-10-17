# Review 1: security

**Scope:** every file in the repository (`index.html`, `js/`, `css/`, `tests/`, `spike/`), looking only for security problems: injection, unsafe use of user input, secrets, data leaving the browser.

## Findings

| # | Where | Finding | Severity | Action |
|---|---|---|---|---|
| 1 | `js/app.js` drawStage, drawSaved, drawCloset, drawExtras, drawCalendar | A piece's name is typed by the user, stored in localStorage and then pasted into `innerHTML` unescaped in 9 places. A name like `<img src=x onerror=alert(1)>` runs as code on every page load, because it is stored. | High (stored XSS, even if only the user's own browser) | **Fixed:** an `esc()` helper escapes `& < > " '`, applied to every value interpolated into HTML: names, ids, categories, image URLs, dates and the ticker text. |
| 2 | `index.html` add form | The name field has no length limit, so a pasted megabyte of text would be stored and drawn everywhere. | Low | **Fixed:** `maxlength="40"`. |
| 3 | `js/app.js` drawCloset | `['', 'light', 'mid', 'warm'][item.warmth]` prints `undefined` for a warmth that was edited in storage. | Low | **Fixed:** falls back to an empty label. |
| 4 | whole repo | No API keys, tokens or passwords. The only outside call is Open-Meteo, which needs no key, and only the coordinates are sent. | — | Nothing to do. |
| 5 | `index.html` | Google Fonts is loaded from a third party, so the font request (IP, page) leaves the browser, which the README's "nothing sent anywhere" slightly overstates. | Low | **Kept**, noted here: fonts carry no user data. |
| 6 | `spike/photos/` | Ten real photos of my own clothes are committed. They are garments only, with no people in them. | — | Kept: they are the spike's evidence. |

## Check

`node --test`: 1 pass, 0 fail. A test that a hostile name is shown as text is added in the test review (review 6).
