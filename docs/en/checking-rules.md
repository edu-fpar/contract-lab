# Checking rules

This page describes what the engine (`js/model.js`, with the catalogues `js/catalog-uk.js` for English law and `js/model.js` + `js/catalog-fr-en.js` for French law) checks and calculates, and what it does not represent. It is also the reference used by the scenario-writing skill: the commentary of a scenario must announce the same verdicts as the tool.

The **mechanism** (items, safeguards, case files, incompatibilities, breached obligations, forced verdicts) is the same for both laws. Each law brings its own **catalogue** of types, its conditions, its incompatibilities and its **calculations**.

## Items and verdicts

Each card is an **item** of a type from the catalogue (see the [scenario format](format-scenario.md)), belonging to a family: parties, contracts, clauses, safeguards and conditions, obligations, misconduct and breaches, terminations, procedure, payments and entitlements, legal sources.

After every change, the tool checks all the items and gives each one a **status**:

| Status | Icon | When |
|---|---|---|
| valid | ✅ | the item has validity conditions, and all of them are met |
| at risk | ⚠️ | at least one "risk"-level condition is missing, no "serious"-level one |
| void / unfair / unenforceable | ⛔ | a "serious"-level condition is missing, the clause is unlawful by nature, an incompatible item is in the case file, or a calculation shows a breach of a limit |
| breached | ⚡ | obligation linked to a misconduct or a breach |
| no verdict | — | item with no condition and no problem (a party, a source, a safeguard, a procedural step…) |

The **verdict text** is the legal effect of the first serious problem (otherwise of the first risk-level problem): "unenforceable restraint of trade", "unfair: no reasonable investigation (+ up to 25% uplift)", "void: statutory claims not waived (s.203)", "not due: gross misconduct"… When everything is met, the text is "valid" for a clause, "lawful" for a termination, "conditions met" for a contract, unless the type has its own text (English law: "fair (ERA 1996 s.98)" for a dismissal for misconduct or capability, "fair redundancy", "lawful without notice (gross misconduct)" for a summary dismissal, "a dismissal (ERA 1996 s.95(1)(c)): may be unfair" for a constructive dismissal, "valid: the statutory claims are settled (s.203(3))" for a settlement agreement).

Order of priority: a verdict **forced** by the scenario (`status`) beats everything; then a **breached** obligation; then serious problems, then risk-level problems.

## Safeguards: the validity conditions

Many types have **validity conditions** (column "Conditions checked" of the catalogue). Each one expects an item of one or more types, with a level and an effect if it is missing. Examples:

| Item | Conditions | If a condition is missing |
|---|---|---|
| 🇬🇧 Non-compete (`non_compete`) | legitimate business interest, reasonable duration, reasonable area, reasonable scope — **no payment** | ⛔ unenforceable restraint of trade |
| 🇬🇧 Non-solicitation, non-dealing, non-poaching | legitimate interest, reasonable duration, reasonable scope | ⛔ unenforceable restraint of trade |
| 🇬🇧 Permanent / fixed-term / zero-hours contract | written statement of particulars (risk) | ⚠️ award of 2 or 4 weeks' pay if added to a successful claim |
| 🇬🇧 48-hour opt-out | in writing (serious); right to cancel (risk) | ⛔ ineffective / ⚠️ |
| 🇬🇧 Deductions from wages | in writing | ⛔ unlawful deduction (ERA 1996 s.13) |
| 🇬🇧 Dismissal for misconduct | a conduct reason, genuine belief (Burchell), investigation, written notification, meeting, band of reasonable responses (serious); appeal (risk) | ⛔ unfair / ⚠️ procedural flaw |
| 🇬🇧 Redundancy | genuine redundancy, fair selection, consultation, search for alternative employment | ⛔ unfair |
| 🇬🇧 Settlement agreement | in writing, particular complaints, independent advice, adviser named and insured | ⛔ void: statutory claims not waived (s.203) |
| 🇬🇧 Constructive dismissal | employer's repudiatory breach (or harassment), resignation without undue delay | ⛔ treated as a resignation / contract affirmed |
| 🇫🇷 Non-compete (`non_concurrence`) | legitimate interest, time limit, geographical limit, specific features of the job, **financial compensation** | ⛔ void |
| 🇫🇷 CDD | in writing, precise reason, precise end date | ⛔ reclassified as a permanent contract (CDI) |
| 🇫🇷 Dismissal for personal reasons | real and serious cause (or a misconduct, or poor performance), dismissal letter (serious); invitation, preliminary meeting (risk) | ⛔ without real and serious cause / ⚠️ procedural irregularity |
| 🇫🇷 Mutual termination | meeting, agreement, withdrawal period, approval, free consent | ⛔ void, or no effect without approval |

