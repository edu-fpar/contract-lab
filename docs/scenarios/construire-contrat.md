# Construire un contrat de travail
> Les parties, le socle du contrat, la période d'essai : un CDI se monte pièce par pièce.

On assemble le contrat de **Léa Martin**, embauchée comme responsable marketing par la société **Bleu Ciel**. Chaque clause est une carte ; le cadre « 📄 » délimite ce que contient le contrat.

Les verdicts s'affichent sur les cartes : ✅ valide, ⚠️ à risque, ⛔ nulle. Les **pastilles** sous une carte sont ses conditions de validité.

## 1. Deux parties et un lien de subordination
Le contrat de travail réunit trois éléments : une **prestation de travail**, une **rémunération** et un **lien de subordination** — le pouvoir de l'employeur de donner des ordres, d'en contrôler l'exécution et de sanctionner les manquements.

Peu importe le nom que les parties donnent à leur relation : c'est la réalité du lien de subordination qui compte.

```scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin" categorie=cadre anciennete=0 salaire=3400
focus EMP LEA
```
## 2. Un CDI, forme normale du contrat
Le **CDI** est la forme normale et générale de la relation de travail. Les deux parties le **signent**.

Pour un CDI à temps plein, l'écrit n'est pas obligatoire… mais l'employeur doit remettre au salarié les **informations principales** de la relation de travail. En pratique, on écrit toujours.

```scene
cdi CT "CDI de Léa"
EMP LEA -> CT
ecrit EC "Contrat écrit et signé"
EC -> CT
focus CT
```
## 3. Le socle du contrat
Quatre éléments forment le **socle contractuel** :

| Élément | Ce qu'on ne peut pas faire sans l'accord de Léa |
|---|---|
| 💶 Rémunération | la modifier, même de façon minime |
| 🧑‍💼 Fonctions | changer substantiellement ses fonctions |
| ⏱️ Durée du travail | modifier la durée contractuelle |
| 📍 Lieu de travail | la muter hors du secteur géographique |

> 💡 Modifier un élément du contrat exige l'**accord** du salarié. Un simple **changement des conditions de travail** (horaires, tâches de même qualification) relève du pouvoir de direction.

```scene
remuneration REM "3 400 € brut / mois"
fonctions FCT "Responsable marketing"
duree_travail DUR "35 h / semaine"
lieu_travail LIEU "Lyon"
CT -> REM FCT DUR LIEU
focus REM FCT DUR LIEU
```
## 4. Une période d'essai… trop longue
Le contrat prévoit une **période d'essai de 5 mois**. Elle est bien écrite (la pastille ✍️ est verte : l'écrit du contrat compte pour la clause).

Mais Léa est **cadre** : en CDI, la durée maximale légale est de **4 mois** (2 mois pour les ouvriers et employés, 3 pour les agents de maîtrise et techniciens). L'outil le signale en rouge.

```scene
periode_essai ESS "Période d'essai" duree=5
CT -> ESS
focus ESS
note ESS "5 mois > 4 mois : durée excessive"
```
## Question : que faut-il faire pour garder 5 mois d'essai ?
Le directeur des ressources humaines tient à ses 5 mois d'essai.

```scene
focus ESS
```
- [ ] Rien : Léa a signé, la clause s'applique
  La durée maximale est d'ordre public : la signature ne la rend pas valable.
- [ ] Prévoir 4 mois, renouvelables une fois si le contrat le dit
  C'est presque ça : le contrat ne suffit pas, il faut aussi un accord de branche étendu et l'accord exprès de Léa.
- [x] Prévoir 4 mois, renouvelables si un accord de branche étendu et le contrat le prévoient, avec l'accord exprès de Léa
  Les trois conditions sont cumulatives ; la durée totale ne dépasse pas 8 mois pour un cadre.
- [ ] Remplacer l'essai par un CDD de 5 mois
  Un CDD ne peut servir à « tester » un salarié : il serait requalifié en CDI.

### Réponse
On ramène l'essai à **4 mois** et on prévoit un **renouvellement**, possible une seule fois si :
- un **accord de branche étendu** le prévoit ;
- le **contrat** le stipule ;
- le salarié donne son **accord exprès**, avant la fin de la période initiale.

Durée totale maximale pour un cadre : **8 mois**, renouvellement compris.

```scene
param ESS duree=4
renouvellement_essai REN "Renouvellement : 5 mois au total" duree=5
CT -> REN
accord_collectif ACC "Accord de branche étendu"
accord_salarie ACS "Accord de Léa au 3e mois"
ACC ACS -> REN
focus ESS REN
```
## 6. Synthèse
Le contrat de Léa est complet et tout est au vert.

À retenir :
- trois critères du contrat de travail : **travail**, **rémunération**, **subordination** ;
- le **socle** du contrat ne se modifie qu'avec l'accord du salarié ;
- la **période d'essai** ne se présume pas (écrit) et ses durées maximales sont d'ordre public ;
- le **renouvellement** exige accord de branche étendu + contrat + accord exprès du salarié.

Cliquez sur une carte pour voir ses conditions de validité.

```scene
selection REN
```