#!/usr/bin/env node
/*
 * Synchronise la documentation et la skill avec le code de l'application.
 * Usage (depuis le dossier du projet) : node tools/build.js
 *
 *  - docs/format-scenario.md            ← P.FORMAT_DOC (js/docs.js)
 *  - docs/en/format-scenario.md         ← P.FORMAT_DOC_EN (droit anglais puis droit français, en anglais)
 *  - docs/scenarios/<id>.md             ← scénarios français de js/library.js
 *  - docs/en/scenarios/<id>.md          ← scénarios anglais (js/library-en.js, js/library-uk.js)
 *  - docs/es/formato-escenario.md       ← P.FORMAT_DOC_ES (derecho español, luego francés, en español)
 *  - docs/es/scenarios/<id>.md          ← scénarios espagnols (js/library-es.js)
 *  - docs/instructions-ia.md, docs/en/instructions-ia.md, docs/es/instructions-ia.md  ← pages d'instructions pour une IA
 *  - skill/scenario-contract-lab/references/ : format.md, format-en.md, formato-es.md, regles-de-calcul.md,
 *    checking-rules-en.md, reglas-es.md (← docs/es/reglas-de-verificacion.md), exemple.md, example-en.md, ejemplo-es.md
 *  - skill/scenario-contract-lab/scripts/lib/ : moteur utilisé par verifier.js
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const r = (...p) => path.join(root, ...p);
global.window = global;
// i18n d'abord ; la langue est fixée avant model.js (familles et relations traduites au chargement)
['i18n', 'i18n-en', 'i18n-es'].forEach(f => require(r('js', f + '.js')));
const P = global.P;
P.lang = 'fr';
['model', 'catalog-fr-en', 'catalog-uk', 'catalog-es', 'scenario', 'docs', 'library', 'library-en', 'library-uk', 'library-es'].forEach(f => require(r('js', f + '.js')));

const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text, 'utf8'); console.log('écrit  ' + path.relative(root, file)); };
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); console.log('copié  ' + path.relative(root, to)); };
// les scénarios intégrés utilisent ~~~scene ; les fichiers publiés utilisent la forme usuelle ```scene
const toFences = md => md.replace(/^~~~scene\s*$/gm, '```scene').replace(/^~~~\s*$/gm, '```');
// les captures d'écran de la doc n'ont pas de sens pour une IA : on les retire des copies
const noImages = md => md.replace(/^!\[[^\]]*\]\([^)]*\)\n(<p class="caption">.*<\/p>\n)?\n?/gm, '');
const regles = noImages(fs.readFileSync(r('docs', 'regles-de-calcul.md'), 'utf8'));
const rulesEn = noImages(fs.readFileSync(r('docs', 'en', 'checking-rules.md'), 'utf8'));
const reglasEs = noImages(fs.readFileSync(r('docs', 'es', 'reglas-de-verificacion.md'), 'utf8'));
const langOf = s => s.lang || 'fr';
const LIB_FR = P.LIBRARY.filter(s => langOf(s) === 'fr');
const LIB_EN = P.LIBRARY.filter(s => langOf(s) === 'en');
const LIB_ES = P.LIBRARY.filter(s => langOf(s) === 'es');
const scen = (list, id) => { const s = list.find(x => x.id === id); if (!s) throw new Error('scénario introuvable : ' + id); return toFences(s.md); };

/* ---- documentation */
write(r('docs', 'format-scenario.md'), P.FORMAT_DOC);
write(r('docs', 'en', 'format-scenario.md'), P.FORMAT_DOC_EN);
LIB_FR.forEach(s => write(r('docs', 'scenarios', s.id + '.md'), toFences(s.md)));
LIB_EN.forEach(s => write(r('docs', 'en', 'scenarios', s.id + '.md'), toFences(s.md)));
write(r('docs', 'es', 'formato-escenario.md'), P.FORMAT_DOC_ES);
LIB_ES.forEach(s => write(r('docs', 'es', 'scenarios', s.id + '.md'), toFences(s.md)));

/* ---- skill : références */
const skill = r('skill', 'scenario-contract-lab');
write(path.join(skill, 'references', 'format.md'), P.FORMAT_DOC);
write(path.join(skill, 'references', 'format-en.md'), P.FORMAT_DOC_EN);
write(path.join(skill, 'references', 'regles-de-calcul.md'), regles);
write(path.join(skill, 'references', 'checking-rules-en.md'), rulesEn);
write(path.join(skill, 'references', 'exemple.md'), scen(LIB_FR, 'non-concurrence'));
write(path.join(skill, 'references', 'example-en.md'), scen(LIB_EN, 'uk-covenants'));
write(path.join(skill, 'references', 'formato-es.md'), P.FORMAT_DOC_ES);
write(path.join(skill, 'references', 'reglas-es.md'), reglasEs);
write(path.join(skill, 'references', 'ejemplo-es.md'), scen(LIB_ES, 'es-no-competencia'));

