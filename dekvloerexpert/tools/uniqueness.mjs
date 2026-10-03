// Controle na het bouwen:
//  1. alle interne links verwijzen naar een bestaande pagina
//  2. titels en meta-descriptions zijn uniek
//  3. hoeveel tekst plaatspagina's met elkaar delen (5-woord-shingles, Jaccard)
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url).pathname;
const files = [];
(function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) { if (f !== 'assets') walk(p); } else if (f.endsWith('.html')) files.push(p); } })(dist);

const exists = href => {
  const p = href.split(/[?#]/)[0];
  if (p === '/' || p === '') return true;
  return existsSync(join(dist, p + '.html')) || existsSync(join(dist, p));
};
let broken = 0; const titles = new Map(), descs = new Map();
const texts = {};
for (const f of files) {
  const html = readFileSync(f, 'utf8');
  for (const [, h] of html.matchAll(/href="(\/[^"]*)"/g)) if (!exists(h)) { broken++; if (broken < 10) console.log('kapotte link', h, 'in', f.replace(dist, '')); }
  const t = html.match(/<title>(.*?)<\/title>/)[1], d = html.match(/name="description" content="(.*?)"/)[1];
  titles.set(t, (titles.get(t) || 0) + 1); descs.set(d, (descs.get(d) || 0) + 1);
  const name = f.replace(dist, '');
  if (name.startsWith('zandcement-dekvloer-')) {
    const main = html.split('<main id="main">')[1].split('</main>')[0];
    texts[name] = main.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/g, ' ').toLowerCase().split(/\s+/).filter(Boolean);
  }
}
console.log(`${files.length} pagina's, ${broken} kapotte interne links`);
console.log(`dubbele titels: ${[...titles.values()].filter(n => n > 1).length}, dubbele descriptions: ${[...descs.values()].filter(n => n > 1).length}`);

const sh = w => { const s = new Set(); for (let i = 0; i + 5 <= w.length; i++) s.add(w.slice(i, i + 5).join(' ')); return s; };
const names = Object.keys(texts); const S = Object.fromEntries(names.map(n => [n, sh(texts[n])]));
const jac = (a, b) => { let i = 0; for (const x of a) if (b.has(x)) i++; return i / (a.size + b.size - i); };
let max = 0, maxPair, sum = 0, n = 0; const step = Math.max(1, Math.floor(names.length / 160));
const sample = names.filter((_, i) => i % step === 0);
for (let i = 0; i < sample.length; i++) for (let j = i + 1; j < sample.length; j++) { const v = jac(S[sample[i]], S[sample[j]]); sum += v; n++; if (v > max) { max = v; maxPair = [sample[i], sample[j]]; } }
// Paren binnen dezelfde gemeente (meest vergelijkbaar)
let maxSib = 0, sibPair, sibSum = 0, sibN = 0;
for (let i = 0; i + 1 < names.length; i++) { const v = jac(S[names[i]], S[names[i + 1]]); sibSum += v; sibN++; if (v > maxSib) { maxSib = v; sibPair = [names[i], names[i + 1]]; } }
console.log(`gem. woorden per plaatspagina: ${Math.round(names.reduce((a, k) => a + texts[k].length, 0) / names.length)}`);
console.log(`gedeelde tekst, steekproef: gemiddeld ${(sum / n * 100).toFixed(1)}%, max ${(max * 100).toFixed(1)}% (${maxPair})`);
console.log(`gedeelde tekst, buurpagina's: gemiddeld ${(sibSum / sibN * 100).toFixed(1)}%, max ${(maxSib * 100).toFixed(1)}% (${sibPair})`);
