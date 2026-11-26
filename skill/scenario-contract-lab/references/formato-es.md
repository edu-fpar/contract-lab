# Formato de los escenarios (modo «cine»)

Un escenario es un archivo **markdown** corriente. La herramienta lo divide en **pasos** (uno por cada título de nivel 2) y ejecuta, en cada paso, los **comandos** de los bloques `scene`, que construyen un esquema: un contrato y sus cláusulas, sus salvaguardas, las partes y sus obligaciones, una extinción y su procedimiento, las indemnizaciones a las que da derecho. Después la herramienta **verifica** cada elemento (✅ válida, ⚠️ en riesgo, ⛔ nula o improcedente, ⚡ obligación incumplida).

Hay tres derechos disponibles: **derecho español**, **derecho francés** y **derecho inglés (Inglaterra y Gales)**. Un escenario usa uno de ellos (véase «Elegir el derecho»); los comandos son los mismos, el catálogo de tipos cambia.

## Estructura

~~~
---
droit: es
---
# Título del escenario
> Una frase de descripción (opcional).

Texto de introducción (opcional: se convierte en el primer paso).

## 1. Título del primer paso
Comentario en markdown: **negrita**, *cursiva*, listas, tablas, citas…
Se puede citar un elemento por su identificador: [[NC]].

```scene
empresa EMP "Ópticas del Turia S.L."
trabajador CAR "Carlos Gil" antiguedad=4 salario=2500 categoria=tecnico
contrato_indefinido CT "Contrato de Carlos"
EMP CAR -> CT
pacto_no_competencia NC "No competencia" duracion=24
CT -> NC
focus NC
```

## 2. Título del paso siguiente
…
~~~

Reglas:
- los pasos son **acumulativos**: cada paso parte del estado del anterior;
- `focus`, `nota` y `seleccion` solo valen para el paso en que se escriben; `vista` sigue activa hasta `vista ninguna`;
- los bloques pueden escribirse ```scene o ~~~scene (alias: canvas, actions, script);
- dentro de un bloque, una línea que empieza por # o // es un comentario;
- identificadores sin espacios (CT, NC, CAR…); nombres entre comillas dobles;
- `[[ID]]` en el comentario muestra el nombre del elemento, resaltado en el lienzo al pasar el ratón (`[[ID|otro texto]]` para elegir el texto).

## Elegir el derecho

| Derecho | Cómo elegirlo | Claves de tipos |
|---|---|---|
| Derecho español | encabezado `droit: es` al principio del archivo (también `derecho: es`), o el comando `derecho es` en el primer bloque | en español, sin tildes: `trabajador`, `contrato_indefinido`, `pacto_no_competencia`, `despido_disciplinario`, `indemnizacion_despido`… |
| Derecho francés | el derecho por defecto: no hay que escribir nada (o `droit: fr`) | claves francesas (`salarie`, `cdi`, `non_concurrence`, `licenciement_personnel`…) |
| Derecho inglés (Inglaterra y Gales) | encabezado `droit: uk` | claves inglesas (`employee`, `permanent`, `non_compete`, `conduct_dismissal`…) |

- Nombres aceptados: `es`, `espana`, `spain`, `derecho_espanol`… para el derecho español; `fr`, `france` para el francés; `uk`, `england`, `english_law` para el inglés.
- Un escenario, un derecho. El encabezado es la forma recomendada: la biblioteca y los enlaces compartidos muestran entonces la bandera correcta. Debe empezar en la primera línea del archivo.
- El idioma del texto y el derecho son independientes: un escenario de derecho francés puede escribirse en español (derecho comparado). Las etiquetas del catálogo siguen el idioma de la interfaz cuando existe una traducción.
- Derecho español: importes en €, `antiguedad` en años (con decimales), `salario` bruto **mensual con prorrata de pagas extra**, `categoria` (`tecnico_titulado`, `tecnico` u otro). Derecho francés: `anciennete`, `salaire`, `categorie` (también se aceptan `antiguedad`, `salario`, `categoria` en el derecho español, y las claves francesas o inglesas equivalentes).

## Pasos pregunta (quiz)

Un paso puede interrogar al público. Sube entonces una ventana en la parte inferior del lienzo con la pregunta y las opciones en grandes tarjetas. El docente puede hacer clic en la opción elegida por la clase y después revela la respuesta: botón, **→** o mando de presentación. Las tarjetas cambian de color; al hacer clic en una tarjeta se le da la vuelta para leer su explicación. La explicación general aparece en el panel de la derecha. En reproducción continua, el avance espera a la revelación. En un paquete SCORM, las preguntas dan una nota.

~~~
## Pregunta: ¿es válido este pacto de no competencia?
Contexto opcional, que se muestra en el panel de la derecha.

```scene
verificacion off
interes_efectivo IE "Clientela de la óptica"
IE -> NC
focus NC
```

- [ ] Sí, Carlos firmó su contrato
  La firma no basta: el pacto restringe la libertad de trabajo (art. 21.2 ET).
- [x] No, le falta una compensación económica adecuada
  Las condiciones son acumulativas: sin compensación, el pacto es nulo.
- [ ] Sí, si la empresa lo decide
  El juez controla los requisitos de validez.

### Respuesta
Explicación general, que se muestra tras la revelación.

```scene
verificacion on
compensacion_economica CE "30 % del salario"
CE -> NC
nota NC "Válido: interés efectivo y compensación"
```
~~~

Reglas:
- un paso es una pregunta si su título empieza por «Pregunta» (o «Question», «Quiz», «❓»), si contiene opciones `- [ ]` / `- [x]`, o una sección `### Respuesta` (también: Solución, Explicación, Corrección; en francés: Réponse; en inglés: Answer);
- `[x]` marca una respuesta correcta; puede haber varias, o ninguna casilla para una **pregunta abierta**;
- el texto de la pregunta es el título, sin el prefijo «Pregunta:»;
- el contexto va **antes** de las opciones; las líneas sangradas (o «> ») justo debajo de una opción son su explicación;
- los comandos situados **después** de `### Respuesta` solo se ejecutan al revelar, lo que permite mostrar la respuesta en el lienzo; siguen aplicados en los pasos siguientes (salvo `focus`, `nota` y `seleccion`, propios del paso);
- `verificacion off` antes de la pregunta oculta veredictos y pastillas (si no, el lienzo da la respuesta), `verificacion on` en la respuesta los restablece;
- evite que el texto de los pasos anteriores ya dé la respuesta.

