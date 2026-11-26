# Instrucciones para una IA: crear un escenario de Contract Lab

> Página destinada a los asistentes de IA (ChatGPT, Claude, Gemini, Mistral, Copilot…). Docente: dé la dirección de esta página a su IA, junto con su material de clase.
> Taller: https://edu-fpar.github.io/contract-lab/es/ · Documentación: https://edu-fpar.github.io/contract-lab/docs/#/es/
> Curso de derecho inglés (England & Wales): use la versión inglesa, https://edu-fpar.github.io/contract-lab/docs/en/instructions-ia.md

## Tu misión

El docente te facilita un material de clase de derecho del trabajo o de recursos humanos (texto, PDF, diapositivas, apuntes, caso práctico). Tú produces un **escenario en markdown** que el taller Contract Lab reproducirá en modo «cine»: en cada paso se muestra un comentario y unos comandos construyen un esquema — un contrato y sus cláusulas, las salvaguardas que las condicionan, las obligaciones de las partes, una extinción y su procedimiento, las indemnizaciones — que la herramienta verifica (✅ válido, ⚠️ en riesgo, ⛔ nulo, improcedente o irregular, ⚡ obligación incumplida).

1. **Elige el derecho.** Para un curso de **derecho español** — Estatuto de los Trabajadores, contratos tras la reforma de 2021, periodo de prueba, pactos del art. 21 ET, despido disciplinario u objetivo, improcedencia y nulidad, extinción del art. 50… — empieza el archivo con el encabezado `droit: es` (tres líneas: `---`, `droit: es`, `---`) y usa las claves de tipos españolas del catálogo (anexo 1). Para un curso de **derecho francés**, no escribas encabezado y usa las claves francesas (también en el anexo 1). No mezcles dos derechos en un escenario; para una comparación, menciona el otro derecho en el comentario.
2. **Elige lo que se puede representar.** Quédate con las nociones que se traducen en elementos unidos: cláusulas y sus salvaguardas (condiciones acumulativas de validez), formalidades del contrato (forma escrita, causa temporal precisa), incompatibilidades (funciones previas y periodo de prueba, dimisión y prestación por desempleo, contrato de sustitución e indemnización de 12 días…), obligaciones e incumplimientos, extinciones y procedimientos, indemnizaciones y cálculos (duración máxima de la prueba y de los pactos, regla de los 18 meses en 24, SMI, 20 días por año con tope de 12 mensualidades, 33 días con tope de 24, 12 días por fin de contrato, prescripción de las faltas, caducidad de 20 días hábiles, prestación por desempleo). Lo que la herramienta no sabe juzgar (apreciación de los hechos por el juez, mejoras del convenio colectivo, régimen transitorio de los 45 días, fechas reales…) va en el comentario, en un bocadillo (`nota`) o en un veredicto impuesto (`estado`), nunca como una falsa salvaguarda que pondría una tarjeta en verde. Si lo esencial del material no se puede representar, díselo al docente en lugar de forzarlo.
3. **Construye la progresión.** De 5 a 9 pasos, una idea por paso, de lo simple a lo complejo: muestra primero una cláusula sola (⛔, salvaguardas que faltan) y añade después sus salvaguardas una a una; para una extinción, la extinción, luego su procedimiento, luego los derechos a los que da lugar. Retoma los ejemplos, nombres y cifras del material. Añade uno o dos **pasos pregunta** justo antes del paso que explicaría la noción, con opciones erróneas verosímiles y una explicación para cada opción. Cada pregunta empieza por `verificacion off` (si no, los veredictos en pantalla dan la respuesta) y su sección «### Respuesta» restablece `verificacion on`.
4. **Escribe el escenario** respetando exactamente el formato descrito más abajo. Declara cada elemento antes de unirlo; une cada salvaguarda con la cláusula que condiciona; pon `antiguedad`, `salario` (bruto mensual con prorrata de pagas extra) y `categoria` en el trabajador, y `plantilla` en la empresa. Da los cálculos en el texto («100 días × 60 € = 6.000 €»): la herramienta mostrará las mismas cifras.
5. **Comprueba que los veredictos anunciados corresponden a las reglas** del anexo 2: una condición se cumple si un elemento del tipo esperado está unido directamente, en la misma cadena «luego» o unido al contrato que contiene la cláusula; las incompatibilidades se aplican en todo el expediente (elementos unidos entre sí, sin pasar por las partes ni por las normas); una obligación unida a un incumplimiento queda incumplida; una causa de nulidad (embarazo, vulneración de derechos fundamentales) prevalece sobre la improcedencia; un veredicto impuesto con `estado` sigue visible incluso con `verificacion off`. Si la herramienta fuera a mostrar otra cosa que tu texto, corrige el texto o los datos.
6. **Sé exacto jurídicamente.** Cita un artículo (ET, LRJS, LGSS) o una sentencia solo si figura en el material o si estás seguro; si no, describe la regla sin número. No des duraciones, plazos ni importes sin comprobar. Las cifras anuales (SMI) cambian cada año: indica el año de las que usas. Señala las simplificaciones en una cita «> ⚠️».

