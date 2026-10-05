// Alle bedrijfsgegevens op één plek. Pas hier aan; daarna `npm run build`.
export const site = {
  name: 'Dekvloerexpert',
  tagline: 'Zandcement dekvloeren',
  // Definitieve domeinnaam, zonder slash aan het eind. Wordt gebruikt voor canonical-URL's en de sitemap.
  url: 'https://www.dekvloerexpert.nl',
  phoneDisplay: '06 51 77 63 99',
  phoneIntl: '+31651776399',
  whatsapp: '31651776399',
  email: 'info@dekvloerexpert.nl',
  // Optioneel: endpoint voor het offerteformulier (bijv. Formspree of Web3Forms).
  // Leeg = de aanvraag wordt als kant-en-klaar WhatsApp-bericht verstuurd.
  formEndpoint: '',
  // Link naar het Google Bedrijfsprofiel (voor de reviewbadge). Leeg = badge linkt naar de reviewsectie.
  googleReviewsUrl: '',
  // Echte Google-reviews: [['tekst', 'soort project'], …]. Leeg = geen reviewsectie.
  reviews: [],
  // true zodra de foto's in assets/media/projecten/ van de klant zelf zijn. Dan heten ze "Recent werk".
  ownMedia: true,
  socials: {
    instagram: '',
    tiktok: '',
    youtube: '',
  },
  kvk: '',
  // Cijfers uit de hero-balk. Laat de klant deze bevestigen voor livegang.
  stats: [
    ['15+', 'Jaar ervaring'],
    ['2500+', 'Projecten opgeleverd'],
    ['100%', 'Kaarsrecht & legklaar'],
    ['NL', 'Landelijk actief'],
  ],
  // Prijsindicatie per m² (incl. materiaal en aanbrengen, excl. btw) voor 5 cm.
  // Basis voor de rekenvoorbeelden op de plaatspagina's en de kostenpagina.
  price: { base5cm: [18, 26], perExtraCm: [2.5, 3.5], minimumOrder: 750 },
  builtBy: { name: 'Varexo', url: 'https://varexo.nl' },
};
