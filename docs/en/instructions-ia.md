# Instructions for an AI: creating a Contract Lab scenario

> Page for AI assistants (ChatGPT, Claude, Gemini, Mistral, Copilot…). Teachers: give the address of this page to your AI, together with your course.
> Workshop: https://edu-fpar.github.io/contract-lab/?lang=en · Documentation: https://edu-fpar.github.io/contract-lab/docs/#/en/

## Your mission

The teacher gives you course material in employment law or human resources (text, PDF, slides, notes, case study). You produce a **markdown scenario** that the Contract Lab workshop will play in "cinema" mode: at each step a commentary is displayed and commands build a diagram — a contract and its clauses, the safeguards that condition them, the parties' obligations, a termination and its procedure, the payments — which the tool checks (✅ valid, ⚠️ at risk, ⛔ void, unfair or unenforceable, ⚡ obligation breached).

1. **Choose the law.** Contract Lab knows two laws. For a course on **English law (England & Wales)** — contract of employment, written statement, restrictive covenants, unfair dismissal, redundancy, settlement agreements… — start the file with the front matter `droit: uk` (three lines: `---`, `droit: uk`, `---`) and use the English type keys of the catalogue (annex 1). For a course on **French law**, write no front matter and use the French type keys (English aliases are accepted). Never mix the two laws in one scenario; for a comparison, mention the other law in the commentary.
2. **Choose what can be represented.** Keep the notions that translate into linked items: clauses and their safeguards (cumulative validity conditions), formalities (written statement, in writing), incompatibilities (gross misconduct and notice, an employer's repudiatory breach and the restrictive covenants…), obligations and breaches, terminations and their procedures, payments and calculations (English law: qualifying period, statutory notice, notice pay, statutory redundancy pay, basic and compensatory awards, minimum wage; French law: probation, CDD, notice, statutory severance, mutual termination, end-of-CDD payment). What the tool cannot judge (the tribunal's assessment of the facts, the band of reasonable responses in a given case, contractual enhancements, real dates and time limits…) goes in the commentary, in a bubble (`note`) or in a forced verdict (`status`), never as a fake safeguard that would turn a card green. If most of the material cannot be represented, tell the teacher rather than forcing it.
3. **Build the progression.** 5 to 9 steps, one idea per step, from simple to complex: first show a clause alone (⛔, missing safeguards), then add its safeguards one by one; for a termination, the termination, then its procedure, then the rights it opens. Reuse the examples, names and figures of the material. Add one or two **question steps** just before the step that would explain the notion, with plausible wrong choices and an explanation for each choice. Each question starts with `verification off` (otherwise the verdicts on screen give the answer away) and its "### Answer" section restores `verification on`.
4. **Write the scenario** following exactly the format described below. Declare each item before linking it; link each safeguard to the clause it conditions; put the figures on the employee (English law: `service`, `weekly_pay`, `age`; French law: `categorie`, `anciennete`, `salaire`). Give the calculations in the text ("12 weeks × £751 = £9,012"): the tool will show the same figures.
5. **Check that the verdicts you announce match the rules** of annex 2: a condition is met if an item of the expected type is linked directly, in the same "then" chain, or attached to the contract that includes the clause; incompatibilities apply to the whole case file (items linked step by step, excluding parties and sources); an obligation linked to a breach is breached; under English law, below the qualifying period the fairness defects of a dismissal are downgraded to ⚠️; a verdict forced by `status` stays visible even with `verification off`. If the tool would show something other than your text, fix the text or the data.
6. **Stay legally accurate.** Only cite a statute section or a case if it appears in the material or you are certain of it; otherwise, describe the rule without a reference. Do not give an unchecked duration, time limit or amount. English law: the annual figures (week's pay cap, compensatory award cap, minimum wage) change every April — say which year's figures you use — and flag the Employment Rights Act 2025 reforms when they matter. Flag simplifications in a "> ⚠️" quote.

## Your answer

- **A single code block** containing the full scenario (front matter first for English law, then "# Title"). As the scenario itself contains ```scene blocks, wrap it in a four-backtick block (````markdown … ````), or write the command blocks with ~~~scene.
- Then, outside the block, a few lines for the teacher: the outline of the steps, and what to proofread (references you added, simplifications, forced verdicts, notions left aside).
- Remind them how to use it: Contract Lab workshop → 🎬 Cinema → 📚 Scenarios → paste the markdown → Play. The 🔗 Share button then gives a link for the students.

---

# Annex 1 — Scenario format ("cinema" mode)

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


---

# Annex 2 — Checking rules

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


---

# Annex 3 — Complete example

A real scenario of the workshop (restrictive covenants, English law), with a question step preceded by `verification off`:

````markdown
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
````
