# Scenario format ("cinema" mode)

A scenario is an ordinary **markdown** file. The tool splits it into **steps** (one per level-2 heading) and, at each step, runs the **commands** of the `scene` blocks, which build a diagram: a contract and its clauses, their safeguards, the parties and their obligations, a termination and its procedure, the payments it opens. The tool then **checks** each item (✅ valid, ⚠️ at risk, ⛔ void, unfair or unenforceable, ⚡ obligation breached).

Two laws are available: **English law (England & Wales)** and **French law**. A scenario uses one of them (see "Choosing the law"); the commands are the same, the catalogue of types differs.

## Structure

~~~
---
droit: uk
---
# Scenario title
> A one-line description (optional).

Introductory text (optional: it becomes the first step).

## 1. Title of the first step
Commentary in markdown: **bold**, *italics*, lists, tables, quotes…
An item can be cited by its identifier: [[NC]].

```scene
employer EMP "Hartley Recruitment Ltd"
employee TOM "Tom Bradley" service=3 weekly_pay=900 age=34
permanent CT "Tom's contract"
EMP TOM -> CT
non_compete NC "Non-compete"
CT -> NC
focus NC
```

## 2. Title of the next step
…
~~~

Rules:
- steps are **cumulative**: each step starts from the state of the previous one;
- `focus`, `note` and `select` only apply to the step where they are written; `view` stays active until `view none`;
- blocks can be written ```scene or ~~~scene (aliases: canvas, actions, script);
- inside a block, a line starting with # or // is a comment;
- identifiers have no spaces (CT, NC, TOM…); names go between double quotes;
- `[[ID]]` in the commentary shows the item's name, highlighted on the canvas when hovered (`[[ID|other text]]` to choose the text).

## Choosing the law

| Law | How to choose it | Type keys |
|---|---|---|
| English law (England & Wales) | front matter `droit: uk` at the very top of the file (also `law: uk`), or the command `law uk` (French: `droit uk`) in the first block | English: `employee`, `permanent`, `non_compete`, `conduct_dismissal`, `statutory_redundancy_pay`… |
| French law | the default: nothing to write (or `droit: fr`) | French keys (`salarie`, `cdi`, `non_concurrence`, `licenciement_personnel`…); English aliases are accepted (`employee`, `permanent`, `non_compete`, `dismissal`, `gross_misconduct`…) |

- Accepted names: `uk`, `england`, `england_wales`, `english_law`, `gb`… for English law; `fr`, `france`, `french_law` for French law.
- One scenario, one law. The front matter is the recommended form: the library and the share links then show the right flag. It must start on the first line of the file.
- The language of the text and the law are independent: a French-law scenario can be written in English (comparative law), and vice versa. The labels of the catalogue follow the language of the interface.
- English law: amounts in £, `service` in years, `weekly_pay` per week. French law: amounts in €, `anciennete` (seniority) in years, `salaire` (salary) per month.

## Quiz steps

A step can question the audience. A window then rises at the bottom of the canvas with the question and the choices as large cards. The teacher can click the class's choice, then reveals the answer: button, **→** or presentation remote. The cards change colour; clicking a card flips it to show its explanation. The general explanation appears in the right-hand panel. In continuous play, the playback waits for the reveal. In a SCORM package, questions give a score.

~~~
## Question: is this non-compete enforceable?
Optional context, displayed in the right-hand panel.

```scene
verification off
focus NC
```

- [ ] Yes, Tom signed his contract
  A signature is not enough: the covenant is a restraint of trade.
- [x] No, it needs a reasonable duration
  The safeguards are cumulative: without a reasonable duration, the restraint is unenforceable.
- [ ] Yes, if the employer pays Tom during the restriction
  That is French law: English law requires no payment.

### Answer
General explanation, displayed after the reveal.

```scene
verification on
reasonable_duration RD "6 months"
RD -> NC
note NC "Enforceable: four safeguards"
```
~~~

Rules:
- a step is a question if its title starts with "Question" (or "Quiz", "❓"), if it contains `- [ ]` / `- [x]` choices, or a `### Answer` section (also: Explanation, Solution, Correction; French: Réponse);
- `[x]` marks a right answer; there can be several, or no boxes at all for an **open question**;
- the question text is the heading, without the "Question:" prefix;
- context goes **before** the choices; indented lines (or "> ") just under a choice are its explanation;
- commands placed **after** `### Answer` only run at the reveal, so the answer can be shown on the canvas; they remain applied in the following steps (except `focus`, `note` and `select`, which belong to the step);
- `verification off` before the question hides verdicts and badges (otherwise the canvas gives the answer away), `verification on` in the answer restores them;
- make sure the text of the previous steps does not already give the answer.

## Commands

Every command has an English and a French name (`remove` / `retirer`…); both can be mixed.

