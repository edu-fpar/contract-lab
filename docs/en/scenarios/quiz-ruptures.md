# Quiz: which termination, which rights?
> Eight quick questions to revise how employment contracts end.

A revision quiz: the canvas illustrates each situation. Click the audience’s answer, then reveal.

## Question: can a CDD be ended early because the employee is too slow?
```scene
cdd CT "6-month CDD"
rupture_anticipee_cdd RA "Early termination"
RA -> CT
insuffisance INS "Slowness"
INS -> RA lien "reason given"
verification off
focus RA
```
- [ ] Yes, it is poor performance
  This reason may justify dismissal under a CDI, not early termination of a CDD.
- [x] No, except by agreement, gross misconduct, force majeure, unfitness or hiring on a CDI
  The list of grounds for early termination is exhaustive.

### Answer
A CDD can only be ended before its end date in **exhaustively listed cases**. Otherwise, the employer owes damages at least equal to the **pay for the remainder of the contract**.

```scene
verification on
```
## Question: does mutual termination give entitlement to unemployment benefit?
```scene
effacer
rupture_conventionnelle RC "Mutual termination"
chomage ARE "ARE"
RC -> ARE
focus RC ARE
verification off
```
- [x] Yes
  It is an involuntary loss of employment within the meaning of unemployment insurance.
- [ ] No, it is a termination wanted by the employee
  It is wanted by both parties; the employee receives benefit.

### Answer
Mutual termination gives entitlement to **unemployment benefit**: this is one of its main differences from resignation.

```scene
verification on
```
## Question: gross misconduct: which payment remains due?
```scene
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
```
- [ ] Severance pay
  Removed by gross misconduct.
- [ ] Payment in lieu of notice
  Removed by gross misconduct.
- [x] Payment in lieu of paid leave
  Always due, whatever the reason for termination.

### Answer
Only the **paid leave** payment survives gross misconduct (and even wilful misconduct).

```scene
verification on
```
## Question: an employee with 5 months’ service is dismissed (no gross misconduct). Are they entitled to statutory severance pay?
```scene
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
```
- [ ] Yes, from day one
  A minimum length of service is required.
- [x] No, at least 8 months’ service is required
  Below that, only a more favourable agreement can provide for it.
- [ ] Yes, if they have more than 3 months
  The statutory threshold is 8 months.

### Answer
Statutory severance pay requires **8 months’ uninterrupted service**.

```scene
verification on
```
## Question: what is the minimum time between the invitation letter and the preliminary meeting?
```scene
effacer
convocation CONV
entretien_prealable ENT
CONV -> ENT puis "?"
focus CONV ENT
```
- [ ] 2 working days
  That is the minimum time between the meeting and sending the dismissal letter.
- [x] 5 working days
  From the presentation of the invitation letter.
- [ ] 15 calendar days
  That is the withdrawal period for a mutual termination.

### Answer
**5 working days** after the invitation is presented; then at least **2 working days** between the meeting and the dismissal letter.

```scene
retirer CONV -> ENT
CONV -> ENT puis "≥ 5 working days"
```
## Question: an employee abandons their job and does not respond to the formal notice. They are…
```scene
effacer
abandon_poste AB "Job abandonment"
mise_en_demeure MED
AB -> MED
focus AB
verification off
```
- [ ] Dismissed for gross misconduct
  That was the practice before 2023; the employer may still choose this route, but the law has created a presumption.
- [x] Presumed to have resigned
  Since 2023 (art. L1237-1-1 C. trav.), unless there is a legitimate reason.
- [ ] In a mutual termination
  That requires the agreement of both parties.

### Answer
They are **presumed to have resigned**: no severance pay and no unemployment benefit. They may challenge this before the employment tribunal (conseil de prud’hommes), which rules quickly.

```scene
verification on
```
## Question: who approves a mutual termination?
```scene
effacer
rupture_conventionnelle RC
homologation HOM
RC -> HOM
focus HOM
```
- [ ] The employment tribunal (conseil de prud’hommes)
  It decides disputes; it does not approve.
- [x] The labour administration (DREETS)
  Within 15 working days; its silence counts as approval.
- [ ] The CSE
  It plays no part in an individual mutual termination (except for a protected employee: authorisation from the labour inspector).

### Answer
The **DREETS** approves it (15 working days of silence = approval). For a **protected employee**, **authorisation** from the labour inspector is required.

```scene
inspection DR "DREETS"
DR -> HOM lien "approves"
```
## Question: the prise d’acte is not justified. It takes effect as…
```scene
effacer
prise_acte PA "Prise d’acte"
verification off
focus PA
```
- [ ] A dismissal without real and serious cause
  That is the case when the employer’s breaches are serious enough.
- [x] A resignation
  The employee ended the contract without sufficient reason.
- [ ] A mutual termination
  That requires agreement and approval.

### Answer
A **justified** prise d’acte: dismissal without real and serious cause (or even a void dismissal). **Not justified**: **resignation**.

```scene
verification on
note PA "No serious breach: resignation"
```