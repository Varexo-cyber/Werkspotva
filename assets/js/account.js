/* Vakmaat — accounts.
   Vakmensen zoeken en bedrijfsprofielen bekijken kan alleen met een account.
   Particulieren maken dat gratis aan; het houdt bedrijfsgegevens weg bij
   scrapers en concurrenten, en het is het moment waarop iemand van
   bezoeker naar gebruiker gaat.

   In deze preview zit er geen server achter: de sessie staat in de browser. */
(function (root, doc) {
  'use strict';

  var SLEUTEL = 'vakmaat:account';

  function huidig() {
    try {
      var v = localStorage.getItem(SLEUTEL);
      return v ? JSON.parse(v) : null;
    } catch (e) { return null; }
  }

  function ingelogd() { return !!huidig(); }

  function aanmelden(gegevens) {
    var acc = {
      naam: gegevens.naam || 'Particulier',
      email: gegevens.email || '',
      rol: gegevens.rol || 'klant',
      sinds: Date.now()
    };
    try { localStorage.setItem(SLEUTEL, JSON.stringify(acc)); } catch (e) { /* privémodus */ }
    return acc;
  }

  function afmelden() {
    try { localStorage.removeItem(SLEUTEL); } catch (e) { /* niets */ }
  }

  function initialen(naam) {
    return naam.split(/\s+/).map(function (w) { return w.charAt(0); })
      .join('').slice(0, 2).toUpperCase();
  }

  /* ---- De poort ---------------------------------------------------------
     Toont de inhoud vervaagd op de achtergrond, met daarboven een kaart om
     een account te maken. Zo zie je wát je mist, maar niet de gegevens zelf. */
  function poort(opties) {
    if (ingelogd()) return false;

    var I = root.VMIcon;
    var o = opties || {};
    var doel = doc.querySelector(o.vervaag);

    if (doel) {
      doel.style.filter = 'blur(7px)';
      doel.style.pointerEvents = 'none';
      doel.style.userSelect = 'none';
      doel.setAttribute('aria-hidden', 'true');
    }

    var wrap = doc.createElement('div');
    wrap.className = 'poort';
    wrap.innerHTML =
      '<div class="poort__kaart card">' +
        '<span class="poort__ico">' + I('lock', 26) + '</span>' +
        '<h2>' + (o.kop || 'Maak een gratis account om vakmensen te bekijken') + '</h2>' +
        '<p class="muted">' + (o.tekst ||
          'Bedrijfsprofielen, reviews en contactgegevens zijn alleen zichtbaar voor ingeschreven particulieren. Aanmaken kost een halve minuut en is gratis.') + '</p>' +

        '<form class="poort__form" novalidate>' +
          '<div class="field" style="margin-top:0">' +
            '<label class="label" for="p-naam">Je naam</label>' +
            '<input class="input" id="p-naam" autocomplete="name" placeholder="Jan Bergsma">' +
            '<p class="err">Vul je naam in.</p>' +
          '</div>' +
          '<div class="field">' +
            '<label class="label" for="p-mail">E-mailadres</label>' +
            '<input class="input" id="p-mail" type="email" autocomplete="email" placeholder="jij@voorbeeld.nl">' +
            '<p class="err">Vul een geldig e-mailadres in.</p>' +
          '</div>' +
          '<div class="field">' +
            '<label class="label" for="p-ww">Wachtwoord</label>' +
            '<input class="input" id="p-ww" type="password" autocomplete="new-password" placeholder="Minimaal 8 tekens">' +
            '<p class="err">Kies een wachtwoord van minstens 8 tekens.</p>' +
          '</div>' +
          '<button class="btn btn--primary btn--block btn--lg" type="submit" style="margin-top:20px">Gratis account maken</button>' +
        '</form>' +

        '<ul class="checklist small poort__usp"></ul>' +

        '<p class="small muted poort__voet">Al een account? ' +
          '<a href="inloggen.html">Inloggen</a> · Liever meteen aan de slag? ' +
          '<a href="klus-plaatsen.html">Plaats je klus</a></p>' +
      '</div>';

    doc.body.appendChild(wrap);

    wrap.querySelector('.poort__usp').innerHTML = [
      'Gratis — particulieren betalen nooit iets',
      'Bewaar bedrijven en vergelijk ze later',
      'Je gegevens gaan pas naar een bedrijf als jij dat wilt'
    ].map(function (t) { return '<li>' + I('checkCircle', 17) + '<span>' + t + '</span></li>'; }).join('');

    var form = wrap.querySelector('.poort__form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var naam = wrap.querySelector('#p-naam');
      var mail = wrap.querySelector('#p-mail');
      var ww = wrap.querySelector('#p-ww');
      var ok = true;

      function zet(el, fout) {
        el.closest('.field').classList.toggle('field--error', fout);
        if (fout) ok = false;
      }
      zet(naam, !naam.value.trim());
      zet(mail, !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(mail.value.trim()));
      zet(ww, ww.value.length < 8);
      if (!ok) {
        wrap.querySelector('.field--error input').focus();
        return;
      }

      aanmelden({ naam: naam.value.trim(), email: mail.value.trim(), rol: 'klant' });
      location.reload();
    });

    return true;
  }

  root.VMAccount = {
    huidig: huidig,
    ingelogd: ingelogd,
    aanmelden: aanmelden,
    afmelden: afmelden,
    initialen: initialen,
    poort: poort
  };
})(window, document);
