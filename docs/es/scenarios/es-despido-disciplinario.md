---
droit: es
---
# El despido disciplinario
> Incumplimiento grave y culpable, carta de despido, prescripción de las faltas y caducidad de la acción.

El despido disciplinario se basa en un **incumplimiento grave y culpable** del trabajador (art. 54 ET). Debe notificarse **por escrito**, con los **hechos** y la **fecha de efectos** (art. 55.1 ET). Si es procedente, extingue el contrato **sin indemnización**.

## 1. El caso de Raúl
**Raúl Gómez** es encargado de tienda en **Moda Norte SL** desde hace **8 años** (2000 € al mes). La empresa decide despedirlo.

Un despido sin causa ni forma: ⛔ improcedente.

```scene
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
```
## 2. Un incumplimiento grave y culpable
La auditoría descubre que Raúl aplicaba **descuentos falsos** a familiares: una **transgresión de la buena fe contractual** (art. 54.2.d ET), falta muy grave según el convenio.

Falta todavía la carta.

```scene
incumplimiento_grave FALTA "Descuentos falsos" dias_conocimiento=20
FALTA -> DESP
focus FALTA DESP
```
## 3. La carta de despido
La empresa entrega a Raúl una **carta** que describe los hechos (fechas, tickets, importes) y la **fecha de efectos**. El despido es **procedente** ✅: extinción sin indemnización ni salarios de tramitación.

```scene
carta_despido CARTA "Carta de despido"
hechos_fecha HF "Hechos concretos y fecha de efectos"
DESP -> CARTA
HF -> DESP
focus CARTA HF DESP
```
## Pregunta: la empresa conoció los hechos hace 75 días. ¿Puede despedir todavía?
La auditoría terminó en marzo; la carta llega en junio, **75 días** después.

```scene
verification off
focus FALTA DESP
```
- [ ] Sí: la falta es muy grave
  Incluso las faltas muy graves prescriben.
- [x] No: la falta muy grave ha prescrito a los 60 días
  Art. 60.2 ET: 60 días desde que la empresa tuvo conocimiento, y en todo caso 6 meses desde su comisión.
- [ ] Sí, si el convenio lo permite
  El convenio no puede alargar los plazos legales de prescripción.

### Respuesta
Las faltas prescriben (art. 60.2 ET): **leves a los 10 días, graves a los 20 y muy graves a los 60** desde que la empresa las conoció, y en todo caso a los **6 meses** de cometerse. Un despido basado en una falta prescrita es **improcedente**.

```scene
verification on
param FALTA dias_conocimiento=75
focus FALTA DESP
```
## 5. Raúl impugna: conciliación previa
Volvemos al caso en plazo. Raúl no está de acuerdo. Antes de demandar debe presentar la **papeleta de conciliación** ante el servicio administrativo (SMAC u órgano autonómico, art. 63 LRJS). Lo hace **12 días hábiles** después del despido: dentro del plazo de **20 días hábiles** (art. 59.3 ET).

```scene
param FALTA dias_conocimiento=20
smac SMAC "Servicio de conciliación"
conciliacion_previa CONC "Papeleta de conciliación" dias_habiles=12
demanda DEM "Demanda por despido"
CONC -> DEM
DESP -> CONC
focus CONC DEM
```
## 6. Si el juez no da por probados los hechos
En el juicio, la empresa no logra probar los descuentos. El despido se declara **improcedente**: en 5 días, la empresa opta entre **readmitir** a Raúl (con salarios de tramitación) o pagarle **33 días por año**, con un máximo de 24 mensualidades (art. 56.1 ET):

33 × 8 = 264 días × 65,75 € = **17.358,90 €**.

```scene
statut DESP improcedente "improcedente: hechos no probados en juicio"
despido_improcedente IMP "Despido improcedente"
DESP -> IMP
focus DESP IMP
```
## Pregunta: ¿y si Raúl hubiera presentado la papeleta a los 25 días hábiles?
```scene
verification off
focus CONC
```
- [ ] Nada cambia: el plazo es de un año
  Un año es el plazo de prescripción de otras acciones, no del despido.
- [x] La acción ha caducado: el despido queda firme
  El plazo de 20 días hábiles es de caducidad.
- [ ] El juez puede ampliar el plazo
  La caducidad no se interrumpe ni se amplía; solo se suspende con la papeleta.

### Respuesta
El plazo para impugnar el despido es de **20 días hábiles** desde el día siguiente al despido (art. 59.3 ET; art. 103 LRJS). Es un plazo de **caducidad**: pasado ese plazo, Raúl pierde la acción. La papeleta de conciliación solo lo **suspende**.

```scene
verification on
param CONC dias_habiles=25
focus CONC DEM
```
## 8. Resumen
| Requisito | Fuente |
|---|---|
| Incumplimiento **grave y culpable** | art. 54 ET |
| **Carta** con hechos y fecha de efectos | art. 55.1 ET |
| Faltas muy graves: prescripción a los **60 días** (6 meses máximo) | art. 60.2 ET |
| Impugnación: **20 días hábiles**, con conciliación previa | art. 59.3 ET, arts. 63 y 103 LRJS |
| Procedente: sin indemnización · improcedente: readmisión o 33 días por año | arts. 55.7 y 56 ET |

```scene
param CONC dias_habiles=12
retirar IMP
statut DESP auto
selection DESP
```