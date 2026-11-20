# La rupture conventionnelle
> Un commun accord, quatre étapes, une indemnité plancher.

La **rupture conventionnelle** permet à l'employeur et au salarié en CDI de convenir ensemble de la rupture. Elle ne peut être **imposée** par aucune des parties ; elle est entourée de garanties.

## 1. Paul veut partir, l'entreprise est d'accord
**Paul**, développeur depuis **5 ans** (3 000 € brut), veut créer son entreprise. Son employeur accepte une rupture conventionnelle.

Cinq pastilles en pointillés : il manque toutes les garanties.

```scene
employeur EMP "Pixel Factory"
salarie PAUL "Paul Nguyen" categorie=cadre anciennete=5 salaire=3000
cdi CT "CDI de Paul"
EMP PAUL -> CT
rupture_conventionnelle RC "Rupture conventionnelle"
EMP PAUL -> RC
RC -> CT
focus RC
```
## 2. Entretien et signature
1. Un ou plusieurs **entretiens**, où chacun peut se faire assister ;
2. la **signature de la convention**, qui fixe la date de rupture et l'**indemnité spécifique**.

```scene
entretien_rc E1 "Entretien du 3 mars"
convention_rc CONV "Convention signée le 10 mars"
RC -> E1
E1 -> CONV puis
focus E1 CONV
```
## 3. Rétractation et homologation
3. **15 jours calendaires** pour se rétracter, pour chaque partie ;
4. **homologation** par l'administration (DREETS), qui dispose de **15 jours ouvrables** : son silence vaut homologation.

```scene
retractation RET "Rétractation"
homologation HOM "Homologation"
inspection DREETS "DREETS"
CONV -> RET puis "15 jours calendaires"
RET -> HOM puis
DREETS -> HOM lien "15 jours ouvrables"
focus RET HOM
```
## Question : la convention prévoit 3 000 € d'indemnité. Que va faire l'administration ?
Paul a 5 ans d'ancienneté et gagne 3 000 € brut par mois.

```scene
verification off
indemnite_rc IRC "Indemnité spécifique" montant=3000
RC -> IRC
focus IRC
```
- [ ] Homologuer : l'indemnité est librement négociée
  Elle est négociée… au-dessus d'un plancher.
- [x] Refuser : l'indemnité est inférieure au minimum légal
  Elle doit être au moins égale à l'indemnité légale de licenciement : 3 000 € × 5 × 1/4 = 3 750 €.
- [ ] Homologuer, puis Paul réclamera la différence aux prud'hommes
  L'administration contrôle le montant avant d'homologuer.

### Réponse
L'indemnité spécifique doit être **au moins égale à l'indemnité légale de licenciement** : 3 000 € × 5 ans × 1/4 = **3 750 €**. Avec 3 000 €, l'homologation est refusée. Les parties signent une nouvelle convention à **4 000 €**.

```scene
verification on
note IRC "3 000 € < 3 750 € : refus"
```
## 5. Un consentement libre
Dernière garantie : le **consentement libre**. Une rupture conventionnelle signée sous la pression ou dans un contexte de **harcèlement** est **nulle** : elle produit alors les effets d'un licenciement sans cause réelle et sérieuse.

Paul part de son plein gré : toutes les pastilles sont vertes. Il aura droit à l'**allocation chômage**.

```scene
param IRC montant=4000
consentement_libre CL "Projet de création d'entreprise"
CL -> RC
chomage ARE "ARE"
indemnite_conges ICP "Congés payés"
RC -> ARE ICP
focus RC
```
## 6. Synthèse
| Étape | Garantie |
|---|---|
| 🗨️ Entretien(s) | assistance possible |
| 📑 Convention | date, indemnité ≥ indemnité légale |
| ↩️ Rétractation | 15 jours calendaires |
| 🔏 Homologation | 15 jours ouvrables, silence = accord |
| 🕊️ Consentement | sinon nullité |

```scene
selection RC
```