## Comandos

Cada comando tiene un nombre en español, en francés y en inglés (`quitar` / `retirer` / `remove`…); se pueden mezclar.

| Comando | Efecto |
|---|---|
| `TIPO ID "Nombre"` | crea o modifica un elemento del tipo indicado (véase el catálogo más abajo), p. ej. `pacto_permanencia PP "Permanencia 2 años"` |
| `TIPO ID "Nombre" clave=valor …` | con datos: `trabajador CAR "Carlos" antiguedad=4 salario=2500 categoria=tecnico`, `periodo_prueba PR duracion=6`, `contrato_temporal CT duracion=8` |
| `clause ID "Nombre" icono=🧸` | elemento libre, con el icono que se quiera (también `condition`, `obligation`, `rupture`, `etape`, `droit`, `norme`, `partie`, `contrat`) |
| `TIPO ID "Nombre" en 200 150` | posición fija (también `at`); sin ella, disposición automática |
| `A -> B` | une A con B; la relación se elige según los tipos (véase más abajo) |
| `A B C -> D` | une A, B y C con D (p. ej. tres salvaguardas con una cláusula) |
| `A -> B C D` | une A con B, C y D (p. ej. un contrato con sus cláusulas) |
| `A -> B relación` | relación impuesta: `contiene`, `limita`, `requiere`, `excluye`, `firma`, `debe`, `incumple`, `justifica`, `inicia`, `extingue`, `luego`, `da_derecho`, `regula`, `prevalece`, `vinculo` (en francés: `contient`, `limite`, `requiert`, `exclut`, `signe`, `doit`, `viole`, `justifie`, `initie`, `met_fin`, `puis`, `ouvre`, `encadre`, `prevaut`, `lien`) |
| `A -> B luego "20 días hábiles"` | relación con una etiqueta mostrada en el vínculo (plazo, importe…) |
| `limita CE NC` | otra forma: primero la relación, después el origen y el destino o destinos |
| `quitar ID` / `quitar A -> B` | elimina un elemento / un vínculo (`retirer`, `eliminar`) |
| `renombrar ID "Nuevo nombre"` · `tipo ID contrato_temporal` | renombra / cambia el tipo |
| `parametro ID clave=valor` · `icono ID 🧸` | añade o modifica datos / el icono (`param`, `icone`) |
| `condicion ID "Etiqueta" cumplida` / `falta` | condición libre mostrada como pastilla (`falta riesgo`: naranja; `"efecto"` al final de la línea); `condicion ID ninguna` las quita (también `ok` / `manque`) |
| `estado ID nula "texto"` | impone un veredicto: `valida`, `riesgo`, `nula`, `incumplida`, `neutral` (también `improcedente`, `procedente`; `veredicto`, `statut`); `estado ID auto` vuelve al cálculo |
| `verificacion off` / `on` | oculta / muestra los veredictos y las pastillas (para las preguntas) |
| `vista ID` / `vista ninguna` | zoom en el expediente de un elemento (el resto queda atenuado) |
| `focus ID ID…` | resalta elementos (también `resaltar`) |
| `nota ID "texto"` | bocadillo encima de un elemento |
| `seleccion ID` | muestra las condiciones de validez de ID bajo el comentario |
| `duracion 12` | duración del paso en reproducción continua, en segundos |
| `mover ID X Y` · `disposicion` · `borrar` | mover, volver a la disposición automática, vaciar el lienzo |
| `derecho es` · `derecho fr` | elige el derecho; mejor el encabezado `droit: es` |

Un elemento citado en un vínculo sin haberse declarado se crea automáticamente (como cláusula libre, o del tipo cuyo nombre lleva) y se muestra una advertencia: declare siempre sus elementos.

### Relaciones elegidas automáticamente

| De → a | Relación |
|---|---|
| salvaguarda → cualquier elemento | `limita` (vínculo verde 🔒) |
| parte → contrato | `firma` |
| contrato → cláusula | `contiene` (la cláusula entra en el marco del contrato) |
| parte → obligación | `debe` |
| falta / incumplimiento → obligación | `incumple` (la obligación pasa a ⚡ incumplida) |
| falta → extinción | `justifica` (la falta cuenta como causa de la extinción) |
| parte → extinción | `inicia` |
| extinción → contrato | `extingue` |
| extinción → trámite, trámite → trámite | `luego` (cadena de procedimiento, mostrada en fila) |
| extinción o trámite → indemnización / derecho | `da_derecho` |
| norma → norma / otro | `prevalece` / `regula` |

### Qué verifica la herramienta

