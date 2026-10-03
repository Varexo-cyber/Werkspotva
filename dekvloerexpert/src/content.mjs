// Tekstbouwstenen voor de plaatspagina's.
//
// Elke plaatspagina wordt opgebouwd uit varianten die per plaats deterministisch
// gekozen worden (zelfde plaats = altijd dezelfde tekst, dus geen wisselende
// inhoud tussen builds). Daarnaast komen er echte plaatsgegevens in: gemeente,
// provincie, buurkernen, het type bebouwing en eigen rekenvoorbeelden.
// Zo verschillen pagina's ook binnen één gemeente duidelijk van elkaar.
import { site } from './config.mjs';

export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  // Eindmix (murmur3 fmix32): FNV alleen heeft zwakke lage bits, en die gebruiken we voor `% n`.
  h ^= h >>> 16; h = Math.imul(h, 0x85ebca6b); h ^= h >>> 13; h = Math.imul(h, 0xc2b2ae35); h ^= h >>> 16;
  return h >>> 0;
}
export const pick = (arr, seed, key) => arr[hash(seed + '|' + key) % arr.length];
export function pickN(arr, n, seed, key) {
  return [...arr].map((v, i) => [hash(seed + key + i), v]).sort((a, b) => a[0] - b[0]).slice(0, n).map(x => x[1]);
}
const fill = (s, v) => s.replace(/\{(\w+)\}/g, (_, k) => v[k] ?? '');

export function listNl(items) {
  if (items.length <= 1) return items.join('');
  return items.slice(0, -1).join(', ') + ' en ' + items[items.length - 1];
}

// ───────────────────────── Hero
export const H1_SUB = [
  'kaarsrecht en legklaar',
  'de basis onder uw nieuwe vloer',
  'strak gelegd, vakkundig afgewerkt',
  'voor particulier en aannemer',
  'snel ingepland, netjes opgeleverd',
  'op de juiste dikte en hoogte',
  'van zandaanvoer tot legklare vloer',
  'een sterke basis voor elke afwerking',
];

export const LEADS = [
  'Een strakke, duurzame dekvloer in {in}. Wij leggen zandcement voor nieuwbouw, verbouw en utiliteit, met eigen materieel en een vast aanspreekpunt.',
  'Laat uw zandcement dekvloer in {in} leggen door een team dat dagelijks niets anders doet. Vlak, op hoogte en klaar voor tegels, pvc, parket of een gietvloer.',
  'Gaat u bouwen of verbouwen in {in}? Wij brengen de mortel, pompen hem op zijn plek en leveren een vloer op waar de vloerenlegger direct mee verder kan.',
  'Van een uitbouw van twintig vierkante meter tot een complete bedrijfsvloer: in {in} en de rest van {province} leggen wij zandcement dekvloeren die vlak blijven.',
  'Particulier of aannemer, eengezinswoning of kantoor: in {in} krijgt u een scherpe prijs vooraf en een dekvloer die volgens afspraak klaarligt.',
  'Een dekvloer is de laag die u later niet meer ziet, maar overal terugvoelt. In {in} zorgen wij dat die laag klopt: op dikte, op hoogte en zonder holle plekken.',
  'Snel ingepland, schoon gewerkt en kaarsrecht afgereid. Zo leggen wij zandcement dekvloeren in {in}, voor woningen én bedrijfspanden.',
  'Wij leggen zandcement dekvloeren in {in} en omgeving. Op isolatie, op vloerverwarming of direct op beton, altijd met advies vooraf over dikte en droogtijd.',
];

