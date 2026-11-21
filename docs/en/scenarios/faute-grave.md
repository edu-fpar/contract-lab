# Gross misconduct, wilful misconduct
> What the seriousness of the misconduct takes away from the employee… and what it does not.

The classification of the misconduct changes everything: **misconduct (faute sérieuse)**, **gross misconduct (faute grave)** and **wilful misconduct (faute lourde)** do not have the same effects on notice and payments. Watch the ⊘ symbol: it flags neutralised rights.

## 1. A dismissal for misconduct
**Julie**, a sales assistant for 4 years (€2,100 gross), is dismissed for repeated till errors: **misconduct (faute sérieuse)**. Regular procedure, notice, severance pay: everything is due.

```scene
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
```
## Question: the facts turn out to be theft. What does Julie lose?
The investigation reveals that Julie was taking money from the till. The employer treats it as **gross misconduct**.

```scene
verification off
type F faute_grave
renommer F "Theft from the till"
focus F
```
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

```scene
verification on
focus PRE IL ICP
```
## 3. Precautionary suspension
To remove Julie immediately during the procedure, the employer imposes a **precautionary suspension (mise à pied conservatoire)**. If gross misconduct is upheld, this period is unpaid.

Watch the **time limit**: gross misconduct requires the procedure to be started within a short time after the facts become known; disciplinary facts become time-barred after **2 months**.

```scene
mise_a_pied MAP "Precautionary suspension"
retirer LIC -> CONV
LIC -> MAP
MAP -> CONV puis
focus MAP
```
## 4. And wilful misconduct?
Had Julie acted with **intent to harm** the employer (for example by sabotaging the stock before leaving for a competitor), the misconduct would be **wilful (faute lourde)**.

Same effects as gross misconduct, and in addition the employer may hold Julie **financially liable**. Since 2016, the **paid leave** payment remains due, even for wilful misconduct.

```scene
type F faute_lourde
renommer F "Sabotage of the stock"
focus F ICP
note ICP "Always due, even for wilful misconduct"
```
## 5. Summary
| Misconduct | Notice | Severance pay | Paid leave | Financial liability |
|---|---|---|---|---|
| 🟠 Misconduct (sérieuse) | ✔ | ✔ | ✔ | ✘ |
| 🔥 Gross (grave) | ✘ | ✘ | ✔ | ✘ |
| ☠️ Wilful (lourde) | ✘ | ✘ | ✔ | ✔ |

```scene
type F faute_grave
renommer F "Theft from the till"
selection IL
```