# Le CDD, un contrat d'exception
> Écrit, motif, terme : sans eux, le CDD devient un CDI.

Le **CDD** ne peut avoir ni pour objet ni pour effet de pourvoir durablement un emploi lié à l'activité normale et permanente de l'entreprise. Il est donc **strictement encadré** ; la sanction est la **requalification en CDI**.

## 1. Un CDD conclu à la va-vite
Le magasin **Jardin Malin** embauche **Tom** pour la saison de printemps. Personne n'a rédigé de contrat.

Trois pastilles rouges : sans écrit, sans motif, sans terme, le contrat est **requalifié en CDI**.

```scene
employeur EMP "Jardin Malin"
salarie TOM "Tom Girard" categorie=employe anciennete=0.5 salaire=1900
cdd CT "CDD de Tom"
EMP TOM -> CT
focus CT
note CT "Sans écrit : CDI !"
```
## 2. Écrit, motif précis, terme
On régularise :
- un **contrat écrit**, transmis au salarié ;
- un **motif précis** : accroissement temporaire d'activité (saison de printemps) ;
- un **terme précis** : du 1er mars au 30 juin.

```scene
ecrit EC "Contrat écrit"
motif_recours MR "Accroissement saisonnier"
terme TE "1er mars – 30 juin"
EC MR TE -> CT
param CT duree=4
focus CT
```
## Question : le magasin renouvelle le CDD jusqu'à atteindre 20 mois. Que risque-t-il ?
Après la saison, le magasin renouvelle, puis renouvelle encore : Tom travaille 20 mois en CDD.

```scene
verification off
param CT duree=20
focus CT
```
- [ ] Rien, tant que chaque renouvellement est écrit
  Les renouvellements écrits ne permettent pas de dépasser la durée maximale.
- [x] La requalification du contrat en CDI
  Dans le cas général, la durée maximale est de 18 mois, renouvellements compris.
- [ ] Une simple amende
  La sanction civile est la requalification, demandée devant le conseil de prud'hommes.

### Réponse
Durée maximale d'un CDD, renouvellements compris : **18 mois** dans le cas général (avec des exceptions et des aménagements par accord de branche). Au-delà, Tom peut demander la **requalification en CDI**, avec une indemnité de requalification d'au moins un mois de salaire.

```scene
verification on
note CT "20 mois > 18 mois"
```
## 4. Fin du CDD et prime de précarité
On revient à un CDD de 4 mois. À son terme, le contrat prend fin **de plein droit**, sans procédure.

Tom perçoit l'**indemnité de fin de contrat** (« prime de précarité ») : **10 %** de la rémunération brute totale. Ici : 4 × 1 900 € = 7 600 € → **760 €**.

```scene
param CT duree=4
fin_cdd FIN "Terme du CDD"
FIN -> CT
indemnite_precarite PREC "Prime de précarité" remuneration_totale=7600
indemnite_conges ICP "Congés non pris"
FIN -> PREC ICP
focus FIN PREC
```
## 5. Quand la prime n'est pas due
Si la relation **se poursuit en CDI**, la prime n'est pas due : elle compense la précarité, qui disparaît.

Elle n'est pas due non plus en cas de **faute grave**, pour un CDD saisonnier ou d'usage, ou pour un étudiant pendant ses vacances.

```scene
cdi CDI "CDI proposé et accepté"
CDI -> FIN lien "suivi de"
focus PREC CDI
note PREC "⊘ La relation continue en CDI"
```
## 6. Synthèse
| Exigence | Sanction si elle manque |
|---|---|
| ✍️ Écrit | requalification en CDI |
| 📝 Motif précis | requalification en CDI |
| 📅 Terme précis | requalification en CDI |
| ⏳ 18 mois maximum (cas général) | requalification en CDI |

À la fin : **prime de précarité** de 10 %, sauf exceptions.

```scene
retirer CDI
selection CT
```