- **Salvaguardas**: cada tipo tiene sus condiciones (columna «Condiciones verificadas» del catálogo). Una condición se cumple si un elemento del tipo esperado está **unido directamente** al elemento, pertenece a la misma **cadena de procedimiento** (`luego`) o está unido al **contrato** que contiene la cláusula (p. ej. una `forma_escrita` unida al contrato vale para su periodo de prueba). Las condiciones que faltan aparecen como pastillas punteadas bajo la tarjeta.
- **Incompatibilidades** (⊘): se verifican en el mismo **expediente**, es decir, los elementos unidos entre sí, sin pasar por las partes ni por las normas. P. ej. `funciones_previas` (el trabajador ya había desempeñado esas funciones) neutraliza el `periodo_prueba`; en derecho francés, una `faute_grave` neutraliza el `preavis` y la `indemnite_licenciement`.
- **Datos**: una cifra se busca en el propio elemento, después en su expediente y después en las partes unidas a él: ponga `antiguedad`, `salario` y `categoria` en el trabajador, y `plantilla` en la empresa.
- **Cálculos, derecho español** (⚠️ simplificaciones descritas en el catálogo): indemnización por despido con prorrata por meses (20 días por año con tope de 12 mensualidades en el despido objetivo o colectivo; 33 días con tope de 24 si es improcedente; 12 días al fin de un contrato temporal), salario diario = `salario` × 12 / 365 (o `salario_diario`), duración máxima del periodo de prueba (art. 14 ET), del pacto de no competencia (2 años técnicos, 6 meses los demás) y del pacto de permanencia, contrato por circunstancias de la producción (`duracion`, `meses_acumulados`: 18 meses en 24), SMI, jornada, horas extraordinarias y vacaciones, preaviso de 15 días, umbrales del despido colectivo (`plantilla`, `afectados`), plazos de caducidad (`dias_habiles`: 20 días hábiles), prestación por desempleo (`dias_cotizados`). Las cifras anuales (SMI…) son parámetros que se pueden sustituir en cualquier elemento.
- **Cálculos, derecho francés**: periodo de prueba (`duree` en meses, `categorie` del trabajador), CDD (`duree` > 18 meses), preaviso legal e indemnización legal por despido (`anciennete` en años, `salaire` mensual bruto), indemnización de ruptura convencional (`montant` frente al mínimo legal), indemnización de precariedad (`remuneration_totale`).

## Catálogo de tipos

### Derecho español

Encabezado `droit: es`. Las claves de tipos están en español, sin tildes; la columna «También se acepta» da los alias.

#### 👥 Partes y actores

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `empresa` | 🏢 | Empresa | `plantilla` | — | `empresario`, `empleador`, `compania`, `sociedad`, `employer`, `employeur`, `entreprise` |
| `trabajador` | 👤 | Trabajador | `antiguedad`, `salario`, `categoria` | — | `trabajadora`, `empleado`, `empleada`, `asalariado`, `persona_trabajadora`, `employee`, `salarie` |
| `representantes` | 🗣️ | Representantes de los trabajadores | — | — | `comite_de_empresa`, `comite_empresa`, `delegados_de_personal`, `delegados`, `rlt`, `representacion_legal`, `sindicato` |
| `inspeccion_trabajo` | 🏛️ | Inspección de Trabajo | — | — | `inspeccion`, `itss`, `inspeccion_de_trabajo` |
| `smac` | 🕊️ | Servicio de conciliación (SMAC) | — | — | `cmac`, `servicio_de_mediacion`, `servicio_conciliacion` |
| `juzgado_social` | ⚖️ | Juzgado de lo Social | — | — | `juzgado`, `juzgado_de_lo_social`, `juez`, `tribunal` |
| `sepe` | 🏦 | SEPE | — | — | `servicio_publico_de_empleo` |
| `fogasa` | 🛟 | FOGASA | — | — | `fondo_de_garantia_salarial` |
| `nueva_empresa` | 🏭 | Nueva empresa | — | — | — |
| `partie` | 👥 | Otro actor | — | — | `actor`, `parte` |

#### 📃 Contratos

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `contrato_indefinido` | 📄 | Contrato indefinido | — | `informacion_elementos` o `forma_escrita` (riesgo) | `indefinido`, `contrato_fijo`, `fijo`, `cdi`, `permanent` |
| `contrato_temporal` | ⏳ | Contrato por circunstancias de la producción | `duracion`, `meses_acumulados` | `forma_escrita`, `causa_temporal` | `temporal`, `eventual`, `contrato_eventual`, `circunstancias_de_la_produccion`, `contrato_circunstancias_produccion`, `cdd`, `fixed_term` |
| `contrato_sustitucion` | 🔁 | Contrato de sustitución | — | `forma_escrita`, `causa_temporal` | `sustitucion`, `interinidad`, `contrato_de_interinidad` |
| `contrato_formativo` | 🎓 | Contrato formativo | — | `forma_escrita` | `formativo`, `practicas`, `contrato_en_practicas`, `formacion_en_alternancia` |
| `fijo_discontinuo` | 🌗 | Contrato fijo-discontinuo | — | `forma_escrita` | `discontinuo`, `contrato_fijo_discontinuo` |
| `contrat` | 📃 | Otro contrato | — | — | `contrato`, `otro_contrato` |

#### 🧩 Cláusulas

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `salario` | 💶 | Salario | `salario` | — | — |
| `jornada` | ⏱️ | Jornada | `horas_semanales` | `registro_jornada` (riesgo) | — |
| `tiempo_parcial` | 🌓 | Tiempo parcial | — | `forma_escrita` | — |
| `horas_extra` | 🕐 | Horas extraordinarias | `horas_anuales` | — | `horas_extraordinarias` |
| `vacaciones` | 🏖️ | Vacaciones | `dias` | — | — |
| `periodo_prueba` | 🧪 | Periodo de prueba | `duracion` | `forma_escrita` ; ⊘ `funciones_previas` | `prueba`, `periodo_de_prueba`, `probation`, `periode_essai` |
| `pacto_no_competencia` | 🚫 | Pacto de no competencia | `duracion` | `interes_efectivo`, `compensacion_economica` | `no_competencia`, `no_concurrencia_postcontractual`, `pacto_de_no_competencia`, `non_compete`, `non_concurrence` |
| `pacto_permanencia` | ⚓ | Pacto de permanencia | `duracion` | `especializacion_costeada`, `forma_escrita` ; ⊘ `despido_objetivo`/`despido_colectivo`/`extincion_art50` | `permanencia`, `pacto_de_permanencia` |
| `pacto_plena_dedicacion` | 🔒 | Pacto de plena dedicación | — | `compensacion_economica` | `plena_dedicacion`, `exclusividad`, `pacto_de_exclusividad` |
| `confidencialidad` | 🤐 | Confidencialidad | — | — | `secreto`, `pacto_de_confidencialidad` |
| `renuncia_derechos` | 🙈 | Renuncia a derechos | — | ilícita por naturaleza | — |
| `clausula_discriminatoria` | 🚷 | Cláusula discriminatoria | — | ilícita por naturaleza | — |
| `clause` | 🧩 | Otra cláusula | — | — | `clausula`, `otra_clausula` |

