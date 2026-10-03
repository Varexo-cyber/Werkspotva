// Plaatspagina's, gemeente-overzichten, provinciepagina's en het werkgebied.
import { site } from './config.mjs';
import { page, hero, cta, icon, esc, crumbLd, faqLd, faqHtml, abs } from './layout.mjs';
import { stepsHtml, optionByKey } from './blocks.mjs';
import * as C from './content.mjs';

const fill = C.fill;

function crumbsFor(p) {
  const m = p.muniRef, pv = m.provinceRef;
  const c = [['/', 'Home'], ['/werkgebied', 'Werkgebied'], [`/werkgebied/${pv.slug}`, pv.name]];
  if (!p.isMain) c.push([`/${m.slug}`, m.name]);
  c.push([`/${p.slug}`, p.name]);
  return c;
}

// Rekenvoorbeelden met eigen getallen per plaats.
function examples(p) {
  const pool = C.EXAMPLES[C.typeKey(p.cityType)] || C.EXAMPLES.nieuwbouwwijken;
  return C.pickN(pool, 3, p.slug, 'ex').map(([label, min, max, cm], i) => {
    const m2 = min + (C.hash(p.slug + 'm2' + i) % (max - min + 1));
    const [lo, hi] = C.priceRange(m2, cm);
    return { label, m2, cm, lo, hi };
  }).sort((a, b) => a.m2 - b.m2);
}

function faqFor(p, v) {
  const extra = C.pickN(C.FAQ_POOL.map((_, i) => i).filter(i => !C.FAQ_ALWAYS.includes(i)), 3, p.slug, 'faq');
  const idx = [...C.FAQ_ALWAYS, ...extra];
  return idx.map(i => { const [q, as] = C.FAQ_POOL[i]; return [fill(q, v), fill(C.pick(as, p.slug, 'fa' + i), v)]; });
}

function neighbours(p) {
  const m = p.muniRef, pv = m.provinceRef;
  const siblings = m.places.filter(x => x !== p);
  const others = C.pickN(pv.munis.filter(x => x !== m), 10, p.slug, 'nb').map(x => ({ slug: x.slug, name: x.name }));
  return { siblings, others };
}