A condition can accept several types: under English law, the "potentially fair reason" of a dismissal for misconduct is met by `potentially_fair_reason`, but also by a `misconduct` or `gross_misconduct` linked to the dismissal; the employer's repudiatory breach of a constructive dismissal is met by `repudiatory_breach` or `harassment`.

Under the card, each condition is a **badge** (seven at most): green if met, dotted red (serious) or amber (risk) if missing. The inspector's checklist also gives the item that meets the condition ("via …") or the effect if it is missing ("Otherwise: …").

### Context of a condition

A condition is met if an item of the expected type is in the **context** of the checked item. The context includes:

1. **items linked directly**, whatever the direction and the relation (except `excludes`): `legitimate_interest LI` linked to `non_compete NC`;
2. **the procedure chain**: all the items linked by `then` to the item itself or to one of its direct neighbours, however far along the chain. With `conduct_dismissal CD -> INV`, `INV -> LET then`, `LET -> MEET then`, `MEET -> APP then`, the investigation, the letter, the meeting and the appeal all count for the dismissal;
3. **the contract's formalities**: if the item is linked directly to a contract (the clause it includes, the termination that ends it), the clauses of that contract (`includes`) and the safeguards linked to the contract itself (`limits`) count too. A `written_particulars` linked to the permanent contract thus counts for the probation clause it includes; a `probation_dismissal` linked to the contract finds the `probation` it includes.

Consequence: link the safeguards **to the clause** they condition. A safeguard linked to the contract counts for all its clauses; that is intended for the written statement, but a `reasonable_duration` linked to the contract would also validate every covenant.

A condition does not need to be "good" to be met: the tool checks that an item of the right type is present, not its content. A 3-year non-compete marked `reasonable_duration` counts as reasonable; it is for the commentary (or `status`) to say what a court would decide.

### Custom conditions

The command `condition ID "Label" met|missing [risk] ["effect"]` adds a condition specific to the item, shown as a badge like the others. A missing custom condition produces a serious problem (or a risk-level one with `risk`), with the given effect (by default "condition not met").

## Clauses unlawful by nature

These clauses are always ⛔, whatever safeguards are linked:

| Law | Clause | Verdict |
|---|---|---|
| 🇬🇧 | Zero-hours exclusivity (`zero_hours_exclusivity`) | unenforceable (ERA 1996 s.27A) |
| 🇬🇧 | Discriminatory term (`discriminatory_term`) | unenforceable against the person disadvantaged (Equality Act 2010 s.142) |
| 🇬🇧 | Waiver of statutory rights (`contracting_out`) | void (ERA 1996 s.203), unless in a valid settlement agreement or an ACAS COT3 |
| 🇫🇷 | Automatic termination (`clause_resolutoire`) | void: no clause can decide in advance that a fact will be a ground for dismissal |
| 🇫🇷 | Restriction of private life (`clause_vie_privee`) | void: unjustified and disproportionate infringement of the employee's rights |
| 🇫🇷 | Discriminatory clause (`clause_discriminatoire`) | void: prohibited discrimination |

## Case file and incompatibilities

### The case file

A **case file** is the set of items linked to one another, step by step, **without going through parties or sources**. An employee who signs two contracts, or a statute that governs several contracts, does not merge them into one case file. `excludes` links do not connect case files either.

Example: `gross_misconduct GM -> SD` (justifies), `SD -> N` (then), `SD -> NP` (entitles) form a single case file: the gross misconduct, the summary dismissal, the notice and the notice pay.

### Incompatibilities

Some types are **neutralised** when an item of another type is in the **same case file** (⊘). The link does not need to be direct. When checking is on, the tool draws a dotted red link between the two items.

