/* Luso Posters — mockup (no Shopify yet) */

const SIZES = [
  { id: 'A4', price: 15, dims: '21 × 29,7 cm' },
  { id: 'A3', price: 25, dims: '29,7 × 42 cm' },
  { id: 'A2', price: 40, dims: '42 × 59,4 cm' },
  { id: 'A1', price: 60, dims: '59,4 × 84,1 cm' },
];
const SHIPPING = 4.9;
const FREE_SHIP_FROM = 60;

/* ---------- SVG helpers ---------- */
const W = 420, H = 594;

function T(str, x, y, size, o = {}) {
  const a = [
    `x="${x}"`, `y="${y}"`, `font-size="${size}"`,
    `font-family="Archivo, sans-serif"`,
    `font-weight="${o.w ?? 900}"`,
    `style="font-stretch:${o.s ?? 100}%"`,
    `fill="${o.fill ?? '#fff'}"`,
  ];
  if (o.len) a.push(`textLength="${o.len}"`, 'lengthAdjust="spacingAndGlyphs"');
  if (o.anchor) a.push(`text-anchor="${o.anchor}"`);
  if (o.ls) a.push(`letter-spacing="${o.ls}"`);
  if (o.stroke) a.push(`stroke="${o.stroke}"`, `stroke-width="${o.sw ?? 2}"`);
  if (o.op != null) a.push(`opacity="${o.op}"`);
  if (o.tr) a.push(`transform="${o.tr}"`);
  return `<text ${a.join(' ')}>${str}</text>`;
}

function foot(n, artist, c) {
  const o = { w: 600, s: 100, fill: c, ls: 2 };
  return T(`${artist} · LUSO POSTERS Nº${String(n).padStart(2, '0')}`, 24, 578, 7, o) +
         T('LISBOA 2026', 396, 578, 7, { ...o, anchor: 'end' });
}

function svg(body, bg, label) {
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">` +
         `<rect width="${W}" height="${H}" fill="${bg}"/>${body}</svg>`;
}

function wave(y, amp, len, phase) {
  let d = `M0 ${H} L0 ${y}`;
  for (let x = 0; x <= W; x += 6) d += ` L${x} ${(y + Math.sin((x / len) * Math.PI * 2 + phase) * amp).toFixed(1)}`;
  return d + ` L${W} ${H} Z`;
}

