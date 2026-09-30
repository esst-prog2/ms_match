/* ------------------------------------------------------------------
   spike/measure.js — records what each added piece costs.

   Paste the whole file into the browser console on the Ms. Match page
   BEFORE adding any pieces. It watches every write to the closet and
   notes how many of your own pieces are stored and how many bytes they
   take. Nothing is changed; it only listens.

     spikeRows()   prints the table so far
     spikeSave()   downloads spike-adds.json, which goes in spike/data/

   Start a stopwatch when you pick up a garment and stop it when the
   piece appears in the closet; type that reading into the prompt the
   script shows after each add. The wall clock is recorded too, so the
   two can be compared afterwards.
   ------------------------------------------------------------------ */

(() => {
  const KEY = 'msmatch.closet';
  const mine = list => list.filter(i => String(i.id).startsWith('u'));

  if (window.__spike) { console.warn('measure.js is already running'); return; }

  const startedAt = Date.now();
  const rows = [];
  let lastBytes = null;

  const realSetItem = Storage.prototype.setItem;
  Storage.prototype.setItem = function (key, value) {
    const result = realSetItem.call(this, key, value);
    if (key !== KEY) return result;

    let closet;
    try { closet = JSON.parse(value); } catch { return result; }
    const uploaded = mine(closet);
    if (!uploaded.length) return result;                 // demo closet only

    const uploadedBytes = JSON.stringify(uploaded).length;
    if (uploadedBytes === lastBytes) return result;      // a write that added nothing
    const row = {
      piece: uploaded.length,
      name: uploaded[uploaded.length - 1].name,
      at: new Date().toISOString(),
      secondsSinceStart: Math.round((Date.now() - startedAt) / 1000),
      closetBytes: value.length,
      myPiecesBytes: uploadedBytes,
      thisPieceBytes: lastBytes === null ? uploadedBytes : uploadedBytes - lastBytes,
      stopwatchSeconds: null,
    };
    lastBytes = uploadedBytes;
    rows.push(row);

    console.log(
      `piece ${row.piece}: ${(row.thisPieceBytes / 1024).toFixed(1)} KB` +
      `  ·  your pieces so far ${(row.myPiecesBytes / 1024).toFixed(1)} KB` +
      `  ·  whole closet ${(row.closetBytes / 1024).toFixed(1)} KB`
    );

    const typed = window.prompt(
      `Piece ${row.piece} ("${row.name}") stored.\n` +
      `Stopwatch for this piece, in seconds (photographing included):`, '');
    if (typed !== null && typed.trim() !== '') {
      const s = Number(typed.replace(',', '.'));
      if (Number.isFinite(s)) row.stopwatchSeconds = s;
    }
    return result;
  };

  window.__spike = { rows, startedAt };

  window.spikeRows = () => { console.table(rows); return rows; };

  window.spikeSave = () => {
    const closet = JSON.parse(localStorage.getItem(KEY) || '[]');
    const payload = {
      recordedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      rows,
      myPieces: mine(closet),                 // the input the numbers come from
    };
    const blob = new Blob([JSON.stringify(payload, null, 1)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'spike-adds.json';
    a.click();
    console.log(`saved ${rows.length} rows and ${payload.myPieces.length} pieces`);
  };

  console.log('measure.js is listening. Add your pieces one at a time.');
  console.log('When you are done: spikeSave()');
})();
