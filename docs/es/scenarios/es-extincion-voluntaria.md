---
droit: es
---
# Dimisión, mutuo acuerdo y extinción por incumplimiento del empresario
> Cuando el trabajador quiere irse: preaviso, prestación por desempleo y el art. 50 ET.

El trabajador puede poner fin al contrato de varias maneras. La diferencia está en dos preguntas: ¿hay **indemnización**? ¿Queda en **situación legal de desempleo** para cobrar el paro?

## 1. Diego dimite
**Diego Navarro** es camarero en **Hostelería Sol SL** desde hace **4 años** (1600 € al mes). Encuentra otro trabajo y **dimite** (art. 49.1.d ET), con el preaviso de **15 días** que fija su convenio.

Sin indemnización y **sin prestación por desempleo**: la dimisión no es situación legal de desempleo.

```scene
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
```
## Pregunta: si Diego y la empresa firman una «baja pactada», ¿cobrará el paro?
```scene
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
```
- [ ] Sí: el acuerdo es voluntario para ambos
  Precisamente: el cese es voluntario para el trabajador.
- [x] No: el mutuo acuerdo no es situación legal de desempleo
  A diferencia de la ruptura convencional francesa.
- [ ] Sí, si la empresa le paga una indemnización
  La indemnización pactada no cambia la naturaleza del cese.

### Respuesta
La extinción por **mutuo acuerdo** (art. 49.1.a ET) es válida sin indemnización legal, pero **no da derecho a la prestación por desempleo** (art. 267 LGSS). Por eso, en la práctica, muchas salidas pactadas se formalizan como un **despido reconocido improcedente** en conciliación.

```scene
verification on
focus MA PREST
```
## 3. La empresa deja de pagar
Otra situación: desde hace tres meses Hostelería Sol paga el salario con **retrasos continuados**. Diego puede pedir al juez la **extinción del contrato** por incumplimiento grave del empresario (art. 50.1.b ET), con la **indemnización del despido improcedente**:

33 × 4 = 132 días × 52,60 € = **6943,56 €**. Y queda en situación legal de desempleo.

```scene
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
```
## Pregunta: ¿puede Diego dejar de ir a trabajar y reclamar después?
```scene
verification off
focus EXT DEM
```
- [ ] Sí: el impago le autoriza a irse
  Si se va sin más, el juez puede tratarlo como una dimisión.
- [x] En general no: demanda y sigue trabajando hasta la sentencia
  La extinción del art. 50 la declara el juez.
- [ ] Sí, enviando un burofax
  Un burofax no extingue el contrato por sí solo.

### Respuesta
La extinción del art. 50 la **pronuncia el juez**. Como regla general, el trabajador **sigue prestando servicios** mientras se tramita el proceso; solo en situaciones especialmente graves (acoso, riesgo para la salud o la dignidad) se admite que deje de trabajar al presentar la demanda.

```scene
verification on
focus DEM
```
## 5. Una modificación sustancial del horario
Otra variante: la empresa pasa a Diego del turno de mañana al de noche (art. 41 ET). Si se siente perjudicado, puede **rescindir** el contrato con **20 días por año**, máximo **9 mensualidades** (art. 41.3 ET):

20 × 4 = 80 días × 52,60 € = **4208,22 €**.

```scene
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
```
## 6. El finiquito
En todos los casos, la empresa entrega el **finiquito**: salario pendiente, parte proporcional de las pagas extra y **vacaciones no disfrutadas**, que se pagan en dinero al terminar el contrato (art. 38.1 ET). Diego tiene 8 días pendientes: 8 × 52,60 € = **420,82 €**.

```scene
finiquito FIN "Finiquito"
vacaciones_no_disfrutadas VAC "8 días de vacaciones" dias=8
RES -> FIN
FIN -> VAC
focus FIN VAC
```
## 7. Resumen
| Extinción | Iniciativa | Indemnización | Paro |
|---|---|---|---|
| 🚪 Dimisión | trabajador | no | no |
| 🤝 Mutuo acuerdo | ambos | la pactada | no |
| 🚩 Art. 50 (incumplimiento del empresario) | trabajador, ante el juez | 33 días por año, máx. 24 mensualidades | sí |
| 🔧 Art. 41 (modificación sustancial) | trabajador | 20 días por año, máx. 9 mensualidades | sí |

```scene
selection RES
```