#### 🔒 Salvaguardas y condiciones

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `forma_escrita` | ✍️ | Por escrito | — | — | `escrito`, `por_escrito` |
| `informacion_elementos` | 📝 | Información de los elementos esenciales | — | — | — |
| `causa_temporal` | 📌 | Causa temporal precisa | — | — | `causa_habilitante`, `causa_del_contrato` |
| `interes_efectivo` | 🏰 | Interés industrial o comercial efectivo | — | — | `interes_industrial`, `interes_comercial`, `interes` |
| `compensacion_economica` | 💰 | Compensación económica adecuada | — | — | `compensacion`, `contraprestacion` |
| `especializacion_costeada` | 🎒 | Especialización costeada por la empresa | — | — | — |
| `funciones_previas` | 🔂 | Ya desempeñó las mismas funciones | — | — | — |
| `embarazo` | 🤰 | Embarazo o permiso protegido | — | — | — |
| `vulneracion_derechos` | 🚨 | Discriminación o vulneración de derechos fundamentales | — | — | — |
| `causas_etop` | 📉 | Causas económicas, técnicas, organizativas o de producción | — | — | `causas_economicas`, `causa_economica`, `causas_objetivas`, `etop` |
| `hechos_fecha` | 🗓️ | Hechos concretos y fecha de efectos | — | — | — |
| `voluntad_clara` | 🧠 | Voluntad clara e inequívoca | — | — | — |
| `consentimiento_libre` | 🕊️ | Consentimiento libre | — | — | — |
| `condition` | ☑️ | Otra condición | — | — | `otra_condicion` |

#### 📌 Obligaciones

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `pagar_salario` | 💳 | Pagar el salario | — | — | — |
| `ocupacion_efectiva` | 🧰 | Ocupación efectiva | — | — | — |
| `seguridad_salud` | 🦺 | Seguridad y salud | — | — | — |
| `no_discriminacion` | 🟰 | No discriminación | — | — | — |
| `dignidad_intimidad` | 🗽 | Dignidad, intimidad y desconexión | — | — | — |
| `registro_jornada` | 🕰️ | Registrar la jornada | — | — | — |
| `buena_fe` | 🤲 | Buena fe | — | — | — |
| `diligencia` | 🛠️ | Diligencia | — | — | — |
| `obediencia` | 📋 | Cumplir las órdenes | — | — | — |
| `no_concurrencia` | 🚧 | No concurrencia desleal | — | — | — |
| `prevencion_trabajador` | ⛑️ | Observar la prevención | — | — | — |
| `obligation` | 📌 | Otra obligación | — | — | — |

#### ⚡ Faltas e incumplimientos

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `incumplimiento` | ⚡ | Incumplimiento | — | — | `falta`, `manquement` |
| `incumplimiento_grave` | 🔥 | Incumplimiento grave y culpable | `dias_conocimiento` | — | `falta_muy_grave`, `falta_grave`, `incumplimiento_grave_y_culpable` |
| `faltas_asistencia` | ⏰ | Faltas de asistencia o puntualidad | — | — | — |
| `desobediencia` | 🙅 | Indisciplina o desobediencia | — | — | — |
| `ofensas` | 🗯️ | Ofensas verbales o físicas | — | — | — |
| `transgresion_buena_fe` | 🎭 | Transgresión de la buena fe | — | — | — |
| `disminucion_rendimiento` | 🐢 | Disminución del rendimiento | — | — | — |
| `acoso` | 🛑 | Acoso | — | — | — |
| `ineptitud` | 📊 | Ineptitud o falta de adaptación | — | — | — |
| `impago_salarios` | 🧾 | Impago o retrasos en el salario | — | — | — |
| `incumplimiento_empresario` | 💥 | Incumplimiento grave del empresario | — | — | — |

#### 💔 Extinción del contrato

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `despido_disciplinario` | 📤 | Despido disciplinario | — | `incumplimiento_grave` o `faltas_asistencia` o `desobediencia` o `ofensas` o `transgresion_buena_fe` o `disminucion_rendimiento` o `acoso`, `carta_despido`, `hechos_fecha` | `despido`, `despido_por_faltas` |
| `despido_objetivo` | 🏚️ | Despido objetivo | `afectados` | `causas_etop` o `ineptitud`, `carta_despido`, `puesta_disposicion`, `preaviso` (riesgo) | `despido_por_causas_objetivas` |
| `despido_colectivo` | 🏭 | Despido colectivo | `afectados` | `causas_etop`, `periodo_consultas`, `comunicacion_autoridad` (riesgo) | `ere`, `expediente_de_regulacion_de_empleo` |
| `desistimiento_prueba` | 🚦 | Desistimiento en periodo de prueba | — | `periodo_prueba` | `desistimiento`, `no_supera_la_prueba` |
| `fin_contrato_temporal` | ⏹️ | Fin del contrato temporal | — | — | `fin_contrato`, `fin_de_contrato`, `expiracion` |
| `dimision` | 🚪 | Dimisión | — | `voluntad_clara` (riesgo) | `baja_voluntaria`, `dimision_del_trabajador` |
| `extincion_mutuo_acuerdo` | 🤝 | Extinción por mutuo acuerdo | — | `consentimiento_libre`, `forma_escrita` (riesgo) | `mutuo_acuerdo`, `baja_pactada` |
| `extincion_art50` | 🚩 | Extinción por incumplimiento del empresario | — | `impago_salarios` o `incumplimiento_empresario` o `acoso`, `demanda` (riesgo) | `extincion_causa_justa`, `resolucion_por_incumplimiento`, `art_50` |
| `extincion_art41` | 🔧 | Rescisión por modificación sustancial | — | `modificacion_sustancial` | `rescision_art41`, `rescision_modificacion_sustancial` |
| `rupture` | 💔 | Otra extinción | — | — | `extincion`, `otra_extincion` |

