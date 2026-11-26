/* ============================================================
 * Contract Lab — scénarios markdown, commandes, rendu markdown
 * ============================================================ */
(function () {
  'use strict';
  const P = window.P;

  /* ------------------------------------------------------------ mots-clés */
  /* français, anglais, espagnol (formes sans accents : « verificación » → verificacion) */
  const KW = {
    retirer: ['retirer', 'supprimer', 'enlever', 'remove', 'delete', 'quitar', 'eliminar', 'retirar', 'suprimir'],
    renommer: ['renommer', 'rename', 'renombrar'],
    type: ['type', 'tipo'],
    statut: ['statut', 'status', 'verdict', 'estado', 'veredicto'],
    condition: ['condition', 'exigence', 'condicion', 'requisito'],
    param: ['param', 'parametre', 'parametres', 'params', 'parametro', 'parametros'],
    icone: ['icone', 'icon', 'emoji', 'icono'],
    vue: ['vue', 'perspective', 'view', 'zoom', 'vista', 'perspectiva'],
    focus: ['focus', 'surligner', 'highlight', 'montrer', 'resaltar', 'destacar', 'enfocar'],
    note: ['note', 'bulle', 'nota'],
    effacer: ['effacer', 'vider', 'reset', 'clear', 'borrar', 'limpiar'],
    duree: ['duree', 'duration', 'duracion'],
    regle: ['regle', 'option', 'rule', 'verification', 'check', 'checking', 'regla', 'opcion', 'verificacion'],
    droit: ['droit', 'law', 'jurisdiction', 'juridiction', 'derecho', 'ley', 'jurisdiccion'],
    disposition: ['disposition', 'layout', 'disposicion', 'reorganizar'],
    deplacer: ['deplacer', 'placer', 'move', 'mover', 'colocar'],
    selection: ['selection', 'selectionner', 'select', 'analyse', 'analyser', 'seleccion', 'seleccionar', 'analizar']
  };
  const KWMAP = {};
  Object.keys(KW).forEach(k => KW[k].forEach(w => { KWMAP[w] = k; }));
  const NONE = ['aucun', 'aucune', 'aucuns', 'aucunes', 'rien', 'none', 'off', '-', 'nothing', 'ninguno', 'ninguna', 'nada'];
  const isNone = tok => tok && NONE.includes(P.norm(tok.v));
  const STATUTS = {
    ok: ['ok', 'valide', 'valable', 'licite', 'reguliere', 'regulier', 'respectee', 'vert', 'valid', 'lawful', 'fair', 'green', 'valido', 'valida', 'licito', 'licita', 'procedente', 'regular', 'verde'],
    ko: ['ko', 'nulle', 'nul', 'illicite', 'irreguliere', 'irregulier', 'abusive', 'invalide', 'rouge', 'void', 'invalid', 'unlawful', 'unfair', 'unenforceable', 'red', 'nulo', 'nula', 'ilicito', 'ilicita', 'improcedente', 'irregular', 'invalido', 'invalida', 'rojo'],
    risk: ['risk', 'risque', 'a_risque', 'douteuse', 'orange', 'risky', 'at_risk', 'amber', 'riesgo', 'en_riesgo', 'dudoso', 'dudosa', 'naranja'],
    violee: ['violee', 'viole', 'manquement', 'breached', 'breach', 'violada', 'violado', 'incumplida', 'incumplido'],
    neutral: ['neutre', 'neutral', 'gris', 'sans', 'neutro', 'neutra'],
    auto: ['auto', 'automatique', 'aucun', 'aucune', 'automatic', 'automatico', 'ninguno']
  };
  const statutOf = w => Object.keys(STATUTS).find(k => STATUTS[k].includes(P.key(w))) || null;

  P.tokenize = function (s) {
    s = String(s).replace(/→|⇒/g, ' -> ');
    const re = /"([^"]*)"|“([^”]*)”|«\s*([^»]*?)\s*»|(\S+)/g;
    const out = []; let m;
    while ((m = re.exec(s))) {
      if (m[4] !== undefined) m[4].split(/(->)/).filter(Boolean).forEach(p => out.push({ v: p, q: false }));
      else out.push({ v: m[1] != null ? m[1] : (m[2] != null ? m[2] : m[3]), q: true });
    }
    return out;
  };

  P.resolve = function (st, tok, create, errs) {
    if (!tok) return null;
    const v = tok.v, E = st.entities;
    if (!tok.q && E[v]) return v;
    const n = P.norm(v);
    for (const id in E) if (P.norm(id) === n) return id;
    for (const id in E) if (P.norm(E[id].name) === n) return id;
    if (!create) return null;
    let id = tok.q ? P.slug(v) : v; const base = id; let k = 2;
    while (E[id]) id = base + '_' + (k++);
    const kind = P.kindOf(v) || 'clause';
    P.addEntity(st, { id, kind, name: tok.q || kind === 'clause' ? v : P.CATALOG[kind].label });
    if (errs) errs(`« ${v} » n'était pas déclaré : créé comme ${kind === 'clause' ? 'clause libre' : P.CATALOG[kind].label}`);
    return id;
  };

  /** cle=valeur → { cle: valeur } (valeur numérique si possible) */
  function kv(tok) {
    if (tok.q) return null;
    const m = tok.v.match(/^([A-Za-zÀ-ÿ_]+)=(.*)$/);
    if (!m) return null;
    let k = P.key(m[1]); const v = m[2];
    const al = (P.juris && P.juris.paramAliases) || {}; if (al[k]) k = al[k];
    if (k === 'icone' || k === 'icon') return { k: 'icone', v };
    if (k === 'categorie') return { k, v: P.catKey(v) || v };
    // droit espagnol : 1.221,50 (point des milliers, virgule décimale)
    const n = P.juris && P.juris.lang === 'es' && /^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(v) ? parseFloat(v.replace(/\./g, '').replace(',', '.')) : P.num(v);
    return { k: ({ anciennete_ans: 'anciennete', salaire_brut: 'salaire', mois: 'duree' })[k] || k, v: n == null ? v : n };
  }

  /* ------------------------------------------------------------ exécution d'une commande */
  P.runCommand = function (st, text, errs, line) {
    const t = P.tokenize(text);
    if (!t.length) return;
    const err = msg => { if (errs) errs.push({ line, text, msg }); };
    const arrow = t.findIndex(x => !x.q && x.v === '->');
    const kw0 = P.norm(t[0].v);
    let cmd = KWMAP[kw0];
    // « droit » est aussi un type (élément libre) : commande seulement si l'argument désigne un droit
    if (cmd === 'droit' && t[1] && !P.jurisOf(t[1].v) && P.kindOf(t[0].v)) cmd = null;
    if (!cmd && arrow > 0) return linkCmd(t, arrow);
    if (!cmd && P.relOf(t[0].v) && t.length >= 3 && !P.kindOf(t[0].v)) {
      // forme « limite A B C » : A (relation) B, A (relation) C
      return linkCmd([t[1], { v: '->', q: false }].concat(t.slice(2)).concat([{ v: t[0].v, q: false, rel: true }]), 1);
    }
    if (!cmd && P.kindOf(t[0].v)) return declCmd(P.kindOf(t[0].v), t.slice(1));
    if (!cmd) return err('Commande inconnue : « ' + t[0].v + ' »');
    const a = t.slice(1);
    const need = (tok, what) => { const id = P.resolve(st, tok); if (!id) err((what || 'Élément introuvable') + ' : ' + (tok ? tok.v : '?')); return id; };

    switch (cmd) {
      case 'retirer': {
        if (!a.length) return err('Que faut-il retirer ?');
        const ar = a.findIndex(x => x.v === '->');
        if (ar > 0) {
          const f = P.resolve(st, a[0]), to = P.resolve(st, a[ar + 1]);
          const l = f && to && P.findAnyLink(st, f, to);
          if (!l) return err('Lien introuvable');
          P.removeLink(st, l.from, l.to); return;
        }
        a.forEach(tok => { const id = P.resolve(st, tok); if (id) P.removeEntity(st, id); else err('Introuvable : ' + tok.v); });
        return;
      }
      case 'renommer': {
        const id = need(a[0]);
        if (!id || !a[1]) return err('Syntaxe : renommer ID "Nouveau nom"');
        st.entities[id].name = a.slice(1).map(x => x.v).join(' '); return;
      }
      case 'type': {
        const id = need(a[0]), k = a[1] && P.kindOf(a[1].v);
        if (!id || !k) return err('Syntaxe : type ID type (ex. type C1 cdd)');
        st.entities[id].kind = k; return;
      }
      case 'statut': {
        const id = need(a[0]); if (!id) return;
        const v = a[1] && !a[1].q ? statutOf(a[1].v) : null;
        if (!v) return err('Syntaxe : statut ID valide|nulle|risque|violee|neutre|auto ["texte"]');
        const txt = a.slice(2).map(x => x.v).join(' ').trim();
        st.entities[id].status = v === 'auto' ? null : { v, text: txt };
        return;
      }
      case 'condition': {
        const id = need(a[0]); if (!id) return;
        const e = st.entities[id];
        if (!a[1] || isNone(a[1])) { e.conds = []; return; }
        const label = a[1].v; let ok = null, level = 'grave', effet = '';
        a.slice(2).forEach(tok => {
          const w = P.key(tok.v);
          if (tok.q) { effet = tok.v; return; }
          if (['ok', 'oui', 'remplie', 'satisfaite', 'presente', 'vrai', 'yes', 'met', 'present', 'true', 'si', 'cumplida', 'satisfecha', 'verdadero'].includes(w)) ok = true;
          else if (['manque', 'non', 'absente', 'manquante', 'ko', 'faux', 'missing', 'no', 'unmet', 'false', 'falta', 'ausente', 'faltante', 'incumplida', 'falso'].includes(w)) ok = false;
          else if (['risque', 'leger', 'legere', 'risk', 'minor', 'riesgo', 'leve'].includes(w)) level = 'risque';
          else if (['grave', 'nullite', 'serious', 'major', 'nulidad'].includes(w)) level = 'grave';
          else if (['retirer', 'supprimer', 'remove', 'delete', 'quitar', 'eliminar'].includes(w)) ok = 'del';
          else err('Mot non compris : « ' + tok.v + ' »');
        });
        e.conds = (e.conds || []).filter(c => P.norm(c.label) !== P.norm(label));
        if (ok !== 'del') e.conds.push({ label, ok: ok !== false, level, effet });
        return;
      }
      case 'param': {
        const id = need(a[0]); if (!id) return;
        const e = st.entities[id]; e.params = e.params || {};
        a.slice(1).forEach(tok => { const p = kv(tok); if (p) { if (p.v === '' || isNone({ v: String(p.v) })) delete e.params[p.k]; else e.params[p.k] = p.v; } else err('Paramètre attendu sous la forme cle=valeur : ' + tok.v); });
        return;
      }
      case 'icone': {
        const id = need(a[0]); if (!id) return;
        st.entities[id].params = Object.assign(st.entities[id].params || {}, { icone: a[1] ? a[1].v : undefined });
        if (!a[1]) delete st.entities[id].params.icone;
        return;
      }
      case 'vue': {
        if (!a.length || isNone(a[0])) { st.view.perspective = null; return; }
        const id = need(a[0]); if (id) st.view.perspective = id; return;
      }
      case 'focus': {
        st.view.focus = [];
        if (!a.length || isNone(a[0])) return;
        a.forEach(tok => { const id = need(tok); if (id) st.view.focus.push(id); });
        return;
      }
      case 'note': {
        if (!a.length || isNone(a[0])) { st.view.notes = {}; return; }
        const id = need(a[0]); if (!id) return;
        if (!a[1] || isNone(a[1])) { delete st.view.notes[id]; return; }
        st.view.notes[id] = a.slice(1).map(x => x.v).join(' '); return;
      }
      case 'effacer': { const opt = st.options; Object.assign(st, P.newState()); st.options = opt; return; }
      case 'duree': return;
      case 'regle': {
        const w = a.map(x => P.key(x.v));
        const on = w.some(x => ['on', 'oui', 'actif', 'active', 'activee', 'vrai', 'true', 'yes', 'si', 'activa', 'activada', 'activo'].includes(x));
        const off = w.some(x => ['off', 'non', 'inactif', 'inactive', 'desactivee', 'faux', 'false', 'masquee', 'cachee', 'no', 'hidden', 'hide', 'desactivada', 'inactiva', 'oculta', 'apagada'].includes(x));
        if (!on && !off) return err('Syntaxe : verification on|off');
        st.options.verif = on; return;
      }
      case 'droit': {
        const j = a[0] && P.jurisOf(a[0].v);
        if (!j) return err('Droit inconnu : ' + (a[0] ? a[0].v : '?') + ' (' + Object.keys(P.JURIS).join(', ') + ')');
        st.options.droit = j; P.setJuris(j); return;
      }
      case 'disposition': Object.values(st.entities).forEach(e => { e.fixed = false; }); return;
      case 'deplacer': {
        const id = need(a[0]), x = P.num(a[1] && a[1].v), y = P.num(a[2] && a[2].v);
        if (!id || x == null || y == null) return err('Syntaxe : deplacer ID X Y');
        Object.assign(st.entities[id], { x, y, fixed: true }); return;
      }
      case 'selection': {
        if (!a.length || isNone(a[0])) { st.view.select = null; return; }
        const id = need(a[0]); if (id) st.view.select = id; return;
      }
    }

    function declCmd(kind, a) {
      if (!a.length) return err('Identifiant manquant');
      let id, name = null;
      if (a[0].q) { name = a[0].v; id = P.resolve(st, a[0], false) || P.slug(a[0].v); }
      else id = a[0].v;
      let x = null, y = null; const params = {};
      for (let k = 1; k < a.length; k++) {
        const tok = a[k], w = P.norm(tok.v);
        if (tok.q) { if (name == null) name = tok.v; continue; }
        if (['at', 'en', '@', 'pos', 'position', 'posicion'].includes(w)) {
          x = P.num(a[k + 1] && a[k + 1].v); y = P.num(a[k + 2] && a[k + 2].v); k += 2;
          if (x == null || y == null) err('Coordonnées invalides');
          continue;
        }
        let m = w.match(/^x=(.+)$/); if (m) { x = P.num(m[1]); continue; }
        m = w.match(/^y=(.+)$/); if (m) { y = P.num(m[1]); continue; }
        const p = kv(tok); if (p) { params[p.k] = p.v; continue; }
        name = name == null ? tok.v : name + ' ' + tok.v;
      }
      const ex = st.entities[id];
      const o = { id, kind };
      if (name != null) o.name = name; else if (!ex) o.name = P.CATALOG[kind].label;
      if (Object.keys(params).length) o.params = params;
      if (x != null && y != null) { o.x = x; o.y = y; o.fixed = true; }
      P.addEntity(st, o);
    }

    /* A -> B ; A B -> C relation "libellé" ; relation A -> B C */
    function linkCmd(t, ar) {
      let rel = null, label = null, src = t.slice(0, ar), rest = t.slice(ar + 1);
      if (src.length > 1 && !src[0].q && P.relOf(src[0].v) && !P.resolve(st, src[0])) { rel = P.relOf(src[0].v); src = src.slice(1); }
      const tgt = [];
      rest.forEach(tok => {
        if (tok.q) {
          if (!tgt.length) { tgt.push(tok); return; }
          if (label == null) { label = tok.v; return; }
          tgt.push(tok); return;
        }
        if (tok.rel || (!P.resolve(st, tok) && P.relOf(tok.v))) { rel = P.relOf(tok.v); return; }
        tgt.push(tok);
      });
      if (!src.length || !tgt.length) return err('Syntaxe attendue : A -> B [relation] ["libellé"]');
      const S = src.map(x => P.resolve(st, x, true, err)), T = tgt.map(x => P.resolve(st, x, true, err));
      S.forEach(f => T.forEach(to => {
        if (!f || !to) return;
        if (f === to) return err('Un élément ne peut pas être relié à lui-même');
        let a = f, b = to, r = rel;
        if (!r) { const d = P.defaultRel(st.entities[f].kind, st.entities[to].kind); r = d[0]; if (d[1]) { a = to; b = f; } }
        P.setLink(st, a, b, r, label != null ? label : undefined);
      }));
    }
  };

  /* ------------------------------------------------------------ analyse d'un scénario */
  const SCENE_LANGS = ['scene', 'canevas', 'canvas', 'actions', 'script', 'commandes', 'escena', 'lienzo', 'comandos'];

  /* Étapes « questions » :
   *  - titre commençant par « Question », « Quiz » ou « ❓ », ou présence de choix « - [ ] » / « - [x] »,
   *    ou d'une section « ### Réponse » ;
   *  - lignes indentées (ou citations « > ») sous un choix = explication de ce choix ;
   *  - tout ce qui suit « ### Réponse » (texte et blocs scene) n'apparaît qu'à la révélation. */
  const ANSWER_RE = /^###\s+(?:💡\s*)?(?:réponse|reponse|correction|explication|solution|answer|explanation|respuesta|solución|solucion|explicación|explicacion|correcci[oó]n)(?:s|es)?(?![\wáéíóúñ])/i;
  const CHOICE_RE = /^\s*[-*+]\s+\[( |x|X)\]\s+(.*)$/;
  const QTITLE_RE = /^(?:❓\s*)?(?:question|quiz|pregunta|cuestionario)\b/i;
  const QPREFIX_RE = /^(?:❓\s*)?(?:(?:question|quiz|pregunta)\s*(?:n[°º]\s*)?\d*\s*[:.\-–—]\s*)?/i;

  function makeStep(cur) {
    const ctx = [], choices = [];
    let last = null;
    for (const l of cur.md) {
      const m = l.match(CHOICE_RE);
      if (m) { last = { text: m[2].trim(), correct: m[1] !== ' ', explain: [] }; choices.push(last); continue; }
      if (last && (/^\s{2,}\S/.test(l) || /^\s*>/.test(l))) { last.explain.push(l.trim().replace(/^>\s?/, '')); continue; }
      if (last && !l.trim()) { last.explain.push(''); continue; }
      last = null; ctx.push(l);
    }
    const isQ = choices.length > 0 || cur.hasAnswer || QTITLE_RE.test(cur.title);
    const step = { title: cur.title, md: (isQ ? ctx : cur.md).join('\n').trim(), commands: cur.commands, duration: cur.duration, question: null };
    if (isQ) {
      step.question = {
        text: cur.title.replace(QPREFIX_RE, '').trim() || cur.title,
        choices: choices.map(c => ({ text: c.text, correct: c.correct, explain: c.explain.join('\n').trim() })),
        answerMd: cur.answer.join('\n').trim(),
        reveal: cur.reveal
      };
    }
    return step;
  }

  P.parseScenario = function (src) {
    let lines = String(src || '').replace(/\r/g, '').split('\n');
    // réponse d'IA copiée avec son bloc englobant (````markdown … ````) : on retire ce bloc
    const first = lines.findIndex(l => l.trim()), last = lines.length - 1 - lines.slice().reverse().findIndex(l => l.trim());
    const open = first >= 0 && lines[first].trim().match(/^(`{3,}|~{3,})\s*(markdown|md)?\s*$/i);
    if (open && last > first && lines[last].trim() === open[1]) lines = lines.slice(first + 1, last);
    const sc = { title: 'Scénario', description: '', steps: [], errors: [], meta: {} };
    const newCur = (title, intro) => ({ title, md: [], commands: [], duration: null, intro: !!intro, hasAnswer: false, answer: [], reveal: [] });
    let cur = newCur('Introduction', true);
    let inFence = null, isScene = false, gotTitle = false, i = 0;
    const push = () => {
      const md = cur.md.join('\n').trim();
      if (cur.intro && !md && !cur.commands.length) return;
      sc.steps.push(makeStep(cur));
    };
    if (lines[0] && lines[0].trim() === '---') {
      let j = 1;
      while (j < lines.length && lines[j].trim() !== '---') {
        const m = lines[j].match(/^([\wÀ-ſ-]+)\s*:\s*(.*)$/);
        if (m) sc.meta[P.norm(m[1])] = m[2].trim();
        j++;
      }
      i = j + 1;
    }
    for (; i < lines.length; i++) {
      const line = lines[i];
      const mdOut = cur.hasAnswer ? cur.answer : cur.md;
      if (inFence) {
        if (line.trim().startsWith(inFence)) { if (!isScene) mdOut.push(line); inFence = null; continue; }
        if (isScene) {
          const tl = line.trim();
          if (tl && !tl.startsWith('#') && !tl.startsWith('//')) {
            (cur.hasAnswer ? cur.reveal : cur.commands).push({ text: tl, line: i + 1 });
            const t = P.tokenize(tl);
            if (t.length > 1 && ['duree', 'duration', 'duracion'].includes(P.norm(t[0].v))) cur.duration = P.num(t[1].v);
          }
        } else mdOut.push(line);
        continue;
      }
      const f = line.match(/^\s*(```+|~~~+)\s*([^\s`]*)/);
      if (f) {
        inFence = f[1];
        isScene = SCENE_LANGS.includes(P.norm(f[2] || '').replace('è', 'e'));
        if (!isScene) mdOut.push(line);
        continue;
      }
      const h1 = line.match(/^#\s+(.*)$/);
      if (h1 && !gotTitle) { sc.title = h1[1].trim(); gotTitle = true; continue; }
      const h2 = line.match(/^##\s+(.*)$/);
      if (h2) { push(); cur = newCur(h2[1].trim()); continue; }
      if (!cur.intro && !cur.hasAnswer && ANSWER_RE.test(line.trim())) { cur.hasAnswer = true; continue; }
      mdOut.push(line);
    }
    push();
    if (sc.meta.titre || sc.meta.title) sc.title = sc.meta.titre || sc.meta.title;
    // description : première citation ou premier paragraphe de l'introduction
    const intro = sc.steps[0] && sc.steps[0].title === 'Introduction' ? sc.steps[0].md : '';
    const q = intro.match(/^>\s?(.+)$/m);
    sc.description = sc.meta.description || (q ? q[1] : (intro.split(/\n\s*\n/)[0] || '')).replace(/[*_`]/g, '').trim();
    return sc;
  };

  /** État après l'étape n. Les commandes de réponse des questions précédentes sont toujours
   *  appliquées (le déroulé reste identique, que la réponse ait été révélée ou non) ;
   *  celles de l'étape n seulement si revealLast est vrai. */
  P.buildState = function (sc, n, errs, revealLast) {
    const st = P.newState();
    const j = P.jurisOf(sc.meta.droit || sc.meta.law || sc.meta.jurisdiction || sc.meta.derecho || sc.meta.ley || 'fr') || 'fr';
    st.options.droit = j; P.setJuris(j);
    for (let i = 0; i <= n && i < sc.steps.length; i++) {
      st.view.focus = []; st.view.notes = {}; st.view.select = null;
      const sink = errs ? { push: e => errs.push(Object.assign(e, { step: i })) } : null;
      const s = sc.steps[i];
      s.commands.forEach(c => P.runCommand(st, c.text, sink, c.line));
      if (s.question && (i < n || revealLast || errs)) s.question.reveal.forEach(c => P.runCommand(st, c.text, sink, c.line));
    }
    return st;
  };

  P.stepDuration = function (s, revealed) {
    if (s.duration) return s.duration * 1000;
    const text = revealed && s.question ? s.question.answerMd + ' ' + s.question.choices.map(c => c.explain).join(' ') : s.md;
    const words = (text || '').replace(/[#*_>|`~-]/g, ' ').split(/\s+/).filter(Boolean).length;
    return Math.max(5000, Math.min(45000, 3500 + words * 290));
  };

  /* ------------------------------------------------------------ export (studio) */
  const q = s => '"' + String(s).replace(/"/g, "'") + '"';
  const pv = v => String(v).includes(' ') ? q(v) : v;
  const paramStr = p => Object.keys(p || {}).filter(k => p[k] != null && p[k] !== '').map(k => ` ${k}=${String(p[k]).replace(/\s+/g, '_')}`).join('');

  P.toCommands = function (prev, cur) {
    const out = [], pe = prev.entities;
    Object.keys(pe).forEach(id => { if (!cur.entities[id]) out.push('retirer ' + id); });
    prev.links.forEach(l => { if (!P.findLink(cur, l.from, l.to) && cur.entities[l.from] && cur.entities[l.to]) out.push(`retirer ${l.from} -> ${l.to}`); });
    Object.keys(cur.entities).forEach(id => {
      const e = cur.entities[id], p = pe[id], x = Math.round(e.x), y = Math.round(e.y);
      if (!p || p.name !== e.name || p.kind !== e.kind || JSON.stringify(p.params || {}) !== JSON.stringify(e.params || {})) out.push(`${e.kind} ${id} ${q(e.name)}${paramStr(e.params)} at ${x} ${y}`);
      else if (Math.round(p.x) !== x || Math.round(p.y) !== y) out.push(`deplacer ${id} ${x} ${y}`);
      if (JSON.stringify((p && p.status) || null) !== JSON.stringify(e.status || null)) out.push(`statut ${id} ${e.status ? e.status.v : 'auto'}${e.status && e.status.text ? ' ' + q(e.status.text) : ''}`);
      if (JSON.stringify((p && p.conds) || []) !== JSON.stringify(e.conds || [])) {
        if (p && (p.conds || []).length) out.push(`condition ${id} aucune`);
        (e.conds || []).forEach(c => out.push(`condition ${id} ${q(c.label)} ${c.ok ? 'ok' : 'manque'}${c.level === 'risque' ? ' risque' : ''}${c.effet ? ' ' + q(c.effet) : ''}`));
      }
    });
    cur.links.forEach(l => {
      const p = P.findLink(prev, l.from, l.to);
      if (!p || p.rel !== l.rel || (p.label || '') !== (l.label || '')) out.push(`${l.from} -> ${l.to} ${l.rel}${l.label ? ' ' + q(l.label) : ''}`);
    });
    if ((prev.options.droit || 'fr') !== (cur.options.droit || 'fr')) out.unshift('droit ' + (cur.options.droit || 'fr'));
    if ((prev.options.verif !== false) !== (cur.options.verif !== false)) out.push('verification ' + (cur.options.verif === false ? 'off' : 'on'));
    if (prev.view.perspective !== cur.view.perspective) out.push('vue ' + (cur.view.perspective || 'aucune'));
    if (cur.view.focus && cur.view.focus.length) out.push('focus ' + cur.view.focus.join(' '));
    Object.keys(cur.view.notes || {}).forEach(id => out.push(`note ${id} ${q(cur.view.notes[id])}`));
    if (cur.view.select) out.push('selection ' + cur.view.select);
    return out;
  };
  P.paramValue = pv;

  P.studioMarkdown = function (title, steps) {
    const dr = steps.length && steps[steps.length - 1].snap.options.droit;
    let md = (dr && dr !== 'fr' ? `---\ndroit: ${dr}\n---\n\n` : '') + `# ${title}\n\n> ${P.t ? P.t("Scénario créé avec le studio de l'atelier Contract Lab.") : "Scénario créé avec le studio de l'atelier Contract Lab."}\n\n`;
    let prev = P.newState();
    steps.forEach((s, i) => {
      const cmds = P.toCommands(prev, s.snap);
      md += `## ${s.title || 'Étape ' + (i + 1)}\n\n${(s.comment || '').trim()}\n\n\`\`\`scene\n${cmds.join('\n')}\n\`\`\`\n\n`;
      prev = s.snap;
    });
    return md;
  };

  /* ------------------------------------------------------------ mini rendu markdown */
  P.md = function (src, opt) {
    opt = opt || {};
    const nameOf = opt.nameOf || (x => x);
    const L = String(src || '').replace(/\r/g, '').split('\n');
    let i = 0, out = '';
    const inline = s => {
      let t = P.esc(s); const codes = [];
      t = t.replace(/`([^`]+)`/g, (m, c) => { codes.push(c); return '\u0000' + (codes.length - 1) + '\u0000'; });
      t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/__(.+?)__/g, '<strong>$1</strong>');
      t = t.replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, '$1<em>$2</em>').replace(/(^|[^\w])_(?!\s)(.+?)_(?!\w)/g, '$1<em>$2</em>');
      t = t.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (m, id, lab) => `<span class="ref" data-ref="${id.trim()}">${lab ? lab : P.esc(nameOf(id.trim()))}</span>`);
      t = t.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
      t = t.replace(/\u0000(\d+)\u0000/g, (m, n) => '<code>' + codes[n] + '</code>');
      return t;
    };
    const blockStart = l => /^(#{1,6}\s|```|~~~|\s*>|\s*[-*+]\s|\s*\d+[.)]\s|\s*\|)/.test(l) || /^(-{3,}|\*{3,})\s*$/.test(l);
    const listRe = /^\s*([-*+]|\d+[.)])\s+/;
    while (i < L.length) {
      const l = L[i]; let m;
      if (!l.trim()) { i++; continue; }
      if ((m = l.match(/^\s*(```+|~~~+)/))) {
        const f = m[1], buf = []; i++;
        while (i < L.length && !L[i].trim().startsWith(f)) buf.push(L[i++]);
        i++; out += `<pre><code>${P.esc(buf.join('\n'))}</code></pre>`; continue;
      }
      if ((m = l.match(/^(#{1,6})\s+(.*)$/))) { const n = Math.min(6, m[1].length + (opt.shift || 0)); out += `<h${n}>${inline(m[2])}</h${n}>`; i++; continue; }
      if (/^(-{3,}|\*{3,}|_{3,})\s*$/.test(l)) { out += '<hr>'; i++; continue; }
      if (/^\s*>/.test(l)) {
        const buf = [];
        while (i < L.length && /^\s*>/.test(L[i])) buf.push(L[i++].replace(/^\s*>\s?/, ''));
        out += `<blockquote>${P.md(buf.join('\n'), opt)}</blockquote>`; continue;
      }
      if (/^\s*\|/.test(l) && i + 1 < L.length && /^\s*\|?\s*:?-{2,}/.test(L[i + 1])) {
        const row = s => s.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim());
        let t = '<table><thead><tr>' + row(l).map(c => `<th>${inline(c)}</th>`).join('') + '</tr></thead><tbody>';
        i += 2;
        while (i < L.length && /^\s*\|/.test(L[i])) { t += '<tr>' + row(L[i]).map(c => `<td>${inline(c)}</td>`).join('') + '</tr>'; i++; }
        out += t + '</tbody></table>'; continue;
      }
      if (listRe.test(l)) {
        const ordered = /^\s*\d/.test(l), items = [];
        while (i < L.length && listRe.test(L[i])) {
          let it = L[i].replace(listRe, ''); i++;
          while (i < L.length && L[i].trim() && !blockStart(L[i]) && /^\s{2,}/.test(L[i])) it += ' ' + L[i++].trim();
          items.push(it);
        }
        const tag = ordered ? 'ol' : 'ul';
        out += `<${tag}>` + items.map(x => `<li>${inline(x)}</li>`).join('') + `</${tag}>`; continue;
      }
      const buf = [l]; i++;
      while (i < L.length && L[i].trim() && !blockStart(L[i])) buf.push(L[i++]);
      out += `<p>${inline(buf.join(' '))}</p>`;
    }
    return out;
  };
})();
