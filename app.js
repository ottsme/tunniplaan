'use strict';

/* ---------- Constants ---------- */
const DAY_KEYS = ['E', 'T', 'K', 'N', 'R'];
const DAY_NAMES = ['Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede'];
const MONTHS = ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli',
  'august', 'september', 'oktoober', 'november', 'detsember'];
const STORE_KEY = 'tunniplaan7b.settings.v1';
const ACCENT = '#9e0303';

/* Faint background drawings, one per subject type (24x24 stroke icons). */
const ICONS = {
  math: '<path d="M4 7h6M7 4v6"/><path d="M14 7h6"/><path d="M4 15l5 5M9 15l-5 5"/><path d="M14 16h6M14 19h6"/>',
  lang: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/>',
  pen: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>',
  book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>',
  cell: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><circle cx="7.5" cy="8" r="1"/><circle cx="16" cy="16.5" r="1"/>',
  hour: '<path d="M5 22h14"/><path d="M5 2h14"/><path d="M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22"/><path d="M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
  brush: '<path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"/>',
  music: '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  ball: '<circle cx="12" cy="12" r="10"/><path d="M4.9 4.9c3.9 3.9 3.9 10.3 0 14.2"/><path d="M19.1 4.9c-3.9 3.9-3.9 10.3 0 14.2"/>',
  wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
  scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/>',
  chat: '<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/>',
  people: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'
};
const ICON_FORK = '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/>';
const ICON_GEAR = '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>';
const ICON_GRID = '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18M15 3v18"/>';
const ICON_LIST = '<path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/>';

/* ---------- State ---------- */
let TT = null;          // timetable data
let settings = null;    // user group choices
let viewDay = 0;        // 0..4 (Mon..Fri)
let forcedWeek = false; // week view opened with the button
let showSettings = false;
let lastDateKey = '';

/* ---------- Pure helpers (also used by tests) ---------- */
function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function toMin(hm) { const [h, m] = hm.split(':').map(Number); return h * 60 + m; }
function svg(paths, cls, size) {
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths}</svg>`;
}

/* Monday of the school week to show. On Sat/Sun this is next Monday. */
function schoolWeekStart(now) {
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const wd = d.getDay(); // 0 = Sunday
  const diff = wd === 0 ? 1 : wd === 6 ? 2 : 1 - wd;
  d.setDate(d.getDate() + diff);
  return d;
}
/* 0..4 for Mon..Fri, -1 on weekend. */
function todayIndex(now) { const wd = now.getDay(); return wd >= 1 && wd <= 5 ? wd - 1 : -1; }
function defaultDay(now) { const t = todayIndex(now); return t < 0 ? 0 : t; }
function dateKey(d) { return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }

function isVisible(entry, s) {
  if (!entry.g) return true;
  const [k, v] = entry.g.split(':');
  if (v === undefined) return !!s[k];   // optional (e.g. lak)
  return s[k] === v;                     // group choice
}

/* Real start/end of a period on a given day (lunch shifts one period). */
function slotTimes(tt, dayIdx, slotIdx) {
  const p = tt.periods[slotIdx];
  const l = tt.lunch[DAY_KEYS[dayIdx]];
  if (l && l.lesson === p.n) return [l.lessonStart, l.lessonEnd];
  return [p.start, p.end];
}

/* Rows for the day view: lessons, free gaps inside the day, and the lunch row. */
function buildDayRows(tt, s, dayIdx) {
  const slots = tt.days[DAY_KEYS[dayIdx]].map(slot => slot.filter(e => isVisible(e, s)));
  const first = slots.findIndex(x => x.length);
  if (first < 0) return [];
  let last = first;
  slots.forEach((x, i) => { if (x.length) last = i; });
  const lunch = tt.lunch[DAY_KEYS[dayIdx]];
  const rows = [];
  for (let i = first; i <= last; i++) {
    const p = tt.periods[i];
    if (lunch && lunch.lesson === p.n) rows.push({ type: 'lunch', start: lunch.from, end: lunch.to });
    const [st, en] = slotTimes(tt, dayIdx, i);
    rows.push(slots[i].length
      ? { type: 'lesson', n: p.n, start: st, end: en, entries: slots[i] }
      : { type: 'free', n: p.n, start: st, end: en });
  }
  return rows;
}

/* ---------- Settings storage ---------- */
function loadSettings() {
  try { const raw = localStorage.getItem(STORE_KEY); return raw ? JSON.parse(raw) : null; }
  catch (e) { return null; }
}
function saveSettings(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* storage unavailable */ }
}
function settingsComplete(s) {
  return !!s && TT.groups.every(g => g.options.includes(s[g.id]));
}

/* ---------- Rendering ---------- */
const landscapeQuery = typeof window !== 'undefined'
  ? window.matchMedia('(orientation: landscape) and (max-height: 520px)') : null;

function currentMode() {
  if (showSettings) return 'settings';
  if (forcedWeek || (landscapeQuery && landscapeQuery.matches)) return 'week';
  return 'day';
}

function render() {
  const app = document.getElementById('app');
  const mode = currentMode();
  document.body.dataset.mode = mode;
  if (mode === 'settings') app.innerHTML = renderSettings();
  else if (mode === 'week') app.innerHTML = renderWeek();
  else app.innerHTML = renderDay();
}

function expiredBanner(now) {
  const end = new Date(TT.validTo + 'T23:59:59');
  return now > end
    ? `<div class="banner">Tunniplaan kehtis kuni ${fmtDate(end)}. See võib olla aegunud.</div>` : '';
}
function fmtDate(d) { return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`; }

