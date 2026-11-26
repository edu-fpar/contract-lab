# Reglas de verificación (derecho español)

Esta página describe lo que el motor (`js/model.js`, con el catálogo del derecho español `js/catalog-es.js`) verifica y calcula, y lo que no representa. Es también la referencia de la skill que redacta escenarios: el comentario de un escenario debe anunciar los mismos veredictos que la herramienta.

El **mecanismo** (elementos, salvaguardas, expedientes, incompatibilidades, obligaciones incumplidas, veredictos impuestos) es el mismo para los tres derechos del taller. Cada derecho aporta su propio **catálogo** de tipos, sus condiciones, sus incompatibilidades y sus **cálculos**. Esta página trata del derecho español; para el derecho francés y el inglés, véanse las [reglas francesas](../regles-de-calcul.md) y las [reglas inglesas](../en/checking-rules.md).

El catálogo español recoge el derecho vigente a **26 de noviembre de 2026**: Estatuto de los Trabajadores (RDL 2/2015, ET) tras la reforma laboral del RDL 32/2021, Ley reguladora de la jurisdicción social (Ley 36/2011, LRJS) y Ley General de la Seguridad Social (LGSS). Los puntos que hay que comprobar llevan ⚠️.

## Elementos y veredictos

Cada tarjeta es un **elemento** de un tipo del catálogo (véase el [formato de los escenarios](formato-escenario.md)), que pertenece a una familia: partes y actores, contratos, cláusulas, salvaguardas y condiciones, obligaciones, faltas e incumplimientos, extinción del contrato, procedimiento, indemnizaciones y derechos, fuentes del derecho.

Tras cada cambio, la herramienta verifica todos los elementos y da a cada uno un **estado**:

| Estado | Icono | Cuándo |
|---|---|---|
| válido | ✅ | el elemento tiene condiciones de validez y todas se cumplen |
| en riesgo | ⚠️ | falta al menos una condición de nivel «riesgo» y ninguna de nivel «grave» |
| nulo / improcedente | ⛔ | falta una condición de nivel «grave», la cláusula es ilícita por naturaleza, hay un elemento incompatible en el expediente, o un cálculo muestra que se supera un límite legal |
| incumplida | ⚡ | obligación unida a una falta o a un incumplimiento |
| sin veredicto | — | elemento sin condiciones y sin problema (una parte, una norma, una salvaguarda, un trámite…) |

El **texto del veredicto** es el efecto jurídico del primer problema grave (si no, del primer problema de riesgo): «nulo (art. 21.2.b ET)», «improcedente: despido sin carta (art. 55.1 y 55.4 ET)», «fijo: más de 18 meses en un periodo de 24 (art. 15.5 ET)», «no: la dimisión no es situación legal de desempleo (art. 267 LGSS)»… Cuando todo se cumple, el texto es «válida» para una cláusula, «condiciones cumplidas» para un contrato y «regular» para una extinción, salvo que el tipo tenga su propio texto:

| Extinción | Texto si todo se cumple |
|---|---|
| Despido disciplinario | procedente: extinción sin indemnización ni salarios de tramitación (art. 55.7 ET) |
| Despido objetivo | procedente: 20 días por año, máx. 12 mensualidades (art. 53.1.b ET) |
| Despido colectivo | ajustado a derecho: 20 días por año, máx. 12 mensualidades (mínimo legal) |
| Desistimiento en periodo de prueba | válido: sin preaviso ni indemnización, salvo pacto |
| Dimisión | válida: sin indemnización ni prestación por desempleo |
| Extinción por mutuo acuerdo | válida: sin indemnización legal ni prestación por desempleo |
| Extinción por incumplimiento del empresario (art. 50) | estimada: indemnización del despido improcedente (art. 50.2 ET) |
| Rescisión por modificación sustancial (art. 41) | válida: 20 días por año, máx. 9 mensualidades (art. 41.3 ET) |

Orden de prioridad: un veredicto **impuesto** por el escenario (`estado`) prevalece sobre todo; después una obligación **incumplida**; después los problemas graves y, por último, los de riesgo. Entre los problemas graves, las **causas de nulidad** y la **prescripción** de la falta se colocan en cabeza (véase más abajo).

## Salvaguardas: las condiciones de validez

