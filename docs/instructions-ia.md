# Instructions pour une IA : créer un scénario Contract Lab

> Page destinée aux assistants IA (ChatGPT, Claude, Gemini, Mistral, Copilot…). Enseignant : donnez l'adresse de cette page à votre IA, avec votre cours.
> Atelier : https://edu-fpar.github.io/contract-lab/ · Documentation : https://edu-fpar.github.io/contract-lab/docs/
> Cours de droit anglais (England & Wales) ou en anglais : utilisez la version anglaise, https://edu-fpar.github.io/contract-lab/docs/en/instructions-ia.md

## Ta mission

L'enseignant te fournit un support de cours de droit du travail ou de ressources humaines (texte, PDF, diapositives, notes, cas pratique). Tu produis un **scénario markdown** que l'atelier Contract Lab jouera en mode « cinéma » : à chaque étape, un commentaire s'affiche et des commandes construisent un schéma — un contrat et ses clauses, les garde-fous qui les conditionnent, les obligations des parties, une rupture et sa procédure, les indemnités — que l'outil vérifie (✅ valide, ⚠️ à risque, ⛔ nulle ou irrégulière, ⚡ obligation violée).

1. **Choisis ce qui se représente.** Retiens les notions qui se traduisent en éléments reliés : clauses et leurs garde-fous (conditions cumulatives de validité), formalités d'un contrat (écrit, motif, terme), incompatibilités (faute grave et préavis, exclusivité et temps partiel, démission et chômage…), obligations et manquements, ruptures et procédures, indemnités et calculs (essai, CDD, préavis, indemnité légale, rupture conventionnelle, prime de précarité). Ce que l'outil ne sait pas juger (appréciation des faits par le juge, conventions collectives particulières, délais réels, barème des dommages-intérêts…) va dans le commentaire, dans une bulle (`note`) ou dans un verdict imposé (`statut`), jamais sous forme d'un faux garde-fou qui ferait passer une carte au vert. Si l'essentiel du support ne se représente pas, dis-le à l'enseignant plutôt que de forcer.
2. **Construis la progression.** 5 à 9 étapes, une idée par étape, du simple au complexe : montre d'abord une clause seule (⛔ nulle, garde-fous manquants), puis ajoute ses garde-fous un à un ; pour une rupture, la rupture, puis sa procédure, puis les droits ouverts. Reprends les exemples, noms et chiffres du support. Ajoute une ou deux **étapes questions** juste avant l'étape qui expliquerait la notion, avec des mauvais choix plausibles et une explication pour chaque choix. Chaque question commence par `verification off` (sinon les verdicts affichés donnent la réponse) et sa section « ### Réponse » rétablit `verification on`.
3. **Écris le scénario** en respectant exactement le format décrit plus bas. Déclare chaque élément avant de le relier ; relie chaque garde-fou à la clause qu'il conditionne ; porte `categorie`, `anciennete` et `salaire` sur le salarié. Donne les calculs dans le texte (« 2 400 € × 3 × 1/4 = 1 800 € ») : l'outil affichera les mêmes valeurs.
4. **Vérifie que les verdicts annoncés correspondent aux règles** de l'annexe 2 : une condition est remplie si un élément du type attendu est relié directement, dans la même chaîne « puis », ou attaché au contrat qui contient la clause ; les incompatibilités jouent dans tout le dossier (éléments reliés de proche en proche, hors parties et normes) ; une obligation reliée à un manquement est violée ; un verdict imposé par `statut` reste visible même en `verification off`. Si l'outil devait afficher autre chose que ton texte, corrige le texte ou les données.
5. **Reste exact juridiquement.** Ne cite un article du Code du travail ou une décision de jurisprudence que s'il figure dans le support ou si tu en es certain ; sinon, décris la règle sans numéro. Ne donne pas de durée, de délai ou de montant non vérifié. Signale les simplifications dans une citation « > ⚠️ ».

## Ta réponse

