// Vaste pagina's: home, diensten, opties, projecten, werkwijze, kennisbank, offerte, contact.
import { site } from './config.mjs';
import { page, hero, cta, icon, waIcon, wa, tel, esc, googleWord, crumbLd, faqLd, faqHtml, SERVICES } from './layout.mjs';
import { OPTIONS, STEPS, stepsHtml, optionCards, reviewsSection, PROJECTS, projectCard, featureList } from './blocks.mjs';
import { euro, priceRange, rangeText } from './content.mjs';

const p5 = `${euro(site.price.base5cm[0])} – ${euro(site.price.base5cm[1])}`;

// ───────────────────────── Home
export function home(ctx) {
  const stats = `<div class="stats"><div class="wrap">${site.stats.map(([b, s]) => `<div class="stat"><b>${b}</b><span>${s}</span></div>`).join('')}</div></div>`;
  const body = `
${hero({
    sub: false,
    h1: 'Zandcement dekvloeren:<br><span class="accent">De perfecte basis voor elk project</span>',
    lead: 'Een strakke, duurzame en kaarsrechte vloer begint bij de basis. Voor nieuwbouw, utiliteit en renovatie, door heel Nederland.',
    checks: ['Specialist in zandcementdekvloeren', 'Door heel Nederland', 'Gratis prijsopgave', 'Voor particulieren &amp; aannemers'],
    extra: `<a class="gbadge" href="#reviews">${googleWord}<span class="stars">★★★★★</span>Reviews</a>`,
    buttons: `<div class="btn-row"><a class="btn btn-teal" href="/offerte">Offerte aanvragen ${icon('arrow')}</a><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${waIcon} WhatsApp</a><a class="btn btn-ghost" href="${tel}">${icon('phone')} Bel direct</a></div>`,
  })}
${stats}

<section><div class="wrap split">
<div class="reveal">
<span class="eyebrow">Onze hoofddienst</span>
<h2>Zandcement dekvloeren <span class="accent">van topkwaliteit</span></h2>
<p class="lead">Een strakke, duurzame en kaarsrechte vloer begint bij de basis. Of het nu gaat om een complete nieuwbouwwoning, een grootschalig utiliteitsproject of een kleinschalige renovatie: onze zandcement dekvloeren vormen het perfecte fundament voor elke eindafwerking, zoals tegels, pvc, gietvloeren of parket.</p>
<p style="color:var(--muted)">Met jarenlange ervaring leveren wij topkwaliteit vloeren die voldoen aan de hoogste normen. Snel, vakkundig en met oog voor detail.</p>
${featureList([
    ['flame', 'Optimale warmtegeleiding', 'Perfect te combineren met vloerverwarming voor een maximaal rendement en een comfortabel binnenklimaat.'],
    ['shield', 'Hoge druk- en buigtreksterkte', 'Wij stemmen de mortelsamenstelling exact af op de gebruiksintensiteit van de ruimte.'],
    ['ruler', 'Kaarsrecht en waterpas', 'Afgereid op de juiste hoogte, zodat de vloerenlegger direct aan de slag kan.'],
    ['drop', 'Vochtbestendig', 'Zandcement kan tegen vocht en is geschikt voor badkamers, garages en kelders.'],
  ])}
<p style="margin-top:34px"><a class="text-link" href="/zandcement">Alles over zandcement dekvloeren ${icon('arrow')}</a></p>
</div>
<div class="photo reveal"><img src="/assets/img/dekvloer-2.jpg" alt="Vers gelegde zandcement dekvloer in een kantoorpand" width="1200" height="1400" loading="lazy"></div>
</div></section>

<section class="dark" style="padding-bottom:60px"><div class="wrap">
<div class="reveal" style="max-width:760px">
<span class="eyebrow">Ons werk</span>
<h2>Van zandaanvoer<br><span class="accent">tot legklare vloer.</span></h2>
<p class="lead">Nieuwbouw, utiliteit en renovatie: wij laten de werkplek netjes achter en werken met modern materieel.</p>
<p style="margin-top:30px"><a class="text-link" href="/projecten">Bekijk alle projectfoto's ${icon('arrow')}</a></p>
</div></div>
<div class="strip">${PROJECTS.slice(0, 8).map(p => `<figure><img src="/assets/img/${p.img}.jpg" alt="${esc(p.title)}, ${esc(p.place)}" loading="lazy" width="900" height="700"><figcaption>${esc(p.title)} · ${esc(p.place)}</figcaption></figure>`).join('')}</div>
</section>

<section class="paper"><div class="wrap split rev">
<div class="photo reveal"><img src="/assets/img/dekvloer-1.jpg" alt="Dekvloer in een bedrijfspand, klaar voor afwerking" width="1200" height="900" loading="lazy">
<div class="photo-badge"><span class="ic">${icon('users')}</span><div><b>Alles onder één dak</b><span>Eén aanspreekpunt van begin tot eind</span></div></div></div>
<div class="reveal">
<span class="eyebrow">Aannemers en particulieren</span>
<h2>Betrouwbaar voor aannemers, <span class="accent">zorgeloos voor particulieren.</span></h2>
<div class="aud">
<div><div class="aud-h"><span class="f-ic">${icon('building')}</span><h3>Voor aannemers</h3></div>
<p>In de bouw is tijd geld. Wij begrijpen de dynamiek op de bouwplaats als geen ander.</p>
<ul class="ticks">
<li>${icon('check')}<div><b>Flexibele planning</b><span>Wij schakelen snel en komen afspraken na.</span></div></li>
<li>${icon('check')}<div><b>Kwaliteit conform normen</b><span>Vloeren die exact voldoen aan de gestelde sterkteklassen en vlakheidseisen.</span></div></li>
<li>${icon('check')}<div><b>Schoon en efficiënt</b><span>Wij laten de werkplek netjes achter en werken met modern materieel.</span></div></li>
</ul></div>
<div><div class="aud-h"><span class="f-ic">${icon('home')}</span><h3>Voor particulieren</h3></div>
<p>Het verbouwen of bouwen van je eigen woning is al spannend genoeg. Wij nemen de zorg voor je vloer volledig uit handen.</p>
<ul class="ticks">
<li>${icon('check')}<div><b>Duidelijk advies vooraf</b><span>We kijken naar jouw specifieke woonsituatie en adviseren de juiste opties (zoals vezels of versnellers).</span></div></li>
<li>${icon('check')}<div><b>Geen verrassingen achteraf</b><span>Heldere communicatie en transparante, eerlijke prijzen.</span></div></li>
<li>${icon('check')}<div><b>Alles in één pakket</b><span>Vloerverwarming en dekvloer met één aanspreekpunt geregeld.</span></div></li>
</ul></div>
</div></div>
</div></section>

<section class="dark"><div class="wrap">
<div class="center sec-head reveal"><span class="eyebrow">Maatwerk opties</span>
<h2>Extra opties <span class="accent">voor uw dekvloer</span></h2>
<p class="lead">Elk bouwproject stelt andere eisen aan een vloer. Deze opties bestelt u direct bij ons mee.</p></div>
${optionCards(OPTIONS)}
</div></section>

<section><div class="wrap">
<div class="center sec-head reveal"><span class="eyebrow">Werkwijze</span>
<h2>Van eerste contact<br><span class="accent">tot legklare vloer</span></h2>
<p class="lead">Heldere communicatie en transparante, eerlijke prijzen.</p></div>
${stepsHtml()}
</div></section>

${reviewsSection()}

<section class="paper"><div class="wrap">
<div class="center sec-head reveal"><span class="eyebrow">Werkgebied</span>
<h2>Zandcement dekvloeren <span class="accent">in heel Nederland</span></h2>
<p class="lead">Wij werken in alle twaalf provincies. Kies uw provincie of plaats voor informatie en prijzen bij u in de buurt.</p></div>
<div class="prov-grid reveal">${ctx.provinces.map(pv => `<a class="prov" href="/werkgebied/${pv.slug}">${pv.name}<span>${pv.munis.reduce((n, m) => n + m.places.length, 0)} plaatsen</span></a>`).join('')}</div>
<div class="center" style="margin-top:34px"><a class="text-link" href="/werkgebied">Bekijk alle ${ctx.places.length} plaatsen ${icon('arrow')}</a></div>
</div></section>

<section><div class="wrap">
<div class="center sec-head reveal"><span class="eyebrow">Veelgestelde vragen</span><h2>Goed om te <span class="accent">weten</span></h2></div>
${faqHtml(HOME_FAQ)}
</div></section>

${cta()}`;
  return page({
    path: '/', active: '/',
    title: 'Zandcement dekvloer laten leggen | Dekvloerexpert, landelijk actief',
    description: 'Zandcement dekvloeren voor nieuwbouw, renovatie en utiliteit in heel Nederland. Kaarsrecht en legklaar, met vloerverwarming en extra opties. Vraag een vrijblijvende offerte aan.',
    body, footerPlaces: ctx.footerPlaces,
    ld: [faqLd(HOME_FAQ), { '@type': 'WebSite', name: site.name, url: site.url + '/' }],
  });
}

