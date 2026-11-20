# Les sources du droit du travail
> Loi, conventions, accords, contrat, règlement intérieur, usages : qui l'emporte ?

Le contrat de **Léa** ne vit pas seul : il s'inscrit dans un empilement de normes. Pour savoir quelle règle s'applique, il faut connaître leur articulation.

## 1. La loi, socle d'ordre public
Le **Code du travail** fixe des règles d'**ordre public** (SMIC, durées maximales, congés payés…), auxquelles on ne peut déroger qu'en faveur du salarié, et des règles **supplétives**, qui s'appliquent à défaut d'accord.

```scene
code_travail CT "Code du travail"
focus CT
```
## 2. Branche et entreprise
La **convention de branche** fixe notamment les **salaires minima** et les **classifications**.

Depuis les ordonnances de 2017, l'**accord d'entreprise** prime sur l'accord de branche dans la plupart des domaines, sauf ceux que la loi réserve à la branche (salaires minima, classifications, égalité professionnelle…) ou que la branche verrouille.

```scene
convention_collective CCN "Convention Syntec"
accord_entreprise AE "Accord d'entreprise"
CT -> CCN
CCN -> AE prevaut "domaines réservés à la branche"
focus CCN AE
```
## 3. Le contrat de travail
Le **contrat** ne peut pas être moins favorable que la loi ou la convention collective : c'est le **principe de faveur**. Une clause plus favorable du contrat l'emporte sur l'accord collectif (sauf accords particuliers, comme l'accord de performance collective).

```scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin"
cdi CTR "Contrat de Léa"
EMP LEA -> CTR
remuneration REM "3 400 € brut"
CTR -> REM
CCN -> REM encadre "≥ minimum conventionnel"
focus CTR REM
```
## Question : la convention fixe un minimum de 3 600 € pour le poste de Léa. Que se passe-t-il ?
Le contrat de Léa prévoit 3 400 € brut par mois.

```scene
verification off
focus REM CCN
```
- [ ] Le contrat s'applique : Léa l'a signé
  Le contrat ne peut pas déroger, dans un sens défavorable, aux minima conventionnels.
- [x] Léa a droit au minimum conventionnel de 3 600 €
  La clause moins favorable est écartée au profit de la convention.
- [ ] Le contrat est nul
  Seule la clause est écartée ; le contrat survit.

### Réponse
La clause de rémunération est **moins favorable** que la convention collective : elle est écartée, Léa a droit à **3 600 €** et peut réclamer un rappel de salaire.

```scene
verification on
statut REM nulle "inférieure au minimum conventionnel : 3 600 € dus"
focus REM
```
## 5. Règlement intérieur et usages
Le **règlement intérieur** (obligatoire à partir de 50 salariés) fixe les règles d'hygiène, de sécurité et de **discipline**. L'**usage** (pratique générale, constante et fixe, comme une prime de fin d'année) crée un droit jusqu'à sa dénonciation régulière.

```scene
reglement_interieur RI "Règlement intérieur"
usage US "Prime de vacances"
CT -> RI
RI -> CTR encadre "discipline, sanctions"
US -> LEA lien "prime due"
focus RI US
```
## 6. Synthèse
| Source | Rôle |
|---|---|
| 📕 Loi | ordre public, règles supplétives |
| 📗 Branche | minima, classifications, domaines réservés |
| 📘 Accord d'entreprise | prime sur la branche dans les autres domaines |
| 📄 Contrat | principe de faveur |
| 📙 Règlement intérieur | hygiène, sécurité, discipline |
| 🔂 Usage | droit jusqu'à dénonciation |

```scene
vue CTR
```