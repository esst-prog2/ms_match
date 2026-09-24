/* ------------------------------------------------------------------
   app.js — behaviour of Ms. Match.
   No server: the closet, the saved looks and any uploaded photos live
   in the browser's localStorage; the forecast comes from Open-Meteo.
   ------------------------------------------------------------------ */

const SLOTS = ['top', 'bottom', 'shoes', 'extra'];
const STORE = { closet: 'msmatch.closet', saved: 'msmatch.saved', worn: 'msmatch.worn', model: 'msmatch.model', models: 'msmatch.models', history: 'msmatch.history', placement: 'msmatch.placement' };

// Where each piece sits on the body, as a percentage of the stage box, so the
// same numbers hold at any window size. `scale` multiplies PIN_BASE_W.
const PIN_BASE_W = 34;                                  // % of stage width at scale 1
const PLACEMENT_DEFAULTS = {
  top:    { x: 50, y: 34, scale: 1.00 },                // over the torso
  bottom: { x: 50, y: 62, scale: 1.00 },                // over the legs
  shoes:  { x: 50, y: 88, scale: 0.55 },                // at the feet
  extra:  { x: 78, y: 14, scale: 0.42 },                // beside the head
};

// ---------- state --------------------------------------------------
let closet  = load(STORE.closet) || DEMO_CLOSET.map(i => ({ ...i }));
let saved   = load(STORE.saved)  || [];
let worn    = load(STORE.worn)   || null;
let history = load(STORE.history) || {};          // 'YYYY-MM-DD' -> look id
let calMonth = new Date(); calMonth.setDate(1);
const dayKey = (d = new Date()) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
let models  = [...MODELS, ...(load(STORE.models) || [])];   // built-in + uploaded
let modelId = load(STORE.model)  || MODELS[0].id;   // white suit by default
let current = { top: null, bottom: null, shoes: null, extra: null };
let weather = { days: null, day: 0 };
let filter  = 'all';
let placement = load(STORE.placement) || {};       // model id -> slot -> {x,y,scale}
let adjusting = false;                             // is the stage in adjust mode?
let activeSlot = null;                             // which piece the adjust bar acts on

function load(key) { try { return JSON.parse(localStorage.getItem(key)); } catch { return null; } }
// Returns whether the write got through, so callers can undo what they put in
// memory: a piece that is not stored must not look as though it were added.
function save(key, v) {
  try { localStorage.setItem(key, JSON.stringify(v)); return true; }
  catch { setStatus('storage is full — remove some uploaded photos'); return false; }
}
// Stored placement for this model photo, falling back to the per-slot default.
function placementFor(mId, slot) {
  const d = PLACEMENT_DEFAULTS[slot];
  const p = placement[mId] && placement[mId][slot];
  return p ? { x: p.x, y: p.y, scale: p.scale } : { ...d };
}
function setPlacement(mId, slot, p) {
  if (!placement[mId]) placement[mId] = {};
  placement[mId][slot] = p;
  save(STORE.placement, placement);
}
function pick(list) { return list[Math.floor(Math.random() * list.length)]; }
function byId(id) { return closet.find(i => i.id === id) || null; }
function itemsIn(cat) { return closet.filter(i => i.cat === cat); }
function $(s) { return document.querySelector(s); }
function setStatus(msg) { $('#status').textContent = msg; }
function wearsDress() { const t = byId(current.top); return !!(t && t.full); }

