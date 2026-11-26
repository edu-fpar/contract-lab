# Modo cine

El modo cine 🎬 reproduce un **escenario**: en cada paso el lienzo cobra vida (tarjetas que aparecen, vínculos que se trazan, pastillas que se ponen en verde, bocadillos y resaltados) y el panel de la derecha muestra el comentario.

## Cargar un escenario

Botón **📚 Escenarios**:
- elija un escenario de la biblioteca ([lista](escenarios.md)); en español, la biblioteca muestra los escenarios de derecho español; la casilla «Mostrar también los escenarios en otros idiomas» añade los escenarios franceses e ingleses;
- o **pegue** el markdown facilitado por un colega o por una IA y pulse «▶ Iniciar»;
- o **abra un archivo** `.md`. También se puede soltar directamente sobre la ventana.

## Compartir un enlace

El taller está en línea en **https://edu-fpar.github.io/contract-lab/es/**. El botón **🔗 Compartir** ofrece tres enlaces para copiar: al **paso mostrado**, al **principio del escenario** o a la **biblioteca**. La elección de idioma en la parte superior del menú fija el idioma de los enlaces (parámetro `lang=`): los estudiantes abren el taller en ese idioma, sea cual sea el de su navegador. Durante la reproducción, la dirección del navegador sigue el paso en curso, así que también se puede copiar directamente.

| Enlace | Abre |
|---|---|
| `…/contract-lab/es/?scenarios` | la biblioteca de escenarios, en español |
| `…/contract-lab/es/?scenario=es-no-competencia` | un escenario integrado, en su primer paso |
| `…/contract-lab/es/?scenario=es-no-competencia&etape=4` | ese escenario, directamente en el paso 4 (la pregunta) |
| `…/contract-lab/?lang=es&scenario=es-despido-objetivo` | la forma larga: la página `/es/` equivale a `?lang=es` y conserva los demás parámetros |
| `…/contract-lab/?md=direccion-del-archivo.md` | un escenario publicado como archivo |
| `…/contract-lab/#md=…` | un escenario personal (pegado o generado por una IA), cuyo texto va codificado en el propio enlace |

Para un escenario personal, el enlace contiene el texto comprimido del escenario tras el `#`: no se envía a ningún servidor y funciona sin publicar nada. Con un escenario muy largo, el enlace puede resultar demasiado largo para algunas aplicaciones de mensajería: publique entonces el archivo `.md` y use `?md=`. En todos los casos, `&etape=N` elige el paso de llegada (la introducción, si el escenario la tiene, cuenta como paso 1).

## Exportar a SCORM (Moodle)

El botón **📦 SCORM** produce un paquete `.zip` para subirlo a Moodle (actividad «Paquete SCORM») o a cualquier plataforma compatible con SCORM. El paquete contiene el taller y el escenario mostrado, incluido uno personal o modificado: los estudiantes lo siguen por su cuenta, paso a paso, sin conectarse al sitio.

- **Versión**: SCORM 1.2 (recomendada para Moodle) o SCORM 2004 4.ª edición.
- **Finalización**: la actividad queda «completada» cuando el estudiante llega al último paso.
- **Reanudación**: al volver, el estudiante continúa en el paso en que se quedó.
- **Nota** (opcional, si el escenario tiene preguntas de opción múltiple): sobre 100, la proporción de preguntas en las que el estudiante pulsó una tarjeta correcta *antes* de revelar la respuesta. Solo cuenta el primer intento.

En el paquete solo queda visible el reproductor: ni modo libre, ni biblioteca, ni opción de compartir.

## En el móvil

El taller se adapta a las pantallas estrechas. En un móvil se abre directamente en la biblioteca de escenarios:

![Móvil: una pregunta revelada sobre el pacto de no competencia, con la explicación de la opción correcta](../../visuels/es/captures/telephone-question.png ':size=260')
<p class="caption">En el móvil (tema oscuro): la pregunta sobre el pacto de no competencia de Carmen, revelada, con las opciones apiladas.</p>

