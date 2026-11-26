---
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

```scene
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
```
## 2. Las obligaciones de Tomás
Tomás debe cumplir con **diligencia** y **buena fe**, seguir las **órdenes** dadas en el ejercicio regular del poder de dirección, observar la **prevención de riesgos** y **no concurrir** con la empresa (art. 5 ET).

```scene
buena_fe BF "Buena fe"
diligencia DIL "Diligencia"
obediencia OB "Cumplir las órdenes"
no_concurrencia NCO "No concurrencia desleal"
prevencion_trabajador PRL "Usar los equipos de protección"
TOM -> BF DIL OB NCO PRL
EMP -> BF
focus BF NCO
```
## 3. Tomás repara coches de clientes los fines de semana
Tomás atiende en su garaje, los sábados, a clientes del taller, a precios más bajos. Es una **concurrencia desleal**: viola su deber de no competir y la buena fe ⚡.

```scene
transgresion_buena_fe TBF "Desvía clientes del taller"
TBF -> NCO BF
focus TBF NCO BF
```
## Pregunta: ¿puede Talleres Ibéricos despedir a Tomás?
```scene
verification off
despido_disciplinario DESP "Despido de Tomás"
EMP -> DESP
DESP -> CT
TBF -> DESP
focus DESP
```
- [ ] No: lo que hace en su tiempo libre es asunto suyo
  El pluriempleo es libre, salvo que suponga concurrencia desleal.
- [x] Sí: es una transgresión de la buena fe, con carta de despido
  Art. 54.2.d ET; la carta debe precisar los hechos y la fecha de efectos.
- [ ] Sí, sin carta, porque la falta es evidente
  La forma escrita es siempre obligatoria.

### Respuesta
La **transgresión de la buena fe contractual** es causa de despido disciplinario (art. 54.2.d ET). Con una **carta** que detalla los hechos y la fecha de efectos, el despido es **procedente**.

```scene
verification on
carta_despido CARTA "Carta de despido"
hechos_fecha HF "Clientes, fechas y facturas"
DESP -> CARTA
HF -> DESP
focus DESP
```
## 5. Y si es la empresa la que incumple
Otra situación: el taller no entrega a **Lidia**, compañera de Tomás, los equipos de protección y le retrasa el salario. La empresa **viola** sus obligaciones ⚡: Lidia puede pedir la **extinción del contrato** con la indemnización del despido improcedente (art. 50 ET).

```scene
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
```
## 6. Resumen
| Parte | Deberes principales | Si incumple |
|---|---|---|
| 🏢 Empresa | salario, ocupación efectiva, seguridad, dignidad | extinción del art. 50, reclamaciones, sanciones de la Inspección |
| 👤 Trabajador | buena fe, diligencia, obediencia, no concurrencia | sanción o despido disciplinario |

```scene
selection BF
```