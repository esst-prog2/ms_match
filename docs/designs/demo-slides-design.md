# Demo slides: design

Status: draft, 2026-11-26. For the demo homework ("Five slides, five minutes"), due Saturday 28 November 2026, 20:00. Talk: Day 1, Tuesday 1 December 2026, fourth in the order (the order can still change until Friday 27 November).

## Intent

Five reveal.js slides and a closing slide for a five-minute talk about Ms. Match, opened on one shared computer from `https://esst-prog2.github.io/ms_match/slides/`. They should be beautiful, carry very few words, and have speaker notes that Inez reads from while talking.

The audience scores **the program, not the slides**. Right after the talk, each classmate taps 1 to 5 on three statements: *I understand what it does and who it is for. It solves a problem worth solving. I would use it, or I know someone who should.* These scores are 40% of the grade. The teacher's 20% looks at the quality of the submissions and at how well Inez kept control of the development, which slide 3 has to show. So every slide serves one of these: understand it, care about it, want to use it, or see who was in control.

The teacher's advice for the talk, from session 10: open with a promise, say the main point more than once, do not read the slides, and keep few words on a slide, a short label next to the picture it explains. His example deck (`esst-prog2.github.io/10-blindspot.html`) shows the format: one title per slide, a real screen recording on the demo slide that plays one step per click with a numbered caption, and a closing slide with the name and the link.

## Goals

- Five slides in the set order, then a closing slide with the link:
  1. For whom, and why
  2. The demo: the program, from a real run
  3. Why it works: a check that shows Inez was in control, not the agent
  4. What I learned: one concrete moment from the repository
  5. What's next
- The main point, said on slide 1 and again on slides 2 and 3: **the weather picks the outfit, in one click.**
- At most about 15 words of main text per slide (title and labels). Small print, such as the byline, a source line or a name under a picture, does not count, but stays small. The draft lines below run longer and are cut when Inez reviews the slides.
- Speaker notes on every slide, about five minutes in all.
- The same world as the promo page and the renaissance atelier, so the page, the video and the slides read as one brand.

## Non-goals

- No live run of the app during the talk ("a presentation, not a live run").
- No sound. The demo video is silent and the captions carry it.
- No change to the app. Root `index.html`, `css/`, `js/`, `renaissance/` and `promo/` stay exactly as they are.
- The promo video (HW10) is not used. It is an animated concept, not a real run.

## Anti-goals: wrong even if it looks good

- A claim the code does not back. In particular, **Match me** follows rain only, not warmth (`PRODUCT.md`). Anything about warmth belongs to the arrival look and the ↻ re-spin, or to "What's next".
- Anything personal on a slide or in the notes. Both are public. No photo of Inez, none of her own clothes, no local paths, no e-mail.
- Slides full of sentences that she ends up reading aloud.
- Looking like a generic template deck.
- Invented numbers, testimonials or users.

## Constraints

- reveal.js, **one HTML file**: `slides/index.html`.
- GitHub Pages is built by `.github/workflows/pages.yml`, which copies only `index.html css js assets renaissance promo` into `_site`. `slides` must be added to that copy line, or the address returns 404.
- The deck must work from the live address on a computer that is not Inez's. It may load fonts from Google Fonts like the other pages. Everything else, reveal.js included, is served from the repository.
- Repository text is English: slides, notes, commits, `PLANNING_LOG.md`, `PROCESS.md`.
- Process rules (`AGENTS.md`): every decision gets one line at the end of `PLANNING_LOG.md` (date, what, who decided). After each step: a commit and a row in `PROCESS.md` (the step, what the tool did, what Inez decided).
- Work happens on the branch `demo-slides`. It is merged into `main` locally and pushed to `origin` only (never `fork`), after Inez says go.
- Before installing any tool, say what goes where. Nothing from a tool goes into the repository unless Inez decides so.

## Approaches

1. **Hand-written reveal.js with its own renaissance theme. Chosen.** One `slides/index.html`. reveal.js 5 is copied into `slides/` at a pinned version, so the talk does not depend on a CDN on the day. Media sits next to it. Speaker notes come from reveal's notes plugin. This gives full control of the look, and the deck stays a plain file that can be edited.
2. **A generated deck (Quarto or Markdown into reveal.js).** Rejected: a new tool to install, and less control over the look.
3. **Everything inlined into one large file with data URIs, like the teacher's 5 MB deck.** Rejected: every small fix rewrites megabytes. One `index.html` with its media beside it already meets "one HTML file".
4. **PowerPoint.** Rejected: the homework asks for reveal.js on Pages.

Demo slide: (A) a recorded real run, played one step per click, was chosen by Inez over (B) a row of still screenshots, because the spin and *Bellissima.* are the product's magic and a still cannot show them.

## Decided

