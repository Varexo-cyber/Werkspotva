// Gedeelde inhoud: opties, werkwijze, reviews, projecten.
import { icon, esc, googleWord } from './layout.mjs';
import { site } from './config.mjs';

export const OPTIONS = [
  { key: 'droogtijdversneller', title: 'Droogtijdversneller', icon: 'clock', short: 'Laat de vloer sneller drogen, bijvoorbeeld binnen 10 tot 15 dagen.',
    long: 'Normaal gesproken droogt een cementvloer ongeveer 1 centimeter per week. Heeft uw project haast? Met onze droogtijdversneller gaat dat veel sneller, en is de vloer bijvoorbeeld binnen 10 tot 15 dagen legklaar voor de eindafwerking.' },
  { key: 'verharder', title: 'Verharder', alt: 'Vloerverharder', icon: 'shield', short: 'Voor intensief belaste vloeren of garagevloeren.',
    long: 'Deze toevoeging maakt de vloer sterker en beter bestand tegen druk. Ideaal voor ruimtes die intensief belast worden, zoals garages, bedrijfshallen of drukbezochte winkelruimtes.' },
  { key: 'vezels', title: 'Krimpvezels', alt: 'Vezelversterking', tag: 'Vezelwapening', icon: 'layers', short: 'PP-vezels voorkomen krimpscheuren in de zandcementdekvloer.',
    long: 'Door speciale kunststof krimpvezels door de specie te mengen, ontstaat een fijn netwerk van wapening door de hele vloer. Dat verkleint de kans op krimpscheuren tijdens het drogen flink.' },
  { key: 'duremit', title: 'Duremit', icon: 'bolt', short: 'Hoogwaardig additief voor extra sterke en sneldrogende vloeren.',
    long: 'Duremit is een hoogwaardig additief dat de vloer dichter en sterker maakt en het drogen versnelt. Een goede keuze als u een vloer wilt die eerder belastbaar is en een hogere sterkteklasse haalt.' },
  { key: 'krimpnetten', title: 'Krimpnetten', icon: 'grid', short: 'Extra constructieve stevigheid, essentieel bij vloerverwarming.',
    long: 'Een krimpnet is een gaas dat in de dekvloer wordt meegelegd. Het houdt de vloer bij elkaar als hij werkt door warmte en krimp. Boven vloerverwarming raden we het bijna altijd aan.' },
  { key: 'randisolatie', title: 'Randisolatie', icon: 'ruler', short: 'Houdt de vloer vrij van muren en kolommen, zodat hij scheurvrij kan werken.',
    long: 'Langs alle wanden, kolommen en leidingdoorvoeren brengen we een strook randisolatie aan. Zo ligt de dekvloer los van de constructie, kan hij vrij uitzetten en krimpen, en loopt er minder contactgeluid door naar de muren.' },
  { key: 'vlevopol', title: 'Vlevopol', icon: 'drop', short: 'Primer en toeslagstof voor een superieure hechting.',
    long: 'Vlevopol is een hechtmiddel dat we gebruiken als de dekvloer direct op een bestaande betonvloer komt. Het zorgt voor een sterke hechting tussen oud en nieuw, zodat er geen holle plekken ontstaan.' },
];
export const optionByKey = k => OPTIONS.find(o => o.key === k);

export const STEPS = [
  ['Advies vooraf', 'We kijken naar uw situatie en adviseren de juiste opties, zoals vezels of versnellers.'],
  ['Heldere prijsopgave', 'U ontvangt een scherpe, vrijblijvende prijsopgave. Geen verrassingen achteraf.'],
  ['Uitvoering volgens planning', 'Wij schakelen snel, komen afspraken na en werken met modern materieel.'],
  ['Kaarsrecht en legklaar', 'Vlak en waterpas afgewerkt, zodat de vloerenlegger direct aan de slag kan.'],
];
export const stepsHtml = (steps = STEPS) => `<ol class="timeline">${steps.map(([t, d, when], i) => `<li class="reveal"><span class="tl-n">${String(i + 1).padStart(2, '0')}</span><div><h3>${t}</h3><p>${d}</p></div>${when ? `<span class="tl-when">${when}</span>` : ''}</li>`).join('')}</ol>`;

export const optionCards = (opts = OPTIONS, withLink = true) => `<div class="table-scroll"><table class="otable"><thead><tr><th>Optie</th><th>Wat het doet</th></tr></thead><tbody>${opts.map(o => `<tr><td>${o.alt || o.title}</td><td>${o.short}</td></tr>`).join('')}</tbody></table></div>${withLink ? `<p style="margin-top:22px"><a class="text-link" href="/opties">Uitleg per optie ${icon('arrow')}</a></p>` : ''}`;

