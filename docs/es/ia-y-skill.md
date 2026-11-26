# Preparar la clase con una IA

Dos posibilidades: cualquier IA con la página de instrucciones, o Claude con la skill, que además comprueba los veredictos.

## 1. Con cualquier IA

<div class="ai-box">
<ol class="ai-steps">
<li><strong>Copie la consigna.</strong> Ya contiene el enlace a las instrucciones para la IA. El texto se puede modificar: adapte el público, el derecho o el número de pasos antes de copiarlo.
<div class="ai-prompt js-ia-prompt" contenteditable="true" spellcheck="false" title="Texto modificable">Lee las instrucciones en <span class="js-ia-url" data-path="es/instructions-ia.md">https://edu-fpar.github.io/contract-lab/docs/es/instructions-ia.md</span> y prepara un escenario de Contract Lab a partir de la clase siguiente (o del archivo adjunto). Público: estudiantes de Relaciones Laborales o de Derecho (grado), de 6 a 8 pasos, con dos preguntas para la clase.</div>
<button class="ai-btn big" data-copy-sel=".js-ia-prompt">📋 Copiar la consigna</button></li>
<li><strong>Péguela en su IA</strong> (ChatGPT, Claude, Gemini, Mistral, Copilot…) y añada su material de clase: texto pegado a continuación o archivo adjunto.</li>
<li><strong>Copie la respuesta de la IA</strong> y péguela en el <a href="https://edu-fpar.github.io/contract-lab/es/?scenarios" target="_blank" rel="noopener">taller</a>: 🎬 Cine → 📚 Escenarios → Iniciar. Puede pegar la respuesta completa.</li>
</ol>
<details class="ai-more"><summary>¿Su IA no puede abrir enlaces?</summary>
<p>Copie entonces la versión completa: las instrucciones y la petición en un solo texto. Péguela en su IA y añada su material de clase.</p>
<button class="ai-btn warn" data-copy-full="es/instructions-ia.md">📄 Copiar la versión completa</button> <a class="ai-link" href="es/instructions-ia.md" target="_blank" rel="noopener">ver las instrucciones</a>
</details>
<p class="ai-note">💡 ¿Usa Claude? La <a href="#/es/ia-y-skill">skill de Contract Lab</a> comprueba además cada veredicto con el motor del taller.</p>
<p class="ai-note js-ia-local" hidden>ℹ️ Está leyendo esta documentación en local: la consigna apunta a la versión publicada, la que puede leer una IA en línea.</p>
</div>

**¿Qué derecho?** Las instrucciones piden a la IA que elija el **derecho español** (encabezado `droit: es`) para un curso sobre el Estatuto de los Trabajadores — contratos, periodo de prueba, pactos del art. 21 ET, despido disciplinario u objetivo, improcedencia y nulidad — y el **derecho francés** si el curso trata de él. Para asegurarse, dígalo en la consigna: «derecho español» o «derecho francés, en español». Para el derecho inglés, use la [consigna en inglés](../en/ai-and-skill.md).

Una IA generalista no puede ejecutar el motor del taller: **compruebe los veredictos** anunciados en el comentario con lo que muestra el taller (haga clic en una tarjeta para ver su verificación completa) y **compruebe el derecho**: artículos, sentencias, duraciones, importes — en particular el SMI, que cambia cada año, y los puntos en evolución (jornada, indemnización por despido improcedente). Los avisos de sintaxis aparecen bajo el comentario.

