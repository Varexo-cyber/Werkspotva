/* Dekvloerexpert — previewvideo, frame voor frame gerenderd (1920×1080, 60 fps).
 *
 * Geen schermopname: elk frame wordt apart opgebouwd (scrollpositie, cursor,
 * ondertitel) en als screenshot naar ffmpeg gestuurd. Daardoor is de video
 * altijd vloeiend, ongeacht hoe snel de machine is.
 *
 *   node build.mjs --serve            # site op :8080
 *   node preview-video/record.cjs     # → preview-video/dekvloerexpert-preview.mp4
 */
const { chromium } = require('playwright-core');
const { spawn } = require('child_process');
const path = require('path');

const BASE = 'http://localhost:8080';
const W = 1920, H = 1080, FPS = 60;
const OUT = path.join(__dirname, 'dekvloerexpert-preview.mp4');
const CHROME = process.env.CHROME || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const ease = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a, b, t) => a + (b - a) * t;
const sec = s => Math.round(s * FPS);

// Alles wat we over de site heen leggen: cursor, klikring, ondertitel, titelkaarten, overgang.
const OVERLAY_CSS = `
*,*::before,*::after{transition:none!important;animation:none!important;caret-color:transparent!important}
html{scroll-behavior:auto!important}
::-webkit-scrollbar{width:0!important;height:0!important}
.js .reveal,.reveal{opacity:1!important;transform:none!important}
.wa-fab{display:none!important}
#v-cur{position:fixed;left:0;top:0;z-index:2147483647;pointer-events:none;will-change:transform}
#v-cur svg{display:block;filter:drop-shadow(0 3px 8px rgba(0,0,0,.45))}
#v-ring{position:fixed;left:0;top:0;width:60px;height:60px;margin:-30px 0 0 -30px;border:3px solid #22d1ad;border-radius:50%;z-index:2147483646;pointer-events:none;opacity:0}
#v-cap{position:fixed;left:56px;bottom:56px;z-index:2147483645;pointer-events:none;max-width:980px;
  background:#0d100f;color:#fff;border:1px solid rgba(255,255,255,.14);border-radius:12px;padding:20px 28px 22px;
  font:600 30px/1.3 Inter,system-ui,sans-serif;letter-spacing:-.015em;box-shadow:0 24px 60px -20px rgba(0,0,0,.7);opacity:0}
#v-cap small{display:block;font:500 15px/1 'JetBrains Mono',monospace;letter-spacing:.12em;text-transform:uppercase;color:#22d1ad;margin-bottom:10px}
#v-card{position:fixed;inset:0;z-index:2147483640;background:#0d100f;color:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 160px;opacity:0;pointer-events:none}
#v-card .k{font:500 20px/1 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#22d1ad;margin-bottom:28px}
#v-card h1{font:800 104px/1 'Inter Tight',Inter,sans-serif;letter-spacing:-.04em;margin:0 0 30px}
#v-card h1 span{color:#22d1ad}
#v-card p{font:400 32px/1.45 Inter,sans-serif;color:#b9c4c0;margin:0;max-width:1200px}
#v-card .ruler{position:absolute;left:0;right:0;bottom:0}
#v-fade{position:fixed;inset:0;z-index:2147483641;pointer-events:none;background-size:cover;opacity:0}
`;

