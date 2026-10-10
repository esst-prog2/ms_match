/* ------------------------------------------------------------------
   tests/storage.test.js — does the closet keep its storage promise?

   A test would go red if 70 photos of median size no longer fit next to
   the 21 demo pieces, or if the 71st looked added even though storage
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
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const QUOTA = 5 * 1024 * 1024;        // 5,242,880 characters, keys and values
const PIECE_CHARS = 72.5 * 1024;      // 74,240 characters per stored piece
const DEMO = 21;
const FIT = 70;                       // expected: this many of mine fit
const REFUSED = FIT + 1;              // expected: this one is refused

// localStorage as Chrome behaves at its limit: a write that would take the
// origin past the quota throws and leaves the old value in place.
function fakeStorage(quota) {
  const data = new Map();
  const used = () => [...data].reduce((n, [k, v]) => n + k.length + v.length, 0);
  return {
    getItem: k => (data.has(k) ? data.get(k) : null),
    setItem(k, v) {
      v = String(v);
      const after = used() - (data.has(k) ? k.length + data.get(k).length : 0) + k.length + v.length;
      if (after > quota) { const e = new Error('quota exceeded'); e.name = 'QuotaExceededError'; throw e; }
      data.set(k, v);
    },
    removeItem: k => data.delete(k),
  };
}

// Just enough DOM for app.js to start: every element accepts any property and
// any call. The same selector always gives the same element, so the status
// line can be read back.
function stubElement() {
  const props = {};
  const fn = function () {};
  return new Proxy(fn, {
    get(_, k) {
      if (k === Symbol.toPrimitive) return () => '';
      if (k in props) return props[k];
      if (k === 'forEach' || k === 'addEventListener') return () => {};
      return stubElement();
    },
    set(_, k, v) { props[k] = v; return true; },
    apply: () => stubElement(),
  });
}

function startApp() {
  const elements = new Map();
  const $ = sel => { if (!elements.has(sel)) elements.set(sel, stubElement()); return elements.get(sel); };
  const ctx = vm.createContext({
    localStorage: fakeStorage(QUOTA),
    document: { querySelector: $, querySelectorAll: () => [], getElementById: id => $('#' + id), addEventListener() {} },
    navigator: {},                                         // no geolocation: default place
    fetch: () => Promise.reject(new Error('offline')),     // no forecast
    FormData: class { constructor(form) { this.form = form; } get(k) { return this.form[k]; } },
    setTimeout, clearTimeout, console,
  });
  for (const file of ['js/closet.js', 'js/app.js']) {
    const src = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    vm.runInContext(src, ctx, { filename: file });
  }
  return ctx;
}

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

const run = (ctx, code) => vm.runInContext(code, ctx);

test(`${FIT} median pieces fit next to the ${DEMO} demo pieces, and piece ${REFUSED} is refused and not shown as added`, async () => {
  const ctx = startApp();
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
