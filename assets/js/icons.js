/* Vakmaat — icoonset.
   Handgekozen, één lijnstijl (1.7px, ronde uiteinden). Geen emoji, geen icon-font. */
(function (root) {
  'use strict';

  var P = {
    /* navigatie & UI */
    arrowRight: '<path d="M4 10h12M11 5l5 5-5 5"/>',
    arrowLeft: '<path d="M16 10H4M9 15l-5-5 5-5"/>',
    chevronDown: '<path d="M5 8l5 5 5-5"/>',
    chevronRight: '<path d="M8 5l5 5-5 5"/>',
    menu: '<path d="M3 6h14M3 10h14M3 14h14"/>',
    close: '<path d="M5 5l10 10M15 5L5 15"/>',
    plus: '<path d="M10 4v12M4 10h12"/>',
    search: '<circle cx="9" cy="9" r="5.5"/><path d="M13.2 13.2 17 17"/>',
    filter: '<path d="M3 5h14M6 10h8M8.5 15h3"/>',
    check: '<path d="M4 10.5l4 4 8-9"/>',
    checkCircle: '<circle cx="10" cy="10" r="7.5"/><path d="M6.8 10.2l2.2 2.2 4.2-4.6"/>',
    star: '<path d="M10 1.8l2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8z"/>',
    shield: '<path d="M10 2.5l6 2.2v5c0 3.6-2.4 6.6-6 7.8-3.6-1.2-6-4.2-6-7.8v-5z"/><path d="M7.3 9.9l1.9 1.9 3.5-3.8"/>',
    mapPin: '<path d="M10 17.5s6-4.7 6-9a6 6 0 1 0-12 0c0 4.3 6 9 6 9z"/><circle cx="10" cy="8.4" r="2.2"/>',
    clock: '<circle cx="10" cy="10" r="7.5"/><path d="M10 5.6V10l2.9 1.8"/>',
    calendar: '<rect x="3" y="4.5" width="14" height="13" rx="2.2"/><path d="M3 8.4h14M7 2.6v3.4M13 2.6v3.4"/>',
    euro: '<path d="M15 5.4A5.6 5.6 0 0 0 6.2 8m8.8 6.6A5.6 5.6 0 0 1 6.2 12"/><path d="M3.4 8.6h6.4M3.4 11.4h6.4"/>',
    chat: '<path d="M17 9.6c0 3.4-3.1 6.2-7 6.2a8 8 0 0 1-2.2-.3L4 17l1-2.8A5.9 5.9 0 0 1 3 9.6c0-3.4 3.1-6.2 7-6.2s7 2.8 7 6.2z"/>',
    user: '<circle cx="10" cy="6.6" r="3.1"/><path d="M3.9 17c.6-3.2 3.1-5.1 6.1-5.1s5.5 1.9 6.1 5.1"/>',
    users: '<circle cx="7.6" cy="6.8" r="2.8"/><path d="M2.6 16.6c.5-2.9 2.5-4.6 5-4.6s4.5 1.7 5 4.6"/><path d="M13.4 5.2a2.8 2.8 0 0 1 .3 5.3M14.6 12.4c1.8.5 2.9 1.9 3.2 4"/>',
    building: '<path d="M3.5 17.5V5.2L10 2.6l6.5 2.6v12.3"/><path d="M2.4 17.5h15.2M7.4 8.4h1.2M11.4 8.4h1.2M7.4 11.8h1.2M11.4 11.8h1.2M8.4 17.5v-3h3.2v3"/>',
    doc: '<path d="M11.4 2.6H6a1.9 1.9 0 0 0-1.9 1.9v11a1.9 1.9 0 0 0 1.9 1.9h8a1.9 1.9 0 0 0 1.9-1.9V7.1z"/><path d="M11.4 2.6v4.5h4.5M7.4 11h5.2M7.4 14h3.4"/>',
    inbox: '<path d="M2.6 11.4h3.8l1.2 2.2h4.8l1.2-2.2h3.8"/><path d="M4.9 4.2h10.2l2.3 7.2v3.2a1.9 1.9 0 0 1-1.9 1.9H4.5a1.9 1.9 0 0 1-1.9-1.9v-3.2z"/>',
    chart: '<path d="M3 17h14"/><path d="M5.6 17V9.4M9.6 17V4.6M13.6 17v-5.4"/>',
    settings: '<circle cx="10" cy="10" r="2.6"/><path d="M16.3 12.2a1.4 1.4 0 0 0 .3 1.6l.1.1a1.7 1.7 0 1 1-2.4 2.4l-.1-.1a1.4 1.4 0 0 0-2.4 1v.2a1.7 1.7 0 1 1-3.4 0v-.1a1.4 1.4 0 0 0-2.4-1l-.1.1a1.7 1.7 0 1 1-2.4-2.4l.1-.1a1.4 1.4 0 0 0-1-2.4H2.4a1.7 1.7 0 1 1 0-3.4h.1a1.4 1.4 0 0 0 1-2.4l-.1-.1a1.7 1.7 0 0 1 2.4-2.4l.1.1a1.4 1.4 0 0 0 2.4-1V2.4a1.7 1.7 0 0 1 3.4 0v.1a1.4 1.4 0 0 0 2.4 1l.1-.1a1.7 1.7 0 0 1 2.4 2.4l-.1.1a1.4 1.4 0 0 0 1 2.4h.2a1.7 1.7 0 0 1 0 3.4h-.1a1.4 1.4 0 0 0-1.3.9z"/>',
    logout: '<path d="M7.6 17H4.4A1.6 1.6 0 0 1 2.8 15.4V4.6A1.6 1.6 0 0 1 4.4 3h3.2"/><path d="M12.6 13.6 16.8 10l-4.2-3.6M16.8 10H7.2"/>',
    bell: '<path d="M14.5 7.3a4.5 4.5 0 0 0-9 0c0 5.2-2 6.7-2 6.7h13s-2-1.5-2-6.7z"/><path d="M11.4 16.8a1.7 1.7 0 0 1-2.8 0"/>',
    credit: '<rect x="2.6" y="4.6" width="14.8" height="10.8" rx="2"/><path d="M2.6 8.4h14.8M5.6 12.4h2.6"/>',
    lock: '<rect x="4" y="8.6" width="12" height="8.4" rx="2"/><path d="M6.9 8.6V6.4a3.1 3.1 0 0 1 6.2 0v2.2"/>',
    mail: '<rect x="2.6" y="4.4" width="14.8" height="11.2" rx="2"/><path d="m3.4 5.6 6.6 4.8 6.6-4.8"/>',
    phone: '<path d="M17 13.8v2.1a1.4 1.4 0 0 1-1.5 1.4 13.8 13.8 0 0 1-6-2.1 13.6 13.6 0 0 1-4.2-4.2 13.8 13.8 0 0 1-2.1-6.1A1.4 1.4 0 0 1 4.6 3.4h2.1a1.4 1.4 0 0 1 1.4 1.2c.1.7.3 1.3.5 1.9a1.4 1.4 0 0 1-.3 1.5l-.9.9a11 11 0 0 0 4.2 4.2l.9-.9a1.4 1.4 0 0 1 1.5-.3c.6.2 1.2.4 1.9.5a1.4 1.4 0 0 1 1.2 1.4z"/>',
    camera: '<path d="M17 14.6a1.6 1.6 0 0 1-1.6 1.6H4.6A1.6 1.6 0 0 1 3 14.6V7.4a1.6 1.6 0 0 1 1.6-1.6h2.2L8.2 3.6h3.6l1.4 2.2h2.2A1.6 1.6 0 0 1 17 7.4z"/><circle cx="10" cy="10.8" r="2.6"/>',
    trend: '<path d="M2.8 13.4 7.4 8.8l3 3 6.8-6.8"/><path d="M12.6 5h4.6v4.6"/>',
    sparkle: '<path d="M10 2.4 11.7 7l4.6 1.7-4.6 1.7L10 15l-1.7-4.6L3.7 8.7 8.3 7z"/><path d="M15.6 13.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z"/>',
    thumb: '<path d="M6 8.6 9.2 2.4a2 2 0 0 1 2.8 1.8v3.4h3.6a1.8 1.8 0 0 1 1.8 2.1l-1 5.4a1.8 1.8 0 0 1-1.8 1.5H6z"/><rect x="2.4" y="8.6" width="3.6" height="8" rx="1"/>',
    bookmark: '<path d="M15 17 10 13.4 5 17V4.6A1.6 1.6 0 0 1 6.6 3h6.8A1.6 1.6 0 0 1 15 4.6z"/>',
    info: '<circle cx="10" cy="10" r="7.6"/><path d="M10 13.6V9.4M10 6.6h.01"/>',
    warn: '<path d="M8.6 3.2 1.9 14.8A1.6 1.6 0 0 0 3.3 17.2h13.4a1.6 1.6 0 0 0 1.4-2.4L11.4 3.2a1.6 1.6 0 0 0-2.8 0z"/><path d="M10 7.6v3.2M10 13.8h.01"/>',

    /* vakgebieden */
    paint: '<path d="M4 3.4h12v4.2H4z"/><path d="M10 7.6v2.8M8.4 10.4h3.2v3.2a1.6 1.6 0 0 1-1.6 1.6 1.6 1.6 0 0 1-1.6-1.6z"/><path d="M10 15.2v2.2"/>',
    hammer: '<path d="m11.6 6.4 2.2-2.2 3.8 3.8-2.2 2.2z"/><path d="m11.6 6.4-1.4-1.4-4 4 1.4 1.4"/><path d="m8.8 12 -5 5"/><path d="m7.6 10.4 3.2 3.2"/>',
    plug: '<path d="M7 2.8v4M13 2.8v4"/><path d="M4.6 6.8h10.8v3a5.4 5.4 0 0 1-5.4 5.4 5.4 5.4 0 0 1-5.4-5.4z"/><path d="M10 15.2v2.4"/>',
    drop: '<path d="M10 2.6s5.2 5.4 5.2 8.8A5.2 5.2 0 0 1 10 17a5.2 5.2 0 0 1-5.2-5.6C4.8 8 10 2.6 10 2.6z"/>',
    leaf: '<path d="M16.6 3.4c0 7-4.2 10.4-8 10.4A4.4 4.4 0 0 1 4.2 9.4c0-4 4-6 12.4-6z"/><path d="M13 7 3.4 16.6"/>',
    roof: '<path d="M2.4 9.6 10 3.2l7.6 6.4"/><path d="M4.6 11.4v5.4h10.8v-5.4"/><path d="M8.2 16.8v-3.4h3.6v3.4"/>',
    window: '<rect x="3.4" y="3.4" width="13.2" height="13.2" rx="1.6"/><path d="M10 3.4v13.2M3.4 10h13.2"/>',
    floor: '<rect x="2.6" y="5" width="14.8" height="10" rx="1.4"/><path d="M2.6 8.4h14.8M2.6 11.6h14.8M7.4 5v3.4M12.6 8.4v3.2M7.4 11.6V15"/>',
    brick: '<rect x="2.6" y="4.6" width="14.8" height="10.8" rx="1.2"/><path d="M2.6 8.2h14.8M2.6 11.8h14.8M6.8 4.6v3.6M13.2 4.6v3.6M9.8 8.2v3.6M6.8 11.8v3.6M13.2 11.8v3.6"/>',
    bolt: '<path d="M11.4 2.4 4.2 11.2h5l-.6 6.4 7.2-8.8h-5z"/>',
    truck: '<path d="M2.6 5.6h9v8.2h-9z"/><path d="M11.6 8.6h3l2.4 2.6v2.6h-5.4z"/><circle cx="6" cy="15.4" r="1.7"/><circle cx="14" cy="15.4" r="1.7"/>',
    key: '<circle cx="6.6" cy="10" r="3.4"/><path d="M9.8 9.2h7.4v2.6M14.6 9.2v2.6"/>',
    solar: '<circle cx="10" cy="10" r="3.2"/><path d="M10 2.4v2M10 15.6v2M2.4 10h2M15.6 10h2M4.6 4.6l1.4 1.4M14 14l1.4 1.4M15.4 4.6 14 6M6 14l-1.4 1.4"/>'
  };

  function icon(name, size, cls) {
    var d = P[name];
    if (!d) return '';
    var s = size || 20;
    return '<svg viewBox="0 0 20 20" width="' + s + '" height="' + s + '" fill="none" ' +
      'stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" ' +
      'aria-hidden="true" focusable="false"' + (cls ? ' class="' + cls + '"' : '') + '>' + d + '</svg>';
  }

  /* Gevulde variant — voor sterren en andere massieve vormen. */
  function iconFill(name, size, cls) {
    var d = P[name];
    if (!d) return '';
    var s = size || 16;
    return '<svg viewBox="0 0 20 20" width="' + s + '" height="' + s + '" fill="currentColor" ' +
      'stroke="none" aria-hidden="true" focusable="false"' + (cls ? ' class="' + cls + '"' : '') + '>' + d + '</svg>';
  }

  root.VMIcon = icon;
  root.VMIconFill = iconFill;
  root.VMIcons = P;
})(window);
