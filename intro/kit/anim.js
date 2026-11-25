/* anim-kit – moteur d'animations HTML/CSS pilotées par le temps.
 *
 * Principe : l'image ne dépend que de t. Chaque élément animé déclare son créneau dans le HTML :
 *   data-in="fade-up 0.4 0.6"     effet d'entrée, début (s, depuis le début de la scène), durée (s) [, courbe]
 *   data-out="fade 3.6 0.3"       effet de sortie (même syntaxe)
 *   data-stagger="1.2 0.15"       sur un parent : ses enfants data-in sans début arrivent à 1.2, 1.35, 1.5…
 *   data-type="0.6 1.8"           texte tapé lettre par lettre (data-code="sql" : coloration)
 *   data-count="0.3 1.2"          nombre qui défile jusqu'à la valeur écrite dans l'élément
 *   .k-pointer data-moves="#run 2.8, #res 4.0" data-clicks="2.9"   pointeur de souris qui suit la mise en page
 *   .k-focus data-target="#res"   projecteur : entoure un élément et assombrit le reste
 * Le moteur calcule pour chaque élément une progression --p (0 → 1) ; les effets sont de simples
 * classes CSS (anim.css) qui lisent --p. Les formats 16x9, 9x16 et 1x1 changent la mise en page
 * par CSS : le contenu et le minutage ne bougent pas.
 *
 * Textes : <script type="application/json" id="anim-texts">{"fr":{…},"en":{…}}</script>, data-t="clé".
 * Scènes : <section class="scene" data-dur="4" data-chapter="clé" data-say="clé"> (data-say = sous-titre lu).
 * Adresse : ?format=9x16 &lang=en &t=3.2 (image fixe) &render=1 (sans lecteur, pour l'export et la planche).
 * Export : window.__ANIM = { duration, size(), scenes, captions(lang), seek(t), setFormat(f), setLang(l) }.
 */
