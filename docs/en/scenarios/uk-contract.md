---
droit: uk
---
# Building a contract of employment
> Employee or worker, the written statement from day one, key terms, opt-outs and deductions.

We build the contract of **Priya Shah**, hired as a data analyst by **Northwind Analytics Ltd**. Each term is a card; the "📄" frame shows what the contract contains.

Verdicts appear on the cards: ✅ valid, ⚠️ at risk, ⛔ void or unenforceable. The **badges** under a card are its conditions.

## 1. Employee or worker?
English law has three tiers: **employees** (contract of employment, ERA 1996 s.230(1)), **workers** (limb (b), s.230(3)) and the genuinely **self-employed**.

Priya works personally, under Northwind's control, with mutual obligations: she is an **employee**. A worker would get the minimum wage, holiday and discrimination protection — but no unfair dismissal or redundancy pay rights.

```scene
employer EMP "Northwind Analytics Ltd"
employee PRI "Priya Shah" service=0 weekly_pay=650 age=29
focus EMP PRI
```
## 2. A permanent contract… and its written statement
Priya signs a **permanent** (open-ended) contract. The contract itself needs no particular form, but the employer must give a **written statement of particulars** on or before **day one** (ERA 1996 s.1, since April 2020).

Without it, the card is amber: a tribunal can add **2 or 4 weeks' pay** to another successful claim (Employment Act 2002 s.38).

```scene
permanent CT "Priya's contract"
EMP PRI -> CT
focus CT
note CT "No written statement yet"
```
## 3. The written statement and the key terms
Northwind hands Priya her statement on her first morning: the card turns green. It covers, among other things:

| Term | Here |
|---|---|
| 💷 Pay | £650 a week (37.5 hours: £17.33 an hour) |
| ⏱️ Hours | 37.5 hours, Monday to Friday |
| 📍 Place of work | Leeds office, hybrid |
| 🧑‍💼 Job title | Data analyst |
| 🏖️ Holiday | 5.6 weeks (28 days) including bank holidays |

The pay card checks the **National Living Wage**: £12.71 an hour at 21 and over since 1 April 2026.

> ⚠️ Minimum wage rates are revised every April.

```scene
written_particulars WS "Statement given on day one"
WS -> CT
pay PAY "£650 a week" hourly_rate=17.33
hours HRS "37.5 hours"
place PLC "Leeds office"
job_title JOB "Data analyst"
holiday HOL "28 days"
CT -> PAY HRS PLC JOB HOL
focus WS PAY
```
## 4. Opting out of the 48-hour week
Northwind wants Priya to work long hours during year-end. The **Working Time Regulations 1998** cap the working week at **48 hours on average**, unless the worker **opts out**.

A verbal "yes" is not enough: the opt-out must be **in writing**, and the worker can always **cancel** it (7 days' notice, or up to 3 months if agreed).

```scene
opt_out_48h OPT "48-hour opt-out"
CT -> OPT
focus OPT
note OPT "Agreed orally only: ineffective"
```
## 5. A written, cancellable opt-out
Priya signs a separate opt-out form, which reminds her she may cancel it on 7 days' notice. Both badges are green.

> 💡 Refusing to opt out must not lead to any detriment.

```scene
in_writing OW "Signed opt-out form"
right_to_withdraw RW "Cancellable on 7 days' notice"
OW RW -> OPT
focus OPT
```
## Question: can Northwind deduct the cost of a lost laptop from Priya's pay?
Priya loses her work laptop. Her manager says on the phone that £400 will come off her next payslip. Nothing in writing allows it.

```scene
verification off
deductions_clause DED "Laptop deduction (oral)"
CT -> DED
focus DED
```
- [ ] Yes, she was negligent
  Negligence does not authorise a deduction: ERA 1996 s.13 does.
- [x] No, unless a written term or her prior written consent allows it
  A deduction needs statute, a written contractual term notified beforehand, or prior written agreement.
- [ ] Yes, if it keeps her above the minimum wage
  The minimum wage is a separate rule; the deduction itself must be authorised.

### Answer
Under **ERA 1996 s.13** a deduction is lawful only if it is required by statute, authorised by a **written** term notified in advance, or agreed **in writing** before it is made. Otherwise Priya can recover the £400 in the tribunal as an **unlawful deduction from wages**.

```scene
verification on
focus DED
note DED "No written authority: unlawful"
```
## 7. Implied terms
Beyond the written terms, the common law **implies** duties into every contract of employment:

- employer: **duty of care** (safe system of work), **pay** at least the minimum wage, **no unlawful discrimination** (Equality Act 2010);
- both: **mutual trust and confidence** (Malik v BCCI [1997]);
- employee: **fidelity**, **obey lawful and reasonable instructions**, **reasonable care and skill**.

```scene
retirer DED
duty_of_care DOC "Duty of care"
pay_wages PW "Pay at least the NLW"
non_discrimination ND "Equality Act 2010"
mutual_trust MT "Mutual trust and confidence"
fidelity FID "Fidelity"
obey_instructions OBE "Lawful instructions"
care_skill CS "Care and skill"
EMP -> DOC PW ND MT
PRI -> MT FID OBE CS
focus MT
```
## 8. Summary
- **Employee** status unlocks the full set of rights; **workers** get a core set.
- The **written statement** is due on or before **day one**.
- **Opt-outs** and **deductions** need writing.
- **Implied terms** complete every contract.

```scene
selection OPT
```