#### 🔹 Procedimiento

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `carta_despido` | ✉️ | Carta de despido | — | — | `carta`, `carta_de_despido`, `comunicacion_escrita` |
| `puesta_disposicion` | 💸 | Indemnización puesta a disposición | — | — | `puesta_a_disposicion` |
| `preaviso` | 🔔 | Preaviso | `dias` | — | — |
| `expediente_contradictorio` | 📂 | Expediente contradictorio | — | — | — |
| `periodo_consultas` | 📢 | Periodo de consultas | — | — | `consultas`, `periodo_de_consultas` |
| `comunicacion_autoridad` | 🏛️ | Comunicación a la autoridad laboral | — | — | — |
| `modificacion_sustancial` | 🔀 | Modificación sustancial (art. 41 ET) | — | — | — |
| `conciliacion_previa` | 📞 | Conciliación previa | `dias_habiles` | — | `conciliacion`, `papeleta`, `papeleta_de_conciliacion`, `acto_de_conciliacion` |
| `demanda` | 📄 | Demanda ante el Juzgado de lo Social | `dias_habiles` | `conciliacion_previa` (riesgo) | `demanda_judicial` |
| `finiquito` | 🗂️ | Finiquito | — | — | `liquidacion`, `saldo_y_finiquito` |
| `etape` | 🔹 | Otro trámite | — | — | `tramite`, `paso` |

#### 🎁 Indemnizaciones y derechos

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `indemnizacion_despido` | 💵 | Indemnización por despido | `importe` | — | `indemnizacion` |
| `despido_improcedente` | ⚖️ | Despido improcedente | `opcion` | — | `improcedente`, `improcedencia` |
| `despido_nulo` | 🚫 | Despido nulo | `dias` | — | `nulo`, `nulidad` |
| `indemnizacion_fin_contrato` | 💷 | Indemnización por fin de contrato | — | ⊘ `contrato_sustitucion`/`contrato_formativo` | `indemnizacion_temporal`, `indemnizacion_12_dias` |
| `salarios_tramitacion` | ⏳ | Salarios de tramitación | `dias` | — | `salarios_de_tramitacion` |
| `vacaciones_no_disfrutadas` | 🏝️ | Vacaciones no disfrutadas | `dias` | — | `vacaciones_pendientes` |
| `prestacion_desempleo` | ☂️ | Prestación por desempleo | `dias_cotizados` | ⊘ `dimision`, ⊘ `extincion_mutuo_acuerdo` | `paro`, `desempleo`, `prestacion_por_desempleo` |
| `droit` | 🎁 | Otro derecho | — | — | `otro_derecho` |

#### 📚 Fuentes del derecho

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `estatuto_trabajadores` | 📕 | Estatuto de los Trabajadores | — | — | `estatuto`, `estatuto_de_los_trabajadores` |
| `reforma_laboral` | 🆕 | Reforma laboral de 2021 | — | — | — |
| `convenio_colectivo` | 📗 | Convenio colectivo | — | — | `convenio` |
| `lrjs` | 📘 | Ley reguladora de la jurisdicción social | — | — | — |
| `lprl` | 📙 | Ley de prevención de riesgos laborales | — | — | — |
| `lgss` | 📒 | Ley General de la Seguridad Social | — | — | — |
| `constitucion` | 🏛️ | Constitución española | — | — | — |
| `norme` | 📚 | Otra norma | — | — | `norma` |

### Derecho francés (etiquetas en francés)

El derecho por defecto. Las claves de tipos están en francés; la columna «También se acepta» da los alias, incluidos los ingleses. Para el derecho inglés, véase la versión inglesa de este documento.

#### 👥 Partes y actores

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `employeur` | 🏢 | Employeur | — | — | `entreprise`, `societe`, `employer`, `company` |
| `salarie` | 👤 | Salarié | `categorie`, `anciennete`, `salaire` | — | `salariee`, `employe`, `travailleur`, `employee`, `worker` |
| `cse` | 🗣️ | CSE | — | — | `works_council`, `social_and_economic_committee` |
| `inspection` | 🏛️ | Administration (DREETS) | — | — | `dreets`, `inspection_du_travail`, `administration`, `labour_inspectorate`, `labour_inspection`, `labour_administration` |
| `prudhommes` | ⚖️ | Conseil de prud'hommes | — | — | `cph`, `juge`, `employment_tribunal`, `labour_court`, `tribunal` |
| `medecin` | 🩺 | Médecin du travail | — | — | `occupational_doctor`, `occupational_physician` |
| `nouvel_employeur` | 🏭 | Nouvel employeur | — | — | `new_employer` |
| `france_travail` | 🏦 | France Travail | — | — | `pole_emploi`, `public_employment_service` |
| `partie` | 👥 | Autre acteur | — | — | — |

