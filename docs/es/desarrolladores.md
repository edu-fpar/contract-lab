# Desarrolladores

## Arquitectura

Una aplicación estática, sin dependencias ni paso de compilación. `index.html` carga los scripts en este orden; comparten los objetos globales `P` (motor) y `App` (interfaz).

| Archivo | Función |
|---|---|
| `js/i18n.js` | idioma de la interfaz (`P.lang`: `?lang=es`, después la elección recordada, después el idioma del navegador), traducción `P.t()` de las cadenas francesas, `P.translateDom()` |
| `js/i18n-en.js` · `js/i18n-es.js` | diccionarios inglés y español de la interfaz (`P.I18N.en`, `P.I18N.es`) |
| `js/model.js` | familias (`P.FAMS`), **catálogo** del derecho francés, alias de tipos, **relaciones** (`P.RELS`, `P.defaultRel`), estado, **derechos** (`P.registerJuris`, `P.setJuris`, `P.jurisOf`), **motor de verificación** (`P.analyze`): contexto de las condiciones, expedientes, incompatibilidades, obligaciones incumplidas, cálculos (funciones `check` del catálogo), veredictos; disposición automática (`P.layout`) |
| `js/catalog-fr-en.js` | traducción inglesa de los textos del catálogo francés y alias ingleses de los tipos franceses |
| `js/catalog-uk.js` | catálogo del derecho inglés (Inglaterra y Gales, `juris 'uk'`) |
| `js/catalog-es.js` | catálogo del derecho español (`juris 'es'`): tipos, condiciones, incompatibilidades, funciones `check` (prueba, pactos, temporales, SMI, jornada, indemnizaciones de 20, 33 y 12 días, umbrales del despido colectivo, prescripción, caducidad, desempleo), cifras por defecto (`DEF`), alias de tipos, de parámetros y de relaciones en español |
| `js/scenario.js` | analizador y **comandos** (`P.runCommand`, palabras clave en francés, inglés y español: `quitar`, `renombrar`, `parametro`, `condicion`, `estado`, `verificacion`, `vista`, `nota`…), análisis de los escenarios (`P.parseScenario`, encabezado `droit:`, `## Pregunta`, `### Respuesta`), `P.buildState`, exportación del estudio (`P.toCommands`), pequeño intérprete de markdown (`P.md`) |
| `js/docs.js` | ayuda integrada, especificación del formato (`P.FORMAT_DOC`, `P.FORMAT_DOC_EN`, `P.FORMAT_DOC_ES`, cuyos catálogos genera `P.catalogDoc(jurisId, lang)`), consignas para IA (`P.AI_PROMPT`, `P.AI_PROMPT_EN`, `P.AI_PROMPT_ES`, `P.IA_CONSIGNE`) |
| `js/library.js` · `js/library-en.js` · `js/library-uk.js` · `js/library-es.js` | escenarios integrados (`P.LIBRARY`): derecho francés en francés y en inglés; derecho inglés; derecho español (ids `es-*`, `lang: 'es'`, encabezado `droit: es`) |
| `js/app.js` | lienzo SVG y animaciones, interacciones, paleta, inspector, reproductor del modo cine, estudio, ventanas, selectores de derecho y de idioma |
| `js/scorm.js` · `js/scorm-runtime.js` | exportación SCORM y diálogo con la plataforma dentro de un paquete |
| `css/app.css` | estilos |

### Principios

- **El estado** (`App.state`) es un objeto JSON: `entities`, `links`, `options` (`verif`, `droit`), `view`. Todo cambio pasa por `App.commit()`, que vuelve a lanzar el análisis y el dibujo.
- **El análisis** (`P.analyze`) se recalcula entero en cada cambio; primero activa el derecho del estado (`P.setJuris(st.options.droit)`).
- **Derechos**: `P.registerJuris({ id, lang, names, label, labelEn, labelEs, catalog, categories, aliases, paramAliases, currency, defaults })`. `P.setJuris(id)` construye el catálogo activo en el idioma de la interfaz y lo guarda en caché por derecho e idioma. Un derecho nuevo es un nuevo archivo `catalog-xx.js` cargado después de `model.js`.
- **Añadir un tipo**: basta una entrada en el catálogo del derecho (familia, icono, etiqueta, descripción, `req`, `excl`, `ouvre`, `grp`, `params`, `check(a)` opcional). La paleta, el inspector, el catálogo de la documentación y las verificaciones la usan directamente.
- **En modo cine**, el estado del paso *n* se reconstruye reproduciendo los comandos de los pasos 0 a *n* (`P.buildState`).

