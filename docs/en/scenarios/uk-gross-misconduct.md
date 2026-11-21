---
droit: uk
---
# Gross misconduct, summary and wrongful dismissal
> Dismissal without notice: lawful for gross misconduct, wrongful otherwise.

Two different questions: is the dismissal **fair** (statute, ERA 1996 s.98)? And was **notice** properly given (contract)? A dismissal without notice is lawful only if the employee committed a **repudiatory breach**: gross misconduct.

## 1. Sarah is dismissed on the spot
**Sarah Mitchell**, a sales assistant at **Larkspur Retail Ltd** for **4 years** (£480 a week, aged 30), is caught taking cash from the till. Larkspur dismisses her **summarily**: no notice, no pay in lieu.

```scene
employer EMP "Larkspur Retail Ltd"
employee SAR "Sarah Mitchell" service=4 weekly_pay=480 age=30
permanent CT "Sarah's contract"
written_particulars WS "Written statement"
EMP SAR -> CT
WS -> CT
summary_dismissal SD "Summary dismissal"
EMP -> SD
SD -> CT
focus SD
```
## 2. Precautionary suspension
Before deciding, Larkspur **suspends** Sarah **on full pay** while it investigates. Suspension is not a sanction and should be as short as possible.

```scene
suspension SUS "Suspended on full pay"
investigation INV "CCTV and till records"
SD -> SUS
SUS -> INV then
focus SUS INV
```
## 3. Gross misconduct
Theft is a classic example of **gross misconduct**: it destroys trust and is a **repudiatory breach** by the employee. Larkspur may accept it and dismiss **without notice**.

The ⊘ symbols show what she loses: **notice** and **notice pay**.

```scene
gross_misconduct GM "Theft from the till"
GM -> SD
notice NOT "Notice"
notice_pay NP "Notice pay"
SD -> NOT NP
focus GM NOT NP
```
## 4. What she keeps
Accrued, untaken **holiday pay** is due whatever the reason for leaving, even gross misconduct (WTR reg 14): 5 days × £96 = **£480**.

> 💡 Fairness still needs a fair procedure (ACAS Code).

```scene
holiday_pay HP "Untaken holiday" untaken_days=5 day_pay=96
SD -> HP
focus HP
```
## Question: the CCTV shows no theft, only lateness. What follows?
On review, the till shortfall was a cashing-up error. All that remains is **repeated lateness**: misconduct, not gross misconduct.

```scene
verification off
type GM misconduct
renommer GM "Repeated lateness"
focus SD NOT NP
```
- [ ] Nothing changes: the employer believed it was theft
  A genuine belief helps on fairness, not on the contract: summary dismissal needs an actual repudiatory breach.
- [x] The dismissal is wrongful: notice pay is due as damages
  Without gross misconduct, dismissing without notice breaches the contract.
- [ ] Sarah gets statutory redundancy pay
  There is no redundancy here.

### Answer
Without gross misconduct, the summary dismissal is a **wrongful dismissal** (breach of contract). Damages equal the **notice pay** Sarah should have received: statutory notice of **4 weeks** for 4 complete years × £480 = **£1,920**.

A wrongful dismissal claim has **no qualifying period**; it can be brought in the tribunal (up to £25,000) or the courts.

```scene
verification on
focus SD NOT NP
note NP "4 weeks × £480 = £1,920"
```
## 6. Wrongful is not unfair
| | Wrongful dismissal | Unfair dismissal |
|---|---|---|
| Source | contract (common law) | statute (ERA 1996) |
| Question | was notice given? | reason and procedure fair? |
| Qualifying period | none | 2 years |
| Remedy | damages = notice pay | basic + compensatory award |

> ⚠️ 2 years becomes 6 months on 1 January 2027.

```scene
selection SD
```