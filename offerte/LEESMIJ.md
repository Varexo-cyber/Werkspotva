# Offerte — klussenplatform

`Varexo-offerte-klussenplatform.pdf` — 5 pagina's A4, in de Varexo-huisstijl
(donker, emerald accent, mono-accenten zoals op varexo.nl).

## Nog invullen

De gemarkeerde velden in het PDF staan nog open. Pas ze aan in `offerte.html`
en genereer opnieuw:

- Telefoonnummer
- Naam, bedrijfsnaam, adres en e-mail van de opdrachtgever
- Adres, KvK-nummer en btw-nummer van Varexo
- Of de bedragen **inclusief of exclusief btw** zijn

## Opnieuw genereren

```bash
node render.js
```

Levert `Varexo-offerte-klussenplatform.pdf` op. Het document is opgemaakt in
HTML, dus tekst en bedragen pas je gewoon aan in `offerte.html`.

Let op: elke pagina moet exact 1123 px hoog blijven (A4 op 96 dpi). `render.js`
drukt de hoogtes af; wordt er eentje hoger, dan loopt hij over naar een extra
pagina en moet er ergens ruimte terug.

## Bedragen in dit document

| | |
|---|---|
| Eenmalig, bouw en oplevering | € 599,99 |
| Onderhoud eerste twee maanden | inbegrepen |
| Hosting en onderhoud | € 19,99 per maand |
| E-mailadres op eigen domein | € 9,99 per maand |
| **Maandelijks totaal vanaf maand 3** | **€ 29,98** |

Het abonnement van € 35 per maand dat vakbedrijven op het platform betalen,
is de inkomstenbron van de opdrachtgever en staat los van deze offerte. Dat
staat expliciet op pagina 4, zodat daar geen verwarring over ontstaat.
