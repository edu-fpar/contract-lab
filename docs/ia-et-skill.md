# Préparer son cours avec une IA

Deux possibilités : n'importe quelle IA avec la page d'instructions, ou Claude avec la skill, qui vérifie en plus les verdicts.

## 1. Avec n'importe quelle IA

<div class="ai-box">
<ol class="ai-steps">
<li><strong>Copiez la consigne.</strong> Elle contient déjà le lien vers les instructions pour l'IA. Le texte est modifiable : adaptez le public ou le nombre d'étapes avant de copier.
<div class="ai-prompt js-ia-prompt" contenteditable="true" spellcheck="false" title="Texte modifiable">Lis les instructions sur <span class="js-ia-url">https://edu-fpar.github.io/contract-lab/docs/instructions-ia.md</span> et prépare un scénario Contract Lab à partir du cours ci-dessous (ou du fichier joint). Public : BTS / licence RH, 6 à 8 étapes, avec deux questions pour la salle.</div>
<button class="ai-btn big" data-copy-sel=".js-ia-prompt">📋 Copier la consigne</button></li>
<li><strong>Collez-la dans votre IA</strong> (ChatGPT, Claude, Gemini, Mistral, Copilot…), puis ajoutez votre cours : texte collé à la suite, ou fichier joint.</li>
<li><strong>Copiez la réponse de l'IA</strong> et collez-la dans l'<a href="../index.html?scenarios" target="_blank" rel="noopener">atelier</a> : 🎬 Cinéma → 📚 Scénarios → Lancer. Vous pouvez coller la réponse entière.</li>
</ol>
<details class="ai-more"><summary>Votre IA ne peut pas ouvrir de lien ?</summary>
<p>Copiez à la place la version complète : les instructions et la consigne réunies en un seul texte. Collez-le dans votre IA, puis ajoutez votre cours.</p>
<button class="ai-btn warn" data-copy-full="instructions-ia.md">📄 Copier la version complète</button> <a class="ai-link" href="instructions-ia.md" target="_blank" rel="noopener">voir les instructions</a>
</details>
<p class="ai-note">💡 Vous utilisez Claude ? La <a href="#/ia-et-skill">skill Contract Lab</a> vérifie en plus chaque verdict avec le moteur de l'atelier.</p>
<p class="ai-note js-ia-local" hidden>ℹ️ Vous consultez cette documentation en local : la consigne pointe vers la version publiée, qu'une IA en ligne peut lire.</p>
</div>

Une IA générale ne peut pas exécuter le moteur de l'atelier : **relisez les verdicts** annoncés dans le commentaire en les comparant à ce que l'atelier affiche (cliquez sur une carte pour sa vérification complète), et **relisez le droit** : références d'articles, durées, montants. Les avertissements de syntaxe s'affichent sous le commentaire.

Les IA qui explorent un site peuvent aussi partir du fichier [`llms.txt`](https://edu-fpar.github.io/contract-lab/llms.txt ':ignore'), qui pointe vers les pages utiles.

## 2. Avec Claude : la skill « scenario-contract-lab » (recommandé)

Une *skill* est un mode d'emploi que Claude charge automatiquement quand la demande s'y rapporte. Celle-ci apprend à Claude à :
1. lire votre **support de cours** (PDF, diapositives, polycopié, cas pratique) ;
2. retenir ce que l'outil sait **représenter** — clauses et garde-fous, incompatibilités, obligations et manquements, ruptures et procédures, indemnités — et laisser de côté, en vous le signalant, ce qu'il ne peut pas montrer correctement ;
3. écrire un scénario progressif qui reprend **vos exemples et vos chiffres**, avec des questions à la salle dont la réponse n'est pas trahie par le canevas ;
4. le **rejouer avec le vrai moteur de l'atelier** pour vérifier que les verdicts, les garde-fous et les calculs annoncés dans le commentaire correspondent à ceux qui s'afficheront ;
5. vous livrer le fichier `.md`, avec la liste de ce qu'il faut relire (références juridiques ajoutées, simplifications).

Les références d'articles du Code du travail ou de jurisprudence ne sont ajoutées que si elles figurent dans votre support ou sont certaines ; les simplifications sont signalées dans le scénario.

### Installer la skill

Le fichier à installer est [`skill/scenario-contract-lab.skill`](../skill/scenario-contract-lab.skill ':ignore'). C'est une archive du dossier `skill/scenario-contract-lab/`.

- **Claude (application web ou bureau)** : dans les paramètres, rubrique des compétences (*Skills*), importez ce fichier. Les exécutions de code doivent être autorisées pour que la vérification fonctionne.
- **Claude Code** : copiez le dossier `skill/scenario-contract-lab/` dans `~/.claude/skills/` (pour vous) ou dans `.claude/skills/` d'un projet.

La vérification utilise Node.js. Si l'environnement n'en dispose pas, Claude applique les règles à la main et vous le signale.

### L'utiliser

Joignez votre support et demandez, par exemple :

> Voici mon chapitre sur les clauses du contrat de travail. Fais-moi un scénario pour l'outil Contract Lab pour corriger le cas pratique en classe, en 6 étapes environ.

> À partir de ces diapositives sur le licenciement pour motif personnel, prépare une animation pas à pas pour mes BTS, avec deux questions.

Vous recevez un fichier `.md` à ouvrir dans l'atelier : mode 🎬 Cinéma → 📚 Scénarios → ouvrir le fichier, ou déposer le fichier sur la fenêtre.

### Contenu de la skill

| Fichier | Rôle |
|---|---|
| `SKILL.md` | la démarche : lire, choisir, construire, vérifier, livrer |
| `references/format.md` | la syntaxe des scénarios et le catalogue des éléments |
| `references/regles-de-calcul.md` | ce que vérifie et calcule le moteur, et ce qu'il ne représente pas |
| `references/exemple.md` | un scénario modèle (la clause de non-concurrence) |
| `scripts/verifier.js` | rejoue un scénario avec le moteur et affiche, étape par étape, les verdicts, les garde-fous et les calculs |
| `scripts/lib/` | copie du moteur de l'atelier |

Le vérificateur peut aussi servir sans IA, pour contrôler un scénario écrit à la main :

```bash
node skill/scenario-contract-lab/scripts/verifier.js mon-scenario.md
```

Pour chaque étape, il liste chaque élément avec son verdict (✅ ⚠️ ⛔ ⚡), ses conditions (✔ remplie, avec l'élément qui la remplit ; ✘ manquante, avec l'effet), ses incompatibilités (⊘) et ses calculs (🧮), puis les relations. Il signale les commandes non comprises (erreurs) et les points à revoir (avertissements) : question sans `verification off` alors qu'un élément mis en évidence affiche son verdict, question sans bonne réponse, bulle trop longue, étape sans commentaire.