// ---------- stage: model + pinned pieces ----------------------------
function drawStage() {
  const model = models.find(m => m.id === modelId) || models[0];
  $('#model-img').src = model.img;

  for (const slot of SLOTS) {
    const pin = document.querySelector(`.pin[data-slot="${slot}"]`);
    const item = byId(current[slot]);
    // a dress fills the bottom too, so that slot stays empty
    const show = item && !(slot === 'bottom' && wearsDress());
    pin.innerHTML = show ? `<img src="${item.img}" alt="${item.name}">` : '';
    pin.classList.toggle('on', !!show);
    applyPlacement(pin, slot);
  }

  const names = SLOTS.filter(s => !(s === 'bottom' && wearsDress())).map(s => byId(current[s])).filter(Boolean).map(i => i.name);
  $('#stage-caption').textContent = names.length ? names.join(' · ') : 'Choose pieces from the closet';

  $('#model-picker').innerHTML = models.map(m =>
    `<img src="${m.img}" title="${m.name}" data-id="${m.id}" class="${m.id === modelId ? 'on' : ''}">`).join('')
    + `<label class="file">+ your photo<input type="file" accept="image/*" id="model-upload"></label>`;
  $('#model-upload').addEventListener('change', e => uploadModel(e.target.files[0]));
}

// ---------- placing the pieces on the body ---------------------------
function applyPlacement(pin, slot) {
  const p = placementFor(modelId, slot);
  pin.style.setProperty('--px', p.x + '%');
  pin.style.setProperty('--py', p.y + '%');
  pin.style.setProperty('--pw', (PIN_BASE_W * p.scale) + '%');
}

// Drag a piece to move it. Pointer events cover mouse, trackpad, touch and pen
// in one path, and the new centre is written back as a percentage of the stage
// so it still means the same thing at another window size.
function startDrag(e) {
  if (!adjusting) return;
  const pin = e.target.closest('.pin.on');
  if (!pin) return;
  const slot = pin.dataset.slot;
  selectSlot(slot);
  const rect = $('#stage').getBoundingClientRect();
  pin.setPointerCapture(e.pointerId);
  pin.classList.add('dragging');
  e.preventDefault();

  const move = ev => {
    const x = clamp(((ev.clientX - rect.left) / rect.width) * 100, 0, 100);
    const y = clamp(((ev.clientY - rect.top) / rect.height) * 100, 0, 100);
    pin.style.setProperty('--px', x + '%');
    pin.style.setProperty('--py', y + '%');
  };
  const up = () => {
    pin.removeEventListener('pointermove', move);
    pin.removeEventListener('pointerup', up);
    pin.removeEventListener('pointercancel', up);
    pin.classList.remove('dragging');
    const cur = placementFor(modelId, slot);
    setPlacement(modelId, slot, {
      x: pct(pin.style.getPropertyValue('--px')),
      y: pct(pin.style.getPropertyValue('--py')),
      scale: cur.scale,
    });
    setStatus(`${slot} placed`);
  };
  pin.addEventListener('pointermove', move);
  pin.addEventListener('pointerup', up);
  pin.addEventListener('pointercancel', up);
}

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const pct = s => Math.round(parseFloat(s) * 10) / 10;

function selectSlot(slot) {
  activeSlot = slot;
  document.querySelectorAll('.pin').forEach(p => p.classList.toggle('active', p.dataset.slot === slot));
  const scale = $('#adjust-scale');
  scale.disabled = false;
  scale.value = placementFor(modelId, slot).scale;
  $('#adjust-what').textContent = slot;
}

function setAdjusting(on) {
  adjusting = on;
  $('#stage').classList.toggle('adjusting', on);
  $('#btn-adjust').textContent = on ? 'done' : 'adjust';
  $('#adjust-bar').hidden = !on;
  if (!on) {
    activeSlot = null;
    document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
  }
  setStatus(on ? 'drag a piece to place it on the body' : 'placement saved');
}

const SCAN_MS = 2600;
let scanTimer = null;
function scan() {
  const stage = $('#stage');
  stage.classList.remove('scan');
  void stage.offsetWidth;                 // restart the CSS animation
  stage.classList.add('scan');
  clearTimeout(scanTimer);
  scanTimer = setTimeout(() => stage.classList.remove('scan'), SCAN_MS);
}
const sleep = ms => new Promise(r => setTimeout(r, ms));

