/* ============================================================
 * Contract Lab — moteur
 * Catalogue des éléments du droit du travail (parties, contrats,
 * clauses, garde-fous, obligations, fautes, ruptures, procédure,
 * indemnités, normes), relations entre éléments, et vérification
 * automatique : conditions de validité, incompatibilités, calculs.
 * ============================================================ */
(function () {
  'use strict';
  const P = window.P = window.P || {};

  P.norm = s => String(s == null ? '' : s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  P.esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  P.slug = s => (P.norm(s).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '').toUpperCase().slice(0, 16)) || 'X';
  P.key = s => P.norm(s).replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
  P.num = function (v) {
    if (v == null) return null;
    const s = String(v).trim().replace(/\s/g, '').replace(',', '.').replace(/(%|€|mois|ans?|annees?)$/i, '');
    const m = s.match(/^-?\d+(?:\.\d+)?$/);
    return m ? parseFloat(s) : null;
  };
  P.round2 = v => Math.round(v * 100) / 100;
  P.eur = v => Math.round(v).toLocaleString('fr-FR') + ' €';
  P.mois = v => P.round2(v).toLocaleString('fr-FR') + ' mois';

  /* ------------------------------------------------------------ familles */
  P.FAMS = {
    partie: { label: 'Parties & acteurs', short: 'Partie', color: '#2563eb', icon: '👥' },
    contrat: { label: 'Contrats', short: 'Contrat', color: '#4f46e5', icon: '📃' },
    clause: { label: 'Clauses', short: 'Clause', color: '#0891b2', icon: '🧩' },
    limite: { label: 'Garde-fous & conditions', short: 'Condition', color: '#059669', icon: '🔒' },
    obligation: { label: 'Obligations', short: 'Obligation', color: '#7c3aed', icon: '📌' },
    manquement: { label: 'Fautes & manquements', short: 'Manquement', color: '#dc2626', icon: '⚡' },
    rupture: { label: 'Ruptures du contrat', short: 'Rupture', color: '#ea580c', icon: '💔' },
    etape: { label: 'Procédure', short: 'Étape', color: '#64748b', icon: '🔹' },
    droit: { label: 'Indemnités & droits', short: 'Droit', color: '#ca8a04', icon: '🎁' },
    norme: { label: 'Normes', short: 'Norme', color: '#92400e', icon: '📚' }
  };
  P.FAM_ORDER = ['partie', 'contrat', 'clause', 'limite', 'obligation', 'manquement', 'rupture', 'etape', 'droit', 'norme'];

  /* ------------------------------------------------------------ catalogue
   * req   : conditions de validité — { any: [kinds], effet, level: 'grave'|'risque', why }
   *         satisfaites si un élément d'un de ces types est relié à l'élément
   *         (lien direct, ou même chaîne de procédure « puis »).
   * excl  : l'élément est neutralisé si un élément de ces types est présent
   *         dans le même dossier — { any, effet, level }
   * illicite : clause nulle par nature (texte de l'effet).
   * ouvre : conséquences habituelles (suggestions dans l'inspecteur).
   * grp   : sous-groupe d'affichage dans la palette. */
  const G = 'grave', R = 'risque';
  const LIC = ['licenciement_personnel', 'licenciement_eco', 'licenciement_inaptitude'];
  const FG = ['faute_grave', 'faute_lourde'];
  const C = P.CATALOG = {
    /* ---- parties */
    employeur: { fam: 'partie', icon: '🏢', label: 'Employeur', desc: "Personne physique ou morale qui embauche. Elle détient le pouvoir de direction, de contrôle et de sanction." },
    salarie: { fam: 'partie', icon: '👤', label: 'Salarié', desc: "Exécute un travail sous la subordination de l'employeur, contre rémunération. Le lien de subordination (ordres, contrôle, sanction) caractérise le contrat de travail.", params: ['categorie', 'anciennete', 'salaire'] },
    cse: { fam: 'partie', icon: '🗣️', label: 'CSE', desc: "Comité social et économique : représente le personnel, consulté notamment sur les projets de licenciement économique." },
    inspection: { fam: 'partie', icon: '🏛️', label: 'Administration (DREETS)', desc: "Contrôle l'application du droit du travail (inspection du travail) et homologue les ruptures conventionnelles." },
    prudhommes: { fam: 'partie', icon: '⚖️', label: "Conseil de prud'hommes", desc: "Juge des litiges individuels nés du contrat de travail." },
    medecin: { fam: 'partie', icon: '🩺', label: 'Médecin du travail', desc: "Seul compétent pour déclarer un salarié inapte à son poste, après étude du poste et échange avec l'employeur." },
    nouvel_employeur: { fam: 'partie', icon: '🏭', label: 'Nouvel employeur', desc: "Entreprise que rejoint le salarié après la rupture : c'est là que joue la clause de non-concurrence." },
    france_travail: { fam: 'partie', icon: '🏦', label: 'France Travail', desc: "Verse l'allocation d'aide au retour à l'emploi (ARE) en cas de privation involontaire d'emploi." },

    /* ---- contrats */
    cdi: { fam: 'contrat', icon: '📄', label: 'CDI', desc: "Contrat à durée indéterminée : forme normale et générale de la relation de travail. L'écrit n'est pas imposé pour un CDI à temps plein, mais l'employeur doit remettre par écrit les informations principales de la relation de travail." },
    cdd: { fam: 'contrat', icon: '⏳', label: 'CDD', params: ['duree'], desc: "Contrat d'exception : il ne peut avoir ni pour objet ni pour effet de pourvoir durablement un emploi lié à l'activité normale et permanente de l'entreprise. Durée maximale : 18 mois renouvellements compris dans le cas général.",
      req: [
        { any: ['ecrit'], effet: 'requalification en CDI', level: G, why: "Écrit obligatoire, transmis au salarié dans les jours qui suivent l'embauche." },
        { any: ['motif_recours'], effet: 'requalification en CDI', level: G, why: "Motif précis : remplacement d'un salarié absent, accroissement temporaire d'activité, emploi saisonnier…" },
        { any: ['terme'], effet: 'requalification en CDI', level: G, why: 'Terme précis, ou durée minimale si le terme est imprécis (remplacement).' }
      ],
      ouvre: ['fin_cdd', 'rupture_anticipee_cdd'] },
    interim: { fam: 'contrat', icon: '🔁', label: 'Contrat de mission (intérim)', desc: "Relation triangulaire : l'entreprise de travail temporaire emploie le salarié et le met à disposition d'une entreprise utilisatrice, pour une tâche précise et temporaire.",
      req: [
        { any: ['ecrit'], effet: 'requalification en CDI', level: G, why: 'Contrat de mission écrit.' },
        { any: ['motif_recours'], effet: 'requalification en CDI', level: G, why: 'Motif de recours précis, comme pour un CDD.' }
      ] },
    apprentissage: { fam: 'contrat', icon: '🎓', label: "Contrat d'apprentissage", desc: "Contrat en alternance associant formation en CFA et travail en entreprise, au service d'un diplôme ou d'un titre professionnel." },

    /* ---- clauses : socle du contrat */
    remuneration: { fam: 'clause', grp: 'Socle du contrat', icon: '💶', label: 'Rémunération', desc: "Élément essentiel du contrat : l'employeur ne peut la modifier sans l'accord du salarié, même de façon minime, même si le nouveau mode serait plus avantageux." },
    fonctions: { fam: 'clause', grp: 'Socle du contrat', icon: '🧑‍💼', label: 'Qualification / fonctions', desc: "La qualification et les fonctions relèvent du socle contractuel : un changement substantiel des fonctions est une modification du contrat, qui exige l'accord du salarié." },
    duree_travail: { fam: 'clause', grp: 'Socle du contrat', icon: '⏱️', label: 'Durée du travail', desc: "La durée contractuelle du travail est un élément du contrat. La répartition des horaires relève en principe du pouvoir de direction (simple changement des conditions de travail)." },
    lieu_travail: { fam: 'clause', grp: 'Socle du contrat', icon: '📍', label: 'Lieu de travail', desc: "La mention du lieu de travail a en principe valeur d'information. Une mutation dans le même secteur géographique est un changement des conditions de travail, que le salarié ne peut refuser." },
    temps_partiel: { fam: 'clause', grp: 'Socle du contrat', icon: '🌓', label: 'Temps partiel', desc: "Durée du travail inférieure à la durée légale (35 h) ou conventionnelle. Le contrat écrit mentionne la durée et sa répartition entre les jours de la semaine ou les semaines du mois.",
      req: [
        { any: ['ecrit'], effet: 'présumé conclu à temps complet', level: G, why: 'Contrat écrit obligatoire.' },
        { any: ['repartition'], effet: 'présumé conclu à temps complet', level: G, why: 'Durée prévue et répartition entre les jours de la semaine ou les semaines du mois.' }
      ] },
    periode_essai: { fam: 'clause', grp: 'Socle du contrat', icon: '🧪', label: "Période d'essai", params: ['duree'], desc: "Permet à l'employeur d'évaluer les compétences du salarié, et au salarié d'apprécier le poste. Elle ne se présume pas. Durée maximale en CDI : 2 mois (ouvriers, employés), 3 mois (agents de maîtrise, techniciens), 4 mois (cadres).",
      req: [{ any: ['ecrit'], effet: 'inopposable au salarié', level: G, why: "Stipulée expressément dans la lettre d'engagement ou le contrat." }] },
    renouvellement_essai: { fam: 'clause', grp: 'Socle du contrat', icon: '🔄', label: "Renouvellement de l'essai", params: ['duree'], desc: "La période d'essai peut être renouvelée une fois, si un accord de branche étendu le prévoit et si le contrat le stipule. Durée totale maximale : 4, 6 ou 8 mois selon la catégorie.",
      req: [
        { any: ['accord_collectif'], effet: 'renouvellement irrégulier', level: G, why: 'Accord de branche étendu prévoyant le renouvellement.' },
        { any: ['ecrit'], effet: 'renouvellement irrégulier', level: G, why: 'Possibilité de renouvellement stipulée dans le contrat.' },
        { any: ['accord_salarie'], effet: 'renouvellement irrégulier', level: G, why: 'Accord exprès et non équivoque du salarié, avant la fin de la période initiale.' }
      ] },

    /* ---- clauses particulières */
    non_concurrence: { fam: 'clause', grp: 'Clauses particulières', icon: '🚫', label: 'Non-concurrence', desc: "Interdit au salarié, après la rupture, d'exercer une activité concurrente. Elle restreint la liberté du travail : ses conditions de validité sont cumulatives (Cass. soc., 10 juillet 2002). Nulle, elle ne s'impose pas au salarié, qui peut demander réparation s'il l'a respectée.",
      req: [
        { any: ['interet_legitime'], effet: 'nulle', level: G, why: "Indispensable à la protection des intérêts légitimes de l'entreprise." },
        { any: ['limite_duree'], effet: 'nulle', level: G, why: 'Limitée dans le temps.' },
        { any: ['limite_geo'], effet: 'nulle', level: G, why: "Limitée dans l'espace." },
        { any: ['specificites'], effet: 'nulle', level: G, why: "Tient compte des spécificités de l'emploi du salarié." },
        { any: ['contrepartie'], effet: 'nulle', level: G, why: 'Comporte une contrepartie financière, versée après la rupture.' }
      ] },
    non_sollicitation: { fam: 'clause', grp: 'Clauses particulières', icon: '🙅', label: 'Non-sollicitation de clientèle', desc: "Interdit de démarcher les clients de l'ancien employeur. La jurisprudence l'assimile à une clause de non-concurrence : mêmes conditions de validité.",
      req: [
        { any: ['interet_legitime'], effet: 'nulle', level: G, why: "Protection des intérêts légitimes de l'entreprise." },
        { any: ['limite_duree'], effet: 'nulle', level: G, why: 'Limitée dans le temps.' },
        { any: ['limite_geo'], effet: 'nulle', level: G, why: "Limitée dans l'espace (ou à une clientèle déterminée)." },
        { any: ['contrepartie'], effet: 'nulle', level: G, why: 'Contrepartie financière.' }
      ] },
    mobilite: { fam: 'clause', grp: 'Clauses particulières', icon: '🧳', label: 'Mobilité', desc: "Permet à l'employeur de modifier le lieu de travail. Elle doit définir précisément sa zone géographique d'application, que l'employeur ne peut étendre seul. Sa mise en œuvre doit répondre à l'intérêt de l'entreprise, de bonne foi, avec un délai de prévenance suffisant.",
      req: [
        { any: ['zone_definie'], effet: 'nulle', level: G, why: 'Zone géographique définie de façon précise.' },
        { any: ['interet_legitime'], effet: 'mise en œuvre abusive', level: R, why: "Mise en œuvre dans l'intérêt de l'entreprise." },
        { any: ['delai_prevenance'], effet: 'mise en œuvre abusive', level: R, why: 'Délai de prévenance raisonnable, respect de la vie personnelle et familiale.' }
      ] },
    exclusivite: { fam: 'clause', grp: 'Clauses particulières', icon: '🔒', label: 'Exclusivité', desc: "Interdit au salarié toute autre activité professionnelle pendant le contrat. Elle porte atteinte à la liberté du travail : elle doit être indispensable aux intérêts légitimes de l'entreprise, justifiée par la nature de la tâche et proportionnée au but recherché.",
      req: [
        { any: ['interet_legitime'], effet: 'nulle', level: G, why: "Indispensable à la protection des intérêts légitimes de l'entreprise." },
        { any: ['proportionnalite'], effet: 'nulle', level: G, why: 'Justifiée par la nature de la tâche et proportionnée au but recherché (art. L1121-1 C. trav.).' }
      ],
      excl: [{ any: ['temps_partiel'], effet: 'en principe inopposable au salarié à temps partiel, qui doit pouvoir compléter ses revenus', level: G }] },
    dedit_formation: { fam: 'clause', grp: 'Clauses particulières', icon: '🎒', label: 'Dédit-formation', desc: "Le salarié qui part avant une durée convenue rembourse tout ou partie des frais d'une formation payée par l'employeur. Elle ne doit pas priver le salarié de la faculté de démissionner.",
      req: [
        { any: ['ecrit'], effet: 'nulle', level: G, why: 'Conclue avant la formation ; précise la date, la nature, la durée, le coût réel et les modalités de remboursement.' },
        { any: ['formation_couteuse'], effet: 'nulle', level: G, why: 'Frais réels supérieurs aux dépenses imposées par la loi ou la convention collective.' },
        { any: ['proportionnalite'], effet: 'nulle', level: G, why: 'Montant du remboursement proportionné aux frais engagés.' }
      ],
      excl: [{ any: LIC.concat(['rupture_essai']), effet: "inapplicable : la rupture n'est pas le fait du salarié", level: G }] },
    confidentialite: { fam: 'clause', grp: 'Clauses particulières', icon: '🤐', label: 'Confidentialité', desc: "Oblige à ne pas divulguer les informations confidentielles de l'entreprise, pendant et après le contrat. Elle n'empêche pas de travailler pour un concurrent : aucune contrepartie financière n'est exigée (à la différence de la non-concurrence)." },
    objectifs: { fam: 'clause', grp: 'Clauses particulières', icon: '🎯', label: "Clause d'objectifs", desc: "Fixe des objectifs, éventuellement de façon unilatérale par l'employeur. Ils doivent être réalisables et portés à la connaissance du salarié en début d'exercice. Ne pas les atteindre n'est pas, en soi, une cause de licenciement.",
      req: [{ any: ['objectifs_realistes'], effet: 'inopposables au salarié', level: R, why: "Objectifs réalistes, connus en début d'exercice." }] },
    remuneration_variable: { fam: 'clause', grp: 'Clauses particulières', icon: '📈', label: 'Rémunération variable', desc: "Licite si elle repose sur des éléments objectifs indépendants de la volonté de l'employeur, ne fait pas porter le risque de l'entreprise sur le salarié et n'abaisse pas la rémunération sous les minima légaux ou conventionnels.",
      req: [{ any: ['criteres_objectifs'], effet: 'nulle', level: G, why: "Critères objectifs, indépendants de la volonté de l'employeur." }] },
    forfait_jours: { fam: 'clause', grp: 'Clauses particulières', icon: '📆', label: 'Forfait en jours', desc: "Décompte du temps de travail en jours sur l'année (218 jours au plus en principe), pour des cadres ou salariés autonomes. Le salarié reste protégé : durées maximales, repos quotidien et hebdomadaire, charge de travail raisonnable.",
      req: [
        { any: ['accord_collectif'], effet: 'nul : heures supplémentaires dues', level: G, why: 'Accord collectif garantissant le respect des durées maximales et des repos.' },
        { any: ['convention_individuelle'], effet: 'nul : heures supplémentaires dues', level: G, why: 'Convention individuelle de forfait écrite, signée par le salarié.' },
        { any: ['autonomie'], effet: 'nul : heures supplémentaires dues', level: G, why: "Salarié disposant d'une réelle autonomie dans l'organisation de son emploi du temps." },
        { any: ['suivi_charge'], effet: 'privé d\'effet : heures supplémentaires dues', level: G, why: 'Suivi effectif et régulier de la charge de travail (entretien annuel…).' }
      ] },
    astreinte: { fam: 'clause', grp: 'Clauses particulières', icon: '📟', label: 'Astreinte', desc: "Période où le salarié, sans être sur son lieu de travail ni à la disposition permanente de l'employeur, doit pouvoir intervenir. Seule l'intervention est du temps de travail effectif.",
      req: [
        { any: ['contrepartie'], effet: 'contrepartie due au salarié', level: G, why: 'Compensation financière ou sous forme de repos.' },
        { any: ['delai_prevenance'], effet: 'programmation irrégulière', level: R, why: 'Salarié informé de sa programmation dans un délai raisonnable.' }
      ] },
    teletravail: { fam: 'clause', grp: 'Clauses particulières', icon: '🏠', label: 'Télétravail', desc: "Mis en place par accord collectif ou charte ; à défaut, par simple accord entre le salarié et l'employeur, formalisé par tout moyen. Le télétravailleur a les mêmes droits que les salariés sur site.",
      req: [{ any: ['accord_collectif', 'accord_salarie'], effet: 'mise en place irrégulière', level: R, why: "Accord collectif, charte, ou accord du salarié et de l'employeur." }] },
    garantie_emploi: { fam: 'clause', grp: 'Clauses particulières', icon: '🛡️', label: "Garantie d'emploi", desc: "L'employeur s'engage à ne pas licencier pendant une période déterminée, sauf faute grave ou force majeure. S'il licencie quand même, il doit les salaires restant à courir jusqu'au terme de la garantie." },
    propriete_intellectuelle: { fam: 'clause', grp: 'Clauses particulières', icon: '💡', label: 'Inventions', desc: "Les inventions faites dans l'exécution d'une mission inventive appartiennent à l'employeur ; le salarié a droit à une rémunération supplémentaire." },
    parachute: { fam: 'clause', grp: 'Clauses particulières', icon: '🪂', label: 'Indemnité contractuelle de rupture', desc: "Prévoit une indemnité en cas de licenciement, en plus de l'indemnité légale. Le juge peut la réduire si elle est manifestement excessive (clause pénale)." },
    clause_resolutoire: { fam: 'clause', grp: 'Clauses illicites', icon: '💣', label: 'Rupture automatique', desc: "Prévoit que la survenance d'un événement (perte d'un client, retrait du permis, objectifs non atteints…) entraînera la rupture automatique du contrat.",
      illicite: "nulle : aucune clause ne peut décider à l'avance qu'un fait constituera une cause de licenciement ; seul le juge en apprécie le caractère réel et sérieux" },
    clause_vie_privee: { fam: 'clause', grp: 'Clauses illicites', icon: '💍', label: 'Restriction de la vie privée', desc: "Clause de célibat, interdiction de se marier avec un collègue, obligation de résider à un endroit sans justification…",
      illicite: 'nulle : atteinte injustifiée et disproportionnée aux droits et libertés du salarié (art. L1121-1 C. trav.)' },
    clause_discriminatoire: { fam: 'clause', grp: 'Clauses illicites', icon: '🚷', label: 'Clause discriminatoire', desc: "Distingue selon l'âge, le sexe, l'origine, la grossesse, les opinions, l'activité syndicale, l'état de santé… (art. L1132-1 C. trav.).",
      illicite: 'nulle : discrimination prohibée' },

    /* ---- garde-fous et conditions */
    contrepartie: { fam: 'limite', grp: 'Limiter une clause', icon: '💰', label: 'Contrepartie financière', desc: "Somme versée au salarié en compensation d'une contrainte : non-concurrence (après la rupture, quel que soit le mode de rupture), astreinte… Elle ne peut être dérisoire." },
    limite_duree: { fam: 'limite', grp: 'Limiter une clause', icon: '⌛', label: 'Limite dans le temps', desc: "La contrainte ne vaut que pour une durée déterminée (par exemple un ou deux ans après la rupture)." },
    limite_geo: { fam: 'limite', grp: 'Limiter une clause', icon: '🗺️', label: "Limite dans l'espace", desc: "La contrainte ne vaut que dans un secteur géographique déterminé." },
    specificites: { fam: 'limite', grp: 'Limiter une clause', icon: '🧩', label: "Spécificités de l'emploi", desc: "La clause tient compte du poste réel du salarié : elle ne doit pas l'empêcher de retrouver un emploi conforme à sa formation et à son expérience." },
    interet_legitime: { fam: 'limite', grp: 'Limiter une clause', icon: '🏰', label: "Intérêt légitime de l'entreprise", desc: "La clause protège un intérêt réel de l'entreprise (clientèle, savoir-faire…), au regard des fonctions du salarié." },
    proportionnalite: { fam: 'limite', grp: 'Limiter une clause', icon: '📐', label: 'Justifiée et proportionnée', desc: "Aucune restriction aux droits et libertés du salarié qui ne soit justifiée par la nature de la tâche à accomplir et proportionnée au but recherché (art. L1121-1 C. trav.)." },
    zone_definie: { fam: 'limite', grp: 'Limiter une clause', icon: '📌', label: 'Zone géographique précise', desc: "La zone de mobilité est définie précisément dans la clause, et ne peut être étendue unilatéralement par l'employeur." },
    delai_prevenance: { fam: 'limite', grp: 'Limiter une clause', icon: '📢', label: 'Délai de prévenance', desc: "Le salarié est prévenu suffisamment à l'avance (mutation, astreinte, rupture de la période d'essai…)." },
    accord_salarie: { fam: 'limite', grp: 'Limiter une clause', icon: '🙋', label: 'Accord exprès du salarié', desc: "Consentement clair et non équivoque du salarié : nécessaire pour modifier le contrat, renouveler l'essai…" },
    formation_couteuse: { fam: 'limite', grp: 'Limiter une clause', icon: '🧾', label: 'Frais au-delà des obligations', desc: "Les frais de formation dépassent les dépenses imposées à l'employeur par la loi ou la convention collective." },
    objectifs_realistes: { fam: 'limite', grp: 'Limiter une clause', icon: '✅', label: 'Objectifs réalistes et connus', desc: "Objectifs réalisables, compatibles avec le marché, communiqués en début d'exercice." },
    criteres_objectifs: { fam: 'limite', grp: 'Limiter une clause', icon: '📏', label: 'Critères objectifs', desc: "La variation dépend d'éléments objectifs, indépendants de la volonté de l'employeur." },
    ecrit: { fam: 'limite', grp: 'Formalités', icon: '✍️', label: 'Écrit', desc: "Exigence de forme : contrat ou clause écrits (CDD, intérim, temps partiel, période d'essai, dédit-formation, forfait…)." },
    motif_recours: { fam: 'limite', grp: 'Formalités', icon: '📝', label: 'Motif de recours précis', desc: "Cas de recours autorisé au CDD ou à l'intérim, énoncé précisément dans le contrat." },
    terme: { fam: 'limite', grp: 'Formalités', icon: '📅', label: 'Terme précis', desc: "Date de fin du CDD, ou durée minimale si le terme est imprécis (remplacement d'un salarié absent)." },
    repartition: { fam: 'limite', grp: 'Formalités', icon: '🗓️', label: 'Durée et répartition', desc: "Durée du travail prévue et sa répartition entre les jours de la semaine ou les semaines du mois." },
    accord_collectif: { fam: 'limite', grp: 'Formalités', icon: '📜', label: 'Accord collectif', desc: "Accord de branche ou d'entreprise qui autorise et encadre le dispositif." },
    convention_individuelle: { fam: 'limite', grp: 'Formalités', icon: '🖋️', label: 'Convention individuelle écrite', desc: "Accord écrit du salarié au dispositif (convention de forfait)." },
    autonomie: { fam: 'limite', grp: 'Formalités', icon: '🧭', label: 'Autonomie du salarié', desc: "Le salarié organise librement son emploi du temps : il ne suit pas l'horaire collectif." },
    suivi_charge: { fam: 'limite', grp: 'Formalités', icon: '📊', label: 'Suivi de la charge', desc: "L'employeur contrôle effectivement et régulièrement la charge de travail et l'équilibre vie professionnelle / vie personnelle." },
    cause_reelle: { fam: 'limite', grp: 'Conditions de rupture', icon: '🎯', label: 'Cause réelle et sérieuse', desc: "Tout licenciement pour motif personnel est justifié par une cause réelle (faits objectifs, exacts, vérifiables) et sérieuse (suffisamment grave pour justifier la rupture)." },
    motif_eco: { fam: 'limite', grp: 'Conditions de rupture', icon: '📉', label: 'Motif économique', desc: "Suppression ou transformation d'emploi, ou modification refusée d'un élément essentiel du contrat, consécutive notamment à des difficultés économiques, des mutations technologiques, une réorganisation nécessaire à la sauvegarde de la compétitivité ou une cessation d'activité (art. L1233-3 C. trav.)." },
    volonte_claire: { fam: 'limite', grp: 'Conditions de rupture', icon: '🧠', label: 'Volonté claire et non équivoque', desc: "La démission ne se présume pas : elle suppose une volonté claire et non équivoque de quitter l'entreprise." },
    consentement_libre: { fam: 'limite', grp: 'Conditions de rupture', icon: '🕊️', label: 'Consentement libre', desc: "Aucun vice du consentement : ni pression, ni harcèlement, ni violence." },
    manquement_suffisant: { fam: 'limite', grp: 'Conditions de rupture', icon: '🚨', label: "Manquement grave de l'employeur", desc: "Manquement de l'employeur suffisamment grave pour empêcher la poursuite du contrat (salaire non payé, harcèlement, modification imposée du contrat…)." },
    motif_rupture_cdd: { fam: 'limite', grp: 'Conditions de rupture', icon: '🗝️', label: 'Cas de rupture anticipée autorisé', desc: "Accord des parties, faute grave, force majeure, inaptitude constatée par le médecin du travail, ou embauche du salarié en CDI ailleurs." },

    /* ---- obligations */
    fournir_travail: { fam: 'obligation', grp: "De l'employeur", icon: '🧰', label: 'Fournir le travail convenu', desc: "L'employeur fournit le travail et les moyens de l'accomplir." },
    payer_salaire: { fam: 'obligation', grp: "De l'employeur", icon: '💳', label: 'Payer le salaire', desc: "Verser la rémunération convenue, au moins égale aux minima (SMIC, minima conventionnels), avec un bulletin de paie." },
    securite: { fam: 'obligation', grp: "De l'employeur", icon: '🦺', label: 'Obligation de sécurité', desc: "Prendre les mesures nécessaires pour assurer la sécurité et protéger la santé physique et mentale des travailleurs : prévention, information, formation (art. L4121-1 C. trav.)." },
    adaptation: { fam: 'obligation', grp: "De l'employeur", icon: '🧑‍🏫', label: 'Adaptation et employabilité', desc: "Assurer l'adaptation des salariés à leur poste et veiller au maintien de leur capacité à occuper un emploi (art. L6321-1 C. trav.)." },
    non_discrimination: { fam: 'obligation', grp: "De l'employeur", icon: '🟰', label: 'Égalité, non-discrimination', desc: "Aucune décision fondée sur un motif discriminatoire ; égalité de rémunération entre les femmes et les hommes pour un même travail ou un travail de valeur égale." },
    respect_libertes: { fam: 'obligation', grp: "De l'employeur", icon: '🗽', label: 'Respect des libertés', desc: "Respecter la vie privée et les libertés du salarié : toute restriction doit être justifiée et proportionnée." },
    bonne_foi: { fam: 'obligation', grp: 'Des deux parties', icon: '🤲', label: 'Exécution de bonne foi', desc: "Le contrat de travail est exécuté de bonne foi, par l'employeur comme par le salarié (art. L1222-1 C. trav.)." },
    executer_travail: { fam: 'obligation', grp: 'Du salarié', icon: '🛠️', label: 'Exécuter le travail', desc: "Accomplir personnellement le travail convenu, avec soin, pendant le temps de travail." },
    obeissance: { fam: 'obligation', grp: 'Du salarié', icon: '📋', label: 'Respecter les directives', desc: "Le lien de subordination impose de suivre les ordres et directives de l'employeur, ainsi que le règlement intérieur, sauf ordre illicite ou dangereux." },
    loyaute: { fam: 'obligation', grp: 'Du salarié', icon: '⚓', label: 'Loyauté', desc: "Ne pas nuire à l'employeur, ne pas lui faire concurrence pendant le contrat, même sans clause." },
    discretion: { fam: 'obligation', grp: 'Du salarié', icon: '🔇', label: 'Discrétion', desc: "Ne pas divulguer les informations confidentielles ; le secret de fabrique est protégé pénalement." },
    securite_salarie: { fam: 'obligation', grp: 'Du salarié', icon: '⛑️', label: 'Veiller à la sécurité', desc: "Prendre soin, selon sa formation et ses possibilités, de sa santé et de sa sécurité, et de celles des autres personnes concernées (art. L4122-1 C. trav.)." },

    /* ---- fautes et manquements */
    manquement: { fam: 'manquement', icon: '⚡', label: 'Manquement', desc: "Inexécution d'une obligation. Reliez-le à l'obligation qu'il viole." },
    faute_simple: { fam: 'manquement', icon: '🟠', label: 'Faute sérieuse', desc: "Faute suffisante pour justifier un licenciement (cause réelle et sérieuse), mais qui n'empêche pas le maintien du salarié pendant le préavis : préavis et indemnités sont dus." },
    faute_grave: { fam: 'manquement', icon: '🔥', label: 'Faute grave', desc: "Faute qui rend impossible le maintien du salarié dans l'entreprise, même pendant le préavis. Elle prive du préavis et de l'indemnité de licenciement. La procédure doit être engagée dans un délai restreint." },
    faute_lourde: { fam: 'manquement', icon: '☠️', label: 'Faute lourde', desc: "Faute commise avec l'intention de nuire à l'employeur. Mêmes effets que la faute grave ; elle permet aussi d'engager la responsabilité pécuniaire du salarié. L'indemnité compensatrice de congés payés reste due." },
    harcelement: { fam: 'manquement', icon: '🛑', label: 'Harcèlement', desc: "Agissements répétés dégradant les conditions de travail (moral) ou propos et comportements à connotation sexuelle (sexuel). L'employeur doit prévenir, faire cesser et sanctionner." },
    insuffisance: { fam: 'manquement', icon: '📉', label: 'Insuffisance professionnelle', desc: "Incapacité à exercer correctement ses fonctions, sans faute : elle peut constituer une cause réelle et sérieuse non disciplinaire si elle repose sur des éléments objectifs." },

    /* ---- ruptures */
    demission: { fam: 'rupture', icon: '🚪', label: 'Démission', desc: "Rupture du CDI à l'initiative du salarié. Aucune forme imposée, mais une volonté claire et non équivoque. Préavis selon la convention collective ou l'usage. Pas d'indemnité de licenciement ; pas d'allocation chômage, sauf démission légitime ou projet de reconversion.",
      req: [{ any: ['volonte_claire'], effet: 'requalifiable (prise d\'acte ou licenciement sans cause)', level: G, why: 'Volonté claire et non équivoque de démissionner.' }],
      ouvre: ['preavis', 'indemnite_conges', 'documents_fin'] },
    licenciement_personnel: { fam: 'rupture', icon: '📤', label: 'Licenciement pour motif personnel', desc: "Rupture du CDI à l'initiative de l'employeur, pour un motif tenant à la personne du salarié (faute, insuffisance professionnelle…). Procédure : convocation, entretien préalable, lettre motivée.",
      req: [
        { any: ['cause_reelle', 'faute_simple', 'faute_grave', 'faute_lourde', 'insuffisance'], effet: 'sans cause réelle et sérieuse : indemnité selon le barème', level: G, why: 'Cause réelle et sérieuse (faute, insuffisance professionnelle…).' },
        { any: ['convocation'], effet: 'irrégularité de procédure (au plus 1 mois de salaire)', level: R, why: 'Convocation à un entretien préalable.' },
        { any: ['entretien_prealable'], effet: 'irrégularité de procédure (au plus 1 mois de salaire)', level: R, why: 'Entretien préalable, au moins 5 jours ouvrables après la convocation.' },
        { any: ['notification'], effet: 'sans cause réelle et sérieuse (aucune lettre motivée)', level: G, why: 'Lettre de licenciement énonçant les motifs.' }
      ],
      excl: [{ any: ['garantie_emploi'], effet: "violation de la garantie d'emploi : salaires restant dus jusqu'à son terme", level: R }],
      ouvre: ['preavis', 'indemnite_licenciement', 'indemnite_conges', 'chomage', 'documents_fin'] },
    licenciement_eco: { fam: 'rupture', icon: '🏚️', label: 'Licenciement économique', desc: "Licenciement pour un motif non inhérent à la personne du salarié. L'employeur doit tenter de reclasser, respecter l'ordre des licenciements et, selon l'effectif et le nombre de licenciements, consulter le CSE.",
      req: [
        { any: ['motif_eco'], effet: 'sans cause réelle et sérieuse', level: G, why: 'Motif économique réel (art. L1233-3 C. trav.).' },
        { any: ['reclassement'], effet: 'sans cause réelle et sérieuse', level: G, why: 'Recherche sérieuse de reclassement préalable.' },
        { any: ['consultation_cse'], effet: 'irrégularité de procédure', level: R, why: 'Consultation du CSE (selon effectif et nombre de licenciements).' },
        { any: ['convocation'], effet: 'irrégularité de procédure', level: R, why: 'Convocation à un entretien préalable (licenciement individuel).' },
        { any: ['notification'], effet: 'sans cause réelle et sérieuse (aucune lettre motivée)', level: G, why: 'Lettre énonçant le motif économique.' }
      ],
      excl: [{ any: ['garantie_emploi'], effet: "violation de la garantie d'emploi : salaires restant dus jusqu'à son terme", level: R }],
      ouvre: ['preavis', 'indemnite_licenciement', 'indemnite_conges', 'chomage', 'documents_fin'] },
    licenciement_inaptitude: { fam: 'rupture', icon: '🏥', label: "Licenciement pour inaptitude", desc: "Possible seulement après un avis d'inaptitude du médecin du travail et l'impossibilité de reclasser le salarié (ou refus du reclassement, ou dispense mentionnée dans l'avis).",
      req: [
        { any: ['avis_inaptitude'], effet: 'licenciement injustifié', level: G, why: "Avis d'inaptitude rendu par le médecin du travail." },
        { any: ['reclassement'], effet: 'sans cause réelle et sérieuse', level: G, why: 'Recherche de reclassement (sauf dispense expresse dans l\'avis).' },
        { any: ['notification'], effet: 'sans cause réelle et sérieuse', level: G, why: 'Lettre de licenciement motivée.' }
      ],
      ouvre: ['indemnite_licenciement', 'indemnite_conges', 'chomage', 'documents_fin'] },
    rupture_conventionnelle: { fam: 'rupture', icon: '🤝', label: 'Rupture conventionnelle', desc: "Rupture du CDI d'un commun accord : elle ne peut être imposée par l'une ou l'autre partie. Indemnité au moins égale à l'indemnité légale de licenciement ; ouvre droit à l'allocation chômage.",
      req: [
        { any: ['entretien_rc'], effet: 'nulle', level: G, why: 'Un ou plusieurs entretiens préalables.' },
        { any: ['convention_rc'], effet: 'nulle', level: G, why: "Convention écrite fixant la date de rupture et l'indemnité spécifique." },
        { any: ['retractation'], effet: 'nulle', level: G, why: 'Délai de rétractation de 15 jours calendaires pour chaque partie.' },
        { any: ['homologation'], effet: 'sans effet', level: G, why: "Homologation par l'administration (silence de 15 jours ouvrables = homologation)." },
        { any: ['consentement_libre'], effet: "nulle : effets d'un licenciement sans cause", level: G, why: 'Consentement libre, sans vice (pas de harcèlement ni de pression).' }
      ],
      ouvre: ['indemnite_rc', 'indemnite_conges', 'chomage', 'documents_fin'] },
    fin_cdd: { fam: 'rupture', icon: '⏹️', label: 'Arrivée du terme du CDD', desc: "Le CDD prend fin de plein droit à son terme, sans procédure. Le salarié perçoit l'indemnité de fin de contrat, sauf exceptions.",
      ouvre: ['indemnite_precarite', 'indemnite_conges', 'chomage', 'documents_fin'] },
    rupture_anticipee_cdd: { fam: 'rupture', icon: '✂️', label: 'Rupture anticipée du CDD', desc: "Avant son terme, le CDD ne peut être rompu que dans des cas limités : accord des parties, faute grave, force majeure, inaptitude, embauche du salarié en CDI.",
      okText: 'rupture anticipée autorisée',
      req: [{ any: ['motif_rupture_cdd', 'faute_grave', 'faute_lourde'], effet: 'dommages-intérêts au moins égaux aux salaires restant à courir', level: G, why: 'Cas de rupture anticipée autorisé par la loi.' }] },
    rupture_essai: { fam: 'rupture', icon: '🚦', label: "Rupture de la période d'essai", desc: "Chaque partie peut rompre librement l'essai, sans motif ni indemnité de licenciement. La rupture ne doit pas être abusive (sans lien avec les compétences) et respecte un délai de prévenance.",
      req: [
        { any: ['periode_essai'], effet: "impossible : sans période d'essai valable, la rupture est un licenciement", level: G, why: "Période d'essai valablement stipulée et en cours." },
        { any: ['delai_prevenance'], effet: 'indemnité compensatrice du délai de prévenance', level: R, why: 'Délai de prévenance selon la durée de présence.' }
      ],
      ouvre: ['indemnite_conges', 'documents_fin'] },
    prise_acte: { fam: 'rupture', icon: '🚩', label: "Prise d'acte", desc: "Le salarié rompt immédiatement le contrat en reprochant des manquements à l'employeur. Le juge tranche : manquements suffisamment graves = effets d'un licenciement sans cause réelle et sérieuse ; sinon = effets d'une démission.",
      okText: "justifiée : effets d'un licenciement sans cause réelle et sérieuse",
      req: [{ any: ['manquement_suffisant', 'harcelement'], effet: "produit les effets d'une démission", level: G, why: "Manquement de l'employeur suffisamment grave pour empêcher la poursuite du contrat." }] },
    resiliation_judiciaire: { fam: 'rupture', icon: '🔨', label: 'Résiliation judiciaire', desc: "Le salarié demande au juge de prononcer la rupture aux torts de l'employeur, tout en continuant à travailler. Si elle est prononcée : effets d'un licenciement sans cause réelle et sérieuse.",
      okText: "prononcée : effets d'un licenciement sans cause réelle et sérieuse",
      req: [{ any: ['manquement_suffisant', 'harcelement'], effet: 'rejetée : le contrat se poursuit', level: G, why: "Manquement de l'employeur suffisamment grave." }] },
    abandon_poste: { fam: 'rupture', icon: '🏃', label: 'Abandon de poste', desc: "Le salarié qui abandonne volontairement son poste et ne reprend pas le travail après une mise en demeure est présumé démissionnaire (art. L1237-1-1 C. trav.) : pas d'indemnité de licenciement, pas d'allocation chômage.",
      okText: 'présumé démissionnaire',
      req: [{ any: ['mise_en_demeure'], effet: 'présomption de démission inapplicable', level: G, why: "Mise en demeure de justifier l'absence et de reprendre le poste, dans un délai d'au moins 15 jours." }],
      ouvre: ['indemnite_conges', 'documents_fin'] },
    depart_retraite: { fam: 'rupture', icon: '👴', label: 'Départ à la retraite', desc: "Le salarié quitte volontairement l'entreprise pour liquider sa pension ; il perçoit l'indemnité de départ à la retraite et respecte un préavis." },

    /* ---- procédure */
    convocation: { fam: 'etape', icon: '✉️', label: 'Convocation', desc: "Lettre recommandée ou remise en main propre contre décharge, indiquant l'objet de l'entretien, sa date, son heure, son lieu et la possibilité de se faire assister." },
    entretien_prealable: { fam: 'etape', icon: '💬', label: 'Entretien préalable', desc: "Au moins 5 jours ouvrables après la convocation. L'employeur indique les motifs envisagés et recueille les explications du salarié." },
    notification: { fam: 'etape', icon: '📨', label: 'Lettre de licenciement', desc: "Recommandée avec avis de réception, au moins 2 jours ouvrables après l'entretien. Les motifs énoncés fixent les limites du litige." },
    mise_a_pied: { fam: 'etape', icon: '⏸️', label: 'Mise à pied conservatoire', desc: "Écarte immédiatement le salarié dans l'attente de la décision, lorsque la faute paraît grave. Non payée si la faute grave est finalement retenue." },
    sanction: { fam: 'etape', icon: '🟥', label: 'Sanction disciplinaire', desc: "Avertissement, mise à pied, mutation, rétrogradation… Une même faute ne peut être sanctionnée deux fois ; les faits se prescrivent par 2 mois." },
    preavis: { fam: 'etape', icon: '🔔', label: 'Préavis', desc: "Période entre la notification et la fin du contrat. Licenciement : 1 mois entre 6 mois et 2 ans d'ancienneté, 2 mois au-delà, sauf dispositions plus favorables. Démission : selon la convention collective ou l'usage.",
      excl: [{ any: FG, effet: 'non dû en cas de faute grave ou lourde', level: G }] },
    entretien_rc: { fam: 'etape', icon: '🗨️', label: 'Entretien de rupture conventionnelle', desc: "Un ou plusieurs entretiens, au cours desquels chaque partie peut se faire assister." },
    convention_rc: { fam: 'etape', icon: '📑', label: 'Signature de la convention', desc: "Fixe la date de rupture (au plus tôt le lendemain de l'homologation) et l'indemnité spécifique." },
    retractation: { fam: 'etape', icon: '↩️', label: 'Délai de rétractation', desc: "15 jours calendaires à compter de la signature, pour chaque partie." },
    homologation: { fam: 'etape', icon: '🔏', label: 'Homologation', desc: "Demande à l'administration après la rétractation. Elle dispose de 15 jours ouvrables ; son silence vaut homologation." },
    mise_en_demeure: { fam: 'etape', icon: '📬', label: 'Mise en demeure', desc: "Demande de justifier l'absence et de reprendre le poste, dans un délai fixé par l'employeur (au moins 15 jours)." },
    reclassement: { fam: 'etape', icon: '🔎', label: 'Recherche de reclassement', desc: "L'employeur recherche un emploi disponible, aussi comparable que possible, dans l'entreprise ou le groupe en France." },
    consultation_cse: { fam: 'etape', icon: '📣', label: 'Consultation du CSE', desc: "Information et consultation des représentants du personnel sur le projet de licenciement." },
    avis_inaptitude: { fam: 'etape', icon: '📋', label: "Avis d'inaptitude", desc: "Rendu par le médecin du travail après étude du poste ; il peut contenir des indications sur le reclassement, ou en dispenser." },
    documents_fin: { fam: 'etape', icon: '🗂️', label: 'Documents de fin de contrat', desc: "Certificat de travail, attestation destinée à France Travail, reçu pour solde de tout compte." },

    /* ---- indemnités et droits */
    indemnite_licenciement: { fam: 'droit', icon: '💵', label: 'Indemnité de licenciement', desc: "Indemnité légale due au salarié en CDI licencié qui compte au moins 8 mois d'ancienneté : 1/4 de mois de salaire par année jusqu'à 10 ans, 1/3 de mois au-delà (sauf convention plus favorable).",
      excl: [{ any: FG, effet: 'non due en cas de faute grave ou lourde', level: G }] },
    indemnite_preavis: { fam: 'droit', icon: '💴', label: 'Indemnité compensatrice de préavis', desc: "Due lorsque l'employeur dispense le salarié d'exécuter son préavis : le salarié perçoit ce qu'il aurait gagné.",
      excl: [{ any: FG, effet: 'non due en cas de faute grave ou lourde', level: G }] },
    indemnite_conges: { fam: 'droit', icon: '🏖️', label: 'Indemnité de congés payés', desc: "Compense les congés acquis et non pris. Elle est due quel que soit le motif de la rupture, même en cas de faute lourde." },
    indemnite_precarite: { fam: 'droit', icon: '💷', label: 'Indemnité de fin de CDD', desc: "« Prime de précarité » : 10 % de la rémunération totale brute du CDD (sauf accord prévoyant 6 % avec accès à la formation). Non due notamment pour un CDD saisonnier ou d'usage, un étudiant pendant ses vacances, une rupture anticipée du fait du salarié ou une faute grave, ou si la relation se poursuit en CDI.",
      excl: [{ any: FG, effet: 'non due en cas de faute grave', level: G }, { any: ['cdi'], effet: 'non due : la relation se poursuit en CDI', level: G }] },
    indemnite_rc: { fam: 'droit', icon: '💸', label: 'Indemnité de rupture conventionnelle', desc: "Indemnité spécifique, au moins égale à l'indemnité légale de licenciement." },
    chomage: { fam: 'droit', icon: '☂️', label: 'Allocation chômage (ARE)', desc: "Versée par France Travail en cas de privation involontaire d'emploi : licenciement, fin de CDD, rupture conventionnelle…",
      excl: [
        { any: ['demission'], effet: 'pas d\'ARE après une démission (sauf démission légitime ou projet de reconversion)', level: R },
        { any: ['abandon_poste'], effet: "pas d'ARE : le salarié est présumé démissionnaire", level: G }
      ] },
    dommages_interets: { fam: 'droit', icon: '🩹', label: 'Dommages-intérêts', desc: "Réparation d'un préjudice. Pour un licenciement sans cause réelle et sérieuse, l'indemnité est encadrée par un barème selon l'ancienneté (art. L1235-3 C. trav.), sauf licenciement nul." },

    /* ---- normes */
    code_travail: { fam: 'norme', icon: '📕', label: 'Code du travail', desc: "La loi fixe l'ordre public social : règles impératives auxquelles on ne déroge qu'en faveur du salarié, et règles supplétives applicables à défaut d'accord." },
    convention_collective: { fam: 'norme', icon: '📗', label: 'Convention de branche', desc: "Accord négocié au niveau de la branche ; elle fixe notamment les salaires minima et les classifications." },
    accord_entreprise: { fam: 'norme', icon: '📘', label: "Accord d'entreprise", desc: "Depuis 2017, il prime sur l'accord de branche dans de nombreux domaines, sauf dans ceux réservés à la branche." },
    reglement_interieur: { fam: 'norme', icon: '📙', label: 'Règlement intérieur', desc: "Document écrit, obligatoire à partir de 50 salariés : hygiène, sécurité, discipline et échelle des sanctions." },
    usage: { fam: 'norme', icon: '🔂', label: "Usage d'entreprise", desc: "Pratique générale, constante et fixe de l'employeur, qui crée un droit pour les salariés jusqu'à sa dénonciation régulière." },

    /* ---- éléments libres (icône et nom au choix, via icone=…) */
    clause: { fam: 'clause', grp: 'Libre', icon: '🧩', label: 'Autre clause', desc: "Clause libre : précisez son nom, son icône (icone=…) et ses conditions (commande condition)." },
    condition: { fam: 'limite', grp: 'Libre', icon: '☑️', label: 'Autre condition', desc: 'Garde-fou ou condition libre.' },
    obligation: { fam: 'obligation', grp: 'Libre', icon: '📌', label: 'Autre obligation', desc: 'Obligation libre.' },
    rupture: { fam: 'rupture', grp: 'Libre', icon: '💔', label: 'Autre rupture', desc: 'Mode de rupture libre.' },
    etape: { fam: 'etape', grp: 'Libre', icon: '🔹', label: 'Autre étape', desc: 'Étape de procédure libre.' },
    droit: { fam: 'droit', grp: 'Libre', icon: '🎁', label: 'Autre droit', desc: 'Indemnité ou droit libre.' },
    norme: { fam: 'norme', grp: 'Libre', icon: '📚', label: 'Autre norme', desc: 'Norme libre.' },
    partie: { fam: 'partie', grp: 'Libre', icon: '👥', label: 'Autre acteur', desc: 'Acteur libre.' },
    contrat: { fam: 'contrat', grp: 'Libre', icon: '📃', label: 'Autre contrat', desc: 'Contrat libre (CDI de chantier, contrat de professionnalisation…).' }
  };
  Object.keys(C).forEach(k => { C[k].key = k; });

  /* ------------------------------------------------------------ alias de types */
  const extra = {
    salarie: ['salarie', 'salariee', 'employe', 'travailleur'], employeur: ['employeur', 'entreprise', 'societe'],
    prudhommes: ['cph', 'juge'], inspection: ['dreets', 'inspection_du_travail', 'administration'],
    non_concurrence: ['nc', 'clause_de_non_concurrence', 'non_concurrence'], mobilite: ['clause_de_mobilite'],
    exclusivite: ['clause_d_exclusivite'], dedit_formation: ['dedit', 'clause_de_dedit_formation'],
    periode_essai: ['essai', 'periode_d_essai'], renouvellement_essai: ['renouvellement'],
    forfait_jours: ['forfait', 'forfait_annuel_en_jours'], confidentialite: ['secret'],
    licenciement_personnel: ['licenciement', 'licenciement_disciplinaire', 'licenciement_pour_motif_personnel'],
    licenciement_eco: ['licenciement_economique'], rupture_conventionnelle: ['rc'],
    rupture_essai: ['rupture_periode_essai', 'rupture_de_la_periode_d_essai'], prise_acte: ['prise_d_acte'],
    contrepartie: ['contrepartie_financiere'], limite_duree: ['duree_limitee', 'limite_temps'], limite_geo: ['limite_geographique', 'limite_espace'],
    interet_legitime: ['interet'], cause_reelle: ['cause_reelle_et_serieuse', 'crs'], indemnite_licenciement: ['indemnite_legale'],
    indemnite_precarite: ['prime_de_precarite', 'precarite', 'indemnite_fin_cdd'], chomage: ['are'], interim: ['mission', 'ctt'],
    manquement: ['faute'], faute_simple: ['faute_serieuse'], documents_fin: ['documents'], condition: ['autre_condition']
  };
  P.KIND_ALIASES = {};
  Object.keys(C).forEach(k => {
    [k, k.replace(/_/g, ''), P.key(C[k].label)].forEach(a => { P.KIND_ALIASES[a] = k; });
  });
  Object.keys(extra).forEach(k => extra[k].forEach(a => { P.KIND_ALIASES[P.key(a)] = k; }));
  P.kindOf = w => P.KIND_ALIASES[P.key(w)] || null;

  /* ------------------------------------------------------------ relations
   * up : orientation pour la disposition (1 : origine au-dessus, -1 : cible au-dessus,
   *      0 : même rangée — chaînes de procédure —, null : ignorée). */
  P.RELS = {
    contient: { label: 'contient', color: '#94a3b8', up: 1, faint: true },
    limite: { label: 'encadre', color: '#059669', up: -1 },
    requiert: { label: 'requiert', color: '#0891b2', up: 1, dash: '7 5' },
    exclut: { label: 'exclut', color: '#dc2626', up: null, dash: '8 6' },
    signe: { label: 'signe', color: '#64748b', up: 1 },
    doit: { label: 'doit', color: '#7c3aed', up: 1 },
    viole: { label: 'viole', color: '#dc2626', up: -1, pill: '⚡' },
    justifie: { label: 'justifie', color: '#ea580c', up: 1 },
    initie: { label: "à l'initiative de", color: '#2563eb', up: 1 },
    met_fin: { label: 'met fin à', color: '#ea580c', up: -1 },
    puis: { label: 'puis', color: '#475569', up: 0 },
    ouvre: { label: 'ouvre droit à', color: '#ca8a04', up: 1 },
    encadre: { label: 'encadre', color: '#92400e', up: 1, dash: '3 4' },
    prevaut: { label: 'prévaut sur', color: '#92400e', up: 1 },
    lien: { label: 'lien', color: '#94a3b8', up: 1 }
  };
  const relAliases = {
    contient: ['contient', 'inclut', 'comporte', 'contains'], limite: ['limite', 'encadre_la', 'garde_fou', 'protege', 'conditionne', 'valide'],
    requiert: ['requiert', 'exige', 'necessite', 'suppose'], exclut: ['exclut', 'incompatible', 'empeche', 'neutralise', 'interdit'],
    signe: ['signe', 'conclut', 'partie_a'], doit: ['doit', 'debiteur', 'assume'], viole: ['viole', 'meconnait', 'enfreint'],
    justifie: ['justifie', 'motive', 'fonde', 'cause'], initie: ['initie', 'initiative', 'decide', 'engage'], met_fin: ['met_fin', 'rompt', 'termine'],
    puis: ['puis', 'ensuite', 'apres', 'then'], ouvre: ['ouvre', 'ouvre_droit', 'donne_droit', 'entraine'],
    encadre: ['encadre', 'regit', 'applique'], prevaut: ['prevaut', 'prime', 'deroge'], lien: ['lien', 'relie', 'link']
  };
  P.REL_ALIASES = {};
  Object.keys(relAliases).forEach(r => relAliases[r].forEach(a => { P.REL_ALIASES[a] = r; }));
  P.relOf = w => P.REL_ALIASES[P.key(w)] || null;

  /** Relation par défaut entre deux éléments, d'après leurs familles. Renvoie [rel, inverser]. */
  P.defaultRel = function (ka, kb) {
    const a = (C[ka] || C.clause).fam, b = (C[kb] || C.clause).fam;
    const T = {
      'limite>*': 'limite', 'partie>contrat': 'signe', 'contrat>clause': 'contient', 'contrat>contrat': 'lien',
      'partie>obligation': 'doit', 'manquement>obligation': 'viole', 'manquement>rupture': 'justifie',
      'partie>rupture': 'initie', 'rupture>contrat': 'met_fin', 'rupture>droit': 'ouvre', 'etape>droit': 'ouvre',
      'rupture>etape': 'puis', 'etape>etape': 'puis', 'etape>rupture': 'puis', 'norme>norme': 'prevaut', 'norme>*': 'encadre',
      'manquement>etape': 'justifie', 'clause>obligation': 'lien', 'contrat>droit': 'ouvre', 'clause>droit': 'ouvre'
    };
    const look = (x, y) => T[x + '>' + y] || T[x + '>*'];
    let r = look(a, b);
    if (r) return [r, false];
    r = look(b, a);
    if (r) return [r, true];
    return ['lien', false];
  };

  /* ------------------------------------------------------------ état */
  P.newState = () => ({
    entities: {}, links: [],
    options: { verif: true },
    view: { perspective: null, focus: [], notes: {}, select: null }
  });
  P.clone = s => JSON.parse(JSON.stringify(s));
  P.linkKey = l => l.from + '>' + l.to;
  P.def = e => C[e && e.kind] || C.clause;
  P.famOf = e => P.def(e).fam;
  P.iconOf = e => (e && e.params && e.params.icone) || P.def(e).icon;

  P.uid = function (st, kind) {
    const d = C[kind] || C.clause;
    const pre = ({ partie: 'P', contrat: 'CT', clause: 'CL', limite: 'G', obligation: 'O', manquement: 'F', rupture: 'R', etape: 'E', droit: 'D', norme: 'N' })[d.fam] || 'X';
    let n = 1; while (st.entities[pre + n]) n++;
    return pre + n;
  };
  P.addEntity = function (st, o) {
    const id = o.id || P.uid(st, o.kind);
    const prev = st.entities[id];
    const clean = {};
    Object.keys(o).forEach(k => { if (o[k] !== undefined) clean[k] = o[k]; });
    st.entities[id] = Object.assign({ id, kind: 'clause', name: (C[o.kind] || C.clause).label, x: 0, y: 0, fixed: false, params: {} }, prev || {}, clean, { id });
    if (prev && o.params) st.entities[id].params = Object.assign({}, prev.params, o.params);
    return id;
  };
  P.findLink = (st, from, to) => st.links.find(l => (l.from === from && l.to === to));
  P.findAnyLink = (st, a, b) => st.links.find(l => (l.from === a && l.to === b) || (l.from === b && l.to === a));
  P.setLink = function (st, from, to, rel, label) {
    let l = P.findLink(st, from, to);
    if (!l) { const r = P.findLink(st, to, from); if (r && r.rel === rel) l = r; }
    if (!l) { l = { from, to, rel: rel || 'lien', label: label || '' }; st.links.push(l); }
    else { if (rel) l.rel = rel; if (label != null) l.label = label; }
    return l;
  };
  P.removeLink = (st, from, to) => { st.links = st.links.filter(l => !(l.from === from && l.to === to)); };
  P.removeEntity = function (st, id) {
    delete st.entities[id];
    st.links = st.links.filter(l => l.from !== id && l.to !== id);
    if (st.view.perspective === id) st.view.perspective = null;
    st.view.focus = (st.view.focus || []).filter(f => f !== id);
    if (st.view.notes) delete st.view.notes[id];
    if (st.view.select === id) st.view.select = null;
  };

  /* ------------------------------------------------------------ calculs */
  P.CATEGORIES = {
    ouvrier: { label: 'Ouvrier', essai: 2, max: 4 }, employe: { label: 'Employé', essai: 2, max: 4 },
    agent_maitrise: { label: 'Agent de maîtrise', essai: 3, max: 6 }, technicien: { label: 'Technicien', essai: 3, max: 6 },
    cadre: { label: 'Cadre', essai: 4, max: 8 }
  };
  P.catKey = v => { const k = P.key(v); if (P.CATEGORIES[k]) return k; if (/maitrise/.test(k)) return 'agent_maitrise'; if (/cadre/.test(k)) return 'cadre'; if (/tech/.test(k)) return 'technicien'; if (/ouvr/.test(k)) return 'ouvrier'; if (/employ/.test(k)) return 'employe'; return null; };
  /** Indemnité légale de licenciement (art. R1234-2) : 1/4 de mois par an jusqu'à 10 ans, 1/3 au-delà. */
  P.indemniteLegale = (salaire, ans) => salaire * (Math.min(ans, 10) / 4 + Math.max(0, ans - 10) / 3);
  P.preavisLegal = ans => ans < 0.5 ? null : (ans < 2 ? 1 : 2);

  /* ------------------------------------------------------------ analyse */
  P.analyze = function (st) {
    const E = st.entities, ids = Object.keys(E), verif = !(st.options && st.options.verif === false);
    const adj = {}, chainAdj = {}, contained = {};
    ids.forEach(i => { adj[i] = new Set(); chainAdj[i] = new Set(); });
    st.links.forEach(l => {
      if (!E[l.from] || !E[l.to] || l.rel === 'exclut') return;
      adj[l.from].add(l.to); adj[l.to].add(l.from);
      if (l.rel === 'puis') { chainAdj[l.from].add(l.to); chainAdj[l.to].add(l.from); }
      if (l.rel === 'contient') (contained[l.to] = contained[l.to] || []).push(l.from);
    });
    const comp = (start, nb, stop) => {
      const seen = new Set([start]), q = [start];
      while (q.length) { const u = q.shift(); for (const v of nb[u]) if (!seen.has(v) && !(stop && stop(v))) { seen.add(v); q.push(v); } }
      return seen;
    };
    /* dossier : composante connexe sans passer par les parties ni les normes (qui relient plusieurs contrats) */
    const hub = id => ['partie', 'norme'].includes(P.famOf(E[id]));
    const dossierOf = {}; let nd = 0;
    ids.forEach(i => {
      if (dossierOf[i] != null) return;
      if (hub(i)) { dossierOf[i] = 'h' + i; return; }
      const s = comp(i, adj, hub); nd++; s.forEach(x => { dossierOf[x] = nd; });
    });
    const sameDossier = (a, b) => dossierOf[a] === dossierOf[b];
    const kinds = id => E[id].kind;

    /* contexte d'une condition : voisins directs, et toute la chaîne de procédure (« puis ») */
    const ctxReq = id => {
      const s = new Set(adj[id]);
      const ch = new Set([id]);
      // chaîne de procédure : partant de l'élément ou d'un de ses voisins directs
      [id].concat(Array.from(adj[id])).forEach(x => { if (chainAdj[x].size) comp(x, chainAdj).forEach(y => ch.add(y)); });
      ch.forEach(y => s.add(y));
      // contrat voisin (celui qui contient la clause, ou que la rupture termine) : ses clauses et ses formalités comptent
      Array.from(adj[id]).forEach(x => {
        if (P.famOf(E[x]) !== 'contrat') return;
        st.links.forEach(l => {
          if (l.from === x && l.rel === 'contient' && E[l.to]) s.add(l.to);
          if (l.to === x && l.rel === 'limite' && E[l.from]) s.add(l.from);
        });
      });
      s.delete(id);
      return s;
    };
    const param = (id, key) => {
      const own = E[id].params && E[id].params[key];
      if (own != null && own !== '') return own;
      const cand = ids.filter(x => x !== id && sameDossier(x, id) || (adj[id].has(x)));
      // la partie salariée reliée au dossier (via signe / initie) porte souvent les paramètres
      const parties = ids.filter(x => P.famOf(E[x]) === 'partie' && Array.from(adj[x]).some(y => sameDossier(y, id)));
      for (const x of cand.concat(parties)) { const v = E[x].params && E[x].params[key]; if (v != null && v !== '') return v; }
      return null;
    };

    const info = {}, autoLinks = [];
    ids.forEach(id => {
      const e = E[id], d = P.def(e), I = { reqs: [], issues: [], calc: [], status: 'neutral', verdict: '' };
      info[id] = I;
      const ctx = ctxReq(id);
      (d.req || []).forEach(r => {
        const via = Array.from(ctx).find(x => r.any.includes(kinds(x)));
        I.reqs.push({ any: r.any, ok: !!via, via: via || null, level: r.level, effet: r.effet, why: r.why });
        if (!via) I.issues.push({ level: r.level, effet: r.effet, text: 'Manque : ' + C[r.any[0]].label + (r.any.length > 1 ? ' (ou équivalent)' : ''), why: r.why });
      });
      (e.conds || []).forEach(c => {
        I.reqs.push({ custom: true, label: c.label, ok: !!c.ok, level: c.level || G, effet: c.effet || '' });
        if (!c.ok) I.issues.push({ level: c.level || G, effet: c.effet || 'condition non remplie', text: 'Manque : ' + c.label });
      });
      if (d.illicite) I.issues.push({ level: G, effet: d.illicite, text: 'Clause illicite par nature' });
      (d.excl || []).forEach(x => {
        ids.forEach(o => {
          if (o === id || !x.any.includes(kinds(o)) || !sameDossier(o, id)) return;
          I.issues.push({ level: x.level, effet: x.effet, text: '⊘ ' + E[o].name, other: o });
          autoLinks.push({ from: o, to: id, effet: x.effet, level: x.level, auto: true });
        });
      });
      st.links.forEach(l => {
        if (l.rel !== 'exclut' || l.to !== id || !E[l.from]) return;
        // exclusion explicite : effective seulement si les deux éléments sont dans le même dossier
        if (sameDossier(l.from, id)) I.issues.push({ level: G, effet: l.label || 'incompatible avec ' + E[l.from].name, text: '⊘ ' + E[l.from].name, other: l.from });
      });
      /* obligations : violées si un manquement y est relié */
      if (d.fam === 'obligation') {
        const v = Array.from(adj[id]).filter(x => P.famOf(E[x]) === 'manquement');
        if (v.length) { I.violee = v; }
      }
      /* calculs et contrôles chiffrés */
      const ans = P.num(param(id, 'anciennete')), sal = P.num(param(id, 'salaire')), cat = P.catKey(param(id, 'categorie') || '');
      if (e.kind === 'periode_essai' || e.kind === 'renouvellement_essai') {
        const du = P.num(e.params && e.params.duree), inCdd = ids.some(x => kinds(x) === 'cdd' && sameDossier(x, id));
        if (du != null && cat && !inCdd) {
          const max = e.kind === 'periode_essai' ? P.CATEGORIES[cat].essai : P.CATEGORIES[cat].max;
          I.calc.push(`${P.mois(du)} · maximum légal ${P.CATEGORIES[cat].label.toLowerCase()} : ${max} mois${e.kind === 'renouvellement_essai' ? ' renouvellement compris' : ''}`);
          if (du > max + 1e-9) I.issues.push({ level: G, effet: `durée excessive : ramenée à ${max} mois au plus`, text: `Durée ${P.mois(du)} > ${max} mois` });
        } else if (du != null) I.calc.push(P.mois(du) + (inCdd ? ' (CDD : règles propres)' : ''));
      }
      if (e.kind === 'cdd') {
        const du = P.num(e.params && e.params.duree);
        if (du != null) {
          I.calc.push(`durée ${P.mois(du)} · maximum 18 mois (cas général)`);
          if (du > 18 + 1e-9) I.issues.push({ level: G, effet: 'requalification en CDI', text: `Durée ${P.mois(du)} > 18 mois` });
        }
      }
      if (e.kind === 'preavis' && ans != null) {
        const lic = ids.some(x => LIC.includes(kinds(x)) && sameDossier(x, id));
        if (lic) { const p = P.preavisLegal(ans); I.calc.push(p ? `préavis légal : ${p} mois (${P.round2(ans).toLocaleString('fr-FR')} an(s) d'ancienneté)` : "moins de 6 mois d'ancienneté : convention ou usage"); }
      }
      if ((e.kind === 'indemnite_licenciement' || e.kind === 'indemnite_rc') && ans != null) {
        if (ans < 8 / 12 - 1e-9 && e.kind === 'indemnite_licenciement') I.issues.push({ level: G, effet: "non due : moins de 8 mois d'ancienneté", text: 'Ancienneté insuffisante' });
        else if (sal != null) {
          const m = P.indemniteLegale(sal, ans);
          I.calc.push(`${e.kind === 'indemnite_rc' ? 'minimum légal' : 'montant légal'} ≈ ${P.eur(m)}`);
          I.calcDetail = `${P.eur(sal)} × (1/4 × ${P.round2(Math.min(ans, 10)).toLocaleString('fr-FR')} an(s)${ans > 10 ? ` + 1/3 × ${P.round2(ans - 10).toLocaleString('fr-FR')} an(s)` : ''})`;
          const mt = P.num(e.params && e.params.montant);
          if (e.kind === 'indemnite_rc' && mt != null && mt < m - 0.5) I.issues.push({ level: G, effet: "inférieure au minimum légal : homologation refusée", text: `${P.eur(mt)} < ${P.eur(m)}` });
        }
      }
      if (e.kind === 'indemnite_precarite') {
        const tot = P.num(param(id, 'remuneration_totale'));
        if (tot != null) I.calc.push(`10 % × ${P.eur(tot)} = ${P.eur(tot * 0.1)}`);
      }
      /* statut */
      const ov = e.status && e.status.v;
      if (ov && ov !== 'auto') { I.status = ov; I.verdict = e.status.text || ({ ok: 'valide', ko: 'nulle', risk: 'à risque', neutral: '' })[ov] || ''; I.override = true; }
      else if (I.violee) { I.status = 'violee'; I.verdict = 'violée'; }
      else {
        const g = I.issues.find(x => x.level === G), r = I.issues.find(x => x.level === R);
        if (g) { I.status = 'ko'; I.verdict = g.effet; }
        else if (r) { I.status = 'risk'; I.verdict = r.effet; }
        else if (I.reqs.length) { I.status = 'ok'; I.verdict = d.okText || (d.fam === 'rupture' ? 'régulière' : d.fam === 'contrat' ? 'conditions remplies' : 'valide'); }
      }
      if (!verif && !I.override) { I.status = 'neutral'; I.verdict = ''; I.hidden = true; }
    });

    /* contrats et leur contenu (cadre « feuille » autour des clauses) */
    const frames = ids.filter(i => P.famOf(E[i]) === 'contrat').map(cid => {
      const m = new Set([cid]);
      st.links.forEach(l => { if (l.rel === 'contient' && l.from === cid && E[l.to]) m.add(l.to); });
      // les garde-fous reliés à une clause du contrat font partie du contrat
      st.links.forEach(l => { if (l.rel === 'limite' && m.has(l.to) && l.to !== cid && E[l.from] && !contained[l.from]) m.add(l.from); });
      return { id: cid, members: Array.from(m) };
    }).filter(f => f.members.length > 1);

    const an = { ids, info, autoLinks: verif ? autoLinks : [], frames, dossierOf, adj, verif };
    an.sameDossier = sameDossier;
    an.counts = () => {
      const c = { ko: 0, risk: 0, ok: 0, violee: 0 };
      ids.forEach(i => { if (c[info[i].status] != null) c[info[i].status]++; });
      return c;
    };
    an.related = id => { const s = new Set([id]); ids.forEach(x => { if (sameDossier(x, id) || adj[id].has(x)) s.add(x); }); return s; };
    return an;
  };

  P.STATUS = {
    ok: { label: 'Valide', icon: '✅', color: '#16a34a' },
    risk: { label: 'À risque', icon: '⚠️', color: '#d97706' },
    ko: { label: 'Nulle / irrégulière', icon: '⛔', color: '#dc2626' },
    violee: { label: 'Obligation violée', icon: '⚡', color: '#dc2626' },
    neutral: { label: 'Sans vérification', icon: '', color: '#94a3b8' }
  };

  /* ------------------------------------------------------------ disposition automatique
   * Couches de haut en bas selon l'orientation des relations ; les chaînes de procédure
   * (« puis ») sont posées sur une même rangée, de gauche à droite. */
  P.layout = function (st) {
    const E = st.entities, ids = Object.keys(E);
    if (!ids.some(i => !E[i].fixed)) return;
    /* unités : chaînes « puis » ordonnées, ou éléments seuls */
    const unitOf = {}, units = [];
    const pnext = {}, pprev = {};
    ids.forEach(i => { pnext[i] = []; pprev[i] = []; });
    st.links.forEach(l => { if (l.rel === 'puis' && E[l.from] && E[l.to] && l.from !== l.to) { pnext[l.from].push(l.to); pprev[l.to].push(l.from); } });
    ids.forEach(i => {
      if (unitOf[i] != null) return;
      const comp = new Set([i]), q = [i];
      while (q.length) { const u = q.shift(); pnext[u].concat(pprev[u]).forEach(v => { if (!comp.has(v)) { comp.add(v); q.push(v); } }); }
      // ordre : parcours en largeur depuis les têtes de chaîne
      const order = [], seen = new Set(), heads = Array.from(comp).filter(x => !pprev[x].some(y => comp.has(y)));
      const qq = heads.length ? heads.slice() : [i];
      while (qq.length) { const u = qq.shift(); if (seen.has(u)) continue; seen.add(u); order.push(u); pnext[u].forEach(v => { if (!seen.has(v)) qq.push(v); }); }
      comp.forEach(x => { if (!seen.has(x)) order.push(x); });
      const uid = units.length; units.push(order); order.forEach(x => { unitOf[x] = uid; });
    });
    const out = units.map(() => new Set()), indeg = units.map(() => 0);
    st.links.forEach(l => {
      const r = P.RELS[l.rel] || P.RELS.lien;
      if (!E[l.from] || !E[l.to] || r.up == null || r.up === 0) return;
      let a = unitOf[l.from], b = unitOf[l.to];
      if (r.up < 0) [a, b] = [b, a];
      if (a === b || out[a].has(b)) return;
      out[a].add(b); indeg[b]++;
    });
    const U = units.map((u, i) => i);
    const mark = {}, back = new Set();
    const dfs = u => { mark[u] = 1; for (const v of out[u]) { if (mark[v] === 1) back.add(u + '>' + v); else if (!mark[v]) dfs(v); } mark[u] = 2; };
    U.filter(i => !indeg[i]).forEach(i => { if (!mark[i]) dfs(i); });
    U.forEach(i => { if (!mark[i]) dfs(i); });
    const edges = [];
    U.forEach(u => out[u].forEach(v => { if (!back.has(u + '>' + v)) edges.push([u, v]); }));
    const lvl = U.map(() => 0);
    for (let it = 0; it <= U.length; it++) {
      let ch = false;
      edges.forEach(([u, v]) => { if (lvl[v] < lvl[u] + 1) { lvl[v] = lvl[u] + 1; ch = true; } });
      if (!ch) break;
    }
    U.forEach(u => {
      if (edges.some(e => e[1] === u)) return;
      const ch = edges.filter(e => e[0] === u).map(e => lvl[e[1]]);
      if (ch.length) lvl[u] = Math.max(0, Math.min.apply(null, ch) - 1);
    });
    const layers = {};
    U.forEach(u => { (layers[lvl[u]] = layers[lvl[u]] || []).push(u); });
    const keys = Object.keys(layers).map(Number).sort((a, b) => a - b);
    const DX = 212, DY = 150, cx = {};
    const width = u => units[u].length * DX;
    const place = k => {
      const L = layers[k], tot = L.reduce((s, u) => s + width(u), 0);
      let x = -tot / 2;
      L.forEach(u => { cx[u] = x + width(u) / 2; x += width(u); });
    };
    keys.forEach(place);
    const bary = (u, up) => {
      const ns = up ? edges.filter(e => e[1] === u).map(e => e[0]) : edges.filter(e => e[0] === u).map(e => e[1]);
      if (!ns.length) return null;
      return ns.reduce((s, n) => s + cx[n], 0) / ns.length;
    };
    for (let sweep = 0; sweep < 4; sweep++) {
      const up = sweep % 2 === 0;
      (up ? keys : keys.slice().reverse()).forEach(k => {
        const b = {};
        layers[k].forEach(u => { const v = bary(u, up); b[u] = v == null ? cx[u] : v; });
        layers[k].sort((a, c) => b[a] - b[c]);
        place(k);
      });
    }
    U.forEach(u => {
      const L = units[u], x0 = cx[u] - (L.length - 1) * DX / 2;
      L.forEach((id, j) => { if (!E[id].fixed) { E[id].x = Math.round(x0 + j * DX); E[id].y = lvl[u] * DY; } });
    });
  };
})();
