# The parties’ obligations
> The contract creates reciprocal obligations; a serious breach can lead to termination.

The employment contract is **synallagmatic**: each party has obligations towards the other. The Labour Code (C. trav.) adds statutory obligations, and both parties must perform the contract **in good faith**.

## 1. The employer’s obligations
The employer must:
- **provide the agreed work** and the means to carry it out;
- **pay the salary**, at least equal to the minimum;
- ensure **safety** and protect employees’ physical and mental **health**;
- ensure employees are **adapted** to their job and remain **employable**;
- respect **equality** and not discriminate.

```scene
employeur EMP "Boulangerie Fournil & Co"
salarie NINA "Nina Petit" categorie=employe anciennete=3 salaire=2000
cdi CT "Nina’s CDI"
EMP NINA -> CT
fournir_travail O1
payer_salaire O2
securite O3
adaptation O4
non_discrimination O5
EMP -> O1 O2 O3 O4 O5
focus EMP
```
## 2. The employee’s obligations
The employee must:
- **perform the agreed work**, personally and with care;
- **follow the employer’s instructions** and the internal rules (relationship of subordination);
- be **loyal**: not compete with the employer during the contract, even without a clause;
- be **discreet** about confidential information;
- take care of **their own safety** and that of others.

```scene
executer_travail S1
obeissance S2
loyaute S3
discretion S4
securite_salarie S5
NINA -> S1 S2 S3 S4 S5
focus NINA
```
## 3. A shared obligation: good faith
The contract is performed **in good faith** by both parties (art. L1222-1 C. trav.). It runs through everything else: a valid clause implemented in bad faith becomes abusive.

```scene
bonne_foi BF "Good faith"
EMP NINA -> BF
focus BF
```
## 4. A breach by the employer
For three months, the bakery has not paid Nina’s salary. The obligation is **breached** (⚡).

```scene
manquement M1 "3 months’ salary unpaid"
M1 -> O2
focus M1 O2
```
## Question: what can Nina do, without resigning?
She wants to leave the company without losing her rights.

```scene
focus NINA M1
```
- [ ] Stop coming to work
  That would be job abandonment: after formal notice, she would be presumed to have resigned.
- [x] Terminate the contract on the grounds of the employer’s breach (prise d’acte)
  If the breach is serious enough, the prise d’acte takes effect as a dismissal without real and serious cause.
- [x] Ask the court for judicial termination of her contract
  She keeps working during the proceedings; if the court grants it, the effects are those of an unfair dismissal.
- [ ] Nothing: only the employer can end a CDI
  The employee can end it (resignation, prise d’acte) or ask the court to do so.

### Answer
Two routes, both reviewed by the court:
- the **prise d’acte** ends the contract immediately: if the breach is serious enough to prevent the contract from continuing, it takes effect as a **dismissal without real and serious cause**; otherwise, as a **resignation**;
- **judicial termination (résiliation judiciaire)**: Nina keeps working and asks the court to end the contract on the grounds of the employer’s fault.

Three months of unpaid salary is a **sufficiently serious breach**.

```scene
prise_acte PA "Nina’s prise d’acte"
NINA -> PA
PA -> CT
manquement_suffisant MS "Unpaid salary"
MS -> PA
M1 -> PA lien "grounds"
focus PA
```
## 6. Summary
| Employer | Employee |
|---|---|
| provide the work | perform the work |
| pay the salary | follow instructions |
| safety, health | loyalty, discretion |
| adaptation, equality | take care of safety |
| **good faith** | **good faith** |

A serious breach by the employer opens the way to a **prise d’acte** or **judicial termination**; a breach by the employee may justify a **sanction** or **dismissal**.

```scene
vue PA
```