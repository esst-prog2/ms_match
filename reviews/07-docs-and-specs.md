# Review 7: documentation and specs against the code

**Scope:** `README.md`, `openspec/specs/`, `AGENTS.md`, `spike/README.md` and the file headers in `js/` and `tests/`, each checked against what the code does now, after reviews 1 to 6.

## Findings

| # | Where | Finding | Action |
|---|---|---|---|
| 1 | `openspec/specs/` | Reviews 1, 2 and 5 changed behaviour (escaped names, keyboard use, confirmation before deleting, no silent loss of looks, unreadable photos reported) that no requirement described. | **Fixed** the project's way: OpenSpec change `hw6-review-fixes` with a proposal, tasks and delta specs (+3 requirements in closet-storage, +2 in outfit-display). It passed `openspec validate --strict` and was archived, so `openspec/specs` is synced. |
| 2 | `README.md` intro and section 2 | "Nothing sent anywhere" and "One outside call" are not quite true: Open-Meteo receives my coordinates and Google Fonts is loaded from Google (found in review 1). | **Fixed:** "none of my photos sent anywhere", and section 2 names both outside calls. |
| 3 | `README.md` section 4 | Did not say which of the six checks are automated. | **Fixed:** 4.1, 4.2, 4.5 and 4.6 are tests in `tests/`, and 4.3 and 4.4 stay a check by eye. |
| 4 | `README.md` | No word on how to open the app or run the tests. | **Fixed:** a short "Running it" section. |
| 5 | `README.md` section 5 | The storage figures (72.5 KB per piece, 63 of my photos next to the 21 demo pieces) match `spike/data/spike-capacity.json` and the planning log. | Correct, nothing to do. |
| 6 | `openspec/specs/closet-storage` "The user can recover space" | True for pieces and looks, but uploaded model photos cannot be removed (review 2, finding 10). | **Left** as the next change, already in the planning log. The spec does not promise it, so it is not wrong, only incomplete. |
| 7 | `AGENTS.md`, `spike/README.md`, file headers | Accurate. `tests/storage.test.js` still explains its own numbers, and `tests/harness.js` says why it exists. | Nothing to do. |

## Check

`openspec validate --specs --strict`: 2 passed, 0 failed. `node --test`: 7 pass, 0 fail.
