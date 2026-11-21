# Ending the probationary period
> A free termination… provided there really is a probation, and without abuse.

During the probationary period, either party may end the contract **freely**, without reasons or a dismissal procedure. But this freedom has limits.

## 1. Lucas’s probation
**Lucas**, a technician, is hired on a CDI with a **2-month probationary period**, stipulated in his written contract.

```scene
employeur EMP "ÉlecPro"
salarie LUC "Lucas Ferreira" categorie=technicien
cdi CT "Lucas’s CDI"
EMP LUC -> CT
ecrit EC "Written contract"
EC -> CT
periode_essai ESS "2-month probation" duree=2
CT -> ESS
focus ESS
```
## 2. The employer ends the probation
After 6 weeks, the employer considers that Lucas lacks the expected skills and ends the probation.

The termination is free, but the employer gives **advance notice** depending on the time spent in the job: 24 hours under 8 days, 48 hours between 8 days and 1 month, **2 weeks** after 1 month, 1 month after 3 months.

```scene
rupture_essai RE "Termination of probation"
EMP -> RE
RE -> CT
focus RE
note RE "Advance notice missing"
```
## 3. Advance notice
Lucas is given 2 weeks’ notice. No severance pay, no notice period: only his paid leave and his end-of-contract documents.

```scene
delai_prevenance DP "2 weeks"
DP -> RE
indemnite_conges ICP "Paid leave"
RE -> ICP
focus RE
```
## Question: what if the probation had not been written into the contract?
Suppose Lucas’s contract makes no mention of a probationary period.

```scene
verification off
retirer ESS
focus RE
```
- [ ] Nothing changes: probation exists automatically
  A probationary period is never presumed.
- [x] The termination is treated as a dismissal
  Without a validly stipulated probation, the employer must follow the rules on dismissal.
- [ ] Lucas must repay his salary
  No provision says so.

### Answer
A probationary period is **never presumed**: it must appear in the letter of engagement or the contract. Without it, the termination is a **dismissal**, which requires a real and serious cause and a procedure. Here, with no procedure: dismissal without real and serious cause.

```scene
verification on
focus RE
```
## 5. An abusive termination
Even with a valid probation, the termination is **abusive** if it has **nothing to do with the employee’s skills** (economic reason, discrimination, reprisals…). The employee may then obtain damages; if it is discriminatory, it is void.

```scene
periode_essai ESS "2-month probation" duree=2
CT -> ESS
condition RE "Reason linked to skills" manque "abusive termination: damages"
focus RE
note RE "Termination “for economic reasons”?"
```
## 6. Summary
- Probation must be **in writing** and respect the **maximum lengths**.
- Termination is free, but with **advance notice**.
- It must be linked to the employee’s **skills**; otherwise it is abusive.

```scene
condition RE "Reason linked to skills" ok
selection RE
```