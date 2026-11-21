/* Scénarios de droit français, en anglais. */
window.P = window.P || {};
P.LIBRARY = P.LIBRARY || [];
P.LIBRARY.push(

{ id: 'construire-contrat', lang: 'en', md: `# Building an employment contract
> The parties, the core terms, the probationary period: a CDI is assembled piece by piece.

We assemble the contract of **Léa Martin**, hired as marketing manager by the company **Bleu Ciel**. Each clause is a card; the “📄” frame marks out what the contract contains.

Verdicts appear on the cards: ✅ valid, ⚠️ at risk, ⛔ void. The **badges** under a card are its validity conditions.

## 1. Two parties and a relationship of subordination
An employment contract brings together three elements: **work performed**, **pay** and a **relationship of subordination** — the employer’s power to give orders, monitor their performance and sanction failures.

Whatever name the parties give their relationship, what counts is the reality of the subordination.

~~~scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin" categorie=cadre anciennete=0 salaire=3400
focus EMP LEA
~~~

## 2. A CDI, the normal form of contract
The **CDI** (permanent contract) is the normal and general form of the employment relationship. Both parties **sign** it.

A full-time CDI need not be in writing… but the employer must give the employee the **main information** about the employment relationship. In practice, it is always written.

~~~scene
cdi CT "Léa’s CDI"
EMP LEA -> CT
ecrit EC "Written, signed contract"
EC -> CT
focus CT
~~~

## 3. The core terms of the contract
Four elements form the **contractual core**:

| Element | What cannot be done without Léa’s consent |
|---|---|
| 💶 Pay | change it, however slightly |
| 🧑‍💼 Duties | substantially change her duties |
| ⏱️ Working hours | change the contractual working time |
| 📍 Place of work | transfer her outside the geographical area |

> 💡 Varying a term of the contract requires the employee’s **consent**. A mere **change in working conditions** (hours, tasks of the same grade) falls within the employer’s managerial authority.

~~~scene
remuneration REM "€3,400 gross / month"
fonctions FCT "Marketing manager"
duree_travail DUR "35 h / week"
lieu_travail LIEU "Lyon"
CT -> REM FCT DUR LIEU
focus REM FCT DUR LIEU
~~~

## 4. A probationary period… that is too long
The contract provides for a **5-month probationary period**. It is in writing (the ✍️ badge is green: the written contract counts for the clause).

But Léa is a **manager (cadre)**: under a CDI, the statutory maximum is **4 months** (2 months for manual and clerical workers, 3 for supervisors and technicians). The tool flags it in red.

~~~scene
periode_essai ESS "Probationary period" duree=5
CT -> ESS
focus ESS
note ESS "5 months > 4 months: excessive length"
~~~

## Question: what must be done to keep 5 months’ probation?
The HR director insists on his 5 months of probation.

~~~scene
focus ESS
~~~

- [ ] Nothing: Léa signed, so the clause applies
  The maximum length is a matter of public policy: signing it does not make it valid.
- [ ] Provide for 4 months, renewable once if the contract says so
  Almost: the contract is not enough — an extended sector-level agreement and Léa’s express consent are also needed.
- [x] Provide for 4 months, renewable if an extended sector-level agreement and the contract allow it, with Léa’s express consent
  The three conditions are cumulative; the total length may not exceed 8 months for a manager.
- [ ] Replace the probation with a 5-month CDD
  A fixed-term contract cannot be used to “test” an employee: it would be reclassified as a CDI.

### Answer
The probation is cut back to **4 months** with provision for **renewal**, possible only once if:
- an **extended sector-level agreement** provides for it;
- the **contract** stipulates it;
- the employee gives **express consent**, before the initial period ends.

Maximum total length for a manager: **8 months**, renewal included.

~~~scene
param ESS duree=4
renouvellement_essai REN "Renewal: 5 months in total" duree=5
CT -> REN
accord_collectif ACC "Extended sector-level agreement"
accord_salarie ACS "Léa’s consent in month 3"
ACC ACS -> REN
focus ESS REN
~~~

## 6. Summary
Léa’s contract is complete and everything is green.

Key points:
- three criteria of an employment contract: **work**, **pay**, **subordination**;
- the **core terms** can only be changed with the employee’s consent;
- the **probationary period** is never presumed (it must be in writing) and its maximum lengths are a matter of public policy;
- **renewal** requires an extended sector-level agreement + the contract + the employee’s express consent.

Click a card to see its validity conditions.

~~~scene
selection REN
~~~
` },

{ id: 'non-concurrence', lang: 'en', md: `# The non-compete clause
> Five cumulative safeguards: without any one of them, the clause is void.

A non-compete clause prohibits the employee, **after the contract ends**, from engaging in a competing activity. It restricts the **freedom to work**: case law regulates it strictly (Cass. soc., 10 July 2002).

Look at the **badges** under the clause: each missing safeguard is dotted.

## 1. Karim’s contract, sales representative
Karim is a sales representative at **Optique Durand**, in Nantes. His contract contains a clause preventing him from working for a competitor after he leaves.

As it stands, the clause is **void**: none of its five safeguards is present.

~~~scene
employeur EMP "Optique Durand"
salarie KAR "Karim Benali" categorie=employe anciennete=3 salaire=2400
cdi CT "Karim’s CDI"
EMP KAR -> CT
fonctions FCT "Field sales representative"
non_concurrence NC "Non-compete"
CT -> FCT NC
focus NC
note NC "5 dotted badges: 5 missing safeguards"
~~~

## 2. A legitimate interest to protect
First safeguard: the clause must be **essential to protect the legitimate interests** of the company. Karim knows the clientele and the prices: the interest is genuine.

For a cleaner with no client contact, the same clause would be void.

~~~scene
interet_legitime IL "Clientele and prices"
IL -> NC
focus IL NC
~~~

## 3. Limited in time and in space
The clause must be **limited in time** and **in space**.

Here: **1 year** after leaving, in **Loire-Atlantique**. A ban “forever” or “throughout France” for a regional sales representative would be disproportionate.

~~~scene
limite_duree LD "1 year"
limite_geo LG "Loire-Atlantique"
LD LG -> NC
focus LD LG
~~~

## 4. The specific features of the job
The clause must **take account of the specific features of the job**: Karim must be able to find work in line with his training and experience. The ban is therefore limited to **selling glasses in a competing shop** — he can work in another sales sector.

One safeguard is still missing…

~~~scene
specificites SP "Optical sales only"
SP -> NC
focus NC
~~~

## Question: which safeguard is missing?
Four badges are green. The clause is still void.

~~~scene
verification off
focus NC
~~~

- [ ] Karim’s written consent
  He signed the contract; this is not one of the five case-law criteria.
- [x] Financial compensation
  Since 2002, a non-compete clause without financial compensation is void.
- [ ] Approval by the labour inspectorate
  No approval is required for this clause.
- [ ] A duration of less than 6 months
  There is no statutory maximum: the duration must be reasonable.

### Answer
The fifth safeguard is **financial compensation**, paid **after the contract ends**, however it ends (resignation, dismissal, even for gross misconduct). It must not be derisory.

The card turns green: the clause is valid.

~~~scene
verification on
contrepartie CP "30% of salary for 1 year"
CP -> NC
focus NC CP
~~~

## 6. And the confidentiality clause?
The contract also contains a **confidentiality clause**: Karim must not disclose client files or margins.

No badges: it requires **no compensation**. It does not prevent Karim from working for a competitor; it only forbids him to disclose information.

> 💡 Do not confuse them: **non-compete** prevents working (compensation mandatory), **confidentiality** prevents disclosing (no compensation).

~~~scene
confidentialite CONF "Confidentiality"
CT -> CONF
focus CONF NC
~~~

## 7. Summary
| Safeguard | Here |
|---|---|
| 🏰 Company’s legitimate interest | clientele and prices |
| ⌛ Time limit | 1 year |
| 🗺️ Geographical limit | Loire-Atlantique |
| 🧩 Specific features of the job | optical sales only |
| 💰 Financial compensation | 30% of salary for 1 year |

The conditions are **cumulative**. A void clause is not binding on the employee; if they complied with it, they may claim damages.

~~~scene
selection NC
~~~
` },

{ id: 'clauses-encadrees', lang: 'en', md: `# Mobility, exclusivity, training repayment
> Three clauses useful to the employer, three sets of safeguards, and some incompatibilities.

Some clauses give the employer power over the employee’s life. The law allows them, but **subject to conditions**: without them, the clause is void or unenforceable. And some clauses become **incompatible** with other elements of the file (⊘).

## 1. The mobility clause
**Sofia**, a maintenance technician, signs a CDI with a **mobility clause**. The employer will be able to transfer her… but where?

A mobility clause must **precisely define its geographical area**, which the employer cannot extend alone. “Any place where the company operates or will operate”: void.

~~~scene
employeur EMP "Hydro Services"
salarie SOF "Sofia Lemaire" categorie=technicien anciennete=2 salaire=2600
cdi CT "Sofia’s CDI"
EMP SOF -> CT
mobilite MOB "Mobility"
CT -> MOB
focus MOB
~~~

## 2. A precise area… and fair implementation
We specify: “**Brittany and Pays de la Loire**”. The clause is now valid (📌 badge green).

The two other badges are orange: even when valid, the clause must be **implemented in good faith**, in the **company’s interest** and with sufficient **advance notice**. A 300 km transfer announced the day before would be abusive.

> 💡 Refusing a transfer that complies with a valid mobility clause may justify dismissal.

~~~scene
zone_definie ZD "Brittany + Pays de la Loire"
ZD -> MOB
focus MOB ZD
~~~

## 3. Proper implementation
The employer explains the transfer (a new site opening in Rennes) and gives Sofia one month’s notice: everything is green.

~~~scene
interet_legitime IL "New site opening in Rennes"
delai_prevenance DP "1 month’s notice"
IL DP -> MOB
focus MOB IL DP
~~~

## 4. Exclusivity… for a part-time employee
**Sofia**’s contract becomes **part-time** (24 hours a week) and the employer adds an **exclusivity clause**: no other professional activity.

The ⊘ symbol appears: a part-time employee must be able to **supplement her income**. The exclusivity clause is, in principle, **unenforceable** against her.

~~~scene
temps_partiel TP "Part-time 24 h"
ecrit EC "Written amendment"
repartition REP "Monday to Wednesday"
CT -> TP
EC REP -> TP
exclusivite EXC "Exclusivity"
CT -> EXC
interet_legitime IE "Technical know-how"
proportionnalite PE "Justified by the task"
IE PE -> EXC
focus EXC TP
note EXC "Part-time: unenforceable in principle"
~~~

## 5. The training repayment clause
The employer pays for Sofia to obtain a **high-voltage electrical certification** costing €6,000. In return, a **training repayment clause (dédit-formation)**: if she resigns within 2 years, she repays part of the costs.

The clause is lawful if:
- it is **in writing before** the training (date, nature, length, actual cost, repayment terms);
- the costs **exceed** what the law or the collective agreement requires of the employer;
- the repayment is **proportionate** (and decreasing over time).

~~~scene
retirer EXC IE PE
dedit_formation DF "2-year training repayment"
CT -> DF
ecrit EDF "Agreement signed before the training"
formation_couteuse FC "€6,000 in actual costs"
proportionnalite PR "Decreasing repayment"
EDF FC PR -> DF
focus DF
~~~

## Question: Sofia is dismissed a year later. Must she repay?
The employer makes her redundant for economic reasons and claims €3,000 under the training repayment clause.

~~~scene
verification off
licenciement_eco LE "Economic redundancy"
EMP -> LE
LE -> CT
focus DF LE
~~~

- [ ] Yes, the clause is valid
  It is valid… but it only applies if the employee leaves of her own accord.
- [x] No, the termination is not her doing
  The training repayment clause does not apply when the employer ends the contract.
- [ ] Yes, but only half
  Proportionality governs the amount when the clause applies; here, it does not apply.

### Answer
The training repayment clause compensates a **voluntary departure** by the employee. In the event of **dismissal**, the termination is not the employee’s doing: the clause is **inapplicable** (⊘).

~~~scene
verification on
focus DF LE
~~~

## 7. Summary
| Clause | Safeguards | Incompatible with |
|---|---|---|
| 🧳 Mobility | precise area; fair implementation, advance notice | — |
| 🔒 Exclusivity | legitimate interest, justified and proportionate | ⊘ part-time |
| 🎒 Training repayment | prior written agreement, costs beyond obligations, proportionate amount | ⊘ dismissal |

~~~scene
vue CT
~~~
` },

{ id: 'cdd', lang: 'en', md: `# The CDD, an exceptional contract
> Writing, reason, end date: without them, the CDD becomes a CDI.

A **CDD** (fixed-term contract) may neither aim nor result in permanently filling a job linked to the normal and permanent activity of the business. It is therefore **strictly regulated**; the sanction is **reclassification as a CDI** (permanent contract).

## 1. A CDD concluded in a hurry
The **Jardin Malin** garden centre hires **Tom** for the spring season. Nobody drew up a contract.

Three red badges: without writing, reason or end date, the contract is **reclassified as a CDI**.

~~~scene
employeur EMP "Jardin Malin"
salarie TOM "Tom Girard" categorie=employe anciennete=0.5 salaire=1900
cdd CT "Tom’s CDD"
EMP TOM -> CT
focus CT
note CT "Not in writing: CDI!"
~~~

## 2. Writing, precise reason, end date
We put things right:
- a **written contract**, given to the employee;
- a **precise reason**: temporary increase in activity (spring season);
- a **precise end date**: 1 March to 30 June.

~~~scene
ecrit EC "Written contract"
motif_recours MR "Seasonal increase in activity"
terme TE "1 March – 30 June"
EC MR TE -> CT
param CT duree=4
focus CT
~~~

## Question: the shop renews the CDD until it reaches 20 months. What is the risk?
After the season, the shop renews, then renews again: Tom works 20 months on a CDD.

~~~scene
verification off
param CT duree=20
focus CT
~~~

- [ ] Nothing, as long as each renewal is in writing
  Written renewals do not allow the maximum length to be exceeded.
- [x] Reclassification of the contract as a CDI
  In the general case, the maximum length is 18 months, renewals included.
- [ ] A simple fine
  The civil sanction is reclassification, claimed before the employment tribunal (conseil de prud’hommes).

### Answer
Maximum length of a CDD, renewals included: **18 months** in the general case (with exceptions and adjustments by sector-level agreement). Beyond that, Tom can claim **reclassification as a CDI**, with a reclassification payment of at least one month’s salary.

~~~scene
verification on
note CT "20 months > 18 months"
~~~

## 4. End of the CDD and the precariousness bonus
We go back to a 4-month CDD. On its end date, the contract ends **automatically**, without any procedure.

Tom receives the **end-of-contract payment** (“prime de précarité”, precariousness bonus): **10%** of total gross pay. Here: 4 × €1,900 = €7,600 → **€760**.

~~~scene
param CT duree=4
fin_cdd FIN "End of the CDD"
FIN -> CT
indemnite_precarite PREC "Precariousness bonus" remuneration_totale=7600
indemnite_conges ICP "Untaken leave"
FIN -> PREC ICP
focus FIN PREC
~~~

## 5. When the bonus is not due
If the relationship **continues under a CDI**, the bonus is not due: it compensates for precariousness, which disappears.

Nor is it due in the event of **gross misconduct**, for a seasonal or customary CDD, or for a student during the holidays.

~~~scene
cdi CDI "CDI offered and accepted"
CDI -> FIN lien "followed by"
focus PREC CDI
note PREC "⊘ The relationship continues under a CDI"
~~~

## 6. Summary
| Requirement | Sanction if missing |
|---|---|
| ✍️ In writing | reclassification as a CDI |
| 📝 Precise reason | reclassification as a CDI |
| 📅 Precise end date | reclassification as a CDI |
| ⏳ 18 months maximum (general case) | reclassification as a CDI |

At the end: a 10% **precariousness bonus**, save for exceptions.

~~~scene
retirer CDI
selection CT
~~~
` },

{ id: 'temps-de-travail', lang: 'en', md: `# Days-based agreement, on-call duty, part-time work
> Three working-time arrangements, each with its own conditions.

Working time is protected by public-policy rules (maximum hours, rest periods). Arrangements that depart from them are allowed, but **subject to conditions**.

## 1. Marc’s days-based agreement
**Marc**, an autonomous manager, signs a **days-based working-time agreement (forfait jours)**: 218 working days a year, with no hourly count.

Four conditions: a protective **collective agreement**, a **written individual agreement**, genuine **autonomy** and **monitoring of the workload**.

~~~scene
employeur EMP "Conseil & Data"
salarie MARC "Marc Dubois" categorie=cadre anciennete=5 salaire=4800
cdi CT "Marc’s CDI"
EMP MARC -> CT
forfait_jours FJ "218-day agreement"
CT -> FJ
accord_collectif ACC "Syntec agreement"
convention_individuelle CI "Signed days-based agreement"
autonomie AUT "Organises his own diary"
ACC CI AUT -> FJ
focus FJ
~~~

## Question: one badge is missing. What does the employer risk?
The employer has never held a meeting about Marc’s workload, and he often works 60 hours a week.

~~~scene
verification off
focus FJ
~~~

- [ ] Nothing: a days-based agreement has no working hours
  The agreement dispenses with counting hours, not with protecting health.
- [x] The agreement is ineffective: Marc can claim his overtime
  Without actual monitoring of the workload, the days-based agreement is ineffective.
- [ ] Marc’s contract is reclassified as a CDD
  Unrelated: the sanction concerns the agreement, not the length of the contract.

### Answer
Without **actual and regular monitoring of the workload**, the days-based agreement is **ineffective**: Marc reverts to the 35-hour week and can claim payment of his **overtime**. The failure also breaches the employer’s **duty of safety**.

~~~scene
verification on
note FJ "Ineffective: overtime payable"
~~~

## 3. Workload monitoring
The employer introduces an annual workload review and an alert tool: the agreement takes effect.

~~~scene
suivi_charge SC "Annual review + alert"
SC -> FJ
focus FJ SC
~~~

## 4. Weekend on-call duty
Marc must be reachable one weekend a month for incidents at clients’ premises. This is **on-call duty (astreinte)**: only the intervention counts as actual working time.

It gives entitlement to **compensation** (financial or time off) and the employee must know the schedule in advance.

~~~scene
astreinte AST "Weekend on-call duty"
CT -> AST
contrepartie CPA "€150 per weekend"
delai_prevenance DPA "Rota 15 days ahead"
CPA DPA -> AST
focus AST
~~~

## 5. Inès’s part-time work
**Inès** works part-time. Her contract must be **in writing** and state the working **hours** and their **distribution** over the days of the week. Otherwise, it is **presumed full-time** (the employer may rebut the presumption).

~~~scene
salarie INES "Inès Roche" categorie=employe
cdi CT2 "Inès’s CDI"
EMP INES -> CT2
temps_partiel TP "Part-time 20 h"
CT2 -> TP
ecrit EC2 "Written contract"
EC2 -> TP
focus TP
note TP "Distribution missing: presumed full-time"
~~~

## 6. Summary
- **Days-based agreement**: collective agreement + individual agreement + autonomy + workload monitoring.
- **On-call duty**: compensation + schedule known in advance.
- **Part-time**: in writing + hours and distribution, otherwise presumed full-time.

~~~scene
repartition REP "Monday to Thursday afternoons"
REP -> TP
selection FJ
~~~
` },

{ id: 'obligations', lang: 'en', md: `# The parties’ obligations
> The contract creates reciprocal obligations; a serious breach can lead to termination.

The employment contract is **synallagmatic**: each party has obligations towards the other. The Labour Code (C. trav.) adds statutory obligations, and both parties must perform the contract **in good faith**.

## 1. The employer’s obligations
The employer must:
- **provide the agreed work** and the means to carry it out;
- **pay the salary**, at least equal to the minimum;
- ensure **safety** and protect employees’ physical and mental **health**;
- ensure employees are **adapted** to their job and remain **employable**;
- respect **equality** and not discriminate.

~~~scene
employeur EMP "Boulangerie Fournil & Co"
salarie NINA "Nina Petit" categorie=employe anciennete=3 salaire=2000
cdi CT "Nina’s CDI"
EMP NINA -> CT
fournir_travail O1
payer_salaire O2
securite O3
adaptation O4
non_discrimination O5
EMP -> O1 O2 O3 O4 O5
focus EMP
~~~

## 2. The employee’s obligations
The employee must:
- **perform the agreed work**, personally and with care;
- **follow the employer’s instructions** and the internal rules (relationship of subordination);
- be **loyal**: not compete with the employer during the contract, even without a clause;
- be **discreet** about confidential information;
- take care of **their own safety** and that of others.

~~~scene
executer_travail S1
obeissance S2
loyaute S3
discretion S4
securite_salarie S5
NINA -> S1 S2 S3 S4 S5
focus NINA
~~~

## 3. A shared obligation: good faith
The contract is performed **in good faith** by both parties (art. L1222-1 C. trav.). It runs through everything else: a valid clause implemented in bad faith becomes abusive.

~~~scene
bonne_foi BF "Good faith"
EMP NINA -> BF
focus BF
~~~

## 4. A breach by the employer
For three months, the bakery has not paid Nina’s salary. The obligation is **breached** (⚡).

~~~scene
manquement M1 "3 months’ salary unpaid"
M1 -> O2
focus M1 O2
~~~

## Question: what can Nina do, without resigning?
She wants to leave the company without losing her rights.

~~~scene
focus NINA M1
~~~

- [ ] Stop coming to work
  That would be job abandonment: after formal notice, she would be presumed to have resigned.
- [x] Terminate the contract on the grounds of the employer’s breach (prise d’acte)
  If the breach is serious enough, the prise d’acte takes effect as a dismissal without real and serious cause.
- [x] Ask the court for judicial termination of her contract
  She keeps working during the proceedings; if the court grants it, the effects are those of an unfair dismissal.
- [ ] Nothing: only the employer can end a CDI
  The employee can end it (resignation, prise d’acte) or ask the court to do so.

### Answer
Two routes, both reviewed by the court:
- the **prise d’acte** ends the contract immediately: if the breach is serious enough to prevent the contract from continuing, it takes effect as a **dismissal without real and serious cause**; otherwise, as a **resignation**;
- **judicial termination (résiliation judiciaire)**: Nina keeps working and asks the court to end the contract on the grounds of the employer’s fault.

Three months of unpaid salary is a **sufficiently serious breach**.

~~~scene
prise_acte PA "Nina’s prise d’acte"
NINA -> PA
PA -> CT
manquement_suffisant MS "Unpaid salary"
MS -> PA
M1 -> PA lien "grounds"
focus PA
~~~

## 6. Summary
| Employer | Employee |
|---|---|
| provide the work | perform the work |
| pay the salary | follow instructions |
| safety, health | loyalty, discretion |
| adaptation, equality | take care of safety |
| **good faith** | **good faith** |

A serious breach by the employer opens the way to a **prise d’acte** or **judicial termination**; a breach by the employee may justify a **sanction** or **dismissal**.

~~~scene
vue PA
~~~
` },

{ id: 'licenciement', lang: 'en', md: `# Dismissal for personal reasons
> A real and serious cause, a three-stage procedure, payments.

The employer may end a CDI, but must **justify** it (real and serious cause) and follow a **procedure**. Each step has its time limit; each failure has its sanction.

## 1. Karim’s file
Karim, an accountant for **6 years** (€2,800 gross a month), is repeatedly **late** despite two warnings. His employer is considering dismissing him.

~~~scene
employeur EMP "Transports Morel"
salarie KAR "Karim Haddad" categorie=employe anciennete=6 salaire=2800
cdi CT "Karim’s CDI"
EMP KAR -> CT
licenciement_personnel LIC "Karim’s dismissal"
EMP -> LIC
LIC -> CT
focus LIC
~~~

## 2. A real and serious cause
The dismissal must be based on a **real** cause (objective, accurate, verifiable facts) and a **serious** one (important enough to justify ending the contract).

Repeated lateness despite warnings constitutes **misconduct (faute sérieuse)**. Without it, the dismissal would be **without real and serious cause**: compensation according to the statutory scale.

~~~scene
faute_simple F "Repeated lateness"
F -> LIC
focus F LIC
~~~

## 3. The invitation letter and the preliminary meeting
1. **Invitation** by registered letter or delivered by hand: purpose, date, time and place of the meeting, right to be accompanied.
2. **Preliminary meeting**, at least **5 working days** after the letter is presented: the employer sets out the reasons, Karim explains himself.

An irregular procedure does not make the dismissal unjustified, but gives entitlement to compensation (at most one month’s salary).

~~~scene
convocation CONV "Invitation (registered letter)"
entretien_prealable ENT "Preliminary meeting"
LIC -> CONV
CONV -> ENT puis "≥ 5 working days"
focus CONV ENT
~~~

## 4. The dismissal letter
At least **2 working days** after the meeting, the employer sends the **dismissal letter**, by registered post with acknowledgement of receipt. It states the **reasons**, which set the limits of the dispute: the employer cannot rely on any others before the court.

~~~scene
notification NOT "Dismissal letter"
ENT -> NOT puis "≥ 2 working days"
focus NOT LIC
~~~

## Question: how much notice for Karim?
Karim has 6 years’ service; his collective agreement provides for nothing more favourable.

~~~scene
verification off
preavis PRE "Notice"
NOT -> PRE
focus PRE
~~~

- [ ] None: the misconduct deprives him of notice
  Only gross and wilful misconduct deprive the employee of notice.
- [ ] 1 month
  That is the period between 6 months’ and 2 years’ service.
- [x] 2 months
  From 2 years’ service, statutory notice is 2 months.
- [ ] 3 months
  This may be the case under a collective agreement (often for managers), not under statute.

### Answer
Statutory notice: **1 month** from 6 months’ to 2 years’ service, **2 months** beyond (unless a collective agreement, custom or the contract is more favourable). So Karim works another 2 months; if the employer releases him from working it, he receives a **payment in lieu of notice**.

~~~scene
verification on
focus PRE
~~~

## 6. The rights that arise
Karim is entitled to:
- **statutory severance pay** (at least 8 months’ service): 1/4 of a month’s salary per year up to 10 years → €2,800 × 6 × 1/4 = **€4,200**;
- **payment in lieu of untaken paid leave**;
- **unemployment benefit** (involuntary loss of employment);
- his **end-of-contract documents**.

~~~scene
indemnite_licenciement IL "Statutory severance pay"
indemnite_conges ICP "Untaken paid leave"
chomage ARE "ARE"
documents_fin DOC "Certificate, attestation, final statement"
LIC -> IL ICP ARE
PRE -> DOC
focus IL
~~~

## 7. Summary
~~~scene
selection LIC
~~~

| Step | Time limit | If missing |
|---|---|---|
| ✉️ Invitation letter | — | irregularity: ≤ 1 month’s salary |
| 💬 Preliminary meeting | ≥ 5 working days after the invitation | irregularity: ≤ 1 month’s salary |
| 📨 Reasoned letter | ≥ 2 working days after the meeting | dismissal without real and serious cause |
| 🎯 Real and serious cause | — | compensation according to the scale |
` },

{ id: 'faute-grave', lang: 'en', md: `# Gross misconduct, wilful misconduct
> What the seriousness of the misconduct takes away from the employee… and what it does not.

The classification of the misconduct changes everything: **misconduct (faute sérieuse)**, **gross misconduct (faute grave)** and **wilful misconduct (faute lourde)** do not have the same effects on notice and payments. Watch the ⊘ symbol: it flags neutralised rights.

## 1. A dismissal for misconduct
**Julie**, a sales assistant for 4 years (€2,100 gross), is dismissed for repeated till errors: **misconduct (faute sérieuse)**. Regular procedure, notice, severance pay: everything is due.

~~~scene
employeur EMP "Mode & Co"
salarie JUL "Julie Garnier" categorie=employe anciennete=4 salaire=2100
cdi CT "Julie’s CDI"
EMP JUL -> CT
licenciement_personnel LIC "Julie’s dismissal"
EMP -> LIC
LIC -> CT
faute_simple F "Till errors"
F -> LIC
convocation CONV
entretien_prealable ENT
notification NOT
preavis PRE "2 months’ notice"
LIC -> CONV
CONV -> ENT puis "≥ 5 working days"
ENT -> NOT puis "≥ 2 working days"
NOT -> PRE
indemnite_licenciement IL "Severance pay"
indemnite_conges ICP "Paid leave"
LIC -> IL ICP
focus F IL PRE
~~~

## Question: the facts turn out to be theft. What does Julie lose?
The investigation reveals that Julie was taking money from the till. The employer treats it as **gross misconduct**.

~~~scene
verification off
type F faute_grave
renommer F "Theft from the till"
focus F
~~~

- [ ] Nothing: the procedure was followed
  The procedure is the same; it is the rights that change.
- [x] Her notice
  Gross misconduct makes it impossible to keep her in the company, even during the notice period.
- [x] Her severance pay
  Gross misconduct removes the right to statutory severance pay.
- [ ] Her accrued paid leave
  Payment in lieu of paid leave remains due.

### Answer
**Gross misconduct** makes it impossible to keep the employee in the company, **even during the notice period**. It deprives Julie of:
- **notice** (and payment in lieu of notice);
- **severance pay**.

She keeps her **payment in lieu of paid leave** and her **unemployment benefit** rights.

~~~scene
verification on
focus PRE IL ICP
~~~

## 3. Precautionary suspension
To remove Julie immediately during the procedure, the employer imposes a **precautionary suspension (mise à pied conservatoire)**. If gross misconduct is upheld, this period is unpaid.

Watch the **time limit**: gross misconduct requires the procedure to be started within a short time after the facts become known; disciplinary facts become time-barred after **2 months**.

~~~scene
mise_a_pied MAP "Precautionary suspension"
retirer LIC -> CONV
LIC -> MAP
MAP -> CONV puis
focus MAP
~~~

## 4. And wilful misconduct?
Had Julie acted with **intent to harm** the employer (for example by sabotaging the stock before leaving for a competitor), the misconduct would be **wilful (faute lourde)**.

Same effects as gross misconduct, and in addition the employer may hold Julie **financially liable**. Since 2016, the **paid leave** payment remains due, even for wilful misconduct.

~~~scene
type F faute_lourde
renommer F "Sabotage of the stock"
focus F ICP
note ICP "Always due, even for wilful misconduct"
~~~

## 5. Summary
| Misconduct | Notice | Severance pay | Paid leave | Financial liability |
|---|---|---|---|---|
| 🟠 Misconduct (sérieuse) | ✔ | ✔ | ✔ | ✘ |
| 🔥 Gross (grave) | ✘ | ✘ | ✔ | ✘ |
| ☠️ Wilful (lourde) | ✘ | ✘ | ✔ | ✔ |

~~~scene
type F faute_grave
renommer F "Theft from the till"
selection IL
~~~
` },

{ id: 'rupture-conventionnelle', lang: 'en', md: `# Mutual termination (rupture conventionnelle)
> Mutual agreement, four steps, a minimum payment.

**Mutual termination (rupture conventionnelle)** allows the employer and an employee on a CDI to agree together to end the contract. It cannot be **imposed** by either party; it comes with safeguards.

## 1. Paul wants to leave, the company agrees
**Paul**, a developer for **5 years** (€3,000 gross), wants to set up his own business. His employer agrees to a mutual termination.

Five dotted badges: all the safeguards are missing.

~~~scene
employeur EMP "Pixel Factory"
salarie PAUL "Paul Nguyen" categorie=cadre anciennete=5 salaire=3000
cdi CT "Paul’s CDI"
EMP PAUL -> CT
rupture_conventionnelle RC "Mutual termination"
EMP PAUL -> RC
RC -> CT
focus RC
~~~

## 2. Meeting and signature
1. One or more **meetings**, at which each party may be accompanied;
2. **signing of the agreement**, which sets the termination date and the **specific termination payment**.

~~~scene
entretien_rc E1 "Meeting on 3 March"
convention_rc CONV "Agreement signed on 10 March"
RC -> E1
E1 -> CONV puis
focus E1 CONV
~~~

## 3. Withdrawal and approval
3. **15 calendar days** to withdraw, for each party;
4. **approval (homologation)** by the administration (DREETS), which has **15 working days**: its silence counts as approval.

~~~scene
retractation RET "Withdrawal period"
homologation HOM "Approval"
inspection DREETS "DREETS"
CONV -> RET puis "15 calendar days"
RET -> HOM puis
DREETS -> HOM lien "15 working days"
focus RET HOM
~~~

## Question: the agreement provides for a €3,000 payment. What will the administration do?
Paul has 5 years’ service and earns €3,000 gross a month.

~~~scene
verification off
indemnite_rc IRC "Specific payment" montant=3000
RC -> IRC
focus IRC
~~~

- [ ] Approve: the payment is freely negotiated
  It is negotiated… above a floor.
- [x] Refuse: the payment is below the statutory minimum
  It must be at least equal to statutory severance pay: €3,000 × 5 × 1/4 = €3,750.
- [ ] Approve, then Paul will claim the difference before the employment tribunal
  The administration checks the amount before approving.

### Answer
The specific payment must be **at least equal to statutory severance pay**: €3,000 × 5 years × 1/4 = **€3,750**. At €3,000, approval is refused. The parties sign a new agreement at **€4,000**.

~~~scene
verification on
note IRC "€3,000 < €3,750: refused"
~~~

## 5. Free consent
The last safeguard: **free consent**. A mutual termination signed under pressure or in a context of **harassment** is **void**: it then takes effect as a dismissal without real and serious cause.

Paul leaves of his own free will: all the badges are green. He will be entitled to **unemployment benefit**.

~~~scene
param IRC montant=4000
consentement_libre CL "Business start-up project"
CL -> RC
chomage ARE "ARE"
indemnite_conges ICP "Paid leave"
RC -> ARE ICP
focus RC
~~~

## 6. Summary
| Step | Safeguard |
|---|---|
| 🗨️ Meeting(s) | may be accompanied |
| 📑 Agreement | date, payment ≥ statutory severance |
| ↩️ Withdrawal | 15 calendar days |
| 🔏 Approval | 15 working days, silence = approval |
| 🕊️ Consent | otherwise void |

~~~scene
selection RC
~~~
` },

{ id: 'depart-salarie', lang: 'en', md: `# Resignation, job abandonment, prise d’acte
> Three ways for the employee to leave the company, three very different regimes.

An employee on a CDI may **resign**. But not all terminations on the employee’s initiative are equal: depending on the form and the circumstances, they keep or lose their rights.

## 1. Amel’s resignation
**Amel** hands in a letter: “I am resigning to join another company.” Resignation requires no particular form, but a **clear and unequivocal intent**.

She works her **notice** (according to the collective agreement or custom). She is not entitled to severance pay.

~~~scene
employeur EMP "Agence Horizon"
salarie AMEL "Amel Kaci" categorie=employe anciennete=3 salaire=2200
cdi CT "Amel’s CDI"
EMP AMEL -> CT
demission DEM "Resignation"
AMEL -> DEM
DEM -> CT
volonte_claire VC "Clear letter, no pressure"
VC -> DEM
preavis PRE "Notice under the agreement"
DEM -> PRE
indemnite_conges ICP "Paid leave"
DEM -> ICP
focus DEM
~~~

## Question: will Amel be entitled to unemployment benefit?
She has found another job… but suppose the job offer falls through.

~~~scene
verification off
chomage ARE "ARE"
DEM -> ARE
focus ARE
~~~

- [ ] Yes, like any employee who loses their job
  The ARE compensates involuntary loss of employment.
- [x] No, in principle: resignation is voluntary
  Except for a “legitimate” resignation (listed cases) or an approved career-change project.
- [ ] Yes, if she has more than 2 years’ service
  Length of service does not change the voluntary nature of resignation.

### Answer
Unemployment benefit compensates **involuntary loss** of employment. After a resignation it is **not due**, except for a **legitimate resignation** (following a spouse, non-payment of salary…) or a recognised **career-change project**.

~~~scene
verification on
focus ARE
~~~

## 3. Hugo’s job abandonment
**Hugo** stops coming to work, without explanation. Since 2023, the employer may give him **formal notice** to justify his absence and return to work, within at least **15 days**.

If he does not return, Hugo is **presumed to have resigned**: no severance pay, **no unemployment benefit**.

~~~scene
retirer DEM PRE ICP ARE VC
salarie HUGO "Hugo Lambert" categorie=employe anciennete=2
cdi CT2 "Hugo’s CDI"
EMP HUGO -> CT2
abandon_poste AB "Absent without explanation"
HUGO -> AB
AB -> CT2
mise_en_demeure MED "Formal notice (15 days)"
AB -> MED
chomage ARE2 "ARE"
AB -> ARE2
focus AB ARE2
~~~

## 4. Sarah’s prise d’acte
For months **Sarah** has suffered humiliation from her manager; the employer, though alerted, has done nothing. She **terminates the contract on the grounds of the employer’s breach (prise d’acte)**.

The court checks whether the employer’s breaches are **serious enough** to prevent the contract from continuing. Here, unaddressed moral harassment breaches the **duty of safety**: the prise d’acte takes effect as a **dismissal without real and serious cause**, or even a void dismissal.

~~~scene
salarie SARAH "Sarah Moreau" categorie=cadre anciennete=7 salaire=3900
cdi CT3 "Sarah’s CDI"
EMP SARAH -> CT3
securite SEC "Duty of safety"
EMP -> SEC
harcelement HAR "Unaddressed moral harassment"
HAR -> SEC
prise_acte PA "Prise d’acte"
SARAH -> PA
PA -> CT3
HAR -> PA lien "grounds"
focus PA HAR SEC
~~~

## 5. Summary
| Termination | Condition | Effects |
|---|---|---|
| 🚪 Resignation | clear and unequivocal intent | notice; no severance pay; no ARE (save exceptions) |
| 🏃 Job abandonment | formal notice left unanswered | presumed to have resigned; no ARE |
| 🚩 Prise d’acte | serious breach by the employer | justified: unfair dismissal; otherwise: resignation |

~~~scene
vue PA
~~~
` },

{ id: 'periode-essai', lang: 'en', md: `# Ending the probationary period
> A free termination… provided there really is a probation, and without abuse.

During the probationary period, either party may end the contract **freely**, without reasons or a dismissal procedure. But this freedom has limits.

## 1. Lucas’s probation
**Lucas**, a technician, is hired on a CDI with a **2-month probationary period**, stipulated in his written contract.

~~~scene
employeur EMP "ÉlecPro"
salarie LUC "Lucas Ferreira" categorie=technicien
cdi CT "Lucas’s CDI"
EMP LUC -> CT
ecrit EC "Written contract"
EC -> CT
periode_essai ESS "2-month probation" duree=2
CT -> ESS
focus ESS
~~~

## 2. The employer ends the probation
After 6 weeks, the employer considers that Lucas lacks the expected skills and ends the probation.

The termination is free, but the employer gives **advance notice** depending on the time spent in the job: 24 hours under 8 days, 48 hours between 8 days and 1 month, **2 weeks** after 1 month, 1 month after 3 months.

~~~scene
rupture_essai RE "Termination of probation"
EMP -> RE
RE -> CT
focus RE
note RE "Advance notice missing"
~~~

## 3. Advance notice
Lucas is given 2 weeks’ notice. No severance pay, no notice period: only his paid leave and his end-of-contract documents.

~~~scene
delai_prevenance DP "2 weeks"
DP -> RE
indemnite_conges ICP "Paid leave"
RE -> ICP
focus RE
~~~

## Question: what if the probation had not been written into the contract?
Suppose Lucas’s contract makes no mention of a probationary period.

~~~scene
verification off
retirer ESS
focus RE
~~~

- [ ] Nothing changes: probation exists automatically
  A probationary period is never presumed.
- [x] The termination is treated as a dismissal
  Without a validly stipulated probation, the employer must follow the rules on dismissal.
- [ ] Lucas must repay his salary
  No provision says so.

### Answer
A probationary period is **never presumed**: it must appear in the letter of engagement or the contract. Without it, the termination is a **dismissal**, which requires a real and serious cause and a procedure. Here, with no procedure: dismissal without real and serious cause.

~~~scene
verification on
focus RE
~~~

## 5. An abusive termination
Even with a valid probation, the termination is **abusive** if it has **nothing to do with the employee’s skills** (economic reason, discrimination, reprisals…). The employee may then obtain damages; if it is discriminatory, it is void.

~~~scene
periode_essai ESS "2-month probation" duree=2
CT -> ESS
condition RE "Reason linked to skills" manque "abusive termination: damages"
focus RE
note RE "Termination “for economic reasons”?"
~~~

## 6. Summary
- Probation must be **in writing** and respect the **maximum lengths**.
- Termination is free, but with **advance notice**.
- It must be linked to the employee’s **skills**; otherwise it is abusive.

~~~scene
condition RE "Reason linked to skills" ok
selection RE
~~~
` },

{ id: 'hierarchie-normes', lang: 'en', md: `# The sources of French employment law
> Statute, agreements, contract, internal rules, custom: which prevails?

**Léa**’s contract does not stand alone: it sits within a stack of legal norms. To know which rule applies, you need to know how they fit together.

## 1. Statute, the public-policy foundation
The **Labour Code (C. trav.)** lays down **public-policy** rules (SMIC minimum wage, maximum working hours, paid leave…), from which one may only depart in the employee’s favour, and **default** rules, which apply in the absence of agreement.

~~~scene
code_travail CT "Labour Code"
focus CT
~~~

## 2. Sector and company
The **sector-level agreement (convention de branche)** sets in particular **minimum wages** and **job classifications**.

Since the 2017 ordinances, the **company agreement** prevails over the sector-level agreement in most areas, except those that statute reserves to the sector (minimum wages, classifications, workplace equality…) or that the sector locks.

~~~scene
convention_collective CCN "Syntec agreement"
accord_entreprise AE "Company agreement"
CT -> CCN
CCN -> AE prevaut "areas reserved to the sector"
focus CCN AE
~~~

## 3. The employment contract
The **contract** cannot be less favourable than statute or the collective agreement: this is the **favourability principle (principe de faveur)**. A more favourable clause in the contract prevails over the collective agreement (except for special agreements, such as the collective performance agreement).

~~~scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin"
cdi CTR "Léa’s contract"
EMP LEA -> CTR
remuneration REM "€3,400 gross"
CTR -> REM
CCN -> REM encadre "≥ agreed minimum"
focus CTR REM
~~~

## Question: the agreement sets a €3,600 minimum for Léa’s job. What happens?
Léa’s contract provides for €3,400 gross a month.

~~~scene
verification off
focus REM CCN
~~~

- [ ] The contract applies: Léa signed it
  The contract cannot depart, to the employee’s detriment, from the collectively agreed minimum.
- [x] Léa is entitled to the agreed minimum of €3,600
  The less favourable clause is set aside in favour of the agreement.
- [ ] The contract is void
  Only the clause is set aside; the contract survives.

### Answer
The pay clause is **less favourable** than the collective agreement: it is set aside, Léa is entitled to **€3,600** and may claim back pay.

~~~scene
verification on
statut REM nulle "below the agreed minimum: €3,600 due"
focus REM
~~~

## 5. Internal rules and custom
The **internal rules (règlement intérieur)** (mandatory from 50 employees) set the rules on health, safety and **discipline**. A **custom (usage)** (a general, consistent and fixed practice, such as a year-end bonus) creates a right until it is properly revoked.

~~~scene
reglement_interieur RI "Internal rules"
usage US "Holiday bonus"
CT -> RI
RI -> CTR encadre "discipline, sanctions"
US -> LEA lien "bonus due"
focus RI US
~~~

## 6. Summary
| Source | Role |
|---|---|
| 📕 Statute | public policy, default rules |
| 📗 Sector | minimum wages, classifications, reserved areas |
| 📘 Company agreement | prevails over the sector in other areas |
| 📄 Contract | favourability principle |
| 📙 Internal rules | health, safety, discipline |
| 🔂 Custom | right until revoked |

~~~scene
vue CTR
~~~
` },

{ id: 'quiz-ruptures', lang: 'en', md: `# Quiz: which termination, which rights?
> Eight quick questions to revise how employment contracts end.

A revision quiz: the canvas illustrates each situation. Click the audience’s answer, then reveal.

## Question: can a CDD be ended early because the employee is too slow?
~~~scene
cdd CT "6-month CDD"
rupture_anticipee_cdd RA "Early termination"
RA -> CT
insuffisance INS "Slowness"
INS -> RA lien "reason given"
verification off
focus RA
~~~

- [ ] Yes, it is poor performance
  This reason may justify dismissal under a CDI, not early termination of a CDD.
- [x] No, except by agreement, gross misconduct, force majeure, unfitness or hiring on a CDI
  The list of grounds for early termination is exhaustive.

### Answer
A CDD can only be ended before its end date in **exhaustively listed cases**. Otherwise, the employer owes damages at least equal to the **pay for the remainder of the contract**.

~~~scene
verification on
~~~

## Question: does mutual termination give entitlement to unemployment benefit?
~~~scene
effacer
rupture_conventionnelle RC "Mutual termination"
chomage ARE "ARE"
RC -> ARE
focus RC ARE
verification off
~~~

- [x] Yes
  It is an involuntary loss of employment within the meaning of unemployment insurance.
- [ ] No, it is a termination wanted by the employee
  It is wanted by both parties; the employee receives benefit.

### Answer
Mutual termination gives entitlement to **unemployment benefit**: this is one of its main differences from resignation.

~~~scene
verification on
~~~

## Question: gross misconduct: which payment remains due?
~~~scene
effacer
licenciement_personnel LIC "Dismissal"
faute_grave FG "Gross misconduct"
FG -> LIC
indemnite_licenciement IL
indemnite_preavis IP
indemnite_conges ICP
LIC -> IL IP ICP
verification off
focus IL IP ICP
~~~

- [ ] Severance pay
  Removed by gross misconduct.
- [ ] Payment in lieu of notice
  Removed by gross misconduct.
- [x] Payment in lieu of paid leave
  Always due, whatever the reason for termination.

### Answer
Only the **paid leave** payment survives gross misconduct (and even wilful misconduct).

~~~scene
verification on
~~~

## Question: an employee with 5 months’ service is dismissed (no gross misconduct). Are they entitled to statutory severance pay?
~~~scene
effacer
salarie S "Employee" anciennete=0.42 salaire=2000
cdi CT "CDI"
S -> CT
licenciement_personnel LIC "Dismissal"
LIC -> CT
indemnite_licenciement IL
LIC -> IL
verification off
focus IL
~~~

- [ ] Yes, from day one
  A minimum length of service is required.
- [x] No, at least 8 months’ service is required
  Below that, only a more favourable agreement can provide for it.
- [ ] Yes, if they have more than 3 months
  The statutory threshold is 8 months.

### Answer
Statutory severance pay requires **8 months’ uninterrupted service**.

~~~scene
verification on
~~~

## Question: what is the minimum time between the invitation letter and the preliminary meeting?
~~~scene
effacer
convocation CONV
entretien_prealable ENT
CONV -> ENT puis "?"
focus CONV ENT
~~~

- [ ] 2 working days
  That is the minimum time between the meeting and sending the dismissal letter.
- [x] 5 working days
  From the presentation of the invitation letter.
- [ ] 15 calendar days
  That is the withdrawal period for a mutual termination.

### Answer
**5 working days** after the invitation is presented; then at least **2 working days** between the meeting and the dismissal letter.

~~~scene
retirer CONV -> ENT
CONV -> ENT puis "≥ 5 working days"
~~~

## Question: an employee abandons their job and does not respond to the formal notice. They are…
~~~scene
effacer
abandon_poste AB "Job abandonment"
mise_en_demeure MED
AB -> MED
focus AB
verification off
~~~

- [ ] Dismissed for gross misconduct
  That was the practice before 2023; the employer may still choose this route, but the law has created a presumption.
- [x] Presumed to have resigned
  Since 2023 (art. L1237-1-1 C. trav.), unless there is a legitimate reason.
- [ ] In a mutual termination
  That requires the agreement of both parties.

### Answer
They are **presumed to have resigned**: no severance pay and no unemployment benefit. They may challenge this before the employment tribunal (conseil de prud’hommes), which rules quickly.

~~~scene
verification on
~~~

## Question: who approves a mutual termination?
~~~scene
effacer
rupture_conventionnelle RC
homologation HOM
RC -> HOM
focus HOM
~~~

- [ ] The employment tribunal (conseil de prud’hommes)
  It decides disputes; it does not approve.
- [x] The labour administration (DREETS)
  Within 15 working days; its silence counts as approval.
- [ ] The CSE
  It plays no part in an individual mutual termination (except for a protected employee: authorisation from the labour inspector).

### Answer
The **DREETS** approves it (15 working days of silence = approval). For a **protected employee**, **authorisation** from the labour inspector is required.

~~~scene
inspection DR "DREETS"
DR -> HOM lien "approves"
~~~

## Question: the prise d’acte is not justified. It takes effect as…
~~~scene
effacer
prise_acte PA "Prise d’acte"
verification off
focus PA
~~~

- [ ] A dismissal without real and serious cause
  That is the case when the employer’s breaches are serious enough.
- [x] A resignation
  The employee ended the contract without sufficient reason.
- [ ] A mutual termination
  That requires agreement and approval.

### Answer
A **justified** prise d’acte: dismissal without real and serious cause (or even a void dismissal). **Not justified**: **resignation**.

~~~scene
verification on
note PA "No serious breach: resignation"
~~~
` }

);