// ───────────────────────── Bebouwing (uit kolom city_type)
// Sleutel = het eerste woord van city_type in de CSV.
export const TYPE_PARAS = {
  nieuwbouwwijken: [
    'In {name} gaat een groot deel van ons werk naar nieuwbouwwoningen en uitbouwen. Daar ligt de dekvloer meestal op een laag isolatie en vaak ook op vloerverwarming. Het draait dan om één ding: overal dezelfde dikte boven de leidingen, zodat de vloer gelijkmatig opwarmt en niet scheurt.',
    'Rond {name} bouwen veel gezinnen een uitbouw of nemen ze een nieuwbouwwoning casco op. De dekvloer is dan een van de eerste klussen binnen. Wij stemmen de hoogte af op de stelpeilen van de aannemer, zodat kozijnen, deuren en trap later precies passen.',
    'Nieuwbouw en uitbouwen vormen in {name} het grootste deel van de vraag. Een nieuwe woning wordt vaak opgeleverd met alleen een ruwe betonvloer; wij maken daar met zandcement een vlakke, legklare ondergrond van, ook in combinatie met vloerverwarming.',
  ],
  historische: [
    'In {name} werken we veel in oudere panden. Daar is de bestaande vloer zelden recht, en dan is een zandcement dekvloer de manier om alles weer op één niveau te krijgen. We meten vooraf de hoogteverschillen in, zodat u weet hoe dik de vloer plaatselijk wordt.',
    'Wie in {name} een herenhuis of jaren-dertigwoning renoveert, komt bijna altijd een scheve of verzakte vloer tegen. Wij leggen daar een dekvloer die de verschillen opvangt. Waar nodig met vezels, zodat ook een dikkere laag niet gaat scheuren.',
    'Renovatie is in {name} een vak apart: smalle gangen, trappen, soms geen plek voor een pomp voor de deur. Wij werken met slangen die tientallen meters ver en meerdere verdiepingen hoog kunnen, zodat de mortel toch netjes op zijn plek komt.',
  ],
  bedrijfspanden: [
    'In en rond {name} leggen we veel vloeren in bedrijfspanden, garages en utiliteitsgebouwen. Daar telt draagvermogen meer dan in een woning. Met een verharder of een dikkere laag maken we de vloer geschikt voor heftrucks, stellingen of zware machines.',
    'Bedrijfsruimtes in {name} vragen om een vloer die tegen een stootje kan. Wij adviseren de juiste dikte en sterkteklasse voor het gebruik, en plannen de uitvoering zo dat uw bedrijf er zo kort mogelijk last van heeft.',
    'Voor garages, werkplaatsen en kantoren in {name} leggen we dekvloeren die zowel vlak als slijtvast zijn. Grote oppervlaktes werken we in vakken af, met dilatatievoegen op de goede plekken, zodat de vloer zonder scheuren kan krimpen.',
  ],
  appartementencomplexen: [
    'In {name} doen we veel werk in appartementen en hoogbouw. Daar komen een paar dingen bij kijken: geluidsisolatie naar de buren, een vloer die volledig vrij ligt van de wanden, en mortel die vijf hoog nog op de juiste plek moet komen. Dat laatste lossen we op met een krachtige mixer en lange slangen.',
    'Een appartement in {name} verbouwen betekent vaak een zwevende dekvloer: los van de constructie, op een isolerende laag. Zo blijft contactgeluid binnen. Wij leggen die opbouw volgens de eisen van de VvE en het Bouwbesluit.',
    'Bij appartementencomplexen in {name} werken we graag samen met de aannemer en de VvE. We plannen het pompen buiten de drukke uren en beschermen trappenhuis en lift, zodat medebewoners er zo min mogelijk van merken.',
  ],
  vrijstaande: [
    'Rond {name} staan veel vrijstaande woningen, en er worden nog volop kavels bebouwd. Grote vloeroppervlaktes in één keer gieten vraagt om goede planning en voldoende mankracht. Wij komen met een team dat zo\'n vloer in één dag kan leggen, zodat er geen naden ontstaan.',
    'Bouwt u in {name} op een eigen kavel of zet u er een aanbouw tegen? Wij denken mee in de opbouw: hoeveel isolatie, wel of geen vloerverwarming, en welke dikte de dekvloer dan moet krijgen om op het juiste peil uit te komen.',
    'In {name} zien we veel vrijstaande woningen en aanbouwen. Daar ligt de dekvloer vaak op een dikke laag isolatie en vloerverwarming. Wij zorgen voor een gelijkmatige dekking boven de leidingen en een vlakheid die klopt voor grote tegels.',
  ],
};
export const typeKey = cityType => (cityType.split(/[ ,]/)[0] || 'nieuwbouwwijken');

