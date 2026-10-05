// Echte foto's en video's van de klant.
//
// Zet bestanden in public/assets/media/ en bouw opnieuw; ze worden automatisch gebruikt:
//   hero.mp4 (+ optioneel hero.jpg als stilstaand beeld)  → achtergrondvideo homepage
//   projecten/*.jpg|.jpeg|.webp|.png|.mp4                  → galerij op home en /projecten
//   video/*.mp4 (+ zelfde naam .jpg)                       → staande filmpjes in de videosectie
// Bestandsnaam = bijschrift: "kantoorpand-utrecht-800m2.jpg" → "Kantoorpand utrecht 800m2".
// Zolang er niets staat, vallen de pagina's terug op de placeholders in assets/img/.
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, extname, basename } from 'node:path';

const IMG = new Set(['.jpg', '.jpeg', '.webp', '.png', '.avif']);
const VID = new Set(['.mp4', '.webm']);

export function loadMedia(publicDir) {
  const dir = join(publicDir, 'assets/media');
  const has = f => existsSync(join(dir, f));
  // Naamsvermelding voor foto's onder een Creative Commons-licentie (credits.json).
  const credits = has('credits.json') ? JSON.parse(readFileSync(join(dir, 'credits.json'), 'utf8')) : [];
  const creditFor = f => credits.find(c => c.file === f) || null;
  const heroVideo = has('hero.mp4') ? '/assets/media/hero.mp4' : '';
  const heroPoster = has('hero.jpg') ? '/assets/media/hero.jpg' : '/assets/img/hero.jpg';

  const pdir = join(dir, 'projecten');
  const items = existsSync(pdir) ? readdirSync(pdir).sort().map(f => {
    const ext = extname(f).toLowerCase();
    if (!IMG.has(ext) && !VID.has(ext)) return null;
    const stem = basename(f, extname(f));
    const caption = stem.replace(/[-_]+/g, ' ').replace(/^\d+\s*/, '').replace(/^\w/, c => c.toUpperCase());
    const poster = VID.has(ext) && existsSync(join(pdir, stem + '.jpg')) ? `/assets/media/projecten/${stem}.jpg` : '';
    return { src: `/assets/media/projecten/${f}`, video: VID.has(ext), caption, poster, credit: creditFor('projecten/' + f) };
  }).filter(Boolean) : [];
  // Een .jpg die alleen als poster van een video dient, niet dubbel tonen.
  const videoStems = new Set(items.filter(i => i.video).map(i => basename(i.src, extname(i.src))));
  const gallery = items.filter(i => i.video || !videoStems.has(basename(i.src, extname(i.src))));

  const fallback = ['project-1', 'dekvloer-2', 'project-2', 'project-3', 'project-4', 'project-5', 'dekvloer-1', 'project-6', 'project-7', 'project-8']
    .map((n, i) => ({ src: `/assets/img/${n}.jpg`, video: false, caption: ['Kantoorpand', 'Afgereide dekvloer', 'Renovatie woonhuis', 'Bedrijfshal', 'Vloerverwarming', 'Kantoorruimte', 'Utiliteitsbouw', 'Appartementen', 'Herenhuis', 'Showroom'][i], poster: '' }));

  // Staande filmpjes (telefoon) voor de videosectie: video/*.mp4 met een .jpg als stilstaand beeld.
  const vdir = join(dir, 'video');
  const videos = existsSync(vdir) ? readdirSync(vdir).filter(f => extname(f).toLowerCase() === '.mp4').sort().map(f => {
    const stem = basename(f, extname(f));
    const webm = existsSync(join(vdir, stem + '.webm')) ? `/assets/media/video/${stem}.webm` : '';
    return { src: `/assets/media/video/${f}`, webm, video: true, poster: existsSync(join(vdir, stem + '.jpg')) ? `/assets/media/video/${stem}.jpg` : '', caption: stem.replace(/[-_]+/g, ' ').replace(/^\d+\s*/, '').replace(/^\w/, c => c.toUpperCase()), credit: null };
  }) : [];

  return { heroVideo, heroPoster, heroCredit: creditFor('hero.jpg'), credits, videos, gallery: gallery.length ? gallery : fallback, real: gallery.length > 0 };
}
