/* ------------------------------------------------------------------
   tests/rules.test.js — the README's section 4 rules, and the fixes
   from the HW6 reviews, each pinned by one test.

   Every expected value is written from the rule or the demo closet in
   js/closet.js, not from running the app.

   Run with:  node --test
   ------------------------------------------------------------------ */

const test = require('node:test');
const assert = require('node:assert/strict');
const { fakeStorage, startApp, run, el } = require('./harness');

const day = over => JSON.stringify({ date: '2026-11-30', code: 3, tmax: 14, tmin: 8, rain: 0, ...over });

// README 4.1: rain probability of 50% or more -> rain-ok shoes whenever a pair exists.
// The demo closet has exactly one such pair: d15, the black boots.
test('at 70% rain the suggested shoes are the only rain-ok pair, the black boots', () => {
  const ctx = startApp();
  for (let i = 0; i < 20; i++) {                 // suggest() has a random tie-break
    run(ctx, `weather.days = [${day({ rain: 70 })}]; weather.day = 0; suggest()`);
    assert.equal(run(ctx, 'current.shoes'), 'd15');
  }
});

// README 4.2: a dress empties the bottom slot and no bottom card is shown.
test('choosing the lace dress over black jeans leaves no bottom on the board', () => {
  const ctx = startApp();
  run(ctx, `current.bottom = 'd10'; toggle(byId('d08'))`);
  assert.equal(run(ctx, 'currentIds()[1]'), null);
  assert.equal(el(ctx, '.pin[data-slot="bottom"]').innerHTML, '');
});

// README 4.6: a look worn on day X is still on day X after a reload.
test('a worn look is still on today in the calendar after a reload', () => {
  const storage = fakeStorage(5 * 1024 * 1024);
  const first = startApp({ storage });
  run(first, `current.top = 'd01'; wearIt()`);
  const today = run(first, 'dayKey()');
  const lookId = run(first, 'saved[0].id');

  const reloaded = startApp({ storage });
  assert.equal(run(reloaded, `history['${today}']`), lookId);
});

// HW6 review 1: a name is shown as text, never run as HTML.
test('a piece named like an HTML tag is escaped in the closet', async () => {
  const ctx = startApp();
  run(ctx, `shrink = async () => 'data:image/jpeg;base64,AAAA'`);
  await ctx.addItem({ photo: { size: 1 }, name: '<img src=x onerror=alert(1)>', cat: 'top',
                      warmth: '1', rain: null, full: null, reset() {} });
  const html = el(ctx, '#closet-grid').innerHTML;
  assert.ok(html.includes('&lt;img src=x onerror=alert(1)&gt;'), 'the name is in the page as text');
  assert.ok(!html.includes('<img src=x'), 'the name is not in the page as a tag');
});

// HW6 review 2: a look that storage refused is not kept or reported as saved.
test('a look refused by storage is taken back and reported', () => {
  const ctx = startApp({ quota: 40 });             // too small for any saved look
  run(ctx, `current.top = 'd01'; saveLook(false)`);
  assert.equal(run(ctx, 'saved.length'), 0);
  assert.match(el(ctx, '#status').textContent, /^storage is full/);
});

// HW6 review 2: a file that is not an image is reported, not swallowed.
test('a file that cannot be read as a photo is reported and adds nothing', async () => {
  const ctx = startApp();
  run(ctx, `shrink = async () => { throw new Error('not an image') }`);
  await ctx.addItem({ photo: { size: 1 }, name: 'notes', cat: 'top', warmth: '1', rain: null, full: null, reset() {} });
  assert.equal(run(ctx, 'closet.length'), 20);
  assert.equal(el(ctx, '#status').textContent, 'that file could not be read as a photo');
});

// Session 5, the note on Ms. Match: "on a rainy day the outfit button ignores
// the weather, so it may still pick trainers or high heels". README section 1
// promises the opposite: on a 70% rain day Match me ends on the boots.
// Expected value, said before running: the demo closet has three pairs of
// shoes and only d15, the black boots, is rain ok, so on a rainy day every
// Match me ends on d15 and never on d14 (white sneakers) or d16 (red heels).
test('on a 70% rain day Match me never picks trainers or heels, only the black boots', async () => {
  const ctx = startApp({ fastTimers: true });
  run(ctx, `weather.days = [${day({ rain: 70 })}]; weather.day = 0`);
  for (let i = 0; i < 30; i++) {
    await ctx.matchMe();
    assert.equal(run(ctx, 'current.shoes'), 'd15', `Match me #${i + 1} picked ${run(ctx, 'current.shoes')}`);
  }
});