// ───────────────────────── Provincie
export const PROVINCE_PARAS = {
  'Noord-Holland': [
    'Van de duinstreek tot de droogmakerijen: in Noord-Holland verschilt de ondergrond per dorp. Bij de inmeting kijken we daarom ook naar de constructievloer, zodat de opbouw van isolatie en dekvloer klopt.',
    'In Noord-Holland bouwen we vaak op slappe veen- en kleigrond. Woningen staan daar meestal op palen, maar de begane grondvloer werkt soms nog na. Een goed losgehouden, zwevende dekvloer met randisolatie vangt die kleine bewegingen op zonder te scheuren.',
    'Noord-Holland is een provincie van polders en oude binnensteden. Wij leggen er dekvloeren in alles van een Zaans houten huis tot een nieuwbouwwijk aan de rand van de stad, en houden steeds rekening met de vaak vochtige kruipruimte eronder.',
  ],
  'Zuid-Holland': [
    'In Zuid-Holland staan veel woningen uit de jaren vijftig tot zeventig die nu verduurzaamd worden. Vaak gaat dat samen met vloerverwarming en een nieuwe dekvloer: één ingreep, en het huis is klaar voor een warmtepomp.',
    'In Zuid-Holland ligt het grondwater hoog en zijn kruipruimtes vaak vochtig. Daarom adviseren we hier vaak isolatie onder de dekvloer. Dat houdt de vloer warmer, en het scheelt ook in de stookkosten.',
    'Zuid-Holland is dichtbebouwd: veel renovatie in vooroorlogse wijken, veel appartementen en veel bedrijfsruimte. Wij komen daar met compact materieel, zodat we ook in smalle straten kunnen werken.',
  ],
  'Utrecht': [
    'In de regio Utrecht wordt veel verbouwd en uitgebouwd, vaak met weinig ruimte op straat. Wij pompen de mortel over lange afstand, zodat de mixer niet pal voor de deur hoeft te staan.',
    'De provincie Utrecht combineert historische binnensteden met grote nieuwbouwwijken. Van een monumentaal pand aan de gracht tot een rij nieuwbouwwoningen: de opbouw van de vloer verschilt steeds, en die stemmen wij per project af.',
    'In Utrecht en omgeving werken we op klei langs de rivieren en op zand richting de Heuvelrug. De dekvloer zelf verandert daar niet door, maar de opbouw eronder soms wel, en daar adviseren we vooraf over.',
  ],
  'Noord-Brabant': [
    'Brabantse aannemers werken graag met vaste partners. Wij passen ons aan op de bouwplanning en leveren de dekvloer op het moment dat de installateur klaar is, niet een week later.',
    'Noord-Brabant groeit hard, met veel nieuwbouw en bedrijventerreinen. We leggen hier zowel woningvloeren als grote utiliteitsvloeren, en plannen zo dat de volgende partij op de bouw zo snel mogelijk verder kan.',
    'In Brabant zien we veel vrijstaande woningen, verbouwde boerderijen en bedrijfshallen. Elk van die panden vraagt een andere dikte en sterkte. Dat bespreken we vooraf, zodat de prijs klopt met wat er echt nodig is.',
  ],
  'Gelderland': [
    'In Gelderland zien we veel particulieren die een woning of schuur zelf verbouwen. Wij denken mee over de volgorde van de klussen, zodat de dekvloer op het juiste moment in de planning valt.',
    'Gelderland loopt van de rivierklei in de Betuwe tot het zand van de Veluwe. We leggen hier veel vloeren in verbouwde boerderijen en schuurwoningen, waar grote open ruimtes om een strak en naadloos resultaat vragen.',
    'In Gelderland werken we in grote steden als Arnhem en Nijmegen en in de dorpen eromheen. Juist bij verbouwde boerderijen en oudere panden helpt een goede inmeting vooraf om verrassingen in dikte en kosten te voorkomen.',
  ],
  'Overijssel': [
    'In Overijssel werken we in nieuwe wijken én in karakteristieke boerderijen en oude stadswoningen. Juist bij oudere panden meten we goed in, zodat de vloer aansluit op drempels en trappen.',
    'In Overijssel komen we veel verbouwde fabriekspanden en lofts tegen, vooral in Twente. Daar liggen vaak oude betonvloeren met grote hoogteverschillen. Een zandcement dekvloer trekt dat weer recht.',
    'Overijssel combineert steden als Zwolle en Enschede met veel landelijke bebouwing. We plannen onze ploegen zo dat we ook voor een kleinere vloer op het platteland op korte termijn kunnen komen.',
  ],
  'Groningen': [
    'Rond de stad Groningen wordt flink bijgebouwd. Wij leggen er dekvloeren in eengezinswoningen, appartementen en studentenhuisvesting, en houden ook in drukke wijken de overlast beperkt.',
    'In Groningen speelt de versterkingsopgave een grote rol: veel woningen worden versterkt of vervangen door nieuwbouw. Wij leggen de dekvloeren in zowel vervangende nieuwbouw als in versterkte bestaande woningen.',
    'De provincie Groningen kent veel kleigrond en oude boerderijen naast de nieuwbouw in en rond de stad. Bij de vloeren die wij hier leggen letten we extra op randisolatie, zodat de vloer los blijft van de muren.',
  ],
  'Friesland': [
    'In Friesland liggen dorpen soms ver uit elkaar. Daarom bundelen we projecten per regio, zodat ook een vloer in een kleiner dorp snel aan de beurt is.',
    'Friesland is waterrijk, en veel woningen staan op klei of veen. We leggen hier vloeren in nieuwbouw, maar ook in verbouwde stelpboerderijen, waar grote vloervlakken in één keer gelegd moeten worden.',
    'In Friesland werken we vaak voor particulieren die zelf (ver)bouwen. Een heldere planning is dan belangrijk: wanneer kan de vloerverwarming erin, wanneer komen wij, en wanneer kan de tegelzetter beginnen.',
  ],
  'Drenthe': [
    'In Drentse dorpen bouwen veel mensen zelf, op een eigen kavel of als verbouwing van een oude boerderij. Wij geven advies over de complete vloeropbouw, van isolatie tot afwerking.',
    'In Drenthe is er ruimte om te bouwen, dus we zien er veel vrijstaande woningen, kavelbouw en grotere aanbouwen. Op de zandgrond ligt de dekvloer vaak op een dikke isolatielaag met vloerverwarming.',
    'Drenthe vraagt om een team dat ook voor een vloer in een kleinere kern graag de weg op gaat. We combineren ritten in de regio, zodat u niet onnodig lang hoeft te wachten.',
  ],
  'Flevoland': [
    'De wijken in Flevoland zijn grotendeels na 1970 gebouwd. Veel van die woningen worden nu verbouwd of uitgebreid, vaak met vloerverwarming en een nieuwe dekvloer in de uitbouw.',
    'Flevoland is de jongste provincie van Nederland en er wordt nog volop gebouwd. Denk aan zelfbouwkavels, nieuwe wijken en bedrijventerreinen. Op de polderklei kiezen opdrachtgevers hier vaak voor een flinke isolatielaag onder de dekvloer.',
    'In Flevoland leggen we veel vloeren in nieuwbouw en zelfbouw. Zelfbouwers vinden het prettig dat ze één aanspreekpunt hebben en vooraf precies weten welke dikte en opties nodig zijn.',
  ],
  'Zeeland': [
    'Op de Zeeuwse eilanden plannen we ritten slim, zodat we ook voor een vloer in een kleine kern geen dagen kwijt zijn aan reistijd.',
    'In Zeeland is de lucht door de zee vaak vochtig. Daardoor droogt een dekvloer er gemiddeld wat langzamer dan in het binnenland. Heeft u haast, dan is een droogtijdversneller daar zeker het overwegen waard.',
    'Zeeland combineert historische stadjes met nieuwbouw en recreatiewoningen. Voor vakantiewoningen die snel verhuurklaar moeten zijn, plannen we de dekvloer met versneller, zodat de afwerking eerder kan beginnen.',
  ],
  'Limburg': [
    'In Zuid- en Noord-Limburg zien we veel verbouwingen van oudere woningen en boerderijen. We controleren vooraf of de bestaande vloer het extra gewicht van een nieuwe dekvloer kan dragen.',
    'In Limburg renoveren we veel oudere woningen, onder meer in de voormalige mijnstreek. De oude vloeren zijn daar vaak ongelijk en dun. Een nieuwe zandcement dekvloer geeft weer een vlakke en stevige basis.',
    'Limburg heeft heuvels, löss en mergel, en veel karakteristieke oude panden. Wij leggen er vloeren in renovaties en nieuwbouw, en houden bij oudere woningen goed in de gaten hoeveel extra gewicht de constructie kan dragen.',
  ],
};

