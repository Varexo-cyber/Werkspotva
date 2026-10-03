(function () {
  // Mobiel menu
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.burger');
  if (burger) burger.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    burger.setAttribute('aria-label', open ? 'Menu sluiten' : 'Menu openen');
  });
  // Diensten-dropdown (klik voor touch en toetsenbord)
  document.querySelectorAll('.has-drop > button').forEach(function (b) {
    b.addEventListener('click', function () {
      var li = b.parentElement, open = li.classList.toggle('open');
      b.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-drop.open').forEach(function (li) {
      if (!li.contains(e.target)) { li.classList.remove('open'); li.querySelector('button').setAttribute('aria-expanded', 'false'); }
    });
  });

  // Inloopanimaties
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('in'); });

  // Offerteformulier
  var form = document.getElementById('offerForm');
  if (!form) return;
  var params = new URLSearchParams(location.search);
  var pre = params.get('dienst');
  if (pre) form.querySelectorAll('input[name=dienst]').forEach(function (r) { if (r.value === pre) r.checked = true; });
  var plaats = params.get('plaats');
  if (plaats) form.plaats.value = plaats;
  var svcName = document.getElementById('svcName');
  function syncSvc() { var c = form.querySelector('input[name=dienst]:checked'); if (c) svcName.textContent = c.value; }
  form.addEventListener('change', function (e) {
    if (e.target.name === 'dienst') syncSvc();
    var g = e.target.closest('.fgroup'); if (g) g.classList.remove('invalid');
  });
  syncSvc();

  function val(name) {
    var els = form.querySelectorAll('[name="' + name + '"]');
    if (!els.length) return '';
    if (els[0].type === 'radio') { var c = form.querySelector('[name="' + name + '"]:checked'); return c ? c.value : ''; }
    if (els[0].type === 'checkbox') return Array.prototype.map.call(form.querySelectorAll('[name="' + name + '"]:checked'), function (x) { return x.value; }).join(', ');
    return els[0].value.trim();
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, first = null;
    form.querySelectorAll('.fgroup').forEach(function (g) {
      var req = g.querySelector('[required]');
      if (!req) return;
      var bad = req.type === 'radio' ? !val(req.name) : !req.value.trim();
      g.classList.toggle('invalid', bad);
      if (bad) { ok = false; first = first || g; }
    });
    if (!ok) { first.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }

    var fields = [
      ['Dienst', val('dienst')], ['Ruimte', val('ruimte')], ['Verdieping', val('verdieping')],
      ['Oppervlakte', val('oppervlakte') + ' m²'], ['Laagdikte', val('laagdikte')], ['Vloerverwarming', val('vloerverwarming')],
      ['Type project', val('type')], ['Uitvoerperiode', val('periode')], ['Opties', val('opties')],
      ['Naam', val('naam')], ['Telefoon', val('telefoon')], ['E-mail', val('email')], ['Plaats', val('plaats')], ['Toelichting', val('toelichting')]
    ].filter(function (f) { return f[1] && f[1] !== ' m²'; });

    var endpoint = form.dataset.endpoint;
    var done = function () { document.getElementById('sentMsg').classList.add('show'); form.querySelector('button[type=submit]').disabled = true; };
    if (endpoint) {
      var data = {}; fields.forEach(function (f) { data[f[0]] = f[1]; });
      fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) })
        .then(function (r) { if (!r.ok) throw 0; done(); })
        .catch(function () { sendWa(); });
    } else sendWa();

    function sendWa() {
      var text = 'Offerteaanvraag via de website\n\n' + fields.map(function (f) { return f[0] + ': ' + f[1]; }).join('\n');
      window.open('https://wa.me/' + form.dataset.wa + '?text=' + encodeURIComponent(text), '_blank');
      done();
    }
  });
})();
