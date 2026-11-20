# Contract Lab — atelier contrat de travail

Outil pédagogique pour visualiser et expliquer le **contrat de travail** et le **droit du travail** :
un contrat et ses **clauses** en icônes, les **garde-fous** qui les rendent valables, les **incompatibilités**,
les **obligations** des parties, les **ruptures** avec leur procédure et les **indemnités** qu'elles ouvrent.
L'outil vérifie chaque élément et affiche un verdict : ✅ valide, ⚠️ à risque, ⛔ nulle ou irrégulière, ⚡ obligation violée.

**▶ En ligne : [edu-fpar.github.io/contract-lab](https://edu-fpar.github.io/contract-lab/)** (aussi sur téléphone) ·
[documentation](https://edu-fpar.github.io/contract-lab/docs/)

Aucune installation : ouvrez `index.html` (double-clic) ou servez le dossier avec UwAmp
(`http://localhost/edu-fpar/contract-lab/`). Pas de dépendance externe, fonctionne hors ligne.

## Deux modes

- **✏️ Libre** : palette d'éléments classés par familles (parties, contrats, clauses, garde-fous, obligations,
  fautes, ruptures, procédure, indemnités, normes), avec recherche ; liens tirés depuis la poignée `+` ;
  vérification automatique (conditions de validité, incompatibilités, calculs de période d'essai, de CDD,
  de préavis et d'indemnités). Les **pastilles** sous une carte montrent ses garde-fous ; le bouton **＋** de
  l'inspecteur ajoute un garde-fou manquant. La case **🔍 Vérification** masque les verdicts pour laisser la classe juger.
  Le **📸 Studio** capture des étapes commentées et les exporte en scénario markdown.
- **🎬 Cinéma** : déroule un scénario markdown, en **pas à pas** ou en **lecture continue**
  (rythme réglable), avec des **questions à la salle** et une vue adaptée au téléphone.
  Lien direct : `?scenario=non-concurrence&etape=6`, `?scenarios`, ou le bouton 🔗 Partager.
  Le bouton **📦 SCORM** exporte le scénario en paquet pour Moodle ou un autre LMS (achèvement, reprise, note).

## Scénarios intégrés

`construire-contrat`, `non-concurrence`, `clauses-encadrees`, `cdd`, `temps-de-travail`, `obligations`,
`licenciement`, `faute-grave`, `rupture-conventionnelle`, `depart-salarie`, `periode-essai`,
`hierarchie-normes`, `quiz-ruptures` — dans `js/library.js`.

## Écrire un scénario (enseignant ou IA)

Le format complet est dans l'application (❔ Aide → « Format des scénarios »), avec un bouton
**🤖 Copier le prompt pour une IA** qui contient la spécification prête à coller dans un assistant.

````markdown
# Mon scénario
> Description courte.

## 1. Première étape
Commentaire en **markdown**.

```scene
employeur EMP "Optique Durand"
salarie KAR "Karim" categorie=employe anciennete=3 salaire=2400
cdi CT "CDI de Karim"
EMP KAR -> CT
non_concurrence NC "Non-concurrence"
CT -> NC
focus NC
```
````

## Documentation et skill IA

- Documentation complète : `docs/index.html` (Docsify, à ouvrir via un serveur web, comme UwAmp). Les pages sont aussi lisibles directement : ce sont les fichiers `docs/*.md`.
- Skill Claude pour générer un scénario à partir d'un support de cours : `skill/scenario-contract-lab.skill` (voir `docs/ia-et-skill.md`).
- Après une modification du moteur, du format ou des scénarios : `node tools/build.js`, puis `python tools/package_skill.py`.

## Fichiers

| Fichier | Rôle |
|---|---|
| `js/model.js` | moteur : catalogue des éléments, relations, vérification (conditions de validité, incompatibilités, calculs), disposition auto |
| `js/scenario.js` | parseur markdown → étapes, commandes, export studio, rendu markdown |
| `js/app.js` | interface : canevas SVG, palette, inspecteur, lecteur cinéma, studio |
| `js/library.js` | scénarios intégrés |
| `js/docs.js` | aide, spécification du format, prompt IA |
| `js/scorm.js`, `js/scorm-runtime.js` | export SCORM et dialogue avec la plateforme dans le paquet |

## Remerciements

Contract Lab reprend le moteur de scénarios de **Capital Lab**, né de l'outil imaginé par **Tao** pour montrer à sa classe de droit financier comment on peut contrôler une société tout en y étant minoritaire, et transmis par **Yannick**. Merci à eux.