## Tu respuesta

- **Un único bloque de código** con el escenario completo (primero el encabezado `droit: es` para el derecho español, después «# Título»). Como el escenario contiene a su vez bloques ```scene, rodéalo con un bloque de cuatro acentos graves (````markdown … ````), o escribe los bloques de comandos con ~~~scene.
- Después, fuera del bloque, unas líneas para el docente: el plan de los pasos y lo que debe revisar (referencias añadidas por ti, simplificaciones, veredictos impuestos, nociones dejadas de lado).
- Recuérdale cómo usarlo: taller Contract Lab → 🎬 Cine → 📚 Escenarios → pegar el markdown → Iniciar. El botón 🔗 Compartir da después un enlace para los estudiantes.

---

# Anexo 1 — Formato de los escenarios (modo «cine»)

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


---

# Anexo 2 — Reglas de verificación (derecho español)

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


---

# Anexo 3 — Ejemplo completo

Un escenario real del taller (pactos de no competencia, plena dedicación y permanencia, derecho español), con pasos pregunta precedidos de `verificacion off`:

````markdown
---
droit: es
---
# Pactos de no competencia, plena dedicación y permanencia
> Los pactos del art. 21 ET: interés efectivo, compensación adecuada y duraciones máximas.

El art. 21 ET permite limitar la libertad de trabajo de tres maneras: **no competencia** después del contrato, **plena dedicación** durante el contrato y **permanencia** tras una formación costeada por la empresa. Cada pacto tiene sus garantías.

## 1. El pacto de Carmen
**Carmen Vidal** es delegada comercial técnica de **Farmalia Distribución SA**. Su contrato le prohíbe trabajar para la competencia durante **2 años** tras la extinción.

Tal como está redactado, el pacto no tiene ninguna garantía: ⛔ nulo.

```scene
empresa EMP "Farmalia Distribución SA" plantilla=220
trabajador CAR "Carmen Vidal" antiguedad=5 salario=3200 categoria=tecnico
contrato_indefinido CT "Contrato de Carmen"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP CAR -> CT
pacto_no_competencia NC "No competencia (2 años)" duracion=24
CT -> NC
focus NC
note NC "Faltan las dos garantías"
```
## 2. Un interés industrial o comercial efectivo
Farmalia no puede impedir la competencia en sí misma. Puede proteger un **interés efectivo**: Carmen conoce la cartera de farmacias, los precios pactados y el lanzamiento de dos productos.

```scene
interes_efectivo IE "Cartera de clientes y precios"
IE -> NC
focus IE NC
```
## Pregunta: ¿qué más necesita el pacto para ser válido?
Una insignia está en verde. El pacto sigue siendo nulo.

```scene
verification off
focus NC
```
- [ ] Que el pacto se limite a la provincia
  El art. 21.2 ET no exige un límite geográfico, aunque ayuda a valorar la compensación.
- [x] Una compensación económica adecuada
  Es la segunda condición del art. 21.2 ET.
- [ ] La autorización de la Inspección de Trabajo
  No se necesita ninguna autorización.

### Respuesta
El pacto de no competencia postcontractual exige un **interés industrial o comercial efectivo** y una **compensación económica adecuada** (art. 21.2 ET). Farmalia pagará a Carmen el 40 % de su salario durante los dos años.

La duración también cuenta: **2 años** como máximo para los **técnicos**, como Carmen.

```scene
verification on
compensacion_economica COMP "40 % del salario durante 2 años"
COMP -> NC
focus NC COMP
```
## 4. El mismo pacto para un administrativo
Farmalia copia la cláusula en el contrato de **Pablo**, administrativo, con 12 meses de duración, interés y compensación. Pero para los trabajadores que no son técnicos, el máximo es de **6 meses**.

```scene
trabajador PAB "Pablo" antiguedad=2 salario=1900 categoria=otro
contrato_indefinido CT2 "Contrato de Pablo"
informacion_elementos INF2 "Contrato escrito"
INF2 -> CT2
EMP PAB -> CT2
pacto_no_competencia NC2 "No competencia (12 meses)" duracion=12
CT2 -> NC2
interes_efectivo IE2 "Datos de clientes"
compensacion_economica COMP2 "Compensación mensual"
IE2 COMP2 -> NC2
focus NC2
```
## 5. La plena dedicación
Durante el contrato, Carmen no puede concurrir con Farmalia (art. 21.1 ET), pero sí trabajar para otros. Farmalia quiere **exclusividad total**: es un pacto de **plena dedicación**, que exige una **compensación económica expresa**.

Carmen podrá rescindirlo y recuperar su libertad con 30 días de preaviso, perdiendo el plus (art. 21.3 ET).

```scene
retirar PAB CT2 INF2 NC2 IE2 COMP2
pacto_plena_dedicacion PD "Plena dedicación"
CT -> PD
compensacion_economica PLUS "Plus de exclusividad: 300 € al mes"
PLUS -> PD
focus PD
```
## Pregunta: Farmalia paga a Carmen un máster y le pide 3 años de permanencia. ¿Es válido?
El máster en regulación farmacéutica cuesta 12.000 €, lo paga Farmalia y el pacto es escrito.

```scene
verification off
pacto_permanencia PERM "Permanencia de 3 años" duracion=36
especializacion_costeada MAST "Máster pagado por Farmalia"
forma_escrita ESC "Pacto escrito"
MAST ESC -> PERM
CT -> PERM
focus PERM
```
- [ ] Sí: la empresa pagó la formación
  La especialización es necesaria, pero no basta.
- [x] No más allá de 2 años
  El pacto de permanencia no puede durar más de 2 años (art. 21.4 ET).
- [ ] No: los pactos de permanencia están prohibidos
  Están permitidos tras una especialización costeada por la empresa.

### Respuesta
El pacto de permanencia exige una **especialización profesional costeada por la empresa**, la **forma escrita** y una duración de **2 años como máximo** (art. 21.4 ET). Se reduce a 24 meses.

```scene
verification on
param PERM duracion=24
renombrar PERM "Permanencia de 2 años"
focus PERM
```
## 7. Si la empresa despide a Carmen
Si Farmalia despide a Carmen por causas objetivas, el pacto de permanencia **no se aplica**: castiga el abandono voluntario, no la decisión de la empresa. El símbolo ⊘ lo muestra.

```scene
despido_objetivo DO "Despido objetivo"
EMP -> DO
DO -> CT
causas_etop CE "Reorganización comercial"
carta_despido CARTA "Carta"
puesta_disposicion PDI "Indemnización a disposición"
preaviso PRV "15 días" dias=15
CE -> DO
DO -> CARTA
CARTA -> PDI
PDI -> PRV
focus DO PERM
```
## 8. Resumen
| Pacto | Condiciones | Duración máxima |
|---|---|---|
| 🚫 No competencia | interés efectivo + compensación adecuada | 2 años técnicos, 6 meses los demás |
| 🔒 Plena dedicación | compensación expresa | rescindible con 30 días de preaviso |
| ⚓ Permanencia | especialización costeada + escrito | 2 años |

```scene
retirar DO CE CARTA PDI PRV
selection NC
```
````