const HOME_FAQ = [
  ['Wat kost een zandcement dekvloer per m²?', `Voor een standaard zandcement dekvloer van 5 cm rekent u op ongeveer ${p5} per m², inclusief materiaal en aanbrengen (excl. btw). Grotere vloeren zijn per m² goedkoper, dikkere vloeren en extra opties iets duurder. U ontvangt altijd eerst een vaste, vrijblijvende prijs.`],
  ['Hoe lang is de droogtijd van een cementdekvloer?', 'Als vuistregel ongeveer een week per centimeter tot 4 cm, en daarna twee weken per extra centimeter. Met onze droogtijdversneller is de vloer vaak al binnen 10 tot 15 dagen klaar voor de afwerking.'],
  ['Werken jullie in heel Nederland?', 'Ja. We zijn landelijk actief, van Groningen tot Limburg en van Zeeland tot Twente. Op onze werkgebiedpagina vindt u per plaats meer informatie.'],
  ['Kunnen jullie ook vloerverwarming aanleggen?', 'Ja. Als extra service leggen we de vloerverwarming en de dekvloer in één pakket, met één aanspreekpunt en één planning.'],
  ['Wat is het verschil tussen zandcement en anhydriet?', 'Zandcement is robuust, vochtbestendig en in de meeste situaties voordeliger. Anhydriet is vloeibaar, kan dunner en geleidt warmte goed, maar is gevoeliger voor vocht. Wij leggen allebei en adviseren per project.'],
];

// ───────────────────────── Dienstpagina-sjabloon
function servicePage(ctx, s) {
  const crumbs = [['/', 'Home'], ...(s.slug === 'zandcement' ? [] : [['/diensten', 'Diensten']]), [`/${s.slug}`, s.crumb]];
  const body = `
${hero({ crumbs, h1: s.h1, lead: s.lead, img: s.img || '/assets/img/hero.jpg' })}
<section><div class="wrap split">
<div class="reveal prose">
<span class="eyebrow">${s.eyebrow}</span>
<h2>${s.h2}</h2>
${s.intro.map(t => `<p>${t}</p>`).join('')}
${s.link ? `<p style="margin-top:30px"><a class="text-link" href="${s.link[0]}">${s.link[1]} ${icon('arrow')}</a></p>` : ''}
</div>
<div class="photo reveal"><img src="/assets/img/${s.photo || 'dekvloer-2'}.jpg" alt="${esc(s.crumb)} door ${site.name}" loading="lazy" width="1200" height="1400"></div>
</div></section>
${s.features ? `<section class="paper"><div class="wrap"><div class="center sec-head reveal"><span class="eyebrow">Waarom kiezen voor</span><h2>${s.featuresTitle}</h2></div>${featureList(s.features)}</div></section>` : ''}
${(s.sections || []).map((sec, i) => `<section class="${i % 2 ? 'paper' : ''}"><div class="wrap prose reveal" style="max-width:900px">${sec.eyebrow ? `<span class="eyebrow">${sec.eyebrow}</span>` : ''}<h2>${sec.h2}</h2>${sec.html}</div></section>`).join('')}
${s.showOptions ? `<section class="dark"><div class="wrap"><div class="center sec-head reveal"><span class="eyebrow">Maatwerk opties</span><h2>Extra opties <span class="accent">voor uw dekvloer</span></h2><p class="lead">Elk bouwproject stelt andere eisen aan een vloer. Deze opties bestelt u direct bij ons mee.</p></div>${optionCards(OPTIONS)}</div></section>` : ''}
${s.faq ? `<section><div class="wrap"><div class="center sec-head reveal"><span class="eyebrow">Veelgestelde vragen</span><h2>${s.faqTitle || 'Vragen over ' + s.crumb.toLowerCase()}</h2></div>${faqHtml(s.faq)}</div></section>` : ''}
${s.related ? `<section class="paper"><div class="wrap"><div class="sec-head reveal"><span class="eyebrow">Lees ook</span><h2>Meer over dekvloeren</h2></div><div class="cards light-cards">${s.related.map(([h, t, d]) => `<a class="card reveal" href="${h}"><span class="ck">${icon('arrow')}</span><div><h3>${t}</h3><p>${d}</p></div></a>`).join('')}</div></div></section>` : ''}
${cta()}`;
  return page({
    path: `/${s.slug}`, active: s.slug === 'zandcement' ? '/zandcement' : (s.kb ? undefined : 'dienst'),
    title: s.title, description: s.description, body, footerPlaces: ctx.footerPlaces,
    ld: [crumbLd(crumbs), s.faq && faqLd(s.faq), {
      '@type': s.kb ? 'Article' : 'Service', name: s.crumb, ...(s.kb ? { headline: s.title, author: { '@id': site.url + '/#bedrijf' } } : { provider: { '@id': site.url + '/#bedrijf' }, areaServed: { '@type': 'Country', name: 'Nederland' }, serviceType: s.crumb }),
    }].filter(Boolean),
  });
}

const KB_LINKS = [
  ['/cementdekvloer-kosten-per-m2', 'Kosten per m²', 'Wat kost een cementdekvloer en waar hangt de prijs van af?'],
  ['/cementdekvloer-droogtijd', 'Droogtijd', 'Hoe lang moet een cementdekvloer drogen voordat u kunt afwerken?'],
  ['/zandcement-dekvloer-zelf-maken', 'Zelf maken?', 'Mengverhouding, gereedschap en waar het vaak misgaat.'],
  ['/vloeibaar-zandcement', 'Vloeibaar zandcement', 'Bestaat het? En wat is het verschil met een gietvloer?'],
  ['/cement-dekvloer', 'Cementdekvloer', 'Zandcement, cementdekvloer, zand-cementvloer: wat is wat?'],
  ['/opties', 'Opties', 'Versneller, verharder, vezels en meer.'],
];