#### 📃 Contratos

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `cdi` | 📄 | CDI | — | — | `permanent`, `permanent_contract`, `open_ended_contract` |
| `cdd` | ⏳ | CDD | `duree` | `ecrit`, `motif_recours`, `terme` | `fixed_term`, `fixed_term_contract` |
| `interim` | 🔁 | Contrat de mission (intérim) | — | `ecrit`, `motif_recours` | `mission`, `ctt`, `agency_work`, `temporary_agency_contract`, `temp_contract` |
| `apprentissage` | 🎓 | Contrat d'apprentissage | — | — | `apprenticeship` |
| `contrat` | 📃 | Autre contrat | — | — | — |

#### 🧩 Cláusulas

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `remuneration` | 💶 | Rémunération | — | — | `pay`, `wage` |
| `fonctions` | 🧑‍💼 | Qualification / fonctions | — | — | `duties`, `job_title`, `role` |
| `duree_travail` | ⏱️ | Durée du travail | — | — | `working_time`, `working_hours` |
| `lieu_travail` | 📍 | Lieu de travail | — | — | `place_of_work`, `workplace`, `work_location` |
| `temps_partiel` | 🌓 | Temps partiel | — | `ecrit`, `repartition` | `part_time` |
| `periode_essai` | 🧪 | Période d'essai | `duree` | `ecrit` | `essai`, `periode_d_essai`, `probation`, `probationary_period`, `trial_period` |
| `renouvellement_essai` | 🔄 | Renouvellement de l'essai | `duree` | `accord_collectif`, `ecrit`, `accord_salarie` | `renouvellement`, `probation_renewal`, `renewal` |
| `non_concurrence` | 🚫 | Non-concurrence | — | `interet_legitime`, `limite_duree`, `limite_geo`, `specificites`, `contrepartie` | `nc`, `clause_de_non_concurrence`, `non_compete`, `non_competition`, `non_compete_clause`, `restrictive_covenant` |
| `non_sollicitation` | 🙅 | Non-sollicitation de clientèle | — | `interet_legitime`, `limite_duree`, `limite_geo`, `contrepartie` | `non_solicitation`, `non_solicit` |
| `mobilite` | 🧳 | Mobilité | — | `zone_definie`, `interet_legitime` (riesgo), `delai_prevenance` (riesgo) | `clause_de_mobilite`, `mobility`, `mobility_clause` |
| `exclusivite` | 🔒 | Exclusivité | — | `interet_legitime`, `proportionnalite` ; ⊘ `temps_partiel` | `clause_d_exclusivite`, `exclusivity`, `exclusivity_clause` |
| `dedit_formation` | 🎒 | Dédit-formation | — | `ecrit`, `formation_couteuse`, `proportionnalite` ; ⊘ `licenciement_personnel`/`licenciement_eco`/`licenciement_inaptitude`/`rupture_essai` | `dedit`, `clause_de_dedit_formation`, `training_repayment`, `training_clawback`, `clawback` |
| `confidentialite` | 🤐 | Confidentialité | — | — | `secret`, `confidentiality`, `nda` |
| `objectifs` | 🎯 | Clause d'objectifs | — | `objectifs_realistes` (riesgo) | `targets`, `objectives` |
| `remuneration_variable` | 📈 | Rémunération variable | — | `criteres_objectifs` | `variable_pay`, `bonus`, `commission` |
| `forfait_jours` | 📆 | Forfait en jours | — | `accord_collectif`, `convention_individuelle`, `autonomie`, `suivi_charge` | `forfait`, `forfait_annuel_en_jours`, `days_based`, `annual_days`, `days_based_agreement` |
| `astreinte` | 📟 | Astreinte | — | `contrepartie`, `delai_prevenance` (riesgo) | `on_call`, `standby` |
| `teletravail` | 🏠 | Télétravail | — | `accord_collectif` o `accord_salarie` (riesgo) | `remote_working`, `remote_work`, `telework` |
| `garantie_emploi` | 🛡️ | Garantie d'emploi | — | — | `job_security`, `employment_guarantee` |
| `propriete_intellectuelle` | 💡 | Inventions | — | — | `inventions`, `intellectual_property` |
| `parachute` | 🪂 | Indemnité contractuelle de rupture | — | — | `golden_parachute`, `contractual_severance` |
| `clause_resolutoire` | 💣 | Rupture automatique | — | ilícita por naturaleza | `automatic_termination` |
| `clause_vie_privee` | 💍 | Restriction de la vie privée | — | ilícita por naturaleza | `private_life` |
| `clause_discriminatoire` | 🚷 | Clause discriminatoire | — | ilícita por naturaleza | `discriminatory_clause` |
| `clause` | 🧩 | Autre clause | — | — | `custom_clause` |

