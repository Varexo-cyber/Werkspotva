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

// ───────── v2: interactie
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var euro = function (n) { return '€ ' + Math.round(n).toLocaleString('nl-NL'); };

  // Voortgangsbalk en header
  var bar = document.querySelector('.progress span'), head = document.querySelector('.site-header');
  var onScroll = function () {
    var h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? (h.scrollTop / max).toFixed(4) : 0);
    if (head) head.classList.toggle('scrolled', h.scrollTop > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Lichtvlek op kaarten
  document.addEventListener('pointermove', function (e) {
    var c = e.target.closest && e.target.closest('.card,.opt');
    if (!c) return;
    var r = c.getBoundingClientRect();
    c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    c.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });

  // Tellers in de cijferbalk
  var stats = document.querySelectorAll('.stat b');
  if (stats.length && 'IntersectionObserver' in window && !reduce) {
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (!en.isIntersecting) return; so.unobserve(en.target);
        var el = en.target, m = el.textContent.match(/^(\d+)(.*)$/); if (!m) return;
        var end = +m[1], suf = m[2], t0 = performance.now();
        (function tick(t) { var k = Math.min(1, (t - t0) / 1400), e = 1 - Math.pow(1 - k, 3); el.textContent = Math.round(end * e) + suf; if (k < 1) requestAnimationFrame(tick); })(t0);
      });
    }, { threshold: .6 });
    stats.forEach(function (s) { so.observe(s); });
  }

  // Vloeropbouw
  document.querySelectorAll('.buildup').forEach(function (bu) {
    var svg = bu.querySelector('.bu-svg');
    var set = function (id) {
      bu.querySelectorAll('.bu-item').forEach(function (b) { var on = b.dataset.layer === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on); });
      bu.querySelectorAll('.bu-layer').forEach(function (g) { g.classList.toggle('on', g.dataset.layer === id); });
      svg.classList.add('focus');
    };
    bu.addEventListener('click', function (e) { var t = e.target.closest('[data-layer]'); if (t) set(t.dataset.layer); });
    bu.addEventListener('keydown', function (e) { var t = e.target.closest('.bu-layer'); if (t && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); set(t.dataset.layer); } });
    bu.querySelectorAll('.bu-item').forEach(function (b) { b.addEventListener('mouseenter', function () { set(b.dataset.layer); }); });
    set('dekvloer');
  });

  // Prijscalculator
  document.querySelectorAll('.calc').forEach(function (c) {
    var base = c.dataset.base.split(',').map(Number), extra = c.dataset.extra.split(',').map(Number), min = +c.dataset.min;
    var range = c.querySelector('input[type=range]'), out = c.querySelector('output'), cm = 6;
    var lo = c.querySelector('#calcLo'), hi = c.querySelector('#calcHi'), per = c.querySelector('#calcPer'), cta = c.querySelector('#calcCta');
    var calc = function () {
      var m2 = +range.value, add = [0, 0];
      c.querySelectorAll('.calc-opts input:checked').forEach(function (o) { var a = o.dataset.add.split(',').map(Number); add[0] += a[0]; add[1] += a[1]; });
      var pl = base[0] + Math.max(0, cm - 5) * extra[0] + add[0], ph = base[1] + Math.max(0, cm - 5) * extra[1] + add[1];
      var l = Math.max(min, pl * m2), h = Math.max(min, ph * m2);
      out.textContent = m2 + ' m²';
      range.style.setProperty('--fill', ((m2 - range.min) / (range.max - range.min) * 100) + '%');
      lo.textContent = euro(Math.round(l / 10) * 10); hi.textContent = euro(Math.round(h / 10) * 10);
      hi.parentElement.querySelector('i').hidden = hi.hidden = l === h;
      per.textContent = l === h ? 'Minimumbedrag · excl. btw' : euro(pl) + ' – ' + euro(ph) + ' per m² · excl. btw';
      var opts = Array.prototype.map.call(c.querySelectorAll('.calc-opts input:checked'), function (o) { return o.parentElement.textContent.trim(); });
      cta.href = '/offerte?m2=' + m2 + '&cm=' + cm + (c.dataset.place ? '&plaats=' + encodeURIComponent(c.dataset.place) : '') + (opts.length ? '&opties=' + encodeURIComponent(opts.join('|')) : '');
    };
    range.addEventListener('input', calc);
    c.addEventListener('change', calc);
    c.querySelectorAll('.seg-btns button').forEach(function (b) {
      b.addEventListener('click', function () {
        cm = +b.dataset.cm;
        c.querySelectorAll('.seg-btns button').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-checked', x === b); });
        calc();
      });
    });
    calc();
  });

  // Offerteformulier vooraf invullen vanuit de calculator
  var form = document.getElementById('offerForm');
  if (form) {
    var q = new URLSearchParams(location.search);
    if (q.get('m2')) form.oppervlakte.value = q.get('m2');
    if (q.get('cm')) form.querySelectorAll('input[name=laagdikte]').forEach(function (r) { if (r.value === q.get('cm') + ' cm') r.checked = true; });
    if (q.get('opties')) {
      var want = q.get('opties').toLowerCase();
      form.querySelectorAll('input[name=opties]').forEach(function (o) { var v = o.value.toLowerCase(); if (want.indexOf(v) > -1 || (v === 'krimpnetten' && want.indexOf('krimpnet') > -1)) o.checked = true; });
    }
  }

  // Galerij + lightbox
  var lb = document.getElementById('lightbox');
  if (lb && lb.showModal) {
    var items = Array.prototype.slice.call(document.querySelectorAll('.gal-item')), idx = 0;
    var stage = lb.querySelector('.lb-stage'), cap = lb.querySelector('.lb-cap');
    var show = function (i) {
      idx = (i + items.length) % items.length; var it = items[idx];
      stage.innerHTML = it.dataset.video === '1' ? '<video src="' + it.dataset.src + '" controls autoplay playsinline></video>' : '<img src="' + it.dataset.src + '" alt="">';
      stage.firstChild.alt = it.dataset.caption; cap.textContent = it.dataset.caption;
    };
    items.forEach(function (it, i) { it.addEventListener('click', function () { show(i); lb.showModal(); }); });
    lb.querySelector('.lb-close').addEventListener('click', function () { lb.close(); });
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener('close', function () { stage.innerHTML = ''; });
    document.addEventListener('keydown', function (e) { if (!lb.open) return; if (e.key === 'ArrowLeft') show(idx - 1); if (e.key === 'ArrowRight') show(idx + 1); });
  }
})();