export const SERVICE_DEFS = [
  {
    slug: 'zandcement', crumb: 'Zandcement dekvloeren', h1: 'Zandcement dekvloeren: <span class="accent">de perfecte basis</span>',
    title: 'Zandcement dekvloer | Prijs, dikte en droogtijd | Dekvloerexpert',
    description: `Alles over de zandcement dekvloer: opbouw, dikte, droogtijd en kosten (vanaf ca. ${euro(site.price.base5cm[0])} per m²). Kaarsrecht gelegd door heel Nederland. Vraag een vrijblijvende offerte aan.`,
    lead: 'Een strakke, duurzame en kaarsrechte vloer begint bij de basis. Wij leggen zandcement dekvloeren voor nieuwbouw, utiliteit en renovatie, door heel Nederland.',
    eyebrow: 'Onze hoofddienst', h2: 'Zandcement dekvloeren <span class="accent">van topkwaliteit</span>',
    intro: [
      'Een zandcement dekvloer, ook wel cementdekvloer of zand-cementvloer genoemd, is een mengsel van zand, cement en water dat we als laag over de constructievloer aanbrengen. Hij maakt de vloer vlak en waterpas, zodat er tegels, pvc, laminaat, parket of een gietvloer op kan.',
      'We maken de mortel met een mixer, pompen hem door een slang naar de juiste ruimte en reien hem af op hoogte. Daarna wordt het oppervlak verdicht en glad afgewerkt. Het resultaat is een sterke, vochtbestendige vloer die tientallen jaren meegaat.',
    ],
    featuresTitle: 'Waarom <span class="accent">zandcement?</span>',
    features: [
      ['flame', 'Ideaal met vloerverwarming', 'Zandcement geleidt warmte goed en is perfect te combineren met vloerverwarming.'],
      ['shield', 'Sterk en duurzaam', 'Hoge druk- en buigtreksterkte, afgestemd op het gebruik van de ruimte.'],
      ['drop', 'Vochtbestendig', 'Geschikt voor badkamers, garages, kelders en bedrijfsruimtes.'],
      ['ruler', 'Kaarsrecht', 'Vlak en waterpas afgewerkt, klaar voor elke eindafwerking.'],
      ['layers', 'Zwevend of hechtend', 'Op isolatie, op vloerverwarming of direct op beton.'],
      ['clock', 'Snel legklaar met versneller', 'Met een droogtijdversneller vaak binnen 10 tot 15 dagen klaar.'],
    ],
    sections: [
      { eyebrow: 'Opbouw', h2: 'Zwevend of hechtend', html: '<p>Een <strong>zwevende dekvloer</strong> ligt los op een laag isolatie of op een scheidingsfolie, met randisolatie langs de wanden. Hij is minimaal 5 cm dik en dempt contactgeluid; dat is de standaard in woningen en appartementen.</p><p>Een <strong>hechtende dekvloer</strong> ligt direct op een schone, stevige betonvloer, vaak met een hechtmiddel zoals Vlevopol. Hij kan dunner, en is handig als er weinig hoogte beschikbaar is.</p><p>Komt er vloerverwarming in, dan houden we minimaal 3 à 4 cm dekking boven de leidingen aan en leggen we krimpnetten mee.</p>' },
      { eyebrow: 'Kosten', h2: 'Wat kost een zandcement dekvloer?', html: `<p>Voor een standaard vloer van 5 cm rekent u op ongeveer <strong>${p5} per m²</strong>, inclusief materiaal en aanbrengen (excl. btw). De prijs hangt verder af van de oppervlakte, de dikte, de bereikbaarheid en de opties die u kiest.</p><p><a class="text-link" href="/cementdekvloer-kosten-per-m2">Bekijk rekenvoorbeelden ${icon('arrow')}</a></p>` },
      { eyebrow: 'Droogtijd', h2: 'Hoe lang moet hij drogen?', html: `<p>Vuistregel: een week per centimeter tot 4 cm, daarna twee weken per extra centimeter. Lopen kan na een à twee dagen. Voor parket, pvc of tegels moet het restvocht eerst laag genoeg zijn. Heeft u haast? Kies dan voor een droogtijdversneller.</p><p><a class="text-link" href="/cementdekvloer-droogtijd">Alles over de droogtijd ${icon('arrow')}</a></p>` },
    ],
    showOptions: true,
    faq: [
      ['Hoe dik moet een zandcement dekvloer zijn?', 'Zwevend op isolatie minimaal 5 cm; met vloerverwarming minimaal 3 à 4 cm boven de leidingen; hechtend op beton kan dunner. We bepalen de dikte bij de inmeting.'],
      ['Welke mengverhouding gebruiken jullie?', 'Meestal ongeveer 1 deel cement op 4 à 5 delen zand, afgestemd op de gewenste sterkteklasse en het gebruik van de ruimte.'],
      ['Kan er direct parket of pvc op?', 'Pas als het restvocht laag genoeg is. Wij kunnen het vochtgehalte meten zodat de vloerenlegger zeker weet dat hij kan beginnen.'],
      ['Leggen jullie ook kleine oppervlaktes?', `Ja, ook een badkamer of uitbouw. Voor kleine vloeren hanteren we een minimumbedrag van ${euro(site.price.minimumOrder)}.`],
    ],
    related: KB_LINKS.slice(0, 3), link: ['/offerte', 'Vraag een vrijblijvende offerte aan'],
  },
  {
    slug: 'anhydrietvloeren', crumb: 'Anhydrietvloeren', h1: 'Anhydrietvloeren: <span class="accent">vloeibaar en vlak</span>',
    title: 'Anhydriet gietvloer laten leggen | Dekvloerexpert',
    description: 'Anhydriet dekvloer laten storten? Vloeibaar, zelfnivellerend en ideaal met vloerverwarming. Lees het verschil met zandcement en vraag een vrijblijvende offerte aan.',
    lead: 'Een vloeibare dekvloer die zichzelf egaliseert, dunner kan dan zandcement en vloerverwarming optimaal omsluit.',
    eyebrow: 'Dienst', h2: 'Wat is een <span class="accent">anhydrietvloer?</span>',
    intro: [
      'Anhydriet is een dekvloer op basis van calciumsulfaat. Hij wordt vloeibaar gestort en vloeit zelf uit tot een vlakke laag. Daardoor omsluit hij leidingen van vloerverwarming helemaal, zonder luchtinsluitingen.',
      'Omdat de vloer dunner kan, blijft er meer hoogte over en reageert de vloerverwarming sneller. Anhydriet is wel gevoeliger voor vocht. In badkamers en garages kiezen we daarom meestal voor zandcement.',
    ],
    sections: [{ h2: 'Anhydriet of zandcement?', html: '<ul><li><strong>Anhydriet</strong>: vloeibaar, dunner, snelle warmteafgifte, grote vlakken zonder voegen. Gevoelig voor vocht en moet vaak geschuurd worden voor de afwerking.</li><li><strong>Zandcement</strong>: robuust, vochtbestendig, in de meeste situaties voordeliger en geschikt voor elke ruimte.</li></ul><p>Twijfelt u? Wij leggen allebei en geven eerlijk advies over wat bij uw project past.</p>' }],
    faq: [['Hoe lang droogt een anhydrietvloer?', 'Ook ongeveer een week per centimeter, maar de vloer moet goed geventileerd worden. Met opstoken via vloerverwarming kan het sneller.'], ['Moet een anhydrietvloer geschuurd worden?', 'Meestal wel. Op het oppervlak ontstaat een dun laagje (de sinterhuid) dat voor het lijmen of tegelen weggeschuurd moet worden.']],
    link: ['/zandcement', 'Vergelijk met zandcement'],
  },
  {
    slug: 'vloerverwarming', crumb: 'Vloerverwarming', h1: 'Vloerverwarming <span class="accent">in één pakket</span>',
    title: 'Vloerverwarming en dekvloer in één pakket | Dekvloerexpert',
    description: 'Vloerverwarming laten aanleggen samen met uw zandcement dekvloer: één planning, één aanspreekpunt. Inclusief krimpnetten en opstookprotocol.',
    lead: 'Uw woning verduurzamen en klaarmaken voor de toekomst is een slimme investering. Wij maken het proces zo eenvoudig mogelijk voor u.',
    eyebrow: 'Extra service', h2: 'Vloerverwarming <span class="accent">in één pakket</span>', photo: 'project-4',
    intro: [
      'Uw woning verduurzamen en klaarmaken voor de toekomst is een slimme investering. Wij maken het proces zo eenvoudig mogelijk voor u.',
      'Als extra service regelen wij dit samen met uw dekvloer, zodat u alles in één pakket heeft, met één aanspreekpunt. De leidingen worden op isolatie of op tackerplaten gelegd, afgeperst, en daarna direct afgedekt met de dekvloer.',
    ],
    link: ['/zandcement', 'Combineer met een zandcement dekvloer'],
    sections: [{ h2: 'Hoe het werkt', html: '<p>Eerst komt de isolatie, daarna de leidingen van de vloerverwarming. Die zetten we onder druk om lekkages uit te sluiten. Dan leggen we krimpnetten en storten we de dekvloer met voldoende dekking boven de leidingen. Na het uitharden krijgt u een opstookprotocol mee, zodat de vloer rustig op temperatuur komt.</p>' }],
    faq: [['Wanneer mag de vloerverwarming aan?', 'Bij zandcement meestal na zo\'n 3 weken, en dan volgens een opstookprotocol: rustig opbouwen en weer afbouwen. Zo voorkomt u scheuren.'], ['Is zandcement geschikt voor vloerverwarming?', 'Ja, zandcement geleidt warmte goed. Met krimpnetten en de juiste dekking werkt het uitstekend.']],
  },
  {
    slug: 'egaliseren', crumb: 'Egaliseren', h1: 'Vloer egaliseren: <span class="accent">glad en vlak</span>',
    title: 'Vloer laten egaliseren | Dekvloerexpert',
    description: 'Vloer laten egaliseren voor pvc, laminaat of een gietvloer. Een egalisatielaag maakt een dekvloer of betonvloer glad en vlak. Vraag een prijsopgave aan.',
    lead: 'Een egalisatielaag maakt de ondergrond spiegelglad, de perfecte basis voor pvc, laminaat, linoleum of een gietvloer.',
    eyebrow: 'Dienst', h2: 'Wanneer <span class="accent">egaliseren?</span>',
    intro: ['Pvc en andere dunne vloeren tonen elke oneffenheid van de ondergrond. Een egalisatielaag van een paar millimeter vult kleine putjes en naden op en maakt de vloer glad.', 'We egaliseren nieuwe zandcement dekvloeren, oude betonvloeren en tegelvloeren. Waar nodig schuren en primeren we eerst, voor een goede hechting.'],
    faq: [['Hoe dik is een egalisatielaag?', 'Meestal 2 tot 10 millimeter. Voor grotere hoogteverschillen is een dekvloer de betere oplossing.'], ['Hoe snel kan ik verder na het egaliseren?', 'Lopen kan vaak na een paar uur. Voor de afwerking hangt het af van de dikte en het product; reken op een à een paar dagen.']],
  },
  {
    slug: 'beton-en-fundering', crumb: 'Beton & Fundering', h1: 'Beton &amp; fundering: <span class="accent">een sterke basis</span>',
    title: 'Beton en fundering storten | Dekvloerexpert',
    description: 'Betonvloeren en funderingen storten voor aanbouw, garage of bedrijfspand. Inclusief wapening en bekisting. Vraag een vrijblijvende offerte aan.',
    lead: 'Funderingen, betonvloeren en ondervloeren voor aanbouwen, garages en bedrijfspanden. Met wapening, bekisting en een strakke afwerking.',
    eyebrow: 'Dienst', h2: 'Van fundering <span class="accent">tot afgewerkte vloer</span>',
    intro: ['Een goede vloer begint bij een goede ondergrond. Voor aanbouwen, garages en bedrijfsruimtes storten we funderingsstroken, poeren en betonvloeren volgens de constructieberekening.', 'Omdat we ook de dekvloer leggen, sluiten de stappen naadloos op elkaar aan, met één planning en één aanspreekpunt.'],
  },
  {
    slug: 'schuimbeton', crumb: 'Schuimbeton', h1: 'Schuimbeton: <span class="accent">licht en isolerend</span>',
    title: 'Schuimbeton storten | Dekvloerexpert',
    description: 'Schuimbeton als lichte, isolerende ondervloer: ideaal om leidingen weg te werken en hoogte op te vullen. Snel aangebracht en direct vlak.',
    lead: 'Een lichte, vloeibare vulling die leidingen wegwerkt, hoogte opvult en tegelijk isoleert.',
    eyebrow: 'Dienst', h2: 'Waarom <span class="accent">schuimbeton?</span>',
    intro: ['Schuimbeton is beton met veel kleine luchtbellen. Daardoor is het licht en isolerend. Het is ideaal om leidingen weg te werken of een grote hoogte op te vullen, zonder de constructie zwaar te belasten.', 'Op de schuimbetonlaag leggen we daarna de zandcement dekvloer. Zo ontstaat een complete vloeropbouw in één traject.'],
  },
  {
    slug: 'heipalen', crumb: 'Heipalen', h1: 'Heipalen: <span class="accent">stevig gefundeerd</span>',
    title: 'Heipalen voor aanbouw en nieuwbouw | Dekvloerexpert',
    description: 'Heipalen of schroefpalen voor uw aanbouw of nieuwbouw, in samenwerking met gespecialiseerde partners. Eén aanspreekpunt van fundering tot dekvloer.',
    lead: 'Op slappe grond is een paalfundering onmisbaar. Wij regelen het heiwerk samen met gespecialiseerde partners, met één aanspreekpunt.',
    eyebrow: 'Dienst', h2: 'Fundering <span class="accent">op palen</span>',
    intro: ['In grote delen van Nederland is de bovengrond te slap om direct op te bouwen. Dan zijn heipalen of trillingsvrije schroefpalen nodig om de belasting naar de draagkrachtige zandlaag te brengen.', 'Wij coördineren het heiwerk, de fundering en de vloer, zodat u maar één partij aan de lijn hoeft te hebben.'],
  },
  // Kennisbank (zoekwoorden uit de klantlijst)
  {
    kb: true, slug: 'cementdekvloer-kosten-per-m2', crumb: 'Cementdekvloer kosten per m²', h1: 'Cementdekvloer <span class="accent">kosten per m²</span>',
    title: 'Cementdekvloer kosten per m² (2026) | Rekenvoorbeelden',
    description: `Wat kost een cementdekvloer per m²? Gemiddeld ${p5} voor 5 cm, inclusief materiaal en aanbrengen. Rekenvoorbeelden voor uitbouw, woning en bedrijfshal.`,
    lead: 'Wat kost een zandcement dekvloer, en waar hangt de prijs van af? Met rekenvoorbeelden voor de meest voorkomende situaties.',
    eyebrow: 'Kennisbank', h2: 'Gemiddeld <span class="accent">' + p5 + ' per m²</span>',
    intro: [`Voor een standaard zandcement dekvloer van 5 cm rekent u op ongeveer ${p5} per m², inclusief materiaal en aanbrengen, exclusief btw. Elke extra centimeter kost ongeveer ${euro(site.price.perExtraCm[0])} à ${euro(site.price.perExtraCm[1])} per m² extra.`, 'Hoe groter de vloer, hoe lager de prijs per m²: de opbouw van mixer en pomp kost bij een kleine vloer naar verhouding meer tijd.'],
    sections: [
      { h2: 'Rekenvoorbeelden', html: priceTable([['Badkamer', 8, 5], ['Uitbouw', 20, 6], ['Begane grond woning', 55, 6], ['Hele woning, 2 lagen', 110, 6], ['Kantoor', 250, 6], ['Bedrijfshal', 800, 8]]) },
      { h2: 'Wat bepaalt de prijs?', html: '<ul><li><strong>Oppervlakte</strong>: grotere vloeren zijn goedkoper per m².</li><li><strong>Dikte</strong>: meer centimeters betekent meer materiaal en een langere droogtijd.</li><li><strong>Bereikbaarheid</strong>: hoe ver en hoe hoog we moeten pompen.</li><li><strong>Opties</strong>: versneller, vezels, krimpnetten, randisolatie en verharder.</li><li><strong>Ondergrond</strong>: moet er eerst geprimed, geïsoleerd of opgevuld worden?</li></ul>' },
    ],
    related: KB_LINKS.filter(l => l[0] !== '/cementdekvloer-kosten-per-m2').slice(0, 3),
  },
  {
    kb: true, slug: 'cementdekvloer-droogtijd', crumb: 'Droogtijd cementdekvloer', h1: 'Droogtijd <span class="accent">cementdekvloer</span>',
    title: 'Droogtijd cementdekvloer: hoe lang moet hij drogen? | Dekvloerexpert',
    description: 'De droogtijd van een cementdekvloer: een week per cm tot 4 cm, daarna twee weken per cm. Met een droogtijdversneller in 10 tot 15 dagen legklaar.',
    lead: 'Hoe lang moet een cementdekvloer drogen voordat u kunt tegelen, pvc kunt leggen of parket kunt plaatsen?',
    eyebrow: 'Kennisbank', h2: 'De <span class="accent">vuistregel</span>',
    intro: ['Een zandcement dekvloer droogt ongeveer één week per centimeter, tot een dikte van 4 cm. Daarboven gaat het drogen langzamer: reken op twee weken voor elke extra centimeter.', 'Een veelvoorkomende vloer van 6 cm heeft dus zo\'n acht weken nodig voordat hij droog genoeg is voor een vochtgevoelige afwerking.'],
    sections: [
      { h2: 'Droogtijd per dikte', html: dryTable() },
      { h2: 'Sneller drogen', html: '<ul><li><strong>Droogtijdversneller of Duremit</strong>: vaak binnen 10 tot 15 dagen legklaar.</li><li><strong>Ventileren</strong>: laat vocht weg, maar voorkom tocht en directe zon in de eerste dagen.</li><li><strong>Vloerverwarming</strong>: pas na zo\'n 3 weken en altijd volgens opstookprotocol.</li></ul><p>Meet voor de afwerking altijd het restvocht. Voor parket en pvc gelden strengere eisen dan voor tegels.</p>' },
    ],
    faq: [['Wanneer kan ik over de dekvloer lopen?', 'Voorzichtig lopen kan na een à twee dagen. Zwaar belasten en materiaal opslaan pas na ongeveer een week.'], ['Wat is droogtijd cementdekvloer bij 5 cm?', 'Ongeveer zes weken zonder versneller: vier weken voor de eerste 4 cm, plus twee weken voor de vijfde centimeter.']],
    related: KB_LINKS.filter(l => l[0] !== '/cementdekvloer-droogtijd').slice(0, 3),
  },
  {
    kb: true, slug: 'zandcement-dekvloer-zelf-maken', crumb: 'Zandcement dekvloer zelf maken', h1: 'Zandcement dekvloer <span class="accent">zelf maken?</span>',
    title: 'Zandcement dekvloer zelf maken: mengverhouding en tips | Dekvloerexpert',
    description: 'Zelf een zandcement dekvloer maken? Mengverhouding 1:4 à 1:5, benodigdheden, stappenplan en de valkuilen. Plus: wanneer uitbesteden goedkoper is.',
    lead: 'Een kleine vloer zelf leggen kan. Hier leest u hoe, en waar het in de praktijk vaak misgaat.',
    eyebrow: 'Kennisbank', h2: 'Zo pakt u het <span class="accent">aan</span>',
    intro: ['Voor een zandcement dekvloer heeft u scherp zand, cement (meestal CEM III of CEM I) en water nodig, in een mengverhouding van ongeveer 1 deel cement op 4 à 5 delen zand. De specie moet "aardvochtig" zijn: als u er een bal van knijpt, blijft hij heel zonder dat er water uitloopt.', 'Het lastigste is niet het mengen, maar het vlak krijgen. U werkt met afreilatten op hoogte, verdicht de specie goed en strijkt het oppervlak glad, en dat allemaal voordat de specie begint uit te harden.'],
    sections: [
      { h2: 'Stappenplan', html: '<ol><li>Ondergrond schoonmaken; bij een hechtende vloer primen.</li><li>Randisolatie langs de wanden aanbrengen.</li><li>Hoogtepunten uitzetten met een laser of waterpas.</li><li>Specie mengen in de juiste verhouding.</li><li>In vakken storten, verdichten en afreien over de latten.</li><li>Oppervlak glad schuren en de eerste dagen beschermen tegen uitdrogen.</li></ol>' },
      { h2: 'Waar het vaak misgaat', html: '<ul><li>Te natte specie: een zachte toplaag en meer krimp.</li><li>Slecht verdicht: holle plekken en een vloer die later afbrokkelt.</li><li>Naden tussen dagdelen: zichtbare overgangen en scheuren.</li><li>Te snel uitgedroogd: krimpscheuren.</li></ul><p>Voor alles groter dan een paar vierkante meter is uitbesteden vaak niet veel duurder. Wij leggen een woonkamer in een paar uur, met materiaal en een vlakheid waar de vloerenlegger blij mee is.</p>' },
    ],
    related: KB_LINKS.filter(l => l[0] !== '/zandcement-dekvloer-zelf-maken').slice(0, 3),
  },
  {
    kb: true, slug: 'vloeibaar-zandcement', crumb: 'Vloeibaar zandcement', h1: 'Vloeibaar <span class="accent">zandcement?</span>',
    title: 'Vloeibaar zandcement: bestaat het? | Gietdekvloer vs zandcement',
    description: 'Vloeibaar zandcement bestaat als cementgebonden gietdekvloer. Wat is het verschil met traditioneel zandcement en anhydriet, en wanneer kiest u wat?',
    lead: 'Traditioneel zandcement is aardvochtig, maar er bestaan ook vloeibare, cementgebonden gietdekvloeren. Wat is het verschil?',
    eyebrow: 'Kennisbank', h2: 'Aardvochtig of <span class="accent">vloeibaar</span>',
    intro: ['Een klassieke zandcement dekvloer is aardvochtig: hij wordt gepompt, uitgespreid en met de hand afgereid. Een vloeibare cementgebonden dekvloer (ook wel cementgebonden gietvloer genoemd) vloeit zelf uit, net als anhydriet, maar is op basis van cement en dus beter bestand tegen vocht.', 'Vloeibare varianten zijn sneller aan te brengen op grote vlakken en omsluiten vloerverwarming volledig. Ze zijn wel duurder per m². Voor de meeste woningen is traditioneel zandcement nog altijd de voordeligste en meest robuuste keuze.'],
    related: [['/anhydrietvloeren', 'Anhydrietvloeren', 'De bekendste vloeibare dekvloer.'], ['/zandcement', 'Zandcement', 'De klassieke, robuuste dekvloer.'], ['/cementdekvloer-droogtijd', 'Droogtijd', 'Hoe lang drogen de verschillende vloeren?']],
  },
  {
    kb: true, slug: 'cement-dekvloer', crumb: 'Cementdekvloer', h1: 'Cementdekvloer: <span class="accent">wat is het precies?</span>',
    title: 'Cementdekvloer, zandcement of zand-cementvloer: wat is wat?',
    description: 'Cementdekvloer, zandcement dekvloer, cement dekvloer of zand cement vloer: allemaal hetzelfde. Lees wat het is, waar het voor dient en wat het kost.',
    lead: 'Cementdekvloer, zandcement dekvloer, zand-cementvloer of cement dekvloer: verschillende woorden voor dezelfde vloer.',
    eyebrow: 'Kennisbank', h2: 'Eén vloer, <span class="accent">veel namen</span>',
    intro: ['Een cementdekvloer is een laag zand en cement die over de constructievloer wordt aangebracht. Hij maakt de ondergrond vlak en op de juiste hoogte, zodat de eindafwerking er strak op ligt. In de bouw heet hij ook wel zandcement dekvloer, zand-cementvloer of afwerkvloer.', 'De vloer is sterk, vochtbestendig en past goed bij vloerverwarming. Daardoor is hij in Nederland veruit de meest gebruikte dekvloer in woningen en bedrijfspanden.'],
    related: KB_LINKS.filter(l => l[0] !== '/cement-dekvloer').slice(0, 3),
  },
];

