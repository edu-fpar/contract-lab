# Mobilité, exclusivité, dédit-formation
> Trois clauses utiles à l'employeur, trois jeux de garde-fous, et des incompatibilités.

Certaines clauses donnent à l'employeur un pouvoir sur la vie du salarié. Le droit les admet, mais **sous conditions** : sans elles, la clause est nulle ou inopposable. Et certaines clauses deviennent **incompatibles** avec d'autres éléments du dossier (⊘).

## 1. La clause de mobilité
**Sofia**, technicienne de maintenance, signe un CDI avec une **clause de mobilité**. L'employeur pourra la muter… mais où ?

Une clause de mobilité doit **définir précisément sa zone géographique**, que l'employeur ne peut pas étendre seul. « Tout lieu où l'entreprise exerce ou exercera une activité » : nulle.

```scene
employeur EMP "Hydro Services"
salarie SOF "Sofia Lemaire" categorie=technicien anciennete=2 salaire=2600
cdi CT "CDI de Sofia"
EMP SOF -> CT
mobilite MOB "Mobilité"
CT -> MOB
focus MOB
```
## 2. Une zone précise… et une mise en œuvre loyale
On précise : « **Bretagne et Pays de la Loire** ». La clause est maintenant valable (pastille 📌 verte).

Les deux autres pastilles sont orange : même valable, la clause doit être **mise en œuvre de bonne foi**, dans l'**intérêt de l'entreprise** et avec un **délai de prévenance** suffisant. Une mutation à 300 km annoncée la veille serait abusive.

> 💡 Le refus d'une mutation conforme à une clause de mobilité valable peut justifier un licenciement.

```scene
zone_definie ZD "Bretagne + Pays de la Loire"
ZD -> MOB
focus MOB ZD
```
## 3. Une mise en œuvre régulière
L'employeur explique la mutation (ouverture d'un site à Rennes) et prévient Sofia un mois à l'avance : tout est vert.

```scene
interet_legitime IL "Ouverture d'un site à Rennes"
delai_prevenance DP "1 mois de prévenance"
IL DP -> MOB
focus MOB IL DP
```
## 4. L'exclusivité… pour une salariée à temps partiel
Le contrat de **Sofia** devient un **temps partiel** (24 h par semaine) et l'employeur ajoute une **clause d'exclusivité** : aucune autre activité professionnelle.

Le symbole ⊘ apparaît : une salariée à temps partiel doit pouvoir **compléter ses revenus**. La clause d'exclusivité lui est, en principe, **inopposable**.

```scene
temps_partiel TP "Temps partiel 24 h"
ecrit EC "Avenant écrit"
repartition REP "Lundi au mercredi"
CT -> TP
EC REP -> TP
exclusivite EXC "Exclusivité"
CT -> EXC
interet_legitime IE "Savoir-faire technique"
proportionnalite PE "Justifiée par la tâche"
IE PE -> EXC
focus EXC TP
note EXC "Temps partiel : en principe inopposable"
```
## 5. Le dédit-formation
L'employeur finance à Sofia une **habilitation électrique haute tension** de 6 000 €. En échange, une clause de **dédit-formation** : si elle démissionne dans les 2 ans, elle rembourse une partie des frais.

La clause est licite si :
- elle est **écrite avant** la formation (date, nature, durée, coût réel, modalités de remboursement) ;
- les frais **dépassent** ce que la loi ou la convention collective impose à l'employeur ;
- le remboursement est **proportionné** (et dégressif dans le temps).

```scene
retirer EXC IE PE
dedit_formation DF "Dédit-formation 2 ans"
CT -> DF
ecrit EDF "Convention signée avant la formation"
formation_couteuse FC "6 000 € de frais réels"
proportionnalite PR "Remboursement dégressif"
EDF FC PR -> DF
focus DF
```
## Question : Sofia est licenciée un an plus tard. Doit-elle rembourser ?
L'employeur la licencie pour motif économique et lui réclame 3 000 € au titre du dédit-formation.

```scene
verification off
licenciement_eco LE "Licenciement économique"
EMP -> LE
LE -> CT
focus DF LE
```
- [ ] Oui, la clause est valable
  Elle est valable… mais elle ne joue que si le salarié part de lui-même.
- [x] Non, la rupture n'est pas de son fait
  Le dédit-formation ne s'applique pas quand c'est l'employeur qui rompt le contrat.
- [ ] Oui, mais seulement la moitié
  La proportionnalité règle le montant quand la clause s'applique ; ici, elle ne s'applique pas.

### Réponse
Le dédit-formation compense un **départ volontaire** du salarié. En cas de **licenciement**, la rupture n'est pas le fait du salarié : la clause est **inapplicable** (⊘).

```scene
verification on
focus DF LE
```
## 7. Synthèse
| Clause | Garde-fous | Incompatible avec |
|---|---|---|
| 🧳 Mobilité | zone précise ; mise en œuvre loyale, délai de prévenance | — |
| 🔒 Exclusivité | intérêt légitime, justifiée et proportionnée | ⊘ temps partiel |
| 🎒 Dédit-formation | écrit préalable, frais au-delà des obligations, montant proportionné | ⊘ licenciement |

```scene
vue CT
```