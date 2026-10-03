import { site } from './config.mjs';

export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const abs = path => site.url + (path === '/' ? '/' : path);
export const tel = `tel:${site.phoneIntl}`;
export const wa = (text = 'Hallo Dekvloerexpert, ik heb een vraag over een dekvloer.') => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

// Eén lijnstijl, 24×24, stroke = currentColor.
const P = {
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  close: '<path d="M6 6l12 12M18 6 6 18"/>',
  flame: '<path d="M12 3c1 3 4 5 4 9a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-8z"/>',
  shield: '<path d="M12 3 5 6v5c0 5 3 8 7 10 4-2 7-5 7-10V6z"/><path d="m9 12 2 2 4-4"/>',
  layers: '<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  ruler: '<path d="M3 17 17 3l4 4L7 21z"/><path d="m7 13 2 2M10 10l2 2M13 7l2 2"/>',
  drop: '<path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>',
  building: '<path d="M4 21V5l8-2v18M12 8h8v13M8 8h.01M8 12h.01M8 16h.01M16 12h.01M16 16h.01M3 21h18"/>',
  home: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  pin: '<path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  wave: '<path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 16c3-3 6 3 9 0s6 3 9 0"/>',
  sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  tiktok: '<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.5 2.5 4.5 5 5"/>',
  youtube: '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="m10 9.5 5 2.5-5 2.5z"/>',
  pillar: '<path d="M7 3h10M7 21h10M9 3v18M15 3v18"/>',
  cube: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/>',
};
export const icon = (name, cls = '') =>
  `<svg${cls ? ` class="${cls}"` : ''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;
export const waIcon = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.47 15.02L2 22l5.1-1.53A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.03.9.92-2.95-.2-.31a8.2 8.2 0 1 1 6.79 3.69zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.71-1.33.08-.16.04-.31-.02-.43l-.75-1.82c-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.31 2.75 2.75 0 0 0-.86 2.04 4.77 4.77 0 0 0 1 2.53 10.9 10.9 0 0 0 4.18 3.7c1.56.67 2.17.73 2.95.62.48-.07 1.46-.6 1.67-1.18.2-.58.2-1.08.14-1.18-.06-.1-.22-.17-.47-.29z"/></svg>`;
export const googleWord = '<span class="gword"><span>G</span><span>o</span><span>o</span><span>g</span><span>l</span><span>e</span></span>';

// ───────────────────────── Diensten
export const SERVICES = [
  { slug: 'zandcement', nav: 'Zandcement dekvloeren', icon: 'layers' },
  { slug: 'anhydrietvloeren', nav: 'Anhydrietvloeren', icon: 'wave' },
  { slug: 'vloerverwarming', nav: 'Vloerverwarming', icon: 'flame' },
  { slug: 'egaliseren', nav: 'Egaliseren', icon: 'ruler' },
  { slug: 'beton-en-fundering', nav: 'Beton & Fundering', icon: 'cube' },
  { slug: 'schuimbeton', nav: 'Schuimbeton', icon: 'drop' },
  { slug: 'heipalen', nav: 'Heipalen', icon: 'pillar' },
];

const NAV = [
  ['/', 'Home'], ['/zandcement', 'Zandcement'], ['/projecten', 'Projecten'], ['/opties', 'Opties'],
  ['DIENSTEN'], ['/werkwijze', 'Werkwijze'], ['/contact', 'Contact'],
];

export function header(active) {
  const items = NAV.map(([href, label]) => {
    if (href === 'DIENSTEN') {
      const cur = active?.startsWith('dienst');
      return `<li class="has-drop"><button type="button" aria-expanded="false" aria-haspopup="true"${cur ? ' style="color:var(--teal)"' : ''}>Diensten${icon('chevron')}</button>
<ul class="dropdown"><li><a href="/diensten"><b>Alle diensten</b></a></li>${SERVICES.filter(s => s.slug !== 'zandcement').map(s => `<li><a href="/${s.slug}">${s.nav}</a></li>`).join('')}</ul></li>`;
    }
    return `<li><a href="${href}"${active === href ? ' aria-current="page"' : ''}>${label}</a></li>`;
  }).join('');
  return `<a class="skip" href="#main">Naar inhoud</a>
<div class="progress" aria-hidden="true"><span></span></div>
<header class="site-header"><nav class="nav" aria-label="Hoofdmenu">
<a class="logo" href="/" aria-label="${site.name} home"><b>DEKVLOER<span>EXPERT</span></b><small>ZANDCEMENT DEKVLOEREN</small></a>
<ul class="menu">${items}</ul>
<div class="nav-actions">
<a class="icon-btn" href="${tel}" aria-label="Bel ${site.phoneDisplay}">${icon('phone')}</a>
<a class="icon-btn wa" href="${wa()}" target="_blank" rel="noopener" aria-label="WhatsApp">${waIcon}</a>
<a class="btn btn-teal" href="/offerte">Offerte aanvragen</a>
</div>
<button class="burger" type="button" aria-label="Menu openen" aria-expanded="false">${icon('menu')}</button>
</nav></header>`;
}

