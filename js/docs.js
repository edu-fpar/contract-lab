/* ============================================================
 * Documentation intégrée : aide rapide, format des scénarios,
 * prompt pour une IA. Le catalogue des types est produit à partir
 * de js/model.js : il reste toujours à jour.
 * ============================================================ */
window.P = window.P || {};

/** Texte dans la langue de l'interface : { fr, en, es } → la version de P.lang, sinon le français. */
P.byLang = o => (o[P.lang] != null ? o[P.lang] : o.fr);

/* Aide rapide (fenêtre ❔ Aide) : l'essentiel, le détail est dans la documentation (docs/). */
P.HELP_LIBRE = P.byLang({
  en: `- Click or drag an **item** from the palette (clauses, safeguards, obligations, terminations…); drag the **+** handle of a card onto another to link them.
- With a card selected, clicking in the palette adds the item **and links it**.
- Verdicts: ✅ valid, ⚠️ at risk, ⛔ void; the **badges** under a card are its safeguards (dotted: missing, ＋ to add them).
- **🔍 Checks** unticked: verdicts hidden, the class decides. **📸 Studio**: turn a diagram into a scenario.`,
  es: `- Haga clic en un **elemento** de la paleta o arrástrelo (cláusulas, garantías, obligaciones, extinciones…); arrastre el asa **+** de una tarjeta hasta otra para unirlas.
- Con una tarjeta seleccionada, un clic en la paleta añade el elemento **y lo une a ella**.
- Veredictos: ✅ válida, ⚠️ en riesgo, ⛔ nula; las **pastillas** bajo una tarjeta son sus salvaguardas (punteadas: faltan; ＋ para añadirlas).
- **🔍 Verificación** desmarcada: veredictos ocultos, la clase juzga. **📸 Estudio**: convertir un esquema en escenario.`,
  fr: `- Cliquez ou glissez un **élément** de la palette (clauses, garde-fous, obligations, ruptures…) ; tirez la poignée **+** d'une carte vers une autre pour les relier.
- Avec une carte sélectionnée, un clic dans la palette ajoute l'élément **et le relie**.
- Verdicts : ✅ valide, ⚠️ à risque, ⛔ nulle ; les **pastilles** sous une carte sont ses garde-fous (pointillées : manquants, ＋ pour les ajouter).
- **🔍 Vérification** décochée : verdicts masqués, la classe juge. **📸 Studio** : transformer une construction en scénario.`
});

P.HELP_CINEMA = P.byLang({
  en: `- **📚 Scenarios**: choose, paste or drop a markdown scenario.
- **→ / Space**: next step (first reveals the answer to a question); **←**: previous.
- **🔗 Share**: link to a step or a scenario. Also works on a phone.
- **📦 SCORM**: .zip package for Moodle or another LMS (completion, resume, quiz score).`,
  es: `- **📚 Escenarios**: elegir, pegar o soltar un escenario en markdown.
- **→ / Espacio**: paso siguiente (primero revela la respuesta de una pregunta); **←**: anterior.
- **🔗 Compartir**: enlace a un paso o a un escenario, en el idioma que elija. También funciona en el móvil.
- **📦 SCORM**: paquete .zip para Moodle u otro LMS (finalización, reanudación, nota de las preguntas).`,
  fr: `- **📚 Scénarios** : choisir, coller ou déposer un scénario markdown.
- **→ / Espace** : étape suivante (révèle d'abord la réponse d'une question) ; **←** : précédente.
- **🔗 Partager** : lien vers une étape ou un scénario. Fonctionne aussi sur téléphone.
- **📦 SCORM** : paquet .zip pour Moodle ou un autre LMS (achèvement, reprise, note des quiz).`
});

P.HELP_THANKS = P.byLang({
  en: `Contract Lab reuses the scenario engine of **Capital Lab**, which grew out of the tool devised by **Tao** for his financial law class and passed on by **Yannick**.`,
  es: `Contract Lab reutiliza el motor de escenarios de **Capital Lab**, nacido de la herramienta ideada por **Tao** para su clase de derecho financiero y transmitida por **Yannick**.`,
  fr: `Contract Lab reprend le moteur de scénarios de **Capital Lab**, né de l'outil imaginé par **Tao** pour sa classe de droit financier et transmis par **Yannick**.`
});

P.IA_INSTRUCTIONS_URL = 'https://edu-fpar.github.io/contract-lab/docs/instructions-ia.md';
P.IA_CONSIGNE = P.byLang({
  en: 'Read the instructions at https://edu-fpar.github.io/contract-lab/docs/en/instructions-ia.md and prepare a Contract Lab scenario from the course below (or the attached file). Audience: HR / employment law students (undergraduate), 6 to 8 steps, with two questions for the class.',
  es: 'Lee las instrucciones en https://edu-fpar.github.io/contract-lab/docs/es/instructions-ia.md y prepara un escenario de Contract Lab a partir de la clase siguiente (o del archivo adjunto). Público: estudiantes de Relaciones Laborales o de Derecho (grado), de 6 a 8 pasos, con dos preguntas para la clase.',
  fr: `Lis les instructions sur ${P.IA_INSTRUCTIONS_URL} et prépare un scénario Contract Lab à partir du cours ci-dessous (ou du fichier joint). Public : BTS / licence RH, 6 à 8 étapes, avec deux questions pour la salle.`
});
/** Version pour une IA qui n'ouvre pas les liens : la consigne sans le lien, à placer après les instructions. */
P.iaConsigneSansLien = c => c.trim()
  .replace(/^Lis les instructions sur \S+ et prépare/, 'En suivant les instructions ci-dessus, prépare')
  .replace(/^Read the instructions at \S+ and prepare/, 'Following the instructions above, prepare')
  .replace(/^Lee las instrucciones en \S+ y prepara/, 'Siguiendo las instrucciones anteriores, prepara');