Muchos tipos tienen **condiciones de validez** (columna «Condiciones verificadas» del catálogo). Cada una espera un elemento de uno o varios tipos, con un nivel (grave o riesgo) y un efecto si falta.

### Contratos y cláusulas

| Elemento | Condiciones | Si falta una condición |
|---|---|---|
| Contrato indefinido (`contrato_indefinido`) | información de los elementos esenciales (`informacion_elementos`) o `forma_escrita` — riesgo | ⚠️ falta la información escrita de los elementos esenciales (art. 8.5 ET) |
| Contrato por circunstancias de la producción (`contrato_temporal`) | `forma_escrita`; causa temporal precisa (`causa_temporal`) | ⛔ se presume indefinido (art. 8.2 ET) / ⛔ fijo: contrato temporal sin causa, en fraude de ley (art. 15.4 ET) |
| Contrato de sustitución (`contrato_sustitucion`) | `forma_escrita`; `causa_temporal` (nombre de la persona sustituida y causa) | ⛔ se presume indefinido / ⛔ fijo: sustitución sin causa identificada |
| Contrato formativo (`contrato_formativo`) | `forma_escrita` | ⛔ se presume indefinido (art. 8.2 ET) |
| Contrato fijo-discontinuo (`fijo_discontinuo`) | `forma_escrita` | ⛔ se presume a jornada completa e indefinido ordinario |
| Periodo de prueba (`periodo_prueba`) | `forma_escrita` | ⛔ inexistente: el periodo de prueba debe pactarse por escrito (art. 14.1 ET) |
| Jornada (`jornada`) | registro diario de jornada (`registro_jornada`) — riesgo | ⚠️ infracción: falta el registro diario de jornada (art. 34.9 ET) |
| Tiempo parcial (`tiempo_parcial`) | `forma_escrita` | ⛔ se presume a jornada completa (art. 12.4 ET) |
| Pacto de no competencia (`pacto_no_competencia`) | interés industrial o comercial efectivo (`interes_efectivo`); compensación económica adecuada (`compensacion_economica`) | ⛔ nulo (art. 21.2.a / 21.2.b ET) |
| Pacto de permanencia (`pacto_permanencia`) | especialización costeada por la empresa (`especializacion_costeada`); `forma_escrita` | ⛔ nulo (art. 21.4 ET) |
| Pacto de plena dedicación (`pacto_plena_dedicacion`) | `compensacion_economica` | ⛔ nulo: la plena dedicación exige compensación económica expresa (art. 21.1 ET) |

A diferencia del derecho francés, el pacto de no competencia español no exige límite geográfico ni límite ligado a las funciones: sus dos condiciones son el **interés efectivo** y la **compensación adecuada**, más la **duración máxima** (2 años para los técnicos, 6 meses para los demás), que se controla por cálculo.

### Extinciones y trámites

| Elemento | Condiciones | Si falta una condición |
|---|---|---|
| Despido disciplinario (`despido_disciplinario`) | un incumplimiento grave y culpable (`incumplimiento_grave`, o `faltas_asistencia`, `desobediencia`, `ofensas`, `transgresion_buena_fe`, `disminucion_rendimiento`, `acoso`); carta de despido (`carta_despido`); hechos concretos y fecha de efectos (`hechos_fecha`) | ⛔ improcedente (art. 55.4 ET): no se acredita el incumplimiento / despido sin carta / carta sin hechos ni fecha |
| Despido objetivo (`despido_objetivo`) | causa objetiva (`causas_etop` o `ineptitud`); `carta_despido`; indemnización puesta a disposición (`puesta_disposicion`); preaviso (`preaviso`) — riesgo | ⛔ improcedente (art. 53.4 ET) / ⚠️ sin preaviso de 15 días: se deben los salarios de ese periodo (no hace improcedente el despido) |
| Despido colectivo (`despido_colectivo`) | `causas_etop`; periodo de consultas (`periodo_consultas`); comunicación a la autoridad laboral (`comunicacion_autoridad`) — riesgo | ⛔ no ajustado a derecho (art. 124 LRJS) / ⛔ nulo: sin periodo de consultas / ⚠️ irregular (art. 51.2 ET) |
| Desistimiento en periodo de prueba (`desistimiento_prueba`) | `periodo_prueba` | ⛔ despido: sin periodo de prueba válido, la extinción es un despido |
| Dimisión (`dimision`) | voluntad clara e inequívoca (`voluntad_clara`) — riesgo | ⚠️ dudosa: podría tratarse de un despido |
| Extinción por mutuo acuerdo (`extincion_mutuo_acuerdo`) | consentimiento libre (`consentimiento_libre`); `forma_escrita` — riesgo | ⛔ nula: consentimiento viciado / ⚠️ riesgo de prueba |
| Extinción por incumplimiento del empresario (`extincion_art50`) | `impago_salarios`, `incumplimiento_empresario` o `acoso`; demanda (`demanda`) — riesgo | ⛔ desestimada: el contrato continúa / ⚠️ la extinción requiere sentencia |
| Rescisión por modificación sustancial (`extincion_art41`) | modificación sustancial (`modificacion_sustancial`) | ⛔ sin modificación sustancial del art. 41: no hay derecho a rescindir con indemnización |
| Demanda ante el Juzgado de lo Social (`demanda`) | conciliación previa (`conciliacion_previa`) — riesgo | ⚠️ falta la conciliación previa obligatoria (art. 63 LRJS) |