// ───────────────────────── Omgeving / gemeente
export const AREA_PARAS = {
  deel: [
    '{name} hoort bij de gemeente {muni}. We combineren ritten in de regio, zodat we ook een kleinere vloer hier goed kunnen inplannen.',
    'Een vloer in {name} plannen we waar het kan samen met andere projecten in {muni}. Dat houdt de wachttijd kort en de reistijd beperkt.',
    'Of uw woning nu in {name} staat of in een andere wijk van {muni}: de route, het parkeren voor de mixer en de afvoer van restmateriaal regelen wij.',
  ],
  kern: [
    '{name} valt onder de gemeente {muni}. Wij werken in alle kernen van de gemeente, en een vloer in {name} plannen we vaak samen met andere klussen in de buurt.',
    'In {name}, net als in de rest van {muni}, komen wij met eigen mixer en pomp. Daardoor zijn we niet afhankelijk van een betoncentrale in de buurt.',
    'Voor {name} en de andere kernen van {muni} combineren we waar mogelijk meerdere klussen op één dag. Dat scheelt reistijd, en die winst geven we door in de planning.',
  ],
  stad: [
    'We leggen vloeren in heel {name}, van de binnenstad tot de nieuwbouwwijken aan de rand. In een oude kern kijken we vooraf waar de mixer kan staan en hoe ver we moeten pompen.',
    'Wij leggen dekvloeren in heel {name}. Voor we komen, regelen we de praktische kant: waar de mixer kan staan, hoe ver we moeten pompen en hoe we de werkplek schoon houden.',
    'Of uw project nu in het centrum van {name} ligt of aan de rand van de gemeente: wij komen met ons eigen materieel en leveren de vloer op zoals afgesproken.',
  ],
  wijk: [
    'Een vloer in {name} plannen we waar het kan samen met andere projecten in {muni}. Zo houden we de wachttijd kort.',
    'In {name} hebben we te maken met alles van portiekflats tot nieuwbouw. We passen de aanpak aan op het pand: met slangen naar boven, of direct vanaf de straat de woning in.',
    'Wij werken in heel {muni}, ook in {name}. Parkeren voor de mixer en eventuele ontheffingen bespreken we vooraf, zodat de dag zelf soepel verloopt.',
  ],
};

