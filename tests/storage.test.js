/* ------------------------------------------------------------------
   tests/storage.test.js — does the closet keep its storage promise?

   A test would go red if 70 photos of median size no longer fit next to
   the 20 demo pieces, or if the 71st looked added even though storage
   refused it.

   The numbers below are not taken from running the app (PLANNING_LOG.md,
   2026-10-08):
     QUOTA        Chrome's localStorage limit, 5 MiB in characters
     PIECE_CHARS  72.5 KB, the spike's median growth of the closet per piece
     70 / 71 / 91 a count by hand: (5,242,880 - ~2,400) / 74,240 = 70.6

   Run with:  node --test
   ------------------------------------------------------------------ */

const test = require('node:test');
const assert = require('node:assert/strict');
const { startApp, run } = require('./harness');

const QUOTA = 5 * 1024 * 1024;        // 5,242,880 characters, keys and values
const PIECE_CHARS = 72.5 * 1024;      // 74,240 characters per stored piece
const DEMO = 20;
const FIT = 70;                       // expected: this many of mine fit
const REFUSED = FIT + 1;              // expected: this one is refused

// The id is 'u' + Date.now(), 14 characters, and the name has a fixed width,
// so every piece serialises to the same length. The photo is padded until
// the piece adds exactly PIECE_CHARS to the stored closet (its JSON plus the
// comma that separates it from the previous one).
function pieceForm(n) {
  return { photo: { size: 1 }, name: `my piece ${String(n).padStart(3, '0')}`, cat: 'top',
           warmth: '2', rain: 'on', full: null, reset() {} };
}
function photoOfSize() {
  const bare = { id: 'u' + Date.now(), name: 'my piece 001', cat: 'top', img: '',
                 warmth: 2, rain: true, full: false };
  const overhead = JSON.stringify(bare).length + 1;
  return 'data:image/jpeg;base64,'.padEnd(PIECE_CHARS - overhead, 'A');
}

test(`${FIT} median pieces fit next to the ${DEMO} demo pieces, and piece ${REFUSED} is refused and not shown as added`, async () => {
  const ctx = startApp({ quota: QUOTA });
  ctx.__photo = photoOfSize();
  run(ctx, 'shrink = async () => __photo');               // no canvas in Node
  assert.equal(run(ctx, 'closet.length'), DEMO);

  for (let n = 1; n <= FIT; n++) {
    await ctx.addItem(pieceForm(n));
    assert.equal(run(ctx, 'closet.length'), DEMO + n, `piece ${n} of ${FIT} should be in the closet`);
    assert.equal(ctx.document.querySelector('#status').textContent, 'added to your closet',
                 `piece ${n} of ${FIT} should be reported as added`);
  }

  await ctx.addItem(pieceForm(REFUSED));
  assert.equal(run(ctx, 'closet.length'), DEMO + FIT, `piece ${REFUSED} must not sit in the closet`);
  assert.match(ctx.document.querySelector('#status').textContent, /^storage is full/,
               `piece ${REFUSED} must be reported as not saved`);
  assert.equal(JSON.parse(ctx.localStorage.getItem('msmatch.closet')).length, DEMO + FIT,
               'the stored closet must still hold the pieces that fit');
});
