/* Vakmaat — gescripte schermtour van ca. 70 seconden.
   Zichtbare cursor + ondertitels, zodat de video ook zonder geluid werkt. */
const { chromium } = require('playwright');

const BASE = 'http://127.0.0.1:8080/';
const OUT  = '/tmp/claude-0/-home-user-Werkspotva/d2accbec-9921-5b96-baa6-55ec06fad992/scratchpad/video';

/* Wordt na elke navigatie opnieuw uitgevoerd; is bewust idempotent. */
function OVERLAY() {
  if (window.__cur) return;

  var css = document.createElement('style');
  css.textContent =
    '::-webkit-scrollbar{width:0!important;height:0!important}' +
    '#__cur{position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;pointer-events:none;margin:-3px 0 0 -3px}' +
    '#__cur svg{filter:drop-shadow(0 2px 6px rgba(0,0,0,.4))}' +
    '#__ring{position:fixed;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;border:2.5px solid #E5A23C;border-radius:50%;z-index:2147483646;pointer-events:none;opacity:0}' +
    '#__cap{position:fixed;left:46px;bottom:46px;z-index:2147483645;pointer-events:none;display:flex;align-items:center;gap:15px;' +
      'background:rgba(12,47,39,.94);color:#fff;padding:16px 26px 16px 18px;border-radius:15px;' +
      'font:600 23px/1.3 Inter,system-ui,sans-serif;letter-spacing:-.012em;box-shadow:0 20px 46px -14px rgba(0,0,0,.6);' +
      'opacity:0;transform:translateY(14px);transition:opacity .42s ease,transform .42s ease;max-width:62vw}' +
    '#__cap.on{opacity:1;transform:none}' +
    '#__cap i{width:6px;height:36px;border-radius:3px;background:#E5A23C;flex:none}' +
    '#__end{position:fixed;inset:0;z-index:2147483644;background:#0C2F27;color:#fff;display:grid;place-items:center;' +
      'opacity:0;transition:opacity .7s ease;pointer-events:none}' +
    '#__end.on{opacity:1}';
  document.documentElement.appendChild(css);

  var c = document.createElement('div');
  c.id = '__cur';
  c.innerHTML = '<svg viewBox="0 0 24 24" width="26" height="26">' +
    '<path d="M5 2.5 19 12.2l-6.1.9L9.6 19z" fill="#fff" stroke="#0F1F1B" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var r = document.createElement('div'); r.id = '__ring';
  var p = document.createElement('div'); p.id = '__cap'; p.innerHTML = '<i></i><span></span>';
  document.body.appendChild(c); document.body.appendChild(r); document.body.appendChild(p);

  var x = window.innerWidth / 2, y = window.innerHeight * 0.45;
  function place() {
    c.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    r.style.transform = 'translate(' + x + 'px,' + y + 'px)';
  }
  place();

  function ease(p) { return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; }

  window.__cur = {
    to: function (tx, ty, ms) {
      return new Promise(function (res) {
        var x0 = x, y0 = y, t0 = performance.now();
        (function step(now) {
          var q = Math.min(1, (now - t0) / ms), e = ease(q);
          x = x0 + (tx - x0) * e; y = y0 + (ty - y0) * e;
          place();
          q < 1 ? requestAnimationFrame(step) : res();
        })(performance.now());
      });
    },
    click: function () {
      r.style.transition = 'none'; r.style.opacity = '1';
      r.style.width = '14px'; r.style.height = '14px'; r.style.margin = '-7px 0 0 -7px';
      requestAnimationFrame(function () {
        r.style.transition = 'all .55s ease-out';
        r.style.opacity = '0'; r.style.width = '52px'; r.style.height = '52px';
        r.style.margin = '-26px 0 0 -26px';
      });
    }
  };

  window.__cap = {
    show: function (t) { p.querySelector('span').textContent = t; p.classList.add('on'); },
    hide: function () { p.classList.remove('on'); }
  };

  window.__glide = function (to, ms) {
    return new Promise(function (res) {
      var y0 = window.scrollY, t0 = performance.now();
      (function step(now) {
        var q = Math.min(1, (now - t0) / ms);
        window.scrollTo(0, y0 + (to - y0) * ease(q));
        q < 1 ? requestAnimationFrame(step) : res();
      })(performance.now());
    });
  };

  window.__outro = function (merk, regel) {
    var e = document.createElement('div');
    e.id = '__end';
    e.innerHTML =
      '<div style="text-align:center;font-family:Inter,system-ui,sans-serif">' +
        '<svg viewBox="0 0 40 40" width="86" height="86" style="margin:0 auto 26px">' +
          '<rect width="40" height="40" rx="11" fill="#14594A"/>' +
          '<path d="M7 19.4 20 8.6l13 10.8" stroke="#E5A23C" stroke-width="3.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>' +
          '<path d="M20 15.8v7.3" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>' +
          '<path d="M20 23.6 23.2 27 20 30.4 16.8 27z" fill="#fff"/></svg>' +
        '<div style="font-size:62px;font-weight:700;letter-spacing:-.04em">' + merk + '</div>' +
        '<div style="font-size:25px;color:#A8C2B9;margin-top:16px">' + regel + '</div>' +
      '</div>';
    document.body.appendChild(e);
    requestAnimationFrame(function () { e.classList.add('on'); });
  };
}

