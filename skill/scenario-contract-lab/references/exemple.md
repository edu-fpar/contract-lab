# La clause de non-concurrence
> Cinq garde-fous cumulatifs : sans l'un d'eux, la clause est nulle.

Une clause de non-concurrence interdit au salarié, **après la rupture**, d'exercer une activité concurrente. Elle restreint la **liberté du travail** : la jurisprudence l'encadre strictement (Cass. soc., 10 juillet 2002).

Regardez les **pastilles** sous la clause : chaque garde-fou manquant est en pointillés.

## 1. Le contrat de Karim, commercial
Karim est commercial chez **Optique Durand**, à Nantes. Son contrat contient une clause qui lui interdit de travailler pour un concurrent après son départ.

Telle quelle, la clause est **nulle** : aucun de ses cinq garde-fous n'est présent.

```scene
employeur EMP "Optique Durand"
salarie KAR "Karim Benali" categorie=employe anciennete=3 salaire=2400
cdi CT "CDI de Karim"
EMP KAR -> CT
fonctions FCT "Commercial terrain"
non_concurrence NC "Non-concurrence"
CT -> FCT NC
focus NC
note NC "5 pastilles en pointillés : 5 garde-fous manquants"
```
## 2. Un intérêt légitime à protéger
Premier garde-fou : la clause doit être **indispensable à la protection des intérêts légitimes** de l'entreprise. Karim connaît la clientèle et les tarifs : l'intérêt est réel.

Pour un agent d'entretien sans contact avec les clients, la même clause serait nulle.

```scene
interet_legitime IL "Clientèle et tarifs"
IL -> NC
focus IL NC
```
## 3. Limitée dans le temps et dans l'espace
La clause doit être **limitée dans le temps** et **dans l'espace**.

Ici : **1 an** après le départ, en **Loire-Atlantique**. Une interdiction « pour toujours » ou « dans toute la France » pour un commercial régional serait disproportionnée.

```scene
limite_duree LD "1 an"
limite_geo LG "Loire-Atlantique"
LD LG -> NC
focus LD LG
```
## 4. Les spécificités de l'emploi
La clause doit **tenir compte des spécificités de l'emploi** : Karim doit pouvoir retrouver un travail conforme à sa formation et à son expérience. On limite donc l'interdiction à la **vente de lunettes en magasin concurrent** — il peut travailler dans un autre secteur commercial.

Il reste un garde-fou manquant…

```scene
specificites SP "Vente d'optique seulement"
SP -> NC
focus NC
```
## Question : quel est le garde-fou manquant ?
Quatre pastilles sont vertes. La clause est toujours nulle.

```scene
verification off
focus NC
```
- [ ] L'accord écrit de Karim
  Il a signé le contrat ; ce n'est pas l'un des cinq critères jurisprudentiels.
- [x] Une contrepartie financière
  Depuis 2002, une clause de non-concurrence sans contrepartie financière est nulle.
- [ ] L'homologation par l'inspection du travail
  Aucune homologation n'est prévue pour cette clause.
- [ ] Une durée inférieure à 6 mois
  Il n'y a pas de durée maximale légale : la durée doit être raisonnable.

### Réponse
Le cinquième garde-fou est la **contrepartie financière**, versée **après la rupture**, quel que soit le mode de rupture (démission, licenciement, même pour faute grave). Elle ne doit pas être dérisoire.

La carte passe au vert : la clause est valable.

```scene
verification on
contrepartie CP "30 % du salaire pendant 1 an"
CP -> NC
focus NC CP
```
## 6. Et la clause de confidentialité ?
Le contrat contient aussi une **clause de confidentialité** : Karim ne doit pas divulguer les fichiers clients ni les marges.

Aucune pastille : elle n'exige **pas de contrepartie**. Elle n'empêche pas Karim de travailler chez un concurrent ; elle lui interdit seulement de divulguer des informations.

> 💡 Ne confondez pas : la **non-concurrence** empêche de travailler (contrepartie obligatoire), la **confidentialité** empêche de divulguer (pas de contrepartie).

```scene
confidentialite CONF "Confidentialité"
CT -> CONF
focus CONF NC
```
## 7. Synthèse
| Garde-fou | Ici |
|---|---|
| 🏰 Intérêt légitime de l'entreprise | clientèle et tarifs |
| ⌛ Limite dans le temps | 1 an |
| 🗺️ Limite dans l'espace | Loire-Atlantique |
| 🧩 Spécificités de l'emploi | vente d'optique seulement |
| 💰 Contrepartie financière | 30 % du salaire pendant 1 an |

Les conditions sont **cumulatives**. Une clause nulle ne s'impose pas au salarié ; s'il l'a respectée, il peut demander des dommages-intérêts.

```scene
selection NC
```