Una condición puede aceptar varios tipos: la causa del despido disciplinario se cumple con cualquiera de las faltas del art. 54.2 ET del catálogo; la causa del despido objetivo con `causas_etop` o con `ineptitud`; el incumplimiento del empresario del art. 50 con `impago_salarios`, `incumplimiento_empresario` o `acoso`.

Bajo la tarjeta, cada condición es una **pastilla** (siete como máximo): verde si se cumple, punteada roja (grave) o naranja (riesgo) si falta. La lista de condiciones del inspector indica también el elemento que la cumple («vía …») o el efecto si falta («Si no: …»).

### Contexto de una condición

Una condición se cumple si un elemento del tipo esperado está en el **contexto** del elemento verificado. El contexto comprende:

1. **los elementos unidos directamente**, sea cual sea el sentido y la relación (salvo `excluye`): `interes_efectivo IE` unido a `pacto_no_competencia NC`;
2. **la cadena de procedimiento**: todos los elementos unidos por `luego` al propio elemento o a uno de sus vecinos directos, por lejos que estén en la cadena. Con `despido_objetivo DO -> CARTA`, `CARTA -> PDI luego`, `PDI -> PRV luego`, la carta, la indemnización puesta a disposición y el preaviso cuentan para el despido;
3. **las formalidades del contrato**: si el elemento está unido directamente a un contrato (la cláusula que contiene, la extinción que le pone fin), cuentan también las cláusulas de ese contrato (`contiene`) y las salvaguardas unidas al propio contrato (`limita`). Una `forma_escrita` unida al contrato vale así para el periodo de prueba que contiene; un `desistimiento_prueba` unido al contrato encuentra el `periodo_prueba` que contiene.

Consecuencia: una cada salvaguarda **con la cláusula** que condiciona. Una salvaguarda unida al contrato vale para todas sus cláusulas; es lo previsto para la forma escrita, pero una `compensacion_economica` unida al contrato validaría a la vez el pacto de no competencia y el de plena dedicación.

Una condición no necesita ser «buena» para cumplirse: la herramienta comprueba que hay un elemento del tipo adecuado, no su contenido. Una compensación simbólica marcada `compensacion_economica` cuenta como adecuada; corresponde al comentario (o a `estado`) decir lo que decidiría un juez.

### Condiciones libres

El comando `condicion ID "Etiqueta" cumplida|falta [riesgo] ["efecto"]` añade una condición propia del elemento, mostrada como pastilla igual que las demás. Una condición libre que falta produce un problema grave (o de riesgo con `riesgo`), con el efecto indicado (por defecto «condición no cumplida»).

## Cláusulas ilícitas por naturaleza

Estas cláusulas son siempre ⛔, sean cuales sean las salvaguardas unidas:

| Cláusula | Veredicto |
|---|---|
| Renuncia a derechos (`renuncia_derechos`) | nula: el trabajador no puede disponer de derechos indisponibles (art. 3.5 ET) |
| Cláusula discriminatoria (`clausula_discriminatoria`) | nula y sin efecto (art. 17.1 ET) |

## Expediente e incompatibilidades

### El expediente

Un **expediente** es el conjunto de elementos unidos entre sí, de uno a otro, **sin pasar por las partes ni por las normas**. Un trabajador que firma dos contratos, o un convenio que regula varios contratos, no los funde en un solo expediente. Los vínculos `excluye` tampoco unen expedientes.

