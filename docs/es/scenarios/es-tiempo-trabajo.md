---
droit: es
---
# Tiempo de trabajo: jornada, horas extra, vacaciones y desconexión
> 40 horas de promedio, registro diario, 80 horas extra al año, 30 días de vacaciones y tiempo parcial.

El tiempo de trabajo concentra muchas reglas imperativas del Estatuto. La Inspección de Trabajo vigila especialmente el **registro de jornada**.

## 1. La jornada de Nuria
**Nuria Gil** es consultora en **Consultora Atlas SL**, con una jornada de **40 horas semanales** y 2600 € al mes. La jornada máxima ordinaria es de **40 horas de promedio en cómputo anual** (art. 34.1 ET).

La tarjeta está en naranja: falta el **registro diario** de jornada (art. 34.9 ET).

> ⚠️ La reducción a 37,5 horas fue rechazada por el Congreso en 2025: verifique la situación actual.

```scene
empresa EMP "Consultora Atlas SL" plantilla=70
trabajador NUR "Nuria Gil" antiguedad=3 salario=2600
contrato_indefinido CT "Contrato de Nuria"
informacion_elementos INF "Contrato escrito"
INF -> CT
EMP NUR -> CT
jornada JOR "40 horas semanales" horas_semanales=40
CT -> JOR
focus JOR
```
## 2. El registro diario
Atlas implanta una aplicación de fichaje con la hora de inicio y de fin de cada jornada, conservada **cuatro años** a disposición de Nuria, de los representantes y de la Inspección.

```scene
registro_jornada REG "Fichaje en la aplicación"
EMP -> REG
REG -> JOR
focus JOR REG
```
## Pregunta: en un año de mucho trabajo, Nuria hace 100 horas extra pagadas. ¿Es posible?
```scene
verification off
horas_extra HE "Horas extraordinarias" horas_anuales=100
CT -> HE
focus HE
```
- [ ] Sí, si se pagan
  El pago no elimina el límite legal.
- [x] No: el máximo es de 80 horas extraordinarias al año
  Salvo las compensadas con descanso en los 4 meses siguientes.
- [ ] Sí, con el acuerdo de Nuria
  El límite es imperativo.

### Respuesta
Las horas extraordinarias no pueden superar **80 al año** (art. 35.2 ET). No computan las compensadas con **descanso** dentro de los cuatro meses siguientes. Atlas compensa 20 horas con descanso: quedan 80.

```scene
verification on
param HE horas_anuales=80
focus HE
```
## 4. Las vacaciones
El contrato de Nuria prevé **25 días naturales** de vacaciones: es inferior al mínimo legal de **30 días naturales** (art. 38.1 ET). La cláusula es nula en lo que reduce ese mínimo; la empresa la corrige.

```scene
vacaciones VAC "25 días de vacaciones" dias=25
CT -> VAC
focus VAC
note VAC "25 < 30 días naturales"
```
## 5. La desconexión digital
La directora envía correos a las 23 h y exige respuesta inmediata. Nuria tiene **derecho a la desconexión digital** fuera de su tiempo de trabajo (art. 20 bis ET; art. 88 LOPDGDD): la obligación de la empresa queda **violada** ⚡.

```scene
param VAC dias=30
renombrar VAC "30 días de vacaciones"
dignidad_intimidad DIG "Intimidad y desconexión digital"
EMP -> DIG
incumplimiento CORREOS "Correos a las 23 h exigiendo respuesta"
CORREOS -> DIG
focus DIG CORREOS
```
## Pregunta: Atlas contrata a Bruno a media jornada por 700 € al mes. ¿Es suficiente?
El contrato a tiempo parcial es escrito, al **50 %** de la jornada, por 700 € al mes con pagas prorrateadas.

```scene
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
```
- [ ] Sí: el SMI no se aplica a tiempo parcial
  Se aplica, en proporción a la jornada.
- [x] No: 8400 € al año no llegan a la mitad del SMI (8547 €)
  700 × 12 = 8400 €; 17.094 € × 50 % = 8547 €.
- [ ] Sí, porque supera la mitad de 1221 €
  Hay que comparar en cómputo anual, con las 14 pagas.

### Respuesta
A tiempo parcial, el SMI se percibe **en proporción a la jornada**: 17.094 € × 50 % = **8547 €** al año. Bruno cobra 700 × 12 = **8400 €**: le faltan 147 €.

> ⚠️ Cifras del SMI 2026, a verificar.

```scene
verification on
focus SAL2
```
## 7. Resumen
| Regla | Límite | Fuente |
|---|---|---|
| ⏱️ Jornada ordinaria | 40 h de promedio anual, registro diario | art. 34 ET |
| 🕐 Horas extra | 80 al año | art. 35.2 ET |
| 🏖️ Vacaciones | 30 días naturales | art. 38.1 ET |
| 🌓 Tiempo parcial | por escrito; SMI proporcional | art. 12 ET |
| 📵 Desconexión digital | fuera del tiempo de trabajo | art. 20 bis ET |

```scene
selection JOR
```