/* Page d'instructions pour n'importe quelle IA (lisible par URL) : mission + format + règles de vérification + exemple.
 * C'est la version « sans outils » de la skill : l'IA ne peut pas lancer le vérificateur, elle refait les calculs. */
const IA_INTRO = `# Instructions pour une IA : créer un scénario Contract Lab

> Page destinée aux assistants IA (ChatGPT, Claude, Gemini, Mistral, Copilot…). Enseignant : donnez l'adresse de cette page à votre IA, avec votre cours.
> Atelier : https://edu-fpar.github.io/contract-lab/ · Documentation : https://edu-fpar.github.io/contract-lab/docs/
> Cours de droit anglais (England & Wales) ou en anglais : utilisez la version anglaise, https://edu-fpar.github.io/contract-lab/docs/en/instructions-ia.md

## Ta mission

L'enseignant te fournit un support de cours de droit du travail ou de ressources humaines (texte, PDF, diapositives, notes, cas pratique). Tu produis un **scénario markdown** que l'atelier Contract Lab jouera en mode « cinéma » : à chaque étape, un commentaire s'affiche et des commandes construisent un schéma — un contrat et ses clauses, les garde-fous qui les conditionnent, les obligations des parties, une rupture et sa procédure, les indemnités — que l'outil vérifie (✅ valide, ⚠️ à risque, ⛔ nulle ou irrégulière, ⚡ obligation violée).

1. **Choisis ce qui se représente.** Retiens les notions qui se traduisent en éléments reliés : clauses et leurs garde-fous (conditions cumulatives de validité), formalités d'un contrat (écrit, motif, terme), incompatibilités (faute grave et préavis, exclusivité et temps partiel, démission et chômage…), obligations et manquements, ruptures et procédures, indemnités et calculs (essai, CDD, préavis, indemnité légale, rupture conventionnelle, prime de précarité). Ce que l'outil ne sait pas juger (appréciation des faits par le juge, conventions collectives particulières, délais réels, barème des dommages-intérêts…) va dans le commentaire, dans une bulle (\`note\`) ou dans un verdict imposé (\`statut\`), jamais sous forme d'un faux garde-fou qui ferait passer une carte au vert. Si l'essentiel du support ne se représente pas, dis-le à l'enseignant plutôt que de forcer.
2. **Construis la progression.** 5 à 9 étapes, une idée par étape, du simple au complexe : montre d'abord une clause seule (⛔ nulle, garde-fous manquants), puis ajoute ses garde-fous un à un ; pour une rupture, la rupture, puis sa procédure, puis les droits ouverts. Reprends les exemples, noms et chiffres du support. Ajoute une ou deux **étapes questions** juste avant l'étape qui expliquerait la notion, avec des mauvais choix plausibles et une explication pour chaque choix. Chaque question commence par \`verification off\` (sinon les verdicts affichés donnent la réponse) et sa section « ### Réponse » rétablit \`verification on\`.
3. **Écris le scénario** en respectant exactement le format décrit plus bas. Déclare chaque élément avant de le relier ; relie chaque garde-fou à la clause qu'il conditionne ; porte \`categorie\`, \`anciennete\` et \`salaire\` sur le salarié. Donne les calculs dans le texte (« 2 400 € × 3 × 1/4 = 1 800 € ») : l'outil affichera les mêmes valeurs.
4. **Vérifie que les verdicts annoncés correspondent aux règles** de l'annexe 2 : une condition est remplie si un élément du type attendu est relié directement, dans la même chaîne « puis », ou attaché au contrat qui contient la clause ; les incompatibilités jouent dans tout le dossier (éléments reliés de proche en proche, hors parties et normes) ; une obligation reliée à un manquement est violée ; un verdict imposé par \`statut\` reste visible même en \`verification off\`. Si l'outil devait afficher autre chose que ton texte, corrige le texte ou les données.
5. **Reste exact juridiquement.** Ne cite un article du Code du travail ou une décision de jurisprudence que s'il figure dans le support ou si tu en es certain ; sinon, décris la règle sans numéro. Ne donne pas de durée, de délai ou de montant non vérifié. Signale les simplifications dans une citation « > ⚠️ ».

## Ta réponse

- **Un seul bloc de code** contenant le scénario complet, qui commence par « # Titre ». Comme le scénario contient lui-même des blocs \`\`\`scene, entoure-le d'un bloc à quatre accents graves (\`\`\`\`markdown … \`\`\`\`), ou écris les blocs de commandes avec ~~~scene.
- Puis, hors du bloc, quelques lignes pour l'enseignant : le plan des étapes, et ce qu'il doit relire (références ajoutées par toi, simplifications, verdicts imposés, notions laissées de côté).
- Rappelle-lui comment l'utiliser : atelier Contract Lab → 🎬 Cinéma → 📚 Scénarios → coller le markdown → Lancer. Le bouton 🔗 Partager donne ensuite un lien à transmettre aux élèves.

---

`;
write(r('docs', 'instructions-ia.md'), IA_INTRO + P.FORMAT_DOC.replace(/^# /, '# Annexe 1 — ') + '\n\n---\n\n' +
  regles.replace(/^# /, '# Annexe 2 — ') + '\n\n---\n\n' +
  '# Annexe 3 — Exemple complet\n\nUn scénario réel de l\'atelier (la clause de non-concurrence), avec une étape question précédée de `verification off` :\n\n````markdown\n' +
  scen(LIB_FR, 'non-concurrence').trim() + '\n````\n');

const IA_INTRO_EN = `# Instructions for an AI: creating a Contract Lab scenario

> Page for AI assistants (ChatGPT, Claude, Gemini, Mistral, Copilot…). Teachers: give the address of this page to your AI, together with your course.
> Workshop: https://edu-fpar.github.io/contract-lab/?lang=en · Documentation: https://edu-fpar.github.io/contract-lab/docs/#/en/

## Your mission

The teacher gives you course material in employment law or human resources (text, PDF, slides, notes, case study). You produce a **markdown scenario** that the Contract Lab workshop will play in "cinema" mode: at each step a commentary is displayed and commands build a diagram — a contract and its clauses, the safeguards that condition them, the parties' obligations, a termination and its procedure, the payments — which the tool checks (✅ valid, ⚠️ at risk, ⛔ void, unfair or unenforceable, ⚡ obligation breached).

1. **Choose the law.** Contract Lab knows two laws. For a course on **English law (England & Wales)** — contract of employment, written statement, restrictive covenants, unfair dismissal, redundancy, settlement agreements… — start the file with the front matter \`droit: uk\` (three lines: \`---\`, \`droit: uk\`, \`---\`) and use the English type keys of the catalogue (annex 1). For a course on **French law**, write no front matter and use the French type keys (English aliases are accepted). Never mix the two laws in one scenario; for a comparison, mention the other law in the commentary.
2. **Choose what can be represented.** Keep the notions that translate into linked items: clauses and their safeguards (cumulative validity conditions), formalities (written statement, in writing), incompatibilities (gross misconduct and notice, an employer's repudiatory breach and the restrictive covenants…), obligations and breaches, terminations and their procedures, payments and calculations (English law: qualifying period, statutory notice, notice pay, statutory redundancy pay, basic and compensatory awards, minimum wage; French law: probation, CDD, notice, statutory severance, mutual termination, end-of-CDD payment). What the tool cannot judge (the tribunal's assessment of the facts, the band of reasonable responses in a given case, contractual enhancements, real dates and time limits…) goes in the commentary, in a bubble (\`note\`) or in a forced verdict (\`status\`), never as a fake safeguard that would turn a card green. If most of the material cannot be represented, tell the teacher rather than forcing it.
3. **Build the progression.** 5 to 9 steps, one idea per step, from simple to complex: first show a clause alone (⛔, missing safeguards), then add its safeguards one by one; for a termination, the termination, then its procedure, then the rights it opens. Reuse the examples, names and figures of the material. Add one or two **question steps** just before the step that would explain the notion, with plausible wrong choices and an explanation for each choice. Each question starts with \`verification off\` (otherwise the verdicts on screen give the answer away) and its "### Answer" section restores \`verification on\`.
4. **Write the scenario** following exactly the format described below. Declare each item before linking it; link each safeguard to the clause it conditions; put the figures on the employee (English law: \`service\`, \`weekly_pay\`, \`age\`; French law: \`categorie\`, \`anciennete\`, \`salaire\`). Give the calculations in the text ("12 weeks × £751 = £9,012"): the tool will show the same figures.
5. **Check that the verdicts you announce match the rules** of annex 2: a condition is met if an item of the expected type is linked directly, in the same "then" chain, or attached to the contract that includes the clause; incompatibilities apply to the whole case file (items linked step by step, excluding parties and sources); an obligation linked to a breach is breached; under English law, below the qualifying period the fairness defects of a dismissal are downgraded to ⚠️; a verdict forced by \`status\` stays visible even with \`verification off\`. If the tool would show something other than your text, fix the text or the data.
6. **Stay legally accurate.** Only cite a statute section or a case if it appears in the material or you are certain of it; otherwise, describe the rule without a reference. Do not give an unchecked duration, time limit or amount. English law: the annual figures (week's pay cap, compensatory award cap, minimum wage) change every April — say which year's figures you use — and flag the Employment Rights Act 2025 reforms when they matter. Flag simplifications in a "> ⚠️" quote.

## Your answer

- **A single code block** containing the full scenario (front matter first for English law, then "# Title"). As the scenario itself contains \`\`\`scene blocks, wrap it in a four-backtick block (\`\`\`\`markdown … \`\`\`\`), or write the command blocks with ~~~scene.
- Then, outside the block, a few lines for the teacher: the outline of the steps, and what to proofread (references you added, simplifications, forced verdicts, notions left aside).
- Remind them how to use it: Contract Lab workshop → 🎬 Cinema → 📚 Scenarios → paste the markdown → Play. The 🔗 Share button then gives a link for the students.

---

`;
write(r('docs', 'en', 'instructions-ia.md'), IA_INTRO_EN + P.FORMAT_DOC_EN.replace(/^# /, '# Annex 1 — ') + '\n\n---\n\n' +
  rulesEn.replace(/^# /, '# Annex 2 — ') + '\n\n---\n\n' +
  '# Annex 3 — Complete example\n\nA real scenario of the workshop (restrictive covenants, English law), with a question step preceded by `verification off`:\n\n````markdown\n' +
  scen(LIB_EN, 'uk-covenants').trim() + '\n````\n');

const IA_INTRO_ES = `# Instrucciones para una IA: crear un escenario de Contract Lab

> Página destinada a los asistentes de IA (ChatGPT, Claude, Gemini, Mistral, Copilot…). Docente: dé la dirección de esta página a su IA, junto con su material de clase.
> Taller: https://edu-fpar.github.io/contract-lab/es/ · Documentación: https://edu-fpar.github.io/contract-lab/docs/#/es/
> Curso de derecho inglés (England & Wales): use la versión inglesa, https://edu-fpar.github.io/contract-lab/docs/en/instructions-ia.md

## Tu misión

El docente te facilita un material de clase de derecho del trabajo o de recursos humanos (texto, PDF, diapositivas, apuntes, caso práctico). Tú produces un **escenario en markdown** que el taller Contract Lab reproducirá en modo «cine»: en cada paso se muestra un comentario y unos comandos construyen un esquema — un contrato y sus cláusulas, las salvaguardas que las condicionan, las obligaciones de las partes, una extinción y su procedimiento, las indemnizaciones — que la herramienta verifica (✅ válido, ⚠️ en riesgo, ⛔ nulo, improcedente o irregular, ⚡ obligación incumplida).

1. **Elige el derecho.** Para un curso de **derecho español** — Estatuto de los Trabajadores, contratos tras la reforma de 2021, periodo de prueba, pactos del art. 21 ET, despido disciplinario u objetivo, improcedencia y nulidad, extinción del art. 50… — empieza el archivo con el encabezado \`droit: es\` (tres líneas: \`---\`, \`droit: es\`, \`---\`) y usa las claves de tipos españolas del catálogo (anexo 1). Para un curso de **derecho francés**, no escribas encabezado y usa las claves francesas (también en el anexo 1). No mezcles dos derechos en un escenario; para una comparación, menciona el otro derecho en el comentario.
2. **Elige lo que se puede representar.** Quédate con las nociones que se traducen en elementos unidos: cláusulas y sus salvaguardas (condiciones acumulativas de validez), formalidades del contrato (forma escrita, causa temporal precisa), incompatibilidades (funciones previas y periodo de prueba, dimisión y prestación por desempleo, contrato de sustitución e indemnización de 12 días…), obligaciones e incumplimientos, extinciones y procedimientos, indemnizaciones y cálculos (duración máxima de la prueba y de los pactos, regla de los 18 meses en 24, SMI, 20 días por año con tope de 12 mensualidades, 33 días con tope de 24, 12 días por fin de contrato, prescripción de las faltas, caducidad de 20 días hábiles, prestación por desempleo). Lo que la herramienta no sabe juzgar (apreciación de los hechos por el juez, mejoras del convenio colectivo, régimen transitorio de los 45 días, fechas reales…) va en el comentario, en un bocadillo (\`nota\`) o en un veredicto impuesto (\`estado\`), nunca como una falsa salvaguarda que pondría una tarjeta en verde. Si lo esencial del material no se puede representar, díselo al docente en lugar de forzarlo.
3. **Construye la progresión.** De 5 a 9 pasos, una idea por paso, de lo simple a lo complejo: muestra primero una cláusula sola (⛔, salvaguardas que faltan) y añade después sus salvaguardas una a una; para una extinción, la extinción, luego su procedimiento, luego los derechos a los que da lugar. Retoma los ejemplos, nombres y cifras del material. Añade uno o dos **pasos pregunta** justo antes del paso que explicaría la noción, con opciones erróneas verosímiles y una explicación para cada opción. Cada pregunta empieza por \`verificacion off\` (si no, los veredictos en pantalla dan la respuesta) y su sección «### Respuesta» restablece \`verificacion on\`.
4. **Escribe el escenario** respetando exactamente el formato descrito más abajo. Declara cada elemento antes de unirlo; une cada salvaguarda con la cláusula que condiciona; pon \`antiguedad\`, \`salario\` (bruto mensual con prorrata de pagas extra) y \`categoria\` en el trabajador, y \`plantilla\` en la empresa. Da los cálculos en el texto («100 días × 60 € = 6.000 €»): la herramienta mostrará las mismas cifras.
5. **Comprueba que los veredictos anunciados corresponden a las reglas** del anexo 2: una condición se cumple si un elemento del tipo esperado está unido directamente, en la misma cadena «luego» o unido al contrato que contiene la cláusula; las incompatibilidades se aplican en todo el expediente (elementos unidos entre sí, sin pasar por las partes ni por las normas); una obligación unida a un incumplimiento queda incumplida; una causa de nulidad (embarazo, vulneración de derechos fundamentales) prevalece sobre la improcedencia; un veredicto impuesto con \`estado\` sigue visible incluso con \`verificacion off\`. Si la herramienta fuera a mostrar otra cosa que tu texto, corrige el texto o los datos.
6. **Sé exacto jurídicamente.** Cita un artículo (ET, LRJS, LGSS) o una sentencia solo si figura en el material o si estás seguro; si no, describe la regla sin número. No des duraciones, plazos ni importes sin comprobar. Las cifras anuales (SMI) cambian cada año: indica el año de las que usas. Señala las simplificaciones en una cita «> ⚠️».

## Tu respuesta

- **Un único bloque de código** con el escenario completo (primero el encabezado \`droit: es\` para el derecho español, después «# Título»). Como el escenario contiene a su vez bloques \`\`\`scene, rodéalo con un bloque de cuatro acentos graves (\`\`\`\`markdown … \`\`\`\`), o escribe los bloques de comandos con ~~~scene.
- Después, fuera del bloque, unas líneas para el docente: el plan de los pasos y lo que debe revisar (referencias añadidas por ti, simplificaciones, veredictos impuestos, nociones dejadas de lado).
- Recuérdale cómo usarlo: taller Contract Lab → 🎬 Cine → 📚 Escenarios → pegar el markdown → Iniciar. El botón 🔗 Compartir da después un enlace para los estudiantes.

---

`;
write(r('docs', 'es', 'instructions-ia.md'), IA_INTRO_ES + P.FORMAT_DOC_ES.replace(/^# /, '# Anexo 1 — ') + '\n\n---\n\n' +
  reglasEs.replace(/^# /, '# Anexo 2 — ') + '\n\n---\n\n' +
  '# Anexo 3 — Ejemplo completo\n\nUn escenario real del taller (pactos de no competencia, plena dedicación y permanencia, derecho español), con pasos pregunta precedidos de `verificacion off`:\n\n````markdown\n' +
  scen(LIB_ES, 'es-no-competencia').trim() + '\n````\n');

/* ---- skill : moteur */
['i18n', 'i18n-en', 'i18n-es', 'model', 'catalog-fr-en', 'catalog-uk', 'catalog-es', 'scenario'].forEach(f => copy(r('js', f + '.js'), path.join(skill, 'scripts', 'lib', f + '.js')));
console.log('\nTerminé. Pour produire le fichier installable de la skill : python tools/package_skill.py (voir docs/developpeurs.md)');
