---
droit: uk
---
# Quiz: English employment law
> Six quick questions to revise contracts, covenants and termination.

A revision quiz: the canvas illustrates each situation. Click the class's answer, then reveal.

## Question: what is the statutory minimum notice after 7 years and 3 months?
```scene
employer EMP "Employer"
employee EE "Employee" service=7.25 weekly_pay=600 age=35
contrat CT "Contract"
EMP EE -> CT
rupture DIS "Dismissal"
EMP -> DIS
DIS -> CT
notice NOT "Notice"
DIS -> NOT
verification off
focus NOT
```
- [ ] 1 month
  English statutory notice is counted in weeks.
- [x] 7 weeks
  1 week per complete year from 2 years: 7 complete years.
- [ ] 8 weeks
  Incomplete years do not count.

### Answer
ERA 1996 s.86: **1 week per complete year** from 2 years, up to 12 weeks: **7 weeks**.

```scene
verification on
```
## Question: does an English non-compete need a payment to be valid?
```scene
effacer
non_compete NC "Non-compete"
legitimate_interest LI "Client connections"
reasonable_duration RD "6 months"
reasonable_area RA "London"
reasonable_scope RS "Same activity"
LI RD RA RS -> NC
verification off
focus NC
```
- [ ] Yes, as in French law
  The payment is a French condition.
- [x] No: legitimate interest and reasonableness are enough
  English law requires no compensation.

### Answer
A restraint of trade is enforceable if it protects a **legitimate business interest** and is **no wider than reasonably necessary**. No payment is required.

```scene
verification on
```
## Question: Leah, 25, is made redundant after 3 years on £500 a week. Her redundancy pay?
```scene
effacer
employer EMP "Employer"
employee LEAH "Leah" service=3 weekly_pay=500 age=25
contrat CT "Leah's contract"
EMP LEAH -> CT
rupture RED "Redundancy"
EMP -> RED
RED -> CT
statutory_redundancy_pay SRP "Redundancy pay"
RED -> SRP
verification off
focus SRP
```
- [ ] £750
  Half a week applies only to years under 22.
- [x] £1,500
  3 years aged 22–24: 3 × 1 week × £500.
- [ ] Nothing: under 5 years' service
  The threshold is 2 years.

### Answer
Ages 22, 23 and 24 during the three years: **1 week** each, so 3 weeks × £500 (below the £751 cap) = **£1,500**.

```scene
verification on
```
## Question: an employee signs a settlement agreement without independent advice. Result?
```scene
effacer
settlement_agreement SA "Settlement agreement"
in_writing W "In writing"
particular_complaint PCOMP "Unfair dismissal"
W PCOMP -> SA
verification off
focus SA
```
- [ ] Valid: it is signed and in writing
  Writing is only one condition.
- [x] Void as to statutory claims (s.203)
  Independent advice from a named, insured adviser is required.

### Answer
Without **independent advice** (and an identified, insured adviser) the agreement cannot settle statutory claims: they survive.

```scene
verification on
```
## Question: dismissed for gross misconduct, what is still due?
```scene
effacer
summary_dismissal SD "Summary dismissal"
gross_misconduct GM "Fraud"
GM -> SD
notice NOT "Notice"
notice_pay NP "Notice pay"
holiday_pay HP "Holiday pay"
SD -> NOT NP HP
verification off
focus NOT NP HP
```
- [ ] Notice pay
  Gross misconduct justifies dismissal without notice.
- [x] Accrued holiday pay
  Always due on termination (WTR reg 14).
- [ ] Nothing at all
  Holiday pay survives.

### Answer
Gross misconduct removes **notice** and **notice pay** (⊘), but **accrued holiday pay** is still due.

```scene
verification on
```
## Question: Ben has 18 months' service and is dismissed without a hearing. Unfair dismissal claim?
```scene
effacer
employer EMP "Employer"
employee BEN "Ben" service=1.5 weekly_pay=550 age=30
contrat CT "Ben's contract"
EMP BEN -> CT
conduct_dismissal DIS "Dismissal"
EMP -> DIS
DIS -> CT
unfair_dismissal_right UD "Unfair dismissal claim"
DIS -> UD
verification off
focus DIS UD
```
- [ ] Yes: there was no hearing
  Procedure matters only if he can claim.
- [x] No ordinary claim: under 2 years' service
  The qualifying period is 2 years today.
- [ ] Yes, if he claims within 3 months
  Time limits do not replace the qualifying period.

### Answer
Ordinary unfair dismissal requires **2 years** (s.108); exceptions for automatically unfair reasons and discrimination.

> ⚠️ 6 months from 1 January 2027 (ERA 2025).

```scene
verification on
focus UD
```