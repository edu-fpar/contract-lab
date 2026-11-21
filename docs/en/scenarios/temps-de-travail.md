# Days-based agreement, on-call duty, part-time work
> Three working-time arrangements, each with its own conditions.

Working time is protected by public-policy rules (maximum hours, rest periods). Arrangements that depart from them are allowed, but **subject to conditions**.

## 1. Marc’s days-based agreement
**Marc**, an autonomous manager, signs a **days-based working-time agreement (forfait jours)**: 218 working days a year, with no hourly count.

Four conditions: a protective **collective agreement**, a **written individual agreement**, genuine **autonomy** and **monitoring of the workload**.

```scene
employeur EMP "Conseil & Data"
salarie MARC "Marc Dubois" categorie=cadre anciennete=5 salaire=4800
cdi CT "Marc’s CDI"
EMP MARC -> CT
forfait_jours FJ "218-day agreement"
CT -> FJ
accord_collectif ACC "Syntec agreement"
convention_individuelle CI "Signed days-based agreement"
autonomie AUT "Organises his own diary"
ACC CI AUT -> FJ
focus FJ
```
## Question: one badge is missing. What does the employer risk?
The employer has never held a meeting about Marc’s workload, and he often works 60 hours a week.

```scene
verification off
focus FJ
```
- [ ] Nothing: a days-based agreement has no working hours
  The agreement dispenses with counting hours, not with protecting health.
- [x] The agreement is ineffective: Marc can claim his overtime
  Without actual monitoring of the workload, the days-based agreement is ineffective.
- [ ] Marc’s contract is reclassified as a CDD
  Unrelated: the sanction concerns the agreement, not the length of the contract.

### Answer
Without **actual and regular monitoring of the workload**, the days-based agreement is **ineffective**: Marc reverts to the 35-hour week and can claim payment of his **overtime**. The failure also breaches the employer’s **duty of safety**.

```scene
verification on
note FJ "Ineffective: overtime payable"
```
## 3. Workload monitoring
The employer introduces an annual workload review and an alert tool: the agreement takes effect.

```scene
suivi_charge SC "Annual review + alert"
SC -> FJ
focus FJ SC
```
## 4. Weekend on-call duty
Marc must be reachable one weekend a month for incidents at clients’ premises. This is **on-call duty (astreinte)**: only the intervention counts as actual working time.

It gives entitlement to **compensation** (financial or time off) and the employee must know the schedule in advance.

```scene
astreinte AST "Weekend on-call duty"
CT -> AST
contrepartie CPA "€150 per weekend"
delai_prevenance DPA "Rota 15 days ahead"
CPA DPA -> AST
focus AST
```
## 5. Inès’s part-time work
**Inès** works part-time. Her contract must be **in writing** and state the working **hours** and their **distribution** over the days of the week. Otherwise, it is **presumed full-time** (the employer may rebut the presumption).

```scene
salarie INES "Inès Roche" categorie=employe
cdi CT2 "Inès’s CDI"
EMP INES -> CT2
temps_partiel TP "Part-time 20 h"
CT2 -> TP
ecrit EC2 "Written contract"
EC2 -> TP
focus TP
note TP "Distribution missing: presumed full-time"
```
## 6. Summary
- **Days-based agreement**: collective agreement + individual agreement + autonomy + workload monitoring.
- **On-call duty**: compensation + schedule known in advance.
- **Part-time**: in writing + hours and distribution, otherwise presumed full-time.

```scene
repartition REP "Monday to Thursday afternoons"
REP -> TP
selection FJ
```