export const ADVICE_INTRO = [
  'Ons advies voor projecten in {name}:',
  'Wat wij in {name} vaak aanraden:',
  'Een tip uit de praktijk in {name}:',
  'Goed om te weten voor {name}:',
];

// ───────────────────────── Prijs
export const PRICE_INTROS = [
  'Wat een zandcement dekvloer in {name} kost, hangt vooral af van de oppervlakte, de dikte en eventuele opties zoals vezels of een versneller. Om u een idee te geven, staan hieronder drie rekenvoorbeelden.',
  'De prijs per m² wordt lager naarmate de vloer groter is, en hoger naarmate hij dikker moet. Hieronder ziet u drie voorbeelden van vloeren zoals wij ze in en rond {name} leggen.',
  'Wilt u alvast weten waar u ongeveer op uitkomt? Deze voorbeelden geven een indicatie voor een zandcement dekvloer in {name}. Na een korte inmeting krijgt u een vaste prijs.',
  'Wat de prijs van een dekvloer in {name} bepaalt, ziet u het best aan een paar voorbeelden. Daarna komen we graag langs voor een inmeting en een vaste prijs.',
];

// Rekenvoorbeelden per bebouwingstype: [omschrijving, min m², max m², dikte cm]
export const EXAMPLES = {
  nieuwbouwwijken: [['Uitbouw achter de woning', 12, 28, 6], ['Begane grond nieuwbouwwoning', 42, 62, 7], ['Begane grond + eerste verdieping', 85, 125, 6], ['Garage of berging', 15, 24, 5]],
  historische: [['Woonkamer en keuken', 30, 48, 6], ['Bovenverdieping herenhuis', 45, 70, 5], ['Complete begane grond na renovatie', 55, 85, 7], ['Badkamer en toilet', 6, 12, 5]],
  bedrijfspanden: [['Kantoorruimte', 120, 260, 6], ['Bedrijfshal / werkplaats', 300, 900, 8], ['Garagebox', 18, 30, 7], ['Showroom', 150, 350, 6]],
  appartementencomplexen: [['Appartement, zwevende vloer', 55, 90, 6], ['Penthouse met vloerverwarming', 90, 140, 7], ['Algemene ruimtes en entree', 40, 80, 5], ['Studio of starterswoning', 30, 45, 6]],
  vrijstaande: [['Vrijstaande woning, begane grond', 90, 150, 7], ['Aanbouw of serre', 18, 35, 6], ['Mantelzorgwoning', 40, 60, 6], ['Bijgebouw of schuurwoning', 50, 110, 7]],
};

