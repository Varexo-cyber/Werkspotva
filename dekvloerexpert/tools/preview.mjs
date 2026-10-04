// Maakt van dist/ een kleine, losse preview met relatieve links (voor delen via een link).
// Alleen de vaste pagina's, provincies en een paar steden; overige plaatslinks tonen een melding.
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const dist = join(root, 'dist');
const out = process.argv[2] || join(root, 'preview');
const CITIES = ['amsterdam', 'rotterdam', 'den-haag', 'utrecht', 'alkmaar', 'zaanstad', 'zaanstad-zaandam', 'haarlem', 'eindhoven', 'groningen', 'almere', 'amsterdam-osdorp', 'den-haag-scheveningen', 'alkmaar-oudorp', 'zwolle', 'maastricht'].map(s => 'zandcement-dekvloer-' + s);

const pages = readdirSync(dist).filter(f => f.endsWith('.html') && (!f.startsWith('zandcement-dekvloer-') || f === 'zandcement-dekvloer-zelf-maken.html' || CITIES.includes(f.slice(0, -5))));
const prov = readdirSync(join(dist, 'werkgebied')).map(f => 'werkgebied/' + f);
const all = [...pages, ...prov];
const set = new Set(all.map(f => f.replace(/\.html$/, '')));

rmSync(out, { recursive: true, force: true }); mkdirSync(join(out, 'werkgebied'), { recursive: true });
cpSync(join(dist, 'assets'), join(out, 'assets'), { recursive: true });
rmSync(join(out, 'assets/media/credits.json'), { force: true });

const notice = `<div id="pvToast" style="position:fixed;left:50%;bottom:110px;transform:translateX(-50%);background:#111514;color:#fff;border:1px solid rgba(34,209,173,.4);padding:12px 18px;border-radius:12px;font:500 15px Inter,system-ui,sans-serif;z-index:99;display:none;max-width:90vw;text-align:center">Deze pagina zit niet in de preview. Op de echte site heeft elke plaats een eigen pagina.</div>
<script>document.addEventListener('click',function(e){var a=e.target.closest('a[data-pv]');if(!a)return;e.preventDefault();var t=document.getElementById('pvToast');t.style.display='block';clearTimeout(t._h);t._h=setTimeout(function(){t.style.display='none'},2600)})</script>`;

for (const f of all) {
  const up = f.includes('/') ? '../' : '';
  let h = readFileSync(join(dist, f), 'utf8');
  h = h.replace(/(href|src)="\/(?!\/)([^"#?]*)([^"]*)"/g, (m, attr, p, rest) => {
    if (p.startsWith('assets/')) return `${attr}="${up}${p}${rest}"`;
    const key = p === '' ? 'index' : p;
    if (set.has(key)) return `${attr}="${up}${key === 'index' ? 'home' : key}.html${rest}"`;
    return `${attr}="#" data-pv="1"`;
  });
  h = h.replace(/url\('\/assets\//g, `url('${up}assets/`);
  h = h.replace('</body>', notice + '</body>');
  writeFileSync(join(out, f === 'index.html' ? 'home.html' : f), h);
}
// CSS/JS-paden
const fc = join(out, 'assets/fonts/fonts.css'); writeFileSync(fc, readFileSync(fc, 'utf8').replace(/\/assets\/fonts\//g, ''));
const js = join(out, 'assets/js/site.js'); writeFileSync(js, readFileSync(js, 'utf8').replace("'/offerte?m2='", "'offerte.html?m2='"));
// Startpagina
writeFileSync(join(out, 'start.html'), `<title>Dekvloerexpert</title>
<style>:root{color-scheme:dark}body{background:#0d100f;color:#fff;font:16px system-ui,sans-serif;display:grid;place-items:center;min-height:90vh;padding-inline:16px;text-align:center}a{color:#22d1ad;font-weight:700}</style>
<p>De preview wordt geopend… <a href="home.html">Open Dekvloerexpert</a></p>
<script>location.replace('home.html')</script>
`);
const files = {}; (function walk(d, rel) { for (const f of readdirSync(d, { withFileTypes: true })) { const r = rel ? rel + '/' + f.name : f.name; if (f.isDirectory()) walk(join(d, f.name), r); else if (r !== 'start.html') files[r] = join(d, f.name); } })(out, '');
writeFileSync(join(out, '..', 'preview-files.json'), JSON.stringify(files));
console.log(Object.keys(files).length + ' bestanden, ' + all.length + " pagina's");
