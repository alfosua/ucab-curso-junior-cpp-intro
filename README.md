# Curso Intensivo de Introducción a C++ para Juniors — UCAB

Curso introductorio-intermedio de **C++ moderno (C++17/C++20, compilado con C++20)** para estudiantes con experiencia previa de programación en la **Universidad Católica Andrés Bello (UCAB)**, creado por **Alfonso Suarez**.

El objetivo pedagógico central es construir la **BIOS interactiva del Pip-Boy 3000** del universo de Fallout. Esta interfaz terminal comparte la arquitectura fundamental de un *microshell* de Linux:

- Ciclo interactivo de lectura y evaluación (REPL).
- Parser léxico y tokenización de cadenas con flujos de memoria (`std::istringstream`).
- Tablas de despacho de comandos internos con contenedores asociativos (`std::unordered_map`) y funciones de orden superior (`std::function`, expresiones lambda).
- Modelado de estado y memoria segura con `structs`, punteros crudos (`T*`), referencias (`T&`, `const T&`) y el patrón RAII.
- Puente C/POSIX con interfaces de procesos (`fork()`, `execvp()`, `waitpid()`) y manejo de señales (`SIGINT` / Ctrl+C).

[Abrir el curso](https://alfosua.github.io/ucab-curso-junior-cpp-intro/)

---

## Estructura del Repositorio

- `site/` — Sitio web interactivo del curso (HTML5 + CSS3 + Vanilla JavaScript, sin frameworks):
  - `site/index.html` — Entrada principal de la aplicación.
  - `site/css/styles.css` — Estilos del curso con temática RobCo Pip-Boy (verde fósforo CRT, insignias de Vault-Tec, cards y componentes responsivos).
  - `site/js/` — Lógica del curso:
    - `data.js` — Plan de estudio detallado con 6 capítulos, 25 temas y 192 diapositivas interactivas.
    - `highlight.js` — Resaltador de sintaxis personalizado para C++, Makefiles y scripts de Shell.
    - `components.js` — Componentes web personalizados (`<code-window>`, `<multi-file-viewer>`, `<quiz-question>`).
    - `main.js` — Controlador de vistas, navegación por diapositivas, sincronización con `localStorage` y teclado.
  - `site/code/` — Instantáneas incrementales de los capítulos 3 a 6 (`mod1`, `mod2`, `mod3`, `mod4`).
  - `site/downloads/pipboy-bios.zip` — Archivo ZIP descargable con el código fuente completo del proyecto.
  - `site/img/` — Logotipos oficiales de UCAB, Vault-Tec, RobCo, Vault Boy e iconos tecnológicos.

---

## Editar el contenido del curso

`tools/build_data_js.py` genera `site/js/data.js`. `tools/foundation_chapters.py`
desarrolla el repaso y las ampliaciones de la introducción, con ejemplos independientes
y preguntas de razonamiento. La historia y los estándares se presentan por separado;
C++23 y C++26 se incluyen como contexto, fuera de los requisitos del proyecto.

Los capítulos 3 a 6 se redactan en
`tools/project_chapters.py` y `tools/holotape_chapter.py`: cada uno parte de la etapa anterior, indica los archivos
que se crean o reemplazan, desarrolla sus funciones y propone comprobaciones antes
de presentar el código completo. Los ejemplos de funciones se extraen de las
instantáneas para mantenerlos sincronizados con los archivos del visor.

`tools/presentation.py` mantiene cada ejemplo completo junto a su explicación,
incluidos los Makefiles. Los bloques largos tienen scroll interno en todo el sitio;
los visores finales muestran cada archivo íntegro, sin dividirlo en tramos.

Desde la raíz del repositorio, regenera los datos después de editar el contenido o
las instantáneas:

```bash
python3 tools/build_data_js.py
```

El código de `ucab-pipboy-bios` tiene prioridad sobre el draft del curso. Las etapas
interactivas inicializan `should_exit` a `false` antes de evaluar el bucle. La etapa
final también incluye directamente `<cerrno>` y `<utility>`, que declaran `errno`
y `std::move`. Las diapositivas explican las diferencias y los límites de la
implementación, sin incorporar las extensiones del draft que el proyecto final no
utiliza.

## Publicación

GitHub Actions publica automáticamente el contenido de `site/` en GitHub Pages
con cada push a `main`. El flujo también se puede ejecutar manualmente desde
la pestaña Actions del repositorio. Tras editar los generadores, regenera y
versiona `site/js/data.js` antes de publicar.

---

## Cómo Servir el Sitio Web Localmente

Puedes servir la carpeta `site/` con cualquier servidor estático HTTP local:

```bash
# Opción 1: Con Python 3
python3 -m http.server 8000 --directory site

# Opción 2: Con Node.js / npx
npx serve site

# Opción 3: Con pnpm dlx
pnpm dlx serve -l 3000 site
```

Abre tu navegador en `http://localhost:8000` (o el puerto indicado) para acceder a la plataforma interactiva.

---

## Compilar y Ejecutar la BIOS del Pip-Boy

Para compilar y ejecutar el proyecto final en Linux, macOS o Windows (vía WSL2):

```bash
# Entrar a cualquiera de los snapshots o clonar ucab-pipboy-bios
cd site/code/mod4

# Compilar todo el proyecto con g++ (C++20)
make

# Ejecutar la BIOS
./pipboy
# o directamente:
make run
```

### Comandos Disponibles en la BIOS:

- `help`: Muestra la lista de comandos disponibles.
- `damage <head|torso|larm|rarm|lleg|rleg> <cantidad>`: Inflige daño a una extremidad específica.
- `stimpak`: Administra un estimulante para restaurar HP y extremidades.
- `load <comando_linux> [argumentos...]`: Carga y ejecuta una holocinta (binario de Linux externo como `load uname -a` o `load ls -la`).
- `exit` o `quit`: Apaga la terminal del Pip-Boy.
