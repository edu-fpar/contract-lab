/* ============================================================
 * Bibliothèque de scénarios intégrés (format markdown).
 * Pour ajouter un scénario : ajoutez un objet { id, md } au tableau.
 * (Dans ce fichier, les blocs de commandes utilisent ~~~scene au lieu
 *  de ```scene pour éviter les accents graves dans les chaînes JS.)
 * ============================================================ */
window.P = window.P || {};
P.LIBRARY = [

{ id: 'construire-contrat', md: `# Construire un contrat de travail
> Les parties, le socle du contrat, la période d'essai : un CDI se monte pièce par pièce.

On assemble le contrat de **Léa Martin**, embauchée comme responsable marketing par la société **Bleu Ciel**. Chaque clause est une carte ; le cadre « 📄 » délimite ce que contient le contrat.

Les verdicts s'affichent sur les cartes : ✅ valide, ⚠️ à risque, ⛔ nulle. Les **pastilles** sous une carte sont ses conditions de validité.

## 1. Deux parties et un lien de subordination
Le contrat de travail réunit trois éléments : une **prestation de travail**, une **rémunération** et un **lien de subordination** — le pouvoir de l'employeur de donner des ordres, d'en contrôler l'exécution et de sanctionner les manquements.

Peu importe le nom que les parties donnent à leur relation : c'est la réalité du lien de subordination qui compte.

~~~scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin" categorie=cadre anciennete=0 salaire=3400
focus EMP LEA
~~~

## 2. Un CDI, forme normale du contrat
Le **CDI** est la forme normale et générale de la relation de travail. Les deux parties le **signent**.

Pour un CDI à temps plein, l'écrit n'est pas obligatoire… mais l'employeur doit remettre au salarié les **informations principales** de la relation de travail. En pratique, on écrit toujours.

~~~scene
cdi CT "CDI de Léa"
EMP LEA -> CT
ecrit EC "Contrat écrit et signé"
EC -> CT
focus CT
~~~

## 3. Le socle du contrat
Quatre éléments forment le **socle contractuel** :

| Élément | Ce qu'on ne peut pas faire sans l'accord de Léa |
|---|---|
| 💶 Rémunération | la modifier, même de façon minime |
| 🧑‍💼 Fonctions | changer substantiellement ses fonctions |
| ⏱️ Durée du travail | modifier la durée contractuelle |
| 📍 Lieu de travail | la muter hors du secteur géographique |

> 💡 Modifier un élément du contrat exige l'**accord** du salarié. Un simple **changement des conditions de travail** (horaires, tâches de même qualification) relève du pouvoir de direction.

~~~scene
remuneration REM "3 400 € brut / mois"
fonctions FCT "Responsable marketing"
duree_travail DUR "35 h / semaine"
lieu_travail LIEU "Lyon"
CT -> REM FCT DUR LIEU
focus REM FCT DUR LIEU
~~~

## 4. Une période d'essai… trop longue
Le contrat prévoit une **période d'essai de 5 mois**. Elle est bien écrite (la pastille ✍️ est verte : l'écrit du contrat compte pour la clause).

Mais Léa est **cadre** : en CDI, la durée maximale légale est de **4 mois** (2 mois pour les ouvriers et employés, 3 pour les agents de maîtrise et techniciens). L'outil le signale en rouge.

~~~scene
periode_essai ESS "Période d'essai" duree=5
CT -> ESS
focus ESS
note ESS "5 mois > 4 mois : durée excessive"
~~~

## Question : que faut-il faire pour garder 5 mois d'essai ?
Le directeur des ressources humaines tient à ses 5 mois d'essai.

~~~scene
focus ESS
~~~

- [ ] Rien : Léa a signé, la clause s'applique
  La durée maximale est d'ordre public : la signature ne la rend pas valable.
- [ ] Prévoir 4 mois, renouvelables une fois si le contrat le dit
  C'est presque ça : le contrat ne suffit pas, il faut aussi un accord de branche étendu et l'accord exprès de Léa.
- [x] Prévoir 4 mois, renouvelables si un accord de branche étendu et le contrat le prévoient, avec l'accord exprès de Léa
  Les trois conditions sont cumulatives ; la durée totale ne dépasse pas 8 mois pour un cadre.
- [ ] Remplacer l'essai par un CDD de 5 mois
  Un CDD ne peut servir à « tester » un salarié : il serait requalifié en CDI.

### Réponse
On ramène l'essai à **4 mois** et on prévoit un **renouvellement**, possible une seule fois si :
- un **accord de branche étendu** le prévoit ;
- le **contrat** le stipule ;
- le salarié donne son **accord exprès**, avant la fin de la période initiale.

Durée totale maximale pour un cadre : **8 mois**, renouvellement compris.

~~~scene
param ESS duree=4
renouvellement_essai REN "Renouvellement : 5 mois au total" duree=5
CT -> REN
accord_collectif ACC "Accord de branche étendu"
accord_salarie ACS "Accord de Léa au 3e mois"
ACC ACS -> REN
focus ESS REN
~~~

## 6. Synthèse
Le contrat de Léa est complet et tout est au vert.

À retenir :
- trois critères du contrat de travail : **travail**, **rémunération**, **subordination** ;
- le **socle** du contrat ne se modifie qu'avec l'accord du salarié ;
- la **période d'essai** ne se présume pas (écrit) et ses durées maximales sont d'ordre public ;
- le **renouvellement** exige accord de branche étendu + contrat + accord exprès du salarié.

Cliquez sur une carte pour voir ses conditions de validité.

~~~scene
selection REN
~~~
` },

{ id: 'non-concurrence', md: `# La clause de non-concurrence
> Cinq garde-fous cumulatifs : sans l'un d'eux, la clause est nulle.

Une clause de non-concurrence interdit au salarié, **après la rupture**, d'exercer une activité concurrente. Elle restreint la **liberté du travail** : la jurisprudence l'encadre strictement (Cass. soc., 10 juillet 2002).

Regardez les **pastilles** sous la clause : chaque garde-fou manquant est en pointillés.

## 1. Le contrat de Karim, commercial
Karim est commercial chez **Optique Durand**, à Nantes. Son contrat contient une clause qui lui interdit de travailler pour un concurrent après son départ.

Telle quelle, la clause est **nulle** : aucun de ses cinq garde-fous n'est présent.

~~~scene
employeur EMP "Optique Durand"
salarie KAR "Karim Benali" categorie=employe anciennete=3 salaire=2400
cdi CT "CDI de Karim"
EMP KAR -> CT
fonctions FCT "Commercial terrain"
non_concurrence NC "Non-concurrence"
CT -> FCT NC
focus NC
note NC "5 pastilles en pointillés : 5 garde-fous manquants"
~~~

## 2. Un intérêt légitime à protéger
Premier garde-fou : la clause doit être **indispensable à la protection des intérêts légitimes** de l'entreprise. Karim connaît la clientèle et les tarifs : l'intérêt est réel.

Pour un agent d'entretien sans contact avec les clients, la même clause serait nulle.

~~~scene
interet_legitime IL "Clientèle et tarifs"
IL -> NC
focus IL NC
~~~

## 3. Limitée dans le temps et dans l'espace
La clause doit être **limitée dans le temps** et **dans l'espace**.

Ici : **1 an** après le départ, en **Loire-Atlantique**. Une interdiction « pour toujours » ou « dans toute la France » pour un commercial régional serait disproportionnée.

~~~scene
limite_duree LD "1 an"
limite_geo LG "Loire-Atlantique"
LD LG -> NC
focus LD LG
~~~

## 4. Les spécificités de l'emploi
La clause doit **tenir compte des spécificités de l'emploi** : Karim doit pouvoir retrouver un travail conforme à sa formation et à son expérience. On limite donc l'interdiction à la **vente de lunettes en magasin concurrent** — il peut travailler dans un autre secteur commercial.

Il reste un garde-fou manquant…

~~~scene
specificites SP "Vente d'optique seulement"
SP -> NC
focus NC
~~~

## Question : quel est le garde-fou manquant ?
Quatre pastilles sont vertes. La clause est toujours nulle.

~~~scene
verification off
focus NC
~~~

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

~~~scene
verification on
contrepartie CP "30 % du salaire pendant 1 an"
CP -> NC
focus NC CP
~~~

## 6. Et la clause de confidentialité ?
Le contrat contient aussi une **clause de confidentialité** : Karim ne doit pas divulguer les fichiers clients ni les marges.

Aucune pastille : elle n'exige **pas de contrepartie**. Elle n'empêche pas Karim de travailler chez un concurrent ; elle lui interdit seulement de divulguer des informations.

> 💡 Ne confondez pas : la **non-concurrence** empêche de travailler (contrepartie obligatoire), la **confidentialité** empêche de divulguer (pas de contrepartie).

~~~scene
confidentialite CONF "Confidentialité"
CT -> CONF
focus CONF NC
~~~

## 7. Synthèse
| Garde-fou | Ici |
|---|---|
| 🏰 Intérêt légitime de l'entreprise | clientèle et tarifs |
| ⌛ Limite dans le temps | 1 an |
| 🗺️ Limite dans l'espace | Loire-Atlantique |
| 🧩 Spécificités de l'emploi | vente d'optique seulement |
| 💰 Contrepartie financière | 30 % du salaire pendant 1 an |

Les conditions sont **cumulatives**. Une clause nulle ne s'impose pas au salarié ; s'il l'a respectée, il peut demander des dommages-intérêts.

~~~scene
selection NC
~~~
` },

{ id: 'clauses-encadrees', md: `# Mobilité, exclusivité, dédit-formation
> Trois clauses utiles à l'employeur, trois jeux de garde-fous, et des incompatibilités.

Certaines clauses donnent à l'employeur un pouvoir sur la vie du salarié. Le droit les admet, mais **sous conditions** : sans elles, la clause est nulle ou inopposable. Et certaines clauses deviennent **incompatibles** avec d'autres éléments du dossier (⊘).

## 1. La clause de mobilité
**Sofia**, technicienne de maintenance, signe un CDI avec une **clause de mobilité**. L'employeur pourra la muter… mais où ?

Une clause de mobilité doit **définir précisément sa zone géographique**, que l'employeur ne peut pas étendre seul. « Tout lieu où l'entreprise exerce ou exercera une activité » : nulle.

~~~scene
employeur EMP "Hydro Services"
salarie SOF "Sofia Lemaire" categorie=technicien anciennete=2 salaire=2600
cdi CT "CDI de Sofia"
EMP SOF -> CT
mobilite MOB "Mobilité"
CT -> MOB
focus MOB
~~~

## 2. Une zone précise… et une mise en œuvre loyale
On précise : « **Bretagne et Pays de la Loire** ». La clause est maintenant valable (pastille 📌 verte).

Les deux autres pastilles sont orange : même valable, la clause doit être **mise en œuvre de bonne foi**, dans l'**intérêt de l'entreprise** et avec un **délai de prévenance** suffisant. Une mutation à 300 km annoncée la veille serait abusive.

> 💡 Le refus d'une mutation conforme à une clause de mobilité valable peut justifier un licenciement.

~~~scene
zone_definie ZD "Bretagne + Pays de la Loire"
ZD -> MOB
focus MOB ZD
~~~

## 3. Une mise en œuvre régulière
L'employeur explique la mutation (ouverture d'un site à Rennes) et prévient Sofia un mois à l'avance : tout est vert.

~~~scene
interet_legitime IL "Ouverture d'un site à Rennes"
delai_prevenance DP "1 mois de prévenance"
IL DP -> MOB
focus MOB IL DP
~~~

## 4. L'exclusivité… pour une salariée à temps partiel
Le contrat de **Sofia** devient un **temps partiel** (24 h par semaine) et l'employeur ajoute une **clause d'exclusivité** : aucune autre activité professionnelle.

Le symbole ⊘ apparaît : une salariée à temps partiel doit pouvoir **compléter ses revenus**. La clause d'exclusivité lui est, en principe, **inopposable**.

~~~scene
temps_partiel TP "Temps partiel 24 h"
ecrit EC "Avenant écrit"
repartition REP "Lundi au mercredi"
CT -> TP
EC REP -> TP
exclusivite EXC "Exclusivité"
CT -> EXC
interet_legitime IE "Savoir-faire technique"
proportionnalite PE "Justifiée par la tâche"
IE PE -> EXC
focus EXC TP
note EXC "Temps partiel : en principe inopposable"
~~~

## 5. Le dédit-formation
L'employeur finance à Sofia une **habilitation électrique haute tension** de 6 000 €. En échange, une clause de **dédit-formation** : si elle démissionne dans les 2 ans, elle rembourse une partie des frais.

La clause est licite si :
- elle est **écrite avant** la formation (date, nature, durée, coût réel, modalités de remboursement) ;
- les frais **dépassent** ce que la loi ou la convention collective impose à l'employeur ;
- le remboursement est **proportionné** (et dégressif dans le temps).

~~~scene
retirer EXC IE PE
dedit_formation DF "Dédit-formation 2 ans"
CT -> DF
ecrit EDF "Convention signée avant la formation"
formation_couteuse FC "6 000 € de frais réels"
proportionnalite PR "Remboursement dégressif"
EDF FC PR -> DF
focus DF
~~~

## Question : Sofia est licenciée un an plus tard. Doit-elle rembourser ?
L'employeur la licencie pour motif économique et lui réclame 3 000 € au titre du dédit-formation.

~~~scene
verification off
licenciement_eco LE "Licenciement économique"
EMP -> LE
LE -> CT
focus DF LE
~~~

- [ ] Oui, la clause est valable
  Elle est valable… mais elle ne joue que si le salarié part de lui-même.
- [x] Non, la rupture n'est pas de son fait
  Le dédit-formation ne s'applique pas quand c'est l'employeur qui rompt le contrat.
- [ ] Oui, mais seulement la moitié
  La proportionnalité règle le montant quand la clause s'applique ; ici, elle ne s'applique pas.

### Réponse
Le dédit-formation compense un **départ volontaire** du salarié. En cas de **licenciement**, la rupture n'est pas le fait du salarié : la clause est **inapplicable** (⊘).

~~~scene
verification on
focus DF LE
~~~

## 7. Synthèse
| Clause | Garde-fous | Incompatible avec |
|---|---|---|
| 🧳 Mobilité | zone précise ; mise en œuvre loyale, délai de prévenance | — |
| 🔒 Exclusivité | intérêt légitime, justifiée et proportionnée | ⊘ temps partiel |
| 🎒 Dédit-formation | écrit préalable, frais au-delà des obligations, montant proportionné | ⊘ licenciement |

~~~scene
vue CT
~~~
` },

{ id: 'cdd', md: `# Le CDD, un contrat d'exception
> Écrit, motif, terme : sans eux, le CDD devient un CDI.

Le **CDD** ne peut avoir ni pour objet ni pour effet de pourvoir durablement un emploi lié à l'activité normale et permanente de l'entreprise. Il est donc **strictement encadré** ; la sanction est la **requalification en CDI**.

## 1. Un CDD conclu à la va-vite
Le magasin **Jardin Malin** embauche **Tom** pour la saison de printemps. Personne n'a rédigé de contrat.

Trois pastilles rouges : sans écrit, sans motif, sans terme, le contrat est **requalifié en CDI**.

~~~scene
employeur EMP "Jardin Malin"
salarie TOM "Tom Girard" categorie=employe anciennete=0.5 salaire=1900
cdd CT "CDD de Tom"
EMP TOM -> CT
focus CT
note CT "Sans écrit : CDI !"
~~~

## 2. Écrit, motif précis, terme
On régularise :
- un **contrat écrit**, transmis au salarié ;
- un **motif précis** : accroissement temporaire d'activité (saison de printemps) ;
- un **terme précis** : du 1er mars au 30 juin.

~~~scene
ecrit EC "Contrat écrit"
motif_recours MR "Accroissement saisonnier"
terme TE "1er mars – 30 juin"
EC MR TE -> CT
param CT duree=4
focus CT
~~~

## Question : le magasin renouvelle le CDD jusqu'à atteindre 20 mois. Que risque-t-il ?
Après la saison, le magasin renouvelle, puis renouvelle encore : Tom travaille 20 mois en CDD.

~~~scene
verification off
param CT duree=20
focus CT
~~~

- [ ] Rien, tant que chaque renouvellement est écrit
  Les renouvellements écrits ne permettent pas de dépasser la durée maximale.
- [x] La requalification du contrat en CDI
  Dans le cas général, la durée maximale est de 18 mois, renouvellements compris.
- [ ] Une simple amende
  La sanction civile est la requalification, demandée devant le conseil de prud'hommes.

### Réponse
Durée maximale d'un CDD, renouvellements compris : **18 mois** dans le cas général (avec des exceptions et des aménagements par accord de branche). Au-delà, Tom peut demander la **requalification en CDI**, avec une indemnité de requalification d'au moins un mois de salaire.

~~~scene
verification on
note CT "20 mois > 18 mois"
~~~

## 4. Fin du CDD et prime de précarité
On revient à un CDD de 4 mois. À son terme, le contrat prend fin **de plein droit**, sans procédure.

Tom perçoit l'**indemnité de fin de contrat** (« prime de précarité ») : **10 %** de la rémunération brute totale. Ici : 4 × 1 900 € = 7 600 € → **760 €**.

~~~scene
param CT duree=4
fin_cdd FIN "Terme du CDD"
FIN -> CT
indemnite_precarite PREC "Prime de précarité" remuneration_totale=7600
indemnite_conges ICP "Congés non pris"
FIN -> PREC ICP
focus FIN PREC
~~~

## 5. Quand la prime n'est pas due
Si la relation **se poursuit en CDI**, la prime n'est pas due : elle compense la précarité, qui disparaît.

Elle n'est pas due non plus en cas de **faute grave**, pour un CDD saisonnier ou d'usage, ou pour un étudiant pendant ses vacances.

~~~scene
cdi CDI "CDI proposé et accepté"
CDI -> FIN lien "suivi de"
focus PREC CDI
note PREC "⊘ La relation continue en CDI"
~~~

## 6. Synthèse
| Exigence | Sanction si elle manque |
|---|---|
| ✍️ Écrit | requalification en CDI |
| 📝 Motif précis | requalification en CDI |
| 📅 Terme précis | requalification en CDI |
| ⏳ 18 mois maximum (cas général) | requalification en CDI |

À la fin : **prime de précarité** de 10 %, sauf exceptions.

~~~scene
retirer CDI
selection CT
~~~
` },

{ id: 'temps-de-travail', md: `# Forfait jours, astreinte, temps partiel
> Trois aménagements du temps de travail, chacun avec ses conditions.

Le temps de travail est protégé par des règles d'ordre public (durées maximales, repos). Les aménagements qui s'en écartent sont permis, mais **sous conditions**.

## 1. Le forfait en jours de Marc
**Marc**, cadre autonome, signe une **convention de forfait** : 218 jours de travail par an, sans décompte horaire.

Quatre conditions : un **accord collectif** protecteur, une **convention individuelle écrite**, une réelle **autonomie** et un **suivi de la charge de travail**.

~~~scene
employeur EMP "Conseil & Data"
salarie MARC "Marc Dubois" categorie=cadre anciennete=5 salaire=4800
cdi CT "CDI de Marc"
EMP MARC -> CT
forfait_jours FJ "Forfait 218 jours"
CT -> FJ
accord_collectif ACC "Accord Syntec"
convention_individuelle CI "Convention de forfait signée"
autonomie AUT "Organise librement son agenda"
ACC CI AUT -> FJ
focus FJ
~~~

## Question : il manque une pastille. Que risque l'employeur ?
L'employeur n'a jamais organisé d'entretien sur la charge de travail de Marc, qui travaille souvent 60 heures par semaine.

~~~scene
verification off
focus FJ
~~~

- [ ] Rien : le forfait jours n'a pas d'horaire
  Le forfait dispense du décompte horaire, pas de la protection de la santé.
- [x] Le forfait est privé d'effet : Marc peut réclamer ses heures supplémentaires
  Sans suivi effectif de la charge de travail, la convention de forfait est privée d'effet.
- [ ] Le contrat de Marc est requalifié en CDD
  Aucun rapport : la sanction porte sur le forfait, pas sur la durée du contrat.

### Réponse
Sans **suivi effectif et régulier de la charge de travail**, la convention de forfait est **privée d'effet** : Marc revient aux 35 heures et peut réclamer le paiement de ses **heures supplémentaires**. Le manquement touche aussi l'**obligation de sécurité** de l'employeur.

~~~scene
verification on
note FJ "Privé d'effet : heures sup. dues"
~~~

## 3. Le suivi de la charge
L'employeur met en place un entretien annuel sur la charge de travail et un outil d'alerte : la convention produit ses effets.

~~~scene
suivi_charge SC "Entretien annuel + alerte"
SC -> FJ
focus FJ SC
~~~

## 4. Une astreinte le week-end
Marc doit être joignable un week-end par mois pour les incidents chez les clients. C'est une **astreinte** : seule l'intervention est du temps de travail effectif.

Elle donne droit à une **contrepartie** (financière ou en repos) et le salarié doit connaître sa programmation à l'avance.

~~~scene
astreinte AST "Astreinte week-end"
CT -> AST
contrepartie CPA "150 € par week-end"
delai_prevenance DPA "Planning 15 jours avant"
CPA DPA -> AST
focus AST
~~~

## 5. Le temps partiel d'Inès
**Inès** travaille à temps partiel. Son contrat doit être **écrit** et préciser la **durée** du travail et sa **répartition** entre les jours de la semaine. Sinon, il est **présumé à temps complet** (l'employeur peut renverser la présomption).

~~~scene
salarie INES "Inès Roche" categorie=employe
cdi CT2 "CDI d'Inès"
EMP INES -> CT2
temps_partiel TP "Temps partiel 20 h"
CT2 -> TP
ecrit EC2 "Contrat écrit"
EC2 -> TP
focus TP
note TP "Répartition manquante : présumé temps plein"
~~~

## 6. Synthèse
- **Forfait jours** : accord collectif + convention individuelle + autonomie + suivi de la charge.
- **Astreinte** : contrepartie + programmation connue à l'avance.
- **Temps partiel** : écrit + durée et répartition, sinon présomption de temps complet.

~~~scene
repartition REP "Lundi au jeudi après-midi"
REP -> TP
selection FJ
~~~
` },

{ id: 'obligations', md: `# Les obligations des parties
> Le contrat crée des obligations réciproques ; un manquement grave peut conduire à la rupture.

Le contrat de travail est **synallagmatique** : chaque partie a des obligations envers l'autre. Le Code du travail ajoute des obligations légales, et les deux parties doivent exécuter le contrat **de bonne foi**.

## 1. Les obligations de l'employeur
L'employeur doit :
- **fournir le travail** convenu et les moyens de l'exécuter ;
- **payer le salaire**, au moins égal aux minima ;
- assurer la **sécurité** et protéger la **santé** physique et mentale des salariés ;
- assurer l'**adaptation** des salariés à leur poste et leur **employabilité** ;
- respecter l'**égalité** et ne pas discriminer.

~~~scene
employeur EMP "Boulangerie Fournil & Co"
salarie NINA "Nina Petit" categorie=employe anciennete=3 salaire=2000
cdi CT "CDI de Nina"
EMP NINA -> CT
fournir_travail O1
payer_salaire O2
securite O3
adaptation O4
non_discrimination O5
EMP -> O1 O2 O3 O4 O5
focus EMP
~~~

## 2. Les obligations du salarié
Le salarié doit :
- **exécuter le travail** convenu, personnellement et avec soin ;
- **respecter les directives** de l'employeur et le règlement intérieur (lien de subordination) ;
- être **loyal** : ne pas faire concurrence à son employeur pendant le contrat, même sans clause ;
- être **discret** sur les informations confidentielles ;
- veiller à **sa sécurité** et à celle des autres.

~~~scene
executer_travail S1
obeissance S2
loyaute S3
discretion S4
securite_salarie S5
NINA -> S1 S2 S3 S4 S5
focus NINA
~~~

## 3. Une obligation commune : la bonne foi
Le contrat est exécuté **de bonne foi** par les deux parties (art. L1222-1 C. trav.). Elle irrigue tout le reste : une clause valable mise en œuvre de mauvaise foi devient abusive.

~~~scene
bonne_foi BF "Bonne foi"
EMP NINA -> BF
focus BF
~~~

## 4. Un manquement de l'employeur
Depuis trois mois, la boulangerie ne paie plus le salaire de Nina. L'obligation est **violée** (⚡).

~~~scene
manquement M1 "3 mois de salaire impayés"
M1 -> O2
focus M1 O2
~~~

## Question : que peut faire Nina, sans démissionner ?
Elle veut quitter l'entreprise sans perdre ses droits.

~~~scene
focus NINA M1
~~~

- [ ] Arrêter de venir travailler
  Ce serait un abandon de poste : après mise en demeure, elle serait présumée démissionnaire.
- [x] Prendre acte de la rupture aux torts de l'employeur
  Si le manquement est suffisamment grave, la prise d'acte produit les effets d'un licenciement sans cause réelle et sérieuse.
- [x] Demander au juge la résiliation judiciaire de son contrat
  Elle continue à travailler pendant la procédure ; si le juge la prononce, mêmes effets qu'un licenciement sans cause.
- [ ] Rien : seul l'employeur peut rompre un CDI
  Le salarié peut rompre (démission, prise d'acte) ou demander au juge de le faire.

### Réponse
Deux voies, toutes deux contrôlées par le juge :
- la **prise d'acte** rompt le contrat immédiatement : si le manquement est assez grave pour empêcher la poursuite du contrat, elle produit les effets d'un **licenciement sans cause réelle et sérieuse** ; sinon, ceux d'une **démission** ;
- la **résiliation judiciaire** : Nina continue à travailler et demande au juge de rompre le contrat aux torts de l'employeur.

Des salaires impayés pendant trois mois sont un **manquement suffisamment grave**.

~~~scene
prise_acte PA "Prise d'acte de Nina"
NINA -> PA
PA -> CT
manquement_suffisant MS "Salaires impayés"
MS -> PA
M1 -> PA lien "fonde"
focus PA
~~~

## 6. Synthèse
| Employeur | Salarié |
|---|---|
| fournir le travail | exécuter le travail |
| payer le salaire | respecter les directives |
| sécurité, santé | loyauté, discrétion |
| adaptation, égalité | veiller à la sécurité |
| **bonne foi** | **bonne foi** |

Un manquement grave de l'employeur ouvre la **prise d'acte** ou la **résiliation judiciaire** ; un manquement du salarié peut justifier une **sanction** ou un **licenciement**.

~~~scene
vue PA
~~~
` },

{ id: 'licenciement', md: `# Le licenciement pour motif personnel
> Une cause réelle et sérieuse, une procédure en trois temps, des indemnités.

L'employeur peut rompre le CDI, mais il doit le **justifier** (cause réelle et sérieuse) et respecter une **procédure**. Chaque étape a son délai ; chaque manquement a sa sanction.

## 1. Le dossier de Karim
Karim, comptable depuis **6 ans** (2 800 € brut par mois), accumule les **retards** malgré deux avertissements. Son employeur envisage de le licencier.

~~~scene
employeur EMP "Transports Morel"
salarie KAR "Karim Haddad" categorie=employe anciennete=6 salaire=2800
cdi CT "CDI de Karim"
EMP KAR -> CT
licenciement_personnel LIC "Licenciement de Karim"
EMP -> LIC
LIC -> CT
focus LIC
~~~

## 2. Une cause réelle et sérieuse
Le licenciement doit reposer sur une cause **réelle** (des faits objectifs, exacts, vérifiables) et **sérieuse** (assez importante pour justifier la rupture).

Des retards répétés malgré des avertissements constituent une **faute sérieuse**. Sans elle, le licenciement serait **sans cause réelle et sérieuse** : indemnité selon le barème.

~~~scene
faute_simple F "Retards répétés"
F -> LIC
focus F LIC
~~~

## 3. La convocation et l'entretien préalable
1. **Convocation** par lettre recommandée ou remise en main propre : objet, date, heure, lieu de l'entretien, possibilité de se faire assister.
2. **Entretien préalable**, au moins **5 jours ouvrables** après la présentation de la lettre : l'employeur expose les motifs, Karim s'explique.

Une procédure irrégulière ne rend pas le licenciement injustifié, mais ouvre droit à une indemnité (au plus un mois de salaire).

~~~scene
convocation CONV "Convocation (LRAR)"
entretien_prealable ENT "Entretien préalable"
LIC -> CONV
CONV -> ENT puis "≥ 5 jours ouvrables"
focus CONV ENT
~~~

## 4. La lettre de licenciement
Au moins **2 jours ouvrables** après l'entretien, l'employeur envoie la **lettre de licenciement**, en recommandé avec avis de réception. Elle énonce les **motifs**, qui fixent les limites du litige : l'employeur ne pourra pas en invoquer d'autres devant le juge.

~~~scene
notification NOT "Lettre de licenciement"
ENT -> NOT puis "≥ 2 jours ouvrables"
focus NOT LIC
~~~

## Question : quelle durée de préavis pour Karim ?
Karim a 6 ans d'ancienneté ; sa convention collective ne prévoit rien de plus favorable.

~~~scene
verification off
preavis PRE "Préavis"
NOT -> PRE
focus PRE
~~~

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

~~~scene
verification on
focus PRE
~~~

## 6. Les droits ouverts
Karim a droit à :
- l'**indemnité légale de licenciement** (au moins 8 mois d'ancienneté) : 1/4 de mois de salaire par année jusqu'à 10 ans → 2 800 € × 6 × 1/4 = **4 200 €** ;
- l'**indemnité compensatrice de congés payés** non pris ;
- l'**allocation chômage** (privation involontaire d'emploi) ;
- ses **documents de fin de contrat**.

~~~scene
indemnite_licenciement IL "Indemnité légale"
indemnite_conges ICP "Congés payés non pris"
chomage ARE "ARE"
documents_fin DOC "Certificat, attestation, solde"
LIC -> IL ICP ARE
PRE -> DOC
focus IL
~~~

## 7. Synthèse
~~~scene
selection LIC
~~~

| Étape | Délai | Si elle manque |
|---|---|---|
| ✉️ Convocation | — | irrégularité : ≤ 1 mois de salaire |
| 💬 Entretien préalable | ≥ 5 jours ouvrables après la convocation | irrégularité : ≤ 1 mois de salaire |
| 📨 Lettre motivée | ≥ 2 jours ouvrables après l'entretien | licenciement sans cause réelle et sérieuse |
| 🎯 Cause réelle et sérieuse | — | indemnité selon le barème |
` },

{ id: 'faute-grave', md: `# Faute grave, faute lourde
> Ce que la gravité de la faute retire au salarié… et ce qu'elle ne lui retire pas.

La qualification de la faute change tout : **faute sérieuse**, **grave** ou **lourde** n'ont pas les mêmes effets sur le préavis et les indemnités. Observez le symbole ⊘ : il signale les droits neutralisés.

## 1. Un licenciement pour faute sérieuse
**Julie**, vendeuse depuis 4 ans (2 100 € brut), est licenciée pour des erreurs de caisse répétées : **faute sérieuse**. Procédure régulière, préavis, indemnité : tout est dû.

~~~scene
employeur EMP "Mode & Co"
salarie JUL "Julie Garnier" categorie=employe anciennete=4 salaire=2100
cdi CT "CDI de Julie"
EMP JUL -> CT
licenciement_personnel LIC "Licenciement de Julie"
EMP -> LIC
LIC -> CT
faute_simple F "Erreurs de caisse"
F -> LIC
convocation CONV
entretien_prealable ENT
notification NOT
preavis PRE "Préavis 2 mois"
LIC -> CONV
CONV -> ENT puis "≥ 5 j. ouvrables"
ENT -> NOT puis "≥ 2 j. ouvrables"
NOT -> PRE
indemnite_licenciement IL "Indemnité de licenciement"
indemnite_conges ICP "Congés payés"
LIC -> IL ICP
focus F IL PRE
~~~

## Question : les faits sont en réalité des vols. Qu'est-ce que Julie perd ?
L'enquête révèle que Julie détournait de l'argent de la caisse. L'employeur retient une **faute grave**.

~~~scene
verification off
type F faute_grave
renommer F "Vols dans la caisse"
focus F
~~~

- [ ] Rien : la procédure a été respectée
  La procédure est la même ; ce sont les droits qui changent.
- [x] Son préavis
  La faute grave rend impossible le maintien dans l'entreprise, même pendant le préavis.
- [x] Son indemnité de licenciement
  La faute grave prive de l'indemnité légale de licenciement.
- [ ] Ses congés payés acquis
  L'indemnité compensatrice de congés payés reste due.

### Réponse
La **faute grave** rend impossible le maintien du salarié dans l'entreprise, **même pendant le préavis**. Elle prive Julie :
- du **préavis** (et de l'indemnité compensatrice de préavis) ;
- de l'**indemnité de licenciement**.

Elle conserve l'**indemnité compensatrice de congés payés** et ses droits au **chômage**.

~~~scene
verification on
focus PRE IL ICP
~~~

## 3. La mise à pied conservatoire
Pour écarter Julie immédiatement pendant la procédure, l'employeur prononce une **mise à pied conservatoire**. Si la faute grave est retenue, cette période n'est pas payée.

Attention au **délai** : la faute grave suppose d'engager la procédure dans un délai restreint après la connaissance des faits ; les faits fautifs se prescrivent par **2 mois**.

~~~scene
mise_a_pied MAP "Mise à pied conservatoire"
retirer LIC -> CONV
LIC -> MAP
MAP -> CONV puis
focus MAP
~~~

## 4. Et la faute lourde ?
Si Julie avait agi avec l'**intention de nuire** à l'employeur (par exemple en sabotant le stock avant de partir chez un concurrent), la faute serait **lourde**.

Mêmes effets que la faute grave, et en plus l'employeur peut engager la **responsabilité pécuniaire** de Julie. Depuis 2016, l'indemnité de **congés payés** reste due, même en cas de faute lourde.

~~~scene
type F faute_lourde
renommer F "Sabotage du stock"
focus F ICP
note ICP "Toujours due, même faute lourde"
~~~

## 5. Synthèse
| Faute | Préavis | Indemnité de licenciement | Congés payés | Responsabilité pécuniaire |
|---|---|---|---|---|
| 🟠 Sérieuse | ✔ | ✔ | ✔ | ✘ |
| 🔥 Grave | ✘ | ✘ | ✔ | ✘ |
| ☠️ Lourde | ✘ | ✘ | ✔ | ✔ |

~~~scene
type F faute_grave
renommer F "Vols dans la caisse"
selection IL
~~~
` },

{ id: 'rupture-conventionnelle', md: `# La rupture conventionnelle
> Un commun accord, quatre étapes, une indemnité plancher.

La **rupture conventionnelle** permet à l'employeur et au salarié en CDI de convenir ensemble de la rupture. Elle ne peut être **imposée** par aucune des parties ; elle est entourée de garanties.

## 1. Paul veut partir, l'entreprise est d'accord
**Paul**, développeur depuis **5 ans** (3 000 € brut), veut créer son entreprise. Son employeur accepte une rupture conventionnelle.

Cinq pastilles en pointillés : il manque toutes les garanties.

~~~scene
employeur EMP "Pixel Factory"
salarie PAUL "Paul Nguyen" categorie=cadre anciennete=5 salaire=3000
cdi CT "CDI de Paul"
EMP PAUL -> CT
rupture_conventionnelle RC "Rupture conventionnelle"
EMP PAUL -> RC
RC -> CT
focus RC
~~~

## 2. Entretien et signature
1. Un ou plusieurs **entretiens**, où chacun peut se faire assister ;
2. la **signature de la convention**, qui fixe la date de rupture et l'**indemnité spécifique**.

~~~scene
entretien_rc E1 "Entretien du 3 mars"
convention_rc CONV "Convention signée le 10 mars"
RC -> E1
E1 -> CONV puis
focus E1 CONV
~~~

## 3. Rétractation et homologation
3. **15 jours calendaires** pour se rétracter, pour chaque partie ;
4. **homologation** par l'administration (DREETS), qui dispose de **15 jours ouvrables** : son silence vaut homologation.

~~~scene
retractation RET "Rétractation"
homologation HOM "Homologation"
inspection DREETS "DREETS"
CONV -> RET puis "15 jours calendaires"
RET -> HOM puis
DREETS -> HOM lien "15 jours ouvrables"
focus RET HOM
~~~

## Question : la convention prévoit 3 000 € d'indemnité. Que va faire l'administration ?
Paul a 5 ans d'ancienneté et gagne 3 000 € brut par mois.

~~~scene
verification off
indemnite_rc IRC "Indemnité spécifique" montant=3000
RC -> IRC
focus IRC
~~~

- [ ] Homologuer : l'indemnité est librement négociée
  Elle est négociée… au-dessus d'un plancher.
- [x] Refuser : l'indemnité est inférieure au minimum légal
  Elle doit être au moins égale à l'indemnité légale de licenciement : 3 000 € × 5 × 1/4 = 3 750 €.
- [ ] Homologuer, puis Paul réclamera la différence aux prud'hommes
  L'administration contrôle le montant avant d'homologuer.

### Réponse
L'indemnité spécifique doit être **au moins égale à l'indemnité légale de licenciement** : 3 000 € × 5 ans × 1/4 = **3 750 €**. Avec 3 000 €, l'homologation est refusée. Les parties signent une nouvelle convention à **4 000 €**.

~~~scene
verification on
note IRC "3 000 € < 3 750 € : refus"
~~~

## 5. Un consentement libre
Dernière garantie : le **consentement libre**. Une rupture conventionnelle signée sous la pression ou dans un contexte de **harcèlement** est **nulle** : elle produit alors les effets d'un licenciement sans cause réelle et sérieuse.

Paul part de son plein gré : toutes les pastilles sont vertes. Il aura droit à l'**allocation chômage**.

~~~scene
param IRC montant=4000
consentement_libre CL "Projet de création d'entreprise"
CL -> RC
chomage ARE "ARE"
indemnite_conges ICP "Congés payés"
RC -> ARE ICP
focus RC
~~~

## 6. Synthèse
| Étape | Garantie |
|---|---|
| 🗨️ Entretien(s) | assistance possible |
| 📑 Convention | date, indemnité ≥ indemnité légale |
| ↩️ Rétractation | 15 jours calendaires |
| 🔏 Homologation | 15 jours ouvrables, silence = accord |
| 🕊️ Consentement | sinon nullité |

~~~scene
selection RC
~~~
` },

{ id: 'depart-salarie', md: `# Démission, abandon de poste, prise d'acte
> Trois façons pour le salarié de quitter l'entreprise, trois régimes très différents.

Le salarié en CDI peut **démissionner**. Mais toutes les ruptures à son initiative ne se valent pas : selon la forme et les circonstances, il garde ou perd ses droits.

## 1. La démission d'Amel
**Amel** remet une lettre : « Je démissionne pour rejoindre une autre entreprise. » La démission n'exige aucune forme, mais une **volonté claire et non équivoque**.

Elle effectue son **préavis** (selon la convention collective ou l'usage). Elle n'a pas droit à l'indemnité de licenciement.

~~~scene
employeur EMP "Agence Horizon"
salarie AMEL "Amel Kaci" categorie=employe anciennete=3 salaire=2200
cdi CT "CDI d'Amel"
EMP AMEL -> CT
demission DEM "Démission"
AMEL -> DEM
DEM -> CT
volonte_claire VC "Lettre claire, sans pression"
VC -> DEM
preavis PRE "Préavis conventionnel"
DEM -> PRE
indemnite_conges ICP "Congés payés"
DEM -> ICP
focus DEM
~~~

## Question : Amel aura-t-elle droit au chômage ?
Elle a trouvé un autre emploi… mais imaginons que la promesse d'embauche tombe à l'eau.

~~~scene
verification off
chomage ARE "ARE"
DEM -> ARE
focus ARE
~~~

- [ ] Oui, comme tout salarié qui perd son emploi
  L'ARE indemnise la privation involontaire d'emploi.
- [x] Non, en principe : la démission est volontaire
  Sauf démission « légitime » (cas listés) ou projet de reconversion validé.
- [ ] Oui, si elle a plus de 2 ans d'ancienneté
  L'ancienneté ne change rien à la nature volontaire de la démission.

### Réponse
L'allocation chômage indemnise la **privation involontaire** d'emploi. Après une démission, elle n'est **pas due**, sauf **démission légitime** (suivi de conjoint, non-paiement des salaires…) ou **projet de reconversion professionnelle** reconnu.

~~~scene
verification on
focus ARE
~~~

## 3. L'abandon de poste de Hugo
**Hugo** ne vient plus travailler, sans explication. Depuis 2023, l'employeur peut le **mettre en demeure** de justifier son absence et de reprendre son poste, dans un délai d'au moins **15 jours**.

S'il ne revient pas, Hugo est **présumé démissionnaire** : pas d'indemnité de licenciement, **pas de chômage**.

~~~scene
retirer DEM PRE ICP ARE VC
salarie HUGO "Hugo Lambert" categorie=employe anciennete=2
cdi CT2 "CDI de Hugo"
EMP HUGO -> CT2
abandon_poste AB "Absent sans explication"
HUGO -> AB
AB -> CT2
mise_en_demeure MED "Mise en demeure (15 jours)"
AB -> MED
chomage ARE2 "ARE"
AB -> ARE2
focus AB ARE2
~~~

## 4. La prise d'acte de Sarah
**Sarah** subit depuis des mois les humiliations de son manager ; l'employeur, alerté, n'a rien fait. Elle **prend acte** de la rupture de son contrat.

Le juge vérifie si les manquements de l'employeur sont **suffisamment graves** pour empêcher la poursuite du contrat. Ici, le harcèlement moral non traité viole l'**obligation de sécurité** : la prise d'acte produit les effets d'un **licenciement sans cause réelle et sérieuse**, voire nul.

~~~scene
salarie SARAH "Sarah Moreau" categorie=cadre anciennete=7 salaire=3900
cdi CT3 "CDI de Sarah"
EMP SARAH -> CT3
securite SEC "Obligation de sécurité"
EMP -> SEC
harcelement HAR "Harcèlement moral non traité"
HAR -> SEC
prise_acte PA "Prise d'acte"
SARAH -> PA
PA -> CT3
HAR -> PA lien "fonde"
focus PA HAR SEC
~~~

## 5. Synthèse
| Rupture | Condition | Effets |
|---|---|---|
| 🚪 Démission | volonté claire et non équivoque | préavis ; pas d'indemnité de licenciement ; pas d'ARE (sauf exceptions) |
| 🏃 Abandon de poste | mise en demeure restée sans effet | présumé démissionnaire ; pas d'ARE |
| 🚩 Prise d'acte | manquement grave de l'employeur | justifiée : licenciement sans cause ; sinon : démission |

~~~scene
vue PA
~~~
` },

{ id: 'periode-essai', md: `# Rompre la période d'essai
> Une rupture libre… à condition qu'il y ait bien un essai, et sans abus.

Pendant la période d'essai, chaque partie peut rompre le contrat **librement**, sans motif ni procédure de licenciement. Mais cette liberté a des limites.

## 1. L'essai de Lucas
**Lucas**, technicien, est embauché en CDI avec une **période d'essai de 2 mois**, stipulée dans son contrat écrit.

~~~scene
employeur EMP "ÉlecPro"
salarie LUC "Lucas Ferreira" categorie=technicien
cdi CT "CDI de Lucas"
EMP LUC -> CT
ecrit EC "Contrat écrit"
EC -> CT
periode_essai ESS "Essai 2 mois" duree=2
CT -> ESS
focus ESS
~~~

## 2. L'employeur rompt l'essai
Après 6 semaines, l'employeur estime que Lucas n'a pas les compétences attendues et rompt l'essai.

La rupture est libre, mais l'employeur respecte un **délai de prévenance** qui dépend du temps de présence : 24 h avant 8 jours, 48 h entre 8 jours et 1 mois, **2 semaines** après 1 mois, 1 mois après 3 mois.

~~~scene
rupture_essai RE "Rupture de l'essai"
EMP -> RE
RE -> CT
focus RE
note RE "Délai de prévenance manquant"
~~~

## 3. Le délai de prévenance
Lucas est prévenu 2 semaines à l'avance. Pas d'indemnité de licenciement, pas de préavis : seulement ses congés payés et ses documents de fin de contrat.

~~~scene
delai_prevenance DP "2 semaines"
DP -> RE
indemnite_conges ICP "Congés payés"
RE -> ICP
focus RE
~~~

## Question : et si l'essai n'avait pas été écrit dans le contrat ?
Imaginons que le contrat de Lucas ne mentionne aucune période d'essai.

~~~scene
verification off
retirer ESS
focus RE
~~~

- [ ] Rien ne change : l'essai existe de plein droit
  La période d'essai ne se présume pas.
- [x] La rupture s'analyse en licenciement
  Sans essai valablement stipulé, l'employeur doit respecter les règles du licenciement.
- [ ] Lucas doit rembourser son salaire
  Aucun texte ne le prévoit.

### Réponse
La période d'essai **ne se présume pas** : elle doit figurer dans la lettre d'engagement ou le contrat. Sans elle, la rupture est un **licenciement**, qui exige une cause réelle et sérieuse et une procédure. Ici, sans procédure : licenciement sans cause réelle et sérieuse.

~~~scene
verification on
focus RE
~~~

## 5. Une rupture abusive
Même avec un essai valable, la rupture est **abusive** si elle n'a **aucun lien avec les compétences** du salarié (motif économique, discrimination, représailles…). Le salarié peut alors obtenir des dommages-intérêts ; si elle est discriminatoire, elle est nulle.

~~~scene
periode_essai ESS "Essai 2 mois" duree=2
CT -> ESS
condition RE "Motif lié aux compétences" manque "rupture abusive : dommages-intérêts"
focus RE
note RE "Rupture « pour raisons économiques » ?"
~~~

## 6. Synthèse
- L'essai doit être **écrit** et respecter les **durées maximales**.
- La rupture est libre, mais avec un **délai de prévenance**.
- Elle doit être liée aux **compétences** ; sinon elle est abusive.

~~~scene
condition RE "Motif lié aux compétences" ok
selection RE
~~~
` },

{ id: 'hierarchie-normes', md: `# Les sources du droit du travail
> Loi, conventions, accords, contrat, règlement intérieur, usages : qui l'emporte ?

Le contrat de **Léa** ne vit pas seul : il s'inscrit dans un empilement de normes. Pour savoir quelle règle s'applique, il faut connaître leur articulation.

## 1. La loi, socle d'ordre public
Le **Code du travail** fixe des règles d'**ordre public** (SMIC, durées maximales, congés payés…), auxquelles on ne peut déroger qu'en faveur du salarié, et des règles **supplétives**, qui s'appliquent à défaut d'accord.

~~~scene
code_travail CT "Code du travail"
focus CT
~~~

## 2. Branche et entreprise
La **convention de branche** fixe notamment les **salaires minima** et les **classifications**.

Depuis les ordonnances de 2017, l'**accord d'entreprise** prime sur l'accord de branche dans la plupart des domaines, sauf ceux que la loi réserve à la branche (salaires minima, classifications, égalité professionnelle…) ou que la branche verrouille.

~~~scene
convention_collective CCN "Convention Syntec"
accord_entreprise AE "Accord d'entreprise"
CT -> CCN
CCN -> AE prevaut "domaines réservés à la branche"
focus CCN AE
~~~

## 3. Le contrat de travail
Le **contrat** ne peut pas être moins favorable que la loi ou la convention collective : c'est le **principe de faveur**. Une clause plus favorable du contrat l'emporte sur l'accord collectif (sauf accords particuliers, comme l'accord de performance collective).

~~~scene
employeur EMP "Bleu Ciel SAS"
salarie LEA "Léa Martin"
cdi CTR "Contrat de Léa"
EMP LEA -> CTR
remuneration REM "3 400 € brut"
CTR -> REM
CCN -> REM encadre "≥ minimum conventionnel"
focus CTR REM
~~~

## Question : la convention fixe un minimum de 3 600 € pour le poste de Léa. Que se passe-t-il ?
Le contrat de Léa prévoit 3 400 € brut par mois.

~~~scene
verification off
focus REM CCN
~~~

- [ ] Le contrat s'applique : Léa l'a signé
  Le contrat ne peut pas déroger, dans un sens défavorable, aux minima conventionnels.
- [x] Léa a droit au minimum conventionnel de 3 600 €
  La clause moins favorable est écartée au profit de la convention.
- [ ] Le contrat est nul
  Seule la clause est écartée ; le contrat survit.

### Réponse
La clause de rémunération est **moins favorable** que la convention collective : elle est écartée, Léa a droit à **3 600 €** et peut réclamer un rappel de salaire.

~~~scene
verification on
statut REM nulle "inférieure au minimum conventionnel : 3 600 € dus"
focus REM
~~~

## 5. Règlement intérieur et usages
Le **règlement intérieur** (obligatoire à partir de 50 salariés) fixe les règles d'hygiène, de sécurité et de **discipline**. L'**usage** (pratique générale, constante et fixe, comme une prime de fin d'année) crée un droit jusqu'à sa dénonciation régulière.

~~~scene
reglement_interieur RI "Règlement intérieur"
usage US "Prime de vacances"
CT -> RI
RI -> CTR encadre "discipline, sanctions"
US -> LEA lien "prime due"
focus RI US
~~~

## 6. Synthèse
| Source | Rôle |
|---|---|
| 📕 Loi | ordre public, règles supplétives |
| 📗 Branche | minima, classifications, domaines réservés |
| 📘 Accord d'entreprise | prime sur la branche dans les autres domaines |
| 📄 Contrat | principe de faveur |
| 📙 Règlement intérieur | hygiène, sécurité, discipline |
| 🔂 Usage | droit jusqu'à dénonciation |

~~~scene
vue CTR
~~~
` },

{ id: 'quiz-ruptures', md: `# Quiz : quelle rupture, quels droits ?
> Huit questions rapides pour réviser les ruptures du contrat de travail.

Un quiz de révision : le canevas illustre chaque situation. Cliquez sur la réponse de la salle, puis révélez.

## Question : un CDD peut-il être rompu avant son terme parce que le salarié est trop lent ?
~~~scene
cdd CT "CDD de 6 mois"
rupture_anticipee_cdd RA "Rupture anticipée"
RA -> CT
insuffisance INS "Lenteur"
INS -> RA lien "motif invoqué"
verification off
focus RA
~~~

- [ ] Oui, c'est une insuffisance professionnelle
  Ce motif peut justifier un licenciement en CDI, pas une rupture anticipée de CDD.
- [x] Non, sauf accord, faute grave, force majeure, inaptitude ou embauche en CDI
  La liste des cas de rupture anticipée est limitative.

### Réponse
Le CDD ne peut être rompu avant son terme que dans des **cas limitativement énumérés**. Sinon, l'employeur doit des dommages-intérêts au moins égaux aux **rémunérations restant à courir** jusqu'au terme.

~~~scene
verification on
~~~

## Question : la rupture conventionnelle ouvre-t-elle droit au chômage ?
~~~scene
effacer
rupture_conventionnelle RC "Rupture conventionnelle"
chomage ARE "ARE"
RC -> ARE
focus RC ARE
verification off
~~~

- [x] Oui
  C'est une privation involontaire d'emploi au sens de l'assurance chômage.
- [ ] Non, c'est une rupture voulue par le salarié
  Elle est voulue par les deux parties ; le salarié est indemnisé.

### Réponse
La rupture conventionnelle ouvre droit à l'**allocation chômage** : c'est l'une de ses principales différences avec la démission.

~~~scene
verification on
~~~

## Question : faute grave : quelle indemnité reste due ?
~~~scene
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
~~~

- [ ] L'indemnité de licenciement
  Supprimée par la faute grave.
- [ ] L'indemnité compensatrice de préavis
  Supprimée par la faute grave.
- [x] L'indemnité compensatrice de congés payés
  Toujours due, quel que soit le motif de la rupture.

### Réponse
Seule l'indemnité de **congés payés** survit à la faute grave (et même à la faute lourde).

~~~scene
verification on
~~~

## Question : un salarié de 5 mois d'ancienneté est licencié (sans faute grave). A-t-il droit à l'indemnité légale ?
~~~scene
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
~~~

- [ ] Oui, dès le premier jour
  Il faut une ancienneté minimale.
- [x] Non, il faut au moins 8 mois d'ancienneté
  En dessous, seule une convention plus favorable peut la prévoir.
- [ ] Oui, s'il a plus de 3 mois
  Le seuil légal est de 8 mois.

### Réponse
L'indemnité légale de licenciement suppose **8 mois d'ancienneté ininterrompus**.

~~~scene
verification on
~~~

## Question : quel délai minimum entre la convocation et l'entretien préalable ?
~~~scene
effacer
convocation CONV
entretien_prealable ENT
CONV -> ENT puis "?"
focus CONV ENT
~~~

- [ ] 2 jours ouvrables
  C'est le délai minimum entre l'entretien et l'envoi de la lettre de licenciement.
- [x] 5 jours ouvrables
  À compter de la présentation de la lettre de convocation.
- [ ] 15 jours calendaires
  C'est le délai de rétractation de la rupture conventionnelle.

### Réponse
**5 jours ouvrables** après la présentation de la convocation ; puis **2 jours ouvrables** au moins entre l'entretien et la lettre de licenciement.

~~~scene
retirer CONV -> ENT
CONV -> ENT puis "≥ 5 jours ouvrables"
~~~

## Question : un salarié abandonne son poste et ne répond pas à la mise en demeure. Il est…
~~~scene
effacer
abandon_poste AB "Abandon de poste"
mise_en_demeure MED
AB -> MED
focus AB
verification off
~~~

- [ ] Licencié pour faute grave
  C'était la pratique avant 2023 ; l'employeur peut toujours choisir cette voie, mais la loi a créé une présomption.
- [x] Présumé démissionnaire
  Depuis 2023 (art. L1237-1-1 C. trav.), sauf motif légitime.
- [ ] En rupture conventionnelle
  Elle exige l'accord des deux parties.

### Réponse
Il est **présumé démissionnaire** : pas d'indemnité de licenciement et pas d'allocation chômage. Il peut contester devant le conseil de prud'hommes, qui statue rapidement.

~~~scene
verification on
~~~

## Question : qui homologue la rupture conventionnelle ?
~~~scene
effacer
rupture_conventionnelle RC
homologation HOM
RC -> HOM
focus HOM
~~~

- [ ] Le conseil de prud'hommes
  Il juge les litiges, il n'homologue pas.
- [x] L'administration du travail (DREETS)
  Dans un délai de 15 jours ouvrables ; son silence vaut homologation.
- [ ] Le CSE
  Il n'intervient pas dans une rupture conventionnelle individuelle (sauf salarié protégé : autorisation de l'inspecteur du travail).

### Réponse
La **DREETS** homologue (silence de 15 jours ouvrables = homologation). Pour un **salarié protégé**, il faut une **autorisation** de l'inspecteur du travail.

~~~scene
inspection DR "DREETS"
DR -> HOM lien "homologue"
~~~

## Question : la prise d'acte n'est pas justifiée. Elle produit les effets…
~~~scene
effacer
prise_acte PA "Prise d'acte"
verification off
focus PA
~~~

- [ ] D'un licenciement sans cause réelle et sérieuse
  C'est le cas quand les manquements de l'employeur sont suffisamment graves.
- [x] D'une démission
  Le salarié a rompu, sans raison suffisante.
- [ ] D'une rupture conventionnelle
  Elle suppose un accord et une homologation.

### Réponse
Prise d'acte **justifiée** : licenciement sans cause réelle et sérieuse (voire nul). **Non justifiée** : **démission**.

~~~scene
verification on
note PA "Pas de manquement grave : démission"
~~~
` }
];
