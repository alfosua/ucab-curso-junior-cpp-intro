import json
from project_chapters import build_project_chapters
from foundation_chapters import build_foundations, refresh_introduction
from presentation import prepare_project_chapters

def read_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        return f.read()

# Load code for multi-file viewers
mod1_files = [
    {
        "filename": "makefile",
        "path": "makefile",
        "desc": "Automatización del proceso de compilación con g++ (-std=c++20, -Wall, -Wextra, -Iinclude).",
        "code": read_file("site/code/mod1/makefile")
    },
    {
        "filename": "include/ui.hpp",
        "path": "include/ui.hpp",
        "desc": "Declaraciones de funciones para control de terminal (ANSI) y dibujado del HUD.",
        "code": read_file("site/code/mod1/include/ui.hpp")
    },
    {
        "filename": "src/ui.cpp",
        "path": "src/ui.cpp",
        "desc": "Implementación de escape sequences ANSI, formateo de estadísticas con std::setw y arte ASCII del Vault Boy con Raw String Literals.",
        "code": read_file("site/code/mod1/src/ui.cpp")
    },
    {
        "filename": "src/main.cpp",
        "path": "src/main.cpp",
        "desc": "Punto de entrada: invoca el renderizado inicial de la interfaz del Pip-Boy.",
        "code": read_file("site/code/mod1/src/main.cpp")
    }
]

mod2_files = [
    {
        "filename": "include/structs.hpp",
        "path": "include/structs.hpp",
        "desc": "Modelo de datos del Pip-Boy: enum class Limb, BodyCondition y struct VaultDweller con métodos y puntero get_limb_ptr.",
        "code": read_file("site/code/mod2/include/structs.hpp")
    },
    {
        "filename": "include/ui.hpp",
        "path": "include/ui.hpp",
        "desc": "Clase RAII TerminalSession para activar color verde fósforo y restaurar terminal, más funciones de dibujado actualizadas.",
        "code": read_file("site/code/mod2/include/ui.hpp")
    },
    {
        "filename": "src/dweller.cpp",
        "path": "src/dweller.cpp",
        "desc": "Lógica del personaje: selección con puntero get_limb_ptr(), daño a extremidades, curación con Stimpaks y chequeo is_injured().",
        "code": read_file("site/code/mod2/src/dweller.cpp")
    },
    {
        "filename": "src/ui.cpp",
        "path": "src/ui.cpp",
        "desc": "Renderizado dinámico de barras de salud con std::clamp, boca reactiva en ASCII y gestión de sesión con TerminalSession.",
        "code": read_file("site/code/mod2/src/ui.cpp")
    },
    {
        "filename": "src/main.cpp",
        "path": "src/main.cpp",
        "desc": "Secuencia de pantallas con pausas, daño y curación sobre el mismo morador.",
        "code": read_file("site/code/mod2/src/main.cpp")
    },
    {
        "filename": "makefile",
        "path": "makefile",
        "desc": "Makefile actualizado agregando src/dweller.cpp a la lista de fuentes (SRCS).",
        "code": read_file("site/code/mod2/makefile")
    }
]

mod3_files = [
    {
        "filename": "include/cmd.hpp",
        "path": "include/cmd.hpp",
        "desc": "Definición de CommandProcessor, CommandHandler (std::function) y tabla de despacho con unordered_map.",
        "code": read_file("site/code/mod3/include/cmd.hpp")
    },
    {
        "filename": "include/structs.hpp",
        "path": "include/structs.hpp",
        "desc": "Estructuras de estado del morador (mantiene alta cohesión y bajo acoplamiento).",
        "code": read_file("site/code/mod3/include/structs.hpp")
    },
    {
        "filename": "include/ui.hpp",
        "path": "include/ui.hpp",
        "desc": "TerminalSession enriquecida con status_msg y método get_dweller_mut() para el ciclo REPL.",
        "code": read_file("site/code/mod3/include/ui.hpp")
    },
    {
        "filename": "src/cmd.cpp",
        "path": "src/cmd.cpp",
        "desc": "Tokenizador con std::istringstream y tabla de despacho de comandos internos con lambdas (damage, stimpak, help, exit).",
        "code": read_file("site/code/mod3/src/cmd.cpp")
    },
    {
        "filename": "src/dweller.cpp",
        "path": "src/dweller.cpp",
        "desc": "Lógica del morador de refugio.",
        "code": read_file("site/code/mod3/src/dweller.cpp")
    },
    {
        "filename": "src/ui.cpp",
        "path": "src/ui.cpp",
        "desc": "Integración del prompt dweller@pipboy:~$ y barra de status en render_screen.",
        "code": read_file("site/code/mod3/src/ui.cpp")
    },
    {
        "filename": "src/main.cpp",
        "path": "src/main.cpp",
        "desc": "Ciclo REPL principal con std::getline() y manejo seguro de fin de archivo EOF (Ctrl+D).",
        "code": read_file("site/code/mod3/src/main.cpp")
    },
    {
        "filename": "makefile",
        "path": "makefile",
        "desc": "Makefile actualizado agregando src/cmd.cpp al target.",
        "code": read_file("site/code/mod3/makefile")
    }
]

