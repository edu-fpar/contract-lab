---
droit: uk
---
# Restrictive covenants
> Legitimate interest and reasonableness: no payment needed, unlike French law.

A post-termination restriction is a **restraint of trade**: it is **void** unless the employer shows it protects a **legitimate business interest** and goes **no further than reasonably necessary**. Reasonableness is judged at the date the contract was made.

## 1. Tom's non-compete
**Tom Bradley** is a senior consultant at **Hartley Recruitment Ltd** in Manchester. His contract says he may not work "for any competing business anywhere in the UK" after leaving.

As drafted, the clause has none of its safeguards: ⛔ unenforceable.

```scene
employer EMP "Hartley Recruitment Ltd"
employee TOM "Tom Bradley" service=3 weekly_pay=900 age=34
permanent CT "Tom's contract"
written_particulars WS "Written statement"
EMP TOM -> CT
WS -> CT
non_compete NC "Non-compete"
CT -> NC
focus NC
note NC "4 safeguards missing"
```
## 2. A legitimate business interest
Hartley cannot protect itself against **competition as such**. It can protect **client connections** and **confidential information** (candidate lists, fee rates) to which Tom had access.

A junior administrator with no client contact could not be bound the same way.

```scene
legitimate_interest LI "Client contacts and fee data"
LI -> NC
focus LI NC
```
## 3. Reasonable area and scope
"Anywhere in the UK" is too wide for a consultant who worked in the North West. The clause is redrafted:

- **area**: Greater Manchester;
- **scope**: recruitment for the IT sector, the work Tom actually did.

```scene
reasonable_area RA "Greater Manchester"
reasonable_scope RS "IT recruitment only"
RA RS -> NC
focus RA RS
```
## Question: what else does the non-compete need to be enforceable?
Three badges are green. The clause is still not enforceable.

```scene
verification off
focus NC
```
- [ ] Payment to Tom during the restriction
  That is French law. English law requires no payment for a covenant.
- [x] A reasonable duration
  The restriction must last no longer than needed to protect the interest.
- [ ] Tom's signature on each page
  A signed contract is enough; reasonableness is the test.
- [ ] Approval by the tribunal
  No approval is needed; the court tests it if the employer seeks to enforce it.

### Answer
The fourth safeguard is a **reasonable duration**: here **6 months**, the time it takes for clients to get used to Tom's successor.

No payment is required: unlike French law, English law does **not** make compensation a condition of validity.

> 💡 France: a non-compete without payment is void.

```scene
verification on
param NC duration=6
reasonable_duration RD "6 months"
RD -> NC
focus NC RD
```
## 5. Non-solicitation and non-poaching
Narrower covenants are easier to enforce:

- **non-solicitation**: no approaching clients Tom dealt with in his last 12 months, for 12 months;
- **non-poaching**: no recruiting the consultants in his team, for 12 months.

Each has its own safeguards; none needs payment.

```scene
non_solicitation NS "Non-solicitation" duration=12
non_poaching NP "Non-poaching" duration=12
CT -> NS NP
LI -> NS
legitimate_interest LI2 "Stable team"
LI2 -> NP
reasonable_duration RD2 "12 months"
RD2 -> NS NP
reasonable_scope RS2 "Clients of the last 12 months"
reasonable_scope RS3 "His own team only"
RS2 -> NS
RS3 -> NP
focus NS NP
```
## 6. Garden leave and confidentiality
An express **garden leave** clause lets Hartley keep Tom at home on full pay during his notice. Courts usually **set off** garden leave against the post-termination restriction.

The **confidentiality** clause protects trade secrets during and after employment; it does not stop Tom working.

> ⚠️ Plans to cap non-competes are not law yet.

```scene
garden_leave GL "Garden leave (3 months)"
express_term ET "Express clause"
ET -> GL
confidentiality CONF "Confidentiality"
CT -> GL CONF
focus GL NC
```
## 7. A breach by the employer releases Tom
Hartley dismisses Tom on the spot, without notice and without a PILON clause: a **wrongful dismissal**. The employer's **repudiatory breach** releases Tom from his covenants (General Billposting v Atkinson [1909]). The ⊘ symbol shows the covenants neutralised.

```scene
wrongful_dismissal WD "Dismissed without notice"
EMP -> WD
WD -> CT
focus WD NC NS NP
note NC "Released by the employer's breach"
```
## 8. Summary
| Safeguard | Non-compete |
|---|---|
| 🏰 Legitimate interest | client contacts, fee data |
| 🗺️ Area | Greater Manchester |
| 🎯 Scope | IT recruitment |
| ⌛ Duration | 6 months |
| 💰 Payment | **not required** |

If a covenant is too wide, the court may **sever** offending words (Tillman v Egon Zehnder [2019] UKSC 32) but will not rewrite it.

```scene
retirer WD
selection NC
```