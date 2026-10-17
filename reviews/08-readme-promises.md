# Review 8: does the code keep the README's promises?

**Scope:** every promise in `README.md`, checked one by one against the code and against an answer from outside the program. This follows the session 5 question "Would you notice?", where one line was changed in each project so that its main README promise became false and none of the tests went red. The session 5 slide on Ms. Match says: *"on a rainy day the outfit button ignores the weather, so it may still pick trainers or high heels."*

## Findings

| # | Promise | What the code did | Action |
|---|---|---|---|
| 1 | README section 1: on a 14°, 70% rain day, **Match me** ends on the knit sweater, black jeans and **the boots**. | `matchMe()` picked a random piece per slot from the whole closet and never looked at the forecast. Only **Dress me for this weather** (`suggest()`) used the rain rule. On a rainy day Match me picked the white sneakers or the red heels two times in three. | **Fixed.** `randomLook()` uses the same `dayRule()` as `suggest()`, and on a rainy day only rain-ok pieces take part in a slot that has any. |
| 2 | README section 4: rain-ok shoes at 50% rain or more. | Was tested for `suggest()` only (review 6). | **Test added** for Match me, see below. |
| 3 | No server, photos never leave the browser, storage numbers, dress rule, calendar after reload. | Kept, and checked in reviews 1, 6 and 7. | Nothing more to do. |

## Red, then green

Expected value, said before running and taken from the demo closet in `js/closet.js`, not from the program: of the three pairs of shoes only d15 (black boots) is rain ok, so on a 70% rain day every Match me must end on d15.

- **Red**, the test written first, against the old code: `not ok 7 - on a 70% rain day Match me never picks trainers or heels, only the black boots`, *Match me #1 picked d14* (the white sneakers). Tests 8, pass 7, fail 1.
- **Green**, after the fix and nothing else: tests 8, pass 8, fail 0. The test runs Match me 30 times, with the animation's timers made instant (`fastTimers` in `tests/harness.js`).