Las IA que exploran un sitio también pueden partir del archivo [`llms.txt`](https://edu-fpar.github.io/contract-lab/llms.txt ':ignore'), que apunta a las páginas útiles.

## 2. Con Claude: la skill «scenario-contract-lab» (recomendado)

Una *skill* es un conjunto de instrucciones que Claude carga automáticamente cuando la petición tiene que ver con ella. Esta, trilingüe (francés, inglés y español), enseña a Claude a:
1. leer su **material de clase** (PDF, diapositivas, apuntes, caso práctico);
2. elegir el **derecho** (español, francés o inglés) y el idioma del escenario;
3. quedarse con lo que la herramienta sabe **representar** — cláusulas y salvaguardas, incompatibilidades, obligaciones e incumplimientos, extinciones y procedimientos, indemnizaciones — y dejar de lado, avisándole, lo que no puede mostrar correctamente;
4. escribir un escenario progresivo que retome **sus ejemplos y sus cifras**, con preguntas para la clase cuya respuesta no delate el lienzo;
5. **reproducirlo con el motor real del taller** para comprobar que los veredictos, las salvaguardas y los cálculos anunciados en el comentario coinciden con los que se mostrarán;
6. entregar el archivo `.md`, con la lista de lo que hay que revisar (referencias añadidas, simplificaciones).

Los artículos y las sentencias solo se añaden si figuran en su material o son seguros; las simplificaciones se señalan en el escenario.

### Instalar la skill

El archivo que hay que instalar es [`skill/scenario-contract-lab.skill`](../skill/scenario-contract-lab.skill ':ignore'). Es un archivo comprimido de la carpeta `skill/scenario-contract-lab/`.

- **Claude (web o aplicación de escritorio)**: en los ajustes, sección *Skills*, importe este archivo. La ejecución de código debe estar permitida para que funcione la comprobación.
- **Claude Code**: copie la carpeta `skill/scenario-contract-lab/` en `~/.claude/skills/` (para usted) o en la carpeta `.claude/skills/` de un proyecto.

La comprobación usa Node.js. Si el entorno no lo tiene, Claude aplica las reglas a mano y se lo indica.

### Usarla

Adjunte su material y pida, por ejemplo:

> Aquí tienes mi tema sobre el despido objetivo. Hazme un escenario de Contract Lab para corregir en clase el caso práctico, unos 6 pasos.

> A partir de estas diapositivas sobre los pactos del art. 21 ET, prepara una animación paso a paso para mis estudiantes de segundo de Relaciones Laborales, con dos preguntas.

Recibirá un archivo `.md` que se abre en el taller: 🎬 Cine → 📚 Escenarios → abrir el archivo, o soltar el archivo sobre la ventana.

### Contenido de la skill

| Archivo | Función |
|---|---|
| `SKILL.md` | el método: leer, elegir el derecho, elegir lo que se muestra, construir, comprobar, entregar |
| `references/formato-es.md` · `references/format.md` · `references/format-en.md` | la sintaxis de los escenarios y los catálogos (español / francés / inglés) |
| `references/reglas-es.md` · `references/regles-de-calcul.md` · `references/checking-rules-en.md` | lo que el motor verifica y calcula, y lo que no representa |
| `references/ejemplo-es.md` · `references/exemple.md` · `references/example-en.md` | un escenario modelo (los pactos del art. 21 ET / la cláusula de no competencia francesa / los *restrictive covenants* ingleses) |
| `scripts/verifier.js` | reproduce un escenario con el motor y muestra, paso a paso, los veredictos, las salvaguardas y los cálculos |
| `scripts/lib/` | copia del motor del taller (tres derechos, tres idiomas) |

El verificador también puede usarse sin IA, para comprobar un escenario escrito a mano:

```bash
node skill/scenario-contract-lab/scripts/verifier.js mi-escenario.md
node skill/scenario-contract-lab/scripts/verifier.js mi-escenario.md --lang es
```

Los mensajes están en español cuando el escenario se detecta como español (encabezado `droit: es`, títulos `### Respuesta`), en inglés si se detecta como inglés, en francés en los demás casos; `--lang es`, `--lang en` o `--lang fr` fuerza el idioma. Para cada paso lista cada elemento con su veredicto (✅ ⚠️ ⛔ ⚡), sus condiciones (✔ cumplida, con el elemento que la cumple; ✘ falta, con el efecto), sus incompatibilidades (⊘) y sus cálculos (🧮), y después las relaciones. Señala los comandos no entendidos (errores) y los puntos que conviene revisar (avisos): pregunta sin `verificacion off` cuando un elemento resaltado muestra su veredicto, pregunta sin respuesta correcta, bocadillo demasiado largo, paso sin comentario.
