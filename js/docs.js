/* ============================================================
 * Documentation intégrée : aide rapide, format des scénarios,
 * prompt pour une IA. Le catalogue des types est produit à partir
 * de js/model.js : il reste toujours à jour.
 * ============================================================ */
window.P = window.P || {};

/* Aide rapide (fenêtre ❔ Aide) : l'essentiel, le détail est dans la documentation (docs/). */
P.HELP_LIBRE = `- Cliquez ou glissez un **élément** de la palette (clauses, garde-fous, obligations, ruptures…) ; tirez la poignée **+** d'une carte vers une autre pour les relier.
- Avec une carte sélectionnée, un clic dans la palette ajoute l'élément **et le relie**.
- Verdicts : ✅ valide, ⚠️ à risque, ⛔ nulle ; les **pastilles** sous une carte sont ses garde-fous (pointillées : manquants, ＋ pour les ajouter).
- **🔍 Vérification** décochée : verdicts masqués, la classe juge. **📸 Studio** : transformer une construction en scénario.`;

P.HELP_CINEMA = `- **📚 Scénarios** : choisir, coller ou déposer un scénario markdown.
- **→ / Espace** : étape suivante (révèle d'abord la réponse d'une question) ; **←** : précédente.
- **🔗 Partager** : lien vers une étape ou un scénario. Fonctionne aussi sur téléphone.
- **📦 SCORM** : paquet .zip pour Moodle ou un autre LMS (achèvement, reprise, note des quiz).`;

P.HELP_THANKS = `Contract Lab reprend le moteur de scénarios de **Capital Lab**, né de l'outil imaginé par **Tao** pour sa classe de droit financier et transmis par **Yannick**.`;

P.IA_INSTRUCTIONS_URL = 'https://edu-fpar.github.io/contract-lab/docs/instructions-ia.md';
P.IA_CONSIGNE = `Lis les instructions sur ${P.IA_INSTRUCTIONS_URL} et prépare un scénario Contract Lab à partir du cours ci-dessous (ou du fichier joint). Public : BTS / licence RH, 6 à 8 étapes, avec deux questions pour la salle.`;
/** Version pour une IA qui n'ouvre pas les liens : la consigne sans le lien, à placer après les instructions. */
P.iaConsigneSansLien = c => c.trim().replace(/^Lis les instructions sur \S+ et prépare/, 'En suivant les instructions ci-dessus, prépare');

/** Catalogue des types, en tableaux markdown, à partir de P.CATALOG */
P.catalogDoc = function () {
  const C = P.CATALOG;
  let md = '';
  P.FAM_ORDER.forEach(f => {
    const F = P.FAMS[f], ks = Object.keys(C).filter(k => C[k].fam === f);
    md += `\n### ${F.icon} ${F.label}\n\n| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |\n|---|---|---|---|\n`;
    ks.forEach(k => {
      const d = C[k];
      const req = (d.req || []).map(r => r.any.map(x => '`' + x + '`').join(' ou ') + (r.level === 'risque' ? ' (risque)' : '')).join(', ');
      const ex = (d.excl || []).map(x => '⊘ ' + x.any.map(y => '`' + y + '`').join('/')).join(', ');
      md += `| \`${k}\` | ${d.icon} | ${d.label} | ${[req, ex, d.illicite ? 'illicite par nature' : ''].filter(Boolean).join(' ; ') || '—'} |\n`;
    });
  });
  return md;
};

