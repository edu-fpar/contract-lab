# Dismissal for personal reasons
> A real and serious cause, a three-stage procedure, payments.

The employer may end a CDI, but must **justify** it (real and serious cause) and follow a **procedure**. Each step has its time limit; each failure has its sanction.

## 1. Karim’s file
Karim, an accountant for **6 years** (€2,800 gross a month), is repeatedly **late** despite two warnings. His employer is considering dismissing him.

```scene
employeur EMP "Transports Morel"
salarie KAR "Karim Haddad" categorie=employe anciennete=6 salaire=2800
cdi CT "Karim’s CDI"
EMP KAR -> CT
licenciement_personnel LIC "Karim’s dismissal"
EMP -> LIC
LIC -> CT
focus LIC
```
## 2. A real and serious cause
The dismissal must be based on a **real** cause (objective, accurate, verifiable facts) and a **serious** one (important enough to justify ending the contract).

Repeated lateness despite warnings constitutes **misconduct (faute sérieuse)**. Without it, the dismissal would be **without real and serious cause**: compensation according to the statutory scale.

```scene
faute_simple F "Repeated lateness"
F -> LIC
focus F LIC
```
## 3. The invitation letter and the preliminary meeting
1. **Invitation** by registered letter or delivered by hand: purpose, date, time and place of the meeting, right to be accompanied.
2. **Preliminary meeting**, at least **5 working days** after the letter is presented: the employer sets out the reasons, Karim explains himself.

An irregular procedure does not make the dismissal unjustified, but gives entitlement to compensation (at most one month’s salary).

```scene
convocation CONV "Invitation (registered letter)"
entretien_prealable ENT "Preliminary meeting"
LIC -> CONV
CONV -> ENT puis "≥ 5 working days"
focus CONV ENT
```
## 4. The dismissal letter
At least **2 working days** after the meeting, the employer sends the **dismissal letter**, by registered post with acknowledgement of receipt. It states the **reasons**, which set the limits of the dispute: the employer cannot rely on any others before the court.

```scene
notification NOT "Dismissal letter"
ENT -> NOT puis "≥ 2 working days"
focus NOT LIC
```
## Question: how much notice for Karim?
Karim has 6 years’ service; his collective agreement provides for nothing more favourable.

```scene
verification off
preavis PRE "Notice"
NOT -> PRE
focus PRE
```
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

```scene
verification on
focus PRE
```
## 6. The rights that arise
Karim is entitled to:
- **statutory severance pay** (at least 8 months’ service): 1/4 of a month’s salary per year up to 10 years → €2,800 × 6 × 1/4 = **€4,200**;
- **payment in lieu of untaken paid leave**;
- **unemployment benefit** (involuntary loss of employment);
- his **end-of-contract documents**.

```scene
indemnite_licenciement IL "Statutory severance pay"
indemnite_conges ICP "Untaken paid leave"
chomage ARE "ARE"
documents_fin DOC "Certificate, attestation, final statement"
LIC -> IL ICP ARE
PRE -> DOC
focus IL
```
## 7. Summary
```scene
selection LIC
```
| Step | Time limit | If missing |
|---|---|---|
| ✉️ Invitation letter | — | irregularity: ≤ 1 month’s salary |
| 💬 Preliminary meeting | ≥ 5 working days after the invitation | irregularity: ≤ 1 month’s salary |
| 📨 Reasoned letter | ≥ 2 working days after the meeting | dismissal without real and serious cause |
| 🎯 Real and serious cause | — | compensation according to the scale |
