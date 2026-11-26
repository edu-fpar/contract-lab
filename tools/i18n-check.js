#!/usr/bin/env node
/*
 * Vérifie les dictionnaires de l'interface (js/i18n-en.js, js/i18n-es.js).
 * Usage (depuis le dossier du projet) : node tools/i18n-check.js [--list] [--unused]
 *
 *  - extrait les chaînes passées au traducteur : t('…') et P.t('…') dans app.js et model.js,
 *    P.t('…') dans scenario.js, tr('…') dans intro-launcher.js ;
 *  - extrait les textes statiques d'index.html (texte, title, placeholder, aria-label, <title>) ;
 *  - signale les chaînes absentes de chaque dictionnaire et les variables {x} qui ne correspondent pas.
 * --list affiche toutes les chaînes extraites, --unused les entrées des dictionnaires jamais utilisées
 * (certaines sont légitimes : chaînes construites à l'exécution). Code de sortie 1 s'il manque quelque chose.
 * Adapté de capital-lab/tools/i18n-check.js.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');

const SOURCES = [
  ['js/app.js', ['t', 'P\\.t']], ['js/model.js', ['t', 'P\\.t']], ['js/scenario.js', ['P\\.t']],
  ['js/scorm.js', ['P\\.t']], ['js/intro-launcher.js', ['tr']]
];
const LIT = String.raw`('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*"|` + '`(?:[^`\\\\$]|\\\\.|\\$(?!\\{))*`)';

const keys = new Map();   // chaîne → lieux
const add = (s, where) => { if (!keys.has(s)) keys.set(s, []); keys.get(s).push(where); };

for (const [file, fns] of SOURCES) {
  if (!fs.existsSync(path.join(root, file))) continue;
  const src = read(file);
  for (const fn of fns) {
    const re = new RegExp(String.raw`(?<![\w.$])` + fn + String.raw`\(\s*` + LIT, 'g');
    let m;
    while ((m = re.exec(src))) {
      // eslint-disable-next-line no-eval
      const s = eval(m[1]);
      add(s, file + ':' + (src.slice(0, m.index).split('\n').length));
    }
  }
}

/* textes statiques d'index.html, découpés comme les nœuds texte du DOM (P.translateDom) */
const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const html = read('index.html');
const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1];
if (title) add(decode(title).trim(), 'index.html <title>');
const body = html.slice(html.indexOf('<body')).replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<textarea[\s\S]*?<\/textarea>/g, '');
const hasWord = s => /\p{L}{2,}/u.test(s);
const IGNORE = new Set(['FR', 'EN', 'ES', 'Contract Lab', 'Studio', 'SCORM', 'Markdown']);
let m;
const txt = />([^<]+)</g;
while ((m = txt.exec(body))) { const s = decode(m[1]).trim(); if (s && hasWord(s) && !IGNORE.has(s)) add(s, 'index.html'); }
const attr = /\s(?:title|placeholder|aria-label)="([^"]*)"/g;
while ((m = attr.exec(body))) { const s = decode(m[1]).trim(); if (s && hasWord(s) && !IGNORE.has(s)) add(s, 'index.html [attr]'); }

if (process.argv.includes('--list')) { for (const [k, w] of keys) console.log(JSON.stringify(k) + '  ← ' + w.join(', ')); }

/* dictionnaires */
global.window = global;
global.P = { I18N: {} };
['i18n-en', 'i18n-es'].forEach(f => { const p = path.join(root, 'js', f + '.js'); if (fs.existsSync(p)) require(p); });
const vars = s => Array.from(String(s).matchAll(/\{(\w+)\}/g), x => x[1]).sort().join(',');
let bad = 0;
for (const lang of ['en', 'es']) {
  const d = global.P.I18N[lang] || {};
  const missing = [], varErr = [];
  for (const [k, w] of keys) {
    if (d[k] == null) missing.push(JSON.stringify(k) + '  ← ' + w[0]);
    else if (vars(k) !== vars(d[k])) varErr.push(JSON.stringify(k) + ' → ' + JSON.stringify(d[k]));
  }
  const unused = Object.keys(d).filter(k => !keys.has(k));
  console.log(`\n[${lang}] ${keys.size} chaînes, ${missing.length} manquante(s), ${varErr.length} variable(s) incohérente(s), ${unused.length} inutilisée(s)`);
  missing.forEach(x => console.log('  manque : ' + x));
  varErr.forEach(x => console.log('  variables : ' + x));
  if (process.argv.includes('--unused')) unused.forEach(x => console.log('  inutilisée : ' + JSON.stringify(x)));
  bad += missing.length + varErr.length;
}
/* clés de en absentes de es (et inversement) : les deux dictionnaires doivent rester alignés */
const en = global.P.I18N.en || {}, es = global.P.I18N.es || {};
const onlyEn = Object.keys(en).filter(k => es[k] == null), onlyEs = Object.keys(es).filter(k => en[k] == null);
if (onlyEn.length || onlyEs.length) {
  console.log(`\n[en/es] ${onlyEn.length} clé(s) seulement en anglais, ${onlyEs.length} seulement en espagnol`);
  onlyEn.forEach(k => console.log('  seulement en : ' + JSON.stringify(k)));
  onlyEs.forEach(k => console.log('  seulement es : ' + JSON.stringify(k)));
  bad += onlyEn.length + onlyEs.length;
}
process.exit(bad ? 1 : 0);
