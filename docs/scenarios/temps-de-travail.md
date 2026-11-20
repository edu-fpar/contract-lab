# Forfait jours, astreinte, temps partiel
> Trois aménagements du temps de travail, chacun avec ses conditions.

Le temps de travail est protégé par des règles d'ordre public (durées maximales, repos). Les aménagements qui s'en écartent sont permis, mais **sous conditions**.

## 1. Le forfait en jours de Marc
**Marc**, cadre autonome, signe une **convention de forfait** : 218 jours de travail par an, sans décompte horaire.

Quatre conditions : un **accord collectif** protecteur, une **convention individuelle écrite**, une réelle **autonomie** et un **suivi de la charge de travail**.

```scene
employeur EMP "Conseil & Data"
salarie MARC "Marc Dubois" categorie=cadre anciennete=5 salaire=4800
cdi CT "CDI de Marc"
EMP MARC -> CT
forfait_jours FJ "Forfait 218 jours"
CT -> FJ
accord_collectif ACC "Accord Syntec"
convention_individuelle CI "Convention de forfait signée"
autonomie AUT "Organise librement son agenda"
ACC CI AUT -> FJ
focus FJ
```
## Question : il manque une pastille. Que risque l'employeur ?
L'employeur n'a jamais organisé d'entretien sur la charge de travail de Marc, qui travaille souvent 60 heures par semaine.

```scene
verification off
focus FJ
```
- [ ] Rien : le forfait jours n'a pas d'horaire
  Le forfait dispense du décompte horaire, pas de la protection de la santé.
- [x] Le forfait est privé d'effet : Marc peut réclamer ses heures supplémentaires
  Sans suivi effectif de la charge de travail, la convention de forfait est privée d'effet.
- [ ] Le contrat de Marc est requalifié en CDD
  Aucun rapport : la sanction porte sur le forfait, pas sur la durée du contrat.

### Réponse
Sans **suivi effectif et régulier de la charge de travail**, la convention de forfait est **privée d'effet** : Marc revient aux 35 heures et peut réclamer le paiement de ses **heures supplémentaires**. Le manquement touche aussi l'**obligation de sécurité** de l'employeur.

```scene
verification on
note FJ "Privé d'effet : heures sup. dues"
```
## 3. Le suivi de la charge
L'employeur met en place un entretien annuel sur la charge de travail et un outil d'alerte : la convention produit ses effets.

```scene
suivi_charge SC "Entretien annuel + alerte"
SC -> FJ
focus FJ SC
```
## 4. Une astreinte le week-end
Marc doit être joignable un week-end par mois pour les incidents chez les clients. C'est une **astreinte** : seule l'intervention est du temps de travail effectif.

Elle donne droit à une **contrepartie** (financière ou en repos) et le salarié doit connaître sa programmation à l'avance.

```scene
astreinte AST "Astreinte week-end"
CT -> AST
contrepartie CPA "150 € par week-end"
delai_prevenance DPA "Planning 15 jours avant"
CPA DPA -> AST
focus AST
```
## 5. Le temps partiel d'Inès
**Inès** travaille à temps partiel. Son contrat doit être **écrit** et préciser la **durée** du travail et sa **répartition** entre les jours de la semaine. Sinon, il est **présumé à temps complet** (l'employeur peut renverser la présomption).

```scene
salarie INES "Inès Roche" categorie=employe
cdi CT2 "CDI d'Inès"
EMP INES -> CT2
temps_partiel TP "Temps partiel 20 h"
CT2 -> TP
ecrit EC2 "Contrat écrit"
EC2 -> TP
focus TP
note TP "Répartition manquante : présumé temps plein"
```
## 6. Synthèse
- **Forfait jours** : accord collectif + convention individuelle + autonomie + suivi de la charge.
- **Astreinte** : contrepartie + programmation connue à l'avance.
- **Temps partiel** : écrit + durée et répartition, sinon présomption de temps complet.

```scene
repartition REP "Lundi au jeudi après-midi"
REP -> TP
selection FJ
```