/* ---------- The 10 posters ---------- */
const POSTERS = [
  {
    artist: 'LON3R JOHNY', title: 'Três',
    art: (n, a) => svg(
      T('LON', 30, 205, 210, { s: 62, len: 360 }) +
      T('3', 30, 390, 210, { s: 62, fill: '#ff3b1f' }) +
      T('R', 146, 390, 210, { s: 62, len: 244 }) +
      T('JOHNY', 30, 530, 132, { s: 62, len: 360, fill: 'none', stroke: '#fff', sw: 2 }) +
      foot(n, a, '#777'), '#0d0d0d', a),
  },
  {
    artist: 'VSP AST', title: 'Alvo',
    art: (n, a) => {
      let rings = '';
      for (let r = 180, i = 0; r > 0; r -= 18, i++) rings += `<circle cx="210" cy="235" r="${r}" fill="${i % 2 ? '#ebe6da' : '#111'}"/>`;
      return svg(rings +
        `<rect x="0" y="226" width="${W}" height="18" fill="#ff3b1f"/>` +
        T('VSP', 24, 540, 118, { s: 75, fill: '#111', len: 170 }) +
        T('AST', 396, 540, 118, { s: 75, fill: '#111', len: 170, anchor: 'end' }) +
        foot(n, a, '#555'), '#ebe6da', a);
    },
  },
  {
    artist: 'SMORRA', title: 'Linha',
    art: (n, a) => {
      let bars = '';
      for (let i = 0; i < 14; i++) bars += `<rect x="190" y="${40 + i * 36}" width="${206 - i * 13}" height="${22 - i}" fill="#111"/>`;
      return svg(bars +
        T('SMORRA', -560, 160, 168, { s: 62, fill: '#111', len: 520, tr: 'rotate(-90)' }) +
        foot(n, a, '#111'), '#f2c200', a);
    },
  },
  {
    artist: 'VANISH SHAWTY', title: 'Desaparecer',
    art: (n, a) => {
      let rows = '';
      for (let i = 0; i < 8; i++) rows += T('VANISH', 30, 92 + i * 56, 66, { s: 62, len: 360, op: (1 - i / 8.4).toFixed(2) });
      return svg(rows +
        T('SHAWTY', 30, 548, 60, { s: 125, len: 360, fill: 'none', stroke: '#9fe3ff', sw: 1.4 }) +
        foot(n, a, '#666'), '#111', a);
    },
  },
  {
    artist: 'YURI NR5', title: 'Número Cinco',
    art: (n, a) => svg(
      `<line x1="24" y1="96" x2="396" y2="96" stroke="#f4f1ea" stroke-width="2"/>` +
      T('YURI', 24, 76, 56, { s: 125 , fill: '#f4f1ea' }) +
      T('NR', 396, 76, 56, { s: 125, fill: '#f4f1ea', anchor: 'end' }) +
      T('5', 210, 528, 520, { s: 100, fill: '#f4f1ea', anchor: 'middle' }) +
      foot(n, a, '#a8d5b8'), '#1f5c3a', a),
  },
  {
    artist: 'SIPPINPURPP', title: 'Lean',
    art: (n, a) => {
      const cols = ['#4b1670', '#6a1f9c', '#8b3fc4', '#b27ae0', '#d8b8f2'];
      const waves = cols.map((c, i) => `<path d="${wave(250 + i * 62, 16 - i * 2, 210 - i * 18, i * 1.3)}" fill="${c}"/>`).join('');
      return svg(waves +
        T('SIPPIN', 30, 128, 104, { s: 62, len: 360, fill: '#f3d9ff' }) +
        T('PURPP', 30, 226, 104, { s: 62, len: 360, fill: 'none', stroke: '#f3d9ff', sw: 1.6 }) +
        foot(n, a, '#2a0b3d'), '#2a0b3d', a);
    },
  },
  {
    artist: 'ATJ', title: 'Três Blocos',
    art: (n, a) => svg(
      `<rect x="0" y="44" width="${W}" height="150" fill="#111"/>` +
      `<rect x="0" y="214" width="${W}" height="150" fill="#111"/>` +
      `<rect x="0" y="384" width="${W}" height="150" fill="#111"/>` +
      T('A', 30, 182, 176, { s: 100, fill: '#ff5a1f' }) +
      T('T', 210, 352, 176, { s: 100, fill: '#ff5a1f', anchor: 'middle' }) +
      T('J', 390, 522, 176, { s: 100, fill: '#ff5a1f', anchor: 'end' }) +
      foot(n, a, '#111'), '#ff5a1f', a),
  },
  {
    artist: 'PROFJAM', title: 'Grelha',
    art: (n, a) => {
      let dots = '';
      for (let y = 0; y < 13; y++) for (let x = 0; x < 11; x++) {
        const cx = 40 + x * 34, cy = 50 + y * 30;
        const d = Math.hypot(cx - 330, cy - 120);
        const r = Math.max(1.2, 13 - d / 26);
        dots += `<circle cx="${cx}" cy="${cy}" r="${r.toFixed(1)}" fill="#111"/>`;
      }
      return svg(dots +
        T('PROFJAM', 24, 532, 96, { s: 62, len: 372, fill: '#111' }) +
        foot(n, a, '#555'), '#f4f1ea', a);
    },
  },
  {
    artist: 'SLOW J', title: 'Devagar',
    art: (n, a) => {
      const lens = [130, 200, 280, 372];
      const rows = lens.map((l, i) => T('SLOW', 24, 140 + i * 110, 104, { s: 62, len: l, fill: '#cfe3ff', op: 0.4 + i * 0.2 })).join('');
      return svg(rows +
        `<circle cx="372" cy="94" r="24" fill="#ff3b1f"/>` +
        T('J', 372, 108, 40, { s: 100, fill: '#0b1d3a', anchor: 'middle' }) +
        foot(n, a, '#6f86ab'), '#0b1d3a', a);
    },
  },
  {
    artist: 'DILLAZ', title: 'Diagonal',
    art: (n, a) => {
      let stripes = '';
      for (let i = -12; i < 20; i++) stripes += `<path d="M${i * 34} 0 L${i * 34 + 17} 0 L${i * 34 + 17 - 300} 300 L${i * 34 - 300} 300 Z" fill="#111"/>`;
      return svg(
        `<clipPath id="cl${n}"><rect x="24" y="24" width="372" height="372"/></clipPath>` +
        `<g clip-path="url(#cl${n})">${stripes}</g>` +
        `<circle cx="300" cy="300" r="70" fill="#ff3b1f"/>` +
        T('DILLAZ', 24, 532, 128, { s: 62, len: 372, fill: '#111' }) +
        foot(n, a, '#555'), '#fff', a);
    },
  },
].map((p, i) => ({ ...p, n: i + 1, id: p.artist.toLowerCase().replace(/[^a-z0-9]+/g, '-') }));