- **Un seul bloc de code** contenant le scénario complet, qui commence par « # Titre ». Comme le scénario contient lui-même des blocs ```scene, entoure-le d'un bloc à quatre accents graves (````markdown … ````), ou écris les blocs de commandes avec ~~~scene.
- Puis, hors du bloc, quelques lignes pour l'enseignant : le plan des étapes, et ce qu'il doit relire (références ajoutées par toi, simplifications, verdicts imposés, notions laissées de côté).
- Rappelle-lui comment l'utiliser : atelier Contract Lab → 🎬 Cinéma → 📚 Scénarios → coller le markdown → Lancer. Le bouton 🔗 Partager donne ensuite un lien à transmettre aux élèves.

---

# Annexe 1 — Format des scénarios « cinéma »

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


---

# Annexe 2 — Règles de vérification

Cette page décrit ce que vérifie et calcule le moteur (`js/model.js`) et ce qu'il ne représente pas. Elle sert aussi de référence à la skill de génération de scénarios : le commentaire d'un scénario doit annoncer les mêmes verdicts que l'outil.

## Éléments et verdicts

Chaque carte est un **élément** d'un type du catalogue (voir le [format des scénarios](format-scenario.md#catalogue-des-types)), rangé dans une famille : parties, contrats, clauses, garde-fous et conditions, obligations, fautes et manquements, ruptures, procédure, indemnités et droits, normes.

Après chaque modification, l'outil vérifie tous les éléments et donne à chacun un **statut** :

| Statut | Icône | Quand |
|---|---|---|
| valide | ✅ | l'élément a des conditions de validité, et elles sont toutes remplies |
| à risque | ⚠️ | il manque au moins une condition de niveau « risque », aucune de niveau « grave » |
| nulle / irrégulière | ⛔ | il manque une condition de niveau « grave », la clause est illicite par nature, un élément incompatible est dans le dossier, ou un calcul révèle un dépassement |
| violée | ⚡ | obligation reliée à une faute ou à un manquement |
| sans verdict | — | élément sans condition ni problème (une partie, une norme, un garde-fou, une étape de procédure…) |

Le **texte du verdict** est l'effet juridique du premier problème grave (sinon du premier problème de niveau risque) : « nulle », « requalification en CDI », « présumé conclu à temps complet », « inopposable au salarié », « non due en cas de faute grave ou lourde »… Quand tout est rempli, le texte est « valide » pour une clause, « régulière » pour une rupture, « conditions remplies » pour un contrat, sauf pour quelques ruptures dont le texte est propre :

| Rupture | Verdict quand la condition est remplie | Verdict sinon |
|---|---|---|
| Rupture anticipée du CDD | rupture anticipée autorisée | dommages-intérêts au moins égaux aux salaires restant à courir |
| Prise d'acte | justifiée : effets d'un licenciement sans cause réelle et sérieuse | produit les effets d'une démission |
| Résiliation judiciaire | prononcée : effets d'un licenciement sans cause réelle et sérieuse | rejetée : le contrat se poursuit |
| Abandon de poste | présumé démissionnaire | présomption de démission inapplicable |

Ordre de priorité : un verdict **imposé** par le scénario (`statut`) l'emporte sur tout ; puis une obligation **violée** ; puis les problèmes graves, puis les problèmes de niveau risque.

## Garde-fous : les conditions de validité

Beaucoup de types ont des **conditions de validité** (colonne de droite du catalogue). Chacune attend un élément d'un ou plusieurs types, avec un niveau et un effet si elle manque. Exemples :

| Élément | Conditions | Si une condition manque |
|---|---|---|
| Non-concurrence | intérêt légitime, limite dans le temps, limite dans l'espace, spécificités de l'emploi, contrepartie financière | ⛔ nulle |
| CDD | écrit, motif de recours précis, terme précis | ⛔ requalification en CDI |
| Temps partiel | écrit, durée et répartition | ⛔ présumé conclu à temps complet |
| Période d'essai | écrit | ⛔ inopposable au salarié |
| Mobilité | zone géographique précise (grave) ; intérêt légitime, délai de prévenance (risque) | ⛔ nulle / ⚠️ mise en œuvre abusive |
| Licenciement pour motif personnel | cause réelle et sérieuse (ou une faute, ou une insuffisance professionnelle), lettre de licenciement (graves) ; convocation, entretien préalable (risque) | ⛔ sans cause réelle et sérieuse / ⚠️ irrégularité de procédure |
| Rupture conventionnelle | entretien, convention, rétractation, homologation, consentement libre | ⛔ nulle, ou sans effet sans homologation |

