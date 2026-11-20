# Rompre la période d'essai
> Une rupture libre… à condition qu'il y ait bien un essai, et sans abus.

Pendant la période d'essai, chaque partie peut rompre le contrat **librement**, sans motif ni procédure de licenciement. Mais cette liberté a des limites.

## 1. L'essai de Lucas
**Lucas**, technicien, est embauché en CDI avec une **période d'essai de 2 mois**, stipulée dans son contrat écrit.

```scene
employeur EMP "ÉlecPro"
salarie LUC "Lucas Ferreira" categorie=technicien
cdi CT "CDI de Lucas"
EMP LUC -> CT
ecrit EC "Contrat écrit"
EC -> CT
periode_essai ESS "Essai 2 mois" duree=2
CT -> ESS
focus ESS
```
## 2. L'employeur rompt l'essai
Après 6 semaines, l'employeur estime que Lucas n'a pas les compétences attendues et rompt l'essai.

La rupture est libre, mais l'employeur respecte un **délai de prévenance** qui dépend du temps de présence : 24 h avant 8 jours, 48 h entre 8 jours et 1 mois, **2 semaines** après 1 mois, 1 mois après 3 mois.

```scene
rupture_essai RE "Rupture de l'essai"
EMP -> RE
RE -> CT
focus RE
note RE "Délai de prévenance manquant"
```
## 3. Le délai de prévenance
Lucas est prévenu 2 semaines à l'avance. Pas d'indemnité de licenciement, pas de préavis : seulement ses congés payés et ses documents de fin de contrat.

```scene
delai_prevenance DP "2 semaines"
DP -> RE
indemnite_conges ICP "Congés payés"
RE -> ICP
focus RE
```
## Question : et si l'essai n'avait pas été écrit dans le contrat ?
Imaginons que le contrat de Lucas ne mentionne aucune période d'essai.

```scene
verification off
retirer ESS
focus RE
```
- [ ] Rien ne change : l'essai existe de plein droit
  La période d'essai ne se présume pas.
- [x] La rupture s'analyse en licenciement
  Sans essai valablement stipulé, l'employeur doit respecter les règles du licenciement.
- [ ] Lucas doit rembourser son salaire
  Aucun texte ne le prévoit.

### Réponse
La période d'essai **ne se présume pas** : elle doit figurer dans la lettre d'engagement ou le contrat. Sans elle, la rupture est un **licenciement**, qui exige une cause réelle et sérieuse et une procédure. Ici, sans procédure : licenciement sans cause réelle et sérieuse.

```scene
verification on
focus RE
```
## 5. Une rupture abusive
Même avec un essai valable, la rupture est **abusive** si elle n'a **aucun lien avec les compétences** du salarié (motif économique, discrimination, représailles…). Le salarié peut alors obtenir des dommages-intérêts ; si elle est discriminatoire, elle est nulle.

```scene
periode_essai ESS "Essai 2 mois" duree=2
CT -> ESS
condition RE "Motif lié aux compétences" manque "rupture abusive : dommages-intérêts"
focus RE
note RE "Rupture « pour raisons économiques » ?"
```
## 6. Synthèse
- L'essai doit être **écrit** et respecter les **durées maximales**.
- La rupture est libre, mais avec un **délai de prévenance**.
- Elle doit être liée aux **compétences** ; sinon elle est abusive.

```scene
condition RE "Motif lié aux compétences" ok
selection RE
```