Ejemplo: `despido_objetivo DO -> CT` (extingue), `DO -> CARTA` (luego), `DO -> IND` (da derecho) forman un único expediente: el contrato, sus cláusulas, el despido, la carta y la indemnización.

### Incompatibilidades

Algunos tipos quedan **neutralizados** cuando hay un elemento de otro tipo en el **mismo expediente** (⊘). No hace falta que el vínculo sea directo. Con la verificación activada, la herramienta traza un vínculo rojo punteado entre los dos elementos.

| Elemento | Neutralizado por | Efecto |
|---|---|---|
| Periodo de prueba | `funciones_previas` (el trabajador ya desempeñó las mismas funciones en la empresa) | ⛔ nulo (art. 14.1 ET) |
| Pacto de permanencia | despido objetivo, despido colectivo, extinción del art. 50 | ⛔ inaplicable: el contrato no termina por abandono voluntario del trabajador |
| Indemnización por fin de contrato | contrato de sustitución, contrato formativo | ⛔ no se debe (art. 49.1.c ET) |
| Prestación por desempleo | dimisión; extinción por mutuo acuerdo | ⛔ no: no es situación legal de desempleo (art. 267 LGSS) |

Las **vacaciones no disfrutadas** no tienen ninguna incompatibilidad: se compensan en dinero sea cual sea la causa de la extinción (art. 38.1 ET), incluido el despido disciplinario procedente. La **prestación por desempleo** tampoco se neutraliza por un despido disciplinario: el despido, incluso procedente, es situación legal de desempleo.

Un vínculo explícito `A -> B excluye "efecto"` neutraliza B (⛔, con la etiqueta del vínculo como efecto) si A y B están además en el mismo expediente.

Cuidado con los expedientes demasiado amplios: si se unen dos situaciones que deberían quedar separadas (dos despidos, un contrato temporal y el indefinido que le sigue, una dimisión y un despido), las incompatibilidades se propagan de una a otra. Mantenga separados los expedientes que deben estarlo.

## Obligaciones incumplidas

Una **obligación** unida directamente a un elemento de la familia «faltas e incumplimientos» (`incumplimiento`, `incumplimiento_grave`, `faltas_asistencia`, `desobediencia`, `ofensas`, `transgresion_buena_fe`, `disminucion_rendimiento`, `acoso`, `ineptitud`, `impago_salarios`, `incumplimiento_empresario`) pasa a ⚡ **incumplida**, y el inspector indica por qué. El vínculo se crea con naturalidad: `incumplimiento I -> DIG` (relación `incumple`).

El incumplimiento en sí no tiene veredicto. Para que tenga efecto en una extinción, únalo también a la extinción: un `impago_salarios` unido a una `extincion_art50` cumple su condición «incumplimiento grave del empresario»; una `transgresion_buena_fe` unida a un `despido_disciplinario` cumple su causa.

## Causas de nulidad

Dos hechos relevantes, presentes en el expediente de un despido o de un desistimiento, hacen prevalecer la **nulidad** sobre la improcedencia (el problema se coloca en cabeza y da el texto del veredicto):

| Hecho | Despido disciplinario, despido objetivo, despido colectivo, desistimiento en prueba |
|---|---|
| `vulneracion_derechos` (discriminación, derechos fundamentales, garantía de indemnidad) | ⛔ siempre «nulo: discriminación o vulneración de derechos fundamentales — readmisión y salarios de tramitación» |
| `embarazo` (embarazo o permiso protegido) | ⛔ «nulo: embarazo o permiso protegido sin causa procedente» si falta además una condición grave (causa, carta…); si todas las condiciones se cumplen, solo ⚠️ «protección reforzada: nulo salvo que la causa sea ajena al embarazo o al permiso» |

Referencias mostradas: art. 55.5 ET (disciplinario), arts. 53.4 y 55.5 ET (objetivo), art. 124 LRJS (colectivo), art. 14.2 ET (prueba). En el despido objetivo, una causa de nulidad suspende el control de los umbrales del despido colectivo.

## Cálculos: mecanismo general

