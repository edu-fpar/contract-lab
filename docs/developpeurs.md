# Développeurs

## Architecture

Application statique, sans dépendance ni compilation. Les scripts sont chargés dans cet ordre par `index.html` et partagent l'objet global `P` (moteur) et `App` (interface).

| Fichier | Rôle |
|---|---|
| `js/model.js` | familles (`P.FAMS`), **catalogue** des éléments (`P.CATALOG` : description, conditions de validité `req`, incompatibilités `excl`, clauses illicites, conséquences habituelles `ouvre`), alias de types, **relations** (`P.RELS`, `P.defaultRel`), état, **moteur de vérification** (`P.analyze`) : contexte des conditions, dossiers, incompatibilités, obligations violées, calculs (période d'essai, CDD, préavis, indemnité légale, rupture conventionnelle, prime de précarité), verdicts ; disposition automatique (`P.layout`) |
| `js/scenario.js` | tokeniseur et **commandes** (`P.runCommand`), lecture des scénarios (`P.parseScenario`, `P.buildState`), export du studio (`P.toCommands`), mini-rendu markdown (`P.md`) |
| `js/docs.js` | aide intégrée, spécification du format (`P.FORMAT_DOC`, dont le catalogue est produit depuis `P.CATALOG`), prompt IA |
| `js/library.js` | scénarios intégrés (`P.LIBRARY`) |
| `js/app.js` | canevas SVG et animations (cartes, pastilles de garde-fous, cadres de contrat, liens d'incompatibilité), interactions, palette, inspecteur, lecteur cinéma, studio, modales |
| `js/scorm.js` | export SCORM : écriture du zip, manifeste `imsmanifest.xml` (1.2 ou 2004), assemblage du paquet (`P.scormPackage`) |
| `js/scorm-runtime.js` | chargé seulement dans un paquet SCORM : dialogue avec la plateforme (reprise, achèvement, note) via `window.ContractLabHost` |
| `css/app.css` | styles |

### Principes

- **L'état** (`App.state`) est un objet JSON : `entities` (`id`, `kind`, `name`, `x`, `y`, `fixed`, `params`, et éventuellement `status` imposé et `conds` libres), `links` (`from`, `to`, `rel`, `label`), `options` (`verif`), `view` (zoom sur un dossier `perspective`, `focus`, bulles `notes`, `select`). Toute modification passe par `App.commit()`, qui relance l'analyse et le rendu.
- **L'analyse** (`P.analyze`) est recalculée entièrement à chaque modification ; elle renvoie pour chaque élément ses conditions (`reqs`), ses problèmes (`issues`), ses calculs (`calc`), son statut et son verdict, ainsi que les cadres de contrat (`frames`), les dossiers et les liens d'incompatibilité à tracer (`autoLinks`).
- **Ajouter un type** : une entrée dans `P.CATALOG` suffit (famille, icône, libellé, description, `req`, `excl`, `ouvre`, `grp` pour la palette). La palette, l'inspecteur, le catalogue de la documentation et la vérification s'en servent directement. Ajoutez au besoin des alias dans `extra`.
- **En mode cinéma**, l'état de l'étape *n* est reconstruit en rejouant les commandes des étapes 0 à *n* (`P.buildState`). Revenir en arrière est donc exact. Les déplacements manuels faits pendant la présentation sont stockés à part (`App.cinePos`, `App.noteOff`) et appliqués après la disposition automatique.
- **Le rendu** reconstruit le SVG à chaque image tant qu'une animation est en cours ; les positions affichées (`App.disp`) glissent vers les positions cibles.

### Paquet SCORM

`P.scormPackage` relit `index.html` et les fichiers `js/` et `css/` qu'il charge (à côté de la page, sinon sur le site public), ajoute `js/scenario-data.js` (`window.CONTRACT_LAB_EMBED` : markdown, titre, version, note) et `js/scorm-runtime.js` avant `app.js`, et marque `<body>` de la classe `embed`. Au démarrage, `app.js` lit ce scénario au lieu de l'adresse, à l'étape fournie par `ContractLabHost.startStep`, et appelle `ContractLabHost.step` / `reveal` à chaque étape et à chaque révélation. Un nouveau fichier chargé par `index.html` est donc embarqué automatiquement.

## Ajouter un scénario intégré

Ajoutez un objet `{ id, md }` à `P.LIBRARY` dans `js/library.js`. Dans ce fichier, les blocs de commandes s'écrivent `~~~scene` (et non avec des accents graves, qui fermeraient la chaîne JavaScript), et le texte ne doit contenir ni accent grave ni `${`.

Vérifiez-le ensuite :

```bash
node tools/build.js
node skill/scenario-contract-lab/scripts/verifier.js docs/scenarios/<id>.md
```

Ajoutez-le aussi au tableau de `docs/scenarios.md`.

## Synchroniser la documentation et la skill

`tools/build.js` régénère, à partir du code :
- `docs/format-scenario.md` (depuis `P.FORMAT_DOC`) et `docs/scenarios/*.md` ;
- `docs/instructions-ia.md`, la page à donner à n'importe quelle IA : mission (texte dans `tools/build.js`) + format + règles de vérification + exemple (la clause de non-concurrence) ;
- les références de la skill (`format.md`, `regles-de-calcul.md` copiée depuis `docs/`, `exemple.md`) ;
- la copie du moteur dans `skill/scenario-contract-lab/scripts/lib/`.

À relancer après toute modification du moteur, du format ou des scénarios. Puis, pour reconstruire le fichier installable de la skill (archive zip du dossier, extension `.skill`) :

```bash
python tools/package_skill.py
```

## Captures d'écran

La documentation ne contient pas encore de captures. Le script `tools/screenshots.js` peut les produire dans `docs/images/*.jpg`, pour pouvoir les refaire quand l'interface change :

```bash
node tools/screenshots.js
```

Il pilote Microsoft Edge ou Chrome sans fenêtre (variable `BROWSER` pour un autre chemin), sans rien installer. Chaque capture est décrite dans le tableau `SHOTS` du script : page, taille (écran ou téléphone), thème jour ou nuit, et mise en scène (étape, question révélée, carte retournée…). Après une génération, insérez les images voulues dans les pages `.md` ; `tools/build.js` les retire des copies destinées aux IA.

## Documentation

Ce site utilise [Docsify](https://docsify.js.org) 4.13.1, chargé depuis un CDN : chaque page est un simple fichier `.md` de `docs/`, et la barre latérale est `docs/_sidebar.md`. Le fichier `.nojekyll` à la racine est indispensable : sans lui, GitHub Pages ignore les fichiers commençant par `_`, et la barre latérale disparaît. L'encart « Préparer son cours avec une IA » est du HTML dans le markdown ; ses boutons sont gérés par le script de `docs/index.html`. Le fichier `llms.txt` à la racine oriente les IA qui explorent le site. La page `regles-de-calcul.md` (« Règles de vérification ») sert aussi de référence à la skill : gardez-la exacte.
