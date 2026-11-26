---
droit: es
---
# Construir un contrato de trabajo
> Partes, contrato indefinido, información escrita, salario mínimo, jornada y obligaciones básicas.

Construimos el contrato de **Lucía Martín**, contratada como analista de datos por **Datalia Soluciones SL** (40 trabajadores). Cada elemento es una tarjeta; el marco «📄» muestra lo que contiene el contrato.

Los veredictos aparecen en las tarjetas: ✅ válido, ⚠️ con riesgo, ⛔ nulo o irregular. Las **insignias** bajo una tarjeta son sus condiciones.

## 1. Las partes
Lucía presta servicios retribuidos **por cuenta ajena**, dentro del ámbito de organización y dirección de la empresa (art. 1.1 ET): voluntariedad, ajenidad, dependencia y retribución. Es **trabajadora**; Datalia es la **empresa**.

```scene
empresa EMP "Datalia Soluciones SL" plantilla=40
trabajador LUC "Lucía Martín" antiguedad=0 salario=2100 categoria=tecnico_titulado
focus EMP LUC
```
## 2. Un contrato indefinido
Desde la reforma laboral de 2021, el contrato **se presume concertado por tiempo indefinido** (art. 15.1 ET). A jornada completa puede incluso celebrarse de palabra.

Pero si la relación dura más de cuatro semanas, la empresa debe **informar por escrito** de los elementos esenciales del contrato (art. 8.5 ET): la tarjeta está en naranja.

```scene
contrato_indefinido CT "Contrato de Lucía"
EMP LUC -> CT
focus CT
note CT "Sin información escrita"
```
## 3. Información escrita y contenido básico
Datalia entrega a Lucía el contrato escrito con sus elementos esenciales: la tarjeta pasa a verde.

| Elemento | Aquí |
|---|---|
| 💶 Salario | 2100 € brutos al mes, pagas prorrateadas (25.200 € al año) |
| ⏱️ Jornada | 40 horas semanales |
| 🏖️ Vacaciones | 30 días naturales |

La tarjeta del salario compara con el **salario mínimo interprofesional**: 1221 € al mes en 14 pagas, es decir 17.094 € al año.

> ⚠️ El SMI se fija cada año por real decreto: compruebe la cifra de 2026.

```scene
informacion_elementos INF "Contrato escrito con los elementos esenciales"
INF -> CT
salario SAL "2100 € al mes"
jornada JOR "40 horas semanales" horas_semanales=40
vacaciones VAC "30 días naturales" dias=30
CT -> SAL JOR VAC
focus INF SAL
```
## 4. El registro de jornada
La jornada respeta el máximo legal de **40 horas semanales de promedio** en cómputo anual (art. 34.1 ET). Pero la tarjeta está en naranja: la empresa debe **registrar diariamente** la hora de inicio y de fin de cada jornada y conservar el registro cuatro años (art. 34.9 ET).

Datalia instala un sistema de fichaje: la jornada pasa a verde.

```scene
registro_jornada REG "Fichaje diario"
EMP -> REG
REG -> JOR
focus JOR REG
```
## Pregunta: ¿puede Datalia pagar 1300 € al mes, en 12 pagas, a un auxiliar a jornada completa?
Datalia contrata también a **Óscar**, auxiliar administrativo a jornada completa, por 1300 € brutos al mes en 12 pagas, sin pagas extraordinarias.

```scene
verification off
trabajador OSC "Óscar" antiguedad=0
contrato_indefinido CT2 "Contrato de Óscar"
informacion_elementos INF2 "Contrato escrito"
INF2 -> CT2
EMP OSC -> CT2
salario SAL2 "1300 € × 12" salario=1300
CT2 -> SAL2
focus SAL2
```
- [ ] Sí: 1300 € superan los 1221 € del SMI
  El SMI de 1221 € se cobra en 14 pagas: hay que comparar en cómputo anual.
- [x] No: 15.600 € al año no alcanzan los 17.094 € del SMI
  1300 × 12 = 15.600 €, por debajo de 1221 × 14 = 17.094 €.
- [ ] Sí, si el convenio lo permite
  El convenio puede mejorar el SMI, nunca rebajarlo.

### Respuesta
El SMI se garantiza **en cómputo anual**: 1221 € × 14 pagas = **17.094 €**. Óscar cobra 1300 € × 12 = **15.600 €**: la empresa le debe las diferencias (art. 27 ET).

```scene
verification on
focus SAL2
note SAL2 "15.600 € < 17.094 €"
```
## 6. Las obligaciones básicas
El contrato crea obligaciones recíprocas (arts. 4, 5 y 20 ET):

- **empresa**: pagar puntualmente el salario, dar ocupación efectiva, proteger la seguridad y la salud (Ley 31/1995);
- **ambas partes**: la **buena fe** (art. 20.2 ET);
- **trabajadora**: diligencia y cumplimiento de las órdenes dadas en el ejercicio regular del poder de dirección.

```scene
retirar OSC CT2 INF2 SAL2
pagar_salario PS "Pagar el salario"
ocupacion_efectiva OE "Ocupación efectiva"
seguridad_salud SS "Seguridad y salud"
buena_fe BF "Buena fe"
diligencia DIL "Diligencia"
obediencia OB "Cumplir las órdenes"
EMP -> PS OE SS BF
LUC -> BF DIL OB
focus BF
```
## 7. Resumen
- El contrato **se presume indefinido**; la **información escrita** es obligatoria si dura más de cuatro semanas.
- El salario no puede bajar del **SMI en cómputo anual** ni de las tablas del convenio.
- Jornada máxima de **40 horas** de promedio, con **registro diario**.
- La **buena fe** rige la ejecución del contrato para ambas partes.

```scene
selection SAL
```