Las cifras se dan con `clave=valor`. Un cálculo busca la cifra primero en el propio elemento, después en los elementos de su expediente o unidos directamente y, por último, en las partes unidas al expediente: basta con poner las cifras en el trabajador que firma el contrato (y `plantilla` en la empresa). Los números admiten la notación española (`1.221,50`), el punto decimal (`1221.5`), el símbolo € y una unidad (`6 meses`, `20 días`, `3 años`, `40 h`).

Los resultados aparecen en el inspector (🧮) y, cuando se supera un límite, como un problema que cambia el veredicto.

### Datos

| Dato | Clave | Valores |
|---|---|---|
| Antigüedad | `antiguedad` | años, con decimales (`3.25` = 3 años y 3 meses); o `antiguedad_meses` |
| Salario | `salario` | bruto **mensual con prorrata de pagas extra** (= salario anual / 12), en €; o `salario_anual`, o `salario_diario` |
| Categoría | `categoria` | `tecnico_titulado`, `tecnico` u otro valor (demás trabajadores) |
| Plantilla | `plantilla` | número de trabajadores de la empresa (en la `empresa`) |
| Duración | `duracion` | meses (periodo de prueba, pactos, contrato temporal) |
| Meses con contratos temporales | `meses_acumulados` | meses trabajados en los últimos 24, en el `contrato_temporal` |
| Duración máxima del convenio | `max_convenio` | meses de prueba que fija el convenio (sustituye al máximo legal) |
| Jornada | `horas_semanales` (en `jornada`), `porcentaje_jornada` (tiempo parcial, en %) | horas; % |
| Horas extraordinarias | `horas_anuales` | horas al año |
| Días | `dias` | vacaciones, preaviso, salarios de tramitación, vacaciones no disfrutadas, despido nulo |
| Despidos en 90 días | `afectados` | número de extinciones por causas ETOP (en el despido objetivo o colectivo) |
| Importe | `importe` | € efectivamente puestos a disposición (en `indemnizacion_despido`) |
| Opción tras la improcedencia | `opcion` | `indemnizacion` (por defecto) o `readmision` |
| Representante | `representante` | `si`: la opción corresponde al trabajador |
| Contrato anterior a la reforma de 2012 | `anterior_reforma` | `si`: aviso del régimen transitorio de los 45 días |
| Días desde que la empresa conoció los hechos | `dias_conocimiento` | días (en `incumplimiento_grave`) |
| Días hábiles desde el despido | `dias_habiles` | días hábiles (en `conciliacion_previa`, `demanda`, o en el expediente del improcedente o del nulo) |
| Días cotizados | `dias_cotizados` | días cotizados en los 6 últimos años (en `prestacion_desempleo`) |

También se aceptan las claves francesas e inglesas equivalentes (`anciennete`, `seniority`, `salaire`, `salary`, `duree`, `duration`, `montant`, `amount`, `effectif`, `headcount`…) y algunos sinónimos españoles (`sueldo`, `salario_mensual`, `meses`, `cantidad`, `trabajadores`, `despidos`…).

### Cifras anuales y valores por defecto

| Cifra | Valor por defecto | Fuente | Cambia |
|---|---|---|---|
| SMI | **1221 € al mes en 14 pagas = 17.094 € al año** | salario mínimo interprofesional 2026 ⚠️ a verificar en el real decreto anual (2025: 1184 € × 14, RD 87/2025) | **cada año** |
| Jornada máxima | 40 horas semanales de promedio en cómputo anual | art. 34.1 ET ⚠️ proyecto de 37,5 horas rechazado en 2025: verificar | por ley |
| Horas extraordinarias | 80 al año | art. 35.2 ET | por ley |
| Vacaciones | 30 días naturales | art. 38.1 ET | por ley |
| Caducidad de la acción de despido | 20 días hábiles | art. 59.3 ET; art. 103 LRJS | por ley |

El SMI es un **parámetro**: póngalo en cualquier elemento del expediente (o en el trabajador) para usar otro valor, `parametro SAL smi_mensual=1184` o `smi_anual=16576`. Las demás cifras son fijas en el código (`DEF` al principio de `js/catalog-es.js`).

## Cálculos del derecho español

### Convenciones de cálculo ⚠️

> salario mensual = `salario` (bruto con prorrata de pagas extra), o `salario_anual` / 12, o `salario_diario` × 365 / 12
> salario diario = salario mensual × 12 / 365 (o `salario_diario` si se indica)
> antigüedad = años de servicio; **prorrata por meses**: un mes iniciado cuenta como mes completo
> tope en mensualidades = número de mensualidades × salario mensual

