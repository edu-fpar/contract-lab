/* ============================================================
 * Scénarios de droit anglais (England & Wales), en anglais.
 * Position stated: law in force on 20 November 2026 (figures from
 * 6 April 2026). Blocks use ~~~scene (no backticks in JS strings).
 * ============================================================ */
window.P = window.P || {};
P.LIBRARY = P.LIBRARY || [];
P.LIBRARY.push(

{ id: 'uk-contract', lang: 'en', md: `---
droit: uk
---
# Building a contract of employment
> Employee or worker, the written statement from day one, key terms, opt-outs and deductions.

We build the contract of **Priya Shah**, hired as a data analyst by **Northwind Analytics Ltd**. Each term is a card; the "📄" frame shows what the contract contains.

Verdicts appear on the cards: ✅ valid, ⚠️ at risk, ⛔ void or unenforceable. The **badges** under a card are its conditions.

## 1. Employee or worker?
English law has three tiers: **employees** (contract of employment, ERA 1996 s.230(1)), **workers** (limb (b), s.230(3)) and the genuinely **self-employed**.

Priya works personally, under Northwind's control, with mutual obligations: she is an **employee**. A worker would get the minimum wage, holiday and discrimination protection — but no unfair dismissal or redundancy pay rights.

~~~scene
employer EMP "Northwind Analytics Ltd"
employee PRI "Priya Shah" service=0 weekly_pay=650 age=29
focus EMP PRI
~~~

## 2. A permanent contract… and its written statement
Priya signs a **permanent** (open-ended) contract. The contract itself needs no particular form, but the employer must give a **written statement of particulars** on or before **day one** (ERA 1996 s.1, since April 2020).

Without it, the card is amber: a tribunal can add **2 or 4 weeks' pay** to another successful claim (Employment Act 2002 s.38).

~~~scene
permanent CT "Priya's contract"
EMP PRI -> CT
focus CT
note CT "No written statement yet"
~~~

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

~~~scene
written_particulars WS "Statement given on day one"
WS -> CT
pay PAY "£650 a week" hourly_rate=17.33
hours HRS "37.5 hours"
place PLC "Leeds office"
job_title JOB "Data analyst"
holiday HOL "28 days"
CT -> PAY HRS PLC JOB HOL
focus WS PAY
~~~

## 4. Opting out of the 48-hour week
Northwind wants Priya to work long hours during year-end. The **Working Time Regulations 1998** cap the working week at **48 hours on average**, unless the worker **opts out**.

A verbal "yes" is not enough: the opt-out must be **in writing**, and the worker can always **cancel** it (7 days' notice, or up to 3 months if agreed).

~~~scene
opt_out_48h OPT "48-hour opt-out"
CT -> OPT
focus OPT
note OPT "Agreed orally only: ineffective"
~~~

## 5. A written, cancellable opt-out
Priya signs a separate opt-out form, which reminds her she may cancel it on 7 days' notice. Both badges are green.

> 💡 Refusing to opt out must not lead to any detriment.

~~~scene
in_writing OW "Signed opt-out form"
right_to_withdraw RW "Cancellable on 7 days' notice"
OW RW -> OPT
focus OPT
~~~

## Question: can Northwind deduct the cost of a lost laptop from Priya's pay?
Priya loses her work laptop. Her manager says on the phone that £400 will come off her next payslip. Nothing in writing allows it.

~~~scene
verification off
deductions_clause DED "Laptop deduction (oral)"
CT -> DED
focus DED
~~~

- [ ] Yes, she was negligent
  Negligence does not authorise a deduction: ERA 1996 s.13 does.
- [x] No, unless a written term or her prior written consent allows it
  A deduction needs statute, a written contractual term notified beforehand, or prior written agreement.
- [ ] Yes, if it keeps her above the minimum wage
  The minimum wage is a separate rule; the deduction itself must be authorised.

### Answer
Under **ERA 1996 s.13** a deduction is lawful only if it is required by statute, authorised by a **written** term notified in advance, or agreed **in writing** before it is made. Otherwise Priya can recover the £400 in the tribunal as an **unlawful deduction from wages**.

~~~scene
verification on
focus DED
note DED "No written authority: unlawful"
~~~

## 7. Implied terms
Beyond the written terms, the common law **implies** duties into every contract of employment:

- employer: **duty of care** (safe system of work), **pay** at least the minimum wage, **no unlawful discrimination** (Equality Act 2010);
- both: **mutual trust and confidence** (Malik v BCCI [1997]);
- employee: **fidelity**, **obey lawful and reasonable instructions**, **reasonable care and skill**.

~~~scene
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
~~~

## 8. Summary
- **Employee** status unlocks the full set of rights; **workers** get a core set.
- The **written statement** is due on or before **day one**.
- **Opt-outs** and **deductions** need writing.
- **Implied terms** complete every contract.

~~~scene
selection OPT
~~~
` },

{ id: 'uk-covenants', lang: 'en', md: `---
droit: uk
---
# Restrictive covenants
> Legitimate interest and reasonableness: no payment needed, unlike French law.

A post-termination restriction is a **restraint of trade**: it is **void** unless the employer shows it protects a **legitimate business interest** and goes **no further than reasonably necessary**. Reasonableness is judged at the date the contract was made.

## 1. Tom's non-compete
**Tom Bradley** is a senior consultant at **Hartley Recruitment Ltd** in Manchester. His contract says he may not work "for any competing business anywhere in the UK" after leaving.

As drafted, the clause has none of its safeguards: ⛔ unenforceable.

~~~scene
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
~~~

## 2. A legitimate business interest
Hartley cannot protect itself against **competition as such**. It can protect **client connections** and **confidential information** (candidate lists, fee rates) to which Tom had access.

A junior administrator with no client contact could not be bound the same way.

~~~scene
legitimate_interest LI "Client contacts and fee data"
LI -> NC
focus LI NC
~~~

## 3. Reasonable area and scope
"Anywhere in the UK" is too wide for a consultant who worked in the North West. The clause is redrafted:

- **area**: Greater Manchester;
- **scope**: recruitment for the IT sector, the work Tom actually did.

~~~scene
reasonable_area RA "Greater Manchester"
reasonable_scope RS "IT recruitment only"
RA RS -> NC
focus RA RS
~~~

## Question: what else does the non-compete need to be enforceable?
Three badges are green. The clause is still not enforceable.

~~~scene
verification off
focus NC
~~~

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

~~~scene
verification on
param NC duration=6
reasonable_duration RD "6 months"
RD -> NC
focus NC RD
~~~

## 5. Non-solicitation and non-poaching
Narrower covenants are easier to enforce:

- **non-solicitation**: no approaching clients Tom dealt with in his last 12 months, for 12 months;
- **non-poaching**: no recruiting the consultants in his team, for 12 months.

Each has its own safeguards; none needs payment.

~~~scene
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
~~~

## 6. Garden leave and confidentiality
An express **garden leave** clause lets Hartley keep Tom at home on full pay during his notice. Courts usually **set off** garden leave against the post-termination restriction.

The **confidentiality** clause protects trade secrets during and after employment; it does not stop Tom working.

> ⚠️ Plans to cap non-competes are not law yet.

~~~scene
garden_leave GL "Garden leave (3 months)"
express_term ET "Express clause"
ET -> GL
confidentiality CONF "Confidentiality"
CT -> GL CONF
focus GL NC
~~~

## 7. A breach by the employer releases Tom
Hartley dismisses Tom on the spot, without notice and without a PILON clause: a **wrongful dismissal**. The employer's **repudiatory breach** releases Tom from his covenants (General Billposting v Atkinson [1909]). The ⊘ symbol shows the covenants neutralised.

~~~scene
wrongful_dismissal WD "Dismissed without notice"
EMP -> WD
WD -> CT
focus WD NC NS NP
note NC "Released by the employer's breach"
~~~

## 8. Summary
| Safeguard | Non-compete |
|---|---|
| 🏰 Legitimate interest | client contacts, fee data |
| 🗺️ Area | Greater Manchester |
| 🎯 Scope | IT recruitment |
| ⌛ Duration | 6 months |
| 💰 Payment | **not required** |

If a covenant is too wide, the court may **sever** offending words (Tillman v Egon Zehnder [2019] UKSC 32) but will not rewrite it.

~~~scene
retirer WD
selection NC
~~~
` },

{ id: 'uk-probation-notice', lang: 'en', md: `---
droit: uk
---
# Probation and notice
> Contractual notice, the statutory minimum of ERA 1996 s.86, and notice pay.

Notice is the period each party must give to end the contract. The contract can be generous, but never below the **statutory minimum** (ERA 1996 s.86): from the employer, **1 week** after one month of service, then **1 week per complete year** from 2 years, up to **12 weeks**.

## 1. Jamie's probation
**Jamie Collins** joins **Bramley Foods Ltd** as a logistics coordinator, on £520 a week. The contract sets a **6-month probation** with **1 week's notice** during probation.

There is no statutory maximum for probation; its duration and conditions belong in the written statement.

~~~scene
employer EMP "Bramley Foods Ltd"
employee JAM "Jamie Collins" service=0 weekly_pay=520 age=27
permanent CT "Jamie's contract"
written_particulars WS "Written statement"
EMP JAM -> CT
WS -> CT
probation PROB "6-month probation" duration=6
CT -> PROB
focus PROB
~~~

## 2. Ending employment during probation
After **4 months**, Bramley decides Jamie is not suited to the role. This is an ordinary dismissal:

- statutory notice: **1 week** (more than one month of service);
- no ordinary **unfair dismissal** claim: 4 months is below the qualifying period of **2 years**.

> ⚠️ From 1 January 2027: 6 months (ERA 2025).

~~~scene
param JAM service=0.33
probation_dismissal PD "End of probation"
EMP -> PD
PD -> CT
notice NOT "1 week's notice" notice_weeks=1
PD -> NOT
focus PD NOT
~~~

## 3. A contractual notice clause
Instead, imagine Jamie passes probation and stays. His contract gives **one month's notice** (4 weeks) after probation. Five years and eight months later, Bramley dismisses him.

~~~scene
retirer PD NOT
param JAM service=5.67
notice_clause NC "4 weeks' notice" notice_weeks=4
CT -> NC
focus NC
~~~

## Question: how much notice must Bramley give Jamie?
Jamie has 5 complete years of service. His contract says 4 weeks.

~~~scene
verification off
rupture RED "Dismissal"
EMP -> RED
RED -> CT
notice NOT "Notice"
RED -> NOT
focus NC NOT
~~~

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

~~~scene
verification on
focus NC NOT
note NC "Statutory minimum prevails: 5 weeks"
~~~

## 5. Notice pay
If Bramley pays Jamie instead of letting him work his notice, or dismisses him without notice outside gross misconduct, he is owed **notice pay**: the longer of statutory and contractual notice × gross weekly pay.

5 weeks × £520 = **£2,600** (no cap on a week's pay here).

~~~scene
notice_pay NP "Notice pay"
RED -> NP
focus NP
~~~

## 6. And if Jamie resigns?
The employee's statutory minimum is only **1 week**, whatever the length of service (s.86(2)). Here the contract asks for 4 weeks: Jamie must give 4.

Accrued, untaken **holiday** is paid on leaving whatever the reason (WTR reg 14): 6 days × £104 = **£624**.

~~~scene
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
~~~

## 7. Summary
| Service | Statutory notice from the employer |
|---|---|
| under 1 month | none |
| 1 month to under 2 years | 1 week |
| 2 to 12 years | 1 week per complete year |
| 12 years or more | 12 weeks |

From the employee: **1 week** after one month. The contract may give more, never less.

~~~scene
selection NOT
~~~
` },

{ id: 'uk-misconduct', lang: 'en', md: `---
droit: uk
---
# Unfair dismissal for misconduct
> A potentially fair reason, the Burchell test, the ACAS Code and Polkey.

Under ERA 1996 s.98, the employer must show a **potentially fair reason**; the tribunal then asks whether dismissal was **reasonable** in all the circumstances (s.98(4)), including the **procedure**. The **ACAS Code of Practice** sets the minimum steps.

## 1. Daniel's case
**Daniel Okafor**, warehouse supervisor at **Kestrel Logistics Ltd** for **6 years** (£640 a week, aged 38), is suspected of **falsifying timesheets**. Kestrel decides to dismiss him.

A bare dismissal has no reason and no procedure: ⛔ unfair.

~~~scene
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
~~~

## 2. A potentially fair reason
**Conduct** is one of the five potentially fair reasons (s.98(2)(b)), with capability, redundancy, statutory restriction and "some other substantial reason".

Daniel has 6 years' service: well above the **2-year** qualifying period.

> ⚠️ 6 months from 1 January 2027 (ERA 2025).

~~~scene
misconduct MIS "Falsified timesheets"
MIS -> DIS
focus MIS DIS
~~~

## 3. The ACAS steps
Kestrel follows the Code:

1. **written notification** of the allegations and evidence;
2. a **disciplinary meeting**, with the **right to be accompanied** (ERA 1999 s.10);
3. a **written decision**;
4. an **appeal** to a manager not previously involved.

~~~scene
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
~~~

## Question: the manager never looked at the clocking records. Is the dismissal fair?
The manager relied on a colleague's rumour and did not check the clocking system. Daniel denies everything.

~~~scene
verification off
focus DIS
~~~

- [ ] Yes, the ACAS steps were followed
  Steps alone are not enough: the employer's belief must rest on a reasonable investigation.
- [x] No: the Burchell test is not met
  Genuine belief, reasonable grounds and a reasonable investigation are needed.
- [ ] Yes, misconduct is a fair reason
  It is only potentially fair; reasonableness decides.

### Answer
**British Home Stores v Burchell [1980]**: the employer must (1) **genuinely believe** the employee is guilty, (2) on **reasonable grounds**, (3) after as much **investigation** as is reasonable. Without the investigation the dismissal is **unfair**.

Kestrel starts again: an investigator checks the clocking data and CCTV, which confirm 14 falsified shifts.

~~~scene
verification on
investigation INV "Clocking data and CCTV"
genuine_belief GB "Belief on reasonable grounds"
DIS -> INV
INV -> LET then
GB -> DIS
focus INV GB
~~~

## 5. The band of reasonable responses
Last question for the tribunal: was dismissal within the **band of reasonable responses** of a reasonable employer (Iceland Frozen Foods v Jones [1983])? Deliberate falsification by a supervisor: yes. The tribunal may not substitute its own view.

The dismissal is **fair** ✅.

~~~scene
reasonable_response BRR "Within the band"
BRR -> DIS
focus DIS
~~~

## 6. If the procedure had been skipped: Polkey
Suppose Kestrel had skipped the investigation. The dismissal would be **unfair**, but under **Polkey v AE Dayton Services [1987]** the compensatory award can be cut by the chance that a fair procedure would have led to dismissal anyway — here 50%. An unreasonable failure to follow the Code adds up to **25%** (here 20%).

- **basic award**: 6 years aged 32–37, 1 week each: 6 × £640 = **£3,840**;
- **compensatory award**: £12,000 loss − 50% + 20% = **£7,200** (cap: 52 × £640 = £33,280).

~~~scene
retirer INV
basic_award BA "Basic award"
compensatory_award CA "Compensatory award" loss=12000 polkey=50 uplift=20
DIS -> BA CA
focus DIS BA CA
~~~

## 7. Summary
~~~scene
selection DIS
~~~

| Question | Source |
|---|---|
| A potentially fair reason? | ERA 1996 s.98(1)–(2) |
| Genuine belief, reasonable grounds, investigation? | Burchell [1980] |
| Fair procedure? | ACAS Code; 25% uplift |
| Reasonable sanction? | s.98(4), band of reasonable responses |
| Fair procedure would have changed nothing? | Polkey: reduction |
` },

{ id: 'uk-gross-misconduct', lang: 'en', md: `---
droit: uk
---
# Gross misconduct, summary and wrongful dismissal
> Dismissal without notice: lawful for gross misconduct, wrongful otherwise.

Two different questions: is the dismissal **fair** (statute, ERA 1996 s.98)? And was **notice** properly given (contract)? A dismissal without notice is lawful only if the employee committed a **repudiatory breach**: gross misconduct.

## 1. Sarah is dismissed on the spot
**Sarah Mitchell**, a sales assistant at **Larkspur Retail Ltd** for **4 years** (£480 a week, aged 30), is caught taking cash from the till. Larkspur dismisses her **summarily**: no notice, no pay in lieu.

~~~scene
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
~~~

## 2. Precautionary suspension
Before deciding, Larkspur **suspends** Sarah **on full pay** while it investigates. Suspension is not a sanction and should be as short as possible.

~~~scene
suspension SUS "Suspended on full pay"
investigation INV "CCTV and till records"
SD -> SUS
SUS -> INV then
focus SUS INV
~~~

## 3. Gross misconduct
Theft is a classic example of **gross misconduct**: it destroys trust and is a **repudiatory breach** by the employee. Larkspur may accept it and dismiss **without notice**.

The ⊘ symbols show what she loses: **notice** and **notice pay**.

~~~scene
gross_misconduct GM "Theft from the till"
GM -> SD
notice NOT "Notice"
notice_pay NP "Notice pay"
SD -> NOT NP
focus GM NOT NP
~~~

## 4. What she keeps
Accrued, untaken **holiday pay** is due whatever the reason for leaving, even gross misconduct (WTR reg 14): 5 days × £96 = **£480**.

> 💡 Fairness still needs a fair procedure (ACAS Code).

~~~scene
holiday_pay HP "Untaken holiday" untaken_days=5 day_pay=96
SD -> HP
focus HP
~~~

## Question: the CCTV shows no theft, only lateness. What follows?
On review, the till shortfall was a cashing-up error. All that remains is **repeated lateness**: misconduct, not gross misconduct.

~~~scene
verification off
type GM misconduct
renommer GM "Repeated lateness"
focus SD NOT NP
~~~

- [ ] Nothing changes: the employer believed it was theft
  A genuine belief helps on fairness, not on the contract: summary dismissal needs an actual repudiatory breach.
- [x] The dismissal is wrongful: notice pay is due as damages
  Without gross misconduct, dismissing without notice breaches the contract.
- [ ] Sarah gets statutory redundancy pay
  There is no redundancy here.

### Answer
Without gross misconduct, the summary dismissal is a **wrongful dismissal** (breach of contract). Damages equal the **notice pay** Sarah should have received: statutory notice of **4 weeks** for 4 complete years × £480 = **£1,920**.

A wrongful dismissal claim has **no qualifying period**; it can be brought in the tribunal (up to £25,000) or the courts.

~~~scene
verification on
focus SD NOT NP
note NP "4 weeks × £480 = £1,920"
~~~

## 6. Wrongful is not unfair
| | Wrongful dismissal | Unfair dismissal |
|---|---|---|
| Source | contract (common law) | statute (ERA 1996) |
| Question | was notice given? | reason and procedure fair? |
| Qualifying period | none | 2 years |
| Remedy | damages = notice pay | basic + compensatory award |

> ⚠️ 2 years becomes 6 months on 1 January 2027.

~~~scene
selection SD
~~~
` },

{ id: 'uk-redundancy', lang: 'en', md: `---
droit: uk
---
# Redundancy
> A genuine redundancy, fair selection, consultation, and statutory redundancy pay.

Redundancy is a potentially fair reason (ERA 1996 s.98(2)(c)). A fair redundancy needs a **genuine redundancy situation**, **fair selection**, **meaningful consultation** and a look at **suitable alternative employment**. After 2 years, the employee gets **statutory redundancy pay**.

## 1. Alan's role is at risk
**Alan Hughes**, aged **45**, has worked for **Corvid Print Ltd** for **10 years** as a print technician (£820 a week). Corvid replaces two presses with one digital line and needs fewer technicians.

~~~scene
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
~~~

## 2. A genuine redundancy
ERA 1996 s.139: the business closes, or the requirement for employees to do work of a **particular kind** has ceased or **diminished**. Fewer technicians are needed: a genuine redundancy.

~~~scene
genuine_redundancy GR "Fewer technicians needed"
GR -> RED
focus GR RED
~~~

## 3. Pool and selection
All 6 technicians are put in the **pool**. Corvid scores them on objective criteria: skills, performance, disciplinary record. Absences linked to disability or maternity must not count against anyone.

~~~scene
fair_selection FS "Pool of 6, objective scoring"
FS -> RED
focus FS
~~~

## 4. Consultation and alternatives
Corvid holds **individual consultation** meetings while the plan is still open, shares Alan's scores, and looks for **suitable alternative employment**. The one vacancy, a night-shift role at a lower grade, is not suitable for Alan. All badges are green ✅.

> 💡 20+ redundancies in 90 days: collective consultation.

~~~scene
consultation CONS "Two consultation meetings"
alternative_employment ALT "Vacancies reviewed"
RED -> CONS
CONS -> ALT then
focus CONS ALT RED
~~~

## Question: how much statutory redundancy pay does Alan get?
Alan is 45, with 10 complete years of service; he earns £820 a week. A week's pay is capped at **£751** (from 6 April 2026).

~~~scene
verification off
statutory_redundancy_pay SRP "Statutory redundancy pay"
RED -> SRP
focus SRP
~~~

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

~~~scene
verification on
focus SRP
note SRP "12 weeks × £751 = £9,012"
~~~

## 6. Notice and holiday pay
Alan also gets **10 weeks' notice** (1 week per complete year, s.86), paid on his full salary — the cap does not apply to notice pay: 10 × £820 = **£8,200**.

~~~scene
notice NOT "10 weeks' notice"
notice_pay NP "Notice pay"
holiday_pay HP "Untaken holiday"
RED -> NOT NP HP
focus NOT NP
~~~

## 7. Summary
~~~scene
selection RED
~~~

| Condition | If missing |
|---|---|
| 📉 Genuine redundancy | unfair |
| 🧮 Fair selection | unfair |
| 🗨️ Consultation | unfair; protective award if 20+ and no collective consultation |
| 🔀 Alternative employment | unfair; unreasonable refusal of a suitable offer loses redundancy pay |
` },

{ id: 'uk-settlement', lang: 'en', md: `---
droit: uk
---
# Settlement agreements
> Waiving statutory claims is void… unless the conditions of ERA 1996 s.203 are met.

An employee cannot simply sign away statutory rights: any such term is **void** (ERA 1996 s.203(1)). Two exceptions: a settlement through **ACAS** (COT3), or a **settlement agreement** meeting strict conditions.

## 1. Emma's exit
**Emma Clarke** has worked for **Sterling Insurance plc** for **3 years** (£700 a week). Her relationship with her new manager has broken down. Sterling would like her to leave on agreed terms.

~~~scene
employer EMP "Sterling Insurance plc"
employee EMMA "Emma Clarke" service=3 weekly_pay=700 age=36
permanent CT "Emma's contract"
written_particulars WS "Written statement"
EMP EMMA -> CT
WS -> CT
focus EMP EMMA
~~~

## 2. A protected conversation
Sterling invites Emma to a **without prejudice / protected conversation**. Under s.111A, what is said is generally **inadmissible** in an ordinary unfair dismissal claim, unless there is improper behaviour (pressure, harassment).

The ACAS Code advises at least **10 calendar days** to consider an offer.

~~~scene
protected_conversation PC "Protected conversation"
focus PC
~~~

## 3. A simple waiver in the contract?
Sterling's first idea: add a clause to Emma's contract by which she "waives all claims against the company". It is **void** under s.203: the badge says it all.

~~~scene
contracting_out WAIV "Waiver of all claims"
CT -> WAIV
focus WAIV
~~~

## 4. The settlement agreement
Instead, the parties negotiate a **settlement agreement**. On its own, the card is ⛔: none of the four statutory conditions is met yet.

~~~scene
retirer WAIV
settlement_agreement SA "Settlement agreement"
EMP EMMA -> SA
SA -> CT
PC -> SA then
focus SA
~~~

## 5. In writing, for particular complaints
The agreement is **in writing** and lists the **particular complaints** it settles: unfair dismissal, breach of contract, sex discrimination. A blanket "all claims" is not enough.

~~~scene
in_writing W "Written agreement"
particular_complaint PCOMP "UD, contract, discrimination"
W PCOMP -> SA
focus SA
~~~

## Question: Emma wants to sign today, without advice. Is the agreement valid?
Two badges are still missing.

~~~scene
verification off
focus SA
~~~

- [ ] Yes, if she signs voluntarily
  Consent is not enough for statutory claims.
- [ ] Yes, if Sterling's own lawyer explains it to her
  The adviser must be independent of the employer.
- [x] No: she needs advice from a relevant independent adviser, named and insured
  Without it, her statutory claims survive.

### Answer
ERA 1996 s.203(3) also requires that Emma has received advice from a **relevant independent adviser** (lawyer, certified union official or advice worker) on the terms and **effect** of the agreement; that the adviser is **named** and **insured**; and that the agreement **states** the conditions are met. Employers usually contribute to the adviser's fee.

~~~scene
verification on
independent_advice IA "Advice from her solicitor"
adviser_identified AI "Solicitor named and insured"
IA AI -> SA
focus SA IA AI
~~~

## 7. The payment
Sterling pays £25,000. Notice pay is taxable; the first **£30,000** of a genuine termination payment can be paid **tax-free** (HMRC). Untaken holiday is paid as usual.

~~~scene
settlement_payment PAY "Settlement sum" amount=25000
holiday_pay HP "Untaken holiday"
SA -> PAY HP
focus PAY
~~~

## 8. Summary
~~~scene
selection SA
~~~

| Condition (s.203(3)) | Here |
|---|---|
| ✍️ In writing | signed agreement |
| 📎 Particular complaints | UD, contract, discrimination |
| 🧑‍⚖️ Independent advice | her solicitor |
| 🪪 Adviser named, insured; statement | in the agreement |

Alternative: an **ACAS COT3** settlement.
` },

{ id: 'uk-constructive', lang: 'en', md: `---
droit: uk
---
# Constructive dismissal
> The employee resigns, but the law treats it as a dismissal.

Under ERA 1996 s.95(1)(c), an employee who resigns in response to the employer's **repudiatory breach** is **dismissed**. The test is contractual (Western Excavating v Sharp [1978]): a breach going to the root of the contract, and a resignation **without undue delay**.

## 1. Mark's contract
**Mark Evans**, aged **40**, has been a site manager at **Granite Homes Ltd** for **5 years**, on £600 a week. The employer owes him his **pay** and **mutual trust and confidence** (Malik v BCCI [1997]).

~~~scene
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
~~~

## 2. A unilateral pay cut
Granite announces a **20% pay cut**, without Mark's agreement. Cutting pay without consent is a breach of an express term — a **fundamental** one. The obligation turns ⚡ breached.

~~~scene
breach CUT "20% pay cut imposed"
CUT -> PW
focus CUT PW
~~~

## 3. Mark resigns
Mark resigns, saying it is because of the pay cut. On its own, the constructive dismissal card is ⛔: the tool needs the **breach** and a **prompt resignation**.

~~~scene
constructive_dismissal CD "Mark resigns"
MARK -> CD
CD -> CT
focus CD
~~~

## 4. A repudiatory breach
The pay cut goes to the root of the contract: it is a **repudiatory breach** (contract test, not "unreasonable behaviour"). A series of smaller acts can also qualify as a "last straw".

~~~scene
repudiatory_breach RB "Pay cut = fundamental breach"
RB -> CD
CUT -> RB lien "amounts to"
focus RB CD
~~~

## Question: Mark kept working on the reduced pay for 8 months before resigning. Can he still claim?
He grumbled, but signed the new payslips without objection.

~~~scene
verification off
focus CD
~~~

- [ ] Yes, a breach is a breach
  The employee must accept the breach; he can lose that right.
- [x] Probably not: by delaying he may have affirmed the contract
  Working on without protest for a long time can amount to affirmation.
- [ ] Yes, as long as he resigns before 2 years
  The issue is delay in resigning, not service.

### Answer
The employee must resign in response to the breach **without undue delay**; otherwise he is taken to have **affirmed** the contract. Working briefly **under protest** is allowed. Here, Mark resigns **two weeks** after the cut, with a letter explaining why: he did not affirm.

~~~scene
verification on
prompt_resignation PR "Resigned 2 weeks later"
PR -> CD
focus CD PR
~~~

## 6. Unfair, and compensated
A constructive dismissal is usually **unfair**. Mark has 5 years' service, above the qualifying period.

- **basic award**: 5 years aged 35–39, 1 week each: 5 × £600 = **£3,000**;
- **compensatory award**: his loss of earnings while he looks for work.

~~~scene
unfair_dismissal_right UD "Unfair dismissal claim"
basic_award BA "Basic award"
CD -> UD BA
focus UD BA
~~~

## 7. Summary
| Step | Rule |
|---|---|
| 💥 Repudiatory breach by the employer | Western Excavating v Sharp [1978] |
| ⏩ Resignation in response, without delay | no affirmation |
| 🛡️ Unfair dismissal claim | qualifying period: 2 years |

> ⚠️ 6 months from 1 January 2027 (ERA 2025).

~~~scene
selection CD
~~~
` },

{ id: 'uk-quiz', lang: 'en', md: `---
droit: uk
---
# Quiz: English employment law
> Six quick questions to revise contracts, covenants and termination.

A revision quiz: the canvas illustrates each situation. Click the class's answer, then reveal.

## Question: what is the statutory minimum notice after 7 years and 3 months?
~~~scene
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
~~~

- [ ] 1 month
  English statutory notice is counted in weeks.
- [x] 7 weeks
  1 week per complete year from 2 years: 7 complete years.
- [ ] 8 weeks
  Incomplete years do not count.

### Answer
ERA 1996 s.86: **1 week per complete year** from 2 years, up to 12 weeks: **7 weeks**.

~~~scene
verification on
~~~

## Question: does an English non-compete need a payment to be valid?
~~~scene
effacer
non_compete NC "Non-compete"
legitimate_interest LI "Client connections"
reasonable_duration RD "6 months"
reasonable_area RA "London"
reasonable_scope RS "Same activity"
LI RD RA RS -> NC
verification off
focus NC
~~~

- [ ] Yes, as in French law
  The payment is a French condition.
- [x] No: legitimate interest and reasonableness are enough
  English law requires no compensation.

### Answer
A restraint of trade is enforceable if it protects a **legitimate business interest** and is **no wider than reasonably necessary**. No payment is required.

~~~scene
verification on
~~~

## Question: Leah, 25, is made redundant after 3 years on £500 a week. Her redundancy pay?
~~~scene
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
~~~

- [ ] £750
  Half a week applies only to years under 22.
- [x] £1,500
  3 years aged 22–24: 3 × 1 week × £500.
- [ ] Nothing: under 5 years' service
  The threshold is 2 years.

### Answer
Ages 22, 23 and 24 during the three years: **1 week** each, so 3 weeks × £500 (below the £751 cap) = **£1,500**.

~~~scene
verification on
~~~

## Question: an employee signs a settlement agreement without independent advice. Result?
~~~scene
effacer
settlement_agreement SA "Settlement agreement"
in_writing W "In writing"
particular_complaint PCOMP "Unfair dismissal"
W PCOMP -> SA
verification off
focus SA
~~~

- [ ] Valid: it is signed and in writing
  Writing is only one condition.
- [x] Void as to statutory claims (s.203)
  Independent advice from a named, insured adviser is required.

### Answer
Without **independent advice** (and an identified, insured adviser) the agreement cannot settle statutory claims: they survive.

~~~scene
verification on
~~~

## Question: dismissed for gross misconduct, what is still due?
~~~scene
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
~~~

- [ ] Notice pay
  Gross misconduct justifies dismissal without notice.
- [x] Accrued holiday pay
  Always due on termination (WTR reg 14).
- [ ] Nothing at all
  Holiday pay survives.

### Answer
Gross misconduct removes **notice** and **notice pay** (⊘), but **accrued holiday pay** is still due.

~~~scene
verification on
~~~

## Question: Ben has 18 months' service and is dismissed without a hearing. Unfair dismissal claim?
~~~scene
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
~~~

- [ ] Yes: there was no hearing
  Procedure matters only if he can claim.
- [x] No ordinary claim: under 2 years' service
  The qualifying period is 2 years today.
- [ ] Yes, if he claims within 3 months
  Time limits do not replace the qualifying period.

### Answer
Ordinary unfair dismissal requires **2 years** (s.108); exceptions for automatically unfair reasons and discrimination.

> ⚠️ 6 months from 1 January 2027 (ERA 2025).

~~~scene
verification on
focus UD
~~~
` }

);
