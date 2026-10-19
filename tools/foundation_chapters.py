"""Introducción y repaso: conceptos breves, ejemplos independientes y predicciones."""

from textwrap import dedent


def slide(title, *content, **extra):
    return dict(title=title, content=list(content), **extra)


def example(title, content, code, **extra):
    return slide(title, *content, code=dedent(code).strip() + "\n", filename="main.cpp", **extra)


def question(question, code, options, correct, explanation):
    return slide("Comprueba lo que sabes", "Predice el resultado antes de ejecutar el código.", quiz=dict(
        question=question, code=dedent(code).strip(), options=options,
        correctIndex=correct, explanation=explanation))


def topic(number, title, description, slides):
    return dict(id=number, num=number, title=title, description=description, slides=slides)


def refresh_introduction(chapter):
    """Conserva bienvenida, entorno y Make; reemplaza los slides solicitados."""
    mission = chapter["topics"][0]
    mission["slides"][1:-1] = [
        slide("¿Por qué C++?",
            "C++ nos permite aprovechar lo que ya conocemos de C y añadir herramientas para organizar el programa y gestionar sus datos.",
            "• **Control:** podemos trabajar con direcciones, memoria y funciones del sistema cuando el problema lo requiere.",
            "• **Abstracción:** cadenas, contenedores y clases permiten expresar una solución sin administrar cada detalle a mano.",
            "• **Recursos:** los objetos pueden encargarse de su limpieza al terminar su vida. Estudiaremos esta técnica, llamada RAII, al gestionar la terminal.",
            "En el Pip-Boy combinaremos ambos niveles: comandos escritos con la biblioteca estándar y ejecución de programas mediante la API POSIX."),
        slide("De C con clases a C++",
            "En 1979, **Bjarne Stroustrup** comenzó en Bell Labs un lenguaje llamado **C with Classes**. Buscaba combinar la eficiencia de C para sistemas con las herramientas de organización que había conocido en Simula.",
            "La idea era representar conceptos mediante tipos propios: reunir sus datos y las operaciones que tienen sentido sobre ellos, sin abandonar el acceso a las capacidades del sistema.",
            "En 1983 adoptó el nombre **C++**, un guiño al operador de incremento de C. En 1985 llegaron la primera versión comercial y el libro The C++ Programming Language.",
            "Con el tiempo añadió programación genérica, una biblioteca estándar más amplia y nuevas formas de gestionar recursos. C++ admite varios estilos: procedural, orientado a objetos y genérico.",
            sources=[dict(name="Historia por su creador", description="Cronología y decisiones de diseño de Bjarne Stroustrup.",
                        url="https://www.stroustrup.com/bs_faq.html#invention")]),
        slide("Estándares de C++",
            "Un estándar define el lenguaje y su biblioteca. El compilador y la biblioteca instalada deben implementar las características que quieras usar.",
            "• **C++98 / C++03:** primera estandarización y correcciones; consolidaron clases, plantillas y la biblioteca de contenedores y algoritmos.",
            "• **C++11 / C++14:** base del C++ moderno: auto, nullptr, lambdas, movimientos y punteros inteligentes, entre otras mejoras.",
            "• **C++17 / C++20 — los que usaremos:** C++17 aporta herramientas como std::clamp; C++20 amplía el lenguaje con conceptos, rangos y otras capacidades. El proyecto se compila con **-std=c++20**, usando principalmente recursos disponibles desde C++17.",
            "• **C++23:** incorpora, por ejemplo, std::print y std::println. Los veremos como curiosidad, sin exigirlos para el proyecto.",
            "• **C++26:** incluye nuevas líneas de evolución, como reflexión y contratos. Su disponibilidad depende del soporte de cada herramienta; queda fuera de los requisitos del curso.",
            sources=[dict(name="Estándares y soporte", description="Estado de las versiones e implementación en compiladores.", url="https://isocpp.org/std/status"),
                   dict(name="Novedades de C++26", description="Reflexión y contratos en la evolución del lenguaje.", url="https://isocpp.org/blog/2026/04/gcc-16.1")])
    ]
    mapping = mission["slides"][-1]
    mapping["table"]["rows"][3][0] = "Comandos (stimpak, damage, help)"
    mission["slides"].append(slide("La referencia · El Pip-Boy del juego",
        "Pantalla de estado del Pip-Boy 3000 en Fallout: New Vegas. Observa el personaje, las barras de las extremidades y las pestañas: reinterpretaremos esos elementos con texto en nuestra terminal, no todas las funciones del juego.",
        image=dict(src="img/fallout/pipboy-original.png", maxHeight=480),
        sources=[dict(name="Manual oficial de Fallout: New Vegas · Stats Menu, página 7", url="https://assets.ctfassets.net/rporu91m20dc/7gUUtEuqD6sqWgeeeaeIUM/133047fda6fd947de47e9a7901383c71/manual_fnv-ue_pc_en-int.pdf#page=5")]))
    mission["slides"].append(slide("Así se verá nuestro Pip-Boy",
        "Este es el resultado que construiremos: estadísticas, barras de salud, personaje y una línea para introducir comandos. Podrás aplicar daño, usar Stimpaks y ejecutar programas de Linux con load.",
        image=dict(src="img/pipboy-final.png", maxHeight=540)))
    first_program = chapter["topics"][2]
    first_program["slides"][1:1] = [
        slide("Compilar el primer programa",
            "Abre una terminal en la carpeta de hello.cpp. g++ compila el archivo y enlaza el ejecutable; -o hello elige su nombre.",
            "Después, ./hello ejecuta el archivo de la carpeta actual. Compilar y ejecutar son dos órdenes distintas.",
            terminal="g++ hello.cpp -o hello\n./hello\n\n# Salida del programa:\n[ROBCO TERMINAL INICIALIZADA]\nBienvenido a la BIOS del Pip-Boy 3000."),
        slide("Elegir estándar y advertencias",
            "La orden anterior sirve para empezar. Para el curso añadiremos tres opciones y mantendremos el mismo programa:",
            "• **-std=c++20:** selecciona C++20 en lugar de depender de la versión que g++ use por defecto. -std=c++17 selecciona C++17 si quieres comparar ejemplos compatibles con esa versión.",
            "• **-Wall:** activa un conjunto amplio de advertencias. No significa literalmente todas las advertencias posibles.",
            "• **-Wextra:** añade otras comprobaciones útiles. Las advertencias ayudan a detectar problemas, pero no demuestran que el programa esté libre de errores.",
            "hello.cpp sigue siendo el archivo de entrada y -o hello sigue eligiendo el nombre del ejecutable.",
            terminal="g++ -std=c++20 -Wall -Wextra hello.cpp -o hello\n./hello")
    ]