Son simplificaciones: la jurisprudencia calcula el salario regulador con todos los conceptos salariales del último periodo, y los convenios pueden mejorar las indemnizaciones.

### Periodo de prueba (art. 14 ET)

En el `periodo_prueba` con `duracion`: máximo legal **6 meses** para los técnicos titulados (`categoria=tecnico_titulado`) y **2 meses** para los demás trabajadores, **3 meses** en empresas de menos de 25 trabajadores (`plantilla` < 25); **1 mes** en un contrato temporal (`contrato_temporal` o `contrato_sustitucion` unido directamente) de hasta 6 meses. `max_convenio` sustituye al máximo legal. Más allá: ⛔ «nulo en lo que exceda de N meses (art. 14.1 ET)».

En el `desistimiento_prueba`, la `antiguedad` (en meses) se compara con la prueba máxima: si la supera, ⛔ «despido: el periodo de prueba máximo ya había terminado (art. 14 ET)».

> ⚠️ Simplificación: la categoría se reduce a técnico titulado / demás; el convenio colectivo puede fijar otras duraciones.

### Pactos del art. 21 ET

- **No competencia** (`duracion` en meses): máximo **24 meses** para los técnicos (`categoria` = `tecnico` o `tecnico_titulado`) y **6 meses** para los demás; sin `categoria`, solo se controla el máximo de 24 meses. Más allá: ⛔ «excede el máximo legal (art. 21.2 ET): nulo en el exceso ⚠️».
- **Permanencia**: máximo **2 años**; más allá, ⛔ «excede el máximo legal de 2 años (art. 21.4 ET)».

### Contratos temporales (art. 15 ET)

En el `contrato_temporal`:
- `duracion` de más de **6 meses** y hasta 12: ⚠️ «válido solo si el convenio sectorial amplía la duración a 1 año»; más de **12 meses**: ⛔ «fijo: excede la duración máxima del contrato por circunstancias de la producción»;
- `meses_acumulados` de más de **18** en los últimos 24: ⛔ «fijo: más de 18 meses en un periodo de 24 (art. 15.5 ET)».

### Salario mínimo (art. 27 ET)

En la cláusula `salario`: salario anual (`salario` × 12, o `salario_anual`) comparado con el SMI anual (17.094 € por defecto), en proporción a `porcentaje_jornada` si se indica. Por debajo: ⛔ «inferior al SMI: se deben las diferencias (art. 27 ET)». Con un `tiempo_parcial` en el expediente y sin `porcentaje_jornada`, la herramienta solo recuerda que el SMI se aplica en proporción a la jornada.

Ejemplo: 1300 € al mes con prorrata → 15.600 € al año < 17.094 € → ⛔. A media jornada (`porcentaje_jornada=50`), el mínimo es 8547 €.

### Jornada, horas extraordinarias y vacaciones

- `jornada` con `horas_semanales` > 40: ⚠️ «excede la jornada máxima ordinaria: el exceso son horas extraordinarias (arts. 34.1 y 35 ET)».
- `horas_extra` con `horas_anuales` > 80: ⛔ «excede el máximo de 80 horas extraordinarias al año (art. 35.2 ET)».
- `vacaciones` con `dias` < 30: ⛔ «nula en lo que reduce el mínimo de 30 días naturales (art. 38.1 ET)».

### Indemnizaciones por extinción

> indemnización = días por año × antigüedad (prorrata por meses) × salario diario, con un tope de N mensualidades

| Extinción en el expediente de `indemnizacion_despido` | Días por año | Tope |
|---|---|---|
| Despido objetivo, despido colectivo (arts. 53.1.b y 51.4 ET) | 20 | 12 mensualidades |
| Extinción del art. 50 ET (como el improcedente) | 33 | 24 mensualidades |
| Rescisión por modificación sustancial (art. 41.3 ET) | 20 | 9 mensualidades |
| Despido disciplinario | — | sin indemnización si es procedente (art. 55.7 ET); se recuerda que, si es improcedente, son 33 días por año |
| Ninguna de las anteriores | 20 (por defecto) | 12 mensualidades |
| `despido_improcedente` (opción por la indemnización, art. 56.1 ET) | 33 | 24 mensualidades |
| `indemnizacion_fin_contrato` (art. 49.1.c ET) | 12 | sin tope |