function priceTable(rows) {
  return `<div class="table-scroll"><table class="ptable"><thead><tr><th>Situatie</th><th>Oppervlakte</th><th>Dikte</th><th>Indicatie (excl. btw)</th></tr></thead><tbody>${rows.map(([t, m2, cm]) => { return `<tr><td>${t}</td><td>${m2} m²</td><td>${cm} cm</td><td>${rangeText(priceRange(m2, cm))}</td></tr>`; }).join('')}</tbody></table></div><p class="note">Indicatie inclusief materiaal en aanbrengen, exclusief btw en opties. Minimumbedrag ${euro(site.price.minimumOrder)}. U ontvangt altijd een vaste prijs na inmeting.</p>`;
}
function dryTable() {
  const rows = [3, 4, 5, 6, 7, 8].map(cm => [cm, cm <= 4 ? cm : 4 + (cm - 4) * 2]);
  return `<div class="table-scroll"><table class="ptable"><thead><tr><th>Dikte</th><th>Zonder versneller</th><th>Met versneller</th></tr></thead><tbody>${rows.map(([cm, w]) => `<tr><td>${cm} cm</td><td>± ${w} weken</td><td>± 10–15 dagen</td></tr>`).join('')}</tbody></table></div><p class="note">Richtwaarden bij normale omstandigheden (circa 20 °C, goede ventilatie). Koude en vochtige lucht vertragen het drogen.</p>`;
}

