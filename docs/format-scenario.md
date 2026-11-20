# Format des scénarios « cinéma »

Un scénario est un fichier **markdown** ordinaire. L'outil le découpe en **étapes** (une par titre de niveau 2) et exécute, à chaque étape, les **commandes** des blocs `scene`, qui construisent un schéma : un contrat et ses clauses, leurs garde-fous, les parties et leurs obligations, une rupture et sa procédure. L'outil **vérifie** ensuite chaque élément (✅ valide, ⚠️ à risque, ⛔ nulle, ⚡ obligation violée).

## Structure

~~~
# Titre du scénario
> Une phrase de description (facultative).

Texte d'introduction (facultatif : il devient la première étape).

## 1. Titre de la première étape
Commentaire en markdown : **gras**, *italique*, listes, tableaux, citations…
On peut citer un élément par son identifiant : [[NC]].

```scene
employeur EMP "Société Bleu Ciel"
salarie LEA "Léa Martin" categorie=cadre anciennete=4 salaire=3200
cdi CT "Contrat de Léa"
EMP LEA -> CT
non_concurrence NC "Non-concurrence 2 ans"
CT -> NC
focus NC
```

## 2. Titre de l'étape suivante
…
~~~

Règles :
- les étapes sont **cumulatives** : chaque étape part de l'état de la précédente ;
- `focus`, `note` et `selection` ne valent que pour l'étape où ils sont écrits ; `vue` reste active jusqu'à `vue aucune` ;
- les blocs peuvent s'écrire ```scene ou ~~~scene (alias : canevas, actions, script) ;
- dans un bloc, une ligne commençant par # ou // est un commentaire ;
- identifiants sans espace (CT, NC, LEA…) ; noms entre guillemets.

## Étapes questions (quiz)

Une étape peut interroger l'audience. Une fenêtre monte alors en bas du canevas avec la question et les choix en grandes cartes. L'enseignant peut cliquer sur le choix de la salle, puis révèle la réponse : bouton, **→** ou télécommande. Les cartes se colorent ; cliquer sur une carte la retourne pour lire son explication. L'explication générale s'affiche dans le panneau de droite. En lecture continue, le défilement attend la révélation. Dans un paquet SCORM, les questions donnent une note.

~~~
## Question : cette clause de non-concurrence est-elle valable ?
Contexte éventuel, affiché dans le panneau de droite.

```scene
verification off
focus NC
```

- [ ] Oui, elle a été signée par la salariée
  La signature ne suffit pas : la clause restreint la liberté du travail.
- [x] Non, il lui manque une contrepartie financière
  Les conditions sont cumulatives : sans contrepartie, la clause est nulle.
- [ ] Oui, si l'employeur le décide
  Le juge contrôle les conditions de validité.

### Réponse
Explication générale, affichée après la révélation.

```scene
verification on
note NC "Nulle : pas de contrepartie financière"
```
~~~

