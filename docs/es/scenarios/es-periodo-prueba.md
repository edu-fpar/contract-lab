---
droit: es
---
# El periodo de prueba
> Pacto escrito, duraciones máximas del art. 14 ET y desistimiento.

El periodo de prueba permite a ambas partes comprobar si la relación funciona. Durante la prueba, cualquiera de ellas puede **desistir** sin causa, sin preaviso y sin indemnización, salvo pacto (art. 14.2 ET). Por eso la ley lo encuadra.

## 1. Javier entra en el almacén
**Javier Ruiz** es contratado como mozo de almacén por **Logística Ebro SL**, una empresa de **18 trabajadores**, con un contrato indefinido escrito y 1500 € al mes.

```scene
empresa EMP "Logística Ebro SL" plantilla=18
trabajador JAV "Javier Ruiz" antiguedad=0 salario=1500 categoria=otro
contrato_indefinido CT "Contrato de Javier"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP JAV -> CT
focus JAV CT
```
## 2. Una prueba de palabra
El encargado le dice a Javier que estará «seis meses a prueba». Nada consta por escrito.

El periodo de prueba **debe pactarse por escrito** (art. 14.1 ET): sin pacto escrito, no hay periodo de prueba.

```scene
periodo_prueba PRU "Prueba de 6 meses" duracion=6
CT -> PRU
focus PRU
note PRU "Pactada solo de palabra"
```
## 3. Por escrito… pero demasiado larga
La empresa añade la cláusula al contrato. La insignia «Por escrito» pasa a verde, pero la tarjeta sigue en rojo: la duración supera el máximo legal.

```scene
forma_escrita ESC "Cláusula escrita"
ESC -> PRU
focus PRU
```
## Pregunta: ¿cuál es la duración máxima del periodo de prueba de Javier?
El convenio colectivo no dice nada. Javier no es técnico titulado y la empresa tiene 18 trabajadores.

```scene
verification off
focus PRU
```
- [ ] 2 meses
  Es el máximo general, pero hay una regla para las empresas pequeñas.
- [x] 3 meses
  En empresas de menos de 25 trabajadores, los trabajadores que no son técnicos titulados pueden tener hasta 3 meses.
- [ ] 6 meses
  Solo para los técnicos titulados.

### Respuesta
A falta de convenio, el art. 14.1 ET fija **6 meses** para los técnicos titulados y **2 meses** para los demás trabajadores, **3 meses** en las empresas de **menos de 25 trabajadores**. Lo pactado de más es nulo: la prueba de Javier queda en **3 meses**.

```scene
verification on
param PRU duracion=3
renombrar PRU "Prueba de 3 meses"
focus PRU
```
## 5. La empresa desiste al segundo mes
Al cabo de **dos meses**, Logística Ebro comunica a Javier que no supera la prueba. Es un **desistimiento**: sin causa, sin preaviso y sin indemnización. Javier cobra su finiquito (salario pendiente, parte de las pagas, vacaciones).

```scene
param JAV antiguedad=0.17
desistimiento_prueba DES "No supera la prueba"
EMP -> DES
DES -> CT
finiquito FIN "Finiquito"
DES -> FIN
focus DES
```
## Pregunta: ¿y si la empresa «desiste» al cuarto mes?
Imagine que la carta llega **cuatro meses** después del inicio.

```scene
verification off
param JAV antiguedad=0.34
focus DES
```
- [ ] Sigue siendo un desistimiento válido
  El periodo de prueba de Javier terminó al tercer mes.
- [x] Es un despido: el periodo de prueba ya había terminado
  Pasado el plazo, la empresa necesita una causa y un procedimiento.
- [ ] Javier debe indemnizar a la empresa
  Nada de eso: es la empresa la que extingue el contrato.

### Respuesta
Superado el periodo de prueba, el contrato despliega todos sus efectos. Una extinción sin causa ni carta es un **despido improcedente** (33 días por año): la tarjeta pasa a rojo.

```scene
verification on
note DES "Fuera de plazo: es un despido"
```
## 7. Una trabajadora embarazada
Volvemos al segundo mes, pero ahora con **Marta**, compañera de Javier, embarazada. La resolución del periodo de prueba **por razón de embarazo es nula**, salvo que la empresa acredite motivos ajenos al embarazo (art. 14.2 ET).

La tarjeta pasa a naranja: la empresa deberá probar que su decisión no tiene nada que ver con el embarazo.

```scene
param JAV antiguedad=0.17
renombrar JAV "Marta"
embarazo EMB "Marta está embarazada"
EMB -> DES
focus DES EMB
```
## 8. Resumen
| Regla | Fuente |
|---|---|
| Pacto **por escrito** | art. 14.1 ET |
| Máximo: 6 meses técnicos titulados, 2 meses los demás (3 si menos de 25 trabajadores) | art. 14.1 ET, salvo convenio |
| Nulo si ya desempeñó **las mismas funciones** en la empresa | art. 14.1 ET |
| Desistimiento libre, sin preaviso ni indemnización | art. 14.2 ET |
| Nulo por razón de **embarazo** | art. 14.2 ET |

```scene
selection PRU
```