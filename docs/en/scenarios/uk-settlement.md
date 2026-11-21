---
droit: uk
---
# Settlement agreements
> Waiving statutory claims is void… unless the conditions of ERA 1996 s.203 are met.

An employee cannot simply sign away statutory rights: any such term is **void** (ERA 1996 s.203(1)). Two exceptions: a settlement through **ACAS** (COT3), or a **settlement agreement** meeting strict conditions.

## 1. Emma's exit
**Emma Clarke** has worked for **Sterling Insurance plc** for **3 years** (£700 a week). Her relationship with her new manager has broken down. Sterling would like her to leave on agreed terms.

```scene
employer EMP "Sterling Insurance plc"
employee EMMA "Emma Clarke" service=3 weekly_pay=700 age=36
permanent CT "Emma's contract"
written_particulars WS "Written statement"
EMP EMMA -> CT
WS -> CT
focus EMP EMMA
```
## 2. A protected conversation
Sterling invites Emma to a **without prejudice / protected conversation**. Under s.111A, what is said is generally **inadmissible** in an ordinary unfair dismissal claim, unless there is improper behaviour (pressure, harassment).

The ACAS Code advises at least **10 calendar days** to consider an offer.

```scene
protected_conversation PC "Protected conversation"
focus PC
```
## 3. A simple waiver in the contract?
Sterling's first idea: add a clause to Emma's contract by which she "waives all claims against the company". It is **void** under s.203: the badge says it all.

```scene
contracting_out WAIV "Waiver of all claims"
CT -> WAIV
focus WAIV
```
## 4. The settlement agreement
Instead, the parties negotiate a **settlement agreement**. On its own, the card is ⛔: none of the four statutory conditions is met yet.

```scene
retirer WAIV
settlement_agreement SA "Settlement agreement"
EMP EMMA -> SA
SA -> CT
PC -> SA then
focus SA
```
## 5. In writing, for particular complaints
The agreement is **in writing** and lists the **particular complaints** it settles: unfair dismissal, breach of contract, sex discrimination. A blanket "all claims" is not enough.

```scene
in_writing W "Written agreement"
particular_complaint PCOMP "UD, contract, discrimination"
W PCOMP -> SA
focus SA
```
## Question: Emma wants to sign today, without advice. Is the agreement valid?
Two badges are still missing.

```scene
verification off
focus SA
```
- [ ] Yes, if she signs voluntarily
  Consent is not enough for statutory claims.
- [ ] Yes, if Sterling's own lawyer explains it to her
  The adviser must be independent of the employer.
- [x] No: she needs advice from a relevant independent adviser, named and insured
  Without it, her statutory claims survive.

### Answer
ERA 1996 s.203(3) also requires that Emma has received advice from a **relevant independent adviser** (lawyer, certified union official or advice worker) on the terms and **effect** of the agreement; that the adviser is **named** and **insured**; and that the agreement **states** the conditions are met. Employers usually contribute to the adviser's fee.

```scene
verification on
independent_advice IA "Advice from her solicitor"
adviser_identified AI "Solicitor named and insured"
IA AI -> SA
focus SA IA AI
```
## 7. The payment
Sterling pays £25,000. Notice pay is taxable; the first **£30,000** of a genuine termination payment can be paid **tax-free** (HMRC). Untaken holiday is paid as usual.

```scene
settlement_payment PAY "Settlement sum" amount=25000
holiday_pay HP "Untaken holiday"
SA -> PAY HP
focus PAY
```
## 8. Summary
```scene
selection SA
```
| Condition (s.203(3)) | Here |
|---|---|
| ✍️ In writing | signed agreement |
| 📎 Particular complaints | UD, contract, discrimination |
| 🧑‍⚖️ Independent advice | her solicitor |
| 🪪 Adviser named, insured; statement | in the agreement |

Alternative: an **ACAS COT3** settlement.