Ejemplos:
- despido objetivo, 5 años, 1825 € al mes → salario diario 1825 × 12 / 365 = 60 €; 20 × 5 = 100 días × 60 € = **6000 €** (tope 12 × 1825 = 21.900 €);
- el mismo trabajador con 10 años, despido improcedente → 33 × 10 = 330 días × 60 € = **19.800 €** (tope 43.800 €);
- despido objetivo, 20 años, 2000 € al mes → 400 días × 65,75 € = 26.301,37 €, por encima del tope: **12 × 2000 = 24.000 €**;
- despido improcedente, 3 años y 3 meses (`antiguedad=3.25`), 2400 € al mes → 107,25 días × 78,90 € = **8462,47 €**;
- fin de un contrato temporal, 1 año, 1300 € al mes → 12 días × 42,74 € = **512,88 €**.

En la `indemnizacion_despido`, un `importe` inferior al cálculo da ⚠️ «importe inferior al legal: se debe la diferencia; si el error no es excusable, el despido es improcedente (art. 53.4 ET)».

> ⚠️ Régimen transitorio: para los contratos anteriores al 12/02/2012, el tiempo anterior se indemniza a 45 días por año con sus propios topes (DT 11.ª ET); no se calcula aquí (`anterior_reforma=si` muestra un aviso). ⚠️ Debate sobre una indemnización adicional por despido improcedente (Comité Europeo de Derechos Sociales, 2024) y anuncios de reforma: verificar.

### Despido objetivo: preaviso y umbrales

- `preaviso` en el expediente de un despido objetivo: se muestra el preaviso legal de **15 días** (art. 53.1.c ET); con `dias` < 15, ⚠️ «preaviso insuficiente: se deben N días de salario (importe) (art. 53.4 ET)». El despido no se vuelve improcedente.
- `preaviso` con una dimisión: el del convenio o la costumbre (a menudo 15 días), solo mostrado; con un fin de contrato temporal: 15 días si el contrato dura más de un año; con un despido disciplinario: «el despido disciplinario no lleva preaviso».
- **Umbrales del despido colectivo** (art. 51.1 ET), con `afectados` en el despido y `plantilla` en la empresa: 10 trabajadores en empresas de menos de 100, el 10 % de 100 a 300, 30 en empresas de más de 300. En un **despido objetivo**, alcanzar el umbral da ⛔ «nulo: se alcanzan los umbrales del despido colectivo sin seguir su procedimiento (fraude, art. 51.1 ET; art. 122.2 LRJS)». En un **despido colectivo**, se muestra si se alcanza el umbral (y, por encima de 50 afectados, la obligación de un plan de recolocación externa) o si basta el despido objetivo individual.

> ⚠️ Umbrales computados por empresa; el TJUE (Rabal Cañas, 2015) exige computarlos también por centro de trabajo de más de 20 trabajadores.

### Improcedente, nulo y salarios de tramitación

- `despido_improcedente`: con `opcion=indemnizacion` (o sin opción), indemnización de 33 días por año, máx. 24 mensualidades; con `opcion=readmision`, salarios de tramitación = `dias` × salario diario (art. 56.2 ET); con `representante=si`, «la opción le corresponde a él (art. 56.4 ET)».
- `despido_nulo`: «readmisión inmediata + salarios de tramitación (art. 55.6 ET)», con su importe si se indican `dias`. Ejemplo: 90 días × 78,90 € = **7101,37 €**.
- `salarios_tramitacion` y `vacaciones_no_disfrutadas`: `dias` × salario diario.

### Prescripción de las faltas y caducidad de la acción

- **Prescripción** (art. 60.2 ET): un `incumplimiento_grave` con `dias_conocimiento` > **60** es ⛔ «falta prescrita: ya no puede sancionarse»; si está unido directamente a un despido disciplinario, el despido pasa a ⛔ «improcedente: la falta ha prescrito (art. 60.2 ET)», en cabeza de los problemas. Solo se controla el plazo de 60 días de las faltas muy graves (no los de 10 y 20 días, ni el de 6 meses desde la comisión).
- **Caducidad** (art. 59.3 ET; art. 103 LRJS): en la `conciliacion_previa`, la `demanda`, el `despido_improcedente` o el `despido_nulo`, `dias_habiles` > **20** da ⛔ «acción caducada: el despido ya no puede impugnarse». La herramienta no descuenta la suspensión del plazo durante la conciliación: indique los días hábiles ya computados.