export function priceRange(m2, cm) {
  const { base5cm, perExtraCm, minimumOrder } = site.price;
  const extra = Math.max(0, cm - 5);
  const lo = (base5cm[0] + extra * perExtraCm[0]) * m2;
  const hi = (base5cm[1] + extra * perExtraCm[1]) * m2;
  const r = v => Math.round(Math.max(v, minimumOrder) / 10) * 10;
  return [r(lo), r(hi)];
}
export const euro = n => '€ ' + n.toLocaleString('nl-NL');
export function rangeText([lo, hi]) {
  if (hi <= site.price.minimumOrder) return `${euro(site.price.minimumOrder)} (minimumbedrag)`;
  return `${euro(lo)} – ${euro(hi)}`;
}

// ───────────────────────── Opties per bebouwingstype
export const OPTION_FOCUS = {
  nieuwbouwwijken: ['krimpnetten', 'droogtijdversneller', 'randisolatie'],
  historische: ['vezels', 'duremit', 'droogtijdversneller'],
  bedrijfspanden: ['verharder', 'vezels', 'vlevopol'],
  appartementencomplexen: ['randisolatie', 'droogtijdversneller', 'krimpnetten'],
  vrijstaande: ['krimpnetten', 'randisolatie', 'duremit'],
};
export const OPTION_WHY = {
  droogtijdversneller: [
    'Moet de afwerking in {name} snel volgen? Met een versneller is de vloer vaak binnen 10 à 15 dagen legklaar, in plaats van na weken wachten.',
    'Een versneller scheelt weken droogtijd. Handig als de tegelzetter of vloerenlegger in {name} al ingepland staat.',
    'Voor wie op een vaste opleverdatum zit: de versneller laat de vloer veel sneller drogen, zonder in te leveren op sterkte.'],
  verharder: [
    'Maakt de toplaag harder en slijtvaster. Aan te raden bij heftrucks, stellingen en garages.',
    'Voor bedrijfsvloeren in {name} die zwaar belast worden: een verharder verhoogt de druksterkte flink.',
    'Rijdt er een auto of heftruck over de vloer? Dan voorkomt een verharder dat de toplaag na een paar jaar gaat stuiven.'],
  vezels: [
    'Kunststof vezels door de specie beperken krimpscheuren, juist in dikkere lagen.',
    'Bij een ongelijke ondergrond, zoals in oudere panden in {name}, geven vezels extra zekerheid tegen scheuren.',
    'Een kleine toevoeging die het risico op haarscheuren tijdens het drogen sterk verkleint.'],
  duremit: [
    'Duremit maakt de vloer sterker én sneller droog, in één toevoeging.',
    'Voor wie een vloer wil die eerder belastbaar is en een hogere sterkteklasse haalt.',
    'Geeft een dichtere, sterkere vloer die sneller klaar is voor de afwerking.'],
  krimpnetten: [
    'Een krimpnet houdt de vloer boven vloerverwarming bij elkaar als hij opwarmt en afkoelt.',
    'Extra stevigheid op isolatie en leidingen. Bij vloerverwarming raden we het in {name} bijna altijd aan.',
    'Een gaas in de dekvloer dat scheuren tegenhoudt. Vooral zinvol op isolatieplaten.'],
  randisolatie: [
    'Een strook langs de wanden houdt de vloer los van muren en kolommen, zodat hij scheurvrij kan werken.',
    'Voorkomt scheuren én geluidsoverdracht naar de buren. Onmisbaar in appartementen.',
    'Bij een zwevende dekvloer hoort randisolatie altijd. Zo kan de vloer uitzetten zonder tegen de muur te drukken.'],
  vlevopol: [
    'Komt de dekvloer direct op een bestaande betonvloer? Vlevopol zorgt voor een sterke hechting tussen oud en nieuw.',
    'Voorkomt holle plekken als de dekvloer dunner wordt gelegd op een oude ondergrond.',
    'Een primer die de hechting verbetert. Handig bij verbouwingen waar weinig hoogte beschikbaar is.'],
};