/** Libellés des familles dans chaque langue (indépendants de la langue de chargement de model.js). */
P.FAM_LABELS_DOC = {
  fr: { partie: 'Parties & acteurs', contrat: 'Contrats', clause: 'Clauses', limite: 'Garde-fous & conditions', obligation: 'Obligations', manquement: 'Fautes & manquements', rupture: 'Ruptures du contrat', etape: 'Procédure', droit: 'Indemnités & droits', norme: 'Normes' },
  en: { partie: 'Parties & actors', contrat: 'Contracts', clause: 'Clauses', limite: 'Safeguards & conditions', obligation: 'Obligations', manquement: 'Misconduct & breaches', rupture: 'Termination of the contract', etape: 'Procedure', droit: 'Payments & entitlements', norme: 'Legal sources' },
  es: { partie: 'Partes y actores', contrat: 'Contratos', clause: 'Cláusulas', limite: 'Salvaguardas y condiciones', obligation: 'Obligaciones', manquement: 'Faltas e incumplimientos', rupture: 'Extinción del contrato', etape: 'Procedimiento', droit: 'Indemnizaciones y derechos', norme: 'Fuentes del derecho' }
};

/** Catalogue des types, en tableaux markdown, pour un droit et une langue donnés.
 *  P.catalogDoc() : droit français, en français (comportement historique, utilisé par P.FORMAT_DOC).
 *  P.catalogDoc('uk', 'en') : droit anglais, en anglais ; P.catalogDoc('fr', 'en') : droit français, textes anglais ;
 *  P.catalogDoc('es', 'es') : droit espagnol, en espagnol (vide si js/catalog-es.js n'est pas chargé).
 *  level : niveau des titres de familles (3 par défaut). */
