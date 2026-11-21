# The non-compete clause
> Five cumulative safeguards: without any one of them, the clause is void.

A non-compete clause prohibits the employee, **after the contract ends**, from engaging in a competing activity. It restricts the **freedom to work**: case law regulates it strictly (Cass. soc., 10 July 2002).

Look at the **badges** under the clause: each missing safeguard is dotted.

## 1. Karim’s contract, sales representative
Karim is a sales representative at **Optique Durand**, in Nantes. His contract contains a clause preventing him from working for a competitor after he leaves.

As it stands, the clause is **void**: none of its five safeguards is present.

```scene
employeur EMP "Optique Durand"
salarie KAR "Karim Benali" categorie=employe anciennete=3 salaire=2400
cdi CT "Karim’s CDI"
EMP KAR -> CT
fonctions FCT "Field sales representative"
non_concurrence NC "Non-compete"
CT -> FCT NC
focus NC
note NC "5 dotted badges: 5 missing safeguards"
```
## 2. A legitimate interest to protect
First safeguard: the clause must be **essential to protect the legitimate interests** of the company. Karim knows the clientele and the prices: the interest is genuine.

For a cleaner with no client contact, the same clause would be void.

```scene
interet_legitime IL "Clientele and prices"
IL -> NC
focus IL NC
```
## 3. Limited in time and in space
The clause must be **limited in time** and **in space**.

Here: **1 year** after leaving, in **Loire-Atlantique**. A ban “forever” or “throughout France” for a regional sales representative would be disproportionate.

```scene
limite_duree LD "1 year"
limite_geo LG "Loire-Atlantique"
LD LG -> NC
focus LD LG
```
## 4. The specific features of the job
The clause must **take account of the specific features of the job**: Karim must be able to find work in line with his training and experience. The ban is therefore limited to **selling glasses in a competing shop** — he can work in another sales sector.

One safeguard is still missing…

```scene
specificites SP "Optical sales only"
SP -> NC
focus NC
```
## Question: which safeguard is missing?
Four badges are green. The clause is still void.

```scene
verification off
focus NC
```
- [ ] Karim’s written consent
  He signed the contract; this is not one of the five case-law criteria.
- [x] Financial compensation
  Since 2002, a non-compete clause without financial compensation is void.
- [ ] Approval by the labour inspectorate
  No approval is required for this clause.
- [ ] A duration of less than 6 months
  There is no statutory maximum: the duration must be reasonable.

### Answer
The fifth safeguard is **financial compensation**, paid **after the contract ends**, however it ends (resignation, dismissal, even for gross misconduct). It must not be derisory.

The card turns green: the clause is valid.

```scene
verification on
contrepartie CP "30% of salary for 1 year"
CP -> NC
focus NC CP
```
## 6. And the confidentiality clause?
The contract also contains a **confidentiality clause**: Karim must not disclose client files or margins.

No badges: it requires **no compensation**. It does not prevent Karim from working for a competitor; it only forbids him to disclose information.

> 💡 Do not confuse them: **non-compete** prevents working (compensation mandatory), **confidentiality** prevents disclosing (no compensation).

```scene
confidentialite CONF "Confidentiality"
CT -> CONF
focus CONF NC
```
## 7. Summary
| Safeguard | Here |
|---|---|
| 🏰 Company’s legitimate interest | clientele and prices |
| ⌛ Time limit | 1 year |
| 🗺️ Geographical limit | Loire-Atlantique |
| 🧩 Specific features of the job | optical sales only |
| 💰 Financial compensation | 30% of salary for 1 year |

The conditions are **cumulative**. A void clause is not binding on the employee; if they complied with it, they may claim damages.

```scene
selection NC
```