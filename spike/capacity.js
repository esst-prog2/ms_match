/* ------------------------------------------------------------------
   spike/capacity.js — finds the piece count at which localStorage gives up.

   Paste into the console AFTER your own pieces are in the closet. It
   copies your pieces over and over into the stored closet until
   setItem throws, reports the count, and then puts the closet back
   exactly as it was.

   Keep the console output: it is the evidence that the number is real.
   spikeSaveCapacity() downloads it as spike-capacity.json.
   ------------------------------------------------------------------ */

(() => {
  const KEY = 'msmatch.closet';
  const original = localStorage.getItem(KEY);
  if (!original) { console.error('no closet stored yet'); return; }

  const closet = JSON.parse(original);
  const mine = closet.filter(i => String(i.id).startsWith('u'));
  if (!mine.length) {
    console.error('no pieces of your own in the closet - add them first, or the number will describe the stock photos');
    return;
  }

  const otherKeys = Object.keys(localStorage)
    .filter(k => k !== KEY)
    .map(k => ({ key: k, bytes: (localStorage.getItem(k) || '').length }));

  const avgPieceBytes = Math.round(JSON.stringify(mine).length / mine.length);
  console.log(`starting from ${closet.length} pieces (${mine.length} of them yours, about ${(avgPieceBytes / 1024).toFixed(1)} KB each)`);

  const work = closet.slice();
  let added = 0, lastGoodBytes = original.length, threw = null;

  try {
    for (;;) {
      const src = mine[added % mine.length];
      work.push({ ...src, id: 'spike-' + added });
      const payload = JSON.stringify(work);
      localStorage.setItem(KEY, payload);            // throws when the quota is reached
      lastGoodBytes = payload.length;
      added++;
      if (added % 25 === 0) {
        console.log(`  ${work.length} pieces stored, ${(lastGoodBytes / 1024).toFixed(0)} KB`);
      }
      if (added > 20000) { console.warn('stopped at 20000 added - no limit found'); break; }
    }
  } catch (e) {
    threw = e.name || String(e);
    console.log(`THREW: ${threw}`);
    console.log(`last piece stored successfully: #${work.length - 1}`);
    console.log(`failed while storing piece #${work.length}`);
    console.log(`closet at that point: ${(lastGoodBytes / 1024).toFixed(1)} KB`);
  } finally {
    localStorage.setItem(KEY, original);             // put it back
    console.log(`closet restored to ${closet.length} pieces`);
  }

  const result = {
    recordedAt: new Date().toISOString(),
    userAgent: navigator.userAgent,
    startedWith: { total: closet.length, mine: mine.length },
    avgPieceBytes,
    piecesThatFit: work.length - 1,
    failedAtPiece: work.length,
    lastGoodBytes,
    otherKeys,
    threw,
  };
  window.__spikeCapacity = result;

  console.log('---');
  console.log(`ANSWER: ${result.piecesThatFit} pieces fit; storing #${result.failedAtPiece} threw ${threw}`);
  console.log('spikeSaveCapacity() to download this');

  window.spikeSaveCapacity = () => {
    const blob = new Blob([JSON.stringify(result, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'spike-capacity.json';
    a.click();
  };
})();
