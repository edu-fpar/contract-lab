# The sources of French employment law
> Statute, agreements, contract, internal rules, custom: which prevails?

**Léa**’s contract does not stand alone: it sits within a stack of legal norms. To know which rule applies, you need to know how they fit together.

## 1. Statute, the public-policy foundation
The **Labour Code (C. trav.)** lays down **public-policy** rules (SMIC minimum wage, maximum working hours, paid leave…), from which one may only depart in the employee’s favour, and **default** rules, which apply in the absence of agreement.

```scene
code_travail CT "Labour Code"
focus CT
```
## 2. Sector and company
The **sector-level agreement (convention de branche)** sets in particular **minimum wages** and **job classifications**.

Since the 2017 ordinances, the **company agreement** prevails over the sector-level agreement in most areas, except those that statute reserves to the sector (minimum wages, classifications, workplace equality…) or that the sector locks.

```scene
convention_collective CCN "Syntec agreement"
accord_entreprise AE "Company agreement"
CT -> CCN
CCN -> AE prevaut "areas reserved to the sector"
focus CCN AE
```
## 3. The employment contract
The **contract** cannot be less favourable than statute or the collective agreement: this is the **favourability principle (principe de faveur)**. A more favourable clause in the contract prevails over the collective agreement (except for special agreements, such as the collective performance agreement).

```scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin"
cdi CTR "Léa’s contract"
EMP LEA -> CTR
remuneration REM "€3,400 gross"
CTR -> REM
CCN -> REM encadre "≥ agreed minimum"
focus CTR REM
```
## Question: the agreement sets a €3,600 minimum for Léa’s job. What happens?
Léa’s contract provides for €3,400 gross a month.

```scene
verification off
focus REM CCN
```
- [ ] The contract applies: Léa signed it
  The contract cannot depart, to the employee’s detriment, from the collectively agreed minimum.
- [x] Léa is entitled to the agreed minimum of €3,600
  The less favourable clause is set aside in favour of the agreement.
- [ ] The contract is void
  Only the clause is set aside; the contract survives.

### Answer
The pay clause is **less favourable** than the collective agreement: it is set aside, Léa is entitled to **€3,600** and may claim back pay.

```scene
verification on
statut REM nulle "below the agreed minimum: €3,600 due"
focus REM
```
## 5. Internal rules and custom
The **internal rules (règlement intérieur)** (mandatory from 50 employees) set the rules on health, safety and **discipline**. A **custom (usage)** (a general, consistent and fixed practice, such as a year-end bonus) creates a right until it is properly revoked.

```scene
reglement_interieur RI "Internal rules"
usage US "Holiday bonus"
CT -> RI
RI -> CTR encadre "discipline, sanctions"
US -> LEA lien "bonus due"
focus RI US
```
## 6. Summary
| Source | Role |
|---|---|
| 📕 Statute | public policy, default rules |
| 📗 Sector | minimum wages, classifications, reserved areas |
| 📘 Company agreement | prevails over the sector in other areas |
| 📄 Contract | favourability principle |
| 📙 Internal rules | health, safety, discipline |
| 🔂 Custom | right until revoked |

```scene
vue CTR
```