#!/usr/bin/env node
/*
 * Régénère les captures d'écran de la documentation (docs/images/*.jpg, docs/images/en/*.jpg)
 * et les visuels de communication (visuels/<langue>/ : aperçus de partage, posts, stories,
 * images d'articles ; voir visuels/README.md).
 * Usage (depuis le dossier du projet) : node tools/screenshots.js [doc|visuels|compo] (détail plus bas)
 *
 * Pilote Microsoft Edge (ou Chrome) sans fenêtre via son protocole de débogage :
 * aucune dépendance à installer. Chemin du navigateur modifiable avec BROWSER=…
 */
'use strict';
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');
const { spawn } = require('child_process');

const root = path.join(__dirname, '..');
const out = path.join(root, 'docs', 'images');
const PORT = 8799, DEBUG = 9399;
const BROWSER = process.env.BROWSER || [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
].find(p => fs.existsSync(p));

const DESKTOP = { width: 1366, height: 800, deviceScaleFactor: 1, mobile: false };
const WIDE = { width: 1440, height: 860, deviceScaleFactor: 1, mobile: false };
const PHONE = { width: 390, height: 844, deviceScaleFactor: 2, mobile: true };

/* Chaque capture : page, taille, thème, et la mise en scène à exécuter dans la page avant la photo. */
const SHOTS = [
  { file: 'cinema-non-concurrence-jour', url: '?scenario=non-concurrence&etape=4', size: DESKTOP, theme: 'light' },
  { file: 'question-revelee-nuit', url: '?scenario=non-concurrence&etape=6', size: DESKTOP, theme: 'dark',
    js: `foldLegend(); key('2'); await wait(300); App.reveal(); await wait(900); key('2'); key('3');` },
  { file: 'libre-verification-jour', url: '', size: DESKTOP, theme: 'light',
    js: `document.querySelector('#tool-example').click(); await wait(300); App.select({ kind: 'node', id: 'ESS' });` },
  { file: 'bibliotheque-jour', url: '?scenarios', size: DESKTOP, theme: 'light' },
  { file: 'faute-grave-nuit', url: '?scenario=faute-grave&etape=4', size: DESKTOP, theme: 'dark',
    js: `foldLegend();` },
  { file: 'telephone-question-nuit', url: '?scenario=non-concurrence&etape=6', size: PHONE, theme: 'dark',
    js: `App.reveal(); await wait(700); document.querySelector('[data-card="2"]').click(); await wait(200);
         document.querySelector('.qinline').scrollIntoView({ block: 'start' });` },
  { file: 'telephone-schema-jour', url: '?scenario=licenciement&etape=6', size: PHONE, theme: 'light' },
  /* documentation anglaise (docs/images/en/) : interface anglaise, droit anglais */
  { file: 'en/cinema-covenants-day', url: '?lang=en&scenario=uk-covenants&etape=4', size: DESKTOP, theme: 'light' },
  { file: 'en/question-revealed-night', url: '?lang=en&scenario=uk-covenants&etape=5', size: DESKTOP, theme: 'dark',
    js: `foldLegend(); key('2'); await wait(300); App.reveal(); await wait(900); key('2'); key('1');` },
  { file: 'en/free-check-day', url: '?lang=en', size: DESKTOP, theme: 'light',
    js: `const s = document.querySelector('#opt-droit'); s.value = 'uk'; s.dispatchEvent(new Event('change')); await wait(300);
         document.querySelector('#tool-example').click(); await wait(400);
         const st = App.state, an = App.an, ids = Object.keys(st.entities);
         const id = ids.slice().sort((a, b) => an.info[b].reqs.length - an.info[a].reqs.length)[0];
         App.select({ kind: 'node', id }); await wait(200); App.fit(false); document.querySelector('#toast').classList.remove('show');` },
  { file: 'en/library-day', url: '?lang=en&scenarios', size: DESKTOP, theme: 'light' },
  { file: 'en/phone-question-night', url: '?lang=en&scenario=uk-misconduct&etape=5', size: PHONE, theme: 'dark',
    js: `App.reveal(); await wait(700); const c = document.querySelector('.qcard.correct') || document.querySelector('[data-card="0"]'); c.click(); await wait(200);
         document.querySelector('.qinline').scrollIntoView({ block: 'start' });` },
  { file: 'en/phone-diagram-day', url: '?lang=en&scenario=uk-redundancy&etape=5', size: PHONE, theme: 'light' }
];

