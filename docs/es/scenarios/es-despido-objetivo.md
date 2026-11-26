---
droit: es
---
# El despido objetivo
> Causas económicas, carta, indemnización de 20 días puesta a disposición, preaviso de 15 días y umbrales del despido colectivo.

El despido por **causas objetivas** (art. 52 ET) no reprocha nada al trabajador. A cambio, la ley exige una forma estricta (art. 53.1 ET): **carta con la causa**, **indemnización de 20 días por año** puesta a disposición al mismo tiempo y **15 días de preaviso**.

## 1. Elena y la crisis de Gráficas Levante
**Elena Torres** es administrativa en **Gráficas Levante SA** (120 trabajadores) desde hace **6 años y medio**, con 2100 € al mes. La empresa pierde dinero y decide amortizar su puesto.

```scene
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
```
## 2. Una causa económica acreditada
La empresa acumula **pérdidas** y tres trimestres consecutivos de caída de ventas: una **causa económica** del art. 51.1 ET, aplicable al despido objetivo por el art. 52.c.

```scene
causas_etop CAUSA "Pérdidas y caída de ventas"
CAUSA -> DO
focus CAUSA DO
```
## 3. La forma del art. 53 ET
La empresa entrega a Elena la **carta** con la causa, le **pone a disposición** la indemnización en el mismo acto y respeta un **preaviso de 15 días**. El despido es **procedente** ✅.

Indemnización: 20 días × 6,5 años = 130 días × 69,04 € = **8975,34 €** (tope: 12 mensualidades, 25.200 €).

```scene
carta_despido CARTA "Carta con la causa económica"
puesta_disposicion PD "Transferencia el mismo día"
preaviso PRE "Preaviso de 15 días" dias=15
DO -> CARTA
CARTA -> PD
PD -> PRE
indemnizacion_despido IND "Indemnización: 20 días por año"
DO -> IND
focus DO IND
```
## Pregunta: la carta solo da 10 días de preaviso. ¿Es improcedente el despido?
```scene
verification off
focus PRE DO
```
- [ ] Sí: falta un requisito del art. 53.1
  La ley trata el preaviso de forma distinta a la carta y a la indemnización.
- [x] No, pero la empresa debe pagar los 5 días de preaviso que faltan
  La falta de preaviso no determina la improcedencia (art. 53.4 ET).
- [ ] No, y no se debe nada
  Los salarios del preaviso omitido se deben.

### Respuesta
La no concesión del preaviso **no hace improcedente** el despido, pero la empresa debe abonar los **salarios de los días que faltan** (art. 53.4 ET): 5 días × 69,04 € = **345,21 €**. La tarjeta pasa a naranja.

```scene
verification on
param PRE dias=10
renombrar PRE "Preaviso de 10 días"
focus PRE DO
```
## 5. Sin poner la indemnización a disposición
Otra versión: la carta dice que la indemnización «se abonará en el finiquito». La puesta a disposición **simultánea** es un requisito: el despido es **improcedente**, y la indemnización pasa a **33 días por año** (máximo 24 mensualidades):

33 × 6,5 = 214,5 días × 69,04 € = **14.809,32 €**.

```scene
param PRE dias=15
renombrar PRE "Preaviso de 15 días"
retirar PD
CARTA -> PRE
despido_improcedente IMP "Despido improcedente"
DO -> IMP
focus DO IMP
```
## Pregunta: Gráficas Levante despide así a 14 personas en 90 días. ¿Problema?
La empresa tiene 120 trabajadores y hace 14 despidos objetivos individuales por la misma causa en tres meses.

```scene
verification off
retirar IMP
puesta_disposicion PD "Transferencia el mismo día"
CARTA -> PD
PD -> PRE
param DO afectados=14
focus DO
```
- [ ] Ninguno: cada despido es individual
  Lo que cuenta es el número de extinciones en 90 días.
- [x] Sí: supera el umbral del despido colectivo, los despidos son nulos
  Con 120 trabajadores, el umbral es el 10 % de la plantilla: 12 extinciones.
- [ ] Solo si son más de 30
  Los 30 trabajadores son el umbral de las empresas de más de 300.

### Respuesta
En 90 días, el despido es **colectivo** a partir de 10 trabajadores (empresas de menos de 100), el **10 %** (de 100 a 300) o 30 (más de 300) (art. 51.1 ET). Para 120 trabajadores: **12**. Hacer 14 despidos objetivos para eludir el procedimiento colectivo es un **fraude de ley**: los despidos son **nulos**.

```scene
verification on
focus DO
```
## 7. El despido colectivo
La vía correcta: un **despido colectivo** con **periodo de consultas** con los representantes (máximo 30 días) y comunicación a la **autoridad laboral**. La indemnización mínima sigue siendo de 20 días por año, máximo 12 mensualidades.

```scene
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
```
## 8. Resumen
| Requisito del despido objetivo | Si falta |
|---|---|
| Causa (ETOP, ineptitud…) | improcedente |
| Carta con la causa | improcedente |
| Indemnización de 20 días puesta a disposición | improcedente |
| Preaviso de 15 días | se deben los salarios del preaviso |
| Por debajo de los umbrales del art. 51.1 | nulo (fraude) |

```scene
selection DO
```