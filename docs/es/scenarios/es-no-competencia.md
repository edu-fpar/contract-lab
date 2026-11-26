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