| Law | Item | Neutralised by | Effect |
|---|---|---|---|
| 🇬🇧 | Non-compete, non-solicitation, non-dealing, non-poaching | wrongful dismissal, constructive dismissal | ⛔ released: the employer's repudiatory breach frees the employee (General Billposting v Atkinson [1909]) |
| 🇬🇧 | Notice period (`notice`) | gross misconduct | ⛔ not due |
| 🇬🇧 | Notice pay | gross misconduct | ⛔ not due |
| 🇬🇧 | Statutory redundancy pay | resignation | ⛔ not due: no dismissal |
| 🇫🇷 | Exclusivity | part-time work | ⛔ in principle unenforceable against a part-time employee |
| 🇫🇷 | Training repayment | dismissal (personal, economic, unfitness), termination of probation | ⛔ inapplicable: the termination is not the employee's doing |
| 🇫🇷 | Dismissal for personal or economic reasons | job-security guarantee | ⚠️ salary remains due until the guarantee expires |
| 🇫🇷 | Notice, severance pay, payment in lieu of notice | gross or wilful misconduct | ⛔ not due |
| 🇫🇷 | End-of-CDD payment | gross or wilful misconduct; CDI | ⛔ not due |
| 🇫🇷 | Unemployment benefit | resignation (⚠️); job abandonment (⛔) | no benefit (save legitimate resignation); presumed resignation |

**Holiday pay** has no incompatibility under either law: it remains due even for gross (or, in France, wilful) misconduct.

