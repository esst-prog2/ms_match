# Critique: the Ms. Match promo page

Impeccable `critique` of `promo/index.html`, 2026-11-12 (step 3c). Score 23/32 (Good; heuristics 7 and 9 n/a). P0: 0, P1: 1.

This round fixed the weakest part (the Try it now handoff, now `../renaissance/#atelier` plus a sentence on the location prompt) and the quick typography findings. The other P2/P3 issues below are left for later.

Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Desktop margin calendar marks the hour being read; on phone there is no position signal |
| 2 | Match System / Real World | 3 | Plain first person; "I · 7:00" and "keeps no clock" read like riddles; `python -m http.server` is jargon |
| 3 | User Control and Freedom | 3 | Plain links, Back works; no quick way back to the hours on phone |
| 4 | Consistency and Standards | 3 | Try it now lands on a second hero with different words ("Enter the atelier") |
| 5 | Error Prevention | 2 | The location advice for the shared origin sits ~4,500px below the CTA |
| 6 | Recognition Rather Than Recall | 3 | That advice must be remembered across pages |
| 7 | Flexibility and Efficiency | n/a | Persuade surface, no expert path |
| 8 | Aesthetic and Minimalist Design | 3 | Coherent; demo caveat stated three times; hour IV strip is an unreadable repeat |
| 9 | Error Recovery | n/a | No inputs or error states |
| 10 | Help and Documentation | 3 | How to try it is task-ordered; step III is overloaded |
| **Total** | | **23/32** | **Good (72%)** |

## Design Specificity Verdict

LLM assessment: authored, not interchangeable. The book-of-hours conceit comes from the product: the margin calendar is both contents and reading position, rubrics act as museum labels, palette and initial come from the app's renaissance page, and the hero explains the product in one picture. The conceit ends at hour V; Who / Photos / How fall back to plain landing-page prose. Hours II, III and V show UI chrome more than imagery.

Deterministic scan: CLI `impeccable detect` on promo/index.html: 0 findings (also 0 with --no-config). Browser overlay: 1440x900, 5 findings (straggler: p.lede "frame.", How-to li "calendar." splitting the bold label; line-length 89-94 chars: hour II p, both privacy paragraphs). 390x844, 7 findings (6 stragglers: p.lede, p.sub, hours I, II, IV, How-to li 1; unbalanced h2 "Your photos stay with you"). Mobile stragglers are low-value; shared fix: text-wrap: pretty on body text, balance on h2/h3, ~32em measure. Not caught by the detector: at 390px the inline code esst-prog2.github.io and "Open-Meteo" break at their hyphens.

Visual overlays: injected in a headless review tab only; not visible in the user's browser.

## Overall Impression

The first viewport lands in three seconds (Flora wearing pinned pieces, "Dressed for 8° and rain"). The weak point is what happens after the visitor presses Try it now.

## What's Working

1. One picture explains the product; Try it now is above the fold at 1440x900, 1024x768 and 390x844.
2. The sticky margin calendar is a useful signature: contents plus reading position, aria-current, reduced-motion aware, plain links without JS.
3. Honest, gradeable copy and solid craft: the three homework questions have their own h2, AA contrast, visible focus, no overflow, clean console, nothing personal.

## Priority Issues

- **[P1] The Try it now handoff breaks the promise.** It opens the renaissance page's own hero ("The art of getting dressed / Enter the atelier"); Flora and Match me sit 1,144px lower; the location prompt fires on load and, unanswered, leaves Flora undressed. Fix: link both CTAs to ../renaissance/#atelier (promo only) and add to the hero small print "If it asks for your location, 'no' is fine: it uses Budapest." Command: /impeccable onboard
- **[P2] The story's proof weakens toward the end.** Hour V is a near-empty month grid with a ~40px look; hour IV's strip is an unreadable repeat; hours II and III show near-identical crops with the changed card unmarked. Fix: crop V to the week row around the 12th; drop the IV strip; mark the changed card in III. Command: /impeccable layout
- **[P2] Phone: broken sequence, no signature.** Hour III's plate renders before its heading under hour II's image; hour chips are clipped, 38px, hidden scrollbars, not sticky; no CTA between hero and bottom. Fix: text before plate in hour III on phone; 44px chips with a scroll cue; consider a sticky Try it now. Command: /impeccable adapt
- **[P2] The product name has little presence.** 27px italic in the margin on desktop, hidden on phone. Fix: put "Ms. Match" in the hero rubric or a running head at the folio top (not a kicker above the h1, which the craft floor bans). Command: /impeccable typeset
- **[P3] The lower third drops the conceit and ends on worry and a terminal command.** Fix: lead the caveat with the action in two short sentences; make Try it now the last illuminated moment; move run-your-own-copy after it, quieter. Command: /impeccable distill

## Persona Red Flags

- **Classmate:** looks for how it is built and finds only a GitHub link (add a one-line stack note); "Those pages could read what you store there" can read as pointing at fellow students.
- **Teacher:** what/who/how each have an h2; running program linked and verified; nothing personal. The margin calendar lists "Who it's for" and "How to try it" but not "What it's for".
- **Stranger:** gets what it does, barely what it is called; "from your own closet" meets "You need Python 3" at the bottom.
- **Jordan (first-timer):** "keeps no clock" reads as a riddle; screenshot buttons look clickable.
- **Riley (stress tester):** caption names a pink bag dated today while the live arrival look can differ (suggest() has a small random tie-break); marker blinks off between sections and lags at 1024; Try it now from a file:// copy opens a folder listing.
- **Casey (mobile):** clipped 38px chips, no sticky navigation, hour IV strip and status chip break apart.

## Minor Observations

- At 390px esst-prog2.github.io and Open-Meteo break at hyphens.
- The boxed initial can make the headline scan as "et today's weather".
- Hour I and II crops clip the "The sky" / "The look" titles.
- The surface brief's FIRST VIEWPORT block still describes the pre-generate layout.
- Stragglers and long lines share one fix: text-wrap: pretty on p/li, balance on h2/h3, ~32em measure.

## Questions to Consider

- Is the page selling the demo or the product? What would it say if it called the live atelier a showroom?
- Why does Try it now open a second landing page instead of Flora with Match me under the thumb?
- Should the morning end on the calendar, the least beautiful image, or on Flora dressed?

WEAKEST PART: the Try it now handoff: the promise "press Match me straight away" is not delivered where the page sends the visitor.
