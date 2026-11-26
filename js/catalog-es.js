/* ============================================================
 * Contract Lab — catálogo del derecho del trabajo español.
 * Mismas familias y relaciones que el catálogo francés (js/model.js);
 * claves en snake_case español, sin tildes.
 *
 * Posición: derecho vigente a 26 de noviembre de 2026 — Estatuto de los
 * Trabajadores (RDL 2/2015, ET) tras la reforma laboral (RDL 32/2021),
 * Ley reguladora de la jurisdicción social (Ley 36/2011, LRJS), LGSS.
 * Cifras anuales (a actualizar cada año) = parámetros con valor por defecto:
 *   smi_mensual = 1221 € en 14 pagas (smi_anual = 17094 €) ⚠️ SMI 2026 a verificar
 *     en el real decreto anual (2025: 1184 € × 14, RD 87/2025).
 * Convenciones de cálculo (simplificaciones ⚠️):
 *   salario        = salario bruto mensual CON prorrata de pagas extra (= anual / 12)
 *   salario_diario = salario × 12 / 365 (o parámetro salario_diario)
 *   antiguedad     = años de servicio (decimales); prorrata por meses: mes iniciado = mes completo
 *   tope en mensualidades = número de mensualidades × salario mensual.
 * ============================================================ */
(function () {
  'use strict';
  const P = window.P = window.P || {};
  const G = 'grave', R = 'risque';

  /* ------------------------------------------------------------ valores por defecto (actualizar cada año) */
  const DEF = { smi_mensual: 1221, smi_pagas: 14, smi_anual: 17094, jornada_max: 40, horas_extra_max: 80, vacaciones_min: 30, caducidad: 20 };

  const DESPIDOS = ['despido_disciplinario', 'despido_objetivo', 'despido_colectivo'];
  const PRUEBA_NOTE = ' ⚠️ Simplificación: categoria=tecnico_titulado (6 meses), demás (2 meses; 3 meses si plantilla < 25); el convenio colectivo puede fijar otras duraciones (parámetro max_convenio).';

  const CAT_ES = {
    /* ---- partes */
    empresa: { fam: 'partie', icon: '🏢', label: 'Empresa', params: ['plantilla'], desc: 'Empresario: persona física o jurídica que recibe la prestación de servicios (art. 1.2 ET). Ejerce el poder de dirección y el poder disciplinario (arts. 20 y 58 ET). Parámetro: plantilla (número de trabajadores).' },
    trabajador: { fam: 'partie', icon: '👤', label: 'Trabajador', params: ['antiguedad', 'salario', 'categoria'], desc: 'Presta servicios retribuidos por cuenta ajena, dentro del ámbito de organización y dirección del empresario (art. 1.1 ET): voluntariedad, ajenidad, dependencia y retribución. Parámetros: antiguedad (años, con decimales), salario (bruto mensual con prorrata de pagas extra), categoria (tecnico_titulado, tecnico u otro).' },
    representantes: { fam: 'partie', icon: '🗣️', label: 'Representantes de los trabajadores', desc: 'Delegados de personal (empresas de 11 a 49 trabajadores; de 6 a 10 si lo deciden) o comité de empresa (50 o más), y secciones sindicales. Negocian el periodo de consultas del despido colectivo y reciben copia de ciertas comunicaciones. Gozan de garantías frente al despido (expediente contradictorio, opción en caso de improcedencia).' },
    inspeccion_trabajo: { fam: 'partie', icon: '🏛️', label: 'Inspección de Trabajo', desc: 'Inspección de Trabajo y Seguridad Social (ITSS): vigila el cumplimiento de la normativa (contratación temporal fraudulenta, registro de jornada, prevención de riesgos) y propone sanciones (LISOS).' },
    smac: { fam: 'partie', icon: '🕊️', label: 'Servicio de conciliación (SMAC)', desc: 'Servicio administrativo de mediación, arbitraje y conciliación (SMAC u órgano autonómico equivalente). La conciliación previa ante él es, en general, requisito para demandar por despido (art. 63 LRJS).' },
    juzgado_social: { fam: 'partie', icon: '⚖️', label: 'Juzgado de lo Social', desc: 'Órgano judicial que conoce de los litigios individuales de trabajo: despido, extinción del art. 50, reclamaciones de cantidad. Califica el despido como procedente, improcedente o nulo (art. 108 LRJS).' },
    sepe: { fam: 'partie', icon: '🏦', label: 'SEPE', desc: 'Servicio Público de Empleo Estatal: reconoce y paga la prestación por desempleo a quien queda en situación legal de desempleo (art. 267 LGSS).' },
    fogasa: { fam: 'partie', icon: '🛟', label: 'FOGASA', desc: 'Fondo de Garantía Salarial: abona salarios e indemnizaciones pendientes cuando la empresa es insolvente o está en concurso, con los límites del art. 33 ET.' },
    nueva_empresa: { fam: 'partie', icon: '🏭', label: 'Nueva empresa', desc: 'Empresa competidora a la que se incorpora el trabajador tras la extinción: es donde opera el pacto de no competencia postcontractual.' },

    /* ---- contratos */
    contrato_indefinido: { fam: 'contrat', icon: '📄', label: 'Contrato indefinido', desc: 'El contrato de trabajo se presume concertado por tiempo indefinido (art. 15.1 ET, tras el RDL 32/2021). Puede celebrarse por escrito o de palabra si es a jornada completa; si la relación supera cuatro semanas, el empresario debe informar por escrito de los elementos esenciales (art. 8.5 ET). ⚠️ La adaptación a la Directiva (UE) 2019/1152 sobre condiciones transparentes está pendiente o en curso: verificar plazos.',
      req: [{ any: ['informacion_elementos', 'forma_escrita'], effet: 'falta la información escrita de los elementos esenciales (art. 8.5 ET)', level: R, why: 'Información escrita de los elementos esenciales del contrato (relación de más de cuatro semanas).' }],
      ouvre: ['dimision', 'despido_disciplinario', 'despido_objetivo', 'extincion_mutuo_acuerdo'] },
    contrato_temporal: { fam: 'contrat', icon: '⏳', label: 'Contrato por circunstancias de la producción', params: ['duracion', 'meses_acumulados'], desc: 'Contrato de duración determinada por circunstancias de la producción (art. 15.2 ET): incremento ocasional e imprevisible de la actividad, o fluctuaciones, hasta 6 meses (ampliable a 1 año por convenio sectorial); u ocasional y previsible de duración reducida, 90 días al año como máximo, no continuados. Debe identificar con precisión la causa, las circunstancias concretas y su conexión con la duración. Más de 18 meses en 24 con contratos por circunstancias de la producción: el trabajador adquiere la condición de fijo (art. 15.5 ET). Parámetros: duracion (meses), meses_acumulados (meses trabajados en los últimos 24).',
      req: [
        { any: ['forma_escrita'], effet: 'se presume indefinido (art. 8.2 ET)', level: G, why: 'Por escrito (contratos de duración determinada de más de cuatro semanas).' },
        { any: ['causa_temporal'], effet: 'fijo: contrato temporal sin causa, en fraude de ley (art. 15.4 ET)', level: G, why: 'Causa habilitante precisa, circunstancias concretas y conexión con la duración (art. 15.1 ET).' }
      ],
      ouvre: ['fin_contrato_temporal'] },
    contrato_sustitucion: { fam: 'contrat', icon: '🔁', label: 'Contrato de sustitución', desc: 'Para sustituir a una persona trabajadora con derecho a reserva del puesto (incapacidad temporal, nacimiento, excedencia…), para completar una jornada reducida, o para cubrir un puesto durante un proceso de selección (máx. 3 meses) (art. 15.3 ET). Debe especificar el nombre de la persona sustituida y la causa. Su finalización no da derecho a la indemnización de 12 días (art. 49.1.c ET).',
      req: [
        { any: ['forma_escrita'], effet: 'se presume indefinido (art. 8.2 ET)', level: G, why: 'Por escrito.' },
        { any: ['causa_temporal'], effet: 'fijo: sustitución sin causa identificada (art. 15.4 ET)', level: G, why: 'Nombre de la persona sustituida y causa de la sustitución.' }
      ],
      ouvre: ['fin_contrato_temporal'] },
    contrato_formativo: { fam: 'contrat', icon: '🎓', label: 'Contrato formativo', desc: 'Art. 11 ET: formación en alternancia (compatibiliza trabajo y formación, de 3 meses a 2 años) u obtención de práctica profesional (dentro de los 3 años siguientes a la titulación, de 6 meses a 1 año). Siempre por escrito, con plan formativo individual. Su finalización no da derecho a la indemnización de 12 días.',
      req: [{ any: ['forma_escrita'], effet: 'se presume indefinido (art. 8.2 ET)', level: G, why: 'Contrato por escrito, con el plan formativo individual.' }],
      ouvre: ['fin_contrato_temporal'] },
    fijo_discontinuo: { fam: 'contrat', icon: '🌗', label: 'Contrato fijo-discontinuo', desc: 'Contrato indefinido para trabajos de naturaleza estacional o de temporada, o de prestación intermitente con periodos de ejecución ciertos (art. 16 ET). Por escrito, con los elementos esenciales de la actividad; el llamamiento se hace según el convenio, por escrito y con antelación. La reforma de 2021 lo convirtió en la alternativa a la temporalidad.',
      req: [{ any: ['forma_escrita'], effet: 'se presume a jornada completa e indefinido ordinario (art. 8.2 ET)', level: G, why: 'Por escrito, con la duración del periodo de actividad, la jornada y su distribución.' }] },

    /* ---- cláusulas : contenido básico */
    salario: { fam: 'clause', grp: 'Contenido básico', icon: '💶', label: 'Salario', params: ['salario'], desc: 'Retribución en dinero o en especie (art. 26 ET), con al menos dos pagas extraordinarias al año (art. 31 ET), nunca inferior al salario mínimo interprofesional (art. 27 ET) ni a las tablas del convenio. SMI 2026: 1221 € al mes en 14 pagas, 17094 € al año ⚠️ a verificar (parámetros smi_mensual, smi_anual). Aquí el parámetro salario es el bruto mensual con prorrata de pagas (anual / 12).' },
    jornada: { fam: 'clause', grp: 'Contenido básico', icon: '⏱️', label: 'Jornada', params: ['horas_semanales'], desc: 'Duración máxima de la jornada ordinaria: 40 horas semanales de trabajo efectivo de promedio en cómputo anual (art. 34.1 ET); 12 horas de descanso entre jornadas y máximo 9 horas ordinarias diarias salvo convenio (art. 34.3). La empresa debe registrar diariamente la jornada (art. 34.9). ⚠️ El proyecto de reducción a 37,5 horas fue rechazado por el Congreso en septiembre de 2025, y se anunció un registro de jornada digital por reglamento: verificar su estado.',
      req: [{ any: ['registro_jornada'], effet: 'infracción: falta el registro diario de jornada (art. 34.9 ET)', level: R, why: 'Registro diario de jornada, con hora de inicio y de fin, conservado 4 años.' }] },
    tiempo_parcial: { fam: 'clause', grp: 'Contenido básico', icon: '🌓', label: 'Tiempo parcial', desc: 'Jornada inferior a la de un trabajador a tiempo completo comparable (art. 12 ET). El contrato debe formalizarse por escrito, con el número de horas y su distribución; si no, se presume celebrado a jornada completa, salvo prueba en contrario.',
      req: [{ any: ['forma_escrita'], effet: 'se presume a jornada completa (art. 12.4 ET)', level: G, why: 'Por escrito, con las horas ordinarias y su distribución.' }] },
    horas_extra: { fam: 'clause', grp: 'Contenido básico', icon: '🕐', label: 'Horas extraordinarias', params: ['horas_anuales'], desc: 'Horas que superan la jornada máxima ordinaria. Se retribuyen (nunca por debajo del valor de la hora ordinaria) o se compensan con descanso. Máximo 80 al año (art. 35.2 ET); no computan las compensadas con descanso dentro de los 4 meses siguientes. Voluntarias, salvo pacto.' },
    vacaciones: { fam: 'clause', grp: 'Contenido básico', icon: '🏖️', label: 'Vacaciones', params: ['dias'], desc: 'Al menos 30 días naturales de vacaciones retribuidas al año (art. 38.1 ET). No pueden sustituirse por dinero, salvo al extinguirse el contrato (vacaciones no disfrutadas en el finiquito).' },
    periodo_prueba: { fam: 'clause', grp: 'Contenido básico', icon: '🧪', label: 'Periodo de prueba', params: ['duracion'], desc: 'Pactado por escrito (art. 14.1 ET). Duración según convenio; en su defecto, máximo 6 meses para técnicos titulados y 2 meses para los demás trabajadores (3 meses en empresas de menos de 25 trabajadores). En contratos temporales de hasta 6 meses, máximo 1 mes salvo convenio. Es nulo si el trabajador ya desempeñó las mismas funciones en la empresa. Durante la prueba, cualquiera de las partes puede desistir sin preaviso ni indemnización, salvo pacto.' + PRUEBA_NOTE,
      req: [{ any: ['forma_escrita'], effet: 'inexistente: el periodo de prueba debe pactarse por escrito (art. 14.1 ET)', level: G, why: 'Pacto escrito del periodo de prueba.' }],
      excl: [{ any: ['funciones_previas'], effet: 'nulo: el trabajador ya desempeñó las mismas funciones en la empresa (art. 14.1 ET)', level: G }] },

    /* ---- cláusulas : pactos del art. 21 ET */
    pacto_no_competencia: { fam: 'clause', grp: 'Pactos (art. 21 ET)', icon: '🚫', label: 'Pacto de no competencia', params: ['duracion'], desc: 'Prohíbe al trabajador, tras la extinción, trabajar para la competencia. Duración máxima: 2 años para los técnicos y 6 meses para los demás trabajadores (art. 21.2 ET). Solo es válido si el empresario tiene un efectivo interés industrial o comercial y si se satisface una compensación económica adecuada. La jurisprudencia no admite que el empresario renuncie a él unilateralmente una vez extinguido el contrato. Parámetro: duracion (meses).',
      req: [
        { any: ['interes_efectivo'], effet: 'nulo (art. 21.2.a ET)', level: G, why: 'Efectivo interés industrial o comercial del empresario.' },
        { any: ['compensacion_economica'], effet: 'nulo (art. 21.2.b ET)', level: G, why: 'Compensación económica adecuada al trabajador.' }
      ] },
    pacto_permanencia: { fam: 'clause', grp: 'Pactos (art. 21 ET)', icon: '⚓', label: 'Pacto de permanencia', params: ['duracion'], desc: 'Si el trabajador ha recibido una especialización profesional con cargo al empresario para poner en marcha proyectos determinados o realizar un trabajo específico, puede pactarse que permanezca en la empresa durante cierto tiempo: máximo 2 años, siempre por escrito (art. 21.4 ET). Si se va antes, el empresario tiene derecho a una indemnización de daños y perjuicios.',
      req: [
        { any: ['especializacion_costeada'], effet: 'nulo: sin especialización profesional costeada por la empresa (art. 21.4 ET)', level: G, why: 'Especialización profesional con cargo al empresario.' },
        { any: ['forma_escrita'], effet: 'nulo: el pacto de permanencia se formaliza siempre por escrito (art. 21.4 ET)', level: G, why: 'Por escrito.' }
      ],
      excl: [{ any: ['despido_objetivo', 'despido_colectivo', 'extincion_art50'], effet: 'inaplicable: el contrato no termina por abandono voluntario del trabajador', level: G }] },
    pacto_plena_dedicacion: { fam: 'clause', grp: 'Pactos (art. 21 ET)', icon: '🔒', label: 'Pacto de plena dedicación', desc: 'Exclusividad durante el contrato: el trabajador no trabaja para otros empresarios. Solo cabe mediante compensación económica expresa (art. 21.1 ET). El trabajador puede rescindir el pacto y recuperar su libertad comunicándolo por escrito con 30 días de preaviso, perdiendo la compensación (art. 21.3 ET). Sin pacto, el pluriempleo es libre salvo concurrencia desleal.',
      req: [{ any: ['compensacion_economica'], effet: 'nulo: la plena dedicación exige compensación económica expresa (art. 21.1 ET)', level: G, why: 'Compensación económica expresa, en los términos pactados.' }] },
    confidencialidad: { fam: 'clause', grp: 'Pactos (art. 21 ET)', icon: '🤐', label: 'Confidencialidad', desc: 'Obliga a no divulgar secretos e información reservada de la empresa, durante y después del contrato (buena fe, art. 5.a ET; Ley 1/2019 de secretos empresariales). No impide trabajar para un competidor y no exige compensación, a diferencia de la no competencia.' },

    /* ---- cláusulas ilícitas */
    renuncia_derechos: { fam: 'clause', grp: 'Cláusulas nulas', icon: '🙈', label: 'Renuncia a derechos', desc: 'Cláusula por la que el trabajador renuncia a derechos reconocidos por normas de derecho necesario o por convenio (vacaciones, indemnización legal, salario mínimo…).',
      illicite: 'nula: el trabajador no puede disponer de derechos indisponibles (art. 3.5 ET)' },
    clausula_discriminatoria: { fam: 'clause', grp: 'Cláusulas nulas', icon: '🚷', label: 'Cláusula discriminatoria', desc: 'Distingue por sexo, origen, estado civil, edad, discapacidad, religión, ideas políticas, orientación sexual, afiliación sindical, lengua… (art. 17.1 ET; art. 14 CE).',
      illicite: 'nula y sin efecto (art. 17.1 ET)' },

    /* ---- garantías y condiciones */
    forma_escrita: { fam: 'limite', grp: 'Forma', icon: '✍️', label: 'Por escrito', desc: 'Forma escrita exigida: contratos temporales de más de cuatro semanas, formativos, a tiempo parcial y fijos-discontinuos (art. 8.2 ET), periodo de prueba, pacto de permanencia. Sin ella, se presume el contrato indefinido y a jornada completa, salvo prueba en contrario.' },
    informacion_elementos: { fam: 'limite', grp: 'Forma', icon: '📝', label: 'Información de los elementos esenciales', desc: 'Información escrita al trabajador sobre los elementos esenciales del contrato y las principales condiciones de la prestación (art. 8.5 ET): identidad de las partes, fecha de inicio, centro, categoría, salario, jornada, vacaciones, preaviso, convenio aplicable.' },
    causa_temporal: { fam: 'limite', grp: 'Forma', icon: '📌', label: 'Causa temporal precisa', desc: 'Causa habilitante del contrato temporal identificada con precisión: circunstancias concretas que la justifican y conexión con la duración prevista (art. 15.1 ET); en la sustitución, nombre de la persona sustituida y causa.' },
    interes_efectivo: { fam: 'limite', grp: 'Pactos', icon: '🏰', label: 'Interés industrial o comercial efectivo', desc: 'El empresario tiene un interés real en que el trabajador no compita: acceso a clientela, a secretos o a conocimientos estratégicos. No basta con evitar la competencia en general.' },
    compensacion_economica: { fam: 'limite', grp: 'Pactos', icon: '💰', label: 'Compensación económica adecuada', desc: 'Cantidad que compensa la limitación de la libertad de trabajo: no competencia (art. 21.2.b ET) o plena dedicación (art. 21.1 ET). Debe ser adecuada, no simbólica; puede abonarse durante o después del contrato según lo pactado.' },
    especializacion_costeada: { fam: 'limite', grp: 'Pactos', icon: '🎒', label: 'Especialización costeada por la empresa', desc: 'Formación especializada pagada por el empresario, que va más allá de la formación ordinaria exigida para el puesto (art. 21.4 ET).' },
    funciones_previas: { fam: 'limite', grp: 'Hechos relevantes', icon: '🔂', label: 'Ya desempeñó las mismas funciones', desc: 'Hecho: el trabajador ya había desempeñado las mismas funciones en la empresa, bajo cualquier modalidad de contratación. Hace nulo el periodo de prueba (art. 14.1 ET).' },
    embarazo: { fam: 'limite', grp: 'Hechos relevantes', icon: '🤰', label: 'Embarazo o permiso protegido', desc: 'Hecho: embarazo, permiso por nacimiento, lactancia, reducción de jornada o excedencia por cuidado… El despido es nulo salvo que se declare procedente por motivos no relacionados con el embarazo o el ejercicio de esos derechos (art. 55.5 ET); la resolución del periodo de prueba también es nula salvo motivos ajenos (art. 14.2 ET).' },
    vulneracion_derechos: { fam: 'limite', grp: 'Hechos relevantes', icon: '🚨', label: 'Discriminación o vulneración de derechos fundamentales', desc: 'Hecho: la decisión tiene por móvil una causa de discriminación o vulnera derechos fundamentales (libertad sindical, libertad de expresión, intimidad, garantía de indemnidad frente a represalias por reclamar). El despido es nulo (art. 55.5 ET); el trabajador aporta indicios y el empresario debe probar una justificación objetiva (art. 181.2 LRJS).' },
    causas_etop: { fam: 'limite', grp: 'Condiciones de extinción', icon: '📉', label: 'Causas económicas, técnicas, organizativas o de producción', desc: 'Art. 51.1 ET: económicas (pérdidas actuales o previstas, o disminución persistente de ingresos o ventas durante tres trimestres consecutivos), técnicas (medios o instrumentos de producción), organizativas (sistemas y métodos de trabajo) o de producción (demanda de productos o servicios). La empresa debe acreditarlas.' },
    hechos_fecha: { fam: 'limite', grp: 'Condiciones de extinción', icon: '🗓️', label: 'Hechos concretos y fecha de efectos', desc: 'La carta de despido disciplinario debe recoger los hechos que lo motivan, con precisión suficiente para que el trabajador pueda defenderse, y la fecha de efectos (art. 55.1 ET). El empresario no podrá alegar en juicio hechos distintos.' },
    voluntad_clara: { fam: 'limite', grp: 'Condiciones de extinción', icon: '🧠', label: 'Voluntad clara e inequívoca', desc: 'La dimisión exige una voluntad clara, consciente e inequívoca de extinguir el contrato; un abandono ambiguo o palabras en un momento de tensión no bastan necesariamente.' },
    consentimiento_libre: { fam: 'limite', grp: 'Condiciones de extinción', icon: '🕊️', label: 'Consentimiento libre', desc: 'Acuerdo sin error, violencia, intimidación ni dolo (art. 1265 CC): una baja firmada bajo presión es nula.' },

    /* ---- obligaciones */
    pagar_salario: { fam: 'obligation', grp: 'Del empresario', icon: '💳', label: 'Pagar el salario', desc: 'Pago puntual y documentado del salario pactado o legalmente establecido (arts. 4.2.f y 29 ET), con recibo de salarios. El interés por mora es del 10 % de lo adeudado (art. 29.3 ET).' },
    ocupacion_efectiva: { fam: 'obligation', grp: 'Del empresario', icon: '🧰', label: 'Ocupación efectiva', desc: 'Dar trabajo efectivo al trabajador (art. 4.2.a ET): dejarle sin funciones puede atentar contra su dignidad profesional.' },
    seguridad_salud: { fam: 'obligation', grp: 'Del empresario', icon: '🦺', label: 'Seguridad y salud', desc: 'Protección eficaz en materia de seguridad y salud en el trabajo (art. 14 de la Ley 31/1995 de prevención de riesgos laborales; arts. 4.2.d y 19 ET): evaluación de riesgos, formación, información, equipos de protección.' },
    no_discriminacion: { fam: 'obligation', grp: 'Del empresario', icon: '🟰', label: 'No discriminación', desc: 'No discriminar directa o indirectamente (arts. 4.2.c y 17 ET; art. 14 CE) y pagar igual retribución por trabajo de igual valor (art. 28 ET).' },
    dignidad_intimidad: { fam: 'obligation', grp: 'Del empresario', icon: '🗽', label: 'Dignidad, intimidad y desconexión', desc: 'Respeto a la intimidad y a la dignidad, incluida la protección frente al acoso (art. 4.2.e ET); control empresarial proporcionado (art. 20.3); derecho a la intimidad frente a dispositivos digitales y derecho a la desconexión digital (art. 20 bis ET; art. 88 LOPDGDD).' },
    registro_jornada: { fam: 'obligation', grp: 'Del empresario', icon: '🕰️', label: 'Registrar la jornada', desc: 'Garantizar el registro diario de jornada, con el horario concreto de inicio y finalización de cada trabajador, y conservarlo cuatro años a disposición de los trabajadores, sus representantes y la Inspección (art. 34.9 ET).' },
    buena_fe: { fam: 'obligation', grp: 'De ambas partes', icon: '🤲', label: 'Buena fe', desc: 'Trabajador y empresario se someten en sus prestaciones recíprocas a las exigencias de la buena fe (art. 20.2 ET); para el trabajador es un deber básico (art. 5.a ET). Su transgresión grave es causa de despido disciplinario (art. 54.2.d).' },
    diligencia: { fam: 'obligation', grp: 'Del trabajador', icon: '🛠️', label: 'Diligencia', desc: 'Cumplir las obligaciones del puesto conforme a las reglas de la buena fe y la diligencia (arts. 5.a y 20.2 ET), con la colaboración que marquen las normas y el convenio.' },
    obediencia: { fam: 'obligation', grp: 'Del trabajador', icon: '📋', label: 'Cumplir las órdenes', desc: 'Cumplir las órdenes e instrucciones del empresario en el ejercicio regular de sus facultades directivas (arts. 5.c y 20.1 ET), salvo órdenes ilegales, vejatorias o peligrosas.' },
    no_concurrencia: { fam: 'obligation', grp: 'Del trabajador', icon: '🚧', label: 'No concurrencia desleal', desc: 'No concurrir con la actividad de la empresa durante el contrato (arts. 5.d y 21.1 ET), aunque no exista pacto.' },
    prevencion_trabajador: { fam: 'obligation', grp: 'Del trabajador', icon: '⛑️', label: 'Observar la prevención', desc: 'Observar las medidas de prevención de riesgos laborales que se adopten (art. 5.b ET; art. 29 Ley 31/1995): usar los equipos, informar de los riesgos.' },

    /* ---- incumplimientos */
    incumplimiento: { fam: 'manquement', icon: '⚡', label: 'Incumplimiento', desc: 'Inejecución de una obligación. Relaciónelo con la obligación que viola.' },
    incumplimiento_grave: { fam: 'manquement', icon: '🔥', label: 'Incumplimiento grave y culpable', params: ['dias_conocimiento'], desc: 'Base del despido disciplinario (art. 54.1 ET): incumplimiento a la vez grave y culpable del trabajador. Las faltas prescriben (art. 60.2 ET): leves a los 10 días, graves a los 20 y muy graves a los 60 días desde que la empresa tuvo conocimiento, y en todo caso a los 6 meses de su comisión. Parámetro dias_conocimiento (días desde que la empresa conoció los hechos, falta muy grave).' },
    faltas_asistencia: { fam: 'manquement', icon: '⏰', label: 'Faltas de asistencia o puntualidad', desc: 'Faltas repetidas e injustificadas de asistencia o puntualidad al trabajo (art. 54.2.a ET). El convenio suele graduar cuántas faltas son graves.' },
    desobediencia: { fam: 'manquement', icon: '🙅', label: 'Indisciplina o desobediencia', desc: 'Indisciplina o desobediencia en el trabajo (art. 54.2.b ET), de suficiente gravedad.' },
    ofensas: { fam: 'manquement', icon: '🗯️', label: 'Ofensas verbales o físicas', desc: 'Ofensas verbales o físicas al empresario, a las personas que trabajan en la empresa o a los familiares que convivan con ellos (art. 54.2.c ET).' },
    transgresion_buena_fe: { fam: 'manquement', icon: '🎭', label: 'Transgresión de la buena fe', desc: 'Transgresión de la buena fe contractual y abuso de confianza en el desempeño del trabajo (art. 54.2.d ET): fraude, apropiación, competencia desleal, simulación de enfermedad…' },
    disminucion_rendimiento: { fam: 'manquement', icon: '🐢', label: 'Disminución del rendimiento', desc: 'Disminución continuada y voluntaria en el rendimiento de trabajo normal o pactado (art. 54.2.e ET). Si no es voluntaria, puede ser ineptitud (despido objetivo), no falta.' },
    acoso: { fam: 'manquement', icon: '🛑', label: 'Acoso', desc: 'Acoso por razón de origen racial o étnico, religión, discapacidad, edad u orientación sexual, acoso sexual o por razón de sexo (art. 54.2.g ET): causa de despido del acosador. Si lo sufre el trabajador y la empresa no actúa, es un incumplimiento grave del empresario (art. 50 ET).' },
    ineptitud: { fam: 'manquement', icon: '📊', label: 'Ineptitud o falta de adaptación', desc: 'Causa objetiva sin culpa (art. 52.a y b ET): ineptitud conocida o sobrevenida tras la colocación efectiva, o falta de adaptación a modificaciones técnicas razonables del puesto, tras ofrecer formación y un plazo mínimo de dos meses.' },
    impago_salarios: { fam: 'manquement', icon: '🧾', label: 'Impago o retrasos en el salario', desc: 'Falta de pago o retrasos continuados en el abono del salario pactado (art. 50.1.b ET): permite al trabajador pedir la extinción indemnizada.' },
    incumplimiento_empresario: { fam: 'manquement', icon: '💥', label: 'Incumplimiento grave del empresario', desc: 'Cualquier otro incumplimiento grave de sus obligaciones por el empresario, salvo fuerza mayor, o modificaciones sustanciales sin respetar el art. 41 que menoscaben la dignidad del trabajador (art. 50.1.a y c ET).' },

    /* ---- extinciones */
    despido_disciplinario: { fam: 'rupture', icon: '📤', label: 'Despido disciplinario', okText: 'procedente: extinción sin indemnización ni salarios de tramitación (art. 55.7 ET)', desc: 'Decisión del empresario basada en un incumplimiento grave y culpable del trabajador (art. 54 ET). Forma: notificación escrita con los hechos y la fecha de efectos (art. 55.1); el convenio puede exigir más; expediente contradictorio si es representante; audiencia de los delegados sindicales si está afiliado y le consta a la empresa. Calificación: procedente, improcedente (falta de prueba o de forma) o nulo (discriminación, derechos fundamentales, embarazo…) (art. 55.4 y 55.5). Plazo para impugnarlo: 20 días hábiles (art. 59.3 ET).',
      req: [
        { any: ['incumplimiento_grave', 'faltas_asistencia', 'desobediencia', 'ofensas', 'transgresion_buena_fe', 'disminucion_rendimiento', 'acoso'], effet: 'improcedente: no se acredita un incumplimiento grave y culpable (art. 55.4 ET)', level: G, why: 'Incumplimiento grave y culpable del trabajador (art. 54 ET).' },
        { any: ['carta_despido'], effet: 'improcedente: despido sin carta (art. 55.1 y 55.4 ET)', level: G, why: 'Notificación escrita al trabajador (carta de despido).' },
        { any: ['hechos_fecha'], effet: 'improcedente: carta sin hechos concretos ni fecha de efectos (art. 55.1 ET)', level: G, why: 'Hechos que motivan el despido y fecha de efectos.' }
      ],
      ouvre: ['despido_improcedente', 'despido_nulo', 'finiquito', 'vacaciones_no_disfrutadas', 'prestacion_desempleo', 'conciliacion_previa'] },
    despido_objetivo: { fam: 'rupture', icon: '🏚️', label: 'Despido objetivo', params: ['afectados'], okText: 'procedente: 20 días por año, máx. 12 mensualidades (art. 53.1.b ET)', desc: 'Extinción por causas objetivas (art. 52 ET): ineptitud, falta de adaptación, causas económicas, técnicas, organizativas o de producción por debajo de los umbrales del despido colectivo… Requisitos (art. 53.1): comunicación escrita con la causa; puesta a disposición simultánea de la indemnización de 20 días por año (prorrata por meses, máx. 12 mensualidades); preaviso de 15 días, con licencia de 6 horas semanales para buscar empleo. Sin carta o sin indemnización: improcedente; la falta de preaviso o un error excusable en el cálculo no lo hacen improcedente, pero se deben los salarios del preaviso o la diferencia (art. 53.4). Parámetro afectados: extinciones por causas ETOP en 90 días (con plantilla de la empresa: control de los umbrales del art. 51.1).',
      req: [
        { any: ['causas_etop', 'ineptitud'], effet: 'improcedente: causa objetiva no acreditada (art. 53.4 ET)', level: G, why: 'Causa del art. 52 ET acreditada (ETOP, ineptitud, falta de adaptación).' },
        { any: ['carta_despido'], effet: 'improcedente: sin comunicación escrita de la causa (art. 53.1.a y 53.4 ET)', level: G, why: 'Comunicación escrita expresando la causa.' },
        { any: ['puesta_disposicion'], effet: 'improcedente: indemnización no puesta a disposición con la carta (art. 53.1.b y 53.4 ET)', level: G, why: 'Indemnización de 20 días por año puesta a disposición al entregar la carta.' },
        { any: ['preaviso'], effet: 'sin preaviso de 15 días: se deben los salarios de ese periodo (no hace improcedente el despido, art. 53.4 ET)', level: R, why: 'Preaviso de 15 días desde la entrega de la comunicación.' }
      ],
      ouvre: ['indemnizacion_despido', 'despido_improcedente', 'finiquito', 'prestacion_desempleo', 'conciliacion_previa'] },
    despido_colectivo: { fam: 'rupture', icon: '🏭', label: 'Despido colectivo', params: ['afectados'], okText: 'ajustado a derecho: 20 días por año, máx. 12 mensualidades (mínimo legal)', desc: 'Extinción por causas económicas, técnicas, organizativas o de producción que, en 90 días, afecta al menos a 10 trabajadores (empresas de menos de 100), al 10 % (de 100 a 300) o a 30 (más de 300), o a toda la plantilla si son más de 5 y cesa la actividad (art. 51.1 ET). Periodo de consultas con los representantes, de 30 días naturales como máximo (15 si la empresa tiene menos de 50 trabajadores), comunicación a la autoridad laboral, plan de recolocación externa si afecta a más de 50 trabajadores. Indemnización mínima: 20 días por año, máx. 12 mensualidades. Sin periodo de consultas: nulo (art. 124 LRJS). ⚠️ Umbrales por empresa; el TJUE (Rabal Cañas, 2015) exige computarlos también por centro de trabajo de más de 20 trabajadores.',
      req: [
        { any: ['causas_etop'], effet: 'no ajustado a derecho: causa no acreditada (art. 124 LRJS)', level: G, why: 'Causas económicas, técnicas, organizativas o de producción acreditadas.' },
        { any: ['periodo_consultas'], effet: 'nulo: sin periodo de consultas con los representantes (art. 124 LRJS)', level: G, why: 'Periodo de consultas con los representantes, con la documentación exigida.' },
        { any: ['comunicacion_autoridad'], effet: 'irregular: falta la comunicación a la autoridad laboral (art. 51.2 ET)', level: R, why: 'Comunicación de la apertura del periodo de consultas a la autoridad laboral.' }
      ],
      ouvre: ['indemnizacion_despido', 'prestacion_desempleo', 'finiquito'] },
    desistimiento_prueba: { fam: 'rupture', icon: '🚦', label: 'Desistimiento en periodo de prueba', okText: 'válido: sin preaviso ni indemnización, salvo pacto', desc: 'Durante el periodo de prueba, cualquiera de las partes puede resolver el contrato sin alegar causa, sin preaviso y sin indemnización, salvo pacto en contrario (art. 14.2 ET). Fuera de un periodo de prueba válido, la decisión del empresario es un despido. Es nula la resolución por razón de embarazo o de los permisos protegidos, salvo motivos ajenos (art. 14.2).',
      req: [{ any: ['periodo_prueba'], effet: 'despido: sin periodo de prueba válido, la extinción es un despido (improcedente si no hay causa)', level: G, why: 'Periodo de prueba pactado por escrito y en curso.' }],
      ouvre: ['finiquito', 'vacaciones_no_disfrutadas'] },
    fin_contrato_temporal: { fam: 'rupture', icon: '⏹️', label: 'Fin del contrato temporal', desc: 'El contrato de duración determinada se extingue al llegar su término, previa denuncia (art. 49.1.c ET). Indemnización: 12 días de salario por año de servicio, en proporción (salvo contratos de sustitución y formativos). Si el contrato dura más de un año, quien lo denuncia debe preavisar con 15 días. Si se sigue trabajando sin denuncia, el contrato se prorroga como indefinido.',
      ouvre: ['indemnizacion_fin_contrato', 'prestacion_desempleo', 'finiquito', 'vacaciones_no_disfrutadas'] },
    dimision: { fam: 'rupture', icon: '🚪', label: 'Dimisión', okText: 'válida: sin indemnización ni prestación por desempleo', desc: 'Extinción por voluntad del trabajador (art. 49.1.d ET), con el preaviso que fije el convenio o la costumbre del lugar (a menudo 15 días). No da derecho a indemnización ni a prestación por desempleo. Si el trabajador no preavisa, el convenio puede permitir descontar los días de preaviso del finiquito.',
      req: [{ any: ['voluntad_clara'], effet: 'dudosa: sin voluntad clara e inequívoca, podría tratarse de un despido', level: R, why: 'Voluntad clara e inequívoca de dimitir.' }],
      ouvre: ['preaviso', 'finiquito', 'vacaciones_no_disfrutadas'] },
    extincion_mutuo_acuerdo: { fam: 'rupture', icon: '🤝', label: 'Extinción por mutuo acuerdo', okText: 'válida: sin indemnización legal ni prestación por desempleo', desc: 'Las partes acuerdan extinguir el contrato (art. 49.1.a ET). La ley no impone indemnización ni procedimiento; el trabajador no queda en situación legal de desempleo (a diferencia de la ruptura convencional francesa). En la práctica se recurre a menudo a un despido reconocido como improcedente en conciliación.',
      req: [
        { any: ['consentimiento_libre'], effet: 'nula: consentimiento viciado (error, violencia, intimidación)', level: G, why: 'Consentimiento libre del trabajador.' },
        { any: ['forma_escrita'], effet: 'riesgo de prueba: conviene documentar el acuerdo por escrito', level: R, why: 'Acuerdo escrito, con fecha de efectos y cantidades.' }
      ],
      ouvre: ['finiquito', 'vacaciones_no_disfrutadas'] },
    extincion_art50: { fam: 'rupture', icon: '🚩', label: 'Extinción por incumplimiento del empresario', okText: 'estimada: indemnización del despido improcedente (art. 50.2 ET)', desc: 'El trabajador solicita al juez la extinción del contrato por incumplimiento grave del empresario: modificaciones sustanciales que menoscaben su dignidad, falta de pago o retrasos continuados del salario, cualquier otro incumplimiento grave (art. 50.1 ET). Si se estima, cobra la indemnización del despido improcedente (33 días por año, máx. 24 mensualidades) y queda en situación legal de desempleo. En general, el trabajador sigue trabajando mientras se resuelve.',
      req: [
        { any: ['impago_salarios', 'incumplimiento_empresario', 'acoso'], effet: 'desestimada: el contrato continúa', level: G, why: 'Incumplimiento grave del empresario (art. 50.1 ET).' },
        { any: ['demanda'], effet: 'la extinción requiere sentencia: falta la demanda ante el Juzgado de lo Social', level: R, why: 'Demanda de extinción ante el Juzgado de lo Social.' }
      ],
      ouvre: ['indemnizacion_despido', 'prestacion_desempleo', 'finiquito'] },
    extincion_art41: { fam: 'rupture', icon: '🔧', label: 'Rescisión por modificación sustancial', okText: 'válida: 20 días por año, máx. 9 mensualidades (art. 41.3 ET)', desc: 'Si la empresa modifica sustancialmente la jornada, el horario, el régimen de turnos, el sistema de remuneración o las funciones (art. 41 ET) y el trabajador resulta perjudicado, puede rescindir el contrato con 20 días por año, prorrateados por meses, máx. 9 mensualidades. Alternativa: impugnar la modificación ante el juzgado.',
      req: [{ any: ['modificacion_sustancial'], effet: 'sin modificación sustancial del art. 41: no hay derecho a rescindir con indemnización', level: G, why: 'Modificación sustancial de condiciones notificada por la empresa.' }],
      ouvre: ['indemnizacion_despido', 'prestacion_desempleo', 'finiquito'] },

    /* ---- procedimiento */
    carta_despido: { fam: 'etape', icon: '✉️', label: 'Carta de despido', desc: 'Comunicación escrita al trabajador: en el despido disciplinario, los hechos y la fecha de efectos (art. 55.1 ET); en el objetivo, la causa (art. 53.1.a). En el objetivo por causas ETOP, copia a la representación de los trabajadores. Si la forma es defectuosa, el empresario puede hacer un nuevo despido en 20 días (art. 55.2).' },
    puesta_disposicion: { fam: 'etape', icon: '💸', label: 'Indemnización puesta a disposición', desc: 'En el despido objetivo, la indemnización de 20 días por año se pone a disposición del trabajador simultáneamente a la entrega de la carta (art. 53.1.b ET), salvo que la causa económica lo impida y así se indique en la carta.' },
    preaviso: { fam: 'etape', icon: '🔔', label: 'Preaviso', params: ['dias'], desc: 'Plazo entre la comunicación y la extinción: 15 días en el despido objetivo (art. 53.1.c ET) y en la denuncia de contratos temporales de más de un año (art. 49.1.c); en la dimisión, el que fije el convenio o la costumbre. No existe en el despido disciplinario. Parámetro: dias.' },
    expediente_contradictorio: { fam: 'etape', icon: '📂', label: 'Expediente contradictorio', desc: 'Obligatorio antes de sancionar o despedir por faltas graves o muy graves a un representante legal de los trabajadores o delegado sindical (art. 68.a ET): se oye al interesado y a los restantes miembros de la representación.' },
    periodo_consultas: { fam: 'etape', icon: '📢', label: 'Periodo de consultas', desc: 'Negociación de buena fe con los representantes en el despido colectivo (art. 51.2 ET): posibilidades de evitar o reducir los despidos y atenuar sus consecuencias. Máximo 30 días naturales (15 en empresas de menos de 50 trabajadores).' },
    comunicacion_autoridad: { fam: 'etape', icon: '🏛️', label: 'Comunicación a la autoridad laboral', desc: 'La empresa comunica la apertura del periodo de consultas a la autoridad laboral, que lo traslada a la entidad gestora y recaba informe de la Inspección de Trabajo (art. 51.2 ET).' },
    modificacion_sustancial: { fam: 'etape', icon: '🔀', label: 'Modificación sustancial (art. 41 ET)', desc: 'Decisión empresarial de modificar condiciones sustanciales (jornada, horario, turnos, remuneración, funciones…) por razones económicas, técnicas, organizativas o de producción, notificada con 15 días de antelación si es individual (art. 41.3 ET).' },
    conciliacion_previa: { fam: 'etape', icon: '📞', label: 'Conciliación previa', params: ['dias_habiles'], desc: 'Intento de conciliación ante el servicio administrativo (SMAC u órgano autonómico): requisito previo a la demanda por despido, salvo excepciones (art. 63 LRJS). La presentación de la papeleta suspende el plazo de caducidad (art. 65 LRJS). Parámetro dias_habiles: días hábiles transcurridos desde el despido al presentar la papeleta.' },
    demanda: { fam: 'etape', icon: '📄', label: 'Demanda ante el Juzgado de lo Social', params: ['dias_habiles'], desc: 'Acción de despido: plazo de caducidad de 20 días hábiles desde el día siguiente al despido (art. 59.3 ET; art. 103 LRJS). El plazo se suspende durante la conciliación previa.',
      req: [{ any: ['conciliacion_previa'], effet: 'falta la conciliación previa obligatoria (art. 63 LRJS): debe acreditarse', level: R, why: 'Intento de conciliación previa ante el servicio administrativo.' }] },
    finiquito: { fam: 'etape', icon: '🗂️', label: 'Finiquito', desc: 'Documento de liquidación de las cantidades adeudadas al extinguirse el contrato (salario pendiente, pagas extra devengadas, vacaciones no disfrutadas). La empresa entrega una propuesta con la comunicación de la extinción; el trabajador puede pedir la presencia de un representante al firmarlo (art. 49.2 ET). Firmarlo no equivale a renunciar a impugnar el despido si no hay voluntad clara de hacerlo.' },

    /* ---- indemnizaciones y derechos */
    indemnizacion_despido: { fam: 'droit', grp: 'Indemnizaciones', icon: '💵', label: 'Indemnización por despido', params: ['importe'], desc: 'Según el tipo de extinción: despido objetivo o colectivo, 20 días por año con prorrata por meses, máx. 12 mensualidades (arts. 53.1.b y 51.4 ET); extinción del art. 50, la del improcedente (33 días, máx. 24); rescisión por modificación sustancial, 20 días, máx. 9 mensualidades (art. 41.3). Despido disciplinario procedente: ninguna. ⚠️ Cálculo simplificado: salario diario = salario mensual con prorrata × 12 / 365; tope = mensualidades × salario mensual. Parámetro importe: cantidad efectivamente puesta a disposición.' },
    despido_improcedente: { fam: 'droit', grp: 'Calificación del despido', icon: '⚖️', label: 'Despido improcedente', params: ['opcion'], desc: 'Calificación cuando no se acredita la causa o no se cumplen los requisitos de forma (arts. 55.4 y 53.4 ET). En 5 días desde la sentencia, el empresario opta entre la readmisión con salarios de tramitación o una indemnización de 33 días por año, prorrateados por meses, máx. 24 mensualidades (art. 56.1 ET); si no opta, procede la readmisión. Si el trabajador es representante, la opción le corresponde a él. Régimen transitorio: para contratos anteriores al 12/02/2012, 45 días por año por el tiempo anterior, con sus propios topes (DT 11.ª ET), no calculado aquí. ⚠️ Debate sobre una indemnización adicional (Comité Europeo de Derechos Sociales, 2024) y anuncios de reforma: verificar. Parámetro opcion: indemnizacion o readmision.' },
    despido_nulo: { fam: 'droit', grp: 'Calificación del despido', icon: '🚫', label: 'Despido nulo', params: ['dias'], desc: 'Calificación cuando el despido tiene por móvil una discriminación o vulnera derechos fundamentales, o afecta a trabajadoras embarazadas o en permisos protegidos sin causa procedente (art. 55.5 ET), o en el despido colectivo sin periodo de consultas. Efecto: readmisión inmediata con abono de los salarios dejados de percibir (art. 55.6 ET), más la indemnización por daños morales si se vulneraron derechos fundamentales (art. 183 LRJS). Parámetro dias: días de salarios de tramitación.' },
    indemnizacion_fin_contrato: { fam: 'droit', grp: 'Indemnizaciones', icon: '💷', label: 'Indemnización por fin de contrato', desc: 'A la finalización de un contrato temporal: la parte proporcional de 12 días de salario por año de servicio (art. 49.1.c ET), salvo contratos de sustitución y formativos.',
      excl: [{ any: ['contrato_sustitucion', 'contrato_formativo'], effet: 'no se debe: contrato de sustitución o formativo (art. 49.1.c ET)', level: G }] },
    salarios_tramitacion: { fam: 'droit', grp: 'Indemnizaciones', icon: '⏳', label: 'Salarios de tramitación', params: ['dias'], desc: 'Salarios dejados de percibir desde el despido hasta la notificación de la sentencia: se deben si el despido es nulo, o si es improcedente y se opta por la readmisión (o el trabajador representante opta). Si la sentencia llega más de 90 días hábiles después de la demanda, el Estado abona el exceso (art. 57 ET). Parámetro dias: días naturales.' },
    vacaciones_no_disfrutadas: { fam: 'droit', grp: 'Indemnizaciones', icon: '🏝️', label: 'Vacaciones no disfrutadas', params: ['dias'], desc: 'Las vacaciones devengadas y no disfrutadas se compensan en dinero al extinguirse el contrato, cualquiera que sea la causa (art. 38.1 ET), en el finiquito. Parámetro dias.' },
    prestacion_desempleo: { fam: 'droit', grp: 'Protección social', icon: '☂️', label: 'Prestación por desempleo', params: ['dias_cotizados'], desc: 'La paga el SEPE a quien queda en situación legal de desempleo (art. 267 LGSS): despido (incluso disciplinario), despido objetivo o colectivo, fin de contrato temporal, extinción del art. 50 o del art. 41, resolución empresarial en periodo de prueba. No: dimisión, mutuo acuerdo. Requiere al menos 360 días cotizados en los 6 años anteriores; duración de 120 a 720 días según lo cotizado (art. 269 LGSS). Parámetro dias_cotizados.',
      excl: [
        { any: ['dimision'], effet: 'no: la dimisión no es situación legal de desempleo (art. 267 LGSS)', level: G },
        { any: ['extincion_mutuo_acuerdo'], effet: 'no: el mutuo acuerdo no es situación legal de desempleo (art. 267 LGSS)', level: G }
      ] },

    /* ---- normas */
    estatuto_trabajadores: { fam: 'norme', icon: '📕', label: 'Estatuto de los Trabajadores', desc: 'RDL 2/2015: contrato de trabajo (arts. 8 a 21), salario y jornada (arts. 26 a 38), modificación (art. 41), extinción (arts. 49 a 57), faltas y sanciones (arts. 58 a 60).' },
    reforma_laboral: { fam: 'norme', icon: '🆕', label: 'Reforma laboral de 2021', desc: 'RDL 32/2021: presunción de contrato indefinido, supresión del contrato de obra o servicio, nuevo contrato por circunstancias de la producción, impulso del fijo-discontinuo, regla de los 18 meses en 24.' },
    convenio_colectivo: { fam: 'norme', icon: '📗', label: 'Convenio colectivo', desc: 'Negociado por representantes de trabajadores y empresarios, tiene fuerza vinculante (art. 37.1 CE; arts. 82 y ss. ET). Fija tablas salariales, clasificación, jornada, periodo de prueba, preaviso de dimisión, régimen disciplinario.' },
    lrjs: { fam: 'norme', icon: '📘', label: 'Ley reguladora de la jurisdicción social', desc: 'Ley 36/2011 (LRJS): conciliación previa (arts. 63 y ss.), modalidad procesal de despido (arts. 103 y ss.), despido colectivo (art. 124), tutela de derechos fundamentales (arts. 177 y ss.).' },
    lprl: { fam: 'norme', icon: '📙', label: 'Ley de prevención de riesgos laborales', desc: 'Ley 31/1995: deber de protección del empresario (art. 14), evaluación de riesgos, formación, obligaciones de los trabajadores (art. 29).' },
    lgss: { fam: 'norme', icon: '📒', label: 'Ley General de la Seguridad Social', desc: 'RDL 8/2015 (LGSS): protección por desempleo (arts. 262 y ss.): situación legal de desempleo, periodo mínimo de cotización, duración.' },
    constitucion: { fam: 'norme', icon: '🏛️', label: 'Constitución española', desc: 'Derecho al trabajo (art. 35), igualdad y no discriminación (art. 14), libertad sindical (art. 28), negociación colectiva (art. 37). Los derechos fundamentales protegen al trabajador frente al empresario.' },

    /* ---- elementos libres (el motor recurre a ellos) */
    clause: { fam: 'clause', grp: 'Libre', icon: '🧩', label: 'Otra cláusula', desc: 'Cláusula libre: elija su nombre, su icono (icono=…) y sus condiciones (comando condicion).' },
    condition: { fam: 'limite', grp: 'Libre', icon: '☑️', label: 'Otra condición', desc: 'Garantía o condición libre.' },
    obligation: { fam: 'obligation', grp: 'Libre', icon: '📌', label: 'Otra obligación', desc: 'Obligación libre.' },
    rupture: { fam: 'rupture', grp: 'Libre', icon: '💔', label: 'Otra extinción', desc: 'Modo de extinción libre.' },
    etape: { fam: 'etape', grp: 'Libre', icon: '🔹', label: 'Otro trámite', desc: 'Trámite de procedimiento libre.' },
    droit: { fam: 'droit', grp: 'Libre', icon: '🎁', label: 'Otro derecho', desc: 'Indemnización o derecho libre.' },
    norme: { fam: 'norme', grp: 'Libre', icon: '📚', label: 'Otra norma', desc: 'Norma libre.' },
    partie: { fam: 'partie', grp: 'Libre', icon: '👥', label: 'Otro actor', desc: 'Actor libre.' },
    contrat: { fam: 'contrat', grp: 'Libre', icon: '📃', label: 'Otro contrato', desc: 'Contrato libre (relevo, ETT, alta dirección…).' }
  };

  /* ------------------------------------------------------------ utilidades */
  /** Número: admite 1.221,50 (español), 1221.5, «6 meses», «20 días», «1221 €». */
  const N = v => {
    if (v == null || v === '') return null;
    if (typeof v === 'number') return v;
    let s = String(v).trim().replace(/[€\s]/g, '').replace(/(meses|mes|años|anos|año|ano|días|dias|día|dia|horas|hora|h)$/i, '');
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(s)) s = s.replace(/\./g, '').replace(',', '.');
    return P.num(s);
  };
  const yes = v => v != null && /^(si|sí|yes|true|1|oui|x)$/i.test(String(v).trim());
  const LOC = 'es-ES';
  const f = x => P.round2(x).toLocaleString(LOC);
  const eur = x => { const r = Math.round(x * 100) / 100; return r.toLocaleString(LOC, { minimumFractionDigits: Number.isInteger(r) ? 0 : 2, maximumFractionDigits: 2 }) + ' €'; };
  const meses = m => f(m) + (P.round2(m) === 1 ? ' mes' : ' meses');
  const anios = y => f(y) + (P.round2(y) === 1 ? ' año' : ' años');
  const dias = d => f(d) + (P.round2(d) === 1 ? ' día' : ' días');
  const own = (a, k) => N(a.e.params && a.e.params[k]);

  /** Salario mensual con prorrata de pagas (salario, o salario_anual / 12, o salario_diario × 365 / 12). */
  const mensual = a => {
    const m = N(a.param('salario')); if (m != null) return m;
    const an = N(a.param('salario_anual')); if (an != null) return an / 12;
    const d = N(a.param('salario_diario')); return d != null ? d * 365 / 12 : null;
  };
  const diario = a => { const d = N(a.param('salario_diario')); if (d != null) return d; const m = mensual(a); return m != null ? m * 12 / 365 : null; };
  const antig = a => { const s = N(a.param('antiguedad')); if (s != null) return s; const m = N(a.param('antiguedad_meses')); return m != null ? m / 12 : null; };
  /** categoria: tecnico_titulado | tecnico | otro */
  P.esCategoria = v => { const k = P.key(v || ''); if (!k) return null; if (/titul/.test(k)) return 'tecnico_titulado'; if (/tecn|tech/.test(k)) return 'tecnico'; return 'otro'; };

  /** Umbral del despido colectivo (art. 51.1 ET) según la plantilla. */
  P.esUmbralColectivo = pl => pl < 100 ? 10 : pl <= 300 ? Math.ceil(pl * 0.1 - 1e-9) : 30;
  /** Indemnización tasada: días por año, prorrata por meses (mes iniciado = mes completo), tope en mensualidades. */
  P.esIndemnizacion = function (antiguedad, salarioMensual, diasPorAnio, topeMensualidades, salarioDiario) {
    const m = Math.ceil(antiguedad * 12 - 1e-6), anos = m / 12, d = salarioDiario != null ? salarioDiario : salarioMensual * 12 / 365;
    const diasInd = diasPorAnio * anos, bruto = diasInd * d, tope = topeMensualidades * (salarioMensual != null ? salarioMensual : d * 365 / 12);
    return { meses: m, anos, diario: d, dias: diasInd, bruto, tope, total: Math.min(bruto, tope), topado: bruto > tope + 1e-9 };
  };
  /** Duración máxima legal del periodo de prueba (art. 14.1 ET), en meses. */
  P.esMaxPrueba = (cat, plantilla, temporalCorto) => temporalCorto ? 1 : (cat === 'tecnico_titulado' ? 6 : (plantilla != null && plantilla < 25 ? 3 : 2));
  /** Duración de la prestación por desempleo (art. 269 LGSS), en días. */
  P.esDuracionDesempleo = cot => cot < 360 ? 0 : Math.min(720, 120 + 60 * Math.floor((cot - 360) / 180));

  const indemCalc = (a, dpa, tope, etiqueta) => {
    const s = antig(a), m = mensual(a), d = diario(a);
    if (s == null || (m == null && d == null)) return null;
    const r = P.esIndemnizacion(s, m, dpa, tope, d);
    a.calc(`${etiqueta ? etiqueta + ': ' : ''}${f(r.dias)} días × ${eur(r.diario)} = ${eur(r.bruto)}${r.topado ? ` → tope de ${tope} mensualidades: ${eur(r.tope)}` : ''}`);
    a.detail(`${dpa} días por año × ${f(r.anos)} años (${r.meses} meses: prorrata por meses, mes iniciado = mes completo) · salario diario ${eur(r.diario)}${N(a.param('salario_diario')) == null ? ' (mensual con prorrata × 12 / 365)' : ''} · tope ${tope} × ${eur(r.tope / tope)} = ${eur(r.tope)}`);
    return r;
  };

  /* ------------------------------------------------------------ controles */
  /** Causas de nulidad: prevalecen sobre la improcedencia (se colocan en cabeza). */
  const nulCheck = (art) => function (a) {
    if (a.inDossier(['vulneracion_derechos'])) {
      a.I.issues.unshift({ level: G, effet: `nulo: discriminación o vulneración de derechos fundamentales — readmisión y salarios de tramitación (${art})`, text: 'Causa de nulidad' });
      return true;
    }
    if (a.inDossier(['embarazo'])) {
      const sinCausa = a.I.issues.some(x => x.level === G);
      if (sinCausa) a.I.issues.unshift({ level: G, effet: `nulo: embarazo o permiso protegido sin causa procedente — readmisión y salarios de tramitación (${art})`, text: 'Causa de nulidad' });
      else a.issue(R, `protección reforzada: nulo salvo que la causa sea ajena al embarazo o al permiso (${art})`, 'Embarazo o permiso protegido');
      return true;
    }
    return false;
  };
  /** Elementos relacionados directamente con el elemento controlado. */
  const vecinos = a => a.st.links.filter(l => l.from === a.id || l.to === a.id).map(l => a.st.entities[l.from === a.id ? l.to : l.from]).filter(Boolean);
  CAT_ES.despido_disciplinario.check = function (a) {
    // falta muy grave prescrita (art. 60.2 ET) : el despido basado en ella es improcedente
    const pres = vecinos(a).find(e => e.kind === 'incumplimiento_grave' && N(e.params && e.params.dias_conocimiento) > 60);
    if (pres) a.I.issues.unshift({ level: G, effet: 'improcedente: la falta ha prescrito (art. 60.2 ET)', text: `${pres.name}: ${dias(N(pres.params.dias_conocimiento))} > 60 días` });
    nulCheck('art. 55.5 ET')(a);
  };
  CAT_ES.despido_objetivo.check = function (a) {
    if (nulCheck('art. 53.4 y 55.5 ET')(a)) return;
    const af = own(a, 'afectados'), pl = N(a.param('plantilla'));
    if (af == null || pl == null) return;
    const u = P.esUmbralColectivo(pl);
    a.calc(`${af} extinciones en 90 días · umbral del despido colectivo: ${u} (plantilla ${pl})`);
    if (af >= u) a.I.issues.unshift({ level: G, effet: 'nulo: se alcanzan los umbrales del despido colectivo sin seguir su procedimiento (fraude, art. 51.1 ET; art. 122.2 LRJS)', text: `${af} ≥ ${u}` });
  };
  CAT_ES.despido_colectivo.check = function (a) {
    nulCheck('art. 124 LRJS')(a);
    const af = own(a, 'afectados'), pl = N(a.param('plantilla'));
    if (af == null || pl == null) return;
    const u = P.esUmbralColectivo(pl);
    if (af >= u) a.calc(`${af} afectados ≥ umbral ${u} (plantilla ${pl}): despido colectivo${af > 50 ? ' · más de 50: plan de recolocación externa' : ''}`);
    else a.calc(`${af} afectados < umbral ${u} (plantilla ${pl}): basta el despido objetivo individual (art. 52.c ET)`);
  };
  CAT_ES.desistimiento_prueba.check = function (a) {
    if (nulCheck('art. 14.2 ET')(a)) return;
    const s = antig(a); if (s == null) return;
    const cat = P.esCategoria(a.param('categoria')), pl = N(a.param('plantilla')), conv = N(a.param('max_convenio'));
    const max = conv != null ? conv : P.esMaxPrueba(cat, pl, false), m = s * 12;
    a.calc(`${meses(P.round2(m))} de servicio · prueba máxima ${meses(max)}`);
    if (m > max + 1e-9) a.issue(G, 'despido: el periodo de prueba máximo ya había terminado (art. 14 ET)', `${meses(P.round2(m))} > ${meses(max)}`);
  };

  CAT_ES.periodo_prueba.check = function (a) {
    const du = own(a, 'duracion'); if (du == null) return;
    const cat = P.esCategoria(a.param('categoria')), pl = N(a.param('plantilla')), conv = N(a.param('max_convenio'));
    // contrato temporal que contiene la cláusula : su duración (parámetro duracion del contrato)
    const ct = a.st.links.filter(l => l.from === a.id || l.to === a.id).map(l => a.st.entities[l.from === a.id ? l.to : l.from])
      .find(e => e && ['contrato_temporal', 'contrato_sustitucion'].includes(e.kind));
    const durTmp = ct ? N(ct.params && ct.params.duracion) : null;
    const corto = durTmp != null && durTmp <= 6;
    const max = conv != null ? conv : P.esMaxPrueba(cat, pl, corto);
    const why = conv != null ? 'según convenio' : corto ? 'contrato temporal de hasta 6 meses' : cat === 'tecnico_titulado' ? 'técnico titulado' : (pl != null && pl < 25 ? 'empresa de menos de 25 trabajadores' : (cat ? 'demás trabajadores' : 'demás trabajadores; 6 si técnico titulado'));
    a.calc(`${meses(du)} · máximo legal ${meses(max)} (${why})`);
    if (du > max + 1e-9) a.issue(G, `nulo en lo que exceda de ${meses(max)} (art. 14.1 ET)`, `${meses(du)} > ${meses(max)}`);
  };
  CAT_ES.pacto_no_competencia.check = function (a) {
    const du = own(a, 'duracion'); if (du == null) return;
    const cat = P.esCategoria(a.param('categoria'));
    if (!cat) { a.calc(`${meses(du)} · máximo 24 meses (técnicos) o 6 meses (demás)`); if (du > 24 + 1e-9) a.issue(G, 'excede el máximo legal de 2 años (art. 21.2 ET)', `${meses(du)} > 24 meses`); return; }
    const tec = cat !== 'otro', max = tec ? 24 : 6;
    a.calc(`${meses(du)} · máximo legal ${tec ? '2 años (técnico)' : '6 meses (demás trabajadores)'}`);
    if (du > max + 1e-9) a.issue(G, `excede el máximo legal de ${tec ? '2 años' : '6 meses'} (art. 21.2 ET): nulo en el exceso ⚠️`, `${meses(du)} > ${meses(max)}`);
  };
  CAT_ES.pacto_permanencia.check = function (a) {
    const du = own(a, 'duracion'); if (du == null) return;
    a.calc(`${meses(du)} · máximo legal 2 años`);
    if (du > 24 + 1e-9) a.issue(G, 'excede el máximo legal de 2 años (art. 21.4 ET)', `${meses(du)} > 24 meses`);
  };
  const temporalCheck = function (a) {
    const du = own(a, 'duracion'), acu = N(a.param('meses_acumulados'));
    if (du != null && a.e.kind === 'contrato_temporal') {
      a.calc(`duración ${meses(du)} · máximo 6 meses (1 año si lo amplía el convenio sectorial)`);
      if (du > 12 + 1e-9) a.issue(G, 'fijo: excede la duración máxima del contrato por circunstancias de la producción (art. 15.2 y 15.4 ET)', `${meses(du)} > 12 meses`);
      else if (du > 6 + 1e-9) a.issue(R, 'válido solo si el convenio sectorial amplía la duración a 1 año (art. 15.2 ET)', `${meses(du)} > 6 meses`);
    }
    if (acu != null && a.e.kind === 'contrato_temporal') {
      a.calc(`${meses(acu)} con contratos por circunstancias de la producción en los últimos 24 meses (límite: 18)`);
      if (acu > 18 + 1e-9) a.issue(G, 'fijo: más de 18 meses en un periodo de 24 (art. 15.5 ET)', `${meses(acu)} > 18 meses`);
    }
  };
  CAT_ES.contrato_temporal.check = temporalCheck;

  CAT_ES.salario.check = function (a) {
    const m = mensual(a); if (m == null) return;
    const anual = N(a.param('salario_anual')) != null ? N(a.param('salario_anual')) : m * 12;
    const smiA = N(a.param('smi_anual')) != null ? N(a.param('smi_anual')) : (N(a.param('smi_mensual')) != null ? N(a.param('smi_mensual')) * DEF.smi_pagas : DEF.smi_anual);
    const pct = N(a.param('porcentaje_jornada')), parcial = a.inDossier(['tiempo_parcial']);
    if (parcial && pct == null) { a.calc(`${eur(anual)} al año · a tiempo parcial, el SMI se aplica en proporción a la jornada (indique porcentaje_jornada)`); return; }
    const min = smiA * (pct != null ? pct / 100 : 1);
    a.calc(`${eur(anual)} al año (${eur(m)} al mes con prorrata) · SMI ${eur(min)} al año${pct != null ? ` (${f(pct)} % de jornada)` : ` (${eur(smiA / DEF.smi_pagas)} × ${DEF.smi_pagas} pagas)`} ⚠️ SMI 2026`);
    if (anual < min - 0.5) a.issue(G, 'inferior al SMI: se deben las diferencias (art. 27 ET)', `${eur(anual)} < ${eur(min)}`);
  };
  CAT_ES.jornada.check = function (a) {
    const h = own(a, 'horas_semanales'); if (h == null) return;
    a.calc(`${f(h)} h semanales · máximo 40 h de promedio en cómputo anual`);
    if (h > DEF.jornada_max + 1e-9) a.issue(R, 'excede la jornada máxima ordinaria: el exceso son horas extraordinarias (arts. 34.1 y 35 ET)', `${f(h)} h > 40 h`);
  };
  CAT_ES.horas_extra.check = function (a) {
    const h = own(a, 'horas_anuales'); if (h == null) return;
    a.calc(`${f(h)} horas extraordinarias al año · máximo 80`);
    if (h > DEF.horas_extra_max + 1e-9) a.issue(G, 'excede el máximo de 80 horas extraordinarias al año (art. 35.2 ET)', `${f(h)} h > 80 h`);
  };
  CAT_ES.vacaciones.check = function (a) {
    const d = own(a, 'dias'); if (d == null) return;
    a.calc(`${dias(d)} · mínimo 30 días naturales`);
    if (d < DEF.vacaciones_min - 1e-9) a.issue(G, 'nula en lo que reduce el mínimo de 30 días naturales (art. 38.1 ET)', `${dias(d)} < 30 días`);
  };
  CAT_ES.preaviso.check = function (a) {
    const d = own(a, 'dias');
    if (a.inDossier(['despido_objetivo'])) {
      a.calc(`preaviso legal: 15 días (art. 53.1.c ET)${d != null ? ` · aquí: ${dias(d)}` : ''}`);
      if (d != null && d < 15 - 1e-9) {
        const sd = diario(a);
        a.issue(R, `preaviso insuficiente: se deben ${dias(15 - d)} de salario${sd != null ? ` (${eur((15 - d) * sd)})` : ''} (art. 53.4 ET)`, `${dias(d)} < 15 días`);
      }
    } else if (a.inDossier(['dimision'])) a.calc(`preaviso del trabajador: el del convenio o la costumbre (a menudo 15 días)${d != null ? ` · aquí: ${dias(d)}` : ''}`);
    else if (a.inDossier(['fin_contrato_temporal'])) a.calc(`contrato de más de un año: 15 días de preaviso (art. 49.1.c ET)${d != null ? ` · aquí: ${dias(d)}` : ''}`);
    else if (a.inDossier(['despido_disciplinario'])) a.calc('el despido disciplinario no lleva preaviso');
  };
  const caducidad = function (a) {
    const d = N(a.param('dias_habiles')); if (d == null) return;
    a.calc(`${dias(d)} hábiles desde el despido · plazo de caducidad: 20 días hábiles`);
    if (d > DEF.caducidad + 1e-9) a.issue(G, 'acción caducada: el despido ya no puede impugnarse (art. 59.3 ET; art. 103 LRJS)', `${dias(d)} > 20 días hábiles`);
  };
  CAT_ES.conciliacion_previa.check = caducidad;
  CAT_ES.demanda.check = caducidad;

  CAT_ES.incumplimiento_grave.check = function (a) {
    const d = own(a, 'dias_conocimiento'); if (d == null) return;
    a.calc(`${dias(d)} desde que la empresa conoció los hechos · falta muy grave: prescribe a los 60 días`);
    if (d > 60 + 1e-9) a.issue(G, 'falta prescrita: ya no puede sancionarse (art. 60.2 ET)', `${dias(d)} > 60 días`);
  };

  CAT_ES.indemnizacion_despido.check = function (a) {
    let r = null;
    if (a.inDossier(['extincion_art50'])) r = indemCalc(a, 33, 24, 'extinción del art. 50 (como el improcedente)');
    else if (a.inDossier(['extincion_art41'])) r = indemCalc(a, 20, 9, 'modificación sustancial');
    else if (a.inDossier(['despido_objetivo', 'despido_colectivo'])) r = indemCalc(a, 20, 12);
    else if (a.inDossier(['despido_disciplinario'])) { a.calc('despido disciplinario procedente: sin indemnización (art. 55.7 ET); si es improcedente, 33 días por año'); return; }
    else r = indemCalc(a, 20, 12, '20 días por año (por defecto)');
    const imp = own(a, 'importe');
    if (r && imp != null && imp < r.total - 0.5) a.issue(R, `importe inferior al legal: se debe la diferencia (${eur(r.total - imp)}); si el error no es excusable, el despido es improcedente (art. 53.4 ET)`, `${eur(imp)} < ${eur(r.total)}`);
  };
  CAT_ES.despido_improcedente.check = function (a) {
    const op = P.key(a.e.params && a.e.params.opcion || '');
    if (yes(a.param('representante'))) a.calc('trabajador representante: la opción le corresponde a él (art. 56.4 ET)');
    if (/readm/.test(op)) {
      const d = N(a.e.params && a.e.params.dias), sd = diario(a);
      a.calc(`opción por la readmisión: salarios de tramitación${d != null && sd != null ? `: ${dias(d)} × ${eur(sd)} = ${eur(d * sd)}` : ''} (art. 56.2 ET)`);
    } else indemCalc(a, 33, 24, 'indemnización');
    if (yes(a.param('anterior_reforma'))) a.calc('⚠️ contrato anterior al 12/02/2012: 45 días por año por el tiempo anterior (DT 11.ª ET), no calculado aquí');
    caducidad(a);
  };
  CAT_ES.despido_nulo.check = function (a) {
    const d = own(a, 'dias'), sd = diario(a);
    a.calc(`readmisión inmediata${d != null && sd != null ? ` · salarios de tramitación: ${dias(d)} × ${eur(sd)} = ${eur(d * sd)}` : ' + salarios de tramitación'} (art. 55.6 ET)`);
    caducidad(a);
  };
  CAT_ES.indemnizacion_fin_contrato.check = function (a) {
    const s = antig(a), sd = diario(a); if (s == null || sd == null) return;
    const di = 12 * s;
    a.calc(`${f(di)} días × ${eur(sd)} = ${eur(di * sd)}`);
    a.detail(`12 días por año × ${anios(s)} (parte proporcional) · salario diario ${eur(sd)}`);
  };
  const porDias = function (a) {
    const d = own(a, 'dias'), sd = diario(a);
    if (d != null && sd != null) a.calc(`${dias(d)} × ${eur(sd)} = ${eur(d * sd)}`);
  };
  CAT_ES.salarios_tramitacion.check = porDias;
  CAT_ES.vacaciones_no_disfrutadas.check = porDias;
  CAT_ES.prestacion_desempleo.check = function (a) {
    const c = N(a.param('dias_cotizados')); if (c == null) return;
    if (c < 360 - 1e-9) { a.issue(G, 'no: menos de 360 días cotizados en los 6 últimos años (art. 269 LGSS)', `${dias(c)} < 360 días`); return; }
    a.calc(`${dias(c)} cotizados · duración de la prestación: ${dias(P.esDuracionDesempleo(c))} (art. 269 LGSS)`);
  };
  CAT_ES.extincion_art41.check = function (a) { if (a.inDossier(['indemnizacion_despido'])) return; indemCalc(a, 20, 9); };

  /* ------------------------------------------------------------ registro */
  const ALIASES_ES = {
    trabajador: ['trabajadora', 'empleado', 'empleada', 'asalariado', 'persona_trabajadora', 'employee', 'salarie'],
    empresa: ['empresario', 'empleador', 'compania', 'sociedad', 'employer', 'employeur', 'entreprise'],
    representantes: ['comite_de_empresa', 'comite_empresa', 'delegados_de_personal', 'delegados', 'rlt', 'representacion_legal', 'sindicato'],
    inspeccion_trabajo: ['inspeccion', 'itss', 'inspeccion_de_trabajo'], smac: ['cmac', 'servicio_de_mediacion', 'servicio_conciliacion'],
    juzgado_social: ['juzgado', 'juzgado_de_lo_social', 'juez', 'tribunal'], sepe: ['servicio_publico_de_empleo'], fogasa: ['fondo_de_garantia_salarial'],
    contrato_indefinido: ['indefinido', 'contrato_fijo', 'fijo', 'cdi', 'permanent'],
    contrato_temporal: ['temporal', 'eventual', 'contrato_eventual', 'circunstancias_de_la_produccion', 'contrato_circunstancias_produccion', 'cdd', 'fixed_term'],
    contrato_sustitucion: ['sustitucion', 'interinidad', 'contrato_de_interinidad'], contrato_formativo: ['formativo', 'practicas', 'contrato_en_practicas', 'formacion_en_alternancia'],
    fijo_discontinuo: ['discontinuo', 'contrato_fijo_discontinuo'],
    periodo_prueba: ['prueba', 'periodo_de_prueba', 'probation', 'periode_essai'],
    pacto_no_competencia: ['no_competencia', 'no_concurrencia_postcontractual', 'pacto_de_no_competencia', 'non_compete', 'non_concurrence'],
    pacto_permanencia: ['permanencia', 'pacto_de_permanencia'], pacto_plena_dedicacion: ['plena_dedicacion', 'exclusividad', 'pacto_de_exclusividad'],
    confidencialidad: ['secreto', 'pacto_de_confidencialidad'], horas_extra: ['horas_extraordinarias'],
    compensacion_economica: ['compensacion', 'contraprestacion'], interes_efectivo: ['interes_industrial', 'interes_comercial', 'interes'],
    forma_escrita: ['escrito', 'por_escrito'], causa_temporal: ['causa_habilitante', 'causa_del_contrato'],
    causas_etop: ['causas_economicas', 'causa_economica', 'causas_objetivas', 'etop'],
    despido_disciplinario: ['despido', 'despido_por_faltas'], despido_objetivo: ['despido_por_causas_objetivas'],
    despido_colectivo: ['ere', 'expediente_de_regulacion_de_empleo'], extincion_mutuo_acuerdo: ['mutuo_acuerdo', 'baja_pactada'],
    dimision: ['baja_voluntaria', 'dimision_del_trabajador'], extincion_art50: ['extincion_causa_justa', 'resolucion_por_incumplimiento', 'art_50'],
    extincion_art41: ['rescision_art41', 'rescision_modificacion_sustancial'], fin_contrato_temporal: ['fin_contrato', 'fin_de_contrato', 'expiracion'],
    desistimiento_prueba: ['desistimiento', 'no_supera_la_prueba'],
    despido_improcedente: ['improcedente', 'improcedencia'], despido_nulo: ['nulo', 'nulidad'],
    indemnizacion_despido: ['indemnizacion'], indemnizacion_fin_contrato: ['indemnizacion_temporal', 'indemnizacion_12_dias'],
    salarios_tramitacion: ['salarios_de_tramitacion'], vacaciones_no_disfrutadas: ['vacaciones_pendientes'],
    prestacion_desempleo: ['paro', 'desempleo', 'prestacion_por_desempleo'],
    carta_despido: ['carta', 'carta_de_despido', 'comunicacion_escrita'], puesta_disposicion: ['puesta_a_disposicion'],
    conciliacion_previa: ['conciliacion', 'papeleta', 'papeleta_de_conciliacion', 'acto_de_conciliacion'],
    demanda: ['demanda_judicial'], finiquito: ['liquidacion', 'saldo_y_finiquito'], periodo_consultas: ['consultas', 'periodo_de_consultas'],
    incumplimiento: ['falta', 'manquement'], incumplimiento_grave: ['falta_muy_grave', 'falta_grave', 'incumplimiento_grave_y_culpable'],
    estatuto_trabajadores: ['estatuto', 'estatuto_de_los_trabajadores'], convenio_colectivo: ['convenio'],
    clause: ['clausula', 'otra_clausula'], condition: ['otra_condicion'], rupture: ['extincion', 'otra_extincion'], etape: ['tramite', 'paso'],
    droit: ['otro_derecho'], norme: ['norma'], partie: ['actor', 'parte'], contrat: ['contrato', 'otro_contrato']
  };
  P.registerJuris({
    id: 'es', lang: 'es',
    names: ['es', 'espana', 'spain', 'derecho_espanol', 'spanish_law', 'espagne', 'droit_espagnol', 'espanol'],
    label: 'Droit espagnol', labelEn: 'Spanish law', labelEs: 'Derecho español', flag: '🇪🇸',
    catalog: CAT_ES, categories: {}, aliases: ALIASES_ES, currency: 'EUR',
    defaults: DEF,
    /* libellés des données chiffrées dans l'inspecteur (js/app.js, paramsHTML) */
    paramLabels: {
      antiguedad: 'Antigüedad (años)', antiguedad_meses: 'Antigüedad (meses)', salario: 'Salario mensual bruto (€, con prorrata de pagas)',
      salario_anual: 'Salario anual bruto (€)', salario_diario: 'Salario diario (€)', categoria: 'Categoría (tecnico_titulado, tecnico, otro)',
      plantilla: 'Plantilla (trabajadores)', duracion: 'Duración (meses)', meses_acumulados: 'Meses acumulados (últimos 24)',
      horas_semanales: 'Horas semanales', horas_anuales: 'Horas extra al año', dias: 'Días', dias_habiles: 'Días hábiles',
      dias_conocimiento: 'Días desde que la empresa conoció los hechos', dias_cotizados: 'Días cotizados', afectados: 'Trabajadores afectados',
      importe: 'Importe (€)', opcion: 'Opción (indemnizacion o readmision)', porcentaje_jornada: 'Porcentaje de jornada (%)',
      max_convenio: 'Máximo del convenio', representante: 'Representante de los trabajadores (si/no)', anterior_reforma: 'Contrato anterior al 12/02/2012 (si/no)',
      smi_mensual: 'SMI mensual (€)', smi_anual: 'SMI anual (€)'
    },
    paramAliases: {
      anciennete: 'antiguedad', seniority: 'antiguedad', service: 'antiguedad', anos: 'antiguedad', anos_servicio: 'antiguedad',
      salaire: 'salario', salary: 'salario', salario_mensual: 'salario', sueldo: 'salario', salario_bruto: 'salario',
      categorie: 'categoria', category: 'categoria', duree: 'duracion', duration: 'duracion', meses: 'duracion',
      montant: 'importe', amount: 'importe', cantidad: 'importe', horas: 'horas_semanales', effectif: 'plantilla', headcount: 'plantilla',
      trabajadores: 'plantilla', despidos: 'afectados', cotizados: 'dias_cotizados', habiles: 'dias_habiles'
    }
  });

  /* alias españoles de las relaciones (P.REL_ALIASES de js/model.js) */
  const RELS_ES = {
    contient: ['contiene', 'incluye'], limite: ['limita', 'garantiza', 'condiciona'], requiert: ['requiere', 'necesita'],
    exclut: ['excluye', 'impide'], signe: ['firma', 'suscribe', 'celebra'], doit: ['debe', 'obligado'], viole: ['viola', 'incumple', 'infringe'],
    justifie: ['justifica', 'fundamenta'], initie: ['inicia', 'promueve'], met_fin: ['extingue', 'pone_fin', 'finaliza'],
    puis: ['luego', 'despues', 'seguido_de', 'a_continuacion'], ouvre: ['da_derecho', 'genera', 'abre', 'origina'],
    encadre: ['regula', 'rige'], prevaut: ['prevalece'], lien: ['vinculo', 'relacion', 'relaciona']
  };
  if (P.REL_ALIASES) Object.keys(RELS_ES).forEach(r => RELS_ES[r].forEach(w => { const k = P.key(w); if (!P.REL_ALIASES[k]) P.REL_ALIASES[k] = r; }));
})();