const euro = v => '€' + (Number.isInteger(v) ? v : v.toFixed(2).replace('.', ','));
const $ = (s, el = document) => el.querySelector(s);

/* ---------- Cart state ---------- */
let cart = {};
try { cart = JSON.parse(localStorage.getItem('lp-cart')) || {}; } catch (e) { cart = {}; }
const save = () => { try { localStorage.setItem('lp-cart', JSON.stringify(cart)); } catch (e) {} };
const sel = Object.fromEntries(POSTERS.map(p => [p.id, 'A3']));
const key = (id, size) => `${id}|${size}`;
const priceOf = size => SIZES.find(s => s.id === size).price;

function change(id, size, d) {
  const k = key(id, size);
  cart[k] = Math.max(0, (cart[k] || 0) + d);
  if (!cart[k]) delete cart[k];
  save();
  renderCart();
}

/* ---------- Gallery ---------- */
const view = $('.view-posters');
const track = $('.track');
let pos = 0, target = 0; // horizontal scroll offset in px (smoothed)

track.innerHTML = POSTERS.map(p =>
  `<div class="poster" data-n="${p.n}" data-label="${p.artist} — ${p.title}">${p.art(p.n, p.artist)}</div>`).join('');
const posterEls = [...track.children];

const narrow = matchMedia('(max-width: 860px)');
const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

function geo() {
  const vw = innerWidth, w = posterEls[0].offsetWidth;
  const gap = Math.max(w * 0.45, vw * 0.12);
  const x0 = vw - Math.min(vw * 0.08, 90) - w / 2 - vw * 0.06; // first poster centre at rest
  const lead = x0 - vw / 2;                                     // scroll needed to centre poster 1
  return { vw, w, step: w + gap, x0, lead, max: lead + (POSTERS.length - 1) * (w + gap) };
}
const centreOf = (i, g) => g.lead + i * g.step;