An explicit link `A -> B excludes "effect"` neutralises B (⛔, with the link's label as effect) if A and B are otherwise in the same case file.

Beware of case files that are too wide: if two situations that should stay separate are linked (two dismissals, a fixed-term contract and the permanent one that follows), incompatibilities spread from one to the other. Keep separate the case files that should be.

## Breached obligations

An **obligation** linked directly to an item of the "misconduct and breaches" family (English law: `breach`, `misconduct`, `gross_misconduct`, `capability`, `harassment`; French law: `manquement`, `faute_simple`, `faute_grave`, `faute_lourde`, `harcelement`, `insuffisance`) turns ⚡ **breached**, and the inspector says by what. The link is created naturally: `breach B -> MT` (relation `breaches`).

The breach itself has no verdict. For it to have an effect on a termination, link it to the termination too: a `harassment` linked to a constructive dismissal meets its condition "employer's repudiatory breach".

## Calculations: generic mechanism

Figures are given with `key=value`. A calculation looks for the figure first on the item itself, then on the items of its case file or linked directly, then on the parties linked to the case file: it is enough to put the figures on the employee who signs the contract. Numbers accept spaces, a thousands comma (`1,200`), a decimal point and a unit (`£751`, `2.5`, `4 years`, `6 months`).

Results appear in the inspector (🧮) and, when a limit is exceeded, as a problem that changes the verdict.

## Calculations under English law (England & Wales)

The English catalogue states the law in force on **20 November 2026**.

### Data

| Data | Key | Values |
|---|---|---|
| Continuous service | `service` | complete years, decimals allowed (`0.5` = 6 months); or `service_months` |
| Gross weekly pay | `weekly_pay` | £ per week (aliases `weekly_wage`, `week_pay`) |
| Age at dismissal | `age` | years |
| Contractual notice | `notice_weeks` | weeks (on the employee, a `notice_clause` or the `notice` step) |
| Duration | `duration` | months (probation, covenants) |
| Hourly rate | `hourly_rate` | £ per hour (on the employee, the worker or the `pay` clause) |
| Successive fixed terms | `successive_years` | years, on the `fixed_term` contract |
| Compensatory award | `loss`, `polkey`, `uplift` | loss in £; Polkey reduction in %; ACAS uplift in % |
| Holiday pay | `untaken_days`, `day_pay` | days; £ per day |
| Settlement payment | `amount` | £ |

### Annual figures and reform parameters

These figures are **parameters with a default value**, because they change every year. Put a parameter on any item of the case file (or on the employee) to use another value: `param SRP week_cap=719`.

| Parameter | Default | Source | Changes |
|---|---|---|---|
| `week_cap` | £751 | cap on a week's pay for statutory redundancy pay and the basic award, from 6 April 2026 | **every April** |
| `comp_cap` | £123,543 | cap on the compensatory award (with 52 weeks' gross pay), from 6 April 2026 | **every April** |
| `nmw` | £12.71 (21+), £10.85 (18–20), £8.00 (under 18 and apprentices) | National Minimum / Living Wage from 1 April 2026; the rate is chosen from `age` | **every April** |
| `qualifying_years` | 2 | unfair dismissal qualifying period (ERA 1996 s.108) | ⚠️ Employment Rights Act 2025 |
| — | £30,000 | tax-free part of a genuine termination payment (displayed only) | rarely |

⚠️ **Employment Rights Act 2025.** The catalogue flags, without applying them, the reforms announced for dismissals with an effective date of termination **on or after 1 January 2027**: qualifying period reduced to **6 months** (use `qualifying_years=0.5`) and **removal of the cap** on the compensatory award (use a large `comp_cap`). Other reforms flagged in the descriptions: tribunal time limit extended from 3 to 6 months, protective award raised from 90 to 180 days, new rights for zero-hours workers (guaranteed-hours offers, notice of shifts, pay for cancelled shifts). Government proposals to cap non-competes are not law. Always check the commencement regulations for the dates of the case.

### Qualifying period (unfair dismissal)

On a dismissal for misconduct, for capability and a redundancy, the tool compares `service` with `qualifying_years` (default 2):
- service ≥ qualifying period: "qualifying period met: 3 years ≥ 2 years";
- service < qualifying period: "service 1.5 years < qualifying period 2 years: no ordinary unfair dismissal claim", and the **serious fairness defects are downgraded to ⚠️** ("flawed, but no unfair dismissal claim (service < 2 years)"): the procedure was bad, but the employee cannot claim ordinary unfair dismissal;
- an `automatic_unfair_reason` in the case file (whistleblowing, pregnancy, health and safety…) makes the dismissal ⛔ "automatically unfair", with no qualifying period.

On a constructive dismissal, the expiry of a fixed term, a summary dismissal and a termination in probation, the comparison is only displayed (no downgrade). The `unfair_dismissal_right` item turns ⛔ "not available: under 2 years' service (s.108)" when service is too short.

### Notice (ERA 1996 s.86)

Statutory minimum from the employer: none under one month of service; **1 week** from one month to under 2 years; then **1 week per complete year**, up to **12 weeks**. From the employee: 1 week after one month.
- `notice` step in the case file of a dismissal: the statutory minimum is displayed ("statutory minimum: 10 weeks (10 years of service)"); a `notice_weeks` on the step itself below the minimum turns it ⛔ "too short".
- `notice_clause` with `notice_weeks` below the statutory minimum: ⚠️ "statutory minimum prevails".
- With a resignation (and no dismissal): the employee's minimum (1 week) and the contractual notice are displayed.
- `notice_pay`: the longer of statutory and contractual notice × gross weekly pay, **not capped**. Example: 10 years, £800 a week → 10 weeks × £800 = **£8,000**.

### Statutory redundancy pay and basic award (ERA 1996 s.162 and s.119)

> weeks = for each complete year of service, counting back from the dismissal, up to 20 years: ½ week for each year under 22, 1 week for each year from 22 to 40, 1½ weeks for each year aged 41 or over
> amount = weeks × min(weekly_pay, week_cap)

Example: age 45, 10 years, £800 a week → 4 × 1.5 + 6 × 1 = 12 weeks × £751 (capped) = **£9,012**. Example: age 25, 3 years, £500 a week → 3 weeks × £500 = **£1,500**.

Statutory redundancy pay is ⛔ "not due: under 2 years' continuous service" below 2 years. The basic award has no such bar here (it follows the unfair dismissal claim) and notes that it is "reduced by statutory redundancy pay already received" when both are in the case file.

### Compensatory award (ERA 1996 s.123)

> award = loss × (1 − polkey %) × (1 + uplift %), capped at the lower of comp_cap and 52 × weekly_pay

Example: loss £30,000, Polkey 20 %, uplift 10 %, £800 a week → £26,400, under the cap (lower of £123,543 and £41,600). The cap does not apply when an `automatic_unfair_reason` is in the case file (whistleblowing, health and safety). An `uplift` over 25 % is ⛔ "uplift limited to 25% (TULRCA s.207A)"; same check on the `acas_uplift` item.

### Other English-law checks

- **Minimum wage**: `hourly_rate` on the `pay` clause (or the employee) below the rate for the `age` (or `nmw`) → ⛔ "below the minimum wage: arrears due (NMWA 1998)". The apprentice rate applies with an `apprenticeship` in the case file if the apprentice is under 19 or in the first year.
- **Successive fixed terms**: `successive_years` ≥ 4 on a `fixed_term` contract → ⚠️ "permanent unless objectively justified (FTE Regs 2002 reg 8)".
- **Probation**: `duration` is displayed ("no statutory maximum (3–6 months is common)"); a termination in probation displays the statutory notice.
- **Covenants**: `duration` displayed ("no payment required"), and "garden leave usually set off against this period" if a `garden_leave` is in the case file.
- **Holiday pay**: `untaken_days` × `day_pay`. **Settlement payment**: `amount`, with the £30,000 tax-free reminder (not for notice pay).

## Calculations under French law

| Data | Key | Values |
|---|---|---|
| Employee's category | `categorie` (alias `category`) | `ouvrier` (manual worker), `employe` (clerical), `technicien`, `agent_maitrise` (supervisor), `cadre` (manager) |
| Seniority | `anciennete` (alias `seniority`) | years (decimals allowed: `0.5` = 6 months) |
| Reference salary | `salaire` (alias `salary`) | gross monthly, in euros |
| Duration | `duree` (alias `duration`) | months (probation, renewal, CDD) |
| Amount | `montant` (alias `amount`) | euros (mutual termination payment) |
| Total pay of the CDD | `remuneration_totale` (alias `total_pay`) | gross, in euros (end-of-CDD payment) |

- **Probationary period** (CDI): maximum 2 months for `ouvrier` and `employe`, 3 months for `agent_maitrise` and `technicien`, 4 months for `cadre`; 4 / 6 / 8 months renewal included (on `renouvellement_essai`). Beyond: ⛔ "excessive duration". In a CDD the duration is only displayed.
- **CDD**: a `duree` over **18 months** (general case, renewals included) → ⛔ reclassified as a CDI.
- **Statutory notice** (displayed, not a condition): under 6 months of seniority, "collective agreement or custom"; 6 months to under 2 years, **1 month**; 2 years and more, **2 months**.
- **Statutory severance pay** = salary × (1/4 × years up to 10 + 1/3 × years beyond 10). Examples: €2,400 and 3 years → **€1,800**; €3,000 and 12 years → **€9,500**. Under **8 months** of seniority: ⛔ "not due".
- **Mutual termination payment**: same formula as a **statutory minimum**; a `montant` below it → ⛔ "below the statutory minimum: approval refused".
- **End-of-CDD payment**: 10 % of `remuneration_totale` (the 6 % rate allowed by agreement is not calculated).

## Forced verdict: `status` and `condition`

When the tool does not know a rule, or the court's assessment changes the answer, the scenario forces the result:
- `status ID void "text"` (or `valid`, `risk`, `breached`, `neutral`; also `unfair`, `unenforceable`, `fair`, `lawful`) replaces the computed verdict, with the given text; `status ID auto` returns to the calculation. The inspector says "verdict set by the scenario". **A forced verdict stays visible even with `verification off`**: do not force it before a question whose answer it would give;
- `condition ID "Label" missing "effect"` adds a badge and a problem, without touching the other conditions.

## Hidden checking

`verification off` (or the 🔍 Checks box unticked) hides verdicts, badges and automatically drawn incompatibility links; the cards stay neutral and the checklist shows ❔. Calculations remain displayed in the inspector. `verification on` restores the display.

## What the tool does not represent

- **The tribunal's or court's assessment of the facts**: whether a belief was reasonable, whether dismissal was within the band of reasonable responses in the case at hand, whether a covenant's duration is in fact reasonable, whether a breach is repudiatory, whether a resignation came too late (affirmation), whether a French dismissal has a real and serious cause or a misconduct is truly gross. The tool checks that a safeguard is present, not its quality;
- **contractual enhancements and collective agreements**: enhanced redundancy schemes, longer contractual probation or notice, French sector agreements;
- **real dates and time limits**: ACAS early conciliation, the 3-month (soon 6-month) tribunal time limit, the 30/45 days of collective consultation, the 10 days to consider a settlement offer, French time limits (5 working days before the preliminary meeting, 15 days to withdraw…). They can be written as a label on a link (`then "30 days"`) but are neither counted nor checked;
- **the full assessment of compensation**: mitigation, contributory fault, the Polkey percentage itself, injury to feelings in discrimination claims, tax and NI on termination payments; in France, the scale of damages for unfair dismissal and the calculation of the reference salary;
- **special statuses and collective rules**: TUPE transfers, discrimination claims in full, whistleblowing procedure, protective awards, the French protected employees and collective redundancy plans (PSE);
- **dates**: the tool does not know whether a probation is still running, which April's figures apply, or whether a reform of the Employment Rights Act 2025 is in force on the date of the case — set the parameters accordingly.

In these cases, the canvas shows the items involved, `status` or `condition` set the intended verdict, and the commentary carries the analysis.