// Voorbeeldreviews, net als in de demo duidelijk gemarkeerd als voorbeeld.
// Vervang ze door echte Google-reviews zodra het bedrijfsprofiel gekoppeld is.
const REVIEWS = [
  ['Werkplek netjes achtergelaten en met modern materieel gewerkt.', 'Utiliteitsbouw'],
  ['Heldere communicatie en een transparante, eerlijke prijs.', 'Renovatie'],
  ['Kaarsrecht en legklaar opgeleverd, de tegelzetter kon direct aan de slag.', 'Zandcement dekvloer'],
  ['Duidelijk advies vooraf over vezels en de droogtijdversneller. Geen verrassingen achteraf.', 'Zandcement met versneller'],
  ['Vloerverwarming en dekvloer in één keer geregeld, met één aanspreekpunt.', 'Vloerverwarming en dekvloer'],
  ['Snel geschakeld en de afspraken nagekomen, precies volgens planning.', 'Nieuwbouw'],
];
const reviewCard = ([q, t]) => `<article class="review"><div class="r-top"><span class="r-av">G</span><div><b>Klant via Google</b><span class="stars" aria-label="5 sterren">★★★★★</span></div><span class="r-tag">Voorbeeld</span></div><q>${esc(q)}</q><small>${esc(t)}</small></article>`;
export const reviewsSection = () => !site.reviews?.length ? '' : `<section class="dark" id="reviews"><div class="wrap">
<a class="gbadge" href="${site.googleReviewsUrl || '#reviews'}"${site.googleReviewsUrl ? ' target="_blank" rel="noopener"' : ''}>${googleWord}<span class="stars">★★★★★</span>Reviews</a>
<h2>Reviews</h2>
<p class="lead">Voorbeeldweergave: zodra uw Google Bedrijfsprofiel is gekoppeld, verschijnen hier automatisch de echte beoordelingen van uw klanten.</p>
</div>
<div class="wrap"><div class="rev-grid">${site.reviews.slice(0, 3).map(reviewCard).join('')}</div></div>
</section>`;

// Voorbeeldprojecten uit de demo. Vervang foto's in public/assets/img/ en pas teksten hier aan.
export const PROJECTS = [
  { tag: 'Zandcement', title: 'Kantoorpand', place: 'Utrecht', m2: '800', img: 'project-1' },
  { tag: 'Zandcement + Vloerverwarming', title: 'Renovatie woonhuis', place: 'Rotterdam', m2: '180', img: 'project-2' },
  { tag: 'Zandcement', title: 'Bedrijfshal', place: 'Eindhoven', m2: '3.500', img: 'project-3' },
  { tag: 'Vloerverwarming', title: 'Nieuwbouwwoning', place: 'Den Haag', m2: '160', img: 'project-4' },
  { tag: 'Zandcement', title: 'Kantoorruimte', place: 'Amsterdam', m2: '450', img: 'project-5' },
  { tag: 'Zandcement', title: 'Utiliteitsgebouw', place: 'Tilburg', m2: '2.100', img: 'project-6' },
  { tag: 'Zandcement', title: 'Appartementencomplex', place: 'Almere', m2: '1.250', img: 'project-7' },
  { tag: 'Zandcement + Vezels', title: 'Herenhuis', place: 'Haarlem', m2: '210', img: 'project-8' },
  { tag: 'Zandcement', title: 'Showroom', place: 'Zwolle', m2: '600', img: 'project-1' },
];
export const projectCard = p => `<figure class="proj reveal"><img src="/assets/img/${p.img}.jpg" alt="${esc(p.title)} in ${esc(p.place)}, ${p.m2} m² zandcement dekvloer" loading="lazy" width="900" height="700"><span class="ptag">${esc(p.tag)}</span><figcaption><b>${esc(p.title)}</b><span>${esc(p.place)} · ${p.m2} m²</span></figcaption></figure>`;

export const featureList = items => `<dl class="specs">${items.map(([, t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>`;

// ───────────────────────── Nieuwe blokken

// Zoekwoorden-band onder de hero (uit de klantlijst).
const KEYWORDS = ['Zandcement dekvloer', 'Cementdekvloer', 'Zand-cementvloer', 'Vloerverwarming', 'Anhydriet', 'Egaliseren', 'Krimpnetten', 'Droogtijdversneller', 'Duremit', 'Randisolatie', 'Nieuwbouw', 'Renovatie', 'Utiliteit'];
export const ruler = () => `<div class="ruler" aria-hidden="true">${Array.from({ length: 40 }, (_, i) => `<span style="left:${(i + 1) * 100}px">${(i + 1) * 10}</span>`).join('')}</div>`;
export const keywordBand = () => `<div class="kband" aria-hidden="true"><div class="kband-track">${[...KEYWORDS, ...KEYWORDS].map(k => `<span>${k}</span>`).join('')}</div></div>`;

