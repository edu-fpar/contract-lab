# The CDD, an exceptional contract
> Writing, reason, end date: without them, the CDD becomes a CDI.

A **CDD** (fixed-term contract) may neither aim nor result in permanently filling a job linked to the normal and permanent activity of the business. It is therefore **strictly regulated**; the sanction is **reclassification as a CDI** (permanent contract).

## 1. A CDD concluded in a hurry
The **Jardin Malin** garden centre hires **Tom** for the spring season. Nobody drew up a contract.

Three red badges: without writing, reason or end date, the contract is **reclassified as a CDI**.

```scene
employeur EMP "Jardin Malin"
salarie TOM "Tom Girard" categorie=employe anciennete=0.5 salaire=1900
cdd CT "Tom’s CDD"
EMP TOM -> CT
focus CT
note CT "Not in writing: CDI!"
```
## 2. Writing, precise reason, end date
We put things right:
- a **written contract**, given to the employee;
- a **precise reason**: temporary increase in activity (spring season);
- a **precise end date**: 1 March to 30 June.

```scene
ecrit EC "Written contract"
motif_recours MR "Seasonal increase in activity"
terme TE "1 March – 30 June"
EC MR TE -> CT
param CT duree=4
focus CT
```
## Question: the shop renews the CDD until it reaches 20 months. What is the risk?
After the season, the shop renews, then renews again: Tom works 20 months on a CDD.

```scene
verification off
param CT duree=20
focus CT
```
- [ ] Nothing, as long as each renewal is in writing
  Written renewals do not allow the maximum length to be exceeded.
- [x] Reclassification of the contract as a CDI
  In the general case, the maximum length is 18 months, renewals included.
- [ ] A simple fine
  The civil sanction is reclassification, claimed before the employment tribunal (conseil de prud’hommes).

### Answer
Maximum length of a CDD, renewals included: **18 months** in the general case (with exceptions and adjustments by sector-level agreement). Beyond that, Tom can claim **reclassification as a CDI**, with a reclassification payment of at least one month’s salary.

```scene
verification on
note CT "20 months > 18 months"
```
## 4. End of the CDD and the precariousness bonus
We go back to a 4-month CDD. On its end date, the contract ends **automatically**, without any procedure.

Tom receives the **end-of-contract payment** (“prime de précarité”, precariousness bonus): **10%** of total gross pay. Here: 4 × €1,900 = €7,600 → **€760**.

```scene
param CT duree=4
fin_cdd FIN "End of the CDD"
FIN -> CT
indemnite_precarite PREC "Precariousness bonus" remuneration_totale=7600
indemnite_conges ICP "Untaken leave"
FIN -> PREC ICP
focus FIN PREC
```
## 5. When the bonus is not due
If the relationship **continues under a CDI**, the bonus is not due: it compensates for precariousness, which disappears.

Nor is it due in the event of **gross misconduct**, for a seasonal or customary CDD, or for a student during the holidays.

```scene
cdi CDI "CDI offered and accepted"
CDI -> FIN lien "followed by"
focus PREC CDI
note PREC "⊘ The relationship continues under a CDI"
```
## 6. Summary
| Requirement | Sanction if missing |
|---|---|
| ✍️ In writing | reclassification as a CDI |
| 📝 Precise reason | reclassification as a CDI |
| 📅 Precise end date | reclassification as a CDI |
| ⏳ 18 months maximum (general case) | reclassification as a CDI |

At the end: a 10% **precariousness bonus**, save for exceptions.

```scene
retirer CDI
selection CT
```