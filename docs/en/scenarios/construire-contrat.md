# Building an employment contract
> The parties, the core terms, the probationary period: a CDI is assembled piece by piece.

We assemble the contract of **Léa Martin**, hired as marketing manager by the company **Bleu Ciel**. Each clause is a card; the “📄” frame marks out what the contract contains.

Verdicts appear on the cards: ✅ valid, ⚠️ at risk, ⛔ void. The **badges** under a card are its validity conditions.

## 1. Two parties and a relationship of subordination
An employment contract brings together three elements: **work performed**, **pay** and a **relationship of subordination** — the employer’s power to give orders, monitor their performance and sanction failures.

Whatever name the parties give their relationship, what counts is the reality of the subordination.

```scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin" categorie=cadre anciennete=0 salaire=3400
focus EMP LEA
```
## 2. A CDI, the normal form of contract
The **CDI** (permanent contract) is the normal and general form of the employment relationship. Both parties **sign** it.

A full-time CDI need not be in writing… but the employer must give the employee the **main information** about the employment relationship. In practice, it is always written.

```scene
cdi CT "Léa’s CDI"
EMP LEA -> CT
ecrit EC "Written, signed contract"
EC -> CT
focus CT
```
## 3. The core terms of the contract
Four elements form the **contractual core**:

| Element | What cannot be done without Léa’s consent |
|---|---|
| 💶 Pay | change it, however slightly |
| 🧑‍💼 Duties | substantially change her duties |
| ⏱️ Working hours | change the contractual working time |
| 📍 Place of work | transfer her outside the geographical area |

> 💡 Varying a term of the contract requires the employee’s **consent**. A mere **change in working conditions** (hours, tasks of the same grade) falls within the employer’s managerial authority.

```scene
remuneration REM "€3,400 gross / month"
fonctions FCT "Marketing manager"
duree_travail DUR "35 h / week"
lieu_travail LIEU "Lyon"
CT -> REM FCT DUR LIEU
focus REM FCT DUR LIEU
```
## 4. A probationary period… that is too long
The contract provides for a **5-month probationary period**. It is in writing (the ✍️ badge is green: the written contract counts for the clause).

But Léa is a **manager (cadre)**: under a CDI, the statutory maximum is **4 months** (2 months for manual and clerical workers, 3 for supervisors and technicians). The tool flags it in red.

```scene
periode_essai ESS "Probationary period" duree=5
CT -> ESS
focus ESS
note ESS "5 months > 4 months: excessive length"
```
## Question: what must be done to keep 5 months’ probation?
The HR director insists on his 5 months of probation.

```scene
focus ESS
```
- [ ] Nothing: Léa signed, so the clause applies
  The maximum length is a matter of public policy: signing it does not make it valid.
- [ ] Provide for 4 months, renewable once if the contract says so
  Almost: the contract is not enough — an extended sector-level agreement and Léa’s express consent are also needed.
- [x] Provide for 4 months, renewable if an extended sector-level agreement and the contract allow it, with Léa’s express consent
  The three conditions are cumulative; the total length may not exceed 8 months for a manager.
- [ ] Replace the probation with a 5-month CDD
  A fixed-term contract cannot be used to “test” an employee: it would be reclassified as a CDI.

### Answer
The probation is cut back to **4 months** with provision for **renewal**, possible only once if:
- an **extended sector-level agreement** provides for it;
- the **contract** stipulates it;
- the employee gives **express consent**, before the initial period ends.

Maximum total length for a manager: **8 months**, renewal included.

```scene
param ESS duree=4
renouvellement_essai REN "Renewal: 5 months in total" duree=5
CT -> REN
accord_collectif ACC "Extended sector-level agreement"
accord_salarie ACS "Léa’s consent in month 3"
ACC ACS -> REN
focus ESS REN
```
## 6. Summary
Léa’s contract is complete and everything is green.

Key points:
- three criteria of an employment contract: **work**, **pay**, **subordination**;
- the **core terms** can only be changed with the employee’s consent;
- the **probationary period** is never presumed (it must be in writing) and its maximum lengths are a matter of public policy;
- **renewal** requires an extended sector-level agreement + the contract + the employee’s express consent.

Click a card to see its validity conditions.

```scene
selection REN
```