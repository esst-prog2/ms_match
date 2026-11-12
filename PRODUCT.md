# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary:** the author and people like the author. They would rather decide what to wear in one click than stand in front of the wardrobe, they like opening a page that is beautiful to look at every morning, and they would rather keep photos of their clothes, and of themselves, to themselves.
- **Secondary:** visitors of the promo page (a classmate, the teacher, a stranger) who try Ms. Match with the demo closet and do not upload anything.

## Product Purpose

Ms. Match is a browser-only closet app. Clothes live in it as photos, each with a category, a warmth (light, mid or warm), a rain flag and a dress flag. It reads today's forecast and dresses a model, the user's own full-length photo or a painted woman, with pieces from that closet, each piece pinned up beside the model. Looks can be saved, worn and seen again on a monthly outfit calendar. Success: the morning decision takes one click and the page is one the user wants to open.

## Positioning

- The forecast picks from the user's own closet: the look waiting on arrival and the ↻ re-spin of a single piece follow the day's warmth and rain.
- Painted women in carved gold frames serve as models on the renaissance page.
- No account and no server of the author's: everything is kept in the browser, and no photo is uploaded.

## Operating Context

- A morning ritual: open the atelier, check the forecast, accept the look or press **Match me**, re-spin one piece, read the daily muse and the stylist's note, **Wear it today**.
- Two pages share one closet, saved looks and calendar: the original page at the root (`index.html`, polaroids) and the renaissance page (`renaissance/index.html`, gold frames).
- First visit opens with a 20-piece demo closet; the forecast falls back to Budapest when location is not shared.

## Capabilities and Constraints

- Plain HTML, CSS and JS, no build step and no framework; tests run with `node --test`.
- Storage is `localStorage` (about 5 MB; about 63 of the author's own photos fit). Past that the browser refuses and the app says so.
- Two outside calls: Open-Meteo (receives coordinates, or Budapest's) and Google Fonts. Like any website, both see the visitor's IP address.
- **Match me** shuffles the closet at random and keeps to rain-proof pieces when rain is likely; it does not look at warmth.
- The board holds four slots: top, bottom, shoes, one extra. A dress empties the bottom slot.
- On GitHub Pages every esst-prog2 project shares the origin `esst-prog2.github.io`, so storage and a location permission are shared with the other student projects there. Real photos belong in a local copy.
- The original page (root `index.html`, `css/`, `js/`) is not changed.
- Not in scope: accounts, sync, a server or database, an AI try-on render, rendering clothes onto the body, automatic cut-out of clothes.

## Brand Commitments

- Name: **Ms. Match**.
- Voice: English, first person, short plain sentences, as in the README ("I built it for myself"). No hype.
- The app's own words stay as they are: atelier, **Match me**, **Wear it today**, **Outfit calendar**, daily muse, stylist's note, *Bellissima.*

## Evidence on Hand

- The running app itself: the demo closet (`assets/clothes/`, Unsplash photos), five painted women (`renaissance/art/models/`, public domain via Wikimedia Commons) and the renaissance wall paintings (`renaissance/art/`).
- The README demo story (README section 1) and the content plan for the promo page (`docs/designs/promo-page-content.md`).
- No testimonials, no user numbers, no press, no screenshots yet. None of these may be invented. No other app is named or compared.

## Product Principles

1. Every claim matches what the code does today.
2. Nothing personal is published: no photo of the author, none of the author's own clothes.
3. Show the product working rather than describing it.
4. Trying it must cost nothing: no sign-up, no upload.
5. A page worth opening every morning is part of the product, not decoration.
