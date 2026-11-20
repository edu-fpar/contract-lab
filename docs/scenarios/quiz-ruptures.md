# Quiz : quelle rupture, quels droits ?
> Huit questions rapides pour réviser les ruptures du contrat de travail.

Un quiz de révision : le canevas illustre chaque situation. Cliquez sur la réponse de la salle, puis révélez.

## Question : un CDD peut-il être rompu avant son terme parce que le salarié est trop lent ?
```scene
cdd CT "CDD de 6 mois"
rupture_anticipee_cdd RA "Rupture anticipée"
RA -> CT
insuffisance INS "Lenteur"
INS -> RA lien "motif invoqué"
verification off
focus RA
```
- [ ] Oui, c'est une insuffisance professionnelle
  Ce motif peut justifier un licenciement en CDI, pas une rupture anticipée de CDD.
- [x] Non, sauf accord, faute grave, force majeure, inaptitude ou embauche en CDI
  La liste des cas de rupture anticipée est limitative.

### Réponse
Le CDD ne peut être rompu avant son terme que dans des **cas limitativement énumérés**. Sinon, l'employeur doit des dommages-intérêts au moins égaux aux **rémunérations restant à courir** jusqu'au terme.

```scene
verification on
```
## Question : la rupture conventionnelle ouvre-t-elle droit au chômage ?
```scene
effacer
rupture_conventionnelle RC "Rupture conventionnelle"
chomage ARE "ARE"
RC -> ARE
focus RC ARE
verification off
```
- [x] Oui
  C'est une privation involontaire d'emploi au sens de l'assurance chômage.
- [ ] Non, c'est une rupture voulue par le salarié
  Elle est voulue par les deux parties ; le salarié est indemnisé.

### Réponse
La rupture conventionnelle ouvre droit à l'**allocation chômage** : c'est l'une de ses principales différences avec la démission.

```scene
verification on
```
## Question : faute grave : quelle indemnité reste due ?
```scene
effacer
licenciement_personnel LIC "Licenciement"
faute_grave FG "Faute grave"
FG -> LIC
indemnite_licenciement IL
indemnite_preavis IP
indemnite_conges ICP
LIC -> IL IP ICP
verification off
focus IL IP ICP
```
- [ ] L'indemnité de licenciement
  Supprimée par la faute grave.
- [ ] L'indemnité compensatrice de préavis
  Supprimée par la faute grave.
- [x] L'indemnité compensatrice de congés payés
  Toujours due, quel que soit le motif de la rupture.

### Réponse
Seule l'indemnité de **congés payés** survit à la faute grave (et même à la faute lourde).

```scene
verification on
```
## Question : un salarié de 5 mois d'ancienneté est licencié (sans faute grave). A-t-il droit à l'indemnité légale ?
```scene
effacer
salarie S "Salarié" anciennete=0.42 salaire=2000
cdi CT "CDI"
S -> CT
licenciement_personnel LIC "Licenciement"
LIC -> CT
indemnite_licenciement IL
LIC -> IL
verification off
focus IL
```
- [ ] Oui, dès le premier jour
  Il faut une ancienneté minimale.
- [x] Non, il faut au moins 8 mois d'ancienneté
  En dessous, seule une convention plus favorable peut la prévoir.
- [ ] Oui, s'il a plus de 3 mois
  Le seuil légal est de 8 mois.

### Réponse
L'indemnité légale de licenciement suppose **8 mois d'ancienneté ininterrompus**.

```scene
verification on
```
## Question : quel délai minimum entre la convocation et l'entretien préalable ?
```scene
effacer
convocation CONV
entretien_prealable ENT
CONV -> ENT puis "?"
focus CONV ENT
```
- [ ] 2 jours ouvrables
  C'est le délai minimum entre l'entretien et l'envoi de la lettre de licenciement.
- [x] 5 jours ouvrables
  À compter de la présentation de la lettre de convocation.
- [ ] 15 jours calendaires
  C'est le délai de rétractation de la rupture conventionnelle.

### Réponse
**5 jours ouvrables** après la présentation de la convocation ; puis **2 jours ouvrables** au moins entre l'entretien et la lettre de licenciement.

```scene
retirer CONV -> ENT
CONV -> ENT puis "≥ 5 jours ouvrables"
```
## Question : un salarié abandonne son poste et ne répond pas à la mise en demeure. Il est…
```scene
effacer
abandon_poste AB "Abandon de poste"
mise_en_demeure MED
AB -> MED
focus AB
verification off
```
- [ ] Licencié pour faute grave
  C'était la pratique avant 2023 ; l'employeur peut toujours choisir cette voie, mais la loi a créé une présomption.
- [x] Présumé démissionnaire
  Depuis 2023 (art. L1237-1-1 C. trav.), sauf motif légitime.
- [ ] En rupture conventionnelle
  Elle exige l'accord des deux parties.

### Réponse
Il est **présumé démissionnaire** : pas d'indemnité de licenciement et pas d'allocation chômage. Il peut contester devant le conseil de prud'hommes, qui statue rapidement.

```scene
verification on
```
## Question : qui homologue la rupture conventionnelle ?
```scene
effacer
rupture_conventionnelle RC
homologation HOM
RC -> HOM
focus HOM
```
- [ ] Le conseil de prud'hommes
  Il juge les litiges, il n'homologue pas.
- [x] L'administration du travail (DREETS)
  Dans un délai de 15 jours ouvrables ; son silence vaut homologation.
- [ ] Le CSE
  Il n'intervient pas dans une rupture conventionnelle individuelle (sauf salarié protégé : autorisation de l'inspecteur du travail).

### Réponse
La **DREETS** homologue (silence de 15 jours ouvrables = homologation). Pour un **salarié protégé**, il faut une **autorisation** de l'inspecteur du travail.

```scene
inspection DR "DREETS"
DR -> HOM lien "homologue"
```
## Question : la prise d'acte n'est pas justifiée. Elle produit les effets…
```scene
effacer
prise_acte PA "Prise d'acte"
verification off
focus PA
```
- [ ] D'un licenciement sans cause réelle et sérieuse
  C'est le cas quand les manquements de l'employeur sont suffisamment graves.
- [x] D'une démission
  Le salarié a rompu, sans raison suffisante.
- [ ] D'une rupture conventionnelle
  Elle suppose un accord et une homologation.

### Réponse
Prise d'acte **justifiée** : licenciement sans cause réelle et sérieuse (voire nul). **Non justifiée** : **démission**.

```scene
verification on
note PA "Pas de manquement grave : démission"
```