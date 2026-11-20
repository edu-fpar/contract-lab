---
name: scenario-contract-lab
description: Génère, à partir d'un support de cours (PDF, diapositives, polycopié, notes, cas pratique), un scénario markdown jouable en mode « cinéma » dans l'atelier Contract Lab, l'outil de visualisation du contrat de travail et du droit du travail (clauses et garde-fous, incompatibilités, obligations, ruptures et procédures, indemnités). Le scénario est ensuite vérifié par le moteur de l'outil. Utiliser cette skill dès qu'un enseignant veut transformer un cours, un chapitre ou un exercice de droit du travail, de gestion des ressources humaines (RH) ou de droit social en animation pas à pas — contrat de travail, CDI, CDD, intérim, période d'essai, clauses (non-concurrence, mobilité, exclusivité, dédit-formation, forfait jours), obligations de l'employeur et du salarié, faute grave, licenciement, rupture conventionnelle, démission, prise d'acte, indemnités, préavis, sources du droit du travail —, ou demande « un scénario pour l'outil Contract Lab », « une animation pour ma classe sur le licenciement », « le markdown cinéma de ce chapitre », même sans nommer l'outil.
---

# Générer un scénario « Contract Lab » à partir d'un support de cours

L'atelier Contract Lab affiche des éléments du droit du travail sous forme de cartes : parties, contrats, clauses, garde-fous et conditions, obligations, fautes et manquements, ruptures, étapes de procédure, indemnités et droits, normes. Il les relie et **vérifie** chacun : une clause dont un garde-fou manque est ⛔ nulle, une rupture sans sa procédure est ⚠️ irrégulière ou ⛔ sans cause, une indemnité est neutralisée par une faute grave du même dossier, une obligation reliée à un manquement est ⚡ violée. Il calcule aussi la durée maximale de l'essai, la durée du CDD, le préavis légal, l'indemnité légale de licenciement, le minimum de la rupture conventionnelle et la prime de précarité. En mode cinéma, il lit un fichier markdown étape par étape : chaque étape a un commentaire et des commandes qui modifient le canevas.

Ton travail : lire le support de l'enseignant, en tirer un scénario **juste**, **progressif** et **vérifié**, et le livrer sous forme de fichier `.md`.

## Ressources

- `references/format.md` — la syntaxe exacte du scénario, toutes les commandes et le **catalogue des types** avec leurs conditions. **À lire avant d'écrire.**
- `references/regles-de-calcul.md` — les règles de vérification : contexte d'une condition, dossier et incompatibilités, obligations violées, calculs et formules, verdicts imposés, et ce que l'outil ne représente pas. À lire pour que le commentaire et l'affichage concordent.
- `references/exemple.md` — un scénario complet qui fonctionne (la clause de non-concurrence), comme modèle de ton et de rythme.
- `scripts/verifier.js` — rejoue le scénario avec le vrai moteur de l'outil et affiche, étape par étape, les verdicts, les garde-fous remplis ou manquants, les incompatibilités et les calculs (`node scripts/verifier.js scenario.md`).

## Démarche

### 1. Lire le support et choisir ce qui se représente

