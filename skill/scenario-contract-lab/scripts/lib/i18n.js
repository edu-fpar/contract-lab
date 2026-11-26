/* ============================================================
 * Contract Lab — langue de l'interface (français / anglais / espagnol).
 * Chargé en premier. Les chaînes sont écrites en français dans le
 * code et traduites par P.t() à partir des dictionnaires P.I18N.en et
 * P.I18N.es (js/i18n-en.js, js/i18n-es.js). Une chaîne absente du
 * dictionnaire reste en français (tools/i18n-check.js les signale).
 *
 *   P.t('Valide')                       → 'Valid' / 'Válida'
 *   P.t('{n} élément(s)', { n: 3 })     → '3 item(s)'
 *
 * Langue : ?lang=fr|en|es, sinon choix mémorisé (contract-lab.lang),
 * sinon langue du navigateur (français, espagnol, sinon anglais).
 * ============================================================ */
(function () {
  'use strict';
  const P = window.P = window.P || {};
  P.I18N = P.I18N || {};
  P.LANGS = { fr: 'Français', en: 'English', es: 'Español' };

  /* langue : ?lang=fr|en|es, sinon choix mémorisé, sinon langue du navigateur */
  let lang = null;
  try {
    const q = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('lang') : null;
    if (q && P.LANGS[q]) { lang = q; try { localStorage.setItem('contract-lab.lang', q); } catch (e) { /* */ } }
    if (!lang) { const s = localStorage.getItem('contract-lab.lang'); if (P.LANGS[s]) lang = s; }
  } catch (e) { /* stockage ou adresse indisponible */ }
  if (!lang && typeof navigator !== 'undefined') {
    const n = (navigator.language || 'fr').toLowerCase();
    lang = n.startsWith('fr') ? 'fr' : n.startsWith('es') ? 'es' : 'en';
  }
  P.lang = lang || 'fr';

  const fill = (s, v) => v ? String(s).replace(/\{(\w+)\}/g, (m, k) => (v[k] != null ? v[k] : m)) : s;
  P.t = function (s, vars) {
    if (P.lang !== 'fr') { const d = P.I18N[P.lang] || {}; if (d[s] != null) return fill(d[s], vars); }
    return fill(s, vars);
  };
  P.setLang = function (l) {
    if (!P.LANGS[l]) return;
    try { localStorage.setItem('contract-lab.lang', l); } catch (e) { /* */ }
    const u = new URL(location.href);
    if (u.searchParams.has('lang')) u.searchParams.set('lang', l);
    location.href = u.toString();
  };
  /** Traduit le HTML statique (index.html) : textes et attributs title / placeholder / aria-label. */
  P.translateDom = function (root) {
    if (P.lang === 'fr' || typeof document === 'undefined') return;
    const d = P.I18N[P.lang] || {};
    const w = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT);
    const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
    nodes.forEach(n => {
      const s = n.nodeValue, k = s.trim();
      if (k && d[k] != null) n.nodeValue = s.replace(k, d[k]);
    });
    (root || document.body).querySelectorAll('[title],[placeholder],[aria-label]').forEach(el => {
      ['title', 'placeholder', 'aria-label'].forEach(a => { const v = el.getAttribute(a); if (v && d[v] != null) el.setAttribute(a, d[v]); });
    });
    if (document.documentElement) document.documentElement.lang = P.lang;
  };
})();