export function footer(footerPlaces = []) {
  const soc = [
    ['WhatsApp', wa(), waIcon, 'wa'],
    ['Bellen', tel, icon('phone')],
    site.socials.instagram && ['Instagram', site.socials.instagram, icon('instagram')],
    site.socials.tiktok && ['TikTok', site.socials.tiktok, icon('tiktok')],
    site.socials.youtube && ['YouTube', site.socials.youtube, icon('youtube')],
    ['Over ons', '/over-ons', icon('info')],
  ].filter(Boolean).map(([l, h, i, c]) => `<a${c ? ` class="${c}"` : ''} href="${h}" aria-label="${l}"${h.startsWith('http') ? ' target="_blank" rel="noopener"' : ''}>${i}</a>`).join('');
  return `<footer class="site-footer"><div class="wrap">
<div class="f-grid">
<div><a class="logo" href="/"><b>DEKVLOER<span>EXPERT</span></b><small>ZANDCEMENT DEKVLOEREN</small></a>
<p class="f-about">Zandcement dekvloeren voor woningen, uitbouwen en bedrijfspanden. Door heel Nederland, voor aannemers en particulieren.</p>
<div class="socials">${soc}</div></div>
<div><h4>Diensten</h4><ul>${SERVICES.map(s => `<li><a href="/${s.slug}">${s.nav}</a></li>`).join('')}<li><a class="strong" href="/diensten">Alle diensten</a></li></ul></div>
<div><h4>Informatie</h4><ul>
<li><a href="/projecten">Projecten</a></li><li><a href="/opties">Opties</a></li><li><a href="/werkwijze">Werkwijze</a></li>
<li><a href="/contact">Contact</a></li><li><a href="/werkgebied">Werkgebied</a></li><li><a href="/over-ons">Over ons</a></li>
<li><a href="/kennisbank">Kennisbank</a></li><li><a href="/offerte">Offerte aanvragen</a></li></ul></div>
<div><h4>Contact</h4><ul>
<li><a href="${tel}">${site.phoneDisplay}</a></li><li><a href="${wa()}" target="_blank" rel="noopener">WhatsApp</a></li>
<li><a href="mailto:${site.email}">${site.email}</a></li><li><a href="/werkgebied">Heel Nederland</a></li></ul>
<p style="margin-top:26px"><a class="btn btn-teal btn-sm" href="/offerte">Offerte aanvragen</a></p></div>
</div>
${footerPlaces.length ? `<div class="f-places"><h4>Zandcement dekvloer in onder meer</h4><ul>${footerPlaces.map(p => `<li><a href="/${p.slug}">${esc(p.name)}</a></li>`).join('')}<li><a class="strong" href="/werkgebied">Alle plaatsen</a></li></ul></div>` : ''}
<div class="wordmark" aria-hidden="true">DEKVLOER<span>EXPERT</span></div>
<div class="f-bottom"><span>© ${new Date().getFullYear()} ${site.name}. Alle rechten voorbehouden.${site.kvk ? ` KvK ${site.kvk}.` : ''} <a href="/privacy">Privacy</a></span><span>Website door <b><a href="${site.builtBy.url}" target="_blank" rel="noopener">${site.builtBy.name}</a></b></span></div>
</div></footer>
<a class="wa-fab" href="${wa()}" target="_blank" rel="noopener" aria-label="Stuur een WhatsApp-bericht">${waIcon}</a>
<nav class="mbar" aria-label="Snel contact"><a href="${tel}">${icon('phone')}<span>Bellen</span></a><a href="${wa()}" target="_blank" rel="noopener">${waIcon}<span>WhatsApp</span></a><a class="go" href="/offerte">${icon('arrow')}<span>Offerte</span></a></nav>`;
}

