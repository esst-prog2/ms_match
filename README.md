# Advanced programming project

## Ms. Match: my closet, my photo, today's outfit

A small web app I am building for myself. My clothes live in it as photos, it reads today's forecast, and one click pins today's outfit up beside a photo of me, like a little board I put together before I get dressed. It runs in the browser, with no server of my own, no account, and nothing sent anywhere. Project brief, sections 1 to 5 below.

---

## 1. The demo

I open the app in the browser and the page asks for my location. I allow it, and the forecast panel shows today: 14°, light rain, rain 70%. The model on the page is a full-body photo of me that I uploaded once. I click **Match me**. The closet flicks through pieces for a few seconds, slows down, a handwritten "match!" pops up, and four polaroids settle around me: the brown knit sweater and the bag above, the black jeans and the boots below, each one a photo I took myself, pinned up at a slight angle with its name written underneath. I can see myself in the middle and the outfit around me. The "love it?" row appears. I click **Wear it today**, and the status bar says `wearing it today · 2026-11-30 saved to the calendar`. I open **Outfit calendar**: November shows the days I pressed "wear it", each with a small picture of that outfit, and clicking one puts it back on screen. I close the browser, reopen the app, and the closet, the saved looks and the calendar are still there.

## 2. The shape

```
in         one full-body photo of me, my clothes as photos (each with a
           category, a warmth level from 1 to 3 and a rain flag), the forecast
out        a board of the chosen pieces pinned around my photo, saved looks,
           and a calendar of what I wore on which day
on screen  I press "Match me" or pick pieces by hand, the pieces go up as
           polaroids around me, and I save it, wear it, or match again
```

No server of my own: everything is stored in the browser. One outside call: Open-Meteo for the forecast, which needs no key. No photo of me or of my clothes ever leaves the browser.

## 3. The size

The first useful version does:

- one photo of me as the model, and my closet as photos with category, warmth and rain flag
- forecast for my location and an outfit suggestion by warmth and rain
- "Match me" random outfit, plus manual picking
- show each chosen piece as a polaroid pinned around my photo, named, with the model left clear in the middle
- save looks, "wear it today", and a monthly calendar

Explicitly not this term:

- no accounts, no sync between devices, no server or database of my own
- no AI try-on render: I decided against it, so nothing is sent to a third party and nothing costs money per outfit
- no rendering of the clothes onto my body: I tried laying them over the photo and it looked worse than pinning them up beside me
- no automatic cut-out of clothes: I photograph each piece on a plain background myself

## 4. How we would know it works

- Given rain probability of 50% or more, the suggested shoes are marked *rain ok* whenever such a pair exists.
- Given a dress is chosen, the bottom slot is emptied and no bottom card is shown.
- Given four pieces are chosen, four polaroids appear around the model and none of them covers the middle of the photo.
- Given a piece is displayed, its card shows the piece's name below the photo and a pin above it.
- Given the browser refuses to store a new piece, the app says so and the closet after a reload holds exactly what it held before.
- Given a look is worn on day X and the page is reloaded, the calendar still shows it on day X.

## 5. What could stop this

- **Storage.** The closet lives in `localStorage`, which is around 5 MB, so roughly 50 to 60 photos. Past that the browser refuses to store more. The app says so and does not pretend the piece was added, but a full wardrobe will eventually need IndexedDB.
- **Photos that do not read at card size.** A polaroid is small. A piece photographed from far away, or one that blends into its background, is hard to recognise at that size. I photograph each piece close up on a plain background.
- **Four slots.** The board holds a top, a bottom, shoes and one extra. An outfit with two extras, or with a jacket over a top, has nowhere to go yet.

What I could not fill in: whether a board of four polaroids is enough to decide what to wear, or whether I will keep wanting to see the pieces on me. Section 4 therefore checks rules, layout and persistence, not whether the answer is convincing.