P.FORMAT_DOC = `# Format des scénarios « cinéma »

Un scénario est un fichier **markdown** ordinaire. L'outil le découpe en **étapes** (une par titre de niveau 2) et exécute, à chaque étape, les **commandes** des blocs \`scene\`, qui construisent un schéma : un contrat et ses clauses, leurs garde-fous, les parties et leurs obligations, une rupture et sa procédure. L'outil **vérifie** ensuite chaque élément (✅ valide, ⚠️ à risque, ⛔ nulle, ⚡ obligation violée).

## Structure

~~~
# Titre du scénario
> Une phrase de description (facultative).

Texte d'introduction (facultatif : il devient la première étape).

## 1. Titre de la première étape
Commentaire en markdown : **gras**, *italique*, listes, tableaux, citations…
On peut citer un élément par son identifiant : [[NC]].

\`\`\`scene
employeur EMP "Société Bleu Ciel"
salarie LEA "Léa Martin" categorie=cadre anciennete=4 salaire=3200
cdi CT "Contrat de Léa"
EMP LEA -> CT
non_concurrence NC "Non-concurrence 2 ans"
CT -> NC
focus NC
\`\`\`

## 2. Titre de l'étape suivante
…
~~~

Règles :
- les étapes sont **cumulatives** : chaque étape part de l'état de la précédente ;
- \`focus\`, \`note\` et \`selection\` ne valent que pour l'étape où ils sont écrits ; \`vue\` reste active jusqu'à \`vue aucune\` ;
- les blocs peuvent s'écrire \`\`\`scene ou ~~~scene (alias : canevas, actions, script) ;
- dans un bloc, une ligne commençant par # ou // est un commentaire ;
- identifiants sans espace (CT, NC, LEA…) ; noms entre guillemets.

## Étapes questions (quiz)

Une étape peut interroger l'audience. Une fenêtre monte alors en bas du canevas avec la question et les choix en grandes cartes. L'enseignant peut cliquer sur le choix de la salle, puis révèle la réponse : bouton, **→** ou télécommande. Les cartes se colorent ; cliquer sur une carte la retourne pour lire son explication. L'explication générale s'affiche dans le panneau de droite. En lecture continue, le défilement attend la révélation. Dans un paquet SCORM, les questions donnent une note.

~~~
## Question : cette clause de non-concurrence est-elle valable ?
Contexte éventuel, affiché dans le panneau de droite.

\`\`\`scene
verification off
focus NC
\`\`\`

- [ ] Oui, elle a été signée par la salariée
  La signature ne suffit pas : la clause restreint la liberté du travail.
- [x] Non, il lui manque une contrepartie financière
  Les conditions sont cumulatives : sans contrepartie, la clause est nulle.
- [ ] Oui, si l'employeur le décide
  Le juge contrôle les conditions de validité.

### Réponse
Explication générale, affichée après la révélation.

\`\`\`scene
verification on
note NC "Nulle : pas de contrepartie financière"
\`\`\`
~~~

Règles :
- une étape est une question si son titre commence par « Question » (ou « Quiz », « ❓ »), si elle contient des choix \`- [ ]\` / \`- [x]\`, ou une section \`### Réponse\` (aussi : Correction, Explication, Solution) ;
- \`[x]\` marque une bonne réponse ; il peut y en avoir plusieurs, ou aucune case pour une **question ouverte** ;
- le texte de la question est le titre, sans le préfixe « Question : » ;
- le contexte se place **avant** les choix ; les lignes indentées (ou « > ») juste sous un choix sont son explication ;
- les commandes placées **après** \`### Réponse\` ne s'exécutent qu'à la révélation, ce qui permet de montrer la réponse sur le canevas ; elles restent appliquées aux étapes suivantes (sauf \`focus\`, \`note\` et \`selection\`, propres à l'étape) ;
- \`verification off\` avant la question masque verdicts et pastilles (sinon le canevas donne la réponse), \`verification on\` dans la réponse les rétablit ;
- évitez que le texte des étapes précédentes donne déjà la réponse.

## Commandes

| Commande | Effet |
|---|---|
| \`TYPE ID "Nom"\` | crée ou modifie un élément du type indiqué (voir le catalogue ci-dessous), ex. \`mobilite MOB "Clause de mobilité"\` |
| \`TYPE ID "Nom" cle=valeur …\` | avec des données : \`salarie LEA "Léa" categorie=cadre anciennete=4 salaire=3200\`, \`periode_essai ESS duree=5\`, \`cdd CT duree=20\` |
| \`clause ID "Nom" icone=🧸\` | élément libre, avec l'icône de son choix (aussi : \`condition\`, \`obligation\`, \`rupture\`, \`etape\`, \`droit\`, \`norme\`, \`partie\`, \`contrat\`) |
| \`TYPE ID "Nom" at 200 150\` | position fixe ; sans \`at\`, disposition automatique |
| \`A -> B\` | relie A à B ; la relation est choisie d'après les types (voir plus bas) |
| \`A B C -> D\` | relie A, B et C à D (ex. trois garde-fous vers une clause) |
| \`A -> B C D\` | relie A à B, C et D (ex. un contrat vers ses clauses) |
| \`A -> B relation\` | relation imposée : \`contient\`, \`limite\`, \`requiert\`, \`exclut\`, \`signe\`, \`doit\`, \`viole\`, \`justifie\`, \`initie\`, \`met_fin\`, \`puis\`, \`ouvre\`, \`encadre\`, \`prevaut\`, \`lien\` |
| \`A -> B puis "5 jours ouvrables"\` | relation avec un libellé affiché sur le lien (délai, montant…) |
| \`limite CP NC\` | autre forme : la relation d'abord, puis l'origine et la ou les cibles |
| \`retirer ID\` / \`retirer A -> B\` | supprime un élément / un lien |
| \`renommer ID "Nouveau nom"\` · \`type ID cdd\` | renomme / change le type |
| \`param ID cle=valeur\` · \`icone ID 🧸\` | ajoute ou modifie des données / l'icône |
| \`condition ID "Libellé" ok\` / \`manque\` | condition libre affichée en pastille (\`manque risque\` : orange ; \`"effet"\` en fin de ligne) ; \`condition ID aucune\` les retire |
| \`statut ID nulle "texte"\` | impose un verdict : \`valide\`, \`risque\`, \`nulle\`, \`violee\`, \`neutre\` ; \`statut ID auto\` revient au calcul |
| \`verification off\` / \`on\` | masque / affiche les verdicts et les pastilles (pour les questions) |
| \`vue ID\` / \`vue aucune\` | zoom sur le dossier d'un élément (le reste est estompé) |
| \`focus ID ID…\` | met en évidence des éléments |
| \`note ID "texte"\` | bulle explicative au-dessus d'un élément |
| \`selection ID\` | affiche les conditions de validité de ID sous le commentaire |
| \`duree 12\` | durée de l'étape en lecture continue (secondes) |
| \`deplacer ID X Y\` · \`disposition auto\` · \`effacer\` | déplacer, remettre en disposition automatique, vider |

Un élément cité dans un lien sans avoir été déclaré est créé automatiquement (comme clause libre, ou du type dont il porte le nom) et un avertissement est affiché : déclarez toujours vos éléments.

### Relations choisies automatiquement

| De → vers | Relation |
|---|---|
| garde-fou → tout élément | \`limite\` (« encadre », lien vert 🔒) |
| partie → contrat | \`signe\` |
| contrat → clause | \`contient\` (la clause entre dans le cadre du contrat) |
| partie → obligation | \`doit\` |
| faute / manquement → obligation | \`viole\` (l'obligation passe en ⚡ violée) |
| faute → rupture | \`justifie\` (la faute compte comme cause de la rupture) |
| partie → rupture | \`initie\` |
| rupture → contrat | \`met_fin\` |
| rupture → étape, étape → étape | \`puis\` (chaîne de procédure, affichée en ligne) |
| rupture ou étape → indemnité / droit | \`ouvre\` |
| norme → norme / autre | \`prevaut\` / \`encadre\` |

### Ce que l'outil vérifie

- **Garde-fous** : chaque type a ses conditions (colonne de droite du catalogue). Une condition est remplie si un élément du type attendu est **relié directement** à l'élément, ou appartient à la même **chaîne de procédure** (\`puis\`), ou est attaché au **contrat** qui contient la clause (ex. un \`ecrit\` relié au contrat vaut pour sa période d'essai). Les conditions manquantes apparaissent en pastilles pointillées sous la carte.
- **Incompatibilités** (⊘) : vérifiées dans le même **dossier** — les éléments reliés entre eux, sans passer par les parties ni les normes. Ex. une \`faute_grave\` dans le dossier d'un licenciement neutralise le \`preavis\` et l'\`indemnite_licenciement\` ; un \`temps_partiel\` rend l'\`exclusivite\` inopposable.
- **Calculs** : période d'essai (\`duree\` en mois, \`categorie\` du salarié : ouvrier, employe, technicien, agent_maitrise, cadre), CDD (\`duree\` > 18 mois), préavis légal et indemnité légale de licenciement (\`anciennete\` en années, \`salaire\` mensuel brut, portés par le salarié), indemnité de rupture conventionnelle (\`montant\` comparé au minimum légal), prime de précarité (\`remuneration_totale\`).

## Catalogue des types
` + P.catalogDoc() + `
## Conseils de rédaction

- 5 à 9 étapes ; chaque étape n'ajoute qu'une idée (une clause et ses garde-fous, une étape de procédure, une faute…).
- Montrez d'abord la clause **seule** (⛔ nulle, pastilles pointillées), puis ajoutez ses garde-fous un à un : la carte passe au vert sous les yeux de la classe.
- Pour une rupture, posez la rupture, puis sa chaîne de procédure (\`puis\` avec les délais en libellé), puis les droits ouverts (\`ouvre\`).
- Portez \`anciennete\`, \`salaire\` et \`categorie\` sur le salarié : les calculs les retrouvent.
- Utilisez \`focus\` et \`note\` pour guider le regard ; une bulle reste courte (environ 60 caractères).
- Quand l'outil ne sait pas représenter une règle, utilisez \`condition\` ou \`statut\` avec un texte, et expliquez dans le commentaire.
`;

P.AI_PROMPT = `Tu vas rédiger un scénario pédagogique pour Contract Lab, un outil de visualisation du contrat de travail et du droit du travail français (clauses, garde-fous, obligations, ruptures).
Le scénario doit respecter EXACTEMENT le format décrit ci-dessous : un document markdown, un titre de niveau 1, puis une étape par titre de niveau 2, chaque étape contenant un commentaire pédagogique en français et un bloc de commandes \`\`\`scene.
Les vérifications (validité des clauses, incompatibilités, calculs) sont faites par l'outil : tes commentaires doivent annoncer les mêmes verdicts. Réponds uniquement avec le markdown du scénario.

----- SPÉCIFICATION DU FORMAT -----

` + P.FORMAT_DOC + `

----- SUJET DEMANDÉ -----

[Décris ici la notion à expliquer, le public (ex. BTS SAM, licence RH) et le nombre d'étapes souhaité.]
`;