export function placePage(p, ctx) {
  const v = C.vars(p);
  const m = p.muniRef, pv = m.provinceRef;
  const crumbs = crumbsFor(p);
  const tk = C.typeKey(p.cityType);
  const sub = C.pick(C.H1_SUB, p.slug, 'h1');
  const lead = fill(C.pick(C.LEADS, p.slug, 'lead'), v);
  const typePara = fill(C.pick(C.TYPE_PARAS[tk] || C.TYPE_PARAS.nieuwbouwwijken, p.slug, 'type'), v);
  const provPara = C.pick(C.PROVINCE_PARAS[p.province], p.slug, 'prov');
  const areaKind = p.isMain ? 'stad' : p.kind;
  const areaPara = fill(C.pick(C.AREA_PARAS[areaKind] || C.AREA_PARAS.kern, p.slug, 'area'), v);
  const adviceIntro = fill(C.pick(C.ADVICE_INTRO, p.slug, 'adv'), v);
  const ex = examples(p);
  const priceIntro = fill(C.pick(C.PRICE_INTROS, p.slug, 'pi'), v);
  const opts = C.OPTION_FOCUS[tk].map(k => ({ ...optionByKey(k), why: fill(C.pick(C.OPTION_WHY[k], p.slug, 'ow' + k), v) }));
  const faq = faqFor(p, v);
  const { siblings, others } = neighbours(p);
  const nbTitle = fill(C.pick(C.NEARBY_TITLES, p.slug, 'nbt'), v);
  const typeLabel = p.cityType;

  // Volgorde van de twee tekstblokken wisselt per plaats.
  const paras = C.hash(p.slug + 'order') % 2 ? [typePara, provPara] : [provPara, typePara];
  const siblingSentence = siblings.length
    ? (p.isMain
      ? `Binnen ${esc(m.name)} leggen we onder meer dekvloeren in ${C.listNl(C.pickN(siblings, Math.min(4, siblings.length), p.slug, 'ss').map(s => esc(s.name)))}.`
      : `In de gemeente ${esc(m.name)} werken we ook in ${C.listNl(C.pickN(siblings, Math.min(3, siblings.length), p.slug, 'ss').map(s => esc(s.name)))}.`)
    : '';

  const title = `Zandcement dekvloer ${p.label} | ${C.pick(['Prijs & offerte', 'Vakkundig gelegd', 'Kaarsrecht & legklaar'], p.slug, 'tt')}`;
  const description = `Zandcement dekvloer laten leggen in ${p.inLabel}? ${C.pick([
    `Vanaf ca. ${C.euro(site.price.base5cm[0])} per m², kaarsrecht en legklaar.`,
    'Voor nieuwbouw, renovatie en utiliteit, ook met vloerverwarming.',
    'Scherpe prijs vooraf, ervaren team en eigen materieel.',
  ], p.slug, 'md')} Vraag een vrijblijvende offerte aan.`;

  const body = `
${hero({
    crumbs,
    pill: `Zandcement dekvloeren · ${esc(p.isMain ? pv.name : m.name)}`,
    h1: `Zandcement dekvloer in ${esc(p.name)}<br><span class="accent">${sub}</span>`,
    lead: esc(lead),
    checks: C.pickN(['Gratis prijsopgave', 'Voor particulieren &amp; aannemers', 'Ook met vloerverwarming', 'Eigen mixer en pomp', 'Kaarsrecht afgewerkt', 'Advies over dikte en opties'], 3, p.slug, 'chk'),
    img: `/assets/img/${C.pick(['hero', 'project-1', 'project-3', 'project-5', 'project-6'], p.slug, 'img')}.jpg`,
  })}

<section><div class="wrap split">
<div class="reveal prose">
<span class="eyebrow">Dekvloer in ${esc(p.name)}</span>
<h2>Een vlakke basis voor <span class="accent">${esc(typeLabel.split(',')[0])}</span></h2>
<p>${esc(paras[0])}</p>
<p>${esc(paras[1])}</p>
<p>${esc(areaPara)} ${siblingSentence}</p>
<p><strong>${esc(adviceIntro)}</strong> ${esc(p.advice)}</p>
<p style="margin-top:26px"><a class="text-link" href="/offerte">Offerte aanvragen voor ${esc(p.name)} ${icon('arrow')}</a></p>
</div>
<div class="photo reveal"><img src="/assets/img/${C.pick(['dekvloer-2', 'dekvloer-1', 'project-2', 'project-4', 'project-7', 'project-8'], p.slug, 'ph')}.jpg" alt="Zandcement dekvloer gelegd in ${esc(p.inLabel)}" loading="lazy" width="1200" height="1400"></div>
</div></section>

<section class="paper"><div class="wrap">
<div class="sec-head reveal" style="max-width:820px"><span class="eyebrow">Prijsindicatie</span>
<h2>Wat kost een dekvloer <span class="accent">in ${esc(p.name)}?</span></h2>
<p class="lead">${esc(priceIntro)}</p></div>
<div class="table-scroll reveal"><table class="ptable"><thead><tr><th>Voorbeeld</th><th>Oppervlakte</th><th>Dikte</th><th>Indicatie (excl. btw)</th></tr></thead><tbody>
${ex.map(e => `<tr><td>${esc(e.label)}</td><td>${e.m2} m²</td><td>${e.cm} cm</td><td>${C.rangeText([e.lo, e.hi])}</td></tr>`).join('')}
</tbody></table></div>
<p class="note">Indicatie inclusief materiaal en aanbrengen, exclusief btw en opties. U ontvangt altijd een vaste prijs na inmeting. <a href="/cementdekvloer-kosten-per-m2">Meer over de kosten per m²</a>.</p>
</div></section>

<section class="dark"><div class="wrap">
<div class="sec-head reveal" style="max-width:820px"><span class="eyebrow">Aanbevolen opties</span>
<h2>Veel gekozen <span class="accent">in ${esc(p.name)}</span></h2>
<p class="lead">Bij ${esc(typeLabel)} kiezen opdrachtgevers vaak voor deze opties.</p></div>
<div class="cards">${opts.map(o => `<div class="card reveal"><span class="ck">${icon(o.icon)}</span><div><h3>${o.title}</h3><p>${esc(o.why)}</p></div></div>`).join('')}</div>
<p style="margin-top:30px"><a class="text-link" href="/opties">Alle opties bekijken ${icon('arrow')}</a></p>
</div></section>

<section><div class="wrap">
<div class="center sec-head reveal"><span class="eyebrow">Werkwijze</span><h2>Zo werken we <span class="accent">in ${esc(p.name)}</span></h2></div>
${stepsHtml(C.STEP_VARIANTS.map(([t, vs], i) => [t, fill(C.pick(vs, p.slug, 'st' + i), v)]))}
</div></section>

<section class="paper"><div class="wrap">
<div class="center sec-head reveal"><span class="eyebrow">Veelgestelde vragen</span><h2>Vragen over een dekvloer <span class="accent">in ${esc(p.name)}</span></h2></div>
${faqHtml(faq)}
</div></section>

<section><div class="wrap">
<div class="sec-head reveal"><span class="eyebrow">Werkgebied</span><h2>${esc(nbTitle)}</h2></div>
${siblings.length ? `<h3 style="margin:0 0 14px">${p.isMain ? 'Wijken en kernen in ' + esc(m.name) : 'Gemeente ' + esc(m.name)}</h3>
<ul class="chips" style="margin-bottom:30px">${!p.isMain ? `<li><a href="/${m.slug}"><b>${esc(m.name)}</b></a></li>` : ''}${siblings.map(s => `<li><a href="/${s.slug}">${esc(s.name)}</a></li>`).join('')}</ul>` : ''}
<h3 style="margin:0 0 14px">Elders in ${esc(pv.name)}</h3>
<ul class="chips">${others.map(o => `<li><a href="/${o.slug}">${esc(o.name)}</a></li>`).join('')}<li><a href="/werkgebied/${pv.slug}"><b>Alle plaatsen in ${esc(pv.name)}</b></a></li></ul>
</div></section>

${cta(`Vraag een scherpe, vrijblijvende prijsopgave aan voor uw dekvloer in ${esc(p.name)}, of stel eerst uw vraag. Wij denken graag met u mee.`)}`;

  return page({
    path: `/${p.slug}`, title, description, body, footerPlaces: ctx.footerPlaces,
    ld: [crumbLd(crumbs), faqLd(faq), {
      '@type': 'Service',
      name: `Zandcement dekvloer ${p.inLabel}`,
      serviceType: 'Zandcement dekvloer',
      provider: { '@id': site.url + '/#bedrijf' },
      areaServed: { '@type': 'City', name: p.name, containedInPlace: { '@type': 'AdministrativeArea', name: `Gemeente ${m.name}`, containedInPlace: { '@type': 'AdministrativeArea', name: pv.name } } },
      url: abs(`/${p.slug}`),
      offers: { '@type': 'AggregateOffer', priceCurrency: 'EUR', lowPrice: site.price.base5cm[0], highPrice: site.price.base5cm[1], unitText: 'm²' },
    }],
  });
}