def build_foundations():
    return dict(id=2, title="2. Repaso de fundamentos de C++", topics=[
        topic(5, "Variables, tipos y operadores",
            "Repasar tipos y practicar operaciones con resultados anticipados en el código.", [
            slide("Tipos y valores",
                "El tipo indica qué valores puede guardar una variable y qué operaciones admite:",
                "• **bool:** valores lógicos, `true` o `false`. Ejemplo: `bool running = true;` Tamaño habitual: 1 byte.",
                "• **char:** una unidad de carácter, como `'A'`. Ejemplo: `char option = 'A';` Su tamaño siempre es 1 byte de C++.",
                "• **int:** números enteros, positivos, negativos o cero. Ejemplo: `int hp = 100;` Tamaño habitual: 4 bytes.",
                "• **float:** números de punto flotante, con menor precisión que double. Ejemplo: `float speed = 2.5f;` Tamaño habitual: 4 bytes; el sufijo f identifica un literal float.",
                "• **double:** números de punto flotante con mayor precisión. Ejemplo: `double distance = 12.75;` Tamaño habitual: 8 bytes.",
                "nota: Salvo sizeof(char), los tamaños indicados dependen de la implementación. float y double pueden aproximar valores como 0.1; no representan exactamente todos los decimales."),
            example("Variables de cada tipo", [
                "Declara cada variable indicando su tipo, su nombre y un valor inicial después de =.",
                "Usa comillas simples para un char y el sufijo f para un literal float. std::boolalpha permite mostrar el bool como true o false."], r'''
                #include <iostream>

                int main() {
                    bool running = true;     // Valor lógico
                    char option = 'A';       // Una unidad de carácter
                    int hp = 100;            // Número entero
                    float speed = 2.5f;      // Punto flotante de tipo float
                    double distance = 12.75; // Punto flotante de tipo double

                    std::cout << std::boolalpha;
                    std::cout << running << '\n';  // true
                    std::cout << option << '\n';   // A
                    std::cout << hp << '\n';       // 100
                    std::cout << speed << '\n';    // 2.5
                    std::cout << distance << '\n'; // 12.75
                    return 0;
                }
            '''),
            example("Tamaños con sizeof", [
                "sizeof devuelve un std::size_t, un entero sin signo para tamaños. Un byte de C++ tiene CHAR_BIT bits; en las plataformas del curso son ocho.",
                "auto deduce el tipo desde el inicializador: no convierte la variable en un valor sin tipo."], r'''
                #include <cstddef>
                #include <iostream>

                int main() {
                    std::cout << sizeof(char) << '\n';   // 1, por definición
                    std::cout << sizeof(int) << '\n';    // Habitualmente 4
                    std::cout << sizeof(double) << '\n'; // Habitualmente 8
                    std::size_t bytes = sizeof(int);
                    auto hp = 100; // hp tiene tipo int
                    std::cout << bytes << " " << hp << '\n'; // Habitualmente 4 100
                    return 0;
                }
            '''),
            example("Constantes y enteros sin signo", [
                "const impide asignar otro valor a esta variable. unsigned representa enteros no negativos, pero no impide errores aritméticos.",
                "Evita mezclar enteros con signo y sin signo sin revisar las conversiones. Un contador que pueda bajar de cero no debería declararse unsigned solo porque empieza positivo."], r'''
                #include <iostream>

                int main() {
                    const int max_hp = 100;
                    int hp = 75;
                    unsigned int stimpaks = 6;

                    // max_hp = 120; // Error: la variable es const
                    hp += 10;
                    std::cout << hp << '/' << max_hp << '\n'; // 85/100
                    std::cout << stimpaks << '\n';            // 6
                    return 0;
                }
            '''),
            slide("Familias de operadores",
                "• **Aritméticos:** +, -, *, / y % calculan valores. La división entre enteros descarta la parte fraccionaria.",
                "• **Relacionales:** ==, !=, <, <=, > y >= comparan y producen un bool.",
                "• **Lógicos:** &&, || y ! combinan condiciones. && y || pueden omitir la evaluación de su operando derecho.",
                "• **De bits:** &, |, ^, ~, << y >> operan sobre la representación de enteros. Son útiles para máscaras y permisos.",
                "A continuación, cada ejemplo es un programa independiente. Predice su salida antes de ejecutarlo."),
            example("Aritmética y división", [
                "Los tipos de los operandos importan: 7 / 2 divide enteros; 7.0 / 2 realiza una división de punto flotante."], r'''
                #include <iostream>

                int main() {
                    const int a = 7;
                    const int b = 2;
                    std::cout << a + b << '\n';   // 9
                    std::cout << a - b << '\n';   // 5
                    std::cout << a * b << '\n';   // 14
                    std::cout << a / b << '\n';   // 3: se descarta la fracción
                    std::cout << a % b << '\n';   // 1: residuo de la división
                    std::cout << 7.0 / b << '\n'; // 3.5
                    std::cout << 2 + 3 * 4 << '\n';   // 14
                    std::cout << (2 + 3) * 4 << '\n'; // 20
                    return 0;
                }
            '''),
            example("Asignar e incrementar", [
                "= asigna; == compara. Las asignaciones compuestas modifican la variable. Como instrucciones separadas, ++hp y hp++ incrementan ambos en uno.",
                "Evita modificar varias veces una misma variable dentro de una expresión complicada; separa las acciones para hacer explícito el orden."], r'''
                #include <iostream>

                int main() {
                    int hp = 50;
                    hp += 10;
                    std::cout << hp << '\n'; // 60
                    hp -= 5;
                    std::cout << hp << '\n'; // 55
                    ++hp;
                    std::cout << hp << '\n'; // 56
                    hp++;
                    std::cout << hp << '\n'; // 57
                    return 0;
                }
            '''),
            example("Comparaciones", [
                "std::boolalpha hace que cout muestre true y false en lugar de 1 y 0. No modifica el resultado de las comparaciones."], r'''
                #include <iostream>

                int main() {
                    const int hp = 75;
                    std::cout << std::boolalpha;
                    std::cout << (hp == 100) << '\n'; // false
                    std::cout << (hp != 100) << '\n'; // true
                    std::cout << (hp < 50) << '\n';   // false
                    std::cout << (hp <= 75) << '\n';  // true
                    std::cout << (hp > 0) << '\n';    // true
                    std::cout << (hp >= 100) << '\n'; // false
                    return 0;
                }
            '''),
            example("Lógica y cortocircuito", [
                "&& necesita ambas condiciones; || necesita al menos una; ! invierte el valor lógico.",
                "En la última expresión, como divisor != 0 es false, no se evalúa la división. Cambiar && por & eliminaría ese cortocircuito."], r'''
                #include <iostream>

                int main() {
                    const int hp = 40;
                    const int stimpaks = 2;
                    const bool paused = false;
                    const int divisor = 0;
                    std::cout << std::boolalpha;
                    std::cout << (hp < 100 && stimpaks > 0) << '\n'; // true
                    std::cout << (hp <= 0 || paused) << '\n';        // false
                    std::cout << !paused << '\n';                   // true
                    std::cout << (divisor != 0 && 10 / divisor > 1) << '\n'; // false
                    return 0;
                }
            '''),
            example("Bits y máscaras", [
                "Usamos enteros sin signo y literales binarios para observar cada bit. A diferencia de && y ||, & y | no combinan condiciones con cortocircuito.",
                "<< desplaza bits cuando opera sobre enteros; en cout << valor es el operador de inserción del flujo."], r'''
                #include <iostream>

                int main() {
                    const unsigned a = 0b1100; // 12
                    const unsigned b = 0b1010; // 10
                    std::cout << (a & b) << '\n'; //  8: 1000
                    std::cout << (a | b) << '\n'; // 14: 1110
                    std::cout << (a ^ b) << '\n'; //  6: 0110
                    std::cout << ((~a) & 0b1111u) << '\n'; // 3: últimos cuatro bits
                    std::cout << (1u << 3) << '\n'; // 8: 0001 -> 1000
                    std::cout << (8u >> 1) << '\n'; // 4: 1000 -> 0100
                    return 0;
                }
            '''),
            question("¿Qué imprime esta división entre enteros?", "int total = 7;\nint grupos = 2;\nstd::cout << total / grupos;",
                ["3.5", "3", "4", "Un error de compilación"], 1,
                "Ambos operandos son int, así que la división produce 3. La parte fraccionaria se descarta; usa un operando de punto flotante para obtener 3.5.")
        ]),
        topic(6, "Control de flujo y entrada/salida",
            "Condiciones y bucles, una técnica de entrada o salida por ejemplo y ejercicios de lógica.", [
            slide("Elegir y repetir instrucciones",
                "Las condiciones seleccionan una ruta según los datos. Los bucles vuelven a ejecutar un bloque mientras se cumpla una condición o queden elementos.",
                "Empezaremos con enteros y booleanos que ya conoces. Más adelante usaremos estas mismas estructuras con el estado del Pip-Boy."),
            example("Condiciones con if y else", ["Las ramas se evalúan en orden. Se ejecuta la primera que cumple su condición; else cubre los demás casos."], r'''
                #include <iostream>

                int main() {
                    int hp = 25;
                    if (hp <= 0) {
                        std::cout << "Sin salud\n";
                    } else if (hp < 50) {
                        std::cout << "Salud baja\n"; // Se ejecuta esta rama
                    } else {
                        std::cout << "Salud estable\n";
                    }
                    return 0;
                }
            '''),
            example("Selección con switch", [
                "switch compara un entero con etiquetas case constantes. break sale del switch; default atiende los valores que no coinciden con ningún case."], r'''
                #include <iostream>

                int main() {
                    int option = 2;
                    switch (option) {
                        case 1:
                            std::cout << "Iniciar partida\n";
                            break;
                        case 2:
                            std::cout << "Cargar partida\n"; // Se imprime esta línea
                            break;
                        case 3:
                            std::cout << "Salir\n";
                            break;
                        default:
                            std::cout << "Opción inválida\n";
                    }
                    return 0;
                }
            '''),
            slide("Elegir un bucle",
                "• while comprueba antes de ejecutar: puede repetir cero veces.",
                "• do-while comprueba al final: ejecuta al menos una vez.",
                "• for reúne inicio, condición y avance: resulta cómodo con contadores.",
                "• El for basado en rango recorre los elementos de una colección. Veremos cada caso por separado."),
            example("While: una bandera de juego", [
                "El ciclo continúa mientras running sea true. Al cambiar la bandera a false, termina en la siguiente comprobación.",
                "Aquí simulamos salir del juego en la primera vuelta."], r'''
                #include <iostream>

                int main() {
                    bool running = true;

                    while (running) {
                        std::cout << "Jugando\n"; // Se imprime una vez
                        running = false; // Simulamos la acción de salir
                    }

                    std::cout << "Juego cerrado\n";
                    return 0;
                }
            '''),
            example("Do-while: ejecutar al menos una vez", ["La primera ejecución ocurre antes de comprobar la condición. Observa el punto y coma al final del do-while."], r'''
                #include <iostream>

                int main() {
                    int attempts = 0;
                    do {
                        ++attempts;
                        std::cout << "Intento " << attempts << '\n'; // Intento 1
                    } while (attempts < 1);
                    return 0;
                }
            '''),
            example("For: repetir con un contador", ["La inicialización ocurre una vez; después se alternan condición, cuerpo y avance. La variable level pertenece al bucle."], r'''
                #include <iostream>

                int main() {
                    for (int level = 1; level <= 3; ++level) {
                        std::cout << "Nivel " << level << '\n'; // Nivel 1, 2 y 3
                    }
                    return 0;
                }
            '''),
            example("For basado en rango", [
                "Recorre cada elemento sin administrar un índice. Usamos un arreglo de enteros con tamaño fijo; estudiaremos sus detalles en el siguiente tema."], r'''
                #include <iostream>

                int main() {
                    int scores[] = {10, 20, 30};
                    for (int score : scores) {
                        std::cout << score << '\n'; // 10, luego 20 y luego 30
                    }
                    return 0;
                }
            '''),
            example("Salida con cout", [
                "std::cout pertenece a <iostream>. Encadena texto y valores con << sin escribir especificadores de formato."], r'''
                #include <iostream>

                int main() {
                    int hp = 100;
                    std::cout << "HP: " << hp << '\n'; // HP: 100
                    return 0;
                }
            '''),
            example("Salida con printf", [
                "std::printf, disponible mediante <cstdio>, conserva la técnica de C: %d corresponde a un int.",
                "Los especificadores deben corresponder a los tipos de los argumentos. Este programa muestra lo mismo que el anterior con otra técnica."], r'''
                #include <cstdio>

                int main() {
                    int hp = 100;
                    std::printf("HP: %d\n", hp); // HP: 100
                    return 0;
                }
            '''),
            example("Entrada con cin", [
                "std::cin >> hp intenta extraer un entero. La variable se escribe directamente, sin usar & como en scanf.",
                "Comprueba el resultado de la extracción antes de utilizar la entrada. Si escribes texto donde se espera un entero, se ejecuta la rama de error."], r'''
                #include <iostream>

                int main() {
                    int hp = 0;
                    std::cout << "HP: ";
                    if (std::cin >> hp) {
                        std::cout << "Leído: " << hp << '\n'; // Con 75: Leído: 75
                    } else {
                        std::cout << "Entrada inválida\n";
                    }
                    return 0;
                }
            '''),
            example("Leer una línea completa", [
                "getline lee hasta el salto de línea, conserva los espacios intermedios y retira el delimitador del flujo.",
                "cin >> string lee una palabra separada por espacios. Si mezclas extracción con >> y getline, debes atender el salto de línea que puede quedar pendiente."], r'''
                #include <iostream>
                #include <string>

                int main() {
                    std::string line;
                    std::cout << "Comando: ";
                    if (std::getline(std::cin, line)) {
                        std::cout << "Recibido: " << line << '\n';
                        // Con damage head 45: Recibido: damage head 45
                    }
                    return 0;
                }
            '''),
            example("Entrada con scanf", [
                "scanf necesita la dirección de la variable: &hp. %d indica la conversión esperada.",
                "Su retorno cuenta las asignaciones realizadas. Aquí debe ser 1 para poder usar el número leído."], r'''
                #include <cstdio>

                int main() {
                    int hp = 0;
                    std::printf("HP: ");
                    if (std::scanf("%d", &hp) == 1) {
                        std::printf("Leído: %d\n", hp); // Con 75: Leído: 75
                    } else {
                        std::printf("Entrada inválida\n");
                    }
                    return 0;
                }
            '''),
            example("Saltos de línea y flush", [
                "'\\n' inserta un salto de línea. std::endl inserta el salto y también solicita vaciar el flujo; std::flush solicita el vaciado sin añadir un salto.",
                "Usa saltos normales para el texto y un flush cuando necesites enviar la salida pendiente, por ejemplo al finalizar un dibujo o un prompt."], r'''
                #include <iostream>

                int main() {
                    std::cout << "Primera línea\n"; // Salto sin flush explícito
                    std::cout << "Segunda línea" << std::endl; // Salto y flush
                    std::cout << "Listo: " << std::flush; // Flush sin salto
                    return 0;
                }
            '''),
            example("flush · Enviar cuando hace falta", [
                "Piensa en el búfer como una bandeja de salida: agrupa caracteres antes de enviarlos. flush pide vaciarla. Úsalo cuando necesites enviar un mensaje antes de esperar o iniciar otra operación, o al terminar de dibujar una pantalla.",
                "Vaciar después de cada fragmento impide aprovechar esa agrupación y puede aumentar el trabajo de entrada/salida. Para líneas normales, prefiere '\\n' a endl; reserva el vaciado explícito para los puntos donde importa. No hay una mejora de velocidad fija para todos los entornos.",
                "Por defecto, leer con cin ya vacía cout porque los flujos están vinculados. En el curso hacemos explícito el final del prompt y, antes de fork, vaciamos la salida para no duplicar texto pendiente. flush no garantiza guardar un archivo físicamente en disco."], r'''
                #include <iostream>

                int main() {
                    // Agrupar el dibujo: no hace falta flush por cada pieza.
                    std::cout << "HP: " << 78 << " / " << 100 << '\n';
                    std::cout << "AP: " << 55 << " / " << 100 << '\n';
                    std::cout << "$ " << std::flush; // Pantalla lista; enviar ahora.

                    // Evitar esto en cada línea de un listado grande:
                    // std::cout << value << std::endl; // Salto Y flush cada vez.
                    // Preferir: std::cout << value << '\n';
                    return 0;
                }
            '''),
            example("ANSI · Colores y atributos", [
                "Una terminal compatible interpreta ESC seguido de instrucciones: en estas cadenas, \\033 representa el carácter ESC (27 en decimal), no los caracteres visibles de una barra y tres cifras. No es una función de C++: cout envía los bytes y la terminal los interpreta.",
                "31m selecciona rojo, 1m activa intensidad/negrita y 0m restablece los atributos. El Pip-Boy usará 38;5;46m para el verde 46 de la paleta de 256 colores y 0m al terminar. El color permanece activo hasta cambiarlo o restablecerlo."], r'''
                #include <iostream>

                int main() {
                    std::cout << "\033[31mAlerta roja\033[0m\n";
                    std::cout << "\033[1mTexto destacado\033[0m\n";
                    std::cout << "\033[38;5;46mVerde del Pip-Boy\n";
                    std::cout << "Este texto sigue verde\n";
                    std::cout << "\033[0mAtributos predeterminados\n" << std::flush;
                    return 0;
                }
            '''),
            example("ANSI · Pantalla y cursor", [
                "2J borra la pantalla visible, pero no lleva por sí solo el cursor al inicio. H lo coloca en la primera fila y columna: combinaremos ambas secuencias en clear_screen para redibujar el HUD.",
                "2K borra la línea actual; \\r vuelve al principio de esa línea. También puedes posicionar el cursor con fila;columnaH, contando desde 1. Estas operaciones no restablecen el color ni sustituyen a flush.",
                "Prueba los ejemplos en una terminal compatible. Al redirigir la salida a un archivo, los escapes pueden quedar como bytes en lugar de producir efectos visuales; 2J no implica borrar el historial de scroll."], r'''
                #include <iostream>

                int main() {
                    std::cout << "\033[2J\033[H"; // Limpiar y volver al inicio: HUD
                    std::cout << "Estado de la terminal\n";
                    std::cout << "\033[3;5H"; // Fila 3, columna 5
                    std::cout << "Cargando..." << std::flush;
                    std::cout << "\r\033[2K"; // Volver al inicio y borrar esta línea
                    std::cout << "Listo\n" << std::flush;
                    return 0;
                }
            '''),
            example("iomanip · Alinear los números del HUD", [
                "Los manipuladores cambian cómo se imprime un valor, no el valor guardado. Incluye <iomanip> para usar std::setw: fija el ancho mínimo de la siguiente salida, rellenando con espacios.",
                "Usaremos setw(3) para HP, AP y XP, y setw(2) para el nivel. Debes repetirlo para cada valor: no queda activo como ancho permanente. Si el número ocupa más, no lo recorta."], r'''
                #include <iostream>
                #include <iomanip>

                int main() {
                    std::cout << "|" << std::setw(3) << 9   << "|\n"; // |  9|
                    std::cout << "|" << std::setw(3) << 99  << "|\n"; // | 99|
                    std::cout << "|" << std::setw(3) << 100 << "|\n"; // |100|
                    std::cout << "|" << std::setw(3) << 1234 << "|\n"; // |1234|
                    std::cout << "HP " << std::setw(3) << 78 << " / 100\n";
                    // HP  78 / 100: las columnas del HUD quedan alineadas.
                    return 0;
                }
            '''),
            example("Formato · Alineación y relleno", [
                "std::left alinea a la izquierda y std::right a la derecha; std::setfill elige el carácter de relleno. Son útiles para nombres y contadores; left y right están declarados en <ios>, disponible al incluir <iostream>.",
                "A diferencia de setw, la alineación y el relleno siguen activos en el flujo. Restablece right y el espacio al terminar para no cambiar las siguientes salidas del HUD."], r'''
                #include <iostream>
                #include <iomanip>

                int main() {
                    std::cout << "|" << std::left << std::setw(8) << "HP"
                              << "|\n"; // |HP      |
                    std::cout << "|" << std::right << std::setw(8) << "HP"
                              << "|\n"; // |      HP|
                    std::cout << std::setfill('0') << std::setw(3) << 7
                              << '\n'; // 007; el entero sigue siendo 7.
                    std::cout << std::setfill(' ') << std::right;
                    return 0;
                }
            '''),
            example("iomanip · Controlar los decimales", [
                "std::setprecision ajusta la precisión al imprimir números reales. Con std::fixed indica cuántas cifras mostrar después del punto; sin fixed, con el formato predeterminado, indica cifras significativas.",
                "Es una herramienta adicional, no necesaria para las estadísticas enteras del proyecto. El formato y la precisión persisten: vuelve a defaultfloat y precisión 6 si quieres recuperar la configuración inicial."], r'''
                #include <iostream>
                #include <iomanip>

                int main() {
                    double value = 12.3456;
                    std::cout << std::setprecision(3) << value << '\n';
                    // 12.3: tres cifras significativas.
                    std::cout << std::fixed << std::setprecision(2)
                              << value << '\n'; // 12.35: dos decimales.
                    // Se redondea la salida; value no cambia.
                    std::cout << std::defaultfloat << std::setprecision(6);
                    std::cout << value << '\n'; // 12.3456
                    return 0;
                }
            '''),
            example("Imprimir en C++23", [
                "C++23 incorpora std::print y std::println en <print>, con marcadores {} para insertar valores.",
                "Este ejemplo es una curiosidad fuera de la base C++17/C++20 del curso. Requiere seleccionar C++23 y una biblioteca que implemente <print>."], r'''
                #include <print>

                int main() {
                    const int hp = 100;
                    std::print("HP: {}\n", hp);      // HP: 100 y salto
                    std::println("Stimpaks: {}", 3); // Stimpaks: 3 y salto
                    return 0;
                }
            '''),
            question("¿Cuántas veces se ejecuta el cuerpo de este bucle?", "int count = 0;\nwhile (count < 3) {\n    ++count;\n}",
                ["0 veces", "2 veces", "3 veces", "4 veces"], 2,
                "El cuerpo se ejecuta con count igual a 0, 1 y 2. Después del tercer incremento, count vale 3 y la condición deja de cumplirse. Esta lógica es la misma en C y C++.")
        ]),
        topic(7, "Arreglos, punteros y memoria",
            "Direcciones, arreglos de tamaño fijo, referencias y el origen de nullptr.", [
            slide("Memoria y duración de los datos",
                "Un programa maneja valores que necesitan almacenamiento. Conviene distinguir el lugar donde se almacenan de cuánto tiempo siguen siendo válidos.",
                "Las variables locales ordinarias tienen duración automática; las variables static y globales viven durante toda la ejecución. También podemos obtener almacenamiento dinámico cuya liberación debe gestionarse.",
                "En los sistemas habituales hablamos de stack y heap. C++ define reglas de vida de objetos, pero no exige que cada variable corresponda a una ubicación física específica."),
            example("Variables locales y ámbito", [
                "Un bloque delimita el ámbito donde puedes usar un nombre. Su variable local ordinaria termina su vida al salir del bloque.",
                "No guardes la dirección de una variable local para utilizarla después de que termine su vida."], r'''
                #include <iostream>

                int main() {
                    int hp = 100;
                    {
                        int damage = 25;
                        hp -= damage;
                        std::cout << hp << '\n'; // 75
                    }
                    // std::cout << damage; // Error: damage está fuera de ámbito
                    std::cout << hp << '\n'; // 75: hp sigue vivo
                    return 0;
                }
            '''),
            slide("Almacenamiento dinámico",
                "A veces no conocemos de antemano cuántos datos habrá o necesitamos que vivan más allá de una llamada. El almacenamiento dinámico permite atender esas necesidades.",
                "En C suele gestionarse con malloc y free; en C++ existen new y delete, pero normalmente preferimos tipos que administran sus recursos, como std::string y std::vector.",
                "El objeto que administra los datos y su contenido pueden tener ubicaciones distintas. Un vector local puede poseer un arreglo dinámico; una string pequeña puede guardar caracteres dentro del propio objeto.",
                "No necesitamos reservar memoria a mano para el Pip-Boy. Más adelante estudiaremos cómo su limpieza se relaciona con la vida de los objetos mediante RAII."),
            slide("Stack vs. heap",
                "En las implementaciones habituales, el **stack (pila)** aloja variables locales de duración automática y el **heap** proporciona almacenamiento dinámico.",
                "Un puntero local puede apuntar a un objeto en cualquiera de los dos: **dónde vive el puntero y dónde vive el objeto apuntado son cosas distintas**.",
                "nota: Preferiremos variables locales y contenedores que gestionan sus recursos. No necesitas reservar memoria manualmente para usar punteros; C++ define la duración de los objetos, no una ubicación obligatoria para cada variable.",
                table=dict(headers=["Aspecto", "Stack · pila", "Heap · memoria dinámica"], rows=[
                    ["Duración", "El objeto local vive hasta salir de su ámbito", "La reserva dura hasta que su propietario la libera"],
                    ["Gestión", "Automática al entrar y salir de los ámbitos", "Un contenedor o propietario la gestiona; si reservas manualmente, debes liberarla"],
                    ["Tamaño", "Capacidad limitada; evita arreglos locales enormes", "Permite reservas que se ajustan durante la ejecución; también tiene límites"],
                    ["Coste habitual", "Reservar y recuperar espacio suele ser sencillo", "Reservar y liberar suele requerir más trabajo de administración"],
                    ["Uso típico", "Variables temporales, como un contador o los HP", "Datos cuyo tamaño cambia, como los elementos de un vector"]])),
            example("Punteros: guardar una dirección", [
                "Un puntero almacena una dirección en el espacio de direcciones del proceso. No debe describirse como una dirección física de RAM.",
                "En int* ptr, * forma parte de la declaración del tipo puntero; &hp obtiene la dirección del entero existente. La dirección concreta puede variar entre ejecuciones."], r'''
                #include <iostream>

                int main() {
                    int hp = 100;
                    int* ptr = &hp;

                    std::cout << &hp << '\n'; // Dirección de hp
                    std::cout << ptr << '\n'; // La misma dirección
                    std::cout << std::boolalpha << (ptr == &hp) << '\n'; // true
                    return 0;
                }
            '''),
            example("Punteros: acceder al valor", [
                "En una expresión, *ptr accede al objeto apuntado. Escribir a través de ese acceso modifica el objeto original.",
                "Aquí sabemos que ptr apunta a hp y que hp sigue vivo. Un puntero debe apuntar a un objeto válido antes de desreferenciarlo; ser distinto de nulo no basta si quedó colgando."], r'''
                #include <iostream>

                int main() {
                    int hp = 100;
                    int* ptr = &hp;
                    std::cout << *ptr << '\n'; // 100
                    *ptr = 75;
                    std::cout << hp << '\n';   // 75
                    hp = 50;
                    std::cout << *ptr << '\n'; // 50
                    return 0;
                }
            '''),
            example("Arreglos de tamaño fijo", [
                "Un arreglo agrupa elementos contiguos del mismo tipo. En int hp[3], el tamaño es fijo y los índices válidos van de 0 a 2.",
                "Lo llamamos arreglo estático por su tamaño fijo; eso no significa que esté declarado con la palabra static. Este arreglo local tiene duración automática."], r'''
                #include <iostream>

                int main() {
                    int hp[3] = {100, 80, 60};
                    std::cout << hp[0] << '\n'; // 100
                    std::cout << hp[2] << '\n'; // 60
                    hp[1] = 50;
                    std::cout << hp[1] << '\n'; // 50
                    // hp[3] = 0; // Fuera de límites: comportamiento indefinido
                    return 0;
                }
            '''),
            example("Inicializar y recorrer un arreglo", [
                "Podemos deducir el tamaño desde los valores iniciales. Las llaves vacías inicializan a cero los elementos de un arreglo de enteros.",
                "El bucle por índices permite usar la posición; el basado en rango permite visitar los valores directamente."], r'''
                #include <iostream>

                int main() {
                    int scores[] = {10, 20, 30}; // Tamaño deducido: 3
                    int zeros[3] = {};           // {0, 0, 0}

                    for (int i = 0; i < 3; ++i) {
                        std::cout << scores[i] << '\n'; // 10, 20, 30
                    }
                    for (int value : zeros) {
                        std::cout << value << '\n'; // 0, 0, 0
                    }
                    return 0;
                }
            '''),
            example("Arreglos y punteros", [
                "En muchas expresiones, un arreglo se convierte en un puntero a su primer elemento. Esto no convierte al arreglo y al puntero en el mismo tipo.",
                "Al sumar uno a un int*, avanzas un elemento int. La aritmética de punteros debe mantenerse dentro del arreglo o en su posición inmediatamente posterior; esta última no se puede desreferenciar."], r'''
                #include <iostream>

                int main() {
                    int hp[] = {100, 80, 60};
                    int* ptr = hp; // Equivale aquí a &hp[0]
                    std::cout << *ptr << '\n';       // 100
                    std::cout << *(ptr + 1) << '\n'; // 80
                    ptr[2] = 40;
                    std::cout << hp[2] << '\n';      // 40
                    std::cout << sizeof(hp) / sizeof(hp[0]) << '\n'; // 3
                    // sizeof(ptr) mide el puntero, no los elementos del arreglo.
                    return 0;
                }
            '''),
            example("Referencias: otro nombre para el objeto", [
                "C++ añade referencias: int& alias debe inicializarse y queda asociado a ese entero. Asignar a alias cambia el valor del entero; no lo asocia a otro objeto.",
                "Una referencia no tiene un estado nulo válido. Al igual que un puntero, no puede seguir usándose después de que termine la vida del objeto referido."], r'''
                #include <iostream>

                int main() {
                    int hp = 100;
                    int other = 20;
                    int& alias = hp;
                    alias = 75;
                    std::cout << hp << '\n'; // 75
                    alias = other;           // Copia 20 a hp; no reasocia alias
                    std::cout << hp << " " << other << '\n'; // 20 20
                    return 0;
                }
            '''),
            slide("Formas de pasar un parámetro",
                "Esta tabla anticipa cómo se comportan los parámetros de una función. En el próximo tema construiremos ejemplos completos para cada caso.",
                "Una referencia evita copiar el objeto referido; un parámetro puntero copia la dirección. Reasignar ese puntero local no reasigna el puntero del llamador.",
                table=dict(headers=["Sintaxis", "Qué recibe", "Efecto sobre el original"], nowrapFirstColumn=True,
                    rows=[["`f(int x)`", "Un valor independiente", "Cambiar x no cambia la variable del llamador"],
                          ["`f(const int& x)`", "Un alias de solo lectura", "Lee el original sin modificarlo mediante x"],
                          ["`f(int& x)`", "Un alias mutable", "Asignar a x modifica el original"],
                          ["`f(int* x)`", "Una dirección", "Puede modificar *x si apunta a un objeto válido"]])),
            example("nullptr: ausencia de un objeto", [
                "Desde C++11, nullptr expresa que un puntero no apunta a un objeto. Inicializarlo así evita dejar un valor indeterminado.",
                "Antes de usar un puntero opcional, comprueba si es nulo. La comprobación no detecta si un puntero no nulo apunta a un objeto cuya vida ya terminó."], r'''
                #include <iostream>

                int main() {
                    int* selected = nullptr;
                    if (selected == nullptr) {
                        std::cout << "Sin selección\n"; // Se imprime
                    }
                    int hp = 100;
                    selected = &hp;
                    if (selected != nullptr) {
                        *selected = 75;
                    }
                    std::cout << hp << '\n'; // 75
                    return 0;
                }
            '''),
            slide("De NULL a nullptr",
                "En C, NULL es una macro para expresar un puntero nulo; tradicionalmente puede expandirse a 0 o a una expresión como (void*)0. El cero se convierte en puntero nulo en el contexto correspondiente.",
                "C++ heredó el uso de 0 y NULL. Su definición concreta depende de la implementación, y tratar el cero como entero o como puntero puede producir sorpresas al elegir entre funciones sobrecargadas.",
                "C++11 introdujo nullptr, una palabra clave cuyo tipo es std::nullptr_t. Se convierte a tipos puntero, pero no a int: hace explícita la intención y evita confundir ausencia con un número.",
                "En C++17/C++20 preferimos nullptr para punteros. No es el carácter '\\0' que termina una cadena, ni significa necesariamente una dirección física formada por todos ceros.",
                sources=[dict(name="Origen de nullptr", description="Motivación y ejemplos de C++11 por Bjarne Stroustrup.", url="https://www.stroustrup.com/C++11FAQ.html#nullptr")]),
            question("Usando las reglas de punteros que ya conoces de C, ¿cuánto vale hp al final?",
                "int hp = 100;\nint* ptr = &hp;\n*ptr -= 25;\nstd::cout << hp;",
                ["100", "75", "25", "La dirección de hp"], 1,
                "ptr guarda &amp;hp y *ptr accede a ese mismo entero. Restar 25 mediante el puntero cambia hp a 75, tanto en C como en C++.")
        ]),
        topic(8, "Strings, funciones y modularidad",
            "Construir cadenas, definir funciones y separar contratos e implementaciones en archivos.", [
            slide("Una cadena con std::string",
                "std::string es el tipo de la biblioteca estándar para poseer y manipular secuencias de char. Para usarlo, incluye <string>.",
                "Puedes asignar texto, copiarlo, concatenarlo y consultar su tamaño sin reservar ni liberar su almacenamiento a mano.",
                "size() cuenta elementos char, que para UTF-8 son bytes: una letra con acento puede ocupar varios. No es un contador general de letras o de columnas visibles."),
            example("Construir y combinar texto", [
                "Con + creas una concatenación; con += agregas texto a la misma cadena. Dos objetos string distintos tienen valores independientes."], r'''
                #include <iostream>
                #include <string>

                int main() {
                    std::string user = "Ana";
                    std::string prompt = user + "@pipboy";
                    prompt += ":~$";
                    std::string copy = user;
                    copy[0] = 'E';
                    std::cout << prompt << '\n';      // Ana@pipboy:~$
                    std::cout << user.size() << '\n'; // 3
                    std::cout << user << " " << copy << '\n'; // Ana Ena
                    return 0;
                }
            '''),
            example("Consultar y comparar cadenas", [
                "== compara el contenido de dos strings. empty() indica si no hay caracteres y find() busca una subcadena.",
                "find devuelve una posición o std::string::npos si no encuentra. Para acceder con [], el índice debe ser válido; at() comprueba los límites y lanza una excepción si no lo es."], r'''
                #include <iostream>
                #include <string>

                int main() {
                    std::string command = "damage head";
                    std::cout << std::boolalpha;
                    std::cout << (command == "help") << '\n'; // false
                    std::cout << command.empty() << '\n';    // false
                    std::cout << command.find("head") << '\n'; // 7
                    std::cout << command.at(0) << '\n';       // d
                    return 0;
                }
            '''),
            slide("std::string frente a las cadenas de C",
                "En C, una cadena es una secuencia de char terminada en '\\0'. Un char* solo guarda una dirección: por sí solo no informa capacidad, longitud ni propiedad.",
                "std::string administra su almacenamiento y recuerda su tamaño. Eso simplifica el trabajo, aunque todavía debes respetar límites y la vida de sus datos.",
                table=dict(headers=["Operación", "Cadena de C", "std::string"], rows=[
                    ["Almacenamiento", "char name[16]; capacidad fija en ese arreglo", "std::string name; ajusta su almacenamiento"],
                    ["Longitud", "strlen recorre hasta el primer '\\0'", "size() consulta el tamaño almacenado"],
                    ["Comparación", "strcmp compara contenido; == entre punteros compara direcciones", "== compara el contenido"],
                    ["Concatenación", "Requiere capacidad suficiente y gestionar límites", "+ o += construyen o amplían el texto"]])),
            example("El puente hacia una API de C", [
                "c_str() ofrece un const char* terminado en cero. Desde C++17, data() de una string no const también ofrece acceso mutable a los caracteres.",
                "Son accesos prestados: no liberes esos punteros ni los conserves después de destruir o de modificar de formas que invaliden el almacenamiento de la string. data() no autoriza escribir más allá de size()."], r'''
                #include <cstring>
                #include <iostream>
                #include <string>

                int main() {
                    std::string name = "Ana";
                    const char* text = name.c_str();
                    std::cout << std::strlen(text) << '\n'; // 3
                    char* buffer = name.data(); // C++17 o posterior
                    buffer[0] = 'E';
                    std::cout << name << '\n'; // Ena
                    return 0;
                }
            '''),
            slide("Funciones y procedimientos",
                "Una función reúne instrucciones bajo un nombre. La defines una vez y la llamas cuando necesitas esa operación.",
                "Su interfaz indica tipo de retorno, nombre y parámetros. La llamada aporta argumentos concretos para esos parámetros.",
                "En algunos cursos se llama procedimiento a una rutina que no devuelve un valor. En C++ también se declara como función, con tipo de retorno void.",
                "Devolver un resultado y mostrarlo en pantalla son acciones distintas: una función puede calcular sin imprimir, o imprimir sin devolver un dato."),
            example("Parámetros y valor de retorno", [
                "a y b son parámetros locales. En sum(20, 5), 20 y 5 son los argumentos. return entrega el resultado al llamador y termina esa llamada.",
                "Guarda o usa el resultado de la llamada; la función no lo imprime por sí misma."], r'''
                #include <iostream>

                int sum(int a, int b) {
                    return a + b;
                }

                int main() {
                    int result = sum(20, 5);
                    std::cout << result << '\n';     // 25
                    std::cout << sum(3, 4) << '\n';  // 7
                    return 0;
                }
            '''),
            example("Procedimiento: una función void", [
                "void indica que no se devuelve un valor. Un return sin expresión permite terminar antes; llegar a la llave final también termina la llamada."], r'''
                #include <iostream>

                void show_hp(int hp) {
                    if (hp < 0) {
                        std::cout << "HP inválido\n";
                        return;
                    }
                    std::cout << "HP: " << hp << '\n';
                }

                int main() {
                    show_hp(75); // HP: 75
                    show_hp(-1); // HP inválido
                    return 0;
                }
            '''),
            example("Paso por valor: trabajar con una copia", [
                "Cambiar el parámetro hp no cambia el hp de main. Los nombres iguales pertenecen a ámbitos diferentes.",
                "Esta función devuelve el nuevo valor; el llamador decide si lo asigna al original."], r'''
                #include <iostream>

                int damaged_hp(int hp, int damage) {
                    hp -= damage;
                    return hp;
                }

                int main() {
                    int hp = 100;
                    int result = damaged_hp(hp, 25);
                    std::cout << hp << " " << result << '\n'; // 100 75
                    hp = result;
                    std::cout << hp << '\n'; // 75
                    return 0;
                }
            '''),
            example("Paso por referencia: modificar el original", [
                "int& hp es un alias del argumento. La llamada no escribe &: la referencia forma parte de la declaración del parámetro."], r'''
                #include <iostream>

                void damage_hp(int& hp, int damage) {
                    hp -= damage;
                }

                int main() {
                    int hp = 100;
                    damage_hp(hp, 25);
                    std::cout << hp << '\n'; // 75
                    return 0;
                }
            '''),
            example("Referencia constante: leer sin copiar", [
                "const std::string& permite consultar la cadena original sin copiarla y sin modificarla mediante ese parámetro.",
                "Es útil para textos y objetos que solo necesitamos leer. Para enteros pequeños, pasar por valor suele ser suficiente."], r'''
                #include <iostream>
                #include <string>

                void greet(const std::string& name) {
                    std::cout << "Hola, " << name << '\n';
                    // name += "!"; // Error: acceso constante
                }

                int main() {
                    std::string name = "Ana";
                    greet(name); // Hola, Ana
                    std::cout << name << '\n'; // Ana
                    return 0;
                }
            '''),
            example("Parámetro puntero: admitir ausencia", [
                "El llamador entrega una dirección. La función puede aceptar nullptr como ausencia y decidir qué hacer sin desreferenciarlo.",
                "Esta técnica se parece al paso de direcciones que ya usabas en C."], r'''
                #include <iostream>

                void restore(int* hp) {
                    if (hp == nullptr) return;
                    *hp = 100;
                }

                int main() {
                    int hp = 50;
                    restore(&hp);
                    restore(nullptr); // No modifica ningún objeto
                    std::cout << hp << '\n'; // 100
                    return 0;
                }
            '''),
            example("Argumentos por defecto", [
                "Un valor por defecto permite omitir ese argumento al llamar. Los parámetros con valores por defecto se colocan después de los obligatorios.",
                "En un proyecto con cabeceras, escribe el valor por defecto en la declaración visible para el llamador y no lo repitas en la definición.",
                "La expresión condición ? valor_si_se_cumple : valor_si_no elige uno de dos valores. Aquí limita el resultado a 100."], r'''
                #include <iostream>

                int heal(int hp, int amount = 30) {
                    int result = hp + amount;
                    return result > 100 ? 100 : result;
                }

                int main() {
                    std::cout << heal(50) << '\n';     // 80: amount usa 30
                    std::cout << heal(50, 10) << '\n'; // 60: amount usa 10
                    return 0;
                }
            '''),
            slide("Declaraciones y definiciones",
                "Una declaración anuncia una función: nombre, retorno y tipos de parámetros. Su definición añade el cuerpo que ejecuta la operación.",
                "Las cabeceras (.hpp o .h) comparten declaraciones y definiciones de tipos. Los .cpp contienen normalmente las implementaciones de las funciones del proyecto.",
                "El compilador necesita ver una declaración antes de usar la función. El enlazador necesita encontrar su definición al construir el ejecutable.",
                "En el siguiente ejemplo crearemos una cabecera y dos .cpp. No se incluye un .cpp desde otro: ambos se pasan al compilador."),
            slide("Ejemplo: tres archivos conectados",
                "Crea los tres archivos en una misma carpeta para este ejemplo. La cabecera anuncia add, math.cpp lo define y main.cpp lo usa.",
                "Al cambiar la implementación sin cambiar la firma, el código que llama puede mantenerse igual.",
                multiFile=[dict(filename="math.hpp", path="math.hpp", desc="Declaración compartida.", code="#pragma once\n\nint add(int a, int b);\n"),
                           dict(filename="math.cpp", path="math.cpp", desc="Definición de la función.", code='#include "math.hpp"\n\nint add(int a, int b) {\n    return a + b;\n}\n'),
                           dict(filename="main.cpp", path="main.cpp", desc="Programa que usa la cabecera.", code='#include "math.hpp"\n#include <iostream>\n\nint main() {\n    std::cout << add(20, 5) << \'\\n\'; // 25\n    return 0;\n}\n')],
                terminal="g++ -std=c++20 -Wall -Wextra main.cpp math.cpp -o example\n./example\n# Salida: 25"),
            slide("Qué hace #include",
                "#include es una directiva del preprocesador: procesa la cabecera incluida como parte de la unidad de traducción. No ejecuta el archivo ni enlaza automáticamente su .cpp asociado.",
                "Usamos <iostream> y <string> para cabeceras de biblioteca. Las comillas, como en \"math.hpp\", permiten buscar primero según las reglas locales del compilador; en g++ se empieza por la carpeta del archivo que incluye.",
                "La opción -Iinclude añade una carpeta de búsqueda. Si una cabecera usa std::string, debe incluir <string> directamente en vez de depender accidentalmente de otra cabecera.",
                "Un .cpp con sus inclusiones forma una unidad de traducción. Cada .cpp se compila por separado; después se enlazan sus archivos objeto."),
            slide("#pragma once en acción",
                "main.cpp incluye limits.hpp dos veces a propósito. Abre ambas pestañas para ver cómo se conectan los archivos.",
                "• **Con #pragma once:** g++ procesa la cabecera una sola vez. El programa compila y muestra **100**.",
                "• **Sin #pragma once:** la constante max_hp se define dos veces en la misma unidad de traducción. Al recompilar, g++ informa un **error de redefinición**.",
                multiFile=[
                    dict(filename="limits.hpp", path="limits.hpp", desc="La directiva evita repetir la definición de la constante.",
                         code="#pragma once\n\nconst int max_hp = 100;\n"),
                    dict(filename="main.cpp", path="main.cpp", desc="Dos inclusiones deliberadas dentro de la misma unidad de traducción.",
                         code='#include "limits.hpp"\n#include "limits.hpp" // Repetida a propósito\n#include <iostream>\n\nint main() {\n    std::cout << max_hp << \'\\n\'; // 100\n    return 0;\n}\n')
                ]),
            slide("Evitar inclusiones repetidas",
                "Si dos cabeceras incluyen una tercera, sus declaraciones o tipos podrían aparecer repetidos en la misma unidad de traducción.",
                "#pragma once pide al compilador procesar esa cabecera una sola vez por unidad de traducción. g++ lo admite, aunque no es una directiva del estándar de C++.",
                "La alternativa estándar son las guardas de inclusión: una macro marca que el contenido ya se procesó. Este ejemplo equivale al papel de pragma once en nuestra cabecera.",
                "Ninguna técnica permite definir libremente una función ordinaria no inline en una cabecera incluida desde varios .cpp: la unicidad durante el enlace es un problema distinto.",
                filename="math.hpp", code="#ifndef ROBCO_MATH_HPP\n#define ROBCO_MATH_HPP\n\nint add(int a, int b);\n\n#endif\n"),
            example("Namespaces: organizar nombres", [
                "Un namespace agrupa nombres. El operador :: indica a qué espacio pertenece la función: así podemos tener dos show sin colisiones.",
                "No cambia cómo se almacenan los objetos ni crea una clase. En el proyecto agruparemos nuestro código bajo robco."], r'''
                #include <iostream>

                namespace robco {
                    void show() { std::cout << "Pip-Boy\n"; }
                }
                namespace debug {
                    void show() { std::cout << "Diagnóstico\n"; }
                }

                int main() {
                    robco::show(); // Pip-Boy
                    debug::show(); // Diagnóstico
                    return 0;
                }
            '''),
            slide("Namespaces en cabeceras",
                "En la cabecera, declara dentro de namespace robco; en el .cpp, define dentro del mismo namespace. El llamador usará robco::add(20, 5).",
                "std es el espacio de nombres de la biblioteca estándar. Escribir std::string o std::cout deja explícito de dónde viene cada nombre.",
                "Evita using namespace std; en el ámbito global de una cabecera: esa directiva afecta a los archivos que la incluyen y puede generar ambigüedades con otros nombres visibles.",
                filename="math.hpp", code="#pragma once\n\nnamespace robco {\n    int add(int a, int b);\n}\n"),
            question("¿Qué imprime el programa y por qué?", "void change(int x) {\n    x = 20;\n}\n\nint main() {\n    int hp = 100;\n    change(hp);\n    std::cout << hp;\n}",
                ["20, porque los nombres se refieren al mismo entero", "100, porque x recibe una copia del valor", "La dirección de hp", "No compila porque change es void"], 1,
                "El parámetro int x se pasa por valor. Cambiarlo no cambia hp. Podrías modificar el original con int&amp; x o devolviendo un valor y asignándolo en main.")
        ]),
        topic(9, "Tipos propios y orientación a objetos",
            "Structs, métodos, clases, encapsulación, constructores, destructores y enumeraciones.", [
            slide("Organizar datos y comportamiento",
                "Hasta ahora usamos funciones y valores separados. Cuando varios datos describen una misma entidad, un tipo propio hace explícita esa relación.",
                "La programación orientada a objetos reúne estado y operaciones en tipos. Un objeto es una instancia concreta: dos moradores pueden compartir las mismas operaciones y tener distinta salud.",
                "C++ permite combinar este enfoque con funciones libres y programación procedural. No es necesario convertir todo en una clase."),
            example("Struct: un tipo con varios campos", [
                "struct define un tipo compuesto. Cada objeto tiene sus propios campos; el operador . permite acceder a ellos.",
                "Los inicializadores de los miembros proporcionan valores de partida. Declarar el tipo no crea todavía al personaje: lo crea la variable de main."], r'''
                #include <iostream>
                #include <string>

                struct Dweller {
                    std::string name = "Ana";
                    int hp = 100;
                };

                int main() {
                    Dweller first;
                    Dweller second;
                    second.name = "Luis";
                    second.hp = 75;
                    std::cout << first.name << " " << first.hp << '\n';   // Ana 100
                    std::cout << second.name << " " << second.hp << '\n'; // Luis 75
                    return 0;
                }
            '''),
            example("Métodos: operaciones del objeto", [
                "Un método es una función miembro. Dentro de take_damage, hp se refiere al campo de la instancia sobre la que hiciste la llamada.",
                "El puntero implícito this identifica esa instancia; hp y this->hp designan aquí el mismo miembro. Cada objeto conserva su propio estado."], r'''
                #include <iostream>

                struct Dweller {
                    int hp = 100;
                    void take_damage(int amount) {
                        if (amount > 0) {
                            hp = amount >= hp ? 0 : hp - amount;
                        }
                    }
                };

                int main() {
                    Dweller first;
                    Dweller second;
                    first.take_damage(25);
                    std::cout << first.hp << '\n';  // 75
                    std::cout << second.hp << '\n'; // 100
                    return 0;
                }
            '''),
            example("Métodos const: consultar el estado", [
                "const al final de un método indica que no modifica los miembros ordinarios mediante this. Permite invocarlo sobre un objeto o una referencia const.",
                "Un método que modifica hp no debe ser const. La constancia no significa que el método no pueda imprimir o producir otros efectos externos."], r'''
                #include <iostream>

                struct Dweller {
                    int hp = 100;
                    bool is_alive() const {
                        return hp > 0;
                    }
                };

                int main() {
                    const Dweller dweller;
                    std::cout << std::boolalpha << dweller.is_alive() << '\n'; // true
                    // dweller.hp = 0; // Error: dweller es constante
                    return 0;
                }
            '''),
            slide("Encapsular para mantener reglas",
                "Si hp es público, cualquier código puede asignarle un valor inválido. Encapsular permite controlar cómo se consulta y modifica el estado.",
                "public expone la interfaz de uso; private reserva detalles para la implementación del propio tipo. La meta es mantener reglas como 0 <= hp <= 100.",
                "Abstracción significa ofrecer operaciones con sentido, como take_damage, sin obligar al llamador a conocer cada detalle de su cálculo. Encapsulación es el mecanismo para restringir el acceso a esos detalles."),
            example("Class: una interfaz pública", [
                "Los campos privados se modifican a través de operaciones que comprueban sus argumentos. El getter permite consultar sin exponer una referencia mutable.",
                "Cambiar la implementación privada no obliga al llamador a reescribir la operación d.take_damage(25)."], r'''
                #include <iostream>

                class Dweller {
                    int hp = 100; // private por defecto
                public:
                    void take_damage(int amount) {
                        if (amount > 0) hp = amount >= hp ? 0 : hp - amount;
                    }
                    int get_hp() const { return hp; }
                };

                int main() {
                    Dweller d;
                    d.take_damage(25);
                    std::cout << d.get_hp() << '\n'; // 75
                    // d.hp = -10; // Error: hp es privado
                    return 0;
                }
            '''),
            slide("Struct y class: qué cambia",
                "Ambos pueden tener campos, métodos, constructores, destructores y control de acceso. Un struct también puede encapsular y una class también puede exponer datos.",
                "Las diferencias por defecto son el acceso a miembros y el acceso a bases en la herencia: struct usa public; class usa private. Puedes escribir public y private para elegir explícitamente.",
                "Como convención, usaremos struct para el estado del morador y class para la sesión y el procesador. Es una decisión de diseño, no una diferencia en su gestión automática de memoria.",
                "Tanto una variable de tipo struct como una de tipo class puede ser local. Escribir class no implica crear objetos en el heap ni usar new."),
            example("Constructores: preparar un objeto válido", [
                "El constructor tiene el nombre del tipo y no declara retorno. Se ejecuta al crear cada instancia.",
                "La lista después de : inicializa sus miembros antes del cuerpo. Aquí limita el HP inicial al intervalo permitido.",
                "explicit impide usar este constructor como una conversión implícita desde int. La creación directa, como Dweller first(75), sigue permitida."], r'''
                #include <iostream>

                class Dweller {
                    int hp;
                public:
                    explicit Dweller(int initial_hp)
                        : hp(initial_hp < 0 ? 0 : (initial_hp > 100 ? 100 : initial_hp)) {}
                    int get_hp() const { return hp; }
                };

                int main() {
                    Dweller first(75);
                    Dweller second(150);
                    std::cout << first.get_hp() << '\n';  // 75
                    std::cout << second.get_hp() << '\n'; // 100
                    return 0;
                }
            '''),
            example("Destructores y vida de los objetos", [
                "El destructor se llama ~NombreDelTipo y no recibe argumentos ni declara retorno. Para objetos locales se ejecuta al salir normalmente del ámbito.",
                "Este ejemplo imprime para mostrar el orden. En el proyecto lo usaremos para restablecer la terminal: es una primera aplicación de RAII."], r'''
                #include <iostream>

                class Session {
                public:
                    Session() { std::cout << "Iniciar\n"; }
                    ~Session() { std::cout << "Cerrar\n"; }
                };

                int main() {
                    std::cout << "Antes\n";
                    {
                        Session session;
                        std::cout << "Dentro\n";
                    } // Se llama ~Session()
                    std::cout << "Después\n";
                    // Orden: Antes, Iniciar, Dentro, Cerrar, Después
                    return 0;
                }
            '''),
            slide("Otros conceptos de orientación a objetos",
                "• **Composición:** un tipo contiene objetos de otros tipos. Un morador tendrá un BodyCondition que reúne el estado de sus extremidades.",
                "• **Herencia:** un tipo deriva de otro y puede extender su interfaz. No la necesitamos para construir esta BIOS.",
                "• **Polimorfismo:** una misma interfaz puede ofrecer comportamientos distintos. En jerarquías de clases, las funciones virtual permiten seleccionar el comportamiento según el objeto real.",
                "El curso se apoyará principalmente en composición, encapsulación y vida de objetos. Esas herramientas bastan para separar personaje, sesión, interfaz y comandos."),
            slide("Enums: nombrar un conjunto de opciones",
                "Un enum representa un conjunto de alternativas con nombres. Evita recordar que, por ejemplo, 0 representa cabeza y 1 representa torso.",
                "C conserva enumeraciones tradicionales, que también existen en C++. C++11 añade enum class: sus nombres pertenecen al tipo y no se convierten implícitamente a int.",
                "Preferiremos enum class para Limb. No es una clase con métodos: es una enumeración con nombres y conversiones más controladas."),
            example("Enum class con switch", [
                "Ahora sí combinamos una enumeración con el switch que ya conocemos. Limb::Head expresa una alternativa del tipo Limb.",
                "Separar el valor enumerado del texto que escribe el usuario hará explícita la traducción entre un comando y el modelo."], r'''
                #include <iostream>

                enum class Limb { Head, Torso };

                int main() {
                    Limb target = Limb::Head;
                    switch (target) {
                        case Limb::Head:
                            std::cout << "Cabeza\n"; // Se imprime
                            break;
                        case Limb::Torso:
                            std::cout << "Torso\n";
                            break;
                    }
                    // int number = target; // Error: no se convierte implícitamente
                    return 0;
                }
            '''),
            question("¿Qué valores se imprimen y qué explica la diferencia?", "struct Counter {\n    int value = 0;\n    void increment() { ++value; }\n};\n\nCounter a;\nCounter b;\na.increment();\na.increment();\nstd::cout << a.value << ' ' << b.value;",
                ["2 2: los objetos comparten sus campos", "2 0: cada objeto tiene su propio estado", "0 0: los métodos no pueden modificar un struct", "No compila: struct no admite métodos"], 1,
                "a y b son instancias distintas, con un value propio en cada una. Las dos llamadas actúan sobre a; b mantiene su valor inicial. Un struct de C++ sí admite métodos.")
        ])
    ])
