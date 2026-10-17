/* ------------------------------------------------------------------
   tests/harness.js — runs the real js/closet.js and js/app.js in Node.

   A vm context with a stub DOM, a fake localStorage that throws
   QuotaExceededError above its quota, no geolocation and no network.
   Moved out of storage.test.js in the HW6 test review so that every
   test file starts the app the same way.
   ------------------------------------------------------------------ */

const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

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

// Starts the real app on a storage of its own, or on the one given, so a
// second startApp on the same storage is a page reload.
function startApp({ quota = 5 * 1024 * 1024, storage = fakeStorage(quota) } = {}) {
  const elements = new Map();
  const $ = sel => { if (!elements.has(sel)) elements.set(sel, stubElement()); return elements.get(sel); };
  const ctx = vm.createContext({
    localStorage: storage,
    document: { querySelector: $, querySelectorAll: () => [], getElementById: id => $('#' + id), addEventListener() {} },
    navigator: {},                                         // no geolocation: default place
    fetch: () => Promise.reject(new Error('offline')),     // no forecast
    FormData: class { constructor(form) { this.form = form; } get(k) { return this.form[k]; } },
    confirm: () => true,
    setTimeout, clearTimeout, console,
  });
  for (const file of ['js/closet.js', 'js/app.js']) {
    const src = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    vm.runInContext(src, ctx, { filename: file });
  }
  return ctx;
}

const run = (ctx, code) => vm.runInContext(code, ctx);
const el = (ctx, sel) => ctx.document.querySelector(sel);

module.exports = { fakeStorage, startApp, run, el };
