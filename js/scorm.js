/* ============================================================
 * Contract Lab — export d'un scénario en paquet SCORM (.zip).
 * Le paquet contient l'atelier (index.html, css, js), le scénario
 * (js/scenario-data.js) et le dialogue avec la plateforme
 * (js/scorm-runtime.js). Aucune dépendance : le zip est écrit ici.
 * ============================================================ */
(function () {
  'use strict';
  const P = window.P = window.P || {};

  /* ---------------------------------------------------------- zip */
  const CRC = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; }
    return t;
  })();
  function crc32(b) { let c = 0xFFFFFFFF; for (let i = 0; i < b.length; i++) c = CRC[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  async function deflate(b) {
    if (!window.CompressionStream) return null;
    try { return new Uint8Array(await new Response(new Blob([b]).stream().pipeThrough(new CompressionStream('deflate-raw'))).arrayBuffer()); } catch (e) { return null; }
  }
  /** files : [{ name, data (string | Uint8Array) }] → Blob zip (deflate si le navigateur sait faire, sinon stockage). */
  P.zip = async function (files) {
    const enc = new TextEncoder(), parts = [], central = [];
    const d = new Date(), time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    const date = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    let offset = 0;
    for (const f of files) {
      const name = enc.encode(f.name), raw = typeof f.data === 'string' ? enc.encode(f.data) : f.data;
      const crc = crc32(raw), z = await deflate(raw), useZ = z && z.length < raw.length, body = useZ ? z : raw;
      const head = (sig, extra) => {
        const h = new DataView(new ArrayBuffer(extra ? 46 : 30)); let p = 0;
        const u32 = v => { h.setUint32(p, v, true); p += 4; }, u16 = v => { h.setUint16(p, v, true); p += 2; };
        u32(sig); if (extra) u16(20); u16(20); u16(0x0800); u16(useZ ? 8 : 0); u16(time); u16(date);
        u32(crc); u32(body.length); u32(raw.length); u16(name.length); u16(0);
        if (extra) { u16(0); u16(0); u16(0); u32(0); u32(offset); }
        return new Uint8Array(h.buffer);
      };
      const local = head(0x04034b50, false);
      parts.push(local, name, body);
      central.push(head(0x02014b50, true), name);
      offset += local.length + name.length + body.length;
    }
    const cdSize = central.reduce((s, b) => s + b.length, 0);
    const end = new DataView(new ArrayBuffer(22));
    end.setUint32(0, 0x06054b50, true); end.setUint16(8, files.length, true); end.setUint16(10, files.length, true);
    end.setUint32(12, cdSize, true); end.setUint32(16, offset, true);
    return new Blob(parts.concat(central, [new Uint8Array(end.buffer)]), { type: 'application/zip' });
  };

  /* ---------------------------------------------------------- manifeste */
  const xml = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  P.scormManifest = function (o) {
    const id = 'contract-lab-' + (P.slug ? P.slug(o.title).toLowerCase().replace(/_/g, '-') : 'scenario') + '-' + Date.now().toString(36);
    const files = o.files.map(f => `      <file href="${xml(f)}"/>`).join('\n');
    const t = xml(o.title);
    if (o.version === '2004') {
      return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${id}" version="1"
  xmlns="http://www.imsglobal.org/xsd/imscp_v1p1"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_v1p3"
  xmlns:adlseq="http://www.adlnet.org/xsd/adlseq_v1p3"
  xmlns:adlnav="http://www.adlnet.org/xsd/adlnav_v1p3"
  xmlns:imsss="http://www.imsglobal.org/xsd/imsss"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsglobal.org/xsd/imscp_v1p1 imscp_v1p1.xsd http://www.adlnet.org/xsd/adlcp_v1p3 adlcp_v1p3.xsd http://www.adlnet.org/xsd/adlseq_v1p3 adlseq_v1p3.xsd http://www.adlnet.org/xsd/adlnav_v1p3 adlnav_v1p3.xsd http://www.imsglobal.org/xsd/imsss imsss_v1p0.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>2004 4th Edition</schemaversion>
  </metadata>
  <organizations default="ORG">
    <organization identifier="ORG">
      <title>${t}</title>
      <item identifier="ITEM" identifierref="RES">
        <title>${t}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES" type="webcontent" adlcp:scormType="sco" href="index.html">
${files}
    </resource>
  </resources>
</manifest>
`;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<manifest identifier="${id}" version="1.0"
  xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
  xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd">
  <metadata>
    <schema>ADL SCORM</schema>
    <schemaversion>1.2</schemaversion>
  </metadata>
  <organizations default="ORG">
    <organization identifier="ORG">
      <title>${t}</title>
      <item identifier="ITEM" identifierref="RES">
        <title>${t}</title>
      </item>
    </organization>
  </organizations>
  <resources>
    <resource identifier="RES" type="webcontent" adlcp:scormtype="sco" href="index.html">
${files}
    </resource>
  </resources>
</manifest>
`;
  };

  /* ---------------------------------------------------------- paquet */
  /** Lit un fichier de l'atelier : à côté de la page, sinon sur le site public (page ouverte en file://). */
  async function fetchText(path, bases) {
    for (const b of bases) {
      try { const r = await fetch(b + path, { cache: 'no-cache' }); if (r.ok) return await r.text(); } catch (e) { /* base suivante */ }
    }
    throw new Error('Fichier introuvable : ' + path);
  }

  /** o : { md, title, version ('1.2' | '2004'), score (bool), publicBase } → Blob du paquet SCORM. */
  P.scormPackage = async function (o) {
    const bases = ['', o.publicBase].filter((b, i, a) => b != null && a.indexOf(b) === i);
    let html = await fetchText('index.html', bases);
    // les fichiers à embarquer sont ceux que charge la page
    const assets = [];
    html.replace(/<(?:script|link)\b[^>]*(?:src|href)="((?:js|css)\/[^"?#]+)"/g, (m, f) => { assets.push(f); return m; });
    if (!assets.includes('js/app.js')) throw new Error('index.html inattendu');
    const runtime = 'js/scorm-runtime.js', data = 'js/scenario-data.js';
    html = html
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${xml(o.title)} — Contract Lab</title>`)
      .replace(/<link rel="canonical"[^>]*>\n?/, '')
      .replace('<body class="libre">', '<body class="libre embed">')
      .replace('<script src="js/app.js"></script>', `<script src="${data}"></script>\n<script src="${runtime}"></script>\n<script src="js/app.js"></script>`);
    const files = [{ name: 'index.html', data: html }];
    for (const f of assets.concat(runtime)) files.push({ name: f, data: await fetchText(f, bases) });
    const embed = { md: o.md, title: o.title, score: !!o.score, scorm: o.version === '2004' ? '2004' : '1.2' };
    files.push({ name: data, data: '/* Scénario embarqué par l\'export SCORM de Contract Lab. */\nwindow.CONTRACT_LAB_EMBED = ' + JSON.stringify(embed) + ';\n' });
    const manifest = P.scormManifest({ title: o.title, version: embed.scorm, files: files.map(f => f.name) });
    return P.zip([{ name: 'imsmanifest.xml', data: manifest }].concat(files));
  };
})();
