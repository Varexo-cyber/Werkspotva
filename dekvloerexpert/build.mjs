// Bouwt de complete site naar dist/.
//   node build.mjs          → bouwen
//   node build.mjs --serve  → bouwen en lokaal bekijken op http://localhost:8080
import { mkdirSync, rmSync, writeFileSync, cpSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';
import { site } from './src/config.mjs';
import { loadPlaces, PROVINCES } from './src/places.mjs';
import * as P from './src/pages.mjs';
import { placePage, muniHub, provincePage, werkgebied } from './src/place-pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'dist');
const data = loadPlaces(join(root, 'data/plaatsen.csv'));

// Footer: hoofdplaats per provincie + grootste steden, voor interne links vanaf elke pagina.
const BIG = ['Amsterdam', 'Rotterdam', 'Den Haag', 'Utrecht', 'Eindhoven', 'Groningen', 'Tilburg', 'Almere', 'Breda', 'Nijmegen', 'Apeldoorn', 'Haarlem', 'Arnhem', 'Enschede', 'Amersfoort', 'Zaanstad', "'s-Hertogenbosch", 'Zwolle', 'Leiden', 'Maastricht', 'Dordrecht', 'Alkmaar', 'Leeuwarden', 'Middelburg', 'Assen'];
const footerPlaces = BIG.map(n => data.munis.find(m => m.name === n)).filter(Boolean).map(m => ({ slug: m.slug, name: m.name }));
const ctx = { ...data, footerPlaces };

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync(join(root, 'public'), out, { recursive: true });

const urls = [];
const write = (path, html, priority = 0.6) => {
  const file = path === '/' ? 'index.html' : path.slice(1) + '.html';
  const full = join(out, file);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, html);
  if (path !== '/404') urls.push([path, priority]);
};

write('/', P.home(ctx), 1.0);
for (const [slug, html] of P.services(ctx)) write('/' + slug, html, slug === 'zandcement' ? 0.9 : 0.7);
write('/diensten', P.dienstenOverview(ctx), 0.7);
write('/kennisbank', P.kennisbank(ctx), 0.6);
write('/opties', P.opties(ctx), 0.7);
write('/projecten', P.projecten(ctx), 0.6);
write('/werkwijze', P.werkwijze(ctx), 0.6);
write('/over-ons', P.overOns(ctx), 0.5);
write('/offerte', P.offerte(ctx), 0.8);
write('/contact', P.contact(ctx), 0.7);
write('/privacy', P.privacy(ctx), 0.2);
write('/werkgebied', werkgebied(ctx), 0.8);
write('/404', P.notFound(ctx));

for (const pv of data.provinces) write(`/werkgebied/${pv.slug}`, provincePage(pv, ctx), 0.7);
for (const m of data.munis) if (m.hubOnly) write(`/${m.slug}`, muniHub(m, ctx), 0.7);
for (const p of data.places) write(`/${p.slug}`, placePage(p, ctx), p.isMain ? 0.8 : 0.6);

// Dubbele URL's voorkomen
const seen = new Set();
for (const [u] of urls) { if (seen.has(u)) throw new Error('Dubbele URL: ' + u); seen.add(u); }

// Sitemap + robots
const today = new Date().toISOString().slice(0, 10);
writeFileSync(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, pr]) => `<url><loc>${site.url}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod><priority>${pr.toFixed(1)}</priority></url>`).join('\n')}
</urlset>
`);
writeFileSync(join(out, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);

// vercel.json staat in de projectmap: nette URL's zonder .html en 301's voor de "Zone"-regels.
if (data.legacySlugs.length > 1) console.warn('Let op: nieuwe afwijkende slugs in de CSV, voeg redirects toe aan vercel.json:', data.legacySlugs);

console.log(`✓ ${urls.length} pagina's gebouwd in dist/`);
console.log(`  ${data.places.length} plaatspagina's, ${data.munis.filter(m => m.hubOnly).length} gemeentepagina's, ${data.provinces.length} provinciepagina's`);
console.log(`  ${data.zoneCount} "Zone"-regels uit de CSV → 301 naar de echte plaatspagina`);

if (process.argv.includes('--serve')) {
  const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.xml': 'application/xml', '.txt': 'text/plain', '.json': 'application/json' };
  createServer((req, res) => {
    let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    const zone = p.match(/^\/(zandcement-dekvloer-.+)-zone-\d+$/);
    if (zone) { res.writeHead(301, { Location: '/' + zone[1] }); return res.end(); }
    let file = join(out, p === '/' ? 'index.html' : p);
    if (!extname(file)) file += '.html';
    if (!file.startsWith(out) || !existsSync(file)) { res.writeHead(404, { 'Content-Type': types['.html'] }); return res.end(readFileSync(join(out, '404.html'))); }
    res.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
    res.end(readFileSync(file));
  }).listen(8080, () => console.log('→ http://localhost:8080'));
}
