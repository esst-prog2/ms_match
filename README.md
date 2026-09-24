# Advanced programming project

## Ms. Match: my closet, my photo, today's outfit

A small web app I am building for myself. My clothes live in it as photos, it reads today's forecast, and one click gives me an outfit, laid out on a photo of me, so I can see it on myself before I get dressed. It runs in the browser, with no server of my own, no account, and nothing sent anywhere. Project brief, sections 1 to 5 below.

---

## 1. The demo

I open the app in the browser and the page asks for my location. I allow it, and the forecast panel shows today: 14°, light rain, rain 70%. The model on the page is a full-body photo of me that I uploaded once. I click **Match me**. The closet flicks through pieces for a few seconds, slows down, a handwritten "match!" pops up, and the outfit settles onto the photo: the black jeans over my legs, the brown knit sweater over my torso, the black boots at my feet. Each piece is a photo I took myself against a white sheet, and the white drops away where it meets the photo of me, so what I see is the outfit on me rather than four pictures next to me. The first time I upload a photo of myself I press **adjust** and drag each piece until it sits right; the app remembers that for this photo. The "love it?" row appears. I click **Wear it today**, and the status bar says `wearing it today · 2026-11-30 saved to the calendar`. I open **Outfit calendar**: November shows the days I pressed "wear it", each with a small picture of that outfit, and clicking one puts it back on screen. I close the browser, reopen the app, and the closet, the saved looks, my placement and the calendar are still there.

## 2. The shape

```
in         one full-body photo of me, my clothes as photos taken against a
           plain white background (each with a category, a warmth level from
           1 to 3 and a rain flag), the forecast
out        my photo with the chosen outfit laid over it, saved looks, and a
           calendar of what I wore on which day
on screen  I press "Match me" or pick pieces by hand, the pieces settle onto
           my photo where I placed them, and I save it, wear it, or match again
```

No server of my own: everything is stored in the browser. One outside call: Open-Meteo for the forecast, which needs no key. No photo of me or of my clothes ever leaves the browser.

## 3. The size

The first useful version does:

- one photo of me as the model, and my closet as photos with category, warmth and rain flag
- forecast for my location and an outfit suggestion by warmth and rain
- "Match me" random outfit, plus manual picking
- lay the pieces over my photo where each one belongs on the body, with the white background of the piece blended away
- let me drag each piece into place, remembered separately for every model photo
- save looks, "wear it today", and a monthly calendar

Explicitly not this term:

- no accounts, no sync between devices, no server or database of my own
- no AI try-on render: I decided against it, so nothing is sent to a third party and nothing costs money per outfit
- no fabric-accurate fit, no video, no cloth simulation: the piece is a flat photo laid over mine
- no automatic cut-out of clothes: I photograph each piece on a plain white background myself

## 4. How we would know it works

- Given rain probability of 50% or more, the suggested shoes are marked *rain ok* whenever such a pair exists.
- Given a dress is chosen, the bottom slot is emptied and no bottom piece is shown on the model.
- Given a piece photographed on a plain white background, the white does not appear as a rectangle over the model.
- Given a piece is dragged into place on one model photo, that placement comes back after a reload and does not affect any other model photo.
- Given the browser refuses to store a new piece, the app says so and the closet after a reload holds exactly what it held before.
- Given a look is worn on day X and the page is reloaded, the calendar still shows it on day X.

## 5. What could stop this

- **The white background.** The pieces blend into my photo by multiplying, which only works when the piece was shot against something light. A piece photographed against a dark wall paints a dark rectangle over me. I shoot everything against a white sheet, and an automatic cut-out is on the list for later.
- **Storage.** The closet lives in `localStorage`, which is around 5 MB, so roughly 50 to 60 photos. Past that the browser refuses to store more. The app now says so and does not pretend the piece was added, but a full wardrobe will eventually need IndexedDB.
- **Placement on my own photo.** The defaults are tuned for a standing, full-body shot. A photo framed differently needs adjusting by hand, which is one-off work but still work.

What I could not fill in: how convincing the result looks on a photo of me, because so far I have only tried it on the built-in studio models. Section 4 therefore checks rules, blending and persistence, not how flattering the outfit is.