function lineHtml(e, withBadge) {
  const teacher = e.g && e.t ? `<span class="teacher">${esc(e.t)}</span>` : '';
  const badge = withBadge ? '<span class="badge">PRAEGU</span>' : '';
  return `<div class="line"><span class="abbr">${esc(e.s)}</span>${teacher}${badge}<span class="room">${esc(e.r)}</span></div>`;
}

function timeHtml(start, end) {
  return `<div class="time"><span class="t-start">${esc(start)}</span><span class="t-end">${esc(end)}</span></div>`;
}

function renderDay() {
  const now = new Date();
  const ws = schoolWeekStart(now);
  const date = new Date(ws); date.setDate(ws.getDate() + viewDay);
  const isToday = todayIndex(now) === viewDay;
  const nowMin = now.getHours() * 60 + now.getMinutes();
  const isNow = (a, b) => isToday && nowMin >= toMin(a) && nowMin < toMin(b);

  const tabs = DAY_KEYS.map((k, i) =>
    `<button class="tab${i === viewDay ? ' active' : ''}${i === todayIndex(now) ? ' today' : ''}" data-day="${i}" aria-label="${DAY_NAMES[i]}">${k}</button>`).join('');

  const rows = buildDayRows(TT, settings, viewDay);
  let body;
  if (!rows.length) {
    body = '<div class="empty">Sel päeval tunde ei ole.</div>';
  } else {
    body = rows.map(r => {
      if (r.type === 'lunch') {
        const cur = isNow(r.start, r.end);
        return `<div class="row lunch${cur ? ' now' : ''}">${timeHtml(r.start, r.end)}
          <div class="card">${svg(ICON_FORK, 'fork', 20)}<span>Söömine</span>${cur ? '<span class="badge">PRAEGU</span>' : ''}</div></div>`;
      }
      if (r.type === 'free') {
        return `<div class="row free">${timeHtml(r.start, r.end)}<div class="card"><span class="num">${r.n}</span><span>vaba</span></div></div>`;
      }
      const cur = isNow(r.start, r.end);
      const subj = TT.subjects[r.entries[0].s] || { color: '#eeeeee', icon: null };
      const deco = subj.icon && ICONS[subj.icon] ? svg(ICONS[subj.icon], 'deco', 54) : '';
      const lines = r.entries.map((e, i) => lineHtml(e, cur && i === 0)).join('');
      return `<div class="row lesson${cur ? ' now' : ''}">${timeHtml(r.start, r.end)}
        <div class="card" style="background:${esc(subj.color)}">${deco}<span class="num">${r.n}</span><div class="lines">${lines}</div></div></div>`;
    }).join('');
  }

  return `
  <header class="top">
    <div class="top-row">
      <h1>${DAY_NAMES[viewDay]}, ${date.getDate()}.${date.getMonth() + 1}.</h1>
      <button class="icon-btn" data-action="week" aria-label="Nädala vaade">${svg(ICON_GRID, '', 22)}</button>
      <button class="icon-btn" data-action="settings" aria-label="Seaded">${svg(ICON_GEAR, '', 22)}</button>
    </div>
    <nav class="tabs">${tabs}</nav>
  </header>
  <main class="day" id="swipe">
    ${expiredBanner(now)}
    ${body}
    <footer class="foot">Kehtib kuni ${fmtDate(new Date(TT.validTo + 'T12:00:00'))}</footer>
  </main>`;
}