P.CAT_DOC_WORDS = {
  en: { head: '| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |', or: ' or ', risk: ' (risk)', illicit: 'unlawful by nature' },
  es: { head: '| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |', or: ' o ', risk: ' (riesgo)', illicit: 'ilícita por naturaleza' },
  fr: { head: '| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |', or: ' ou ', risk: ' (risque)', illicit: 'illicite par nature' }
};
P.catalogDoc = function (jurisId, lang, level) {
  jurisId = jurisId || 'fr'; lang = lang || 'fr';
  if (!P.JURIS || !P.JURIS[jurisId]) return '';
  const h = '#'.repeat(level || 3), wide = lang !== 'fr', W = P.CAT_DOC_WORDS[lang] || P.CAT_DOC_WORDS.fr;
  const prevLang = P.lang, prevJuris = P.jurisId || 'fr';
  let md = '';
  P.lang = lang; P.setJuris(jurisId);
  try {
    const C = P.CATALOG, J = P.juris || {}, labs = P.FAM_LABELS_DOC[lang] || P.FAM_LABELS_DOC.fr;
    P.FAM_ORDER.forEach(f => {
      const F = P.FAMS[f], ks = Object.keys(C).filter(k => C[k].fam === f);
      if (!ks.length) return;
      md += `\n${h} ${F.icon} ${labs[f]}\n\n${W.head}\n|${'---|'.repeat(wide ? 6 : 4)}\n`;
      ks.forEach(k => {
        const d = C[k];
        const req = (d.req || []).map(r => r.any.map(x => '`' + x + '`').join(W.or) + (r.level === 'risque' ? W.risk : '')).join(', ');
        const ex = (d.excl || []).map(x => '⊘ ' + x.any.map(y => '`' + y + '`').join('/')).join(', ');
        const cond = [req, ex, d.illicite ? W.illicit : ''].filter(Boolean).join(' ; ') || '—';
        if (wide) {
          const params = (d.params || []).map(p => '`' + p + '`').join(', ') || '—';
          const al = ((J.aliases || {})[k] || []).filter((a, i, arr) => a !== k && arr.indexOf(a) === i).map(a => '`' + a + '`').join(', ') || '—';
          md += `| \`${k}\` | ${d.icon} | ${d.label} | ${params} | ${cond} | ${al} |\n`;
        } else md += `| \`${k}\` | ${d.icon} | ${d.label} | ${cond} |\n`;
      });
    });
  } finally {
    P.lang = prevLang; P.setJuris(prevJuris);
  }
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

/* ------------------------------------------------------------ English versions
 * P.FORMAT_DOC_EN and P.AI_PROMPT_EN: used by the app when P.lang === 'en',
 * and published as docs/en/format-scenario.md (tools/build.js). */
P.FORMAT_DOC_EN = `# Scenario format ("cinema" mode)

A scenario is an ordinary **markdown** file. The tool splits it into **steps** (one per level-2 heading) and, at each step, runs the **commands** of the \`scene\` blocks, which build a diagram: a contract and its clauses, their safeguards, the parties and their obligations, a termination and its procedure, the payments it opens. The tool then **checks** each item (✅ valid, ⚠️ at risk, ⛔ void, unfair or unenforceable, ⚡ obligation breached).

Two laws are available: **English law (England & Wales)** and **French law**. A scenario uses one of them (see "Choosing the law"); the commands are the same, the catalogue of types differs.

## Structure

~~~
---
droit: uk
---
# Scenario title
> A one-line description (optional).

Introductory text (optional: it becomes the first step).

## 1. Title of the first step
Commentary in markdown: **bold**, *italics*, lists, tables, quotes…
An item can be cited by its identifier: [[NC]].

\`\`\`scene
employer EMP "Hartley Recruitment Ltd"
employee TOM "Tom Bradley" service=3 weekly_pay=900 age=34
permanent CT "Tom's contract"
EMP TOM -> CT
non_compete NC "Non-compete"
CT -> NC
focus NC
\`\`\`

## 2. Title of the next step
…
~~~

Rules:
- steps are **cumulative**: each step starts from the state of the previous one;
- \`focus\`, \`note\` and \`select\` only apply to the step where they are written; \`view\` stays active until \`view none\`;
- blocks can be written \`\`\`scene or ~~~scene (aliases: canvas, actions, script);
- inside a block, a line starting with # or // is a comment;
- identifiers have no spaces (CT, NC, TOM…); names go between double quotes;
- \`[[ID]]\` in the commentary shows the item's name, highlighted on the canvas when hovered (\`[[ID|other text]]\` to choose the text).

## Choosing the law

| Law | How to choose it | Type keys |
|---|---|---|
| English law (England & Wales) | front matter \`droit: uk\` at the very top of the file (also \`law: uk\`), or the command \`law uk\` (French: \`droit uk\`) in the first block | English: \`employee\`, \`permanent\`, \`non_compete\`, \`conduct_dismissal\`, \`statutory_redundancy_pay\`… |
| French law | the default: nothing to write (or \`droit: fr\`) | French keys (\`salarie\`, \`cdi\`, \`non_concurrence\`, \`licenciement_personnel\`…); English aliases are accepted (\`employee\`, \`permanent\`, \`non_compete\`, \`dismissal\`, \`gross_misconduct\`…) |

- Accepted names: \`uk\`, \`england\`, \`england_wales\`, \`english_law\`, \`gb\`… for English law; \`fr\`, \`france\`, \`french_law\` for French law.
- One scenario, one law. The front matter is the recommended form: the library and the share links then show the right flag. It must start on the first line of the file.
- The language of the text and the law are independent: a French-law scenario can be written in English (comparative law), and vice versa. The labels of the catalogue follow the language of the interface.
- English law: amounts in £, \`service\` in years, \`weekly_pay\` per week. French law: amounts in €, \`anciennete\` (seniority) in years, \`salaire\` (salary) per month.

## Quiz steps

A step can question the audience. A window then rises at the bottom of the canvas with the question and the choices as large cards. The teacher can click the class's choice, then reveals the answer: button, **→** or presentation remote. The cards change colour; clicking a card flips it to show its explanation. The general explanation appears in the right-hand panel. In continuous play, the playback waits for the reveal. In a SCORM package, questions give a score.

~~~
## Question: is this non-compete enforceable?
Optional context, displayed in the right-hand panel.

\`\`\`scene
verification off
focus NC
\`\`\`

- [ ] Yes, Tom signed his contract
  A signature is not enough: the covenant is a restraint of trade.
- [x] No, it needs a reasonable duration
  The safeguards are cumulative: without a reasonable duration, the restraint is unenforceable.
- [ ] Yes, if the employer pays Tom during the restriction
  That is French law: English law requires no payment.

### Answer
General explanation, displayed after the reveal.

\`\`\`scene
verification on
reasonable_duration RD "6 months"
RD -> NC
note NC "Enforceable: four safeguards"
\`\`\`
~~~

Rules:
- a step is a question if its title starts with "Question" (or "Quiz", "❓"), if it contains \`- [ ]\` / \`- [x]\` choices, or a \`### Answer\` section (also: Explanation, Solution, Correction; French: Réponse);
- \`[x]\` marks a right answer; there can be several, or no boxes at all for an **open question**;
- the question text is the heading, without the "Question:" prefix;
- context goes **before** the choices; indented lines (or "> ") just under a choice are its explanation;
- commands placed **after** \`### Answer\` only run at the reveal, so the answer can be shown on the canvas; they remain applied in the following steps (except \`focus\`, \`note\` and \`select\`, which belong to the step);
- \`verification off\` before the question hides verdicts and badges (otherwise the canvas gives the answer away), \`verification on\` in the answer restores them;
- make sure the text of the previous steps does not already give the answer.

## Commands

Every command has an English and a French name (\`remove\` / \`retirer\`…); both can be mixed.

| Command | Effect |
|---|---|
| \`TYPE ID "Name"\` | creates or updates an item of the given type (see the catalogue below), e.g. \`garden_leave GL "Garden leave"\` |
| \`TYPE ID "Name" key=value …\` | with data: \`employee TOM "Tom" service=3 weekly_pay=900 age=34\`, \`probation PR duration=6\`, \`notice_clause NC1 notice_weeks=4\`; French law: \`salarie LEA "Léa" categorie=cadre anciennete=4 salaire=3200\` (or \`category=cadre seniority=4 salary=3200\`) |
| \`clause ID "Name" icon=🧸\` | free item, with the icon of your choice (also \`other_condition\`, \`obligation\`, \`other_termination\`, \`other_step\`, \`other_party\`, \`other_contract\`, \`norme\` for a source; a payment: \`other_payment_or_right\` under English law, \`other_entitlement\` under French law) |
| \`TYPE ID "Name" at 200 150\` | fixed position; without \`at\`, automatic layout |
| \`A -> B\` | links A to B; the relation is chosen from the types (see below) |
| \`A B C -> D\` | links A, B and C to D (e.g. three safeguards to one clause) |
| \`A -> B C D\` | links A to B, C and D (e.g. a contract to its clauses) |
| \`A -> B relation\` | forced relation: \`includes\`, \`limits\`, \`requires\`, \`excludes\`, \`signs\`, \`owes\`, \`breaches\`, \`justifies\`, \`initiates\`, \`ends\`, \`then\`, \`entitles\`, \`governs\`, \`prevails\`, \`link\` (French: \`contient\`, \`limite\`, \`requiert\`, \`exclut\`, \`signe\`, \`doit\`, \`viole\`, \`justifie\`, \`initie\`, \`met_fin\`, \`puis\`, \`ouvre\`, \`encadre\`, \`prevaut\`, \`lien\`) |
| \`A -> B then "7 days"\` | relation with a label shown on the link (time limit, amount…) |
| \`limits RD NC\` | other form: the relation first, then the origin and the target(s) |
| \`remove ID\` / \`remove A -> B\` | deletes an item / a link (\`retirer\`) |
| \`rename ID "New name"\` · \`type ID fixed_term\` | renames / changes the type (\`renommer\`, \`type\`) |
| \`param ID key=value\` · \`icon ID 🧸\` | adds or changes data / the icon (\`param\`, \`icone\`) |
| \`condition ID "Label" met\` / \`missing\` | custom condition shown as a badge (\`missing risk\`: amber; \`"effect"\` at the end of the line); \`condition ID none\` removes them (French: \`ok\` / \`manque\`) |
| \`status ID void "text"\` | forces a verdict: \`valid\`, \`risk\`, \`void\`, \`breached\`, \`neutral\` (also \`fair\`, \`unfair\`, \`unenforceable\`, \`lawful\`); \`status ID auto\` returns to the computed verdict (\`statut\`) |
| \`verification off\` / \`on\` | hides / shows verdicts and badges (for questions; also \`check off\`) |
| \`view ID\` / \`view none\` | zooms on the case file of an item, the rest is dimmed (\`vue\`) |
| \`focus ID ID…\` | highlights items (also \`highlight\`) |
| \`note ID "text"\` | speech bubble above an item |
| \`select ID\` | shows the validity conditions of ID under the commentary (\`selection\`) |
| \`duration 12\` | duration of the step in continuous play, in seconds (\`duree\`) |
| \`move ID X Y\` · \`layout\` · \`clear\` | move, back to automatic layout, empty the canvas (\`deplacer\`, \`disposition\`, \`effacer\`) |
| \`law uk\` · \`law fr\` | chooses the law (\`droit\`); prefer the front matter \`droit: uk\` |

An item cited in a link without having been declared is created automatically (as a free clause, or of the type whose name it bears) and a warning is shown: always declare your items.

### Relations chosen automatically

| From → to | Relation |
|---|---|
| safeguard → any item | \`limits\` ("safeguards", green link 🔒) |
| party → contract | \`signs\` |
| contract → clause | \`includes\` (the clause enters the contract's frame) |
| party → obligation | \`owes\` |
| misconduct / breach → obligation | \`breaches\` (the obligation turns ⚡ breached) |
| misconduct → termination | \`justifies\` (the misconduct counts as the ground of the termination) |
| party → termination | \`initiates\` |
| termination → contract | \`ends\` |
| termination → step, step → step | \`then\` (procedure chain, shown in a row) |
| termination or step → payment / right | \`entitles\` |
| source → source / other | \`prevails\` / \`governs\` |

### What the tool checks

- **Safeguards**: each type has its conditions (column "Conditions checked" of the catalogue). A condition is met if an item of the expected type is **linked directly** to the item, or belongs to the same **procedure chain** (\`then\`), or is attached to the **contract** that includes the clause (e.g. \`written_particulars\` linked to the contract counts for its probation clause). Missing conditions appear as dotted badges under the card.
- **Incompatibilities** (⊘): checked within the same **case file** — the items linked to one another, not through parties or sources. E.g. \`gross_misconduct\` in the case file of a dismissal neutralises the \`notice\` and the \`notice_pay\`; a \`wrongful_dismissal\` releases the employee from a \`non_compete\`; under French law, \`faute_grave\` neutralises \`preavis\` and \`indemnite_licenciement\`.
- **Data**: a figure is looked up on the item itself, then in its case file, then on the parties linked to it: put \`service\`, \`weekly_pay\` and \`age\` (English law) or \`categorie\`, \`anciennete\` and \`salaire\` (French law) on the employee.
- **Calculations, English law**: unfair dismissal qualifying period (\`service\` vs \`qualifying_years\`, default 2), statutory minimum notice (ERA 1996 s.86) vs \`notice_weeks\`, notice pay, statutory redundancy pay and basic award (age bands, 20 years, week's pay capped by \`week_cap\`, default £751), compensatory award (\`loss\`, \`polkey\` %, \`uplift\` % up to 25, cap \`comp_cap\` default £123,543 or 52 weeks' pay), National Minimum Wage (\`hourly_rate\` vs the rate for the \`age\`), 4 years of successive fixed-term contracts (\`successive_years\`), holiday pay (\`untaken_days\` × \`day_pay\`). The annual figures change every April: they are parameters, overridable on any item (e.g. \`param SRP week_cap=719\`).
- **Calculations, French law**: probationary period (\`duree\` in months, employee's \`categorie\`: ouvrier, employe, technicien, agent_maitrise, cadre), CDD (\`duree\` > 18 months), statutory notice and statutory severance pay (\`anciennete\` in years, gross monthly \`salaire\`), mutual termination payment (\`montant\` compared with the statutory minimum), end-of-CDD payment (\`remuneration_totale\`).
- ⚠️ **Employment Rights Act 2025**: the English catalogue states the law in force on 20 November 2026. The reforms announced for 1 January 2027 (6-month qualifying period, no cap on the compensatory award) are flagged in the descriptions, not applied: use \`qualifying_years=0.5\` or a larger \`comp_cap\` to show them.

## Catalogue of types

### English law (England & Wales)

Front matter \`droit: uk\`. Type keys are English.
` + P.catalogDoc('uk', 'en', 4) + `
### French law (labels in English)

The default law. Type keys are French; the "Also accepted" column gives the aliases, English ones included.
` + P.catalogDoc('fr', 'en', 4) + `
## Writing tips

- 5 to 9 steps; each step adds only one idea (a clause and its safeguards, a procedural step, a misconduct…).
- Show the clause **alone** first (⛔, dotted badges), then add its safeguards one by one: the card turns green before the class's eyes.
- For a termination, set the termination, then its procedure chain (\`then\` with the time limits as labels), then the rights it opens (\`entitles\`).
- Put the figures on the employee (\`service\`, \`weekly_pay\`, \`age\`; French law: \`anciennete\`, \`salaire\`, \`categorie\`): the calculations find them. Give the calculation in the text ("12 weeks × £751 = £9,012"): the tool shows the same figures.
- Use \`focus\` and \`note\` to guide the eye; a bubble stays short (about 60 characters).
- When the tool cannot represent a rule (tribunal's assessment of the facts, contractual enhancements, real dates and time limits…), use \`condition\` or \`status\` with a text, and explain in the commentary.
- English law: say which figures are those from 6 April 2026 and flag the Employment Rights Act 2025 reforms when they matter ("> ⚠️ …").
`;

P.AI_PROMPT_EN = `You are going to write a teaching scenario for Contract Lab, a tool that visualises the contract of employment and employment law (clauses, safeguards, obligations, terminations), under English law (England & Wales) or French law.
The scenario must follow EXACTLY the format described below: a markdown document, a level-1 title, then one step per level-2 heading, each step containing a teaching commentary in English and a \`\`\`scene command block. For English law, start the file with the front matter --- / droit: uk / ---.
The checks (validity of clauses, incompatibilities, calculations) are done by the tool: your commentary must announce the same verdicts. Answer only with the markdown of the scenario.

----- FORMAT SPECIFICATION -----

` + P.FORMAT_DOC_EN + `

----- REQUESTED TOPIC -----

[Describe here the notion to explain, the law (English or French), the audience (e.g. undergraduate HR or law students) and the number of steps wanted.]
`;

/* ------------------------------------------------------------ versiones en español
 * P.FORMAT_DOC_ES y P.AI_PROMPT_ES: los usa la aplicación cuando P.lang === 'es'.
 * El catálogo del derecho español se genera a partir de js/catalog-es.js: si ese archivo
 * no está cargado, la sección queda vacía (con un aviso) y el resto sigue funcionando. */
P.FORMAT_DOC_ES = `# Formato de los escenarios (modo «cine»)

Un escenario es un archivo **markdown** corriente. La herramienta lo divide en **pasos** (uno por cada título de nivel 2) y ejecuta, en cada paso, los **comandos** de los bloques \`scene\`, que construyen un esquema: un contrato y sus cláusulas, sus salvaguardas, las partes y sus obligaciones, una extinción y su procedimiento, las indemnizaciones a las que da derecho. Después la herramienta **verifica** cada elemento (✅ válida, ⚠️ en riesgo, ⛔ nula o improcedente, ⚡ obligación incumplida).

Hay tres derechos disponibles: **derecho español**, **derecho francés** y **derecho inglés (Inglaterra y Gales)**. Un escenario usa uno de ellos (véase «Elegir el derecho»); los comandos son los mismos, el catálogo de tipos cambia.

## Estructura

~~~
---
droit: es
---
# Título del escenario
> Una frase de descripción (opcional).

Texto de introducción (opcional: se convierte en el primer paso).

## 1. Título del primer paso
Comentario en markdown: **negrita**, *cursiva*, listas, tablas, citas…
Se puede citar un elemento por su identificador: [[NC]].

\`\`\`scene
empresa EMP "Ópticas del Turia S.L."
trabajador CAR "Carlos Gil" antiguedad=4 salario=2500 categoria=tecnico
contrato_indefinido CT "Contrato de Carlos"
EMP CAR -> CT
pacto_no_competencia NC "No competencia" duracion=24
CT -> NC
focus NC
\`\`\`

## 2. Título del paso siguiente
…
~~~

Reglas:
- los pasos son **acumulativos**: cada paso parte del estado del anterior;
- \`focus\`, \`nota\` y \`seleccion\` solo valen para el paso en que se escriben; \`vista\` sigue activa hasta \`vista ninguna\`;
- los bloques pueden escribirse \`\`\`scene o ~~~scene (alias: canvas, actions, script);
- dentro de un bloque, una línea que empieza por # o // es un comentario;
- identificadores sin espacios (CT, NC, CAR…); nombres entre comillas dobles;
- \`[[ID]]\` en el comentario muestra el nombre del elemento, resaltado en el lienzo al pasar el ratón (\`[[ID|otro texto]]\` para elegir el texto).

## Elegir el derecho

| Derecho | Cómo elegirlo | Claves de tipos |
|---|---|---|
| Derecho español | encabezado \`droit: es\` al principio del archivo (también \`derecho: es\`), o el comando \`derecho es\` en el primer bloque | en español, sin tildes: \`trabajador\`, \`contrato_indefinido\`, \`pacto_no_competencia\`, \`despido_disciplinario\`, \`indemnizacion_despido\`… |
| Derecho francés | el derecho por defecto: no hay que escribir nada (o \`droit: fr\`) | claves francesas (\`salarie\`, \`cdi\`, \`non_concurrence\`, \`licenciement_personnel\`…) |
| Derecho inglés (Inglaterra y Gales) | encabezado \`droit: uk\` | claves inglesas (\`employee\`, \`permanent\`, \`non_compete\`, \`conduct_dismissal\`…) |

- Nombres aceptados: \`es\`, \`espana\`, \`spain\`, \`derecho_espanol\`… para el derecho español; \`fr\`, \`france\` para el francés; \`uk\`, \`england\`, \`english_law\` para el inglés.
- Un escenario, un derecho. El encabezado es la forma recomendada: la biblioteca y los enlaces compartidos muestran entonces la bandera correcta. Debe empezar en la primera línea del archivo.
- El idioma del texto y el derecho son independientes: un escenario de derecho francés puede escribirse en español (derecho comparado). Las etiquetas del catálogo siguen el idioma de la interfaz cuando existe una traducción.
- Derecho español: importes en €, \`antiguedad\` en años (con decimales), \`salario\` bruto **mensual con prorrata de pagas extra**, \`categoria\` (\`tecnico_titulado\`, \`tecnico\` u otro). Derecho francés: \`anciennete\`, \`salaire\`, \`categorie\` (también se aceptan \`antiguedad\`, \`salario\`, \`categoria\` en el derecho español, y las claves francesas o inglesas equivalentes).

## Pasos pregunta (quiz)

Un paso puede interrogar al público. Sube entonces una ventana en la parte inferior del lienzo con la pregunta y las opciones en grandes tarjetas. El docente puede hacer clic en la opción elegida por la clase y después revela la respuesta: botón, **→** o mando de presentación. Las tarjetas cambian de color; al hacer clic en una tarjeta se le da la vuelta para leer su explicación. La explicación general aparece en el panel de la derecha. En reproducción continua, el avance espera a la revelación. En un paquete SCORM, las preguntas dan una nota.

~~~
## Pregunta: ¿es válido este pacto de no competencia?
Contexto opcional, que se muestra en el panel de la derecha.

\`\`\`scene
verificacion off
interes_efectivo IE "Clientela de la óptica"
IE -> NC
focus NC
\`\`\`

- [ ] Sí, Carlos firmó su contrato
  La firma no basta: el pacto restringe la libertad de trabajo (art. 21.2 ET).
- [x] No, le falta una compensación económica adecuada
  Las condiciones son acumulativas: sin compensación, el pacto es nulo.
- [ ] Sí, si la empresa lo decide
  El juez controla los requisitos de validez.

### Respuesta
Explicación general, que se muestra tras la revelación.

\`\`\`scene
verificacion on
compensacion_economica CE "30 % del salario"
CE -> NC
nota NC "Válido: interés efectivo y compensación"
\`\`\`
~~~

Reglas:
- un paso es una pregunta si su título empieza por «Pregunta» (o «Question», «Quiz», «❓»), si contiene opciones \`- [ ]\` / \`- [x]\`, o una sección \`### Respuesta\` (también: Solución, Explicación, Corrección; en francés: Réponse; en inglés: Answer);
- \`[x]\` marca una respuesta correcta; puede haber varias, o ninguna casilla para una **pregunta abierta**;
- el texto de la pregunta es el título, sin el prefijo «Pregunta:»;
- el contexto va **antes** de las opciones; las líneas sangradas (o «> ») justo debajo de una opción son su explicación;
- los comandos situados **después** de \`### Respuesta\` solo se ejecutan al revelar, lo que permite mostrar la respuesta en el lienzo; siguen aplicados en los pasos siguientes (salvo \`focus\`, \`nota\` y \`seleccion\`, propios del paso);
- \`verificacion off\` antes de la pregunta oculta veredictos y pastillas (si no, el lienzo da la respuesta), \`verificacion on\` en la respuesta los restablece;
- evite que el texto de los pasos anteriores ya dé la respuesta.

## Comandos

Cada comando tiene un nombre en español, en francés y en inglés (\`quitar\` / \`retirer\` / \`remove\`…); se pueden mezclar.

| Comando | Efecto |
|---|---|
| \`TIPO ID "Nombre"\` | crea o modifica un elemento del tipo indicado (véase el catálogo más abajo), p. ej. \`pacto_permanencia PP "Permanencia 2 años"\` |
| \`TIPO ID "Nombre" clave=valor …\` | con datos: \`trabajador CAR "Carlos" antiguedad=4 salario=2500 categoria=tecnico\`, \`periodo_prueba PR duracion=6\`, \`contrato_temporal CT duracion=8\` |
| \`clause ID "Nombre" icono=🧸\` | elemento libre, con el icono que se quiera (también \`condition\`, \`obligation\`, \`rupture\`, \`etape\`, \`droit\`, \`norme\`, \`partie\`, \`contrat\`) |
| \`TIPO ID "Nombre" en 200 150\` | posición fija (también \`at\`); sin ella, disposición automática |
| \`A -> B\` | une A con B; la relación se elige según los tipos (véase más abajo) |
| \`A B C -> D\` | une A, B y C con D (p. ej. tres salvaguardas con una cláusula) |
| \`A -> B C D\` | une A con B, C y D (p. ej. un contrato con sus cláusulas) |
| \`A -> B relación\` | relación impuesta: \`contiene\`, \`limita\`, \`requiere\`, \`excluye\`, \`firma\`, \`debe\`, \`incumple\`, \`justifica\`, \`inicia\`, \`extingue\`, \`luego\`, \`da_derecho\`, \`regula\`, \`prevalece\`, \`vinculo\` (en francés: \`contient\`, \`limite\`, \`requiert\`, \`exclut\`, \`signe\`, \`doit\`, \`viole\`, \`justifie\`, \`initie\`, \`met_fin\`, \`puis\`, \`ouvre\`, \`encadre\`, \`prevaut\`, \`lien\`) |
| \`A -> B luego "20 días hábiles"\` | relación con una etiqueta mostrada en el vínculo (plazo, importe…) |
| \`limita CE NC\` | otra forma: primero la relación, después el origen y el destino o destinos |
| \`quitar ID\` / \`quitar A -> B\` | elimina un elemento / un vínculo (\`retirer\`, \`eliminar\`) |
| \`renombrar ID "Nuevo nombre"\` · \`tipo ID contrato_temporal\` | renombra / cambia el tipo |
| \`parametro ID clave=valor\` · \`icono ID 🧸\` | añade o modifica datos / el icono (\`param\`, \`icone\`) |
| \`condicion ID "Etiqueta" cumplida\` / \`falta\` | condición libre mostrada como pastilla (\`falta riesgo\`: naranja; \`"efecto"\` al final de la línea); \`condicion ID ninguna\` las quita (también \`ok\` / \`manque\`) |
| \`estado ID nula "texto"\` | impone un veredicto: \`valida\`, \`riesgo\`, \`nula\`, \`incumplida\`, \`neutral\` (también \`improcedente\`, \`procedente\`; \`veredicto\`, \`statut\`); \`estado ID auto\` vuelve al cálculo |
| \`verificacion off\` / \`on\` | oculta / muestra los veredictos y las pastillas (para las preguntas) |
| \`vista ID\` / \`vista ninguna\` | zoom en el expediente de un elemento (el resto queda atenuado) |
| \`focus ID ID…\` | resalta elementos (también \`resaltar\`) |
| \`nota ID "texto"\` | bocadillo encima de un elemento |
| \`seleccion ID\` | muestra las condiciones de validez de ID bajo el comentario |
| \`duracion 12\` | duración del paso en reproducción continua, en segundos |
| \`mover ID X Y\` · \`disposicion\` · \`borrar\` | mover, volver a la disposición automática, vaciar el lienzo |
| \`derecho es\` · \`derecho fr\` | elige el derecho; mejor el encabezado \`droit: es\` |

Un elemento citado en un vínculo sin haberse declarado se crea automáticamente (como cláusula libre, o del tipo cuyo nombre lleva) y se muestra una advertencia: declare siempre sus elementos.

### Relaciones elegidas automáticamente

| De → a | Relación |
|---|---|
| salvaguarda → cualquier elemento | \`limita\` (vínculo verde 🔒) |
| parte → contrato | \`firma\` |
| contrato → cláusula | \`contiene\` (la cláusula entra en el marco del contrato) |
| parte → obligación | \`debe\` |
| falta / incumplimiento → obligación | \`incumple\` (la obligación pasa a ⚡ incumplida) |
| falta → extinción | \`justifica\` (la falta cuenta como causa de la extinción) |
| parte → extinción | \`inicia\` |
| extinción → contrato | \`extingue\` |
| extinción → trámite, trámite → trámite | \`luego\` (cadena de procedimiento, mostrada en fila) |
| extinción o trámite → indemnización / derecho | \`da_derecho\` |
| norma → norma / otro | \`prevalece\` / \`regula\` |

### Qué verifica la herramienta

- **Salvaguardas**: cada tipo tiene sus condiciones (columna «Condiciones verificadas» del catálogo). Una condición se cumple si un elemento del tipo esperado está **unido directamente** al elemento, pertenece a la misma **cadena de procedimiento** (\`luego\`) o está unido al **contrato** que contiene la cláusula (p. ej. una \`forma_escrita\` unida al contrato vale para su periodo de prueba). Las condiciones que faltan aparecen como pastillas punteadas bajo la tarjeta.
- **Incompatibilidades** (⊘): se verifican en el mismo **expediente**, es decir, los elementos unidos entre sí, sin pasar por las partes ni por las normas. P. ej. \`funciones_previas\` (el trabajador ya había desempeñado esas funciones) neutraliza el \`periodo_prueba\`; en derecho francés, una \`faute_grave\` neutraliza el \`preavis\` y la \`indemnite_licenciement\`.
- **Datos**: una cifra se busca en el propio elemento, después en su expediente y después en las partes unidas a él: ponga \`antiguedad\`, \`salario\` y \`categoria\` en el trabajador, y \`plantilla\` en la empresa.
- **Cálculos, derecho español** (⚠️ simplificaciones descritas en el catálogo): indemnización por despido con prorrata por meses (20 días por año con tope de 12 mensualidades en el despido objetivo o colectivo; 33 días con tope de 24 si es improcedente; 12 días al fin de un contrato temporal), salario diario = \`salario\` × 12 / 365 (o \`salario_diario\`), duración máxima del periodo de prueba (art. 14 ET), del pacto de no competencia (2 años técnicos, 6 meses los demás) y del pacto de permanencia, contrato por circunstancias de la producción (\`duracion\`, \`meses_acumulados\`: 18 meses en 24), SMI, jornada, horas extraordinarias y vacaciones, preaviso de 15 días, umbrales del despido colectivo (\`plantilla\`, \`afectados\`), plazos de caducidad (\`dias_habiles\`: 20 días hábiles), prestación por desempleo (\`dias_cotizados\`). Las cifras anuales (SMI…) son parámetros que se pueden sustituir en cualquier elemento.
- **Cálculos, derecho francés**: periodo de prueba (\`duree\` en meses, \`categorie\` del trabajador), CDD (\`duree\` > 18 meses), preaviso legal e indemnización legal por despido (\`anciennete\` en años, \`salaire\` mensual bruto), indemnización de ruptura convencional (\`montant\` frente al mínimo legal), indemnización de precariedad (\`remuneration_totale\`).

## Catálogo de tipos

### Derecho español

Encabezado \`droit: es\`. Las claves de tipos están en español, sin tildes; la columna «También se acepta» da los alias.
` + (P.catalogDoc('es', 'es', 4) || '\n> ⚠️ El catálogo del derecho español (js/catalog-es.js) no está cargado.\n') + `
### Derecho francés (etiquetas en francés)

El derecho por defecto. Las claves de tipos están en francés; la columna «También se acepta» da los alias, incluidos los ingleses. Para el derecho inglés, véase la versión inglesa de este documento.
` + P.catalogDoc('fr', 'es', 4) + `
## Consejos de redacción

- De 5 a 9 pasos; cada paso añade una sola idea (una cláusula y sus salvaguardas, un trámite del procedimiento, una falta…).
- Muestre primero la cláusula **sola** (⛔, pastillas punteadas) y añada después sus salvaguardas una a una: la tarjeta se pone verde ante la clase.
- Para una extinción, ponga la extinción, después su cadena de procedimiento (\`luego\` con los plazos como etiqueta) y después los derechos a los que da lugar (\`da_derecho\`).
- Ponga las cifras en el trabajador (\`antiguedad\`, \`salario\`, \`categoria\`): los cálculos las encuentran. Dé el cálculo en el texto («200 días × 100 € = 20.000 €»): la herramienta muestra las mismas cifras.
- Use \`focus\` y \`nota\` para guiar la mirada; un bocadillo debe ser breve (unos 60 caracteres).
- Cuando la herramienta no sabe representar una regla (apreciación de los hechos por el juez, mejoras del convenio, fechas reales…), use \`condicion\` o \`estado\` con un texto y explíquelo en el comentario.
- Derecho español: cite los artículos (ET, LRJS, LGSS) e indique el año de las cifras que cambian (SMI…).
`;

P.AI_PROMPT_ES = `Vas a redactar un escenario didáctico para Contract Lab, una herramienta que visualiza el contrato de trabajo y el derecho del trabajo (cláusulas, salvaguardas, obligaciones, extinciones), en derecho español o en derecho francés.
El escenario debe respetar EXACTAMENTE el formato descrito a continuación: un documento markdown, un título de nivel 1 y después un paso por cada título de nivel 2, cada paso con un comentario didáctico en español y un bloque de comandos \`\`\`scene. Para el derecho español, empieza el archivo con el encabezado --- / droit: es / ---.
Las verificaciones (validez de las cláusulas, incompatibilidades, cálculos) las hace la herramienta: tus comentarios deben anunciar los mismos veredictos. Responde únicamente con el markdown del escenario.

----- ESPECIFICACIÓN DEL FORMATO -----

` + P.FORMAT_DOC_ES + `

----- TEMA SOLICITADO -----

[Describe aquí la noción que hay que explicar, el derecho (español o francés), el público (p. ej. grado en Relaciones Laborales o en Derecho) y el número de pasos deseado.]
`;