// Specificatiekaart naast de hero: echte vaktermen en maten.
export const heroCard = () => `<aside class="spec-card" aria-label="Kenmerken van onze dekvloeren">
<div class="spec-head">Standaard opbouw</div>
<dl>
<div><dt>Sterkteklasse</dt><dd>CT-C20-F4</dd></div>
<div><dt>Laagdikte</dt><dd>5 – 8 cm</dd></div>
<div><dt>Mengverhouding</dt><dd>1 : 4,5</dd></div>
<div><dt>Legklaar met versneller</dt><dd>10 – 15 dagen</dd></div>
</dl>
<p class="spec-foot">Vlak en waterpas afgereid · eigen mixer en pomp</p>
</aside>`;

// Interactieve doorsnede van een vloeropbouw.
const LAYERS = [
  { id: 'afwerking', name: 'Afwerkvloer', mm: '± 10 mm', h: 22, fill: 'var(--l-finish)', text: 'Tegels, pvc, laminaat, parket of een gietvloer. Hoe vlakker de dekvloer, hoe strakker dit resultaat.' },
  { id: 'dekvloer', name: 'Zandcement dekvloer', mm: '50 – 80 mm', h: 96, fill: 'var(--l-screed)', text: 'De laag die wij leggen: zand, cement en water, gepompt, verdicht en kaarsrecht afgereid. Minimaal 3 à 4 cm boven de leidingen.', pipes: true, net: true },
  { id: 'isolatie', name: 'Isolatie', mm: '60 – 120 mm', h: 64, fill: 'var(--l-insu)', text: 'PIR- of EPS-platen houden de warmte in de vloer en de kou van de kruipruimte weg. De dekvloer ligt hier zwevend op.' },
  { id: 'beton', name: 'Constructievloer', mm: '± 200 mm', h: 78, fill: 'var(--l-concrete)', text: 'De dragende betonvloer of kanaalplaatvloer. Ligt de dekvloer direct hierop, dan zorgt Vlevopol voor de hechting.' },
];
export function buildUp() {
  const W = 560; let y = 20;
  const rects = LAYERS.map(l => {
    const r = { ...l, y }; y += l.h + 6; return r;
  });
  const svg = `<svg class="bu-svg" viewBox="0 0 ${W} ${y + 14}" role="img" aria-label="Doorsnede van een vloer: afwerking, dekvloer met vloerverwarming, isolatie en constructievloer">
<defs>
<pattern id="pIns" width="14" height="14" patternUnits="userSpaceOnUse"><path d="M0 14 14 0" stroke="rgba(0,0,0,.12)" stroke-width="2"/></pattern>
<pattern id="pCon" width="18" height="18" patternUnits="userSpaceOnUse"><circle cx="4" cy="5" r="1.6" fill="rgba(0,0,0,.18)"/><circle cx="13" cy="12" r="2.2" fill="rgba(0,0,0,.12)"/></pattern>
<pattern id="pScr" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".7" fill="rgba(0,0,0,.16)"/><circle cx="5" cy="4.5" r=".5" fill="rgba(255,255,255,.25)"/></pattern>
</defs>
<path d="M20 ${y + 6} H${W - 20}" stroke="var(--l-line)" stroke-dasharray="4 6"/>
${rects.map(l => `<g class="bu-layer" data-layer="${l.id}" tabindex="0">
<rect x="20" y="${l.y}" width="${W - 40}" height="${l.h}" rx="6" fill="${l.fill}"/>
${l.id === 'isolatie' ? `<rect x="20" y="${l.y}" width="${W - 40}" height="${l.h}" rx="6" fill="url(#pIns)"/>` : ''}
${l.id === 'beton' ? `<rect x="20" y="${l.y}" width="${W - 40}" height="${l.h}" rx="6" fill="url(#pCon)"/>` : ''}
${l.id === 'dekvloer' ? `<rect x="20" y="${l.y}" width="${W - 40}" height="${l.h}" rx="6" fill="url(#pScr)"/>` : ''}
${l.net ? `<path d="M28 ${l.y + l.h - 34} H${W - 28}" stroke="var(--l-net)" stroke-width="2" stroke-dasharray="2 5"/>` : ''}
${l.pipes ? Array.from({ length: 16 }, (_, i) => `<circle cx="${44 + i * 32}" cy="${l.y + l.h - 20}" r="8" fill="${i % 2 ? 'var(--l-pipe2)' : 'var(--l-pipe)'}" stroke="rgba(255,255,255,.6)" stroke-width="1.5"/>`).join('') : ''}
</g>`).join('')}
</svg>`;
  return `<div class="buildup">
<div class="bu-list" role="tablist" aria-label="Lagen van de vloer">${LAYERS.map((l, i) => `<button type="button" role="tab" class="bu-item${i === 1 ? ' on' : ''}" data-layer="${l.id}" aria-selected="${i === 1}"><span class="bu-sw" style="background:${l.fill}"></span><span class="bu-txt"><b>${l.name}</b><small>${l.mm}</small><span class="bu-desc">${l.text}</span></span></button>`).join('')}</div>
<div class="bu-fig">${svg}<div class="bu-tags"><span>Krimpnet</span><span>Vloerverwarming</span><span>Randisolatie langs de wand</span></div></div>
</div>`;
}

