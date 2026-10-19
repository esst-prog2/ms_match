# Review 6: tests

**Scope:** `tests/` against the rest of the repository, looking only at what the tests prove and what they leave unproven. Before this review there was one test (the HW5 storage test). The README's section 4 lists six things that would show the app works, and none of them was tested except the storage one.

## Findings

| # | Where | Finding | Action |
|---|---|---|---|
| 1 | `tests/storage.test.js` | The stub DOM, the fake localStorage and the vm loader lived inside the one test file, so a second test file would have had to copy them. | **Moved** to `tests/harness.js`. `startApp()` now takes a quota or an existing storage, and a second `startApp` on the same storage acts as a page reload. The storage test is unchanged otherwise and still passes. |
| 2 | README 4.1 (rain → rain-ok shoes) | Untested. | **Test added.** At 70% rain the suggested shoes are d15, the only rain-ok pair in the demo closet. Run 20 times because of the random tie-break. |
| 3 | README 4.2 (dress empties the bottom) | Untested. | **Test added.** The lace dress over black jeans leaves no bottom id and an empty bottom pin. |
| 4 | README 4.6 (worn look survives a reload) | Untested. | **Test added.** Wear a look, start the app again on the same storage, and today's calendar entry points to that look. |
| 5 | Review 1 (escaping) | The XSS fix had no test. | **Test added.** A piece named `<img src=x onerror=alert(1)>` appears escaped in the closet HTML. |
| 6 | Review 2 (refused look, unreadable photo) | The two fixes had no test. | **Tests added.** With a 40-character quota the look is not kept and the status says storage is full. A photo that fails to load adds nothing and is reported. |
| 7 | README 4.3 and 4.4 (polaroid layout, name and pin on each card) | These are about what the page looks like, which a stub DOM cannot see. | **Not tested** automatically. They stay a check by eye in the browser. |

## Every new test was seen red

Each fix was undone on its own, one at a time, and `node --test` was run:

| Undone | Test that failed |
|---|---|
| `esc()` on the closet label | 4, escaping |
| rolling back a refused look | 5, refused look |
| the rain-only filter in `suggest()` | 1, rain shoes |
| hiding the bottom pin under a dress | 2, dress |
| catching an unreadable photo | 6, unreadable photo |
| writing `history` in wearLook | 3, calendar after reload |

With everything put back: `node --test` gives tests 7, pass 7, fail 0.
