---
droit: es
---
# Cuestionario: la extinción del contrato en España
> Siete preguntas rápidas para repasar indemnizaciones, plazos y pactos.

Un cuestionario de repaso: el lienzo ilustra cada situación. Elija la respuesta de la clase y luego revélela.

## Pregunta: despido objetivo procedente tras 5 años, con 1825 € al mes. ¿Indemnización?
```scene
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
```
- [ ] 3000 €
  Serían 10 días por año.
- [x] 6000 €
  20 días × 5 años = 100 días × 60 € de salario diario.
- [ ] 9900 €
  Son los 33 días del despido improcedente.

### Respuesta
Salario diario: 1825 × 12 / 365 = **60 €**. Despido objetivo: **20 días por año**, máximo 12 mensualidades: 100 días × 60 € = **6000 €**.

```scene
verification on
```
## Pregunta: el mismo despido, declarado improcedente tras 10 años. ¿Indemnización?
```scene
param T antiguedad=10
retirar IND
statut DO improcedente "declarado improcedente"
despido_improcedente IMP "Despido improcedente"
DO -> IMP
verification off
focus IMP
```
- [ ] 12.000 €
  Serían 20 días por año.
- [x] 19.800 €
  33 días × 10 años = 330 días × 60 €.
- [ ] 27.000 €
  Serían 45 días por año, el régimen anterior a 2012.

### Respuesta
Improcedente: **33 días por año**, máximo **24 mensualidades**: 330 días × 60 € = **19.800 €** (tope: 43.800 €).

```scene
verification on
```
## Pregunta: ¿cobra el paro quien firma una extinción por mutuo acuerdo?
```scene
effacer
extincion_mutuo_acuerdo MA "Mutuo acuerdo"
consentimiento_libre CL "Consentimiento libre"
forma_escrita ESC "Acuerdo escrito"
CL ESC -> MA
prestacion_desempleo PREST "Prestación por desempleo"
MA -> PREST
verification off
focus PREST
```
- [ ] Sí, como cualquier cese
  Solo los ceses involuntarios abren la prestación.
- [x] No: no es situación legal de desempleo
  Art. 267 LGSS.

### Respuesta
El mutuo acuerdo, como la dimisión, **no** es situación legal de desempleo.

```scene
verification on
```
## Pregunta: un pacto de no competencia sin compensación económica es…
```scene
effacer
pacto_no_competencia NC "No competencia (6 meses)" duracion=6
interes_efectivo IE "Interés efectivo"
IE -> NC
verification off
focus NC
```
- [ ] Válido si dura menos de 6 meses
  La duración no sustituye a la compensación.
- [x] Nulo
  Art. 21.2.b ET: compensación económica adecuada.

### Respuesta
Interés efectivo **y** compensación adecuada: sin compensación, el pacto es **nulo**.

```scene
verification on
```
## Pregunta: 8 meses de prueba para una ingeniera, sin convenio que diga nada. ¿Válido?
```scene
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
```
- [ ] Sí, es técnica titulada
  El máximo para técnicos titulados es de 6 meses.
- [x] No, en lo que exceda de 6 meses
  Art. 14.1 ET.
- [ ] No, el máximo es de 2 meses
  Los 2 meses son para los demás trabajadores.

### Respuesta
Técnicos titulados: **6 meses**; los demás: 2 meses (3 en empresas de menos de 25 trabajadores), salvo convenio.

```scene
verification on
```
## Pregunta: ¿de cuánto tiempo dispone el trabajador para impugnar su despido?
```scene
effacer
despido_disciplinario D "Despido"
conciliacion_previa CONC "Papeleta de conciliación" dias_habiles=22
D -> CONC
verification off
focus CONC
```
- [ ] 1 año
  Es la prescripción de otras acciones derivadas del contrato.
- [x] 20 días hábiles
  Plazo de caducidad (art. 59.3 ET).
- [ ] 30 días naturales
  El plazo se cuenta en días hábiles.

### Respuesta
**20 días hábiles**, de caducidad: a los 22 días hábiles, la acción ha caducado.

```scene
verification on
```
## Pregunta: 20 meses en los últimos 24 con contratos por circunstancias de la producción. ¿Resultado?
```scene
effacer
contrato_temporal CT "Contratos eventuales" duracion=6 meses_acumulados=20
forma_escrita ESC "Por escrito"
causa_temporal CAU "Causa precisa"
ESC CAU -> CT
verification off
focus CT
```
- [ ] Nada, si cada contrato tiene su causa
  La regla de los 18 meses se aplica aunque cada contrato sea válido.
- [x] El trabajador adquiere la condición de fijo
  Más de 18 meses en un periodo de 24 (art. 15.5 ET).

### Respuesta
Más de **18 meses en 24** con dos o más contratos por circunstancias de la producción: el trabajador pasa a ser **fijo**.

```scene
verification on
```