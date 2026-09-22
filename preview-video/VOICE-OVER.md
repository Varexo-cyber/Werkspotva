# Vakmaat — voice-overscript bij de previewvideo

Bij `vakmaat-preview.mp4` (1920×1080, 30 fps, 1 min 25 s).
Tijdcodes zijn indicatief — ze komen uit het opnamedraaiboek, niet uit een
frame-voor-frame meting. Inspreektempo: rustig, ongeveer 145 woorden per minuut.

De video heeft ingebrande ondertitels, dus hij werkt ook zonder stem. Gebruik
dit script als je er een voice-over onder wilt, of als toelichting in de mail
naar de klant.

---

**0:00 — Opening**
> Dit is Vakmaat: een platform waar particulieren hun klus neerleggen en
> vakbedrijven daarop reageren met een prijs. Zestien vakgebieden, van
> schilder tot warmtepomp.

**0:06 — Vakmensen achter een account**
> Bedrijfsprofielen zijn niet zomaar openbaar. Wie vakmensen wil bekijken,
> maakt eerst een gratis account aan. Dat houdt de gegevens van aangesloten
> bedrijven weg bij scrapers en concurrenten.

**0:13 — Zoeken en filteren**
> Daarna filter je op vakgebied, beoordeling en certificaten. Elk bedrijf is
> gecontroleerd op KvK en btw-nummer.

**0:20 — Bedrijfsprofiel**
> Op een profiel zie je reviews van afgeronde klussen, de certificaten die we
> handmatig hebben nagekeken, het werkgebied en het uurtarief.

**0:28 — Klus plaatsen**
> Een klus plaatsen gaat in vijf korte stappen. Je kiest een vakgebied en ziet
> meteen wat gangbaar is in dat vak. Daarna de omschrijving, foto's, planning,
> budget en locatie. Je adres blijft verborgen tot je zelf een bedrijf toelaat.
> Rechts loopt een samenvatting mee, zodat je ziet wat bedrijven straks zien.

**0:52 — Offertes vergelijken**
> De reacties komen binnen op één plek. Prijs, startdatum, beoordeling en het
> bericht van de vakman naast elkaar. De klant kiest zelf — en zit nergens aan vast.

**1:00 — Voor bedrijven**
> Voor vakbedrijven is er een eigen kant. Met een postcode zie je direct hoeveel
> klussen er in jouw regio zijn geplaatst en hoeveel concurrenten er actief zijn.

**1:07 — Tarieven**
> Het verdienmodel is een vast bedrag per maand in plaats van betalen per lead.
> Je weet vooraf wat een maand kost, en dus ook wat een opdracht je maximaal kost.

**1:13 — Dashboard**
> In het dashboard komen de klussen uit je regio binnen. Je reageert met een
> prijs en een persoonlijk bericht, en ziet wat het oplevert.

**1:22 — Slot**
> Vakmaat. Dit is een preview — de vormgeving en de structuur staan,
> de techniek eronder bouwen we in de volgende stap.

---

## Muziek

`vakmaat-preview-muziek.mp4` heeft een rustige ambient-bedding: vier akkoorden
(Am–F–C–G), zachte in- en uitloop, bewust op de achtergrond.

**Let op:** die bedding is hier synthetisch opgewekt. Luister hem zelf een keer
terug voordat je de video doorstuurt — het is functioneel, geen echte compositie.
Wil je iets beters, dan zijn dit de gangbare rechtenvrije bronnen:

- YouTube Audio Library (gratis, zonder naamsvermelding)
- Pixabay Music
- Uppbeat (gratis met vermelding)

Een eigen track eronder zetten kan met één commando:

```bash
ffmpeg -i vakmaat-preview.mp4 -i jouw-muziek.mp3 \
  -map 0:v -map 1:a -c:v copy -c:a aac -b:a 128k -shortest \
  vakmaat-preview-eigen-muziek.mp4
```

## Opnieuw opnemen

De tour is een script, geen handmatige opname. Wijzigt de site, dan neem je hem
opnieuw op zonder iets over te doen:

```bash
npx http-server . -p 8080          # site serveren
node tools/record-tour.js          # tour opnemen (ca. 85 s)
```
