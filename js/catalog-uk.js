/* ============================================================
 * Contract Lab — catalogue du droit d'Angleterre et du pays de Galles
 * (English law, England & Wales). Same families and relations as the
 * French catalogue (js/model.js); English snake_case kind keys.
 *
 * Position stated: law in force on 20 November 2026.
 * Annual figures (revised every April) are parameters with defaults:
 *   week_cap = 751 (cap on a week's pay, from 6 April 2026)
 *   comp_cap = 123543 (compensatory award cap, from 6 April 2026)
 *   nmw      = National Living Wage 12.71 (21+), 10.85 (18–20), 8.00 (under 18 / apprentice)
 *   qualifying_years = 2 (unfair dismissal qualifying period)
 * ⚠️ Employment Rights Act 2025: qualifying period down to 6 months and
 * removal of the compensatory award cap announced for dismissals with an
 * effective date of termination on or after 1 January 2027.
 * ============================================================ */
(function () {
  'use strict';
  const P = window.P = window.P || {};
  const G = 'grave', R = 'risque';

  /* ------------------------------------------------------------ defaults (update every April) */
  const DEF = { week_cap: 751, comp_cap: 123543, qualifying_years: 2, nmw21: 12.71, nmw18: 10.85, nmw16: 8.00, tax_free: 30000 };

  const DISMISSALS = ['conduct_dismissal', 'capability_dismissal', 'redundancy', 'summary_dismissal', 'constructive_dismissal', 'fixed_term_expiry', 'probation_dismissal', 'wrongful_dismissal', 'rupture'];
  const REFORM = ' ⚠️ Employment Rights Act 2025: reduced to 6 months for dismissals with an effective date of termination on or after 1 January 2027 (check the commencement regulations).';

  const CAT_UK = {
    /* ---- parties */
    employer: { fam: 'partie', icon: '🏢', label: 'Employer', desc: 'Company, partnership or individual who employs. It directs and controls the work and owes the implied duties of care, pay and mutual trust and confidence.' },
    employee: { fam: 'partie', icon: '👤', label: 'Employee', params: ['service', 'weekly_pay', 'age'], desc: "Works under a contract of employment (ERA 1996 s.230(1)): personal service, mutuality of obligation and control (Ready Mixed Concrete v Minister of Pensions [1968]). Only employees have unfair dismissal, statutory redundancy pay and statutory notice rights. Parameters: service (complete years of continuous employment, decimals allowed), weekly_pay (gross £ per week), age (at dismissal)." },
    worker: { fam: 'partie', icon: '🧑‍🔧', label: 'Worker', params: ['hourly_rate', 'age'], desc: "Limb (b) worker (ERA 1996 s.230(3)): undertakes to perform work personally, but the other party is not a client or customer (Uber BV v Aslam [2021] UKSC 5). Gets the minimum wage, paid holiday, working time limits, protection from discrimination and whistleblowing protection — but no unfair dismissal or redundancy pay rights." },
    acas: { fam: 'partie', icon: '🕊️', label: 'ACAS', desc: 'Advisory, Conciliation and Arbitration Service. Early conciliation through ACAS is compulsory before most tribunal claims; it publishes the Code of Practice on Disciplinary and Grievance Procedures and can record settlements (COT3).' },
    tribunal: { fam: 'partie', icon: '⚖️', label: 'Employment tribunal', desc: 'Hears statutory employment claims (unfair dismissal, redundancy pay, discrimination, deductions…) and contract claims on termination up to £25,000. Time limit for most claims: 3 months less one day, extended by early conciliation. ⚠️ The Employment Rights Act 2025 extends it to 6 months — check whether this is in force for the dates concerned.' },
    trade_union: { fam: 'partie', icon: '🗣️', label: 'Trade union / representatives', desc: 'Recognised trade union or elected employee representatives: consulted collectively when 20 or more redundancies are proposed at one establishment within 90 days (TULRCA 1992 s.188). Members have the right to be accompanied by a union official.' },
    hmrc: { fam: 'partie', icon: '🏦', label: 'HMRC', desc: "HM Revenue & Customs: enforces the National Minimum Wage and taxes termination payments (the first £30,000 of a genuine compensation payment can be tax-free; notice pay is taxable)." },
    new_employer: { fam: 'partie', icon: '🏭', label: 'New employer', desc: 'Competitor the employee joins after leaving: this is where restrictive covenants bite (injunction, damages).' },

    /* ---- contracts */
    permanent: { fam: 'contrat', icon: '📄', label: 'Permanent contract', desc: "Open-ended contract of employment. No particular form is required for the contract itself, but the employer must give a written statement of particulars on or before the first day of employment (ERA 1996 s.1, employees and workers, since April 2020).",
      req: [{ any: ['written_particulars'], effet: 'no written statement: award of 2 or 4 weeks\' pay if added to a successful claim (EA 2002 s.38)', level: R, why: 'Written statement of particulars from day one (ERA 1996 s.1).' }],
      ouvre: ['resignation', 'conduct_dismissal', 'redundancy', 'settlement_agreement'] },
    fixed_term: { fam: 'contrat', icon: '⏳', label: 'Fixed-term contract', params: ['successive_years'], desc: "Ends on a set date or event. Fixed-term employees must not be treated less favourably than comparable permanent employees (Fixed-term Employees Regulations 2002). After 4 years' continuous employment on successive fixed-term contracts the employee becomes permanent unless renewal on a fixed term is objectively justified (reg 8). Parameter: successive_years.",
      req: [{ any: ['written_particulars'], effet: "no written statement: award of 2 or 4 weeks' pay if added to a successful claim", level: R, why: 'Written statement, including the expected end date (ERA 1996 s.1).' }],
      ouvre: ['fixed_term_expiry'] },
    zero_hours: { fam: 'contrat', icon: '📲', label: 'Zero-hours contract', desc: "No guaranteed hours: work is offered as needed. An exclusivity clause preventing work for others is unenforceable (ERA 1996 s.27A). The individual is at least a worker; employee status depends on the facts. ⚠️ The Employment Rights Act 2025 adds rights to guaranteed-hours offers, reasonable notice of shifts and pay for cancelled shifts (staged commencement, expected 2027).",
      req: [{ any: ['written_particulars'], effet: 'no written statement from day one', level: R, why: 'Written statement of particulars from day one, for workers too.' }] },
    apprenticeship: { fam: 'contrat', icon: '🎓', label: 'Apprenticeship agreement', desc: 'Combines work and an approved apprenticeship standard with off-the-job training. Must be in the prescribed written form. Apprentice rate of the minimum wage for apprentices under 19 or in the first year.',
      req: [{ any: ['in_writing', 'written_particulars'], effet: 'not a statutory apprenticeship agreement', level: G, why: 'Apprenticeship agreement in the prescribed written form.' }] },

    /* ---- clauses : key terms */
    pay: { fam: 'clause', grp: 'Key terms', icon: '💷', label: 'Pay', params: ['hourly_rate'], desc: "Rate and intervals of pay: a core term the employer cannot vary without agreement (a unilateral pay cut is a fundamental breach). It must be at least the National Minimum / Living Wage — from 1 April 2026: £12.71 (21+), £10.85 (18–20), £8.00 (under 18 and apprentices). Rates are revised every April (parameter nmw)." },
    hours: { fam: 'clause', grp: 'Key terms', icon: '⏱️', label: 'Working hours', desc: 'Normal hours and days of work, whether they may vary. Subject to the Working Time Regulations 1998: average 48-hour limit (unless opted out), rest breaks, daily and weekly rest.' },
    place: { fam: 'clause', grp: 'Key terms', icon: '📍', label: 'Place of work', desc: 'Place of work, or that the employee is required or permitted to work at various places (written statement). Moving the workplace needs an express mobility clause or agreement.' },
    job_title: { fam: 'clause', grp: 'Key terms', icon: '🧑‍💼', label: 'Job title / duties', desc: 'Job title or a brief description of the work. A substantial change of duties without agreement can be a breach of contract.' },
    holiday: { fam: 'clause', grp: 'Key terms', icon: '🏖️', label: 'Holiday entitlement', desc: 'At least 5.6 weeks of paid annual leave (WTR 1998 regs 13 and 13A), capped at 28 days for a five-day week; bank holidays may be included.' },
    probation: { fam: 'clause', grp: 'Key terms', icon: '🧪', label: 'Probationary period', params: ['duration'], desc: "Trial period to assess the new recruit, often 3 to 6 months, usually with a shorter contractual notice. There is no statutory maximum; its duration and conditions belong in the written statement. Probation does not remove statutory rights: statutory notice applies after one month. ⚠️ Reforms of the unfair dismissal qualifying period (6 months from 1 January 2027) will change its practical role.",
      req: [{ any: ['written_particulars', 'in_writing'], effet: 'conditions of probation not stated in writing', level: R, why: 'Duration and conditions in the written statement.' }] },
    notice_clause: { fam: 'clause', grp: 'Key terms', icon: '🔔', label: 'Contractual notice', params: ['notice_weeks'], desc: "Notice each party must give. It cannot be shorter than the statutory minimum (ERA 1996 s.86): from the employer, 1 week after one month of service, then 1 week per complete year from 2 years, up to 12 weeks; from the employee, 1 week. If shorter, the statutory minimum applies. Parameter: notice_weeks." },
    pilon: { fam: 'clause', grp: 'Key terms', icon: '💸', label: 'PILON clause', desc: 'Payment in lieu of notice: lets the employer end employment immediately by paying the notice period. Without it, dismissing without notice (outside gross misconduct) is a breach of contract — damages equal to notice pay — which can release the employee from restrictive covenants.' },
    garden_leave: { fam: 'clause', grp: 'Covenants and confidentiality', icon: '🌿', label: 'Garden leave', desc: 'During notice, the employee stays employed and paid but is kept away from work, clients and colleagues. Needs an express clause; courts generally set off garden leave against post-termination restrictions.',
      req: [{ any: ['express_term'], effet: 'risk: no clear right to impose garden leave', level: R, why: 'Express contractual right to place the employee on garden leave.' }] },
    confidentiality: { fam: 'clause', grp: 'Covenants and confidentiality', icon: '🤐', label: 'Confidentiality', desc: 'Protects trade secrets and confidential information during and after employment (Faccenda Chicken v Fowler [1987]). It does not stop the employee working for a competitor, and no payment is needed.' },
    non_compete: { fam: 'clause', grp: 'Covenants and confidentiality', icon: '🚫', label: 'Non-compete', params: ['duration'], desc: "Stops the employee working for a competitor after leaving. A restraint of trade, void unless it protects a legitimate business interest and goes no further than reasonably necessary (duration, area, activities), judged at the date of the contract. No payment is required — unlike French law. Courts may sever offending words (Tillman v Egon Zehnder [2019] UKSC 32) but will not rewrite. ⚠️ Government proposals to cap non-competes (e.g. 3 months) are not in force.",
      req: [
        { any: ['legitimate_interest'], effet: 'unenforceable restraint of trade', level: G, why: 'Protects a legitimate business interest: trade secrets, client connections, workforce stability.' },
        { any: ['reasonable_duration'], effet: 'unenforceable restraint of trade', level: G, why: 'Duration no longer than reasonably necessary (often 3 to 12 months).' },
        { any: ['reasonable_area'], effet: 'unenforceable restraint of trade', level: G, why: 'Area matching where the employee actually worked.' },
        { any: ['reasonable_scope'], effet: 'unenforceable restraint of trade', level: G, why: 'Activities limited to what the employee actually did.' }
      ],
      excl: [{ any: ['wrongful_dismissal', 'constructive_dismissal'], effet: "released: the employer's repudiatory breach frees the employee (General Billposting v Atkinson [1909])", level: G }] },
    non_solicitation: { fam: 'clause', grp: 'Covenants and confidentiality', icon: '🙅', label: 'Non-solicitation', params: ['duration'], desc: 'Stops the former employee approaching clients to take their business. Same reasonableness test as any restraint of trade; usually easier to enforce than a non-compete if limited to clients the employee dealt with recently. No payment required.',
      req: [
        { any: ['legitimate_interest'], effet: 'unenforceable restraint of trade', level: G, why: 'Client connections to protect.' },
        { any: ['reasonable_duration'], effet: 'unenforceable restraint of trade', level: G, why: 'Reasonable duration.' },
        { any: ['reasonable_scope'], effet: 'unenforceable restraint of trade', level: G, why: 'Clients the employee dealt with (e.g. in the last 12 months).' }
      ],
      excl: [{ any: ['wrongful_dismissal', 'constructive_dismissal'], effet: "released: the employer's repudiatory breach frees the employee", level: G }] },
    non_dealing: { fam: 'clause', grp: 'Covenants and confidentiality', icon: '🤚', label: 'Non-dealing', params: ['duration'], desc: 'Stops the former employee doing business with certain clients at all, even if the client makes the approach. Wider than non-solicitation, so it needs closer justification. No payment required.',
      req: [
        { any: ['legitimate_interest'], effet: 'unenforceable restraint of trade', level: G, why: 'Client connections to protect.' },
        { any: ['reasonable_duration'], effet: 'unenforceable restraint of trade', level: G, why: 'Reasonable duration.' },
        { any: ['reasonable_scope'], effet: 'unenforceable restraint of trade', level: G, why: 'Clients the employee dealt with personally.' }
      ],
      excl: [{ any: ['wrongful_dismissal', 'constructive_dismissal'], effet: "released: the employer's repudiatory breach frees the employee", level: G }] },
    non_poaching: { fam: 'clause', grp: 'Covenants and confidentiality', icon: '🧲', label: 'Non-poaching', params: ['duration'], desc: 'Stops the former employee recruiting colleagues. Legitimate interest: a stable, trained workforce. It should be limited to senior or key staff the employee worked with.',
      req: [
        { any: ['legitimate_interest'], effet: 'unenforceable restraint of trade', level: G, why: 'Stability of the workforce.' },
        { any: ['reasonable_duration'], effet: 'unenforceable restraint of trade', level: G, why: 'Reasonable duration.' },
        { any: ['reasonable_scope'], effet: 'unenforceable restraint of trade', level: G, why: 'Key staff the employee worked with, not every employee.' }
      ],
      excl: [{ any: ['wrongful_dismissal', 'constructive_dismissal'], effet: "released: the employer's repudiatory breach frees the employee", level: G }] },
    opt_out_48h: { fam: 'clause', grp: 'Working time and pay', icon: '🕐', label: '48-hour opt-out', desc: 'Agreement by the worker that the 48-hour average weekly limit does not apply (WTR 1998 regs 4 and 5). It must be in writing and voluntary; the worker may cancel it on 7 days\' notice (or a longer period agreed, up to 3 months) and must suffer no detriment for refusing.',
      req: [
        { any: ['in_writing'], effet: 'ineffective: the 48-hour average limit applies', level: G, why: 'Individual agreement in writing.' },
        { any: ['right_to_withdraw'], effet: 'a term removing the right to cancel is ineffective', level: R, why: "Worker can cancel on 7 days' notice (or up to 3 months if agreed)." }
      ] },
    deductions_clause: { fam: 'clause', grp: 'Working time and pay', icon: '➖', label: 'Deductions from wages', desc: 'A deduction is lawful only if required by statute (tax, NI), authorised by a written contractual term notified beforehand, or agreed in writing before the deduction (ERA 1996 s.13). Otherwise it is an unlawful deduction, recoverable in the tribunal.',
      req: [{ any: ['in_writing'], effet: 'unlawful deduction from wages: refund (ERA 1996 s.13)', level: G, why: 'Written term notified in advance, or prior written consent.' }] },
    zero_hours_exclusivity: { fam: 'clause', grp: 'Unenforceable terms', icon: '⛓️', label: 'Zero-hours exclusivity', desc: 'Clause forbidding a zero-hours worker from working for anyone else.',
      illicite: 'unenforceable (ERA 1996 s.27A)' },
    discriminatory_term: { fam: 'clause', grp: 'Unenforceable terms', icon: '🚷', label: 'Discriminatory term', desc: 'Term that provides for treatment prohibited by the Equality Act 2010 (age, disability, gender reassignment, marriage or civil partnership, pregnancy and maternity, race, religion or belief, sex, sexual orientation).',
      illicite: 'unenforceable against the person disadvantaged (Equality Act 2010 s.142)' },
    contracting_out: { fam: 'clause', grp: 'Unenforceable terms', icon: '🙈', label: 'Waiver of statutory rights', desc: "Term by which the employee gives up statutory rights (unfair dismissal, redundancy pay…) or agrees not to bring a claim.",
      illicite: 'void (ERA 1996 s.203), unless in a valid settlement agreement or an ACAS COT3' },

    /* ---- safeguards and conditions */
    legitimate_interest: { fam: 'limite', grp: 'Restrictive covenants', icon: '🏰', label: 'Legitimate business interest', desc: 'The restriction protects something the employer is entitled to protect — trade secrets and confidential information, client connections, a stable workforce — not mere protection from competition.' },
    reasonable_duration: { fam: 'limite', grp: 'Restrictive covenants', icon: '⌛', label: 'Reasonable duration', desc: 'The restriction lasts no longer than needed, e.g. until client relationships pass to a successor or confidential information goes stale.' },
    reasonable_area: { fam: 'limite', grp: 'Restrictive covenants', icon: '🗺️', label: 'Reasonable area', desc: 'The geographical area matches where the employee actually worked or had influence.' },
    reasonable_scope: { fam: 'limite', grp: 'Restrictive covenants', icon: '🎯', label: 'Reasonable scope', desc: 'The activities, clients or staff covered are limited to those the employee actually dealt with (often in the last 12 months).' },
    written_particulars: { fam: 'limite', grp: 'Formalities', icon: '📝', label: 'Written statement of particulars', desc: 'Statement given on or before day one (ERA 1996 s.1): names, start date, pay, hours, holiday, job title, place of work, notice, probation, training, sick pay, other benefits… A few particulars (e.g. pensions) may follow within two months.' },
    in_writing: { fam: 'limite', grp: 'Formalities', icon: '✍️', label: 'In writing', desc: 'Written agreement or term: 48-hour opt-out, deductions from wages, settlement agreement, apprenticeship agreement.' },
    express_term: { fam: 'limite', grp: 'Formalities', icon: '🖋️', label: 'Express term', desc: 'The right is spelt out in the contract (garden leave, PILON, mobility…) rather than left to implication.' },
    right_to_withdraw: { fam: 'limite', grp: 'Formalities', icon: '↩️', label: 'Right to cancel', desc: "The worker can cancel the opt-out on 7 days' notice, or a longer period agreed in writing of up to 3 months." },
    particular_complaint: { fam: 'limite', grp: 'Settlement agreements', icon: '📎', label: 'Relates to particular complaints', desc: 'The agreement identifies the particular complaints or proceedings it settles; a blanket waiver of "all claims" without identifying them is not enough.' },
    independent_advice: { fam: 'limite', grp: 'Settlement agreements', icon: '🧑‍⚖️', label: 'Independent advice', desc: 'The employee has received advice from a relevant independent adviser (qualified lawyer, certified trade union official or advice-centre worker) on the terms and effect of the agreement, in particular on the ability to bring a tribunal claim.' },
    adviser_identified: { fam: 'limite', grp: 'Settlement agreements', icon: '🪪', label: 'Adviser named and insured', desc: 'The agreement identifies the adviser, who is covered by insurance or professional indemnity, and states that the statutory conditions regulating settlement agreements are satisfied (ERA 1996 s.203(3)).' },
    potentially_fair_reason: { fam: 'limite', grp: 'Dismissal conditions', icon: '🎫', label: 'Potentially fair reason', desc: 'ERA 1996 s.98(1)–(2): capability or qualifications, conduct, redundancy, breach of a statutory restriction, or some other substantial reason (SOSR). The employer must show the reason.' },
    genuine_belief: { fam: 'limite', grp: 'Dismissal conditions', icon: '🧠', label: 'Genuine belief on reasonable grounds', desc: 'British Home Stores v Burchell [1980]: the employer genuinely believed the employee was guilty, had reasonable grounds for that belief, and had carried out as much investigation as was reasonable.' },
    reasonable_response: { fam: 'limite', grp: 'Dismissal conditions', icon: '📐', label: 'Band of reasonable responses', desc: 'ERA 1996 s.98(4): dismissal fell within the range of responses of a reasonable employer (Iceland Frozen Foods v Jones [1983]). The tribunal must not substitute its own view.' },
    genuine_redundancy: { fam: 'limite', grp: 'Dismissal conditions', icon: '📉', label: 'Genuine redundancy', desc: 'ERA 1996 s.139: the business (or workplace) closes, or the requirement for employees to do work of a particular kind has ceased or diminished.' },
    fair_selection: { fam: 'limite', grp: 'Dismissal conditions', icon: '🧮', label: 'Fair selection', desc: 'An appropriate pool and objective criteria (skills, performance, disciplinary record, attendance) applied consistently; no criteria linked to a protected characteristic, pregnancy or maternity leave.' },
    automatic_unfair_reason: { fam: 'limite', grp: 'Dismissal conditions', icon: '🚨', label: 'Automatically unfair reason', desc: 'Reason such as whistleblowing, pregnancy or maternity, health and safety activities, trade union membership or asserting a statutory right: the dismissal is unfair whatever the procedure, and generally no qualifying period applies.' },
    repudiatory_breach: { fam: 'limite', grp: 'Dismissal conditions', icon: '💥', label: "Employer's repudiatory breach", desc: 'A breach going to the root of the contract (Western Excavating v Sharp [1978]): unilateral pay cut, demotion, breach of mutual trust and confidence (harassment, humiliation), last straw of a series of acts.' },
    prompt_resignation: { fam: 'limite', grp: 'Dismissal conditions', icon: '⏩', label: 'Resigned without undue delay', desc: 'The employee resigns in response to the breach and does not delay so long that he or she is taken to have affirmed the contract. Working under protest for a short time is allowed.' },
    clear_resignation: { fam: 'limite', grp: 'Dismissal conditions', icon: '🗯️', label: 'Clear words of resignation', desc: 'Unambiguous words or conduct. Words spoken in the heat of the moment may need to be checked by the employer before being treated as a resignation.' },

    /* ---- obligations (implied terms and statutory duties) */
    pay_wages: { fam: 'obligation', grp: 'Of the employer', icon: '💳', label: 'Pay at least the minimum wage', desc: 'Pay the agreed wages, never below the National Minimum / Living Wage (National Minimum Wage Act 1998), with an itemised payslip.' },
    duty_of_care: { fam: 'obligation', grp: 'Of the employer', icon: '🦺', label: 'Duty of care (health and safety)', desc: 'Take reasonable care of employees: safe place, plant and system of work, competent colleagues (common law), and ensure health, safety and welfare so far as reasonably practicable (Health and Safety at Work etc. Act 1974 s.2).' },
    non_discrimination: { fam: 'obligation', grp: 'Of the employer', icon: '🟰', label: 'No unlawful discrimination', desc: 'Equality Act 2010: no direct or indirect discrimination, harassment or victimisation because of a protected characteristic; equal pay for equal work. No qualifying period; compensation is uncapped.' },
    mutual_trust: { fam: 'obligation', grp: 'Of both parties', icon: '🤲', label: 'Mutual trust and confidence', desc: 'Implied term: neither party shall, without reasonable and proper cause, act in a way calculated or likely to destroy or seriously damage the relationship of trust and confidence (Malik v BCCI [1997]). Its breach is always repudiatory.' },
    fidelity: { fam: 'obligation', grp: 'Of the employee', icon: '⚓', label: 'Fidelity (good faith)', desc: "Serve the employer faithfully: no competing during employment, no misuse of confidential information, no secret profits." },
    obey_instructions: { fam: 'obligation', grp: 'Of the employee', icon: '📋', label: 'Obey lawful and reasonable instructions', desc: 'Follow instructions within the scope of the contract, unless they are unlawful or unreasonable (e.g. dangerous).' },
    care_skill: { fam: 'obligation', grp: 'Of the employee', icon: '🛠️', label: 'Reasonable care and skill', desc: 'Do the work with reasonable care and competence; serious negligence can amount to gross misconduct.' },
    employee_safety: { fam: 'obligation', grp: 'Of the employee', icon: '⛑️', label: 'Take care for health and safety', desc: 'Take reasonable care of own health and safety and that of others, and co-operate with the employer (HSWA 1974 s.7).' },

    /* ---- misconduct and other grounds */
    breach: { fam: 'manquement', icon: '⚡', label: 'Breach', desc: 'Failure to perform an obligation. Link it to the obligation it breaches.' },
    misconduct: { fam: 'manquement', icon: '🟠', label: 'Misconduct', desc: 'Conduct falling short of what is expected (lateness, minor rule breaches). Usually calls for warnings first; dismissal for a first offence is rarely within the band of reasonable responses. Notice is due.' },
    gross_misconduct: { fam: 'manquement', icon: '🔥', label: 'Gross misconduct', desc: 'Conduct so serious it destroys trust (theft, fraud, violence, serious negligence, serious harassment): a repudiatory breach by the employee, which justifies dismissal without notice. A fair procedure is still needed for the dismissal to be fair.' },
    capability: { fam: 'manquement', icon: '📊', label: 'Capability', desc: 'Poor performance or ill-health, without fault. A fair process: clear standards, support, warnings and a reasonable chance to improve; for ill-health, medical evidence and consultation (and reasonable adjustments if disabled).' },
    harassment: { fam: 'manquement', icon: '🛑', label: 'Harassment / bullying', desc: 'Unwanted conduct violating dignity or creating a hostile environment (Equality Act 2010 s.26 if related to a protected characteristic). A breach of mutual trust and confidence that can ground a constructive dismissal.' },

    /* ---- terminations */
    resignation: { fam: 'rupture', icon: '🚪', label: 'Resignation', desc: "The employee ends the contract. Contractual notice applies; the statutory minimum from the employee is 1 week after one month of service (ERA 1996 s.86(2)). No redundancy pay or unfair dismissal claim, unless the resignation is in fact a constructive dismissal.",
      req: [{ any: ['clear_resignation'], effet: 'ambiguous: may not be a resignation (possibly a dismissal)', level: R, why: 'Clear and unambiguous words of resignation.' }],
      ouvre: ['notice', 'holiday_pay'] },
    conduct_dismissal: { fam: 'rupture', icon: '📤', label: 'Dismissal for misconduct', okText: 'fair (ERA 1996 s.98)', desc: "Conduct is a potentially fair reason (ERA 1996 s.98(2)(b)). Fairness also requires the Burchell test and a fair procedure following the ACAS Code: investigation, written notification, meeting, right to be accompanied, decision, appeal. An unreasonable failure to follow the Code can increase compensation by up to 25%; Polkey v AE Dayton [1987]: a procedural flaw makes the dismissal unfair, but compensation may be reduced by the chance that a fair procedure would have led to dismissal anyway. Qualifying period: 2 years." + REFORM,
      req: [
        { any: ['misconduct', 'gross_misconduct', 'potentially_fair_reason'], effet: 'unfair: no potentially fair reason (s.98)', level: G, why: 'A reason relating to conduct.' },
        { any: ['genuine_belief'], effet: 'unfair: Burchell test not met', level: G, why: 'Genuine belief, on reasonable grounds (Burchell).' },
        { any: ['investigation'], effet: 'unfair: no reasonable investigation (+ up to 25% uplift)', level: G, why: 'Investigation without unreasonable delay (ACAS Code).' },
        { any: ['disciplinary_letter'], effet: 'unfair: allegations not put in writing (+ up to 25% uplift)', level: G, why: 'Written notification of the allegations and evidence.' },
        { any: ['disciplinary_meeting'], effet: 'unfair: no hearing (+ up to 25% uplift)', level: G, why: 'Meeting to hear the employee before deciding.' },
        { any: ['appeal'], effet: 'procedural flaw: likely unfair, up to 25% uplift', level: R, why: 'Opportunity to appeal (ACAS Code).' },
        { any: ['reasonable_response'], effet: 'unfair: outside the band of reasonable responses', level: G, why: 'Dismissal a reasonable sanction (s.98(4)).' }
      ],
      ouvre: ['notice', 'notice_pay', 'holiday_pay', 'unfair_dismissal_right', 'basic_award', 'compensatory_award'] },
    capability_dismissal: { fam: 'rupture', icon: '📦', label: 'Dismissal for capability', okText: 'fair (ERA 1996 s.98)', desc: 'Capability (performance or health) is a potentially fair reason (s.98(2)(a)). The employer must set standards, warn, support and give a reasonable chance to improve; for ill-health, obtain medical evidence and consult. Qualifying period: 2 years.' + REFORM,
      req: [
        { any: ['capability', 'potentially_fair_reason'], effet: 'unfair: no potentially fair reason (s.98)', level: G, why: 'A reason relating to capability.' },
        { any: ['warning'], effet: 'unfair: no warning or chance to improve', level: G, why: 'Warning and a reasonable opportunity to improve.' },
        { any: ['disciplinary_meeting'], effet: 'unfair: no meeting', level: G, why: 'Formal meeting with the right to be accompanied.' },
        { any: ['appeal'], effet: 'procedural flaw: likely unfair, up to 25% uplift', level: R, why: 'Opportunity to appeal.' },
        { any: ['reasonable_response'], effet: 'unfair: outside the band of reasonable responses', level: G, why: 'Dismissal a reasonable response (s.98(4)).' }
      ],
      ouvre: ['notice', 'notice_pay', 'holiday_pay', 'basic_award', 'compensatory_award'] },
    redundancy: { fam: 'rupture', icon: '🏚️', label: 'Redundancy', okText: 'fair redundancy', desc: "Redundancy is a potentially fair reason (s.98(2)(c)). A fair redundancy needs a genuine redundancy situation, a fair pool and selection, meaningful consultation and a search for suitable alternative employment. Collective consultation if 20 or more redundancies at one establishment within 90 days (TULRCA s.188): at least 30 days (20–99) or 45 days (100+) before the first dismissal. Statutory redundancy pay after 2 years' service." + REFORM,
      req: [
        { any: ['genuine_redundancy'], effet: 'unfair: not a genuine redundancy (s.139)', level: G, why: 'Closure, or reduced need for work of a particular kind.' },
        { any: ['fair_selection'], effet: 'unfair selection', level: G, why: 'Fair pool, objective criteria applied consistently.' },
        { any: ['consultation', 'collective_consultation'], effet: 'unfair: no meaningful consultation', level: G, why: 'Individual (and collective if 20+) consultation.' },
        { any: ['alternative_employment'], effet: 'unfair: no search for alternative work', level: G, why: 'Consider suitable alternative employment.' }
      ],
      ouvre: ['notice', 'statutory_redundancy_pay', 'notice_pay', 'holiday_pay'] },
    summary_dismissal: { fam: 'rupture', icon: '⚔️', label: 'Summary dismissal', okText: 'lawful without notice (gross misconduct)', desc: "Dismissal with immediate effect, without notice or pay in lieu. Lawful under the contract only if the employee committed a repudiatory breach (gross misconduct); otherwise it is a wrongful dismissal and notice pay is due as damages. Whether it is also fair is a separate question (reason and procedure).",
      req: [{ any: ['gross_misconduct'], effet: 'wrongful dismissal: notice pay due as damages', level: G, why: 'Gross misconduct (repudiatory breach by the employee).' }],
      ouvre: ['holiday_pay', 'notice_pay'] },
    wrongful_dismissal: { fam: 'rupture', icon: '🧨', label: 'Wrongful dismissal', desc: "Dismissal in breach of contract, usually without the notice due. A common-law claim: damages equal to the notice pay (and benefits) the employee would have received. No qualifying period. The employer's breach releases the employee from restrictive covenants.",
      ouvre: ['notice_pay'] },
    constructive_dismissal: { fam: 'rupture', icon: '🚩', label: 'Constructive dismissal', okText: 'a dismissal (ERA 1996 s.95(1)(c)): may be unfair', desc: "The employee resigns in response to the employer's repudiatory breach (Western Excavating v Sharp [1978]) without undue delay. It counts as a dismissal; it is then usually unfair. Ordinary unfair dismissal needs the qualifying period (2 years)." + REFORM,
      req: [
        { any: ['repudiatory_breach', 'harassment'], effet: 'no dismissal: treated as a resignation', level: G, why: "Repudiatory breach by the employer (contract test)." },
        { any: ['prompt_resignation'], effet: 'contract affirmed: claim lost', level: G, why: 'Resignation in response to the breach, without undue delay.' }
      ],
      ouvre: ['unfair_dismissal_right', 'basic_award', 'compensatory_award', 'notice_pay'] },
    settlement_agreement: { fam: 'rupture', icon: '🤝', label: 'Settlement agreement', okText: 'valid: the statutory claims are settled (s.203(3))', desc: "Agreement by which the employee waives statutory claims in exchange for a payment. Valid only if the conditions of ERA 1996 s.203(3) are met; otherwise statutory claims survive. Pre-termination negotiations are generally inadmissible in an ordinary unfair dismissal claim (s.111A). Alternative: settlement through ACAS (COT3).",
      req: [
        { any: ['in_writing'], effet: 'void: statutory claims not waived (s.203)', level: G, why: 'In writing.' },
        { any: ['particular_complaint'], effet: 'void: statutory claims not waived (s.203)', level: G, why: 'Relates to particular complaints or proceedings.' },
        { any: ['independent_advice'], effet: 'void: statutory claims not waived (s.203)', level: G, why: 'Advice from a relevant independent adviser on its terms and effect.' },
        { any: ['adviser_identified'], effet: 'void: statutory claims not waived (s.203)', level: G, why: 'Adviser named, insured; agreement states the conditions are met.' }
      ],
      ouvre: ['settlement_payment', 'holiday_pay'] },
    fixed_term_expiry: { fam: 'rupture', icon: '⏹️', label: 'Expiry of a fixed term', desc: 'Non-renewal of a limited-term contract is a dismissal in law (ERA 1996 s.95(1)(b)): it needs a fair reason (often redundancy or SOSR) and, after 2 years\' service, can give rise to unfair dismissal or redundancy pay claims.',
      ouvre: ['statutory_redundancy_pay', 'holiday_pay'] },
    probation_dismissal: { fam: 'rupture', icon: '🚦', label: 'Termination in probation', desc: 'Ending employment during or at the end of probation is an ordinary dismissal: contractual notice (at least the statutory week after one month), and no ordinary unfair dismissal claim before the qualifying period — but discrimination and automatically unfair dismissal claims remain.' + REFORM,
      req: [{ any: ['probation'], effet: 'no probation term: the ordinary notice clause applies', level: R, why: 'Probationary period stated in the contract.' }],
      ouvre: ['notice', 'holiday_pay'] },

    /* ---- procedure */
    investigation: { fam: 'etape', icon: '🔎', label: 'Investigation', desc: 'Establish the facts without unreasonable delay; in misconduct cases, ideally by a different person from the one who holds the hearing.' },
    suspension: { fam: 'etape', icon: '⏸️', label: 'Precautionary suspension', desc: 'Suspension on full pay while an investigation takes place, as briefly as possible; not a disciplinary sanction.' },
    disciplinary_letter: { fam: 'etape', icon: '✉️', label: 'Written notification', desc: 'Letter setting out the allegations and possible consequences, with copies of the evidence, and inviting the employee to a meeting at a reasonable time and place.' },
    disciplinary_meeting: { fam: 'etape', icon: '💬', label: 'Disciplinary meeting', desc: 'Hearing at which the employee can answer the allegations, call witnesses and be accompanied.',
      req: [{ any: ['companion'], effet: "denial of the right to be accompanied: up to 2 weeks' pay (ERA 1999 s.11)", level: R, why: 'Right to be accompanied by a colleague or union representative (ERA 1999 s.10).' }] },
    companion: { fam: 'etape', icon: '🧑‍🤝‍🧑', label: 'Right to be accompanied', desc: 'At a disciplinary or grievance hearing, the worker may be accompanied by a colleague, a trade union official or a certified union representative (Employment Relations Act 1999 s.10).' },
    warning: { fam: 'etape', icon: '🟨', label: 'Written warning', desc: 'First or final written warning, with the improvement expected, the timescale and the consequences of failing to improve.' },
    decision: { fam: 'etape', icon: '📨', label: 'Written decision', desc: 'The decision is communicated in writing, with the reasons and the right of appeal. Employees with 2 years\' service can ask for written reasons for dismissal (s.92).' },
    appeal: { fam: 'etape', icon: '↗️', label: 'Appeal', desc: 'Appeal heard without unreasonable delay, where possible by a manager not previously involved. A fair appeal can cure earlier defects (Taylor v OCS Group [2006]).' },
    consultation: { fam: 'etape', icon: '🗨️', label: 'Individual consultation', desc: 'Meeting(s) with the employee at risk: reasons, selection, scores, alternatives, while proposals are still at a formative stage.' },
    collective_consultation: { fam: 'etape', icon: '📢', label: 'Collective consultation', desc: "20 or more proposed redundancies at one establishment within 90 days: consult union or elected representatives (30 days before the first dismissal for 20–99, 45 days for 100+) and notify the Secretary of State (HR1). Failure: protective award of up to 90 days' pay per employee. ⚠️ The Employment Rights Act 2025 raises the maximum to 180 days — check commencement." },
    alternative_employment: { fam: 'etape', icon: '🔀', label: 'Suitable alternative employment', desc: 'Offer of another suitable role. A 4-week trial period applies (s.138); an employee who unreasonably refuses a suitable offer loses statutory redundancy pay (s.141).' },
    notice: { fam: 'etape', icon: '⏲️', label: 'Notice period', params: ['notice_weeks'], desc: 'Period between notice and termination. Statutory minimum from the employer (ERA 1996 s.86): 1 week after one month of service, then 1 week per complete year from 2 years, up to 12 weeks. From the employee: 1 week. The contract can give more, never less. Not due for gross misconduct.',
      excl: [{ any: ['gross_misconduct'], effet: 'not due: gross misconduct (repudiatory breach)', level: G }] },
    protected_conversation: { fam: 'etape', icon: '🔐', label: 'Protected conversation', desc: 'Pre-termination negotiations (ERA 1996 s.111A): offers and discussions are inadmissible in an ordinary unfair dismissal claim, unless there is improper behaviour. Not protected for discrimination or automatically unfair claims. ACAS Code: give at least 10 calendar days to consider the offer.' },
    early_conciliation: { fam: 'etape', icon: '📞', label: 'ACAS early conciliation', desc: 'Compulsory notification to ACAS before most tribunal claims; the certificate allows the claim to be issued and the time limit is extended.' },
    grievance: { fam: 'etape', icon: '📣', label: 'Grievance', desc: 'Formal complaint raised by the employee in writing, heard at a meeting (right to be accompanied), with a decision and an appeal (ACAS Code).' },

    /* ---- payments and rights */
    unfair_dismissal_right: { fam: 'droit', icon: '🛡️', label: 'Unfair dismissal claim', params: ['qualifying_years'], desc: "Right not to be unfairly dismissed (ERA 1996 s.94). Ordinary unfair dismissal requires 2 years' continuous employment (s.108); no qualifying period for automatically unfair reasons. Remedies: reinstatement, re-engagement, or a basic and a compensatory award. Parameter qualifying_years (default 2)." + REFORM },
    notice_pay: { fam: 'droit', icon: '💴', label: 'Notice pay', desc: 'Pay for the notice period (worked, paid in lieu, or damages for wrongful dismissal): the longer of contractual and statutory notice × gross weekly pay (not capped). Not due for gross misconduct.',
      excl: [{ any: ['gross_misconduct'], effet: 'not due: gross misconduct justifies dismissal without notice', level: G }] },
    statutory_redundancy_pay: { fam: 'droit', icon: '💵', label: 'Statutory redundancy pay', params: ['week_cap'], desc: "ERA 1996 s.135 and s.162: after 2 years' continuous service; for each complete year (up to 20, counting back from dismissal): ½ week's pay for each year under 22, 1 week for each year aged 22 to 40, 1½ weeks for each year aged 41 or over. A week's pay is capped: £751 from 6 April 2026 (parameter week_cap), revised every April. Lost by unreasonably refusing suitable alternative employment.",
      excl: [{ any: ['resignation'], effet: 'not due: no dismissal', level: G }] },
    basic_award: { fam: 'droit', icon: '🧾', label: 'Basic award', params: ['week_cap'], desc: "Unfair dismissal basic award (ERA 1996 s.119): same formula as statutory redundancy pay (age bands, 20 years, capped week's pay, £751 from 6 April 2026). Reduced by any statutory redundancy pay already received and possibly for the employee's conduct." },
    compensatory_award: { fam: 'droit', icon: '🩹', label: 'Compensatory award', params: ['loss', 'polkey', 'uplift', 'comp_cap'], desc: "What is just and equitable for the loss caused by the dismissal (ERA 1996 s.123): lost earnings and benefits, minus mitigation; reduced for the Polkey chance (polkey %) and contributory fault; increased by up to 25% for an unreasonable failure to follow the ACAS Code (uplift %). Capped at the lower of 52 weeks' gross pay and £123,543 (from 6 April 2026, parameter comp_cap); uncapped for whistleblowing and health and safety dismissals. ⚠️ The Employment Rights Act 2025 removes the cap, announced for 1 January 2027." },
    acas_uplift: { fam: 'droit', icon: '📈', label: 'ACAS Code uplift', params: ['uplift'], desc: 'Up to 25% increase in compensation where the employer unreasonably failed to follow the ACAS Code (TULRCA 1992 s.207A); a reduction of up to 25% if the employee unreasonably failed.' },
    holiday_pay: { fam: 'droit', icon: '🏝️', label: 'Holiday pay in lieu', params: ['untaken_days', 'day_pay'], desc: 'Payment for accrued but untaken statutory holiday on termination (WTR 1998 reg 14): due whatever the reason for leaving, even gross misconduct.' },
    settlement_payment: { fam: 'droit', icon: '💰', label: 'Settlement payment', params: ['amount'], desc: "Sum paid under a settlement agreement. Notice pay is taxable; the first £30,000 of a genuine termination payment can be paid free of income tax (HMRC)." },

    /* ---- sources */
    era_1996: { fam: 'norme', icon: '📕', label: 'Employment Rights Act 1996', desc: 'Main statute on individual rights: written statement (s.1), deductions (s.13), notice (s.86), unfair dismissal (s.94–s.98), redundancy pay (s.135), contracting out (s.203).' },
    equality_act: { fam: 'norme', icon: '📗', label: 'Equality Act 2010', desc: 'Nine protected characteristics; discrimination, harassment, victimisation; reasonable adjustments for disabled workers; equal pay.' },
    wtr: { fam: 'norme', icon: '📘', label: 'Working Time Regulations 1998', desc: '48-hour average week (opt-out possible), rest breaks, daily and weekly rest, 5.6 weeks\' paid holiday.' },
    acas_code: { fam: 'norme', icon: '📙', label: 'ACAS Code of Practice', desc: 'Code of Practice on Disciplinary and Grievance Procedures (2015): not law in itself, but tribunals take it into account and can adjust awards by up to 25%.' },
    tulrca: { fam: 'norme', icon: '📒', label: 'TULRCA 1992', desc: 'Trade Union and Labour Relations (Consolidation) Act 1992: trade unions, collective consultation on redundancies (s.188), ACAS Code uplift (s.207A).' },
    nmwa: { fam: 'norme', icon: '📓', label: 'National Minimum Wage Act 1998', desc: 'Minimum hourly rates by age band, revised every April; enforced by HMRC.' },
    common_law: { fam: 'norme', icon: '🏛️', label: 'Common law', desc: 'Contract law and judge-made implied terms: mutual trust and confidence, fidelity, obedience, care and skill; restraint of trade doctrine; wrongful dismissal.' },
    collective_agreement: { fam: 'norme', icon: '🗞️', label: 'Collective agreement', desc: 'Agreement with a recognised union. Presumed not legally enforceable between union and employer (TULRCA s.179), but its terms may be incorporated into individual contracts.' },
    era_2025: { fam: 'norme', icon: '🆕', label: 'Employment Rights Act 2025', desc: 'Major reform with staged commencement 2025–2027: unfair dismissal qualifying period cut to 6 months and compensatory award cap removed (announced for 1 January 2027), longer tribunal time limits, zero-hours protections, larger protective awards. Always check what is in force at the relevant date.' },

    /* ---- generic kinds (the engine falls back to them) */
    clause: { fam: 'clause', grp: 'Other', icon: '🧩', label: 'Other clause', desc: 'Free clause: choose its name, icon (icon=…) and conditions (condition command).' },
    condition: { fam: 'limite', grp: 'Other', icon: '☑️', label: 'Other condition', desc: 'Free safeguard or condition.' },
    obligation: { fam: 'obligation', grp: 'Other', icon: '📌', label: 'Other obligation', desc: 'Free obligation.' },
    rupture: { fam: 'rupture', grp: 'Other', icon: '💔', label: 'Other termination', desc: 'Free termination.' },
    etape: { fam: 'etape', grp: 'Other', icon: '🔹', label: 'Other step', desc: 'Free procedural step.' },
    droit: { fam: 'droit', grp: 'Other', icon: '🎁', label: 'Other payment or right', desc: 'Free payment or right.' },
    norme: { fam: 'norme', grp: 'Other', icon: '📚', label: 'Other source', desc: 'Free legal source.' },
    partie: { fam: 'partie', grp: 'Other', icon: '👥', label: 'Other party', desc: 'Free party or actor.' },
    contrat: { fam: 'contrat', grp: 'Other', icon: '📃', label: 'Other contract', desc: 'Free contract (agency worker, casual worker…).' }
  };

  /* ------------------------------------------------------------ helpers */
  const N = v => {
    if (v == null || v === '') return null;
    if (typeof v === 'number') return v;
    return P.num(String(v).replace(/[£,\s]/g, '').replace(/(weeks?|wks?|years?|yrs?|months?|days?)$/i, ''));
  };
  const f = x => P.round2(x).toLocaleString('en-GB');
  const gbp = x => '£' + (Math.round(x * 100) / 100).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  const svc = s => s < 1 ? Math.round(s * 12) + (Math.round(s * 12) === 1 ? ' month' : ' months') : f(s) + (s === 1 ? ' year' : ' years');
  const wk = w => f(w) + (w === 1 ? ' week' : ' weeks');
  const service = a => { const s = N(a.param('service')); if (s != null) return s; const m = N(a.param('service_months')); return m != null ? m / 12 : null; };
  const qp = a => { const q = N(a.param('qualifying_years')); return q != null ? q : DEF.qualifying_years; };

  /** Statutory minimum notice from the employer (ERA 1996 s.86(1)). */
  P.ukStatutoryNotice = s => s < 1 / 12 - 1e-9 ? 0 : (s < 2 ? 1 : Math.min(12, Math.floor(s + 1e-9)));
  /** Weeks of statutory redundancy pay / basic award (ERA 1996 s.162 / s.119): age at dismissal, complete years. */
  P.ukRedundancyWeeks = function (age, years) {
    const n = Math.min(20, Math.floor(years + 1e-9)), bands = { '1.5': 0, '1': 0, '0.5': 0 };
    for (let y = 1; y <= n; y++) { const a = age - y; bands[a >= 41 ? '1.5' : a >= 22 ? '1' : '0.5']++; }
    return { weeks: bands['1.5'] * 1.5 + bands['1'] + bands['0.5'] * 0.5, bands, n };
  };
  const bandText = b => [['1.5', '1.5'], ['1', '1'], ['0.5', '0.5']].filter(x => b[x[0]]).map(x => `${b[x[0]]} × ${x[1]}`).join(' + ');

  /* ------------------------------------------------------------ checks */
  /** Unfair dismissal qualifying period; below it, fairness defects are downgraded (no ordinary claim). */
  const qualCheck = downgrade => function (a) {
    const s = service(a), q = qp(a);
    if (a.inDossier(['automatic_unfair_reason'])) {
      a.issue(G, 'automatically unfair', 'Automatically unfair reason: no qualifying period');
      return;
    }
    if (s == null) return;
    if (s < q - 1e-9) {
      a.calc(`service ${svc(s)} < qualifying period ${svc(q)}: no ordinary unfair dismissal claim`);
      if (downgrade) a.I.issues = a.I.issues.map(x => x.level === G && !x.other ? Object.assign({}, x, { level: R, effet: `flawed, but no unfair dismissal claim (service < ${svc(q)})` }) : x);
    } else a.calc(`qualifying period met: ${svc(s)} ≥ ${svc(q)}`);
  };
  ['conduct_dismissal', 'capability_dismissal', 'redundancy'].forEach(k => { CAT_UK[k].check = qualCheck(true); });
  CAT_UK.constructive_dismissal.check = qualCheck(false);
  CAT_UK.fixed_term_expiry.check = qualCheck(false);
  CAT_UK.probation_dismissal.check = function (a) {
    const s = service(a); if (s == null) return;
    const n = P.ukStatutoryNotice(s);
    a.calc(n ? `statutory notice: at least ${wk(n)} (s.86)` : 'under one month of service: no statutory notice (contract applies)');
    qualCheck(false)(a);
  };
  CAT_UK.summary_dismissal.check = qualCheck(false);

  CAT_UK.unfair_dismissal_right.check = function (a) {
    const s = service(a), q = qp(a);
    if (a.inDossier(['automatic_unfair_reason'])) { a.calc('automatically unfair reason: no qualifying period'); return; }
    if (s == null) return;
    if (s < q - 1e-9) a.issue(G, `not available: under ${svc(q)}' service (s.108)`, `Service ${svc(s)} < ${svc(q)}`);
    else a.calc(`qualifying period met: ${svc(s)} ≥ ${svc(q)}`);
  };

  /** Notice period (etape): statutory minimum vs contractual notice. */
  CAT_UK.notice.check = function (a) {
    const s = service(a);
    const resign = a.inDossier(['resignation']), dism = a.inDossier(DISMISSALS);
    if (s == null || (!resign && !dism)) return;
    const own = N(a.e.params && a.e.params.notice_weeks), con = own != null ? own : N(a.param('notice_weeks'));
    if (resign && !dism) {
      const n = s < 1 / 12 - 1e-9 ? 0 : 1;
      a.calc(`employee's statutory minimum: ${n ? '1 week' : 'none (under one month)'}${con != null ? ` · contract: ${wk(con)}` : ''}`);
      return;
    }
    const n = P.ukStatutoryNotice(s);
    a.calc(`statutory minimum: ${n ? wk(n) : 'none (under one month)'} (${svc(s)} of service)${con != null ? ` · contract: ${wk(con)}` : ''}`);
    if (own != null && own < n - 1e-9) a.issue(G, `too short: statutory minimum is ${wk(n)} (s.86)`, `${wk(own)} < ${wk(n)}`);
  };
  CAT_UK.notice_clause.check = function (a) {
    const w = N(a.e.params && a.e.params.notice_weeks), s = service(a);
    if (w == null) return;
    if (s == null) { a.calc(`contractual notice: ${wk(w)}`); return; }
    const n = P.ukStatutoryNotice(s);
    a.calc(`contract ${wk(w)} · statutory minimum ${n ? wk(n) : 'none'} (${svc(s)} of service)`);
    if (w < n - 1e-9) a.issue(R, `statutory minimum prevails: ${wk(n)} (s.86)`, `${wk(w)} < ${wk(n)}`);
  };
  CAT_UK.notice_pay.check = function (a) {
    const s = service(a), pay = N(a.param('weekly_pay'));
    if (s == null || pay == null) return;
    const con = N(a.param('notice_weeks')), n = P.ukStatutoryNotice(s), w = Math.max(n, con || 0);
    a.calc(`${wk(w)} × ${gbp(pay)} = ${gbp(w * pay)}`);
    a.detail(`longer of statutory (${wk(n)}) and contractual (${con != null ? wk(con) : '—'}) notice; gross weekly pay, not capped`);
  };

  /** Statutory redundancy pay and basic award. */
  const srp = basic => function (a) {
    const s = service(a), age = N(a.param('age')), pay = N(a.param('weekly_pay'));
    if (s == null) return;
    if (!basic && s < 2 - 1e-9) { a.issue(G, "not due: under 2 years' continuous service", `Service ${svc(s)} < 2 years`); return; }
    if (age == null || pay == null) return;
    const capP = N(a.param('week_cap')), cap = capP != null ? capP : DEF.week_cap, wp = Math.min(pay, cap);
    const r = P.ukRedundancyWeeks(age, s);
    a.calc(`${f(r.weeks)} weeks × ${gbp(wp)} = ${gbp(r.weeks * wp)}`);
    a.detail(`${r.n} complete year(s) counted (max 20), age ${age}: ${bandText(r.bands) || '0'} weeks · week's pay ${gbp(pay)}${pay > cap ? ` capped at ${gbp(cap)}` : ` (cap ${gbp(cap)})`}`);
    if (basic && a.inDossier(['statutory_redundancy_pay'])) a.calc('reduced by statutory redundancy pay already received');
  };
  CAT_UK.statutory_redundancy_pay.check = srp(false);
  CAT_UK.basic_award.check = srp(true);

  CAT_UK.compensatory_award.check = function (a) {
    const loss = N(a.param('loss')); if (loss == null) return;
    const pk = N(a.param('polkey')) || 0, up = N(a.param('uplift')) || 0, pay = N(a.param('weekly_pay'));
    const ccP = N(a.param('comp_cap')), cc = ccP != null ? ccP : DEF.comp_cap;
    const raw = loss * (1 - pk / 100) * (1 + Math.min(up, 25) / 100);
    const cap = pay != null ? Math.min(cc, 52 * pay) : cc;
    const uncapped = a.inDossier(['automatic_unfair_reason']);
    const tot = uncapped ? raw : Math.min(raw, cap);
    a.calc(`${gbp(loss)}${pk ? ` − ${f(pk)}% Polkey` : ''}${up ? ` + ${f(Math.min(up, 25))}% uplift` : ''} = ${gbp(raw)}${!uncapped && raw > cap ? ` → capped at ${gbp(cap)}` : ''}`);
    a.detail(uncapped ? 'cap may not apply (whistleblowing / health and safety)' : `cap: lower of ${gbp(cc)} and 52 weeks' pay${pay != null ? ` (${gbp(52 * pay)})` : ''} · award ${gbp(tot)}`);
    if (up > 25) a.issue(G, 'uplift limited to 25% (TULRCA s.207A)', `${f(up)}% > 25%`);
  };
  CAT_UK.acas_uplift.check = function (a) {
    const up = N(a.e.params && a.e.params.uplift); if (up == null) return;
    a.calc(`uplift ${f(up)}% (maximum 25%)`);
    if (up > 25) a.issue(G, 'limited to 25% (TULRCA s.207A)', `${f(up)}% > 25%`);
  };
  CAT_UK.holiday_pay.check = function (a) {
    const d = N(a.param('untaken_days')), p = N(a.param('day_pay'));
    if (d != null && p != null) a.calc(`${f(d)} day(s) × ${gbp(p)} = ${gbp(d * p)}`);
  };
  CAT_UK.settlement_payment.check = function (a) {
    const m = N(a.e.params && a.e.params.amount); if (m == null) return;
    a.calc(`${gbp(m)} · up to ${gbp(DEF.tax_free)} can be tax-free (not notice pay)`);
  };
  CAT_UK.pay.check = function (a) {
    const h = N(a.param('hourly_rate')); if (h == null) return;
    const age = N(a.param('age')), s = service(a), nmwP = N(a.param('nmw'));
    const appr = a.inDossier(['apprenticeship']) && ((age != null && age < 19) || (s != null && s < 1));
    const min = nmwP != null ? nmwP : appr || (age != null && age < 18) ? DEF.nmw16 : (age != null && age < 21) ? DEF.nmw18 : DEF.nmw21;
    a.calc(`${gbp(h)}/hour · minimum ${gbp(min)}${appr ? ' (apprentice rate)' : age != null && age < 21 ? ` (age ${age})` : ' (21 and over)'}`);
    if (h < min - 1e-9) a.issue(G, 'below the minimum wage: arrears due (NMWA 1998)', `${gbp(h)} < ${gbp(min)}`);
  };
  CAT_UK.fixed_term.check = function (a) {
    const y = N(a.e.params && a.e.params.successive_years); if (y == null) return;
    a.calc(`${svc(y)} on successive fixed-term contracts (limit: 4 years)`);
    if (y >= 4 - 1e-9) a.issue(R, 'permanent unless objectively justified (FTE Regs 2002 reg 8)', `${svc(y)} ≥ 4 years`);
  };
  CAT_UK.probation.check = function (a) {
    const d = N(a.e.params && a.e.params.duration); if (d == null) return;
    a.calc(`${f(d)} month(s) · no statutory maximum (3–6 months is common)`);
  };
  ['non_compete', 'non_solicitation', 'non_dealing', 'non_poaching'].forEach(k => {
    CAT_UK[k].check = function (a) {
      const d = N(a.e.params && a.e.params.duration); if (d == null) return;
      a.calc(`${f(d)} month(s) after termination · no payment required`);
      if (a.inDossier(['garden_leave'])) a.calc('garden leave usually set off against this period');
    };
  });

  /* ------------------------------------------------------------ registration */
  const ALIASES_UK = {
    employee: ['employe', 'salarie', 'staff', 'emp_employee'], employer: ['company', 'firm', 'employeur', 'entreprise'],
    tribunal: ['employment_tribunal', 'et', 'court'], trade_union: ['union', 'representatives', 'employee_representatives'],
    acas: ['conciliation'], permanent: ['permanent_contract', 'open_ended', 'contract_of_employment', 'cdi'],
    fixed_term: ['fixed_term_contract', 'cdd', 'temporary_contract'], zero_hours: ['zero_hours_contract', 'zhc'],
    apprenticeship: ['apprentice', 'apprenticeship_agreement'],
    written_particulars: ['written_statement', 'statement_of_particulars', 'section_1_statement', 's1_statement', 'particulars'],
    non_compete: ['non_competition', 'restrictive_covenant', 'non_concurrence'], non_solicitation: ['non_solicit', 'non_solicitation_of_clients'],
    non_poaching: ['non_poach', 'no_poaching', 'non_solicitation_of_employees'], confidentiality: ['confidential_information'],
    probation: ['probationary_period', 'trial_period', 'periode_essai'], notice_clause: ['contractual_notice', 'notice_term'],
    notice: ['notice_period', 'statutory_notice', 'preavis'], pilon: ['payment_in_lieu', 'payment_in_lieu_of_notice'],
    opt_out_48h: ['opt_out', 'working_time_opt_out', '48_hour_opt_out'], deductions_clause: ['deductions', 'deduction_clause'],
    conduct_dismissal: ['dismissal', 'misconduct_dismissal', 'disciplinary_dismissal', 'unfair_dismissal'],
    capability_dismissal: ['performance_dismissal'], redundancy: ['redundancy_dismissal'],
    summary_dismissal: ['dismissal_without_notice', 'instant_dismissal'], settlement_agreement: ['settlement', 'compromise_agreement'],
    fixed_term_expiry: ['expiry', 'non_renewal'], probation_dismissal: ['probation_termination', 'dismissal_in_probation'],
    statutory_redundancy_pay: ['redundancy_pay', 'srp'], notice_pay: ['pay_in_lieu', 'pay_in_lieu_of_notice'],
    holiday_pay: ['holiday_pay_in_lieu', 'accrued_holiday'], unfair_dismissal_right: ['unfair_dismissal_claim', 'right_not_to_be_unfairly_dismissed'],
    gross_misconduct: ['serious_misconduct'], misconduct: ['minor_misconduct'], breach: ['manquement', 'failure'],
    genuine_belief: ['burchell', 'burchell_test'], reasonable_response: ['band_of_reasonable_responses', 'range_of_reasonable_responses'],
    repudiatory_breach: ['fundamental_breach'], mutual_trust: ['trust_and_confidence', 'implied_term_of_trust'],
    disciplinary_meeting: ['hearing', 'disciplinary_hearing', 'meeting'], disciplinary_letter: ['invitation_letter', 'notification'],
    era_1996: ['era', 'employment_rights_act'], acas_code: ['code_of_practice'], condition: ['other_condition']
  };
  P.registerJuris({
    id: 'uk', lang: 'en',
    names: ['uk', 'england', 'england_wales', 'ew', 'english_law', 'angleterre', 'droit_anglais', 'royaume_uni', 'gb', 'england_and_wales'],
    label: "Droit anglais (Angleterre et pays de Galles)", labelEn: 'English law (England & Wales)', flag: '🇬🇧',
    catalog: CAT_UK, categories: {}, aliases: ALIASES_UK, currency: 'GBP',
    defaults: DEF,
    paramAliases: {
      seniority: 'service', anciennete: 'service', years_service: 'service', continuous_service: 'service', years: 'service',
      months_service: 'service_months', weekly_wage: 'weekly_pay', week_pay: 'weekly_pay', weeks_pay: 'weekly_pay', gross_weekly_pay: 'weekly_pay',
      notice: 'notice_weeks', weeks: 'notice_weeks', duree: 'duration', months: 'duration', hourly: 'hourly_rate', rate: 'hourly_rate',
      cap: 'week_cap', weekly_cap: 'week_cap', qualifying: 'qualifying_years', qualifying_period: 'qualifying_years',
      montant: 'amount', days: 'untaken_days', daily_pay: 'day_pay'
    }
  });
})();
