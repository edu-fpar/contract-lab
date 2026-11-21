# Mobility, exclusivity, training repayment
> Three clauses useful to the employer, three sets of safeguards, and some incompatibilities.

Some clauses give the employer power over the employee’s life. The law allows them, but **subject to conditions**: without them, the clause is void or unenforceable. And some clauses become **incompatible** with other elements of the file (⊘).

## 1. The mobility clause
**Sofia**, a maintenance technician, signs a CDI with a **mobility clause**. The employer will be able to transfer her… but where?

A mobility clause must **precisely define its geographical area**, which the employer cannot extend alone. “Any place where the company operates or will operate”: void.

```scene
employeur EMP "Hydro Services"
salarie SOF "Sofia Lemaire" categorie=technicien anciennete=2 salaire=2600
cdi CT "Sofia’s CDI"
EMP SOF -> CT
mobilite MOB "Mobility"
CT -> MOB
focus MOB
```
## 2. A precise area… and fair implementation
We specify: “**Brittany and Pays de la Loire**”. The clause is now valid (📌 badge green).

The two other badges are orange: even when valid, the clause must be **implemented in good faith**, in the **company’s interest** and with sufficient **advance notice**. A 300 km transfer announced the day before would be abusive.

> 💡 Refusing a transfer that complies with a valid mobility clause may justify dismissal.

```scene
zone_definie ZD "Brittany + Pays de la Loire"
ZD -> MOB
focus MOB ZD
```
## 3. Proper implementation
The employer explains the transfer (a new site opening in Rennes) and gives Sofia one month’s notice: everything is green.

```scene
interet_legitime IL "New site opening in Rennes"
delai_prevenance DP "1 month’s notice"
IL DP -> MOB
focus MOB IL DP
```
## 4. Exclusivity… for a part-time employee
**Sofia**’s contract becomes **part-time** (24 hours a week) and the employer adds an **exclusivity clause**: no other professional activity.

The ⊘ symbol appears: a part-time employee must be able to **supplement her income**. The exclusivity clause is, in principle, **unenforceable** against her.

```scene
temps_partiel TP "Part-time 24 h"
ecrit EC "Written amendment"
repartition REP "Monday to Wednesday"
CT -> TP
EC REP -> TP
exclusivite EXC "Exclusivity"
CT -> EXC
interet_legitime IE "Technical know-how"
proportionnalite PE "Justified by the task"
IE PE -> EXC
focus EXC TP
note EXC "Part-time: unenforceable in principle"
```
## 5. The training repayment clause
The employer pays for Sofia to obtain a **high-voltage electrical certification** costing €6,000. In return, a **training repayment clause (dédit-formation)**: if she resigns within 2 years, she repays part of the costs.

The clause is lawful if:
- it is **in writing before** the training (date, nature, length, actual cost, repayment terms);
- the costs **exceed** what the law or the collective agreement requires of the employer;
- the repayment is **proportionate** (and decreasing over time).

```scene
retirer EXC IE PE
dedit_formation DF "2-year training repayment"
CT -> DF
ecrit EDF "Agreement signed before the training"
formation_couteuse FC "€6,000 in actual costs"
proportionnalite PR "Decreasing repayment"
EDF FC PR -> DF
focus DF
```
## Question: Sofia is dismissed a year later. Must she repay?
The employer makes her redundant for economic reasons and claims €3,000 under the training repayment clause.

```scene
verification off
licenciement_eco LE "Economic redundancy"
EMP -> LE
LE -> CT
focus DF LE
```
- [ ] Yes, the clause is valid
  It is valid… but it only applies if the employee leaves of her own accord.
- [x] No, the termination is not her doing
  The training repayment clause does not apply when the employer ends the contract.
- [ ] Yes, but only half
  Proportionality governs the amount when the clause applies; here, it does not apply.

### Answer
The training repayment clause compensates a **voluntary departure** by the employee. In the event of **dismissal**, the termination is not the employee’s doing: the clause is **inapplicable** (⊘).

```scene
verification on
focus DF LE
```
## 7. Summary
| Clause | Safeguards | Incompatible with |
|---|---|---|
| 🧳 Mobility | precise area; fair implementation, advance notice | — |
| 🔒 Exclusivity | legitimate interest, justified and proportionate | ⊘ part-time |
| 🎒 Training repayment | prior written agreement, costs beyond obligations, proportionate amount | ⊘ dismissal |

```scene
vue CT
```