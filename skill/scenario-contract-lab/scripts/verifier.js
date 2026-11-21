#!/usr/bin/env node
/*
 * Vérifie un scénario « Contract Lab » avec le moteur de l'outil.
 * Checks a Contract Lab scenario with the tool's engine.
 *
 * Usage : node verifier.js scenario.md [--lang fr|en]
 * Langue des messages : --lang, sinon anglais si le scénario est détecté comme anglais
 * (front matter droit: uk, titres « ### Answer », texte en anglais), sinon français.
 * Affiche, étape par étape, les éléments, leurs relations et le verdict
 * calculé par l'outil (valide, à risque, nulle, violée), avec les garde-fous
 * manquants et les calculs. Code de sortie 1 s'il reste des erreurs bloquantes.
 */
'use strict';
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
let lang = null;
const li = args.findIndex(a => a === '--lang' || a.startsWith('--lang='));
if (li >= 0) { lang = args[li].includes('=') ? args[li].split('=')[1] : args[li + 1]; args.splice(li, args[li].includes('=') ? 1 : 2); }
const file = args[0];
if (!file) { console.error('Usage : node verifier.js scenario.md [--lang fr|en]'); process.exit(2); }
const md = fs.readFileSync(file, 'utf8');

/* détection de la langue du scénario */
function detectLang(src) {
  const fm = src.replace(/\r/g, '').match(/^\s*---\n([\s\S]*?)\n---/);
  if (fm && /^\s*(droit|law|jurisdiction)\s*:\s*(uk|england|england_wales|english_law|gb|ew)\b/im.test(fm[1])) return 'en';
  if (/^###\s+(💡\s*)?(answer|explanation)s?\b/im.test(src)) return 'en';
  if (/^###\s+(💡\s*)?(réponse|reponse)\b/im.test(src)) return 'fr';
  const words = src.toLowerCase().match(/[a-zàâçéèêëîïôûùüÿœ']+/g) || [];
  const EN = new Set(['the', 'and', 'of', 'is', 'to', 'with', 'for', 'employee', 'employer', 'without', 'this', 'it']);
  const FR = new Set(['le', 'la', 'les', 'des', 'et', 'est', 'du', 'une', 'un', 'salarié', 'employeur', 'sans', 'pour']);
  let en = 0, fr = 0; words.forEach(w => { if (EN.has(w)) en++; if (FR.has(w)) fr++; });
  return en > fr ? 'en' : 'fr';
}
if (lang !== 'fr' && lang !== 'en') lang = detectLang(md);
const EN = lang === 'en';

global.window = global;
const lib = f => require(path.join(__dirname, 'lib', f + '.js'));
lib('i18n'); lib('i18n-en');
const P = global.P;
P.lang = lang;   // avant model.js : familles et relations sont traduites au chargement
['model', 'catalog-fr-en', 'catalog-uk', 'scenario'].forEach(lib);

const M = EN ? {
  scenario: 'Scenario', steps: n => `${n} step(s)`, noStep: 'ERROR: no step (missing "##" headings?)',
  err: (s, l, t, m) => `ERROR step ${s}, line ${l}: "${t}" — ${m}`, intro: ' (text placed before the first "##")',
  masked: '   (verdicts hidden on screen: verification off)', question: '   ❓ question: ', noExpl: '   (no explanation)',
  open: '     (open question)', reveal: '     commands at the reveal: ', after: '     (state below: after the reveal)',
  wNoRight: s => `step ${s}: multiple-choice question without a right answer [x]`, wOne: s => `step ${s}: question with a single choice`,
  wNoExpl: s => `step ${s}: question without explanation (neither "### Answer" nor choice explanations)`,
  wShown: (s, ids) => `step ${s}: question without "verification off" while ${ids} shows a verdict — the canvas may give the answer away`,
  wNoText: s => `step ${s}: no commentary`, wLong: (s, n) => `step ${s}: long commentary (${n} characters), split it?`,
  wNote: (s, id, n) => `step ${s}: bubble on ${id} is long (${n} characters)`,
  or: ' or ', via: ' (via ', otherwise: ' — otherwise: ', rels: '   relations: ', zoom: '   zoom on: ', law: 'Law: ',
  warns: 'Warnings:', nErr: n => `${n} error(s) to fix.`, ok: 'No errors. Compare the verdicts above with the commentary.'
} : {
  scenario: 'Scénario', steps: n => `${n} étape(s)`, noStep: 'ERREUR : aucune étape (titres « ## » manquants ?)',
  err: (s, l, t, m) => `ERREUR étape ${s}, ligne ${l} : « ${t} » — ${m}`, intro: ' (texte placé avant le premier « ## »)',
  masked: '   (verdicts masqués à l\'écran : verification off)', question: '   ❓ question : ', noExpl: '   (sans explication)',
  open: '     (question ouverte)', reveal: '     commandes à la révélation : ', after: '     (état ci-dessous : après révélation)',
  wNoRight: s => `étape ${s} : question à choix sans bonne réponse [x]`, wOne: s => `étape ${s} : question avec un seul choix`,
  wNoExpl: s => `étape ${s} : question sans explication (ni « ### Réponse » ni explications de choix)`,
  wShown: (s, ids) => `étape ${s} : question sans « verification off » alors que ${ids} affiche un verdict — le canevas peut donner la réponse`,
  wNoText: s => `étape ${s} : pas de commentaire`, wLong: (s, n) => `étape ${s} : commentaire long (${n} caractères), à scinder ?`,
  wNote: (s, id, n) => `étape ${s} : bulle sur ${id} longue (${n} caractères)`,
  or: ' ou ', via: ' (via ', otherwise: ' — sinon : ', rels: '   relations : ', zoom: '   zoom sur : ', law: 'Droit : ',
  warns: 'Avertissements :', nErr: n => `${n} erreur(s) à corriger.`, ok: 'Aucune erreur. Comparez les verdicts ci-dessus avec les commentaires.'
};

const sc = P.parseScenario(md);

let blocking = 0;
const warn = [];
console.log(`${M.scenario} : ${sc.title}`.replace(' :', EN ? ':' : ' :'));
console.log(`${M.steps(sc.steps.length)}\n`);
if (!sc.steps.length) { console.log(M.noStep); process.exit(1); }

const errs = [];
P.buildState(sc, sc.steps.length - 1, errs);
const J = P.JURIS[P.jurisId] || {};
console.log(M.law + (EN ? (J.labelEn || J.label) : J.label) + '\n');
errs.forEach(e => { blocking++; console.log(M.err(e.step + 1, e.line, e.text, P.t(e.msg))); });
if (errs.length) console.log('');

const ICON = { ok: '✅', risk: '⚠️ ', ko: '⛔', violee: '⚡', neutral: '· ' };
sc.steps.forEach((s, i) => {
  const st = P.buildState(sc, i, null, true);
  // le vérificateur montre toujours les verdicts, même si l'étape les masque à l'écran
  const masked = st.options.verif === false;
  st.options.verif = true;
  const an = P.analyze(st);
  const C = P.CATALOG;
  const name = id => (st.entities[id] ? st.entities[id].name : id);
  console.log(`── [${i + 1}/${sc.steps.length}] ${s.title}${s.title === 'Introduction' ? M.intro : ''}`);
  if (masked) console.log(M.masked);
  if (s.question) {
    const q = s.question, L = 'ABCDEFGHIJ';
    console.log(M.question + q.text);
    q.choices.forEach((c, k) => console.log(`     ${c.correct ? '[x]' : '[ ]'} ${L[k] || k + 1}. ${c.text}${c.explain ? '' : M.noExpl}`));
    if (!q.choices.length) console.log(M.open);
    if (q.choices.length && !q.choices.some(c => c.correct)) warn.push(M.wNoRight(i + 1));
    if (q.choices.length === 1) warn.push(M.wOne(i + 1));
    if (!q.answerMd && !q.choices.some(c => c.explain)) warn.push(M.wNoExpl(i + 1));
    if (q.reveal.length) console.log(M.reveal + q.reveal.map(c => c.text).join(' ; '));
    const pre = P.buildState(sc, i, null, false);
    if (pre.options.verif !== false) {
      const pa = P.analyze(pre), shown = (pre.view.focus || []).filter(id => pa.info[id] && pa.info[id].status !== 'neutral');
      if (shown.length) warn.push(M.wShown(i + 1, shown.join(', ')));
    }
    console.log(M.after);
  } else if (!s.md.trim()) warn.push(M.wNoText(i + 1));
  if (s.md.length > 1600) warn.push(M.wLong(i + 1, s.md.length));
  Object.entries(st.view.notes || {}).forEach(([id, t]) => { if (t.length > 80) warn.push(M.wNote(i + 1, id, t.length)); });
  for (const id of an.ids) {
    const e = st.entities[id], d = P.def(e), I = an.info[id];
    const params = Object.entries(e.params || {}).map(([k, v]) => `${k}=${v}`).join(' ');
    let line = `   ${ICON[I.status] || '· '} ${id} « ${e.name} » (${d.label})${params ? ' [' + params + ']' : ''}`;
    if (EN) line = line.replace(' « ', ' "').replace(' » (', '" (');
    if (I.verdict) line += ` → ${I.verdict}`;
    console.log(line);
    I.reqs.forEach(r => {
      const lab = r.custom ? r.label : r.any.map(k => (C[k] ? C[k].label : k)).join(M.or);
      console.log(`        ${r.ok ? '✔' : '✘'} ${lab}${r.ok && r.via ? M.via + name(r.via) + ')' : ''}${!r.ok ? M.otherwise + r.effet : ''}`);
    });
    I.issues.filter(x => x.other).forEach(x => console.log(`        ⊘ ${name(x.other)} : ${x.effet}`));
    I.calc.forEach(c => console.log(`        🧮 ${c}`));
    if (I.calcDetail) console.log(`           ${I.calcDetail}`);
  }
  const rels = st.links.map(l => `${l.from} ${(P.RELS[l.rel] || P.RELS.lien).label} ${l.to}${l.label ? (EN ? ' "' + l.label + '"' : ' « ' + l.label + ' »') : ''}`);
  if (rels.length) console.log(M.rels + rels.join(' ; '));
  if (st.view.perspective) console.log(M.zoom + name(st.view.perspective));
  console.log('');
});

if (warn.length) { console.log(M.warns); warn.forEach(w => console.log('  - ' + w)); console.log(''); }
console.log(blocking ? M.nErr(blocking) : M.ok);
process.exit(blocking ? 1 : 0);