| Command | Effect |
|---|---|
| `TYPE ID "Name"` | creates or updates an item of the given type (see the catalogue below), e.g. `garden_leave GL "Garden leave"` |
| `TYPE ID "Name" key=value …` | with data: `employee TOM "Tom" service=3 weekly_pay=900 age=34`, `probation PR duration=6`, `notice_clause NC1 notice_weeks=4`; French law: `salarie LEA "Léa" categorie=cadre anciennete=4 salaire=3200` (or `category=cadre seniority=4 salary=3200`) |
| `clause ID "Name" icon=🧸` | free item, with the icon of your choice (also `other_condition`, `obligation`, `other_termination`, `other_step`, `other_party`, `other_contract`, `norme` for a source; a payment: `other_payment_or_right` under English law, `other_entitlement` under French law) |
| `TYPE ID "Name" at 200 150` | fixed position; without `at`, automatic layout |
| `A -> B` | links A to B; the relation is chosen from the types (see below) |
| `A B C -> D` | links A, B and C to D (e.g. three safeguards to one clause) |
| `A -> B C D` | links A to B, C and D (e.g. a contract to its clauses) |
| `A -> B relation` | forced relation: `includes`, `limits`, `requires`, `excludes`, `signs`, `owes`, `breaches`, `justifies`, `initiates`, `ends`, `then`, `entitles`, `governs`, `prevails`, `link` (French: `contient`, `limite`, `requiert`, `exclut`, `signe`, `doit`, `viole`, `justifie`, `initie`, `met_fin`, `puis`, `ouvre`, `encadre`, `prevaut`, `lien`) |
| `A -> B then "7 days"` | relation with a label shown on the link (time limit, amount…) |
| `limits RD NC` | other form: the relation first, then the origin and the target(s) |
| `remove ID` / `remove A -> B` | deletes an item / a link (`retirer`) |
| `rename ID "New name"` · `type ID fixed_term` | renames / changes the type (`renommer`, `type`) |
| `param ID key=value` · `icon ID 🧸` | adds or changes data / the icon (`param`, `icone`) |
| `condition ID "Label" met` / `missing` | custom condition shown as a badge (`missing risk`: amber; `"effect"` at the end of the line); `condition ID none` removes them (French: `ok` / `manque`) |
| `status ID void "text"` | forces a verdict: `valid`, `risk`, `void`, `breached`, `neutral` (also `fair`, `unfair`, `unenforceable`, `lawful`); `status ID auto` returns to the computed verdict (`statut`) |
| `verification off` / `on` | hides / shows verdicts and badges (for questions; also `check off`) |
| `view ID` / `view none` | zooms on the case file of an item, the rest is dimmed (`vue`) |
| `focus ID ID…` | highlights items (also `highlight`) |
| `note ID "text"` | speech bubble above an item |
| `select ID` | shows the validity conditions of ID under the commentary (`selection`) |
| `duration 12` | duration of the step in continuous play, in seconds (`duree`) |
| `move ID X Y` · `layout` · `clear` | move, back to automatic layout, empty the canvas (`deplacer`, `disposition`, `effacer`) |
| `law uk` · `law fr` | chooses the law (`droit`); prefer the front matter `droit: uk` |

An item cited in a link without having been declared is created automatically (as a free clause, or of the type whose name it bears) and a warning is shown: always declare your items.

### Relations chosen automatically