### Prestación por desempleo (arts. 267 y 269 LGSS)

Con `dias_cotizados` en la `prestacion_desempleo`: menos de **360 días** cotizados en los 6 últimos años → ⛔ «no: menos de 360 días cotizados»; si no, se muestra la duración: 120 días de 360 a 539 días cotizados, y 60 días más por cada tramo de 180 días, hasta **720 días** a partir de 2160 días cotizados. Ejemplo: 1080 días cotizados → 360 días de prestación. La dimisión y el mutuo acuerdo la neutralizan (véanse las incompatibilidades).

## Derecho francés, en español

Un escenario puede usar el derecho francés con un texto en español (derecho comparado). Sus reglas son las de la [documentación francesa](../regles-de-calcul.md): periodo de prueba según la `categorie`, CDD de más de 18 meses recalificado, preaviso legal (1 mes de 6 meses a 2 años, 2 meses a partir de 2 años), indemnización legal de despido = salario × (1/4 × años hasta 10 + 1/3 × años a partir de 10), no debida con menos de 8 meses, mínimo de la ruptura convencional, indemnización de precariedad del 10 %. La falta grave (`faute_grave`) neutraliza el preaviso y la indemnización de despido; el pacto de no competencia francés exige cinco salvaguardas, entre ellas una **contrapartida económica**.

## Veredicto impuesto: `estado` y `condicion`

Cuando la herramienta no conoce una regla, o la apreciación del juez cambia la respuesta, el escenario impone el resultado:
- `estado ID nula "texto"` (o `valida`, `riesgo`, `incumplida`, `neutral`; también `improcedente`, `procedente`) sustituye al veredicto calculado, con el texto dado; `estado ID auto` vuelve al cálculo. El inspector indica «veredicto fijado por el escenario». **Un veredicto impuesto sigue visible incluso con `verificacion off`**: no lo imponga antes de una pregunta cuya respuesta daría;
- `condicion ID "Etiqueta" falta "efecto"` añade una pastilla y un problema, sin tocar las demás condiciones.

## Verificación oculta

`verificacion off` (o la casilla 🔍 Verificación desmarcada) oculta los veredictos, las pastillas y los vínculos de incompatibilidad trazados automáticamente; las tarjetas quedan neutras y la lista de condiciones muestra ❔. Los cálculos siguen mostrándose en el inspector. `verificacion on` restablece la vista.

## Lo que la herramienta no representa

- **La apreciación de los hechos por el juez**: si el incumplimiento es realmente grave y culpable, si la compensación de un pacto es «adecuada», si la causa económica está suficientemente acreditada, si hubo represalia o discriminación, si la voluntad de dimitir era clara. La herramienta comprueba que hay una salvaguarda, no su calidad;
- **los convenios colectivos y las mejoras contractuales**: duraciones de prueba, preaviso de la dimisión, graduación de las faltas, indemnizaciones mejoradas (salvo `max_convenio` para la prueba);
- **las fechas y los plazos reales**: la herramienta compara los días que se le indican (prescripción, caducidad) pero no cuenta los días hábiles, ni la suspensión por la conciliación, ni los 5 días de opción tras la sentencia, ni los 30 o 15 días del periodo de consultas. Pueden escribirse como etiqueta de un vínculo (`luego "20 días hábiles"`);
- **el cálculo completo de las indemnizaciones**: salario regulador real, régimen transitorio de los 45 días (DT 11.ª ET), indemnización adicional o por daños morales (art. 183 LRJS), límites del FOGASA, fiscalidad y cotización;
- **los regímenes especiales y colectivos**: alta dirección, relaciones laborales especiales, ERTE y mecanismo RED, sucesión de empresa (art. 44 ET), garantías completas de los representantes, despido colectivo por centro de trabajo, plan de igualdad;
- **las fechas de las reformas**: la herramienta no sabe qué SMI se aplica a la fecha del caso, ni si una reforma anunciada (jornada de 37,5 horas, registro digital de jornada, transposición de la Directiva (UE) 2019/1152) está en vigor — ajuste los parámetros y el comentario en consecuencia.

En estos casos, el lienzo muestra los elementos en juego, `estado` o `condicion` fijan el veredicto deseado y el comentario lleva el análisis.
