# Les obligations des parties
> Le contrat crée des obligations réciproques ; un manquement grave peut conduire à la rupture.

Le contrat de travail est **synallagmatique** : chaque partie a des obligations envers l'autre. Le Code du travail ajoute des obligations légales, et les deux parties doivent exécuter le contrat **de bonne foi**.

## 1. Les obligations de l'employeur
L'employeur doit :
- **fournir le travail** convenu et les moyens de l'exécuter ;
- **payer le salaire**, au moins égal aux minima ;
- assurer la **sécurité** et protéger la **santé** physique et mentale des salariés ;
- assurer l'**adaptation** des salariés à leur poste et leur **employabilité** ;
- respecter l'**égalité** et ne pas discriminer.

```scene
employeur EMP "Boulangerie Fournil & Co"
salarie NINA "Nina Petit" categorie=employe anciennete=3 salaire=2000
cdi CT "CDI de Nina"
EMP NINA -> CT
fournir_travail O1
payer_salaire O2
securite O3
adaptation O4
non_discrimination O5
EMP -> O1 O2 O3 O4 O5
focus EMP
```
## 2. Les obligations du salarié
Le salarié doit :
- **exécuter le travail** convenu, personnellement et avec soin ;
- **respecter les directives** de l'employeur et le règlement intérieur (lien de subordination) ;
- être **loyal** : ne pas faire concurrence à son employeur pendant le contrat, même sans clause ;
- être **discret** sur les informations confidentielles ;
- veiller à **sa sécurité** et à celle des autres.

```scene
executer_travail S1
obeissance S2
loyaute S3
discretion S4
securite_salarie S5
NINA -> S1 S2 S3 S4 S5
focus NINA
```
## 3. Une obligation commune : la bonne foi
Le contrat est exécuté **de bonne foi** par les deux parties (art. L1222-1 C. trav.). Elle irrigue tout le reste : une clause valable mise en œuvre de mauvaise foi devient abusive.

```scene
bonne_foi BF "Bonne foi"
EMP NINA -> BF
focus BF
```
## 4. Un manquement de l'employeur
Depuis trois mois, la boulangerie ne paie plus le salaire de Nina. L'obligation est **violée** (⚡).

```scene
manquement M1 "3 mois de salaire impayés"
M1 -> O2
focus M1 O2
```
## Question : que peut faire Nina, sans démissionner ?
Elle veut quitter l'entreprise sans perdre ses droits.

```scene
focus NINA M1
```
- [ ] Arrêter de venir travailler
  Ce serait un abandon de poste : après mise en demeure, elle serait présumée démissionnaire.
- [x] Prendre acte de la rupture aux torts de l'employeur
  Si le manquement est suffisamment grave, la prise d'acte produit les effets d'un licenciement sans cause réelle et sérieuse.
- [x] Demander au juge la résiliation judiciaire de son contrat
  Elle continue à travailler pendant la procédure ; si le juge la prononce, mêmes effets qu'un licenciement sans cause.
- [ ] Rien : seul l'employeur peut rompre un CDI
  Le salarié peut rompre (démission, prise d'acte) ou demander au juge de le faire.

### Réponse
Deux voies, toutes deux contrôlées par le juge :
- la **prise d'acte** rompt le contrat immédiatement : si le manquement est assez grave pour empêcher la poursuite du contrat, elle produit les effets d'un **licenciement sans cause réelle et sérieuse** ; sinon, ceux d'une **démission** ;
- la **résiliation judiciaire** : Nina continue à travailler et demande au juge de rompre le contrat aux torts de l'employeur.

Des salaires impayés pendant trois mois sont un **manquement suffisamment grave**.

```scene
prise_acte PA "Prise d'acte de Nina"
NINA -> PA
PA -> CT
manquement_suffisant MS "Salaires impayés"
MS -> PA
M1 -> PA lien "fonde"
focus PA
```
## 6. Synthèse
| Employeur | Salarié |
|---|---|
| fournir le travail | exécuter le travail |
| payer le salaire | respecter les directives |
| sécurité, santé | loyauté, discrétion |
| adaptation, égalité | veiller à la sécurité |
| **bonne foi** | **bonne foi** |

Un manquement grave de l'employeur ouvre la **prise d'acte** ou la **résiliation judiciaire** ; un manquement du salarié peut justifier une **sanction** ou un **licenciement**.

```scene
vue PA
```