(function () {
  "use strict";

  const FORMATS = { "16x9": [1920, 1080], "9x16": [1080, 1920], "1x1": [1080, 1080] };
  const FORMAT_LABEL = { "16x9": "16:9", "9x16": "9:16", "1x1": "1:1" };
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const EASE = {
    linear: (x) => x,
    in: (x) => x * x * x,
    out: (x) => 1 - Math.pow(1 - x, 3),                                        // easeOutCubic
    inout: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),  // easeInOutCubic
    back: (x) => { if (x <= 0) return 0; if (x >= 1) return 1; const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); },
  };
  // courbe par défaut de chaque effet ; « press » fait un aller-retour (bouton enfoncé puis relâché)
  const FX = { fade: "out", "fade-up": "out", "fade-down": "out", "fade-left": "out", "fade-right": "out", pop: "back", zoom: "out", blur: "out",
    wipe: "inout", "wipe-up": "inout", draw: "inout", grow: "out", mark: "inout", strike: "inout", press: "linear" };
  const SHAPE = { press: (p) => Math.sin(Math.PI * p) };
  const KW = new Set("SELECT DISTINCT FROM WHERE AND OR NOT IN IS NULL GROUP BY HAVING ORDER ASC DESC INNER LEFT JOIN ON AS LIKE COUNT SUM AVG MIN MAX INSERT INTO VALUES UPDATE SET DELETE".split(" "));
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  function parseFx(s, fallbackDur) {
    if (!s) return null;
    const p = s.trim().split(/\s+/), fx = p[0];
    const nums = p.slice(1).filter((x) => /^[-+]?\d*\.?\d+$/.test(x)).map(Number);
    const ease = p.slice(1).find((x) => EASE[x]);
    return { fx, start: nums.length ? nums[0] : null, dur: nums.length > 1 ? nums[1] : fx === "press" ? 0.3 : fallbackDur || 0.6, ease: ease || FX[fx] || "out" };
  }
  function parseSpan(s) { const n = String(s || "").trim().split(/\s+/).map(Number); return { start: n[0] || 0, dur: n.length > 1 ? n[1] : 1 }; }
  function highlight(s, lang) {
    if (lang !== "sql") return esc(s);
    return s.replace(/'[^'\n]*'?|[A-Za-z_][A-Za-z0-9_]*|\d+(?:\.\d+)?|[^A-Za-z_\d']+/g, (w) => {
      if (w[0] === "'") return `<span class="tk-s">${esc(w)}</span>`;
      if (/^[A-Za-z]/.test(w) && KW.has(w.toUpperCase())) return `<span class="tk-k">${esc(w)}</span>`;
      if (/^\d/.test(w)) return `<span class="tk-n">${esc(w)}</span>`;
      return esc(w);
    });
  }

  function boot(root) {
    const params = new URLSearchParams(location.search);
    const RENDER = params.get("render") === "1";
    const RM = !!(window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    let texts = {};
    try { texts = JSON.parse((document.getElementById("anim-texts") || {}).textContent || "{}"); } catch (e) { console.error("anim-texts : JSON invalide", e); }
    const LANGS = Object.keys(texts).length ? Object.keys(texts) : ["fr"];
    const KEY = "anim-kit:lang";
    const pickLang = () => {
      const u = params.get("lang"); if (LANGS.includes(u)) return u;
      try { const s = localStorage.getItem(KEY); if (LANGS.includes(s)) return s; } catch (e) { /* rien */ }
      const n = (navigator.language || "").slice(0, 2); return LANGS.includes(n) ? n : LANGS[0];
    };
    const S = { lang: pickLang(), format: FORMATS[params.get("format")] ? params.get("format") : FORMATS[root.dataset.format] ? root.dataset.format : "16x9",
      t: 0, playing: false, last: 0, raf: 0, voice: false, cap: -2, dbg: false };   // cap : sous-titre affiché (-1 aucun, -2 à recalculer)
    const tr = (k) => { const d = texts[S.lang] || {}; return d[k] !== undefined ? d[k] : (texts[LANGS[0]] || {})[k] !== undefined ? texts[LANGS[0]][k] : k; };
    const UI = { fr: { play: "Lecture", pause: "Pause", voice: "Voix", backstage: "Coulisses", replay: "Revoir", format: "Format",
      hint: "Chaque ligne est un élément animé : son créneau et sa progression. Les éléments animés sont entourés en pointillés. En pause : , et . image par image, ← → 1 s, F format, L langue." },
      en: { play: "Play", pause: "Pause", voice: "Voice", backstage: "Backstage", replay: "Watch again", format: "Format",
      hint: "Each row is an animated element: its time slot and progress. Animated elements are outlined. While paused: , and . frame by frame, ← → 1 s, F format, L language." },
      es: { play: "Reproducir", pause: "Pausa", voice: "Voz", backstage: "Entresijos", replay: "Ver de nuevo", format: "Formato",
      hint: "Cada fila es un elemento animado: su intervalo y su progreso. Los elementos animados aparecen con borde. En pausa: , y . imagen por imagen, ← → 1 s, F formato, L idioma." } };
    const ui = (k) => (UI[S.lang] || UI.en)[k];

    /* ---------- scènes et éléments animés ---------- */
    const scenes = [...root.querySelectorAll(":scope > .scene")];
    let acc = 0;
    const SC = scenes.map((el, i) => { const dur = +el.dataset.dur || 4, s = { el, i, start: acc, dur, end: acc + dur, items: [] }; acc += dur; return s; });
    const DUR = acc;
    for (const s of SC) {
      const els = new Set(s.el.querySelectorAll("[data-in],[data-out],[data-type],[data-count],.k-pointer,.k-focus"));
      for (const el of els) {
        const it = { el, in: parseFx(el.dataset.in), out: parseFx(el.dataset.out, 0.4) };
        if (it.in && it.in.start == null) { // décalage automatique (data-stagger sur un parent)
          const box = el.parentElement.closest("[data-stagger]");
          const [base, step] = box ? box.dataset.stagger.split(/\s+/).map(Number) : [0, 0];
          const peers = box ? [...box.querySelectorAll("[data-in]")].filter((x) => parseFx(x.dataset.in).start == null) : [el];
          it.in.start = (base || 0) + Math.max(0, peers.indexOf(el)) * (step || 0.15);
        }
        if (it.out && it.out.start == null) it.out.start = s.dur - it.out.dur;
        const cls = (it.in || it.out || {}).fx; if (cls) el.classList.add("fx-" + cls);
        if (el.dataset.type) it.type = parseSpan(el.dataset.type);
        if (el.dataset.count) it.count = parseSpan(el.dataset.count);
        if (el.classList.contains("k-pointer")) {
          it.moves = (el.dataset.moves || "").split(",").map((x) => x.trim().split(/\s+/)).filter((x) => x[0]).map(([sel, at]) => ({ sel, at: +at }));
          it.clicks = (el.dataset.clicks || "").split(/[\s,]+/).filter(Boolean).map(Number);
          it.from = (el.dataset.from || "85 92").split(/\s+/).map(Number);
        }
        if (el.classList.contains("k-focus")) it.target = el.dataset.target;
        it.name = el.dataset.name || (el.id ? "#" + el.id : (el.getAttribute("class") || "").split(" ").filter((c) => !c.startsWith("fx-"))[0] || el.tagName.toLowerCase());
        s.items.push(it);
      }
      // sources des textes tapés / comptés (avant traduction)
      s.items.forEach((it) => { if (it.type || it.count) it.src = it.el.dataset.t ? null : it.el.textContent.replace(/^\n/, "").replace(/\s+$/, ""); });
    }

    /* ---------- textes ---------- */
    function applyTexts() {
      document.documentElement.lang = S.lang;
      root.querySelectorAll("[data-t]").forEach((el) => { if (!el.dataset.type && !el.dataset.count) el.textContent = tr(el.dataset.t); });
      root.querySelectorAll("[data-t-html]").forEach((el) => { el.innerHTML = tr(el.dataset.tHtml); });
      for (const s of SC) for (const it of s.items) if (it.type || it.count) { it.full = it.el.dataset.t ? tr(it.el.dataset.t) : it.src; it.last = null; }
      if (root.dataset.title) document.title = tr(root.dataset.title);
    }
    const captions = (lang) => { const keep = S.lang; S.lang = lang || S.lang;
      const out = SC.filter((s) => s.el.dataset.say).map((s) => { const at = (s.el.dataset.sayAt || "").split(/\s+/).map(Number);
        return [s.start + (at[0] || 0.3), s.start + (at.length > 1 ? at[1] : s.dur - 0.3), tr(s.el.dataset.say)]; });
      S.lang = keep; return out; };
    const chapters = () => SC.filter((s) => s.el.dataset.chapter).map((s) => [s.start, tr(s.el.dataset.chapter)]);

    /* ---------- géométrie (pointeur, projecteur) : coordonnées de la scène ---------- */
    let scale = 1;
    function boxOf(sel, scope) { const el = scope.querySelector(sel) || root.querySelector(sel); if (!el) return null;
      const r = el.getBoundingClientRect(), R = root.getBoundingClientRect(); return { x: (r.left - R.left) / scale, y: (r.top - R.top) / scale, w: r.width / scale, h: r.height / scale }; }

    /* ---------- rendu d'un instant ---------- */
    let LOG = null;
    function render(t) {
      const [W, H] = FORMATS[S.format];
      root.style.setProperty("--t", t.toFixed(3));
      LOG = S.dbg ? [] : null;
      for (const s of SC) {
        const last = s.i === SC.length - 1, on = t >= s.start && (t < s.end || (last && t <= s.end + 1e-6));
        s.el.style.display = on ? "" : "none";
        if (!on) continue;
        const k = t - s.start;
        const op = (s.i === 0 ? 1 : clamp(k / 0.4)) * (last ? 1 : 1 - clamp((k - (s.dur - 0.4)) / 0.4));   // fondu enchaîné
        s.el.style.opacity = op.toFixed(3);
        for (const it of s.items) {
          let v = 1, pin = 1, pout = 0;
          if (it.in) { pin = clamp((k - it.in.start) / it.in.dur); v = SHAPE[it.in.fx] ? SHAPE[it.in.fx](pin) : EASE[it.in.ease](pin); }
          if (it.out) { pout = clamp((k - it.out.start) / it.out.dur); v *= 1 - EASE[it.out.ease](pout); }
          if (it.in || it.out) it.el.style.setProperty("--p", v.toFixed(4));
          if (it.type) renderType(it, k);
          if (it.count) renderCount(it, k);
          if (it.moves) renderPointer(it, k, s.el, W, H);
          if (it.target) { const b = boxOf(it.target, s.el), pad = +(it.el.dataset.pad || 14);
            if (b) Object.assign(it.el.style, { left: b.x - pad + "px", top: b.y - pad + "px", width: b.w + 2 * pad + "px", height: b.h + 2 * pad + "px" }); }
          if (LOG) { const a = it.in || it.type || it.count || it.out; const st = a ? (a.start || 0) : 0, du = a ? a.dur : 0;
            LOG.push([it.name + (it.in ? " · " + it.in.fx : it.type ? " · frappe" : it.count ? " · compteur" : ""), s.start + st, s.start + st + du, clamp((k - st) / (du || 1))]); }
        }
      }
      updateChrome(t);
    }
    function renderType(it, k) {
      const full = it.full || "", p = clamp((k - it.type.start) / it.type.dur), n = Math.round(full.length * p);
      const typing = p > 0 && (p < 1 || k - it.type.start - it.type.dur < 0.8);
      const caret = typing && Math.floor(k * 2.4) % 2 === 0 ? '<span class="k-caret"></span>' : "";
      const html = highlight(full.slice(0, n), it.el.dataset.code) + caret;
      if (html !== it.last) { it.el.innerHTML = html || "&#8203;"; it.last = html; }
    }
    function renderCount(it, k) {
      const m = /^(\D*)([\d\s.,  ]+)(.*)$/.exec(it.full || ""); if (!m) { it.el.textContent = it.full; return; }
      const target = +m[2].replace(/[\s.,  ]/g, ""), p = EASE.out(clamp((k - it.count.start) / it.count.dur));
      const txt = m[1] + Math.round(target * p).toLocaleString(S.lang) + m[3]; if (txt !== it.last) { it.el.textContent = txt; it.last = txt; }
    }
    function renderPointer(it, k, scope, W, H) {
      let pos = [it.from[0] / 100 * W, it.from[1] / 100 * H], arrived = -1e9;
      for (const m of it.moves) { const b = boxOf(m.sel, scope); if (!b) continue; const to = [b.x + b.w / 2, b.y + b.h / 2];
        const t0 = Math.max(arrived, m.at - 0.7);
        if (k < t0) break;
        if (k < m.at) { const e = EASE.inout((k - t0) / (m.at - t0)); pos = [pos[0] + (to[0] - pos[0]) * e, pos[1] + (to[1] - pos[1]) * e]; break; }
        pos = to; arrived = m.at; }
      it.el.style.left = pos[0] + "px"; it.el.style.top = pos[1] + "px";
      const c = it.clicks.filter((x) => k >= x && k - x < 0.5).pop(); const r = c == null ? 1 : (k - c) / 0.5;
      it.el.style.setProperty("--r", r.toFixed(3)); it.el.classList.toggle("is-down", c != null && k - c < 0.15);
    }

    /* ---------- lecteur ---------- */
    const [W0, H0] = FORMATS[S.format];
    let P = {};
    const $ = (sel) => P.box.querySelector(sel);
    const ICON = { play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15l12.5-7.5z"/></svg>', pause: '<svg viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4.5" width="4" height="15" rx="1"/><rect x="14" y="4.5" width="4" height="15" rx="1"/></svg>' };
    function buildPlayer() {
      const box = document.createElement("div"); box.className = "ap";
      box.innerHTML = `<div class="ap-view"><div class="ap-fit"></div><button class="ap-big" type="button" hidden>${ICON.play}</button>
        <div class="ap-end" hidden><button class="ap-btn" type="button" data-act="replay"></button></div></div>
        <p class="ap-cap" aria-live="polite"></p>
        <div class="ap-ctrl"><button class="ap-ib" type="button" data-act="play"></button>
          <div class="ap-prog" tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="${DUR}"><div class="ap-fill"></div><div class="ap-marks"></div></div>
          <span class="ap-time"></span>
          <div class="ap-seg" data-group="format">${Object.keys(FORMATS).map((f) => `<button type="button" data-format="${f}">${FORMAT_LABEL[f]}</button>`).join("")}</div>
          ${LANGS.length > 1 ? `<div class="ap-seg" data-group="lang">${LANGS.map((l) => `<button type="button" data-lang="${l}">${l.toUpperCase()}</button>`).join("")}</div>` : ""}
          <button class="ap-tb" type="button" data-act="voice" aria-pressed="false"></button>
          <button class="ap-tb" type="button" data-act="dbg" aria-pressed="false"></button></div>
        <div class="ap-chaps"></div><div class="ap-dbg" hidden></div>`;
      root.replaceWith(box); box.querySelector(".ap-fit").appendChild(root);
      P = { box, view: box.querySelector(".ap-view"), fit: box.querySelector(".ap-fit") };
      new ResizeObserver(fit).observe(P.view);
      box.addEventListener("click", (e) => { const b = e.target.closest("button"); if (!b) return;
        if (b.dataset.format) setFormat(b.dataset.format); else if (b.dataset.lang) setLang(b.dataset.lang);
        else if (b.dataset.sec) { seek(+b.dataset.sec + 0.01); play(); }
        else if (b.dataset.act === "play") S.playing ? pause() : play();
        else if (b.dataset.act === "replay") { seek(0); play(); }
        else if (b.dataset.act === "voice") { S.voice = !S.voice; b.setAttribute("aria-pressed", S.voice); S.cap = -2; if (S.voice && !S.playing) play(); if (!S.voice) stopSpeech(); else render(S.t); }
        else if (b.dataset.act === "dbg") toggleDbg();
        else if (b.classList.contains("ap-big")) play(); });
      root.addEventListener("click", () => (S.playing ? pause() : play()));
      const pr = box.querySelector(".ap-prog"); let drag = false; const at = (e) => { const r = pr.getBoundingClientRect(); seek(clamp((e.clientX - r.left) / r.width) * DUR); };
      pr.addEventListener("pointerdown", (e) => { drag = true; try { pr.setPointerCapture(e.pointerId); } catch (_) { /* rien */ } at(e); });
      pr.addEventListener("pointermove", (e) => drag && at(e)); pr.addEventListener("pointerup", () => (drag = false));
      document.addEventListener("keydown", (e) => { if (e.ctrlKey || e.metaKey || e.altKey || /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
        if (e.key === " " && !/^(BUTTON|A)$/.test(e.target.tagName)) { S.playing ? pause() : play(); e.preventDefault(); }
        else if (e.key === "ArrowRight" || e.key === "ArrowLeft") { seek(S.t + (e.key === "ArrowRight" ? 1 : -1)); e.preventDefault(); }
        else if ((e.key === "," || e.key === ".") && !S.playing) { seek(S.t + (e.key === "." ? 1 : -1) / 30); e.preventDefault(); }
        else if (e.key === "d" || e.key === "D") toggleDbg();
        else if (e.key === "f" || e.key === "F") { const f = Object.keys(FORMATS); setFormat(f[(f.indexOf(S.format) + 1) % f.length]); }
        else if ((e.key === "l" || e.key === "L") && LANGS.length > 1) setLang(LANGS[(LANGS.indexOf(S.lang) + 1) % LANGS.length]); });
    }
    function fit() { if (RENDER) { scale = 1; root.style.transform = "none"; return; }
      const [W, H] = FORMATS[S.format]; P.view.style.aspectRatio = `${W} / ${H}`;
      P.view.style.width = `min(100%, calc((100vh - 250px) * ${W / H}))`;
      scale = P.view.clientWidth / W; root.style.transform = `scale(${scale})`; render(S.t); }
    function updateChrome(t) {
      if (RENDER) return;
      $(".ap-fill").style.width = (t / DUR) * 100 + "%"; $(".ap-time").textContent = `${mmss(t)} / ${mmss(DUR)}`; $(".ap-prog").setAttribute("aria-valuenow", t.toFixed(1));
      const caps = captions(), ci = caps.findIndex((c) => t >= c[0] && t < c[1]);
      if (ci !== S.cap) { S.cap = ci; $(".ap-cap").textContent = ci >= 0 ? caps[ci][2] : ""; if (ci >= 0 && S.voice && S.playing) speak(caps[ci][2]); }
      let ch = 0; chapters().forEach((c, i) => { if (t >= c[0]) ch = i; }); P.box.querySelectorAll(".ap-chaps button").forEach((b, i) => b.setAttribute("aria-current", i === ch));
      if (LOG) $(".ap-dbg").innerHTML = `<div class="ap-dbg-h">t = ${t.toFixed(2)} s · ${S.format} · ${S.lang}</div><div class="ap-dbg-p">${esc(ui("hint"))}</div>` +
        LOG.map(([n, a, b, v]) => `<div class="ap-row ${v >= 1 ? "done" : v > 0 ? "on" : "off"}"><span>${esc(n)}</span><span>${a.toFixed(2)} → ${b.toFixed(2)} s</span><span class="ap-bar"><i style="width:${(v * 100).toFixed(1)}%"></i></span><span>${v.toFixed(2)}</span></div>`).join("");
    }
    function chrome() {
      if (RENDER) return;
      P.box.querySelectorAll("[data-format]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.format === S.format));
      P.box.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === S.lang));
      $('[data-act="voice"]').textContent = ui("voice"); $('[data-act="dbg"]').textContent = ui("backstage"); $('[data-act="replay"]').textContent = ui("replay");
      $('[data-act="play"]').innerHTML = S.playing ? ICON.pause : ICON.play; $('[data-act="play"]').setAttribute("aria-label", S.playing ? ui("pause") : ui("play"));
      $(".ap-marks").innerHTML = SC.slice(1).map((s) => `<span style="left:${(s.start / DUR) * 100}%"></span>`).join("");
      $(".ap-chaps").innerHTML = chapters().map(([a, n]) => `<button type="button" data-sec="${a}">${esc(n)}</button>`).join("");
    }
    const hasTTS = typeof speechSynthesis !== "undefined";
    function stopSpeech() { try { if (hasTTS) speechSynthesis.cancel(); } catch (e) { /* rien */ } }
    function speak(s) { try { if (!hasTTS) return; speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(s); u.lang = { fr: "fr-FR", en: "en-US", es: "es-ES", de: "de-DE", it: "it-IT" }[S.lang] || S.lang; u.rate = 1.05;
      const v = speechSynthesis.getVoices().find((v) => v.lang && v.lang.toLowerCase().startsWith(S.lang)); if (v) u.voice = v; speechSynthesis.speak(u); } catch (e) { /* rien */ } }
    function loop(now) { if (!S.playing) return; S.t = Math.min(DUR, S.t + (now - S.last) / 1000); S.last = now; render(S.t);
      if (S.t >= DUR) { pause(); $(".ap-end").hidden = false; } else S.raf = requestAnimationFrame(loop); }
    function play() { if (RENDER) return; if (S.t >= DUR - 0.05) { S.t = 0; S.cap = -2; } $(".ap-end").hidden = true; $(".ap-big").hidden = true;
      S.playing = true; S.last = performance.now(); chrome(); cancelAnimationFrame(S.raf); S.raf = requestAnimationFrame(loop); }
    function pause() { S.playing = false; cancelAnimationFrame(S.raf); stopSpeech(); if (!RENDER) chrome(); }
    function seek(t) { S.t = clamp(t, 0, DUR); S.cap = -2; stopSpeech(); if (!RENDER && S.t < DUR) $(".ap-end").hidden = true; render(S.t); }
    function setFormat(f) { if (!FORMATS[f]) return; S.format = f; root.dataset.format = f; const [W, H] = FORMATS[f]; root.style.width = W + "px"; root.style.height = H + "px"; chrome(); fit(); render(S.t); }
    function setLang(l) { if (!LANGS.includes(l)) return; S.lang = l; try { localStorage.setItem(KEY, l); } catch (e) { /* rien */ } stopSpeech(); S.cap = -2; applyTexts(); chrome(); render(S.t); }
    function toggleDbg() { S.dbg = !S.dbg; root.classList.toggle("dbg", S.dbg); if (!RENDER) { $('[data-act="dbg"]').setAttribute("aria-pressed", S.dbg); $(".ap-dbg").hidden = !S.dbg; } render(S.t); }

    /* ---------- contrôle : un élément sort-il de la scène ? (chaque format, à l'image clé de chaque scène) ---------- */
    function check() {
      const keep = [S.format, S.t], out = [];
      for (const f of Object.keys(FORMATS)) { setFormat(f); const [W, H] = FORMATS[f];
        for (const s of SC) { const key = s.start + (s.el.dataset.key != null ? +s.el.dataset.key : s.dur - 0.45); render(key);
          const R = root.getBoundingClientRect(); let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
          s.el.querySelectorAll("*").forEach((e) => { if (e.closest(".k-focus,.k-pointer")) return; const r = e.getBoundingClientRect(); if (!r.width || !r.height) return;
            x0 = Math.min(x0, (r.left - R.left) / scale); y0 = Math.min(y0, (r.top - R.top) / scale); x1 = Math.max(x1, (r.right - R.left) / scale); y1 = Math.max(y1, (r.bottom - R.top) / scale); });
          if (x0 < -1 || y0 < -1 || x1 > W + 1 || y1 > H + 1) out.push({ format: f, scene: s.i + 1, chapter: s.el.dataset.chapter ? tr(s.el.dataset.chapter) : "",
            depasse: { haut: Math.round(Math.max(0, -y0)), bas: Math.round(Math.max(0, y1 - H)), gauche: Math.round(Math.max(0, -x0)), droite: Math.round(Math.max(0, x1 - W)) } }); } }
      setFormat(keep[0]); seek(keep[1]); return out;
    }

    /* ---------- démarrage ---------- */
    root.dataset.format = S.format; root.style.width = W0 + "px"; root.style.height = H0 + "px";
    applyTexts();
    if (RENDER) document.documentElement.classList.add("anim-render"); else buildPlayer();
    chrome(); fit();
    const t0 = params.has("t") ? +params.get("t") : null;
    window.__ANIM = { duration: DUR, formats: Object.keys(FORMATS), langs: LANGS, size: () => FORMATS[S.format],
      scenes: SC.map((s) => ({ start: s.start, end: s.end, key: s.start + (s.el.dataset.key != null ? +s.el.dataset.key : s.dur - 0.45), chapter: s.el.dataset.chapter ? tr(s.el.dataset.chapter) : "" })),
      captions, seek, setFormat, setLang, check, ready: null };
    window.__ANIM.ready = (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => { seek(t0 != null ? t0 : S.t); document.documentElement.dataset.ready = "1"; });
    if (t0 != null || RENDER) seek(t0 || 0);
    else if (RM) { seek(Math.min(DUR, SC[0] ? SC[0].dur * 0.7 : 0)); $(".ap-big").hidden = false; }
    else play();
  }

  const go = () => { const root = document.querySelector(".anim"); if (root) boot(root); };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", go); else go();
})();