(async () => {
  const browser = await chromium.launch({
    args: ['--ignore-certificate-errors', '--hide-scrollbars', '--force-device-scale-factor=1']
  });
  const ctx = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    recordVideo: { dir: OUT, size: { width: 1920, height: 1080 } }
  });
  const page = await ctx.newPage();
  page.on('pageerror', e => console.log('PAGEERROR:', e.message));

  const wait  = ms => page.waitForTimeout(ms);
  const setup = () => page.evaluate(OVERLAY);
  const cap   = t => page.evaluate(s => window.__cap.show(s), t);
  const capOff= () => page.evaluate(() => window.__cap.hide());
  const glide = (to, ms = 1400) => page.evaluate(([t, m]) => window.__glide(t, m), [to, ms]);

  const open = async (path, caption) => {
    await page.goto(BASE + path, { waitUntil: 'load' });
    await wait(420);
    await setup();
    if (caption) await cap(caption);
  };
  const moveTo = async (sel, ms = 620) => {
    const b = await page.locator(sel).first().boundingBox();
    if (!b) throw new Error('niet gevonden: ' + sel);
    await page.evaluate(([x, y, m]) => window.__cur.to(x, y, m), [b.x + b.width / 2, b.y + b.height / 2, ms]);
    await wait(ms + 50);
  };
  const click = async (sel, ms = 620) => {
    await moveTo(sel, ms);
    await page.evaluate(() => window.__cur.click());
    await wait(200);
    await page.locator(sel).first().click();
  };
  const type = async (sel, txt, d = 45) => {
    await moveTo(sel, 480);
    await page.locator(sel).first().click();
    await page.locator(sel).first().type(txt, { delay: d });
  };

  /* ---- 1. Opening (0:00) ---- */
  await open('index.html', 'Vakmaat — de vakman voor jouw klus');
  await wait(1560);
  await capOff();
  await glide(980, 1326);
  await cap('Zestien vakgebieden, van schilder tot warmtepomp');
  await wait(1440);
  await capOff(); await wait(250);

  /* ---- 2. Vakmensen zitten achter een account (0:09) ---- */
  await open('vakmensen.html', 'Vakmensen bekijken kan alleen met een gratis account');
  await wait(1560);
  await capOff(); await wait(250);
  await page.fill('#p-naam', 'Jan Bergsma');
  await wait(250);
  await page.fill('#p-mail', 'jan@voorbeeld.nl');
  await wait(250);
  await page.fill('#p-ww', 'Geheim123');
  await wait(300);
  await click('.poort__form button[type=submit]', 507);
  await wait(1080);

  /* ---- 3. Zoeken en filteren (0:20) ---- */
  await setup();
  await cap('Filteren op vak, beoordeling en certificaten');
  await glide(240, 669);
  await wait(720);
  await click('label:has([data-vak=loodgieter])', 484);
  await wait(840);
  await click('label:has([data-vak=schilderwerk])', 437);
  await wait(1140);
  await capOff(); await wait(250);

  /* ---- 4. Bedrijfsprofiel (0:28) ---- */
  await open('vakman.html?id=meijer-installatie', 'Profiel met reviews, certificaten en werkgebied');
  await wait(1320);
  await glide(1100, 1326);
  await wait(720);
  await glide(2150, 1248);
  await wait(1200);
  await capOff(); await wait(250);

  /* ---- 5. Klus plaatsen (0:37) ---- */
  await open('klus-plaatsen.html', 'Klus plaatsen: vijf korte stappen');
  await wait(960);
  await click('.vaktegel:has-text("Loodgieter")', 484);
  await wait(1020);
  await capOff(); await wait(250);
  await click('#btn-volgende', 437);
  await wait(480);

  await cap('Omschrijving, foto’s en een live samenvatting');
  await type('#f-titel', 'Lekkage onder de keukenvloer', 26);
  await wait(250);
  await page.fill('#f-omschrijving', 'Water onder de vloer bij de keuken, vermoedelijk een lekkende leiding. Woning uit 1998.');
  await wait(900);
  await click('#btn-volgende', 437);
  await wait(420);
  await capOff(); await wait(250);

  await cap('Planning, budget en locatie');
  await click('#wanneer-opties .choice:nth-child(1)', 437);
  await wait(250);
  await click('#budget-opties .choice:nth-child(2)', 437);
  await wait(540);
  await click('#btn-volgende', 406);
  await wait(420);
  await page.fill('#f-pc', '3511 AB');
  await page.fill('#f-huisnr', '12');
  await wait(660);
  await click('#btn-volgende', 406);
  await wait(420);
  await capOff(); await wait(250);

  await page.fill('#f-voornaam', 'Jan');
  await page.fill('#f-achternaam', 'Bergsma');
  await page.fill('#f-email', 'jan@voorbeeld.nl');
  await page.fill('#f-tel', '06 12 34 56 78');
  await wait(360);
  await click('label:has(#f-akkoord)', 406);
  await wait(300);
  await click('#btn-volgende', 437);
  await wait(900);
  await setup();
  await cap('Klus staat online bij bedrijven in de regio');
  await wait(1560);
  await capOff(); await wait(250);

  /* ---- 6. Offertes vergelijken (0:57) ---- */
  await open('mijn-klussen.html', 'Offertes naast elkaar — de klant kiest zelf');
  await wait(1320);
  await glide(430, 1092);
  await wait(780);
  await click('.offerte:nth-child(2) [data-actie=kies]', 546);
  await wait(1260);
  await capOff(); await wait(250);

  /* ---- 7. Voor bedrijven (1:07) ---- */
  await open('voor-bedrijven.html', 'Voor bedrijven: hoeveel werk ligt er in jouw regio?');
  await wait(1020);
  await type('#r-pc', '3511 AB', 38);
  await wait(250);
  await click('#regio button[type=submit]', 468);
  await wait(1560);
  await capOff(); await wait(250);

  /* ---- 8. Tarieven (1:16) ---- */
  await open('prijzen.html', 'Vaste prijs per maand — geen leads afrekenen');
  await glide(430, 730);
  await wait(840);
  await click('[data-periode=jaar]', 484);
  await wait(1200);
  await capOff(); await wait(250);

  /* ---- 9. Dashboard (1:24) ---- */
  await open('dashboard.html', 'Dashboard: klussen binnen, reageren met een prijs');
  await wait(1320);
  await click('.lead-item', 546);
  await wait(1080);
  await capOff(); await wait(250);
  await page.fill('#r-prijs', '1.850');
  await wait(250);
  await page.fill('#r-bericht', 'Ik kom graag langs om op te meten. Volgende week kan ik starten.');
  await wait(540);
  await click('#reactie button[type=submit]', 484);
  await wait(1200);

  /* ---- 10. Slot (1:36) ---- */
  await page.evaluate(() => window.__outro('Vakmaat', 'Preview — vakmaat.nl'));
  await wait(2040);

  await ctx.close();
  await browser.close();
  console.log('opname klaar');
})();
