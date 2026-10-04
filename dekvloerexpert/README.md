# Dekvloerexpert

Website voor een specialist in zandcement dekvloeren, nagebouwd op de demo van de klant:
zelfde opbouw, kleuren, menu en secties. Daaronder zit een landelijke SEO-structuur met
een eigen pagina per plaats, zodat iemand die "zandcement dekvloer Alkmaar" zoekt
op de pagina voor Alkmaar uitkomt.

## Snel starten

```bash
npm run build      # bouwt alles naar dist/
npm run preview    # bouwt en serveert op http://localhost:8080
npm run check      # controleert links, dubbele titels en hoe uniek de plaatspagina's zijn
```

Geen dependencies, alleen Node 18+. Op Vercel werkt het zonder instellingen:
`vercel.json` geeft het buildcommando, de outputmap, nette URL's (zonder `.html`) en de redirects.

## Wat er gebouwd wordt (634 pagina's)

| Soort | Aantal | URL |
|---|---|---|
| Home, diensten, opties, projecten, werkwijze, contact, offerte, over ons, privacy | 13 | `/`, `/zandcement`, `/opties` … |
| Diensten uit het menu | 6 | `/anhydrietvloeren`, `/vloerverwarming`, `/egaliseren`, `/beton-en-fundering`, `/schuimbeton`, `/heipalen` |
| Kennisbank (zoekwoorden uit de klantlijst) | 6 | `/cementdekvloer-kosten-per-m2`, `/cementdekvloer-droogtijd`, `/zandcement-dekvloer-zelf-maken`, `/vloeibaar-zandcement`, `/cement-dekvloer`, `/kennisbank` |
| Plaats- en wijkpagina's | 574 | `/zandcement-dekvloer-alkmaar`, `/zandcement-dekvloer-zaanstad-zaandam` … |
| Gemeentepagina's (gemeenten met meerdere kernen) | 25 | `/zandcement-dekvloer-zaanstad`, `/zandcement-dekvloer-westland` … |
| Provinciepagina's + werkgebied | 13 | `/werkgebied`, `/werkgebied/noord-holland` … |

Daarnaast: `sitemap.xml`, `robots.txt`, `404.html`.

## Over het CSV-bestand (belangrijk)

`data/plaatsen.csv` is het aangeleverde bestand met 2.500 regels. **1.926 daarvan zijn
"(Zone ####)"-kopieën van dezelfde 574 plaatsen**, bijvoorbeeld
"Alphen aan den Rijn Boskoop (Zone 1924)" naast gewoon "Alphen aan den Rijn Boskoop".
Voor elk daarvan een aparte pagina maken is precies wat Google als duplicate content
of doorway pages ziet, en dat kost juist rankings. Daarom:

- elke echte plaats krijgt één pagina (574);
- alle Zone-URL's sturen met een 301-redirect door naar de echte plaatspagina, zodat
  er geen enkele link uit de lijst op een 404 uitkomt.

Twee kolommen gebruiken we bewust niet of beperkt:
- `main_road` klopt vaak niet (zo staat Scheveningen bij de N11 en Boskoop bij de A16).
  Een verkeerde weg op 574 pagina's oogt onprofessioneel, dus die kolom tonen we niet.
- `local_advice` en `city_type` hebben elk maar 5 varianten. Die gebruiken we wel, maar als
  één ingrediënt tussen veel andere.

## Hoe de plaatspagina's uniek blijven

Elke plaatspagina (gemiddeld ~760 woorden) wordt opgebouwd uit tekstvarianten die per plaats
vast gekozen worden (zelfde plaats = altijd dezelfde tekst), plus echte plaatsgegevens:

- intro, ondertitel en controlepunten in de hero: 8 varianten;
- een alinea over het type bebouwing (uit `city_type`): 5 × 3 varianten;
- een alinea per provincie (bodem, bouwstijl, klimaat): 12 × 3 varianten;
- een alinea per soort plaats (stad, wijk, kern), met namen van buurkernen;
- drie prijsrekenvoorbeelden met eigen oppervlaktes, berekend uit de prijs in `src/config.mjs`;
- drie aanbevolen opties met een eigen toelichting;
- werkwijze en FAQ (5 van 10 vragen, met antwoordvarianten), met FAQ-schema;
- interne links naar alle kernen in de gemeente en 10 andere gemeenten in de provincie.

