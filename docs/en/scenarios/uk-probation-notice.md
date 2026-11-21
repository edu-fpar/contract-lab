---
droit: uk
---
# Probation and notice
> Contractual notice, the statutory minimum of ERA 1996 s.86, and notice pay.

Notice is the period each party must give to end the contract. The contract can be generous, but never below the **statutory minimum** (ERA 1996 s.86): from the employer, **1 week** after one month of service, then **1 week per complete year** from 2 years, up to **12 weeks**.

## 1. Jamie's probation
**Jamie Collins** joins **Bramley Foods Ltd** as a logistics coordinator, on £520 a week. The contract sets a **6-month probation** with **1 week's notice** during probation.

There is no statutory maximum for probation; its duration and conditions belong in the written statement.

```scene
employer EMP "Bramley Foods Ltd"
employee JAM "Jamie Collins" service=0 weekly_pay=520 age=27
permanent CT "Jamie's contract"
written_particulars WS "Written statement"
EMP JAM -> CT
WS -> CT
probation PROB "6-month probation" duration=6
CT -> PROB
focus PROB
```
## 2. Ending employment during probation
After **4 months**, Bramley decides Jamie is not suited to the role. This is an ordinary dismissal:

- statutory notice: **1 week** (more than one month of service);
- no ordinary **unfair dismissal** claim: 4 months is below the qualifying period of **2 years**.

> ⚠️ From 1 January 2027: 6 months (ERA 2025).

```scene
param JAM service=0.33
probation_dismissal PD "End of probation"
EMP -> PD
PD -> CT
notice NOT "1 week's notice" notice_weeks=1
PD -> NOT
focus PD NOT
```
## 3. A contractual notice clause
Instead, imagine Jamie passes probation and stays. His contract gives **one month's notice** (4 weeks) after probation. Five years and eight months later, Bramley dismisses him.

```scene
retirer PD NOT
param JAM service=5.67
notice_clause NC "4 weeks' notice" notice_weeks=4
CT -> NC
focus NC
```
## Question: how much notice must Bramley give Jamie?
Jamie has 5 complete years of service. His contract says 4 weeks.

```scene
verification off
rupture RED "Dismissal"
EMP -> RED
RED -> CT
notice NOT "Notice"
RED -> NOT
focus NC NOT
```
- [ ] 4 weeks, as the contract says
  The contract cannot give less than the statutory minimum.
- [x] 5 weeks
  1 week per complete year of service from 2 years: 5 complete years, 5 weeks.
- [ ] 6 weeks
  Only complete years count: 5 years and 8 months is 5 years.
- [ ] 12 weeks
  12 weeks is the maximum, reached after 12 years.

### Answer
The statutory minimum prevails over a shorter contractual period: **5 weeks** for 5 complete years (s.86(1)). The notice clause card turns amber: the statutory minimum applies instead.

```scene
verification on
focus NC NOT
note NC "Statutory minimum prevails: 5 weeks"
```
## 5. Notice pay
If Bramley pays Jamie instead of letting him work his notice, or dismisses him without notice outside gross misconduct, he is owed **notice pay**: the longer of statutory and contractual notice × gross weekly pay.

5 weeks × £520 = **£2,600** (no cap on a week's pay here).

```scene
notice_pay NP "Notice pay"
RED -> NP
focus NP
```
## 6. And if Jamie resigns?
The employee's statutory minimum is only **1 week**, whatever the length of service (s.86(2)). Here the contract asks for 4 weeks: Jamie must give 4.

Accrued, untaken **holiday** is paid on leaving whatever the reason (WTR reg 14): 6 days × £104 = **£624**.

```scene
retirer RED NP
resignation RES "Jamie resigns"
clear_resignation CR "Clear resignation letter"
CR -> RES
JAM -> RES
RES -> CT
RES -> NOT
holiday_pay HP "Untaken holiday" untaken_days=6 day_pay=104
RES -> HP
focus RES NOT HP
```
## 7. Summary
| Service | Statutory notice from the employer |
|---|---|
| under 1 month | none |
| 1 month to under 2 years | 1 week |
| 2 to 12 years | 1 week per complete year |
| 12 years or more | 12 weeks |

From the employee: **1 week** after one month. The contract may give more, never less.

```scene
selection NOT
```