/* ---------- visuels de communication (visuels/<langue>/) : voir visuels/README.md
 * 1. captures de l'application, par langue (visuels/<langue>/captures/*.png) ;
 * 2. mises en scène par tools/visuels.html (titre, accroche, capture) aux formats des réseaux. */
const VIS = path.join(root, 'visuels');
const SHOW = {   // scénarios « vitrines » de chaque langue
  fr: { cinema: '?scenario=non-concurrence&etape=6', sombre: '?scenario=faute-grave&etape=3', phone: '?scenario=non-concurrence&etape=6', droit: 'fr' },
  en: { cinema: '?lang=en&scenario=uk-covenants&etape=5', sombre: '?lang=en&scenario=uk-redundancy&etape=6', phone: '?lang=en&scenario=uk-misconduct&etape=5', droit: 'uk' },
  es: { cinema: '?lang=es&scenario=es-no-competencia&etape=4', sombre: '?lang=es&scenario=es-improcedente-nulo&etape=5', phone: '?lang=es&scenario=es-no-competencia&etape=4', droit: 'es' }
};
const CAPTURES = [];
Object.keys(SHOW).forEach(lang => {
  const s = SHOW[lang], dir = path.join(VIS, lang, 'captures'), q = lang === 'fr' ? '' : `?lang=${lang}`;
  CAPTURES.push(
    { file: path.join(dir, 'cinema-question.png'), url: s.cinema, size: WIDE, theme: 'light',
      js: `foldLegend(); key('2'); await wait(300); App.reveal(); await wait(900); key('2');` },
    { file: path.join(dir, 'cinema-rupture-nuit.png'), url: s.sombre, size: WIDE, theme: 'dark',
      js: `foldLegend(); App.reveal(); await wait(900);` },
    { file: path.join(dir, 'libre-nuit.png'), url: q, size: WIDE, theme: 'dark',
      js: `const s = document.querySelector('#opt-droit'); if (s.value !== '${s.droit}') { s.value = '${s.droit}'; s.dispatchEvent(new Event('change')); await wait(300); }
           document.querySelector('#tool-example').click(); await wait(400);
           const an = App.an, ids = Object.keys(App.state.entities);
           const id = ids.slice().sort((a, b) => an.info[b].reqs.length - an.info[a].reqs.length)[0];
           App.select({ kind: 'node', id }); await wait(200); App.fit(false); document.querySelector('#toast').classList.remove('show');` },
    { file: path.join(dir, 'telephone-question.png'), url: s.phone, size: PHONE, theme: 'dark',
      js: `App.reveal(); await wait(700); const c = document.querySelector('.qcard.correct') || document.querySelector('[data-card="0"]'); c.click(); await wait(200);
           document.querySelector('.qinline').scrollIntoView({ block: 'start' });` }
  );
});
/* formats : og (aperçu de lien : Facebook, LinkedIn, X, Mastodon, WhatsApp), carré, portrait, story */
const FORMATS = {
  og: { width: 1200, height: 630, img: 'cinema-question' },
  carre: { width: 1080, height: 1080, img: 'cinema-question' },
  portrait: { width: 1080, height: 1350, img: 'libre-nuit' },
  story: { width: 1080, height: 1920, img: 'telephone-question' }
};
const COMPOS = [];
Object.keys(SHOW).forEach(lang => Object.keys(FORMATS).forEach(fmt => {
  const F = FORMATS[fmt];
  COMPOS.push({ file: path.join(VIS, lang, fmt + '.png'), compose: true, theme: 'dark',
    page: `tools/visuels.html?lang=${lang}&fmt=${fmt}&img=../visuels/${lang}/captures/${F.img}.png`,
    size: { width: F.width, height: F.height, deviceScaleFactor: 1, mobile: false } });
}));

/* node tools/screenshots.js           → tout (documentation et visuels)
 * node tools/screenshots.js doc       → seulement les captures de la documentation
 * node tools/screenshots.js visuels   → seulement les visuels (captures et mises en scène)
 * node tools/screenshots.js compo     → seulement les mises en scène (après retouche de tools/visuels.html)
 * ONLY=visuels/es node tools/screenshots.js visuels → seulement les images dont le chemin commence ainsi */