async function main() {
  const browser = await chromium.launch({ executablePath: CHROME });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });

  let frameNo = 0;
  const shot = async () => {
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    frameNo++;
    if (frameNo % 300 === 0) console.log(`  ${frameNo} frames (${(frameNo / FPS).toFixed(0)} s)`);
  };

  // Staat van de overlay, per frame naar de pagina gestuurd.
  const st = { cx: W * .62, cy: H * .55, cur: 0, ring: -1, cap: '', capK: '', capA: 0, card: 0, cardHtml: '', fade: 0 };
  const apply = () => page.evaluate(s => {
    const c = document.getElementById('v-cur'), r = document.getElementById('v-ring'), p = document.getElementById('v-cap'), k = document.getElementById('v-card'), f = document.getElementById('v-fade');
    // Een open <dialog> ligt boven alles; cursor en ondertitel moeten daarin mee.
    const host = document.querySelector('dialog[open]') || document.body;
    if (c.parentElement !== host) { host.appendChild(r); host.appendChild(p); host.appendChild(c); }
    c.style.transform = `translate(${s.cx}px,${s.cy}px)`; c.style.opacity = s.cur;
    if (s.ring >= 0) { const q = s.ring; r.style.opacity = 1 - q; r.style.transform = `translate(${s.cx}px,${s.cy}px) scale(${.3 + q * .9})`; } else r.style.opacity = 0;
    if (p.dataset.t !== s.cap + s.capK) { p.innerHTML = (s.capK ? `<small>${s.capK}</small>` : '') + s.cap; p.dataset.t = s.cap + s.capK; }
    p.style.opacity = s.capA; p.style.transform = `translateY(${(1 - s.capA) * 16}px)`;
    if (k.dataset.h !== s.cardHtml) { k.innerHTML = s.cardHtml; k.dataset.h = s.cardHtml; }
    k.style.opacity = s.card; f.style.opacity = s.fade;
  }, st);
  const frame = async () => { await apply(); await shot(); };

  const prepare = async () => {
    await page.addStyleTag({ content: OVERLAY_CSS });
    await page.evaluate(() => {
      document.querySelectorAll('img[loading]').forEach(i => i.loading = 'eager');
      const add = (id, html = '') => { const d = document.createElement('div'); d.id = id; d.innerHTML = html; document.body.appendChild(d); };
      add('v-cur', '<svg width="30" height="30" viewBox="0 0 24 24"><path d="M5 2.5 19 12.2l-6.1.9L9.6 19z" fill="#fff" stroke="#0d100f" stroke-width="1.6" stroke-linejoin="round"/></svg>');
      add('v-ring'); add('v-cap'); add('v-card'); add('v-fade');
    });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
    });
  };

  const goto = async (url, { crossfade = true } = {}) => {
    let snap = null;
    if (crossfade && frameNo) snap = 'data:image/jpeg;base64,' + (await page.screenshot({ type: 'jpeg', quality: 90 })).toString('base64');
    await page.goto(BASE + url, { waitUntil: 'networkidle' });
    await prepare();
    if (snap) {
      await page.evaluate(s => { document.getElementById('v-fade').style.backgroundImage = `url(${s})`; }, snap);
      st.fade = 1;
      await run(sec(.5), t => { st.fade = 1 - ease(t); });
      st.fade = 0;
    }
  };

  // Hulpfuncties voor de tijdlijn
  async function run(n, fn) { for (let i = 0; i < n; i++) { fn(n === 1 ? 1 : i / (n - 1)); await frame(); } }
  const hold = s => run(sec(s), () => {});
  const scrollY = () => page.evaluate(() => scrollY);
  // run() wacht niet op async fn; daarom een eigen lus voor scrollen
  async function runAsync(n, fn) { for (let i = 0; i < n; i++) { await fn(n === 1 ? 1 : i / (n - 1)); await frame(); } }
  const scrollToEl = async (sel, offset = 110, s = 1.5) => {
    const y = await page.evaluate(([q, o]) => { const e = document.querySelector(q); return e.getBoundingClientRect().top + scrollY - o; }, [sel, offset]);
    const y0 = await scrollY();
    const max = await page.evaluate(() => document.documentElement.scrollHeight - innerHeight);
    const y1 = Math.max(0, Math.min(max, y));
    await runAsync(sec(s), async t => { await page.evaluate(v => scrollTo(0, v), lerp(y0, y1, ease(t))); });
  };
  const box = sel => page.evaluate(q => { const r = document.querySelector(q).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
  const moveTo = async (x, y, s = .8) => { const x0 = st.cx, y0 = st.cy; await run(sec(s), t => { st.cx = lerp(x0, x, ease(t)); st.cy = lerp(y0, y, ease(t)); }); };
  const moveToEl = async (sel, s = .8, dx = 0, dy = 0) => { const b = await box(sel); await moveTo(b.x + dx, b.y + dy, s); };
  const click = async (sel, action) => {
    if (action) await action(); else await page.evaluate(q => document.querySelector(q).click(), sel);
    await run(sec(.4), t => { st.ring = t; }); st.ring = -1;
  };
  const caption = async (k, text, s) => { st.capK = k; st.cap = text; await run(sec(.35), t => { st.capA = ease(t); }); if (s) await hold(s); };
  const capOff = async () => { await run(sec(.3), t => { st.capA = 1 - ease(t); }); st.capA = 0; };
  const cursorIn = () => run(sec(.3), t => { st.cur = t; });
  const cursorOut = () => run(sec(.3), t => { st.cur = 1 - t; });
  const card = async (html, s) => { st.cardHtml = html; await run(sec(.5), t => { st.card = ease(t); }); await hold(s); };
  const cardOff = async () => { await run(sec(.6), t => { st.card = 1 - ease(t); }); st.card = 0; };
  const ruler = '<div class="ruler" aria-hidden="true"></div>';

  console.log('Opnemen…');

  // 1 — Titelkaart
  await goto('/', { crossfade: false });
  await card(`<div class="k">Preview · ${new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' })}</div><h1>Dekvloer<span>expert</span></h1><p>Uw nieuwe website, in anderhalve minuut. Van de homepage tot de pagina's per stad.</p>${ruler}`, 2.6);
  await cardOff();

  // 2 — Hero
  await caption('Homepage', 'Direct duidelijk wat u doet, met drie manieren om contact op te nemen.', .6);
  await cursorIn();
  await moveToEl('.hero .btn-teal', 1);
  await hold(.5);
  await moveToEl('.hero .btn-wa', .6); await hold(.3);
  await moveToEl('.hero .btn-ghost', .6); await hold(.5);
  await moveToEl('.spec-card', .9, 0, -40);
  await caption('Homepage', 'Rechts de vakgegevens waar aannemers naar zoeken: sterkteklasse, dikte, droogtijd.', 2.2);

  // 3 — Wat wij doen
  await capOff();
  await scrollToEl('main section:nth-of-type(2)', 60, 1.6);
  await moveTo(W * .3, H * .55, .6);
  await caption('Uitleg', 'Uitleg in gewone taal, met de specificaties overzichtelijk eronder.', 2.4);

  // 4 — Galerij + lightbox
  await capOff();
  await scrollToEl('.gal', 230, 1.6);
  await caption('Foto’s', 'Foto’s van het werk. Klik erop voor een grote weergave.', .8);
  await moveToEl('.gal-item:nth-child(4)', .8);
  await click('.gal-item:nth-child(4)');
  await hold(1.4);
  await moveToEl('.lb-next', .6); await click('.lb-next'); await hold(1.1);
  await moveToEl('.lb-close', .6); await click('.lb-close'); await hold(.3);

  // 5 — Opbouw
  await capOff();
  await scrollToEl('#opbouw', 90, 1.6);
  await caption('Interactief', 'Een doorsnede van de vloer. Klanten zien precies wat een dekvloer is.', .6);
  for (const id of ['isolatie', 'beton', 'dekvloer']) {
    await moveToEl(`.bu-item[data-layer="${id}"]`, .7, -120);
    await click(`.bu-item[data-layer="${id}"]`);
    await hold(.9);
  }

  // 6 — Prijscalculator
  await capOff();
  await scrollToEl('#prijs', 90, 1.6);
  await caption('Prijscalculator', 'Schuif de oppervlakte en zie direct een prijsindicatie.', .4);
  const rb = await page.evaluate(() => { const r = document.querySelector('#calcM2').getBoundingClientRect(); return { x: r.left, w: r.width, y: r.top + r.height / 2 }; });
  const pos = v => rb.x + 14 + (rb.w - 28) * (v - 5) / (1000 - 5);
  await moveTo(pos(60), rb.y, .8);
  await click(null, async () => {});
  await runAsync(sec(1.8), async t => {
    const v = Math.round(lerp(60, 140, ease(t)));
    st.cx = pos(v);
    await page.evaluate(v => { const r = document.querySelector('#calcM2'); r.value = v; r.dispatchEvent(new Event('input', { bubbles: true })); }, v);
  });
  await hold(.4);
  await moveToEl('.seg-btns button[data-cm="7"]', .6); await click('.seg-btns button[data-cm="7"]'); await hold(.6);
  await moveToEl('#calcVv', .6); await click('#calcVv', () => page.evaluate(() => { const c = document.querySelector('#calcVv'); c.checked = true; c.dispatchEvent(new Event('change', { bubbles: true })); })); await hold(.5);
  await moveToEl('#calcCta', .8);
  await caption('Prijscalculator', 'Met één klik vraagt de klant deze prijs aan. Het formulier staat dan al ingevuld.', 2.2);

  // 7 — Werkwijze en werkgebied
  await capOff();
  await scrollToEl('.timeline', 200, 1.6);
  await caption('Werkwijze', 'Hoe het gaat, met echte doorlooptijden. Van inmeting tot legklaar.', 2.2);
  await capOff();
  await scrollToEl('.prov-grid', 260, 1.5);
  await caption('Werkgebied', 'Heel Nederland: twaalf provincies, 87 gemeenten, 574 plaatsen en wijken.', 1.2);
  await moveToEl('.prov-grid a:first-child', .8);
  await click('.prov-grid a:first-child', async () => {});
  await hold(.3);

  // 8 — Provinciepagina
  await capOff();
  await goto('/werkgebied/noord-holland');
  st.cx = W * .5; st.cy = H * .5;
  await scrollToEl('.muni-grid', 140, 1.6);
  await caption('Lokaal gevonden worden', 'Per provincie alle gemeenten en kernen. Elke plaats heeft een eigen pagina.', 1.4);
  await moveToEl('.muni a[href="/zandcement-dekvloer-alkmaar"]', .9);
  await click('.muni a[href="/zandcement-dekvloer-alkmaar"]', async () => {});
  await hold(.2);

  // 9 — Plaatspagina Alkmaar
  await capOff();
  await goto('/zandcement-dekvloer-alkmaar');
  await caption('Pagina per stad', 'Zoekt iemand “zandcement dekvloer Alkmaar”, dan komt hij hier uit.', 2.2);
  await capOff();
  await scrollToEl('main section:nth-of-type(2)', 80, 1.6);
  await caption('Pagina per stad', 'Eigen tekst per plaats, over het soort bebouwing en de buurt. Geen kopie van een andere pagina.', 2.6);
  await capOff();
  await scrollToEl('.ptable', 300, 1.6);
  await caption('Pagina per stad', 'Prijsvoorbeelden en een calculator voor Alkmaar.', 2);
  await capOff();
  await scrollToEl('.faq', 250, 1.6);
  await caption('Pagina per stad', 'Veelgestelde vragen per stad, zo opgemaakt dat Google ze in de zoekresultaten kan tonen.', 2.4);

  // 10 — Offerte
  await capOff();
  await goto('/offerte');
  await caption('Offerte', 'Het offerteformulier: in een paar klikken ingevuld.', .4);
  await scrollToEl('.form-card', 110, 1.2);
  for (const [name, val] of [['ruimte', 'Hele verdieping'], ['verdieping', 'Begane grond']]) {
    const sel = `.chipset input[name="${name}"][value="${val}"]`;
    const lb = await page.evaluate(q => { const r = document.querySelector(q).parentElement.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    await moveTo(lb.x, lb.y, .5);
    await click(sel, () => page.evaluate(q => { const i = document.querySelector(q); i.checked = true; i.dispatchEvent(new Event('change', { bubbles: true })); }, sel));
    await hold(.25);
  }
  await moveToEl('#m2', .6);
  await click('#m2', () => page.focus('#m2'));
  for (const ch of '85') { await page.keyboard.type(ch); await hold(.14); }
  await hold(.3);
  await scrollToEl('.fgroup[data-group="laagdikte"]', 300, 1);
  for (const [name, val] of [['laagdikte', '6 cm'], ['vloerverwarming', 'Ja, moet nog worden aangelegd'], ['type', 'Nieuwbouw']]) {
    const sel = `.chipset input[name="${name}"][value="${val}"]`;
    const lb = await page.evaluate(q => { const r = document.querySelector(q).parentElement.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
    await moveTo(lb.x, lb.y, .5);
    await click(sel, () => page.evaluate(q => { const i = document.querySelector(q); i.checked = true; i.dispatchEvent(new Event('change', { bubbles: true })); }, sel));
    await hold(.2);
  }
  await caption('Offerte', 'De aanvraag komt direct bij u binnen op WhatsApp, met alle gegevens erin.', 2.4);

  // 11 — Mobiel
  await capOff(); await cursorOut();
  await page.goto('about:blank');
  await page.setContent(`<!doctype html><html><head><link rel="stylesheet" href="${BASE}/assets/fonts/fonts.css"></head><body style="margin:0;background:#0d100f;width:${W}px;height:${H}px;overflow:hidden;display:flex;align-items:center;gap:120px;padding:0 160px;box-sizing:border-box;font-family:Inter,sans-serif">
    <div style="width:390px;height:844px;border-radius:52px;padding:14px;background:#1b201f;box-shadow:0 40px 90px -30px #000, inset 0 0 0 2px #2c3331;flex:none"><iframe id="ph" src="${BASE}/" style="width:390px;height:844px;border:0;border-radius:40px;display:block;background:#fff"></iframe></div>
    <div style="color:#fff;max-width:760px"><div style="font:500 20px 'JetBrains Mono',monospace;letter-spacing:.14em;text-transform:uppercase;color:#22d1ad;margin-bottom:26px">Mobiel</div>
    <div style="font:800 78px/1.02 'Inter Tight',Inter,sans-serif;letter-spacing:-.035em;margin-bottom:28px">Werkt net zo goed op de telefoon.</div>
    <div style="font:400 30px/1.45 Inter,sans-serif;color:#b9c4c0">Onderin staan vaste knoppen voor bellen, WhatsApp en offerte. De meeste aanvragen komen via de telefoon binnen.</div></div></body></html>`, { waitUntil: 'networkidle' });
  const fr = page.frames().find(f => f.url().startsWith(BASE));
  await fr.addStyleTag({ content: OVERLAY_CSS });
  await fr.evaluate(async () => { document.querySelectorAll('img[loading]').forEach(i => i.loading = 'eager'); await document.fonts.ready; });
  await page.waitForTimeout(800);
  const plain = async () => { await shot(); };
  for (let i = 0; i < sec(.8); i++) await plain();
  const mh = await fr.evaluate(() => document.documentElement.scrollHeight - innerHeight);
  const stops = [0, 900, 2100, 3300, Math.min(mh, 5200)];
  for (let s = 1; s < stops.length; s++) {
    const n = sec(1.3);
    for (let i = 0; i < n; i++) { await fr.evaluate(v => scrollTo(0, v), lerp(stops[s - 1], stops[s], ease(i / (n - 1)))); await plain(); }
    for (let i = 0; i < sec(.7); i++) await plain();
  }

  // 12 — Slotkaart
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await prepare();
  st.cur = 0; st.capA = 0;
  await card(`<div class="k">Preview</div><h1>Klaar voor <span>livegang</span></h1><p>574 plaatspagina's, prijscalculator, offerteformulier en een werkgebied door heel Nederland. Na uw akkoord, uw eigen foto's en de domeinnaam zetten we hem online.</p>${ruler}`, 3.6);

  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log(`Klaar: ${OUT} (${frameNo} frames, ${(frameNo / FPS).toFixed(1)} s)`);
}

main().catch(e => { console.error(e); process.exit(1); });
