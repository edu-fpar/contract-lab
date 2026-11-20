# Faute grave, faute lourde
> Ce que la gravité de la faute retire au salarié… et ce qu'elle ne lui retire pas.

La qualification de la faute change tout : **faute sérieuse**, **grave** ou **lourde** n'ont pas les mêmes effets sur le préavis et les indemnités. Observez le symbole ⊘ : il signale les droits neutralisés.

## 1. Un licenciement pour faute sérieuse
**Julie**, vendeuse depuis 4 ans (2 100 € brut), est licenciée pour des erreurs de caisse répétées : **faute sérieuse**. Procédure régulière, préavis, indemnité : tout est dû.

```scene
employeur EMP "Mode & Co"
salarie JUL "Julie Garnier" categorie=employe anciennete=4 salaire=2100
cdi CT "CDI de Julie"
EMP JUL -> CT
licenciement_personnel LIC "Licenciement de Julie"
EMP -> LIC
LIC -> CT
faute_simple F "Erreurs de caisse"
F -> LIC
convocation CONV
entretien_prealable ENT
notification NOT
preavis PRE "Préavis 2 mois"
LIC -> CONV
CONV -> ENT puis "≥ 5 j. ouvrables"
ENT -> NOT puis "≥ 2 j. ouvrables"
NOT -> PRE
indemnite_licenciement IL "Indemnité de licenciement"
indemnite_conges ICP "Congés payés"
LIC -> IL ICP
focus F IL PRE
```
## Question : les faits sont en réalité des vols. Qu'est-ce que Julie perd ?
L'enquête révèle que Julie détournait de l'argent de la caisse. L'employeur retient une **faute grave**.

```scene
verification off
type F faute_grave
renommer F "Vols dans la caisse"
focus F
```
- [ ] Rien : la procédure a été respectée
  La procédure est la même ; ce sont les droits qui changent.
- [x] Son préavis
  La faute grave rend impossible le maintien dans l'entreprise, même pendant le préavis.
- [x] Son indemnité de licenciement
  La faute grave prive de l'indemnité légale de licenciement.
- [ ] Ses congés payés acquis
  L'indemnité compensatrice de congés payés reste due.

### Réponse
La **faute grave** rend impossible le maintien du salarié dans l'entreprise, **même pendant le préavis**. Elle prive Julie :
- du **préavis** (et de l'indemnité compensatrice de préavis) ;
- de l'**indemnité de licenciement**.

Elle conserve l'**indemnité compensatrice de congés payés** et ses droits au **chômage**.

```scene
verification on
focus PRE IL ICP
```
## 3. La mise à pied conservatoire
Pour écarter Julie immédiatement pendant la procédure, l'employeur prononce une **mise à pied conservatoire**. Si la faute grave est retenue, cette période n'est pas payée.

Attention au **délai** : la faute grave suppose d'engager la procédure dans un délai restreint après la connaissance des faits ; les faits fautifs se prescrivent par **2 mois**.

```scene
mise_a_pied MAP "Mise à pied conservatoire"
retirer LIC -> CONV
LIC -> MAP
MAP -> CONV puis
focus MAP
```
## 4. Et la faute lourde ?
Si Julie avait agi avec l'**intention de nuire** à l'employeur (par exemple en sabotant le stock avant de partir chez un concurrent), la faute serait **lourde**.

Mêmes effets que la faute grave, et en plus l'employeur peut engager la **responsabilité pécuniaire** de Julie. Depuis 2016, l'indemnité de **congés payés** reste due, même en cas de faute lourde.

```scene
type F faute_lourde
renommer F "Sabotage du stock"
focus F ICP
note ICP "Toujours due, même faute lourde"
```
## 5. Synthèse
| Faute | Préavis | Indemnité de licenciement | Congés payés | Responsabilité pécuniaire |
|---|---|---|---|---|
| 🟠 Sérieuse | ✔ | ✔ | ✔ | ✘ |
| 🔥 Grave | ✘ | ✘ | ✔ | ✘ |
| ☠️ Lourde | ✘ | ✘ | ✔ | ✔ |

```scene
type F faute_grave
renommer F "Vols dans la caisse"
selection IL
```