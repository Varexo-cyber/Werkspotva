/* Vakmaat — demodata voor de preview.
   Alles hier is fictief maar realistisch: bedrijfsnamen, plaatsen, tarieven en
   doorlooptijden komen overeen met wat er in de Nederlandse klussenmarkt gangbaar is. */
(function (root) {
  'use strict';

  var CATEGORIES = [
    { slug: 'schilderwerk',   naam: 'Schilder',            icon: 'paint',  klussen: 1284, vanaf: 38, groep: 'Binnen',   zoek: ['schilderen', 'binnenschilderwerk', 'buitenschilderwerk', 'kozijnen', 'latex', 'sauswerk'] },
    { slug: 'badkamer',       naam: 'Badkamer',            icon: 'drop',   klussen: 642,  vanaf: 45, groep: 'Verbouwen', zoek: ['badkamer', 'douche', 'sanitair', 'toilet', 'tegels'] },
    { slug: 'elektricien',    naam: 'Elektricien',         icon: 'plug',   klussen: 918,  vanaf: 52, groep: 'Techniek',  zoek: ['elektra', 'groepenkast', 'stopcontact', 'laadpaal', 'verlichting'] },
    { slug: 'loodgieter',     naam: 'Loodgieter',          icon: 'drop',   klussen: 1103, vanaf: 55, groep: 'Techniek',  zoek: ['loodgieter', 'lekkage', 'cv-ketel', 'kraan', 'afvoer', 'riool'] },
    { slug: 'hovenier',       naam: 'Hovenier',            icon: 'leaf',   klussen: 776,  vanaf: 42, groep: 'Buiten',    zoek: ['tuin', 'hovenier', 'bestrating', 'snoeien', 'schutting', 'gras'] },
    { slug: 'dakdekker',      naam: 'Dakdekker',           icon: 'roof',   klussen: 524,  vanaf: 58, groep: 'Buiten',    zoek: ['dak', 'dakdekker', 'dakgoot', 'dakpannen', 'bitumen', 'daklekkage'] },
    { slug: 'timmerman',      naam: 'Timmerman',           icon: 'hammer', klussen: 831,  vanaf: 48, groep: 'Binnen',    zoek: ['timmerman', 'kast op maat', 'deur', 'trap', 'vlizotrap', 'meubel'] },
    { slug: 'kozijnen',       naam: 'Kozijnen & glas',     icon: 'window', klussen: 389,  vanaf: 50, groep: 'Verbouwen', zoek: ['kozijn', 'glas', 'hr++', 'dubbel glas', 'raam'] },
    { slug: 'vloeren',        naam: 'Vloeren',             icon: 'floor',  klussen: 693,  vanaf: 40, groep: 'Binnen',    zoek: ['vloer', 'pvc', 'laminaat', 'parket', 'gietvloer', 'egaliseren'] },
    { slug: 'stucwerk',       naam: 'Stukadoor',           icon: 'brick',  klussen: 571,  vanaf: 43, groep: 'Binnen',    zoek: ['stucwerk', 'stukadoor', 'muren', 'plafond', 'spachtelputz'] },
    { slug: 'aannemer',       naam: 'Aannemer',            icon: 'building', klussen: 458, vanaf: 62, groep: 'Verbouwen', zoek: ['aannemer', 'aanbouw', 'uitbouw', 'verbouwing', 'dakkapel'] },
    { slug: 'isolatie',       naam: 'Isolatie',            icon: 'solar',  klussen: 412,  vanaf: 46, groep: 'Verduurzamen', zoek: ['isolatie', 'spouwmuur', 'vloerisolatie', 'dakisolatie'] },
    { slug: 'zonnepanelen',   naam: 'Zonnepanelen',        icon: 'solar',  klussen: 367,  vanaf: 54, groep: 'Verduurzamen', zoek: ['zonnepanelen', 'pv', 'omvormer', 'thuisbatterij'] },
    { slug: 'warmtepomp',     naam: 'Warmtepomp',          icon: 'bolt',   klussen: 289,  vanaf: 65, groep: 'Verduurzamen', zoek: ['warmtepomp', 'hybride', 'airco', 'vloerverwarming'] },
    { slug: 'verhuizen',      naam: 'Verhuizen',           icon: 'truck',  klussen: 445,  vanaf: 35, groep: 'Diensten',  zoek: ['verhuizen', 'verhuizer', 'transport', 'piano'] },
    { slug: 'slotenmaker',    naam: 'Slotenmaker',         icon: 'key',    klussen: 198,  vanaf: 60, groep: 'Diensten',  zoek: ['slot', 'slotenmaker', 'inbraak', 'cilinder'] }
  ];

  var PROS = [
    {
      id: 'vdb-schilderwerken', naam: 'Van den Berg Schilderwerken', initialen: 'VB',
      vak: 'schilderwerk', vakLabel: 'Schilder', plaats: 'Utrecht', straal: 35,
      score: 4.9, aantal: 187, sinds: 2016, medewerkers: '4–8', uurtarief: '€ 48 – € 62',
      reactie: '< 2 uur', kvk: '62 84 91 03', btw: true, vca: true, garantie: '5 jaar op buitenwerk',
      specialisme: ['Binnenschilderwerk', 'Buitenschilderwerk', 'Houtrot herstel', 'Behangen'],
      over: 'Familiebedrijf uit Utrecht, inmiddels tweede generatie. We werken vast met vier schilders en nemen bewust niet meer aan dan we netjes afkrijgen. Voor buitenwerk gebruiken we uitsluitend Sikkens en Koopmans — daar geven we vijf jaar garantie op.',
      wijken: ['Utrecht', 'Nieuwegein', 'Zeist', 'Houten', 'De Bilt', 'Maarssen'],
      keurmerken: ['VCA*', 'Onderhoud NL', 'Verzekerd t/m € 2,5 mln']
    },
    {
      id: 'meijer-installatie', naam: 'Meijer Installatietechniek', initialen: 'MI',
      vak: 'loodgieter', vakLabel: 'Loodgieter & installateur', plaats: 'Amsterdam', straal: 25,
      score: 4.8, aantal: 243, sinds: 2011, medewerkers: '9–15', uurtarief: '€ 58 – € 75',
      reactie: '< 1 uur', kvk: '34 19 77 28', btw: true, vca: true, garantie: '2 jaar op installatiewerk',
      specialisme: ['CV-ketels', 'Lekkages', 'Complete badkamers', 'Vloerverwarming'],
      over: 'Erkend installateur voor heel Amsterdam en omstreken. Spoedlekkage? We hebben dagelijks twee bussen vrij voor storingen. Voor grotere klussen komen we altijd eerst langs — een offerte op afstand doen we niet, dat werkt niet eerlijk.',
      wijken: ['Amsterdam', 'Amstelveen', 'Diemen', 'Zaandam', 'Badhoevedorp'],
      keurmerken: ['Sterkin erkend', 'VCA**', 'OK CV-keur']
    },
    {
      id: 'groenwerk-de-vries', naam: 'Groenwerk de Vries', initialen: 'GV',
      vak: 'hovenier', vakLabel: 'Hovenier', plaats: 'Zwolle', straal: 45,
      score: 5.0, aantal: 96, sinds: 2019, medewerkers: '2–4', uurtarief: '€ 42 – € 55',
      reactie: '< 3 uur', kvk: '74 02 55 61', btw: true, vca: false, garantie: '1 jaar aangroeigarantie',
      specialisme: ['Tuinontwerp', 'Bestrating', 'Beplanting', 'Onderhoud'],
      over: 'Kleine hoveniersploeg met een voorkeur voor natuurlijke, onderhoudsarme tuinen. We maken altijd eerst een schets met beplantingsplan, zodat je weet hoe je tuin er over drie jaar uitziet — niet alleen op opleverdag.',
      wijken: ['Zwolle', 'Kampen', 'Hattem', 'Dalfsen', 'Meppel', 'Deventer'],
      keurmerken: ['VHG Groenkeur', 'Aangroeigarantie']
    },
    {
      id: 'elektro-bakker', naam: 'Elektro Bakker & Zn', initialen: 'EB',
      vak: 'elektricien', vakLabel: 'Elektricien', plaats: 'Eindhoven', straal: 30,
      score: 4.7, aantal: 154, sinds: 2008, medewerkers: '5–9', uurtarief: '€ 52 – € 68',
      reactie: '< 2 uur', kvk: '17 21 43 90', btw: true, vca: true, garantie: '2 jaar',
      specialisme: ['Groepenkasten', 'Laadpalen', 'Domotica', 'Verlichtingsplannen'],
      over: 'Van één stopcontact bijplaatsen tot de complete elektra van een nieuwbouwwoning. Sinds 2021 doen we veel laadpalen — inclusief de aanvraag bij de netbeheerder, dat scheelt je een hoop gedoe.',
      wijken: ['Eindhoven', 'Veldhoven', 'Best', 'Geldrop', 'Helmond', 'Nuenen'],
      keurmerken: ['Sterkin erkend', 'VCA*', 'Erkend laadpuntinstallateur']
    },
    {
      id: 'dakmeesters-zuid', naam: 'Dakmeesters Zuid', initialen: 'DZ',
      vak: 'dakdekker', vakLabel: 'Dakdekker', plaats: 'Rotterdam', straal: 40,
      score: 4.6, aantal: 118, sinds: 2014, medewerkers: '6–10', uurtarief: '€ 58 – € 72',
      reactie: '< 4 uur', kvk: '24 48 12 37', btw: true, vca: true, garantie: '10 jaar op dakbedekking',
      specialisme: ['Platte daken', 'Dakpannen', 'Dakgoten', 'Daklekkage spoed'],
      over: 'Gespecialiseerd in platte daken en renovatie. We werken met EPDM en bitumen en leveren bij elk dak een fotorapport van voor en na — dan zie je zelf wat er is gebeurd, ook op het stuk dat je nooit ziet.',
      wijken: ['Rotterdam', 'Schiedam', 'Capelle a/d IJssel', 'Barendrecht', 'Dordrecht'],
      keurmerken: ['VCA**', 'BikuTec gecertificeerd', '10 jaar garantiecertificaat']
    },
    {
      id: 'houtwerk-jansen', naam: 'Houtwerk Jansen', initialen: 'HJ',
      vak: 'timmerman', vakLabel: 'Timmerman & meubelmaker', plaats: 'Groningen', straal: 50,
      score: 4.9, aantal: 71, sinds: 2020, medewerkers: '1–2', uurtarief: '€ 48 – € 58',
      reactie: '< 6 uur', kvk: '81 33 09 45', btw: true, vca: false, garantie: '2 jaar op maatwerk',
      specialisme: ['Kasten op maat', 'Trappen', 'Binnendeuren', 'Vlizotrappen'],
      over: 'Eenmanszaak met een eigen werkplaats in Groningen-Noord. Ik maak vooral inbouwkasten en trappen op maat. Kom graag langs om op te meten; tekeningen krijg je altijd ter goedkeuring voordat ik zaag.',
      wijken: ['Groningen', 'Haren', 'Leek', 'Winsum', 'Assen', 'Delfzijl'],
      keurmerken: ['Aangesloten bij NBvT']
    }
  ];

  /* Aanvullende bedrijven — zelfde opbouw, kortere profieltekst. */
  PROS = PROS.concat([
    {
      id: 'kroon-schilders', naam: 'Schildersbedrijf Kroon', initialen: 'SK',
      vak: 'schilderwerk', vakLabel: 'Schilder', plaats: 'Amersfoort', straal: 40,
      score: 4.6, aantal: 92, sinds: 2013, medewerkers: '3–6', uurtarief: '€ 44 – € 56',
      reactie: '< 5 uur', kvk: '55 17 62 84', btw: true, vca: true, garantie: '3 jaar op buitenwerk',
      specialisme: ['Buitenschilderwerk', 'Behangen', 'Spuitwerk'],
      over: 'Schildersbedrijf uit Amersfoort dat vooral werkt voor particulieren en kleine VvE\'s. We plannen ruim, zodat een klus nooit half af blijft liggen.',
      wijken: ['Amersfoort', 'Leusden', 'Soest', 'Barneveld', 'Nijkerk'],
      keurmerken: ['VCA*', 'Verzekerd t/m € 1 mln']
    },
    {
      id: 'afwerking-noord', naam: 'Afwerking Noord', initialen: 'AN',
      vak: 'stucwerk', vakLabel: 'Stukadoor & schilder', plaats: 'Leeuwarden', straal: 55,
      score: 4.8, aantal: 134, sinds: 2012, medewerkers: '4–7', uurtarief: '€ 43 – € 54',
      reactie: '< 3 uur', kvk: '01 92 33 47', btw: true, vca: true, garantie: '2 jaar',
      specialisme: ['Stucwerk', 'Spachtelputz', 'Plafonds', 'Sauswerk'],
      over: 'Stukadoors die ook het schilderwerk kunnen doen. Handig bij een verbouwing: één partij, één planning, geen gedoe over wie wat nog moet afmaken.',
      wijken: ['Leeuwarden', 'Drachten', 'Heerenveen', 'Sneek', 'Dokkum'],
      keurmerken: ['VCA*', 'Erkend leerbedrijf SBB']
    },
    {
      id: 'sanitair-westland', naam: 'Sanitair Westland', initialen: 'SW',
      vak: 'badkamer', vakLabel: 'Badkamerspecialist', plaats: 'Den Haag', straal: 30,
      score: 4.7, aantal: 168, sinds: 2010, medewerkers: '8–14', uurtarief: '€ 55 – € 70',
      reactie: '< 2 uur', kvk: '27 38 19 05', btw: true, vca: true, garantie: '5 jaar op tegelwerk',
      specialisme: ['Complete badkamers', 'Tegelwerk', 'Inloopdouches', 'Toiletrenovatie'],
      over: 'Complete badkamers van sloop tot oplevering, met eigen tegelzetters en loodgieters. Gemiddelde doorlooptijd van een standaardbadkamer: negen werkdagen.',
      wijken: ['Den Haag', 'Rijswijk', 'Delft', 'Zoetermeer', 'Naaldwijk', 'Wassenaar'],
      keurmerken: ['Sterkin erkend', 'VCA**', 'Stichting Garantiewoning']
    },
    {
      id: 'vloerenhuis-oost', naam: 'Vloerenhuis Oost', initialen: 'VO',
      vak: 'vloeren', vakLabel: 'Vloerenlegger', plaats: 'Arnhem', straal: 45,
      score: 4.5, aantal: 88, sinds: 2017, medewerkers: '2–5', uurtarief: '€ 40 – € 52',
      reactie: '< 8 uur', kvk: '69 44 20 71', btw: true, vca: false, garantie: '3 jaar op legwerk',
      specialisme: ['PVC', 'Laminaat', 'Egaliseren', 'Parket schuren'],
      over: 'Vloeren leggen en oude vloeren opknappen. We egaliseren standaard — dat kost een dag extra maar voorkomt dat je na een half jaar overal naden ziet.',
      wijken: ['Arnhem', 'Nijmegen', 'Ede', 'Doetinchem', 'Zevenaar'],
      keurmerken: ['Aangesloten bij NOA']
    },
    {
      id: 'bouwbedrijf-hendriks', naam: 'Bouwbedrijf Hendriks', initialen: 'BH',
      vak: 'aannemer', vakLabel: 'Aannemer', plaats: 'Tilburg', straal: 50,
      score: 4.7, aantal: 61, sinds: 2006, medewerkers: '12–20', uurtarief: '€ 62 – € 78',
      reactie: '< 1 dag', kvk: '18 05 77 32', btw: true, vca: true, garantie: '10 jaar constructief',
      specialisme: ['Aanbouw', 'Dakkapellen', 'Draagmuren', 'Complete verbouwing'],
      over: 'Aannemer voor de wat grotere ingrepen: uitbouwen, dakkapellen en draagmuren weghalen. We regelen de constructieberekening en de vergunning erbij.',
      wijken: ['Tilburg', 'Breda', 'Waalwijk', 'Oisterwijk', 'Goirle', 'Den Bosch'],
      keurmerken: ['VCA**', 'Bouwgarant', 'Erkend leerbedrijf SBB']
    },
    {
      id: 'zon-en-co', naam: 'Zon & Co Installaties', initialen: 'ZC',
      vak: 'zonnepanelen', vakLabel: 'Zonnepanelen & warmtepompen', plaats: 'Almere', straal: 60,
      score: 4.4, aantal: 212, sinds: 2018, medewerkers: '10–18', uurtarief: '€ 54 – € 66',
      reactie: '< 4 uur', kvk: '71 29 84 16', btw: true, vca: true, garantie: '12 jaar op panelen',
      specialisme: ['Zonnepanelen', 'Thuisbatterijen', 'Warmtepompen', 'Laadpalen'],
      over: 'Installateur voor verduurzaming. We rekenen altijd eerst je dak en je verbruik door — als panelen bij jou niet uit kunnen, zeggen we dat gewoon.',
      wijken: ['Almere', 'Lelystad', 'Amsterdam Zuidoost', 'Hilversum', 'Huizen'],
      keurmerken: ['Zonnekeur', 'VCA*', 'ISDE-adviseur']
    },
    {
      id: 'sleutelwacht', naam: 'Sleutelwacht 24', initialen: 'S2',
      vak: 'slotenmaker', vakLabel: 'Slotenmaker', plaats: 'Rotterdam', straal: 35,
      score: 4.3, aantal: 407, sinds: 2015, medewerkers: '5–8', uurtarief: '€ 60 – € 85',
      reactie: '< 20 min', kvk: '63 11 90 28', btw: true, vca: false, garantie: '2 jaar op cilinders',
      specialisme: ['Buitengesloten', 'Inbraakschade', 'SKG-cilinders', 'Meerpuntssluitingen'],
      over: 'Dag en nacht bereikbaar voor buitensluiting en inbraakschade. Vaste voorrijkosten die we vooraf noemen — geen bedragen die onderweg ineens veranderen.',
      wijken: ['Rotterdam', 'Schiedam', 'Vlaardingen', 'Spijkenisse', 'Ridderkerk'],
      keurmerken: ['SKG-erkend', 'Politiekeurmerk Veilig Wonen']
    },
    {
      id: 'verhuisduo', naam: 'Het Verhuisduo', initialen: 'HV',
      vak: 'verhuizen', vakLabel: 'Verhuisbedrijf', plaats: 'Nijmegen', straal: 120,
      score: 4.9, aantal: 143, sinds: 2021, medewerkers: '2–4', uurtarief: '€ 35 – € 48',
      reactie: '< 6 uur', kvk: '83 57 04 62', btw: true, vca: false, garantie: 'Inboedel verzekerd tot € 50.000',
      specialisme: ['Woningverhuizing', 'Verhuislift', 'Inpakservice', 'Opslag'],
      over: 'Twee vaste verhuizers met een eigen bus en lift. We werken op uurbasis met een vaste maximumprijs, zodat je nooit voor een verrassing staat.',
      wijken: ['Nijmegen', 'Arnhem', 'Wijchen', 'Cuijk', 'Oss', 'Venlo'],
      keurmerken: ['Erkend Verhuizer', 'Inboedelverzekering inbegrepen']
    }
  ]);

  var REVIEWS = [
    { score: 5, tekst: 'Binnen drie uur had ik vier reacties. De schilder die het werd, kwam de volgende dag al kijken en heeft de hal en het trappenhuis strak afgeleverd. Geen verrassingen achteraf.', naam: 'Marieke H.', plaats: 'Utrecht', klus: 'Binnenschilderwerk, 2 ruimtes', init: 'MH' },
    { score: 5, tekst: 'Ik had geen idee wat een dakkapel mocht kosten. Door drie offertes naast elkaar te leggen zag ik meteen waar het verschil zat. Uiteindelijk 1.400 euro onder de eerste prijs uitgekomen.', naam: 'Ruud van D.', plaats: 'Apeldoorn', klus: 'Dakkapel plaatsen', init: 'RD' },
    { score: 4, tekst: 'Prima platform. Eén vakman reageerde niet meer na het eerste bericht, maar de andere twee waren top. De loodgieter die het werd heeft de lekkage dezelfde dag gefikst.', naam: 'Sanne B.', plaats: 'Haarlem', klus: 'Spoedlekkage keuken', init: 'SB' },
    { score: 5, tekst: 'Wat ik fijn vond: je ziet meteen wie er echt in de buurt zit. Geen callcenter uit het hele land, gewoon een hovenier uit het dorp naast me.', naam: 'Peter K.', plaats: 'Dalfsen', klus: 'Tuin opnieuw aanleggen', init: 'PK' },
    { score: 5, tekst: 'Als klusbedrijf haal ik hier ongeveer de helft van mijn werk vandaan. De aanvragen zijn serieus — mensen die echt een offerte willen, niet even rondkijken.', naam: 'Erwin M.', plaats: 'Tilburg', klus: 'Vakman sinds 2022', init: 'EM' },
    { score: 5, tekst: 'Vaste prijs per maand, geen gedoe met losse leads kopen. Dat maakt het makkelijk rekenen. Ik weet precies wat het me kost om aan een klus te komen.', naam: 'Ilse de G.', plaats: 'Breda', klus: 'Stukadoor, Pro-abonnement', init: 'IG' }
  ];

  /* Leads in het vakman-dashboard */
  var LEADS = [
    { id: 'A-8841', titel: 'Woonkamer en hal schilderen (48 m²)', cat: 'schilderwerk', icon: 'paint', plaats: 'Utrecht Oost', afstand: '3,2 km', budget: '€ 1.500 – € 2.500', wanneer: 'Binnen 2 weken', nieuw: true,  tijd: '12 min geleden', reacties: 0, naam: 'M. Hoogland',   toelichting: 'Woonkamer (28 m²) en hal met trapgat. Muren zijn al gesausd maar er zitten scheurtjes. Plafonds mogen ook mee. Kozijnen binnen: 4 stuks.' },
    { id: 'A-8838', titel: 'Houtrot kozijnen voorgevel herstellen', cat: 'schilderwerk', icon: 'hammer', plaats: 'Nieuwegein', afstand: '9,8 km', budget: '€ 800 – € 1.500', wanneer: 'Deze maand', nieuw: true, tijd: '48 min geleden', reacties: 1, naam: 'F. el Amrani', toelichting: 'Twee kozijnen aan de voorzijde hebben houtrot onderin. Woning uit 1974. Graag herstellen en meteen in de verf.' },
    { id: 'A-8830', titel: 'Buitenschilderwerk vrijstaande woning', cat: 'schilderwerk', icon: 'paint', plaats: 'Zeist', afstand: '11,4 km', budget: '€ 4.000 – € 7.500', wanneer: 'Voorjaar 2027', nieuw: false, tijd: '3 uur geleden', reacties: 2, naam: 'J. Bergsma', toelichting: 'Vrijstaand huis, alle kozijnen en boeidelen rondom. Laatste beurt was 2019. Steiger mag in de offerte meegenomen worden.' },
    { id: 'A-8822', titel: 'Slaapkamers sauzen + behang verwijderen', cat: 'schilderwerk', icon: 'paint', plaats: 'Houten', afstand: '14,1 km', budget: '€ 600 – € 1.200', wanneer: 'Zo snel mogelijk', nieuw: false, tijd: 'Gisteren', reacties: 4, naam: 'A. Visser', toelichting: 'Drie slaapkamers, oud behang eraf en strak sauzen. Huis is leeg, dus je kunt doorwerken.' },
    { id: 'A-8814', titel: 'Trappenhuis VvE schilderen (3 lagen)', cat: 'schilderwerk', icon: 'building', plaats: 'Utrecht West', afstand: '5,6 km', budget: '€ 2.500 – € 4.000', wanneer: 'In overleg', nieuw: false, tijd: '2 dagen geleden', reacties: 3, naam: 'VvE Bellamystraat', toelichting: 'Gemeenschappelijk trappenhuis van een klein VvE-complex. Offerte graag gespecificeerd, wordt in de ledenvergadering besproken.' }
  ];

  /* Offertes in het klant-dashboard */
  var OFFERTES = [
    { pro: 'Van den Berg Schilderwerken', init: 'VB', score: 4.9, aantal: 187, bedrag: '€ 1.840', excl: 'incl. btw en materiaal', start: 'Week 41', duur: '3 werkdagen', bericht: 'Dag Marieke, ik ben woensdag in de buurt en kan dan even langskomen om op te meten. De prijs hieronder is een richtprijs op basis van je foto\'s — na het opmeten zet ik hem vast.', status: 'nieuw', tijd: '2 uur geleden' },
    { pro: 'Schildersbedrijf Kroon', init: 'SK', score: 4.6, aantal: 92, bedrag: '€ 2.150', excl: 'incl. btw, materiaal apart', start: 'Week 39', duur: '2–3 werkdagen', bericht: 'Goedemiddag, wij kunnen al volgende week starten. Materiaal reken ik door tegen inkoop, dat scheelt meestal zo\'n 15%.', status: 'nieuw', tijd: '5 uur geleden' },
    { pro: 'Afwerking Noord', init: 'AN', score: 4.8, aantal: 134, bedrag: '€ 1.695', excl: 'incl. btw en materiaal', start: 'Week 43', duur: '3 werkdagen', bericht: 'Hallo, bedankt voor de aanvraag. Scheurtjes in de muur vullen we eerst met een weefsel, anders komen ze binnen een jaar terug. Dat zit bij de prijs in.', status: 'gelezen', tijd: 'Gisteren' }
  ];

  var PLANS = [
    {
      id: 'start', naam: 'Starter', maand: 0, jaar: 0, vast: true,
      pitch: 'Om te kijken of het werkt. Geen abonnement, je betaalt per klus die je binnenhaalt.',
      cta: 'Gratis profiel maken', primair: false,
      punten: [
        { t: 'Bedrijfsprofiel met foto\'s en reviews', ok: true },
        { t: 'Onbeperkt klussen bekijken in je regio', ok: true },
        { t: '3 gratis reacties per maand', ok: true },
        { t: 'Daarna € 14 per reactie', ok: true },
        { t: 'Voorrang in de zoekresultaten', ok: false },
        { t: 'Vakmaat-keurmerk op je profiel', ok: false },
        { t: 'Eigen accountmanager', ok: false }
      ]
    },
    {
      id: 'pro', naam: 'Pro', maand: 89, jaar: 890, vast: false,
      pitch: 'Voor de zzp\'er of kleine ploeg die structureel werk uit de regio wil halen.',
      cta: 'Start met Pro', primair: true, flag: 'Meest gekozen',
      punten: [
        { t: 'Alles uit Starter', ok: true },
        { t: 'Onbeperkt reageren op klussen', ok: true },
        { t: 'Tot 3 vakgebieden en 40 km bereik', ok: true },
        { t: 'Direct bericht sturen aan de klant', ok: true },
        { t: 'Voorrang in de zoekresultaten', ok: true },
        { t: 'Vakmaat-keurmerk na 5 reviews', ok: true },
        { t: 'Eigen accountmanager', ok: false }
      ]
    },
    {
      id: 'bedrijf', naam: 'Bedrijf', maand: 229, jaar: 2290, vast: false,
      pitch: 'Voor bedrijven met meerdere ploegen die hun agenda het hele jaar vol willen houden.',
      cta: 'Plan een gesprek', primair: false,
      punten: [
        { t: 'Alles uit Pro', ok: true },
        { t: 'Onbeperkt vakgebieden en heel Nederland', ok: true },
        { t: 'Tot 10 medewerkers op één account', ok: true },
        { t: 'Uitgelicht op categoriepagina\'s', ok: true },
        { t: 'API-koppeling met je eigen planning', ok: true },
        { t: 'Maandelijkse regio-rapportage', ok: true },
        { t: 'Eigen accountmanager', ok: true }
      ]
    }
  ];

  var FAQ_PRO = [
    { v: 'Zit ik ergens aan vast?', a: 'Nee. Maandabonnementen zeg je op per maand op, met één maand opzegtermijn. Bij een jaarabonnement betaal je vooruit en krijg je twee maanden cadeau; die loopt een jaar en stopt daarna vanzelf als je niets doet.' },
    { v: 'Wat als ik geen enkele klus binnenhaal?', a: 'Haal je in je eerste twee maanden Pro geen enkele opdracht binnen, dan krijg je die maanden terug. Voorwaarde is wel dat je profiel compleet is en je op minstens tien klussen hebt gereageerd — anders kunnen we er niets van zeggen.' },
    { v: 'Hoeveel klussen kan ik verwachten in mijn regio?', a: 'Dat verschilt per vak en per plaats. Vul je postcode en vakgebied in op de aanmeldpagina en je ziet direct hoeveel aanvragen er de afgelopen drie maanden in jouw straal zijn geplaatst. Geen verkooppraatje: gewoon de cijfers.' },
    { v: 'Betaal ik per lead, zoals bij andere platformen?', a: 'Alleen als je dat wilt. In Starter betaal je per reactie. In Pro en Bedrijf betaal je een vast bedrag per maand en reageer je onbeperkt — dan weet je vooraf wat een opdracht je maximaal kost.' },
    { v: 'Hoe weten jullie of een aanvraag echt is?', a: 'Elke klus wordt gecontroleerd op telefoonnummer en e-mail, en we filteren dubbele aanvragen eruit. Blijkt een klus toch nep of al vergeven, dan meld je dat met één klik en crediteren we je reactie.' },
    { v: 'Mag ik mijn eigen tarieven bepalen?', a: 'Vanzelfsprekend. Vakmaat bemiddelt niet in de prijs en neemt geen commissie over je opdracht. Wat jij met de klant afspreekt, blijft tussen jullie.' }
  ];

  var FAQ_KLANT = [
    { v: 'Wat kost het mij als particulier?', a: 'Niets. Je klus plaatsen, offertes ontvangen en vergelijken is en blijft gratis. Vakbedrijven betalen voor hun abonnement, jij niet.' },
    { v: 'Moet ik kiezen uit de offertes die ik krijg?', a: 'Nee. Je zit nergens aan vast. Bevalt geen van de offertes, dan laat je de klus gewoon verlopen. Je kunt ook eerst vrijblijvend een paar vragen stellen via het berichtensysteem.' },
    { v: 'Hoe snel krijg ik reactie?', a: 'Bij de meeste klussen komen de eerste reacties binnen een paar uur. Gemiddeld heb je binnen 24 uur drie tot vijf offertes. Bij spoedklussen zoals een lekkage ligt dat vaak op minder dan een uur.' },
    { v: 'Worden mijn gegevens meteen gedeeld?', a: 'Je adres en telefoonnummer zie alleen jij, totdat je zelf een vakman toelaat tot je klus. Tot die tijd zien bedrijven alleen je wijk, de omschrijving en de foto\'s.' },
    { v: 'Zijn de vakmensen gecontroleerd?', a: 'Elk bedrijf wordt bij aanmelding gecontroleerd op KvK-inschrijving en btw-nummer. Certificaten zoals VCA of Sterkin controleren we handmatig voordat ze op het profiel verschijnen. Reviews kunnen alleen worden geplaatst door klanten met een afgeronde klus.' },
    { v: 'Wat als het misgaat met een vakman?', a: 'Meld het bij ons via je klus. We bemiddelen en vragen beide kanten om hun verhaal. Komen jullie er niet uit, dan kun je terecht bij de geschillenregeling waar aangesloten bedrijven aan meedoen.' }
  ];

  root.VM = {
    categories: CATEGORIES,
    pros: PROS,
    reviews: REVIEWS,
    leads: LEADS,
    offertes: OFFERTES,
    plans: PLANS,
    faqPro: FAQ_PRO,
    faqKlant: FAQ_KLANT
  };
})(window);