Une condition peut accepter plusieurs types : « cause réelle et sérieuse » est remplie par un garde-fou `cause_reelle`, mais aussi par une `faute_simple`, une `faute_grave`, une `faute_lourde` ou une `insuffisance` reliée au licenciement.

Sous la carte, chaque condition est une **pastille** (sept au plus) : verte si elle est remplie, en pointillés rouges (grave) ou orange (risque) si elle manque. La checklist de l'inspecteur indique en plus l'élément qui remplit la condition (« via … ») ou l'effet si elle manque (« Sinon : … »).

### Contexte d'une condition

Une condition est remplie si un élément du type attendu se trouve dans le **contexte** de l'élément vérifié. Le contexte comprend :

1. **les éléments reliés directement**, quel que soit le sens et le type de la relation (sauf `exclut`) : `contrepartie CP` relié à `non_concurrence NC` ;
2. **la chaîne de procédure** : tous les éléments reliés par `puis` à l'élément lui-même ou à l'un de ses voisins directs, même éloignés dans la chaîne. Dans `licenciement LIC -> CONV`, `CONV -> ENT puis`, `ENT -> LET puis`, la convocation, l'entretien et la lettre comptent tous pour le licenciement ;
3. **les formalités du contrat** : si l'élément est relié directement à un contrat (la clause qu'il contient, la rupture qui y met fin), les clauses de ce contrat (`contient`) et les garde-fous reliés au contrat lui-même (`limite`) comptent aussi. Un `ecrit` relié au CDI vaut donc pour la période d'essai qu'il contient ; une `rupture_essai` reliée au contrat trouve la `periode_essai` qu'il contient.

Conséquence : reliez les garde-fous **à la clause** qu'ils conditionnent. Un garde-fou relié au contrat vaut pour toutes ses clauses ; c'est voulu pour l'écrit, mais une contrepartie reliée au contrat validerait aussi la non-concurrence.

Une condition n'a pas besoin d'être « bien » reliée pour être remplie : l'outil vérifie la présence d'un élément du bon type, pas son contenu. Une contrepartie dérisoire ou une zone de mobilité vague comptent comme présentes ; c'est au commentaire (ou à `statut`) de dire ce que jugerait le juge.

### Conditions libres

La commande `condition ID "Libellé" ok|manque [risque] ["effet"]` ajoute une condition propre à l'élément, affichée en pastille comme les autres. Une condition libre manquante produit un problème grave (ou de niveau risque avec `risque`), avec l'effet indiqué (par défaut « condition non remplie »).

## Clauses illicites par nature

Trois clauses sont toujours ⛔, quels que soient les garde-fous reliés :

| Clause | Verdict |
|---|---|
| Rupture automatique (`clause_resolutoire`) | nulle : aucune clause ne peut décider à l'avance qu'un fait constituera une cause de licenciement |
| Restriction de la vie privée (`clause_vie_privee`) | nulle : atteinte injustifiée et disproportionnée aux droits et libertés du salarié |
| Clause discriminatoire (`clause_discriminatoire`) | nulle : discrimination prohibée |

## Dossier et incompatibilités

### Le dossier

Un **dossier** est l'ensemble des éléments reliés entre eux, de proche en proche, **sans passer par les parties ni les normes**. Un salarié qui signe deux contrats, ou une convention collective qui encadre plusieurs contrats, ne les fusionne donc pas en un seul dossier. Les liens `exclut` ne relient pas non plus les dossiers.

Exemple : `faute_grave FG -> LIC` (justifie), `LIC -> PRE` (puis), `LIC -> IND` (ouvre) forment un seul dossier : la faute grave, le licenciement, le préavis et l'indemnité.

### Incompatibilités

Certains types sont **neutralisés** quand un élément d'un autre type se trouve dans le **même dossier** (⊘). Le lien n'a pas besoin d'être direct. Quand la vérification est active, l'outil trace un lien rouge en pointillés entre les deux éléments.

