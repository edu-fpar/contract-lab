---
droit: uk
---
# Unfair dismissal for misconduct
> A potentially fair reason, the Burchell test, the ACAS Code and Polkey.

Under ERA 1996 s.98, the employer must show a **potentially fair reason**; the tribunal then asks whether dismissal was **reasonable** in all the circumstances (s.98(4)), including the **procedure**. The **ACAS Code of Practice** sets the minimum steps.

## 1. Daniel's case
**Daniel Okafor**, warehouse supervisor at **Kestrel Logistics Ltd** for **6 years** (£640 a week, aged 38), is suspected of **falsifying timesheets**. Kestrel decides to dismiss him.

A bare dismissal has no reason and no procedure: ⛔ unfair.

```scene
employer EMP "Kestrel Logistics Ltd"
employee DAN "Daniel Okafor" service=6 weekly_pay=640 age=38
permanent CT "Daniel's contract"
written_particulars WS "Written statement"
EMP DAN -> CT
WS -> CT
conduct_dismissal DIS "Dismissal of Daniel"
EMP -> DIS
DIS -> CT
focus DIS
```
## 2. A potentially fair reason
**Conduct** is one of the five potentially fair reasons (s.98(2)(b)), with capability, redundancy, statutory restriction and "some other substantial reason".

Daniel has 6 years' service: well above the **2-year** qualifying period.

> ⚠️ 6 months from 1 January 2027 (ERA 2025).

```scene
misconduct MIS "Falsified timesheets"
MIS -> DIS
focus MIS DIS
```
## 3. The ACAS steps
Kestrel follows the Code:

1. **written notification** of the allegations and evidence;
2. a **disciplinary meeting**, with the **right to be accompanied** (ERA 1999 s.10);
3. a **written decision**;
4. an **appeal** to a manager not previously involved.

```scene
disciplinary_letter LET "Letter with the allegations"
disciplinary_meeting MEET "Disciplinary meeting"
companion COMP "Union rep present"
decision DEC "Written decision"
appeal APP "Appeal"
DIS -> LET
LET -> MEET then "reasonable notice"
COMP -> MEET
MEET -> DEC then
DEC -> APP then
focus LET MEET DEC APP
```
## Question: the manager never looked at the clocking records. Is the dismissal fair?
The manager relied on a colleague's rumour and did not check the clocking system. Daniel denies everything.

```scene
verification off
focus DIS
```
- [ ] Yes, the ACAS steps were followed
  Steps alone are not enough: the employer's belief must rest on a reasonable investigation.
- [x] No: the Burchell test is not met
  Genuine belief, reasonable grounds and a reasonable investigation are needed.
- [ ] Yes, misconduct is a fair reason
  It is only potentially fair; reasonableness decides.

### Answer
**British Home Stores v Burchell [1980]**: the employer must (1) **genuinely believe** the employee is guilty, (2) on **reasonable grounds**, (3) after as much **investigation** as is reasonable. Without the investigation the dismissal is **unfair**.

Kestrel starts again: an investigator checks the clocking data and CCTV, which confirm 14 falsified shifts.

```scene
verification on
investigation INV "Clocking data and CCTV"
genuine_belief GB "Belief on reasonable grounds"
DIS -> INV
INV -> LET then
GB -> DIS
focus INV GB
```
## 5. The band of reasonable responses
Last question for the tribunal: was dismissal within the **band of reasonable responses** of a reasonable employer (Iceland Frozen Foods v Jones [1983])? Deliberate falsification by a supervisor: yes. The tribunal may not substitute its own view.

The dismissal is **fair** ✅.

```scene
reasonable_response BRR "Within the band"
BRR -> DIS
focus DIS
```
## 6. If the procedure had been skipped: Polkey
Suppose Kestrel had skipped the investigation. The dismissal would be **unfair**, but under **Polkey v AE Dayton Services [1987]** the compensatory award can be cut by the chance that a fair procedure would have led to dismissal anyway — here 50%. An unreasonable failure to follow the Code adds up to **25%** (here 20%).

- **basic award**: 6 years aged 32–37, 1 week each: 6 × £640 = **£3,840**;
- **compensatory award**: £12,000 loss − 50% + 20% = **£7,200** (cap: 52 × £640 = £33,280).

```scene
retirer INV
basic_award BA "Basic award"
compensatory_award CA "Compensatory award" loss=12000 polkey=50 uplift=20
DIS -> BA CA
focus DIS BA CA
```
## 7. Summary
```scene
selection DIS
```
| Question | Source |
|---|---|
| A potentially fair reason? | ERA 1996 s.98(1)–(2) |
| Genuine belief, reasonable grounds, investigation? | Burchell [1980] |
| Fair procedure? | ACAS Code; 25% uplift |
| Reasonable sanction? | s.98(4), band of reasonable responses |
| Fair procedure would have changed nothing? | Polkey: reduction |
