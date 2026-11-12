# Design brief: the Ms. Match promo page (`promo/`)

Written with Impeccable `shape` on 2026-11-12, from `docs/designs/promo-page-content.md` and `PRODUCT.md`. Status: approved, on the condition that the existing pages are not harmed (see Scope).

## 1. Job and audience

A Persuade surface. A stranger, a classmate or the teacher arrives from the submitted link; the real audience is people like the author. Within seconds they must see what Ms. Match does (the weather picks the outfit), who it is for, and that they can try it in one click.

## 2. Outcome and proof

- Primary action: **Try it now**, opening the live atelier (`../renaissance/`) with the demo closet.
- Success: the visitor understands it in three seconds, clicks, and sees a working **Match me** without uploading anything.
- Proof: real screenshots of the running atelier (the arrival look, Match me, the re-spin of one piece, the muse with the stylist's note, the calendar), captured in a clean browser profile with the demo closet only and checked for anything personal.
- Every claim comes from `PRODUCT.md` and `docs/designs/promo-page-content.md`; nothing is invented.

## 3. Selected direction

- **World (inherited):** the renaissance atelier. Ivory, linen and parchment grounds, umber ink, gold leaf, oxblood rubrics, gilded frames; Cormorant Garamond, Cinzel and Manrope, inherited from `renaissance/`, not chosen anew.
- **Structure:** *The book of hours* (`seed:d386e07b7a0706a7`): the morning set out as a book of hours.
- **First viewport:** the opening page in a gilded border. In the left margin, a calendar of the five hours (*I · 7:00 Check the sky … V · 7:04 Wear it*), labelled "An example morning. Ms. Match keeps no clock." In the centre, an arch-topped miniature holding the atelier-on-arrival screenshot; under it the oxblood rubric *Flora, after Botticelli. Dressed for 16°, overcast, 6% rain.* A gilt initial **L** opens the headline "Let today's weather pick today's outfit.", followed by one line on what it does and for whom, then **Try it now** (oxblood) and **See the code on GitHub**.
- **Below:** one hour per step of the morning (miniature, rubric, short text, as in the content plan), then *Who it's for*, *Your photos stay with you* (with the shared-address caveat), *How to try it*, and a colophon with the credits.
- **Signature:** the margin calendar stays with the reader (sticky on desktop) and marks the hour being read; the reading position is the hour.
- **Reference sketch:** `.impeccable/mocks/decision/hours.html` (local only, not committed).

## 4. Scope and boundaries

- One page: `promo/index.html`, its own stylesheet, and `promo/img/`. Production quality on desktop and phone.
- **The existing pages are not harmed:** `index.html`, `css/`, `js/` and `renaissance/` are not changed. Before every commit: `git diff --stat HEAD -- index.html css js renaissance` is empty and `node --test` is green.
- Links are relative: `../renaissance/` (Try it now) and `../` (the original look).
- Anti-goals: a generic landing page (feature cards, icon tiles, numbers); any untrue claim; medieval costume (blackletter, Latin, aged-parchment effects).

## 5. States and ranges

- Five hours of one to three sentences each; six images, the hero being a crop of the first screenshot.
- Until the screenshots exist, labelled placeholders stand in; the page does not ship without them.
- Images have fixed dimensions and load lazily below the first viewport. All content reads without JavaScript.

## 6. Interaction and layout

- Hierarchy: headline, then the miniature, then Try it now.
- Desktop: the margin calendar (sticky) beside the main column; its items jump to their hours.
- Phone: one column; the calendar becomes a row of hours under the opening; Try it now stays in the first screen.
- Visible focus states, `prefers-reduced-motion` respected, AA contrast, a descriptive `alt` for every screenshot, `lang="en"`.

## 7. Constraints and open decisions

- Fonts load from Google Fonts, as on the app pages (decided).
- Screenshot numbers must match the copy (content plan, Open Question 1).
- Credits for the putti and Eugénie images if the wall shows in a screenshot (Open Question 3).
- What GitHub Pages serves is decided before step 4 (Open Question 4).
- The `generate` step targets the opening page.
