// Leest data/plaatsen.csv en bouwt er een nette plaatsenboom van:
// provincie → gemeente → plaats/wijk.
//
// Het aangeleverde bestand bevat 2.500 regels, maar 1.926 daarvan zijn
// "(Zone ####)"-kopieën van dezelfde 574 plaatsen. Die krijgen geen eigen
// pagina (dat zou Google als duplicate content zien); ze worden met een
// 301-redirect naar de echte plaatspagina gestuurd.
import { readFileSync } from 'node:fs';

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some(v => v !== '')) rows.push(row);
      row = [];
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows;
  return body.map(r => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] ?? '').trim()])));
}

export const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Spelling zoals mensen hem schrijven.
const NAME_FIX = {
  's-Hertogenbosch': "'s-Hertogenbosch",
  'Sudwest-Fryslan': 'Súdwest-Fryslân',
  'Tull en t Waal': "Tull en 't Waal",
  't Goy': "'t Goy",
  'Gravenzande': "'s-Gravenzande",
  'Nieuw-Geldderland': 'Nieuw-Gelderland',
  'Velp-grens': 'Velp',
  'Bloemendaal-grens': 'Bloemendaal-grens',
};
const fix = s => NAME_FIX[s] ?? s;

// Stadsdelen die zonder stadsnaam niets zeggen ("Noord", "West").
const BARE = /^(noord|zuid|oost|west|centrum|zuidoost|nieuw-west|oud-zuid|nijmegen-noord|zwolle-zuid)$/i;

export const PROVINCES = ['Noord-Holland', 'Zuid-Holland', 'Utrecht', 'Noord-Brabant', 'Gelderland', 'Overijssel',
  'Groningen', 'Friesland', 'Drenthe', 'Flevoland', 'Zeeland', 'Limburg'];

export function loadPlaces(file) {
  const raw = parseCsv(readFileSync(file, 'utf8'));
  const zoneRows = raw.filter(r => /\(Zone \d+\)/.test(r.city));
  const rows = raw.filter(r => !/\(Zone \d+\)/.test(r.city));

  const munis = new Map();
  const places = [];
  const legacySlugs = []; // slugs uit de CSV die we anders schrijven → redirect

  for (const r of rows) {
    const muniRaw = r.municipality;
    const muniName = fix(muniRaw);
    let suffix = r.city === muniRaw ? '' : r.city.slice(muniRaw.length).trim();
    suffix = suffix.replace(/-(stad|dorp)$/, '');
    let name, kind;
    if (!suffix || suffix === muniRaw) { name = muniName; kind = 'stad'; }
    else if (BARE.test(suffix)) { name = `${muniName}-${suffix}`.replace(`${muniName}-${muniName}-`, `${muniName}-`); kind = 'wijk'; }
    else if (suffix === 'Bloemendaal-grens') { name = `${muniName} (grens Bloemendaal)`; kind = 'wijk'; }
    else { name = fix(suffix); kind = 'kern'; }

    const slug = slugify(r.slug);
    if (slug !== r.slug) legacySlugs.push([r.slug, slug]);

    const p = {
      slug, name, kind,
      csvCity: r.city,
      muni: muniName,
      province: r.province,
      region: r.region,
      cityType: r.city_type,
      advice: r.local_advice,
      isMain: kind === 'stad',
    };
    places.push(p);
    if (!munis.has(muniName)) munis.set(muniName, { name: muniName, province: r.province, places: [] });
    munis.get(muniName).places.push(p);
  }

  // Gemeenten zonder eigen stadsregel (bijv. Zaanstad) krijgen een overzichtspagina.
  for (const m of munis.values()) {
    const main = m.places.find(p => p.isMain);
    m.main = main || null;
    m.slug = main ? main.slug : `zandcement-dekvloer-${slugify(m.name)}`;
    m.hubOnly = !main;
    // Kernen die de gemeente tegelijk naam geven (Medemblik in Medemblik) behandelen we als hoofdplaats.
    if (!main) {
      const same = m.places.find(p => p.name === m.name);
      if (same) { same.kind = 'stad'; same.isMain = true; m.main = same; m.slug = same.slug; m.hubOnly = false; }
    }
    // Delen van een stad (Osdorp, Amsterdam) vs. kernen van een plattelandsgemeente (Andijk).
    for (const p of m.places) {
      p.muniRef = m;
      if (p.kind === 'kern' && !m.hubOnly && m.main && m.main.name === m.name && !/Medemblik|Schagen|Barneveld|Dronten/.test(m.name)) p.kind = 'deel';
      p.label = p.kind === 'deel' ? `${p.name} (${m.name})` : p.name;
      p.inLabel = p.kind === 'deel' ? `${p.name}, ${m.name}` : p.name;
    }
  }

  // Bij de hoofdstad/hoofdkern van een gemeente die ook als wijk voorkomt (Amsterdam, Utrecht)
  // is "wijk" juist; bij gemeenten als Alphen aan den Rijn zijn het dorpen. We onderscheiden
  // dat op het aantal inwoners niet; de tekst blijft daarom neutraal ("in en rond").
  const provinces = PROVINCES.map(name => ({
    name, slug: slugify(name),
    munis: [...munis.values()].filter(m => m.province === name).sort((a, b) => a.name.localeCompare(b.name, 'nl')),
  })).filter(p => p.munis.length);

  for (const pv of provinces) for (const m of pv.munis) m.provinceRef = pv;

  return { places, munis: [...munis.values()], provinces, zoneCount: zoneRows.length, totalRows: raw.length, legacySlugs };
}
