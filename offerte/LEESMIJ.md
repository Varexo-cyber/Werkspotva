# Offerte — klussenplatform

`Varexo-offerte-klussenplatform.pdf` — 3 pagina's A4, opgemaakt in dezelfde stijl
als de Varexo-facturen: licht, strak, geen logo.

## Indeling

| Pagina | Inhoud |
|---|---|
| 1 | Kop, adresgegevens, regels met bedragen en totalen, betaalgegevens |
| 2 | Samenvatting van de wensen, wat wel en niet in het maandbedrag zit |
| 3 | De tien onderdelen die gebouwd worden |

De algemene voorwaarden en het privacybeleid levert de opdrachtgever zelf aan;
Varexo plaatst ze op de website. Dat staat op pagina 2 onder "Niet inbegrepen".

## Nog invullen

Alleen de gegevens van de opdrachtgever staan nog open (geel gemarkeerd):
bedrijfsnaam, adres, e-mail, telefoon en KvK-nummer. Pas ze aan in
`offerte.html` en genereer opnieuw.

## Bedragen

| | |
|---|---|
| Ontwerp en realisatie, eenmalig | € 599,99 |
| Onderhoud eerste twee maanden | € 0,00 |
| Website Onderhoud & Beheer | € 19,99 per maand |
| E-mailadres op eigen domein | € 9,99 per maand |
| **Doorlopend vanaf maand 3** | **€ 29,98 per maand** |

Alle bedragen zijn vrijgesteld van btw in verband met de KOR, gelijk aan de
overige Varexo-facturen.

Het abonnement van € 35 per maand dat vakbedrijven op het platform betalen is
de inkomstenbron van de opdrachtgever en staat los van deze offerte. Dat is op
pagina 2 expliciet benoemd, zodat daar geen verwarring over ontstaat.

## Opnieuw genereren

```bash
node render.js
```

`render.js` drukt de hoogte van elke pagina af. Die moet exact 1123 px blijven
(A4 op 96 dpi); wordt er eentje hoger, dan loopt hij over naar een extra pagina
en moet er ergens ruimte terug.
