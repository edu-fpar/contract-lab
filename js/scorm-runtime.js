/* ============================================================
 * Contract Lab — dialogue avec la plateforme (SCORM 1.2 ou 2004),
 * chargé uniquement dans un paquet exporté (js/scorm.js), avant app.js.
 *
 *  - reprise : l'étape atteinte est mémorisée (lesson_location / location) ;
 *  - achèvement : « terminé » quand l'élève arrive à la dernière étape ;
 *  - note (option) : part des questions à choix où l'élève a choisi
 *    une bonne carte avant de révéler la réponse (première tentative).
 * Sans plateforme (paquet ouvert directement), le scénario se lit normalement.
 * ============================================================ */
(function () {
  'use strict';
  const E = window.CONTRACT_LAB_EMBED || {};
  const v2004 = E.scorm === '2004';

  function findAPI(win) {
    const name = v2004 ? 'API_1484_11' : 'API';
    for (let w = win, n = 0; w && n < 12; n++) {
      try { if (w[name]) return w[name]; } catch (e) { /* cadre d'une autre origine */ }
      if (w.parent && w.parent !== w) w = w.parent; else break;
    }
    try { if (win.opener) return findAPI(win.opener); } catch (e) { /* */ }
    return null;
  }
  const api = findAPI(window);
  const K = v2004
    ? { init: 'Initialize', get: 'GetValue', set: 'SetValue', commit: 'Commit', finish: 'Terminate', loc: 'cmi.location', status: 'cmi.completion_status', raw: 'cmi.score.raw', min: 'cmi.score.min', max: 'cmi.score.max', exit: 'cmi.exit', time: 'cmi.session_time', entry: 'cmi.entry' }
    : { init: 'LMSInitialize', get: 'LMSGetValue', set: 'LMSSetValue', commit: 'LMSCommit', finish: 'LMSFinish', loc: 'cmi.core.lesson_location', status: 'cmi.core.lesson_status', raw: 'cmi.core.score.raw', min: 'cmi.core.score.min', max: 'cmi.core.score.max', exit: 'cmi.core.exit', time: 'cmi.core.session_time', entry: 'cmi.core.entry' };
  const call = (fn, ...a) => { try { return api ? api[K[fn] || fn](...a) : ''; } catch (e) { return ''; } };
  const get = k => String(call('get', k) || '');
  const set = (k, v) => call('set', k, String(v));

  let on = false, done = false, finished = false;
  const t0 = Date.now();
  let data = { a: {} };   // a : index d'étape question → 1 (bonne carte) ou 0
  let startStep = 0;

  if (api && String(call('init', '')) === 'true') {
    on = true;
    try { const s = get('cmi.suspend_data'); if (s) data = Object.assign(data, JSON.parse(s)); } catch (e) { /* données illisibles */ }
    const loc = parseInt(get(K.loc), 10);
    if (loc > 0) startStep = loc - 1;
    const st = get(K.status);
    done = st === 'completed' || st === 'passed';
    if (!done) {
      set(K.status, 'incomplete');
      if (v2004 && get(K.entry) === 'ab-initio') set('cmi.success_status', 'unknown');
    }
    call('commit', '');
  }

  function sessionTime() {
    const s = Math.round((Date.now() - t0) / 1000), h = Math.floor(s / 3600), m = Math.floor(s / 60) % 60, sec = s % 60;
    if (v2004) return `PT${h}H${m}M${sec}S`;
    const p = n => String(n).padStart(2, '0');
    return `${String(h).padStart(4, '0')}:${p(m)}:${p(sec)}`;
  }
  function score(total) {
    if (!E.score || !total) return;
    const ok = Object.values(data.a).reduce((s, x) => s + (x ? 1 : 0), 0), pct = Math.round(ok * 100 / total);
    set(K.min, 0); set(K.max, 100); set(K.raw, pct);
    if (v2004) set('cmi.score.scaled', (pct / 100).toFixed(2));
  }

  /* interface appelée par app.js */
  window.ContractLabHost = {
    startStep,
    /** info : { step, total, questions } — à chaque changement d'étape */
    step(info) {
      if (!on) return;
      set(K.loc, info.step + 1);
      if (v2004) set('cmi.progress_measure', Math.min(1, (info.step + 1) / info.total).toFixed(2));
      if (!done && info.step >= info.total - 1) { done = true; set(K.status, 'completed'); }
      score(info.questions);
      set('cmi.suspend_data', JSON.stringify(data));
      call('commit', '');
    },
    /** info : { step, total, questions, correct (bool | null) } — à la révélation d'une question à choix */
    reveal(info) {
      if (!on || info.correct == null || data.a[info.step] != null) return;
      data.a[info.step] = info.correct ? 1 : 0;
      score(info.questions);
      set('cmi.suspend_data', JSON.stringify(data));
      call('commit', '');
    },
    connected: () => on
  };

  function finish() {
    if (!on || finished) return;
    finished = true;
    set(K.time, sessionTime());
    set(K.exit, done ? (v2004 ? 'normal' : '') : 'suspend');
    call('commit', '');
    call('finish', '');
  }
  window.addEventListener('pagehide', finish);
  window.addEventListener('beforeunload', finish);
})();
