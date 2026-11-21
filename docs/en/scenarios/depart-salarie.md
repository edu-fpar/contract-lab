# Resignation, job abandonment, prise d’acte
> Three ways for the employee to leave the company, three very different regimes.

An employee on a CDI may **resign**. But not all terminations on the employee’s initiative are equal: depending on the form and the circumstances, they keep or lose their rights.

## 1. Amel’s resignation
**Amel** hands in a letter: “I am resigning to join another company.” Resignation requires no particular form, but a **clear and unequivocal intent**.

She works her **notice** (according to the collective agreement or custom). She is not entitled to severance pay.

```scene
employeur EMP "Agence Horizon"
salarie AMEL "Amel Kaci" categorie=employe anciennete=3 salaire=2200
cdi CT "Amel’s CDI"
EMP AMEL -> CT
demission DEM "Resignation"
AMEL -> DEM
DEM -> CT
volonte_claire VC "Clear letter, no pressure"
VC -> DEM
preavis PRE "Notice under the agreement"
DEM -> PRE
indemnite_conges ICP "Paid leave"
DEM -> ICP
focus DEM
```
## Question: will Amel be entitled to unemployment benefit?
She has found another job… but suppose the job offer falls through.

```scene
verification off
chomage ARE "ARE"
DEM -> ARE
focus ARE
```
- [ ] Yes, like any employee who loses their job
  The ARE compensates involuntary loss of employment.
- [x] No, in principle: resignation is voluntary
  Except for a “legitimate” resignation (listed cases) or an approved career-change project.
- [ ] Yes, if she has more than 2 years’ service
  Length of service does not change the voluntary nature of resignation.

### Answer
Unemployment benefit compensates **involuntary loss** of employment. After a resignation it is **not due**, except for a **legitimate resignation** (following a spouse, non-payment of salary…) or a recognised **career-change project**.

```scene
verification on
focus ARE
```
## 3. Hugo’s job abandonment
**Hugo** stops coming to work, without explanation. Since 2023, the employer may give him **formal notice** to justify his absence and return to work, within at least **15 days**.

If he does not return, Hugo is **presumed to have resigned**: no severance pay, **no unemployment benefit**.

```scene
retirer DEM PRE ICP ARE VC
salarie HUGO "Hugo Lambert" categorie=employe anciennete=2
cdi CT2 "Hugo’s CDI"
EMP HUGO -> CT2
abandon_poste AB "Absent without explanation"
HUGO -> AB
AB -> CT2
mise_en_demeure MED "Formal notice (15 days)"
AB -> MED
chomage ARE2 "ARE"
AB -> ARE2
focus AB ARE2
```
## 4. Sarah’s prise d’acte
For months **Sarah** has suffered humiliation from her manager; the employer, though alerted, has done nothing. She **terminates the contract on the grounds of the employer’s breach (prise d’acte)**.

The court checks whether the employer’s breaches are **serious enough** to prevent the contract from continuing. Here, unaddressed moral harassment breaches the **duty of safety**: the prise d’acte takes effect as a **dismissal without real and serious cause**, or even a void dismissal.

```scene
salarie SARAH "Sarah Moreau" categorie=cadre anciennete=7 salaire=3900
cdi CT3 "Sarah’s CDI"
EMP SARAH -> CT3
securite SEC "Duty of safety"
EMP -> SEC
harcelement HAR "Unaddressed moral harassment"
HAR -> SEC
prise_acte PA "Prise d’acte"
SARAH -> PA
PA -> CT3
HAR -> PA lien "grounds"
focus PA HAR SEC
```
## 5. Summary
| Termination | Condition | Effects |
|---|---|---|
| 🚪 Resignation | clear and unequivocal intent | notice; no severance pay; no ARE (save exceptions) |
| 🏃 Job abandonment | formal notice left unanswered | presumed to have resigned; no ARE |
| 🚩 Prise d’acte | serious breach by the employer | justified: unfair dismissal; otherwise: resignation |

```scene
vue PA
```