// ---------- slots ----------------------------------------------------
function drawSlots() {
  $('#actions').hidden = !currentIds().some(Boolean);
  for (const slot of SLOTS) {
    const el = document.querySelector(`.slot[data-slot="${slot}"]`);
    const item = byId(current[slot]);
    const card = el.querySelector('.slot-card');
    card.classList.toggle('on', !!item);
    card.querySelector('img').src = item ? item.img : '';
    el.querySelector('.slot-name').textContent = item ? item.name : '';
    el.classList.toggle('dim', slot === 'bottom' && wearsDress());
  }
}

function cycle(slot, dir) {
  const items = itemsIn(slot);
  if (!items.length) return;
  const idx = items.findIndex(i => i.id === current[slot]);
  const next = (idx + dir + items.length + 1) % (items.length + 1);   // the extra position = empty
  current[slot] = next === items.length ? null : items[next].id;
  refresh(true);
}

function toggle(item) {
  current[item.cat] = current[item.cat] === item.id ? null : item.id;
  refresh(true);
}

// Match me = a little slot machine: the pins flick through random pieces,
// slow down, "match!" pops, and then the outfit is shown with save / wear.
let spinning = false;
async function matchMe() {
  if (spinning) return;
  spinning = true;
  const stage = $('#stage');
  const final = {};
  for (const slot of SLOTS) { const items = itemsIn(slot); final[slot] = items.length ? pick(items).id : null; }

  stage.classList.remove('scan', 'matched');
  stage.classList.add('spin');
  setStatus('matching…');
  for (let i = 0; i < 16; i++) {
    for (const slot of SLOTS) { const items = itemsIn(slot); current[slot] = items.length ? pick(items).id : null; }
    drawStage();
    await sleep(70 + i * 22);              // ease out, like a wheel slowing down
  }
  current = final;
  drawStage();
  stage.classList.remove('spin');
  stage.classList.add('matched');
  await sleep(1100);
  stage.classList.remove('matched');
  refresh(false);                          // the outfit is shown plainly after "match!"
  const acts = $('#actions'); acts.classList.remove('pulse'); void acts.offsetWidth; acts.classList.add('pulse');
  setStatus('matched ✦ save it or wear it');
  spinning = false;
}

// ---------- weather ----------------------------------------------------
const CODES = {
  0: ['☀', 'clear sky'], 1: ['🌤', 'mainly clear'], 2: ['⛅', 'partly cloudy'], 3: ['☁', 'overcast'],
  45: ['🌫', 'fog'], 48: ['🌫', 'rime fog'],
  51: ['🌦', 'light drizzle'], 53: ['🌦', 'drizzle'], 55: ['🌧', 'heavy drizzle'],
  61: ['🌧', 'light rain'], 63: ['🌧', 'rain'], 65: ['🌧', 'heavy rain'],
  71: ['🌨', 'light snow'], 73: ['🌨', 'snow'], 75: ['❄', 'heavy snow'],
  80: ['🌦', 'rain showers'], 81: ['🌧', 'showers'], 82: ['⛈', 'violent showers'],
  95: ['⛈', 'thunderstorm'], 96: ['⛈', 'storm with hail'], 99: ['⛈', 'storm with hail'],
};
const RAIN_CODES = [51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99];
const DEFAULT_PLACE = { lat: 47.4979, lon: 19.0402, label: 'Budapest · default' };