function renderWeek() {
  const now = new Date();
  const tIdx = todayIndex(now);
  let cells = '<div></div>';
  DAY_KEYS.forEach((k, i) => {
    cells += `<div class="w-head${i === tIdx ? ' today' : ''}">${DAY_NAMES[i]}</div>`;
  });
  TT.periods.forEach((p, si) => {
    cells += `<div class="w-time">${esc(p.start)}</div>`;
    DAY_KEYS.forEach((k, di) => {
      const entries = TT.days[k][si].filter(e => isVisible(e, settings));
      if (!entries.length) { cells += '<div class="w-cell empty"></div>'; return; }
      const e = entries[0];
      const subj = TT.subjects[e.s] || { color: '#eeeeee' };
      const l = TT.lunch[k];
      const shifted = l && l.lesson === p.n
        ? `<span class="w-shift">${esc(l.lessonStart)}</span>` : '';
      cells += `<div class="w-cell" style="background:${esc(subj.color)}"><span class="w-abbr">${esc(e.s)}</span>${shifted}<span class="w-room">${esc(e.r)}</span></div>`;
    });
  });
  const back = forcedWeek
    ? `<button class="text-btn" data-action="day">${svg(ICON_LIST, '', 18)}<span>Päev</span></button>` : '';
  return `
  <main class="week">
    ${back ? `<div class="week-bar">${back}</div>` : ''}
    ${expiredBanner(now)}
    <div class="w-grid">${cells}</div>
    <div class="w-legend"><span class="w-shift">11:15</span><span>enne seda tundi on söömine, tund algab sel kellaajal</span></div>
  </main>`;
}

function renderSettings() {
  const s = settings || {};
  const groups = TT.groups.map(g => {
    const opts = g.options.map(o => {
      const subj = TT.subjects[o];
      const style = subj ? ` style="background:${esc(subj.color)}"` : '';
      return `<label class="opt"${style}><input type="radio" name="${esc(g.id)}" value="${esc(o)}"${s[g.id] === o ? ' checked' : ''}><span>${esc(o)}</span></label>`;
    }).join('');
    return `<fieldset><legend>${esc(g.label)}</legend><div class="opts" style="grid-template-columns:repeat(${g.options.length},1fr)">${opts}</div></fieldset>`;
  }).join('');
  const optional = TT.optional.map(o =>
    `<label class="check"><input type="checkbox" name="${esc(o.id)}"${s[o.id] ? ' checked' : ''}><span>${esc(o.label)}</span></label>`).join('');
  const cancel = settingsComplete(settings)
    ? '<button type="button" class="secondary" data-action="close-settings">Tühista</button>' : '';
  return `
  <header class="top settings-top">
    <h1>Vali oma rühmad</h1>
    <p>Äpp näitab ainult sinu tunde. Saad hiljem muuta.</p>
  </header>
  <main class="settings">
    <form id="settings-form">
      ${groups}
      ${optional}
      <p class="error" id="settings-error" hidden>Vali igast grupist üks.</p>
      <button type="submit" class="primary">Salvesta</button>
      ${cancel}
      <p class="note">Valikud jäävad ainult sinu telefoni.</p>
    </form>
  </main>`;
}

