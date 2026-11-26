---
droit: es
---
# Contratos temporales tras la reforma de 2021
> Presunción de indefinido, causa precisa, regla de los 18 meses e indemnización de 12 días.

El RDL 32/2021 cambió el punto de partida: **el contrato se presume indefinido** (art. 15.1 ET). El contrato temporal solo cabe por **circunstancias de la producción** o por **sustitución**, con una causa precisa.

## 1. Un contrato «eventual» sin más
**Conservas del Cantábrico SL** contrata a **Hugo Sanz** «como eventual». No hay contrato escrito ni causa: ⛔ se presume indefinido.

```scene
empresa EMP "Conservas del Cantábrico SL" plantilla=60
trabajador HUGO "Hugo Sanz" antiguedad=0.5 salario=1800
contrato_temporal CT "Contrato eventual de Hugo"
EMP HUGO -> CT
focus CT
note CT "Ni escrito ni causa"
```
## 2. Por escrito y con una causa precisa
La empresa redacta el contrato: **6 meses** por el aumento de pedidos de la campaña de Navidad, con las circunstancias concretas que lo justifican. Ahora es válido.

```scene
forma_escrita ESC "Contrato escrito"
causa_temporal CAU "Campaña de Navidad: pedidos +40 %"
ESC CAU -> CT
param CT duracion=6
focus CT
```
## Pregunta: ¿puede el contrato durar 9 meses?
La campaña se alarga y la empresa quiere pactar 9 meses desde el inicio.

```scene
verification off
focus CT
```
- [ ] Sí, sin límite si hay causa
  La ley fija una duración máxima.
- [x] Solo si el convenio sectorial amplía la duración a un año
  El máximo legal es de 6 meses, ampliable a 1 año por convenio sectorial.
- [ ] No, nunca más de 3 meses
  Los 90 días al año corresponden a las situaciones ocasionales y previsibles.

### Respuesta
El contrato por circunstancias de la producción imprevisibles dura **6 meses como máximo**, ampliables hasta **un año** por el convenio colectivo sectorial (art. 15.2 ET). Por eso la tarjeta pasa a naranja: hay que comprobar el convenio.

```scene
verification on
param CT duracion=9
focus CT
```
## 4. El fin del contrato
Volvemos a los 6 meses. Al llegar el término, el contrato se extingue (art. 49.1.c ET). Hugo cobra una indemnización de **12 días por año de servicio**, en proporción:

12 × 0,5 años = 6 días × 59,18 € = **355,07 €**.

```scene
param CT duracion=6
fin_contrato_temporal FIN "Fin del contrato"
FIN -> CT
indemnizacion_fin_contrato IND "12 días por año"
prestacion_desempleo PRE "Prestación por desempleo"
FIN -> IND PRE
focus FIN IND
```
## 5. La regla de los 18 meses
Imagine ahora que Hugo encadena contratos por circunstancias de la producción: **20 meses** trabajados en los últimos 24. Más de **18 meses en un periodo de 24** convierten al trabajador en **fijo** (art. 15.5 ET).

```scene
retirar FIN IND PRE
param CT meses_acumulados=20
focus CT
note CT "20 meses en 24: fijo"
```
## 6. La sustitución
**Ana** sustituye a Lola durante su permiso por nacimiento. El contrato de **sustitución** debe indicar el nombre de la persona sustituida y la causa. A su fin, **no** hay indemnización de 12 días: el símbolo ⊘ lo muestra.

```scene
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
```
## 7. La alternativa: el fijo-discontinuo
Para trabajos de **temporada** que se repiten cada año (la campaña de la anchoa, por ejemplo), la reforma empuja hacia el **contrato fijo-discontinuo** (art. 16 ET): indefinido, por escrito, con llamamiento cada temporada.

```scene
trabajador LEO "Leo"
fijo_discontinuo FD "Fijo-discontinuo: campaña de la anchoa"
forma_escrita ESC3 "Contrato escrito"
ESC3 -> FD
EMP LEO -> FD
focus FD
```
## 8. Resumen
| Contrato | Causa | Duración | Al terminar |
|---|---|---|---|
| ⏳ Circunstancias de la producción | aumento imprevisible / ocasional previsible | 6 meses (1 año por convenio) / 90 días al año | 12 días por año |
| 🔁 Sustitución | persona con reserva de puesto | hasta la reincorporación | sin indemnización |
| 🌗 Fijo-discontinuo | trabajos de temporada o intermitentes | indefinido | llamamiento |

Más de **18 meses en 24**: fijo.

```scene
selection CT
```