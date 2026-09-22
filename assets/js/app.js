/* Vakmaat — gedeelde laag: header, footer, en de kleine interacties
   die op meerdere pagina's terugkomen. Geen framework, geen build-stap. */
(function (root, doc) {
  'use strict';

  var I = root.VMIcon, D = root.VM;

  /* ---- Logo ------------------------------------------------------------- */
  /* Het merk: een dak (oker) boven een schietlood (wit) — richting en precisie. */
  var LOGO_MARK =
    '<svg class="logo__mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
      '<rect width="40" height="40" rx="11" fill="#14594A"/>' +
      '<path d="M7 19.4 20 8.6l13 10.8" stroke="#E5A23C" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<path d="M20 15.8v7.3" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>' +
      '<path d="M20 23.6 23.2 27 20 30.4 16.8 27z" fill="#fff"/>' +
    '</svg>';

  function logo(href) {
    return '<a class="logo" href="' + (href || 'index.html') + '" aria-label="Vakmaat — naar de homepagina">' +
      LOGO_MARK + '<span class="logo__word">Vak<span>maat</span></span></a>';
  }

  /* ---- Header ----------------------------------------------------------- */
  var NAV = [
    { href: 'hoe-het-werkt.html', label: 'Hoe het werkt' },
    { href: 'vakmensen.html',     label: 'Vakmensen zoeken' },
    { href: 'voor-bedrijven.html', label: 'Voor bedrijven' },
    { href: 'prijzen.html',       label: 'Tarieven' }
  ];

  function buildHeader() {
    var host = doc.querySelector('[data-header]');
    if (!host) return;

    var here = (location.pathname.split('/').pop() || 'index.html');
    var variant = host.getAttribute('data-header'); /* "" | "app" */

    var links = NAV.map(function (n) {
      return '<a href="' + n.href + '"' + (n.href === here ? ' class="is-active" aria-current="page"' : '') + '>' + n.label + '</a>';
    }).join('');

    var acc = root.VMAccount && root.VMAccount.huidig();
    var actions;
    if (variant === 'app') {
      actions = '<a class="btn btn--quiet small" href="index.html">' + I('bell', 18) + '</a>' +
                '<a class="btn btn--ghost btn--sm" href="index.html" data-uitloggen>Uitloggen</a>';
    } else if (acc) {
      actions = '<span class="acc-chip hide-sm"><span>' + root.VMAccount.initialen(acc.naam) + '</span>' +
                  esc(acc.naam.split(' ')[0]) + '</span>' +
                '<a class="btn btn--quiet hide-sm" href="index.html" data-uitloggen>Uitloggen</a>' +
                '<a class="btn btn--primary btn--sm" href="klus-plaatsen.html">Klus plaatsen</a>';
    } else {
      actions = '<a class="btn btn--quiet hide-sm" href="inloggen.html">Inloggen</a>' +
                '<a class="btn btn--primary btn--sm" href="klus-plaatsen.html">Klus plaatsen</a>';
    }

    host.className = 'site-header';
    host.innerHTML =
      '<div class="wrap site-header__inner">' +
        logo() +
        '<nav class="nav" aria-label="Hoofdmenu">' + links + '</nav>' +
        '<div class="header-actions">' + actions +
          '<button class="burger" data-burger aria-expanded="false" aria-controls="mobiel-menu" aria-label="Menu openen">' + I('menu', 20) + '</button>' +
        '</div>' +
      '</div>' +
      '<div class="mobile-nav" id="mobiel-menu" data-mobile>' +
        '<div class="wrap">' +
          NAV.map(function (n) { return '<a href="' + n.href + '">' + n.label + I('chevronRight', 18) + '</a>'; }).join('') +
          (acc ? '' : '<a href="inloggen.html">Inloggen' + I('chevronRight', 18) + '</a>') +
          '<a href="vakmensen.html">Vakmensen zoeken' + I('chevronRight', 18) + '</a>' +
          '<a class="btn btn--primary btn--block btn--lg" href="klus-plaatsen.html">Klus plaatsen — gratis</a>' +
          '<a class="btn btn--ghost btn--block" href="aanmelden.html" style="margin-top:12px">Ik ben vakman</a>' +
        '</div>' +
      '</div>';

    var burger = host.querySelector('[data-burger]');
    var panel = host.querySelector('[data-mobile]');
    burger.addEventListener('click', function () {
      var open = panel.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.innerHTML = I(open ? 'close' : 'menu', 20);
      doc.body.style.overflow = open ? 'hidden' : '';
    });

    var uit = host.querySelector('[data-uitloggen]');
    if (uit) {
      uit.addEventListener('click', function () {
        if (root.VMAccount) root.VMAccount.afmelden();
      });
    }

    var onScroll = function () { host.classList.toggle('is-stuck', root.scrollY > 8); };
    onScroll();
    root.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Footer ----------------------------------------------------------- */
  var FOOT = [
    { kop: 'Voor particulieren', items: [
      ['klus-plaatsen.html', 'Klus plaatsen'],
      ['vakmensen.html', 'Vakmensen zoeken'],
      ['hoe-het-werkt.html', 'Hoe het werkt'],
      ['mijn-klussen.html', 'Mijn klussen'],
      ['hoe-het-werkt.html#veilig', 'Veilig klussen']
    ]},
    { kop: 'Voor bedrijven', items: [
      ['voor-bedrijven.html', 'Word vakmaat'],
      ['prijzen.html', 'Tarieven'],
      ['aanmelden.html', 'Aanmelden'],
      ['dashboard.html', 'Mijn dashboard'],
      ['voor-bedrijven.html#faq', 'Veelgestelde vragen']
    ]},
    { kop: 'Populair', items: [
      ['vakmensen.html?vak=schilderwerk', 'Schilder'],
      ['vakmensen.html?vak=loodgieter', 'Loodgieter'],
      ['vakmensen.html?vak=elektricien', 'Elektricien'],
      ['vakmensen.html?vak=hovenier', 'Hovenier'],
      ['vakmensen.html?vak=dakdekker', 'Dakdekker']
    ]},
    { kop: 'Vakmaat', items: [
      ['index.html#over', 'Over ons'],
      ['index.html', 'Werken bij'],
      ['index.html', 'Pers'],
      ['index.html', 'Contact'],
      ['index.html', 'Nieuwsbrief']
    ]}
  ];

  function buildFooter() {
    var host = doc.querySelector('[data-footer]');
    if (!host) return;

    host.className = 'site-footer';
    host.innerHTML =
      '<div class="wrap">' +
        '<div class="footer-grid">' +
          '<div>' + logo() +
            '<p class="small" style="margin-top:16px;max-width:30ch">Het platform waar particulieren en vakbedrijven elkaar vinden. Opgericht in Utrecht, actief in heel Nederland.</p>' +
            '<div class="row" style="gap:10px;margin-top:20px">' +
              '<span class="badge badge--dark">' + I('shield', 13) + 'KvK-gecontroleerd</span>' +
              '<span class="badge badge--dark">' + I('lock', 13) + 'AVG-proof</span>' +
            '</div>' +
          '</div>' +
          FOOT.map(function (c) {
            return '<div><h4>' + c.kop + '</h4>' +
              c.items.map(function (it) { return '<a href="' + it[0] + '">' + it[1] + '</a>'; }).join('') +
            '</div>';
          }).join('') +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span>© ' + new Date().getFullYear() + ' Vakmaat B.V. — Demonstratieversie, geen echte dienstverlening.</span>' +
          '<span class="row" style="gap:20px">' +
            '<a href="index.html">Privacy</a><a href="index.html">Voorwaarden</a><a href="index.html">Cookies</a>' +
          '</span>' +
        '</div>' +
      '</div>';
  }

  /* ---- Sterren ---------------------------------------------------------- */
  /* Sterren met halve stand: een 4,6 hoort er niet uit te zien als een 5,0. */
  function stars(score, size) {
    var s = size || 15;
    var heel = Math.floor(score);
    var rest = score - heel;
    var half = rest >= 0.25 && rest < 0.75;
    if (rest >= 0.75) heel += 1;

    var out = '';
    for (var i = 1; i <= 5; i++) {
      if (i <= heel) {
        out += root.VMIconFill('star', s);
      } else if (i === heel + 1 && half) {
        out += '<span style="position:relative;display:inline-flex;width:' + s + 'px;height:' + s + 'px">' +
                 root.VMIconFill('star', s, 'is-empty') +
                 '<span style="position:absolute;inset:0;width:50%;overflow:hidden;display:flex">' +
                   root.VMIconFill('star', s) +
                 '</span>' +
               '</span>';
      } else {
        out += root.VMIconFill('star', s, 'is-empty');
      }
    }
    return '<span class="stars" role="img" aria-label="' + score.toFixed(1).replace('.', ',') + ' van de 5 sterren">' + out + '</span>';
  }

  /* ---- Accordeon -------------------------------------------------------- */
  function accordion(el, items) {
    el.className = 'acc';
    el.innerHTML = items.map(function (it, i) {
      return '<div class="acc__item">' +
        '<button class="acc__btn" aria-expanded="false" aria-controls="acc-p-' + i + '">' +
          '<span>' + it.v + '</span>' + I('plus', 20) +
        '</button>' +
        '<div class="acc__panel" id="acc-p-' + i + '"><div><p>' + it.a + '</p></div></div>' +
      '</div>';
    }).join('');

    el.addEventListener('click', function (e) {
      var btn = e.target.closest('.acc__btn');
      if (!btn) return;
      var item = btn.parentElement;
      var open = item.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });
  }

  /* ---- Toast ------------------------------------------------------------ */
  var toastTimer;
  function toast(msg) {
    var el = doc.querySelector('.toast');
    if (!el) {
      el = doc.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      doc.body.appendChild(el);
    }
    el.innerHTML = I('checkCircle', 18) + '<span></span>';
    el.querySelector('span').textContent = msg;
    requestAnimationFrame(function () { el.classList.add('is-on'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-on'); }, 3600);
  }

  /* ---- Reveal on scroll -------------------------------------------------- */
  function reveal() {
    var els = doc.querySelectorAll('.reveal');
    if (!els.length) return;
    if (!('IntersectionObserver' in root)) {
      els.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var delay = parseInt(el.getAttribute('data-delay') || '0', 10);
        setTimeout(function () { el.classList.add('is-in'); }, delay);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Tellers ---------------------------------------------------------- */
  function counters() {
    var els = doc.querySelectorAll('[data-count]');
    if (!els.length || !('IntersectionObserver' in root)) {
      els.forEach(function (el) { el.textContent = el.getAttribute('data-count'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        io.unobserve(el);
        var raw = el.getAttribute('data-count');
        var target = parseFloat(raw.replace(/\./g, '').replace(',', '.'));
        var decimals = (raw.split(',')[1] || '').length;
        var pre = el.getAttribute('data-pre') || '';
        var post = el.getAttribute('data-post') || '';
        var t0 = performance.now(), dur = 1100;
        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          var v = target * eased;
          el.textContent = pre + v.toLocaleString('nl-NL', {
            minimumFractionDigits: decimals, maximumFractionDigits: decimals
          }) + post;
          if (p < 1) requestAnimationFrame(tick);
        })(performance.now());
      });
    }, { threshold: 0.4 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---- Categorie-autocomplete -------------------------------------------- */
  function autocomplete(input, onPick) {
    var box = doc.createElement('div');
    box.className = 'ac__list';
    box.setAttribute('role', 'listbox');
    input.parentElement.classList.add('ac');
    input.parentElement.appendChild(box);
    input.setAttribute('autocomplete', 'off');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-expanded', 'false');

    var cursor = -1, current = [];

    function matches(q) {
      q = q.trim().toLowerCase();
      if (!q) return D.categories.slice(0, 6);
      return D.categories.filter(function (c) {
        if (c.naam.toLowerCase().indexOf(q) > -1) return true;
        return c.zoek.some(function (z) { return z.indexOf(q) > -1; });
      }).slice(0, 7);
    }

    function mark(txt, q) {
      if (!q) return txt;
      var i = txt.toLowerCase().indexOf(q.trim().toLowerCase());
      if (i < 0) return txt;
      var n = q.trim().length;
      return txt.slice(0, i) + '<em>' + txt.slice(i, i + n) + '</em>' + txt.slice(i + n);
    }

    function render() {
      var q = input.value;
      current = matches(q);
      cursor = -1;
      if (!current.length) { close(); return; }
      box.innerHTML = current.map(function (c, i) {
        return '<div class="ac__item" role="option" data-i="' + i + '" id="ac-o-' + i + '">' +
          I(c.icon, 17) + '<span>' + mark(c.naam, q) + '</span>' +
          '<span class="tiny muted" style="margin-left:auto">' + c.klussen.toLocaleString('nl-NL') + ' klussen</span>' +
        '</div>';
      }).join('');
      box.classList.add('is-open');
      input.setAttribute('aria-expanded', 'true');
    }

    function close() {
      box.classList.remove('is-open');
      input.setAttribute('aria-expanded', 'false');
      cursor = -1;
    }

    function pick(i) {
      var c = current[i];
      if (!c) return;
      input.value = c.naam;
      close();
      if (onPick) onPick(c);
    }

    function move(step) {
      if (!box.classList.contains('is-open')) { render(); return; }
      cursor = (cursor + step + current.length) % current.length;
      box.querySelectorAll('.ac__item').forEach(function (n, i) {
        n.classList.toggle('is-active', i === cursor);
      });
      input.setAttribute('aria-activedescendant', 'ac-o-' + cursor);
    }

    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter' && cursor > -1) { e.preventDefault(); pick(cursor); }
      else if (e.key === 'Escape') { close(); }
    });
    box.addEventListener('mousedown', function (e) {
      var it = e.target.closest('.ac__item');
      if (it) { e.preventDefault(); pick(parseInt(it.getAttribute('data-i'), 10)); }
    });
    doc.addEventListener('click', function (e) {
      if (!input.parentElement.contains(e.target)) close();
    });
  }

  /* ---- Opslag (demo) ----------------------------------------------------- */
  var store = {
    get: function (k, fallback) {
      try { var v = localStorage.getItem('vakmaat:' + k); return v ? JSON.parse(v) : fallback; }
      catch (e) { return fallback; }
    },
    set: function (k, v) {
      try { localStorage.setItem('vakmaat:' + k, JSON.stringify(v)); } catch (e) { /* privémodus */ }
    }
  };

  /* ---- Helpers ------------------------------------------------------------ */
  function euro(n) { return '€ ' + n.toLocaleString('nl-NL'); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c];
  }); }

  root.VMApp = {
    logo: logo, stars: stars, accordion: accordion, toast: toast,
    autocomplete: autocomplete, store: store, euro: euro, esc: esc
  };

  doc.addEventListener('DOMContentLoaded', function () {
    buildHeader();
    buildFooter();
    reveal();
    counters();
  });
})(window, document);
