# Vakmaat

Klussenplatform waar particulieren hun klus plaatsen en vakbedrijven daarop reageren
met een prijs. Zelfde gedachte als Werkspot, maar met een eigen naam, eigen uiterlijk
en één belangrijk verschil in het verdienmodel: **vakbedrijven betalen een vast bedrag
per maand in plaats van per lead.**

Dit is een werkende preview — klikbaar van begin tot eind, met echte formuliervalidatie
en echte filters. Er zit geen backend achter; ingevulde gegevens blijven in de browser.

---

## Openen

Geen build-stap, geen dependencies. Dubbelklik `index.html`, of serveer de map:

```bash
npx http-server . -p 8080     # of: python3 -m http.server 8080
```

## Pagina's

| Bestand | Wat het is |
|---|---|
| `index.html` | Homepage: hero met zoekbalk, vakgebieden, hoe het werkt, reviews |
| `klus-plaatsen.html` | Klus-wizard in 5 stappen, met validatie, foto-upload en samenvatting |
| `vakmensen.html` | Bedrijven zoeken met filters op vak, beoordeling en kenmerken |
| `vakman.html` | Bedrijfsprofiel: reviews, certificaten, werkgebied, offerteformulier |
| `mijn-klussen.html` | Klantomgeving: ontvangen offertes vergelijken en kiezen |
| `voor-bedrijven.html` | Zakelijke landingspagina met regiocheck |
| `prijzen.html` | Abonnementen, maand/jaar-schakelaar en terugverdienrekenaar |
| `aanmelden.html` | Aanmeldwizard voor vakbedrijven in 4 stappen |
| `inloggen.html` | Inloggen als particulier of als bedrijf |
| `dashboard.html` | Vakman-dashboard: leads, reageren, cijfers |
| `hoe-het-werkt.html` | Uitleg voor particulieren + veilig-klussen-richtlijnen |

## Techniek

```
assets/css/vakmaat.css   design system: tokens, componenten, responsive
assets/js/icons.js       eigen SVG-iconenset, één lijnstijl
assets/js/data.js        demodata: vakgebieden, bedrijven, reviews, leads, abonnementen
assets/js/app.js         header, footer, autocomplete, accordeon, toasts, tellers
```

Vanille HTML, CSS en JavaScript. Bewust geen framework: een preview moet overal
direct openen, ook vanaf een USB-stick of als los mapje in de mail.

## Ontwerpkeuzes

**Kleur.** Diep bosgroen (`#14594A`) met oker (`#E5A23C`) op warm papierwit. Groen voor
vertrouwen en vakmanschap, oker voor gereedschap en hout. Bewust weg van het blauw/oranje
dat de rest van de markt gebruikt.

**Typografie.** Bricolage Grotesque voor koppen (stevig, eigenzinnig), Inter voor tekst.

**Toon.** Nederlands zoals mensen het zeggen. Geen "ontzorgen", geen "oplossingen".
De teksten noemen ook wat er níet kan — dat leest eerlijker dan alleen superlatieven.

**Iconen.** Handgetekende SVG-set in één stijl. Geen emoji, geen icon-font.

## Wat werkt en wat niet

Werkt: beide wizards met validatie, zoekfilters, sorteren, autocomplete, prijsschakelaar,
terugverdienrekenaar, regiocheck, reageren op leads, offertes vergelijken en kiezen,
mobiel menu, foto-upload met voorbeeldweergave.

Nog niet: er is geen server, dus niets wordt opgeslagen of verstuurd. Een geplaatste klus
wordt via de browseropslag doorgegeven aan `mijn-klussen.html`, zodat de demo doorloopt.
Bedrijfsgegevens, reviews en cijfers zijn fictief maar realistisch gekozen.

## Volgende stap

Backend eronder (accounts, klussen, berichten, betalingen), echte adres- en
KvK-validatie, e-mailnotificaties en een beheeromgeving voor het controleren van
aanmeldingen.
