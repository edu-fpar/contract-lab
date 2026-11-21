/* Traduction anglaise du catalogue du droit français (textes seulement). */
window.P = window.P || {};
(function () {
  'use strict';
  const P = window.P;
  P.JURIS = P.JURIS || {};
  P.JURIS.fr = P.JURIS.fr || { id: 'fr' };

  /* sous-groupes de la palette */
  const SOCLE = 'Core terms of the contract', PART = 'Specific clauses', ILL = 'Unlawful clauses',
    LIM = 'Limiting a clause', FORM = 'Formalities', RUPT = 'Conditions for termination',
    EMPL = "Employer's obligations", BOTH = 'Both parties', SAL = "Employee's obligations", FREE = 'Custom';

  /* effets répétés */
  const REQ_CDI = 'reclassified as a permanent contract (CDI)';
  const VOID = 'void';
  const ABUSE = 'unfair implementation';
  const NO_CAUSE = 'without real and serious cause: compensation according to the statutory scale';
  const PROC = 'procedural irregularity (at most 1 month’s salary)';
  const FG_NOT_DUE = 'not due in the event of gross or wilful misconduct';
  const GUAR = 'breach of the job-security guarantee: salary remains due until it expires';
  const OT = 'void: overtime is payable';

  P.JURIS.fr.en = {
    /* ---- parties */
    employeur: { label: 'Employer', desc: 'Natural or legal person who hires. It holds the power to direct, monitor and discipline.' },
    salarie: { label: 'Employee', desc: 'Performs work under the employer’s authority, in return for pay. The relationship of subordination (orders, monitoring, sanctions) is what characterises an employment contract.' },
    cse: { label: 'CSE (works council)', desc: 'Social and economic committee (CSE): represents the staff and is consulted, in particular, on proposed economic redundancies.' },
    inspection: { label: 'Labour administration (DREETS)', desc: 'Oversees the application of employment law (labour inspectorate) and approves mutual terminations (ruptures conventionnelles).' },
    prudhommes: { label: 'Employment tribunal (conseil de prud’hommes)', desc: 'Court that hears individual disputes arising from the employment contract.' },
    medecin: { label: 'Occupational doctor', desc: 'The only person competent to declare an employee unfit for their job, after studying the position and consulting the employer.' },
    nouvel_employeur: { label: 'New employer', desc: 'Company the employee joins after the contract ends: this is where the non-compete clause comes into play.' },
    france_travail: { label: 'France Travail', desc: 'Public employment service: pays the unemployment benefit (ARE) when a person involuntarily loses their job.' },

    /* ---- contrats */
    cdi: { label: 'Permanent contract (CDI)', desc: 'Contrat à durée indéterminée (open-ended contract): the normal and general form of the employment relationship. A full-time CDI need not be in writing, but the employer must provide the main information about the employment relationship in writing.' },
    cdd: { label: 'Fixed-term contract (CDD)', desc: 'An exceptional contract: it may neither aim nor result in permanently filling a job linked to the normal and permanent activity of the business. Maximum duration: 18 months including renewals in the general case.',
      req: [
        { effet: REQ_CDI, why: 'Must be in writing and given to the employee within days of hiring.' },
        { effet: REQ_CDI, why: 'Precise reason: replacing an absent employee, temporary increase in activity, seasonal work…' },
        { effet: REQ_CDI, why: 'Precise end date, or a minimum duration if the end date is open (replacement).' }
      ] },
    interim: { label: 'Temporary agency contract (intérim)', desc: 'A three-way relationship: the temporary work agency employs the worker and places them with a user company, for a specific and temporary task.',
      req: [
        { effet: REQ_CDI, why: 'Written assignment contract.' },
        { effet: REQ_CDI, why: 'Precise reason for using agency work, as for a CDD.' }
      ] },
    apprentissage: { label: 'Apprenticeship contract', desc: 'Work-study contract combining training at an apprentice training centre (CFA) and work in the company, leading to a diploma or vocational qualification.' },

    /* ---- clauses : socle du contrat */
    remuneration: { grp: SOCLE, label: 'Pay', desc: 'An essential element of the contract: the employer cannot change it without the employee’s consent, however slightly, even if the new method would be more advantageous.' },
    fonctions: { grp: SOCLE, label: 'Grade / duties', desc: 'The employee’s grade and duties belong to the core of the contract: a substantial change of duties is a variation of the contract, which requires the employee’s consent.' },
    duree_travail: { grp: SOCLE, label: 'Working hours', desc: 'The contractual working time is a term of the contract. How the hours are scheduled is, in principle, a matter for the employer’s managerial authority (a mere change in working conditions).' },
    lieu_travail: { grp: SOCLE, label: 'Place of work', desc: 'Stating the place of work is, in principle, merely informative. A transfer within the same geographical area is a change in working conditions that the employee cannot refuse.' },
    temps_partiel: { grp: SOCLE, label: 'Part-time work', desc: 'Working time below the statutory (35 hours) or collectively agreed working week. The written contract states the hours and how they are spread over the days of the week or the weeks of the month.',
      req: [
        { effet: 'presumed to be full-time', why: 'Written contract required.' },
        { effet: 'presumed to be full-time', why: 'Agreed hours and their distribution over the days of the week or the weeks of the month.' }
      ] },
    periode_essai: { grp: SOCLE, label: 'Probationary period', desc: 'Allows the employer to assess the employee’s skills, and the employee to assess the job. It is never presumed. Maximum length under a CDI: 2 months (manual workers, clerical staff), 3 months (supervisors, technicians), 4 months (managers, “cadres”).',
      req: [{ effet: 'not enforceable against the employee', why: 'Expressly stipulated in the letter of engagement or the contract.' }] },
    renouvellement_essai: { grp: SOCLE, label: 'Probation renewal', desc: 'The probationary period may be renewed once, if an extended sector-level agreement provides for it and the contract stipulates it. Maximum total length: 4, 6 or 8 months depending on the category.',
      req: [
        { effet: 'irregular renewal', why: 'Extended sector-level agreement providing for renewal.' },
        { effet: 'irregular renewal', why: 'Possibility of renewal stipulated in the contract.' },
        { effet: 'irregular renewal', why: 'Express and unequivocal consent of the employee, before the initial period ends.' }
      ] },

    /* ---- clauses particulières */
    non_concurrence: { grp: PART, label: 'Non-compete', desc: 'Prohibits the employee, after the contract ends, from engaging in a competing activity. It restricts the freedom to work: its validity conditions are cumulative (Cass. soc., 10 July 2002). If void, it is not binding on the employee, who may claim damages if they complied with it.',
      req: [
        { effet: VOID, why: 'Essential to protect the company’s legitimate interests.' },
        { effet: VOID, why: 'Limited in time.' },
        { effet: VOID, why: 'Limited in space.' },
        { effet: VOID, why: 'Takes account of the specific features of the employee’s job.' },
        { effet: VOID, why: 'Includes financial compensation, paid after the contract ends.' }
      ] },
    non_sollicitation: { grp: PART, label: 'Non-solicitation of clients', desc: 'Prohibits canvassing the former employer’s clients. Case law treats it as a non-compete clause: the same validity conditions apply.',
      req: [
        { effet: VOID, why: 'Protection of the company’s legitimate interests.' },
        { effet: VOID, why: 'Limited in time.' },
        { effet: VOID, why: 'Limited in space (or to a defined clientele).' },
        { effet: VOID, why: 'Financial compensation.' }
      ] },
    mobilite: { grp: PART, label: 'Mobility', desc: 'Allows the employer to change the place of work. It must precisely define its geographical scope, which the employer cannot extend unilaterally. It must be implemented in the company’s interest, in good faith, with sufficient advance notice.',
      req: [
        { effet: VOID, why: 'Geographical area precisely defined.' },
        { effet: ABUSE, why: 'Implemented in the company’s interest.' },
        { effet: ABUSE, why: 'Reasonable advance notice, respect for personal and family life.' }
      ] },
    exclusivite: { grp: PART, label: 'Exclusivity', desc: 'Prohibits the employee from any other professional activity during the contract. It infringes the freedom to work: it must be essential to the company’s legitimate interests, justified by the nature of the task and proportionate to the aim pursued.',
      req: [
        { effet: VOID, why: 'Essential to protect the company’s legitimate interests.' },
        { effet: VOID, why: 'Justified by the nature of the task and proportionate to the aim pursued (art. L1121-1 C. trav.).' }
      ],
      excl: [{ effet: 'in principle not enforceable against a part-time employee, who must be able to supplement their income' }] },
    dedit_formation: { grp: PART, label: 'Training repayment clause (dédit-formation)', desc: 'An employee who leaves before an agreed period repays all or part of the cost of training paid for by the employer. It must not deprive the employee of the right to resign.',
      req: [
        { effet: VOID, why: 'Concluded before the training; states the date, nature, length, actual cost and repayment terms.' },
        { effet: VOID, why: 'Actual costs exceed the expenditure required by law or by the collective agreement.' },
        { effet: VOID, why: 'Repayment amount proportionate to the costs incurred.' }
      ],
      excl: [{ effet: 'inapplicable: the termination is not the employee’s doing' }] },
    confidentialite: { grp: PART, label: 'Confidentiality', desc: 'Requires the employee not to disclose the company’s confidential information, during and after the contract. It does not prevent working for a competitor: no financial compensation is required (unlike a non-compete clause).' },
    objectifs: { grp: PART, label: 'Targets clause', desc: 'Sets targets, possibly unilaterally by the employer. They must be achievable and notified to the employee at the start of the period. Failing to meet them is not, in itself, a ground for dismissal.',
      req: [{ effet: 'not enforceable against the employee', why: 'Realistic targets, known at the start of the period.' }] },
    remuneration_variable: { grp: PART, label: 'Variable pay', desc: 'Lawful if it is based on objective factors beyond the employer’s control, does not transfer the business risk to the employee and does not bring pay below the statutory or collectively agreed minimum.',
      req: [{ effet: VOID, why: 'Objective criteria, beyond the employer’s control.' }] },
    forfait_jours: { grp: PART, label: 'Annual days-based working-time agreement (forfait jours)', desc: 'Working time counted in days per year (at most 218 days in principle), for managers or autonomous employees. The employee remains protected: maximum working hours, daily and weekly rest, reasonable workload.',
      req: [
        { effet: OT, why: 'Collective agreement guaranteeing compliance with maximum working hours and rest periods.' },
        { effet: OT, why: 'Written individual working-time agreement, signed by the employee.' },
        { effet: OT, why: 'Employee with genuine autonomy in organising their schedule.' },
        { effet: 'ineffective: overtime is payable', why: 'Actual and regular monitoring of the workload (annual review…).' }
      ] },
    astreinte: { grp: PART, label: 'On-call duty (astreinte)', desc: 'Period during which the employee, without being at the workplace or permanently at the employer’s disposal, must be able to intervene. Only the intervention itself counts as actual working time.',
      req: [
        { effet: 'compensation owed to the employee', why: 'Financial compensation or time off in lieu.' },
        { effet: 'irregular scheduling', why: 'Employee informed of the schedule within a reasonable time.' }
      ] },
    teletravail: { grp: PART, label: 'Remote working', desc: 'Introduced by collective agreement or charter; failing that, by simple agreement between employee and employer, recorded by any means. Remote workers have the same rights as on-site employees.',
      req: [{ effet: 'irregular introduction', why: 'Collective agreement, charter, or agreement between employee and employer.' }] },
    garantie_emploi: { grp: PART, label: 'Job-security guarantee', desc: 'The employer undertakes not to dismiss during a set period, except for gross misconduct or force majeure. If it dismisses anyway, it owes the salary remaining until the guarantee expires.' },
    propriete_intellectuelle: { grp: PART, label: 'Employee inventions', desc: 'Inventions made in the course of an inventive assignment belong to the employer; the employee is entitled to additional remuneration.' },
    parachute: { grp: PART, label: 'Contractual severance payment', desc: 'Provides for a payment on dismissal, on top of the statutory severance pay. The court may reduce it if it is manifestly excessive (penalty clause).' },
    clause_resolutoire: { grp: ILL, label: 'Automatic termination', desc: 'Provides that a given event (loss of a client, loss of a driving licence, targets missed…) will automatically end the contract.',
      illicite: 'void: no clause may decide in advance that a fact will constitute a ground for dismissal; only the court assesses whether the cause is real and serious' },
    clause_vie_privee: { grp: ILL, label: 'Restriction of private life', desc: 'Celibacy clause, ban on marrying a colleague, obligation to live in a given place without justification…',
      illicite: 'void: unjustified and disproportionate infringement of the employee’s rights and freedoms (art. L1121-1 C. trav.)' },
    clause_discriminatoire: { grp: ILL, label: 'Discriminatory clause', desc: 'Distinguishes on grounds of age, sex, origin, pregnancy, opinions, trade-union activity, health… (art. L1132-1 C. trav.).',
      illicite: 'void: prohibited discrimination' },

    /* ---- garde-fous et conditions */
    contrepartie: { grp: LIM, label: 'Financial compensation', desc: 'Sum paid to the employee to compensate for a constraint: non-compete (after the contract ends, however it ends), on-call duty… It must not be derisory.' },
    limite_duree: { grp: LIM, label: 'Time limit', desc: 'The constraint applies only for a set period (for example one or two years after the contract ends).' },
    limite_geo: { grp: LIM, label: 'Geographical limit', desc: 'The constraint applies only within a defined geographical area.' },
    specificites: { grp: LIM, label: 'Specific features of the job', desc: 'The clause takes account of the employee’s actual job: it must not prevent them from finding work in line with their training and experience.' },
    interet_legitime: { grp: LIM, label: 'Company’s legitimate interest', desc: 'The clause protects a genuine interest of the company (clientele, know-how…), in view of the employee’s duties.' },
    proportionnalite: { grp: LIM, label: 'Justified and proportionate', desc: 'No restriction on the employee’s rights and freedoms that is not justified by the nature of the task and proportionate to the aim pursued (art. L1121-1 C. trav.).' },
    zone_definie: { grp: LIM, label: 'Precisely defined area', desc: 'The mobility area is precisely defined in the clause and cannot be extended unilaterally by the employer.' },
    delai_prevenance: { grp: LIM, label: 'Advance notice', desc: 'The employee is warned sufficiently in advance (transfer, on-call duty, termination of the probationary period…).' },
    accord_salarie: { grp: LIM, label: 'Employee’s express consent', desc: 'Clear and unequivocal consent of the employee: required to vary the contract, renew the probationary period…' },
    formation_couteuse: { grp: LIM, label: 'Costs beyond legal obligations', desc: 'The training costs exceed the expenditure required of the employer by law or by the collective agreement.' },
    objectifs_realistes: { grp: LIM, label: 'Realistic, known targets', desc: 'Achievable targets, consistent with the market, communicated at the start of the period.' },
    criteres_objectifs: { grp: LIM, label: 'Objective criteria', desc: 'Variation depends on objective factors beyond the employer’s control.' },
    ecrit: { grp: FORM, label: 'In writing', desc: 'Formal requirement: written contract or clause (CDD, agency work, part-time, probationary period, training repayment, days-based agreement…).' },
    motif_recours: { grp: FORM, label: 'Precise reason for use', desc: 'A permitted case for using a CDD or agency work, stated precisely in the contract.' },
    terme: { grp: FORM, label: 'Precise end date', desc: 'End date of the CDD, or a minimum duration if the end date is open (replacing an absent employee).' },
    repartition: { grp: FORM, label: 'Hours and distribution', desc: 'Agreed working hours and their distribution over the days of the week or the weeks of the month.' },
    accord_collectif: { grp: FORM, label: 'Collective agreement', desc: 'Sector-level or company agreement that authorises and regulates the arrangement.' },
    convention_individuelle: { grp: FORM, label: 'Written individual agreement', desc: 'The employee’s written agreement to the arrangement (days-based working-time agreement).' },
    autonomie: { grp: FORM, label: 'Employee autonomy', desc: 'The employee organises their own schedule freely: they do not follow the collective working hours.' },
    suivi_charge: { grp: FORM, label: 'Workload monitoring', desc: 'The employer actually and regularly monitors the workload and the balance between work and personal life.' },
    cause_reelle: { grp: RUPT, label: 'Real and serious cause', desc: 'Every dismissal for personal reasons must be justified by a real cause (objective, accurate, verifiable facts) and a serious one (grave enough to justify ending the contract).' },
    motif_eco: { grp: RUPT, label: 'Economic reason', desc: 'Abolition or transformation of a job, or a refused change to an essential term of the contract, resulting in particular from economic difficulties, technological change, a reorganisation needed to safeguard competitiveness or the cessation of business (art. L1233-3 C. trav.).' },
    volonte_claire: { grp: RUPT, label: 'Clear and unequivocal intent', desc: 'Resignation is never presumed: it requires a clear and unequivocal intention to leave the company.' },
    consentement_libre: { grp: RUPT, label: 'Free consent', desc: 'No defect of consent: no pressure, harassment or duress.' },
    manquement_suffisant: { grp: RUPT, label: 'Serious breach by the employer', desc: 'A breach by the employer serious enough to prevent the contract from continuing (unpaid salary, harassment, contract varied without consent…).' },
    motif_rupture_cdd: { grp: RUPT, label: 'Permitted ground for early termination', desc: 'Agreement of the parties, gross misconduct, force majeure, unfitness certified by the occupational doctor, or the employee being hired on a CDI elsewhere.' },

    /* ---- obligations */
    fournir_travail: { grp: EMPL, label: 'Provide the agreed work', desc: 'The employer provides the work and the means to carry it out.' },
    payer_salaire: { grp: EMPL, label: 'Pay the salary', desc: 'Pay the agreed remuneration, at least equal to the minimum (SMIC national minimum wage, collectively agreed minimum), with a payslip.' },
    securite: { grp: EMPL, label: 'Duty of safety', desc: 'Take the measures needed to ensure safety and protect workers’ physical and mental health: prevention, information, training (art. L4121-1 C. trav.).' },
    adaptation: { grp: EMPL, label: 'Adaptation and employability', desc: 'Ensure employees are adapted to their job and maintain their ability to hold employment (art. L6321-1 C. trav.).' },
    non_discrimination: { grp: EMPL, label: 'Equality, non-discrimination', desc: 'No decision based on a discriminatory ground; equal pay for women and men for the same work or work of equal value.' },
    respect_libertes: { grp: EMPL, label: 'Respect for freedoms', desc: 'Respect the employee’s private life and freedoms: any restriction must be justified and proportionate.' },
    bonne_foi: { grp: BOTH, label: 'Performance in good faith', desc: 'The employment contract is performed in good faith, by the employer and by the employee alike (art. L1222-1 C. trav.).' },
    executer_travail: { grp: SAL, label: 'Perform the work', desc: 'Carry out the agreed work personally, with care, during working time.' },
    obeissance: { grp: SAL, label: 'Follow instructions', desc: 'The relationship of subordination requires following the employer’s orders and instructions, and the internal rules, unless an order is unlawful or dangerous.' },
    loyaute: { grp: SAL, label: 'Loyalty', desc: 'Do not harm the employer, do not compete with it during the contract, even without a clause.' },
    discretion: { grp: SAL, label: 'Discretion', desc: 'Do not disclose confidential information; trade secrets are protected by criminal law.' },
    securite_salarie: { grp: SAL, label: 'Take care of safety', desc: 'Take care, according to one’s training and abilities, of one’s own health and safety and that of others concerned (art. L4122-1 C. trav.).' },

    /* ---- fautes et manquements */
    manquement: { label: 'Failure to perform', desc: 'Non-performance of an obligation. Link it to the obligation it breaches.' },
    faute_simple: { label: 'Misconduct (faute sérieuse)', desc: 'Misconduct sufficient to justify dismissal (real and serious cause), but which does not prevent the employee from staying on during the notice period: notice and severance pay are due.' },
    faute_grave: { label: 'Gross misconduct (faute grave)', desc: 'Misconduct that makes it impossible to keep the employee in the company, even during the notice period. It removes the right to notice and to severance pay. The procedure must be started within a short time.' },
    faute_lourde: { label: 'Wilful misconduct (faute lourde)', desc: 'Misconduct committed with intent to harm the employer. Same effects as gross misconduct; it also allows the employer to hold the employee financially liable. Payment in lieu of accrued paid leave remains due.' },
    harcelement: { label: 'Harassment', desc: 'Repeated conduct that degrades working conditions (moral harassment) or remarks and behaviour of a sexual nature (sexual harassment). The employer must prevent it, stop it and sanction it.' },
    insuffisance: { label: 'Poor performance (insuffisance professionnelle)', desc: 'Inability to perform one’s duties properly, without misconduct: it may be a real and serious non-disciplinary cause if based on objective evidence.' },

    /* ---- ruptures */
    demission: { label: 'Resignation', desc: 'Termination of a CDI on the employee’s initiative. No set form, but a clear and unequivocal intent. Notice according to the collective agreement or custom. No severance pay; no unemployment benefit, except for a legitimate resignation or a career-change project.',
      req: [{ effet: 'may be reclassified (prise d’acte or unfair dismissal)', why: 'Clear and unequivocal intent to resign.' }] },
    licenciement_personnel: { label: 'Dismissal for personal reasons', desc: 'Termination of a CDI on the employer’s initiative, for a reason relating to the employee personally (misconduct, poor performance…). Procedure: invitation letter, preliminary meeting, reasoned letter.',
      req: [
        { effet: NO_CAUSE, why: 'Real and serious cause (misconduct, poor performance…).' },
        { effet: PROC, why: 'Invitation to a preliminary meeting.' },
        { effet: PROC, why: 'Preliminary meeting, at least 5 working days after the invitation.' },
        { effet: 'without real and serious cause (no reasoned letter)', why: 'Dismissal letter stating the reasons.' }
      ],
      excl: [{ effet: GUAR }] },
    licenciement_eco: { label: 'Economic redundancy', desc: 'Dismissal for a reason not inherent in the employee. The employer must try to redeploy, follow the order of redundancies and, depending on headcount and the number of redundancies, consult the CSE.',
      req: [
        { effet: 'without real and serious cause', why: 'Genuine economic reason (art. L1233-3 C. trav.).' },
        { effet: 'without real and serious cause', why: 'Serious prior search for redeployment.' },
        { effet: 'procedural irregularity', why: 'Consultation of the CSE (depending on headcount and number of redundancies).' },
        { effet: 'procedural irregularity', why: 'Invitation to a preliminary meeting (individual redundancy).' },
        { effet: 'without real and serious cause (no reasoned letter)', why: 'Letter stating the economic reason.' }
      ],
      excl: [{ effet: GUAR }] },
    licenciement_inaptitude: { label: 'Dismissal for unfitness', desc: 'Only possible after the occupational doctor has declared the employee unfit and redeployment has proved impossible (or was refused, or the doctor’s opinion waives it).',
      req: [
        { effet: 'unjustified dismissal', why: 'Unfitness opinion issued by the occupational doctor.' },
        { effet: 'without real and serious cause', why: 'Search for redeployment (unless expressly waived in the opinion).' },
        { effet: 'without real and serious cause', why: 'Reasoned dismissal letter.' }
      ] },
    rupture_conventionnelle: { label: 'Mutual termination (rupture conventionnelle)', desc: 'Termination of a CDI by mutual agreement: it cannot be imposed by either party. Payment at least equal to statutory severance pay; gives entitlement to unemployment benefit.',
      req: [
        { effet: VOID, why: 'One or more preliminary meetings.' },
        { effet: VOID, why: 'Written agreement setting the termination date and the specific termination payment.' },
        { effet: VOID, why: '15 calendar-day withdrawal period for each party.' },
        { effet: 'without effect', why: 'Approval by the administration (15 working days of silence = approval).' },
        { effet: 'void: takes effect as an unfair dismissal', why: 'Free consent, without defect (no harassment or pressure).' }
      ] },
    fin_cdd: { label: 'Expiry of the CDD', desc: 'The CDD ends automatically on its end date, without any procedure. The employee receives the end-of-contract payment, save for exceptions.' },
    rupture_anticipee_cdd: { label: 'Early termination of the CDD', desc: 'Before its end date, a CDD can only be terminated in limited cases: agreement of the parties, gross misconduct, force majeure, unfitness, the employee being hired on a CDI.',
      okText: 'early termination permitted',
      req: [{ effet: 'damages at least equal to the salary for the remainder of the contract', why: 'Ground for early termination permitted by law.' }] },
    rupture_essai: { label: 'Termination during probation', desc: 'Either party may freely end the probationary period, without giving reasons or paying severance. The termination must not be abusive (unrelated to the employee’s skills) and must respect a period of advance notice.',
      req: [
        { effet: 'impossible: without a valid probationary period, the termination is a dismissal', why: 'Probationary period validly stipulated and still running.' },
        { effet: 'payment in lieu of advance notice', why: 'Advance notice depending on length of service.' }
      ] },
    prise_acte: { label: 'Prise d’acte (termination for employer’s breach)', desc: 'The employee ends the contract immediately, blaming the employer’s breaches. The court decides: breaches serious enough = effects of an unfair dismissal (without real and serious cause); otherwise = effects of a resignation.',
      okText: 'justified: takes effect as an unfair dismissal',
      req: [{ effet: 'takes effect as a resignation', why: 'Breach by the employer serious enough to prevent the contract from continuing.' }] },
    resiliation_judiciaire: { label: 'Judicial termination (résiliation judiciaire)', desc: 'The employee asks the court to terminate the contract on the grounds of the employer’s fault, while continuing to work. If granted: effects of an unfair dismissal (without real and serious cause).',
      okText: 'granted: takes effect as an unfair dismissal',
      req: [{ effet: 'dismissed: the contract continues', why: 'Sufficiently serious breach by the employer.' }] },
    abandon_poste: { label: 'Job abandonment', desc: 'An employee who voluntarily abandons their job and does not return to work after formal notice is presumed to have resigned (art. L1237-1-1 C. trav.): no severance pay, no unemployment benefit.',
      okText: 'presumed to have resigned',
      req: [{ effet: 'presumption of resignation does not apply', why: 'Formal notice to justify the absence and return to work, within at least 15 days.' }] },
    depart_retraite: { label: 'Voluntary retirement', desc: 'The employee voluntarily leaves the company to draw their pension; they receive the retirement payment and work a notice period.' },

    /* ---- procédure */
    convocation: { label: 'Invitation letter', desc: 'Registered letter or letter delivered by hand against receipt, stating the purpose of the meeting, its date, time and place, and the right to be accompanied.' },
    entretien_prealable: { label: 'Preliminary meeting', desc: 'At least 5 working days after the invitation. The employer states the reasons being considered and hears the employee’s explanations.' },
    notification: { label: 'Dismissal letter', desc: 'Registered letter with acknowledgement of receipt, at least 2 working days after the meeting. The reasons stated set the limits of any dispute.' },
    mise_a_pied: { label: 'Precautionary suspension', desc: 'Removes the employee immediately pending the decision, where the misconduct appears to be gross. Unpaid if gross misconduct is ultimately upheld.' },
    sanction: { label: 'Disciplinary sanction', desc: 'Warning, disciplinary suspension, transfer, demotion… The same misconduct cannot be sanctioned twice; the facts become time-barred after 2 months.' },
    preavis: { label: 'Notice', desc: 'Period between notification and the end of the contract. Dismissal: 1 month between 6 months’ and 2 years’ service, 2 months beyond, unless more favourable provisions apply. Resignation: according to the collective agreement or custom.',
      excl: [{ effet: FG_NOT_DUE }] },
    entretien_rc: { label: 'Mutual termination meeting', desc: 'One or more meetings, at which each party may be accompanied.' },
    convention_rc: { label: 'Signing of the agreement', desc: 'Sets the termination date (at the earliest the day after approval) and the specific termination payment.' },
    retractation: { label: 'Withdrawal period', desc: '15 calendar days from signature, for each party.' },
    homologation: { label: 'Approval (homologation)', desc: 'Request to the administration after the withdrawal period. It has 15 working days; its silence counts as approval.' },
    mise_en_demeure: { label: 'Formal notice', desc: 'Demand to justify the absence and return to work, within a period set by the employer (at least 15 days).' },
    reclassement: { label: 'Search for redeployment', desc: 'The employer looks for an available job, as comparable as possible, within the company or the group in France.' },
    consultation_cse: { label: 'Consultation of the CSE', desc: 'Information and consultation of staff representatives on the proposed dismissal.' },
    avis_inaptitude: { label: 'Unfitness opinion', desc: 'Issued by the occupational doctor after studying the job; it may give guidance on redeployment, or waive it.' },
    documents_fin: { label: 'End-of-contract documents', desc: 'Certificate of employment, certificate for France Travail, final statement of account (solde de tout compte).' },

    /* ---- indemnités et droits */
    indemnite_licenciement: { label: 'Severance pay', desc: 'Statutory payment due to an employee on a CDI who is dismissed after at least 8 months’ service: 1/4 of a month’s salary per year up to 10 years, 1/3 of a month beyond (unless a more favourable agreement applies).',
      excl: [{ effet: FG_NOT_DUE }] },
    indemnite_preavis: { label: 'Payment in lieu of notice', desc: 'Due when the employer releases the employee from working their notice: the employee receives what they would have earned.',
      excl: [{ effet: FG_NOT_DUE }] },
    indemnite_conges: { label: 'Payment in lieu of paid leave', desc: 'Compensates leave accrued but not taken. It is due whatever the reason for termination, even for wilful misconduct.' },
    indemnite_precarite: { label: 'End-of-CDD payment', desc: '“Precariousness bonus” (prime de précarité): 10% of the total gross pay under the CDD (unless an agreement provides for 6% with access to training). Not due, in particular, for a seasonal or customary CDD, a student during holidays, early termination by the employee or gross misconduct, or if the relationship continues under a CDI.',
      excl: [{ effet: 'not due in the event of gross misconduct' }, { effet: 'not due: the relationship continues under a CDI' }] },
    indemnite_rc: { label: 'Mutual termination payment', desc: 'Specific payment, at least equal to statutory severance pay.' },
    chomage: { label: 'Unemployment benefit (ARE)', desc: 'Paid by France Travail in the event of involuntary loss of employment: dismissal, end of a CDD, mutual termination…',
      excl: [
        { effet: 'no ARE after a resignation (except legitimate resignation or career-change project)' },
        { effet: 'no ARE: the employee is presumed to have resigned' }
      ] },
    dommages_interets: { label: 'Damages', desc: 'Compensation for harm suffered. For a dismissal without real and serious cause, the award is capped by a scale based on length of service (art. L1235-3 C. trav.), except where the dismissal is void.' },

    /* ---- normes */
    code_travail: { label: 'Labour Code (C. trav.)', desc: 'Statute sets mandatory social public policy: rules from which one may only depart in the employee’s favour, and default rules applying in the absence of agreement.' },
    convention_collective: { label: 'Sector-level agreement (convention de branche)', desc: 'Agreement negotiated at industry level; it sets in particular minimum wages and job classifications.' },
    accord_entreprise: { label: 'Company agreement', desc: 'Since 2017, it prevails over the sector-level agreement in many areas, except those reserved to the sector.' },
    reglement_interieur: { label: 'Internal rules (règlement intérieur)', desc: 'Written document, mandatory from 50 employees: health, safety, discipline and the scale of sanctions.' },
    usage: { label: 'Company custom (usage)', desc: 'General, consistent and fixed practice of the employer, which creates a right for employees until it is properly revoked.' },

    /* ---- éléments libres */
    clause: { grp: FREE, label: 'Other clause', desc: 'Custom clause: specify its name, its icon (icon=…) and its conditions (condition command).' },
    condition: { grp: FREE, label: 'Other condition', desc: 'Custom safeguard or condition.' },
    obligation: { grp: FREE, label: 'Other obligation', desc: 'Custom obligation.' },
    rupture: { grp: FREE, label: 'Other termination', desc: 'Custom mode of termination.' },
    etape: { grp: FREE, label: 'Other step', desc: 'Custom procedural step.' },
    droit: { grp: FREE, label: 'Other entitlement', desc: 'Custom payment or entitlement.' },
    norme: { grp: FREE, label: 'Other source of law', desc: 'Custom legal norm.' },
    partie: { grp: FREE, label: 'Other party', desc: 'Custom party or actor.' },
    contrat: { grp: FREE, label: 'Other contract', desc: 'Custom contract (project-based CDI, professionalisation contract…).' }
  };

  /* ---- alias anglais des types (sans collision avec les commandes et relations) */
  const EN_ALIASES = {
    employeur: ['employer', 'company'],
    salarie: ['employee', 'worker'],
    cse: ['works_council', 'social_and_economic_committee'],
    inspection: ['labour_inspectorate', 'labour_inspection', 'labour_administration'],
    prudhommes: ['employment_tribunal', 'labour_court', 'tribunal'],
    medecin: ['occupational_doctor', 'occupational_physician'],
    nouvel_employeur: ['new_employer'],
    france_travail: ['pole_emploi', 'public_employment_service'],
    cdi: ['permanent', 'permanent_contract', 'open_ended_contract'],
    cdd: ['fixed_term', 'fixed_term_contract'],
    interim: ['agency_work', 'temporary_agency_contract', 'temp_contract'],
    apprentissage: ['apprenticeship'],
    remuneration: ['pay', 'wage'],
    fonctions: ['duties', 'job_title', 'role'],
    duree_travail: ['working_time', 'working_hours'],
    lieu_travail: ['place_of_work', 'workplace', 'work_location'],
    temps_partiel: ['part_time'],
    periode_essai: ['probation', 'probationary_period', 'trial_period'],
    renouvellement_essai: ['probation_renewal', 'renewal'],
    non_concurrence: ['non_compete', 'non_competition', 'non_compete_clause', 'restrictive_covenant'],
    non_sollicitation: ['non_solicitation', 'non_solicit'],
    mobilite: ['mobility', 'mobility_clause'],
    exclusivite: ['exclusivity', 'exclusivity_clause'],
    dedit_formation: ['training_repayment', 'training_clawback', 'clawback'],
    confidentialite: ['confidentiality', 'nda'],
    objectifs: ['targets', 'objectives'],
    remuneration_variable: ['variable_pay', 'bonus', 'commission'],
    forfait_jours: ['days_based', 'annual_days', 'days_based_agreement'],
    astreinte: ['on_call', 'standby'],
    teletravail: ['remote_working', 'remote_work', 'telework'],
    garantie_emploi: ['job_security', 'employment_guarantee'],
    propriete_intellectuelle: ['inventions', 'intellectual_property'],
    parachute: ['golden_parachute', 'contractual_severance'],
    clause_resolutoire: ['automatic_termination'],
    clause_vie_privee: ['private_life'],
    clause_discriminatoire: ['discriminatory_clause'],
    contrepartie: ['compensation', 'financial_compensation', 'consideration'],
    limite_duree: ['time_limit', 'duration_limit'],
    limite_geo: ['geographical_limit', 'geographic_limit', 'area_limit'],
    specificites: ['job_specifics'],
    interet_legitime: ['legitimate_interest'],
    proportionnalite: ['proportionality', 'proportionate'],
    zone_definie: ['defined_area', 'defined_zone'],
    delai_prevenance: ['advance_notice', 'prior_notice'],
    accord_salarie: ['employee_consent', 'express_consent'],
    formation_couteuse: ['costly_training'],
    objectifs_realistes: ['realistic_targets'],
    criteres_objectifs: ['objective_criteria'],
    ecrit: ['writing', 'written', 'in_writing'],
    motif_recours: ['reason_for_use', 'permitted_reason'],
    terme: ['end_date', 'fixed_end_date'],
    repartition: ['distribution_of_hours', 'schedule'],
    accord_collectif: ['collective_agreement'],
    convention_individuelle: ['individual_agreement'],
    autonomie: ['autonomy'],
    suivi_charge: ['workload_monitoring'],
    cause_reelle: ['real_and_serious_cause', 'genuine_cause', 'just_cause'],
    motif_eco: ['economic_reason', 'economic_grounds'],
    volonte_claire: ['clear_intent', 'unequivocal_intent'],
    consentement_libre: ['free_consent'],
    manquement_suffisant: ['serious_breach'],
    motif_rupture_cdd: ['early_termination_ground'],
    fournir_travail: ['provide_work'],
    payer_salaire: ['pay_salary', 'pay_wages'],
    securite: ['safety', 'duty_of_safety', 'health_and_safety'],
    adaptation: ['employability'],
    non_discrimination: ['equal_treatment', 'equality'],
    respect_libertes: ['respect_for_freedoms'],
    bonne_foi: ['good_faith'],
    executer_travail: ['perform_work'],
    obeissance: ['obedience', 'follow_instructions'],
    loyaute: ['loyalty'],
    securite_salarie: ['employee_safety'],
    manquement: ['failure', 'default'],
    faute_simple: ['misconduct', 'simple_misconduct'],
    faute_grave: ['gross_misconduct'],
    faute_lourde: ['wilful_misconduct', 'willful_misconduct'],
    harcelement: ['harassment', 'bullying'],
    insuffisance: ['poor_performance', 'underperformance', 'incompetence'],
    demission: ['resignation'],
    licenciement_personnel: ['dismissal', 'personal_dismissal'],
    licenciement_eco: ['redundancy', 'economic_dismissal'],
    licenciement_inaptitude: ['unfitness_dismissal', 'incapacity_dismissal'],
    rupture_conventionnelle: ['mutual_termination', 'mutual_agreement'],
    fin_cdd: ['end_of_fixed_term', 'expiry'],
    rupture_anticipee_cdd: ['early_termination'],
    rupture_essai: ['probation_termination', 'end_of_probation'],
    prise_acte: ['constructive_dismissal'],
    resiliation_judiciaire: ['judicial_termination', 'judicial_rescission'],
    abandon_poste: ['job_abandonment', 'abandonment'],
    depart_retraite: ['retirement'],
    convocation: ['invitation', 'invitation_letter', 'summons'],
    entretien_prealable: ['preliminary_meeting', 'pre_dismissal_meeting'],
    notification: ['dismissal_letter'],
    mise_a_pied: ['suspension', 'precautionary_suspension'],
    sanction: ['disciplinary_sanction', 'warning'],
    preavis: ['notice'],
    entretien_rc: ['termination_meeting'],
    convention_rc: ['termination_agreement'],
    retractation: ['withdrawal', 'cooling_off'],
    homologation: ['approval'],
    mise_en_demeure: ['formal_notice'],
    reclassement: ['redeployment', 'alternative_employment'],
    consultation_cse: ['cse_consultation', 'works_council_consultation'],
    avis_inaptitude: ['unfitness_opinion'],
    documents_fin: ['end_of_contract_documents', 'leaving_documents'],
    indemnite_licenciement: ['severance', 'severance_pay', 'statutory_severance'],
    indemnite_preavis: ['pay_in_lieu_of_notice', 'payment_in_lieu'],
    indemnite_conges: ['holiday_pay', 'paid_leave'],
    indemnite_precarite: ['end_of_cdd_payment', 'precariousness_bonus'],
    indemnite_rc: ['mutual_termination_payment'],
    chomage: ['unemployment_benefit', 'unemployment'],
    dommages_interets: ['damages'],
    code_travail: ['labour_code'],
    convention_collective: ['sector_agreement', 'branch_agreement'],
    accord_entreprise: ['company_agreement'],
    reglement_interieur: ['internal_rules', 'work_rules'],
    usage: ['company_custom', 'custom'],
    clause: ['custom_clause'],
    obligation: ['custom_obligation']
  };
  P.JURIS.fr.aliases = P.JURIS.fr.aliases || {};
  Object.keys(EN_ALIASES).forEach(k => { P.JURIS.fr.aliases[k] = (P.JURIS.fr.aliases[k] || []).concat(EN_ALIASES[k]); });
})();