async function loadWeather() {
  const place = await locate();
  $('#w-place').textContent = place.label;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${place.lat}&longitude=${place.lon}`
    + `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&forecast_days=2`;
  try {
    const d = (await (await fetch(url)).json()).daily;
    weather.days = [0, 1].map(i => ({
      date: d.time[i], code: d.weather_code[i],
      tmax: Math.round(d.temperature_2m_max[i]), tmin: Math.round(d.temperature_2m_min[i]),
      rain: d.precipitation_probability_max[i] ?? 0,
    }));
    drawWeather(); drawExtras();
  } catch {
    $('#w-desc').textContent = 'forecast unavailable';
  }
}

function locate() {
  return new Promise(resolve => {
    if (!navigator.geolocation) return resolve(DEFAULT_PLACE);
    navigator.geolocation.getCurrentPosition(
      p => resolve({ lat: p.coords.latitude, lon: p.coords.longitude, label: 'your location' }),
      () => resolve(DEFAULT_PLACE), { timeout: 6000 });
  });
}

function drawWeather() {
  const day = weather.days && weather.days[weather.day];
  if (!day) return;
  const [icon, desc] = CODES[day.code] || ['·', 'weather'];
  $('#w-icon').textContent = icon;
  $('#w-temp').textContent = `${day.tmax}°`;
  $('#w-desc').textContent = desc;
  $('#w-meta').textContent = `low ${day.tmin}° · rain ${day.rain}%\n${day.date}`;
}

// ---------- outfit suggestion ----------------------------------------
// Warmth needed comes from the day's high; rain removes non-rain pieces.
function suggest() {
  const day = weather.days && weather.days[weather.day];
  if (!day) { setStatus('no forecast yet'); return; }
  const need  = day.tmax < 8 ? 3 : day.tmax < 17 ? 2 : 1;
  const rainy = day.rain >= 50 || RAIN_CODES.includes(day.code);

  const best = (cat, exclude = []) => {
    let items = itemsIn(cat).filter(i => !exclude.includes(i.id));
    if (rainy && items.some(i => i.rain)) items = items.filter(i => i.rain);
    if (!items.length) return null;
    // closest warmth wins; a little randomness keeps it from being the same every time
    return items.map(i => ({ i, s: Math.abs(i.warmth - need) + Math.random() * 0.7 }))
                .sort((a, b) => a.s - b.s)[0].i;
  };

  const top = best('top');
  current.top = top ? top.id : null;
  current.bottom = (top && top.full) ? null : (best('bottom')?.id || null);
  current.shoes  = best('shoes')?.id || null;
  current.extra  = best('extra')?.id || null;

  refresh(true);
  const when = weather.day === 0 ? 'today' : 'tomorrow';
  const mood = need === 3 ? 'Layer up.' : need === 2 ? 'A light layer will do.' : 'Keep it light.';
  $('#w-hint').textContent = `${when}: ${day.tmax}°, ${rainy ? 'rain likely — rain-proof pieces only. ' : ''}${mood}`;
  setStatus(`dressed for ${when}`);
}

// ---------- saved looks ------------------------------------------------
function currentIds() { return SLOTS.map(s => (s === 'bottom' && wearsDress()) ? null : current[s]); }

function saveLook(silent) {
  const ids = currentIds();
  if (!ids.some(Boolean)) { setStatus('nothing to save'); return null; }
  let look = saved.find(l => l.ids.join() === ids.join());
  if (!look) {
    look = { id: 'l' + Date.now(), ids, ts: new Date().toISOString().slice(0, 10) };
    saved.unshift(look); save(STORE.saved, saved);
  }
  drawSaved();
  if (!silent) setStatus('look saved');
  return look;
}

function wearLook(look) {
  worn = look.id; save(STORE.worn, worn);
  look.wornAt = Date.now(); save(STORE.saved, saved);
  history[dayKey()] = look.id; save(STORE.history, history);
  drawSaved(); drawExtras();
  setStatus(`wearing it today · ${dayKey()} saved to the calendar`);
}

function wearIt() {
  const look = saveLook(true);
  if (!look) return;
  wearLook(look); scan();
}

function drawSaved() {
  const list = $('#saved-list');
  if (!saved.length) { list.innerHTML = '<span class="empty">No looks saved yet.</span>'; return; }
  list.innerHTML = saved.map(l => {
    const items = l.ids.map(byId).filter(Boolean);
    const thumbs = items.map(i => `<img src="${i.img}" title="${i.name}">`).join('');
    return `<div class="saved-item ${l.id === worn ? 'worn' : ''}" data-id="${l.id}">
      <div class="thumbs">${thumbs || '—'}</div>
      <div class="meta">${l.ts}<br>${items.length} pieces</div>
      <button class="wear" data-wear="${l.id}">wear it</button>
      <button class="del" data-del="${l.id}" title="remove">×</button></div>`;
  }).join('');
}

function loadLook(id) {
  const look = saved.find(l => l.id === id);
  if (!look) return;
  SLOTS.forEach((s, i) => current[s] = byId(look.ids[i]) ? look.ids[i] : null);
  refresh(true);
}

// ---------- closet -------------------------------------------------------
function drawCloset() {
  $('#closet-grid').innerHTML = closet.map(item => `
    <div class="closet-item ${Object.values(current).includes(item.id) ? 'on' : ''} ${filter !== 'all' && item.cat !== filter ? 'hidden' : ''}" data-id="${item.id}" data-cat="${item.cat}">
      <button class="del" data-del="${item.id}" title="remove">×</button>
      <img src="${item.img}" alt="${item.name}">
      <div class="label">${item.name}<small>${item.cat} · ${['', 'light', 'mid', 'warm'][item.warmth]}${item.rain ? ' · rain ok' : ''}</small></div>
    </div>`).join('');
}

// shrink an uploaded photo so it fits in localStorage (max 520px, jpeg)
function shrink(file, max = 520) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height));
      const c = document.createElement('canvas');
      c.width = Math.round(img.width * k); c.height = Math.round(img.height * k);
      c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL('image/jpeg', 0.82));
    };
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}

async function addItem(form) {
  const f = new FormData(form);
  const file = f.get('photo');
  if (!file || !file.size) { setStatus('pick a photo first'); return; }
  const img = await shrink(file);
  closet.push({ id: 'u' + Date.now(), name: f.get('name').trim(), cat: f.get('cat'), img,
                warmth: Number(f.get('warmth')), rain: f.get('rain') === 'on', full: f.get('full') === 'on' });
  // if the browser refuses the write, take the piece back out: a piece that is
  // not stored must not sit in the closet looking as though it were saved
  if (!save(STORE.closet, closet)) {
    closet.pop();
    setStatus('storage is full — the piece was not saved. Remove some uploaded photos and try again.');
    return;
  }
  form.reset(); refresh(false);
  setStatus('added to your closet');
}

async function uploadModel(file) {
  if (!file) return;
  const img = await shrink(file, 900);
  const m = { id: 'um' + Date.now(), name: 'you', img };
  models.push(m);
  if (!save(STORE.models, models.filter(x => x.id.startsWith('um')))) {
    models.pop();                          // keep the photos that are stored
    setStatus('storage is full — the photo was not saved. Remove some uploaded photos and try again.');
    refresh(false);
    return;
  }
  modelId = m.id; save(STORE.model, modelId);
  refresh(true);
}

function removeItem(id) {
  closet = closet.filter(i => i.id !== id);
  for (const s of SLOTS) if (current[s] === id) current[s] = null;
  save(STORE.closet, closet); refresh(false);
}

function resetDemo() {
  closet = DEMO_CLOSET.map(i => ({ ...i })); save(STORE.closet, closet);
  current = { top: null, bottom: null, shoes: null, extra: null };
  refresh(false); setStatus('demo closet restored');
}

// ---------- the extras that make the page feel alive -------------------------
function drawExtras() {
  const day = weather.days && weather.days[weather.day];

  // ticker: a loop of what is going on, doubled so the animation is seamless
  const bits = [
    'Ms. Match', 'outfit of the day', $('#today-label').textContent,
    day ? `${day.tmax}° · ${(CODES[day.code] || ['', 'weather'])[1]}` : 'loading forecast',
    `${closet.length} pieces`, `${saved.length} looks saved`,
    ...SLOTS.map(s => byId(current[s])).filter(Boolean).map(i => i.name),
    'wear it · save it · repeat',
  ];
  const html = bits.map(b => `<span>${b}</span>`).join('');
  $('#ticker').innerHTML = html + html;

  // "also works today": the next-best pieces that are not on the model right now
  const need  = day ? (day.tmax < 8 ? 3 : day.tmax < 17 ? 2 : 1) : 2;
  const rainy = day ? (day.rain >= 50 || RAIN_CODES.includes(day.code)) : false;
  const onModel = Object.values(current);
  const alts = closet
    .filter(i => !onModel.includes(i.id) && (!rainy || i.rain))
    .map(i => ({ i, s: Math.abs(i.warmth - need) }))
    .sort((a, b) => a.s - b.s).slice(0, 6).map(x => x.i);
  $('#pairings').innerHTML = alts.map(i => `<img src="${i.img}" title="${i.name}" data-id="${i.id}">`).join('');

  // stylist's note
  const top = byId(current.top), shoes = byId(current.shoes), extra = byId(current.extra);
  let note;
  if (!day) note = 'Waiting for the forecast… pick something you love meanwhile.';
  else if (rainy) note = `Rain on the way — ${shoes && shoes.rain ? shoes.name + ' will survive it' : 'swap the shoes for boots'}.`;
  else if (need === 3) note = `${day.tmax}° calls for layers. ${top ? top.name + ' on top' : 'Grab a sweater'}, scarf optional but recommended.`;
  else if (need === 2) note = `Mild day. ${top ? top.name : 'A light top'} + one warm piece, and you're set.`;
  else note = `${day.tmax}° — keep it light. ${extra ? extra.name + ' finishes it.' : 'Sunglasses would finish it.'}`;
  $('#style-note').textContent = note;

  // stamp when the current look is the one worn today
  const wornLook = saved.find(l => l.id === worn);
  $('#stamp').classList.toggle('on', !!(wornLook && wornLook.ids.join() === currentIds().join()));

  // hero portrait follows the chosen model
  const model = models.find(m => m.id === modelId) || models[0];
  $('#hero-portrait img').src = model.img;
}