/* ---------- Events ---------- */
function onClick(ev) {
  const tab = ev.target.closest('[data-day]');
  if (tab) { viewDay = Number(tab.dataset.day); render(); return; }
  const btn = ev.target.closest('[data-action]');
  if (!btn) return;
  const a = btn.dataset.action;
  if (a === 'settings') showSettings = true;
  else if (a === 'close-settings') showSettings = false;
  else if (a === 'week') forcedWeek = true;
  else if (a === 'day') forcedWeek = false;
  render();
}

function onSubmit(ev) {
  if (ev.target.id !== 'settings-form') return;
  ev.preventDefault();
  const form = ev.target;
  const s = {};
  TT.groups.forEach(g => {
    const checked = form.querySelector(`input[name="${g.id}"]:checked`);
    if (checked) s[g.id] = checked.value;
  });
  TT.optional.forEach(o => { s[o.id] = form.querySelector(`input[name="${o.id}"]`).checked; });
  if (!settingsComplete(s)) { document.getElementById('settings-error').hidden = false; return; }
  settings = s;
  saveSettings(s);
  showSettings = false;
  render();
}

/* Swipe left/right between days (ignores swipes starting at the screen edges,
   which phones use for the system back gesture). */
let touchX = null, touchY = null;
function onTouchStart(ev) {
  if (currentMode() !== 'day') { touchX = null; return; }
  const t = ev.touches[0];
  if (t.clientX < 24 || t.clientX > window.innerWidth - 24) { touchX = null; return; }
  touchX = t.clientX; touchY = t.clientY;
}
function onTouchEnd(ev) {
  if (touchX === null) return;
  const t = ev.changedTouches[0];
  const dx = t.clientX - touchX, dy = t.clientY - touchY;
  touchX = null;
  if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (dx < 0 && viewDay < 4) viewDay++;
  else if (dx > 0 && viewDay > 0) viewDay--;
  else return;
  render();
}

/* When the app is reopened on a new day, jump to that day. */
function checkNewDay() {
  const k = dateKey(new Date());
  if (k !== lastDateKey) { lastDateKey = k; viewDay = defaultDay(new Date()); }
}

async function init() {
  try {
    const res = await fetch('timetable.json', { cache: 'no-cache' });
    TT = await res.json();
  } catch (e) {
    document.getElementById('app').innerHTML = '<div class="empty">Tunniplaani ei õnnestunud laadida.</div>';
    return;
  }
  settings = loadSettings();
  if (!settingsComplete(settings)) showSettings = true;
  checkNewDay();
  render();

  document.addEventListener('click', onClick);
  document.addEventListener('submit', onSubmit);
  document.addEventListener('touchstart', onTouchStart, { passive: true });
  document.addEventListener('touchend', onTouchEnd, { passive: true });
  landscapeQuery.addEventListener('change', () => { forcedWeek = false; render(); });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') { checkNewDay(); if (!showSettings) render(); }
  });
  // Refresh the "PRAEGU" highlight every 30 s (not while editing settings).
  setInterval(() => { if (!showSettings) { checkNewDay(); render(); } }, 30000);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
}

if (typeof document !== 'undefined') init();
if (typeof module !== 'undefined') {
  module.exports = { buildDayRows, slotTimes, isVisible, schoolWeekStart, todayIndex, defaultDay };
}
