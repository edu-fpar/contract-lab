# Mutual termination (rupture conventionnelle)
> Mutual agreement, four steps, a minimum payment.

**Mutual termination (rupture conventionnelle)** allows the employer and an employee on a CDI to agree together to end the contract. It cannot be **imposed** by either party; it comes with safeguards.

## 1. Paul wants to leave, the company agrees
**Paul**, a developer for **5 years** (€3,000 gross), wants to set up his own business. His employer agrees to a mutual termination.

Five dotted badges: all the safeguards are missing.

```scene
employeur EMP "Pixel Factory"
salarie PAUL "Paul Nguyen" categorie=cadre anciennete=5 salaire=3000
cdi CT "Paul’s CDI"
EMP PAUL -> CT
rupture_conventionnelle RC "Mutual termination"
EMP PAUL -> RC
RC -> CT
focus RC
```
## 2. Meeting and signature
1. One or more **meetings**, at which each party may be accompanied;
2. **signing of the agreement**, which sets the termination date and the **specific termination payment**.

```scene
entretien_rc E1 "Meeting on 3 March"
convention_rc CONV "Agreement signed on 10 March"
RC -> E1
E1 -> CONV puis
focus E1 CONV
```
## 3. Withdrawal and approval
3. **15 calendar days** to withdraw, for each party;
4. **approval (homologation)** by the administration (DREETS), which has **15 working days**: its silence counts as approval.

```scene
retractation RET "Withdrawal period"
homologation HOM "Approval"
inspection DREETS "DREETS"
CONV -> RET puis "15 calendar days"
RET -> HOM puis
DREETS -> HOM lien "15 working days"
focus RET HOM
```
## Question: the agreement provides for a €3,000 payment. What will the administration do?
Paul has 5 years’ service and earns €3,000 gross a month.

```scene
verification off
indemnite_rc IRC "Specific payment" montant=3000
RC -> IRC
focus IRC
```
- [ ] Approve: the payment is freely negotiated
  It is negotiated… above a floor.
- [x] Refuse: the payment is below the statutory minimum
  It must be at least equal to statutory severance pay: €3,000 × 5 × 1/4 = €3,750.
- [ ] Approve, then Paul will claim the difference before the employment tribunal
  The administration checks the amount before approving.

### Answer
The specific payment must be **at least equal to statutory severance pay**: €3,000 × 5 years × 1/4 = **€3,750**. At €3,000, approval is refused. The parties sign a new agreement at **€4,000**.

```scene
verification on
note IRC "€3,000 < €3,750: refused"
```
## 5. Free consent
The last safeguard: **free consent**. A mutual termination signed under pressure or in a context of **harassment** is **void**: it then takes effect as a dismissal without real and serious cause.

Paul leaves of his own free will: all the badges are green. He will be entitled to **unemployment benefit**.

```scene
param IRC montant=4000
consentement_libre CL "Business start-up project"
CL -> RC
chomage ARE "ARE"
indemnite_conges ICP "Paid leave"
RC -> ARE ICP
focus RC
```
## 6. Summary
| Step | Safeguard |
|---|---|
| 🗨️ Meeting(s) | may be accompanied |
| 📑 Agreement | date, payment ≥ statutory severance |
| ↩️ Withdrawal | 15 calendar days |
| 🔏 Approval | 15 working days, silence = approval |
| 🕊️ Consent | otherwise void |

```scene
selection RC
```