let activeIdx = -1;
function layout() {
  if (narrow.matches) return;
  const g = geo();
  target = clamp(target, 0, g.max); pos = clamp(pos, 0, g.max);
  const t = clamp(pos / g.lead, 0, 1);              // 0 at intro → 1 when poster 1 is centred
  const focus = g.x0 + (g.vw / 2 - g.x0) * t;
  posterEls.forEach((el, i) => {
    const cx = g.x0 + i * g.step - pos;
    el.style.transform = `translateX(${cx - g.w / 2}px)`;
    el.style.opacity = 1 - 0.82 * clamp(Math.abs(cx - focus) / g.step, 0, 1);
  });
  const intro = $('.intro');
  intro.style.opacity = clamp(1 - (pos - g.lead * 0.6) / (g.lead * 0.8), 0, 1);
  intro.style.color = `rgb(${Array(3).fill(Math.round(13 + 150 * t)).join(',')})`;
  intro.style.pointerEvents = t > 0.9 ? 'none' : '';
  $('.intro .hint').style.opacity = 1 - t * 3;

  const idx = clamp(Math.round((pos - g.lead) / g.step), 0, POSTERS.length - 1);
  const cap = $('.caption');
  cap.classList.toggle('hide', t < 0.6);
  if (idx !== activeIdx) {
    activeIdx = idx;
    const p = POSTERS[idx];
    cap.innerHTML = `<strong>${p.artist}</strong> — ${p.title} · Nº${String(p.n).padStart(2, '0')}` +
                    `<a href="#shop" data-buy="${p.id}">Comprar desde ${euro(SIZES[0].price)}</a>`;
  }
  $('.counter').textContent = `${String(t < 0.6 ? 0 : idx + 1).padStart(2, '0')} / ${POSTERS.length}`;
  $('.prev').disabled = target <= 0;
  $('.next').disabled = target >= g.max - 1;
}

const reduce = matchMedia('(prefers-reduced-motion: reduce)');
let raf = 0;
function tick() {
  pos += (target - pos) * (reduce.matches ? 1 : 0.12);
  if (Math.abs(target - pos) < 0.5) pos = target;
  layout();
  raf = pos !== target ? requestAnimationFrame(tick) : 0;
}
function scrollToX(x) {
  target = clamp(x, 0, geo().max);
  if (!raf) raf = requestAnimationFrame(tick);
}

// nearest poster stop at or beyond the current target, in direction d
function go(d) {
  const g = geo();
  const stops = [0, ...POSTERS.map((_, i) => centreOf(i, g))];
  const next = d > 0 ? stops.find(s => s > target + 2) : [...stops].reverse().find(s => s < target - 2);
  if (next != null) scrollToX(next);
}

addEventListener('wheel', e => {
  if (document.body.dataset.view !== 'posters' || narrow.matches) return;
  const d = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
  scrollToX(target + d * (e.deltaMode === 1 ? 40 : 1) * 1.2);
}, { passive: true });

addEventListener('keydown', e => {
  if (document.body.dataset.view !== 'posters' || narrow.matches) return;
  if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); go(1); }
  if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); go(-1); }
  if (e.key === 'Home') scrollToX(0);
  if (e.key === 'End') scrollToX(Infinity);
});

let tx = null, moved = false;
addEventListener('touchstart', e => { tx = e.touches[0].clientX; moved = false; }, { passive: true });
addEventListener('touchmove', e => {
  if (tx == null || narrow.matches || document.body.dataset.view !== 'posters') return;
  const x = e.touches[0].clientX;
  scrollToX(target + (tx - x) * 1.4); tx = x; moved = true;
}, { passive: true });
addEventListener('touchend', () => { tx = null; });

$('.prev').onclick = () => go(-1);
$('.next').onclick = () => go(1);
posterEls.forEach((el, i) => el.addEventListener('click', () => {
  if (narrow.matches || i === activeIdx && Math.abs(pos - centreOf(i, geo())) < 40) return buy(POSTERS[i].id);
  scrollToX(centreOf(i, geo()));
}));

/* ---------- Shop grid ---------- */
const grid = $('.grid');
grid.innerHTML = POSTERS.map(p => `
  <article class="card" id="p-${p.id}" data-id="${p.id}">
    <div class="card-art">
      ${p.art(p.n, p.artist)}
      <div class="dial">
        <button class="minus" aria-label="Remover um ${p.artist}">−</button>
        <span class="price"></span>
        <button class="plus" aria-label="Adicionar ${p.artist}">+</button>
      </div>
      <span class="qty"></span>
    </div>
    <div class="card-meta"><h3>${p.artist}</h3><span>Nº${String(p.n).padStart(2, '0')} · ${p.title}</span></div>
    <div class="sizes" role="group" aria-label="Tamanho">
      ${SIZES.map(s => `<button data-size="${s.id}" aria-pressed="false">${s.id}</button>`).join('')}
    </div>
    <p class="size-dims"></p>
  </article>`).join('');