export const businessLd = () => ({
  '@type': 'HomeAndConstructionBusiness',
  '@id': site.url + '/#bedrijf',
  name: site.name,
  url: site.url + '/',
  telephone: site.phoneIntl,
  email: site.email,
  image: site.url + '/assets/img/hero.jpg',
  areaServed: { '@type': 'Country', name: 'Nederland' },
  priceRange: '€€',
  slogan: 'Strakke vloeren, sterke basis!',
});

export function page({ path, title, description, active, body, ld = [], footerPlaces, ogImage = '/assets/img/hero.jpg', noindex = false }) {
  const graph = [businessLd(), ...ld];
  return `<!doctype html>
<html lang="nl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${abs(path)}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index,follow,max-image-preview:large">'}
<meta property="og:type" content="website">
<meta property="og:locale" content="nl_NL">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${abs(path)}">
<meta property="og:image" content="${site.url}${ogImage}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#111514">
<link rel="icon" href="/assets/img/favicon.svg" type="image/svg+xml">
<script>document.documentElement.classList.add('js')</script>
<link rel="preload" href="/assets/fonts/inter-tight.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/fonts/fonts.css">
<link rel="stylesheet" href="/assets/css/site.css">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body>
${header(active)}
<main id="main">
${body}
</main>
${footer(footerPlaces)}
<script src="/assets/js/site.js" defer></script>
</body>
</html>
`;
}

// ───────────────────────── Herbruikbare blokken
export function hero({ crumbs, pill = 'Zandcement dekvloeren', h1, lead, img = '/assets/img/hero.jpg', video = '', checks, buttons, sub = true, extra = '', aside = '' }) {
  return `<section class="hero${sub ? ' sub' : ''}${aside ? ' has-aside' : ''}">
<div class="hero-bg" style="background-image:url('${img}')">${video ? `<video autoplay muted loop playsinline preload="metadata" poster="${img}"><source src="${video}" type="video/mp4"></video>` : ''}</div>
<div class="hero-sweep" aria-hidden="true"></div>
<div class="wrap hero-grid"><div class="hero-inner">
${crumbs ? breadcrumb(crumbs) : ''}
<span class="pill">${pill}</span>
<h1>${h1}</h1>
${lead ? `<p class="lead">${lead}</p>` : ''}
${checks ? `<ul class="checks">${checks.map(c => `<li><span class="tick">${icon('check')}</span>${c}</li>`).join('')}</ul>` : ''}
${extra}
${buttons ?? `<div class="btn-row"><a class="btn btn-teal" href="/offerte">Vrijblijvende offerte ${icon('arrow')}</a><a class="btn btn-ghost" href="${tel}">${icon('phone')} Bel direct</a></div>`}
</div>${aside}</div></section>`;
}

export function breadcrumb(items) {
  return `<ol class="crumbs">${items.map(([href, label], i) => i === items.length - 1 ? `<li aria-current="page">${esc(label)}</li>` : `<li><a href="${href}">${esc(label)}</a></li>`).join('')}</ol>`;
}
export const crumbLd = items => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([href, label], i) => ({ '@type': 'ListItem', position: i + 1, name: label, item: abs(href) })),
});
export const faqLd = qa => ({
  '@type': 'FAQPage',
  mainEntity: qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});
export const faqHtml = qa => `<div class="faq">${qa.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>`;

export function cta(lead = 'Stuur ons de oppervlakte, de gewenste dikte en een foto van de ruimte. Dan krijgt u snel een prijs.', title = 'Prijs nodig voor uw vloer?') {
  return `<section><div class="wrap"><div class="cta-card reveal">

<h2>${title}</h2>
<p>${lead}</p>
<div class="btn-row"><a class="btn btn-teal" href="/offerte">Offerte aanvragen ${icon('arrow')}</a><a class="btn btn-wa" href="${wa()}" target="_blank" rel="noopener">${waIcon} WhatsApp</a><a class="btn btn-ghost" href="${tel}">${icon('phone')} Bel ${site.phoneDisplay}</a></div>
<p class="fine">Bel of app ${site.phoneDisplay}</p>
</div></div></section>`;
}