| Élément | Neutralisé par | Effet |
|---|---|---|
| Exclusivité | temps partiel | ⛔ en principe inopposable au salarié à temps partiel |
| Dédit-formation | licenciement (personnel, économique, inaptitude), rupture de la période d'essai | ⛔ inapplicable : la rupture n'est pas le fait du salarié |
| Licenciement personnel ou économique | garantie d'emploi | ⚠️ salaires restant dus jusqu'au terme de la garantie |
| Préavis | faute grave, faute lourde | ⛔ non dû |
| Indemnité de licenciement | faute grave, faute lourde | ⛔ non due |
| Indemnité compensatrice de préavis | faute grave, faute lourde | ⛔ non due |
| Indemnité de fin de CDD | faute grave, faute lourde ; CDI | ⛔ non due (faute grave ; la relation se poursuit en CDI) |
| Allocation chômage | démission (⚠️) ; abandon de poste (⛔) | pas d'ARE (sauf démission légitime ou projet de reconversion) ; salarié présumé démissionnaire |

L'**indemnité de congés payés** n'a aucune incompatibilité : elle reste due même en cas de faute lourde.

Un lien explicite `A -> B exclut "effet"` neutralise B (⛔, avec le libellé du lien comme effet) si A et B sont dans le même dossier par ailleurs.

Attention aux dossiers trop larges : si un CDD et le CDI qui lui succède sont reliés, la prime de précarité passe en ⛔ (« la relation se poursuit en CDI ») ; c'est juste quand le scénario veut le montrer, faux sinon. Gardez séparés les dossiers qui doivent l'être.

## Obligations violées

Une **obligation** reliée directement à un élément de la famille « fautes et manquements » (`manquement`, `faute_simple`, `faute_grave`, `faute_lourde`, `harcelement`, `insuffisance`) passe en ⚡ **violée**, et l'inspecteur indique par quoi. Le lien se crée naturellement : `manquement M -> OBL` (relation `viole`).

Le manquement lui-même n'a pas de verdict. Pour qu'il produise un effet sur une rupture, reliez-le aussi à la rupture : un `harcelement` relié à une prise d'acte remplit sa condition « manquement grave de l'employeur ».

## Calculs

Les données chiffrées se donnent avec `cle=valeur`. Un calcul cherche d'abord la donnée sur l'élément lui-même, puis sur les éléments de son dossier ou reliés directement, puis sur les parties reliées au dossier : il suffit donc de porter `categorie`, `anciennete` et `salaire` sur le salarié qui signe le contrat. Les nombres acceptent l'espace, la virgule et une unité (`3 200`, `2,5`, `4 ans`, `2400€`).