`npm run check` meet de overlap: gemiddeld ~14% gedeelde tekst tussen plaatspagina's,
maximaal ~35%. Wat overblijft is vooral de vaste opmaak (koppen, CTA). Er zijn geen dubbele
titels of descriptions.

**Advies:** schrijf voor de 10 à 20 belangrijkste steden (Alkmaar, Den Haag, Zaandam …) een
eigen alinea met echte projecten. Dat is wat Google uiteindelijk het zwaarst laat wegen.

## Voor livegang: aanpassen

Alles staat in `src/config.mjs`, tenzij anders vermeld.

- [ ] **Domein** (`url`): nodig voor de canonical-URL's en de sitemap.
- [ ] **Prijzen** (`price`): nu € 18–26 per m² voor 5 cm, € 750 minimum. Laat de klant dit bevestigen.
- [ ] **Cijfers** (`stats`): 15+ jaar, 2500+ projecten. Komen uit de demo; laat bevestigen.
- [ ] **Foto's**: nu staan er 10 foto's onder een Creative Commons-licentie (Flickr/Wikimedia via Openverse) in `public/assets/media/`, met naamsvermelding op `/fotoverantwoording` (gegevens in `credits.json`). Vervang ze liefst door eigen foto's van de klant, zet dan `ownMedia: true` in de config en haal de regels uit `credits.json` weg.
- [ ] **Eigen foto's en video's**: zet ze in `public/assets/media/` (`hero.mp4` voor de achtergrondvideo, `projecten/` voor de galerij; de bestandsnaam wordt het bijschrift) en bouw opnieuw. Ze worden automatisch gebruikt.
- [ ] **Foto's**: `public/assets/img/` bevat neutrale placeholder-texturen. Vervang ze door
      echte projectfoto's met dezelfde bestandsnamen (`hero.jpg`, `project-1.jpg` … `project-8.jpg`,
      `dekvloer-1.jpg`, `dekvloer-2.jpg`).
- [ ] **Projecten** (`src/blocks.mjs`, `PROJECTS`): de titels en plaatsen komen uit de demo.
      Vervang ze door echte projecten.
- [ ] **Reviews** (`src/blocks.mjs`): staan net als in de demo gemarkeerd als "Voorbeeld".
      Vervang ze door echte Google-reviews en vul `googleReviewsUrl` in.
- [ ] **Formulier** (`formEndpoint`): leeg = de aanvraag gaat als kant-en-klaar WhatsApp-bericht
      naar 06 51 77 63 99. Met een Formspree- of Web3Forms-URL komt hij per e-mail binnen.
- [ ] **E-mail, KvK, socials**: invullen zodra bekend.
- [ ] Na livegang: `sitemap.xml` indienen in Google Search Console en een Google Bedrijfsprofiel
      aanmaken. Dat laatste weegt zwaar voor lokale zoekresultaten.

## Bestanden

```
build.mjs              bouwscript (+ lokale server met --serve)
vercel.json            buildinstellingen, nette URL's, 301's voor de Zone-regels
data/plaatsen.csv      aangeleverde plaatsenlijst (ongewijzigd)
src/config.mjs         bedrijfsgegevens, prijzen, cijfers
src/places.mjs         CSV inlezen, Zone-regels eruit, plaatsnamen opschonen
src/content.mjs        tekstvarianten voor de plaatspagina's
src/layout.mjs         head, header, footer, iconen, schema.org
src/blocks.mjs         opties, werkwijze, reviews, projecten
src/pages.mjs          vaste pagina's en kennisbank
src/place-pages.mjs    plaats-, gemeente- en provinciepagina's
public/assets/         css, js, afbeeldingen
tools/uniqueness.mjs   controle op links, titels en unieke tekst
```
