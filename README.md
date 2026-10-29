# Advanced programming project

## Ms. Match: my closet, my photo, today's outfit

A small web app I am building for myself. My clothes live in it as photos, it reads today's forecast, and one click pins today's outfit up beside a photo of me, like a little board I put together before I get dressed. It runs in the browser, with no server of my own, no account, and none of my photos sent anywhere. Project brief, sections 1 to 5 below.

---

## 1. The demo

I open `renaissance/index.html`, click **Atelier**, and the whole atelier fits one screen: the forecast for Budapest on the left (16°, overcast, rain 6%), my model in the middle — Botticelli's Flora, one of the five painted women I can choose under **Change model**, in a carved gold frame — and **Match me** on the right. I click **Match me**: the four framed pieces around her and the six "also works today" pieces flick through my closet and slow down, *Bellissima.* appears over the painting, and the look settles — denim shirt, blue jeans, black boots and the brown leather bag, each in its own small gold frame with its name below. The boots are in the laundry, so I press the ↻ on their card and only the shoes spin again, landing on the white sneakers, the pair that fits a 16° day. Below the painting, the daily muse shows today's fashion quote with its author, and the stylist's note says "Mild day. denim shirt + one warm piece, and you're set." I click **Wear it today**, the status bar says `wearing it today · 2026-11-30 saved to the calendar`, **Outfit calendar** shows that day with a small picture of the look, and when I close and reopen the browser, the closet, the saved looks and the calendar are still there.

### Why a second look

The first look, with its polaroids, worked but never felt like mine. I love painting and an elegant, gallery-like style, and a page I like looking at is a page I keep opening every morning, so I gave Ms. Match a completely new appearance in `renaissance/`: painted women as models, gold frames instead of polaroids, and paintings on the walls. It runs the same closet, forecast and calendar as the original page, which stays as it was. The daily muse and the stylist's note are there so that every day brings something new to read, not only a new outfit.

## 2. The shape

```
in         one full-body photo of me, my clothes as photos (each with a
           category, a warmth level from 1 to 3 and a rain flag), the forecast
out        a board of the chosen pieces pinned around my photo, saved looks,
           and a calendar of what I wore on which day
on screen  I press "Match me" or pick pieces by hand, the pieces go up as
           polaroids around me, and I save it, wear it, or match again
```

No server of my own: everything is stored in the browser. Two outside calls: Open-Meteo for the forecast, which needs no key and only receives my coordinates, and Google Fonts for the typefaces. No photo of me or of my clothes ever leaves the browser.

## 3. The size

The first useful version does:

- one photo of me as the model, and my closet as photos with category, warmth and rain flag
- forecast for my location and an outfit suggestion by warmth and rain
- "Match me" random outfit, plus manual picking
- show each chosen piece around the model, named, with the model left clear in the middle: as a pinned polaroid on the original page, as a small gold-framed study on the renaissance page
- save looks, "wear it today", and a monthly calendar
- the renaissance look in `renaissance/`: five painted women as models, re-spinning a single piece to the next one that fits the weather, "also works today" spinning with Match me, a daily fashion quote and the stylist's note

Explicitly not this term:

- no accounts, no sync between devices, no server or database of my own
- no AI try-on render: I decided against it, so nothing is sent to a third party and nothing costs money per outfit
- no rendering of the clothes onto my body: I tried laying them over the photo and it looked worse than pinning them up beside me
- no automatic cut-out of clothes: I photograph each piece on a plain background myself

## 4. How we would know it works

- Given rain probability of 50% or more, the suggested shoes are marked *rain ok* whenever such a pair exists.
- Given a dress is chosen, the bottom slot is emptied and no bottom card is shown.
- Given four pieces are chosen, four polaroids (gold frames on the renaissance page) appear around the model and none of them covers the middle of the photo.
- Given a piece is displayed, its card shows the piece's name below the photo, with a pin above it on the original page and inside a gold frame on the renaissance page.
- Given the browser refuses to store a new piece, the app says so and the closet after a reload holds exactly what it held before.
- Given a look is worn on day X and the page is reloaded, the calendar still shows it on day X.

The first, second, fifth and sixth are automated tests in `tests/`. The third and fourth are about how the board looks, so I check them by eye in the browser.

## 5. What could stop this

- **Storage.** The closet lives in `localStorage`, which is around 5 MB: measured against 10 real garments, a piece takes 72.5 KB (median) and `localStorage` fits 63 of my own photos alongside the 21 stock pieces (84 pieces total) before throwing `QuotaExceededError` at 5,061 KB (Chrome). The earlier guess of 50 to 60 was remarkably close to the measured 63. Past that the browser refuses to store more. The app says so and does not pretend the piece was added, but a full wardrobe will eventually need IndexedDB.
- **Photos that do not read at card size.** A polaroid is small. A piece photographed from far away, or one that blends into its background, is hard to recognise at that size. I photograph each piece close up on a plain background.
- **Four slots.** The board holds a top, a bottom, shoes and one extra. An outfit with two extras, or with a jacket over a top, has nowhere to go yet.

What I could not fill in: whether a board of four polaroids is enough to decide what to wear, or whether I will keep wanting to see the pieces on me. Section 4 therefore checks rules, layout and persistence, not whether the answer is convincing.

## Running it

Open `index.html` in Chrome. Nothing needs to be installed.

The renaissance look: run `python -m http.server 8000` in the project folder and open http://localhost:8000/renaissance/index.html. It shares the closet, saved looks and calendar with the original page.

Tests: `node --test` in the project folder (Node 22, no packages). They load the real `js/closet.js` and `js/app.js` with a stub page and a fake `localStorage`.

The HW6 code reviews and what was done about each are in `reviews/`.