// Overzichtspagina voor gemeenten met meerdere kernen zonder eigen hoofdregel (Zaanstad, Westland …).
export function muniHub(m, ctx) {
  const pv = m.provinceRef;
  const crumbs = [['/', 'Home'], ['/werkgebied', 'Werkgebied'], [`/werkgebied/${pv.slug}`, pv.name], [`/${m.slug}`, m.name]];
  const v = { name: m.name, muni: m.name, province: pv.name, in: `de gemeente ${m.name}` };
  const tk = C.typeKey(m.places[0].cityType);
  const kernen = m.places.map(p => p.name);
  const provPara = C.pick(C.PROVINCE_PARAS[pv.name], m.slug, 'prov');
  const faq = faqFor({ slug: m.slug }, { ...C.vars({ name: m.name, label: m.name, inLabel: m.name, muni: m.name, province: pv.name }) });
  const body = `
${hero({ crumbs, pill: `Zandcement dekvloeren · ${esc(pv.name)}`, h1: `Zandcement dekvloer gemeente ${esc(m.name)}<br><span class="accent">${C.pick(C.H1_SUB, m.slug, 'h1')}</span>`,
    lead: esc(fill(C.pick(C.LEADS, m.slug, 'lead'), v)), checks: ['Alle kernen van de gemeente', 'Gratis prijsopgave', 'Ook met vloerverwarming'] })}
<section><div class="wrap split"><div class="reveal prose">
<span class="eyebrow">Gemeente ${esc(m.name)}</span>
<h2>Dekvloeren in <span class="accent">${m.places.length} kernen</span></h2>
<p>De gemeente ${esc(m.name)} bestaat uit meerdere kernen: ${esc(C.listNl(kernen))}. Wij leggen in al deze plaatsen zandcement dekvloeren, voor woningen, aanbouwen en bedrijfspanden.</p>
<p>${esc(provPara)}</p>
<p>${esc(fill(C.pick(C.TYPE_PARAS[tk], m.slug, 'type'), { name: m.name }))}</p>
</div><div class="photo reveal"><img src="/assets/img/${C.pick(['dekvloer-1', 'dekvloer-2', 'project-4'], m.slug, 'ph')}.jpg" alt="Zandcement dekvloer in de gemeente ${esc(m.name)}" loading="lazy"></div></div></section>
<section class="paper"><div class="wrap"><div class="sec-head reveal"><span class="eyebrow">Kies uw plaats</span><h2>Plaatsen in ${esc(m.name)}</h2></div>
<div class="cards light-cards">${m.places.map(p => `<a class="card reveal" href="/${p.slug}"><span class="ck">${icon('pin')}</span><div><h3>${esc(p.name)}</h3><p>Zandcement dekvloer in ${esc(p.name)}: prijzen, opties en advies.</p></div></a>`).join('')}</div></div></section>
<section><div class="wrap"><div class="center sec-head reveal"><span class="eyebrow">Veelgestelde vragen</span><h2>Vragen over dekvloeren in <span class="accent">${esc(m.name)}</span></h2></div>${faqHtml(faq)}</div></section>
${cta()}`;
  return page({
    path: `/${m.slug}`, title: `Zandcement dekvloer gemeente ${m.name} | Alle kernen`,
    description: `Zandcement dekvloer laten leggen in de gemeente ${m.name}: ${C.listNl(kernen.slice(0, 4))}${kernen.length > 4 ? ' en meer' : ''}. Kaarsrecht en legklaar. Vraag een offerte aan.`,
    body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs), faqLd(faq)],
  });
}

