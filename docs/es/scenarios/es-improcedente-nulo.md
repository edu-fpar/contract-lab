---
droit: es
---
# Despido improcedente o nulo
> Las calificaciones del despido, la opción de la empresa, los salarios de tramitación y la protección reforzada.

El juez califica el despido como **procedente**, **improcedente** o **nulo** (art. 55 ET). La diferencia es decisiva: el improcedente se puede «pagar»; el nulo obliga a **readmitir**.

## 1. Sara, despedida sin carta
**Sara López** es técnica de laboratorio en **BioAnalítica SL** desde hace **3 años y 3 meses** (2400 € al mes). Su jefe la despide de palabra «por bajo rendimiento». Sin incumplimiento acreditado ni carta: ⛔ improcedente.

```scene
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
```
## 2. Sara está embarazada
Sara había comunicado su **embarazo** dos semanas antes. El despido de una trabajadora embarazada es **nulo**, salvo que se declare procedente por motivos no relacionados con el embarazo (art. 55.5.b ET). Aquí no hay ninguna causa: la nulidad prevalece.

```scene
embarazo EMB "Embarazo comunicado"
EMB -> D
focus D EMB
```
## Pregunta: ¿qué consecuencias tiene la nulidad?
```scene
verification off
focus D
```
- [ ] La empresa elige entre readmitir o pagar 33 días por año
  Esa opción es propia del despido improcedente.
- [x] Readmisión inmediata y abono de los salarios dejados de percibir
  Art. 55.6 ET: el despido nulo no se puede sustituir por una indemnización.
- [ ] Una indemnización de 45 días por año
  Los 45 días corresponden al régimen transitorio del improcedente.

### Respuesta
El despido nulo tiene por efecto la **readmisión inmediata** con abono de los **salarios de tramitación** (art. 55.6 ET). Si la sentencia llega 90 días después: 90 días × 78,90 € = **7101,37 €**. Se añade la indemnización por daños morales si se vulneró un derecho fundamental.

```scene
verification on
despido_nulo NUL "Despido nulo" dias=90
D -> NUL
focus D NUL
```
## 4. Sin embarazo: improcedente
Otra versión: Sara no está embarazada. El despido es **improcedente**. La empresa elige en 5 días (art. 56.1 ET); si paga, son **33 días por año**, prorrateados por meses, máximo 24 mensualidades:

33 × 3,25 = 107,25 días × 78,90 € = **8462,47 €**.

```scene
retirar EMB NUL
despido_improcedente IMP "Despido improcedente"
D -> IMP
focus D IMP
```
## 5. Si la empresa readmite
BioAnalítica opta por la **readmisión**: debe pagar los **salarios de tramitación** desde el despido hasta la notificación de la sentencia, aquí 60 días: 60 × 78,90 € = **4734,25 €**.

Si el trabajador es **representante** de los trabajadores, la opción le corresponde a él (art. 56.4 ET).

```scene
param IMP opcion=readmision dias=60
focus IMP
```
## 6. Una represalia: garantía de indemnidad
**Iván**, compañero de Sara, había demandado a la empresa por horas extra. Una semana después, la empresa lo despide alegando faltas de puntualidad, con carta. La proximidad temporal es un **indicio** de represalia: si la empresa no prueba una causa real y ajena, el despido es **nulo** por vulneración de la tutela judicial efectiva (garantía de indemnidad).

```scene
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
```
## 7. Resumen
| Calificación | Cuándo | Efecto |
|---|---|---|
| ✅ Procedente | causa acreditada y forma respetada | extinción; en el objetivo, 20 días por año |
| ⛔ Improcedente | causa no probada o forma incumplida | readmisión o 33 días por año (máx. 24 mensualidades) |
| ⛔ Nulo | discriminación, derechos fundamentales, embarazo y permisos protegidos | readmisión + salarios de tramitación |

> ⚠️ Contratos anteriores al 12/02/2012: 45 días por año por el tiempo anterior (DT 11.ª ET).

```scene
selection D
```