// Live prijscalculator; de prijs komt uit src/config.mjs.
export function calculator(place = '') {
  const { base5cm, perExtraCm, minimumOrder } = site.price;
  return `<div class="calc" data-base="${base5cm.join(',')}" data-extra="${perExtraCm.join(',')}" data-min="${minimumOrder}" data-place="${esc(place)}">
<div class="calc-in">
<div class="calc-row"><label for="calcM2">Oppervlakte</label><output id="calcM2out">60 m²</output></div>
<input id="calcM2" type="range" min="5" max="1000" step="1" value="60" aria-describedby="calcM2out">
<div class="calc-row" style="margin-top:26px"><span class="flabel">Dikte</span></div>
<div class="seg-btns" role="radiogroup" aria-label="Dikte">${[5, 6, 7, 8].map(c => `<button type="button" role="radio" aria-checked="${c === 6}" data-cm="${c}"${c === 6 ? ' class="on"' : ''}>${c} cm</button>`).join('')}</div>
<div class="calc-row" style="margin-top:26px"><span class="flabel">Opties</span></div>
<div class="calc-opts">
<label><input type="checkbox" id="calcVv" data-add="2,3"> Krimpnet (vloerverwarming)</label>
<label><input type="checkbox" id="calcAcc" data-add="3,5"> Droogtijdversneller</label>
<label><input type="checkbox" id="calcVez" data-add="1,2"> Krimpvezels</label>
</div>
</div>
<div class="calc-out">
<span class="calc-lbl">Indicatie${place ? ' voor ' + esc(place) : ''}</span>
<div class="calc-price"><span id="calcLo">€ 1.200</span><i>–</i><span id="calcHi">€ 1.700</span></div>
<p class="calc-per" id="calcPer">€ 20 – € 29 per m² · excl. btw</p>
<a class="btn btn-teal" id="calcCta" href="/offerte">Vraag deze prijs vast aan ${icon('arrow')}</a>
<p class="calc-note">Indicatie inclusief materiaal en aanbrengen. Na inmeting krijgt u een vaste prijs.</p>
</div>
</div>`;
}

// Galerij met lightbox (foto's en video's).
export function gallery(items, limit = 0) {
  const list = limit ? items.slice(0, limit) : items;
  return `<div class="gal">${list.map((m, i) => `<button type="button" class="gal-item${i % 9 === 0 ? ' big' : ''}" data-src="${m.src}" data-video="${m.video ? 1 : 0}" data-caption="${esc(m.caption)}${m.credit ? ' · Foto: ' + esc(m.credit.creator) + ' (' + m.credit.license + ')' : ''}" aria-label="Bekijk ${esc(m.caption)}">
${m.video ? `<video src="${m.src}#t=0.5" muted playsinline preload="metadata"${m.poster ? ` poster="${m.poster}"` : ''}></video><span class="gal-play" aria-hidden="true">▶</span>` : `<img src="${m.src}" alt="${esc(m.caption)}" loading="lazy">`}
<span class="gal-cap">${esc(m.caption)}${m.credit ? `<small>Foto: ${esc(m.credit.creator)} · ${m.credit.license}</small>` : ''}</span></button>`).join('')}</div>
${list.some(m => m.credit) ? '<p class="gal-note">Licentievrije beelden met naamsvermelding. <a href="/fotoverantwoording">Fotoverantwoording</a></p>' : ''}
<dialog class="lightbox" id="lightbox" aria-label="Foto of video vergroot"><button type="button" class="lb-close" aria-label="Sluiten">×</button><button type="button" class="lb-prev" aria-label="Vorige">‹</button><div class="lb-stage"></div><button type="button" class="lb-next" aria-label="Volgende">›</button><p class="lb-cap"></p></dialog>`;
}