Règles :
- une étape est une question si son titre commence par « Question » (ou « Quiz », « ❓ »), si elle contient des choix `- [ ]` / `- [x]`, ou une section `### Réponse` (aussi : Correction, Explication, Solution) ;
- `[x]` marque une bonne réponse ; il peut y en avoir plusieurs, ou aucune case pour une **question ouverte** ;
- le texte de la question est le titre, sans le préfixe « Question : » ;
- le contexte se place **avant** les choix ; les lignes indentées (ou « > ») juste sous un choix sont son explication ;
- les commandes placées **après** `### Réponse` ne s'exécutent qu'à la révélation, ce qui permet de montrer la réponse sur le canevas ; elles restent appliquées aux étapes suivantes (sauf `focus`, `note` et `selection`, propres à l'étape) ;
- `verification off` avant la question masque verdicts et pastilles (sinon le canevas donne la réponse), `verification on` dans la réponse les rétablit ;
- évitez que le texte des étapes précédentes donne déjà la réponse.

## Commandes

| Commande | Effet |
|---|---|
| `TYPE ID "Nom"` | crée ou modifie un élément du type indiqué (voir le catalogue ci-dessous), ex. `mobilite MOB "Clause de mobilité"` |
| `TYPE ID "Nom" cle=valeur …` | avec des données : `salarie LEA "Léa" categorie=cadre anciennete=4 salaire=3200`, `periode_essai ESS duree=5`, `cdd CT duree=20` |
| `clause ID "Nom" icone=🧸` | élément libre, avec l'icône de son choix (aussi : `condition`, `obligation`, `rupture`, `etape`, `droit`, `norme`, `partie`, `contrat`) |
| `TYPE ID "Nom" at 200 150` | position fixe ; sans `at`, disposition automatique |
| `A -> B` | relie A à B ; la relation est choisie d'après les types (voir plus bas) |
| `A B C -> D` | relie A, B et C à D (ex. trois garde-fous vers une clause) |
| `A -> B C D` | relie A à B, C et D (ex. un contrat vers ses clauses) |
| `A -> B relation` | relation imposée : `contient`, `limite`, `requiert`, `exclut`, `signe`, `doit`, `viole`, `justifie`, `initie`, `met_fin`, `puis`, `ouvre`, `encadre`, `prevaut`, `lien` |
| `A -> B puis "5 jours ouvrables"` | relation avec un libellé affiché sur le lien (délai, montant…) |
| `limite CP NC` | autre forme : la relation d'abord, puis l'origine et la ou les cibles |
| `retirer ID` / `retirer A -> B` | supprime un élément / un lien |
| `renommer ID "Nouveau nom"` · `type ID cdd` | renomme / change le type |
| `param ID cle=valeur` · `icone ID 🧸` | ajoute ou modifie des données / l'icône |
| `condition ID "Libellé" ok` / `manque` | condition libre affichée en pastille (`manque risque` : orange ; `"effet"` en fin de ligne) ; `condition ID aucune` les retire |
| `statut ID nulle "texte"` | impose un verdict : `valide`, `risque`, `nulle`, `violee`, `neutre` ; `statut ID auto` revient au calcul |
| `verification off` / `on` | masque / affiche les verdicts et les pastilles (pour les questions) |
| `vue ID` / `vue aucune` | zoom sur le dossier d'un élément (le reste est estompé) |
| `focus ID ID…` | met en évidence des éléments |
| `note ID "texte"` | bulle explicative au-dessus d'un élément |
| `selection ID` | affiche les conditions de validité de ID sous le commentaire |
| `duree 12` | durée de l'étape en lecture continue (secondes) |
| `deplacer ID X Y` · `disposition auto` · `effacer` | déplacer, remettre en disposition automatique, vider |

Un élément cité dans un lien sans avoir été déclaré est créé automatiquement (comme clause libre, ou du type dont il porte le nom) et un avertissement est affiché : déclarez toujours vos éléments.

### Relations choisies automatiquement

| De → vers | Relation |
|---|---|
| garde-fou → tout élément | `limite` (« encadre », lien vert 🔒) |
| partie → contrat | `signe` |
| contrat → clause | `contient` (la clause entre dans le cadre du contrat) |
| partie → obligation | `doit` |
| faute / manquement → obligation | `viole` (l'obligation passe en ⚡ violée) |
| faute → rupture | `justifie` (la faute compte comme cause de la rupture) |
| partie → rupture | `initie` |
| rupture → contrat | `met_fin` |
| rupture → étape, étape → étape | `puis` (chaîne de procédure, affichée en ligne) |
| rupture ou étape → indemnité / droit | `ouvre` |
| norme → norme / autre | `prevaut` / `encadre` |

### Ce que l'outil vérifie

- **Garde-fous** : chaque type a ses conditions (colonne de droite du catalogue). Une condition est remplie si un élément du type attendu est **relié directement** à l'élément, ou appartient à la même **chaîne de procédure** (`puis`), ou est attaché au **contrat** qui contient la clause (ex. un `ecrit` relié au contrat vaut pour sa période d'essai). Les conditions manquantes apparaissent en pastilles pointillées sous la carte.
- **Incompatibilités** (⊘) : vérifiées dans le même **dossier** — les éléments reliés entre eux, sans passer par les parties ni les normes. Ex. une `faute_grave` dans le dossier d'un licenciement neutralise le `preavis` et l'`indemnite_licenciement` ; un `temps_partiel` rend l'`exclusivite` inopposable.
- **Calculs** : période d'essai (`duree` en mois, `categorie` du salarié : ouvrier, employe, technicien, agent_maitrise, cadre), CDD (`duree` > 18 mois), préavis légal et indemnité légale de licenciement (`anciennete` en années, `salaire` mensuel brut, portés par le salarié), indemnité de rupture conventionnelle (`montant` comparé au minimum légal), prime de précarité (`remuneration_totale`).

## Catalogue des types

### 👥 Parties & acteurs

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `employeur` | 🏢 | Employeur | — |
| `salarie` | 👤 | Salarié | — |
| `cse` | 🗣️ | CSE | — |
| `inspection` | 🏛️ | Administration (DREETS) | — |
| `prudhommes` | ⚖️ | Conseil de prud'hommes | — |
| `medecin` | 🩺 | Médecin du travail | — |
| `nouvel_employeur` | 🏭 | Nouvel employeur | — |
| `france_travail` | 🏦 | France Travail | — |
| `partie` | 👥 | Autre acteur | — |

### 📃 Contrats

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `cdi` | 📄 | CDI | — |
| `cdd` | ⏳ | CDD | `ecrit`, `motif_recours`, `terme` |
| `interim` | 🔁 | Contrat de mission (intérim) | `ecrit`, `motif_recours` |
| `apprentissage` | 🎓 | Contrat d'apprentissage | — |
| `contrat` | 📃 | Autre contrat | — |

### 🧩 Clauses

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `remuneration` | 💶 | Rémunération | — |
| `fonctions` | 🧑‍💼 | Qualification / fonctions | — |
| `duree_travail` | ⏱️ | Durée du travail | — |
| `lieu_travail` | 📍 | Lieu de travail | — |
| `temps_partiel` | 🌓 | Temps partiel | `ecrit`, `repartition` |
| `periode_essai` | 🧪 | Période d'essai | `ecrit` |
| `renouvellement_essai` | 🔄 | Renouvellement de l'essai | `accord_collectif`, `ecrit`, `accord_salarie` |
| `non_concurrence` | 🚫 | Non-concurrence | `interet_legitime`, `limite_duree`, `limite_geo`, `specificites`, `contrepartie` |
| `non_sollicitation` | 🙅 | Non-sollicitation de clientèle | `interet_legitime`, `limite_duree`, `limite_geo`, `contrepartie` |
| `mobilite` | 🧳 | Mobilité | `zone_definie`, `interet_legitime` (risque), `delai_prevenance` (risque) |
| `exclusivite` | 🔒 | Exclusivité | `interet_legitime`, `proportionnalite` ; ⊘ `temps_partiel` |
| `dedit_formation` | 🎒 | Dédit-formation | `ecrit`, `formation_couteuse`, `proportionnalite` ; ⊘ `licenciement_personnel`/`licenciement_eco`/`licenciement_inaptitude`/`rupture_essai` |
| `confidentialite` | 🤐 | Confidentialité | — |
| `objectifs` | 🎯 | Clause d'objectifs | `objectifs_realistes` (risque) |
| `remuneration_variable` | 📈 | Rémunération variable | `criteres_objectifs` |
| `forfait_jours` | 📆 | Forfait en jours | `accord_collectif`, `convention_individuelle`, `autonomie`, `suivi_charge` |
| `astreinte` | 📟 | Astreinte | `contrepartie`, `delai_prevenance` (risque) |
| `teletravail` | 🏠 | Télétravail | `accord_collectif` ou `accord_salarie` (risque) |
| `garantie_emploi` | 🛡️ | Garantie d'emploi | — |
| `propriete_intellectuelle` | 💡 | Inventions | — |
| `parachute` | 🪂 | Indemnité contractuelle de rupture | — |
| `clause_resolutoire` | 💣 | Rupture automatique | illicite par nature |
| `clause_vie_privee` | 💍 | Restriction de la vie privée | illicite par nature |
| `clause_discriminatoire` | 🚷 | Clause discriminatoire | illicite par nature |
| `clause` | 🧩 | Autre clause | — |

### 🔒 Garde-fous & conditions

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `contrepartie` | 💰 | Contrepartie financière | — |
| `limite_duree` | ⌛ | Limite dans le temps | — |
| `limite_geo` | 🗺️ | Limite dans l'espace | — |
| `specificites` | 🧩 | Spécificités de l'emploi | — |
| `interet_legitime` | 🏰 | Intérêt légitime de l'entreprise | — |
| `proportionnalite` | 📐 | Justifiée et proportionnée | — |
| `zone_definie` | 📌 | Zone géographique précise | — |
| `delai_prevenance` | 📢 | Délai de prévenance | — |
| `accord_salarie` | 🙋 | Accord exprès du salarié | — |
| `formation_couteuse` | 🧾 | Frais au-delà des obligations | — |
| `objectifs_realistes` | ✅ | Objectifs réalistes et connus | — |
| `criteres_objectifs` | 📏 | Critères objectifs | — |
| `ecrit` | ✍️ | Écrit | — |
| `motif_recours` | 📝 | Motif de recours précis | — |
| `terme` | 📅 | Terme précis | — |
| `repartition` | 🗓️ | Durée et répartition | — |
| `accord_collectif` | 📜 | Accord collectif | — |
| `convention_individuelle` | 🖋️ | Convention individuelle écrite | — |
| `autonomie` | 🧭 | Autonomie du salarié | — |
| `suivi_charge` | 📊 | Suivi de la charge | — |
| `cause_reelle` | 🎯 | Cause réelle et sérieuse | — |
| `motif_eco` | 📉 | Motif économique | — |
| `volonte_claire` | 🧠 | Volonté claire et non équivoque | — |
| `consentement_libre` | 🕊️ | Consentement libre | — |
| `manquement_suffisant` | 🚨 | Manquement grave de l'employeur | — |
| `motif_rupture_cdd` | 🗝️ | Cas de rupture anticipée autorisé | — |
| `condition` | ☑️ | Autre condition | — |

### 📌 Obligations

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `fournir_travail` | 🧰 | Fournir le travail convenu | — |
| `payer_salaire` | 💳 | Payer le salaire | — |
| `securite` | 🦺 | Obligation de sécurité | — |
| `adaptation` | 🧑‍🏫 | Adaptation et employabilité | — |
| `non_discrimination` | 🟰 | Égalité, non-discrimination | — |
| `respect_libertes` | 🗽 | Respect des libertés | — |
| `bonne_foi` | 🤲 | Exécution de bonne foi | — |
| `executer_travail` | 🛠️ | Exécuter le travail | — |
| `obeissance` | 📋 | Respecter les directives | — |
| `loyaute` | ⚓ | Loyauté | — |
| `discretion` | 🔇 | Discrétion | — |
| `securite_salarie` | ⛑️ | Veiller à la sécurité | — |
| `obligation` | 📌 | Autre obligation | — |

### ⚡ Fautes & manquements

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `manquement` | ⚡ | Manquement | — |
| `faute_simple` | 🟠 | Faute sérieuse | — |
| `faute_grave` | 🔥 | Faute grave | — |
| `faute_lourde` | ☠️ | Faute lourde | — |
| `harcelement` | 🛑 | Harcèlement | — |
| `insuffisance` | 📉 | Insuffisance professionnelle | — |

### 💔 Ruptures du contrat

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `demission` | 🚪 | Démission | `volonte_claire` |
| `licenciement_personnel` | 📤 | Licenciement pour motif personnel | `cause_reelle` ou `faute_simple` ou `faute_grave` ou `faute_lourde` ou `insuffisance`, `convocation` (risque), `entretien_prealable` (risque), `notification` ; ⊘ `garantie_emploi` |
| `licenciement_eco` | 🏚️ | Licenciement économique | `motif_eco`, `reclassement`, `consultation_cse` (risque), `convocation` (risque), `notification` ; ⊘ `garantie_emploi` |
| `licenciement_inaptitude` | 🏥 | Licenciement pour inaptitude | `avis_inaptitude`, `reclassement`, `notification` |
| `rupture_conventionnelle` | 🤝 | Rupture conventionnelle | `entretien_rc`, `convention_rc`, `retractation`, `homologation`, `consentement_libre` |
| `fin_cdd` | ⏹️ | Arrivée du terme du CDD | — |
| `rupture_anticipee_cdd` | ✂️ | Rupture anticipée du CDD | `motif_rupture_cdd` ou `faute_grave` ou `faute_lourde` |
| `rupture_essai` | 🚦 | Rupture de la période d'essai | `periode_essai`, `delai_prevenance` (risque) |
| `prise_acte` | 🚩 | Prise d'acte | `manquement_suffisant` ou `harcelement` |
| `resiliation_judiciaire` | 🔨 | Résiliation judiciaire | `manquement_suffisant` ou `harcelement` |
| `abandon_poste` | 🏃 | Abandon de poste | `mise_en_demeure` |
| `depart_retraite` | 👴 | Départ à la retraite | — |
| `rupture` | 💔 | Autre rupture | — |

### 🔹 Procédure

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `convocation` | ✉️ | Convocation | — |
| `entretien_prealable` | 💬 | Entretien préalable | — |
| `notification` | 📨 | Lettre de licenciement | — |
| `mise_a_pied` | ⏸️ | Mise à pied conservatoire | — |
| `sanction` | 🟥 | Sanction disciplinaire | — |
| `preavis` | 🔔 | Préavis | ⊘ `faute_grave`/`faute_lourde` |
| `entretien_rc` | 🗨️ | Entretien de rupture conventionnelle | — |
| `convention_rc` | 📑 | Signature de la convention | — |
| `retractation` | ↩️ | Délai de rétractation | — |
| `homologation` | 🔏 | Homologation | — |
| `mise_en_demeure` | 📬 | Mise en demeure | — |
| `reclassement` | 🔎 | Recherche de reclassement | — |
| `consultation_cse` | 📣 | Consultation du CSE | — |
| `avis_inaptitude` | 📋 | Avis d'inaptitude | — |
| `documents_fin` | 🗂️ | Documents de fin de contrat | — |
| `etape` | 🔹 | Autre étape | — |

### 🎁 Indemnités & droits

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `indemnite_licenciement` | 💵 | Indemnité de licenciement | ⊘ `faute_grave`/`faute_lourde` |
| `indemnite_preavis` | 💴 | Indemnité compensatrice de préavis | ⊘ `faute_grave`/`faute_lourde` |
| `indemnite_conges` | 🏖️ | Indemnité de congés payés | — |
| `indemnite_precarite` | 💷 | Indemnité de fin de CDD | ⊘ `faute_grave`/`faute_lourde`, ⊘ `cdi` |
| `indemnite_rc` | 💸 | Indemnité de rupture conventionnelle | — |
| `chomage` | ☂️ | Allocation chômage (ARE) | ⊘ `demission`, ⊘ `abandon_poste` |
| `dommages_interets` | 🩹 | Dommages-intérêts | — |
| `droit` | 🎁 | Autre droit | — |

### 📚 Normes

| Type | Icône | Libellé | Conditions vérifiées (garde-fous) |
|---|---|---|---|
| `code_travail` | 📕 | Code du travail | — |
| `convention_collective` | 📗 | Convention de branche | — |
| `accord_entreprise` | 📘 | Accord d'entreprise | — |
| `reglement_interieur` | 📙 | Règlement intérieur | — |
| `usage` | 🔂 | Usage d'entreprise | — |
| `norme` | 📚 | Autre norme | — |

## Conseils de rédaction

- 5 à 9 étapes ; chaque étape n'ajoute qu'une idée (une clause et ses garde-fous, une étape de procédure, une faute…).
- Montrez d'abord la clause **seule** (⛔ nulle, pastilles pointillées), puis ajoutez ses garde-fous un à un : la carte passe au vert sous les yeux de la classe.
- Pour une rupture, posez la rupture, puis sa chaîne de procédure (`puis` avec les délais en libellé), puis les droits ouverts (`ouvre`).
- Portez `anciennete`, `salaire` et `categorie` sur le salarié : les calculs les retrouvent.
- Utilisez `focus` et `note` pour guider le regard ; une bulle reste courte (environ 60 caractères).
- Quand l'outil ne sait pas représenter une règle, utilisez `condition` ou `statut` avec un texte, et expliquez dans le commentaire.