export function provincePage(pv, ctx) {
  const crumbs = [['/', 'Home'], ['/werkgebied', 'Werkgebied'], [`/werkgebied/${pv.slug}`, pv.name]];
  const n = pv.munis.reduce((a, m) => a + m.places.length, 0);
  const body = `
${hero({ crumbs, pill: 'Zandcement dekvloeren · Werkgebied', h1: `Zandcement dekvloer <span class="accent">provincie ${esc(pv.name)}</span>`,
    lead: `Wij leggen zandcement dekvloeren in heel ${esc(pv.name)}: in ${pv.munis.length} gemeenten en ${n} plaatsen en wijken.` })}
<section><div class="wrap prose reveal" style="max-width:900px">
<span class="eyebrow">${esc(pv.name)}</span><h2>Dekvloeren in <span class="accent">${esc(pv.name)}</span></h2>
${C.PROVINCE_PARAS[pv.name].map(t => `<p>${esc(t)}</p>`).join('')}
</div></section>
<section class="paper"><div class="wrap"><div class="sec-head reveal"><span class="eyebrow">Gemeenten</span><h2>Alle plaatsen in ${esc(pv.name)}</h2></div>
<div class="muni-grid">${pv.munis.map(m => `<div class="muni"><h3><a href="/${m.slug}">${esc(m.name)}</a></h3><ul>${m.places.filter(p => p.slug !== m.slug).map(p => `<li><a href="/${p.slug}">${esc(p.name)}</a></li>`).join('')}</ul></div>`).join('')}</div></div></section>
${cta()}`;
  return page({ path: `/werkgebied/${pv.slug}`, title: `Zandcement dekvloer provincie ${pv.name} | ${n} plaatsen | Dekvloerexpert`, description: `Zandcement dekvloer laten leggen in de provincie ${pv.name}? Wij werken in ${pv.munis.length} gemeenten, waaronder ${C.listNl(pv.munis.slice(0, 3).map(m => m.name))}. Vraag een vrijblijvende offerte aan.`, body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}

export function werkgebied(ctx) {
  const crumbs = [['/', 'Home'], ['/werkgebied', 'Werkgebied']];
  const body = `
${hero({ crumbs, h1: 'Ons <span class="accent">werkgebied</span>', lead: `Landelijk actief: wij leggen zandcement dekvloeren in alle twaalf provincies, in ${ctx.places.length} plaatsen en wijken.` })}
<section class="paper"><div class="wrap">
<div class="prov-grid reveal" style="margin-bottom:60px">${ctx.provinces.map(pv => `<a class="prov" href="/werkgebied/${pv.slug}">${pv.name}<span>${pv.munis.length} gemeenten</span></a>`).join('')}</div>
${ctx.provinces.map(pv => `<h2 style="margin:50px 0 24px;font-size:1.8rem"><a href="/werkgebied/${pv.slug}" style="text-decoration:none">${esc(pv.name)}</a></h2>
<div class="muni-grid">${pv.munis.map(m => `<div class="muni"><h3><a href="/${m.slug}">${esc(m.name)}</a></h3><ul>${m.places.filter(p => p.slug !== m.slug).map(p => `<li><a href="/${p.slug}">${esc(p.name)}</a></li>`).join('')}</ul></div>`).join('')}</div>`).join('')}
</div></section>${cta()}`;
  return page({ path: '/werkgebied', title: 'Werkgebied: zandcement dekvloeren in heel Nederland | Dekvloerexpert', description: `Dekvloerexpert is landelijk actief in alle provincies, in ${ctx.places.length} plaatsen en wijken. Vind uw plaats en vraag een offerte aan.`, body, footerPlaces: ctx.footerPlaces, ld: [crumbLd(crumbs)] });
}
