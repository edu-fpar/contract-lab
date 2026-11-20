#!/usr/bin/env node
/*
 * Vérifie un scénario « Contract Lab » avec le moteur de l'outil.
 * Usage : node verifier.js scenario.md
 * Affiche, étape par étape, les éléments, leurs relations et le verdict
 * calculé par l'outil (valide, à risque, nulle, violée), avec les garde-fous
 * manquants et les calculs. Code de sortie 1 s'il reste des erreurs bloquantes.
 */
'use strict';
const fs = require('fs');
const path = require('path');

global.window = global;
require(path.join(__dirname, 'lib', 'model.js'));
require(path.join(__dirname, 'lib', 'scenario.js'));
const P = global.P;

const file = process.argv[2];
if (!file) { console.error('Usage : node verifier.js scenario.md'); process.exit(2); }
const md = fs.readFileSync(file, 'utf8');
const sc = P.parseScenario(md);
const C = P.CATALOG;

let blocking = 0;
const warn = [];
console.log(`Scénario : ${sc.title}`);
console.log(`${sc.steps.length} étape(s)\n`);
if (!sc.steps.length) { console.log('ERREUR : aucune étape (titres « ## » manquants ?)'); process.exit(1); }

const errs = [];
P.buildState(sc, sc.steps.length - 1, errs);
errs.forEach(e => { blocking++; console.log(`ERREUR étape ${e.step + 1}, ligne ${e.line} : « ${e.text} » — ${e.msg}`); });
if (errs.length) console.log('');

const ICON = { ok: '✅', risk: '⚠️ ', ko: '⛔', violee: '⚡', neutral: '· ' };
sc.steps.forEach((s, i) => {
  const st = P.buildState(sc, i, null, true);
  // le vérificateur montre toujours les verdicts, même si l'étape les masque à l'écran
  const masked = st.options.verif === false;
  st.options.verif = true;
  const an = P.analyze(st);
  const name = id => (st.entities[id] ? st.entities[id].name : id);
  console.log(`── [${i + 1}/${sc.steps.length}] ${s.title}${s.title === 'Introduction' ? ' (texte placé avant le premier « ## »)' : ''}`);
  if (masked) console.log('   (verdicts masqués à l\'écran : verification off)');
  if (s.question) {
    const q = s.question, L = 'ABCDEFGHIJ';
    console.log(`   ❓ question : ${q.text}`);
    q.choices.forEach((c, k) => console.log(`     ${c.correct ? '[x]' : '[ ]'} ${L[k] || k + 1}. ${c.text}${c.explain ? '' : '   (sans explication)'}`));
    if (!q.choices.length) console.log('     (question ouverte)');
    if (q.choices.length && !q.choices.some(c => c.correct)) warn.push(`étape ${i + 1} : question à choix sans bonne réponse [x]`);
    if (q.choices.length === 1) warn.push(`étape ${i + 1} : question avec un seul choix`);
    if (!q.answerMd && !q.choices.some(c => c.explain)) warn.push(`étape ${i + 1} : question sans explication (ni « ### Réponse » ni explications de choix)`);
    if (q.reveal.length) console.log(`     commandes à la révélation : ${q.reveal.map(c => c.text).join(' ; ')}`);
    const pre = P.buildState(sc, i, null, false);
    if (pre.options.verif !== false) {
      const pa = P.analyze(pre), shown = (pre.view.focus || []).filter(id => pa.info[id] && pa.info[id].status !== 'neutral');
      if (shown.length) warn.push(`étape ${i + 1} : question sans « verification off » alors que ${shown.join(', ')} affiche un verdict — le canevas peut donner la réponse`);
    }
    console.log('     (état ci-dessous : après révélation)');
  } else if (!s.md.trim()) warn.push(`étape ${i + 1} : pas de commentaire`);
  if (s.md.length > 1600) warn.push(`étape ${i + 1} : commentaire long (${s.md.length} caractères), à scinder ?`);
  Object.entries(st.view.notes || {}).forEach(([id, t]) => { if (t.length > 80) warn.push(`étape ${i + 1} : bulle sur ${id} longue (${t.length} caractères)`); });
  for (const id of an.ids) {
    const e = st.entities[id], d = P.def(e), I = an.info[id];
    const params = Object.entries(e.params || {}).map(([k, v]) => `${k}=${v}`).join(' ');
    let line = `   ${ICON[I.status] || '· '} ${id} « ${e.name} » (${d.label})${params ? ' [' + params + ']' : ''}`;
    if (I.verdict) line += ` → ${I.verdict}`;
    console.log(line);
    I.reqs.forEach(r => {
      const lab = r.custom ? r.label : r.any.map(k => C[k].label).join(' ou ');
      console.log(`        ${r.ok ? '✔' : '✘'} ${lab}${r.ok && r.via ? ' (via ' + name(r.via) + ')' : ''}${!r.ok ? ' — sinon : ' + r.effet : ''}`);
    });
    I.issues.filter(x => x.other).forEach(x => console.log(`        ⊘ ${name(x.other)} : ${x.effet}`));
    I.calc.forEach(c => console.log(`        🧮 ${c}`));
  }
  const rels = st.links.map(l => `${l.from} ${(P.RELS[l.rel] || P.RELS.lien).label} ${l.to}${l.label ? ' « ' + l.label + ' »' : ''}`);
  if (rels.length) console.log(`   relations : ${rels.join(' ; ')}`);
  if (st.view.perspective) console.log(`   zoom sur : ${name(st.view.perspective)}`);
  console.log('');
});

if (warn.length) { console.log('Avertissements :'); warn.forEach(w => console.log('  - ' + w)); console.log(''); }
console.log(blocking ? `${blocking} erreur(s) à corriger.` : 'Aucune erreur. Comparez les verdicts ci-dessus avec les commentaires.');
process.exit(blocking ? 1 : 0);
