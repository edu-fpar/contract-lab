#!/usr/bin/env node
/*
 * Synchronise la documentation et la skill avec le code de l'application.
 * Usage (depuis le dossier du projet) : node tools/build.js
 *
 *  - docs/format-scenario.md            ← P.FORMAT_DOC (js/docs.js)
 *  - docs/scenarios/<id>.md             ← scénarios de js/library.js
 *  - skill/scenario-contract-lab/references/format.md, regles-de-calcul.md, exemple.md
 *  - skill/scenario-contract-lab/scripts/lib/model.js, scenario.js (moteur utilisé par verifier.js)
 */
'use strict';
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const r = (...p) => path.join(root, ...p);
global.window = global;
['model', 'scenario', 'docs', 'library'].forEach(f => require(r('js', f + '.js')));
const P = global.P;

const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text, 'utf8'); console.log('écrit  ' + path.relative(root, file)); };
const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); console.log('copié  ' + path.relative(root, to)); };
// les scénarios intégrés utilisent ~~~scene ; les fichiers publiés utilisent la forme usuelle ```scene
const toFences = md => md.replace(/^~~~scene\s*$/gm, '```scene').replace(/^~~~\s*$/gm, '```');
// les captures d'écran de la doc n'ont pas de sens pour une IA : on les retire des copies
const noImages = md => md.replace(/^!\[[^\]]*\]\([^)]*\)\n(<p class="caption">.*<\/p>\n)?\n?/gm, '');
const regles = noImages(fs.readFileSync(r('docs', 'regles-de-calcul.md'), 'utf8'));

write(r('docs', 'format-scenario.md'), P.FORMAT_DOC);
P.LIBRARY.forEach(s => write(r('docs', 'scenarios', s.id + '.md'), toFences(s.md)));

const skill = r('skill', 'scenario-contract-lab');
write(path.join(skill, 'references', 'format.md'), P.FORMAT_DOC);
write(path.join(skill, 'references', 'regles-de-calcul.md'), regles);
write(path.join(skill, 'references', 'exemple.md'), toFences(P.LIBRARY.find(s => s.id === 'non-concurrence').md));
/* Page d'instructions pour n'importe quelle IA (lisible par URL) : mission + format + règles de vérification + exemple.
 * C'est la version « sans outils » de la skill : l'IA ne peut pas lancer le vérificateur, elle refait les calculs. */
const IA_INTRO = `# Instructions pour une IA : créer un scénario Contract Lab

> Page destinée aux assistants IA (ChatGPT, Claude, Gemini, Mistral, Copilot…). Enseignant : donnez l'adresse de cette page à votre IA, avec votre cours.
> Atelier : https://edu-fpar.github.io/contract-lab/ · Documentation : https://edu-fpar.github.io/contract-lab/docs/

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
  toFences(P.LIBRARY.find(s => s.id === 'non-concurrence').md).trim() + '\n````\n');

copy(r('js', 'model.js'), path.join(skill, 'scripts', 'lib', 'model.js'));
copy(r('js', 'scenario.js'), path.join(skill, 'scripts', 'lib', 'scenario.js'));
console.log('\nTerminé. Pour produire le fichier installable de la skill : voir docs/developpeurs.md');
