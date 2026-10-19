// Datos del curso: 'Curso Intensivo de Introducción a C++ para Juniors' (UCAB)
// Temática: RobCo Industries Pip-Boy BIOS (Fallout)

const COURSE = {
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
              "title": "¿Por qué C++?",
              "content": [
                "C++ nos permite aprovechar lo que ya conocemos de C y añadir herramientas para organizar el programa y gestionar sus datos.",
                "• **Control:** podemos trabajar con direcciones, memoria y funciones del sistema cuando el problema lo requiere.",
                "• **Abstracción:** cadenas, contenedores y clases permiten expresar una solución sin administrar cada detalle a mano.",
                "• **Recursos:** los objetos pueden encargarse de su limpieza al terminar su vida. Estudiaremos esta técnica, llamada RAII, al gestionar la terminal.",
                "En el Pip-Boy combinaremos ambos niveles: comandos escritos con la biblioteca estándar y ejecución de programas mediante la API POSIX."
              ]
            },
            {
              "title": "De C con clases a C++",
              "content": [
                "En 1979, **Bjarne Stroustrup** comenzó en Bell Labs un lenguaje llamado **C with Classes**. Buscaba combinar la eficiencia de C para sistemas con las herramientas de organización que había conocido en Simula.",
                "La idea era representar conceptos mediante tipos propios: reunir sus datos y las operaciones que tienen sentido sobre ellos, sin abandonar el acceso a las capacidades del sistema.",
                "En 1983 adoptó el nombre **C++**, un guiño al operador de incremento de C. En 1985 llegaron la primera versión comercial y el libro The C++ Programming Language.",
                "Con el tiempo añadió programación genérica, una biblioteca estándar más amplia y nuevas formas de gestionar recursos. C++ admite varios estilos: procedural, orientado a objetos y genérico."
              ],
              "sources": [
                {
                  "name": "Historia por su creador",
                  "description": "Cronología y decisiones de diseño de Bjarne Stroustrup.",
                  "url": "https://www.stroustrup.com/bs_faq.html#invention"
                }
              ]
            },
            {
              "title": "Estándares de C++",
              "content": [
                "Un estándar define el lenguaje y su biblioteca. El compilador y la biblioteca instalada deben implementar las características que quieras usar.",
                "• **C++98 / C++03:** primera estandarización y correcciones; consolidaron clases, plantillas y la biblioteca de contenedores y algoritmos.",
                "• **C++11 / C++14:** base del C++ moderno: auto, nullptr, lambdas, movimientos y punteros inteligentes, entre otras mejoras.",
                "• **C++17 / C++20 — los que usaremos:** C++17 aporta herramientas como std::clamp; C++20 amplía el lenguaje con conceptos, rangos y otras capacidades. El proyecto se compila con **-std=c++20**, usando principalmente recursos disponibles desde C++17.",
                "• **C++23:** incorpora, por ejemplo, std::print y std::println. Los veremos como curiosidad, sin exigirlos para el proyecto.",
                "• **C++26:** incluye nuevas líneas de evolución, como reflexión y contratos. Su disponibilidad depende del soporte de cada herramienta; queda fuera de los requisitos del curso."
              ],
              "sources": [
                {
                  "name": "Estándares y soporte",
                  "description": "Estado de las versiones e implementación en compiladores.",
                  "url": "https://isocpp.org/std/status"
                },
                {
                  "name": "Novedades de C++26",
                  "description": "Reflexión y contratos en la evolución del lenguaje.",
                  "url": "https://isocpp.org/blog/2026/04/gcc-16.1"
                }
              ]
            },
            {
              "title": "Mapeo: De la BIOS del Pip-Boy al Microshell",
              "content": [
                "Cada característica que implementaremos en la BIOS de RobCo se traduce directamente en un componente del Microshell final de la materia:"
              ],
              "table": {
                "headers": [
                  "Característica Pip-Boy",
                  "Concepto C++ Aprendido",
                  "Equivalente en Microshell (SO)"
                ],
                "rows": [
                  [
                    "ASCII Vault Boy & HUD",
                    "Raw string literals R\"(...)\", iomanip, secuencias ANSI",
                    "Prompt dinámico del shell (usuario@host:cwd$)"
                  ],
                  [
                    "Barras de Salud (CND)",
                    "structs, punteros (T*), referencias (T&, const T&)",
                    "Tabla de BCP (Bloques de Control de Procesos)"
                  ],
                  [
                    "Color Verde Fósforo",
                    "Patrón RAII, destructores automáticos",
                    "Gestión segura de descriptores de tuberías (pipes)"
                  ],
                  [
                    "Comandos (stimpak, damage, help)",
                    "std::stringstream, std::unordered_map, lambdas",
                    "Parser de línea de comandos y comandos internos (built-ins)"
                  ],
                  [
                    "Carga de Holocintas (load)",
                    "std::vector<char*>, .data(), fork(), execvp(), waitpid()",
                    "Ejecutor de binarios externos de Linux y manejo de señales"
                  ]
                ]
              }
            },
            {
              "title": "La referencia · El Pip-Boy del juego",
              "content": [
                "Pantalla de estado del Pip-Boy 3000 en Fallout: New Vegas. Observa el personaje, las barras de las extremidades y las pestañas: reinterpretaremos esos elementos con texto en nuestra terminal, no todas las funciones del juego."
              ],
              "image": {
                "src": "img/fallout/pipboy-original.png",
                "maxHeight": 480
              },
              "sources": [
                {
                  "name": "Manual oficial de Fallout: New Vegas · Stats Menu, página 7",
                  "url": "https://assets.ctfassets.net/rporu91m20dc/7gUUtEuqD6sqWgeeeaeIUM/133047fda6fd947de47e9a7901383c71/manual_fnv-ue_pc_en-int.pdf#page=5"
                }
              ]
            },
            {
              "title": "Así se verá nuestro Pip-Boy",
              "content": [
                "Este es el resultado que construiremos: estadísticas, barras de salud, personaje y una línea para introducir comandos. Podrás aplicar daño, usar Stimpaks y ejecutar programas de Linux con load."
              ],
              "image": {
                "src": "img/pipboy-final.png",
                "maxHeight": 540
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
                {
                  "name": "GNU Emacs",
                  "icon": "img/icons/emacs.png",
                  "description": "Extensible con Emacs Lisp. Integra edición de C++, compilación y depuración.",
                  "url": "https://www.gnu.org/software/emacs/"
                },
                {
                  "name": "Neovim",
                  "icon": "img/icons/neovim.svg",
                  "description": "Edición modal centrada en el teclado, personalizable con Lua y complementos.",
                  "url": "https://neovim.io/"
                },
                {
                  "name": "Helix",
                  "icon": "img/icons/helix.svg",
                  "description": "Editor modal de terminal con selecciones múltiples e integración de servidores de lenguaje.",
                  "url": "https://helix-editor.com/"
                }
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
              "title": "Compilar el primer programa",
              "content": [
                "Abre una terminal en la carpeta de hello.cpp. g++ compila el archivo y enlaza el ejecutable; -o hello elige su nombre.",
                "Después, ./hello ejecuta el archivo de la carpeta actual. Compilar y ejecutar son dos órdenes distintas."
              ],
              "terminal": "g++ hello.cpp -o hello\n./hello\n\n# Salida del programa:\n[ROBCO TERMINAL INICIALIZADA]\nBienvenido a la BIOS del Pip-Boy 3000."
            },
            {
              "title": "Elegir estándar y advertencias",
              "content": [
                "La orden anterior sirve para empezar. Para el curso añadiremos tres opciones y mantendremos el mismo programa:",
                "• **-std=c++20:** selecciona C++20 en lugar de depender de la versión que g++ use por defecto. -std=c++17 selecciona C++17 si quieres comparar ejemplos compatibles con esa versión.",
                "• **-Wall:** activa un conjunto amplio de advertencias. No significa literalmente todas las advertencias posibles.",
                "• **-Wextra:** añade otras comprobaciones útiles. Las advertencias ayudan a detectar problemas, pero no demuestran que el programa esté libre de errores.",
                "hello.cpp sigue siendo el archivo de entrada y -o hello sigue eligiendo el nombre del ejecutable."
              ],
              "terminal": "g++ -std=c++20 -Wall -Wextra hello.cpp -o hello\n./hello"
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
    {
      "id": 2,
      "title": "2. Repaso de fundamentos de C++",
      "topics": [
        {
          "id": 5,
          "num": 5,
          "title": "Variables, tipos y operadores",
          "description": "Repasar tipos y practicar operaciones con resultados anticipados en el código.",
          "slides": [
            {
              "title": "Tipos y valores",
              "content": [
                "El tipo indica qué valores puede guardar una variable y qué operaciones admite:",
                "• **bool:** valores lógicos, `true` o `false`. Ejemplo: `bool running = true;` Tamaño habitual: 1 byte.",
                "• **char:** una unidad de carácter, como `'A'`. Ejemplo: `char option = 'A';` Su tamaño siempre es 1 byte de C++.",
                "• **int:** números enteros, positivos, negativos o cero. Ejemplo: `int hp = 100;` Tamaño habitual: 4 bytes.",
                "• **float:** números de punto flotante, con menor precisión que double. Ejemplo: `float speed = 2.5f;` Tamaño habitual: 4 bytes; el sufijo f identifica un literal float.",
                "• **double:** números de punto flotante con mayor precisión. Ejemplo: `double distance = 12.75;` Tamaño habitual: 8 bytes.",
                "nota: Salvo sizeof(char), los tamaños indicados dependen de la implementación. float y double pueden aproximar valores como 0.1; no representan exactamente todos los decimales."
              ]
            },
            {
              "title": "Variables de cada tipo",
              "content": [
                "Declara cada variable indicando su tipo, su nombre y un valor inicial después de =.",
                "Usa comillas simples para un char y el sufijo f para un literal float. std::boolalpha permite mostrar el bool como true o false."
              ],
              "code": "#include <iostream>\n\nint main() {\n    bool running = true;     // Valor lógico\n    char option = 'A';       // Una unidad de carácter\n    int hp = 100;            // Número entero\n    float speed = 2.5f;      // Punto flotante de tipo float\n    double distance = 12.75; // Punto flotante de tipo double\n\n    std::cout << std::boolalpha;\n    std::cout << running << '\\n';  // true\n    std::cout << option << '\\n';   // A\n    std::cout << hp << '\\n';       // 100\n    std::cout << speed << '\\n';    // 2.5\n    std::cout << distance << '\\n'; // 12.75\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Tamaños con sizeof",
              "content": [
                "sizeof devuelve un std::size_t, un entero sin signo para tamaños. Un byte de C++ tiene CHAR_BIT bits; en las plataformas del curso son ocho.",
                "auto deduce el tipo desde el inicializador: no convierte la variable en un valor sin tipo."
              ],
              "code": "#include <cstddef>\n#include <iostream>\n\nint main() {\n    std::cout << sizeof(char) << '\\n';   // 1, por definición\n    std::cout << sizeof(int) << '\\n';    // Habitualmente 4\n    std::cout << sizeof(double) << '\\n'; // Habitualmente 8\n    std::size_t bytes = sizeof(int);\n    auto hp = 100; // hp tiene tipo int\n    std::cout << bytes << \" \" << hp << '\\n'; // Habitualmente 4 100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Constantes y enteros sin signo",
              "content": [
                "const impide asignar otro valor a esta variable. unsigned representa enteros no negativos, pero no impide errores aritméticos.",
                "Evita mezclar enteros con signo y sin signo sin revisar las conversiones. Un contador que pueda bajar de cero no debería declararse unsigned solo porque empieza positivo."
              ],
              "code": "#include <iostream>\n\nint main() {\n    const int max_hp = 100;\n    int hp = 75;\n    unsigned int stimpaks = 6;\n\n    // max_hp = 120; // Error: la variable es const\n    hp += 10;\n    std::cout << hp << '/' << max_hp << '\\n'; // 85/100\n    std::cout << stimpaks << '\\n';            // 6\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Familias de operadores",
              "content": [
                "• **Aritméticos:** +, -, *, / y % calculan valores. La división entre enteros descarta la parte fraccionaria.",
                "• **Relacionales:** ==, !=, <, <=, > y >= comparan y producen un bool.",
                "• **Lógicos:** &&, || y ! combinan condiciones. && y || pueden omitir la evaluación de su operando derecho.",
                "• **De bits:** &, |, ^, ~, << y >> operan sobre la representación de enteros. Son útiles para máscaras y permisos.",
                "A continuación, cada ejemplo es un programa independiente. Predice su salida antes de ejecutarlo."
              ]
            },
            {
              "title": "Aritmética y división",
              "content": [
                "Los tipos de los operandos importan: 7 / 2 divide enteros; 7.0 / 2 realiza una división de punto flotante."
              ],
              "code": "#include <iostream>\n\nint main() {\n    const int a = 7;\n    const int b = 2;\n    std::cout << a + b << '\\n';   // 9\n    std::cout << a - b << '\\n';   // 5\n    std::cout << a * b << '\\n';   // 14\n    std::cout << a / b << '\\n';   // 3: se descarta la fracción\n    std::cout << a % b << '\\n';   // 1: residuo de la división\n    std::cout << 7.0 / b << '\\n'; // 3.5\n    std::cout << 2 + 3 * 4 << '\\n';   // 14\n    std::cout << (2 + 3) * 4 << '\\n'; // 20\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Asignar e incrementar",
              "content": [
                "= asigna; == compara. Las asignaciones compuestas modifican la variable. Como instrucciones separadas, ++hp y hp++ incrementan ambos en uno.",
                "Evita modificar varias veces una misma variable dentro de una expresión complicada; separa las acciones para hacer explícito el orden."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 50;\n    hp += 10;\n    std::cout << hp << '\\n'; // 60\n    hp -= 5;\n    std::cout << hp << '\\n'; // 55\n    ++hp;\n    std::cout << hp << '\\n'; // 56\n    hp++;\n    std::cout << hp << '\\n'; // 57\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Comparaciones",
              "content": [
                "std::boolalpha hace que cout muestre true y false en lugar de 1 y 0. No modifica el resultado de las comparaciones."
              ],
              "code": "#include <iostream>\n\nint main() {\n    const int hp = 75;\n    std::cout << std::boolalpha;\n    std::cout << (hp == 100) << '\\n'; // false\n    std::cout << (hp != 100) << '\\n'; // true\n    std::cout << (hp < 50) << '\\n';   // false\n    std::cout << (hp <= 75) << '\\n';  // true\n    std::cout << (hp > 0) << '\\n';    // true\n    std::cout << (hp >= 100) << '\\n'; // false\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Lógica y cortocircuito",
              "content": [
                "&& necesita ambas condiciones; || necesita al menos una; ! invierte el valor lógico.",
                "En la última expresión, como divisor != 0 es false, no se evalúa la división. Cambiar && por & eliminaría ese cortocircuito."
              ],
              "code": "#include <iostream>\n\nint main() {\n    const int hp = 40;\n    const int stimpaks = 2;\n    const bool paused = false;\n    const int divisor = 0;\n    std::cout << std::boolalpha;\n    std::cout << (hp < 100 && stimpaks > 0) << '\\n'; // true\n    std::cout << (hp <= 0 || paused) << '\\n';        // false\n    std::cout << !paused << '\\n';                   // true\n    std::cout << (divisor != 0 && 10 / divisor > 1) << '\\n'; // false\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Bits y máscaras",
              "content": [
                "Usamos enteros sin signo y literales binarios para observar cada bit. A diferencia de && y ||, & y | no combinan condiciones con cortocircuito.",
                "<< desplaza bits cuando opera sobre enteros; en cout << valor es el operador de inserción del flujo."
              ],
              "code": "#include <iostream>\n\nint main() {\n    const unsigned a = 0b1100; // 12\n    const unsigned b = 0b1010; // 10\n    std::cout << (a & b) << '\\n'; //  8: 1000\n    std::cout << (a | b) << '\\n'; // 14: 1110\n    std::cout << (a ^ b) << '\\n'; //  6: 0110\n    std::cout << ((~a) & 0b1111u) << '\\n'; // 3: últimos cuatro bits\n    std::cout << (1u << 3) << '\\n'; // 8: 0001 -> 1000\n    std::cout << (8u >> 1) << '\\n'; // 4: 1000 -> 0100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Comprueba lo que sabes",
              "content": [
                "Predice el resultado antes de ejecutar el código."
              ],
              "quiz": {
                "question": "¿Qué imprime esta división entre enteros?",
                "code": "int total = 7;\nint grupos = 2;\nstd::cout << total / grupos;",
                "options": [
                  "3.5",
                  "3",
                  "4",
                  "Un error de compilación"
                ],
                "correctIndex": 1,
                "explanation": "Ambos operandos son int, así que la división produce 3. La parte fraccionaria se descarta; usa un operando de punto flotante para obtener 3.5."
              }
            }
          ]
        },
        {
          "id": 6,
          "num": 6,
          "title": "Control de flujo y entrada/salida",
          "description": "Condiciones y bucles, una técnica de entrada o salida por ejemplo y ejercicios de lógica.",
          "slides": [
            {
              "title": "Elegir y repetir instrucciones",
              "content": [
                "Las condiciones seleccionan una ruta según los datos. Los bucles vuelven a ejecutar un bloque mientras se cumpla una condición o queden elementos.",
                "Empezaremos con enteros y booleanos que ya conoces. Más adelante usaremos estas mismas estructuras con el estado del Pip-Boy."
              ]
            },
            {
              "title": "Condiciones con if y else",
              "content": [
                "Las ramas se evalúan en orden. Se ejecuta la primera que cumple su condición; else cubre los demás casos."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 25;\n    if (hp <= 0) {\n        std::cout << \"Sin salud\\n\";\n    } else if (hp < 50) {\n        std::cout << \"Salud baja\\n\"; // Se ejecuta esta rama\n    } else {\n        std::cout << \"Salud estable\\n\";\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Selección con switch",
              "content": [
                "switch compara un entero con etiquetas case constantes. break sale del switch; default atiende los valores que no coinciden con ningún case."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int option = 2;\n    switch (option) {\n        case 1:\n            std::cout << \"Iniciar partida\\n\";\n            break;\n        case 2:\n            std::cout << \"Cargar partida\\n\"; // Se imprime esta línea\n            break;\n        case 3:\n            std::cout << \"Salir\\n\";\n            break;\n        default:\n            std::cout << \"Opción inválida\\n\";\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Elegir un bucle",
              "content": [
                "• while comprueba antes de ejecutar: puede repetir cero veces.",
                "• do-while comprueba al final: ejecuta al menos una vez.",
                "• for reúne inicio, condición y avance: resulta cómodo con contadores.",
                "• El for basado en rango recorre los elementos de una colección. Veremos cada caso por separado."
              ]
            },
            {
              "title": "While: una bandera de juego",
              "content": [
                "El ciclo continúa mientras running sea true. Al cambiar la bandera a false, termina en la siguiente comprobación.",
                "Aquí simulamos salir del juego en la primera vuelta."
              ],
              "code": "#include <iostream>\n\nint main() {\n    bool running = true;\n\n    while (running) {\n        std::cout << \"Jugando\\n\"; // Se imprime una vez\n        running = false; // Simulamos la acción de salir\n    }\n\n    std::cout << \"Juego cerrado\\n\";\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Do-while: ejecutar al menos una vez",
              "content": [
                "La primera ejecución ocurre antes de comprobar la condición. Observa el punto y coma al final del do-while."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int attempts = 0;\n    do {\n        ++attempts;\n        std::cout << \"Intento \" << attempts << '\\n'; // Intento 1\n    } while (attempts < 1);\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "For: repetir con un contador",
              "content": [
                "La inicialización ocurre una vez; después se alternan condición, cuerpo y avance. La variable level pertenece al bucle."
              ],
              "code": "#include <iostream>\n\nint main() {\n    for (int level = 1; level <= 3; ++level) {\n        std::cout << \"Nivel \" << level << '\\n'; // Nivel 1, 2 y 3\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "For basado en rango",
              "content": [
                "Recorre cada elemento sin administrar un índice. Usamos un arreglo de enteros con tamaño fijo; estudiaremos sus detalles en el siguiente tema."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int scores[] = {10, 20, 30};\n    for (int score : scores) {\n        std::cout << score << '\\n'; // 10, luego 20 y luego 30\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Salida con cout",
              "content": [
                "std::cout pertenece a <iostream>. Encadena texto y valores con << sin escribir especificadores de formato."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 100;\n    std::cout << \"HP: \" << hp << '\\n'; // HP: 100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Salida con printf",
              "content": [
                "std::printf, disponible mediante <cstdio>, conserva la técnica de C: %d corresponde a un int.",
                "Los especificadores deben corresponder a los tipos de los argumentos. Este programa muestra lo mismo que el anterior con otra técnica."
              ],
              "code": "#include <cstdio>\n\nint main() {\n    int hp = 100;\n    std::printf(\"HP: %d\\n\", hp); // HP: 100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Entrada con cin",
              "content": [
                "std::cin >> hp intenta extraer un entero. La variable se escribe directamente, sin usar & como en scanf.",
                "Comprueba el resultado de la extracción antes de utilizar la entrada. Si escribes texto donde se espera un entero, se ejecuta la rama de error."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 0;\n    std::cout << \"HP: \";\n    if (std::cin >> hp) {\n        std::cout << \"Leído: \" << hp << '\\n'; // Con 75: Leído: 75\n    } else {\n        std::cout << \"Entrada inválida\\n\";\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Leer una línea completa",
              "content": [
                "getline lee hasta el salto de línea, conserva los espacios intermedios y retira el delimitador del flujo.",
                "cin >> string lee una palabra separada por espacios. Si mezclas extracción con >> y getline, debes atender el salto de línea que puede quedar pendiente."
              ],
              "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string line;\n    std::cout << \"Comando: \";\n    if (std::getline(std::cin, line)) {\n        std::cout << \"Recibido: \" << line << '\\n';\n        // Con damage head 45: Recibido: damage head 45\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Entrada con scanf",
              "content": [
                "scanf necesita la dirección de la variable: &hp. %d indica la conversión esperada.",
                "Su retorno cuenta las asignaciones realizadas. Aquí debe ser 1 para poder usar el número leído."
              ],
              "code": "#include <cstdio>\n\nint main() {\n    int hp = 0;\n    std::printf(\"HP: \");\n    if (std::scanf(\"%d\", &hp) == 1) {\n        std::printf(\"Leído: %d\\n\", hp); // Con 75: Leído: 75\n    } else {\n        std::printf(\"Entrada inválida\\n\");\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Saltos de línea y flush",
              "content": [
                "'\\n' inserta un salto de línea. std::endl inserta el salto y también solicita vaciar el flujo; std::flush solicita el vaciado sin añadir un salto.",
                "Usa saltos normales para el texto y un flush cuando necesites enviar la salida pendiente, por ejemplo al finalizar un dibujo o un prompt."
              ],
              "code": "#include <iostream>\n\nint main() {\n    std::cout << \"Primera línea\\n\"; // Salto sin flush explícito\n    std::cout << \"Segunda línea\" << std::endl; // Salto y flush\n    std::cout << \"Listo: \" << std::flush; // Flush sin salto\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "flush · Enviar cuando hace falta",
              "content": [
                "Piensa en el búfer como una bandeja de salida: agrupa caracteres antes de enviarlos. flush pide vaciarla. Úsalo cuando necesites enviar un mensaje antes de esperar o iniciar otra operación, o al terminar de dibujar una pantalla.",
                "Vaciar después de cada fragmento impide aprovechar esa agrupación y puede aumentar el trabajo de entrada/salida. Para líneas normales, prefiere '\\n' a endl; reserva el vaciado explícito para los puntos donde importa. No hay una mejora de velocidad fija para todos los entornos.",
                "Por defecto, leer con cin ya vacía cout porque los flujos están vinculados. En el curso hacemos explícito el final del prompt y, antes de fork, vaciamos la salida para no duplicar texto pendiente. flush no garantiza guardar un archivo físicamente en disco."
              ],
              "code": "#include <iostream>\n\nint main() {\n    // Agrupar el dibujo: no hace falta flush por cada pieza.\n    std::cout << \"HP: \" << 78 << \" / \" << 100 << '\\n';\n    std::cout << \"AP: \" << 55 << \" / \" << 100 << '\\n';\n    std::cout << \"$ \" << std::flush; // Pantalla lista; enviar ahora.\n\n    // Evitar esto en cada línea de un listado grande:\n    // std::cout << value << std::endl; // Salto Y flush cada vez.\n    // Preferir: std::cout << value << '\\n';\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "ANSI · Colores y atributos",
              "content": [
                "Una terminal compatible interpreta ESC seguido de instrucciones: en estas cadenas, \\033 representa el carácter ESC (27 en decimal), no los caracteres visibles de una barra y tres cifras. No es una función de C++: cout envía los bytes y la terminal los interpreta.",
                "31m selecciona rojo, 1m activa intensidad/negrita y 0m restablece los atributos. El Pip-Boy usará 38;5;46m para el verde 46 de la paleta de 256 colores y 0m al terminar. El color permanece activo hasta cambiarlo o restablecerlo."
              ],
              "code": "#include <iostream>\n\nint main() {\n    std::cout << \"\\033[31mAlerta roja\\033[0m\\n\";\n    std::cout << \"\\033[1mTexto destacado\\033[0m\\n\";\n    std::cout << \"\\033[38;5;46mVerde del Pip-Boy\\n\";\n    std::cout << \"Este texto sigue verde\\n\";\n    std::cout << \"\\033[0mAtributos predeterminados\\n\" << std::flush;\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "ANSI · Pantalla y cursor",
              "content": [
                "2J borra la pantalla visible, pero no lleva por sí solo el cursor al inicio. H lo coloca en la primera fila y columna: combinaremos ambas secuencias en clear_screen para redibujar el HUD.",
                "2K borra la línea actual; \\r vuelve al principio de esa línea. También puedes posicionar el cursor con fila;columnaH, contando desde 1. Estas operaciones no restablecen el color ni sustituyen a flush.",
                "Prueba los ejemplos en una terminal compatible. Al redirigir la salida a un archivo, los escapes pueden quedar como bytes en lugar de producir efectos visuales; 2J no implica borrar el historial de scroll."
              ],
              "code": "#include <iostream>\n\nint main() {\n    std::cout << \"\\033[2J\\033[H\"; // Limpiar y volver al inicio: HUD\n    std::cout << \"Estado de la terminal\\n\";\n    std::cout << \"\\033[3;5H\"; // Fila 3, columna 5\n    std::cout << \"Cargando...\" << std::flush;\n    std::cout << \"\\r\\033[2K\"; // Volver al inicio y borrar esta línea\n    std::cout << \"Listo\\n\" << std::flush;\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "iomanip · Alinear los números del HUD",
              "content": [
                "Los manipuladores cambian cómo se imprime un valor, no el valor guardado. Incluye <iomanip> para usar std::setw: fija el ancho mínimo de la siguiente salida, rellenando con espacios.",
                "Usaremos setw(3) para HP, AP y XP, y setw(2) para el nivel. Debes repetirlo para cada valor: no queda activo como ancho permanente. Si el número ocupa más, no lo recorta."
              ],
              "code": "#include <iostream>\n#include <iomanip>\n\nint main() {\n    std::cout << \"|\" << std::setw(3) << 9   << \"|\\n\"; // |  9|\n    std::cout << \"|\" << std::setw(3) << 99  << \"|\\n\"; // | 99|\n    std::cout << \"|\" << std::setw(3) << 100 << \"|\\n\"; // |100|\n    std::cout << \"|\" << std::setw(3) << 1234 << \"|\\n\"; // |1234|\n    std::cout << \"HP \" << std::setw(3) << 78 << \" / 100\\n\";\n    // HP  78 / 100: las columnas del HUD quedan alineadas.\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Formato · Alineación y relleno",
              "content": [
                "std::left alinea a la izquierda y std::right a la derecha; std::setfill elige el carácter de relleno. Son útiles para nombres y contadores; left y right están declarados en <ios>, disponible al incluir <iostream>.",
                "A diferencia de setw, la alineación y el relleno siguen activos en el flujo. Restablece right y el espacio al terminar para no cambiar las siguientes salidas del HUD."
              ],
              "code": "#include <iostream>\n#include <iomanip>\n\nint main() {\n    std::cout << \"|\" << std::left << std::setw(8) << \"HP\"\n              << \"|\\n\"; // |HP      |\n    std::cout << \"|\" << std::right << std::setw(8) << \"HP\"\n              << \"|\\n\"; // |      HP|\n    std::cout << std::setfill('0') << std::setw(3) << 7\n              << '\\n'; // 007; el entero sigue siendo 7.\n    std::cout << std::setfill(' ') << std::right;\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "iomanip · Controlar los decimales",
              "content": [
                "std::setprecision ajusta la precisión al imprimir números reales. Con std::fixed indica cuántas cifras mostrar después del punto; sin fixed, con el formato predeterminado, indica cifras significativas.",
                "Es una herramienta adicional, no necesaria para las estadísticas enteras del proyecto. El formato y la precisión persisten: vuelve a defaultfloat y precisión 6 si quieres recuperar la configuración inicial."
              ],
              "code": "#include <iostream>\n#include <iomanip>\n\nint main() {\n    double value = 12.3456;\n    std::cout << std::setprecision(3) << value << '\\n';\n    // 12.3: tres cifras significativas.\n    std::cout << std::fixed << std::setprecision(2)\n              << value << '\\n'; // 12.35: dos decimales.\n    // Se redondea la salida; value no cambia.\n    std::cout << std::defaultfloat << std::setprecision(6);\n    std::cout << value << '\\n'; // 12.3456\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Imprimir en C++23",
              "content": [
                "C++23 incorpora std::print y std::println en <print>, con marcadores {} para insertar valores.",
                "Este ejemplo es una curiosidad fuera de la base C++17/C++20 del curso. Requiere seleccionar C++23 y una biblioteca que implemente <print>."
              ],
              "code": "#include <print>\n\nint main() {\n    const int hp = 100;\n    std::print(\"HP: {}\\n\", hp);      // HP: 100 y salto\n    std::println(\"Stimpaks: {}\", 3); // Stimpaks: 3 y salto\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Comprueba lo que sabes",
              "content": [
                "Predice el resultado antes de ejecutar el código."
              ],
              "quiz": {
                "question": "¿Cuántas veces se ejecuta el cuerpo de este bucle?",
                "code": "int count = 0;\nwhile (count < 3) {\n    ++count;\n}",
                "options": [
                  "0 veces",
                  "2 veces",
                  "3 veces",
                  "4 veces"
                ],
                "correctIndex": 2,
                "explanation": "El cuerpo se ejecuta con count igual a 0, 1 y 2. Después del tercer incremento, count vale 3 y la condición deja de cumplirse. Esta lógica es la misma en C y C++."
              }
            }
          ]
        },
        {
          "id": 7,
          "num": 7,
          "title": "Arreglos, punteros y memoria",
          "description": "Direcciones, arreglos de tamaño fijo, referencias y el origen de nullptr.",
          "slides": [
            {
              "title": "Memoria y duración de los datos",
              "content": [
                "Un programa maneja valores que necesitan almacenamiento. Conviene distinguir el lugar donde se almacenan de cuánto tiempo siguen siendo válidos.",
                "Las variables locales ordinarias tienen duración automática; las variables static y globales viven durante toda la ejecución. También podemos obtener almacenamiento dinámico cuya liberación debe gestionarse.",
                "En los sistemas habituales hablamos de stack y heap. C++ define reglas de vida de objetos, pero no exige que cada variable corresponda a una ubicación física específica."
              ]
            },
            {
              "title": "Variables locales y ámbito",
              "content": [
                "Un bloque delimita el ámbito donde puedes usar un nombre. Su variable local ordinaria termina su vida al salir del bloque.",
                "No guardes la dirección de una variable local para utilizarla después de que termine su vida."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 100;\n    {\n        int damage = 25;\n        hp -= damage;\n        std::cout << hp << '\\n'; // 75\n    }\n    // std::cout << damage; // Error: damage está fuera de ámbito\n    std::cout << hp << '\\n'; // 75: hp sigue vivo\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Almacenamiento dinámico",
              "content": [
                "A veces no conocemos de antemano cuántos datos habrá o necesitamos que vivan más allá de una llamada. El almacenamiento dinámico permite atender esas necesidades.",
                "En C suele gestionarse con malloc y free; en C++ existen new y delete, pero normalmente preferimos tipos que administran sus recursos, como std::string y std::vector.",
                "El objeto que administra los datos y su contenido pueden tener ubicaciones distintas. Un vector local puede poseer un arreglo dinámico; una string pequeña puede guardar caracteres dentro del propio objeto.",
                "No necesitamos reservar memoria a mano para el Pip-Boy. Más adelante estudiaremos cómo su limpieza se relaciona con la vida de los objetos mediante RAII."
              ]
            },
            {
              "title": "Stack vs. heap",
              "content": [
                "En las implementaciones habituales, el **stack (pila)** aloja variables locales de duración automática y el **heap** proporciona almacenamiento dinámico.",
                "Un puntero local puede apuntar a un objeto en cualquiera de los dos: **dónde vive el puntero y dónde vive el objeto apuntado son cosas distintas**.",
                "nota: Preferiremos variables locales y contenedores que gestionan sus recursos. No necesitas reservar memoria manualmente para usar punteros; C++ define la duración de los objetos, no una ubicación obligatoria para cada variable."
              ],
              "table": {
                "headers": [
                  "Aspecto",
                  "Stack · pila",
                  "Heap · memoria dinámica"
                ],
                "rows": [
                  [
                    "Duración",
                    "El objeto local vive hasta salir de su ámbito",
                    "La reserva dura hasta que su propietario la libera"
                  ],
                  [
                    "Gestión",
                    "Automática al entrar y salir de los ámbitos",
                    "Un contenedor o propietario la gestiona; si reservas manualmente, debes liberarla"
                  ],
                  [
                    "Tamaño",
                    "Capacidad limitada; evita arreglos locales enormes",
                    "Permite reservas que se ajustan durante la ejecución; también tiene límites"
                  ],
                  [
                    "Coste habitual",
                    "Reservar y recuperar espacio suele ser sencillo",
                    "Reservar y liberar suele requerir más trabajo de administración"
                  ],
                  [
                    "Uso típico",
                    "Variables temporales, como un contador o los HP",
                    "Datos cuyo tamaño cambia, como los elementos de un vector"
                  ]
                ]
              }
            },
            {
              "title": "Punteros: guardar una dirección",
              "content": [
                "Un puntero almacena una dirección en el espacio de direcciones del proceso. No debe describirse como una dirección física de RAM.",
                "En int* ptr, * forma parte de la declaración del tipo puntero; &hp obtiene la dirección del entero existente. La dirección concreta puede variar entre ejecuciones."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 100;\n    int* ptr = &hp;\n\n    std::cout << &hp << '\\n'; // Dirección de hp\n    std::cout << ptr << '\\n'; // La misma dirección\n    std::cout << std::boolalpha << (ptr == &hp) << '\\n'; // true\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Punteros: acceder al valor",
              "content": [
                "En una expresión, *ptr accede al objeto apuntado. Escribir a través de ese acceso modifica el objeto original.",
                "Aquí sabemos que ptr apunta a hp y que hp sigue vivo. Un puntero debe apuntar a un objeto válido antes de desreferenciarlo; ser distinto de nulo no basta si quedó colgando."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 100;\n    int* ptr = &hp;\n    std::cout << *ptr << '\\n'; // 100\n    *ptr = 75;\n    std::cout << hp << '\\n';   // 75\n    hp = 50;\n    std::cout << *ptr << '\\n'; // 50\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Arreglos de tamaño fijo",
              "content": [
                "Un arreglo agrupa elementos contiguos del mismo tipo. En int hp[3], el tamaño es fijo y los índices válidos van de 0 a 2.",
                "Lo llamamos arreglo estático por su tamaño fijo; eso no significa que esté declarado con la palabra static. Este arreglo local tiene duración automática."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp[3] = {100, 80, 60};\n    std::cout << hp[0] << '\\n'; // 100\n    std::cout << hp[2] << '\\n'; // 60\n    hp[1] = 50;\n    std::cout << hp[1] << '\\n'; // 50\n    // hp[3] = 0; // Fuera de límites: comportamiento indefinido\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Inicializar y recorrer un arreglo",
              "content": [
                "Podemos deducir el tamaño desde los valores iniciales. Las llaves vacías inicializan a cero los elementos de un arreglo de enteros.",
                "El bucle por índices permite usar la posición; el basado en rango permite visitar los valores directamente."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int scores[] = {10, 20, 30}; // Tamaño deducido: 3\n    int zeros[3] = {};           // {0, 0, 0}\n\n    for (int i = 0; i < 3; ++i) {\n        std::cout << scores[i] << '\\n'; // 10, 20, 30\n    }\n    for (int value : zeros) {\n        std::cout << value << '\\n'; // 0, 0, 0\n    }\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Arreglos y punteros",
              "content": [
                "En muchas expresiones, un arreglo se convierte en un puntero a su primer elemento. Esto no convierte al arreglo y al puntero en el mismo tipo.",
                "Al sumar uno a un int*, avanzas un elemento int. La aritmética de punteros debe mantenerse dentro del arreglo o en su posición inmediatamente posterior; esta última no se puede desreferenciar."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp[] = {100, 80, 60};\n    int* ptr = hp; // Equivale aquí a &hp[0]\n    std::cout << *ptr << '\\n';       // 100\n    std::cout << *(ptr + 1) << '\\n'; // 80\n    ptr[2] = 40;\n    std::cout << hp[2] << '\\n';      // 40\n    std::cout << sizeof(hp) / sizeof(hp[0]) << '\\n'; // 3\n    // sizeof(ptr) mide el puntero, no los elementos del arreglo.\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Referencias: otro nombre para el objeto",
              "content": [
                "C++ añade referencias: int& alias debe inicializarse y queda asociado a ese entero. Asignar a alias cambia el valor del entero; no lo asocia a otro objeto.",
                "Una referencia no tiene un estado nulo válido. Al igual que un puntero, no puede seguir usándose después de que termine la vida del objeto referido."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int hp = 100;\n    int other = 20;\n    int& alias = hp;\n    alias = 75;\n    std::cout << hp << '\\n'; // 75\n    alias = other;           // Copia 20 a hp; no reasocia alias\n    std::cout << hp << \" \" << other << '\\n'; // 20 20\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Formas de pasar un parámetro",
              "content": [
                "Esta tabla anticipa cómo se comportan los parámetros de una función. En el próximo tema construiremos ejemplos completos para cada caso.",
                "Una referencia evita copiar el objeto referido; un parámetro puntero copia la dirección. Reasignar ese puntero local no reasigna el puntero del llamador."
              ],
              "table": {
                "headers": [
                  "Sintaxis",
                  "Qué recibe",
                  "Efecto sobre el original"
                ],
                "nowrapFirstColumn": true,
                "rows": [
                  [
                    "`f(int x)`",
                    "Un valor independiente",
                    "Cambiar x no cambia la variable del llamador"
                  ],
                  [
                    "`f(const int& x)`",
                    "Un alias de solo lectura",
                    "Lee el original sin modificarlo mediante x"
                  ],
                  [
                    "`f(int& x)`",
                    "Un alias mutable",
                    "Asignar a x modifica el original"
                  ],
                  [
                    "`f(int* x)`",
                    "Una dirección",
                    "Puede modificar *x si apunta a un objeto válido"
                  ]
                ]
              }
            },
            {
              "title": "nullptr: ausencia de un objeto",
              "content": [
                "Desde C++11, nullptr expresa que un puntero no apunta a un objeto. Inicializarlo así evita dejar un valor indeterminado.",
                "Antes de usar un puntero opcional, comprueba si es nulo. La comprobación no detecta si un puntero no nulo apunta a un objeto cuya vida ya terminó."
              ],
              "code": "#include <iostream>\n\nint main() {\n    int* selected = nullptr;\n    if (selected == nullptr) {\n        std::cout << \"Sin selección\\n\"; // Se imprime\n    }\n    int hp = 100;\n    selected = &hp;\n    if (selected != nullptr) {\n        *selected = 75;\n    }\n    std::cout << hp << '\\n'; // 75\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "De NULL a nullptr",
              "content": [
                "En C, NULL es una macro para expresar un puntero nulo; tradicionalmente puede expandirse a 0 o a una expresión como (void*)0. El cero se convierte en puntero nulo en el contexto correspondiente.",
                "C++ heredó el uso de 0 y NULL. Su definición concreta depende de la implementación, y tratar el cero como entero o como puntero puede producir sorpresas al elegir entre funciones sobrecargadas.",
                "C++11 introdujo nullptr, una palabra clave cuyo tipo es std::nullptr_t. Se convierte a tipos puntero, pero no a int: hace explícita la intención y evita confundir ausencia con un número.",
                "En C++17/C++20 preferimos nullptr para punteros. No es el carácter '\\0' que termina una cadena, ni significa necesariamente una dirección física formada por todos ceros."
              ],
              "sources": [
                {
                  "name": "Origen de nullptr",
                  "description": "Motivación y ejemplos de C++11 por Bjarne Stroustrup.",
                  "url": "https://www.stroustrup.com/C++11FAQ.html#nullptr"
                }
              ]
            },
            {
              "title": "Comprueba lo que sabes",
              "content": [
                "Predice el resultado antes de ejecutar el código."
              ],
              "quiz": {
                "question": "Usando las reglas de punteros que ya conoces de C, ¿cuánto vale hp al final?",
                "code": "int hp = 100;\nint* ptr = &hp;\n*ptr -= 25;\nstd::cout << hp;",
                "options": [
                  "100",
                  "75",
                  "25",
                  "La dirección de hp"
                ],
                "correctIndex": 1,
                "explanation": "ptr guarda &amp;hp y *ptr accede a ese mismo entero. Restar 25 mediante el puntero cambia hp a 75, tanto en C como en C++."
              }
            }
          ]
        },
        {
          "id": 8,
          "num": 8,
          "title": "Strings, funciones y modularidad",
          "description": "Construir cadenas, definir funciones y separar contratos e implementaciones en archivos.",
          "slides": [
            {
              "title": "Una cadena con std::string",
              "content": [
                "std::string es el tipo de la biblioteca estándar para poseer y manipular secuencias de char. Para usarlo, incluye <string>.",
                "Puedes asignar texto, copiarlo, concatenarlo y consultar su tamaño sin reservar ni liberar su almacenamiento a mano.",
                "size() cuenta elementos char, que para UTF-8 son bytes: una letra con acento puede ocupar varios. No es un contador general de letras o de columnas visibles."
              ]
            },
            {
              "title": "Construir y combinar texto",
              "content": [
                "Con + creas una concatenación; con += agregas texto a la misma cadena. Dos objetos string distintos tienen valores independientes."
              ],
              "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string user = \"Ana\";\n    std::string prompt = user + \"@pipboy\";\n    prompt += \":~$\";\n    std::string copy = user;\n    copy[0] = 'E';\n    std::cout << prompt << '\\n';      // Ana@pipboy:~$\n    std::cout << user.size() << '\\n'; // 3\n    std::cout << user << \" \" << copy << '\\n'; // Ana Ena\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Consultar y comparar cadenas",
              "content": [
                "== compara el contenido de dos strings. empty() indica si no hay caracteres y find() busca una subcadena.",
                "find devuelve una posición o std::string::npos si no encuentra. Para acceder con [], el índice debe ser válido; at() comprueba los límites y lanza una excepción si no lo es."
              ],
              "code": "#include <iostream>\n#include <string>\n\nint main() {\n    std::string command = \"damage head\";\n    std::cout << std::boolalpha;\n    std::cout << (command == \"help\") << '\\n'; // false\n    std::cout << command.empty() << '\\n';    // false\n    std::cout << command.find(\"head\") << '\\n'; // 7\n    std::cout << command.at(0) << '\\n';       // d\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "std::string frente a las cadenas de C",
              "content": [
                "En C, una cadena es una secuencia de char terminada en '\\0'. Un char* solo guarda una dirección: por sí solo no informa capacidad, longitud ni propiedad.",
                "std::string administra su almacenamiento y recuerda su tamaño. Eso simplifica el trabajo, aunque todavía debes respetar límites y la vida de sus datos."
              ],
              "table": {
                "headers": [
                  "Operación",
                  "Cadena de C",
                  "std::string"
                ],
                "rows": [
                  [
                    "Almacenamiento",
                    "char name[16]; capacidad fija en ese arreglo",
                    "std::string name; ajusta su almacenamiento"
                  ],
                  [
                    "Longitud",
                    "strlen recorre hasta el primer '\\0'",
                    "size() consulta el tamaño almacenado"
                  ],
                  [
                    "Comparación",
                    "strcmp compara contenido; == entre punteros compara direcciones",
                    "== compara el contenido"
                  ],
                  [
                    "Concatenación",
                    "Requiere capacidad suficiente y gestionar límites",
                    "+ o += construyen o amplían el texto"
                  ]
                ]
              }
            },
            {
              "title": "El puente hacia una API de C",
              "content": [
                "c_str() ofrece un const char* terminado en cero. Desde C++17, data() de una string no const también ofrece acceso mutable a los caracteres.",
                "Son accesos prestados: no liberes esos punteros ni los conserves después de destruir o de modificar de formas que invaliden el almacenamiento de la string. data() no autoriza escribir más allá de size()."
              ],
              "code": "#include <cstring>\n#include <iostream>\n#include <string>\n\nint main() {\n    std::string name = \"Ana\";\n    const char* text = name.c_str();\n    std::cout << std::strlen(text) << '\\n'; // 3\n    char* buffer = name.data(); // C++17 o posterior\n    buffer[0] = 'E';\n    std::cout << name << '\\n'; // Ena\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Funciones y procedimientos",
              "content": [
                "Una función reúne instrucciones bajo un nombre. La defines una vez y la llamas cuando necesitas esa operación.",
                "Su interfaz indica tipo de retorno, nombre y parámetros. La llamada aporta argumentos concretos para esos parámetros.",
                "En algunos cursos se llama procedimiento a una rutina que no devuelve un valor. En C++ también se declara como función, con tipo de retorno void.",
                "Devolver un resultado y mostrarlo en pantalla son acciones distintas: una función puede calcular sin imprimir, o imprimir sin devolver un dato."
              ]
            },
            {
              "title": "Parámetros y valor de retorno",
              "content": [
                "a y b son parámetros locales. En sum(20, 5), 20 y 5 son los argumentos. return entrega el resultado al llamador y termina esa llamada.",
                "Guarda o usa el resultado de la llamada; la función no lo imprime por sí misma."
              ],
              "code": "#include <iostream>\n\nint sum(int a, int b) {\n    return a + b;\n}\n\nint main() {\n    int result = sum(20, 5);\n    std::cout << result << '\\n';     // 25\n    std::cout << sum(3, 4) << '\\n';  // 7\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Procedimiento: una función void",
              "content": [
                "void indica que no se devuelve un valor. Un return sin expresión permite terminar antes; llegar a la llave final también termina la llamada."
              ],
              "code": "#include <iostream>\n\nvoid show_hp(int hp) {\n    if (hp < 0) {\n        std::cout << \"HP inválido\\n\";\n        return;\n    }\n    std::cout << \"HP: \" << hp << '\\n';\n}\n\nint main() {\n    show_hp(75); // HP: 75\n    show_hp(-1); // HP inválido\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Paso por valor: trabajar con una copia",
              "content": [
                "Cambiar el parámetro hp no cambia el hp de main. Los nombres iguales pertenecen a ámbitos diferentes.",
                "Esta función devuelve el nuevo valor; el llamador decide si lo asigna al original."
              ],
              "code": "#include <iostream>\n\nint damaged_hp(int hp, int damage) {\n    hp -= damage;\n    return hp;\n}\n\nint main() {\n    int hp = 100;\n    int result = damaged_hp(hp, 25);\n    std::cout << hp << \" \" << result << '\\n'; // 100 75\n    hp = result;\n    std::cout << hp << '\\n'; // 75\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Paso por referencia: modificar el original",
              "content": [
                "int& hp es un alias del argumento. La llamada no escribe &: la referencia forma parte de la declaración del parámetro."
              ],
              "code": "#include <iostream>\n\nvoid damage_hp(int& hp, int damage) {\n    hp -= damage;\n}\n\nint main() {\n    int hp = 100;\n    damage_hp(hp, 25);\n    std::cout << hp << '\\n'; // 75\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Referencia constante: leer sin copiar",
              "content": [
                "const std::string& permite consultar la cadena original sin copiarla y sin modificarla mediante ese parámetro.",
                "Es útil para textos y objetos que solo necesitamos leer. Para enteros pequeños, pasar por valor suele ser suficiente."
              ],
              "code": "#include <iostream>\n#include <string>\n\nvoid greet(const std::string& name) {\n    std::cout << \"Hola, \" << name << '\\n';\n    // name += \"!\"; // Error: acceso constante\n}\n\nint main() {\n    std::string name = \"Ana\";\n    greet(name); // Hola, Ana\n    std::cout << name << '\\n'; // Ana\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Parámetro puntero: admitir ausencia",
              "content": [
                "El llamador entrega una dirección. La función puede aceptar nullptr como ausencia y decidir qué hacer sin desreferenciarlo.",
                "Esta técnica se parece al paso de direcciones que ya usabas en C."
              ],
              "code": "#include <iostream>\n\nvoid restore(int* hp) {\n    if (hp == nullptr) return;\n    *hp = 100;\n}\n\nint main() {\n    int hp = 50;\n    restore(&hp);\n    restore(nullptr); // No modifica ningún objeto\n    std::cout << hp << '\\n'; // 100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Argumentos por defecto",
              "content": [
                "Un valor por defecto permite omitir ese argumento al llamar. Los parámetros con valores por defecto se colocan después de los obligatorios.",
                "En un proyecto con cabeceras, escribe el valor por defecto en la declaración visible para el llamador y no lo repitas en la definición.",
                "La expresión condición ? valor_si_se_cumple : valor_si_no elige uno de dos valores. Aquí limita el resultado a 100."
              ],
              "code": "#include <iostream>\n\nint heal(int hp, int amount = 30) {\n    int result = hp + amount;\n    return result > 100 ? 100 : result;\n}\n\nint main() {\n    std::cout << heal(50) << '\\n';     // 80: amount usa 30\n    std::cout << heal(50, 10) << '\\n'; // 60: amount usa 10\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Declaraciones y definiciones",
              "content": [
                "Una declaración anuncia una función: nombre, retorno y tipos de parámetros. Su definición añade el cuerpo que ejecuta la operación.",
                "Las cabeceras (.hpp o .h) comparten declaraciones y definiciones de tipos. Los .cpp contienen normalmente las implementaciones de las funciones del proyecto.",
                "El compilador necesita ver una declaración antes de usar la función. El enlazador necesita encontrar su definición al construir el ejecutable.",
                "En el siguiente ejemplo crearemos una cabecera y dos .cpp. No se incluye un .cpp desde otro: ambos se pasan al compilador."
              ]
            },
            {
              "title": "Ejemplo: tres archivos conectados",
              "content": [
                "Crea los tres archivos en una misma carpeta para este ejemplo. La cabecera anuncia add, math.cpp lo define y main.cpp lo usa.",
                "Al cambiar la implementación sin cambiar la firma, el código que llama puede mantenerse igual."
              ],
              "multiFile": [
                {
                  "filename": "math.hpp",
                  "path": "math.hpp",
                  "desc": "Declaración compartida.",
                  "code": "#pragma once\n\nint add(int a, int b);\n"
                },
                {
                  "filename": "math.cpp",
                  "path": "math.cpp",
                  "desc": "Definición de la función.",
                  "code": "#include \"math.hpp\"\n\nint add(int a, int b) {\n    return a + b;\n}\n"
                },
                {
                  "filename": "main.cpp",
                  "path": "main.cpp",
                  "desc": "Programa que usa la cabecera.",
                  "code": "#include \"math.hpp\"\n#include <iostream>\n\nint main() {\n    std::cout << add(20, 5) << '\\n'; // 25\n    return 0;\n}\n"
                }
              ],
              "terminal": "g++ -std=c++20 -Wall -Wextra main.cpp math.cpp -o example\n./example\n# Salida: 25"
            },
            {
              "title": "Qué hace #include",
              "content": [
                "#include es una directiva del preprocesador: procesa la cabecera incluida como parte de la unidad de traducción. No ejecuta el archivo ni enlaza automáticamente su .cpp asociado.",
                "Usamos <iostream> y <string> para cabeceras de biblioteca. Las comillas, como en \"math.hpp\", permiten buscar primero según las reglas locales del compilador; en g++ se empieza por la carpeta del archivo que incluye.",
                "La opción -Iinclude añade una carpeta de búsqueda. Si una cabecera usa std::string, debe incluir <string> directamente en vez de depender accidentalmente de otra cabecera.",
                "Un .cpp con sus inclusiones forma una unidad de traducción. Cada .cpp se compila por separado; después se enlazan sus archivos objeto."
              ]
            },
            {
              "title": "#pragma once en acción",
              "content": [
                "main.cpp incluye limits.hpp dos veces a propósito. Abre ambas pestañas para ver cómo se conectan los archivos.",
                "• **Con #pragma once:** g++ procesa la cabecera una sola vez. El programa compila y muestra **100**.",
                "• **Sin #pragma once:** la constante max_hp se define dos veces en la misma unidad de traducción. Al recompilar, g++ informa un **error de redefinición**."
              ],
              "multiFile": [
                {
                  "filename": "limits.hpp",
                  "path": "limits.hpp",
                  "desc": "La directiva evita repetir la definición de la constante.",
                  "code": "#pragma once\n\nconst int max_hp = 100;\n"
                },
                {
                  "filename": "main.cpp",
                  "path": "main.cpp",
                  "desc": "Dos inclusiones deliberadas dentro de la misma unidad de traducción.",
                  "code": "#include \"limits.hpp\"\n#include \"limits.hpp\" // Repetida a propósito\n#include <iostream>\n\nint main() {\n    std::cout << max_hp << '\\n'; // 100\n    return 0;\n}\n"
                }
              ]
            },
            {
              "title": "Evitar inclusiones repetidas",
              "content": [
                "Si dos cabeceras incluyen una tercera, sus declaraciones o tipos podrían aparecer repetidos en la misma unidad de traducción.",
                "#pragma once pide al compilador procesar esa cabecera una sola vez por unidad de traducción. g++ lo admite, aunque no es una directiva del estándar de C++.",
                "La alternativa estándar son las guardas de inclusión: una macro marca que el contenido ya se procesó. Este ejemplo equivale al papel de pragma once en nuestra cabecera.",
                "Ninguna técnica permite definir libremente una función ordinaria no inline en una cabecera incluida desde varios .cpp: la unicidad durante el enlace es un problema distinto."
              ],
              "filename": "math.hpp",
              "code": "#ifndef ROBCO_MATH_HPP\n#define ROBCO_MATH_HPP\n\nint add(int a, int b);\n\n#endif\n"
            },
            {
              "title": "Namespaces: organizar nombres",
              "content": [
                "Un namespace agrupa nombres. El operador :: indica a qué espacio pertenece la función: así podemos tener dos show sin colisiones.",
                "No cambia cómo se almacenan los objetos ni crea una clase. En el proyecto agruparemos nuestro código bajo robco."
              ],
              "code": "#include <iostream>\n\nnamespace robco {\n    void show() { std::cout << \"Pip-Boy\\n\"; }\n}\nnamespace debug {\n    void show() { std::cout << \"Diagnóstico\\n\"; }\n}\n\nint main() {\n    robco::show(); // Pip-Boy\n    debug::show(); // Diagnóstico\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Namespaces en cabeceras",
              "content": [
                "En la cabecera, declara dentro de namespace robco; en el .cpp, define dentro del mismo namespace. El llamador usará robco::add(20, 5).",
                "std es el espacio de nombres de la biblioteca estándar. Escribir std::string o std::cout deja explícito de dónde viene cada nombre.",
                "Evita using namespace std; en el ámbito global de una cabecera: esa directiva afecta a los archivos que la incluyen y puede generar ambigüedades con otros nombres visibles."
              ],
              "filename": "math.hpp",
              "code": "#pragma once\n\nnamespace robco {\n    int add(int a, int b);\n}\n"
            },
            {
              "title": "Comprueba lo que sabes",
              "content": [
                "Predice el resultado antes de ejecutar el código."
              ],
              "quiz": {
                "question": "¿Qué imprime el programa y por qué?",
                "code": "void change(int x) {\n    x = 20;\n}\n\nint main() {\n    int hp = 100;\n    change(hp);\n    std::cout << hp;\n}",
                "options": [
                  "20, porque los nombres se refieren al mismo entero",
                  "100, porque x recibe una copia del valor",
                  "La dirección de hp",
                  "No compila porque change es void"
                ],
                "correctIndex": 1,
                "explanation": "El parámetro int x se pasa por valor. Cambiarlo no cambia hp. Podrías modificar el original con int&amp; x o devolviendo un valor y asignándolo en main."
              }
            }
          ]
        },
        {
          "id": 9,
          "num": 9,
          "title": "Tipos propios y orientación a objetos",
          "description": "Structs, métodos, clases, encapsulación, constructores, destructores y enumeraciones.",
          "slides": [
            {
              "title": "Organizar datos y comportamiento",
              "content": [
                "Hasta ahora usamos funciones y valores separados. Cuando varios datos describen una misma entidad, un tipo propio hace explícita esa relación.",
                "La programación orientada a objetos reúne estado y operaciones en tipos. Un objeto es una instancia concreta: dos moradores pueden compartir las mismas operaciones y tener distinta salud.",
                "C++ permite combinar este enfoque con funciones libres y programación procedural. No es necesario convertir todo en una clase."
              ]
            },
            {
              "title": "Struct: un tipo con varios campos",
              "content": [
                "struct define un tipo compuesto. Cada objeto tiene sus propios campos; el operador . permite acceder a ellos.",
                "Los inicializadores de los miembros proporcionan valores de partida. Declarar el tipo no crea todavía al personaje: lo crea la variable de main."
              ],
              "code": "#include <iostream>\n#include <string>\n\nstruct Dweller {\n    std::string name = \"Ana\";\n    int hp = 100;\n};\n\nint main() {\n    Dweller first;\n    Dweller second;\n    second.name = \"Luis\";\n    second.hp = 75;\n    std::cout << first.name << \" \" << first.hp << '\\n';   // Ana 100\n    std::cout << second.name << \" \" << second.hp << '\\n'; // Luis 75\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Métodos: operaciones del objeto",
              "content": [
                "Un método es una función miembro. Dentro de take_damage, hp se refiere al campo de la instancia sobre la que hiciste la llamada.",
                "El puntero implícito this identifica esa instancia; hp y this->hp designan aquí el mismo miembro. Cada objeto conserva su propio estado."
              ],
              "code": "#include <iostream>\n\nstruct Dweller {\n    int hp = 100;\n    void take_damage(int amount) {\n        if (amount > 0) {\n            hp = amount >= hp ? 0 : hp - amount;\n        }\n    }\n};\n\nint main() {\n    Dweller first;\n    Dweller second;\n    first.take_damage(25);\n    std::cout << first.hp << '\\n';  // 75\n    std::cout << second.hp << '\\n'; // 100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Métodos const: consultar el estado",
              "content": [
                "const al final de un método indica que no modifica los miembros ordinarios mediante this. Permite invocarlo sobre un objeto o una referencia const.",
                "Un método que modifica hp no debe ser const. La constancia no significa que el método no pueda imprimir o producir otros efectos externos."
              ],
              "code": "#include <iostream>\n\nstruct Dweller {\n    int hp = 100;\n    bool is_alive() const {\n        return hp > 0;\n    }\n};\n\nint main() {\n    const Dweller dweller;\n    std::cout << std::boolalpha << dweller.is_alive() << '\\n'; // true\n    // dweller.hp = 0; // Error: dweller es constante\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Encapsular para mantener reglas",
              "content": [
                "Si hp es público, cualquier código puede asignarle un valor inválido. Encapsular permite controlar cómo se consulta y modifica el estado.",
                "public expone la interfaz de uso; private reserva detalles para la implementación del propio tipo. La meta es mantener reglas como 0 <= hp <= 100.",
                "Abstracción significa ofrecer operaciones con sentido, como take_damage, sin obligar al llamador a conocer cada detalle de su cálculo. Encapsulación es el mecanismo para restringir el acceso a esos detalles."
              ]
            },
            {
              "title": "Class: una interfaz pública",
              "content": [
                "Los campos privados se modifican a través de operaciones que comprueban sus argumentos. El getter permite consultar sin exponer una referencia mutable.",
                "Cambiar la implementación privada no obliga al llamador a reescribir la operación d.take_damage(25)."
              ],
              "code": "#include <iostream>\n\nclass Dweller {\n    int hp = 100; // private por defecto\npublic:\n    void take_damage(int amount) {\n        if (amount > 0) hp = amount >= hp ? 0 : hp - amount;\n    }\n    int get_hp() const { return hp; }\n};\n\nint main() {\n    Dweller d;\n    d.take_damage(25);\n    std::cout << d.get_hp() << '\\n'; // 75\n    // d.hp = -10; // Error: hp es privado\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Struct y class: qué cambia",
              "content": [
                "Ambos pueden tener campos, métodos, constructores, destructores y control de acceso. Un struct también puede encapsular y una class también puede exponer datos.",
                "Las diferencias por defecto son el acceso a miembros y el acceso a bases en la herencia: struct usa public; class usa private. Puedes escribir public y private para elegir explícitamente.",
                "Como convención, usaremos struct para el estado del morador y class para la sesión y el procesador. Es una decisión de diseño, no una diferencia en su gestión automática de memoria.",
                "Tanto una variable de tipo struct como una de tipo class puede ser local. Escribir class no implica crear objetos en el heap ni usar new."
              ]
            },
            {
              "title": "Constructores: preparar un objeto válido",
              "content": [
                "El constructor tiene el nombre del tipo y no declara retorno. Se ejecuta al crear cada instancia.",
                "La lista después de : inicializa sus miembros antes del cuerpo. Aquí limita el HP inicial al intervalo permitido.",
                "explicit impide usar este constructor como una conversión implícita desde int. La creación directa, como Dweller first(75), sigue permitida."
              ],
              "code": "#include <iostream>\n\nclass Dweller {\n    int hp;\npublic:\n    explicit Dweller(int initial_hp)\n        : hp(initial_hp < 0 ? 0 : (initial_hp > 100 ? 100 : initial_hp)) {}\n    int get_hp() const { return hp; }\n};\n\nint main() {\n    Dweller first(75);\n    Dweller second(150);\n    std::cout << first.get_hp() << '\\n';  // 75\n    std::cout << second.get_hp() << '\\n'; // 100\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Destructores y vida de los objetos",
              "content": [
                "El destructor se llama ~NombreDelTipo y no recibe argumentos ni declara retorno. Para objetos locales se ejecuta al salir normalmente del ámbito.",
                "Este ejemplo imprime para mostrar el orden. En el proyecto lo usaremos para restablecer la terminal: es una primera aplicación de RAII."
              ],
              "code": "#include <iostream>\n\nclass Session {\npublic:\n    Session() { std::cout << \"Iniciar\\n\"; }\n    ~Session() { std::cout << \"Cerrar\\n\"; }\n};\n\nint main() {\n    std::cout << \"Antes\\n\";\n    {\n        Session session;\n        std::cout << \"Dentro\\n\";\n    } // Se llama ~Session()\n    std::cout << \"Después\\n\";\n    // Orden: Antes, Iniciar, Dentro, Cerrar, Después\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Otros conceptos de orientación a objetos",
              "content": [
                "• **Composición:** un tipo contiene objetos de otros tipos. Un morador tendrá un BodyCondition que reúne el estado de sus extremidades.",
                "• **Herencia:** un tipo deriva de otro y puede extender su interfaz. No la necesitamos para construir esta BIOS.",
                "• **Polimorfismo:** una misma interfaz puede ofrecer comportamientos distintos. En jerarquías de clases, las funciones virtual permiten seleccionar el comportamiento según el objeto real.",
                "El curso se apoyará principalmente en composición, encapsulación y vida de objetos. Esas herramientas bastan para separar personaje, sesión, interfaz y comandos."
              ]
            },
            {
              "title": "Enums: nombrar un conjunto de opciones",
              "content": [
                "Un enum representa un conjunto de alternativas con nombres. Evita recordar que, por ejemplo, 0 representa cabeza y 1 representa torso.",
                "C conserva enumeraciones tradicionales, que también existen en C++. C++11 añade enum class: sus nombres pertenecen al tipo y no se convierten implícitamente a int.",
                "Preferiremos enum class para Limb. No es una clase con métodos: es una enumeración con nombres y conversiones más controladas."
              ]
            },
            {
              "title": "Enum class con switch",
              "content": [
                "Ahora sí combinamos una enumeración con el switch que ya conocemos. Limb::Head expresa una alternativa del tipo Limb.",
                "Separar el valor enumerado del texto que escribe el usuario hará explícita la traducción entre un comando y el modelo."
              ],
              "code": "#include <iostream>\n\nenum class Limb { Head, Torso };\n\nint main() {\n    Limb target = Limb::Head;\n    switch (target) {\n        case Limb::Head:\n            std::cout << \"Cabeza\\n\"; // Se imprime\n            break;\n        case Limb::Torso:\n            std::cout << \"Torso\\n\";\n            break;\n    }\n    // int number = target; // Error: no se convierte implícitamente\n    return 0;\n}\n",
              "filename": "main.cpp"
            },
            {
              "title": "Comprueba lo que sabes",
              "content": [
                "Predice el resultado antes de ejecutar el código."
              ],
              "quiz": {
                "question": "¿Qué valores se imprimen y qué explica la diferencia?",
                "code": "struct Counter {\n    int value = 0;\n    void increment() { ++value; }\n};\n\nCounter a;\nCounter b;\na.increment();\na.increment();\nstd::cout << a.value << ' ' << b.value;",
                "options": [
                  "2 2: los objetos comparten sus campos",
                  "2 0: cada objeto tiene su propio estado",
                  "0 0: los métodos no pueden modificar un struct",
                  "No compila: struct no admite métodos"
                ],
                "correctIndex": 1,
                "explanation": "a y b son instancias distintas, con un value propio en cada una. Las dos llamadas actúan sobre a; b mantiene su valor inicial. Un struct de C++ sí admite métodos."
              }
            }
          ]
        }
      ]
    },
    {
      "id": 3,
      "title": "3. Encendido de la terminal: interfaz y compilación",
      "topics": [
        {
          "id": 10,
          "num": 10,
          "title": "Del primer programa a una interfaz modular",
          "description": "Crear las cabeceras y un primer ejecutable antes de incorporar el HUD.",
          "slides": [
            {
              "title": "Punto de partida y meta del capítulo",
              "content": [
                "Ya compilaste un programa, estudiaste Make y repasaste funciones, cadenas y referencias. Ahora aplicaremos esas piezas a una pantalla estática del Pip-Boy.",
                "El resultado tendrá estadísticas, personaje y pie de pestañas. Los números serán constantes; todavía no habrá comandos, estado mutable ni programas externos.",
                "Trabaja sobre una misma carpeta durante los cuatro capítulos. `site/code/mod1` a `mod4` son puntos de comparación acumulativos; no son cuatro aplicaciones que debas mezclar."
              ]
            },
            {
              "title": "Paso 1 · Crear el esqueleto",
              "content": [
                "Desde tu carpeta de trabajo, crea `ucab-pipboy-bios/`, entra y prepara `include/` y `src/`. Crea los cuatro archivos indicados en el árbol.",
                "`main.cpp` coordina; `ui.hpp` anuncia las funciones disponibles; `ui.cpp` contiene sus definiciones. Cada `.cpp` se compila por separado y el enlazador reúne los objetos."
              ],
              "terminal": "mkdir ucab-pipboy-bios\ncd ucab-pipboy-bios\nmkdir include src\n\n# Archivos que crearás con tu editor:\n# include/ui.hpp\n# src/ui.cpp\n# src/main.cpp\n# makefile",
              "layout": "code"
            },
            {
              "title": "Paso 2 · Declarar el contrato de la interfaz",
              "content": [
                "Copia esta cabecera completa. `#pragma once` evita inclusiones repetidas dentro de una unidad de traducción; `robco` agrupa nuestros nombres.",
                "Los enteros se pasan por valor. `const std::string&` permite consultar el nombre sin copiarlo y sin modificarlo mediante ese parámetro.",
                "Los nombres de parámetros pueden variar entre declaración y definición; los tipos y el orden deben coincidir. Las barras dinámicas se añadirán en el capítulo siguiente."
              ],
              "code": "#pragma once\n#include <string>\n\nnamespace robco {\n    void clear_screen();\n    void render_header(int level, int hp, int maxHp, int ap, int maxAp, int xp, int maxXp);\n    void render_vault_dweller(const std::string& name, int level, int stimpaks);\n    void render_footer();\n}\n",
              "filename": "include/ui.hpp",
              "layout": "code",
              "codeGroup": "Paso 2 · Declarar el contrato de la interfaz",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 3 · Conseguir un primer enlace correcto",
              "content": [
                "En `src/ui.cpp`, añade las inclusiones y estas definiciones mínimas dentro de `robco`. Luego las sustituiremos una por una. Los parámetros sin nombre evitan advertencias mientras no los utilizamos.",
                "En el siguiente bloque crearás src/main.cpp. No añadas estas definiciones a la cabecera: deben existir una sola vez, en ui.cpp.",
                "Termina primero los dos archivos. En el paso 4 crearemos el Makefile y haremos la primera compilación: el programa terminará sin dibujar porque las funciones todavía están vacías."
              ],
              "filename": "src/ui.cpp",
              "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n#include <iomanip>\n\nnamespace robco {\n    void clear_screen() {}\n    void render_header(int, int, int, int, int, int, int) {}\n    void render_vault_dweller(const std::string&, int, int) {}\n    void render_footer() {}\n}\n",
              "layout": "code",
              "codeGroup": "Paso 3 · Conseguir un primer enlace correcto",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 3b · Crear el main provisional",
              "content": [
                "Crea src/main.cpp con este contenido. Solo llama a clear_screen, que todavía tiene un cuerpo vacío. El paso 9 sustituirá este archivo por el main definitivo del capítulo."
              ],
              "filename": "src/main.cpp",
              "code": "#include \"../include/ui.hpp\"\n\nint main() {\n    robco::clear_screen();\n    return 0;\n}\n",
              "layout": "code",
              "codeGroup": "Paso 3b · Crear el main provisional",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 4 · Automatizar lo que ya funciona",
              "content": [
                "Crea o reemplaza `makefile` con el código de este paso. A diferencia del ejemplo de hello.cpp, ahora usamos `TARGET := pipboy`, `SRCS := src/main.cpp src/ui.cpp` y `-Iinclude` en CXXFLAGS.",
                "`SRCS` enumera los `.cpp`; la sustitución produce `OBJS`; `$<` es la primera dependencia y `$@` el objetivo de la regla.",
                "Cada receta empieza con una tabulación real. Ejecuta `make` y luego `make run`; no escribas el símbolo `$` de un prompt como parte de la orden.",
                "Este Makefile sigue dependencias de `.cpp`, pero no de cabeceras. Después de cambiar un `.hpp`, usa `make clean` y luego `make` para evitar objetos desactualizados."
              ],
              "code": "CXX      := g++\nCXXFLAGS := -std=c++20 -Wall -Wextra -Iinclude\nTARGET   := pipboy\n\nSRCS     := src/main.cpp src/ui.cpp\nOBJS     := $(SRCS:.cpp=.o)\n\nall: $(TARGET)\n\n$(TARGET): $(OBJS)\n\t$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)\n\n%.o: %.cpp\n\t$(CXX) $(CXXFLAGS) -c $< -o $@\n\nrun: $(TARGET)\n\t./$(TARGET)\n\nclean:\n\trm -f $(OBJS) $(TARGET)\n",
              "filename": "makefile",
              "layout": "code",
              "codeGroup": "Paso 4 · Automatizar lo que ya funciona",
              "codePart": 1,
              "codeParts": 1
            }
          ]
        },
        {
          "id": 11,
          "num": 11,
          "title": "Controlar la terminal y dibujar el personaje",
          "description": "Sustituir las funciones mínimas por limpieza ANSI, texto y arte del HUD.",
          "slides": [
            {
              "title": "Paso 5 · Limpiar y colocar el cursor",
              "content": [
                "Sustituye únicamente el cuerpo mínimo de `clear_screen`. Conserva las inclusiones y el bloque `namespace robco` del archivo.",
                "`\\033` representa ESC en octal. La terminal interpreta `[2J` como borrado de pantalla y `[H` como traslado del cursor al inicio; son operaciones distintas.",
                "Compila y ejecuta: todavía no hay HUD, pero el cursor vuelve arriba. Si rediriges la salida a un archivo, guardas esos bytes de control: la limpieza la interpreta el emulador de terminal."
              ],
              "code": "    void clear_screen() {\n        std::cout << \"\\033[2J\\033[H\";\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 5 · Limpiar y colocar el cursor",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Cómo leer un raw string literal",
              "content": [
                "Antes de copiar el dibujo, observa `R\"(...)\"`: conserva saltos de línea y barras invertidas sin escribir `\\\\` por cada barra del arte.",
                "La cadena termina al encontrar `)\"`. Si tu dibujo incluyera esa secuencia, podrías elegir un delimitador, por ejemplo `R\"HUD(... )HUD\"`.",
                "Aunque lo llamamos arte ASCII, los bordes y bloques como `■` son Unicode. Guarda los archivos en UTF-8 y usa una fuente monoespaciada; los bytes de una cadena no equivalen necesariamente a columnas visibles."
              ],
              "filename": "ejemplo.cpp",
              "code": "std::cout << R\"(\n  /  _   _  \\\n |  (•) (•)  |\n |   \\___/   |\n)\";",
              "layout": "code",
              "codeGroup": "Cómo leer un raw string literal",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 6 · Incorporar el morador",
              "content": [
                "Sustituye la definición mínima de `render_vault_dweller` por esta. El primer bloque imprime el contador, el raw literal conserva el dibujo y el último bloque incorpora nombre y nivel.",
                "Las barras son texto fijo en esta etapa. No hay cálculo de salud ni estado del personaje detrás del dibujo.",
                "Para verlo de inmediato, añade temporalmente `robco::render_vault_dweller(\"John Smith\", 2, 6);` después de limpiar en `main`, compila y ejecuta."
              ],
              "code": "    void render_vault_dweller(const std::string& name, int level, int stimpaks) {\n        std::cout << \"\\n\"\n                  << \"┌─────┐                           [■■■■■■■■]\\n\"\n                  << \"│ CND │                           ┌─────────\"  << std::setw(31) << \"Stimpak (\" << stimpaks << \")\\n\";\n        std::cout << R\"(└─────┘                               _.-~'~-._\n  RAD                                /  _   _  `-.\n                                    |  (•) (•)   |\n  EFF                               |   \\___/   _╯\n                 [■■■■■■■■]          \\         /          [■■■■■■■■]\n                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\n                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\n                         ╰─────╮      [■■■■■■■]      ╭─────╯\n                               `─────┐         ┌─────'\n                                     │         │\n                                    /    ╭─╮    \\\n                                   /    /   \\    \\\n                 [■■■■■■■■]       /    /     \\    \\       [■■■■■■■■]\n                 ─────────┘      /    /       \\    \\      └─────────\n                            ╭───╯    /         \\    ╰───╮\n                            ╰───────╯           ╰───────╯\n)\" << std::endl;\n        std::cout << \"                                \" << name << \" - Level \" << level << \"\\n\\n\";\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 6 · Incorporar el morador",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 7 · Cerrar la pantalla con el pie",
              "content": [
                "Sustituye ahora `render_footer`. Las etiquetas Status, S.P.E.C.I.A.L., Skills, Perks y General forman parte del decorado; este proyecto no implementa navegación entre pestañas.",
                "`std::flush` envía la salida pendiente sin agregar un salto. Más adelante será útil para que el prompt aparezca antes de esperar entrada."
              ],
              "code": "    void render_footer() {\n        std::cout << \"│  ┏━━━━━━━━┓                                                                 │\\n\"\n                  << \"└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\\n\"\n                  << std::flush;\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 7 · Cerrar la pantalla con el pie",
              "codePart": 1,
              "codeParts": 1
            }
          ]
        },
        {
          "id": 12,
          "num": 12,
          "title": "Alinear estadísticas e integrar la pantalla",
          "description": "Construir la cabecera, conectar las llamadas y verificar el primer resultado.",
          "slides": [
            {
              "title": "Paso 8 · Formatear la cabecera",
              "content": [
                "Reemplaza `render_header`. Necesita `<iomanip>`, que ya incluimos al crear el esqueleto.",
                "`std::setw(3)` fija un ancho mínimo para la siguiente inserción; por eso se repite antes de HP, AP y XP. No limita un valor a tres cifras ni valida su rango.",
                "Prueba mentalmente 9, 99 y 100: los espacios ayudan a mantener las columnas. Valores más largos pueden desplazar el borde."
              ],
              "code": "    void render_header(int level, int hp, int maxHp, int ap, int maxAp, int xp, int maxXp) {\n        std::cout << \"┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\\n\"\n                  << \"│            LVL \" << std::setw(2) << level\n                  << \" │ HP  \" << std::setw(3) << hp << \" / \" << maxHp\n                  << \" │ AP  \" << std::setw(3) << ap << \" / \" << maxAp\n                  << \" │ XP            \" << std::setw(3) << xp << \" / \" << maxXp << \" │\\n\";\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 8 · Formatear la cabecera",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Antes del paso 9 · Colorear sin clases",
              "content": [
                "La terminal interpreta secuencias de escape: `\\033` representa ESC y `[38;5;46m` selecciona el verde 46 de la paleta de 256 colores. No son texto para mostrar; requieren una terminal compatible.",
                "En main, añade `<iostream>`, activa el color antes de dibujar y restablece los atributos después del pie, antes de return. El siguiente slide muestra el archivo completo.",
                "`[0m` vuelve a los atributos predeterminados, no recuerda el color anterior. `std::flush` envía la salida pendiente. Por ahora debemos recordar esta limpieza en cada camino de salida."
              ],
              "filename": "src/main.cpp · dentro de main",
              "code": "std::cout << \"\\033[38;5;46m\"; // Activar verde\n// Aquí van las llamadas que dibujan la pantalla.\nstd::cout << \"\\033[0m\\n\" << std::flush; // Restablecer atributos\n",
              "layout": "code",
              "codeGroup": "Antes del paso 9 · Colorear sin clases",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 9 · Completar el punto de entrada",
              "content": [
                "Reemplaza el `main` provisional por este archivo. El orden de llamadas coincide con el orden visual: limpiar, cabecera, personaje y pie.",
                "Los datos elegidos son una muestra: nivel 2, HP 99/100, AP 55/100, XP 10/100 y seis Stimpaks. Aún no existe un objeto que los agrupe.",
                "`<iostream>` permite escribir las secuencias de color con cout. `<iomanip>` permanece en ui.cpp, que utiliza setw: incluir una cabecera en un .cpp no la comparte con los otros.",
                "El color se activa antes del dibujo y se restablece antes de return. En el próximo capítulo automatizaremos este par de acciones con un objeto local."
              ],
              "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n\nint main() {\n    std::cout << \"\\033[38;5;46m\";\n    robco::clear_screen();\n    robco::render_header(2, 99, 100, 55, 100, 10, 100);\n    robco::render_vault_dweller(\"John Smith\", 2, 6);\n    robco::render_footer();\n    std::cout << \"\\033[0m\\n\" << std::flush;\n    return 0;\n}\n",
              "filename": "src/main.cpp",
              "layout": "code",
              "codeGroup": "Paso 9 · Completar el punto de entrada",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Comprobación · Una pantalla estática completa",
              "content": [
                "Ejecuta `make run`. Debes reconocer las estadísticas, el contador de Stimpaks, el nombre y el pie. El proceso termina después de imprimir: todavía no está esperando órdenes.",
                "Cambia solamente el nombre y los números de `main`, recompila y comprueba qué zonas cambian. Si modificas una cadena del dibujo, presta atención a su alineación.",
                "Si el enlazador informa definiciones duplicadas, comprueba que sustituiste las funciones mínimas en vez de añadir otra copia, y que no incluiste un `.cpp` desde otro."
              ],
              "terminal": "make\nmake run\n# Vuelve a ejecutar make sin editar: no debería recompilar los .cpp.",
              "layout": "code"
            }
          ]
        },
        {
          "id": 13,
          "num": 13,
          "title": "Punto de control: terminal estática",
          "description": "Revisar los cuatro archivos construidos y preparar el paso al estado mutable.",
          "slides": [
            {
              "title": "Archivos construidos en este capítulo",
              "content": [
                "Este visor reúne el resultado de los pasos 1 a 9. Contrasta cada archivo con tu implementación; las declaraciones y las llamadas deben corresponder a las definiciones.",
                "Ya puedes explicar qué pertenece al compilador, al enlazador y a la terminal. En el próximo capítulo sustituiremos los parámetros sueltos por un estado compartido.",
                "Consulta cada archivo en su pestaña. Si es largo, desplázate dentro del código; Copiar conserva el archivo completo."
              ],
              "multiFile": [
                {
                  "filename": "makefile",
                  "path": "makefile",
                  "desc": "Automatización del proceso de compilación con g++ (-std=c++20, -Wall, -Wextra, -Iinclude).",
                  "code": "CXX      := g++\nCXXFLAGS := -std=c++20 -Wall -Wextra -Iinclude\nTARGET   := pipboy\n\nSRCS     := src/main.cpp src/ui.cpp\nOBJS     := $(SRCS:.cpp=.o)\n\nall: $(TARGET)\n\n$(TARGET): $(OBJS)\n\t$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)\n\n%.o: %.cpp\n\t$(CXX) $(CXXFLAGS) -c $< -o $@\n\nrun: $(TARGET)\n\t./$(TARGET)\n\nclean:\n\trm -f $(OBJS) $(TARGET)\n"
                },
                {
                  "filename": "include/ui.hpp",
                  "path": "include/ui.hpp",
                  "desc": "Declaraciones de funciones para control de terminal (ANSI) y dibujado del HUD.",
                  "code": "#pragma once\n#include <string>\n\nnamespace robco {\n    void clear_screen();\n    void render_header(int level, int hp, int maxHp, int ap, int maxAp, int xp, int maxXp);\n    void render_vault_dweller(const std::string& name, int level, int stimpaks);\n    void render_footer();\n}\n"
                },
                {
                  "filename": "src/ui.cpp",
                  "path": "src/ui.cpp",
                  "desc": "Implementación de escape sequences ANSI, formateo de estadísticas con std::setw y arte ASCII del Vault Boy con Raw String Literals.",
                  "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n#include <iomanip>\n\nnamespace robco {\n    void clear_screen() {\n        std::cout << \"\\033[2J\\033[H\";\n    }\n\n    void render_header(int level, int hp, int maxHp, int ap, int maxAp, int xp, int maxXp) {\n        std::cout << \"┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\\n\"\n                  << \"│            LVL \" << std::setw(2) << level\n                  << \" │ HP  \" << std::setw(3) << hp << \" / \" << maxHp\n                  << \" │ AP  \" << std::setw(3) << ap << \" / \" << maxAp\n                  << \" │ XP            \" << std::setw(3) << xp << \" / \" << maxXp << \" │\\n\";\n    }\n\n    void render_vault_dweller(const std::string& name, int level, int stimpaks) {\n        std::cout << \"\\n\"\n                  << \"┌─────┐                           [■■■■■■■■]\\n\"\n                  << \"│ CND │                           ┌─────────\"  << std::setw(31) << \"Stimpak (\" << stimpaks << \")\\n\";\n        std::cout << R\"(└─────┘                               _.-~'~-._\n  RAD                                /  _   _  `-.\n                                    |  (•) (•)   |\n  EFF                               |   \\___/   _╯\n                 [■■■■■■■■]          \\         /          [■■■■■■■■]\n                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\n                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\n                         ╰─────╮      [■■■■■■■]      ╭─────╯\n                               `─────┐         ┌─────'\n                                     │         │\n                                    /    ╭─╮    \\\n                                   /    /   \\    \\\n                 [■■■■■■■■]       /    /     \\    \\       [■■■■■■■■]\n                 ─────────┘      /    /       \\    \\      └─────────\n                            ╭───╯    /         \\    ╰───╮\n                            ╰───────╯           ╰───────╯\n)\" << std::endl;\n        std::cout << \"                                \" << name << \" - Level \" << level << \"\\n\\n\";\n    }\n\n    void render_footer() {\n        std::cout << \"│  ┏━━━━━━━━┓                                                                 │\\n\"\n                  << \"└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\\n\"\n                  << std::flush;\n    }\n}\n"
                },
                {
                  "filename": "src/main.cpp",
                  "path": "src/main.cpp",
                  "desc": "Punto de entrada: invoca el renderizado inicial de la interfaz del Pip-Boy.",
                  "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n\nint main() {\n    std::cout << \"\\033[38;5;46m\";\n    robco::clear_screen();\n    robco::render_header(2, 99, 100, 55, 100, 10, 100);\n    robco::render_vault_dweller(\"John Smith\", 2, 6);\n    robco::render_footer();\n    std::cout << \"\\033[0m\\n\" << std::flush;\n    return 0;\n}\n"
                }
              ],
              "layout": "code"
            },
            {
              "title": "Pregunta · Declarar no es definir",
              "content": [
                "Antes de seguir, predice el resultado y justifica tu respuesta."
              ],
              "quiz": {
                "question": "main.cpp incluye ui.hpp y llama render_footer, pero compilas únicamente main.cpp. ¿Qué falta?",
                "options": [
                  "Incluir ui.cpp dentro de main.cpp",
                  "Compilar y enlazar también ui.cpp",
                  "Añadir using namespace std",
                  "Eliminar #pragma once"
                ],
                "correctIndex": 1,
                "explanation": "La cabecera permite compilar la llamada, pero la definición vive en ui.cpp. Debes compilar y enlazar ambas unidades; el Makefile lo automatiza."
              }
            },
            {
              "title": "Práctica · Una modificación localizada",
              "content": [
                "Añade una función `render_boot_message()` a la cabecera, defínela en `ui.cpp` y llámala en `main` antes de la cabecera de estadísticas.",
                "Compila desde cero al cambiar la cabecera. Explica por qué una declaración sin definición puede compilar y después fallar al enlazar.",
                "Esta práctica es opcional; los siguientes capítulos continúan desde el punto de control sin el mensaje adicional."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 4,
      "title": "4. Memoria en el Yermo: estado, referencias y RAII",
      "topics": [
        {
          "id": 14,
          "num": 14,
          "title": "Representar al morador y sus reglas",
          "description": "Crear structs.hpp y dweller.cpp con daño, curación y consulta de lesiones.",
          "slides": [
            {
              "title": "De una fotografía a un estado que cambia",
              "content": [
                "Partimos de la pantalla estática anterior. El problema ahora es mantener coherentes los HP, las seis extremidades y el inventario cuando recibimos daño o usamos un Stimpak.",
                "Construiremos primero el modelo, después sus operaciones y finalmente adaptaremos la UI. El renderizado observará el estado; las reglas del personaje decidirán cómo cambia.",
                "El inventario final es un contador entero de Stimpaks. No necesitamos el vector de objetos, las pestañas interactivas ni otras extensiones sugeridas por el draft."
              ]
            },
            {
              "title": "Paso 1 · Crear los tipos vacíos",
              "content": [
                "Crea include/structs.hpp con este esqueleto. Primero definimos tres tipos vacíos; en los siguientes slides completarás uno a la vez.",
                "• Limb nombrará las extremidades. BodyCondition guardará su salud. VaultDweller reunirá los datos y las operaciones del personaje.",
                "Conserva #pragma once, <string> y namespace robco. Sustituye cada definición vacía cuando se indique, sin añadir una segunda definición del mismo tipo."
              ],
              "filename": "include/structs.hpp",
              "code": "#pragma once\n#include <string>\n\nnamespace robco {\n    enum class Limb {};\n\n    struct BodyCondition {};\n\n    struct VaultDweller {};\n}\n",
              "layout": "code",
              "codeGroup": "Paso 1 · Crear los tipos vacíos",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 1a · Limb: identificar una extremidad",
              "content": [
                "Reemplaza únicamente enum class Limb {} por esta definición, dentro de namespace robco.",
                "Cada alternativa identifica una extremidad: cabeza, torso, brazos y piernas. Por ejemplo, Limb::Head selecciona la cabeza; no representa su cantidad de salud.",
                "enum class mantiene los nombres dentro de Limb y evita conversiones implícitas a int. Así las operaciones reciben una extremidad identificada por su tipo, en vez de un número que debamos recordar."
              ],
              "filename": "include/structs.hpp · Limb",
              "code": "    enum class Limb {\n        Head,\n        Torso,\n        LeftArm,\n        RightArm,\n        LeftLeg,\n        RightLeg\n    };",
              "layout": "code",
              "codeGroup": "Paso 1a · Limb: identificar una extremidad",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 1b · BodyCondition: guardar la salud",
              "content": [
                "Reemplaza únicamente struct BodyCondition {} por esta definición. Conserva Limb y el VaultDweller todavía vacío.",
                "Cada campo guarda la salud de una extremidad y comienza en 100. El inicializador forma parte del tipo: BodyCondition condition; crea una condición con esos seis valores iniciales.",
                "Limb responde cuál extremidad; BodyCondition responde cuánta salud tiene cada una. Los campos son públicos por defecto porque usamos struct."
              ],
              "filename": "include/structs.hpp · BodyCondition",
              "code": "    struct BodyCondition {\n        int head      = 100;\n        int torso     = 100;\n        int left_arm  = 100;\n        int right_arm = 100;\n        int left_leg  = 100;\n        int right_leg = 100;\n    };",
              "layout": "code",
              "codeGroup": "Paso 1b · BodyCondition: guardar la salud",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 1c · VaultDweller: reunir al personaje",
              "content": [
                "Reemplaza struct VaultDweller {} por esta definición. Conserva los otros dos tipos y la llave final de namespace robco.",
                "• Los campos reúnen nombre, nivel, HP, AP, XP y Stimpaks. BodyCondition condition incorpora las seis extremidades al personaje: es composición.",
                "• damage_limb y use_stimpaks modificarán el estado. is_injured() const lo consultará sin alterar los miembros ordinarios. Aquí solo declaramos los métodos; sus cuerpos se escribirán en dweller.cpp a partir del paso 2.",
                "• private restringe get_limb_ptr al propio tipo: será un ayudante para seleccionar un campo. Los datos anteriores siguen siendo públicos por simplicidad didáctica."
              ],
              "filename": "include/structs.hpp · VaultDweller",
              "code": "    struct VaultDweller {\n        std::string name = \"John Smith\";\n        int level  = 2;\n        int hp     = 100;\n        int max_hp = 100;\n        int ap     = 100;\n        int max_ap = 100;\n        int xp     = 100;\n        int max_xp = 100;\n        int stimpaks = 6;\n        BodyCondition condition;\n\n        void damage_limb(Limb target, int damage);\n        bool use_stimpaks();\n\n        bool is_injured() const; // método de solo lectura\n\n    private:\n        int* get_limb_ptr(Limb target);\n    };",
              "layout": "code",
              "codeGroup": "Paso 1c · VaultDweller: reunir al personaje",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 2 · Elegir qué entero vamos a modificar",
              "content": [
                "Crea `src/dweller.cpp` con `#include \"../include/structs.hpp\"`, `#include <algorithm>` y un bloque `namespace robco`. Añade dentro este método y los tres siguientes, en este orden.",
                "El `switch` devuelve la dirección de un campo que ya existe dentro de `condition`. `nullptr` representa un destino no soportado.",
                "Es un puntero prestado: no reserva memoria y nadie debe hacer `delete` sobre él. Solo es válido mientras viva el morador y no debe escapar para usarse después de su destrucción."
              ],
              "code": "    int* VaultDweller::get_limb_ptr(Limb target) {\n        switch (target) {\n            case Limb::Head:     return &condition.head;\n            case Limb::Torso:    return &condition.torso;\n            case Limb::LeftArm:  return &condition.left_arm;\n            case Limb::RightArm: return &condition.right_arm;\n            case Limb::LeftLeg:  return &condition.left_leg;\n            case Limb::RightLeg: return &condition.right_leg;\n            default: return nullptr;\n        }\n    }",
              "filename": "src/dweller.cpp",
              "layout": "code",
              "codeGroup": "Paso 2 · Elegir qué entero vamos a modificar",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 3 · Aplicar daño al objeto original",
              "content": [
                "Añade `damage_limb`. Tras comprobar el puntero, `*limb_ptr` permite modificar la extremidad seleccionada sin repetir seis fórmulas de daño.",
                "`std::max(0, ...)` evita valores negativos en el resultado habitual. Los HP globales pierden la mitad del daño con división entera: 45 puntos restan 22 HP.",
                "El contrato presupone daño no negativo y de magnitud razonable. El comando del siguiente capítulo rechazará negativos; este método por sí solo no valida todo el dominio ni evita desbordamientos con entradas extremas."
              ],
              "code": "    void VaultDweller::damage_limb(Limb target, int damage) {\n        int* limb_ptr = get_limb_ptr(target);\n        if (limb_ptr == nullptr) return; // en caso de intento de caso no soportado\n\n        *limb_ptr = std::max(0, *limb_ptr - damage);\n        hp = std::max(0, hp - (damage / 2));\n    }",
              "filename": "src/dweller.cpp",
              "layout": "code",
              "codeGroup": "Paso 3 · Aplicar daño al objeto original",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 4 · Consumir un Stimpak solo si puede usarse",
              "content": [
                "Añade `use_stimpaks`. Devuelve `false` sin modificar nada cuando no quedan unidades o los HP ya están al máximo.",
                "Si se usa, consume una unidad, suma hasta 30 HP y hasta 40 puntos a cada extremidad. `std::min` fija los límites superiores; no hay restauración total automática.",
                "Curiosidad de esta regla: con HP al máximo no puedes tratar una extremidad dañada. Es el comportamiento del proyecto de referencia; cambiarlo sería una decisión de diseño adicional."
              ],
              "code": "    bool VaultDweller::use_stimpaks() {\n        if (stimpaks <= 0 || hp >= max_hp) {\n            return false;\n        }\n\n        stimpaks--;\n\n        hp = std::min(max_hp, hp + 30);\n\n        condition.head = std::min(100, condition.head + 40);\n        condition.torso = std::min(100, condition.torso + 40);\n        condition.left_arm = std::min(100, condition.left_arm + 40);\n        condition.right_arm = std::min(100, condition.right_arm + 40);\n        condition.left_leg = std::min(100, condition.left_leg + 40);\n        condition.right_leg = std::min(100, condition.right_leg + 40);\n\n        return true;\n    }",
              "filename": "src/dweller.cpp",
              "layout": "code",
              "codeGroup": "Paso 4 · Consumir un Stimpak solo si puede usarse",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 5 · Consultar sin alterar",
              "content": [
                "Añade `is_injured`. El `const` al final habilita esta consulta desde referencias constantes y expresa que no modifica el estado ordinario del objeto.",
                "Aquí lesión significa que al menos una extremidad llegó a cero, no que haya recibido cualquier daño. Esta diferencia determinará cuándo cambia la boca del personaje.",
                "El modelo ya está completo; la UI anterior sigue funcionando mientras preparamos su adaptación."
              ],
              "code": "    bool VaultDweller::is_injured() const {\n        return condition.head <= 0\n            || condition.torso <= 0\n            || condition.left_arm <= 0\n            || condition.right_arm <= 0\n            || condition.left_leg <= 0\n            || condition.right_leg <= 0;\n    }",
              "filename": "src/dweller.cpp",
              "layout": "code",
              "codeGroup": "Paso 5 · Consultar sin alterar",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Punto de compilación · Comprobar el modelo aislado",
              "content": [
                "Antes de cambiar la UI, compila solamente `dweller.cpp`. `-c` comprueba sus definiciones sin exigir todavía un `main` ni enlazar el programa.",
                "En el Makefile añade `src/dweller.cpp` a `SRCS`. Ya puedes ejecutar `make`: la UI estática sigue siendo válida aunque aún no usemos el nuevo modelo."
              ],
              "terminal": "g++ -std=c++20 -Wall -Wextra -Iinclude -c src/dweller.cpp -o /tmp/pipboy-dweller-check.o\n\n# En makefile:\n# SRCS := src/main.cpp src/ui.cpp src/dweller.cpp\nmake",
              "layout": "code"
            }
          ]
        },
        {
          "id": 15,
          "num": 15,
          "title": "Conectar el estado con una interfaz dinámica",
          "description": "Pasar por referencia, calcular barras y adaptar todas las funciones de dibujo.",
          "slides": [
            {
              "title": "Elegir valor, referencia o puntero según el trabajo",
              "content": [
                "Los enteros pequeños pueden copiarse. Para dibujar el morador usaremos `const VaultDweller&`: observamos el mismo objeto sin copiar su nombre ni modificarlo.",
                "Para las simulaciones usaremos `VaultDweller&`: sus cambios deben sobrevivir al retorno de la función. Un parámetro por valor dañaría una copia y dejaría intacto al original.",
                "El selector privado usa `int*` porque puede devolver ausencia y seleccionar uno de varios campos. Ninguna de estas decisiones exige `new`, `delete` ni un smart pointer."
              ]
            },
            {
              "title": "Paso 6 · Preparar el nuevo contrato de UI",
              "content": [
                "En `ui.hpp` sustituye las antiguas declaraciones públicas de dibujo por estas. Conserva `#pragma once` y añade `#include \"structs.hpp\"`.",
                "En `ui.cpp` conserva `<iostream>` y `<iomanip>`, añade `<algorithm>` y mantén `clear_screen` y `render_footer`. Sustituiremos las otras funciones en los pasos siguientes.",
                "La cabecera expondrá `render_screen` y las simulaciones; las funciones de detalle se definen antes de usarse dentro de `ui.cpp`. Este bloque de cambios se compilará al integrar el nuevo `main`."
              ],
              "filename": "include/ui.hpp · declaraciones",
              "code": "namespace robco {\n    void clear_screen();\n    void render_screen(const VaultDweller& dweller);\n    void simulate_damage(VaultDweller& dweller);\n    void simulate_healing(VaultDweller& dweller);\n}\n",
              "layout": "code",
              "codeGroup": "Paso 6 · Preparar el nuevo contrato de UI",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 7 · Leer las estadísticas desde el morador",
              "content": [
                "Sustituye `render_header` por esta versión. Los siete enteros del capítulo anterior pasan a ser accesos al mismo objeto.",
                "No cambió la técnica de alineación; cambió de dónde salen los datos. El `main` dejará de conocer cada parámetro visual."
              ],
              "code": "    void render_header(const VaultDweller& dweller) {\n        std::cout << \"┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\\n\"\n                  << \"│            LVL \" << std::setw(2) << dweller.level\n                  << \" │ HP  \" << std::setw(3) << dweller.hp << \" / \" << dweller.max_hp\n                  << \" │ AP  \" << std::setw(3) << dweller.ap << \" / \" << dweller.max_ap\n                  << \" │ XP            \" << std::setw(3) << dweller.xp << \" / \" << dweller.max_xp << \" │\\n\";\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 7 · Leer las estadísticas desde el morador",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 8 · Construir una barra proporcional",
              "content": [
                "Añade `render_bar` antes de `render_vault_dweller`. Calcula cuántas de las ocho posiciones están llenas y construye la cadena con un bucle.",
                "Con 55/100 y ancho 8, la división entera produce 4 bloques: se descarta la fracción. `std::clamp` limita el conteo calculado entre cero y el ancho.",
                "`max = 100` y `width = 8` son valores por defecto: `render_bar(55)` equivale a `render_bar(55, 100, 8)`. Podemos cambiar el máximo con `render_bar(55, 200)` o ambos con `render_bar(55, 200, 12)`; los argumentos se omiten de derecha a izquierda.",
                "Definimos estos valores una sola vez, aquí, antes de las llamadas. La función presupone máximo positivo y ancho no negativo: clamp no evita una división por cero."
              ],
              "code": "    std::string render_bar(int current, int max = 100, int width = 8) {\n        int filled = std::clamp((current * width) / max, 0, width);\n        std::string bar = \"[\";\n        for (int i = 0; i < width; i++) {\n            bar += (i < filled) ? \"■\" : \" \";\n        }\n        bar += \"]\";\n        return bar;\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 8 · Construir una barra proporcional",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 9 · Reemplazar el dibujo fijo por datos",
              "content": [
                "Sustituye la función completa `render_vault_dweller`. Primero calcula seis barras y la boca; después intercala esas cadenas con los fragmentos fijos del dibujo.",
                "Cada llamada a `render_bar` pasa únicamente la salud de la extremidad: utiliza el máximo 100 y el ancho 8 que acabamos de definir por defecto.",
                "Al introducir datos en medio del arte, usamos varias inserciones `<<`. En cadenas ordinarias una barra invertida se escribe `\\\\`; por eso este código se ve distinto al raw literal anterior.",
                "`is_injured()` elige la boca triste cuando alguna extremidad llega a cero. Una cabeza en 55 conserva la boca normal si las demás siguen por encima de cero."
              ],
              "code": "    void render_vault_dweller(const VaultDweller& dweller) {\n        std::string mouth = dweller.is_injured() ? \"/---\\\\\" : \"\\\\___/\";\n        std::string head_bar = render_bar(dweller.condition.head);\n        std::string torso_bar = render_bar(dweller.condition.torso);\n        std::string left_arm_bar = render_bar(dweller.condition.left_arm);\n        std::string right_arm_bar = render_bar(dweller.condition.right_arm);\n        std::string left_leg_bar = render_bar(dweller.condition.left_leg);\n        std::string right_leg_bar = render_bar(dweller.condition.right_leg);\n\n        std::cout << \"\\n\"\n                  << \"┌─────┐                           \" << head_bar << \"\\n\"\n                  << \"│ CND │                           ┌─────────\"  << std::setw(31) << \"Stimpak (\" << dweller.stimpaks << \")\\n\"\n                  << \"└─────┘                               _.-~'~-._\\n\"\n                  << \"  RAD                                /  _   _  `-.\\n\"\n                  << \"                                    |  (•) (•)   |\\n\"\n                  << \"  EFF                               |   \" << mouth << \"   _╯\\n\"\n                  << \"                 \" << left_arm_bar << \"          \\\\         /          \" << right_arm_bar << \"\\n\"\n                  << \"                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\\n\"\n                  << \"                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\\n\"\n                  << \"                         ╰─────╮      \" << torso_bar << \"     ╭─────╯\\n\"\n                  << \"                               `─────┐         ┌─────'\\n\"\n                  << \"                                     │         │\\n\"\n                  << \"                                    /    ╭─╮    \\\\\\n\"\n                  << \"                                   /    /   \\\\    \\\\\\n\"\n                  << \"                 \" << left_leg_bar << \"       /    /     \\\\    \\\\       \" << right_leg_bar << \"\\n\"\n                  << \"                 ─────────┘      /    /       \\\\    \\\\      └─────────\\n\"\n                  << \"                            ╭───╯    /         \\\\    ╰───╮\\n\"\n                  << \"                            ╰───────╯           ╰───────╯\\n\"\n                  << \"                                \" << dweller.name << \" - Level \" << dweller.level << \"\\n\\n\";\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 9 · Reemplazar el dibujo fijo por datos",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 10 · Agrupar el renderizado completo",
              "content": [
                "Añade `render_screen` después de las funciones que invoca. Centraliza el orden de dibujo y recibe una referencia constante.",
                "`main` podrá pedir una pantalla completa antes y después de una modificación del modelo. No necesitamos duplicar las llamadas en cada lugar."
              ],
              "code": "    void render_screen(const VaultDweller& dweller) {\n        clear_screen();\n\n        render_header(dweller);\n        render_vault_dweller(dweller);\n        render_footer();\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 10 · Agrupar el renderizado completo",
              "codePart": 1,
              "codeParts": 1
            }
          ]
        },
        {
          "id": 16,
          "num": 16,
          "title": "Gestionar la sesión y probar daño y curación",
          "description": "Añadir RAII, pausas y un main que muestre la evolución del mismo objeto.",
          "slides": [
            {
              "title": "Paso 11 · Dar al color una duración definida",
              "content": [
                "Completa `ui.hpp` con esta versión: conserva las declaraciones del paso 6 y añade `TerminalSession` y sus inclusiones.",
                "El constructor activa el verde; el destructor emite el restablecimiento de atributos. Al declarar `session` como objeto local, su vida coincide con el ámbito de `main`.",
                "Sustituiremos las dos escrituras manuales de color de main por un objeto session en el paso 14: no deben quedar ambos mecanismos activos.",
                "Estos métodos están definidos dentro de la clase y son implícitamente inline. No añadas otra definición en `ui.cpp` en este capítulo."
              ],
              "code": "#pragma once\n#include \"structs.hpp\"\n#include <string>\n#include <iostream>\n\nnamespace robco {\n    void clear_screen();\n    void render_screen(const VaultDweller& dweller);\n    void simulate_damage(VaultDweller& dweller);\n    void simulate_healing(VaultDweller& dweller);\n\n    class TerminalSession {\n    public:\n        TerminalSession() {\n            std::cout << \"\\033[38;5;46m\";\n        }\n        ~TerminalSession() {\n            std::cout << \"\\033[0m\\n\" << std::flush;\n        }\n    };\n}\n",
              "filename": "include/ui.hpp",
              "layout": "code",
              "codeGroup": "Paso 11 · Dar al color una duración definida",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Qué garantiza el destructor y qué presupone",
              "content": [
                "Se ejecuta al salir normalmente del ámbito, incluso mediante un `return` temprano, y durante el desenrollado de pila de excepciones manejadas más arriba.",
                "No garantiza limpieza ante `SIGKILL`, `_exit` o una terminación abrupta. Tampoco guarda el color anterior: `\\033[0m` restablece los atributos predeterminados.",
                "En este capítulo `session` controla el color, pero el morador sigue siendo una variable aparte. En el siguiente la sesión será dueña también del personaje y del mensaje de estado."
              ]
            },
            {
              "title": "RAII · La limpieza sigue al objeto",
              "content": [
                "RAII significa Resource Acquisition Is Initialization: adquirir un recurso al inicializar un objeto y liberarlo en su destructor. La duración del objeto determina la duración del recurso; no depende de recordar una llamada final.",
                "Nuestra TerminalSession aplica esa idea al estado de la terminal: su constructor activa el verde y su destructor restablece los atributos. Cuando main abandona el ámbito de session, la limpieza ocurre automáticamente en las condiciones del slide anterior.",
                "Frente a la versión manual, un return temprano después de construir session también ejecuta su destructor. Antes podía saltarse la escritura de restablecimiento situada al final de main.",
                "No se limita a memoria: std::string gestiona su almacenamiento, std::ofstream cierra un archivo y un guardián de mutex libera un bloqueo. Un puntero crudo, por sí solo, no libera lo que señala."
              ]
            },
            {
              "title": "Paso 12 · Pausar y causar daño",
              "content": [
                "Añade `simulate_damage` al final del bloque `robco`. `std::cin.get()` espera un carácter; al pulsar ENTER avanzamos a las dos operaciones del modelo.",
                "La cabeza pierde 45 y el torso 100. Desde HP 100, las pérdidas globales son 22 y 50: quedan HP 28, cabeza 55 y torso 0.",
                "Esta función sirve como arnés de demostración. Será retirada cuando el usuario pueda escribir comandos."
              ],
              "code": "    void simulate_damage(VaultDweller& dweller) {\n        std::cout << \"\\n\\nPresiona ENTER para causar daño\\n\";\n        std::cin.get();\n        dweller.damage_limb(Limb::Head, 45);\n        dweller.damage_limb(Limb::Torso, 100);\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 12 · Pausar y causar daño",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 13 · Pausar y curar",
              "content": [
                "Añade `simulate_healing`. Invoca la misma regla que después reutilizará el comando `stimpak`.",
                "Tras el daño anterior, una curación deja HP 58, cabeza 95, torso 40 y cinco Stimpaks. La boca vuelve a la expresión normal porque ninguna extremidad permanece en cero."
              ],
              "code": "    void simulate_healing(VaultDweller& dweller) {\n        std::cout << \"\\n\\nPresiona ENTER para curar\\n\";\n        std::cin.get();\n        dweller.use_stimpaks();\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 13 · Pausar y curar",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 14 · Integrar las tres pantallas",
              "content": [
                "Reemplaza `main.cpp` y compila desde cero. Verifica que `SRCS` incluye `dweller.cpp` y que `ui.cpp` contiene todos los métodos añadidos.",
                "Elimina las escrituras manuales de color y restablecimiento del capítulo 3. TerminalSession session las sustituye; main ya no necesita incluir iostream directamente.",
                "Cada render consulta el mismo morador. Cada simulación lo modifica por referencia; la sesión mantiene el color hasta que termina `main`.",
                "Los objetos locales se destruyen en orden inverso a su construcción. Aquí se destruye primero `dweller` y luego `session`, que restablece la terminal."
              ],
              "code": "#include \"../include/ui.hpp\"\n\nint main() {\n    robco::TerminalSession session;\n    robco::VaultDweller dweller;\n\n    robco::render_screen(dweller);\n    robco::simulate_damage(dweller);\n    robco::render_screen(dweller);\n    robco::simulate_healing(dweller);\n    robco::render_screen(dweller);\n\n    return 0; // ~TerminalSession() se llama automáticamente\n}\n",
              "filename": "src/main.cpp",
              "layout": "code",
              "codeGroup": "Paso 14 · Integrar las tres pantallas",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Comprobación · Observar los números, no solo la cara",
              "content": [
                "Ejecuta y pulsa ENTER una vez para dañar y otra para curar. Antes de cada ENTER, contrasta HP, barras y contador con la secuencia inferior.",
                "Si solo cambia la pantalla final, revisa que las pausas no se hayan eliminado. Si el modelo cambia pero la UI no, revisa que el dibujo ya no use constantes."
              ],
              "terminal": "make clean\nmake run\n\n# Estado inicial: HP 100, cabeza 100, torso 100, Stimpaks 6\n# Tras daño:     HP  28, cabeza  55, torso   0, Stimpaks 6\n# Tras curación: HP  58, cabeza  95, torso  40, Stimpaks 5",
              "layout": "code"
            }
          ]
        },
        {
          "id": 17,
          "num": 17,
          "title": "Punto de control: personaje con estado",
          "description": "Revisar el contrato del modelo y el alcance de la sesión RAII.",
          "slides": [
            {
              "title": "Archivos construidos en este capítulo",
              "content": [
                "Ahora hay seis archivos: los cuatro anteriores y el modelo dividido entre `structs.hpp` y `dweller.cpp`.",
                "Puedes seguir una modificación desde la simulación hasta el campo original y explicar cómo reaparece en la siguiente pantalla.",
                "Consulta cada archivo en su pestaña. Si es largo, desplázate dentro del código; Copiar conserva el archivo completo."
              ],
              "multiFile": [
                {
                  "filename": "include/structs.hpp",
                  "path": "include/structs.hpp",
                  "desc": "Modelo de datos del Pip-Boy: enum class Limb, BodyCondition y struct VaultDweller con métodos y puntero get_limb_ptr.",
                  "code": "#pragma once\n#include <string>\n\nnamespace robco {\n    enum class Limb {\n        Head,\n        Torso,\n        LeftArm,\n        RightArm,\n        LeftLeg,\n        RightLeg\n    };\n\n    struct BodyCondition {\n        int head      = 100;\n        int torso     = 100;\n        int left_arm  = 100;\n        int right_arm = 100;\n        int left_leg  = 100;\n        int right_leg = 100;\n    };\n\n    struct VaultDweller {\n        std::string name = \"John Smith\";\n        int level  = 2;\n        int hp     = 100;\n        int max_hp = 100;\n        int ap     = 100;\n        int max_ap = 100;\n        int xp     = 100;\n        int max_xp = 100;\n        int stimpaks = 6;\n        BodyCondition condition;\n\n        void damage_limb(Limb target, int damage);\n        bool use_stimpaks();\n\n        bool is_injured() const; // método de solo lectura\n\n    private:\n        int* get_limb_ptr(Limb target);\n    };\n}\n"
                },
                {
                  "filename": "include/ui.hpp",
                  "path": "include/ui.hpp",
                  "desc": "Clase RAII TerminalSession para activar color verde fósforo y restaurar terminal, más funciones de dibujado actualizadas.",
                  "code": "#pragma once\n#include \"structs.hpp\"\n#include <string>\n#include <iostream>\n\nnamespace robco {\n    void clear_screen();\n    void render_screen(const VaultDweller& dweller);\n    void simulate_damage(VaultDweller& dweller);\n    void simulate_healing(VaultDweller& dweller);\n\n    class TerminalSession {\n    public:\n        TerminalSession() {\n            std::cout << \"\\033[38;5;46m\";\n        }\n        ~TerminalSession() {\n            std::cout << \"\\033[0m\\n\" << std::flush;\n        }\n    };\n}\n"
                },
                {
                  "filename": "src/dweller.cpp",
                  "path": "src/dweller.cpp",
                  "desc": "Lógica del personaje: selección con puntero get_limb_ptr(), daño a extremidades, curación con Stimpaks y chequeo is_injured().",
                  "code": "#include \"../include/structs.hpp\"\n#include <algorithm>\n\nnamespace robco {\n    int* VaultDweller::get_limb_ptr(Limb target) {\n        switch (target) {\n            case Limb::Head:     return &condition.head;\n            case Limb::Torso:    return &condition.torso;\n            case Limb::LeftArm:  return &condition.left_arm;\n            case Limb::RightArm: return &condition.right_arm;\n            case Limb::LeftLeg:  return &condition.left_leg;\n            case Limb::RightLeg: return &condition.right_leg;\n            default: return nullptr;\n        }\n    }\n\n    void VaultDweller::damage_limb(Limb target, int damage) {\n        int* limb_ptr = get_limb_ptr(target);\n        if (limb_ptr == nullptr) return; // en caso de intento de caso no soportado\n\n        *limb_ptr = std::max(0, *limb_ptr - damage);\n        hp = std::max(0, hp - (damage / 2));\n    }\n\n    bool VaultDweller::use_stimpaks() {\n        if (stimpaks <= 0 || hp >= max_hp) {\n            return false;\n        }\n\n        stimpaks--;\n\n        hp = std::min(max_hp, hp + 30);\n\n        condition.head = std::min(100, condition.head + 40);\n        condition.torso = std::min(100, condition.torso + 40);\n        condition.left_arm = std::min(100, condition.left_arm + 40);\n        condition.right_arm = std::min(100, condition.right_arm + 40);\n        condition.left_leg = std::min(100, condition.left_leg + 40);\n        condition.right_leg = std::min(100, condition.right_leg + 40);\n\n        return true;\n    }\n\n    bool VaultDweller::is_injured() const {\n        return condition.head <= 0\n            || condition.torso <= 0\n            || condition.left_arm <= 0\n            || condition.right_arm <= 0\n            || condition.left_leg <= 0\n            || condition.right_leg <= 0;\n    }\n}\n"
                },
                {
                  "filename": "src/ui.cpp",
                  "path": "src/ui.cpp",
                  "desc": "Renderizado dinámico de barras de salud con std::clamp, boca reactiva en ASCII y gestión de sesión con TerminalSession.",
                  "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n#include <iomanip>\n#include <algorithm>\n\nnamespace robco {\n    void clear_screen() {\n        std::cout << \"\\033[2J\\033[H\";\n    }\n\n    void render_header(const VaultDweller& dweller) {\n        std::cout << \"┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\\n\"\n                  << \"│            LVL \" << std::setw(2) << dweller.level\n                  << \" │ HP  \" << std::setw(3) << dweller.hp << \" / \" << dweller.max_hp\n                  << \" │ AP  \" << std::setw(3) << dweller.ap << \" / \" << dweller.max_ap\n                  << \" │ XP            \" << std::setw(3) << dweller.xp << \" / \" << dweller.max_xp << \" │\\n\";\n    }\n\n    std::string render_bar(int current, int max = 100, int width = 8) {\n        int filled = std::clamp((current * width) / max, 0, width);\n        std::string bar = \"[\";\n        for (int i = 0; i < width; i++) {\n            bar += (i < filled) ? \"■\" : \" \";\n        }\n        bar += \"]\";\n        return bar;\n    }\n\n    void render_vault_dweller(const VaultDweller& dweller) {\n        std::string mouth = dweller.is_injured() ? \"/---\\\\\" : \"\\\\___/\";\n        std::string head_bar = render_bar(dweller.condition.head);\n        std::string torso_bar = render_bar(dweller.condition.torso);\n        std::string left_arm_bar = render_bar(dweller.condition.left_arm);\n        std::string right_arm_bar = render_bar(dweller.condition.right_arm);\n        std::string left_leg_bar = render_bar(dweller.condition.left_leg);\n        std::string right_leg_bar = render_bar(dweller.condition.right_leg);\n\n        std::cout << \"\\n\"\n                  << \"┌─────┐                           \" << head_bar << \"\\n\"\n                  << \"│ CND │                           ┌─────────\"  << std::setw(31) << \"Stimpak (\" << dweller.stimpaks << \")\\n\"\n                  << \"└─────┘                               _.-~'~-._\\n\"\n                  << \"  RAD                                /  _   _  `-.\\n\"\n                  << \"                                    |  (•) (•)   |\\n\"\n                  << \"  EFF                               |   \" << mouth << \"   _╯\\n\"\n                  << \"                 \" << left_arm_bar << \"          \\\\         /          \" << right_arm_bar << \"\\n\"\n                  << \"                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\\n\"\n                  << \"                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\\n\"\n                  << \"                         ╰─────╮      \" << torso_bar << \"     ╭─────╯\\n\"\n                  << \"                               `─────┐         ┌─────'\\n\"\n                  << \"                                     │         │\\n\"\n                  << \"                                    /    ╭─╮    \\\\\\n\"\n                  << \"                                   /    /   \\\\    \\\\\\n\"\n                  << \"                 \" << left_leg_bar << \"       /    /     \\\\    \\\\       \" << right_leg_bar << \"\\n\"\n                  << \"                 ─────────┘      /    /       \\\\    \\\\      └─────────\\n\"\n                  << \"                            ╭───╯    /         \\\\    ╰───╮\\n\"\n                  << \"                            ╰───────╯           ╰───────╯\\n\"\n                  << \"                                \" << dweller.name << \" - Level \" << dweller.level << \"\\n\\n\";\n    }\n\n    void render_footer() {\n        std::cout << \"│  ┏━━━━━━━━┓                                                                 │\\n\"\n                  << \"└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\\n\"\n                  << std::flush;\n    }\n\n    void render_screen(const VaultDweller& dweller) {\n        clear_screen();\n\n        render_header(dweller);\n        render_vault_dweller(dweller);\n        render_footer();\n    }\n\n    void simulate_damage(VaultDweller& dweller) {\n        std::cout << \"\\n\\nPresiona ENTER para causar daño\\n\";\n        std::cin.get();\n        dweller.damage_limb(Limb::Head, 45);\n        dweller.damage_limb(Limb::Torso, 100);\n    }\n\n    void simulate_healing(VaultDweller& dweller) {\n        std::cout << \"\\n\\nPresiona ENTER para curar\\n\";\n        std::cin.get();\n        dweller.use_stimpaks();\n    }\n}\n"
                },
                {
                  "filename": "src/main.cpp",
                  "path": "src/main.cpp",
                  "desc": "Secuencia de pantallas con pausas, daño y curación sobre el mismo morador.",
                  "code": "#include \"../include/ui.hpp\"\n\nint main() {\n    robco::TerminalSession session;\n    robco::VaultDweller dweller;\n\n    robco::render_screen(dweller);\n    robco::simulate_damage(dweller);\n    robco::render_screen(dweller);\n    robco::simulate_healing(dweller);\n    robco::render_screen(dweller);\n\n    return 0; // ~TerminalSession() se llama automáticamente\n}\n"
                },
                {
                  "filename": "makefile",
                  "path": "makefile",
                  "desc": "Makefile actualizado agregando src/dweller.cpp a la lista de fuentes (SRCS).",
                  "code": "CXX      := g++\nCXXFLAGS := -std=c++20 -Wall -Wextra -Iinclude\nTARGET   := pipboy\n\nSRCS     := src/main.cpp src/ui.cpp src/dweller.cpp\nOBJS     := $(SRCS:.cpp=.o)\n\nall: $(TARGET)\n\n$(TARGET): $(OBJS)\n\t$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)\n\n%.o: %.cpp\n\t$(CXX) $(CXXFLAGS) -c $< -o $@\n\nrun: $(TARGET)\n\t./$(TARGET)\n\nclean:\n\trm -f $(OBJS) $(TARGET)\n"
                }
              ],
              "layout": "code"
            },
            {
              "title": "Pregunta · El efecto de copiar",
              "content": [
                "Antes de seguir, predice el resultado y justifica tu respuesta."
              ],
              "quiz": {
                "question": "Si simulate_damage recibiera VaultDweller por valor, ¿qué vería render_screen después de volver a main?",
                "options": [
                  "El daño aplicado al original",
                  "El estado original sin daño",
                  "Un error obligatorio de compilación",
                  "Una fuga de memoria"
                ],
                "correctIndex": 1,
                "explanation": "El parámetro sería una copia local. Para modificar el morador de main, la simulación necesita VaultDweller&amp;."
              }
            },
            {
              "title": "Práctica · Explorar las reglas existentes",
              "content": [
                "Sin cambiar las reglas, prueba temporalmente `damage_limb(Limb::Head, 1)` seguido de `use_stimpaks()`. La división entera no reduce HP con ese daño; la curación devuelve false si HP sigue al máximo.",
                "Explica por qué `get_limb_ptr` no necesita memoria dinámica y por qué `is_injured` puede invocarse al dibujar desde `const VaultDweller&`.",
                "Vuelve al punto de control antes del siguiente capítulo: reemplazaremos las simulaciones por órdenes escritas."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 5,
      "title": "5. Procesador de comandos: REPL y biblioteca estándar",
      "topics": [
        {
          "id": 18,
          "num": 18,
          "title": "Preparar la sesión para el ciclo interactivo",
          "description": "Dar una única ubicación al personaje y al mensaje antes de montar el REPL.",
          "slides": [
            {
              "title": "Del guion de simulación a las decisiones del usuario",
              "content": [
                "Conservamos `structs.hpp`, `dweller.cpp` y el dibujo dinámico. Retiraremos las dos simulaciones y leeremos órdenes completas, como `damage head 45`.",
                "Construiremos en este orden: sesión y UI, contrato del procesador, tokenización, búsqueda, manejadores y finalmente el bucle de entrada. Así cada llamada tendrá una implementación cuando integremos el programa.",
                "El flujo final será: dibujar → leer línea → separar palabras → ejecutar → guardar mensaje → volver a dibujar. REPL significa Read, Eval, Print, Loop; aquí el resultado se imprime en la pantalla siguiente."
              ]
            },
            {
              "title": "Paso 1 · Hacer a la sesión dueña del estado",
              "content": [
                "Reemplaza `ui.hpp`. La sesión incorpora un morador y un mensaje privado; elimina las declaraciones de las simulaciones y cambia `render_screen` para recibir una sesión.",
                "`get_dweller_mut()` devuelve una referencia al miembro, no una copia. `set_status_msg` copia el texto recibido a su propio almacenamiento; el mensaje permanece después de retornar.",
                "`get_status_msg()` devuelve una referencia constante ligada a la vida de la sesión. Los accesores definidos dentro de la clase son inline; constructor y destructor ahora solo se declaran aquí."
              ],
              "code": "#pragma once\n#include \"structs.hpp\"\n\nnamespace robco {\n    class TerminalSession {\n    private:\n        VaultDweller dweller;\n        std::string status_msg = \"ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM\";\n    public:\n        TerminalSession();\n        ~TerminalSession();\n\n        VaultDweller& get_dweller_mut() {\n            return dweller;\n        }\n\n        const std::string& get_status_msg() const {\n            return status_msg;\n        }\n        void set_status_msg(const std::string& new_status_msg) {\n            status_msg = new_status_msg;\n        }\n    };\n\n    void clear_screen();\n    void render_screen(TerminalSession& session);\n}\n",
              "filename": "include/ui.hpp",
              "layout": "code",
              "codeGroup": "Paso 1 · Hacer a la sesión dueña del estado",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 2 · Mover las definiciones de RAII a ui.cpp",
              "content": [
                "Añade estas definiciones al principio del bloque `robco` en `ui.cpp`. Sustituyen a los cuerpos que estaban dentro de la clase anterior.",
                "El comportamiento de color permanece igual, pero ya no necesitamos `<iostream>` en la cabecera. Cada `.cpp` incluye directamente las cabeceras de biblioteca que utiliza."
              ],
              "filename": "src/ui.cpp · dentro de namespace robco",
              "code": "    TerminalSession::TerminalSession() {\n        std::cout << \"\\033[38;5;46m\";\n    }\n\n    TerminalSession::~TerminalSession() {\n        std::cout << \"\\033[0m\\n\" << std::flush;\n    }",
              "layout": "code",
              "codeGroup": "Paso 2 · Mover las definiciones de RAII a ui.cpp",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 3 · Añadir estado y prompt",
              "content": [
                "Elimina `simulate_damage` y `simulate_healing`. Conserva el dibujo, pero retira el `std::flush` final de `render_footer`: lo haremos al finalizar el prompt.",
                "Añade `render_prompt` después del pie. Consulta el mensaje por referencia constante y deja el cursor después de `$` para escribir.",
                "El prompt tiene usuario y ruta decorativos fijos. No consulta el directorio real del sistema."
              ],
              "code": "    void render_prompt(const TerminalSession& session) {\n        std::cout << \"\\n [STATUS]: \" << session.get_status_msg() << \"\\n\"\n                  << \" dweller@pipboy:~$ \" << std::flush;\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 3 · Añadir estado y prompt",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 4 · Dibujar a partir de la sesión",
              "content": [
                "Reemplaza `render_screen`. Obtiene el morador de la sesión y lo pasa a los dibujantes que ya reciben referencias constantes.",
                "Usamos `TerminalSession&` porque el acceso disponible al morador es mutable. Podría añadirse un acceso const en otro diseño; aquí seguimos la interfaz final del proyecto.",
                "Conserva render_bar y render_vault_dweller del capítulo anterior: ya tienen los valores por defecto y las seis llamadas abreviadas."
              ],
              "code": "    void render_screen(TerminalSession& session) {\n        clear_screen();\n\n        render_header(session.get_dweller_mut());\n        render_vault_dweller(session.get_dweller_mut());\n        render_footer();\n\n        render_prompt(session);\n    }",
              "filename": "src/ui.cpp",
              "layout": "code",
              "codeGroup": "Paso 4 · Dibujar a partir de la sesión",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Punto de compilación · Sesión sin comandos todavía",
              "content": [
                "Para verificar este bloque, reemplaza provisionalmente `main.cpp` por el código inferior. Elimina la variable separada `VaultDweller`: ahora vive dentro de la sesión.",
                "Ejecuta `make clean` y después `make run`. Debes ver el personaje y el prompt; el programa aún termina sin leer. En el paso final reemplazaremos este main por el REPL."
              ],
              "filename": "src/main.cpp · provisional",
              "code": "#include \"../include/ui.hpp\"\n\nint main() {\n    robco::TerminalSession session;\n    robco::render_screen(session);\n    return 0;\n}\n",
              "layout": "code",
              "codeGroup": "Punto de compilación · Sesión sin comandos todavía",
              "codePart": 1,
              "codeParts": 1
            }
          ]
        },
        {
          "id": 19,
          "num": 19,
          "title": "Separar palabras y despachar operaciones",
          "description": "Crear CommandProcessor con vector, istringstream, std::function y unordered_map.",
          "slides": [
            {
              "title": "Paso 5 · Crear include/cmd.hpp",
              "content": [
                "Crea la cabecera completa. `CommandHandler` es un alias: todos los manejadores reciben un morador mutable, consultan los tokens y devuelven un mensaje.",
                "`std::function` almacena un callable compatible; `unordered_map` relaciona un nombre con ese callable. La clase es pública hacia sus usuarios y mantiene privada la tabla.",
                "`execute` es const respecto al procesador, pero puede modificar los objetos recibidos mediante referencias mutables. El const de un método no vuelve constantes todos sus parámetros."
              ],
              "code": "#pragma once\n#include \"structs.hpp\"\n#include <string>\n#include <vector>\n#include <unordered_map>\n#include <functional>\n\nnamespace robco {\n    class CommandProcessor {\n    public:\n        using CommandHandler = std::function<std::string(VaultDweller&, const std::vector<std::string>&)>;\n\n        CommandProcessor();\n\n        std::vector<std::string> tokenize(const std::string& input) const;\n\n        std::string execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const;\n\n    private:\n        std::unordered_map<std::string, CommandHandler> commands;\n    };\n}\n",
              "filename": "include/cmd.hpp",
              "layout": "code",
              "codeGroup": "Paso 5 · Crear include/cmd.hpp",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "std::vector · Una secuencia que puede crecer",
              "content": [
                "`std::vector<T>` guarda elementos del mismo tipo en memoria contigua y conserva su orden. A diferencia de un arreglo de tamaño fijo, puede crecer durante la ejecución; gestiona su almacenamiento automáticamente.",
                "Aquí usamos vector<string> porque cada orden puede tener distinta cantidad de palabras. push_back añade al final, size indica cuántas hay y empty permite comprobar si no hay ninguna.",
                "Los índices comienzan en cero. operator[] no comprueba límites: verifica el tamaño antes de acceder; at sí comprueba y lanza una excepción si el índice no existe. Añadir elementos puede invalidar referencias e iteradores si se realoja el almacenamiento."
              ],
              "filename": "Ejemplo independiente · requiere <vector> y <string>",
              "code": "std::vector<std::string> tokens;\ntokens.push_back(\"damage\");\ntokens.push_back(\"head\");\ntokens.push_back(\"45\");\n\n// tokens.size() == 3; tokens.empty() == false\nif (tokens.size() >= 3) {\n    const std::string& limb = tokens[1]; // \"head\"\n    const std::string& amount = tokens[2]; // \"45\", todavía texto\n}\n",
              "layout": "code",
              "codeGroup": "std::vector · Una secuencia que puede crecer",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "std::unordered_map · Buscar por una clave",
              "content": [
                "`std::unordered_map<Clave, Valor>` asocia cada clave única con un valor mediante una tabla hash. No conserva el orden de inserción ni ordena las claves; es útil cuando importa encontrar una entrada por su nombre.",
                "En el proyecto, la clave será el texto de una orden y el valor su manejador. Así, execute puede buscar una función sin escribir una larga cadena de if para cada comando.",
                "operator[] inserta una clave ausente; find solo consulta y devuelve end si no existe. La búsqueda tiene coste promedio constante, pero puede ser lineal en el peor caso."
              ],
              "filename": "Ejemplo independiente · requiere <unordered_map> y <string>",
              "code": "std::unordered_map<std::string, int> inventory;\ninventory[\"stimpak\"] = 6; // Insertar o actualizar\ninventory[\"stimpak\"] = 5; // Misma clave, nuevo valor\n\nauto it = inventory.find(\"stimpak\");\nif (it != inventory.end()) {\n    // it->first es \"stimpak\"; it->second es 5.\n}\n// find(\"radaway\") == inventory.end(); no crea una entrada.\n",
              "layout": "code",
              "codeGroup": "std::unordered_map · Buscar por una clave",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 6 · Convertir una línea en un vector",
              "content": [
                "Crea `src/cmd.cpp` con `#include \"../include/cmd.hpp\"`, `#include <sstream>` y `namespace robco`. Añade este método dentro.",
                "`istringstream` lee desde una cadena en memoria. `while (stream >> word)` agrega cada palabra mientras la extracción tenga éxito, omitiendo separadores de espacio en blanco.",
                "`damage   head 45` produce tres tokens: índices 0, 1 y 2. Una línea vacía produce un vector vacío. El vector y las cadenas poseen su almacenamiento y lo liberan automáticamente."
              ],
              "code": "    std::vector<std::string> CommandProcessor::tokenize(const std::string& input) const {\n        std::istringstream stream(input);\n        std::vector<std::string> tokens;\n        std::string word;\n\n        while (stream >> word) {\n            tokens.push_back(word);\n        }\n\n        return tokens;\n    }",
              "filename": "src/cmd.cpp",
              "layout": "code",
              "codeGroup": "Paso 6 · Convertir una línea en un vector",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "El alcance real de este tokenizador",
              "content": [
                "El comando también forma parte del vector: para `damage head 45`, `tokens[0]` es `damage` y no `head`. Los manejadores usarán ese mismo convenio.",
                "La extracción por palabras no interpreta comillas, barras de escape, tuberías, redirecciones ni variables. Por ejemplo, `load echo \"hola mundo\"` conserva las comillas en los tokens separados.",
                "Es suficiente para los comandos previstos. Un parser de shell completo necesitaría reconocer sintaxis y contexto, además de separar palabras."
              ],
              "terminal": "Entrada: damage   head 45\nTokens:  [\"damage\", \"head\", \"45\"]\n\nEntrada: load echo \"hola mundo\"\nTokens:  [\"load\", \"echo\", \"\\\"hola\", \"mundo\\\"\"]",
              "layout": "code"
            },
            {
              "title": "Paso 7 · Distinguir vacío, salida, conocido y desconocido",
              "content": [
                "Añade `execute`. Comprueba `tokens.empty()` antes de acceder a `[0]`. La referencia `cmd_name` es válida durante esta llamada porque el vector local sigue vivo.",
                "`exit` y `quit` se procesan aquí: escriben en `bool& should_exit`. El resto se busca mediante `find`; si existe, `it->second` es el manejador que invocamos.",
                "`find` evita insertar órdenes desconocidas. `operator[]` sí crea una entrada ausente, útil al registrar comandos pero inadecuado para esta consulta.",
                "La búsqueda en unordered_map tiene coste promedio constante y peor caso lineal; no debemos prometer O(1) en toda circunstancia."
              ],
              "code": "    std::string CommandProcessor::execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const {\n        std::vector<std::string> tokens = tokenize(rawInput);\n\n        if (tokens.empty()) {\n            return \"Listo.\";\n        }\n\n        const std::string& cmd_name = tokens[0];\n\n        if (cmd_name == \"exit\" || cmd_name == \"quit\") {\n            should_exit = true;\n            return \"Apagando terminal RobCo Pip-Boy...\";\n        }\n\n        auto it = commands.find(cmd_name);\n        if (it != commands.end()) {\n            return it->second(dweller, tokens);\n        }\n\n        return \"Comando desconocido: '\" + cmd_name + \"'. Escribe 'help' para ver opciones.\";\n    }",
              "filename": "src/cmd.cpp",
              "layout": "code",
              "codeGroup": "Paso 7 · Distinguir vacío, salida, conocido y desconocido",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 8 · Preparar el constructor y compilar",
              "content": [
                "Antes de `tokenize`, añade provisionalmente `CommandProcessor::CommandProcessor() {}` dentro del namespace. En el próximo tema lo llenaremos con los manejadores.",
                "Añade `src/cmd.cpp` a `SRCS`. Con el main provisional puedes compilar todo aunque todavía no ejecutes órdenes.",
                "La tabla se construye una vez al crear el procesador; no hace falta registrarla de nuevo por cada línea del usuario."
              ],
              "terminal": "# En makefile:\n# SRCS := src/main.cpp src/ui.cpp src/dweller.cpp src/cmd.cpp\nmake clean\nmake",
              "layout": "code"
            }
          ]
        },
        {
          "id": 20,
          "num": 20,
          "title": "Implementar los comandos e integrar el REPL",
          "description": "Registrar lambdas, validar argumentos y cerrar el ciclo con getline y EOF.",
          "slides": [
            {
              "title": "Lambdas · Funciones donde las necesitamos",
              "content": [
                "Una lambda crea un objeto invocable sin tener que declarar una función con nombre. Su forma básica es [capturas](parámetros) { cuerpo }; puede guardarse en una variable o entregarse como argumento.",
                "Los parámetros llegan al invocarla. Las capturas permiten usar variables locales externas: [valor] guarda una copia y [&valor] una referencia, que exige que la variable siga viva. [] no captura nada; así serán nuestros manejadores.",
                "En el procesador, cada lambda recibirá el morador y los tokens, y devolverá un string. CommandHandler, basado en std::function, permite guardar esos invocables compatibles como valores de la tabla."
              ],
              "filename": "Ejemplo independiente · dentro de una función",
              "code": "auto add = [](int a, int b) {\n    return a + b; // El retorno se deduce como int.\n};\nint result = add(2, 3); // 5\n\nint bonus = 10;\nauto with_bonus = [bonus](int points) {\n    return points + bonus; // Usa la copia capturada.\n};\nbonus = 20;\nint total = with_bonus(5); // 15, no 25\n",
              "layout": "code",
              "codeGroup": "Lambdas · Funciones donde las necesitamos",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 9 · Registrar las tres lambdas",
              "content": [
                "Sustituye el constructor vacío por este esqueleto. Cada entrada relaciona el nombre de un comando con una lambda de la firma CommandHandler. Conserva una sola definición del constructor.",
                "Los cuerpos están vacíos a propósito: es un esquema de construcción, todavía no una versión ejecutable. Una lambda que promete devolver string debe devolver un valor; completa las tres antes de compilar o invocarlas.",
                "Los siguientes slides reemplazan únicamente la entrada indicada, dentro de este mismo constructor: primero help, después stimpak y por último damage."
              ],
              "filename": "src/cmd.cpp · esqueleto temporal",
              "code": "    CommandProcessor::CommandProcessor() {\n        commands[\"stimpak\"] = [](VaultDweller& d, const std::vector<std::string>&) -> std::string {\n        };\n\n        commands[\"damage\"] = [](VaultDweller& d, const std::vector<std::string>& args) -> std::string {\n        };\n\n        commands[\"help\"] = [](VaultDweller&, const std::vector<std::string>&) -> std::string {\n        };\n    }",
              "layout": "code",
              "codeGroup": "Paso 9 · Registrar las tres lambdas",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 9a · help: devolver un texto",
              "content": [
                "Reemplaza la entrada help del esqueleto por esta. Es el comando más sencillo: solo devuelve una cadena, sin consultar ni modificar el morador.",
                "Conserva los dos parámetros exigidos por CommandHandler, pero omite sus nombres porque no los utiliza. Registrar la lambda no ejecuta su cuerpo; execute la invocará al recibir help."
              ],
              "filename": "src/cmd.cpp · dentro del constructor",
              "code": "        commands[\"help\"] = [](VaultDweller&, const std::vector<std::string>&) -> std::string {\n            return \"Comandos: damage <limb> <dmg> | stimpak | help | exit\";\n        };",
              "layout": "code",
              "codeGroup": "Paso 9a · help: devolver un texto",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 10 · stimpak: delegar en el modelo",
              "content": [
                "Reemplaza únicamente la entrada stimpak. La referencia d permite modificar el morador de la sesión; no duplicamos las reglas de curación en el procesador.",
                "use_stimpaks devuelve bool: si tuvo éxito devolvemos el mensaje de curación; si no, informamos que no se pudo usar. Todas las rutas devuelven string.",
                "El mensaje heredado dice extremidades restauradas, pero la regla efectiva es +40 por extremidad, con tope 100, y +30 HP. La lógica del modelo sigue siendo la autoridad."
              ],
              "filename": "src/cmd.cpp · dentro del constructor",
              "code": "        commands[\"stimpak\"] = [](VaultDweller& d, const std::vector<std::string>&) -> std::string {\n            if (d.use_stimpaks()) {\n                return \"Stimpak administrado (+30 HP, extremidades restauradas).\";\n            }\n            return \"No puedes usar un Stimpak (HP al máximo o sin Stimpaks).\";\n        };",
              "layout": "code",
              "codeGroup": "Paso 10 · stimpak: delegar en el modelo",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 11 · damage: validar y aplicar daño",
              "content": [
                "Reemplaza únicamente la entrada damage por este bloque completo. Conserva help y stimpak; no vuelvas a añadir el constructor ni dupliques las entradas.",
                "Primero exige tres tokens y busca la extremidad en limb_map. La tabla static const se conserva entre llamadas; una clave desconocida termina con un mensaje sin modificar al personaje.",
                "Después stoi convierte el daño, se rechazan negativos y damage_limb aplica las reglas. try/catch convierte los errores de conversión en mensajes.",
                "Esta validación admite cero, argumentos adicionales y prefijos como 12abc, que stoi convierte en 12. No protege contra cualquier cálculo extremo; una validación estricta comprobaría también el consumo completo del texto."
              ],
              "filename": "src/cmd.cpp · dentro del constructor",
              "code": "        commands[\"damage\"] = [](VaultDweller& d, const std::vector<std::string>& args) -> std::string {\n            if (args.size() < 3) {\n                return \"Uso: damage <head|torso|larm|rarm|lleg|rleg> <cantidad>\";\n            }\n\n            static const std::unordered_map<std::string, Limb> limb_map = {\n                {\"head\", Limb::Head},\n                {\"torso\", Limb::Torso},\n                {\"larm\", Limb::LeftArm},\n                {\"rarm\", Limb::RightArm},\n                {\"lleg\", Limb::LeftLeg},\n                {\"rleg\", Limb::RightLeg},\n            };\n\n            auto it = limb_map.find(args[1]);\n            if (it == limb_map.end()) {\n                return \"Extremidad invalida. Usa: head, torso, larm, rarm, lleg, rleg.\";\n            }\n\n            try {\n                int dmg = std::stoi(args[2]); // Convierte std::string a int de forma segura\n                if (dmg < 0) return \"El daño debe ser un número positivo.\";\n                d.damage_limb(it->second, dmg);\n                return \"Recibiste \" + std::to_string(dmg) + \" pts de daño en '\" + args[1] + '.';\n            } catch (const std::exception&) {\n                return \"Error: '\" + args[2] + \"' no es un número valido.\";\n            }\n        };",
              "layout": "code",
              "codeGroup": "Paso 11 · damage: validar y aplicar daño",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 12 · Reemplazar main por el ciclo completo",
              "content": [
                "Declara una única sesión y un único procesador antes del bucle. Inicializa `should_exit = false` antes de consultar la condición.",
                "El repositorio de referencia dejó ese bool sin inicializar. Su lectura tiene comportamiento indefinido en C++20; las instantáneas del curso incorporan esta corrección mínima.",
                "`getline` conserva los espacios de la línea. Si falla o llega EOF, salimos; de lo contrario, ejecutamos, guardamos el mensaje y dejamos que la siguiente vuelta muestre el nuevo estado.",
                "Al pedir salida se hace un último render para mostrar el mensaje de apagado. Después, el destructor de la sesión restablece el color."
              ],
              "code": "#include \"../include/ui.hpp\"\n#include \"../include/cmd.hpp\"\n#include <iostream>\n\nint main() {\n    robco::TerminalSession session;\n    robco::CommandProcessor shell;\n\n    session.set_status_msg(\"Bienvenido a RobCo Pip-Boy BIOS. Escribe 'help' para comandos.\");\n    std::string input_line;\n    bool should_exit = false;\n\n    while (!should_exit) {\n        robco::render_screen(session);\n\n        if (!std::getline(std::cin, input_line)) {\n            std::cout << \"\\n[EOF detectado - Finalizando sesión...]\";\n            break;\n        }\n\n        std::string result = shell.execute(session.get_dweller_mut(), input_line, should_exit);\n        session.set_status_msg(result);\n\n        if (should_exit) robco::render_screen(session);\n    }\n\n    return 0;\n}\n",
              "filename": "src/main.cpp",
              "layout": "code",
              "codeGroup": "Paso 12 · Reemplazar main por el ciclo completo",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Comprobación · Órdenes válidas y entradas que fallan",
              "content": [
                "Compila desde cero y escribe la secuencia. `damage head 45` deja HP 78 y cabeza 55; `stimpak` lleva ambos a 100 y 95 respectivamente y consume una unidad.",
                "Prueba también una línea vacía, una extremidad inválida, un negativo, texto no numérico y una orden desconocida. Deben producir mensajes y permitir otra entrada.",
                "Reinicia el programa para comprobar `quit` y EOF. En una terminal Linux, Ctrl+D sobre una línea vacía hace que getline detecte fin de entrada; no es una señal como Ctrl+C."
              ],
              "terminal": "make clean\nmake run\n\n# Dentro del Pip-Boy, escribe una orden por línea:\nhelp\ndamage head 45\nstimpak\ndamage wing 5\ndamage head -5\ndamage head texto\ncomando_inexistente\nexit",
              "layout": "code"
            }
          ]
        },
        {
          "id": 21,
          "num": 21,
          "title": "Punto de control: consola interactiva",
          "description": "Revisar el recorrido completo desde la línea hasta el modelo y el HUD.",
          "slides": [
            {
              "title": "Archivos construidos en este capítulo",
              "content": [
                "Ya construimos ocho archivos. `main` coordina el ciclo, `cmd` interpreta y despacha, `dweller` aplica reglas y `ui` presenta el resultado.",
                "Conservamos render_bar con sus valores por defecto del capítulo anterior e inicializamos should_exit en false. Guarda estos archivos para añadir las llamadas POSIX en el siguiente capítulo.",
                "Consulta cada archivo en su pestaña. Si es largo, desplázate dentro del código; Copiar conserva el archivo completo."
              ],
              "multiFile": [
                {
                  "filename": "include/cmd.hpp",
                  "path": "include/cmd.hpp",
                  "desc": "Definición de CommandProcessor, CommandHandler (std::function) y tabla de despacho con unordered_map.",
                  "code": "#pragma once\n#include \"structs.hpp\"\n#include <string>\n#include <vector>\n#include <unordered_map>\n#include <functional>\n\nnamespace robco {\n    class CommandProcessor {\n    public:\n        using CommandHandler = std::function<std::string(VaultDweller&, const std::vector<std::string>&)>;\n\n        CommandProcessor();\n\n        std::vector<std::string> tokenize(const std::string& input) const;\n\n        std::string execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const;\n\n    private:\n        std::unordered_map<std::string, CommandHandler> commands;\n    };\n}\n"
                },
                {
                  "filename": "include/structs.hpp",
                  "path": "include/structs.hpp",
                  "desc": "Estructuras de estado del morador (mantiene alta cohesión y bajo acoplamiento).",
                  "code": "#pragma once\n#include <string>\n\nnamespace robco {\n    enum class Limb {\n        Head,\n        Torso,\n        LeftArm,\n        RightArm,\n        LeftLeg,\n        RightLeg\n    };\n\n    struct BodyCondition {\n        int head      = 100;\n        int torso     = 100;\n        int left_arm  = 100;\n        int right_arm = 100;\n        int left_leg  = 100;\n        int right_leg = 100;\n    };\n\n    struct VaultDweller {\n        std::string name = \"John Smith\";\n        int level  = 2;\n        int hp     = 100;\n        int max_hp = 100;\n        int ap     = 100;\n        int max_ap = 100;\n        int xp     = 100;\n        int max_xp = 100;\n        int stimpaks = 6;\n        BodyCondition condition;\n\n        void damage_limb(Limb target, int damage);\n        bool use_stimpaks();\n\n        bool is_injured() const; // método de solo lectura\n\n    private:\n        int* get_limb_ptr(Limb target);\n    };\n}\n"
                },
                {
                  "filename": "include/ui.hpp",
                  "path": "include/ui.hpp",
                  "desc": "TerminalSession enriquecida con status_msg y método get_dweller_mut() para el ciclo REPL.",
                  "code": "#pragma once\n#include \"structs.hpp\"\n\nnamespace robco {\n    class TerminalSession {\n    private:\n        VaultDweller dweller;\n        std::string status_msg = \"ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM\";\n    public:\n        TerminalSession();\n        ~TerminalSession();\n\n        VaultDweller& get_dweller_mut() {\n            return dweller;\n        }\n\n        const std::string& get_status_msg() const {\n            return status_msg;\n        }\n        void set_status_msg(const std::string& new_status_msg) {\n            status_msg = new_status_msg;\n        }\n    };\n\n    void clear_screen();\n    void render_screen(TerminalSession& session);\n}\n"
                },
                {
                  "filename": "src/cmd.cpp",
                  "path": "src/cmd.cpp",
                  "desc": "Tokenizador con std::istringstream y tabla de despacho de comandos internos con lambdas (damage, stimpak, help, exit).",
                  "code": "#include \"../include/cmd.hpp\"\n#include <sstream>\n\nnamespace robco {\n    CommandProcessor::CommandProcessor() {\n        commands[\"stimpak\"] = [](VaultDweller& d, const std::vector<std::string>&) -> std::string {\n            if (d.use_stimpaks()) {\n                return \"Stimpak administrado (+30 HP, extremidades restauradas).\";\n            }\n            return \"No puedes usar un Stimpak (HP al máximo o sin Stimpaks).\";\n        };\n\n        commands[\"damage\"] = [](VaultDweller& d, const std::vector<std::string>& args) -> std::string {\n            if (args.size() < 3) {\n                return \"Uso: damage <head|torso|larm|rarm|lleg|rleg> <cantidad>\";\n            }\n\n            static const std::unordered_map<std::string, Limb> limb_map = {\n                {\"head\", Limb::Head},\n                {\"torso\", Limb::Torso},\n                {\"larm\", Limb::LeftArm},\n                {\"rarm\", Limb::RightArm},\n                {\"lleg\", Limb::LeftLeg},\n                {\"rleg\", Limb::RightLeg},\n            };\n\n            auto it = limb_map.find(args[1]);\n            if (it == limb_map.end()) {\n                return \"Extremidad invalida. Usa: head, torso, larm, rarm, lleg, rleg.\";\n            }\n\n            try {\n                int dmg = std::stoi(args[2]); // Convierte std::string a int de forma segura\n                if (dmg < 0) return \"El daño debe ser un número positivo.\";\n                d.damage_limb(it->second, dmg);\n                return \"Recibiste \" + std::to_string(dmg) + \" pts de daño en '\" + args[1] + '.';\n            } catch (const std::exception&) {\n                return \"Error: '\" + args[2] + \"' no es un número valido.\";\n            }\n        };\n\n        commands[\"help\"] = [](VaultDweller&, const std::vector<std::string>&) -> std::string {\n            return \"Comandos: damage <limb> <dmg> | stimpak | help | exit\";\n        };\n    }\n\n    std::vector<std::string> CommandProcessor::tokenize(const std::string& input) const {\n        std::istringstream stream(input);\n        std::vector<std::string> tokens;\n        std::string word;\n\n        while (stream >> word) {\n            tokens.push_back(word);\n        }\n\n        return tokens;\n    }\n\n    std::string CommandProcessor::execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const {\n        std::vector<std::string> tokens = tokenize(rawInput);\n\n        if (tokens.empty()) {\n            return \"Listo.\";\n        }\n\n        const std::string& cmd_name = tokens[0];\n\n        if (cmd_name == \"exit\" || cmd_name == \"quit\") {\n            should_exit = true;\n            return \"Apagando terminal RobCo Pip-Boy...\";\n        }\n\n        auto it = commands.find(cmd_name);\n        if (it != commands.end()) {\n            return it->second(dweller, tokens);\n        }\n\n        return \"Comando desconocido: '\" + cmd_name + \"'. Escribe 'help' para ver opciones.\";\n    }\n}\n"
                },
                {
                  "filename": "src/dweller.cpp",
                  "path": "src/dweller.cpp",
                  "desc": "Lógica del morador de refugio.",
                  "code": "#include \"../include/structs.hpp\"\n#include <algorithm>\n\nnamespace robco {\n    int* VaultDweller::get_limb_ptr(Limb target) {\n        switch (target) {\n            case Limb::Head:     return &condition.head;\n            case Limb::Torso:    return &condition.torso;\n            case Limb::LeftArm:  return &condition.left_arm;\n            case Limb::RightArm: return &condition.right_arm;\n            case Limb::LeftLeg:  return &condition.left_leg;\n            case Limb::RightLeg: return &condition.right_leg;\n            default: return nullptr;\n        }\n    }\n\n    void VaultDweller::damage_limb(Limb target, int damage) {\n        int* limb_ptr = get_limb_ptr(target);\n        if (limb_ptr == nullptr) return; // en caso de intento de caso no soportado\n\n        *limb_ptr = std::max(0, *limb_ptr - damage);\n        hp = std::max(0, hp - (damage / 2));\n    }\n\n    bool VaultDweller::use_stimpaks() {\n        if (stimpaks <= 0 || hp >= max_hp) {\n            return false;\n        }\n\n        stimpaks--;\n\n        hp = std::min(max_hp, hp + 30);\n\n        condition.head = std::min(100, condition.head + 40);\n        condition.torso = std::min(100, condition.torso + 40);\n        condition.left_arm = std::min(100, condition.left_arm + 40);\n        condition.right_arm = std::min(100, condition.right_arm + 40);\n        condition.left_leg = std::min(100, condition.left_leg + 40);\n        condition.right_leg = std::min(100, condition.right_leg + 40);\n\n        return true;\n    }\n\n    bool VaultDweller::is_injured() const {\n        return condition.head <= 0\n            || condition.torso <= 0\n            || condition.left_arm <= 0\n            || condition.right_arm <= 0\n            || condition.left_leg <= 0\n            || condition.right_leg <= 0;\n    }\n}\n"
                },
                {
                  "filename": "src/ui.cpp",
                  "path": "src/ui.cpp",
                  "desc": "Integración del prompt dweller@pipboy:~$ y barra de status en render_screen.",
                  "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n#include <iomanip>\n#include <algorithm>\n\nnamespace robco {\n    TerminalSession::TerminalSession() {\n        std::cout << \"\\033[38;5;46m\";\n    }\n    TerminalSession::~TerminalSession() {\n        std::cout << \"\\033[0m\\n\" << std::flush;\n    }\n\n    void clear_screen() {\n        std::cout << \"\\033[2J\\033[H\";\n    }\n\n    void render_header(const VaultDweller& dweller) {\n        std::cout << \"┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\\n\"\n                  << \"│            LVL \" << std::setw(2) << dweller.level\n                  << \" │ HP  \" << std::setw(3) << dweller.hp << \" / \" << dweller.max_hp\n                  << \" │ AP  \" << std::setw(3) << dweller.ap << \" / \" << dweller.max_ap\n                  << \" │ XP            \" << std::setw(3) << dweller.xp << \" / \" << dweller.max_xp << \" │\\n\";\n    }\n\n    std::string render_bar(int current, int max = 100, int width = 8) {\n        int filled = std::clamp((current * width) / max, 0, width);\n        std::string bar = \"[\";\n        for (int i = 0; i < width; i++) {\n            bar += (i < filled) ? \"■\" : \" \";\n        }\n        bar += \"]\";\n        return bar;\n    }\n\n    void render_vault_dweller(const VaultDweller& dweller) {\n        std::string mouth = dweller.is_injured() ? \"/---\\\\\" : \"\\\\___/\";\n        std::string head_bar = render_bar(dweller.condition.head);\n        std::string torso_bar = render_bar(dweller.condition.torso);\n        std::string left_arm_bar = render_bar(dweller.condition.left_arm);\n        std::string right_arm_bar = render_bar(dweller.condition.right_arm);\n        std::string left_leg_bar = render_bar(dweller.condition.left_leg);\n        std::string right_leg_bar = render_bar(dweller.condition.right_leg);\n\n        std::cout << \"\\n\"\n                  << \"┌─────┐                           \" << head_bar << \"\\n\"\n                  << \"│ CND │                           ┌─────────\"  << std::setw(31) << \"Stimpak (\" << dweller.stimpaks << \")\\n\"\n                  << \"└─────┘                               _.-~'~-._\\n\"\n                  << \"  RAD                                /  _   _  `-.\\n\"\n                  << \"                                    |  (•) (•)   |\\n\"\n                  << \"  EFF                               |   \" << mouth << \"   _╯\\n\"\n                  << \"                 \" << left_arm_bar << \"          \\\\         /          \" << right_arm_bar << \"\\n\"\n                  << \"                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\\n\"\n                  << \"                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\\n\"\n                  << \"                         ╰─────╮      \" << torso_bar << \"     ╭─────╯\\n\"\n                  << \"                               `─────┐         ┌─────'\\n\"\n                  << \"                                     │         │\\n\"\n                  << \"                                    /    ╭─╮    \\\\\\n\"\n                  << \"                                   /    /   \\\\    \\\\\\n\"\n                  << \"                 \" << left_leg_bar << \"       /    /     \\\\    \\\\       \" << right_leg_bar << \"\\n\"\n                  << \"                 ─────────┘      /    /       \\\\    \\\\      └─────────\\n\"\n                  << \"                            ╭───╯    /         \\\\    ╰───╮\\n\"\n                  << \"                            ╰───────╯           ╰───────╯\\n\"\n                  << \"                                \" << dweller.name << \" - Level \" << dweller.level << \"\\n\\n\";\n    }\n\n    void render_footer() {\n        std::cout << \"│  ┏━━━━━━━━┓                                                                 │\\n\"\n                  << \"└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\\n\";\n    }\n\n    void render_prompt(const TerminalSession& session) {\n        std::cout << \"\\n [STATUS]: \" << session.get_status_msg() << \"\\n\"\n                  << \" dweller@pipboy:~$ \" << std::flush;\n    }\n\n    void render_screen(TerminalSession& session) {\n        clear_screen();\n\n        render_header(session.get_dweller_mut());\n        render_vault_dweller(session.get_dweller_mut());\n        render_footer();\n\n        render_prompt(session);\n    }\n}\n"
                },
                {
                  "filename": "src/main.cpp",
                  "path": "src/main.cpp",
                  "desc": "Ciclo REPL principal con std::getline() y manejo seguro de fin de archivo EOF (Ctrl+D).",
                  "code": "#include \"../include/ui.hpp\"\n#include \"../include/cmd.hpp\"\n#include <iostream>\n\nint main() {\n    robco::TerminalSession session;\n    robco::CommandProcessor shell;\n\n    session.set_status_msg(\"Bienvenido a RobCo Pip-Boy BIOS. Escribe 'help' para comandos.\");\n    std::string input_line;\n    bool should_exit = false;\n\n    while (!should_exit) {\n        robco::render_screen(session);\n\n        if (!std::getline(std::cin, input_line)) {\n            std::cout << \"\\n[EOF detectado - Finalizando sesión...]\";\n            break;\n        }\n\n        std::string result = shell.execute(session.get_dweller_mut(), input_line, should_exit);\n        session.set_status_msg(result);\n\n        if (should_exit) robco::render_screen(session);\n    }\n\n    return 0;\n}\n"
                },
                {
                  "filename": "makefile",
                  "path": "makefile",
                  "desc": "Makefile actualizado agregando src/cmd.cpp al target.",
                  "code": "CXX      := g++\nCXXFLAGS := -std=c++20 -Wall -Wextra -Iinclude\nTARGET   := pipboy\n\nSRCS     := src/main.cpp src/ui.cpp src/dweller.cpp src/cmd.cpp\nOBJS     := $(SRCS:.cpp=.o)\n\nall: $(TARGET)\n\n$(TARGET): $(OBJS)\n\t$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)\n\n%.o: %.cpp\n\t$(CXX) $(CXXFLAGS) -c $< -o $@\n\nrun: $(TARGET)\n\t./$(TARGET)\n\nclean:\n\trm -f $(OBJS) $(TARGET)\n"
                }
              ],
              "layout": "code"
            },
            {
              "title": "Pregunta · Validar antes de acceder",
              "content": [
                "Antes de seguir, predice el resultado y justifica tu respuesta."
              ],
              "quiz": {
                "question": "El usuario escribe damage head, sin cantidad. ¿Qué debe hacer el manejador antes de intentar convertir args[2]?",
                "options": [
                  "Comprobar args.size() y devolver el mensaje de uso sin aplicar daño",
                  "Llamar a stoi(args[2]) y confiar en que catch detecte el argumento ausente",
                  "Usar cero como cantidad porque el vector completa los elementos que faltan",
                  "Consultar args[2] para comprobar si contiene una cadena vacía"
                ],
                "correctIndex": 0,
                "explanation": "Solo hay dos tokens: damage y head. El manejador comprueba args.size() < 3 y retorna antes de acceder a args[2]. operator[] no comprueba límites: un acceso fuera del vector tiene comportamiento indefinido, no es un error de conversión que stoi pueda resolver."
              }
            },
            {
              "title": "Práctica · Seguir una orden de extremo a extremo",
              "content": [
                "Traza `damage torso 100`: identifica qué función lee, cuál crea tokens, cuál elige la lambda y cuál cambia los números. Predice HP 50, torso 0 y boca triste desde el estado inicial.",
                "Como extensión opcional, añade `rest` siguiendo la firma de CommandHandler para recuperar AP hasta max_ap. La solución base del curso continúa sin ese comando.",
                "En este momento cualquier orden externa sigue siendo desconocida. Todavía no hay `fork`, búsqueda en PATH ni carga de holocintas."
              ]
            }
          ]
        }
      ]
    },
    {
      "id": 6,
      "title": "6. Holocintas: procesos y puente C/POSIX",
      "topics": [
        {
          "id": 22,
          "num": 22,
          "title": "De la orden load a los argumentos de C",
          "description": "Registrar load, probar el enlace y adaptar las cadenas sin perder su propiedad.",
          "slides": [
            {
              "title": "La holocinta · Salir de visita y volver",
              "content": [
                "Piensa en el Pip-Boy como la base y en la holocinta como una misión externa: el hijo sale a ejecutarla; el padre conserva la base y espera su regreso. No cambiamos HP ni inventario.",
                "Trabaja en Linux o WSL. Solo modificaremos cmd.hpp, cmd.cpp y ui.cpp; el Makefile conserva los mismos cuatro .cpp."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// Comando interno: trabaja sobre nuestro personaje.\ndamage head 45\n\n// Comando externo: pide a Linux ejecutar otro programa.\nload uname -a\n\n// Recorrido que construiremos:\n// load → argumentos → fork → hijo: execvp\n//                         → padre: waitpid → HUD",
              "layout": "code",
              "codeGroup": "La holocinta · Salir de visita y volver",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Por qué usamos POSIX en este curso",
              "content": [
                "C++ tiene alternativas portables para muchas tareas de sistema, pero C++20 no ofrece equivalentes directos de fork, execvp y waitpid. Un hilo no es un proceso hijo.",
                "Usamos las interfaces de C para practicar la integración segura: C++ conserva los datos; POSIX recibe los punteros que necesita. No significa que POSIX sea más seguro ni más portable."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// Biblioteca estándar de C++ (más amplia que la STL):\n// std::filesystem → rutas y directorios\n// std::fstream    → archivos\n// std::thread     → hilos, NO procesos independientes\n\n// En este capítulo, POSIX:\n// fork()   → crear un hijo\n// execvp() → reemplazar el programa del hijo\n// waitpid()→ esperar y recoger su resultado",
              "layout": "code",
              "codeGroup": "Por qué usamos POSIX en este curso",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 1 · Declarar el cargador",
              "content": [
                "Añade esta declaración en la sección public de CommandProcessor, en cmd.hpp. args se recibe por valor: el cargador tendrá sus propias cadenas; el parámetro dweller se conserva por compatibilidad, pero aquí no se usa.",
                "En cmd.cpp conserva <sstream> y añade <iostream>, <unistd.h>, <sys/wait.h>, <csignal>, <cstring>, <cerrno> y <utility>. Cada inclusión declara directamente algo que utilizaremos."
              ],
              "filename": "include/cmd.hpp · sección public",
              "code": "std::string runHolotape(VaultDweller& dweller, std::vector<std::string> args) const;",
              "layout": "code",
              "codeGroup": "Paso 1 · Declarar el cargador",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 2 · Conectar load con el cargador",
              "content": [
                "Añade una sola entrada load al constructor existente. Primero comprueba que haya un programa; después copia las palabras desde la segunda hasta el final, omitiendo load.",
                "[this] permite llamar al método del procesador, que debe seguir vivo. std::move permite transferir el vector local al parámetro por valor; no ejecuta la orden. Compilaremos después del siguiente paso."
              ],
              "filename": "src/cmd.cpp · dentro del constructor",
              "code": "commands[\"load\"] = [this](VaultDweller& d, const std::vector<std::string>& args) -> std::string {\n    if (args.size() < 2) {\n        return \"Uso: load <programa_linux> [argumentos...] (Ej: load ls -la)\";\n    }\n    // {\"load\", \"uname\", \"-a\"} → {\"uname\", \"-a\"}\n    std::vector<std::string> cmd_args(args.begin() + 1, args.end());\n    return runHolotape(d, std::move(cmd_args));\n};",
              "layout": "code",
              "codeGroup": "Paso 2 · Conectar load con el cargador",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 2b · Probar la conexión antes de crear procesos",
              "content": [
                "Añade esta definición después de execute, dentro de namespace robco. Es provisional: confirma que declaración, registro y llamada están conectados sin introducir todavía fork.",
                "Ejecuta make. Dentro del Pip-Boy, load debe mostrar el uso y load uname -a debe responder Cargador pendiente. En el paso 4 sustituiremos este método completo."
              ],
              "filename": "src/cmd.cpp",
              "code": "    std::string CommandProcessor::runHolotape(VaultDweller&, std::vector<std::string>) const {\n        return \"Cargador pendiente.\";\n    }\n",
              "layout": "code",
              "codeGroup": "Paso 2b · Probar la conexión antes de crear procesos",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "De string a char* · La etiqueta no es el contenido",
              "content": [
                "Un string es un objeto que administra texto. POSIX necesita la dirección de sus caracteres, no la del objeto. data() da esa dirección; no copia ni transfiere la propiedad.",
                "Desde C++17, data() sobre una cadena no const devuelve char*. c_str() devuelve const char*: aquí no necesitamos const_cast."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "std::string word = \"uname\";\n\n// &word       → objeto std::string\n// word.data() → caracteres: u n a m e \\0\nchar* text = word.data();\n\n// text es prestado: word sigue siendo dueño del almacenamiento.\n// No hacer delete text ni usarlo después de destruir word.",
              "layout": "code",
              "codeGroup": "De string a char* · La etiqueta no es el contenido",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 3 · Construir la lista que entiende C",
              "content": [
                "Una dirección por palabra, más nullptr al final. Cada palabra termina en '\\0'; nullptr termina la lista. Son dos niveles diferentes.",
                "Este bloque irá dentro del hijo en el paso 4. args debe seguir vivo y sin modificaciones que invaliden sus direcciones. reserve reserva espacio para punteros, no prolonga la vida de las cadenas."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "std::vector<char*> argv;\nargv.reserve(args.size() + 1);\nfor (std::string& arg : args) {\n    argv.push_back(arg.data());\n}\nargv.push_back(nullptr);\n\n// args = {\"uname\", \"-a\"}  // Posee el texto.\n// argv = {   |      |    nullptr }\n//            ↓      ↓\n//         \"uname\"  \"-a\"  // Direcciones prestadas.",
              "layout": "code",
              "codeGroup": "Paso 3 · Construir la lista que entiende C",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "El puente completo · Objetos frente a direcciones",
              "content": [
                "No conviertas el vector con un cast: construye la representación que pide la función. argv.data() apunta al primer puntero, no al primer objeto string.",
                "Antes de usar cualquier API de C, comprueba qué recibe, si modifica el contenido y cuánto tiempo conserva los punteros. execvp no modifica estas cadenas, pero otras funciones tienen contratos diferentes."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "std::vector<std::string> args = {\"uname\", \"-a\"};\nstd::vector<char*> argv = {args[0].data(), args[1].data(), nullptr};\n\n// args.data() → std::string*   NO es lo que pide execvp.\n// argv.data() → char**        Lista de direcciones de caracteres.\nexecvp(argv[0], argv.data());\n//     programa   argumentos (incluye el nombre del programa)\n// Si execvp retorna, hubo un error; lo trataremos en el hijo.",
              "layout": "code",
              "codeGroup": "El puente completo · Objetos frente a direcciones",
              "codePart": 1,
              "codeParts": 1
            }
          ]
        },
        {
          "id": 23,
          "num": 23,
          "title": "Un cargador, dos caminos: hijo y padre",
          "description": "Entender cada rama antes de integrar runHolotape completo.",
          "slides": [
            {
              "title": "Mapa del cargador · Dos procesos, una terminal",
              "content": [
                "Lee las dos columnas como caminos independientes: el hijo ejecuta la holocinta; el padre conserva el Pip-Boy y espera. La flecha discontinua indica que la terminación del hijo permite completar la espera."
              ],
              "image": {
                "src": "img/fork-flow.svg",
                "maxHeight": 550
              }
            },
            {
              "title": "fork · Una llamada, dos continuaciones",
              "content": [
                "fork crea un proceso hijo. Ambos continúan después de la llamada, pero reciben valores distintos. El hijo tiene su propia memoria: no comparte por referencia el morador del padre."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "pid_t pid = fork();\n\nif (pid < 0) {\n    // ERROR: no se creó ningún hijo.\n} else if (pid == 0) {\n    // HIJO: ejecutar la misión externa.\n} else {\n    // PADRE: pid identifica al hijo; esperar su regreso.\n}\n// Son caminos de procesos distintos, no turnos de un bucle.",
              "layout": "code",
              "codeGroup": "fork · Una llamada, dos continuaciones",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Hijo · Cambiar de programa con execvp",
              "content": [
                "execvp busca el ejecutable en PATH cuando el nombre no contiene '/'. Si tiene éxito, el hijo deja de ejecutar nuestro código: ahora es el programa externo. No crea otro hijo ni vuelve cuando ese programa termina.",
                "Si vuelve, hubo error. Informamos la causa y usamos _exit(127) para que el hijo no continúe el REPL ni vacíe búferes heredados. 127 es la convención elegida para este fallo de lanzamiento."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// Dentro de if (pid == 0), después de preparar argv:\nexecvp(argv[0], argv.data());\n\n// ÉXITO → esta parte nunca se ejecuta.\n// ERROR → errno identifica la causa.\nstd::cerr << std::strerror(errno) << \"\\n\";\n_exit(127);\n\n// No usar return para volver al REPL del hijo.\n// _exit no ejecuta destructores locales ni la limpieza normal.",
              "layout": "code",
              "codeGroup": "Hijo · Cambiar de programa con execvp",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Padre · Recoger un resultado, no solo esperar",
              "content": [
                "waitpid espera al hijo indicado y recoge su terminación: así no queda como zombi. status es un paquete codificado; primero pregunta cómo terminó y después extrae el dato correspondiente.",
                "La versión final no comprueba si waitpid falla ni reintenta ante EINTR. Es una limitación: solo debe interpretarse status si la espera tuvo éxito."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "int status = 0;\nwaitpid(pid, &status, 0); // Aquí continúa el PADRE.\n\nif (WIFEXITED(status)) {\n    int code = WEXITSTATUS(status); // true → 0; false → 1\n} else if (WIFSIGNALED(status)) {\n    int signal = WTERMSIG(status);  // Ctrl+C → SIGINT\n}\n// status NO es directamente el código de salida.\n// El hijo puede acabar normalmente o por una señal.",
              "layout": "code",
              "codeGroup": "Padre · Recoger un resultado, no solo esperar",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 4 · Integrar el cargador completo",
              "content": [
                "Sustituye runHolotape provisional por este método completo. No añadas por separado los ejemplos anteriores: este bloque ya integra las tres ramas, argv y los mensajes.",
                "load garantiza args no vacío. El flush anterior a fork envía el encabezado antes de duplicar el proceso; la pausa del padre permite leer la salida antes de volver al HUD. Todavía falta configurar Ctrl+C en el paso 5."
              ],
              "code": "    std::string CommandProcessor::runHolotape(VaultDweller&, std::vector<std::string> args) const {\n        std::cout << \"\\n─── [CARGANDO HOLOCINTA: \" << args[0] << \"] ────────────────────────────────────\\n\"\n                  << std::flush;\n\n        pid_t pid = fork();\n\n        if (pid < 0) {\n            return \"Error critico del kernel: fallo en crear un subproceso.\";\n        }\n\n        if (pid == 0) {\n            // Restaurar Ctrl+C para poder detener holocinta\n            std::signal(SIGINT, SIG_DFL);\n\n            // Convertir argumentos en arreglo bidimencional de caracters de C\n            std::vector<char*> argv;\n            argv.reserve(args.size() + 1);\n            for (std::string& arg : args) {\n                argv.push_back(arg.data());\n            }\n            argv.push_back(nullptr);\n\n            execvp(argv[0], argv.data());\n\n            std::cerr << \"[ROBCO OS ERROR]: No se pudo ejecutar '\" << args[0] << \"' (\" << std::strerror(errno) << \")\\n\";\n            _exit(127);\n        }\n\n        int status = 0;\n        waitpid(pid, &status, 0);\n\n        std::cout << \"────────────────────────────────────────────────────────────────────────────\\n\"\n              << \"[Presiona ENTER para volver a la interfaz del Pip-Boy...]\" << std::flush;\n\n        std::string dummy;\n        std::getline(std::cin, dummy);\n\n        if (WIFEXITED(status)) {\n            int exit_code = WEXITSTATUS(status);\n            return \"Holocinta '\" + args[0] + \"' finalizada (Exit Code: \" + std::to_string(exit_code) + \").\";\n        } else if (WIFSIGNALED(status)) {\n            int sig = WTERMSIG(status);\n            return \"Holocinta '\" + args[0] + \"' interrumpida por señal (SIG: \" + std::to_string(sig) + \")\";\n        }\n\n        return \"Holocinta finalizada\";\n    }",
              "filename": "src/cmd.cpp",
              "layout": "code",
              "codeGroup": "Paso 4 · Integrar el cargador completo",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Pregunta · Quién vuelve al Pip-Boy",
              "content": [
                "Antes de seguir, predice el resultado y justifica tu respuesta."
              ],
              "quiz": {
                "question": "load uname -a se ejecuta correctamente. ¿Qué proceso sigue nuestro código para volver al HUD?",
                "options": [
                  "El hijo, al retornar execvp",
                  "El padre, después de waitpid y de la pausa",
                  "Un tercer proceso creado por execvp",
                  "Ninguno: execvp siempre cierra también al padre"
                ],
                "correctIndex": 1,
                "explanation": "El hijo fue reemplazado por uname. El padre conserva el Pip-Boy, recoge el resultado con waitpid y devuelve el mensaje al REPL."
              }
            }
          ]
        },
        {
          "id": 24,
          "num": 24,
          "title": "Ctrl+C, pruebas y límites del cargador",
          "description": "Distinguir señales, códigos de salida y responsabilidades de cada proceso.",
          "slides": [
            {
              "title": "Ctrl+C · La misma señal, dos respuestas",
              "content": [
                "La terminal envía SIGINT al grupo en primer plano: padre e hijo pueden recibirla. Queremos detener la misión sin apagar la base. No estamos implementando control de trabajos ni procesos en segundo plano."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// PADRE: configuración al iniciar TerminalSession.\nstd::signal(SIGINT, SIG_IGN); // El Pip-Boy ignora Ctrl+C.\n\n// HIJO: ya está en el paso 4, antes de execvp.\nstd::signal(SIGINT, SIG_DFL); // La holocinta puede interrumpirse.\n\n// load sleep 10 + Ctrl+C:\n// hijo termina → padre recoge la señal → ENTER → regresa el HUD",
              "layout": "code",
              "codeGroup": "Ctrl+C · La misma señal, dos respuestas",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 5 · Configurar las señales de la sesión",
              "content": [
                "En ui.cpp añade <csignal> y reemplaza constructor y destructor por este par. Conserva el resto del archivo; no dupliques las definiciones.",
                "Ahora el padre ignora SIGINT durante la sesión; el hijo del paso 4 restaura su comportamiento normal. El destructor restablece color y SIG_DFL, no una configuración previa: asumimos esta aplicación independiente."
              ],
              "filename": "src/ui.cpp · dentro de namespace robco",
              "code": "    TerminalSession::TerminalSession() {\n        // Ignora Ctrl+C en el proceso padre\n        std::signal(SIGINT, SIG_IGN);\n        std::cout << \"\\033[38;5;46m\";\n    }\n\n    TerminalSession::~TerminalSession() {\n        std::signal(SIGINT, SIG_DFL);\n        std::cout << \"\\033[0m\\n\" << std::flush;\n    }",
              "layout": "code",
              "codeGroup": "Paso 5 · Configurar las señales de la sesión",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Paso 6 · Comprobar una ruta cada vez",
              "content": [
                "Ejecuta make clean y make run. Prueba cada orden por separado; pulsa ENTER cuando se solicite para regresar al HUD. Tras damage, las cargas deben conservar HP y Stimpaks.",
                "El help heredado no enumera load: comprueba su registro ejecutándolo. Para exit y EOF seguimos usando el REPL del capítulo anterior."
              ],
              "terminal": "damage head 45              # HP 78; cabeza 55\nload uname -a               # Salida real del sistema\nload true                   # Terminación normal: código 0\nload false                  # Terminación normal: código 1\nload programa_inexistente   # Error de execvp: código 127\nload sleep 10               # Pulsa Ctrl+C: termina por señal\n# Tras cada carga: ENTER. El Pip-Boy debe seguir vivo.\nexit",
              "layout": "code"
            },
            {
              "title": "¿Por qué vemos la salida de ls aquí mismo?",
              "content": [
                "Al escribir load ls, no se abre otra ventana: ls escribe en la misma terminal del Pip-Boy. El hijo conserva las conexiones de entrada y salida del padre, y execvp las mantiene en este caso.",
                "Esas conexiones se identifican con números llamados descriptores: 0 para entrada, 1 para salida normal y 2 para errores. Normalmente están conectadas al teclado y a la terminal; el Pip-Boy no tiene que leer ni copiar la salida de ls.",
                "Después de que ls termina, el padre espera ENTER para que puedas leer el listado. Solo entonces vuelve al HUD, cuyo clear_screen borrará la pantalla. Este slide explica el código existente: no hay que añadirlo otra vez."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// 1. HIJO: ls escribe directamente en la terminal.\n//    ls → salida estándar (1) → ves los nombres de los archivos\n\n// 2. PADRE: espera a que ls termine.\nwaitpid(pid, &status, 0);\n\n// 3. PADRE: deja el listado visible hasta que pulses ENTER.\nstd::string dummy;\nstd::getline(std::cin, dummy);\n\n// 4. El cargador devuelve su mensaje al REPL.\n//    La siguiente vuelta limpia la pantalla y dibuja el HUD.\n//    Sin la pausa, el listado podría desaparecer enseguida.",
              "layout": "code",
              "codeGroup": "¿Por qué vemos la salida de ls aquí mismo?",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "El límite de la misión · cd y la memoria del padre",
              "content": [
                "cd suele ser una función interna del shell, no un ejecutable: load cd .. normalmente falla al buscarlo. Incluso un programa que llame chdir solo cambia su propio directorio.",
                "Para implementar cd, habría que registrarlo como comando interno y cambiar el directorio del padre, validando errores y actualizando el prompt. Es una extensión, no parte de la BIOS final."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// Dos procesos, dos directorios de trabajo:\n// PADRE: /curso         → conserva /curso\n// HIJO:  /curso → chdir(\"..\") → /\n\n// De igual manera, modificar una copia del morador en el hijo\n// no actualiza el personaje que conserva el padre.",
              "layout": "code",
              "codeGroup": "El límite de la misión · cd y la memoria del padre",
              "codePart": 1,
              "codeParts": 1
            },
            {
              "title": "Qué tenemos y qué falta para un shell",
              "content": [
                "Ya puedes reutilizar el REPL, los comandos internos y el ciclo fork/execvp/waitpid para ejecutar una orden en primer plano. No confundas esa base con un shell completo.",
                "Antes de ampliar funciones, robusteceríamos waitpid, la validación numérica y la conservación de la configuración previa de señales. El código final mantiene esas limitaciones identificadas."
              ],
              "filename": "Lectura guiada · no añadir otra copia al proyecto",
              "code": "// Implementado:\n// línea → palabras → load → proceso externo → resultado → HUD\n\n// NO implementado:\n// echo \"dos palabras\"  → nuestro tokenizador no interpreta comillas\n// ls | sort           → no hay tuberías\n// ls > salida.txt     → no hay redirecciones\n// sleep 10 &          → no hay trabajos en segundo plano",
              "layout": "code",
              "codeGroup": "Qué tenemos y qué falta para un shell",
              "codePart": 1,
              "codeParts": 1
            }
          ]
        },
        {
          "id": 25,
          "num": 25,
          "title": "Código final y recorrido de verificación",
          "description": "Reconocer quién posee los datos y quién ejecuta cada tramo.",
          "slides": [
            {
              "title": "Proyecto completo: BIOS del Pip-Boy",
              "content": [
                "Estos ocho archivos reúnen las cuatro etapas. El Makefile compila main.cpp, ui.cpp, dweller.cpp y cmd.cpp; should_exit se inicializa en false para evitar la lectura indefinida del repositorio original.",
                "Compara tu implementación con el visor: un solo registro load, una definición de runHolotape y un único par constructor/destructor de TerminalSession.",
                "Consulta cada archivo en su pestaña. Si es largo, desplázate dentro del código; Copiar conserva el archivo completo."
              ],
              "multiFile": [
                {
                  "filename": "include/cmd.hpp",
                  "path": "include/cmd.hpp",
                  "desc": "Declaración del método runHolotape para ejecutar programas externos en Linux.",
                  "code": "#pragma once\n#include \"structs.hpp\"\n#include <string>\n#include <vector>\n#include <unordered_map>\n#include <functional>\n\nnamespace robco {\n    class CommandProcessor {\n    public:\n        using CommandHandler = std::function<std::string(VaultDweller&, const std::vector<std::string>&)>;\n\n        CommandProcessor();\n\n        std::vector<std::string> tokenize(const std::string& input) const;\n\n        std::string execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const;\n\n        std::string runHolotape(VaultDweller& dweller, std::vector<std::string> args) const;\n\n    private:\n        std::unordered_map<std::string, CommandHandler> commands;\n    };\n}\n"
                },
                {
                  "filename": "include/structs.hpp",
                  "path": "include/structs.hpp",
                  "desc": "Estructuras de dominio completas del morador.",
                  "code": "#pragma once\n#include <string>\n\nnamespace robco {\n    enum class Limb {\n        Head,\n        Torso,\n        LeftArm,\n        RightArm,\n        LeftLeg,\n        RightLeg\n    };\n\n    struct BodyCondition {\n        int head      = 100;\n        int torso     = 100;\n        int left_arm  = 100;\n        int right_arm = 100;\n        int left_leg  = 100;\n        int right_leg = 100;\n    };\n\n    struct VaultDweller {\n        std::string name = \"John Smith\";\n        int level  = 2;\n        int hp     = 100;\n        int max_hp = 100;\n        int ap     = 100;\n        int max_ap = 100;\n        int xp     = 100;\n        int max_xp = 100;\n        int stimpaks = 6;\n        BodyCondition condition;\n\n        void damage_limb(Limb target, int damage);\n        bool use_stimpaks();\n\n        bool is_injured() const; // método de solo lectura\n\n    private:\n        int* get_limb_ptr(Limb target);\n    };\n}\n"
                },
                {
                  "filename": "include/ui.hpp",
                  "path": "include/ui.hpp",
                  "desc": "Contrato de TerminalSession: morador, mensaje de estado y ciclo de vida de la sesión.",
                  "code": "#pragma once\n#include \"structs.hpp\"\n\nnamespace robco {\n    class TerminalSession {\n    private:\n        VaultDweller dweller;\n        std::string status_msg = \"ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM\";\n    public:\n        TerminalSession();\n        ~TerminalSession();\n\n        VaultDweller& get_dweller_mut() {\n            return dweller;\n        }\n\n        const std::string& get_status_msg() const {\n            return status_msg;\n        }\n        void set_status_msg(const std::string& new_status_msg) {\n            status_msg = new_status_msg;\n        }\n    };\n\n    void clear_screen();\n    void render_screen(TerminalSession& session);\n}\n"
                },
                {
                  "filename": "src/cmd.cpp",
                  "path": "src/cmd.cpp",
                  "desc": "Puente C/POSIX: fork(), execvp(), waitpid(), conversión de vector a char** con .data(), y comando 'load'.",
                  "code": "#include \"../include/cmd.hpp\"\n#include <sstream>\n#include <iostream>\n#include <unistd.h>\n#include <sys/wait.h>\n#include <csignal>\n#include <cstring>\n#include <cerrno>\n#include <utility>\n\nnamespace robco {\n    CommandProcessor::CommandProcessor() {\n        commands[\"stimpak\"] = [](VaultDweller& d, const std::vector<std::string>&) -> std::string {\n            if (d.use_stimpaks()) {\n                return \"Stimpak administrado (+30 HP, extremidades restauradas).\";\n            }\n            return \"No puedes usar un Stimpak (HP al máximo o sin Stimpaks).\";\n        };\n\n        commands[\"damage\"] = [](VaultDweller& d, const std::vector<std::string>& args) -> std::string {\n            if (args.size() < 3) {\n                return \"Uso: damage <head|torso|larm|rarm|lleg|rleg> <cantidad>\";\n            }\n\n            static const std::unordered_map<std::string, Limb> limb_map = {\n                {\"head\", Limb::Head},\n                {\"torso\", Limb::Torso},\n                {\"larm\", Limb::LeftArm},\n                {\"rarm\", Limb::RightArm},\n                {\"lleg\", Limb::LeftLeg},\n                {\"rleg\", Limb::RightLeg},\n            };\n\n            auto it = limb_map.find(args[1]);\n            if (it == limb_map.end()) {\n                return \"Extremidad invalida. Usa: head, torso, larm, rarm, lleg, rleg.\";\n            }\n\n            try {\n                int dmg = std::stoi(args[2]); // Convierte std::string a int de forma segura\n                if (dmg < 0) return \"El daño debe ser un número positivo.\";\n                d.damage_limb(it->second, dmg);\n                return \"Recibiste \" + std::to_string(dmg) + \" pts de daño en '\" + args[1] + '.';\n            } catch (const std::exception&) {\n                return \"Error: '\" + args[2] + \"' no es un número valido.\";\n            }\n        };\n\n        commands[\"load\"] = [this](VaultDweller& d, const std::vector<std::string>& args) -> std::string {\n            if (args.size() < 2) {\n                return \"Uso: load <programa_linux> [argumentos...] (Ej: load ls -la)\";\n            }\n            std::vector<std::string> cmd_args(args.begin() + 1, args.end());\n            return runHolotape(d, std::move(cmd_args));\n        };\n\n        commands[\"help\"] = [](VaultDweller&, const std::vector<std::string>&) -> std::string {\n            return \"Comandos: damage <limb> <dmg> | stimpak | help | exit\";\n        };\n    }\n\n    std::vector<std::string> CommandProcessor::tokenize(const std::string& input) const {\n        std::istringstream stream(input);\n        std::vector<std::string> tokens;\n        std::string word;\n\n        while (stream >> word) {\n            tokens.push_back(word);\n        }\n\n        return tokens;\n    }\n\n    std::string CommandProcessor::execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const {\n        std::vector<std::string> tokens = tokenize(rawInput);\n\n        if (tokens.empty()) {\n            return \"Listo.\";\n        }\n\n        const std::string& cmd_name = tokens[0];\n\n        if (cmd_name == \"exit\" || cmd_name == \"quit\") {\n            should_exit = true;\n            return \"Apagando terminal RobCo Pip-Boy...\";\n        }\n\n        auto it = commands.find(cmd_name);\n        if (it != commands.end()) {\n            return it->second(dweller, tokens);\n        }\n\n        return \"Comando desconocido: '\" + cmd_name + \"'. Escribe 'help' para ver opciones.\";\n    }\n\n    std::string CommandProcessor::runHolotape(VaultDweller&, std::vector<std::string> args) const {\n        std::cout << \"\\n─── [CARGANDO HOLOCINTA: \" << args[0] << \"] ────────────────────────────────────\\n\"\n                  << std::flush;\n\n        pid_t pid = fork();\n\n        if (pid < 0) {\n            return \"Error critico del kernel: fallo en crear un subproceso.\";\n        }\n\n        if (pid == 0) {\n            // Restaurar Ctrl+C para poder detener holocinta\n            std::signal(SIGINT, SIG_DFL);\n\n            // Convertir argumentos en arreglo bidimencional de caracters de C\n            std::vector<char*> argv;\n            argv.reserve(args.size() + 1);\n            for (std::string& arg : args) {\n                argv.push_back(arg.data());\n            }\n            argv.push_back(nullptr);\n\n            execvp(argv[0], argv.data());\n\n            std::cerr << \"[ROBCO OS ERROR]: No se pudo ejecutar '\" << args[0] << \"' (\" << std::strerror(errno) << \")\\n\";\n            _exit(127);\n        }\n\n        int status = 0;\n        waitpid(pid, &status, 0);\n\n        std::cout << \"────────────────────────────────────────────────────────────────────────────\\n\"\n              << \"[Presiona ENTER para volver a la interfaz del Pip-Boy...]\" << std::flush;\n\n        std::string dummy;\n        std::getline(std::cin, dummy);\n\n        if (WIFEXITED(status)) {\n            int exit_code = WEXITSTATUS(status);\n            return \"Holocinta '\" + args[0] + \"' finalizada (Exit Code: \" + std::to_string(exit_code) + \").\";\n        } else if (WIFSIGNALED(status)) {\n            int sig = WTERMSIG(status);\n            return \"Holocinta '\" + args[0] + \"' interrumpida por señal (SIG: \" + std::to_string(sig) + \")\";\n        }\n\n        return \"Holocinta finalizada\";\n    }\n}\n"
                },
                {
                  "filename": "src/dweller.cpp",
                  "path": "src/dweller.cpp",
                  "desc": "Implementación de métodos de VaultDweller.",
                  "code": "#include \"../include/structs.hpp\"\n#include <algorithm>\n\nnamespace robco {\n    int* VaultDweller::get_limb_ptr(Limb target) {\n        switch (target) {\n            case Limb::Head:     return &condition.head;\n            case Limb::Torso:    return &condition.torso;\n            case Limb::LeftArm:  return &condition.left_arm;\n            case Limb::RightArm: return &condition.right_arm;\n            case Limb::LeftLeg:  return &condition.left_leg;\n            case Limb::RightLeg: return &condition.right_leg;\n            default: return nullptr;\n        }\n    }\n\n    void VaultDweller::damage_limb(Limb target, int damage) {\n        int* limb_ptr = get_limb_ptr(target);\n        if (limb_ptr == nullptr) return; // en caso de intento de caso no soportado\n\n        *limb_ptr = std::max(0, *limb_ptr - damage);\n        hp = std::max(0, hp - (damage / 2));\n    }\n\n    bool VaultDweller::use_stimpaks() {\n        if (stimpaks <= 0 || hp >= max_hp) {\n            return false;\n        }\n\n        stimpaks--;\n\n        hp = std::min(max_hp, hp + 30);\n\n        condition.head = std::min(100, condition.head + 40);\n        condition.torso = std::min(100, condition.torso + 40);\n        condition.left_arm = std::min(100, condition.left_arm + 40);\n        condition.right_arm = std::min(100, condition.right_arm + 40);\n        condition.left_leg = std::min(100, condition.left_leg + 40);\n        condition.right_leg = std::min(100, condition.right_leg + 40);\n\n        return true;\n    }\n\n    bool VaultDweller::is_injured() const {\n        return condition.head <= 0\n            || condition.torso <= 0\n            || condition.left_arm <= 0\n            || condition.right_arm <= 0\n            || condition.left_leg <= 0\n            || condition.right_leg <= 0;\n    }\n}\n"
                },
                {
                  "filename": "src/ui.cpp",
                  "path": "src/ui.cpp",
                  "desc": "TerminalSession ignora SIGINT en el proceso padre para evitar que Ctrl+C destruya la sesión del Pip-Boy.",
                  "code": "#include \"../include/ui.hpp\"\n#include <iostream>\n#include <iomanip>\n#include <algorithm>\n#include <csignal>\n\nnamespace robco {\n    TerminalSession::TerminalSession() {\n        // Ignora Ctrl+C en el proceso padre\n        std::signal(SIGINT, SIG_IGN);\n        std::cout << \"\\033[38;5;46m\";\n    }\n    TerminalSession::~TerminalSession() {\n        std::signal(SIGINT, SIG_DFL);\n        std::cout << \"\\033[0m\\n\" << std::flush;\n    }\n\n    void clear_screen() {\n        std::cout << \"\\033[2J\\033[H\";\n    }\n\n    void render_header(const VaultDweller& dweller) {\n        std::cout << \"┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\\n\"\n                  << \"│            LVL \" << std::setw(2) << dweller.level\n                  << \" │ HP  \" << std::setw(3) << dweller.hp << \" / \" << dweller.max_hp\n                  << \" │ AP  \" << std::setw(3) << dweller.ap << \" / \" << dweller.max_ap\n                  << \" │ XP            \" << std::setw(3) << dweller.xp << \" / \" << dweller.max_xp << \" │\\n\";\n    }\n\n    std::string render_bar(int current, int max = 100, int width = 8) {\n        int filled = std::clamp((current * width) / max, 0, width);\n        std::string bar = \"[\";\n        for (int i = 0; i < width; i++) {\n            bar += (i < filled) ? \"■\" : \" \";\n        }\n        bar += \"]\";\n        return bar;\n    }\n\n    void render_vault_dweller(const VaultDweller& dweller) {\n        std::string mouth = dweller.is_injured() ? \"/---\\\\\" : \"\\\\___/\";\n        std::string head_bar = render_bar(dweller.condition.head);\n        std::string torso_bar = render_bar(dweller.condition.torso);\n        std::string left_arm_bar = render_bar(dweller.condition.left_arm);\n        std::string right_arm_bar = render_bar(dweller.condition.right_arm);\n        std::string left_leg_bar = render_bar(dweller.condition.left_leg);\n        std::string right_leg_bar = render_bar(dweller.condition.right_leg);\n\n        std::cout << \"\\n\"\n                  << \"┌─────┐                           \" << head_bar << \"\\n\"\n                  << \"│ CND │                           ┌─────────\"  << std::setw(31) << \"Stimpak (\" << dweller.stimpaks << \")\\n\"\n                  << \"└─────┘                               _.-~'~-._\\n\"\n                  << \"  RAD                                /  _   _  `-.\\n\"\n                  << \"                                    |  (•) (•)   |\\n\"\n                  << \"  EFF                               |   \" << mouth << \"   _╯\\n\"\n                  << \"                 \" << left_arm_bar << \"          \\\\         /          \" << right_arm_bar << \"\\n\"\n                  << \"                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\\n\"\n                  << \"                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\\n\"\n                  << \"                         ╰─────╮      \" << torso_bar << \"     ╭─────╯\\n\"\n                  << \"                               `─────┐         ┌─────'\\n\"\n                  << \"                                     │         │\\n\"\n                  << \"                                    /    ╭─╮    \\\\\\n\"\n                  << \"                                   /    /   \\\\    \\\\\\n\"\n                  << \"                 \" << left_leg_bar << \"       /    /     \\\\    \\\\       \" << right_leg_bar << \"\\n\"\n                  << \"                 ─────────┘      /    /       \\\\    \\\\      └─────────\\n\"\n                  << \"                            ╭───╯    /         \\\\    ╰───╮\\n\"\n                  << \"                            ╰───────╯           ╰───────╯\\n\"\n                  << \"                                \" << dweller.name << \" - Level \" << dweller.level << \"\\n\\n\";\n    }\n\n    void render_footer() {\n        std::cout << \"│  ┏━━━━━━━━┓                                                                 │\\n\"\n                  << \"└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\\n\";\n    }\n\n    void render_prompt(const TerminalSession& session) {\n        std::cout << \"\\n [STATUS]: \" << session.get_status_msg() << \"\\n\"\n                  << \" dweller@pipboy:~$ \" << std::flush;\n    }\n\n    void render_screen(TerminalSession& session) {\n        clear_screen();\n\n        render_header(session.get_dweller_mut());\n        render_vault_dweller(session.get_dweller_mut());\n        render_footer();\n\n        render_prompt(session);\n    }\n}\n"
                },
                {
                  "filename": "src/main.cpp",
                  "path": "src/main.cpp",
                  "desc": "Bucle interactivo final del Pip-Boy BIOS.",
                  "code": "#include \"../include/ui.hpp\"\n#include \"../include/cmd.hpp\"\n#include <iostream>\n\nint main() {\n    robco::TerminalSession session;\n    robco::CommandProcessor shell;\n\n    session.set_status_msg(\"Bienvenido a RobCo Pip-Boy BIOS. Escribe 'help' para comandos.\");\n    std::string input_line;\n    bool should_exit = false;\n\n    while (!should_exit) {\n        robco::render_screen(session);\n\n        if (!std::getline(std::cin, input_line)) {\n            std::cout << \"\\n[EOF detectado - Finalizando sesión...]\";\n            break;\n        }\n\n        std::string result = shell.execute(session.get_dweller_mut(), input_line, should_exit);\n        session.set_status_msg(result);\n\n        if (should_exit) robco::render_screen(session);\n    }\n\n    return 0;\n}\n"
                },
                {
                  "filename": "makefile",
                  "path": "makefile",
                  "desc": "Makefile definitivo para compilar ./pipboy en Linux/macOS/WSL.",
                  "code": "CXX      := g++\nCXXFLAGS := -std=c++20 -Wall -Wextra -Iinclude\nTARGET   := pipboy\n\nSRCS     := src/main.cpp src/ui.cpp src/dweller.cpp src/cmd.cpp\nOBJS     := $(SRCS:.cpp=.o)\n\nall: $(TARGET)\n\n$(TARGET): $(OBJS)\n\t$(CXX) $(CXXFLAGS) -o $(TARGET) $(OBJS)\n\n%.o: %.cpp\n\t$(CXX) $(CXXFLAGS) -c $< -o $@\n\nrun: $(TARGET)\n\t./$(TARGET)\n\nclean:\n\trm -f $(OBJS) $(TARGET)\n"
                }
              ],
              "layout": "code"
            },
            {
              "title": "Prueba final · Ejecutar y comparar",
              "content": [
                "No tienes que escribir más código. Inicia una sesión nueva con make run y escribe las órdenes de abajo, una por una, dentro del Pip-Boy.",
                "1. Aplica daño: el HUD debe mostrar HP 78 y cabeza 55. 2. Ejecuta uname: debes ver información real del sistema. Pulsa ENTER cuando se solicite; al regresar, el personaje debe conservar esos mismos valores.",
                "3. Escribe exit: la aplicación debe terminar y restablecer el color de la terminal. Si algo no coincide, revisa el punto de control anterior.",
                "Para comprobar que entiendes la diferencia, localiza en cmd.cpp la lambda damage y runHolotape: la primera modifica al personaje sin crear procesos; la segunda ejecuta el programa en un hijo mientras el padre conserva el estado."
              ],
              "terminal": "damage head 45\n# Comprobar en el HUD: HP 78; cabeza 55; Stimpaks 6.\n\nload uname -a\n# Leer la salida y pulsar ENTER cuando se solicite.\n# Comprobar: Exit Code: 0 y los mismos HP, cabeza y Stimpaks.\n\nexit\n# Comprobar: regreso a la terminal con sus atributos restablecidos.",
              "layout": "code"
            },
            {
              "title": "Código y contacto",
              "content": [
                "Descarga el proyecto completo y úsalo como base para seguir explorando. Requiere Linux o WSL; compila con make run."
              ],
              "downloadCard": {
                "href": "downloads/pipboy-bios.zip",
                "label": "Descargar código completo de la BIOS (.zip)",
                "hint": "Incluye include/, src/, makefile y README."
              },
              "contact": {
                "heading": "Tutor",
                "name": "Alfonso Suarez",
                "subtitle": "Ingeniería Informática · Universidad Católica Andrés Bello (UCAB)",
                "items": [
                  {
                    "icon": "whatsapp",
                    "value": "+58 424 927 4197",
                    "url": "https://wa.me/584249274197"
                  },
                  {
                    "icon": "github",
                    "value": "github.com/alfosua/ucab-pipboy-bios",
                    "url": "https://github.com/alfosua/ucab-pipboy-bios"
                  },
                  {
                    "icon": "web",
                    "value": "alfosua.com",
                    "url": "https://alfosua.com"
                  },
                  {
                    "icon": "email",
                    "value": "alfonso.suarez@ucab.edu.ve",
                    "url": "mailto:alfonso.suarez@ucab.edu.ve"
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  ]
};
