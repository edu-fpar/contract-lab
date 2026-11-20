/* ============================================================
 * Contract Lab — interface : canevas SVG, palette, inspecteur,
 * mode cinéma (lecteur de scénarios), studio d'enregistrement.
 * ============================================================ */
(function () {
  'use strict';
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = P.esc, CAT = P.CATALOG;
  const NW = 184, NH = 74;
  const LS_KEY = 'contract-lab.libre.v1';
  /* paquet SCORM exporté : scénario embarqué (js/scenario-data.js) et plateforme (js/scorm-runtime.js) */
  const EMBED = window.CONTRACT_LAB_EMBED || null, host = window.ContractLabHost || null;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  /* téléphone en portrait : disposition empilée (voir css, @media max-width 760px) */
  const mqMobile = window.matchMedia ? window.matchMedia('(max-width: 760px)') : null;
  function isMobile() { return !!(mqMobile && mqMobile.matches); }

  const App = window.App = {
    mode: 'libre', state: P.newState(), an: null, sel: null,
    undoStack: [], redoStack: [], editing: false,
    disp: {}, ldisp: {},
    cam: { x: 0, y: 150, k: 1 }, camT: null,
    scenario: null, scenarioSrc: '', step: 0, playing: false, speed: 1, playMode: 'pas', timer: null,
    studio: { open: false, title: 'Mon scénario', steps: [] },
    hoverRef: null, libreState: null, planOpen: false, drag: null,
    cinePos: {},   // positions d'éléments déplacés à la main pendant la lecture d'un scénario
    noteOff: {},   // décalages des bulles déplacées à la main
    q: { revealed: false, collapsed: false, picked: null, flipped: {} }  // étape question en cours
  };

  /* ============================================================ utilitaires */
  function tint(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; }
  function trunc(s, n) { s = String(s || ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  const ease = a => 1 - Math.pow(1 - a, 3);
  const easeBack = a => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(a - 1, 3) + c1 * Math.pow(a - 1, 2); };

  function nameOf(id) { const e = App.state.entities[id]; return e ? e.name : id; }
  function iconOf(id) { const e = App.state.entities[id]; return e ? P.iconOf(e) : '❔'; }
  const famOf = id => P.famOf(App.state.entities[id]);
  const famColor = id => (P.FAMS[famOf(id)] || P.FAMS.clause).color;
  const findLinkByKey = k => App.state.links.find(l => P.linkKey(l) === k);

  let toastT;
  function toast(msg, ms) {
    const el = $('#toast'); el.innerHTML = msg; el.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove('show'), ms || 2800);
  }
  function download(name, text, type) {
    const b = new Blob([text], { type: (type || 'text/markdown') + ';charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(b); a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
  }
  function copyText(text) {
    const done = () => toast('📋 Copié dans le presse-papiers');
    const fallback = () => {
      const ta = document.createElement('textarea'); ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done(); } catch (e) { toast('Copie impossible'); }
      ta.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  }
  function wrap(text, n) {
    const words = String(text).split(/\s+/), lines = []; let cur = '';
    words.forEach(w => { if ((cur + ' ' + w).trim().length > n && cur) { lines.push(cur); cur = w; } else cur = (cur + ' ' + w).trim(); });
    if (cur) lines.push(cur);
    return lines;
  }

  /* ============================================================ rendu SVG */
  const svg = $('#canvas');
  const marker = (id, color) => `<marker id="${id}" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0,0.5 L10,5 L0,9.5 z" fill="${color}"/></marker>`;
  svg.innerHTML = '<defs>' + Object.keys(P.RELS).map(r => marker('m-' + r, P.RELS[r].color)).join('') + marker('m-tmp', '#4f46e5') +
    '<pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><circle class="gdot" cx="2" cy="2" r="1.3"/></pattern>' +
    '<filter id="shadow" x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#0f172a" flood-opacity=".10"/></filter>' +
    '</defs><rect class="bg" x="-50000" y="-50000" width="100000" height="100000"/><g id="world"></g>';
  const world = $('#world', svg);

  let raf = null;
  function requestRender() { if (!raf) raf = requestAnimationFrame(frame); }
  App.requestRender = requestRender;

  function frame() {
    raf = null;
    const now = performance.now(); let busy = false;
    const st = App.state;
    for (const id in App.disp) {
      const d = App.disp[id], e = st.entities[id];
      if (!e || d.drag) continue;
      const dx = e.x - d.x, dy = e.y - d.y;
      if (Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) { d.x += dx * 0.16; d.y += dy * 0.16; busy = true; } else { d.x = e.x; d.y = e.y; }
      if (now - d.born < 700 || now - (d.changed || -1e9) < 1200) busy = true;
    }
    for (const k in App.ldisp) { const l = App.ldisp[k]; if (now - l.born < 900) busy = true; }
    if (App.camT) {
      const c = App.cam, t = App.camT;
      c.x += (t.x - c.x) * 0.13; c.y += (t.y - c.y) * 0.13; c.k += (t.k - c.k) * 0.13;
      if (Math.abs(t.x - c.x) < 0.5 && Math.abs(t.y - c.y) < 0.5 && Math.abs(t.k - c.k) < 0.002) { Object.assign(c, t); App.camT = null; } else busy = true;
    }
    if ((st.view.focus && st.view.focus.length) || App.hoverRef) busy = true;
    draw(now);
    if (busy) requestRender();
  }

  function clipRect(c, tx, ty, m) {
    const dx = tx - c.x, dy = ty - c.y;
    if (!dx && !dy) return { x: c.x, y: c.y };
    const hw = NW / 2 + m, hh = NH / 2 + m;
    const t = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity);
    return { x: c.x + dx * t, y: c.y + dy * t };
  }
  function linkGeom(from, to, bend) {
    const a = App.disp[from], b = App.disp[to];
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len;
    const off = bend || 0;
    const cx = (a.x + b.x) / 2 + nx * off, cy = (a.y + b.y) / 2 + ny * off;
    const p0 = clipRect(a, cx, cy, 2), p2 = clipRect(b, cx, cy, 7);
    return {
      d: `M${p0.x.toFixed(1)},${p0.y.toFixed(1)} Q${cx.toFixed(1)},${cy.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`,
      lx: 0.25 * p0.x + 0.5 * cx + 0.25 * p2.x, ly: 0.25 * p0.y + 0.5 * cy + 0.25 * p2.y
    };
  }

  /* étiquettes affichées sur les liens : libellé libre, sinon un mot pour les relations qui portent du sens */
  const PILL = { viole: '⚡ viole', exclut: '⊘ exclut', limite: '🔒', ouvre: 'ouvre droit à', justifie: 'justifie', met_fin: 'met fin à', prevaut: 'prévaut sur', requiert: 'requiert', initie: "à l'initiative de", encadre: 'encadre', doit: 'doit' };

  function linkSVG(l, now, dim) {
    const k = P.linkKey(l), ld = App.ldisp[k] || { born: -1e9 };
    const R = P.RELS[l.rel] || P.RELS.lien;
    const g = linkGeom(l.from, l.to, App.state.links.some(m => m.from === l.to && m.to === l.from) ? 40 : 0);
    const a = clamp((now - ld.born) / 700, 0, 1);
    const sel = App.sel && App.sel.kind === 'link' && App.sel.id === k;
    const faded = dim.has(l.from) || dim.has(l.to);
    const w = R.faint ? 1.4 : (l.rel === 'exclut' ? 2.4 : 2.6);
    let dash = R.dash ? `stroke-dasharray:${R.dash};` : '';
    if (!R.dash && a < 1) dash = `stroke-dasharray:1;stroke-dashoffset:${(1 - ease(a)).toFixed(3)};`;
    const arrow = l.rel !== 'contient' && a > 0.9 ? ` marker-end="url(#m-${P.RELS[l.rel] ? l.rel : 'lien'})"` : '';
    let s = `<g class="link${sel ? ' sel' : ''}${R.faint ? ' faint' : ''}" data-link="${esc(k)}" style="opacity:${faded ? 0.18 : 1}"><title>${esc(nameOf(l.from) + ' — ' + R.label + ' → ' + nameOf(l.to) + (l.label ? ' : ' + l.label : ''))}</title>`;
    s += `<path class="hit" d="${g.d}"/>`;
    if (sel) s += `<path class="halo" d="${g.d}" style="stroke-width:${w + 9}px"/>`;
    s += `<path class="stroke" d="${g.d}"${R.dash ? '' : ' pathLength="1"'} style="stroke:${R.color};stroke-width:${w}px;${dash}"${arrow}/>`;
    s += '</g>';
    const txt = l.label || PILL[l.rel] || '';
    if (!txt || (App.mode === 'cinema' && R.faint)) return { path: s, label: '' };
    const lw = Math.max(22, txt.length * 6.3 + 16);
    const label = `<g class="llabel${sel ? ' sel' : ''}" data-link="${esc(k)}" transform="translate(${g.lx.toFixed(1)},${g.ly.toFixed(1)})" style="opacity:${(faded ? 0.25 : 1) * a}"><rect x="${-lw / 2}" y="-10" width="${lw}" height="20" rx="10" style="stroke:${R.color}"/><text y="4" text-anchor="middle">${esc(txt)}</text></g>`;
    return { path: s, label };
  }

  function autoLinkSVG(x, dim) {
    if (!App.disp[x.from] || !App.disp[x.to]) return { path: '', label: '' };
    const g = linkGeom(x.from, x.to, 28);
    const faded = dim.has(x.from) || dim.has(x.to);
    const col = x.level === 'grave' ? '#dc2626' : '#d97706';
    const s = `<g class="autolink" style="opacity:${faded ? 0.15 : 0.9}"><title>${esc(nameOf(x.from) + ' ⊘ ' + nameOf(x.to) + ' : ' + x.effet)}</title><path d="${g.d}" style="stroke:${col}"/></g>`;
    const label = `<g class="llabel auto" transform="translate(${g.lx.toFixed(1)},${g.ly.toFixed(1)})" style="opacity:${faded ? 0.2 : 1}"><title>${esc(x.effet)}</title><circle r="11" style="stroke:${col}"/><text y="4.5" text-anchor="middle" style="fill:${col}">⊘</text></g>`;
    return { path: s, label };
  }

  function nodeSVG(id, now, dimmed) {
    const st = App.state, an = App.an, e = st.entities[id], d = App.disp[id];
    const D = P.def(e), F = P.FAMS[D.fam] || P.FAMS.clause, I = an.info[id];
    const S = P.STATUS[I.status] || P.STATUS.neutral;
    const neutral = I.status === 'neutral';
    const stroke = neutral ? tint(F.color, 0.55) : S.color, sw = neutral ? 1.5 : 2.6;
    const a = clamp((now - d.born) / 600, 0, 1);
    const pulse = d.changed && now - d.changed < 1200 ? 1 + 0.06 * Math.sin(Math.PI * (now - d.changed) / 1200) : 1;
    const sc = (0.7 + 0.3 * easeBack(a)) * pulse;
    const sel = App.sel && App.sel.kind === 'node' && App.sel.id === id;
    const focus = (st.view.focus || []).includes(id);
    const x0 = -NW / 2, y0 = -NH / 2;
    let s = `<g class="node fam-${D.fam}${sel ? ' sel' : ''}" data-node="${esc(id)}" transform="translate(${d.x.toFixed(1)},${d.y.toFixed(1)}) scale(${sc.toFixed(3)})" style="opacity:${(a * (dimmed ? 0.3 : 1)).toFixed(3)}">`;
    if (focus) s += `<rect class="ring" x="${x0 - 8}" y="${y0 - 8}" width="${NW + 16}" height="${NH + 16}" rx="18" style="stroke-opacity:${(0.35 + 0.5 * (0.5 + 0.5 * Math.sin(now / 260))).toFixed(2)}"/>`;
    if (App.hoverRef === id) s += `<rect class="hovring" x="${x0 - 5}" y="${y0 - 5}" width="${NW + 10}" height="${NH + 10}" rx="16"/>`;
    if (sel) s += `<rect class="selring" x="${x0 - 5}" y="${y0 - 5}" width="${NW + 10}" height="${NH + 10}" rx="16"/>`;
    if (D.fam === 'contrat') {
      // une feuille de papier au coin plié
      s += `<path class="body paper" d="M${x0 + 12},${y0} H${NW / 2 - 18} L${NW / 2},${y0 + 18} V${NH / 2 - 12} Q${NW / 2},${NH / 2} ${NW / 2 - 12},${NH / 2} H${x0 + 12} Q${x0},${NH / 2} ${x0},${NH / 2 - 12} V${y0 + 12} Q${x0},${y0} ${x0 + 12},${y0} Z" style="stroke:${stroke};stroke-width:${sw}px"/>`;
      s += `<path d="M${NW / 2 - 18},${y0} V${y0 + 18} H${NW / 2}" style="fill:none;stroke:${stroke};stroke-width:1.2px"/>`;
    } else {
      const rx = D.fam === 'limite' ? 26 : (D.fam === 'etape' ? 8 : 13);
      s += `<rect class="body" x="${x0}" y="${y0}" width="${NW}" height="${NH}" rx="${rx}" style="fill:var(--node-bg);stroke:${stroke};stroke-width:${sw}px"/>`;
      if (!neutral) s += `<rect x="${x0}" y="${y0}" width="${NW}" height="${NH}" rx="${rx}" style="fill:${tint(S.color, 0.07)};pointer-events:none"/>`;
    }
    // pastille d'icône, teintée de la couleur de la famille
    s += `<circle class="icbg" cx="${x0 + 26}" cy="${y0 + 28}" r="19" style="fill:${tint(F.color, 0.14)};stroke:${tint(F.color, 0.35)}"/>`;
    s += `<text class="icon" x="${x0 + 26}" y="${y0 + 35.5}" text-anchor="middle">${P.iconOf(e)}</text>`;
    const lines = wrap(e.name, 17).slice(0, 2);
    if (wrap(e.name, 17).length > 2) lines[1] = trunc(lines[1] + '…', 17);
    lines.forEach((ln, i) => { s += `<text class="name" x="${x0 + 52}" y="${y0 + (lines.length > 1 ? 21 + i * 15 : 26)}">${esc(trunc(ln, 18))}</text>`; });
    if (lines.length === 1) {
      const sub = P.norm(e.name) === P.norm(D.label) ? F.short : D.label;
      s += `<text class="sub" x="${x0 + 52}" y="${y0 + 42}">${esc(trunc(sub, 20))}</text>`;
    }
    let l3 = '', l3c = 'var(--muted)';
    if (!neutral) { l3 = `${S.icon} ${I.verdict}`; l3c = S.color; }
    else if (I.calc.length) { l3 = I.calc[0]; l3c = 'var(--ink)'; }
    else if (D.fam === 'partie') {
      const n = st.links.filter(l => l.from === id && l.rel === 'doit').length;
      if (n) l3 = `${n} obligation${n > 1 ? 's' : ''}`;
    }
    if (l3) s += `<text class="st" x="${x0 + 12}" y="${y0 + 62}" style="fill:${l3c}">${esc(trunc(l3, 30))}</text>`;
    // pastilles des garde-fous : vertes si présents, pointillées s'ils manquent
    if (!I.hidden && I.reqs.length) {
      const n = Math.min(I.reqs.length, 7), gap = 25, bx0 = -(n - 1) * gap / 2, by = NH / 2 + 2;
      I.reqs.slice(0, n).forEach((r, i) => {
        const ic = r.custom ? (r.ok ? '☑️' : '✖️') : CAT[r.any[0]].icon;
        const lab = r.custom ? r.label : CAT[r.any[0]].label;
        const col = r.ok ? '#16a34a' : (r.level === 'grave' ? '#dc2626' : '#d97706');
        s += `<g class="badge${r.ok ? ' ok' : ' miss'}" transform="translate(${bx0 + i * gap},${by})"><title>${r.ok ? '✔ ' : '✘ manque : '}${esc(lab)}${r.why ? ' — ' + esc(r.why) : ''}</title><circle r="11" style="stroke:${col}"/><text y="4.3" text-anchor="middle">${ic}</text></g>`;
      });
    }
    if (App.mode === 'libre') s += `<g class="port" data-port="${esc(id)}"><circle cx="${NW / 2}" cy="0" r="9"/><text x="${NW / 2}" y="4.5" text-anchor="middle">+</text></g>`;
    s += `<title>${esc(e.name)} — ${esc(D.label)}${I.verdict ? ' : ' + esc(I.verdict) : ''}</title></g>`;
    return s;
  }

  function frameSVG(f, dim) {
    const ms = f.members.filter(m => App.disp[m]);
    if (ms.length < 2) return '';
    let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
    ms.forEach(m => { const d = App.disp[m]; x0 = Math.min(x0, d.x - NW / 2); x1 = Math.max(x1, d.x + NW / 2); y0 = Math.min(y0, d.y - NH / 2); y1 = Math.max(y1, d.y + NH / 2); });
    x0 -= 22; x1 += 22; y0 -= 34; y1 += 30;
    const sel = App.sel && App.sel.kind === 'node' && App.sel.id === f.id;
    const faded = dim.has(f.id);
    return `<g class="frame${sel ? ' sel' : ''}" data-frame="${esc(f.id)}" style="opacity:${faded ? 0.3 : 1}"><rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" rx="18"/><text x="${x0 + 16}" y="${y0 + 21}">📄 ${esc(trunc(nameOf(f.id), 40))}</text></g>`;
  }

  function noteSVG(id, text) {
    const d = App.disp[id]; const lines = wrap(text, 34);
    const lw = Math.max.apply(null, lines.map(l => l.length)) * 6.8 + 22, lh = lines.length * 16 + 12;
    const o = App.noteOff[id] || { dx: 0, dy: 0 };
    const x = d.x + 36 + o.dx, y = d.y - NH / 2 - 14 - lh + o.dy;
    const cx = clamp(d.x + 30, x + 12, x + lw - 12), ax = d.x + 30, ay = d.y - NH / 2 + 2;
    const tail = (o.dx || o.dy)
      ? (ay > y + lh ? `M${cx - 8},${y + lh - 0.5} L${ax},${ay} L${cx + 8},${y + lh - 0.5}` : `M${cx - 8},${y + 0.5} L${ax},${d.y + NH / 2 - 2} L${cx + 8},${y + 0.5}`)
      : `M${x + 14},${y + lh - 0.5} L${x + 12},${y + lh + 12} L${x + 28},${y + lh - 0.5}`;
    let s = `<g class="note" data-note="${esc(id)}"><title>Glisser pour déplacer la bulle</title><path d="${tail}"/><rect x="${x}" y="${y}" width="${lw}" height="${lh}" rx="9"/>`;
    lines.forEach((l, i) => { s += `<text x="${(x + lw / 2).toFixed(1)}" y="${(y + 20 + i * 16).toFixed(1)}" text-anchor="middle">${esc(l)}</text>`; });
    return s + '</g>';
  }

  function draw(now) {
    const st = App.state, an = App.an; if (!an) return;
    const r = svg.getBoundingClientRect(), Wd = r.width || 800, Hd = r.height || 600, c = App.cam;
    svg.setAttribute('viewBox', `${c.x - Wd / 2 / c.k} ${c.y - Hd / 2 / c.k} ${Wd / c.k} ${Hd / c.k}`);
    const pv = st.view.perspective && st.entities[st.view.perspective] ? st.view.perspective : null;
    const dim = new Set();
    if (pv) { const rel = an.related(pv); for (const id in st.entities) if (!rel.has(id)) dim.add(id); }
    let frames = '', g = '', labels = '', nodes = '', notes = '';
    an.frames.forEach(f => { frames += frameSVG(f, dim); });
    st.links.forEach(l => {
      if (!App.disp[l.from] || !App.disp[l.to]) return;
      const o = linkSVG(l, now, dim); g += o.path; labels += o.label;
    });
    an.autoLinks.forEach(x => {
      if (P.findAnyLink(st, x.from, x.to)) return;
      const o = autoLinkSVG(x, dim); g += o.path; labels += o.label;
    });
    for (const id in st.entities) if (App.disp[id]) nodes += nodeSVG(id, now, dim.has(id));
    for (const id in (st.view.notes || {})) if (App.disp[id]) notes += noteSVG(id, st.view.notes[id]);
    let tmp = '';
    const dr = App.drag;
    if (dr && dr.kind === 'port' && App.disp[dr.from]) { const a = App.disp[dr.from]; tmp = `<path class="tmp" d="M${a.x + NW / 2},${a.y} L${dr.x},${dr.y}" marker-end="url(#m-tmp)"/>`; }
    world.innerHTML = frames + g + nodes + labels + notes + tmp;
  }

  /* ============================================================ cycle de mise à jour */
  function syncDisp(animate) {
    const now = performance.now(), st = App.state, an = App.an;
    for (const id in App.disp) if (!st.entities[id]) delete App.disp[id];
    for (const id in st.entities) {
      const e = st.entities[id], sig = an.info[id].status + '|' + an.info[id].verdict;
      if (!App.disp[id]) App.disp[id] = { x: e.x, y: e.y, born: animate ? now : -1e9, sig };
      else if (App.disp[id].sig !== sig) { App.disp[id].sig = sig; if (animate) App.disp[id].changed = now; }
    }
    const seen = {};
    st.links.forEach(l => {
      const k = P.linkKey(l); seen[k] = 1;
      if (!App.ldisp[k]) App.ldisp[k] = { born: animate ? now : -1e9 };
    });
    for (const k in App.ldisp) if (!seen[k]) delete App.ldisp[k];
  }
  function selExists(s) {
    const st = App.state;
    if (s.kind === 'node') return !!st.entities[s.id];
    if (s.kind === 'link') return !!findLinkByKey(s.id);
    return false;
  }

  App.commit = function (o) {
    o = o || {};
    const st = App.state;
    if (App.mode === 'cinema') {
      P.layout(st);
      for (const id in App.cinePos) if (st.entities[id]) Object.assign(st.entities[id], App.cinePos[id]);
    }
    App.an = P.analyze(st);
    syncDisp(o.animate !== false);
    if (App.sel && !selExists(App.sel)) App.sel = null;
    requestRender();
    updateBanner();
    $('#opt-verif').checked = st.options.verif !== false;
    if (App.mode === 'libre') {
      if (o.inspector === false) refreshAnalysis(); else App.renderInspector();
      saveLocal();
      updateStudio();
    } else App.renderCommentary();
  };

  App.fit = function (animate) {
    const st = App.state, ids = Object.keys(st.entities), r = svg.getBoundingClientRect();
    if (!r.width) return;
    let t;
    if (!ids.length) t = { x: 0, y: 150, k: 1 };
    else {
      let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
      ids.forEach(id => {
        const e = st.entities[id];
        const note = (st.view.notes || {})[id];
        x0 = Math.min(x0, e.x - NW / 2 - 24); x1 = Math.max(x1, e.x + NW / 2 + 24, note ? e.x + 60 + Math.min(34, note.length) * 6.8 : -Infinity);
        y0 = Math.min(y0, e.y - NH / 2 - (note ? 70 : 0) - 36); y1 = Math.max(y1, e.y + NH / 2 + 34);
      });
      const sheet = $('#qsheet');
      const inset = App.mode === 'cinema' && !sheet.hidden ? Math.min(sheet.offsetHeight, r.height * 0.7) : 0;
      const banner = $('#banner'), top = banner.hidden ? 0 : banner.offsetHeight + 12;
      const pad = 40, h = Math.max(120, r.height - inset - top);
      const k = clamp(Math.min(r.width / (x1 - x0 + 2 * pad), h / (y1 - y0 + 2 * pad)), 0.22, 1.25);
      t = { x: (x0 + x1) / 2, y: (y0 + y1) / 2 + (inset - top) / 2 / k, k };
    }
    if (animate) App.camT = t; else { App.cam = Object.assign({}, t); App.camT = null; }
    requestRender();
  };

  function updateBanner() {
    const st = App.state, el = $('#banner'), pv = st.view.perspective;
    if (!pv || !st.entities[pv] || !App.an) { el.hidden = true; return; }
    el.innerHTML = `🔎 Zoom sur : <b>${iconOf(pv)} ${esc(nameOf(pv))}</b> et son dossier <button data-act="pvoff" title="Tout afficher">×</button>`;
    el.hidden = false;
  }
  $('#banner').addEventListener('click', ev => {
    if (!ev.target.closest('[data-act=pvoff]')) return;
    if (App.mode === 'libre') pushUndo();
    App.state.view.perspective = null; App.commit();
  });

  /* ============================================================ annuler / persistance */
  function pushUndo() {
    App.undoStack.push(JSON.stringify(App.state));
    if (App.undoStack.length > 120) App.undoStack.shift();
    App.redoStack = [];
  }
  function beginEdit() { if (!App.editing) { pushUndo(); App.editing = true; } }
  function endEdit() { App.editing = false; }
  function undo() {
    if (App.mode !== 'libre' || !App.undoStack.length) return;
    App.redoStack.push(JSON.stringify(App.state));
    App.state = JSON.parse(App.undoStack.pop()); App.commit({ animate: false });
  }
  function redo() {
    if (App.mode !== 'libre' || !App.redoStack.length) return;
    App.undoStack.push(JSON.stringify(App.state));
    App.state = JSON.parse(App.redoStack.pop()); App.commit({ animate: false });
  }
  function sanitize(o) {
    const s = P.newState();
    if (!o || typeof o !== 'object') return s;
    s.entities = o.entities || {}; s.links = (o.links || []).filter(l => l && l.from && l.to);
    s.options = Object.assign(s.options, o.options || {});
    s.view = Object.assign(s.view, o.view || {});
    s.view.focus = []; s.view.notes = {}; s.view.select = null;
    Object.values(s.entities).forEach(e => { e.fixed = true; e.params = e.params || {}; if (!CAT[e.kind]) e.kind = 'clause'; });
    return s;
  }
  let saveT;
  function saveLocal() {
    clearTimeout(saveT);
    // l'état est capturé maintenant : dans 300 ms, App.state peut être celui d'un scénario (mode cinéma)
    const snap = App.state;
    saveT = setTimeout(() => { try { localStorage.setItem(LS_KEY, JSON.stringify(snap)); } catch (e) { /* stockage indisponible */ } }, 300);
  }

  /* ============================================================ interactions canevas */
  function toWorld(ev) {
    const r = svg.getBoundingClientRect(), c = App.cam;
    return { x: c.x + (ev.clientX - r.left - r.width / 2) / c.k, y: c.y + (ev.clientY - r.top - r.height / 2) / c.k };
  }

  /* pincer à deux doigts pour zoomer (écrans tactiles) */
  const touches = new Map();
  function startPinch() {
    const [a, b] = Array.from(touches.values());
    const d = App.drag;
    if (d && d.kind === 'node') { const dd = App.disp[d.id]; if (dd) dd.drag = false; }
    const mid = { clientX: (a.x + b.x) / 2, clientY: (a.y + b.y) / 2 };
    App.drag = { kind: 'pinch', d0: Math.hypot(a.x - b.x, a.y - b.y) || 1, k0: App.cam.k, w0: toWorld(mid) };
    App.camT = null;
  }
  svg.addEventListener('pointerdown', ev => {
    if (ev.pointerType === 'touch') {
      touches.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
      if (touches.size === 2) { startPinch(); return; }
      if (touches.size > 2) return;
    }
    if (ev.button !== 0 && ev.button !== 1) return;
    const w = toWorld(ev), t = ev.target;
    const port = t.closest('[data-port]'), node = t.closest('[data-node]'), link = t.closest('[data-link]'), fr = t.closest('[data-frame]'), note = t.closest('[data-note]');
    try { svg.setPointerCapture(ev.pointerId); } catch (e) { /* pointeur déjà relâché */ }
    if (note && ev.button === 0) {
      const id = note.dataset.note, o = App.noteOff[id] || { dx: 0, dy: 0 };
      App.drag = { kind: 'note', id, sx: w.x, sy: w.y, dx0: o.dx, dy0: o.dy };
      return;
    }
    if (port && App.mode === 'libre' && ev.button === 0) { App.drag = { kind: 'port', from: port.dataset.port, x: w.x, y: w.y }; return; }
    if (node && ev.button === 0) {
      const id = node.dataset.node, d = App.disp[id];
      App.select({ kind: 'node', id });
      App.drag = { kind: App.mode === 'libre' ? 'node' : 'cnode', id, ox: w.x - d.x, oy: w.y - d.y, sx: w.x, sy: w.y, moved: false };
      return;
    }
    if (link && ev.button === 0) { App.select({ kind: 'link', id: link.dataset.link }); return; }
    if (fr && ev.button === 0 && App.mode === 'libre') {
      // glisser le cadre d'un contrat déplace tout le contrat
      const id = fr.dataset.frame, f = App.an.frames.find(x => x.id === id);
      App.select({ kind: 'node', id });
      if (f) App.drag = { kind: 'frame', ids: f.members.slice(), sx: w.x, sy: w.y, start: f.members.map(m => ({ id: m, x: App.state.entities[m].x, y: App.state.entities[m].y })), moved: false };
      return;
    }
    App.drag = { kind: 'pan', sx: ev.clientX, sy: ev.clientY, cx: App.cam.x, cy: App.cam.y, moved: false };
  });
  svg.addEventListener('pointermove', ev => {
    if (touches.has(ev.pointerId)) touches.set(ev.pointerId, { x: ev.clientX, y: ev.clientY });
    const dr = App.drag; if (!dr) return;
    if (dr.kind === 'pinch') {
      if (touches.size < 2) return;
      const [a, b] = Array.from(touches.values()), r = svg.getBoundingClientRect();
      const k = clamp(dr.k0 * Math.hypot(a.x - b.x, a.y - b.y) / dr.d0, 0.2, 3);
      const mx = (a.x + b.x) / 2 - r.left - r.width / 2, my = (a.y + b.y) / 2 - r.top - r.height / 2;
      App.cam = { x: dr.w0.x - mx / k, y: dr.w0.y - my / k, k };
      requestRender(); return;
    }
    const w = toWorld(ev);
    if (dr.kind === 'node' || dr.kind === 'cnode') {
      const e = App.state.entities[dr.id], d = App.disp[dr.id]; if (!e) return;
      if (!dr.moved) {
        if (Math.hypot(w.x - dr.sx, w.y - dr.sy) * App.cam.k < 4) return;
        if (dr.kind === 'node') pushUndo();
        dr.moved = true;
      }
      e.x = Math.round(w.x - dr.ox); e.y = Math.round(w.y - dr.oy); e.fixed = true;
      if (dr.kind === 'cnode') App.cinePos[dr.id] = { x: e.x, y: e.y };
      d.x = e.x; d.y = e.y; d.drag = true; requestRender();
    } else if (dr.kind === 'frame') {
      if (!dr.moved) { if (Math.hypot(w.x - dr.sx, w.y - dr.sy) * App.cam.k < 4) return; pushUndo(); dr.moved = true; }
      dr.start.forEach(p => {
        const e = App.state.entities[p.id], d = App.disp[p.id]; if (!e || !d) return;
        e.x = Math.round(p.x + w.x - dr.sx); e.y = Math.round(p.y + w.y - dr.sy); e.fixed = true;
        d.x = e.x; d.y = e.y; d.drag = true;
      });
      requestRender();
    } else if (dr.kind === 'note') {
      App.noteOff[dr.id] = { dx: dr.dx0 + w.x - dr.sx, dy: dr.dy0 + w.y - dr.sy }; requestRender();
    } else if (dr.kind === 'port') { dr.x = w.x; dr.y = w.y; requestRender(); }
    else if (dr.kind === 'pan') {
      if (Math.hypot(ev.clientX - dr.sx, ev.clientY - dr.sy) > 3) dr.moved = true;
      App.cam.x = dr.cx - (ev.clientX - dr.sx) / App.cam.k; App.cam.y = dr.cy - (ev.clientY - dr.sy) / App.cam.k;
      App.camT = null; requestRender();
    }
  });
  function endDrag(ev) {
    touches.delete(ev.pointerId);
    const dr = App.drag; if (!dr) return;
    if (dr.kind === 'pinch') { if (touches.size < 2) App.drag = null; return; }
    App.drag = null;
    if (dr.kind === 'node') { const d = App.disp[dr.id]; if (d) d.drag = false; if (dr.moved) App.commit({ animate: false }); }
    else if (dr.kind === 'frame') { dr.ids.forEach(id => { const d = App.disp[id]; if (d) d.drag = false; }); if (dr.moved) App.commit({ animate: false }); }
    else if (dr.kind === 'cnode') { const d = App.disp[dr.id]; if (d) d.drag = false; updatePlayer(); }
    else if (dr.kind === 'note') updatePlayer();
    else if (dr.kind === 'port') {
      const el = document.elementFromPoint(ev.clientX, ev.clientY);
      const tn = el && el.closest && el.closest('[data-node]');
      if (tn && tn.dataset.node !== dr.from) createLink(dr.from, tn.dataset.node); else requestRender();
    } else if (dr.kind === 'pan' && !dr.moved) App.select(null);
  }
  svg.addEventListener('pointerup', endDrag);
  svg.addEventListener('pointercancel', ev => { touches.delete(ev.pointerId); App.drag = null; requestRender(); });
  svg.addEventListener('wheel', ev => {
    ev.preventDefault();
    const w = toWorld(ev), c = App.cam;
    const k = clamp(c.k * Math.exp(-ev.deltaY * 0.0015), 0.2, 3);
    c.x = w.x - (w.x - c.x) * c.k / k; c.y = w.y - (w.y - c.y) * c.k / k; c.k = k;
    App.camT = null; requestRender();
  }, { passive: false });
  $('#zoom').addEventListener('click', ev => {
    const b = ev.target.closest('[data-z]'); if (!b) return;
    const z = b.dataset.z, base = App.camT || App.cam;
    if (z === 'fit') App.fit(true);
    else App.camT = { x: base.x, y: base.y, k: clamp(base.k * (z === 'in' ? 1.25 : 0.8), 0.2, 3) };
    requestRender();
  });
  let lastW = 0;
  const onResize = () => {
    const w = svg.getBoundingClientRect().width;
    if ((!lastW && w) || (App.mode === 'cinema' && w)) App.fit(!!lastW);
    lastW = w; requestRender();
  };
  if (window.ResizeObserver) new ResizeObserver(onResize).observe(svg); else window.addEventListener('resize', onResize);

  function createLink(from, to, rel, silent) {
    const st = App.state;
    if (!st.entities[to] || !st.entities[from] || from === to) return null;
    const ex = P.findAnyLink(st, from, to);
    if (ex && !rel) { App.select({ kind: 'link', id: P.linkKey(ex) }); return ex; }
    let a = from, b = to;
    if (!rel) { const d = P.defaultRel(st.entities[from].kind, st.entities[to].kind); rel = d[0]; if (d[1]) { a = to; b = from; } }
    if (!silent) pushUndo();
    const l = P.setLink(st, a, b, rel, '');
    if (!silent) { App.sel = { kind: 'link', id: P.linkKey(l) }; App.commit(); }
    return l;
  }

  /** place libre la plus proche d'un point (spirale) */
  function freeSpot(x, y) {
    const es = Object.values(App.state.entities);
    const free = (a, b) => es.every(e => Math.abs(e.x - a) > NW + 24 || Math.abs(e.y - b) > NH + 46);
    let px = x, py = y;
    for (let i = 0; i < 300 && !free(px, py); i++) { const a = i * 0.9, r = 50 + i * 16; px = x + Math.cos(a) * r * 1.6; py = y + Math.sin(a) * r; }
    return { x: Math.round(px), y: Math.round(py) };
  }
  function addEntityAt(kind, x, y, silent) {
    if (App.mode !== 'libre') return null;
    const st = App.state;
    if (!silent) pushUndo();
    const id = P.addEntity(st, { kind, name: CAT[kind].label, x: Math.round(x), y: Math.round(y), fixed: true, params: {} });
    if (!silent) {
      App.sel = { kind: 'node', id };
      App.commit();
      const inp = $('#inspector input.name'); if (inp) { inp.focus(); inp.select(); }
    }
    return id;
  }

  /* ---- palette : construite depuis le catalogue */
  function buildPalette() {
    const el = $('#palette');
    let h = '<input type="search" id="pal-search" placeholder="🔍 Chercher une clause, une rupture…" spellcheck="false">';
    P.FAM_ORDER.forEach((f, i) => {
      const F = P.FAMS[f], items = Object.keys(CAT).filter(k => CAT[k].fam === f);
      const grps = [];
      items.forEach(k => { const g = CAT[k].grp || ''; if (!grps.includes(g)) grps.push(g); });
      h += `<details class="pal-fam" data-fam="${f}"${i < 4 ? ' open' : ''}><summary><span class="pf-dot" style="background:${F.color}"></span>${F.icon} ${esc(F.label)}<small>${items.length}</small></summary>`;
      grps.forEach(g => {
        if (g && grps.length > 1) h += `<div class="pal-grp">${esc(g)}</div>`;
        items.filter(k => (CAT[k].grp || '') === g).forEach(k => {
          h += `<div class="tool" draggable="true" data-kind="${k}" title="${esc(CAT[k].desc || '')}" style="--fc:${F.color}"><span class="ic">${CAT[k].icon}</span><b>${esc(CAT[k].label)}</b>${CAT[k].req ? `<i class="nreq" title="${CAT[k].req.length} condition(s) de validité">${CAT[k].req.length}</i>` : ''}${CAT[k].illicite ? '<i class="nreq bad" title="Illicite">!</i>' : ''}</div>`;
        });
      });
      h += '</details>';
    });
    h += `<h3>Outils</h3><button class="tool-btn" id="tool-example">✨ Charger un exemple</button>
      <p class="hint">Cliquez ou glissez un élément sur le canevas.<br>Tirez la poignée <b>+</b> (à droite d'une carte) vers une autre carte pour les relier : la relation est choisie automatiquement.<br>Les <b>pastilles</b> sous une clause sont ses garde-fous : pointillées, ils manquent.</p>`;
    el.innerHTML = h;
    const search = $('#pal-search', el);
    search.addEventListener('input', () => {
      const q = P.norm(search.value);
      $$('.tool', el).forEach(t => { const k = t.dataset.kind; t.hidden = !!q && !P.norm(CAT[k].label + ' ' + k + ' ' + (CAT[k].desc || '')).includes(q); });
      $$('.pal-fam', el).forEach(d => { const any = $$('.tool', d).some(t => !t.hidden); d.hidden = !any; if (q) d.open = any; });
      $$('.pal-grp', el).forEach(gp => { let n = gp.nextElementSibling, any = false; while (n && n.classList.contains('tool')) { if (!n.hidden) any = true; n = n.nextElementSibling; } gp.hidden = !any; });
    });
    el.addEventListener('dragstart', ev => {
      const t = ev.target.closest && ev.target.closest('.tool[data-kind]'); if (!t) return;
      ev.dataTransfer.setData('text/x-kind', t.dataset.kind); ev.dataTransfer.effectAllowed = 'copy';
    });
    el.addEventListener('click', ev => {
      const t = ev.target.closest('.tool[data-kind]');
      if (t) {
        const c = App.camT || App.cam, sel = App.sel && App.sel.kind === 'node' && App.state.entities[App.sel.id];
        // ajouté près de l'élément sélectionné (et relié à lui), sinon au centre de la vue
        const p = sel ? freeSpot(sel.x, sel.y + 150) : freeSpot(c.x, c.y);
        const from = sel ? App.sel.id : null;
        pushUndo();
        const id = addEntityAt(t.dataset.kind, p.x, p.y, true);
        if (from && autoRelate(from, id)) toast(`Relié à « ${esc(nameOf(from))} » (Ctrl+Z pour annuler)`);
        App.sel = { kind: 'node', id }; App.commit();
        return;
      }
      if (ev.target.id === 'tool-example') loadExample();
    });
  }
  /** relie automatiquement un nouvel élément à l'élément sélectionné quand la relation est évidente */
  function autoRelate(from, id) {
    const st = App.state, a = st.entities[from], b = st.entities[id];
    const d = P.defaultRel(a.kind, b.kind);
    if (d[0] === 'lien') return false;
    if (d[0] === 'puis' && P.famOf(b) === 'etape') { chainAppend(from, id); return true; }
    createLink(from, id, null, true); return true;
  }
  /** ajoute une étape au bout de la chaîne de procédure qui part de « from » */
  function chainAppend(from, id) {
    const st = App.state; let last = from; const seen = new Set([from]);
    for (;;) { const n = st.links.find(l => l.rel === 'puis' && l.from === last && !seen.has(l.to)); if (!n) break; last = n.to; seen.add(last); }
    P.setLink(st, last, id, 'puis', '');
  }
  const stage = $('#stage');
  stage.addEventListener('dragover', ev => { if (Array.from(ev.dataTransfer.types).includes('text/x-kind')) { ev.preventDefault(); ev.dataTransfer.dropEffect = 'copy'; } });
  stage.addEventListener('drop', ev => {
    const k = ev.dataTransfer.getData('text/x-kind');
    if (!k) return;
    ev.preventDefault(); ev.stopPropagation();
    const w = toWorld(ev); addEntityAt(k, w.x, w.y);
  });
  window.addEventListener('dragover', ev => { if (Array.from(ev.dataTransfer.types).includes('Files')) ev.preventDefault(); });
  window.addEventListener('drop', ev => {
    const f = ev.dataTransfer.files && ev.dataTransfer.files[0];
    if (!f) return; ev.preventDefault(); openFile(f);
  });

  App.select = function (sel) {
    App.sel = sel;
    if (App.mode === 'libre') { endEdit(); App.renderInspector(); } else App.renderCommentary();
    requestRender();
  };

  function deleteSel() {
    const s = App.sel; if (!s || App.mode !== 'libre') return;
    pushUndo();
    if (s.kind === 'node') P.removeEntity(App.state, s.id);
    else if (s.kind === 'link') { const l = findLinkByKey(s.id); if (l) P.removeLink(App.state, l.from, l.to); }
    App.sel = null; App.commit();
  }

  /* ============================================================ analyse (texte) */
  function verdictHTML(id) {
    const I = App.an.info[id], S = P.STATUS[I.status] || P.STATUS.neutral;
    if (I.hidden) return '<div class="verdict none">🔍 Vérification automatique masquée : à vous de juger !</div>';
    if (I.status === 'neutral') return '';
    let h = `<div class="verdict" style="--c:${S.color}">${S.icon} <b>${esc(I.verdict ? I.verdict.charAt(0).toUpperCase() + I.verdict.slice(1) : S.label)}</b>${I.override ? ' <span class="muted small">(verdict fixé par le scénario)</span>' : ''}</div>`;
    if (I.violee) h += `<div class="warnbox">⚡ Violée par : ${I.violee.map(v => `<a data-act="sel" data-id="${esc(v)}">${iconOf(v)} ${esc(nameOf(v))}</a>`).join(', ')}</div>`;
    const ex = I.issues.filter(x => x.other);
    if (ex.length) h += ex.map(x => `<div class="warnbox">⊘ <a data-act="sel" data-id="${esc(x.other)}">${iconOf(x.other)} ${esc(nameOf(x.other))}</a> : ${esc(x.effet)}</div>`).join('');
    const other = I.issues.filter(x => !x.other && !/^Manque/.test(x.text));
    if (other.length) h += other.map(x => `<div class="warnbox">${x.level === 'grave' ? '⛔' : '⚠️'} ${esc(x.text)} : ${esc(x.effet)}</div>`).join('');
    return h;
  }
  function checklistHTML(id, editable) {
    const I = App.an.info[id]; if (!I.reqs.length) return '';
    let h = '<h4>Conditions de validité</h4><ul class="checklist">';
    I.reqs.forEach(r => {
      const k = r.custom ? null : r.any[0], lab = r.custom ? r.label : CAT[k].label;
      const hid = I.hidden;
      h += `<li class="${hid ? 'hid' : r.ok ? 'ok' : (r.level === 'grave' ? 'miss' : 'warn')}"><span class="ck">${hid ? '❔' : r.ok ? '✔' : '✘'}</span><span class="ci">${r.custom ? '☑️' : CAT[k].icon}</span><div><b>${esc(lab)}</b>${r.any && r.any.length > 1 ? `<span class="muted small"> (ou : ${r.any.slice(1).map(x => esc(CAT[x].label)).join(', ')})</span>` : ''}${r.why ? `<br><span class="small muted">${esc(r.why)}</span>` : ''}${!r.ok && !hid ? `<br><span class="small eff">Sinon : ${esc(r.effet)}</span>` : ''}${r.ok && r.via ? `<br><span class="small muted">via <a data-act="sel" data-id="${esc(r.via)}">${esc(nameOf(r.via))}</a></span>` : ''}</div>${editable && !r.ok && !r.custom ? `<button class="small add-req" data-act="addreq" data-k="${k}" title="Ajouter et relier « ${esc(lab)} »">＋</button>` : ''}</li>`;
    });
    return h + '</ul>';
  }
  function rulesHTML(id, editable) {
    const e = App.state.entities[id], D = P.def(e); let h = '';
    if (D.excl && D.excl.length) {
      h += '<h4>Incompatibilités</h4><ul class="rules">' + D.excl.map(x => `<li>⊘ ${x.any.map(k => `${CAT[k].icon} ${esc(CAT[k].label)}`).join(', ')} <span class="small muted">→ ${esc(x.effet)}</span></li>`).join('') + '</ul>';
    }
    const by = Object.keys(CAT).filter(k => (CAT[k].excl || []).some(x => x.any.includes(e.kind)));
    if (by.length) h += `<p class="small muted">Sa présence neutralise : ${by.map(k => `${CAT[k].icon} ${esc(CAT[k].label)}`).join(', ')}.</p>`;
    if (D.ouvre && D.ouvre.length) {
      h += '<h4>Conséquences habituelles</h4><div class="chips">' + D.ouvre.map(k => editable ? `<button class="small chip" data-act="addcons" data-k="${k}" title="Ajouter et relier">${CAT[k].icon} ${esc(CAT[k].label)}</button>` : `<span class="chip">${CAT[k].icon} ${esc(CAT[k].label)}</span>`).join('') + '</div>';
    }
    return h;
  }
  function calcHTML(id) {
    const I = App.an.info[id]; if (!I.calc.length) return '';
    return `<div class="insight">🧮 ${I.calc.map(esc).join('<br>')}${I.calcDetail ? `<br><span class="small muted">${esc(I.calcDetail)}</span>` : ''}</div>`;
  }
  App.analysisHTML = function (id, editable) {
    const e = App.state.entities[id]; if (!e) return '';
    const D = P.def(e);
    return verdictHTML(id) + calcHTML(id) + checklistHTML(id, editable) + (D.desc ? `<p class="desc">${esc(D.desc)}</p>` : '') + rulesHTML(id, editable);
  };

  /* ============================================================ inspecteur (mode libre) */
  function kindSelect(cur) {
    return `<select data-act="kind">${P.FAM_ORDER.map(f => `<optgroup label="${esc(P.FAMS[f].label)}">${Object.keys(CAT).filter(k => CAT[k].fam === f).map(k => `<option value="${k}"${k === cur ? ' selected' : ''}>${CAT[k].icon} ${esc(CAT[k].label)}</option>`).join('')}</optgroup>`).join('')}</select>`;
  }
  const PARAM_LABELS = { categorie: 'Catégorie', anciennete: 'Ancienneté (années)', salaire: 'Salaire mensuel brut (€)', duree: 'Durée (mois)', montant: 'Montant (€)', remuneration_totale: 'Rémunération totale brute (€)', icone: 'Icône' };
  function paramsHTML(id) {
    const e = App.state.entities[id], D = P.def(e), p = e.params || {};
    const keys = Array.from(new Set((D.params || []).concat(Object.keys(p)).concat(e.kind === 'indemnite_rc' ? ['montant'] : []).concat(e.kind === 'indemnite_precarite' ? ['remuneration_totale'] : [])));
    let h = '<h4>Données chiffrées</h4>';
    keys.forEach(k => {
      if (k === 'categorie') h += `<div class="prow"><label>${PARAM_LABELS[k]}</label><select data-act="param" data-k="categorie"><option value="">—</option>${Object.keys(P.CATEGORIES).map(c => `<option value="${c}"${p.categorie === c ? ' selected' : ''}>${P.CATEGORIES[c].label}</option>`).join('')}</select></div>`;
      else h += `<div class="prow"><label>${esc(PARAM_LABELS[k] || k)}</label><input type="text" data-act="param" data-k="${esc(k)}" value="${esc(p[k] == null ? '' : p[k])}"></div>`;
    });
    h += `<input type="text" class="addparam" data-act="addparam" placeholder="＋ autre donnée : cle=valeur (ex. icone=🧸)">`;
    if (!keys.length) h += '<p class="small muted">Ancienneté, salaire et catégorie se renseignent sur le salarié : les indemnités, le préavis et la période d\'essai les utilisent.</p>';
    return h;
  }
  function relSelect(cur) {
    return `<select data-act="rel">${Object.keys(P.RELS).map(r => `<option value="${r}"${r === cur ? ' selected' : ''}>${esc(P.RELS[r].label)}</option>`).join('')}</select>`;
  }
  function linksHTML(id) {
    const st = App.state, ls = st.links.filter(l => l.from === id || l.to === id);
    let h = '<h4>Relations</h4>';
    if (!ls.length) h += '<p class="muted small">Aucune. Tirez la poignée <b>+</b> vers une autre carte.</p>';
    ls.forEach(l => {
      const out = l.from === id, o = out ? l.to : l.from;
      h += `<div class="le" data-link="${esc(P.linkKey(l))}"><div class="le-head"><span>${out ? '' : `<a data-act="sel" data-id="${esc(o)}">${iconOf(o)} ${esc(nameOf(o))}</a> `}${relSelect(l.rel)}${out ? ` <a data-act="sel" data-id="${esc(o)}">${iconOf(o)} ${esc(nameOf(o))}</a>` : ' <i class="muted">cette carte</i>'}</span><button class="x" data-act="dellink" title="Supprimer ce lien">×</button></div>
        <input type="text" class="lab" data-act="label" placeholder="libellé (facultatif : délai, montant…)" value="${esc(l.label || '')}"></div>`;
    });
    const cand = Object.keys(st.entities).filter(o => o !== id && !P.findAnyLink(st, id, o));
    if (cand.length) h += `<select data-act="addlink" class="add"><option value="">＋ Relier à…</option>${P.FAM_ORDER.map(f => { const xs = cand.filter(o => famOf(o) === f); return xs.length ? `<optgroup label="${esc(P.FAMS[f].label)}">${xs.map(o => `<option value="${esc(o)}">${iconOf(o)} ${esc(nameOf(o))}</option>`).join('')}</optgroup>` : ''; }).join('')}</select>`;
    return h;
  }
  const STATUT_OPTS = [['auto', 'automatique'], ['ok', '✅ valide'], ['risk', '⚠️ à risque'], ['ko', '⛔ nulle / irrégulière'], ['violee', '⚡ violée'], ['neutral', '— sans verdict']];

  function overviewHTML() {
    const st = App.state, an = App.an, ids = Object.keys(st.entities);
    if (!ids.length) {
      return `<div class="welcome"><h3>Bienvenue 👋</h3>
        <p>Cet atelier transforme un cours de <b>droit du travail</b> en schéma : un contrat et ses <b>clauses</b> en icônes, les <b>garde-fous</b> qui les rendent valables, les <b>incompatibilités</b>, les <b>obligations</b> des parties et les <b>ruptures</b> avec leur procédure.</p>
        <ol><li>Cliquez ou glissez des éléments depuis la palette.</li><li>Tirez la poignée <b>+</b> d'une carte vers une autre pour les relier.</li><li>Lisez le verdict : ✅ valide, ⚠️ à risque, ⛔ nulle — et les pastilles de garde-fous manquants.</li></ol>
        <div class="btns"><button class="primary" data-act="example">✨ Charger un exemple</button><button data-act="cinema">🎬 Voir les scénarios</button></div></div>`;
    }
    const c = an.counts();
    let h = `<h3>Vue d'ensemble</h3><p class="muted small">${ids.length} élément${ids.length > 1 ? 's' : ''} · ${st.links.length} relation${st.links.length > 1 ? 's' : ''}</p>`;
    if (!an.verif) h += '<div class="verdict none">🔍 Vérification automatique désactivée : les verdicts et les pastilles sont masqués.</div>';
    else h += `<div class="counts"><span style="--c:#16a34a">✅ ${c.ok}<small>valide(s)</small></span><span style="--c:#d97706">⚠️ ${c.risk}<small>à risque</small></span><span style="--c:#dc2626">⛔ ${c.ko}<small>nulle(s)</small></span><span style="--c:#dc2626">⚡ ${c.violee}<small>violée(s)</small></span></div>`;
    const pb = ids.filter(i => ['ko', 'risk', 'violee'].includes(an.info[i].status));
    if (pb.length) h += '<h4>Points à corriger</h4><ul class="ctrl-list">' + pb.map(i => `<li><span class="dot" style="background:${P.STATUS[an.info[i].status].color}"></span><a data-act="sel" data-id="${esc(i)}"><b>${iconOf(i)} ${esc(nameOf(i))}</b></a><br><span class="small">${esc(an.info[i].verdict)}</span></li>`).join('') + '</ul>';
    if (an.frames.length) h += '<h4>Contrats</h4><ul class="ctrl-list">' + an.frames.map(f => `<li><a data-act="sel" data-id="${esc(f.id)}"><b>${iconOf(f.id)} ${esc(nameOf(f.id))}</b></a><br><span class="small">${f.members.filter(m => m !== f.id && famOf(m) === 'clause').map(m => `${iconOf(m)} ${esc(nameOf(m))}`).join(' · ') || '—'}</span></li>`).join('') + '</ul>';
    h += `<h4>Zoom sur un dossier</h4><select data-act="pvsel" class="add"><option value="">— tout afficher —</option>${ids.map(i => `<option value="${esc(i)}"${st.view.perspective === i ? ' selected' : ''}>${iconOf(i)} ${esc(nameOf(i))}</option>`).join('')}</select>`;
    h += '<p class="hint">Cliquez sur une carte ou un lien pour le modifier. Avec une carte sélectionnée, un clic dans la palette ajoute l\'élément <b>et le relie</b>. Glisser le fond déplace la vue, la molette zoome.</p>';
    return h;
  }

  function entityInspector(id) {
    const st = App.state, e = st.entities[id], D = P.def(e), F = P.FAMS[D.fam];
    const pv = st.view.perspective === id, ov = e.status ? e.status.v : 'auto';
    let h = `<div class="insp-head"><span class="big">${P.iconOf(e)}</span><input class="name" data-act="rename" value="${esc(e.name)}" spellcheck="false" title="Renommer"></div>`;
    h += `<div class="famtag" style="--c:${F.color}">${F.icon} ${esc(F.label)}${D.grp ? ' · ' + esc(D.grp) : ''}</div>`;
    h += `<div class="row"><label>Type</label>${kindSelect(e.kind)}</div>`;
    h += `<div id="insp-analysis">${App.analysisHTML(id, true)}</div>`;
    if (D.fam !== 'limite' && D.fam !== 'norme') h += paramsHTML(id);
    h += linksHTML(id);
    h += `<details class="adv"${ov !== 'auto' || (e.conds || []).length ? ' open' : ''}><summary>Verdict et conditions personnalisés</summary>
      <div class="row"><label>Verdict</label><select data-act="statut">${STATUT_OPTS.map(([v, l]) => `<option value="${v}"${v === ov ? ' selected' : ''}>${l}</option>`).join('')}</select></div>
      ${ov !== 'auto' ? `<input type="text" class="lab" data-act="statut-text" placeholder="texte du verdict" value="${esc(e.status.text || '')}">` : ''}
      <div class="conds">${(e.conds || []).map((c, i) => `<label class="chk"><input type="checkbox" data-act="cond" data-i="${i}"${c.ok ? ' checked' : ''}> ${esc(c.label)} <button class="x" data-act="delcond" data-i="${i}" title="Retirer">×</button></label>`).join('')}</div>
      <input type="text" class="lab" data-act="addcond" placeholder="＋ condition libre (Entrée), ex. « Limitée à 1 an »">
    </details>`;
    h += `<div class="btns"><button data-act="pv" class="${pv ? 'on' : ''}">🔎 ${pv ? 'Tout afficher' : 'Zoom sur son dossier'}</button><button data-act="del" class="danger">🗑 Supprimer</button></div>`;
    return h;
  }

  function linkInspector(k) {
    const l = findLinkByKey(k); if (!l) return overviewHTML();
    const R = P.RELS[l.rel] || P.RELS.lien;
    let h = `<h3>🔗 Relation</h3><p><a data-act="sel" data-id="${esc(l.from)}">${iconOf(l.from)} ${esc(nameOf(l.from))}</a> <b style="color:${R.color}">${esc(R.label)}</b> <a data-act="sel" data-id="${esc(l.to)}">${iconOf(l.to)} ${esc(nameOf(l.to))}</a></p>`;
    h += `<div class="le" data-link="${esc(k)}"><div class="row"><label>Relation</label>${relSelect(l.rel)}</div><input type="text" class="lab" data-act="label" placeholder="libellé (facultatif : délai, montant…)" value="${esc(l.label || '')}"></div>`;
    h += `<p class="small muted">${esc(REL_HELP[l.rel] || '')}</p>`;
    h += '<div class="btns"><button data-act="swap">⇄ Inverser le sens</button><button data-act="dellink" class="danger">🗑 Supprimer</button></div>';
    h += `<h4>${iconOf(l.to)} ${esc(nameOf(l.to))}</h4><div id="insp-analysis">${App.analysisHTML(l.to, false)}</div>`;
    return h;
  }
  const REL_HELP = {
    contient: 'Le contrat comporte cette clause : elle apparaît dans le cadre du contrat.',
    limite: "Garde-fou : cet élément limite ou conditionne la validité de l'autre (contrepartie, limite dans le temps, écrit…).",
    requiert: "L'origine suppose la présence de la cible.",
    exclut: "Incompatibilité : quand les deux éléments sont dans le même dossier, la cible est neutralisée (verdict rouge).",
    signe: 'Partie au contrat.', doit: 'La partie est débitrice de cette obligation.', viole: "Le manquement viole l'obligation : elle passe en ⚡ violée.",
    justifie: 'La faute ou le motif justifie la rupture (et compte comme sa cause).', initie: 'La partie est à l\'initiative de la rupture.',
    met_fin: 'La rupture met fin au contrat.', puis: 'Étape suivante de la procédure (libellé : délai à respecter).',
    ouvre: 'La rupture ou l\'étape ouvre droit à cette indemnité ou ce droit.', encadre: 'La norme encadre cet élément.',
    prevaut: 'Hiérarchie des normes : la source prévaut (ou est plus favorable).', lien: 'Lien libre : précisez-le avec un libellé.'
  };

  App.renderInspector = function () {
    const el = $('#inspector'), s = App.sel;
    if (!App.an) return;
    if (!s) el.innerHTML = overviewHTML();
    else if (s.kind === 'node') el.innerHTML = entityInspector(s.id);
    else if (s.kind === 'link') el.innerHTML = linkInspector(s.id);
  };
  function refreshAnalysis() {
    const s = App.sel, box = $('#insp-analysis');
    if (!s) { $('#inspector').innerHTML = overviewHTML(); return; }
    if (box) {
      if (s.kind === 'node') box.innerHTML = App.analysisHTML(s.id, true);
      else if (s.kind === 'link') { const l = findLinkByKey(s.id); if (l) box.innerHTML = App.analysisHTML(l.to, false); }
    }
  }

  /** ajoute un élément du type k près de « id » et le relie comme il convient */
  function addRelated(id, k, rel) {
    const st = App.state, e = st.entities[id];
    const n = st.links.filter(l => l.from === id || l.to === id).length;
    const p = freeSpot(e.x + ((n % 5) - 2) * 60, e.y + 150);
    pushUndo();
    const nid = addEntityAt(k, p.x, p.y, true);
    if (rel) P.setLink(st, id, nid, rel, '');
    else if (P.famOf(st.entities[nid]) === 'etape' && P.famOf(e) === 'rupture') chainAppend(id, nid);
    else { const d = P.defaultRel(e.kind, k); if (d[0] === 'lien' && P.famOf(st.entities[nid]) !== 'limite') P.setLink(st, nid, id, 'lien', ''); else createLink(id, nid, null, true); }
    App.commit();
    toast(`${CAT[k].icon} ${esc(CAT[k].label)} ajouté(e) et relié(e)`);
  }

  const insp = $('#inspector');
  insp.addEventListener('input', ev => {
    const t = ev.target, act = t.dataset.act; if (!act) return;
    const st = App.state;
    if (act === 'rename') { beginEdit(); st.entities[App.sel.id].name = t.value; App.commit({ inspector: false, animate: false }); return; }
    if (act === 'label') {
      const le = t.closest('.le'), l = le && findLinkByKey(le.dataset.link); if (!l) return;
      beginEdit(); l.label = t.value; App.commit({ inspector: false, animate: false }); return;
    }
    if (act === 'statut-text') { const e = st.entities[App.sel.id]; if (e.status) { beginEdit(); e.status.text = t.value; App.commit({ inspector: false, animate: false }); } return; }
  });
  insp.addEventListener('change', ev => {
    const t = ev.target, act = t.dataset.act, st = App.state;
    if (!act) return;
    if (['rename', 'label', 'statut-text'].includes(act)) { endEdit(); App.renderInspector(); return; }
    const e = App.sel && App.sel.kind === 'node' ? st.entities[App.sel.id] : null;
    if (act === 'kind' && e) { pushUndo(); const old = P.def(e); if (e.name === old.label) e.name = CAT[t.value].label; e.kind = t.value; App.commit(); return; }
    if (act === 'rel') {
      const le = t.closest('.le'), l = le && findLinkByKey(le.dataset.link); if (!l) return;
      pushUndo(); l.rel = t.value; App.commit(); return;
    }
    if (act === 'param' && e) {
      pushUndo(); e.params = e.params || {};
      const k = t.dataset.k, v = t.value.trim();
      if (!v) delete e.params[k]; else { const n = P.num(v); e.params[k] = k === 'categorie' || k === 'icone' || n == null ? v : n; }
      App.commit(); return;
    }
    if (act === 'addparam' && e) {
      const m = t.value.trim().match(/^([A-Za-zÀ-ÿ_]+)\s*[=:]\s*(.+)$/);
      if (!m) { toast('Format attendu : cle=valeur'); return; }
      pushUndo(); e.params = e.params || {};
      const k = P.key(m[1]), n = P.num(m[2]); e.params[k === 'icon' ? 'icone' : k] = n == null ? m[2].trim() : n;
      App.commit(); return;
    }
    if (act === 'statut' && e) { pushUndo(); e.status = t.value === 'auto' ? null : { v: t.value, text: '' }; App.commit(); return; }
    if (act === 'cond' && e) { pushUndo(); e.conds[+t.dataset.i].ok = t.checked; App.commit(); return; }
    if (act === 'addcond' && e && t.value.trim()) { pushUndo(); e.conds = (e.conds || []).concat({ label: t.value.trim(), ok: false, level: 'grave', effet: '' }); App.commit(); return; }
    if (act === 'addlink' && t.value) { createLink(App.sel.id, t.value); return; }
    if (act === 'pvsel') { pushUndo(); st.view.perspective = t.value || null; App.commit(); }
  });
  insp.addEventListener('keydown', ev => { if (ev.key === 'Enter' && ev.target.matches('input.lab, input.addparam')) ev.target.blur(); });
  insp.addEventListener('click', ev => {
    const b = ev.target.closest('[data-act]'); if (!b || b.tagName === 'SELECT' || b.tagName === 'INPUT') return;
    const st = App.state, act = b.dataset.act;
    switch (act) {
      case 'sel': App.select({ kind: 'node', id: b.dataset.id }); break;
      case 'del': deleteSel(); break;
      case 'dellink': {
        const le = b.closest('.le');
        const l = le ? findLinkByKey(le.dataset.link) : findLinkByKey(App.sel.id);
        if (!l) return;
        pushUndo(); P.removeLink(st, l.from, l.to); App.commit(); break;
      }
      case 'swap': { const l = findLinkByKey(App.sel.id); if (!l) return; pushUndo(); [l.from, l.to] = [l.to, l.from]; App.sel = { kind: 'link', id: P.linkKey(l) }; App.commit(); break; }
      case 'pv': pushUndo(); st.view.perspective = st.view.perspective === App.sel.id ? null : App.sel.id; App.commit(); break;
      case 'addreq': addRelated(App.sel.id, b.dataset.k); break;
      case 'addcons': addRelated(App.sel.id, b.dataset.k, CAT[b.dataset.k].fam === 'droit' ? 'ouvre' : null); break;
      case 'delcond': { const e = st.entities[App.sel.id]; pushUndo(); e.conds.splice(+b.dataset.i, 1); App.commit(); break; }
      case 'example': loadExample(); break;
      case 'cinema': setMode('cinema'); break;
    }
  });

  /* ============================================================ légende */
  function buildLegend() {
    const el = $('#legend');
    let h = '<div class="lg-h">Légende <span>▾</span></div><div class="lg-body"><div class="lg-sec">Verdicts</div>';
    ['ok', 'risk', 'ko', 'violee'].forEach(k => { const S = P.STATUS[k]; h += `<div class="lg-row"><span class="box" style="border-color:${S.color};background:${tint(S.color, 0.1)}"></span>${S.icon} ${esc(S.label)}</div>`; });
    h += '<div class="lg-row"><span class="bdg ok">💰</span><span class="bdg miss">⌛</span>garde-fou présent / manquant</div>';
    h += '<div class="lg-sec">Relations</div>';
    ['limite', 'exclut', 'doit', 'viole', 'puis', 'ouvre', 'justifie', 'prevaut'].forEach(r => { const R = P.RELS[r]; h += `<div class="lg-row"><span class="sw${R.dash ? ' dash' : ''}" style="border-color:${R.color}"></span>${esc(R.label)}</div>`; });
    h += '<div class="lg-row"><span class="sw dash" style="border-color:#dc2626;opacity:.7"></span>⊘ incompatibilité (automatique)</div>';
    h += '<div class="lg-row"><span class="box" style="border-color:#4f46e5;border-style:dashed"></span>📄 cadre du contrat</div></div>';
    el.innerHTML = h;
    let pref = null;
    try { pref = localStorage.getItem('contract-lab.legend'); } catch (e) { /* */ }
    if (pref !== '1') el.classList.add('collapsed');
    $('.lg-h', el).onclick = () => {
      el.classList.toggle('collapsed');
      try { localStorage.setItem('contract-lab.legend', el.classList.contains('collapsed') ? '0' : '1'); } catch (e) { /* */ }
    };
  }

  /* ============================================================ modales */
  App.modal = function (html, cls) {
    const m = $('#modal'); m.className = cls || '';
    const c = $('.content', m); c.innerHTML = html; m.hidden = false;
    return c;
  };
  App.closeModal = () => { $('#modal').hidden = true; };
  $('#modal').addEventListener('click', ev => { if (ev.target.id === 'modal' || ev.target.closest('.close')) App.closeModal(); });

  function openLibrary() {
    const cards = P.LIBRARY.map(s => {
      const sc = P.parseScenario(s.md);
      return `<div class="lib-card"><h4>${esc(sc.title)}</h4><p>${esc(sc.description)}</p><span class="small muted">${sc.steps.length} étapes</span>
        <div class="btns"><button class="primary" data-run="${s.id}">▶ Lancer</button><button data-see="${s.id}">📝 Markdown</button><button data-dl="${s.id}" title="Télécharger le fichier .md">⬇</button></div></div>`;
    }).join('');
    const c = App.modal(`<h2>📚 Scénarios</h2><div class="lib-grid">${cards}</div>
      <h3>Votre propre scénario</h3>
      <p class="muted small">Collez le markdown fourni par un enseignant ou généré par une IA, ou ouvrez / déposez un fichier .md.</p>
      <textarea id="md-input" placeholder="# Mon scénario&#10;&#10;## 1. Première étape&#10;Commentaire…&#10;&#10;\`\`\`scene&#10;cdi C &quot;Contrat de Léa&quot;&#10;non_concurrence NC&#10;C -> NC&#10;\`\`\`"></textarea>
      <div class="btns"><button class="primary" id="md-run">▶ Lancer ce scénario</button><button id="md-file">📂 Ouvrir un fichier .md</button><button id="md-prompt" title="Consigne à donner à une IA avec votre cours">🤖 Consigne pour une IA</button><button id="md-spec">📄 Format des scénarios</button></div>`);
    c.addEventListener('click', ev => {
      const b = ev.target.closest('button'); if (!b) return;
      const get = id => P.LIBRARY.find(s => s.id === id);
      if (b.dataset.run) { App.closeModal(); App.loadScenario(get(b.dataset.run).md, { id: b.dataset.run }); }
      else if (b.dataset.see) openEditor(get(b.dataset.see).md, false);
      else if (b.dataset.dl) download(b.dataset.dl + '.md', get(b.dataset.dl).md.replace(/~~~scene/g, '```scene').replace(/^~~~$/gm, '```'));
      else if (b.id === 'md-run') { const v = $('#md-input', c).value; if (v.trim()) { App.closeModal(); App.loadScenario(v); } }
      else if (b.id === 'md-file') $('#file-input').click();
      else if (b.id === 'md-prompt') copyText(P.IA_CONSIGNE);
      else if (b.id === 'md-spec') openHelp('format');
    });
  }

  function openEditor(md, isCurrent) {
    const c = App.modal(`<h2>📝 Markdown du scénario</h2>
      <p class="muted small">Modifiez le texte puis relancez. Les blocs <code>scene</code> contiennent les commandes (voir « Format des scénarios »).</p>
      <textarea id="ed-md" class="big" spellcheck="false"></textarea>
      <div class="btns"><button class="primary" id="ed-run">▶ ${isCurrent ? 'Appliquer (rester à cette étape)' : 'Lancer'}</button><button id="ed-copy">📋 Copier</button><button id="ed-dl">⬇ Télécharger .md</button><button id="ed-spec">📄 Format</button></div>`);
    $('#ed-md', c).value = md;
    $('#ed-run', c).onclick = () => {
      const keep = App.step; App.closeModal();
      const v = $('#ed-md').value;
      // un scénario modifié n'est plus celui de la bibliothèque : il sera partagé par son texte
      const origin = isCurrent && v === App.scenarioSrc ? App.origin : null;
      if (App.loadScenario(v, origin) && isCurrent) App.goStep(keep);
    };
    $('#ed-copy', c).onclick = () => copyText($('#ed-md').value);
    $('#ed-dl', c).onclick = () => download('scenario.md', $('#ed-md').value);
    $('#ed-spec', c).onclick = () => openHelp('format');
  }

  /* Instructions complètes pour une IA : la page publiée (à jour), sinon la version embarquée (hors ligne). */
  function copyAllInstructions(consigne) {
    const demande = '\n\n---\n\n# Ma demande\n\n' + P.iaConsigneSansLien(consigne) + '\n\n';
    fetch('docs/instructions-ia.md').then(r => { if (!r.ok) throw 0; return r.text(); })
      .catch(() => fetch(P.IA_INSTRUCTIONS_URL).then(r => { if (!r.ok) throw 0; return r.text(); }))
      .then(t => copyText(t.trim() + demande), () => copyText(P.AI_PROMPT.trim() + demande));
  }

  function openHelp(which) {
    if (which === 'format') {
      const c = App.modal(`<div class="help-doc md">${P.md(P.FORMAT_DOC)}</div>
        <div class="btns"><button class="primary" id="hp-dl">⬇ Télécharger la spécification (.md)</button><a class="btnlink" href="docs/index.html#/format-scenario" target="_blank" rel="noopener">📖 Dans la documentation</a></div>`);
      $('#hp-dl', c).onclick = () => download('format-scenario.md', P.FORMAT_DOC);
      return;
    }
    const doc = (page, label) => `<a class="doc-link" href="docs/index.html#/${page}" target="_blank" rel="noopener">${label}</a>`;
    const c = App.modal(`<h2>❔ Aide</h2>
      <div class="help-cols">
        <div class="help-card"><h3>✏️ Mode libre</h3>${P.md(P.HELP_LIBRE)}</div>
        <div class="help-card"><h3>🎬 Mode cinéma</h3>${P.md(P.HELP_CINEMA)}</div>
      </div>
      <div class="help-ai">
        <h3>🤖 Préparer son cours avec une IA</h3>
        <ol class="help-steps">
          <li><b>Copiez la consigne</b> (elle contient le lien vers les instructions ; le texte est modifiable) :
            <div class="help-prompt" id="hp-text" contenteditable="true" spellcheck="false">${esc(P.IA_CONSIGNE)}</div>
            <button id="hp-consigne" class="big">📋 Copier la consigne</button></li>
          <li><b>Collez-la dans votre IA</b> (ChatGPT, Claude, Gemini, Mistral…), puis ajoutez votre cours.</li>
          <li><b>Collez la réponse</b> dans 📚 Scénarios, puis Lancer.</li>
        </ol>
        <details class="help-more"><summary>Votre IA ne peut pas ouvrir de lien ?</summary>
          <p>Copiez la version complète (instructions et consigne en un seul texte), puis ajoutez votre cours.</p>
          <div class="btns"><button id="hp-all" class="warn">📄 Copier la version complète</button>${doc('ia-et-skill', 'En savoir plus →')}</div>
        </details>
      </div>
      <h3>📖 Documentation complète</h3>
      <div class="doc-links">
        ${doc('mode-cinema', '🎬 Mode cinéma<small>lecture, questions, téléphone, partage</small>')}
        ${doc('prise-en-main', '✏️ Mode libre<small>construire un contrat, studio</small>')}
        ${doc('scenarios', '📚 Scénarios<small>les ' + P.LIBRARY.length + ' scénarios intégrés</small>')}
        ${doc('regles-de-calcul', '🧮 Règles de vérification<small>garde-fous, incompatibilités, calculs</small>')}
        ${doc('format-scenario', '📄 Format des scénarios<small>écrire ou corriger un scénario</small>')}
        ${doc('', '🏠 Accueil de la documentation<small>tout le reste</small>')}
      </div>
      <p class="help-thanks">${P.md(P.HELP_THANKS).replace(/^<p>|<\/p>$/g, '')}</p>`);
    $('#hp-consigne', c).onclick = () => copyText($('#hp-text', c).innerText.trim());
    $('#hp-all', c).onclick = () => copyAllInstructions($('#hp-text', c).innerText);
  }

  /* ============================================================ fichiers */
  function openFile(f) {
    const r = new FileReader();
    r.onload = () => {
      const txt = String(r.result);
      if (/\.json$/i.test(f.name)) {
        try {
          const o = JSON.parse(txt);
          const st = sanitize(o.state || o);
          if (App.mode !== 'libre') setMode('libre');
          pushUndo(); App.state = st; App.sel = null; App.disp = {}; App.commit({ animate: true }); App.fit(true);
          toast('📂 Schéma chargé : ' + esc(f.name));
        } catch (e) { toast('⚠ Fichier JSON invalide'); }
      } else { App.closeModal(); App.loadScenario(txt); }
    };
    r.readAsText(f, 'utf-8');
  }
  $('#file-input').addEventListener('change', ev => { const f = ev.target.files[0]; if (f) openFile(f); ev.target.value = ''; });

  function loadExample() {
    const sc = P.parseScenario(P.LIBRARY[0].md);
    const st = P.buildState(sc, sc.steps.length - 1);
    P.layout(st);
    Object.values(st.entities).forEach(e => { e.fixed = true; });
    st.view.focus = []; st.view.notes = {}; st.view.select = null;
    pushUndo(); App.state = st; App.sel = null; App.commit(); App.fit(true);
  }

  /* ============================================================ mode cinéma */
  /** origin : d'où vient le scénario, pour pouvoir le partager par lien —
   *  { id } (bibliothèque), { url } (fichier servi), { packed } (texte encodé dans le lien) ou rien. */
  App.loadScenario = function (md, origin, startStep) {
    const sc = P.parseScenario(md);
    if (!sc.steps.length) { toast('⚠ Ce scénario ne contient aucune étape.'); return false; }
    const errs = []; P.buildState(sc, sc.steps.length - 1, errs);
    sc.errors = sc.errors.concat(errs);
    App.pause();
    App.scenario = sc; App.scenarioSrc = md; App.origin = origin || null;
    App.disp = {}; App.ldisp = {}; App.step = -1;
    App.cinePos = {}; App.noteOff = {};
    if (App.mode !== 'cinema') setMode('cinema', true);
    App.goStep(startStep || 0);
    if (errs.length) toast(`⚠ ${errs.length} avertissement(s) dans le scénario (voir sous le commentaire).`, 4000);
    return true;
  };

  App.goStep = function (n) {
    const sc = App.scenario; if (!sc || !sc.steps.length) return;
    n = clamp(n, 0, sc.steps.length - 1);
    const changed = n !== App.step;
    if (changed) App.q = { revealed: false, collapsed: false, picked: null, flipped: {} };
    App.state = P.buildState(sc, n, null, App.q.revealed); App.step = n;
    App.sel = App.state.view.select ? { kind: 'node', id: App.state.view.select } : null;
    renderQSheet();
    App.commit();
    App.fit(true);
    updatePlayer();
    if (changed) $('#side').scrollTop = 0;
    App.schedule();
    syncUrl();
    notifyHost('step');
  };

  /* informe la plateforme d'apprentissage (paquet SCORM) de la progression */
  function notifyHost(kind) {
    const sc = App.scenario;
    if (!host || !sc || !host[kind]) return;
    const q = sc.steps[App.step].question;
    host[kind]({
      step: App.step, total: sc.steps.length,
      questions: sc.steps.filter(s => s.question && s.question.choices.some(c => c.correct)).length,
      correct: q && q.choices.some(c => c.correct) ? App.q.picked != null && !!(q.choices[App.q.picked] || {}).correct : null
    });
  }

  /* ---- liens profonds : ?scenario=id | ?md=url | #md=texte-encodé, + &etape=N ; ?scenarios ouvre la bibliothèque */
  const PUBLIC_BASE = 'https://edu-fpar.github.io/contract-lab/';
  function baseUrl() {
    // depuis un fichier local ou un serveur local, on partage l'adresse publique
    const local = location.protocol === 'file:' || /^(localhost|127\.|\[::1\])/.test(location.hostname);
    return local ? PUBLIC_BASE : location.origin + location.pathname;
  }
  function scenarioUrl(base, step) {
    const o = App.origin; if (!o) return null;
    const u = new URL(base);
    if (o.id) u.searchParams.set('scenario', o.id);
    else if (o.url) u.searchParams.set('md', o.url);
    if (step > 0) u.searchParams.set('etape', step + 1);
    if (o.packed) u.hash = 'md=' + o.packed;
    return u.toString();
  }
  function syncUrl() {
    try {
      const here = location.origin + location.pathname;
      const target = App.mode === 'cinema' && App.scenario ? scenarioUrl(location.protocol === 'file:' ? location.href.split(/[?#]/)[0] : here, App.step) : null;
      history.replaceState(null, '', target || location.href.split(/[?#]/)[0]);
    } catch (e) { /* adresse non modifiable (fichier local selon le navigateur) */ }
  }
  /* texte du scénario compressé dans le lien (deflate + base64url), préfixe z ; repli non compressé, préfixe b */
  async function packMd(md) {
    const toB64 = bytes => { let bin = ''; bytes.forEach(b => { bin += String.fromCharCode(b); }); return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''); };
    const raw = new TextEncoder().encode(md);
    if (!window.CompressionStream) return 'b' + toB64(raw);
    const buf = await new Response(new Blob([raw]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer();
    return 'z' + toB64(new Uint8Array(buf));
  }
  async function unpackMd(code) {
    const bin = atob(code.slice(1).replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(bin, c => c.charCodeAt(0));
    if (code[0] === 'b') return new TextDecoder().decode(bytes);
    return await new Response(new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate-raw'))).text();
  }

  async function openShare() {
    if (!App.scenario) { openLibrary(); return; }
    const base = baseUrl(), isLocal = base !== location.origin + location.pathname;
    if (!App.origin) { try { App.origin = { packed: await packMd(App.scenarioSrc) }; } catch (e) { toast('Encodage du scénario impossible dans ce navigateur.'); return; } }
    const lib = new URL(base); lib.searchParams.set('scenarios', '');
    const links = [
      ['Cette étape', `Ouvre « ${esc(App.scenario.title)} » directement à l'étape ${App.step + 1}.`, scenarioUrl(base, App.step)],
      ['Début du scénario', 'Ouvre le scénario à sa première étape.', scenarioUrl(base, 0)],
      ['Bibliothèque', 'Ouvre le choix des scénarios.', lib.toString().replace('scenarios=', 'scenarios')]
    ];
    const long = App.origin.packed && links[0][2].length > 6000;
    const c = App.modal(`<h2>🔗 Partager</h2>
      ${App.origin.packed ? '<p class="small muted">Ce scénario ne fait pas partie de la bibliothèque : son texte est encodé dans le lien lui-même (après le #). Aucun serveur ne le reçoit.</p>' : ''}
      ${long ? '<p class="small" style="color:var(--warn)">⚠ Lien très long : certaines messageries peuvent le couper. Pour un long scénario, publiez plutôt le fichier .md et utilisez ?md=adresse-du-fichier.</p>' : ''}
      ${isLocal ? `<p class="small muted">Liens construits sur l'adresse publique <b>${esc(PUBLIC_BASE)}</b>${App.origin.id ? ' : le scénario doit y avoir été publié' : ''}.</p>` : ''}
      ${links.map(([t, d, u], i) => `<div class="share-row"><div><b>${t}</b><span class="small muted"> — ${d}</span></div><div class="share-line"><input type="text" readonly value="${esc(u)}" id="sh-${i}"><button data-copy="${i}">📋 Copier</button><a class="btnlink" href="${esc(u)}" target="_blank" rel="noopener">↗</a></div></div>`).join('')}`, 'narrow');
    c.addEventListener('click', ev => { const b = ev.target.closest('[data-copy]'); if (b) copyText($('#sh-' + b.dataset.copy, c).value); });
    $$('input[readonly]', c).forEach(i => i.addEventListener('focus', () => i.select()));
  }
  $('#btn-share').onclick = openShare;

  /* ---- export SCORM : l'atelier et le scénario dans un paquet pour Moodle ou un autre LMS (js/scorm.js) */
  function openScorm() {
    if (!App.scenario) { openLibrary(); return; }
    const sc = App.scenario, nq = sc.steps.filter(s => s.question && s.question.choices.some(c => c.correct)).length;
    const c = App.modal(`<h2>📦 Exporter en SCORM</h2>
      <p class="small muted">Un fichier .zip à déposer dans Moodle (activité « Paquetage SCORM ») ou dans une autre plateforme d'apprentissage. Il contient l'atelier et ce scénario : les élèves le suivent seuls, en pas à pas, sans connexion à ce site.</p>
      <label class="field"><span>Titre dans la plateforme</span><input type="text" id="sc-title" value="${esc(sc.title)}"></label>
      <label class="field"><span>Version</span><select id="sc-ver"><option value="1.2">SCORM 1.2 (recommandé, Moodle)</option><option value="2004">SCORM 2004 4ᵉ édition</option></select></label>
      ${nq ? `<label class="chk"><input type="checkbox" id="sc-score" checked> Transmettre une note sur 100 : ${nq > 1 ? `part des ${nq} questions où l'élève choisit` : "100 si l'élève choisit"} une bonne carte avant de révéler la réponse</label>` : ''}
      <ul class="small muted">
        <li>Activité <b>terminée</b> quand l'élève atteint la dernière étape (${sc.steps.length}).</li>
        <li>En revenant, l'élève reprend à l'étape où il s'était arrêté.</li>
      </ul>
      <div class="btns"><button class="primary" id="sc-ok">⬇ Télécharger le paquet SCORM</button></div>`, 'narrow');
    $('#sc-ok', c).onclick = async () => {
      const b = $('#sc-ok', c), title = $('#sc-title', c).value.trim() || sc.title, version = $('#sc-ver', c).value;
      b.disabled = true; b.textContent = '⏳ Préparation…';
      try {
        const blob = await P.scormPackage({ md: App.scenarioSrc, title, version, score: !!($('#sc-score', c) || {}).checked, publicBase: PUBLIC_BASE });
        const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
        a.download = 'scorm-' + (P.slug(title).toLowerCase().replace(/_/g, '-') || 'scenario') + '.zip';
        document.body.appendChild(a); a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 800);
        App.closeModal(); toast('📦 Paquet SCORM téléchargé');
      } catch (e) {
        b.disabled = false; b.textContent = '⬇ Télécharger le paquet SCORM';
        toast('⚠ Paquet impossible à construire : fichiers de l’atelier inaccessibles (ouvrez l’atelier depuis un serveur web ou en ligne).', 6000);
      }
    };
  }
  $('#btn-scorm').onclick = openScorm;

  const curQuestion = () => App.mode === 'cinema' && App.scenario && App.scenario.steps[App.step] ? App.scenario.steps[App.step].question : null;

  /** Révèle la réponse de l'étape question : cartes, explication et commandes « réponse » du canevas. */
  App.reveal = function () {
    const q = curQuestion();
    if (!q || App.q.revealed) return;
    App.q.revealed = true;
    const sel = App.sel;
    App.state = P.buildState(App.scenario, App.step, null, true);
    App.sel = App.state.view.select ? { kind: 'node', id: App.state.view.select } : sel;
    renderQSheet();
    App.commit();
    App.fit(true);
    updatePlayer();
    App.schedule();
    notifyHost('reveal');
  };

  /** Contenu de la question : en feuille sur le canevas (écran large) ou dans le texte (téléphone). */
  function qsheetHTML(q, inline) {
    const Q = App.q, inl = t => P.md(t, { nameOf });
    let h = `<div class="qs-head" data-qs="toggle" title="Réduire / agrandir"><span class="qs-badge">❓ Question</span><div class="qs-text">${inl(q.text)}</div><div class="qs-actions">`;
    h += Q.revealed ? '<span class="qs-done">✔ Réponse révélée</span>' : '<button class="primary" data-qs="reveal" title="Révéler la réponse (→)">💡 Révéler la réponse</button>';
    h += `<button class="qs-min" data-qs="toggle" title="${Q.collapsed ? 'Agrandir' : 'Réduire'}">${Q.collapsed ? '▴' : '▾'}</button></div></div><div class="qs-body">`;
    if (q.choices.length) {
      h += '<div class="qs-grid">' + q.choices.map((c, i) => {
        const cls = ['qcard', Q.picked === i ? 'picked' : '', Q.revealed ? (c.correct ? 'correct' : 'wrong') : '', Q.revealed && Q.flipped[i] ? 'flipped' : ''].join(' ');
        const pickTag = Q.picked === i ? '<span class="qc-pick">👥 choix de la salle</span>' : '';
        return `<div class="${cls}" data-card="${i}" role="button" tabindex="0"><div class="qc-inner">
          <div class="qc-face qc-front"><span class="qc-letter">${'ABCDEFGHIJ'[i] || i + 1}</span><div class="qc-txt">${inl(c.text)}${pickTag}</div>${Q.revealed ? `<span class="qc-mark">${c.correct ? '✓' : '✗'}</span>` : ''}</div>
          <div class="qc-face qc-back"><div class="qc-verdict">${c.correct ? '✓ Bonne réponse' : '✗ Mauvaise réponse'}</div><div class="qc-txt">${c.explain ? inl(c.explain) : ''}</div></div>
        </div></div>`;
      }).join('') + '</div>';
      h += `<p class="qs-hint">${Q.revealed ? (q.choices.some(c => c.explain) ? 'Cliquez sur une carte (ou tapez son numéro) pour la retourner et lire son explication.' : 'Cliquez sur une carte pour la retourner.') : 'Cliquez sur la réponse choisie par la salle (ou tapez son numéro), puis révélez la réponse (→).'}${inline ? '' : ' Le canevas reste déplaçable au-dessus.'}</p>`;
    } else {
      h += `<p class="qs-open">${Q.revealed ? (inline ? 'La réponse est affichée ci-dessous.' : 'La réponse est affichée dans le panneau de droite.') : 'Question ouverte : échangez avec la salle, puis révélez la réponse (→).'}</p>`;
    }
    return h + '</div>';
  }
  function renderQSheet() {
    const el = $('#qsheet'), q = curQuestion();
    // sur téléphone, la question s'affiche dans le texte (voir renderCommentary)
    if (!q || isMobile()) { el.hidden = true; stage.style.setProperty('--sheet-h', '0px'); return; }
    el.innerHTML = qsheetHTML(q, false);
    el.hidden = false;
    el.classList.toggle('collapsed', App.q.collapsed);
    stage.style.setProperty('--sheet-h', el.offsetHeight + 'px');
  }

  $('#qsheet').addEventListener('click', ev => {
    const a = ev.target.closest('[data-qs]');
    if (a && a.dataset.qs === 'reveal') { ev.stopPropagation(); App.reveal(); return; }
    if (a && a.dataset.qs === 'toggle') { App.q.collapsed = !App.q.collapsed; renderQSheet(); App.fit(true); return; }
    const c = ev.target.closest('[data-card]');
    if (c) clickCard(+c.dataset.card);
  });
  function clickCard(i) {
    const q = curQuestion(); if (!q || !q.choices[i]) return;
    if (App.q.revealed) {
      App.q.flipped[i] = !App.q.flipped[i];
      $$(`[data-card="${i}"]`).forEach(el => el.classList.toggle('flipped', App.q.flipped[i]));
    } else { App.q.picked = App.q.picked === i ? null : i; refreshQuestion(); }
  }
  function refreshQuestion() {
    renderQSheet();
    if (isMobile() && App.mode === 'cinema') { const y = $('#side').scrollTop; App.renderCommentary(); $('#side').scrollTop = y; }
  }

  App.schedule = function () {
    clearTimeout(App.timer);
    const bar = $('#pl-timer i');
    bar.style.transition = 'none'; bar.style.width = '0%';
    if (!(App.playing && App.mode === 'cinema' && App.playMode === 'continu' && App.scenario)) return;
    // la lecture continue attend que l'enseignant révèle la réponse d'une question
    if (curQuestion() && !App.q.revealed) return;
    const d = P.stepDuration(App.scenario.steps[App.step], App.q.revealed) / App.speed;
    void bar.offsetWidth;
    bar.style.transition = `width ${d}ms linear`; bar.style.width = '100%';
    App.timer = setTimeout(() => {
      if (App.step < App.scenario.steps.length - 1) App.goStep(App.step + 1);
      else { App.playing = false; updatePlayer(); App.schedule(); }
    }, d);
  };
  App.pause = function () { App.playing = false; clearTimeout(App.timer); updatePlayer(); const bar = $('#pl-timer i'); bar.style.transition = 'none'; bar.style.width = '0%'; };
  function togglePlay() {
    if (!App.scenario) return;
    if (App.playing) { App.pause(); return; }
    App.playing = true;
    if (App.step >= App.scenario.steps.length - 1) App.goStep(0); else { updatePlayer(); App.schedule(); }
  }
  function next() {
    if (curQuestion() && !App.q.revealed) { App.reveal(); return; }   // 1er appui : la réponse ; 2e : la suite
    if (App.scenario && App.step < App.scenario.steps.length - 1) App.goStep(App.step + 1);
  }
  function prev() { if (App.scenario && App.step > 0) App.goStep(App.step - 1); }

  function updatePlayer() {
    const sc = App.scenario, cont = App.playMode === 'continu';
    $('#pl-play').hidden = !cont;
    $('#pl-play').textContent = App.playing ? '⏸ Pause' : '▶ Lecture';
    $('#pl-next').className = cont ? '' : 'primary';
    $('#pl-timer').style.visibility = cont ? 'visible' : 'hidden';
    $('.speed').style.display = cont ? '' : 'none';
    if (!sc) { $('#pl-count').textContent = '–'; $('#pl-dots').innerHTML = ''; return; }
    $('#pl-count').textContent = `${App.step + 1} / ${sc.steps.length}`;
    $('#pl-dots').innerHTML = sc.steps.map((s, i) => `<button data-go="${i}" class="${i === App.step ? 'cur' : i < App.step ? 'done' : ''}" title="${esc((i + 1) + '. ' + s.title)}"></button>`).join('');
    $('#pl-reset').hidden = !Object.keys(App.cinePos).length && !Object.keys(App.noteOff).length;
    $('#pl-prev').disabled = App.step <= 0;
    const pending = !!curQuestion() && !App.q.revealed;
    $('#pl-next').textContent = pending ? (isMobile() ? '💡 Réponse' : '💡 Réponse ▶') : (isMobile() ? 'Suivant' : 'Suivant ▶');
    $('#pl-next').title = pending ? 'Révéler la réponse (→)' : 'Étape suivante (→)';
    $('#pl-next').disabled = !pending && App.step >= sc.steps.length - 1;
  }
  $('#pl-first').onclick = () => App.goStep(0);
  $('#pl-prev').onclick = prev;
  $('#pl-next').onclick = next;
  $('#pl-play').onclick = togglePlay;
  $('#pl-reset').onclick = () => { App.cinePos = {}; App.noteOff = {}; App.goStep(App.step); };
  $('#pl-dots').addEventListener('click', ev => { const b = ev.target.closest('[data-go]'); if (b) App.goStep(+b.dataset.go); });
  $('#pl-mode').onchange = ev => {
    App.playMode = ev.target.value;
    try { localStorage.setItem('contract-lab.playmode', App.playMode); } catch (e) { /* */ }
    if (App.playMode === 'pas') App.pause(); else { App.playing = true; updatePlayer(); App.schedule(); }
  };
  $('#pl-speed').oninput = ev => {
    App.speed = parseFloat(ev.target.value);
    $('#pl-speed-v').textContent = App.speed.toLocaleString('fr-FR') + '×';
  };
  $('#pl-speed').onchange = () => { if (App.playing) App.schedule(); };

  function dossierSummary(pv) {
    const an = App.an, rel = Array.from(an.related(pv)).filter(c => c !== pv && an.info[c].status !== 'neutral');
    if (!rel.length) return '';
    return `<div class="auto"><div class="auto-h">🔎 Dossier : ${iconOf(pv)} ${esc(nameOf(pv))}</div><table class="mini"><tr><th>Élément</th><th>Verdict</th></tr>${rel.map(c => `<tr><td><span class="ref" data-ref="${esc(c)}">${iconOf(c)} ${esc(nameOf(c))}</span></td><td style="color:${P.STATUS[an.info[c].status].color}">${P.STATUS[an.info[c].status].icon} ${esc(an.info[c].verdict)}</td></tr>`).join('')}</table></div>`;
  }

  App.renderCommentary = function () {
    const el = $('#commentary'), sc = App.scenario;
    if (!sc) {
      el.innerHTML = '<div class="empty"><h2>🎬 Mode cinéma</h2><p>Un scénario déroule, étape par étape, la construction d\'un contrat, d\'une rupture ou d\'un litige, avec ses commentaires et ses questions.</p><button class="primary" data-act="lib">📚 Choisir un scénario</button></div>';
      return;
    }
    const s = sc.steps[App.step], st = App.state;
    let h = `<div class="sc-head"><div class="sc-title">${esc(sc.title)}</div><div class="sc-no">Étape ${App.step + 1} / ${sc.steps.length}</div></div>`;
    h += `<h2 class="step-title">${s.question ? '❓ ' : ''}${esc(s.title)}</h2><div class="md">${P.md(s.md, { nameOf })}</div>`;
    if (s.question) {
      const q = s.question, good = q.choices.map((c, i) => c.correct ? `<b>${'ABCDEFGHIJ'[i] || i + 1}</b> — ${P.md(c.text, { nameOf }).replace(/^<p>|<\/p>$/g, '')}` : null).filter(Boolean);
      if (isMobile()) h += `<div class="qinline">${qsheetHTML(q, true)}</div>`;
      if (!App.q.revealed) { if (!isMobile()) h += '<div class="answer-wait">La réponse s\'affichera ici. <button class="small" data-act="reveal">💡 Révéler la réponse</button></div>'; }
      else if (good.length || q.answerMd) {
        h += `<details class="answer" open><summary>💡 Réponse</summary>${good.length ? `<p class="good">${good.length > 1 ? 'Bonnes réponses' : 'Bonne réponse'} : ${good.join(' ; ')}</p>` : ''}<div class="md">${P.md(q.answerMd, { nameOf })}</div></details>`;
      }
    }
    const target = App.sel && App.sel.kind === 'node' ? App.sel.id : null;
    if (target && st.entities[target]) h += `<div class="auto"><div class="auto-h">🔍 ${iconOf(target)} ${esc(nameOf(target))}<button data-act="unsel" title="Fermer">×</button></div>${App.analysisHTML(target, false)}</div>`;
    else if (st.view.perspective && st.entities[st.view.perspective]) h += dossierSummary(st.view.perspective);
    h += `<details class="plan"${App.planOpen ? ' open' : ''}><summary>Plan du scénario</summary><ol>${sc.steps.map((x, i) => `<li class="${i === App.step ? 'cur' : ''}${i < App.step ? ' done' : ''}"><a data-go="${i}">${esc(x.title)}</a></li>`).join('')}</ol></details>`;
    if (sc.errors.length) h += `<details class="errs"><summary>⚠ ${sc.errors.length} avertissement(s) dans le scénario</summary><ul>${sc.errors.map(e => `<li>Étape ${(e.step || 0) + 1}, ligne ${e.line} : <code>${esc(e.text)}</code> — ${esc(e.msg)}</li>`).join('')}</ul></details>`;
    h += '<p class="hint">Cliquez sur une carte du canevas pour afficher ses conditions de validité. Glissez une carte ou une bulle pour la déplacer.</p>';
    el.innerHTML = h;
    const d = $('details.plan', el); if (d) d.addEventListener('toggle', () => { App.planOpen = d.open; });
  };
  const com = $('#commentary');
  com.addEventListener('click', ev => {
    const qs = ev.target.closest('[data-qs="reveal"]'); if (qs) { App.reveal(); return; }
    const card = ev.target.closest('[data-card]'); if (card) { clickCard(+card.dataset.card); return; }
    const g = ev.target.closest('[data-go]'); if (g) { App.goStep(+g.dataset.go); return; }
    const r = ev.target.closest('.ref'); if (r) { const id = P.resolve(App.state, { v: r.dataset.ref }); if (id) App.select({ kind: 'node', id }); return; }
    const b = ev.target.closest('[data-act]'); if (!b) return;
    if (b.dataset.act === 'reveal') App.reveal();
    else if (b.dataset.act === 'lib') openLibrary();
    else if (b.dataset.act === 'unsel') App.select(null);
    else if (b.dataset.act === 'sel') App.select({ kind: 'node', id: b.dataset.id });
  });
  com.addEventListener('mouseover', ev => {
    const r = ev.target.closest('.ref');
    const id = r ? P.resolve(App.state, { v: r.dataset.ref }) : null;
    if (id !== App.hoverRef) { App.hoverRef = id; requestRender(); }
  });

  /* ============================================================ studio */
  function updateStudio() {
    const el = $('#studio');
    el.hidden = !(App.studio.open && App.mode === 'libre');
    $('#btn-studio').classList.toggle('on', App.studio.open);
    if (el.hidden) return;
    const n = App.studio.steps.length;
    el.innerHTML = `<b>🎞 Studio</b><span>${n} étape${n > 1 ? 's' : ''} capturée${n > 1 ? 's' : ''}</span>
      <button class="primary" data-st="cap">📸 Capturer l'étape</button>
      <button data-st="prev"${n ? '' : ' disabled'}>▶ Prévisualiser</button>
      <button data-st="exp">⬇ Exporter .md</button>
      <button data-st="pop"${n ? '' : ' disabled'} title="Retirer la dernière étape">↶</button>
      <button data-st="clr"${n ? '' : ' disabled'}>Vider</button>
      <button data-st="close" title="Fermer le studio">×</button>`;
  }
  function studioMd() {
    const steps = App.studio.steps.length ? App.studio.steps : [{ title: 'Structure', comment: '', snap: P.clone(App.state) }];
    return P.studioMarkdown(App.studio.title, steps);
  }
  $('#studio').addEventListener('click', ev => {
    const b = ev.target.closest('[data-st]'); if (!b) return;
    const S = App.studio;
    switch (b.dataset.st) {
      case 'cap': {
        const selNode = App.sel && App.sel.kind === 'node' ? App.sel.id : null;
        const c = App.modal(`<h2>📸 Capturer l'étape ${S.steps.length + 1}</h2>
          ${S.steps.length ? '' : `<label class="field"><span>Titre du scénario</span><input type="text" id="sd-title" value="${esc(S.title)}"></label>`}
          <label class="field"><span>Titre de l'étape</span><input type="text" id="sd-step" value="${S.steps.length + 1}. "></label>
          <label class="field"><span>Commentaire (markdown : **gras**, listes « - », citations « > »…)</span><textarea id="sd-com" placeholder="Expliquez ce que montre cette étape…"></textarea></label>
          ${selNode ? `<label class="chk"><input type="checkbox" id="sd-focus" checked> mettre en évidence « ${esc(nameOf(selNode))} »</label>` : ''}
          <div class="btns"><button class="primary" id="sd-ok">Capturer</button></div>`, 'narrow');
        $('#sd-step', c).focus();
        $('#sd-ok', c).onclick = () => {
          const snap = P.clone(App.state);
          snap.view.focus = selNode && $('#sd-focus', c) && $('#sd-focus', c).checked ? [selNode] : [];
          snap.view.notes = {}; snap.view.select = null;
          if ($('#sd-title', c)) S.title = $('#sd-title', c).value.trim() || S.title;
          S.steps.push({ title: $('#sd-step', c).value.trim(), comment: $('#sd-com', c).value, snap });
          App.closeModal(); updateStudio(); toast(`📸 Étape ${S.steps.length} capturée`);
        };
        break;
      }
      case 'prev': App.loadScenario(studioMd()); break;
      case 'exp': {
        const md = studioMd();
        const c = App.modal(`<h2>⬇ Scénario généré</h2><textarea class="big" id="sd-md" spellcheck="false"></textarea>
          <div class="btns"><button class="primary" id="sd-dl">⬇ Télécharger .md</button><button id="sd-cp">📋 Copier</button><button id="sd-play">▶ Lire en mode cinéma</button></div>`);
        $('#sd-md', c).value = md;
        $('#sd-dl', c).onclick = () => download(P.slug(S.title).toLowerCase() + '.md', $('#sd-md').value);
        $('#sd-cp', c).onclick = () => copyText($('#sd-md').value);
        $('#sd-play', c).onclick = () => { const v = $('#sd-md').value; App.closeModal(); App.loadScenario(v); };
        break;
      }
      case 'pop': S.steps.pop(); updateStudio(); break;
      case 'clr': if (confirm('Vider toutes les étapes capturées ?')) { S.steps = []; updateStudio(); } break;
      case 'close': S.open = false; updateStudio(); break;
    }
  });

  /* ============================================================ modes */
  function setMode(m, silent) {
    if (m === App.mode) return;
    endEdit();
    if (m === 'cinema') {
      App.libreState = App.state;
      App.mode = 'cinema';
      document.body.classList.remove('libre'); document.body.classList.add('cinema');
      App.disp = {}; App.ldisp = {};
      if (App.scenario && !silent) { App.step = -1; App.goStep(Math.max(0, App._lastStep || 0)); }
      else if (!silent) { App.state = P.newState(); App.sel = null; App.commit(); openLibrary(); }
    } else {
      App._lastStep = App.step;
      App.pause();
      App.mode = 'libre';
      document.body.classList.remove('cinema'); document.body.classList.add('libre');
      App.state = App.libreState || P.newState(); App.sel = null; App.disp = {}; App.ldisp = {};
      App.commit({ animate: false }); App.fit(false);
    }
    $$('.modes button').forEach(b => b.classList.toggle('active', b.dataset.mode === App.mode));
    $('#actions-libre').hidden = App.mode !== 'libre';
    $('#actions-cinema').hidden = App.mode !== 'cinema';
    $('#player').hidden = App.mode !== 'cinema';
    $('#inspector').hidden = App.mode !== 'libre';
    $('#commentary').hidden = App.mode !== 'cinema';
    updateStudio(); updatePlayer(); renderQSheet();
    requestAnimationFrame(() => { requestRender(); });
  }
  $$('.modes button').forEach(b => { b.onclick = () => setMode(b.dataset.mode); });

  /* ============================================================ barre d'actions */
  $('#btn-new').onclick = () => {
    if (Object.keys(App.state.entities).length && !confirm('Vider le canevas ? (Ctrl+Z pour annuler)')) return;
    pushUndo(); App.state = P.newState(); App.sel = null; App.commit(); App.fit(true);
  };
  $('#btn-undo').onclick = undo;
  $('#btn-redo').onclick = redo;
  $('#btn-layout').onclick = () => {
    pushUndo();
    const st = App.state;
    Object.values(st.entities).forEach(e => { e.fixed = false; });
    P.layout(st);
    Object.values(st.entities).forEach(e => { e.fixed = true; });
    App.commit(); App.fit(true);
  };
  $('#btn-open').onclick = () => $('#file-input').click();
  $('#btn-save').onclick = () => download('contrat-contract-lab.json', JSON.stringify({ format: 'contract-lab', version: 1, state: App.state }, null, 2), 'application/json');
  $('#btn-studio').onclick = () => { App.studio.open = !App.studio.open; updateStudio(); };
  $('#btn-library').onclick = openLibrary;
  $('#btn-edit-md').onclick = () => { if (App.scenario) openEditor(App.scenarioSrc, true); else openLibrary(); };
  $('#btn-to-libre').onclick = () => {
    const lib = App.libreState;
    if (lib && Object.keys(lib.entities).length && !confirm('Remplacer le canevas du mode libre par l\'état affiché ? (Ctrl+Z pour annuler en mode libre)')) return;
    const st = P.clone(App.state);
    Object.values(st.entities).forEach(e => { e.fixed = true; });
    st.view.focus = []; st.view.notes = {}; st.view.select = null;
    const prevLibre = App.libreState;
    setMode('libre');
    if (prevLibre) App.undoStack.push(JSON.stringify(prevLibre));
    App.state = st; App.commit({ animate: false }); App.fit(false);
    toast('✏️ Vous pouvez maintenant modifier librement ce schéma.');
  };
  $('#btn-help').onclick = () => openHelp('all');

  /* ---- mode jour / nuit (le thème initial est posé par le script en tête d'index.html) */
  function applyTheme(t, remember) {
    document.documentElement.setAttribute('data-theme', t);
    const b = $('#btn-theme');
    b.textContent = t === 'dark' ? '☀️' : '🌙';
    b.title = t === 'dark' ? 'Passer en mode jour' : 'Passer en mode nuit';
    if (remember) { try { localStorage.setItem('contract-lab.theme', t); } catch (e) { /* */ } }
    requestRender();
  }
  applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light', false);
  $('#btn-theme').onclick = () => applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
  if (window.matchMedia) {
    const mq = matchMedia('(prefers-color-scheme: dark)');
    const follow = e => { let saved = null; try { saved = localStorage.getItem('contract-lab.theme'); } catch (x) { /* */ } if (!saved) applyTheme(e.matches ? 'dark' : 'light', false); };
    if (mq.addEventListener) mq.addEventListener('change', follow);
  }
  $('#opt-verif').onchange = ev => {
    if (App.mode === 'libre') pushUndo();
    App.state.options.verif = ev.target.checked; App.commit();
  };

  document.addEventListener('keydown', ev => {
    if (ev.target.matches && ev.target.matches('input, textarea, select')) return;
    if (!$('#modal').hidden) { if (ev.key === 'Escape') App.closeModal(); return; }
    const ctrl = ev.ctrlKey || ev.metaKey;
    if (App.mode === 'cinema') {
      if (ev.key === 'ArrowRight' || ev.key === 'PageDown') { next(); ev.preventDefault(); }
      else if (ev.key === 'ArrowLeft' || ev.key === 'PageUp') { prev(); ev.preventDefault(); }
      else if (ev.key === ' ') { if (App.playMode === 'continu') togglePlay(); else next(); ev.preventDefault(); }
      else if (/^[1-9]$/.test(ev.key) && curQuestion()) clickCard(+ev.key - 1);
      else if (ev.key === 'Home') App.goStep(0);
      else if (ev.key === 'End' && App.scenario) App.goStep(App.scenario.steps.length - 1);
    } else {
      if (ev.key === 'Delete' || ev.key === 'Backspace') { deleteSel(); ev.preventDefault(); }
      else if (ctrl && ev.key.toLowerCase() === 'z' && !ev.shiftKey) { undo(); ev.preventDefault(); }
      else if (ctrl && (ev.key.toLowerCase() === 'y' || (ev.key.toLowerCase() === 'z' && ev.shiftKey))) { redo(); ev.preventDefault(); }
    }
    if (ev.key === 'f' || ev.key === 'F') App.fit(true);
    else if (ev.key === 'Escape') App.select(null);
  });

  /* ============================================================ téléphone */
  // vue « split » (schéma en haut, explications en bas), « schema » ou « texte » seuls
  function setMobileView(v) {
    App.mview = v;
    document.body.classList.toggle('m-schema', v === 'schema');
    document.body.classList.toggle('m-texte', v === 'texte');
    $$('#pl-view button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  }
  $('#pl-view').addEventListener('click', ev => { const b = ev.target.closest('[data-v]'); if (b) setMobileView(b.dataset.v); });
  setMobileView('split');

  // balayer horizontalement les explications pour changer d'étape
  let swipe = null;
  $('#side').addEventListener('touchstart', ev => {
    if (App.mode !== 'cinema' || ev.touches.length !== 1) { swipe = null; return; }
    swipe = { x: ev.touches[0].clientX, y: ev.touches[0].clientY, t: Date.now() };
  }, { passive: true });
  $('#side').addEventListener('touchend', ev => {
    if (!swipe) return;
    const t = ev.changedTouches[0], dx = t.clientX - swipe.x, dy = t.clientY - swipe.y;
    const ok = Math.abs(dx) > 60 && Math.abs(dx) > 1.6 * Math.abs(dy) && Date.now() - swipe.t < 800;
    swipe = null;
    if (ok) { if (dx < 0) next(); else prev(); }
  }, { passive: true });

  // passage écran large ↔ téléphone (rotation, fenêtre redimensionnée)
  if (mqMobile && mqMobile.addEventListener) mqMobile.addEventListener('change', () => {
    if (App.mode !== 'cinema') return;
    renderQSheet(); App.renderCommentary(); App.fit(false);
  });

  /* ============================================================ démarrage */
  function init() {
    buildPalette();
    buildLegend();
    try {
      const pm = localStorage.getItem('contract-lab.playmode');
      if (pm) { App.playMode = pm; $('#pl-mode').value = pm; }
      const s = localStorage.getItem(LS_KEY);
      if (s) App.state = sanitize(JSON.parse(s));
    } catch (e) { /* stockage indisponible */ }
    App.commit({ animate: false });
    updatePlayer();
    requestAnimationFrame(() => App.fit(false));
    if (EMBED) {   // paquet SCORM : uniquement ce scénario, en mode cinéma
      App.loadScenario(EMBED.md, null, host ? host.startStep : 0);
      return;
    }
    const q = new URLSearchParams(location.search);
    const sid = q.get('scenario'), url = q.get('md');
    const step = Math.max(0, (parseInt(q.get('etape') || q.get('step'), 10) || 1) - 1);
    const hash = (location.hash.match(/(?:^#|&)md=([A-Za-z0-9_-]+)/) || [])[1];
    if (sid) {
      const s = P.LIBRARY.find(x => x.id === sid);
      if (s) App.loadScenario(s.md, { id: sid }, step); else { toast('Scénario introuvable : ' + esc(sid)); setMode('cinema'); }
    } else if (hash) {
      unpackMd(hash).then(t => App.loadScenario(t, { packed: hash }, step))
        .catch(() => { toast('⚠ Lien de scénario illisible (incomplet ?)'); setMode('cinema'); });
    } else if (url) {
      fetch(url).then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(t => App.loadScenario(t, { url }, step))
        .catch(() => toast('⚠ Impossible de charger ' + esc(url)));
    } else if (q.has('scenarios') || q.has('bibliotheque') || isMobile()) {
      setMode('cinema');   // ouvre la bibliothèque ; sur téléphone, le mode cinéma est le point d'entrée
    }
  }
  init();
})();