## Añadir un escenario integrado

Añada un objeto `{ id: 'es-…', lang: 'es', md }` a `P.LIBRARY` en `js/library-es.js`, empezando `md` por el encabezado `---\ndroit: es\n---`. En este archivo, los bloques de comandos se escriben `~~~scene` (no con acentos graves, que cerrarían la cadena JavaScript), y el texto no debe contener ni acentos graves ni `${`.

Después compruébelo:

```bash
node tools/build.js
node skill/scenario-contract-lab/scripts/verifier.js docs/es/scenarios/<id>.md --lang es
```

Añádalo también a la tabla de `docs/es/escenarios.md`.

## Sincronizar la documentación y la skill

`tools/build.js` regenera, a partir del código:
- `docs/format-scenario.md` (`P.FORMAT_DOC`), `docs/en/format-scenario.md` (`P.FORMAT_DOC_EN`) y `docs/es/formato-escenario.md` (`P.FORMAT_DOC_ES`);
- `docs/scenarios/*.md` (escenarios franceses), `docs/en/scenarios/*.md` (escenarios ingleses) y `docs/es/scenarios/*.md` (escenarios españoles);
- `docs/instructions-ia.md`, `docs/en/instructions-ia.md` y `docs/es/instructions-ia.md`, las páginas que se dan a cualquier IA: misión (texto en `tools/build.js`) + formato + reglas de verificación + ejemplo (`es-no-competencia` en español);
- las referencias de la skill (`formato-es.md`, `reglas-es.md` copiada de `docs/es/reglas-de-verificacion.md`, `ejemplo-es.md`, además de las francesas e inglesas);
- la copia del motor en `skill/scenario-contract-lab/scripts/lib/` (`i18n.js`, `i18n-en.js`, `i18n-es.js`, `model.js`, `catalog-fr-en.js`, `catalog-uk.js`, `catalog-es.js`, `scenario.js`).

Ejecútelo tras cualquier cambio en el motor, los catálogos, el formato o los escenarios. Después, para reconstruir el archivo instalable de la skill (archivo zip de la carpeta, extensión `.skill`):

```bash
python tools/package_skill.py
```

## Cada año

Las cifras anuales del catálogo español están en `DEF` al principio de `js/catalog-es.js` (`smi_mensual`, `smi_anual`) y se repiten en las descripciones de los tipos afectados (`salario`) y en `docs/es/reglas-de-verificacion.md`. Cuando se publique el real decreto del SMI, o cuando entre en vigor una reforma señalada con ⚠️ (jornada, indemnización por despido improcedente, información de los elementos esenciales), actualice `DEF`, las funciones `check` y las descripciones, y vuelva a lanzar `node tools/build.js`.

## Documentación

Este sitio usa [Docsify](https://docsify.js.org) 4.13.1, cargado desde un CDN: cada página es un archivo `.md` de `docs/` (francés), `docs/en/` (inglés) o `docs/es/` (español), y las barras laterales son `docs/_sidebar.md`, `docs/en/_sidebar.md` y `docs/es/_sidebar.md` (Docsify carga la más cercana). El selector FR / EN / ES de arriba a la derecha lo gestiona `docs/index.html`. El archivo `.nojekyll` de la raíz es imprescindible: sin él, GitHub Pages ignora los archivos que empiezan por `_` y la barra lateral desaparece. El recuadro «Preparar la clase con una IA» es HTML dentro del markdown; sus botones los gestiona el script de `docs/index.html` (el atributo `data-path` de `.js-ia-url` da la página de instrucciones). El archivo `llms.txt` de la raíz guía a las IA que exploran el sitio. La página `reglas-de-verificacion.md` es también una referencia de la skill: manténgala exacta.

Las capturas de `visuels/es/captures/` (usadas en esta documentación) las produce `tools/screenshots.js` (`ONLY=visuels/es node tools/screenshots.js visuels`).
