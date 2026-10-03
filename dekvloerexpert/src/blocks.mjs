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
export const stepsHtml = (steps = STEPS) => `<div class="steps">${steps.map(([t, d], i) => `<div class="step reveal"><div class="num">${String(i + 1).padStart(2, '0')}</div><h3>${t}</h3><p>${d}</p></div>`).join('')}</div>`;

export const optionCards = (opts = OPTIONS, withLink = true) => `<div class="cards">${opts.map(o => `<div class="card reveal"><span class="ck">${icon('check')}</span><div><h3>${o.alt || o.title}</h3><p>${o.short}</p></div></div>`).join('')}${withLink ? `<a class="card link reveal" href="/opties"><div><h3>Alles over de opties</h3><p>Uitleg per optie en wanneer u hem kiest.</p></div><span class="arrow">${icon('arrow')}</span></a>` : ''}</div>`;

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
export const reviewsSection = () => `<section class="dark" id="reviews"><div class="wrap center">
<a class="gbadge" href="${site.googleReviewsUrl || '#reviews'}"${site.googleReviewsUrl ? ' target="_blank" rel="noopener"' : ''}>${googleWord}<span class="stars">★★★★★</span>Reviews</a>
<h2>Wat onze klanten <span class="accent">zeggen</span></h2>
<p class="lead">Voorbeeldweergave: zodra uw Google Bedrijfsprofiel is gekoppeld, verschijnen hier automatisch de echte beoordelingen van uw klanten.</p>
</div>
<div class="marquee"><div class="track">${[...REVIEWS, ...REVIEWS].map(reviewCard).join('')}</div></div>
<div class="marquee" style="margin-top:0"><div class="track rev">${[...REVIEWS.slice(3), ...REVIEWS.slice(0, 3), ...REVIEWS.slice(3), ...REVIEWS.slice(0, 3)].map(reviewCard).join('')}</div></div>
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

export const featureList = items => `<div class="features">${items.map(([ic, t, d]) => `<div class="feature reveal"><span class="f-ic">${icon(ic)}</span><div><h3>${t}</h3><p>${d}</p></div></div>`).join('')}</div>`;