const MODE = process.argv[2] || 'tout';
const TODO = { doc: SHOTS, visuels: CAPTURES.concat(COMPOS), compo: COMPOS }[MODE] || SHOTS.concat(CAPTURES, COMPOS);
// fichier final : PNG au chemin absolu donné, sinon JPEG de la documentation (docs/images/<nom>.jpg)
const outFile = s => path.isAbsolute(s.file) ? s.file : path.join(out, s.file + '.jpg');
const rel = s => path.relative(root, outFile(s)).split(path.sep).join('/');

/* ---------- petit serveur statique */
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.md': 'text/markdown', '.png': 'image/png', '.jpg': 'image/jpeg', '.json': 'application/json' };
const server = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  if (!f.startsWith(root)) { r.writeHead(403); r.end(); return; }
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': (TYPES[path.extname(f)] || 'application/octet-stream') + ';charset=utf-8' }); r.end(d); });
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  if (!BROWSER) throw new Error('Navigateur introuvable : indiquez son chemin avec BROWSER=…');
  fs.mkdirSync(out, { recursive: true });
  await new Promise(r => server.listen(PORT, r));
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'contract-lab-shots-'));
  const browser = spawn(BROWSER, ['--headless=new', `--remote-debugging-port=${DEBUG}`, `--user-data-dir=${profile}`,
    '--no-first-run', '--hide-scrollbars', '--force-color-profile=srgb', 'about:blank'], { stdio: 'ignore' });
  try {
    let target;
    for (let i = 0; i < 50 && !target; i++) {
      await sleep(200);
      try { target = (await (await fetch(`http://127.0.0.1:${DEBUG}/json/list`)).json()).find(t => t.type === 'page'); } catch (e) { /* pas encore prêt */ }
    }
    if (!target) throw new Error('Le navigateur ne répond pas sur le port de débogage');
    const ws = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
    let id = 0; const pending = new Map();
    ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
    const send = (method, params) => new Promise((res, rej) => {
      const i = ++id; pending.set(i, m => m.error ? rej(new Error(method + ' : ' + m.error.message)) : res(m.result));
      ws.send(JSON.stringify({ id: i, method, params: params || {} }));
    });
    await send('Page.enable'); await send('Runtime.enable');

    // ONLY=docs/images/en/ node tools/screenshots.js doc : ne refait que les images dont le chemin commence ainsi
    for (const s of TODO.filter(x => !process.env.ONLY || rel(x).startsWith(process.env.ONLY))) {
      await send('Emulation.setDeviceMetricsOverride', s.size);
      await send('Emulation.setTouchEmulationEnabled', { enabled: !!s.size.mobile });
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: s.theme }] });
      // repartir d'un stockage vide : thème du système émulé, pas de travail en cours
      await send('Runtime.evaluate', { expression: 'try { localStorage.clear(); } catch (e) {}' });
      await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/` + (s.page || 'index.html' + s.url) });
      let r;
      if (s.compose) {   // mise en scène : attendre le chargement de la capture et des polices
        await sleep(400);
        r = await send('Runtime.evaluate', { expression: `(async () => { for (let i = 0; i < 50 && !document.body.dataset.ready; i++) await new Promise(r => setTimeout(r, 100)); await document.fonts.ready; })()`, awaitPromise: true });
        await sleep(200);
      } else {
        await sleep(1800);
        const prelude = `const wait = ms => new Promise(r => setTimeout(r, ms));
          const key = k => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
          const foldLegend = () => document.querySelector('#legend').classList.add('collapsed');`;
        r = await send('Runtime.evaluate', { expression: `(async () => { ${prelude} ${s.js || ''} })()`, awaitPromise: true });
        await sleep(1600);   // fin des animations (apparition, recadrage)
      }
      if (r.exceptionDetails) throw new Error(rel(s) + ' : ' + r.exceptionDetails.exception.description);
      const file = outFile(s), png = path.isAbsolute(s.file);
      const shot = await send('Page.captureScreenshot', png ? { format: 'png' } : { format: 'jpeg', quality: 82 });
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
      console.log('capturé  ' + rel(s) + `  (${Math.round(fs.statSync(file).size / 1024)} ko)`);
    }
    ws.close();
  } finally {
    browser.kill();
    server.close();
    await sleep(500);
    try { fs.rmSync(profile, { recursive: true, force: true }); } catch (e) { /* profil encore verrouillé : sans gravité */ }
  }
}
main().catch(e => { console.error('Échec : ' + e.message); process.exit(1); });