// ───────────────────────── FAQ (vraag + 2 antwoordvarianten)
export const FAQ_POOL = [
  ['Wat kost een zandcement dekvloer in {name}?', [
    'Een zandcement dekvloer van 5 cm kost gemiddeld {p5} per m², materiaal en aanbrengen inbegrepen. Voor uw project in {name} rekenen we de exacte prijs uit op basis van oppervlakte, dikte en bereikbaarheid.',
    'Voor een vloer van 5 cm rekenen we gemiddeld {p5} per m², inclusief materiaal en aanbrengen. Dikkere vloeren en extra opties maken het iets duurder; grote oppervlaktes juist goedkoper per m². Na een inmeting krijgt u een vaste prijs.',
    'Reken voor een standaard dekvloer van 5 cm op ongeveer {p5} per m² (excl. btw). De precieze prijs hangt af van oppervlakte, dikte, bereikbaarheid en opties. U krijgt hem vooraf, zwart op wit.']],
  ['Hoe lang moet een dekvloer drogen?', [
    'Reken voor zandcement op ongeveer een week per centimeter tot 4 cm dik, en twee weken per centimeter daarboven. In {name} geldt dezelfde regel, al droogt een vloer in de winter of in een slecht geventileerde ruimte langzamer. Een versneller brengt het terug naar 10 à 15 dagen.',
    'Als vuistregel droogt een cementdekvloer ongeveer een week per centimeter, tot 4 cm. Daarboven gaat het langzamer, zo\'n twee weken per extra centimeter. Een vloer van 6 cm heeft dus al snel acht weken nodig. Met een droogtijdversneller kan dat terug naar 10 à 15 dagen.',
    'Zonder toevoegingen rekent u op ongeveer een week per centimeter voor de eerste 4 cm, en daarna twee weken per centimeter. Lopen kan na een à twee dagen al. Voor parket, pvc of tegels moet het restvocht eerst laag genoeg zijn; dat meten we voor u.']],
  ['Hoe snel kunnen jullie in {name} beginnen?', [
    'Meestal kunnen we binnen een à twee weken komen, afhankelijk van de drukte. Heeft u een vaste datum van de aannemer, geef die dan meteen door. Dan houden we er in de planning rekening mee.',
    'We werken landelijk en combineren ritten in de regio, dus vaak is er op korte termijn plek in {name}. Spoed? Bel of app ons, dan kijken we samen wat er kan.']],
  ['Wat is het verschil tussen zandcement en een anhydriet gietvloer?', [
    'Zandcement wordt aangebracht en met de hand afgereid. Het is sterk, vochtbestendig en geschikt voor bijna elke ruimte, ook badkamers en garages. Anhydriet is vloeibaar, egaliseert zichzelf en kan dunner, maar is gevoelig voor vocht en moet vaak geschuurd worden. Wij leggen allebei en adviseren per ruimte.',
    'Een anhydrietvloer is vloeibaar en kan dunner, wat bij vloerverwarming prettig is. Zandcement is robuuster, kan tegen vocht en is in de meeste woningen de voordeligste keuze. Twijfelt u? Wij adviseren eerlijk wat bij uw situatie past.']],
  ['Hoe dik moet een zandcement dekvloer zijn?', [
    'Een zwevende dekvloer op isolatie moet minimaal 5 cm zijn. Ligt er vloerverwarming, dan houden we minimaal 3 à 4 cm dekking boven de leidingen aan. Een hechtende vloer direct op beton kan dunner. Bij de inmeting bepalen we de juiste dikte.',
    'Dat hangt af van de ondergrond. Op isolatie of vloerverwarming is ongeveer 5 à 7 cm gebruikelijk, op een vlakke betonvloer kan het minder. Belangrijker dan de dikte zelf is dat hij overal gelijk is, en dat meten we vooraf uit.']],
  ['Kan ik een zandcement dekvloer ook zelf maken?', [
    'Voor een klein stukje kan dat, maar voor een hele ruimte is het zwaar werk. U moet de juiste mengverhouding aanhouden (ongeveer 1 deel cement op 4 à 5 delen zand), de vloer snel en vlak afreien en voorkomen dat hij te snel uitdroogt. Wij doen een gemiddelde woonkamer in een paar uur, met een gegarandeerd vlak resultaat.',
    'Het kan, maar het verschil zit in de vlakheid en de verdichting. Een te natte of slecht aangedrukte vloer wordt zacht en kan gaan scheuren. Met een mixer, een pomp en ervaring krijgen wij een vloer die echt legklaar is, en dat kost vaak minder dan u denkt.']],
  ['Werken jullie ook voor aannemers in {name}?', [
    'Ja. Een groot deel van ons werk doen we voor aannemers en projectontwikkelaars. We houden ons aan de bouwplanning, leveren volgens de afgesproken sterkteklasse en vlakheid, en factureren overzichtelijk per project.',
    'Zeker. Voor aannemers in en rond {name} zijn we een vaste partner voor de dekvloeren. Eén aanspreekpunt, korte lijnen en een vloer die op tijd klaarligt.']],
  ['Kan de dekvloer op vloerverwarming?', [
    'Ja, zandcement past heel goed bij vloerverwarming. We leggen krimpnetten over de leidingen, zorgen voor genoeg dekking erboven en houden een vaste dikte aan, zodat de vloer gelijkmatig warm wordt. Vloerverwarming laten aanleggen kan bij ons in hetzelfde pakket.',
    'Zeker. Het is zelfs een van de meest gekozen combinaties. Let op dat de vloerverwarming pas volgens een opstookprotocol aan mag als de vloer voldoende is uitgehard. Dat protocol krijgt u van ons mee.']],
  ['Wat moet ik regelen voordat jullie komen?', [
    'De ruimte moet leeg en bezemschoon zijn, met water en stroom in de buurt. Zorg dat leidingen, isolatie en eventuele vloerverwarming al liggen. Wij zetten de hoogtepunten uit, brengen randisolatie aan en nemen de rest mee.',
    'Niet veel. Zorg voor een lege ruimte, een plek waar de mixer kan staan en toegang tot water. Leidingwerk en vloerverwarming moeten klaar zijn. Al het andere nemen wij mee.']],
  ['Hoe lang duurt het leggen zelf?', [
    'Een gemiddelde woning (50 à 80 m²) leggen we in één dag. Grotere oppervlaktes of meerdere verdiepingen plannen we in een paar dagen, in vakken, zodat het resultaat overal even strak is.',
    'Meestal is het in één dag klaar. Na een à twee dagen kunt u er voorzichtig overheen lopen; zwaar belasten en afwerken kan pas als de vloer droog genoeg is.']],
];
export const FAQ_ALWAYS = [0, 1]; // prijs en droogtijd staan op elke pagina

