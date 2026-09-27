const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch({ args: ['--ignore-certificate-errors'] });
  const ctx = await b.newContext({ ignoreHTTPSErrors: true });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto('file:///home/user/Werkspotva/offerte/offerte.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
  const info = await page.evaluate(() => ({
    vellen: document.querySelectorAll('.vel').length,
    font: getComputedStyle(document.querySelector('h1')).fontFamily,
    hoogtes: [...document.querySelectorAll('.vel')].map(v => Math.round(v.getBoundingClientRect().height))
  }));
  console.log('vellen:', info.vellen, '| font:', info.font);
  console.log('hoogtes (px, A4 = 1123):', info.hoogtes.join(', '));
  await page.pdf({
    path: 'Varexo-offerte-klussenplatform.pdf',
    format: 'A4', printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });
  await b.close();
  console.log(errs.length ? 'FOUTEN: ' + errs.join('; ') : 'geen fouten');
})();