// ---------- outfit calendar ----------------------------------------------------
function drawCalendar() {
  const y = calMonth.getFullYear(), m = calMonth.getMonth();
  $('#cal-title').innerHTML = `<small>what I wore</small>${calMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}`;
  const first = new Date(y, m, 1);
  const lead = (first.getDay() + 6) % 7;               // Monday first
  const days = new Date(y, m + 1, 0).getDate();
  const today = dayKey();
  let html = '';
  for (let i = 0; i < lead; i++) html += '<div class="cal-day empty"></div>';
  for (let d = 1; d <= days; d++) {
    const key = dayKey(new Date(y, m, d));
    const look = history[key] && saved.find(l => l.id === history[key]);
    const items = look ? look.ids.map(byId).filter(Boolean) : [];
    html += `<div class="cal-day ${look ? 'worn' : ''} ${key === today ? 'today' : ''}" ${look ? `data-look="${look.id}"` : ''}>
      <span class="d">${d}</span>
      <div class="thumbs">${items.slice(0, 4).map(i => `<img src="${i.img}" title="${i.name}">`).join('')}</div></div>`;
  }
  $('#cal-grid').innerHTML = html;
}
function openCalendar() { calMonth = new Date(); calMonth.setDate(1); drawCalendar(); $('#cal').hidden = false; }