| From → to | Relation |
|---|---|
| safeguard → any item | `limits` ("safeguards", green link 🔒) |
| party → contract | `signs` |
| contract → clause | `includes` (the clause enters the contract's frame) |
| party → obligation | `owes` |
| misconduct / breach → obligation | `breaches` (the obligation turns ⚡ breached) |
| misconduct → termination | `justifies` (the misconduct counts as the ground of the termination) |
| party → termination | `initiates` |
| termination → contract | `ends` |
| termination → step, step → step | `then` (procedure chain, shown in a row) |
| termination or step → payment / right | `entitles` |
| source → source / other | `prevails` / `governs` |

### What the tool checks

- **Safeguards**: each type has its conditions (column "Conditions checked" of the catalogue). A condition is met if an item of the expected type is **linked directly** to the item, or belongs to the same **procedure chain** (`then`), or is attached to the **contract** that includes the clause (e.g. `written_particulars` linked to the contract counts for its probation clause). Missing conditions appear as dotted badges under the card.
- **Incompatibilities** (⊘): checked within the same **case file** — the items linked to one another, not through parties or sources. E.g. `gross_misconduct` in the case file of a dismissal neutralises the `notice` and the `notice_pay`; a `wrongful_dismissal` releases the employee from a `non_compete`; under French law, `faute_grave` neutralises `preavis` and `indemnite_licenciement`.
- **Data**: a figure is looked up on the item itself, then in its case file, then on the parties linked to it: put `service`, `weekly_pay` and `age` (English law) or `categorie`, `anciennete` and `salaire` (French law) on the employee.
- **Calculations, English law**: unfair dismissal qualifying period (`service` vs `qualifying_years`, default 2), statutory minimum notice (ERA 1996 s.86) vs `notice_weeks`, notice pay, statutory redundancy pay and basic award (age bands, 20 years, week's pay capped by `week_cap`, default £751), compensatory award (`loss`, `polkey` %, `uplift` % up to 25, cap `comp_cap` default £123,543 or 52 weeks' pay), National Minimum Wage (`hourly_rate` vs the rate for the `age`), 4 years of successive fixed-term contracts (`successive_years`), holiday pay (`untaken_days` × `day_pay`). The annual figures change every April: they are parameters, overridable on any item (e.g. `param SRP week_cap=719`).
- **Calculations, French law**: probationary period (`duree` in months, employee's `categorie`: ouvrier, employe, technicien, agent_maitrise, cadre), CDD (`duree` > 18 months), statutory notice and statutory severance pay (`anciennete` in years, gross monthly `salaire`), mutual termination payment (`montant` compared with the statutory minimum), end-of-CDD payment (`remuneration_totale`).
- ⚠️ **Employment Rights Act 2025**: the English catalogue states the law in force on 20 November 2026. The reforms announced for 1 January 2027 (6-month qualifying period, no cap on the compensatory award) are flagged in the descriptions, not applied: use `qualifying_years=0.5` or a larger `comp_cap` to show them.

## Catalogue of types

### English law (England & Wales)

Front matter `droit: uk`. Type keys are English.

#### 👥 Parties & actors

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `employer` | 🏢 | Employer | — | — | `company`, `firm`, `employeur`, `entreprise` |
| `employee` | 👤 | Employee | `service`, `weekly_pay`, `age` | — | `employe`, `salarie`, `staff`, `emp_employee` |
| `worker` | 🧑‍🔧 | Worker | `hourly_rate`, `age` | — | — |
| `acas` | 🕊️ | ACAS | — | — | `conciliation` |
| `tribunal` | ⚖️ | Employment tribunal | — | — | `employment_tribunal`, `et`, `court` |
| `trade_union` | 🗣️ | Trade union / representatives | — | — | `union`, `representatives`, `employee_representatives` |
| `hmrc` | 🏦 | HMRC | — | — | — |
| `new_employer` | 🏭 | New employer | — | — | — |
| `partie` | 👥 | Other party | — | — | — |

#### 📃 Contracts

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `permanent` | 📄 | Permanent contract | — | `written_particulars` (risk) | `permanent_contract`, `open_ended`, `contract_of_employment`, `cdi` |
| `fixed_term` | ⏳ | Fixed-term contract | `successive_years` | `written_particulars` (risk) | `fixed_term_contract`, `cdd`, `temporary_contract` |
| `zero_hours` | 📲 | Zero-hours contract | — | `written_particulars` (risk) | `zero_hours_contract`, `zhc` |
| `apprenticeship` | 🎓 | Apprenticeship agreement | — | `in_writing` or `written_particulars` | `apprentice`, `apprenticeship_agreement` |
| `contrat` | 📃 | Other contract | — | — | — |

#### 🧩 Clauses

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `pay` | 💷 | Pay | `hourly_rate` | — | — |
| `hours` | ⏱️ | Working hours | — | — | — |
| `place` | 📍 | Place of work | — | — | — |
| `job_title` | 🧑‍💼 | Job title / duties | — | — | — |
| `holiday` | 🏖️ | Holiday entitlement | — | — | — |
| `probation` | 🧪 | Probationary period | `duration` | `written_particulars` or `in_writing` (risk) | `probationary_period`, `trial_period`, `periode_essai` |
| `notice_clause` | 🔔 | Contractual notice | `notice_weeks` | — | `contractual_notice`, `notice_term` |
| `pilon` | 💸 | PILON clause | — | — | `payment_in_lieu`, `payment_in_lieu_of_notice` |
| `garden_leave` | 🌿 | Garden leave | — | `express_term` (risk) | — |
| `confidentiality` | 🤐 | Confidentiality | — | — | `confidential_information` |
| `non_compete` | 🚫 | Non-compete | `duration` | `legitimate_interest`, `reasonable_duration`, `reasonable_area`, `reasonable_scope` ; ⊘ `wrongful_dismissal`/`constructive_dismissal` | `non_competition`, `restrictive_covenant`, `non_concurrence` |
| `non_solicitation` | 🙅 | Non-solicitation | `duration` | `legitimate_interest`, `reasonable_duration`, `reasonable_scope` ; ⊘ `wrongful_dismissal`/`constructive_dismissal` | `non_solicit`, `non_solicitation_of_clients` |
| `non_dealing` | 🤚 | Non-dealing | `duration` | `legitimate_interest`, `reasonable_duration`, `reasonable_scope` ; ⊘ `wrongful_dismissal`/`constructive_dismissal` | — |
| `non_poaching` | 🧲 | Non-poaching | `duration` | `legitimate_interest`, `reasonable_duration`, `reasonable_scope` ; ⊘ `wrongful_dismissal`/`constructive_dismissal` | `non_poach`, `no_poaching`, `non_solicitation_of_employees` |
| `opt_out_48h` | 🕐 | 48-hour opt-out | — | `in_writing`, `right_to_withdraw` (risk) | `opt_out`, `working_time_opt_out`, `48_hour_opt_out` |
| `deductions_clause` | ➖ | Deductions from wages | — | `in_writing` | `deductions`, `deduction_clause` |
| `zero_hours_exclusivity` | ⛓️ | Zero-hours exclusivity | — | unlawful by nature | — |
| `discriminatory_term` | 🚷 | Discriminatory term | — | unlawful by nature | — |
| `contracting_out` | 🙈 | Waiver of statutory rights | — | unlawful by nature | — |
| `clause` | 🧩 | Other clause | — | — | — |

#### 🔒 Safeguards & conditions

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `legitimate_interest` | 🏰 | Legitimate business interest | — | — | — |
| `reasonable_duration` | ⌛ | Reasonable duration | — | — | — |
| `reasonable_area` | 🗺️ | Reasonable area | — | — | — |
| `reasonable_scope` | 🎯 | Reasonable scope | — | — | — |
| `written_particulars` | 📝 | Written statement of particulars | — | — | `written_statement`, `statement_of_particulars`, `section_1_statement`, `s1_statement`, `particulars` |
| `in_writing` | ✍️ | In writing | — | — | — |
| `express_term` | 🖋️ | Express term | — | — | — |
| `right_to_withdraw` | ↩️ | Right to cancel | — | — | — |
| `particular_complaint` | 📎 | Relates to particular complaints | — | — | — |
| `independent_advice` | 🧑‍⚖️ | Independent advice | — | — | — |
| `adviser_identified` | 🪪 | Adviser named and insured | — | — | — |
| `potentially_fair_reason` | 🎫 | Potentially fair reason | — | — | — |
| `genuine_belief` | 🧠 | Genuine belief on reasonable grounds | — | — | `burchell`, `burchell_test` |
| `reasonable_response` | 📐 | Band of reasonable responses | — | — | `band_of_reasonable_responses`, `range_of_reasonable_responses` |
| `genuine_redundancy` | 📉 | Genuine redundancy | — | — | — |
| `fair_selection` | 🧮 | Fair selection | — | — | — |
| `automatic_unfair_reason` | 🚨 | Automatically unfair reason | — | — | — |
| `repudiatory_breach` | 💥 | Employer's repudiatory breach | — | — | `fundamental_breach` |
| `prompt_resignation` | ⏩ | Resigned without undue delay | — | — | — |
| `clear_resignation` | 🗯️ | Clear words of resignation | — | — | — |
| `condition` | ☑️ | Other condition | — | — | `other_condition` |

#### 📌 Obligations

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `pay_wages` | 💳 | Pay at least the minimum wage | — | — | — |
| `duty_of_care` | 🦺 | Duty of care (health and safety) | — | — | — |
| `non_discrimination` | 🟰 | No unlawful discrimination | — | — | — |
| `mutual_trust` | 🤲 | Mutual trust and confidence | — | — | `trust_and_confidence`, `implied_term_of_trust` |
| `fidelity` | ⚓ | Fidelity (good faith) | — | — | — |
| `obey_instructions` | 📋 | Obey lawful and reasonable instructions | — | — | — |
| `care_skill` | 🛠️ | Reasonable care and skill | — | — | — |
| `employee_safety` | ⛑️ | Take care for health and safety | — | — | — |
| `obligation` | 📌 | Other obligation | — | — | — |

#### ⚡ Misconduct & breaches

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `breach` | ⚡ | Breach | — | — | `manquement`, `failure` |
| `misconduct` | 🟠 | Misconduct | — | — | `minor_misconduct` |
| `gross_misconduct` | 🔥 | Gross misconduct | — | — | `serious_misconduct` |
| `capability` | 📊 | Capability | — | — | — |
| `harassment` | 🛑 | Harassment / bullying | — | — | — |

#### 💔 Termination of the contract

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `resignation` | 🚪 | Resignation | — | `clear_resignation` (risk) | — |
| `conduct_dismissal` | 📤 | Dismissal for misconduct | — | `misconduct` or `gross_misconduct` or `potentially_fair_reason`, `genuine_belief`, `investigation`, `disciplinary_letter`, `disciplinary_meeting`, `appeal` (risk), `reasonable_response` | `dismissal`, `misconduct_dismissal`, `disciplinary_dismissal`, `unfair_dismissal` |
| `capability_dismissal` | 📦 | Dismissal for capability | — | `capability` or `potentially_fair_reason`, `warning`, `disciplinary_meeting`, `appeal` (risk), `reasonable_response` | `performance_dismissal` |
| `redundancy` | 🏚️ | Redundancy | — | `genuine_redundancy`, `fair_selection`, `consultation` or `collective_consultation`, `alternative_employment` | `redundancy_dismissal` |
| `summary_dismissal` | ⚔️ | Summary dismissal | — | `gross_misconduct` | `dismissal_without_notice`, `instant_dismissal` |
| `wrongful_dismissal` | 🧨 | Wrongful dismissal | — | — | — |
| `constructive_dismissal` | 🚩 | Constructive dismissal | — | `repudiatory_breach` or `harassment`, `prompt_resignation` | — |
| `settlement_agreement` | 🤝 | Settlement agreement | — | `in_writing`, `particular_complaint`, `independent_advice`, `adviser_identified` | `settlement`, `compromise_agreement` |
| `fixed_term_expiry` | ⏹️ | Expiry of a fixed term | — | — | `expiry`, `non_renewal` |
| `probation_dismissal` | 🚦 | Termination in probation | — | `probation` (risk) | `probation_termination`, `dismissal_in_probation` |
| `rupture` | 💔 | Other termination | — | — | — |

#### 🔹 Procedure

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `investigation` | 🔎 | Investigation | — | — | — |
| `suspension` | ⏸️ | Precautionary suspension | — | — | — |
| `disciplinary_letter` | ✉️ | Written notification | — | — | `invitation_letter`, `notification` |
| `disciplinary_meeting` | 💬 | Disciplinary meeting | — | `companion` (risk) | `hearing`, `disciplinary_hearing`, `meeting` |
| `companion` | 🧑‍🤝‍🧑 | Right to be accompanied | — | — | — |
| `warning` | 🟨 | Written warning | — | — | — |
| `decision` | 📨 | Written decision | — | — | — |
| `appeal` | ↗️ | Appeal | — | — | — |
| `consultation` | 🗨️ | Individual consultation | — | — | — |
| `collective_consultation` | 📢 | Collective consultation | — | — | — |
| `alternative_employment` | 🔀 | Suitable alternative employment | — | — | — |
| `notice` | ⏲️ | Notice period | `notice_weeks` | ⊘ `gross_misconduct` | `notice_period`, `statutory_notice`, `preavis` |
| `protected_conversation` | 🔐 | Protected conversation | — | — | — |
| `early_conciliation` | 📞 | ACAS early conciliation | — | — | — |
| `grievance` | 📣 | Grievance | — | — | — |
| `etape` | 🔹 | Other step | — | — | — |

#### 🎁 Payments & entitlements

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `unfair_dismissal_right` | 🛡️ | Unfair dismissal claim | `qualifying_years` | — | `unfair_dismissal_claim`, `right_not_to_be_unfairly_dismissed` |
| `notice_pay` | 💴 | Notice pay | — | ⊘ `gross_misconduct` | `pay_in_lieu`, `pay_in_lieu_of_notice` |
| `statutory_redundancy_pay` | 💵 | Statutory redundancy pay | `week_cap` | ⊘ `resignation` | `redundancy_pay`, `srp` |
| `basic_award` | 🧾 | Basic award | `week_cap` | — | — |
| `compensatory_award` | 🩹 | Compensatory award | `loss`, `polkey`, `uplift`, `comp_cap` | — | — |
| `acas_uplift` | 📈 | ACAS Code uplift | `uplift` | — | — |
| `holiday_pay` | 🏝️ | Holiday pay in lieu | `untaken_days`, `day_pay` | — | `holiday_pay_in_lieu`, `accrued_holiday` |
| `settlement_payment` | 💰 | Settlement payment | `amount` | — | — |
| `droit` | 🎁 | Other payment or right | — | — | — |

#### 📚 Legal sources

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `era_1996` | 📕 | Employment Rights Act 1996 | — | — | `era`, `employment_rights_act` |
| `equality_act` | 📗 | Equality Act 2010 | — | — | — |
| `wtr` | 📘 | Working Time Regulations 1998 | — | — | — |
| `acas_code` | 📙 | ACAS Code of Practice | — | — | `code_of_practice` |
| `tulrca` | 📒 | TULRCA 1992 | — | — | — |
| `nmwa` | 📓 | National Minimum Wage Act 1998 | — | — | — |
| `common_law` | 🏛️ | Common law | — | — | — |
| `collective_agreement` | 🗞️ | Collective agreement | — | — | — |
| `era_2025` | 🆕 | Employment Rights Act 2025 | — | — | — |
| `norme` | 📚 | Other source | — | — | — |

### French law (labels in English)

The default law. Type keys are French; the "Also accepted" column gives the aliases, English ones included.

#### 👥 Parties & actors

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `employeur` | 🏢 | Employer | — | — | `entreprise`, `societe`, `employer`, `company` |
| `salarie` | 👤 | Employee | `categorie`, `anciennete`, `salaire` | — | `salariee`, `employe`, `travailleur`, `employee`, `worker` |
| `cse` | 🗣️ | CSE (works council) | — | — | `works_council`, `social_and_economic_committee` |
| `inspection` | 🏛️ | Labour administration (DREETS) | — | — | `dreets`, `inspection_du_travail`, `administration`, `labour_inspectorate`, `labour_inspection`, `labour_administration` |
| `prudhommes` | ⚖️ | Employment tribunal (conseil de prud’hommes) | — | — | `cph`, `juge`, `employment_tribunal`, `labour_court`, `tribunal` |
| `medecin` | 🩺 | Occupational doctor | — | — | `occupational_doctor`, `occupational_physician` |
| `nouvel_employeur` | 🏭 | New employer | — | — | `new_employer` |
| `france_travail` | 🏦 | France Travail | — | — | `pole_emploi`, `public_employment_service` |
| `partie` | 👥 | Other party | — | — | — |

#### 📃 Contracts

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `cdi` | 📄 | Permanent contract (CDI) | — | — | `permanent`, `permanent_contract`, `open_ended_contract` |
| `cdd` | ⏳ | Fixed-term contract (CDD) | `duree` | `ecrit`, `motif_recours`, `terme` | `fixed_term`, `fixed_term_contract` |
| `interim` | 🔁 | Temporary agency contract (intérim) | — | `ecrit`, `motif_recours` | `mission`, `ctt`, `agency_work`, `temporary_agency_contract`, `temp_contract` |
| `apprentissage` | 🎓 | Apprenticeship contract | — | — | `apprenticeship` |
| `contrat` | 📃 | Other contract | — | — | — |

#### 🧩 Clauses

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `remuneration` | 💶 | Pay | — | — | `pay`, `wage` |
| `fonctions` | 🧑‍💼 | Grade / duties | — | — | `duties`, `job_title`, `role` |
| `duree_travail` | ⏱️ | Working hours | — | — | `working_time`, `working_hours` |
| `lieu_travail` | 📍 | Place of work | — | — | `place_of_work`, `workplace`, `work_location` |
| `temps_partiel` | 🌓 | Part-time work | — | `ecrit`, `repartition` | `part_time` |
| `periode_essai` | 🧪 | Probationary period | `duree` | `ecrit` | `essai`, `periode_d_essai`, `probation`, `probationary_period`, `trial_period` |
| `renouvellement_essai` | 🔄 | Probation renewal | `duree` | `accord_collectif`, `ecrit`, `accord_salarie` | `renouvellement`, `probation_renewal`, `renewal` |
| `non_concurrence` | 🚫 | Non-compete | — | `interet_legitime`, `limite_duree`, `limite_geo`, `specificites`, `contrepartie` | `nc`, `clause_de_non_concurrence`, `non_compete`, `non_competition`, `non_compete_clause`, `restrictive_covenant` |
| `non_sollicitation` | 🙅 | Non-solicitation of clients | — | `interet_legitime`, `limite_duree`, `limite_geo`, `contrepartie` | `non_solicitation`, `non_solicit` |
| `mobilite` | 🧳 | Mobility | — | `zone_definie`, `interet_legitime` (risk), `delai_prevenance` (risk) | `clause_de_mobilite`, `mobility`, `mobility_clause` |
| `exclusivite` | 🔒 | Exclusivity | — | `interet_legitime`, `proportionnalite` ; ⊘ `temps_partiel` | `clause_d_exclusivite`, `exclusivity`, `exclusivity_clause` |
| `dedit_formation` | 🎒 | Training repayment clause (dédit-formation) | — | `ecrit`, `formation_couteuse`, `proportionnalite` ; ⊘ `licenciement_personnel`/`licenciement_eco`/`licenciement_inaptitude`/`rupture_essai` | `dedit`, `clause_de_dedit_formation`, `training_repayment`, `training_clawback`, `clawback` |
| `confidentialite` | 🤐 | Confidentiality | — | — | `secret`, `confidentiality`, `nda` |
| `objectifs` | 🎯 | Targets clause | — | `objectifs_realistes` (risk) | `targets`, `objectives` |
| `remuneration_variable` | 📈 | Variable pay | — | `criteres_objectifs` | `variable_pay`, `bonus`, `commission` |
| `forfait_jours` | 📆 | Annual days-based working-time agreement (forfait jours) | — | `accord_collectif`, `convention_individuelle`, `autonomie`, `suivi_charge` | `forfait`, `forfait_annuel_en_jours`, `days_based`, `annual_days`, `days_based_agreement` |
| `astreinte` | 📟 | On-call duty (astreinte) | — | `contrepartie`, `delai_prevenance` (risk) | `on_call`, `standby` |
| `teletravail` | 🏠 | Remote working | — | `accord_collectif` or `accord_salarie` (risk) | `remote_working`, `remote_work`, `telework` |
| `garantie_emploi` | 🛡️ | Job-security guarantee | — | — | `job_security`, `employment_guarantee` |
| `propriete_intellectuelle` | 💡 | Employee inventions | — | — | `inventions`, `intellectual_property` |
| `parachute` | 🪂 | Contractual severance payment | — | — | `golden_parachute`, `contractual_severance` |
| `clause_resolutoire` | 💣 | Automatic termination | — | unlawful by nature | `automatic_termination` |
| `clause_vie_privee` | 💍 | Restriction of private life | — | unlawful by nature | `private_life` |
| `clause_discriminatoire` | 🚷 | Discriminatory clause | — | unlawful by nature | `discriminatory_clause` |
| `clause` | 🧩 | Other clause | — | — | `custom_clause` |

#### 🔒 Safeguards & conditions

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `contrepartie` | 💰 | Financial compensation | — | — | `contrepartie_financiere`, `compensation`, `financial_compensation`, `consideration` |
| `limite_duree` | ⌛ | Time limit | — | — | `duree_limitee`, `limite_temps`, `time_limit`, `duration_limit` |
| `limite_geo` | 🗺️ | Geographical limit | — | — | `limite_geographique`, `limite_espace`, `geographical_limit`, `geographic_limit`, `area_limit` |
| `specificites` | 🧩 | Specific features of the job | — | — | `job_specifics` |
| `interet_legitime` | 🏰 | Company’s legitimate interest | — | — | `interet`, `legitimate_interest` |
| `proportionnalite` | 📐 | Justified and proportionate | — | — | `proportionality`, `proportionate` |
| `zone_definie` | 📌 | Precisely defined area | — | — | `defined_area`, `defined_zone` |
| `delai_prevenance` | 📢 | Advance notice | — | — | `advance_notice`, `prior_notice` |
| `accord_salarie` | 🙋 | Employee’s express consent | — | — | `employee_consent`, `express_consent` |
| `formation_couteuse` | 🧾 | Costs beyond legal obligations | — | — | `costly_training` |
| `objectifs_realistes` | ✅ | Realistic, known targets | — | — | `realistic_targets` |
| `criteres_objectifs` | 📏 | Objective criteria | — | — | `objective_criteria` |
| `ecrit` | ✍️ | In writing | — | — | `writing`, `written`, `in_writing` |
| `motif_recours` | 📝 | Precise reason for use | — | — | `reason_for_use`, `permitted_reason` |
| `terme` | 📅 | Precise end date | — | — | `end_date`, `fixed_end_date` |
| `repartition` | 🗓️ | Hours and distribution | — | — | `distribution_of_hours`, `schedule` |
| `accord_collectif` | 📜 | Collective agreement | — | — | `collective_agreement` |
| `convention_individuelle` | 🖋️ | Written individual agreement | — | — | `individual_agreement` |
| `autonomie` | 🧭 | Employee autonomy | — | — | `autonomy` |
| `suivi_charge` | 📊 | Workload monitoring | — | — | `workload_monitoring` |
| `cause_reelle` | 🎯 | Real and serious cause | — | — | `cause_reelle_et_serieuse`, `crs`, `real_and_serious_cause`, `genuine_cause`, `just_cause` |
| `motif_eco` | 📉 | Economic reason | — | — | `economic_reason`, `economic_grounds` |
| `volonte_claire` | 🧠 | Clear and unequivocal intent | — | — | `clear_intent`, `unequivocal_intent` |
| `consentement_libre` | 🕊️ | Free consent | — | — | `free_consent` |
| `manquement_suffisant` | 🚨 | Serious breach by the employer | — | — | `serious_breach` |
| `motif_rupture_cdd` | 🗝️ | Permitted ground for early termination | — | — | `early_termination_ground` |
| `condition` | ☑️ | Other condition | — | — | `autre_condition` |

#### 📌 Obligations

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `fournir_travail` | 🧰 | Provide the agreed work | — | — | `provide_work` |
| `payer_salaire` | 💳 | Pay the salary | — | — | `pay_salary`, `pay_wages` |
| `securite` | 🦺 | Duty of safety | — | — | `safety`, `duty_of_safety`, `health_and_safety` |
| `adaptation` | 🧑‍🏫 | Adaptation and employability | — | — | `employability` |
| `non_discrimination` | 🟰 | Equality, non-discrimination | — | — | `equal_treatment`, `equality` |
| `respect_libertes` | 🗽 | Respect for freedoms | — | — | `respect_for_freedoms` |
| `bonne_foi` | 🤲 | Performance in good faith | — | — | `good_faith` |
| `executer_travail` | 🛠️ | Perform the work | — | — | `perform_work` |
| `obeissance` | 📋 | Follow instructions | — | — | `obedience`, `follow_instructions` |
| `loyaute` | ⚓ | Loyalty | — | — | `loyalty` |
| `discretion` | 🔇 | Discretion | — | — | — |
| `securite_salarie` | ⛑️ | Take care of safety | — | — | `employee_safety` |
| `obligation` | 📌 | Other obligation | — | — | `custom_obligation` |

#### ⚡ Misconduct & breaches

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `manquement` | ⚡ | Failure to perform | — | — | `faute`, `failure`, `default` |
| `faute_simple` | 🟠 | Misconduct (faute sérieuse) | — | — | `faute_serieuse`, `misconduct`, `simple_misconduct` |
| `faute_grave` | 🔥 | Gross misconduct (faute grave) | — | — | `gross_misconduct` |
| `faute_lourde` | ☠️ | Wilful misconduct (faute lourde) | — | — | `wilful_misconduct`, `willful_misconduct` |
| `harcelement` | 🛑 | Harassment | — | — | `harassment`, `bullying` |
| `insuffisance` | 📉 | Poor performance (insuffisance professionnelle) | — | — | `poor_performance`, `underperformance`, `incompetence` |

#### 💔 Termination of the contract

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `demission` | 🚪 | Resignation | — | `volonte_claire` | `resignation` |
| `licenciement_personnel` | 📤 | Dismissal for personal reasons | — | `cause_reelle` or `faute_simple` or `faute_grave` or `faute_lourde` or `insuffisance`, `convocation` (risk), `entretien_prealable` (risk), `notification` ; ⊘ `garantie_emploi` | `licenciement`, `licenciement_disciplinaire`, `licenciement_pour_motif_personnel`, `dismissal`, `personal_dismissal` |
| `licenciement_eco` | 🏚️ | Economic redundancy | — | `motif_eco`, `reclassement`, `consultation_cse` (risk), `convocation` (risk), `notification` ; ⊘ `garantie_emploi` | `licenciement_economique`, `redundancy`, `economic_dismissal` |
| `licenciement_inaptitude` | 🏥 | Dismissal for unfitness | — | `avis_inaptitude`, `reclassement`, `notification` | `unfitness_dismissal`, `incapacity_dismissal` |
| `rupture_conventionnelle` | 🤝 | Mutual termination (rupture conventionnelle) | — | `entretien_rc`, `convention_rc`, `retractation`, `homologation`, `consentement_libre` | `rc`, `mutual_termination`, `mutual_agreement` |
| `fin_cdd` | ⏹️ | Expiry of the CDD | — | — | `end_of_fixed_term`, `expiry` |
| `rupture_anticipee_cdd` | ✂️ | Early termination of the CDD | — | `motif_rupture_cdd` or `faute_grave` or `faute_lourde` | `early_termination` |
| `rupture_essai` | 🚦 | Termination during probation | — | `periode_essai`, `delai_prevenance` (risk) | `rupture_periode_essai`, `rupture_de_la_periode_d_essai`, `probation_termination`, `end_of_probation` |
| `prise_acte` | 🚩 | Prise d’acte (termination for employer’s breach) | — | `manquement_suffisant` or `harcelement` | `prise_d_acte`, `constructive_dismissal` |
| `resiliation_judiciaire` | 🔨 | Judicial termination (résiliation judiciaire) | — | `manquement_suffisant` or `harcelement` | `judicial_termination`, `judicial_rescission` |
| `abandon_poste` | 🏃 | Job abandonment | — | `mise_en_demeure` | `job_abandonment`, `abandonment` |
| `depart_retraite` | 👴 | Voluntary retirement | — | — | `retirement` |
| `rupture` | 💔 | Other termination | — | — | — |

#### 🔹 Procedure

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `convocation` | ✉️ | Invitation letter | — | — | `invitation`, `invitation_letter`, `summons` |
| `entretien_prealable` | 💬 | Preliminary meeting | — | — | `preliminary_meeting`, `pre_dismissal_meeting` |
| `notification` | 📨 | Dismissal letter | — | — | `dismissal_letter` |
| `mise_a_pied` | ⏸️ | Precautionary suspension | — | — | `suspension`, `precautionary_suspension` |
| `sanction` | 🟥 | Disciplinary sanction | — | — | `disciplinary_sanction`, `warning` |
| `preavis` | 🔔 | Notice | — | ⊘ `faute_grave`/`faute_lourde` | `notice` |
| `entretien_rc` | 🗨️ | Mutual termination meeting | — | — | `termination_meeting` |
| `convention_rc` | 📑 | Signing of the agreement | — | — | `termination_agreement` |
| `retractation` | ↩️ | Withdrawal period | — | — | `withdrawal`, `cooling_off` |
| `homologation` | 🔏 | Approval (homologation) | — | — | `approval` |
| `mise_en_demeure` | 📬 | Formal notice | — | — | `formal_notice` |
| `reclassement` | 🔎 | Search for redeployment | — | — | `redeployment`, `alternative_employment` |
| `consultation_cse` | 📣 | Consultation of the CSE | — | — | `cse_consultation`, `works_council_consultation` |
| `avis_inaptitude` | 📋 | Unfitness opinion | — | — | `unfitness_opinion` |
| `documents_fin` | 🗂️ | End-of-contract documents | — | — | `documents`, `end_of_contract_documents`, `leaving_documents` |
| `etape` | 🔹 | Other step | — | — | — |

#### 🎁 Payments & entitlements

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `indemnite_licenciement` | 💵 | Severance pay | — | ⊘ `faute_grave`/`faute_lourde` | `indemnite_legale`, `severance`, `severance_pay`, `statutory_severance` |
| `indemnite_preavis` | 💴 | Payment in lieu of notice | — | ⊘ `faute_grave`/`faute_lourde` | `pay_in_lieu_of_notice`, `payment_in_lieu` |
| `indemnite_conges` | 🏖️ | Payment in lieu of paid leave | — | — | `holiday_pay`, `paid_leave` |
| `indemnite_precarite` | 💷 | End-of-CDD payment | — | ⊘ `faute_grave`/`faute_lourde`, ⊘ `cdi` | `prime_de_precarite`, `precarite`, `indemnite_fin_cdd`, `end_of_cdd_payment`, `precariousness_bonus` |
| `indemnite_rc` | 💸 | Mutual termination payment | — | — | `mutual_termination_payment` |
| `chomage` | ☂️ | Unemployment benefit (ARE) | — | ⊘ `demission`, ⊘ `abandon_poste` | `are`, `unemployment_benefit`, `unemployment` |
| `dommages_interets` | 🩹 | Damages | — | — | `damages` |
| `droit` | 🎁 | Other entitlement | — | — | — |

#### 📚 Legal sources

| Type | Icon | Label | Data (`key=value`) | Conditions checked (safeguards) | Also accepted |
|---|---|---|---|---|---|
| `code_travail` | 📕 | Labour Code (C. trav.) | — | — | `labour_code` |
| `convention_collective` | 📗 | Sector-level agreement (convention de branche) | — | — | `sector_agreement`, `branch_agreement` |
| `accord_entreprise` | 📘 | Company agreement | — | — | `company_agreement` |
| `reglement_interieur` | 📙 | Internal rules (règlement intérieur) | — | — | `internal_rules`, `work_rules` |
| `usage` | 🔂 | Company custom (usage) | — | — | `company_custom`, `custom` |
| `norme` | 📚 | Other source of law | — | — | — |

## Writing tips

- 5 to 9 steps; each step adds only one idea (a clause and its safeguards, a procedural step, a misconduct…).
- Show the clause **alone** first (⛔, dotted badges), then add its safeguards one by one: the card turns green before the class's eyes.
- For a termination, set the termination, then its procedure chain (`then` with the time limits as labels), then the rights it opens (`entitles`).
- Put the figures on the employee (`service`, `weekly_pay`, `age`; French law: `anciennete`, `salaire`, `categorie`): the calculations find them. Give the calculation in the text ("12 weeks × £751 = £9,012"): the tool shows the same figures.
- Use `focus` and `note` to guide the eye; a bubble stays short (about 60 characters).
- When the tool cannot represent a rule (tribunal's assessment of the facts, contractual enhancements, real dates and time limits…), use `condition` or `status` with a text, and explain in the commentary.
- English law: say which figures are those from 6 April 2026 and flag the Employment Rights Act 2025 reforms when they matter ("> ⚠️ …").