| Donnée | Clé | Valeurs |
|---|---|---|
| Catégorie du salarié | `categorie` | `ouvrier`, `employe`, `technicien`, `agent_maitrise`, `cadre` |
| Ancienneté | `anciennete` | en années (décimales possibles : `0.5` = 6 mois) |
| Salaire de référence | `salaire` | mensuel brut, en euros |
| Durée | `duree` | en mois (période d'essai, renouvellement, CDD) |
| Montant | `montant` | en euros (indemnité de rupture conventionnelle) |
| Rémunération totale du CDD | `remuneration_totale` | brute, en euros (prime de précarité) |

### Période d'essai

Si la durée et la catégorie sont connues, et qu'aucun CDD n'est dans le dossier, l'outil compare la durée au maximum légal en CDI :

| Catégorie | Période initiale | Renouvellement compris |
|---|---|---|
| ouvrier, employé | 2 mois | 4 mois |
| agent de maîtrise, technicien | 3 mois | 6 mois |
| cadre | 4 mois | 8 mois |

Au-delà : ⛔ « durée excessive : ramenée à N mois au plus ». Le maximum « renouvellement compris » s'applique à la `duree` portée par l'élément `renouvellement_essai`. Dans un CDD, la durée est seulement affichée (« CDD : règles propres »).

### CDD

Une `duree` supérieure à **18 mois** (cas général, renouvellements compris) donne ⛔ « requalification en CDI ».

### Préavis de licenciement

Si l'ancienneté est connue et qu'un licenciement est dans le dossier, l'outil affiche le préavis légal : moins de 6 mois d'ancienneté, « convention ou usage » ; de 6 mois à moins de 2 ans, **1 mois** ; 2 ans et plus, **2 mois**. C'est un affichage, pas une condition.

### Indemnité légale de licenciement

> indemnité = salaire × (1/4 × années jusqu'à 10 + 1/3 × années au-delà de 10)

Exemples : 2 400 € et 3 ans d'ancienneté donnent 2 400 × 3/4 = **1 800 €** ; 3 000 € et 12 ans donnent 3 000 × (10/4 + 2/3) = **9 500 €**. L'inspecteur affiche le montant (« montant légal ≈ … ») et le détail de la formule.

Avec moins de **8 mois** d'ancienneté, l'indemnité de licenciement passe en ⛔ « non due : moins de 8 mois d'ancienneté ».

### Indemnité de rupture conventionnelle

Même formule, affichée comme **minimum légal**. Si l'élément porte un `montant` inférieur à ce minimum, il passe en ⛔ « inférieure au minimum légal : homologation refusée ». La condition des 8 mois ne s'applique pas ici.

### Prime de précarité

Avec `remuneration_totale`, l'outil affiche 10 % de ce montant. Le taux de 6 % prévu par accord n'est pas calculé.

## Verdict imposé : `statut` et `condition`

Quand l'outil ne connaît pas une règle, ou qu'une appréciation du juge change la réponse, le scénario impose le résultat :
- `statut ID nulle "texte"` (ou `valide`, `risque`, `violee`, `neutre`) remplace le verdict calculé, avec le texte donné ; `statut ID auto` revient au calcul. L'inspecteur précise « verdict fixé par le scénario ». **Un verdict imposé reste visible même avec `verification off`** : ne l'imposez pas avant une question dont il donnerait la réponse ;
- `condition ID "Libellé" manque "effet"` ajoute une pastille et un problème, sans toucher aux autres conditions.

## Vérification masquée

`verification off` (ou la case 🔍 Vérification décochée) masque les verdicts, les pastilles et les liens d'incompatibilité tracés automatiquement ; les cartes restent neutres et la checklist affiche ❔. Les calculs restent affichés dans l'inspecteur. `verification on` rétablit l'affichage.

## Ce que l'outil ne représente pas

- **L'appréciation des faits par le juge** : caractère réel et sérieux d'un motif, gravité d'une faute, contrepartie dérisoire, zone de mobilité trop vague, objectifs irréalistes, abus dans la rupture de l'essai, gravité du manquement dans une prise d'acte. L'outil vérifie la présence d'un garde-fou, pas sa qualité ;
- **les conventions collectives particulières** : durées d'essai, préavis et indemnités conventionnels plus favorables, minima de branche. Les calculs suivent les seules règles légales ;
- **les délais réels** : prescription des faits fautifs (2 mois), 5 jours ouvrables avant l'entretien, 15 jours de rétractation, délai d'homologation, délai de prévenance de l'essai… Ils peuvent être écrits en libellé sur un lien (`puis "5 jours ouvrables"`), mais ne sont ni comptés ni contrôlés ;
- **le barème des dommages-intérêts** pour licenciement sans cause réelle et sérieuse, l'indemnité de départ à la retraite, le calcul du salaire de référence (moyenne des 12 ou 3 derniers mois), les congés payés acquis ;
- **les cas de recours au CDD** et leurs durées maximales particulières, le délai de carence, le nombre de renouvellements ;
- **les statuts particuliers** : salariés protégés, femmes enceintes, accidents du travail, apprentis, ainsi que les règles du licenciement économique collectif (PSE, ordre des licenciements) ;
- **les dates** : l'outil ne sait pas si une période d'essai est en cours ni si un délai est expiré.

Dans ces cas, le canevas montre les éléments en présence, `statut` ou `condition` fixent le verdict voulu, et le commentaire porte l'analyse.


---

# Annexe 3 — Exemple complet

Un scénario réel de l'atelier (la clause de non-concurrence), avec une étape question précédée de `verification off` :

````markdown
# La clause de non-concurrence
> Cinq garde-fous cumulatifs : sans l'un d'eux, la clause est nulle.

Une clause de non-concurrence interdit au salarié, **après la rupture**, d'exercer une activité concurrente. Elle restreint la **liberté du travail** : la jurisprudence l'encadre strictement (Cass. soc., 10 juillet 2002).

Regardez les **pastilles** sous la clause : chaque garde-fou manquant est en pointillés.

## 1. Le contrat de Karim, commercial
Karim est commercial chez **Optique Durand**, à Nantes. Son contrat contient une clause qui lui interdit de travailler pour un concurrent après son départ.

Telle quelle, la clause est **nulle** : aucun de ses cinq garde-fous n'est présent.

```scene
employeur EMP "Optique Durand"
salarie KAR "Karim Benali" categorie=employe anciennete=3 salaire=2400
cdi CT "CDI de Karim"
EMP KAR -> CT
fonctions FCT "Commercial terrain"
non_concurrence NC "Non-concurrence"
CT -> FCT NC
focus NC
note NC "5 pastilles en pointillés : 5 garde-fous manquants"
```
## 2. Un intérêt légitime à protéger
Premier garde-fou : la clause doit être **indispensable à la protection des intérêts légitimes** de l'entreprise. Karim connaît la clientèle et les tarifs : l'intérêt est réel.

Pour un agent d'entretien sans contact avec les clients, la même clause serait nulle.

```scene
interet_legitime IL "Clientèle et tarifs"
IL -> NC
focus IL NC
```
## 3. Limitée dans le temps et dans l'espace
La clause doit être **limitée dans le temps** et **dans l'espace**.

Ici : **1 an** après le départ, en **Loire-Atlantique**. Une interdiction « pour toujours » ou « dans toute la France » pour un commercial régional serait disproportionnée.

```scene
limite_duree LD "1 an"
limite_geo LG "Loire-Atlantique"
LD LG -> NC
focus LD LG
```
## 4. Les spécificités de l'emploi
La clause doit **tenir compte des spécificités de l'emploi** : Karim doit pouvoir retrouver un travail conforme à sa formation et à son expérience. On limite donc l'interdiction à la **vente de lunettes en magasin concurrent** — il peut travailler dans un autre secteur commercial.

Il reste un garde-fou manquant…

```scene
specificites SP "Vente d'optique seulement"
SP -> NC
focus NC
```
## Question : quel est le garde-fou manquant ?
Quatre pastilles sont vertes. La clause est toujours nulle.

```scene
verification off
focus NC
```
- [ ] L'accord écrit de Karim
  Il a signé le contrat ; ce n'est pas l'un des cinq critères jurisprudentiels.
- [x] Une contrepartie financière
  Depuis 2002, une clause de non-concurrence sans contrepartie financière est nulle.
- [ ] L'homologation par l'inspection du travail
  Aucune homologation n'est prévue pour cette clause.
- [ ] Une durée inférieure à 6 mois
  Il n'y a pas de durée maximale légale : la durée doit être raisonnable.

### Réponse
Le cinquième garde-fou est la **contrepartie financière**, versée **après la rupture**, quel que soit le mode de rupture (démission, licenciement, même pour faute grave). Elle ne doit pas être dérisoire.

La carte passe au vert : la clause est valable.

```scene
verification on
contrepartie CP "30 % du salaire pendant 1 an"
CP -> NC
focus NC CP
```
## 6. Et la clause de confidentialité ?
Le contrat contient aussi une **clause de confidentialité** : Karim ne doit pas divulguer les fichiers clients ni les marges.

Aucune pastille : elle n'exige **pas de contrepartie**. Elle n'empêche pas Karim de travailler chez un concurrent ; elle lui interdit seulement de divulguer des informations.

> 💡 Ne confondez pas : la **non-concurrence** empêche de travailler (contrepartie obligatoire), la **confidentialité** empêche de divulguer (pas de contrepartie).

```scene
confidentialite CONF "Confidentialité"
CT -> CONF
focus CONF NC
```
## 7. Synthèse
| Garde-fou | Ici |
|---|---|
| 🏰 Intérêt légitime de l'entreprise | clientèle et tarifs |
| ⌛ Limite dans le temps | 1 an |
| 🗺️ Limite dans l'espace | Loire-Atlantique |
| 🧩 Spécificités de l'emploi | vente d'optique seulement |
| 💰 Contrepartie financière | 30 % du salaire pendant 1 an |

Les conditions sont **cumulatives**. Une clause nulle ne s'impose pas au salarié ; s'il l'a respectée, il peut demander des dommages-intérêts.

```scene
selection NC
```
````