// ---------- glue -----------------------------------------------------------
function refresh(withScan) {
  drawStage(); drawSlots(); drawCloset(); drawSaved(); drawExtras();
  if (withScan) scan();
}

function init() {
  $('#today-label').textContent = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

  document.querySelectorAll('.slot .arrow').forEach(b =>
    b.addEventListener('click', () => cycle(b.closest('.slot').dataset.slot, Number(b.dataset.dir))));

  $('#closet-grid').addEventListener('click', e => {
    const del = e.target.closest('[data-del]');
    if (del) { removeItem(del.dataset.del); return; }
    const card = e.target.closest('.closet-item');
    if (card) toggle(byId(card.dataset.id));
  });

  $('#saved-list').addEventListener('click', e => {
    const w = e.target.closest('[data-wear]');
    if (w) { const look = saved.find(l => l.id === w.dataset.wear); if (look) { loadLook(look.id); wearLook(look); } return; }
    const del = e.target.closest('[data-del]');
    if (del) { saved = saved.filter(l => l.id !== del.dataset.del); if (worn === del.dataset.del) worn = null; save(STORE.saved, saved); save(STORE.worn, worn); drawSaved(); return; }
    const row = e.target.closest('.saved-item');
    if (row) loadLook(row.dataset.id);
  });

  $('#model-picker').addEventListener('click', e => {
    const img = e.target.closest('img[data-id]');
    if (img) { modelId = img.dataset.id; save(STORE.model, modelId); refresh(true); }
  });

  $('#filters').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    document.querySelectorAll('#filters .chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active'); filter = chip.dataset.cat; drawCloset();
  });

  document.querySelectorAll('.day-toggle .chip').forEach(chip =>
    chip.addEventListener('click', () => {
      document.querySelectorAll('.day-toggle .chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active'); weather.day = Number(chip.dataset.day); drawWeather(); drawExtras();
    }));

  $('#pairings').addEventListener('click', e => {
    const img = e.target.closest('img[data-id]');
    if (img) toggle(byId(img.dataset.id));
  });

  // adjust mode: drag to move, slider to resize, both saved per model photo
  $('#btn-adjust').addEventListener('click', () => setAdjusting(!adjusting));
  $('#stage').addEventListener('pointerdown', startDrag);
  const scaleInput = $('#adjust-scale');
  const liveScale = () => {
    if (!activeSlot) return null;
    const pin = document.querySelector(`.pin[data-slot="${activeSlot}"]`);
    pin.style.setProperty('--pw', (PIN_BASE_W * Number(scaleInput.value)) + '%');
    return pin;
  };
  scaleInput.addEventListener('input', liveScale);        // follow the slider
  scaleInput.addEventListener('change', () => {           // store once, on release
    if (!activeSlot) return;
    liveScale();
    const cur = placementFor(modelId, activeSlot);
    setPlacement(modelId, activeSlot, { x: cur.x, y: cur.y, scale: Number(scaleInput.value) });
    setStatus(`${activeSlot} resized`);
  });

  $('#btn-match').addEventListener('click', matchMe);

  // calendar
  $('#btn-cal').addEventListener('click', openCalendar);
  $('#cal-close').addEventListener('click', () => { $('#cal').hidden = true; });
  $('#cal').addEventListener('click', e => { if (e.target.id === 'cal') $('#cal').hidden = true; });
  $('#cal-prev').addEventListener('click', () => { calMonth.setMonth(calMonth.getMonth() - 1); drawCalendar(); });
  $('#cal-next').addEventListener('click', () => { calMonth.setMonth(calMonth.getMonth() + 1); drawCalendar(); });
  $('#cal-grid').addEventListener('click', e => {
    const d = e.target.closest('[data-look]');
    if (d) { loadLook(d.dataset.look); $('#cal').hidden = true; }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#cal').hidden = true; });
  $('#btn-save').addEventListener('click', () => saveLook(false));
  $('#btn-wear').addEventListener('click', wearIt);
  $('#btn-suggest').addEventListener('click', suggest);
  $('#btn-reset-demo').addEventListener('click', resetDemo);
  $('#btn-clear-saved').addEventListener('click', () => { saved = []; worn = null; history = {}; save(STORE.saved, saved); save(STORE.worn, worn); save(STORE.history, history); drawSaved(); drawExtras(); });
  $('#add-form').addEventListener('submit', e => { e.preventDefault(); addItem(e.target); });

  refresh(false);
  loadWeather().then(() => { if (weather.days) suggest(); });
}

init();