| Decision | By |
|---|---|
| Demo slide: a recorded real run, one step per click (option A) | Inez |
| Slide 3: the rainy-day check from HW6 review 8 (Match me and the black boots) | Inez |
| Slide 4: the new look, "it worked, but never felt like mine" | Inez |
| Slide 5: a coat over the top; Match me follows warmth too; on my phone, every morning | Inez |
| Demo step 3 re-spins the extra, not the shoes; the first clean take is kept whatever Match me picks | Inez |
| Hand-written reveal.js, pinned and served from `slides/` | Claude, agreed by Inez |
| The look follows the promo page and the atelier | Claude |
| Speaker notes in reveal's speaker view (press S), in English | Claude |
| A printable notes sheet with a Hungarian helper translation, kept outside the repository | Claude |
| Closing slide: the promo page address, plus a QR code if the atelier passes the phone check below | Claude |
| The byline says "Inez", first name only, as in the HW7 answer | Claude |

## The slides

Slide titles follow the teacher's wording. Labels are a first draft and Inez approves the final words.

**Opening promise** (notes of slide 1, the first thing said): "In five minutes you will know how I get dressed in one click on a rainy morning, and why you can trust that click."

**1 · For whom, and why**
- Picture: Flora in her gold frame, dressed for the day. Use a still from the demo recording, so it matches slide 2.
- Words: *For people who'd rather decide in one click than stand at the wardrobe.* / *Why: mornings are short, and I'm always late.* (Changed after Inez's review on 2026-11-26: the point is the time it saves, not the weather, since she can check the weather herself.) Small line: *Ms. Match · Inez · free · no account · photos stay in your browser*.
- Notes: who it is for (people like me), the problem (a full closet and nothing that fits today's weather), the main point said for the first time.

**2 · The demo**
- A screen recording of a real run of the live atelier (`renaissance/#atelier`), with a numbered list of five steps, three to five words each. *Changed after Inez's review on 2026-11-26:* the recording no longer plays one segment per click. It starts by itself when the slide opens and plays once to the end, and each step on the left lights up while the video is inside it, with a thin gold line showing how far. *Changed again the same day, at Inez's request:* step by step after all. When the slide opens, the video plays the sky and stops with the cursor resting on Match me. Each "next" clicks that button in the video and plays on until the cursor rests on the next one (the ↻ of the extra, Wear it today, the Outfit calendar). The stops are at 5.5, 14.95, 20.85 and 29.65 s, read off the recorded frames. The lit step and the gold line stay. The steps:
  1. Today's sky. (forecast, and Flora already dressed for it)
  2. One tap: Match me. (the closet spins, *Bellissima.*, the look settles)
  3. Spin just one piece. (the ↻ on the extra: only that piece changes)
  4. Wear it today. (the status bar confirms it)
  5. Remembered. (the Outfit calendar shows today with the look)
- The captions and notes describe what the recording really shows on its day: temperature, rain, pieces, the stylist's note.
- Notes: one or two sentences per step, the main point said again.
- **Why the extra and not the shoes** (found in the builder check, confirmed in the code): every day left before the deadline is rainy by the app's rule (`dayRule()`: rain 50% or more, or a rain or drizzle code). On a rainy day Match me always ends on the black boots, the only rain-proof shoes. A re-spin of the shoes takes the boots out and, with no other rain-proof pair left, drops the rain filter and lands on the white sneakers (`best()` in `renaissance/index.html`). That would contradict slide 3. On a rainy 3° day the extra's re-spin always lands on a warm, rain-proof piece, the red beret or the striped scarf, so step 3 shows the weather at work too.
- **One take, kept as it is.** The first clean run is used, whatever Match me picks. Match me follows rain only, so on a cold day it may put Flora in a tee. If it does, the notes say so plainly ("Match me keeps to rain-proof pieces, but it doesn't look at warmth yet") and point to slide 5. A take is redone only for a technical fault (a missed click, a stalled load, a cut-off frame), never for the look it gives.

**3 · Why it works: I checked it, not the agent.**
- Picture: a rain mark with **70%**, then three framed shoes from the demo closet: white sneakers ✗, red heels ✗, black boots ✓ (`assets/clothes/sneakers-white.jpg`, `heels-red.jpg`, `boots-black.jpg`).
- Words: *Said before running: only the boots.* / *Red: white sneakers. Fixed. Green: 30 of 30.*
- Small source line: `reviews/08-readme-promises.md` · `tests/rules.test.js`.
- Notes, from `reviews/08-readme-promises.md` and the 2026-10-17 lines of `PLANNING_LOG.md`: in session 5 the teacher showed that on a rainy day Match me could still pick trainers or heels, and no test noticed. The answer was written down first: of three pairs only the black boots are rain-proof, so at 70% rain every Match me must end on them. The test went red against the old code (it picked the white sneakers), then green after the fix (it runs Match me 30 times). The rule now lives in one place, `dayRule()`, shared with the arrival look. This is the main point, checked.

**4 · What I learned**
- Picture: two real screenshots side by side, the original polaroid page (root `index.html`) and the renaissance atelier.
- Words: *"It worked. It never felt like mine."* / *A page I love opening is a page I open every morning.*
- Small source line: *27 Oct 2026 · commit 8f2c9a8* (the first renaissance commit; the reasoning is in the README, "Why a second look").
- Notes: the first look did everything it should and still was not hers. She built a second look without touching the first: same closet, same code, a new page. Being worth opening every morning is part of the product, not decoration (PRODUCT.md, principle 5).

**5 · What's next**
- Three numbered items, a label and one short line each, in the teacher's format:
  1. *A coat over the top.* A fifth place for layers.
  2. *Match me follows warmth too.* Today it follows rain.
  3. *On my phone, every morning.* Where I get dressed.
- Notes: why each one, from the README's limits (four slots) and `PRODUCT.md`.

**Closing slide** (not one of the five)
- *Ms. Match*, the address `esst-prog2.github.io/ms_match/promo/`, the byline, and a QR code to the same address.
- **Phone check before the QR goes in:** open the live atelier at phone width (about 390 px). If Match me and the look are usable, keep the QR ("try it now, on your phone"). If not, drop the QR and show the address only, so nobody's first try is a broken phone layout.

## The demo recording

- A real run of the published atelier in a fresh browser profile with empty storage: demo closet, a painted model, nothing of Inez's. A location request is declined, so the forecast is Budapest's real one on the recording day.
- A 16:9 window in which the whole atelier fits, for example 1600 × 900.
- A visible cursor, drawn by a small script injected into the recording browser only (never into the app's files), so viewers see where each click lands.
- The status bar and the Outfit calendar button sit below the atelier, so steps 4 and 5 need a smooth scroll in the recording.
- Encoded as H.264 MP4 without sound, with a poster image, in `slides/media/`. A few MB at most.
- Step boundaries live as a list of times in the slide's script; the script lights up the step the video is in (see the change above).
- Every frame is checked for anything personal before it is committed.

## Speaker notes

- In `<aside class="notes">` on each slide, shown in reveal's speaker view (press **S**): the current slide, the next one, a timer, and the notes below.
- Plain spoken English, short sentences, about 120 words per slide, so the five slides take about five minutes.
- The main point comes three times: slides 1, 2 and 3.
- Nothing private, since anyone with the link can read them.
- A printable sheet of the same notes, with a Hungarian helper translation under each slide, goes to `Documents\Advanced programming\`, outside the repository. It is for Inez only, in case the speaker view is not available on the shared computer.

## The look

- Palette, fonts and texture from `promo/style.css`: linen, ivory and parchment grounds; umber text; gold leaf; oxblood accents; Cormorant Garamond for display, Cinzel for small capitals, Manrope for small print; the faint canvas grain.
- Pictures sit in the carved gold frame from `renaissance/frame.svg`, as in the atelier.
- Slide numbers as Roman numerals, like the hours on the promo page: I to V.
- Calm transitions: fade, no spins or zooms. A thin gold progress bar. No reveal controls on screen.
- Every image has alt text, and the video has an aria-label describing what happens, like the teacher's deck.

## Publishing and checks

1. Add `slides` to the copy line in `.github/workflows/pages.yml`.
2. Locally: serve the repository root with `python -m http.server`, open `/slides/`, step through every slide and fragment, and open the speaker view.
3. Take a screenshot of every slide for Inez to review. The look is polished in rounds from those.
4. Before each commit: `git diff` shows no change to root `index.html`, `css/`, `js/`, `renaissance/` or `promo/`, and `node --test tests/storage.test.js tests/rules.test.js` passes 8 of 8. Plain `node --test` also picks up `_hyperframes/`.
5. After Inez says go: merge into `main` locally, push to `origin`, wait for the Pages run, then open `esst-prog2.github.io/ms_match/slides/` from outside: every slide, the video and the speaker view work.
6. Inez submits the address and signs in to Front Row on her phone.

## Left to the builder

- The recording tool and how the video is cut. It is installed outside the repository, and Inez is told what goes where first.
- The exact reveal.js 5 version, pinned.
- Whether slide pictures are copied into `slides/media/` or referenced from the app's published folders (`../assets/`, `../renaissance/`).
- CSS details within the look above.
- The first draft of labels and notes, which Inez approves.

## Steps, one commit and one PROCESS.md row each

1. This design.
2. The demo recording.
3. The slides, first version, with the workflow line.
4. Polishing the look, from Inez's feedback.
5. Publishing: merge, push, live check.
