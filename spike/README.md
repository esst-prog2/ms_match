# Spike: what does one real garment cost?

Every piece in `js/closet.js` is a stock photo, and the README claims
`localStorage` holds "roughly 50 to 60 photos". That figure was guessed. This
spike measures it with my own garments.

**The question.** What does one real garment cost, in minutes and in stored
bytes, and at how many pieces does `localStorage` give up?

**What counts as an answer.** Three numbers: minutes per piece, kilobytes per
piece, and the piece count at which `setItem` throws, set against the 50 to 60
the README claims.

## Running it

Serve the app over http (not `file://`, or storage behaves differently):

```
python -m http.server 8123
```

Open <http://127.0.0.1:8123/index.html>.

**1. Before adding anything**, paste the whole of `measure.js` into the
console. It listens to every write to the closet and asks for a stopwatch
reading after each piece.

**2. Photograph and add ten of your own pieces, one at a time.** Start the
stopwatch when you pick the garment up, stop it when the piece appears in the
closet, and type the seconds into the prompt. Same background, same distance,
same phone for all ten, or the sizes will not be comparable.

**3. When the ten are in**, run `spikeSave()` in the console and put the
downloaded `spike-adds.json` in `data/`.

**4. Then paste `capacity.js`.** It copies your pieces into the stored closet
until the browser refuses, reports the count, and puts the closet back the way
it was. Run `spikeSaveCapacity()` and put `spike-capacity.json` in `data/`
too. Keep the console output.

**5. Read the numbers off:**

```
node spike/analyse.js
```

Those three numbers go in `PLANNING_LOG.md`, and whatever they contradict gets
corrected.

## Checking it

`analyse.js` reads only what is committed under `data/`, so running it again
prints the same numbers the log claims. `data/spike-adds.json` holds the
pieces themselves, so the sizes can be recomputed from the photos they came
from.

## Files

| | |
|---|---|
| `measure.js` | console script: records bytes and stopwatch per added piece |
| `capacity.js` | console script: duplicates pieces until `setItem` throws |
| `analyse.js` | `node spike/analyse.js` - prints the three numbers from `data/` |
| `data/` | what the two console scripts downloaded |

The scripts were rehearsed against the bundled stock photos before the real
run, to check they work end to end. Those rehearsal numbers are not the
answer and are not kept: stock files are already resized, which understates
the cost of a piece and so overstates how many fit.