#### 🔒 Salvaguardas y condiciones

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `contrepartie` | 💰 | Contrepartie financière | — | — | `contrepartie_financiere`, `compensation`, `financial_compensation`, `consideration` |
| `limite_duree` | ⌛ | Limite dans le temps | — | — | `duree_limitee`, `limite_temps`, `time_limit`, `duration_limit` |
| `limite_geo` | 🗺️ | Limite dans l'espace | — | — | `limite_geographique`, `limite_espace`, `geographical_limit`, `geographic_limit`, `area_limit` |
| `specificites` | 🧩 | Spécificités de l'emploi | — | — | `job_specifics` |
| `interet_legitime` | 🏰 | Intérêt légitime de l'entreprise | — | — | `interet`, `legitimate_interest` |
| `proportionnalite` | 📐 | Justifiée et proportionnée | — | — | `proportionality`, `proportionate` |
| `zone_definie` | 📌 | Zone géographique précise | — | — | `defined_area`, `defined_zone` |
| `delai_prevenance` | 📢 | Délai de prévenance | — | — | `advance_notice`, `prior_notice` |
| `accord_salarie` | 🙋 | Accord exprès du salarié | — | — | `employee_consent`, `express_consent` |
| `formation_couteuse` | 🧾 | Frais au-delà des obligations | — | — | `costly_training` |
| `objectifs_realistes` | ✅ | Objectifs réalistes et connus | — | — | `realistic_targets` |
| `criteres_objectifs` | 📏 | Critères objectifs | — | — | `objective_criteria` |
| `ecrit` | ✍️ | Écrit | — | — | `writing`, `written`, `in_writing` |
| `motif_recours` | 📝 | Motif de recours précis | — | — | `reason_for_use`, `permitted_reason` |
| `terme` | 📅 | Terme précis | — | — | `end_date`, `fixed_end_date` |
| `repartition` | 🗓️ | Durée et répartition | — | — | `distribution_of_hours`, `schedule` |
| `accord_collectif` | 📜 | Accord collectif | — | — | `collective_agreement` |
| `convention_individuelle` | 🖋️ | Convention individuelle écrite | — | — | `individual_agreement` |
| `autonomie` | 🧭 | Autonomie du salarié | — | — | `autonomy` |
| `suivi_charge` | 📊 | Suivi de la charge | — | — | `workload_monitoring` |
| `cause_reelle` | 🎯 | Cause réelle et sérieuse | — | — | `cause_reelle_et_serieuse`, `crs`, `real_and_serious_cause`, `genuine_cause`, `just_cause` |
| `motif_eco` | 📉 | Motif économique | — | — | `economic_reason`, `economic_grounds` |
| `volonte_claire` | 🧠 | Volonté claire et non équivoque | — | — | `clear_intent`, `unequivocal_intent` |
| `consentement_libre` | 🕊️ | Consentement libre | — | — | `free_consent` |
| `manquement_suffisant` | 🚨 | Manquement grave de l'employeur | — | — | `serious_breach` |
| `motif_rupture_cdd` | 🗝️ | Cas de rupture anticipée autorisé | — | — | `early_termination_ground` |
| `condition` | ☑️ | Autre condition | — | — | `autre_condition` |

#### 📌 Obligaciones

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `fournir_travail` | 🧰 | Fournir le travail convenu | — | — | `provide_work` |
| `payer_salaire` | 💳 | Payer le salaire | — | — | `pay_salary`, `pay_wages` |
| `securite` | 🦺 | Obligation de sécurité | — | — | `safety`, `duty_of_safety`, `health_and_safety` |
| `adaptation` | 🧑‍🏫 | Adaptation et employabilité | — | — | `employability` |
| `non_discrimination` | 🟰 | Égalité, non-discrimination | — | — | `equal_treatment`, `equality` |
| `respect_libertes` | 🗽 | Respect des libertés | — | — | `respect_for_freedoms` |
| `bonne_foi` | 🤲 | Exécution de bonne foi | — | — | `good_faith` |
| `executer_travail` | 🛠️ | Exécuter le travail | — | — | `perform_work` |
| `obeissance` | 📋 | Respecter les directives | — | — | `obedience`, `follow_instructions` |
| `loyaute` | ⚓ | Loyauté | — | — | `loyalty` |
| `discretion` | 🔇 | Discrétion | — | — | — |
| `securite_salarie` | ⛑️ | Veiller à la sécurité | — | — | `employee_safety` |
| `obligation` | 📌 | Autre obligation | — | — | `custom_obligation` |

#### ⚡ Faltas e incumplimientos

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `manquement` | ⚡ | Manquement | — | — | `faute`, `failure`, `default` |
| `faute_simple` | 🟠 | Faute sérieuse | — | — | `faute_serieuse`, `misconduct`, `simple_misconduct` |
| `faute_grave` | 🔥 | Faute grave | — | — | `gross_misconduct` |
| `faute_lourde` | ☠️ | Faute lourde | — | — | `wilful_misconduct`, `willful_misconduct` |
| `harcelement` | 🛑 | Harcèlement | — | — | `harassment`, `bullying` |
| `insuffisance` | 📉 | Insuffisance professionnelle | — | — | `poor_performance`, `underperformance`, `incompetence` |

#### 💔 Extinción del contrato

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `demission` | 🚪 | Démission | — | `volonte_claire` | `resignation` |
| `licenciement_personnel` | 📤 | Licenciement pour motif personnel | — | `cause_reelle` o `faute_simple` o `faute_grave` o `faute_lourde` o `insuffisance`, `convocation` (riesgo), `entretien_prealable` (riesgo), `notification` ; ⊘ `garantie_emploi` | `licenciement`, `licenciement_disciplinaire`, `licenciement_pour_motif_personnel`, `dismissal`, `personal_dismissal` |
| `licenciement_eco` | 🏚️ | Licenciement économique | — | `motif_eco`, `reclassement`, `consultation_cse` (riesgo), `convocation` (riesgo), `notification` ; ⊘ `garantie_emploi` | `licenciement_economique`, `redundancy`, `economic_dismissal` |
| `licenciement_inaptitude` | 🏥 | Licenciement pour inaptitude | — | `avis_inaptitude`, `reclassement`, `notification` | `unfitness_dismissal`, `incapacity_dismissal` |
| `rupture_conventionnelle` | 🤝 | Rupture conventionnelle | — | `entretien_rc`, `convention_rc`, `retractation`, `homologation`, `consentement_libre` | `rc`, `mutual_termination`, `mutual_agreement` |
| `fin_cdd` | ⏹️ | Arrivée du terme du CDD | — | — | `end_of_fixed_term`, `expiry` |
| `rupture_anticipee_cdd` | ✂️ | Rupture anticipée du CDD | — | `motif_rupture_cdd` o `faute_grave` o `faute_lourde` | `early_termination` |
| `rupture_essai` | 🚦 | Rupture de la période d'essai | — | `periode_essai`, `delai_prevenance` (riesgo) | `rupture_periode_essai`, `rupture_de_la_periode_d_essai`, `probation_termination`, `end_of_probation` |
| `prise_acte` | 🚩 | Prise d'acte | — | `manquement_suffisant` o `harcelement` | `prise_d_acte`, `constructive_dismissal` |
| `resiliation_judiciaire` | 🔨 | Résiliation judiciaire | — | `manquement_suffisant` o `harcelement` | `judicial_termination`, `judicial_rescission` |
| `abandon_poste` | 🏃 | Abandon de poste | — | `mise_en_demeure` | `job_abandonment`, `abandonment` |
| `depart_retraite` | 👴 | Départ à la retraite | — | — | `retirement` |
| `rupture` | 💔 | Autre rupture | — | — | — |