mod4_files = [
    {
        "filename": "include/cmd.hpp",
        "path": "include/cmd.hpp",
        "desc": "Declaración del método runHolotape para ejecutar programas externos en Linux.",
        "code": read_file("site/code/mod4/include/cmd.hpp")
    },
    {
        "filename": "include/structs.hpp",
        "path": "include/structs.hpp",
        "desc": "Estructuras de dominio completas del morador.",
        "code": read_file("site/code/mod4/include/structs.hpp")
    },
    {
        "filename": "include/ui.hpp",
        "path": "include/ui.hpp",
        "desc": "Contrato de TerminalSession: morador, mensaje de estado y ciclo de vida de la sesión.",
        "code": read_file("site/code/mod4/include/ui.hpp")
    },
    {
        "filename": "src/cmd.cpp",
        "path": "src/cmd.cpp",
        "desc": "Puente C/POSIX: fork(), execvp(), waitpid(), conversión de vector a char** con .data(), y comando 'load'.",
        "code": read_file("site/code/mod4/src/cmd.cpp")
    },
    {
        "filename": "src/dweller.cpp",
        "path": "src/dweller.cpp",
        "desc": "Implementación de métodos de VaultDweller.",
        "code": read_file("site/code/mod4/src/dweller.cpp")
    },
    {
        "filename": "src/ui.cpp",
        "path": "src/ui.cpp",
        "desc": "TerminalSession ignora SIGINT en el proceso padre para evitar que Ctrl+C destruya la sesión del Pip-Boy.",
        "code": read_file("site/code/mod4/src/ui.cpp")
    },
    {
        "filename": "src/main.cpp",
        "path": "src/main.cpp",
        "desc": "Bucle interactivo final del Pip-Boy BIOS.",
        "code": read_file("site/code/mod4/src/main.cpp")
    },
    {
        "filename": "makefile",
        "path": "makefile",
        "desc": "Makefile definitivo para compilar ./pipboy en Linux/macOS/WSL.",
        "code": read_file("site/code/mod4/makefile")
    }
]