export const NEARBY_TITLES = [
  'Ook actief in de buurt van {name}',
  'Dekvloeren in de omgeving van {name}',
  'Andere plaatsen rond {name}',
  'Wij werken ook in',
];

export function vars(p) {
  return {
    name: p.name, label: p.label, in: p.inLabel, muni: p.muni, province: p.province,
    p5: `${euro(site.price.base5cm[0])} à ${euro(site.price.base5cm[1])}`,
  };
}
export { fill };

// Werkwijze op plaatspagina's: per stap drie formuleringen.
export const STEP_VARIANTS = [
  ['Advies vooraf', [
    'We kijken naar uw situatie in {name} en adviseren de juiste opties, zoals vezels of versnellers.',
    'U vertelt ons wat er in {name} moet gebeuren; wij adviseren over dikte, ondergrond en opties.',
    'Eerst de basis: welke ondergrond, welke dikte en welke afwerking. Waar nodig meten we ter plaatse in.',
  ]],
  ['Heldere prijsopgave', [
    'U ontvangt een scherpe, vrijblijvende prijsopgave. Geen verrassingen achteraf.',
    'Een vaste prijs op papier, met precies wat er gebeurt en wat het kost. Zonder stelposten.',
    'Binnen korte tijd heeft u een offerte die klopt met de werkelijkheid op de bouw.',
  ]],
  ['Uitvoering volgens planning', [
    'Wij schakelen snel, komen afspraken na en werken met modern materieel.',
    'Op de afgesproken dag staan we met mixer, pomp en een vast team voor de deur.',
    'We stemmen de datum af op uw aannemer of installateur, zodat niemand op elkaar hoeft te wachten.',
  ]],
  ['Kaarsrecht en legklaar', [
    'Vlak en waterpas afgewerkt, zodat de vloerenlegger direct aan de slag kan.',
    'U krijgt een vlakke vloer en droogadvies mee, zodat de afwerking op het goede moment kan beginnen.',
    'We ruimen op, laten de werkplek netjes achter en leveren een vloer op die klaar is voor de volgende stap.',
  ]],
];