#### 🔹 Procedimiento

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `convocation` | ✉️ | Convocation | — | — | `invitation`, `invitation_letter`, `summons` |
| `entretien_prealable` | 💬 | Entretien préalable | — | — | `preliminary_meeting`, `pre_dismissal_meeting` |
| `notification` | 📨 | Lettre de licenciement | — | — | `dismissal_letter` |
| `mise_a_pied` | ⏸️ | Mise à pied conservatoire | — | — | `suspension`, `precautionary_suspension` |
| `sanction` | 🟥 | Sanction disciplinaire | — | — | `disciplinary_sanction`, `warning` |
| `preavis` | 🔔 | Préavis | — | ⊘ `faute_grave`/`faute_lourde` | `notice` |
| `entretien_rc` | 🗨️ | Entretien de rupture conventionnelle | — | — | `termination_meeting` |
| `convention_rc` | 📑 | Signature de la convention | — | — | `termination_agreement` |
| `retractation` | ↩️ | Délai de rétractation | — | — | `withdrawal`, `cooling_off` |
| `homologation` | 🔏 | Homologation | — | — | `approval` |
| `mise_en_demeure` | 📬 | Mise en demeure | — | — | `formal_notice` |
| `reclassement` | 🔎 | Recherche de reclassement | — | — | `redeployment`, `alternative_employment` |
| `consultation_cse` | 📣 | Consultation du CSE | — | — | `cse_consultation`, `works_council_consultation` |
| `avis_inaptitude` | 📋 | Avis d'inaptitude | — | — | `unfitness_opinion` |
| `documents_fin` | 🗂️ | Documents de fin de contrat | — | — | `documents`, `end_of_contract_documents`, `leaving_documents` |
| `etape` | 🔹 | Autre étape | — | — | — |

#### 🎁 Indemnizaciones y derechos

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `indemnite_licenciement` | 💵 | Indemnité de licenciement | — | ⊘ `faute_grave`/`faute_lourde` | `indemnite_legale`, `severance`, `severance_pay`, `statutory_severance` |
| `indemnite_preavis` | 💴 | Indemnité compensatrice de préavis | — | ⊘ `faute_grave`/`faute_lourde` | `pay_in_lieu_of_notice`, `payment_in_lieu` |
| `indemnite_conges` | 🏖️ | Indemnité de congés payés | — | — | `holiday_pay`, `paid_leave` |
| `indemnite_precarite` | 💷 | Indemnité de fin de CDD | — | ⊘ `faute_grave`/`faute_lourde`, ⊘ `cdi` | `prime_de_precarite`, `precarite`, `indemnite_fin_cdd`, `end_of_cdd_payment`, `precariousness_bonus` |
| `indemnite_rc` | 💸 | Indemnité de rupture conventionnelle | — | — | `mutual_termination_payment` |
| `chomage` | ☂️ | Allocation chômage (ARE) | — | ⊘ `demission`, ⊘ `abandon_poste` | `are`, `unemployment_benefit`, `unemployment` |
| `dommages_interets` | 🩹 | Dommages-intérêts | — | — | `damages` |
| `droit` | 🎁 | Autre droit | — | — | — |

#### 📚 Fuentes del derecho

| Tipo | Icono | Etiqueta | Datos (`clave=valor`) | Condiciones verificadas (salvaguardas) | También se acepta |
|---|---|---|---|---|---|
| `code_travail` | 📕 | Code du travail | — | — | `labour_code` |
| `convention_collective` | 📗 | Convention de branche | — | — | `sector_agreement`, `branch_agreement` |
| `accord_entreprise` | 📘 | Accord d'entreprise | — | — | `company_agreement` |
| `reglement_interieur` | 📙 | Règlement intérieur | — | — | `internal_rules`, `work_rules` |
| `usage` | 🔂 | Usage d'entreprise | — | — | `company_custom`, `custom` |
| `norme` | 📚 | Autre norme | — | — | — |

## Consejos de redacción

- De 5 a 9 pasos; cada paso añade una sola idea (una cláusula y sus salvaguardas, un trámite del procedimiento, una falta…).
- Muestre primero la cláusula **sola** (⛔, pastillas punteadas) y añada después sus salvaguardas una a una: la tarjeta se pone verde ante la clase.
- Para una extinción, ponga la extinción, después su cadena de procedimiento (`luego` con los plazos como etiqueta) y después los derechos a los que da lugar (`da_derecho`).
- Ponga las cifras en el trabajador (`antiguedad`, `salario`, `categoria`): los cálculos las encuentran. Dé el cálculo en el texto («200 días × 100 € = 20.000 €»): la herramienta muestra las mismas cifras.
- Use `focus` y `nota` para guiar la mirada; un bocadillo debe ser breve (unos 60 caracteres).
- Cuando la herramienta no sabe representar una regla (apreciación de los hechos por el juez, mejoras del convenio, fechas reales…), use `condicion` o `estado` con un texto y explíquelo en el comentario.
- Derecho español: cite los artículos (ET, LRJS, LGSS) e indique el año de las cifras que cambian (SMI…).