- el **esquema** ocupa la parte superior de la pantalla y las **explicaciones** la inferior;
- los botones **🗺 / ◫ / 📖** de la barra inferior muestran solo el esquema, ambos o solo el texto;
- **deslice** las explicaciones a izquierda o derecha para cambiar de paso; los botones **◀ / Siguiente** siguen disponibles;
- **pellizque** el esquema para hacer zoom, arrástrelo para moverlo y toque una tarjeta para ver su veredicto y sus condiciones de validez bajo el texto;
- las **preguntas** se muestran en el texto, con las opciones apiladas: toque una opción para dar su respuesta, «Revelar la respuesta» y después toque una tarjeta para darle la vuelta.

El modo libre sigue disponible, pero está pensado para una pantalla más ancha.

## Paso a paso o reproducción continua

En la parte inferior de la pantalla:

| Control | Efecto |
|---|---|
| ⏮ ◀ | volver al principio, o al paso anterior |
| Siguiente ▶ | paso siguiente |
| barras de progreso | un clic en una barra lleva a ese paso |
| modo **Paso a paso** | el usuario avanza |
| modo **Reproducción continua** | los pasos se suceden solos; ▶ / ⏸ para reproducir o pausar |
| Ritmo | de 0,25× a 3× |

En reproducción continua, la duración de un paso depende de la longitud de su comentario (entre 5 y 45 segundos a 1×), salvo que el escenario la fije con `duracion`. Una fina barra naranja muestra el tiempo restante.

Teclado: **→** / **←** para avanzar o retroceder, **Espacio** para avanzar (paso a paso) o reproducir/pausar (continua), **Inicio** / **Fin** para el primer y el último paso, **F** para reencuadrar.

## Pasos pregunta

Algunos pasos interrogan al público. Su título va precedido de ❓, y sube una ventana en la parte inferior del lienzo con la pregunta y las opciones en grandes tarjetas (A, B, C…).

1. **Deje responder a la clase**: a mano alzada, oralmente… Haga clic en la tarjeta elegida por la mayoría, o teclee su número: queda marcada como «👥 elección de la clase».
2. **Revele la respuesta**: botón «💡 Revelar la respuesta», tecla **→** o botón «💡 Respuesta ▶» de la barra inferior. Un mando de presentación funciona, por tanto: una primera pulsación revela, la siguiente pasa al paso siguiente.
3. **Comente cada opción**: las respuestas correctas se ponen en verde y las demás se atenúan. Haga clic en una tarjeta, o teclee su número, para **darle la vuelta** y leer por qué la opción es correcta o errónea.
4. **La explicación general** se abre en el panel de la derecha. La respuesta también puede modificar el lienzo: veredictos restablecidos, salvaguarda añadida, resaltado, bocadillo.

La ventana no tapa el esquema: el lienzo se reencuadra encima, se puede seguir moviendo y ampliando, y el botón **▾** reduce la ventana a una barra. En reproducción continua, la reproducción se detiene en una pregunta hasta la revelación y luego se reanuda.

Una pregunta suele ir precedida de `verificacion off`: veredictos y pastillas se ocultan para que el lienzo no dé la respuesta; la respuesta los restablece con `verificacion on`. Para escribir una pregunta, véase el [formato de los escenarios](formato-escenario.md#pasos-pregunta-quiz).

## Interactuar durante la presentación

- **Hacer clic en una tarjeta** muestra su verificación completa bajo el comentario: veredicto, cálculos, condiciones de validez, consecuencias habituales.
- **Pasar el ratón por un nombre** resaltado en el comentario resalta la tarjeta correspondiente; un clic la selecciona.
- **Mover una tarjeta o un bocadillo**: arrástrelo. Útil cuando los bocadillos se solapan o tapan un vínculo. Los desplazamientos se conservan de un paso a otro; el botón **↺ Disposición** devuelve todo al lugar previsto por el escenario. Estos desplazamientos no modifican el escenario.
- El panel «Índice del escenario» permite saltar a cualquier paso.

## Editar o reutilizar

- **📝 Markdown** abre el texto del escenario: corríjalo y aplíquelo sin salir del paso actual, cópielo o descárguelo.
- **✏️ Explorar libremente** copia el estado mostrado al modo libre, para manipularlo (quitar una salvaguarda, añadir una falta, cambiar la antigüedad…).

Si un escenario contiene comandos que no se entienden, aparece un aviso bajo el comentario, con el número de línea.