course_data = {
    "title": "Curso Intensivo de Introducción a C++ para Juniors",
    "author": "Alfonso Suarez",
    "chapters": [
        {
            "id": 1,
            "title": "Introducción",
            "topics": [
                {
                    "id": 1,
                    "num": 1,
                    "title": "Objetivo, Historia y Estándares",
                    "description": "El objetivo del curso, la historia de C++ y sus ventajas para el desarrollo de sistemas.",
                    "slides": [
                        {
                            "title": "Bienvenido",
                            "logo": "img/fallout/vault_tec_logo.svg",
                            "content": [
                                "Construiremos la BIOS interactiva del **Pip-Boy 3000**, una terminal inspirada en Fallout.",
                                "Su estructura nos servirá de base para un **microshell de Linux**: leer comandos, interpretarlos y mostrar resultados.",
                                "Practicarás C++ con estado del personaje, punteros y referencias, y ejecutarás programas mediante `fork`, `execvp` y `waitpid`."
                            ],
                            "image": {
                                "src": "img/fallout/vault_boy.png",
                                "maxHeight": 180,
                                "caption": "Vault Boy: Aprobado para el servicio técnico en el Yermo."
                            }
                        },
                        {
                            "title": "Mapeo: De la BIOS del Pip-Boy al Microshell",
                            "content": [
                                "Cada característica que implementaremos en la BIOS de RobCo se traduce directamente en un componente del Microshell final de la materia:",
                            ],
                            "table": {
                                "headers": ["Característica Pip-Boy", "Concepto C++ Aprendido", "Equivalente en Microshell (SO)"],
                                "rows": [
                                    ["ASCII Vault Boy & HUD", "Raw string literals R\"(...)\", iomanip, secuencias ANSI", "Prompt dinámico del shell (usuario@host:cwd$)"],
                                    ["Barras de Salud (CND)", "structs, punteros (T*), referencias (T&, const T&)", "Tabla de BCP (Bloques de Control de Procesos)"],
                                    ["Color Verde Fósforo", "Patrón RAII, destructores automáticos", "Gestión segura de descriptores de tuberías (pipes)"],
                                    ["Comandos (heal, damage, help)", "std::stringstream, std::unordered_map, lambdas", "Parser de línea de comandos y comandos internos (built-ins)"],
                                    ["Carga de Holocintas (load)", "std::vector<char*>, .data(), fork(), execvp(), waitpid()", "Ejecutor de binarios externos de Linux y manejo de señales"]
                                ]
                            }
                        }
                    ]
                },
                {
                    "id": 2,
                    "num": 2,
                    "title": "Entorno de Desarrollo & Herramientas",
                    "description": "Configuración del entorno de trabajo en Linux, WSL2, GCC y editores de código.",
                    "slides": [
                        {
                            "title": "El Entorno de Desarrollo",
                            "content": [
                                "C++ y los Sistemas Operativos nacieron en el ecosistema UNIX. Aunque es posible programar en Windows, para interactuar con las llamadas del kernel POSIX (`<unistd.h>`) es indispensable trabajar sobre un entorno Linux.",
                                "Tienes tres alternativas oficiales recomendadas para este curso:",
                                "1. **Linux Nativo:** Cualquier distribución moderna (Ubuntu, Fedora, Debian, Arch). Rendimiento nativo total.",
                                "2. **WSL2 (Windows Subsystem for Linux):** La mejor opción si usas Windows. Permite ejecutar una instancia real del kernel de Linux en segundo plano sin el peso de una máquina virtual lenta.",
                                "3. **Máquina Virtual (VM):** VirtualBox o VMware con Ubuntu 24.04 LTS o Fedora."
                            ]
                        },
                        {
                            "title": "Herramientas Recomendadas",
                            "content": [
                                "Instala las herramientas oficiales de desarrollo antes de continuar:"
                            ],
                            "cards": [
                                {
                                    "name": "Visual Studio Code",
                                    "icon": "img/icons/vscode.png",
                                    "description": "Editor ligero y modular. Instala la extensión oficial 'C/C++' de Microsoft.",
                                    "url": "https://code.visualstudio.com/"
                                },
                                {
                                    "name": "Compilador GNU GCC / G++",
                                    "icon": "img/icons/gcc.svg",
                                    "description": "El compilador estándar de la industria. Instala el paquete build-essential en Ubuntu/Debian.",
                                    "url": "https://gcc.gnu.org/"
                                },
                                {
                                    "name": "Git & Repositorio GitHub",
                                    "icon": "img/icons/git.svg",
                                    "description": "Control de versiones para clonar y comparar cada etapa del código del Pip-Boy.",
                                    "url": "https://github.com/alfosua/ucab-pipboy-bios"
                                }
                            ]
                        },
                        {
                            "title": "Otros editores para C++",
                            "content": [
                                "Puedes seguir el curso con el editor que prefieras. Con **clangd** puedes añadir autocompletado, diagnósticos y navegación para C++; seguiremos compilando con g++ y make.",
                                "nota: Yo uso Neovim por cierto"
                            ],
                            "cards": [
                                {"name": "GNU Emacs", "icon": "img/icons/emacs.png",
                                 "description": "Extensible con Emacs Lisp. Integra edición de C++, compilación y depuración.",
                                 "url": "https://www.gnu.org/software/emacs/"},
                                {"name": "Neovim", "icon": "img/icons/neovim.svg",
                                 "description": "Edición modal centrada en el teclado, personalizable con Lua y complementos.",
                                 "url": "https://neovim.io/"},
                                {"name": "Helix", "icon": "img/icons/helix.svg",
                                 "description": "Editor modal de terminal con selecciones múltiples e integración de servidores de lenguaje.",
                                 "url": "https://helix-editor.com/"}
                            ]
                        },
                        {
                            "title": "Instalación de Paquetes en Linux / WSL",
                            "content": [
                                "Abre tu terminal en Linux o WSL y asegúrate de tener instalado el compilador `g++` con soporte para C++20 y la utilidad `make`:"
                            ],
                            "terminal": "# En distribuciones basadas en Ubuntu / Debian:\n$ sudo apt update\n$ sudo apt install -y build-essential g++ make git\n\n# En distribuciones basadas en Fedora / RHEL:\n$ sudo dnf groupinstall -y \"Development Tools\"\n$ sudo dnf install -y gcc-c++ make git\n\n# Verificar la versión de g++ (requerido: g++ 11 o superior para C++20)\n$ g++ --version\n$ make --version"
                        }
                    ]
                },
                {
                    "id": 3,
                    "num": 3,
                    "title": "Primer Programa & Pipeline de Compilación",
                    "description": "Estructura del primer código C++ y desglose profundo de las 4 etapas de compilación con g++.",
                    "slides": [
                        {
                            "title": "Primer Programa: Hola Yermo",
                            "content": [
                                "Comencemos analizando la estructura mínima de un ejecutable moderno en C++:",
                                "• `#include <iostream>`: Directiva del preprocesador que incluye la cabecera estándar de flujos de entrada/salida (I/O).",
                                "• `int main()`: Punto de entrada del proceso según el estándar del sistema operativo. Retorna un entero al kernel (código de salida o *exit code*).",
                                "• `std::cout`: Objeto de flujo de salida estándar (mapeado al descriptor de archivo 1 / stdout).",
                                "• `<<`: Operador de inserción de flujo.",
                                "• `return 0;`: Indica al sistema operativo que el proceso finalizó exitosamente."
                            ],
                            "code": "#include <iostream>\n\nint main() {\n    std::cout << \"[ROBCO TERMINAL INICIALIZADA]\\n\";\n    std::cout << \"Bienvenido a la BIOS del Pip-Boy 3000.\\n\";\n    return 0;\n}",
                            "filename": "hello.cpp"
                        },
                        {
                            "title": "Las 4 Etapas del Pipeline de Compilación",
                            "content": [
                                "Cuando construyas sistemas más complejos, entender el proceso de compilación te ayudará a interpretar errores, localizar fallos y depurar con mayor precisión.",
                                "1. **Preprocesamiento (`g++ -E`):** Expande directivas `#include`, resuelve `#define` y elimina comentarios. Genera código C++ puro expandido (`.i`).",
                                "2. **Compilación (`g++ -S`):** Traduce el código C++ a instrucciones en lenguaje ensamblador específicas de la arquitectura de la CPU (x86_64, ARM) (`.s`).",
                                "3. **Ensamblado (`g++ -c`):** Traduce el ensamblador a código máquina en un archivo objeto binario (`.o`) con símbolos sin resolver.",
                                "4. **Enlazado (`g++ -o`):** Conecta las llamadas a funciones entre múltiples archivos objeto y enlaza la librería estándar de C++ (`libstdc++`), resolviendo direcciones en el ejecutable final."
                            ]
                        },
                        {
                            "title": "Comprobando el Pipeline en la Terminal",
                            "content": [
                                "Puedes ejecutar cada paso individualmente para inspeccionar lo que produce el compilador:"
                            ],
                            "terminal": "# 1. Ver el archivo tras el preprocesador (miles de líneas expandidas):\n$ g++ -E hello.cpp -o hello.i\n\n# 2. Ver el código en lenguaje ensamblador:\n$ g++ -S hello.cpp -o hello.s\n$ head -n 25 hello.s\n\n# 3. Ensamblar a código binario objeto (.o):\n$ g++ -c hello.cpp -o hello.o\n$ file hello.o\n\n# 4. Enlazar el ejecutable final:\n$ g++ hello.o -o hello\n$ ./hello"
                        }
                    ]
                },
                {
                    "id": 4,
                    "num": 4,
                    "title": "Automatización con Make & Makefiles",
                    "description": "Uso de makefiles para compilación incremental, flags esenciales del compilador y objetivos estándar.",
                    "slides": [
                        {
                            "title": "El problema de compilar a mano",
                            "content": [
                                "Un solo archivo se puede compilar cómodamente con `g++ hello.cpp -o hello`. Pero un proyecto real reúne varios archivos fuente, cabeceras y opciones de compilación.",
                                "Después de cada cambio, repetir un comando largo como `g++ src/main.cpp src/ui.cpp src/dweller.cpp -Iinclude -std=c++20 -Wall -Wextra -o pipboy` es lento, propenso a errores y difícil de mantener.",
                                "Necesitamos una forma de describir el proyecto una sola vez y recompilar únicamente lo que cambió."
                            ]
                        },
                        {
                            "title": "¿Por qué usar Make?",
                            "content": [
                                "`make` es una herramienta de automatización basada en un grafo de dependencias y marcas de tiempo (*timestamps*):",
                                "• Solo recompila los archivos `.cpp` que hayan sido modificados después de su correspondiente `.o`.",
                                "• Si cambias `ui.cpp`, solo se compila `ui.o` y luego se ejecuta el enlazador en milisegundos.",
                                "• Es el estándar utilizado en el código fuente del kernel de Linux y en todos los proyectos de sistemas."
                            ]
                        },
                        {
                            "title": "Arquitectura de archivos del proyecto",
                            "content": [
                                "Antes de automatizar la compilación, identifica qué archivos forman el ejecutable y dónde se encuentran."
                            ],
                            "terminal": "pipboy-bios/\n├── include/\n│   └── ui.hpp        # Declaraciones compartidas\n├── src/\n│   ├── main.cpp      # Punto de entrada\n│   └── ui.cpp        # Implementación de la interfaz\n└── makefile          # Reglas de compilación"
                        },
                        {
                            "title": "Nuestro primer Makefile",
                            "content": [
                                "Guarda este archivo como `makefile` junto a `hello.cpp`. Conserva las tabulaciones al principio de las recetas; el siguiente slide explica cada parte."
                            ],
                            "code": "CXX      := g++\nCXXFLAGS := -std=c++20 -Wall -Wextra\nTARGET   := hello\n\nSRCS     := hello.cpp\nOBJS     := $(SRCS:.cpp=.o)\n\nall: $(TARGET)\n\n$(TARGET): $(OBJS)\n\t$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)\n\n%.o: %.cpp\n\t$(CXX) $(CXXFLAGS) -c $< -o $@\n\nrun: $(TARGET)\n\t./$(TARGET)\n\nclean:\n\trm -f $(OBJS) $(TARGET)",
                            "filename": "makefile",
                            "variant": "makefile"
                        },
                        {
                            "title": "Cómo funciona este Makefile",
                            "content": [
                                "• Configuración: `CXX` elige g++; `CXXFLAGS` activa C++20 y las advertencias `-Wall -Wextra`. `:=` asigna el valor y `$(NOMBRE)` consulta una variable.",
                                "• Archivos: `SRCS` contiene hello.cpp; `OBJS := $(SRCS:.cpp=.o)` obtiene hello.o sustituyendo el sufijo. `TARGET` nombra el ejecutable hello.",
                                "• Dependencias: `all` es el primer objetivo y pide el ejecutable. `$(TARGET): $(OBJS)` indica que este depende de los objetos; su receta los enlaza con g++.",
                                "• Compilación: `%.o: %.cpp` describe cómo generar un objeto desde su fuente. `-c` compila sin enlazar; `$<` representa el primer requisito y `$@` el objetivo de la regla.",
                                "• Utilidades: `run` depende del ejecutable y lo inicia con `./$(TARGET)`. `clean` elimina los objetos y el ejecutable para permitir una compilación desde cero.",
                                "• Ejecución: make compara las fechas de objetivos y requisitos para decidir qué reconstruir. Cada receta comienza con una tabulación real, no con espacios."
                            ]
                        },
                        {
                            "title": "Comandos de Make",
                            "content": [
                                "Una vez definido el `makefile`, el flujo de trabajo en la terminal se simplifica enormemente:"
                            ],
                            "terminal": "# Compilar el proyecto completo:\n$ make\n\n# Compilar y ejecutar de inmediato:\n$ make run\n\n# Limpiar los archivos binarios temporales (.o) y el ejecutable:\n$ make clean"
                        }
                    ]
                }
            ]
        },
        build_foundations(),
        *prepare_project_chapters(build_project_chapters({1: mod1_files, 2: mod2_files, 3: mod3_files, 4: mod4_files}))
    ]
}

refresh_introduction(course_data["chapters"][0])

js_content = "// Datos del curso: 'Curso Intensivo de Introducción a C++ para Juniors' (UCAB)\n// Temática: RobCo Industries Pip-Boy BIOS (Fallout)\n\n"
js_content += "const COURSE = " + json.dumps(course_data, indent=2, ensure_ascii=False) + ";\n"

with open("site/js/data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated site/js/data.js successfully! ({len(js_content)} bytes)")
