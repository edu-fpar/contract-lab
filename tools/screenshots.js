#!/usr/bin/env node
/*
 * Régénère les captures d'écran de la documentation (docs/images/*.jpg)
 * et les images de présentation à la racine (contract-lab*.png).
 * Usage (depuis le dossier du projet) : node tools/screenshots.js
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
  /* images de présentation (README, partage sur les réseaux) : à la racine, en PNG */
  { file: 'contract-lab', root: true, url: '?scenario=non-concurrence&etape=6', size: WIDE, theme: 'light',
    js: `foldLegend(); key('2'); await wait(300); App.reveal(); await wait(900); key('2');` },
  { file: 'contract-lab-libre', root: true, url: '', size: WIDE, theme: 'dark',
    js: `document.querySelector('#tool-example').click(); await wait(300); App.select({ kind: 'node', id: 'REN' }); await wait(200); App.fit(false);` },
  /* version anglaise : droit anglais (England & Wales) */
  { file: 'contract-lab-en', root: true, url: '?lang=en&scenario=uk-covenants&etape=5', size: WIDE, theme: 'light',
    js: `foldLegend(); key('2'); await wait(300); App.reveal(); await wait(900); key('2');` },
  { file: 'contract-lab-en-redundancy', root: true, url: '?lang=en&scenario=uk-redundancy&etape=6', size: WIDE, theme: 'dark',
    js: `foldLegend(); App.reveal(); await wait(900);` },
  { file: 'contract-lab-rupture', root: true, url: '?scenario=faute-grave&etape=3', size: WIDE, theme: 'light',
    js: `foldLegend(); App.reveal(); await wait(900); App.select({ kind: 'node', id: 'IL' });` }
];

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

    for (const s of SHOTS) {
      await send('Emulation.setDeviceMetricsOverride', s.size);
      await send('Emulation.setTouchEmulationEnabled', { enabled: !!s.size.mobile });
      await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: s.theme }] });
      // repartir d'un stockage vide : thème du système émulé, pas de travail en cours
      await send('Runtime.evaluate', { expression: 'try { localStorage.clear(); } catch (e) {}' });
      await send('Page.navigate', { url: `http://127.0.0.1:${PORT}/index.html${s.url}` });
      await sleep(1800);
      const prelude = `const wait = ms => new Promise(r => setTimeout(r, ms));
        const key = k => document.dispatchEvent(new KeyboardEvent('keydown', { key: k, bubbles: true }));
        const foldLegend = () => document.querySelector('#legend').classList.add('collapsed');`;
      const r = await send('Runtime.evaluate', { expression: `(async () => { ${prelude} ${s.js || ''} })()`, awaitPromise: true });
      if (r.exceptionDetails) throw new Error(s.file + ' : ' + r.exceptionDetails.exception.description);
      await sleep(1600);   // fin des animations (apparition, recadrage)
      const shot = await send('Page.captureScreenshot', s.root ? { format: 'png' } : { format: 'jpeg', quality: 82 });
      const file = s.root ? path.join(root, s.file + '.png') : path.join(out, s.file + '.jpg');
      fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
      console.log('capturé  ' + path.relative(root, file) + `  (${Math.round(fs.statSync(file).size / 1024)} ko)`);
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
