/* ============================================================
 * Escenarios de derecho del trabajo español, en español.
 * Posición: derecho vigente a 26 de noviembre de 2026 (Estatuto de los
 * Trabajadores tras el RDL 32/2021). SMI 2026 ⚠️ a verificar.
 * Bloques en ~~~scene (sin acentos graves en las cadenas JS).
 * ============================================================ */
window.P = window.P || {};
P.LIBRARY = P.LIBRARY || [];
P.LIBRARY.push(

{ id: 'es-construir-contrato', lang: 'es', md: `---
droit: es
---
# Construir un contrato de trabajo
> Partes, contrato indefinido, información escrita, salario mínimo, jornada y obligaciones básicas.

Construimos el contrato de **Lucía Martín**, contratada como analista de datos por **Datalia Soluciones SL** (40 trabajadores). Cada elemento es una tarjeta; el marco «📄» muestra lo que contiene el contrato.

Los veredictos aparecen en las tarjetas: ✅ válido, ⚠️ con riesgo, ⛔ nulo o irregular. Las **insignias** bajo una tarjeta son sus condiciones.

## 1. Las partes
Lucía presta servicios retribuidos **por cuenta ajena**, dentro del ámbito de organización y dirección de la empresa (art. 1.1 ET): voluntariedad, ajenidad, dependencia y retribución. Es **trabajadora**; Datalia es la **empresa**.

~~~scene
empresa EMP "Datalia Soluciones SL" plantilla=40
trabajador LUC "Lucía Martín" antiguedad=0 salario=2100 categoria=tecnico_titulado
focus EMP LUC
~~~

## 2. Un contrato indefinido
Desde la reforma laboral de 2021, el contrato **se presume concertado por tiempo indefinido** (art. 15.1 ET). A jornada completa puede incluso celebrarse de palabra.

Pero si la relación dura más de cuatro semanas, la empresa debe **informar por escrito** de los elementos esenciales del contrato (art. 8.5 ET): la tarjeta está en naranja.

~~~scene
contrato_indefinido CT "Contrato de Lucía"
EMP LUC -> CT
focus CT
note CT "Sin información escrita"
~~~

## 3. Información escrita y contenido básico
Datalia entrega a Lucía el contrato escrito con sus elementos esenciales: la tarjeta pasa a verde.

| Elemento | Aquí |
|---|---|
| 💶 Salario | 2100 € brutos al mes, pagas prorrateadas (25.200 € al año) |
| ⏱️ Jornada | 40 horas semanales |
| 🏖️ Vacaciones | 30 días naturales |

La tarjeta del salario compara con el **salario mínimo interprofesional**: 1221 € al mes en 14 pagas, es decir 17.094 € al año.

> ⚠️ El SMI se fija cada año por real decreto: compruebe la cifra de 2026.

~~~scene
informacion_elementos INF "Contrato escrito con los elementos esenciales"
INF -> CT
salario SAL "2100 € al mes"
jornada JOR "40 horas semanales" horas_semanales=40
vacaciones VAC "30 días naturales" dias=30
CT -> SAL JOR VAC
focus INF SAL
~~~

## 4. El registro de jornada
La jornada respeta el máximo legal de **40 horas semanales de promedio** en cómputo anual (art. 34.1 ET). Pero la tarjeta está en naranja: la empresa debe **registrar diariamente** la hora de inicio y de fin de cada jornada y conservar el registro cuatro años (art. 34.9 ET).

Datalia instala un sistema de fichaje: la jornada pasa a verde.

~~~scene
registro_jornada REG "Fichaje diario"
EMP -> REG
REG -> JOR
focus JOR REG
~~~

## Pregunta: ¿puede Datalia pagar 1300 € al mes, en 12 pagas, a un auxiliar a jornada completa?
Datalia contrata también a **Óscar**, auxiliar administrativo a jornada completa, por 1300 € brutos al mes en 12 pagas, sin pagas extraordinarias.

~~~scene
verification off
trabajador OSC "Óscar" antiguedad=0
contrato_indefinido CT2 "Contrato de Óscar"
informacion_elementos INF2 "Contrato escrito"
INF2 -> CT2
EMP OSC -> CT2
salario SAL2 "1300 € × 12" salario=1300
CT2 -> SAL2
focus SAL2
~~~

- [ ] Sí: 1300 € superan los 1221 € del SMI
  El SMI de 1221 € se cobra en 14 pagas: hay que comparar en cómputo anual.
- [x] No: 15.600 € al año no alcanzan los 17.094 € del SMI
  1300 × 12 = 15.600 €, por debajo de 1221 × 14 = 17.094 €.
- [ ] Sí, si el convenio lo permite
  El convenio puede mejorar el SMI, nunca rebajarlo.

### Respuesta
El SMI se garantiza **en cómputo anual**: 1221 € × 14 pagas = **17.094 €**. Óscar cobra 1300 € × 12 = **15.600 €**: la empresa le debe las diferencias (art. 27 ET).

~~~scene
verification on
focus SAL2
note SAL2 "15.600 € < 17.094 €"
~~~

## 6. Las obligaciones básicas
El contrato crea obligaciones recíprocas (arts. 4, 5 y 20 ET):

- **empresa**: pagar puntualmente el salario, dar ocupación efectiva, proteger la seguridad y la salud (Ley 31/1995);
- **ambas partes**: la **buena fe** (art. 20.2 ET);
- **trabajadora**: diligencia y cumplimiento de las órdenes dadas en el ejercicio regular del poder de dirección.

~~~scene
retirar OSC CT2 INF2 SAL2
pagar_salario PS "Pagar el salario"
ocupacion_efectiva OE "Ocupación efectiva"
seguridad_salud SS "Seguridad y salud"
buena_fe BF "Buena fe"
diligencia DIL "Diligencia"
obediencia OB "Cumplir las órdenes"
EMP -> PS OE SS BF
LUC -> BF DIL OB
focus BF
~~~

## 7. Resumen
- El contrato **se presume indefinido**; la **información escrita** es obligatoria si dura más de cuatro semanas.
- El salario no puede bajar del **SMI en cómputo anual** ni de las tablas del convenio.
- Jornada máxima de **40 horas** de promedio, con **registro diario**.
- La **buena fe** rige la ejecución del contrato para ambas partes.

~~~scene
selection SAL
~~~
` },

{ id: 'es-periodo-prueba', lang: 'es', md: `---
droit: es
---
# El periodo de prueba
> Pacto escrito, duraciones máximas del art. 14 ET y desistimiento.

El periodo de prueba permite a ambas partes comprobar si la relación funciona. Durante la prueba, cualquiera de ellas puede **desistir** sin causa, sin preaviso y sin indemnización, salvo pacto (art. 14.2 ET). Por eso la ley lo encuadra.

## 1. Javier entra en el almacén
**Javier Ruiz** es contratado como mozo de almacén por **Logística Ebro SL**, una empresa de **18 trabajadores**, con un contrato indefinido escrito y 1500 € al mes.

~~~scene
empresa EMP "Logística Ebro SL" plantilla=18
trabajador JAV "Javier Ruiz" antiguedad=0 salario=1500 categoria=otro
contrato_indefinido CT "Contrato de Javier"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP JAV -> CT
focus JAV CT
~~~

## 2. Una prueba de palabra
El encargado le dice a Javier que estará «seis meses a prueba». Nada consta por escrito.

El periodo de prueba **debe pactarse por escrito** (art. 14.1 ET): sin pacto escrito, no hay periodo de prueba.

~~~scene
periodo_prueba PRU "Prueba de 6 meses" duracion=6
CT -> PRU
focus PRU
note PRU "Pactada solo de palabra"
~~~

## 3. Por escrito… pero demasiado larga
La empresa añade la cláusula al contrato. La insignia «Por escrito» pasa a verde, pero la tarjeta sigue en rojo: la duración supera el máximo legal.

~~~scene
forma_escrita ESC "Cláusula escrita"
ESC -> PRU
focus PRU
~~~

## Pregunta: ¿cuál es la duración máxima del periodo de prueba de Javier?
El convenio colectivo no dice nada. Javier no es técnico titulado y la empresa tiene 18 trabajadores.

~~~scene
verification off
focus PRU
~~~

- [ ] 2 meses
  Es el máximo general, pero hay una regla para las empresas pequeñas.
- [x] 3 meses
  En empresas de menos de 25 trabajadores, los trabajadores que no son técnicos titulados pueden tener hasta 3 meses.
- [ ] 6 meses
  Solo para los técnicos titulados.

### Respuesta
A falta de convenio, el art. 14.1 ET fija **6 meses** para los técnicos titulados y **2 meses** para los demás trabajadores, **3 meses** en las empresas de **menos de 25 trabajadores**. Lo pactado de más es nulo: la prueba de Javier queda en **3 meses**.

~~~scene
verification on
param PRU duracion=3
renombrar PRU "Prueba de 3 meses"
focus PRU
~~~

## 5. La empresa desiste al segundo mes
Al cabo de **dos meses**, Logística Ebro comunica a Javier que no supera la prueba. Es un **desistimiento**: sin causa, sin preaviso y sin indemnización. Javier cobra su finiquito (salario pendiente, parte de las pagas, vacaciones).

~~~scene
param JAV antiguedad=0.17
desistimiento_prueba DES "No supera la prueba"
EMP -> DES
DES -> CT
finiquito FIN "Finiquito"
DES -> FIN
focus DES
~~~

## Pregunta: ¿y si la empresa «desiste» al cuarto mes?
Imagine que la carta llega **cuatro meses** después del inicio.

~~~scene
verification off
param JAV antiguedad=0.34
focus DES
~~~

- [ ] Sigue siendo un desistimiento válido
  El periodo de prueba de Javier terminó al tercer mes.
- [x] Es un despido: el periodo de prueba ya había terminado
  Pasado el plazo, la empresa necesita una causa y un procedimiento.
- [ ] Javier debe indemnizar a la empresa
  Nada de eso: es la empresa la que extingue el contrato.

### Respuesta
Superado el periodo de prueba, el contrato despliega todos sus efectos. Una extinción sin causa ni carta es un **despido improcedente** (33 días por año): la tarjeta pasa a rojo.

~~~scene
verification on
note DES "Fuera de plazo: es un despido"
~~~

## 7. Una trabajadora embarazada
Volvemos al segundo mes, pero ahora con **Marta**, compañera de Javier, embarazada. La resolución del periodo de prueba **por razón de embarazo es nula**, salvo que la empresa acredite motivos ajenos al embarazo (art. 14.2 ET).

La tarjeta pasa a naranja: la empresa deberá probar que su decisión no tiene nada que ver con el embarazo.

~~~scene
param JAV antiguedad=0.17
renombrar JAV "Marta"
embarazo EMB "Marta está embarazada"
EMB -> DES
focus DES EMB
~~~

## 8. Resumen
| Regla | Fuente |
|---|---|
| Pacto **por escrito** | art. 14.1 ET |
| Máximo: 6 meses técnicos titulados, 2 meses los demás (3 si menos de 25 trabajadores) | art. 14.1 ET, salvo convenio |
| Nulo si ya desempeñó **las mismas funciones** en la empresa | art. 14.1 ET |
| Desistimiento libre, sin preaviso ni indemnización | art. 14.2 ET |
| Nulo por razón de **embarazo** | art. 14.2 ET |

~~~scene
selection PRU
~~~
` },

{ id: 'es-no-competencia', lang: 'es', md: `---
droit: es
---
# Pactos de no competencia, plena dedicación y permanencia
> Los pactos del art. 21 ET: interés efectivo, compensación adecuada y duraciones máximas.

El art. 21 ET permite limitar la libertad de trabajo de tres maneras: **no competencia** después del contrato, **plena dedicación** durante el contrato y **permanencia** tras una formación costeada por la empresa. Cada pacto tiene sus garantías.

## 1. El pacto de Carmen
**Carmen Vidal** es delegada comercial técnica de **Farmalia Distribución SA**. Su contrato le prohíbe trabajar para la competencia durante **2 años** tras la extinción.

Tal como está redactado, el pacto no tiene ninguna garantía: ⛔ nulo.

~~~scene
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
~~~

## 2. Un interés industrial o comercial efectivo
Farmalia no puede impedir la competencia en sí misma. Puede proteger un **interés efectivo**: Carmen conoce la cartera de farmacias, los precios pactados y el lanzamiento de dos productos.

~~~scene
interes_efectivo IE "Cartera de clientes y precios"
IE -> NC
focus IE NC
~~~

## Pregunta: ¿qué más necesita el pacto para ser válido?
Una insignia está en verde. El pacto sigue siendo nulo.

~~~scene
verification off
focus NC
~~~

- [ ] Que el pacto se limite a la provincia
  El art. 21.2 ET no exige un límite geográfico, aunque ayuda a valorar la compensación.
- [x] Una compensación económica adecuada
  Es la segunda condición del art. 21.2 ET.
- [ ] La autorización de la Inspección de Trabajo
  No se necesita ninguna autorización.

### Respuesta
El pacto de no competencia postcontractual exige un **interés industrial o comercial efectivo** y una **compensación económica adecuada** (art. 21.2 ET). Farmalia pagará a Carmen el 40 % de su salario durante los dos años.

La duración también cuenta: **2 años** como máximo para los **técnicos**, como Carmen.

~~~scene
verification on
compensacion_economica COMP "40 % del salario durante 2 años"
COMP -> NC
focus NC COMP
~~~

## 4. El mismo pacto para un administrativo
Farmalia copia la cláusula en el contrato de **Pablo**, administrativo, con 12 meses de duración, interés y compensación. Pero para los trabajadores que no son técnicos, el máximo es de **6 meses**.

~~~scene
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
~~~

## 5. La plena dedicación
Durante el contrato, Carmen no puede concurrir con Farmalia (art. 21.1 ET), pero sí trabajar para otros. Farmalia quiere **exclusividad total**: es un pacto de **plena dedicación**, que exige una **compensación económica expresa**.

Carmen podrá rescindirlo y recuperar su libertad con 30 días de preaviso, perdiendo el plus (art. 21.3 ET).

~~~scene
retirar PAB CT2 INF2 NC2 IE2 COMP2
pacto_plena_dedicacion PD "Plena dedicación"
CT -> PD
compensacion_economica PLUS "Plus de exclusividad: 300 € al mes"
PLUS -> PD
focus PD
~~~

## Pregunta: Farmalia paga a Carmen un máster y le pide 3 años de permanencia. ¿Es válido?
El máster en regulación farmacéutica cuesta 12.000 €, lo paga Farmalia y el pacto es escrito.

~~~scene
verification off
pacto_permanencia PERM "Permanencia de 3 años" duracion=36
especializacion_costeada MAST "Máster pagado por Farmalia"
forma_escrita ESC "Pacto escrito"
MAST ESC -> PERM
CT -> PERM
focus PERM
~~~

- [ ] Sí: la empresa pagó la formación
  La especialización es necesaria, pero no basta.
- [x] No más allá de 2 años
  El pacto de permanencia no puede durar más de 2 años (art. 21.4 ET).
- [ ] No: los pactos de permanencia están prohibidos
  Están permitidos tras una especialización costeada por la empresa.

### Respuesta
El pacto de permanencia exige una **especialización profesional costeada por la empresa**, la **forma escrita** y una duración de **2 años como máximo** (art. 21.4 ET). Se reduce a 24 meses.

~~~scene
verification on
param PERM duracion=24
renombrar PERM "Permanencia de 2 años"
focus PERM
~~~

## 7. Si la empresa despide a Carmen
Si Farmalia despide a Carmen por causas objetivas, el pacto de permanencia **no se aplica**: castiga el abandono voluntario, no la decisión de la empresa. El símbolo ⊘ lo muestra.

~~~scene
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
~~~

## 8. Resumen
| Pacto | Condiciones | Duración máxima |
|---|---|---|
| 🚫 No competencia | interés efectivo + compensación adecuada | 2 años técnicos, 6 meses los demás |
| 🔒 Plena dedicación | compensación expresa | rescindible con 30 días de preaviso |
| ⚓ Permanencia | especialización costeada + escrito | 2 años |

~~~scene
retirar DO CE CARTA PDI PRV
selection NC
~~~
` },

{ id: 'es-temporales', lang: 'es', md: `---
droit: es
---
# Contratos temporales tras la reforma de 2021
> Presunción de indefinido, causa precisa, regla de los 18 meses e indemnización de 12 días.

El RDL 32/2021 cambió el punto de partida: **el contrato se presume indefinido** (art. 15.1 ET). El contrato temporal solo cabe por **circunstancias de la producción** o por **sustitución**, con una causa precisa.

## 1. Un contrato «eventual» sin más
**Conservas del Cantábrico SL** contrata a **Hugo Sanz** «como eventual». No hay contrato escrito ni causa: ⛔ se presume indefinido.

~~~scene
empresa EMP "Conservas del Cantábrico SL" plantilla=60
trabajador HUGO "Hugo Sanz" antiguedad=0.5 salario=1800
contrato_temporal CT "Contrato eventual de Hugo"
EMP HUGO -> CT
focus CT
note CT "Ni escrito ni causa"
~~~

## 2. Por escrito y con una causa precisa
La empresa redacta el contrato: **6 meses** por el aumento de pedidos de la campaña de Navidad, con las circunstancias concretas que lo justifican. Ahora es válido.

~~~scene
forma_escrita ESC "Contrato escrito"
causa_temporal CAU "Campaña de Navidad: pedidos +40 %"
ESC CAU -> CT
param CT duracion=6
focus CT
~~~

## Pregunta: ¿puede el contrato durar 9 meses?
La campaña se alarga y la empresa quiere pactar 9 meses desde el inicio.

~~~scene
verification off
focus CT
~~~

- [ ] Sí, sin límite si hay causa
  La ley fija una duración máxima.
- [x] Solo si el convenio sectorial amplía la duración a un año
  El máximo legal es de 6 meses, ampliable a 1 año por convenio sectorial.
- [ ] No, nunca más de 3 meses
  Los 90 días al año corresponden a las situaciones ocasionales y previsibles.

### Respuesta
El contrato por circunstancias de la producción imprevisibles dura **6 meses como máximo**, ampliables hasta **un año** por el convenio colectivo sectorial (art. 15.2 ET). Por eso la tarjeta pasa a naranja: hay que comprobar el convenio.

~~~scene
verification on
param CT duracion=9
focus CT
~~~

## 4. El fin del contrato
Volvemos a los 6 meses. Al llegar el término, el contrato se extingue (art. 49.1.c ET). Hugo cobra una indemnización de **12 días por año de servicio**, en proporción:

12 × 0,5 años = 6 días × 59,18 € = **355,07 €**.

~~~scene
param CT duracion=6
fin_contrato_temporal FIN "Fin del contrato"
FIN -> CT
indemnizacion_fin_contrato IND "12 días por año"
prestacion_desempleo PRE "Prestación por desempleo"
FIN -> IND PRE
focus FIN IND
~~~

## 5. La regla de los 18 meses
Imagine ahora que Hugo encadena contratos por circunstancias de la producción: **20 meses** trabajados en los últimos 24. Más de **18 meses en un periodo de 24** convierten al trabajador en **fijo** (art. 15.5 ET).

~~~scene
retirar FIN IND PRE
param CT meses_acumulados=20
focus CT
note CT "20 meses en 24: fijo"
~~~

## 6. La sustitución
**Ana** sustituye a Lola durante su permiso por nacimiento. El contrato de **sustitución** debe indicar el nombre de la persona sustituida y la causa. A su fin, **no** hay indemnización de 12 días: el símbolo ⊘ lo muestra.

~~~scene
param CT meses_acumulados=6
trabajador ANA "Ana" antiguedad=0.8 salario=1700
contrato_sustitucion CS "Sustitución de Lola"
forma_escrita ESC2 "Contrato escrito"
causa_temporal CAU2 "Lola: permiso por nacimiento"
ESC2 CAU2 -> CS
EMP ANA -> CS
fin_contrato_temporal FIN2 "Reincorporación de Lola"
FIN2 -> CS
indemnizacion_fin_contrato IND2 "12 días por año"
FIN2 -> IND2
focus CS IND2
~~~

## 7. La alternativa: el fijo-discontinuo
Para trabajos de **temporada** que se repiten cada año (la campaña de la anchoa, por ejemplo), la reforma empuja hacia el **contrato fijo-discontinuo** (art. 16 ET): indefinido, por escrito, con llamamiento cada temporada.

~~~scene
trabajador LEO "Leo"
fijo_discontinuo FD "Fijo-discontinuo: campaña de la anchoa"
forma_escrita ESC3 "Contrato escrito"
ESC3 -> FD
EMP LEO -> FD
focus FD
~~~

## 8. Resumen
| Contrato | Causa | Duración | Al terminar |
|---|---|---|---|
| ⏳ Circunstancias de la producción | aumento imprevisible / ocasional previsible | 6 meses (1 año por convenio) / 90 días al año | 12 días por año |
| 🔁 Sustitución | persona con reserva de puesto | hasta la reincorporación | sin indemnización |
| 🌗 Fijo-discontinuo | trabajos de temporada o intermitentes | indefinido | llamamiento |

Más de **18 meses en 24**: fijo.

~~~scene
selection CT
~~~
` },

{ id: 'es-despido-disciplinario', lang: 'es', md: `---
droit: es
---
# El despido disciplinario
> Incumplimiento grave y culpable, carta de despido, prescripción de las faltas y caducidad de la acción.

El despido disciplinario se basa en un **incumplimiento grave y culpable** del trabajador (art. 54 ET). Debe notificarse **por escrito**, con los **hechos** y la **fecha de efectos** (art. 55.1 ET). Si es procedente, extingue el contrato **sin indemnización**.

## 1. El caso de Raúl
**Raúl Gómez** es encargado de tienda en **Moda Norte SL** desde hace **8 años** (2000 € al mes). La empresa decide despedirlo.

Un despido sin causa ni forma: ⛔ improcedente.

~~~scene
empresa EMP "Moda Norte SL" plantilla=85
trabajador RAUL "Raúl Gómez" antiguedad=8 salario=2000
contrato_indefinido CT "Contrato de Raúl"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP RAUL -> CT
despido_disciplinario DESP "Despido de Raúl"
EMP -> DESP
DESP -> CT
focus DESP
~~~

## 2. Un incumplimiento grave y culpable
La auditoría descubre que Raúl aplicaba **descuentos falsos** a familiares: una **transgresión de la buena fe contractual** (art. 54.2.d ET), falta muy grave según el convenio.

Falta todavía la carta.

~~~scene
incumplimiento_grave FALTA "Descuentos falsos" dias_conocimiento=20
FALTA -> DESP
focus FALTA DESP
~~~

## 3. La carta de despido
La empresa entrega a Raúl una **carta** que describe los hechos (fechas, tickets, importes) y la **fecha de efectos**. El despido es **procedente** ✅: extinción sin indemnización ni salarios de tramitación.

~~~scene
carta_despido CARTA "Carta de despido"
hechos_fecha HF "Hechos concretos y fecha de efectos"
DESP -> CARTA
HF -> DESP
focus CARTA HF DESP
~~~

## Pregunta: la empresa conoció los hechos hace 75 días. ¿Puede despedir todavía?
La auditoría terminó en marzo; la carta llega en junio, **75 días** después.

~~~scene
verification off
focus FALTA DESP
~~~

- [ ] Sí: la falta es muy grave
  Incluso las faltas muy graves prescriben.
- [x] No: la falta muy grave ha prescrito a los 60 días
  Art. 60.2 ET: 60 días desde que la empresa tuvo conocimiento, y en todo caso 6 meses desde su comisión.
- [ ] Sí, si el convenio lo permite
  El convenio no puede alargar los plazos legales de prescripción.

### Respuesta
Las faltas prescriben (art. 60.2 ET): **leves a los 10 días, graves a los 20 y muy graves a los 60** desde que la empresa las conoció, y en todo caso a los **6 meses** de cometerse. Un despido basado en una falta prescrita es **improcedente**.

~~~scene
verification on
param FALTA dias_conocimiento=75
focus FALTA DESP
~~~

## 5. Raúl impugna: conciliación previa
Volvemos al caso en plazo. Raúl no está de acuerdo. Antes de demandar debe presentar la **papeleta de conciliación** ante el servicio administrativo (SMAC u órgano autonómico, art. 63 LRJS). Lo hace **12 días hábiles** después del despido: dentro del plazo de **20 días hábiles** (art. 59.3 ET).

~~~scene
param FALTA dias_conocimiento=20
smac SMAC "Servicio de conciliación"
conciliacion_previa CONC "Papeleta de conciliación" dias_habiles=12
demanda DEM "Demanda por despido"
CONC -> DEM
DESP -> CONC
focus CONC DEM
~~~

## 6. Si el juez no da por probados los hechos
En el juicio, la empresa no logra probar los descuentos. El despido se declara **improcedente**: en 5 días, la empresa opta entre **readmitir** a Raúl (con salarios de tramitación) o pagarle **33 días por año**, con un máximo de 24 mensualidades (art. 56.1 ET):

33 × 8 = 264 días × 65,75 € = **17.358,90 €**.

~~~scene
statut DESP improcedente "improcedente: hechos no probados en juicio"
despido_improcedente IMP "Despido improcedente"
DESP -> IMP
focus DESP IMP
~~~

## Pregunta: ¿y si Raúl hubiera presentado la papeleta a los 25 días hábiles?
~~~scene
verification off
focus CONC
~~~

- [ ] Nada cambia: el plazo es de un año
  Un año es el plazo de prescripción de otras acciones, no del despido.
- [x] La acción ha caducado: el despido queda firme
  El plazo de 20 días hábiles es de caducidad.
- [ ] El juez puede ampliar el plazo
  La caducidad no se interrumpe ni se amplía; solo se suspende con la papeleta.

### Respuesta
El plazo para impugnar el despido es de **20 días hábiles** desde el día siguiente al despido (art. 59.3 ET; art. 103 LRJS). Es un plazo de **caducidad**: pasado ese plazo, Raúl pierde la acción. La papeleta de conciliación solo lo **suspende**.

~~~scene
verification on
param CONC dias_habiles=25
focus CONC DEM
~~~

## 8. Resumen
| Requisito | Fuente |
|---|---|
| Incumplimiento **grave y culpable** | art. 54 ET |
| **Carta** con hechos y fecha de efectos | art. 55.1 ET |
| Faltas muy graves: prescripción a los **60 días** (6 meses máximo) | art. 60.2 ET |
| Impugnación: **20 días hábiles**, con conciliación previa | art. 59.3 ET, arts. 63 y 103 LRJS |
| Procedente: sin indemnización · improcedente: readmisión o 33 días por año | arts. 55.7 y 56 ET |

~~~scene
param CONC dias_habiles=12
retirar IMP
statut DESP auto
selection DESP
~~~
` },

{ id: 'es-despido-objetivo', lang: 'es', md: `---
droit: es
---
# El despido objetivo
> Causas económicas, carta, indemnización de 20 días puesta a disposición, preaviso de 15 días y umbrales del despido colectivo.

El despido por **causas objetivas** (art. 52 ET) no reprocha nada al trabajador. A cambio, la ley exige una forma estricta (art. 53.1 ET): **carta con la causa**, **indemnización de 20 días por año** puesta a disposición al mismo tiempo y **15 días de preaviso**.

## 1. Elena y la crisis de Gráficas Levante
**Elena Torres** es administrativa en **Gráficas Levante SA** (120 trabajadores) desde hace **6 años y medio**, con 2100 € al mes. La empresa pierde dinero y decide amortizar su puesto.

~~~scene
empresa EMP "Gráficas Levante SA" plantilla=120
trabajador ELE "Elena Torres" antiguedad=6.5 salario=2100
contrato_indefinido CT "Contrato de Elena"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP ELE -> CT
despido_objetivo DO "Despido objetivo de Elena"
EMP -> DO
DO -> CT
focus DO
~~~

## 2. Una causa económica acreditada
La empresa acumula **pérdidas** y tres trimestres consecutivos de caída de ventas: una **causa económica** del art. 51.1 ET, aplicable al despido objetivo por el art. 52.c.

~~~scene
causas_etop CAUSA "Pérdidas y caída de ventas"
CAUSA -> DO
focus CAUSA DO
~~~

## 3. La forma del art. 53 ET
La empresa entrega a Elena la **carta** con la causa, le **pone a disposición** la indemnización en el mismo acto y respeta un **preaviso de 15 días**. El despido es **procedente** ✅.

Indemnización: 20 días × 6,5 años = 130 días × 69,04 € = **8975,34 €** (tope: 12 mensualidades, 25.200 €).

~~~scene
carta_despido CARTA "Carta con la causa económica"
puesta_disposicion PD "Transferencia el mismo día"
preaviso PRE "Preaviso de 15 días" dias=15
DO -> CARTA
CARTA -> PD
PD -> PRE
indemnizacion_despido IND "Indemnización: 20 días por año"
DO -> IND
focus DO IND
~~~

## Pregunta: la carta solo da 10 días de preaviso. ¿Es improcedente el despido?
~~~scene
verification off
focus PRE DO
~~~

- [ ] Sí: falta un requisito del art. 53.1
  La ley trata el preaviso de forma distinta a la carta y a la indemnización.
- [x] No, pero la empresa debe pagar los 5 días de preaviso que faltan
  La falta de preaviso no determina la improcedencia (art. 53.4 ET).
- [ ] No, y no se debe nada
  Los salarios del preaviso omitido se deben.

### Respuesta
La no concesión del preaviso **no hace improcedente** el despido, pero la empresa debe abonar los **salarios de los días que faltan** (art. 53.4 ET): 5 días × 69,04 € = **345,21 €**. La tarjeta pasa a naranja.

~~~scene
verification on
param PRE dias=10
renombrar PRE "Preaviso de 10 días"
focus PRE DO
~~~

## 5. Sin poner la indemnización a disposición
Otra versión: la carta dice que la indemnización «se abonará en el finiquito». La puesta a disposición **simultánea** es un requisito: el despido es **improcedente**, y la indemnización pasa a **33 días por año** (máximo 24 mensualidades):

33 × 6,5 = 214,5 días × 69,04 € = **14.809,32 €**.

~~~scene
param PRE dias=15
renombrar PRE "Preaviso de 15 días"
retirar PD
CARTA -> PRE
despido_improcedente IMP "Despido improcedente"
DO -> IMP
focus DO IMP
~~~

## Pregunta: Gráficas Levante despide así a 14 personas en 90 días. ¿Problema?
La empresa tiene 120 trabajadores y hace 14 despidos objetivos individuales por la misma causa en tres meses.

~~~scene
verification off
retirar IMP
puesta_disposicion PD "Transferencia el mismo día"
CARTA -> PD
PD -> PRE
param DO afectados=14
focus DO
~~~

- [ ] Ninguno: cada despido es individual
  Lo que cuenta es el número de extinciones en 90 días.
- [x] Sí: supera el umbral del despido colectivo, los despidos son nulos
  Con 120 trabajadores, el umbral es el 10 % de la plantilla: 12 extinciones.
- [ ] Solo si son más de 30
  Los 30 trabajadores son el umbral de las empresas de más de 300.

### Respuesta
En 90 días, el despido es **colectivo** a partir de 10 trabajadores (empresas de menos de 100), el **10 %** (de 100 a 300) o 30 (más de 300) (art. 51.1 ET). Para 120 trabajadores: **12**. Hacer 14 despidos objetivos para eludir el procedimiento colectivo es un **fraude de ley**: los despidos son **nulos**.

~~~scene
verification on
focus DO
~~~

## 7. El despido colectivo
La vía correcta: un **despido colectivo** con **periodo de consultas** con los representantes (máximo 30 días) y comunicación a la **autoridad laboral**. La indemnización mínima sigue siendo de 20 días por año, máximo 12 mensualidades.

~~~scene
param DO afectados=
representantes REP "Comité de empresa"
despido_colectivo DC "Despido colectivo (14 personas)" afectados=14
periodo_consultas PC "Periodo de consultas"
comunicacion_autoridad AUT "Comunicación a la autoridad laboral"
EMP -> DC
CAUSA -> DC
DC -> PC
PC -> AUT
REP -> PC
focus DC PC
~~~

## 8. Resumen
| Requisito del despido objetivo | Si falta |
|---|---|
| Causa (ETOP, ineptitud…) | improcedente |
| Carta con la causa | improcedente |
| Indemnización de 20 días puesta a disposición | improcedente |
| Preaviso de 15 días | se deben los salarios del preaviso |
| Por debajo de los umbrales del art. 51.1 | nulo (fraude) |

~~~scene
selection DO
~~~
` },

{ id: 'es-improcedente-nulo', lang: 'es', md: `---
droit: es
---
# Despido improcedente o nulo
> Las calificaciones del despido, la opción de la empresa, los salarios de tramitación y la protección reforzada.

El juez califica el despido como **procedente**, **improcedente** o **nulo** (art. 55 ET). La diferencia es decisiva: el improcedente se puede «pagar»; el nulo obliga a **readmitir**.

## 1. Sara, despedida sin carta
**Sara López** es técnica de laboratorio en **BioAnalítica SL** desde hace **3 años y 3 meses** (2400 € al mes). Su jefe la despide de palabra «por bajo rendimiento». Sin incumplimiento acreditado ni carta: ⛔ improcedente.

~~~scene
empresa EMP "BioAnalítica SL" plantilla=45
trabajador SARA "Sara López" antiguedad=3.25 salario=2400
contrato_indefinido CT "Contrato de Sara"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP SARA -> CT
despido_disciplinario D "Despido verbal de Sara"
EMP -> D
D -> CT
focus D
~~~

## 2. Sara está embarazada
Sara había comunicado su **embarazo** dos semanas antes. El despido de una trabajadora embarazada es **nulo**, salvo que se declare procedente por motivos no relacionados con el embarazo (art. 55.5.b ET). Aquí no hay ninguna causa: la nulidad prevalece.

~~~scene
embarazo EMB "Embarazo comunicado"
EMB -> D
focus D EMB
~~~

## Pregunta: ¿qué consecuencias tiene la nulidad?
~~~scene
verification off
focus D
~~~

- [ ] La empresa elige entre readmitir o pagar 33 días por año
  Esa opción es propia del despido improcedente.
- [x] Readmisión inmediata y abono de los salarios dejados de percibir
  Art. 55.6 ET: el despido nulo no se puede sustituir por una indemnización.
- [ ] Una indemnización de 45 días por año
  Los 45 días corresponden al régimen transitorio del improcedente.

### Respuesta
El despido nulo tiene por efecto la **readmisión inmediata** con abono de los **salarios de tramitación** (art. 55.6 ET). Si la sentencia llega 90 días después: 90 días × 78,90 € = **7101,37 €**. Se añade la indemnización por daños morales si se vulneró un derecho fundamental.

~~~scene
verification on
despido_nulo NUL "Despido nulo" dias=90
D -> NUL
focus D NUL
~~~

## 4. Sin embarazo: improcedente
Otra versión: Sara no está embarazada. El despido es **improcedente**. La empresa elige en 5 días (art. 56.1 ET); si paga, son **33 días por año**, prorrateados por meses, máximo 24 mensualidades:

33 × 3,25 = 107,25 días × 78,90 € = **8462,47 €**.

~~~scene
retirar EMB NUL
despido_improcedente IMP "Despido improcedente"
D -> IMP
focus D IMP
~~~

## 5. Si la empresa readmite
BioAnalítica opta por la **readmisión**: debe pagar los **salarios de tramitación** desde el despido hasta la notificación de la sentencia, aquí 60 días: 60 × 78,90 € = **4734,25 €**.

Si el trabajador es **representante** de los trabajadores, la opción le corresponde a él (art. 56.4 ET).

~~~scene
param IMP opcion=readmision dias=60
focus IMP
~~~

## 6. Una represalia: garantía de indemnidad
**Iván**, compañero de Sara, había demandado a la empresa por horas extra. Una semana después, la empresa lo despide alegando faltas de puntualidad, con carta. La proximidad temporal es un **indicio** de represalia: si la empresa no prueba una causa real y ajena, el despido es **nulo** por vulneración de la tutela judicial efectiva (garantía de indemnidad).

~~~scene
param IMP opcion=indemnizacion
trabajador IVAN "Iván" antiguedad=2 salario=2000
contrato_indefinido CT2 "Contrato de Iván"
informacion_elementos INF2 "Contrato escrito"
INF2 -> CT2
EMP IVAN -> CT2
despido_disciplinario D2 "Despido de Iván"
EMP -> D2
D2 -> CT2
faltas_asistencia PUN "Faltas de puntualidad"
carta_despido CARTA2 "Carta"
hechos_fecha HF2 "Hechos y fecha"
PUN HF2 -> D2
D2 -> CARTA2
vulneracion_derechos REP "Represalia por su demanda"
REP -> D2
focus D2 REP
~~~

## 7. Resumen
| Calificación | Cuándo | Efecto |
|---|---|---|
| ✅ Procedente | causa acreditada y forma respetada | extinción; en el objetivo, 20 días por año |
| ⛔ Improcedente | causa no probada o forma incumplida | readmisión o 33 días por año (máx. 24 mensualidades) |
| ⛔ Nulo | discriminación, derechos fundamentales, embarazo y permisos protegidos | readmisión + salarios de tramitación |

> ⚠️ Contratos anteriores al 12/02/2012: 45 días por año por el tiempo anterior (DT 11.ª ET).

~~~scene
selection D
~~~
` },

{ id: 'es-extincion-voluntaria', lang: 'es', md: `---
droit: es
---
# Dimisión, mutuo acuerdo y extinción por incumplimiento del empresario
> Cuando el trabajador quiere irse: preaviso, prestación por desempleo y el art. 50 ET.

El trabajador puede poner fin al contrato de varias maneras. La diferencia está en dos preguntas: ¿hay **indemnización**? ¿Queda en **situación legal de desempleo** para cobrar el paro?

## 1. Diego dimite
**Diego Navarro** es camarero en **Hostelería Sol SL** desde hace **4 años** (1600 € al mes). Encuentra otro trabajo y **dimite** (art. 49.1.d ET), con el preaviso de **15 días** que fija su convenio.

Sin indemnización y **sin prestación por desempleo**: la dimisión no es situación legal de desempleo.

~~~scene
empresa EMP "Hostelería Sol SL" plantilla=30
trabajador DIE "Diego Navarro" antiguedad=4 salario=1600
contrato_indefinido CT "Contrato de Diego"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP DIE -> CT
dimision DIM "Diego dimite"
voluntad_clara VC "Carta de dimisión firmada"
VC -> DIM
DIE -> DIM
DIM -> CT
preaviso PRE "Preaviso de 15 días" dias=15
DIM -> PRE
prestacion_desempleo PREST "Prestación por desempleo"
DIM -> PREST
focus DIM PREST
~~~

## Pregunta: si Diego y la empresa firman una «baja pactada», ¿cobrará el paro?
~~~scene
verification off
retirar DIM VC PRE
extincion_mutuo_acuerdo MA "Baja pactada"
consentimiento_libre CL "Sin presiones"
forma_escrita ESC "Acuerdo escrito"
CL ESC -> MA
DIE -> MA
MA -> CT
MA -> PREST
focus MA PREST
~~~

- [ ] Sí: el acuerdo es voluntario para ambos
  Precisamente: el cese es voluntario para el trabajador.
- [x] No: el mutuo acuerdo no es situación legal de desempleo
  A diferencia de la ruptura convencional francesa.
- [ ] Sí, si la empresa le paga una indemnización
  La indemnización pactada no cambia la naturaleza del cese.

### Respuesta
La extinción por **mutuo acuerdo** (art. 49.1.a ET) es válida sin indemnización legal, pero **no da derecho a la prestación por desempleo** (art. 267 LGSS). Por eso, en la práctica, muchas salidas pactadas se formalizan como un **despido reconocido improcedente** en conciliación.

~~~scene
verification on
focus MA PREST
~~~

## 3. La empresa deja de pagar
Otra situación: desde hace tres meses Hostelería Sol paga el salario con **retrasos continuados**. Diego puede pedir al juez la **extinción del contrato** por incumplimiento grave del empresario (art. 50.1.b ET), con la **indemnización del despido improcedente**:

33 × 4 = 132 días × 52,60 € = **6943,56 €**. Y queda en situación legal de desempleo.

~~~scene
retirar MA CL ESC
impago_salarios IMP "Salarios con 3 meses de retraso"
pagar_salario PS "Pagar el salario"
EMP -> PS
IMP -> PS
extincion_art50 EXT "Extinción del art. 50"
IMP -> EXT
DIE -> EXT
EXT -> CT
conciliacion_previa CONC "Conciliación previa"
demanda DEM "Demanda de extinción"
EXT -> CONC
CONC -> DEM
indemnizacion_despido IND "Indemnización"
EXT -> IND
EXT -> PREST
focus EXT IND
~~~

## Pregunta: ¿puede Diego dejar de ir a trabajar y reclamar después?
~~~scene
verification off
focus EXT DEM
~~~

- [ ] Sí: el impago le autoriza a irse
  Si se va sin más, el juez puede tratarlo como una dimisión.
- [x] En general no: demanda y sigue trabajando hasta la sentencia
  La extinción del art. 50 la declara el juez.
- [ ] Sí, enviando un burofax
  Un burofax no extingue el contrato por sí solo.

### Respuesta
La extinción del art. 50 la **pronuncia el juez**. Como regla general, el trabajador **sigue prestando servicios** mientras se tramita el proceso; solo en situaciones especialmente graves (acoso, riesgo para la salud o la dignidad) se admite que deje de trabajar al presentar la demanda.

~~~scene
verification on
focus DEM
~~~

## 5. Una modificación sustancial del horario
Otra variante: la empresa pasa a Diego del turno de mañana al de noche (art. 41 ET). Si se siente perjudicado, puede **rescindir** el contrato con **20 días por año**, máximo **9 mensualidades** (art. 41.3 ET):

20 × 4 = 80 días × 52,60 € = **4208,22 €**.

~~~scene
retirar IMP PS EXT CONC DEM IND
modificacion_sustancial MOD "Cambio al turno de noche"
EMP -> MOD
extincion_art41 RES "Diego rescinde"
MOD -> RES
DIE -> RES
RES -> CT
indemnizacion_despido IND "Indemnización"
RES -> IND
RES -> PREST
focus RES IND
~~~

## 6. El finiquito
En todos los casos, la empresa entrega el **finiquito**: salario pendiente, parte proporcional de las pagas extra y **vacaciones no disfrutadas**, que se pagan en dinero al terminar el contrato (art. 38.1 ET). Diego tiene 8 días pendientes: 8 × 52,60 € = **420,82 €**.

~~~scene
finiquito FIN "Finiquito"
vacaciones_no_disfrutadas VAC "8 días de vacaciones" dias=8
RES -> FIN
FIN -> VAC
focus FIN VAC
~~~

## 7. Resumen
| Extinción | Iniciativa | Indemnización | Paro |
|---|---|---|---|
| 🚪 Dimisión | trabajador | no | no |
| 🤝 Mutuo acuerdo | ambos | la pactada | no |
| 🚩 Art. 50 (incumplimiento del empresario) | trabajador, ante el juez | 33 días por año, máx. 24 mensualidades | sí |
| 🔧 Art. 41 (modificación sustancial) | trabajador | 20 días por año, máx. 9 mensualidades | sí |

~~~scene
selection RES
~~~
` },

{ id: 'es-tiempo-trabajo', lang: 'es', md: `---
droit: es
---
# Tiempo de trabajo: jornada, horas extra, vacaciones y desconexión
> 40 horas de promedio, registro diario, 80 horas extra al año, 30 días de vacaciones y tiempo parcial.

El tiempo de trabajo concentra muchas reglas imperativas del Estatuto. La Inspección de Trabajo vigila especialmente el **registro de jornada**.

## 1. La jornada de Nuria
**Nuria Gil** es consultora en **Consultora Atlas SL**, con una jornada de **40 horas semanales** y 2600 € al mes. La jornada máxima ordinaria es de **40 horas de promedio en cómputo anual** (art. 34.1 ET).

La tarjeta está en naranja: falta el **registro diario** de jornada (art. 34.9 ET).

> ⚠️ La reducción a 37,5 horas fue rechazada por el Congreso en 2025: verifique la situación actual.

~~~scene
empresa EMP "Consultora Atlas SL" plantilla=70
trabajador NUR "Nuria Gil" antiguedad=3 salario=2600
contrato_indefinido CT "Contrato de Nuria"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP NUR -> CT
jornada JOR "40 horas semanales" horas_semanales=40
CT -> JOR
focus JOR
~~~

## 2. El registro diario
Atlas implanta una aplicación de fichaje con la hora de inicio y de fin de cada jornada, conservada **cuatro años** a disposición de Nuria, de los representantes y de la Inspección.

~~~scene
registro_jornada REG "Fichaje en la aplicación"
EMP -> REG
REG -> JOR
focus JOR REG
~~~

## Pregunta: en un año de mucho trabajo, Nuria hace 100 horas extra pagadas. ¿Es posible?
~~~scene
verification off
horas_extra HE "Horas extraordinarias" horas_anuales=100
CT -> HE
focus HE
~~~

- [ ] Sí, si se pagan
  El pago no elimina el límite legal.
- [x] No: el máximo es de 80 horas extraordinarias al año
  Salvo las compensadas con descanso en los 4 meses siguientes.
- [ ] Sí, con el acuerdo de Nuria
  El límite es imperativo.

### Respuesta
Las horas extraordinarias no pueden superar **80 al año** (art. 35.2 ET). No computan las compensadas con **descanso** dentro de los cuatro meses siguientes. Atlas compensa 20 horas con descanso: quedan 80.

~~~scene
verification on
param HE horas_anuales=80
focus HE
~~~

## 4. Las vacaciones
El contrato de Nuria prevé **25 días naturales** de vacaciones: es inferior al mínimo legal de **30 días naturales** (art. 38.1 ET). La cláusula es nula en lo que reduce ese mínimo; la empresa la corrige.

~~~scene
vacaciones VAC "25 días de vacaciones" dias=25
CT -> VAC
focus VAC
note VAC "25 < 30 días naturales"
~~~

## 5. La desconexión digital
La directora envía correos a las 23 h y exige respuesta inmediata. Nuria tiene **derecho a la desconexión digital** fuera de su tiempo de trabajo (art. 20 bis ET; art. 88 LOPDGDD): la obligación de la empresa queda **violada** ⚡.

~~~scene
param VAC dias=30
renombrar VAC "30 días de vacaciones"
dignidad_intimidad DIG "Intimidad y desconexión digital"
EMP -> DIG
incumplimiento CORREOS "Correos a las 23 h exigiendo respuesta"
CORREOS -> DIG
focus DIG CORREOS
~~~

## Pregunta: Atlas contrata a Bruno a media jornada por 700 € al mes. ¿Es suficiente?
El contrato a tiempo parcial es escrito, al **50 %** de la jornada, por 700 € al mes con pagas prorrateadas.

~~~scene
verification off
trabajador BRU "Bruno" antiguedad=0
contrato_indefinido CT2 "Contrato de Bruno"
informacion_elementos INF2 "Contrato escrito"
INF2 -> CT2
EMP BRU -> CT2
tiempo_parcial TP "Media jornada"
forma_escrita ESC2 "Contrato escrito"
ESC2 -> TP
salario SAL2 "700 € al mes" salario=700 porcentaje_jornada=50
CT2 -> TP SAL2
focus SAL2
~~~

- [ ] Sí: el SMI no se aplica a tiempo parcial
  Se aplica, en proporción a la jornada.
- [x] No: 8400 € al año no llegan a la mitad del SMI (8547 €)
  700 × 12 = 8400 €; 17.094 € × 50 % = 8547 €.
- [ ] Sí, porque supera la mitad de 1221 €
  Hay que comparar en cómputo anual, con las 14 pagas.

### Respuesta
A tiempo parcial, el SMI se percibe **en proporción a la jornada**: 17.094 € × 50 % = **8547 €** al año. Bruno cobra 700 × 12 = **8400 €**: le faltan 147 €.

> ⚠️ Cifras del SMI 2026, a verificar.

~~~scene
verification on
focus SAL2
~~~

## 7. Resumen
| Regla | Límite | Fuente |
|---|---|---|
| ⏱️ Jornada ordinaria | 40 h de promedio anual, registro diario | art. 34 ET |
| 🕐 Horas extra | 80 al año | art. 35.2 ET |
| 🏖️ Vacaciones | 30 días naturales | art. 38.1 ET |
| 🌓 Tiempo parcial | por escrito; SMI proporcional | art. 12 ET |
| 📵 Desconexión digital | fuera del tiempo de trabajo | art. 20 bis ET |

~~~scene
selection JOR
~~~
` },

{ id: 'es-obligaciones', lang: 'es', md: `---
droit: es
---
# Obligaciones de las partes y buena fe
> Deberes del trabajador y del empresario, incumplimientos y sus consecuencias.

El contrato de trabajo crea **obligaciones recíprocas**. El Estatuto enumera los deberes básicos del trabajador (art. 5 ET) y sus derechos frente al empresario (art. 4 ET). Por encima de todo, la **buena fe** (art. 20.2 ET).

## 1. Las obligaciones de la empresa
**Talleres Ibéricos SL** contrata a **Tomás Ortega** como mecánico. La empresa debe:

- **pagar** puntualmente el salario (art. 29 ET);
- dar **ocupación efectiva** (art. 4.2.a);
- proteger su **seguridad y salud** (Ley 31/1995, art. 14);
- respetar su **dignidad** y no discriminar.

~~~scene
empresa EMP "Talleres Ibéricos SL" plantilla=35
trabajador TOM "Tomás Ortega" antiguedad=6 salario=1900
contrato_indefinido CT "Contrato de Tomás"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP TOM -> CT
pagar_salario PS "Pagar el salario"
ocupacion_efectiva OE "Ocupación efectiva"
seguridad_salud SS "Seguridad y salud"
no_discriminacion ND "No discriminación"
EMP -> PS OE SS ND
focus PS OE SS ND
~~~

## 2. Las obligaciones de Tomás
Tomás debe cumplir con **diligencia** y **buena fe**, seguir las **órdenes** dadas en el ejercicio regular del poder de dirección, observar la **prevención de riesgos** y **no concurrir** con la empresa (art. 5 ET).

~~~scene
buena_fe BF "Buena fe"
diligencia DIL "Diligencia"
obediencia OB "Cumplir las órdenes"
no_concurrencia NCO "No concurrencia desleal"
prevencion_trabajador PRL "Usar los equipos de protección"
TOM -> BF DIL OB NCO PRL
EMP -> BF
focus BF NCO
~~~

## 3. Tomás repara coches de clientes los fines de semana
Tomás atiende en su garaje, los sábados, a clientes del taller, a precios más bajos. Es una **concurrencia desleal**: viola su deber de no competir y la buena fe ⚡.

~~~scene
transgresion_buena_fe TBF "Desvía clientes del taller"
TBF -> NCO BF
focus TBF NCO BF
~~~

## Pregunta: ¿puede Talleres Ibéricos despedir a Tomás?
~~~scene
verification off
despido_disciplinario DESP "Despido de Tomás"
EMP -> DESP
DESP -> CT
TBF -> DESP
focus DESP
~~~

- [ ] No: lo que hace en su tiempo libre es asunto suyo
  El pluriempleo es libre, salvo que suponga concurrencia desleal.
- [x] Sí: es una transgresión de la buena fe, con carta de despido
  Art. 54.2.d ET; la carta debe precisar los hechos y la fecha de efectos.
- [ ] Sí, sin carta, porque la falta es evidente
  La forma escrita es siempre obligatoria.

### Respuesta
La **transgresión de la buena fe contractual** es causa de despido disciplinario (art. 54.2.d ET). Con una **carta** que detalla los hechos y la fecha de efectos, el despido es **procedente**.

~~~scene
verification on
carta_despido CARTA "Carta de despido"
hechos_fecha HF "Clientes, fechas y facturas"
DESP -> CARTA
HF -> DESP
focus DESP
~~~

## 5. Y si es la empresa la que incumple
Otra situación: el taller no entrega a **Lidia**, compañera de Tomás, los equipos de protección y le retrasa el salario. La empresa **viola** sus obligaciones ⚡: Lidia puede pedir la **extinción del contrato** con la indemnización del despido improcedente (art. 50 ET).

~~~scene
trabajador LID "Lidia" antiguedad=4 salario=1800
contrato_indefinido CT2 "Contrato de Lidia"
informacion_elementos INF2 "Contrato escrito"
INF2 -> CT2
EMP LID -> CT2
incumplimiento_empresario SINEPI "Sin equipos de protección"
impago_salarios RET "Salario con retraso"
SINEPI -> SS
RET -> PS
extincion_art50 EXT "Extinción del art. 50"
conciliacion_previa CONC "Conciliación previa"
demanda DEM "Demanda"
SINEPI RET -> EXT
LID -> EXT
EXT -> CT2
EXT -> CONC
CONC -> DEM
focus SS PS EXT
~~~

## 6. Resumen
| Parte | Deberes principales | Si incumple |
|---|---|---|
| 🏢 Empresa | salario, ocupación efectiva, seguridad, dignidad | extinción del art. 50, reclamaciones, sanciones de la Inspección |
| 👤 Trabajador | buena fe, diligencia, obediencia, no concurrencia | sanción o despido disciplinario |

~~~scene
selection BF
~~~
` },

{ id: 'es-quiz-extinciones', lang: 'es', md: `---
droit: es
---
# Cuestionario: la extinción del contrato en España
> Siete preguntas rápidas para repasar indemnizaciones, plazos y pactos.

Un cuestionario de repaso: el lienzo ilustra cada situación. Elija la respuesta de la clase y luego revélela.

## Pregunta: despido objetivo procedente tras 5 años, con 1825 € al mes. ¿Indemnización?
~~~scene
empresa EMP "Empresa"
trabajador T "Trabajador" antiguedad=5 salario=1825
contrato_indefinido CT "Contrato"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP T -> CT
despido_objetivo DO "Despido objetivo"
EMP -> DO
DO -> CT
causas_etop CAU "Causa económica"
carta_despido CAR "Carta"
puesta_disposicion PD "Indemnización a disposición"
preaviso PRE "15 días" dias=15
CAU -> DO
DO -> CAR
CAR -> PD
PD -> PRE
indemnizacion_despido IND "Indemnización"
DO -> IND
verification off
focus IND
~~~

- [ ] 3000 €
  Serían 10 días por año.
- [x] 6000 €
  20 días × 5 años = 100 días × 60 € de salario diario.
- [ ] 9900 €
  Son los 33 días del despido improcedente.

### Respuesta
Salario diario: 1825 × 12 / 365 = **60 €**. Despido objetivo: **20 días por año**, máximo 12 mensualidades: 100 días × 60 € = **6000 €**.

~~~scene
verification on
~~~

## Pregunta: el mismo despido, declarado improcedente tras 10 años. ¿Indemnización?
~~~scene
param T antiguedad=10
retirar IND
statut DO improcedente "declarado improcedente"
despido_improcedente IMP "Despido improcedente"
DO -> IMP
verification off
focus IMP
~~~

- [ ] 12.000 €
  Serían 20 días por año.
- [x] 19.800 €
  33 días × 10 años = 330 días × 60 €.
- [ ] 27.000 €
  Serían 45 días por año, el régimen anterior a 2012.

### Respuesta
Improcedente: **33 días por año**, máximo **24 mensualidades**: 330 días × 60 € = **19.800 €** (tope: 43.800 €).

~~~scene
verification on
~~~

## Pregunta: ¿cobra el paro quien firma una extinción por mutuo acuerdo?
~~~scene
effacer
extincion_mutuo_acuerdo MA "Mutuo acuerdo"
consentimiento_libre CL "Consentimiento libre"
forma_escrita ESC "Acuerdo escrito"
CL ESC -> MA
prestacion_desempleo PREST "Prestación por desempleo"
MA -> PREST
verification off
focus PREST
~~~

- [ ] Sí, como cualquier cese
  Solo los ceses involuntarios abren la prestación.
- [x] No: no es situación legal de desempleo
  Art. 267 LGSS.

### Respuesta
El mutuo acuerdo, como la dimisión, **no** es situación legal de desempleo.

~~~scene
verification on
~~~

## Pregunta: un pacto de no competencia sin compensación económica es…
~~~scene
effacer
pacto_no_competencia NC "No competencia (6 meses)" duracion=6
interes_efectivo IE "Interés efectivo"
IE -> NC
verification off
focus NC
~~~

- [ ] Válido si dura menos de 6 meses
  La duración no sustituye a la compensación.
- [x] Nulo
  Art. 21.2.b ET: compensación económica adecuada.

### Respuesta
Interés efectivo **y** compensación adecuada: sin compensación, el pacto es **nulo**.

~~~scene
verification on
~~~

## Pregunta: 8 meses de prueba para una ingeniera, sin convenio que diga nada. ¿Válido?
~~~scene
effacer
trabajador ING "Ingeniera" categoria=tecnico_titulado
contrato_indefinido CT "Contrato"
informacion_elementos INF "Contrato escrito"
INF -> CT
ING -> CT
periodo_prueba PRU "8 meses de prueba" duracion=8
forma_escrita ESC "Por escrito"
ESC -> PRU
CT -> PRU
verification off
focus PRU
~~~

- [ ] Sí, es técnica titulada
  El máximo para técnicos titulados es de 6 meses.
- [x] No, en lo que exceda de 6 meses
  Art. 14.1 ET.
- [ ] No, el máximo es de 2 meses
  Los 2 meses son para los demás trabajadores.

### Respuesta
Técnicos titulados: **6 meses**; los demás: 2 meses (3 en empresas de menos de 25 trabajadores), salvo convenio.

~~~scene
verification on
~~~

## Pregunta: ¿de cuánto tiempo dispone el trabajador para impugnar su despido?
~~~scene
effacer
despido_disciplinario D "Despido"
conciliacion_previa CONC "Papeleta de conciliación" dias_habiles=22
D -> CONC
verification off
focus CONC
~~~

- [ ] 1 año
  Es la prescripción de otras acciones derivadas del contrato.
- [x] 20 días hábiles
  Plazo de caducidad (art. 59.3 ET).
- [ ] 30 días naturales
  El plazo se cuenta en días hábiles.

### Respuesta
**20 días hábiles**, de caducidad: a los 22 días hábiles, la acción ha caducado.

~~~scene
verification on
~~~

## Pregunta: 20 meses en los últimos 24 con contratos por circunstancias de la producción. ¿Resultado?
~~~scene
effacer
contrato_temporal CT "Contratos eventuales" duracion=6 meses_acumulados=20
forma_escrita ESC "Por escrito"
causa_temporal CAU "Causa precisa"
ESC CAU -> CT
verification off
focus CT
~~~

- [ ] Nada, si cada contrato tiene su causa
  La regla de los 18 meses se aplica aunque cada contrato sea válido.
- [x] El trabajador adquiere la condición de fijo
  Más de 18 meses en un periodo de 24 (art. 15.5 ET).

### Respuesta
Más de **18 meses en 24** con dos o más contratos por circunstancias de la producción: el trabajador pasa a ser **fijo**.

~~~scene
verification on
~~~
` }

);