function renderCard(card) {
  const id = card.dataset.id, size = sel[id];
  const q = cart[key(id, size)] || 0;
  card.querySelectorAll('.sizes button').forEach(b => b.setAttribute('aria-pressed', b.dataset.size === size));
  $('.price', card).textContent = euro(priceOf(size));
  $('.qty', card).textContent = q;
  card.classList.toggle('in', q > 0);
  const s = SIZES.find(x => x.id === size);
  $('.size-dims', card).textContent = `${s.id} · ${s.dims} · ${euro(s.price)}`;
}

grid.addEventListener('click', e => {
  const card = e.target.closest('.card'); if (!card) return;
  const id = card.dataset.id;
  if (e.target.dataset.size) { sel[id] = e.target.dataset.size; renderCard(card); }
  else if (e.target.closest('.plus')) change(id, sel[id], 1);
  else if (e.target.closest('.minus')) change(id, sel[id], -1);
});

/* ---------- Cart panel ---------- */
function renderCart() {
  const entries = Object.entries(cart);
  const count = entries.reduce((n, [, q]) => n + q, 0);
  const sub = entries.reduce((t, [k, q]) => t + priceOf(k.split('|')[1]) * q, 0);
  const ship = !count ? 0 : sub >= FREE_SHIP_FROM ? 0 : SHIPPING;

  document.querySelectorAll('.cart-count').forEach(el => (el.textContent = count));
  $('.cart').classList.toggle('has', count > 0);
  $('.checkout').disabled = !count;
  $('.lines').innerHTML = entries.map(([k, q]) => {
    const [id, size] = k.split('|');
    const p = POSTERS.find(x => x.id === id);
    return `<li class="line"><span>${p.artist}<small>${size} · Nº${String(p.n).padStart(2, '0')}</small></span>` +
           `<span class="x">×${q}</span><span class="p">${euro(priceOf(size) * q)}</span>` +
           `<button class="rm" data-k="${k}" aria-label="Remover">×</button></li>`;
  }).join('');
  $('.sub').textContent = euro(sub);
  $('.ship').textContent = count && !ship ? 'Grátis' : euro(SHIPPING);
  $('.tot').textContent = euro(sub + ship);
  document.querySelectorAll('.card').forEach(renderCard);
}

$('.lines').addEventListener('click', e => {
  const k = e.target.dataset.k; if (!k) return;
  delete cart[k]; save(); renderCart();
});

const toast = $('.toast');
$('.checkout').onclick = () => {
  toast.textContent = 'Mockup: o checkout Shopify ainda não está ligado.';
  toast.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => toast.classList.remove('show'), 2600);
};

/* ---------- Routing ---------- */
let pending = null;
function buy(id) {
  pending = id;
  if (location.hash === '#shop') route(); else location.hash = 'shop';
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-buy]');
  if (b) { e.preventDefault(); buy(b.dataset.buy); }
});

function route() {
  const v = location.hash === '#shop' ? 'shop' : 'posters';
  document.body.dataset.view = v;
  document.querySelectorAll('[data-link]').forEach(a => a.classList.toggle('on', a.dataset.link === v));
  if (v === 'posters') { if (narrow.matches) scrollTo(0, 0); return layout(); }
  if (!pending) return scrollTo(0, 0);
  const card = document.getElementById('p-' + pending);
  pending = null;
  card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  card.classList.remove('flash'); void card.offsetWidth; card.classList.add('flash');
}

addEventListener('hashchange', route);
addEventListener('resize', layout);
document.fonts && document.fonts.ready.then(layout);
renderCart();
route();
