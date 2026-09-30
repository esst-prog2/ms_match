/* ------------------------------------------------------------------
   spike/analyse.js — prints the three numbers from the committed data.

       node spike/analyse.js

   Reads spike/data/spike-adds.json and spike/data/spike-capacity.json,
   which were produced by measure.js and capacity.js in the browser, and
   prints minutes per piece, kilobytes per piece, and the piece count at
   which localStorage gave up. Run it to check the figures in
   PLANNING_LOG.md against the data they came from.
   ------------------------------------------------------------------ */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'data');
const read = name => {
  const p = path.join(dir, name);
  if (!fs.existsSync(p)) {
    console.error(`missing: ${path.relative(process.cwd(), p)}`);
    console.error('Run measure.js and capacity.js in the browser first, and put what they download here.');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
};

const adds = read('spike-adds.json');
const capacity = read('spike-capacity.json');

const mean = xs => xs.reduce((a, b) => a + b, 0) / xs.length;
const median = xs => {
  const s = [...xs].sort((a, b) => a - b);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
const kb = bytes => bytes / 1024;

// ---- 1. minutes per piece -------------------------------------------
const timed = adds.rows.filter(r => typeof r.stopwatchSeconds === 'number');
// the gap between consecutive adds is the whole cycle for the later piece
const gaps = adds.rows.slice(1).map((r, i) => r.secondsSinceStart - adds.rows[i].secondsSinceStart);

// ---- 2. kilobytes per piece ------------------------------------------
const sizes = adds.rows.map(r => r.thisPieceBytes);

// ---- 3. where it gave up ---------------------------------------------
const claimedLow = 50, claimedHigh = 60;

console.log('Ms. Match spike - what one real garment costs');
console.log('pieces measured:', adds.rows.length, ' recorded:', adds.recordedAt);
console.log('');

if (timed.length) {
  const secs = timed.map(r => r.stopwatchSeconds);
  console.log(`1. MINUTES PER PIECE   ${(median(secs) / 60).toFixed(1)} min  (median of ${timed.length} stopwatch readings)`);
  console.log(`   mean ${(mean(secs) / 60).toFixed(1)} min · fastest ${(Math.min(...secs) / 60).toFixed(1)} · slowest ${(Math.max(...secs) / 60).toFixed(1)}`);
} else {
  console.log('1. MINUTES PER PIECE   no stopwatch readings in the data');
}
if (gaps.length) {
  console.log(`   wall clock between adds: median ${(median(gaps) / 60).toFixed(1)} min`);
}
console.log('');

console.log(`2. KILOBYTES PER PIECE ${kb(median(sizes)).toFixed(1)} KB  (median of ${sizes.length} pieces)`);
console.log(`   mean ${kb(mean(sizes)).toFixed(1)} KB · smallest ${kb(Math.min(...sizes)).toFixed(1)} · largest ${kb(Math.max(...sizes)).toFixed(1)}`);
console.log(`   all of your pieces together: ${kb(adds.rows[adds.rows.length - 1].myPiecesBytes).toFixed(0)} KB`);
console.log('');

console.log(`3. PIECES THAT FIT     ${capacity.piecesThatFit}  (storing #${capacity.failedAtPiece} threw ${capacity.threw})`);
console.log(`   closet at that point: ${kb(capacity.lastGoodBytes).toFixed(0)} KB`);
console.log(`   browser: ${capacity.userAgent.replace(/^.*?(Chrome|Firefox|Safari|Edg)\/([\d.]+).*$/, '$1 $2')}`);
console.log('');

const verdict = capacity.piecesThatFit < claimedLow ? 'FEWER than'
  : capacity.piecesThatFit > claimedHigh ? 'MORE than'
  : 'within';
console.log(`The README claimed roughly ${claimedLow} to ${claimedHigh} photos.`);
console.log(`Measured: ${capacity.piecesThatFit} - ${verdict} the claim.`);