Repère les notions qui se traduisent en **éléments reliés** :
- **clauses et garde-fous** : une clause et les conditions cumulatives de sa validité (non-concurrence, mobilité, exclusivité, dédit-formation, forfait jours, temps partiel, période d'essai…) ;
- **formalités** d'un contrat : écrit, motif de recours, terme du CDD ;
- **incompatibilités** : faute grave et préavis / indemnité de licenciement, exclusivité et temps partiel, dédit-formation et licenciement, démission et chômage, CDI et prime de précarité ;
- **obligations** des parties et **manquements** qui les violent ;
- **ruptures et procédures** : la rupture, sa cause, sa chaîne d'étapes (`puis`, avec les délais en libellé) ;
- **indemnités et droits** ouverts par la rupture, avec les calculs quand le support donne ancienneté et salaire ;
- **sources** du droit du travail (loi, branche, entreprise, contrat, règlement intérieur, usage).

Vérifie dans `references/format.md` que chaque notion a un type au catalogue ; sinon, utilise un élément libre (`clause`, `condition`, `rupture`, `etape`…, avec `icone=`) et fixe son verdict avec `condition` ou `statut`.

L'outil vérifie la **présence** d'un garde-fou, pas sa qualité : il ne juge pas si une contrepartie est dérisoire, si une faute est réellement grave, si un motif est réel et sérieux. Il ne compte pas les délais, ignore les conventions collectives plus favorables, le barème des dommages-intérêts, les salariés protégés (voir « Ce que l'outil ne représente pas » dans `references/regles-de-calcul.md`). Ces points vont dans le **commentaire**, les **bulles** (`note`), ou un verdict imposé (`statut ID nulle "texte"`), jamais sous forme d'un faux garde-fou qui ferait passer une carte au vert à tort. Si l'essentiel du support relève de l'appréciation des faits ou de règles que l'outil ne connaît pas, dis-le à l'enseignant plutôt que de forcer un scénario approximatif : un outil pédagogique qui montre une chose fausse fait plus de mal que pas d'outil.

### 2. Construire la progression

- 5 à 9 étapes, chacune centrée sur **une idée** : une clause et un ou deux garde-fous, une étape de procédure, une faute, une indemnité. Le texte placé avant le premier `##` devient une étape « Introduction » non numérotée, qui ne compte pas dans ce total.
- Commence simple (les parties, le contrat), complique ensuite. Pour une clause, montre-la d'abord **seule** (⛔ nulle, pastilles en pointillés), puis ajoute ses garde-fous : la carte passe au vert sous les yeux de la classe. Pour une rupture, pose la rupture, puis sa procédure, puis les droits ouverts.
- Reprends les **exemples, noms et chiffres du support** quand il y en a : l'étudiant doit reconnaître son cours. Sinon, invente des noms neutres.
- Une dernière étape de synthèse (tableau, points à retenir, `selection ID` pour afficher la checklist d'un élément) est souvent utile.
- Une ou deux **étapes questions** (voir `references/format.md`) rendent le déroulé interactif. Place-les juste **avant** l'étape qui expliquerait la notion, et vérifie que le texte qui précède ne donne pas déjà la réponse. Commence le bloc de la question par **`verification off`** : sinon, les verdicts et les pastilles donnent la réponse à l'écran. Dans `### Réponse`, rétablis-les avec `verification on` et montre la solution sur le canevas (ajout du garde-fou manquant, `focus`, `note`). Les mauvais choix doivent être des erreurs plausibles (croire que la signature suffit, oublier que la faute grave prive du préavis, confondre non-concurrence et confidentialité) ; chaque choix a une explication courte. Si le support contient des exercices ou des questions de cours, reprends-les.

### 3. Écrire le scénario

Respecte `references/format.md`. Points qui comptent pour que le rendu soit bon :
- Le commentaire est lu à l'écran pendant que le canevas s'anime : phrases courtes, notions clés en **gras**, une citation `> 💡` pour l'idée à retenir.
- **Déclare tous les éléments** avant de les relier ; un élément non déclaré est créé automatiquement, avec un avertissement.
- Relie chaque garde-fou **à la clause** qu'il conditionne. Seules les formalités générales (l'`ecrit`) se relient au contrat : elles valent alors pour toutes ses clauses.
- Porte `categorie`, `anciennete` et `salaire` sur le **salarié** : les calculs les retrouvent. Donne les calculs dans le texte (« 2 400 € × 3 × 1/4 = 1 800 € ») : l'outil affiche les mêmes valeurs.
- Pense au **dossier** : tout ce qui est relié de proche en proche (hors parties et normes) est dans le même dossier, et les incompatibilités s'y appliquent. Ne relie pas deux situations qui doivent rester distinctes.
- `focus` et `note` guident le regard ; ils ne valent que pour leur étape. Une bulle doit rester courte (environ 60 caractères). `vue ID` zoome sur le dossier d'un élément.
- Un verdict imposé par `statut` reste visible même avec `verification off` : ne l'impose pas avant une question dont il donnerait la réponse.

**Quand le cours pose une question dont la réponse est nuancée** (« la clause est-elle valable si la contrepartie est très faible ? », « la faute est-elle grave ? »), donne la réponse que le droit et le support permettent de justifier, explique la nuance dans le commentaire, et signale-la à l'enseignant dans ton message de livraison plutôt que de bloquer en posant la question. Il pourra adapter l'étape.

**Exactitude juridique.** Cite un article du Code du travail ou une décision de jurisprudence **seulement s'il figure dans le support, ou si tu en es certain**. En cas de doute, décris la règle sans numéro. Ne donne pas de durée, de délai ou de montant que tu n'as pas vérifié ; les règles légales utilisées par l'outil sont dans `references/regles-de-calcul.md`. Signale les simplifications dans une citation `> ⚠️` (par exemple « durées légales, hors convention collective plus favorable », « le délai n'est pas contrôlé par l'outil »). L'enseignant préférera une référence absente à une référence fausse.

### 4. Vérifier avec le moteur

Enregistre le scénario dans un fichier, puis lance le script en donnant son chemin complet (il se trouve dans le dossier de cette skill) :

```bash
node <dossier-skill>/scripts/verifier.js scenario.md
```

Le script liste les commandes non comprises (erreurs) puis, pour chaque étape, chaque élément avec son verdict (✅ ⚠️ ⛔ ⚡), ses conditions (✔ remplie, avec l'élément qui la remplit ; ✘ manquante, avec l'effet), ses incompatibilités (⊘) et ses calculs (🧮), ainsi que les relations. Il montre toujours les verdicts, même dans une étape en `verification off`, et l'état d'une question après révélation. Il avertit aussi : question sans `verification off` alors qu'un élément mis en évidence affiche un verdict, question sans bonne réponse ou sans explication, étape sans commentaire, bulle trop longue.

Compare ces verdicts avec ton commentaire. Si l'outil affiche ⛔ là où ton texte annonce une clause valable, ou si une indemnité est neutralisée par un élément que tu n'attendais pas dans le dossier, c'est le texte ou les données qu'il faut corriger. Ne livre pas tant qu'il reste des erreurs ou des écarts. Si Node n'est pas disponible, applique les règles à la main avec `references/regles-de-calcul.md` et indique à l'enseignant que la vérification automatique n'a pas été faite.

### 5. Livrer

Livre le fichier `.md` (nommé d'après le sujet, ex. `scenario-clause-mobilite.md`). Le fichier ne contient que le scénario, car il est affiché tel quel aux étudiants. Dans ton message, ajoute en quelques lignes :
- le plan des étapes ;
- comment l'utiliser : dans l'atelier, mode 🎬 Cinéma → 📚 Scénarios → coller le markdown ou ouvrir le fichier (on peut aussi le déposer sur la fenêtre) ; le bouton 🔗 Partager donne un lien pour les étudiants ;
- ce que l'enseignant devrait relire : références juridiques ajoutées par toi et non tirées du support, simplifications, verdicts imposés par `statut`, notions du cours laissées de côté parce que l'outil ne les représente pas.
