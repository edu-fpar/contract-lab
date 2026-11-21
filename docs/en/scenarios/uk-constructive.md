---
droit: uk
---
# Constructive dismissal
> The employee resigns, but the law treats it as a dismissal.

Under ERA 1996 s.95(1)(c), an employee who resigns in response to the employer's **repudiatory breach** is **dismissed**. The test is contractual (Western Excavating v Sharp [1978]): a breach going to the root of the contract, and a resignation **without undue delay**.

## 1. Mark's contract
**Mark Evans**, aged **40**, has been a site manager at **Granite Homes Ltd** for **5 years**, on £600 a week. The employer owes him his **pay** and **mutual trust and confidence** (Malik v BCCI [1997]).

```scene
employer EMP "Granite Homes Ltd"
employee MARK "Mark Evans" service=5 weekly_pay=600 age=40
permanent CT "Mark's contract"
written_particulars WS "Written statement"
EMP MARK -> CT
WS -> CT
pay PAY "£600 a week"
CT -> PAY
pay_wages PW "Pay the agreed wages"
mutual_trust MT "Mutual trust and confidence"
EMP -> PW MT
focus PW MT
```
## 2. A unilateral pay cut
Granite announces a **20% pay cut**, without Mark's agreement. Cutting pay without consent is a breach of an express term — a **fundamental** one. The obligation turns ⚡ breached.

```scene
breach CUT "20% pay cut imposed"
CUT -> PW
focus CUT PW
```
## 3. Mark resigns
Mark resigns, saying it is because of the pay cut. On its own, the constructive dismissal card is ⛔: the tool needs the **breach** and a **prompt resignation**.

```scene
constructive_dismissal CD "Mark resigns"
MARK -> CD
CD -> CT
focus CD
```
## 4. A repudiatory breach
The pay cut goes to the root of the contract: it is a **repudiatory breach** (contract test, not "unreasonable behaviour"). A series of smaller acts can also qualify as a "last straw".

```scene
repudiatory_breach RB "Pay cut = fundamental breach"
RB -> CD
CUT -> RB lien "amounts to"
focus RB CD
```
## Question: Mark kept working on the reduced pay for 8 months before resigning. Can he still claim?
He grumbled, but signed the new payslips without objection.

```scene
verification off
focus CD
```
- [ ] Yes, a breach is a breach
  The employee must accept the breach; he can lose that right.
- [x] Probably not: by delaying he may have affirmed the contract
  Working on without protest for a long time can amount to affirmation.
- [ ] Yes, as long as he resigns before 2 years
  The issue is delay in resigning, not service.

### Answer
The employee must resign in response to the breach **without undue delay**; otherwise he is taken to have **affirmed** the contract. Working briefly **under protest** is allowed. Here, Mark resigns **two weeks** after the cut, with a letter explaining why: he did not affirm.

```scene
verification on
prompt_resignation PR "Resigned 2 weeks later"
PR -> CD
focus CD PR
```
## 6. Unfair, and compensated
A constructive dismissal is usually **unfair**. Mark has 5 years' service, above the qualifying period.

- **basic award**: 5 years aged 35–39, 1 week each: 5 × £600 = **£3,000**;
- **compensatory award**: his loss of earnings while he looks for work.

```scene
unfair_dismissal_right UD "Unfair dismissal claim"
basic_award BA "Basic award"
CD -> UD BA
focus UD BA
```
## 7. Summary
| Step | Rule |
|---|---|
| 💥 Repudiatory breach by the employer | Western Excavating v Sharp [1978] |
| ⏩ Resignation in response, without delay | no affirmation |
| 🛡️ Unfair dismissal claim | qualifying period: 2 years |

> ⚠️ 6 months from 1 January 2027 (ERA 2025).

```scene
selection CD
```