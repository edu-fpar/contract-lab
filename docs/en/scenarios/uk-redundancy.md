---
droit: uk
---
# Redundancy
> A genuine redundancy, fair selection, consultation, and statutory redundancy pay.

Redundancy is a potentially fair reason (ERA 1996 s.98(2)(c)). A fair redundancy needs a **genuine redundancy situation**, **fair selection**, **meaningful consultation** and a look at **suitable alternative employment**. After 2 years, the employee gets **statutory redundancy pay**.

## 1. Alan's role is at risk
**Alan Hughes**, aged **45**, has worked for **Corvid Print Ltd** for **10 years** as a print technician (£820 a week). Corvid replaces two presses with one digital line and needs fewer technicians.

```scene
employer EMP "Corvid Print Ltd"
employee ALAN "Alan Hughes" service=10 weekly_pay=820 age=45
permanent CT "Alan's contract"
written_particulars WS "Written statement"
EMP ALAN -> CT
WS -> CT
redundancy RED "Redundancy of Alan"
EMP -> RED
RED -> CT
focus RED
```
## 2. A genuine redundancy
ERA 1996 s.139: the business closes, or the requirement for employees to do work of a **particular kind** has ceased or **diminished**. Fewer technicians are needed: a genuine redundancy.

```scene
genuine_redundancy GR "Fewer technicians needed"
GR -> RED
focus GR RED
```
## 3. Pool and selection
All 6 technicians are put in the **pool**. Corvid scores them on objective criteria: skills, performance, disciplinary record. Absences linked to disability or maternity must not count against anyone.

```scene
fair_selection FS "Pool of 6, objective scoring"
FS -> RED
focus FS
```
## 4. Consultation and alternatives
Corvid holds **individual consultation** meetings while the plan is still open, shares Alan's scores, and looks for **suitable alternative employment**. The one vacancy, a night-shift role at a lower grade, is not suitable for Alan. All badges are green ✅.

> 💡 20+ redundancies in 90 days: collective consultation.

```scene
consultation CONS "Two consultation meetings"
alternative_employment ALT "Vacancies reviewed"
RED -> CONS
CONS -> ALT then
focus CONS ALT RED
```
## Question: how much statutory redundancy pay does Alan get?
Alan is 45, with 10 complete years of service; he earns £820 a week. A week's pay is capped at **£751** (from 6 April 2026).

```scene
verification off
statutory_redundancy_pay SRP "Statutory redundancy pay"
RED -> SRP
focus SRP
```
- [ ] 10 weeks × £820 = £8,200
  The age bands and the weekly cap both apply.
- [ ] 15 weeks × £751 = £11,265
  Only the years in which he was 41 or over count at 1.5.
- [x] 12 weeks × £751 = £9,012
  4 years aged 41–44 at 1.5 weeks, 6 years aged 35–40 at 1 week.
- [ ] Nothing: he can find another job
  Redundancy pay is due after 2 years' service.

### Answer
Counting back from the dismissal (ERA 1996 s.162), up to 20 years:

| Years | Age during the year | Weeks |
|---|---|---|
| 4 | 41–44 | 4 × 1.5 = 6 |
| 6 | 35–40 | 6 × 1 = 6 |

**12 weeks** × £751 (capped) = **£9,012**.

> ⚠️ The cap on a week's pay is revised every April.

```scene
verification on
focus SRP
note SRP "12 weeks × £751 = £9,012"
```
## 6. Notice and holiday pay
Alan also gets **10 weeks' notice** (1 week per complete year, s.86), paid on his full salary — the cap does not apply to notice pay: 10 × £820 = **£8,200**.

```scene
notice NOT "10 weeks' notice"
notice_pay NP "Notice pay"
holiday_pay HP "Untaken holiday"
RED -> NOT NP HP
focus NOT NP
```
## 7. Summary
```scene
selection RED
```
| Condition | If missing |
|---|---|
| 📉 Genuine redundancy | unfair |
| 🧮 Fair selection | unfair |
| 🗨️ Consultation | unfair; protective award if 20+ and no collective consultation |
| 🔀 Alternative employment | unfair; unreasonable refusal of a suitable offer loses redundancy pay |
