# Règles de vérification

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
