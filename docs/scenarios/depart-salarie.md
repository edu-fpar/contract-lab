# Démission, abandon de poste, prise d'acte
> Trois façons pour le salarié de quitter l'entreprise, trois régimes très différents.

Le salarié en CDI peut **démissionner**. Mais toutes les ruptures à son initiative ne se valent pas : selon la forme et les circonstances, il garde ou perd ses droits.

## 1. La démission d'Amel
**Amel** remet une lettre : « Je démissionne pour rejoindre une autre entreprise. » La démission n'exige aucune forme, mais une **volonté claire et non équivoque**.

Elle effectue son **préavis** (selon la convention collective ou l'usage). Elle n'a pas droit à l'indemnité de licenciement.

```scene
employeur EMP "Agence Horizon"
salarie AMEL "Amel Kaci" categorie=employe anciennete=3 salaire=2200
cdi CT "CDI d'Amel"
EMP AMEL -> CT
demission DEM "Démission"
AMEL -> DEM
DEM -> CT
volonte_claire VC "Lettre claire, sans pression"
VC -> DEM
preavis PRE "Préavis conventionnel"
DEM -> PRE
indemnite_conges ICP "Congés payés"
DEM -> ICP
focus DEM
```
## Question : Amel aura-t-elle droit au chômage ?
Elle a trouvé un autre emploi… mais imaginons que la promesse d'embauche tombe à l'eau.

```scene
verification off
chomage ARE "ARE"
DEM -> ARE
focus ARE
```
- [ ] Oui, comme tout salarié qui perd son emploi
  L'ARE indemnise la privation involontaire d'emploi.
- [x] Non, en principe : la démission est volontaire
  Sauf démission « légitime » (cas listés) ou projet de reconversion validé.
- [ ] Oui, si elle a plus de 2 ans d'ancienneté
  L'ancienneté ne change rien à la nature volontaire de la démission.

### Réponse
L'allocation chômage indemnise la **privation involontaire** d'emploi. Après une démission, elle n'est **pas due**, sauf **démission légitime** (suivi de conjoint, non-paiement des salaires…) ou **projet de reconversion professionnelle** reconnu.

```scene
verification on
focus ARE
```
## 3. L'abandon de poste de Hugo
**Hugo** ne vient plus travailler, sans explication. Depuis 2023, l'employeur peut le **mettre en demeure** de justifier son absence et de reprendre son poste, dans un délai d'au moins **15 jours**.

S'il ne revient pas, Hugo est **présumé démissionnaire** : pas d'indemnité de licenciement, **pas de chômage**.

```scene
retirer DEM PRE ICP ARE VC
salarie HUGO "Hugo Lambert" categorie=employe anciennete=2
cdi CT2 "CDI de Hugo"
EMP HUGO -> CT2
abandon_poste AB "Absent sans explication"
HUGO -> AB
AB -> CT2
mise_en_demeure MED "Mise en demeure (15 jours)"
AB -> MED
chomage ARE2 "ARE"
AB -> ARE2
focus AB ARE2
```
## 4. La prise d'acte de Sarah
**Sarah** subit depuis des mois les humiliations de son manager ; l'employeur, alerté, n'a rien fait. Elle **prend acte** de la rupture de son contrat.

Le juge vérifie si les manquements de l'employeur sont **suffisamment graves** pour empêcher la poursuite du contrat. Ici, le harcèlement moral non traité viole l'**obligation de sécurité** : la prise d'acte produit les effets d'un **licenciement sans cause réelle et sérieuse**, voire nul.

```scene
salarie SARAH "Sarah Moreau" categorie=cadre anciennete=7 salaire=3900
cdi CT3 "CDI de Sarah"
EMP SARAH -> CT3
securite SEC "Obligation de sécurité"
EMP -> SEC
harcelement HAR "Harcèlement moral non traité"
HAR -> SEC
prise_acte PA "Prise d'acte"
SARAH -> PA
PA -> CT3
HAR -> PA lien "fonde"
focus PA HAR SEC
```
## 5. Synthèse
| Rupture | Condition | Effets |
|---|---|---|
| 🚪 Démission | volonté claire et non équivoque | préavis ; pas d'indemnité de licenciement ; pas d'ARE (sauf exceptions) |
| 🏃 Abandon de poste | mise en demeure restée sans effet | présumé démissionnaire ; pas d'ARE |
| 🚩 Prise d'acte | manquement grave de l'employeur | justifiée : licenciement sans cause ; sinon : démission |

```scene
vue PA
```