export const services = ctx => SERVICE_DEFS.map(s => [s.slug, servicePage(ctx, s)]);

// ───────────────────────── Diensten-overzicht
export function dienstenOverview(ctx) {
  const crumbs = [['/', 'Home'], ['/diensten', 'Diensten']];
  const desc = Object.fromEntries(SERVICE_DEFS.map(s => [s.slug, s.lead]));
  const body = `${hero({ crumbs, h1: 'Alle <span class="accent">diensten</span>', lead: 'Van fundering tot legklare vloer: alles onder één dak, met één aanspreekpunt.' })}
<section class="paper"><div class="wrap"><div class="cards light-cards">${SERVICES.map(s => `<a class="card reveal" href="/${s.slug}"><span class="ck">${icon(s.icon)}</span><div><h3>${s.nav}</h3><p>${esc(desc[s.slug])}</p></div></a>`).join('')}</div></div></section>
<section><div class="wrap"><div class="sec-head reveal"><span class="eyebrow">Kennisbank</span><h2>Veelgezocht</h2></div><div class="cards light-cards">${KB_LINKS.map(([h, t, d]) => `<a class="card reveal" href="${h}"><span class="ck">${icon('info')}</span><div><h3>${t}</h3><p>${d}</p></div></a>`).join('')}</div></div></section>
${cta()}`;
  return page({ path: '/diensten', active: 'dienst', title: 'Diensten: dekvloeren, vloerverwarming en meer | Dekvloerexpert', description: 'Zandcement- en anhydrietvloeren, vloerverwarming, egaliseren, beton en fundering, schuimbeton en heipalen. Alles onder één dak.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

export function kennisbank(ctx) {
  const crumbs = [['/', 'Home'], ['/kennisbank', 'Kennisbank']];
  const body = `${hero({ crumbs, h1: 'Kennis<span class="accent">bank</span>', lead: 'Antwoorden op de vragen die we het vaakst krijgen: over kosten, droogtijd, dikte en zelf doen.' })}
<section class="paper"><div class="wrap"><div class="cards light-cards">${KB_LINKS.map(([h, t, d]) => `<a class="card reveal" href="${h}"><span class="ck">${icon('info')}</span><div><h3>${t}</h3><p>${d}</p></div></a>`).join('')}</div></div></section>${cta()}`;
  return page({ path: '/kennisbank', title: 'Kennisbank dekvloeren: kosten, droogtijd en tips | Dekvloerexpert', description: 'Alles over de zandcement dekvloer: kosten per m², droogtijd, zelf maken, vloeibaar zandcement en meer.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

// ───────────────────────── Opties
export function opties(ctx) {
  const crumbs = [['/', 'Home'], ['/opties', 'Opties']];
  const body = `${hero({ crumbs, h1: 'Extra opties <span class="accent">voor uw dekvloer</span>', lead: 'Elk bouwproject stelt andere eisen aan een vloer. Deze opties bestelt u direct bij ons mee.', img: '/assets/img/project-3.jpg' })}
<section class="dark"><div class="wrap">
<div class="sec-head reveal" style="max-width:900px"><span class="eyebrow">Maatwerk opties</span><h2>Maatwerk en extra opties voor uw dekvloer</h2>
<p class="lead">Elk bouwproject stelt andere eisen aan een vloer. Om te zorgen dat de dekvloer perfect aansluit bij de gewenste droogtijd, vloerdikte en belasting, bieden wij verschillende hoogwaardige opties en toevoegingen aan die u direct bij ons kunt meebestellen.</p></div>
<div class="opt-cards">${OPTIONS.map(o => `<article class="opt reveal" id="${o.key}"><span class="f-ic">${icon(o.icon)}</span><h3>${o.title}</h3>${o.tag ? `<span class="tag">${o.tag}</span>` : ''}<p>${o.long}</p></article>`).join('')}
<article class="opt reveal"><span class="f-ic">${icon('info')}</span><h3>Twijfelt u?</h3><p>Kies in het offerteformulier "Graag advies". Dan adviseren wij vooraf welke opties bij uw project zinvol zijn, en welke niet.</p><p><a class="text-link" href="/offerte">Offerte aanvragen ${icon('arrow')}</a></p></article>
</div></div></section>
<section><div class="wrap"><div class="center sec-head reveal"><span class="eyebrow">Advies</span><h2>Welke optie <span class="accent">wanneer?</span></h2></div>
<div class="table-scroll reveal"><table class="ptable"><thead><tr><th>Situatie</th><th>Wij adviseren</th></tr></thead><tbody>
<tr><td>Vloerverwarming</td><td>Krimpnetten, randisolatie</td></tr>
<tr><td>Snel opleveren</td><td>Droogtijdversneller of Duremit</td></tr>
<tr><td>Garage, werkplaats, bedrijfshal</td><td>Verharder, krimpvezels</td></tr>
<tr><td>Dekvloer direct op oude betonvloer</td><td>Vlevopol (hechting)</td></tr>
<tr><td>Appartement of zwevende vloer</td><td>Randisolatie</td></tr>
<tr><td>Dikke laag of ongelijke ondergrond</td><td>Krimpvezels</td></tr>
</tbody></table></div></div></section>
${cta()}`;
  return page({ path: '/opties', active: '/opties', title: 'Opties voor uw dekvloer: versneller, verharder, vezels | Dekvloerexpert', description: 'Droogtijdversneller, verharder, krimpvezels, Duremit, krimpnetten, randisolatie en Vlevopol. Lees welke optie bij uw dekvloer past.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

// ───────────────────────── Projecten
export function projecten(ctx) {
  const crumbs = [['/', 'Home'], ['/projecten', 'Projecten']];
  const imgs = ['project-1', 'dekvloer-2', 'project-2', 'project-3', 'project-4', 'project-5', 'dekvloer-1', 'project-6', 'project-7', 'project-8'];
  const body = `${hero({ crumbs, h1: 'Van zandaanvoer <span class="accent">tot legklare vloer</span>', lead: 'Nieuwbouw, utiliteit en renovatie: een greep uit ons werk door heel Nederland.', img: '/assets/img/project-5.jpg' })}
<!-- Voorbeeldprojecten: vervang titels, plaatsen en foto's door echte projecten (src/blocks.mjs). -->
<section><div class="wrap"><div class="proj-grid">${PROJECTS.map(projectCard).join('')}</div></div></section>
<section class="paper"><div class="wrap"><div class="sec-head reveal"><span class="eyebrow">Ons werk</span><h2>Meer foto's van ons werk</h2></div>
<div class="masonry">${imgs.map((s, i) => `<img src="/assets/img/${s}.jpg" alt="Zandcement dekvloer, projectfoto ${i + 1}" loading="lazy">`).join('')}</div></div></section>
${cta()}`;
  return page({ path: '/projecten', active: '/projecten', title: 'Projecten: zandcement dekvloeren in heel Nederland | Dekvloerexpert', description: 'Bekijk onze projecten: kantoren, woningen, bedrijfshallen en renovaties. Zandcement dekvloeren, vloerverwarming en meer.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

// ───────────────────────── Werkwijze
export function werkwijze(ctx) {
  const crumbs = [['/', 'Home'], ['/werkwijze', 'Werkwijze']];
  const detail = [
    ['Advies vooraf', 'U stuurt ons de gegevens van uw project: oppervlakte, gewenste dikte en de ondergrond. Waar nodig komen we langs om in te meten. We adviseren welke opties zinvol zijn, zoals vezels, een versneller of krimpnetten.'],
    ['Heldere prijsopgave', 'U ontvangt een vaste, vrijblijvende prijs, met daarin precies wat er gebeurt. Geen stelposten en geen verrassingen achteraf.'],
    ['Uitvoering volgens planning', 'Op de afgesproken dag komen we met mixer, pomp en een vast team. We zetten de hoogtepunten uit, brengen randisolatie aan, pompen de mortel naar binnen en reien hem kaarsrecht af.'],
    ['Kaarsrecht en legklaar', 'We werken de vloer glad af en laten de werkplek netjes achter. U krijgt droog- en eventueel opstookadvies mee, zodat de vloerenlegger op het juiste moment kan beginnen.'],
  ];
  const body = `${hero({ crumbs, h1: 'Van eerste contact <span class="accent">tot legklare vloer</span>', lead: 'Heldere communicatie en transparante, eerlijke prijzen. Zo werken wij.' })}
<section><div class="wrap">${stepsHtml(detail)}</div></section>
<section class="paper"><div class="wrap split"><div class="reveal prose"><span class="eyebrow">Voorbereiding</span><h2>Wat wij van u <span class="accent">nodig hebben</span></h2>
<ul><li>Een lege, bezemschone ruimte</li><li>Water en stroom in de buurt</li><li>Leidingen en eventuele vloerverwarming al gelegd</li><li>Een plek voor de mixer, zo dicht mogelijk bij de woning</li></ul>
<p>Al het andere nemen wij mee: materiaal, randisolatie, folie en gereedschap.</p></div>
<div class="photo wide reveal"><img src="/assets/img/project-2.jpg" alt="Voorbereiding van een dekvloer met vloerverwarming" loading="lazy"></div></div></section>
${cta()}`;
  return page({ path: '/werkwijze', active: '/werkwijze', title: 'Werkwijze: van advies tot legklare vloer | Dekvloerexpert', description: 'Zo werken wij: advies vooraf, een heldere prijsopgave, uitvoering volgens planning en een kaarsrechte, legklare vloer.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

// ───────────────────────── Over ons
export function overOns(ctx) {
  const crumbs = [['/', 'Home'], ['/over-ons', 'Over ons']];
  const body = `${hero({ crumbs, h1: 'Over <span class="accent">Dekvloerexpert</span>', lead: 'Specialist in zandcement dekvloeren, voor aannemers en particulieren door heel Nederland.' })}
<section><div class="wrap split"><div class="reveal prose"><span class="eyebrow">Wie wij zijn</span><h2>Strakke vloeren, <span class="accent">sterke basis</span></h2>
<p>Dekvloerexpert legt zandcement dekvloeren voor nieuwbouw, renovatie en utiliteit. We werken met eigen mixers, pompen en een vast team, zodat we de kwaliteit en de planning in eigen hand houden.</p>
<p>Voor aannemers zijn we een betrouwbare schakel in de bouwplanning. Voor particulieren nemen we de zorg voor de vloer volledig uit handen: van advies over dikte en opties tot een vloer die kaarsrecht en legklaar wordt opgeleverd.</p></div>
<div class="photo reveal"><img src="/assets/img/dekvloer-2.jpg" alt="Team van Dekvloerexpert aan het werk" loading="lazy"></div></div></section>
${reviewsSection()}${cta()}`;
  return page({ path: '/over-ons', title: 'Over ons | Dekvloerexpert', description: 'Dekvloerexpert: specialist in zandcement dekvloeren voor aannemers en particulieren, landelijk actief met eigen materieel.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

// ───────────────────────── Offerte
export function offerte(ctx) {
  const crumbs = [['/', 'Home'], ['/offerte', 'Offerte aanvragen']];
  const chips = (name, items, { req = true, multi = false, outline = true } = {}) =>
    `<div class="chipset${outline ? ' outline' : ''}" role="${multi ? 'group' : 'radiogroup'}">${items.map(v => `<label><input type="${multi ? 'checkbox' : 'radio'}" name="${name}" value="${esc(v)}"${req && !multi ? ' required' : ''}>${esc(v)}</label>`).join('')}</div>`;
  const grp = (label, inner, req = true, name = '') => `<div class="fgroup" data-group="${name}"><span class="flabel">${label}${req ? ' <span class="req">*</span>' : ''}</span>${inner}<p class="err">Maak een keuze.</p></div>`;
  const body = `<section class="hero sub" style="padding-bottom:80px;background:radial-gradient(60% 120% at 20% 100%,rgba(20,168,138,.25),transparent 60%),#0b0e0d;min-height:0"><div class="wrap"><div class="hero-inner">
<ol class="crumbs"><li><a href="/">Home</a></li><li aria-current="page">Offerte aanvragen</li></ol>
<h1>Offerte <span class="accent">aanvragen</span></h1>
<p class="lead">Vraag een scherpe, vrijblijvende prijsopgave aan. Vul in wat u weet; wat nog niet bekend is, bespreken we samen.</p></div></div></section>
<section class="paper" style="padding-top:70px"><div class="wrap offer-layout">
<form class="form-card" id="offerForm" novalidate data-endpoint="${esc(site.formEndpoint)}" data-wa="${site.whatsapp}">
<div class="svc-box"><div class="svc-head"><span class="ic">${icon('layers')}</span><div><small>Geselecteerde dienst</small><b id="svcName">Zandcement dekvloeren</b></div></div>
<div class="chipset" role="radiogroup" aria-label="Dienst">${SERVICES.map((s, i) => `<label><input type="radio" name="dienst" value="${s.nav}"${i === 0 ? ' checked' : ''}>${s.nav}</label>`).join('')}</div></div>
<div class="fstep"><span>01</span><h3>Uw project</h3></div>
${grp('Ruimte', chips('ruimte', ['Hele verdieping', 'Badkamer', 'Bedrijfshal of kantoor', 'Anders']), true, 'ruimte')}
${grp('Verdieping', chips('verdieping', ['Kelder', 'Begane grond', '1e verdieping', '2e verdieping', '3e verdieping', 'Zelf invullen']), true, 'verdieping')}
<div class="fgroup"><label for="m2">Oppervlakte in m² <span class="req">*</span></label><div class="unit" data-unit="m²"><input id="m2" name="oppervlakte" type="number" min="1" inputmode="numeric" placeholder="Bijvoorbeeld 85" required></div><p class="err">Vul de oppervlakte in.</p></div>
${grp('Gewenste laagdikte', chips('laagdikte', ['5 cm', '6 cm', '7 cm', '8 cm', 'Anders', 'Weet ik nog niet']), true, 'laagdikte')}
${grp('Vloerverwarming', chips('vloerverwarming', ['Ja, ligt er al', 'Ja, moet nog worden aangelegd', 'Nee', 'Weet ik nog niet']), true, 'vloerverwarming')}
${grp('Type project', chips('type', ['Nieuwbouw', 'Renovatie', 'Utiliteitsbouw', 'Aanbouw of uitbouw']), true, 'type')}
<div class="fgroup"><label for="periode">Gewenste uitvoerperiode</label><input id="periode" name="periode" placeholder="Bijvoorbeeld oktober 2026"></div>
<hr class="fsep">
<div class="fstep"><span>02</span><h3>Extra opties</h3></div>
<p style="color:var(--muted)">Twijfelt u? Kies "Graag advies", dan adviseren wij vooraf welke opties zinvol zijn.</p>
${chips('opties', ['Droogtijdversneller', 'Verharder', 'Krimpvezels', 'Duremit', 'Krimpnetten', 'Vlevopol', 'Randisolatie', 'Graag advies'], { multi: true })}
<hr class="fsep">
<div class="fstep"><span>03</span><h3>Uw gegevens</h3></div>
<div class="form-grid">
<div class="fgroup"><label for="naam">Naam <span class="req">*</span></label><input id="naam" name="naam" autocomplete="name" required><p class="err">Vul uw naam in.</p></div>
<div class="fgroup"><label for="tel">Telefoon <span class="req">*</span></label><input id="tel" name="telefoon" type="tel" autocomplete="tel" required><p class="err">Vul een telefoonnummer in.</p></div>
<div class="fgroup"><label for="email">E-mail</label><input id="email" name="email" type="email" autocomplete="email"></div>
<div class="fgroup"><label for="plaats">Plaats of postcode <span class="req">*</span></label><input id="plaats" name="plaats" autocomplete="address-level2" required list="plaatsen"><p class="err">Vul de plaats in.</p></div>
<div class="fgroup full"><label for="toelichting">Toelichting</label><textarea id="toelichting" name="toelichting" placeholder="Bijvoorbeeld: ondergrond, bereikbaarheid, gewenste afwerking"></textarea></div>
</div>
<datalist id="plaatsen">${ctx.places.filter(p => p.kind !== 'deel').map(p => `<option value="${esc(p.name)}">`).join('')}</datalist>
<button class="btn btn-teal" type="submit" style="margin-top:10px">Offerte aanvragen ${icon('arrow')}</button>
<p class="form-note">${site.formEndpoint ? 'Na verzenden nemen we binnen één werkdag contact met u op.' : 'Na verzenden opent WhatsApp met uw aanvraag als bericht. U hoeft alleen nog op verzenden te tikken.'}</p>
<div class="sent" role="status" id="sentMsg"><b>Bedankt voor uw aanvraag!</b><br>We nemen zo snel mogelijk contact met u op.</div>
</form>
<aside class="offer-side">
<div class="dc"><h3>Direct contact</h3>
<a href="${tel}"><span class="ic">${icon('phone')}</span><span><small>Telefoon</small><b>${site.phoneDisplay}</b></span></a>
<a href="${wa()}" target="_blank" rel="noopener"><span class="ic">${waIcon}</span><span><small>WhatsApp</small><b>Stuur een bericht</b></span></a>
<a href="/werkgebied"><span class="ic">${icon('pin')}</span><span><small>Werkgebied</small><b>Heel Nederland</b></span></a></div>
<div class="why"><h3>Waarom Dekvloerexpert?</h3><ul>${['Vrijblijvende prijsopgave', 'Duidelijk advies vooraf', 'Transparante, eerlijke prijzen', 'Alles onder één dak', 'Landelijk actief', 'Jarenlange ervaring'].map(t => `<li><span class="tick">${icon('check')}</span>${t}</li>`).join('')}</ul></div>
</aside>
</div></section>`;
  return page({ path: '/offerte', title: 'Offerte aanvragen | Dekvloerexpert', description: 'Vraag een scherpe, vrijblijvende prijsopgave aan voor uw zandcement dekvloer, vloerverwarming of andere vloerklus. Snel antwoord.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

// ───────────────────────── Contact
export function contact(ctx) {
  const crumbs = [['/', 'Home'], ['/contact', 'Contact']];
  const body = `${hero({ crumbs, h1: 'Neem <span class="accent">contact</span> op', lead: 'Bel, app of mail ons. Of vraag direct een vrijblijvende offerte aan.', buttons: `<div class="btn-row"><a class="btn btn-teal" href="/offerte">Offerte aanvragen ${icon('arrow')}</a><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${waIcon} WhatsApp</a></div>` })}
<section class="paper"><div class="wrap split"><div class="reveal">
<span class="eyebrow">Direct contact</span><h2>Wij denken graag <span class="accent">met u mee</span></h2>
<ul class="contact-list">
<li><span class="f-ic">${icon('phone')}</span><span><a href="${tel}">${site.phoneDisplay}</a><small>Bellen of sms'en</small></span></li>
<li><span class="f-ic">${waIcon}</span><span><a href="${wa()}" target="_blank" rel="noopener">WhatsApp</a><small>Stuur foto's of een plattegrond mee</small></span></li>
<li><span class="f-ic">${icon('mail')}</span><span><a href="mailto:${site.email}">${site.email}</a><small>Voor tekeningen en bestekken</small></span></li>
<li><span class="f-ic">${icon('pin')}</span><span><a href="/werkgebied">Heel Nederland</a><small>Bekijk ons werkgebied</small></span></li>
</ul></div>
<div class="dc reveal"><h3>Snel een prijs?</h3><p style="color:var(--muted-d)">Stuur via WhatsApp de oppervlakte, de gewenste dikte, uw postcode en een foto van de ruimte. Dan krijgt u meestal dezelfde dag een eerste indicatie.</p><a class="btn btn-wa" href="${wa('Hallo, ik wil graag een prijsindicatie voor een dekvloer. Oppervlakte: … m², dikte: … cm, postcode: …')}" target="_blank" rel="noopener">${waIcon} Start WhatsApp</a></div>
</div></section>${cta()}`;
  return page({ path: '/contact', active: '/contact', title: 'Contact | Dekvloerexpert', description: `Contact met Dekvloerexpert: bel ${site.phoneDisplay}, stuur een WhatsApp of vraag online een vrijblijvende offerte aan voor uw dekvloer.`, body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

export function privacy(ctx) {
  const crumbs = [['/', 'Home'], ['/privacy', 'Privacy']];
  const body = `${hero({ crumbs, h1: 'Privacy<span class="accent">verklaring</span>', lead: 'Hoe wij omgaan met de gegevens die u ons stuurt.', buttons: '' })}
<section><div class="wrap prose" style="max-width:860px">
<p>${site.name} gebruikt de gegevens die u via het offerteformulier, WhatsApp, e-mail of telefoon doorgeeft alleen om uw aanvraag te behandelen en een offerte uit te brengen. We delen ze niet met derden, behalve als dat nodig is voor de uitvoering van de opdracht (bijvoorbeeld met een leverancier) of wettelijk verplicht is.</p>
<p>We bewaren offerteaanvragen niet langer dan nodig, en facturen zo lang als de wet voorschrijft. U kunt altijd vragen welke gegevens wij van u hebben, en vragen om ze aan te passen of te verwijderen: mail naar <a href="mailto:${site.email}">${site.email}</a>.</p>
<p>Deze website plaatst geen tracking-cookies. De lettertypen worden geladen via Google Fonts.</p>
</div></section>`;
  return page({ path: '/privacy', title: 'Privacyverklaring | Dekvloerexpert', description: 'Privacyverklaring van Dekvloerexpert.', body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

export function notFound(ctx) {
  const body = `${hero({ h1: 'Pagina <span class="accent">niet gevonden</span>', lead: 'Deze pagina bestaat niet (meer). Zoekt u een plaats? Bekijk dan ons werkgebied.', buttons: `<div class="btn-row"><a class="btn btn-teal" href="/werkgebied">Naar werkgebied ${icon('arrow')}</a><a class="btn btn-ghost" href="/">Naar home</a></div>` })}`;
  return page({ path: '/404', title: 'Pagina niet gevonden | Dekvloerexpert', description: 'Deze pagina bestaat niet.', body, noindex: true, footerPlaces: ctx.footerPlaces });
}
