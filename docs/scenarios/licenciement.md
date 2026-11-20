# Le licenciement pour motif personnel
> Une cause réelle et sérieuse, une procédure en trois temps, des indemnités.

L'employeur peut rompre le CDI, mais il doit le **justifier** (cause réelle et sérieuse) et respecter une **procédure**. Chaque étape a son délai ; chaque manquement a sa sanction.

## 1. Le dossier de Karim
Karim, comptable depuis **6 ans** (2 800 € brut par mois), accumule les **retards** malgré deux avertissements. Son employeur envisage de le licencier.

```scene
employeur EMP "Transports Morel"
salarie KAR "Karim Haddad" categorie=employe anciennete=6 salaire=2800
cdi CT "CDI de Karim"
EMP KAR -> CT
licenciement_personnel LIC "Licenciement de Karim"
EMP -> LIC
LIC -> CT
focus LIC
```
## 2. Une cause réelle et sérieuse
Le licenciement doit reposer sur une cause **réelle** (des faits objectifs, exacts, vérifiables) et **sérieuse** (assez importante pour justifier la rupture).

Des retards répétés malgré des avertissements constituent une **faute sérieuse**. Sans elle, le licenciement serait **sans cause réelle et sérieuse** : indemnité selon le barème.

```scene
faute_simple F "Retards répétés"
F -> LIC
focus F LIC
```
## 3. La convocation et l'entretien préalable
1. **Convocation** par lettre recommandée ou remise en main propre : objet, date, heure, lieu de l'entretien, possibilité de se faire assister.
2. **Entretien préalable**, au moins **5 jours ouvrables** après la présentation de la lettre : l'employeur expose les motifs, Karim s'explique.

Une procédure irrégulière ne rend pas le licenciement injustifié, mais ouvre droit à une indemnité (au plus un mois de salaire).

```scene
convocation CONV "Convocation (LRAR)"
entretien_prealable ENT "Entretien préalable"
LIC -> CONV
CONV -> ENT puis "≥ 5 jours ouvrables"
focus CONV ENT
```
## 4. La lettre de licenciement
Au moins **2 jours ouvrables** après l'entretien, l'employeur envoie la **lettre de licenciement**, en recommandé avec avis de réception. Elle énonce les **motifs**, qui fixent les limites du litige : l'employeur ne pourra pas en invoquer d'autres devant le juge.

```scene
notification NOT "Lettre de licenciement"
ENT -> NOT puis "≥ 2 jours ouvrables"
focus NOT LIC
```
## Question : quelle durée de préavis pour Karim ?
Karim a 6 ans d'ancienneté ; sa convention collective ne prévoit rien de plus favorable.

```scene
verification off
preavis PRE "Préavis"
NOT -> PRE
focus PRE
```
- [ ] Aucun : la faute le prive de préavis
  Seules la faute grave et la faute lourde privent du préavis.
- [ ] 1 mois
  C'est la durée entre 6 mois et 2 ans d'ancienneté.
- [x] 2 mois
  À partir de 2 ans d'ancienneté, le préavis légal est de 2 mois.
- [ ] 3 mois
  Ce peut être le cas par convention (souvent pour les cadres), pas selon la loi.

### Réponse
Préavis légal : **1 mois** de 6 mois à 2 ans d'ancienneté, **2 mois** au-delà (sauf convention, usage ou contrat plus favorable). Karim travaille donc encore 2 mois ; s'il en est dispensé par l'employeur, il perçoit une **indemnité compensatrice de préavis**.

```scene
verification on
focus PRE
```
## 6. Les droits ouverts
Karim a droit à :
- l'**indemnité légale de licenciement** (au moins 8 mois d'ancienneté) : 1/4 de mois de salaire par année jusqu'à 10 ans → 2 800 € × 6 × 1/4 = **4 200 €** ;
- l'**indemnité compensatrice de congés payés** non pris ;
- l'**allocation chômage** (privation involontaire d'emploi) ;
- ses **documents de fin de contrat**.

```scene
indemnite_licenciement IL "Indemnité légale"
indemnite_conges ICP "Congés payés non pris"
chomage ARE "ARE"
documents_fin DOC "Certificat, attestation, solde"
LIC -> IL ICP ARE
PRE -> DOC
focus IL
```
## 7. Synthèse
```scene
selection LIC
```
| Étape | Délai | Si elle manque |
|---|---|---|
| ✉️ Convocation | — | irrégularité : ≤ 1 mois de salaire |
| 💬 Entretien préalable | ≥ 5 jours ouvrables après la convocation | irrégularité : ≤ 1 mois de salaire |
| 📨 Lettre motivée | ≥ 2 jours ouvrables après l'entretien | licenciement sans cause réelle et sérieuse |
| 🎯 Cause réelle et sérieuse | — | indemnité selon le barème |
