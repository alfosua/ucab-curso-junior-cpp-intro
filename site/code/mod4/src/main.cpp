#include "../include/ui.hpp"
#include "../include/cmd.hpp"
#include <iostream>

int main() {
    robco::TerminalSession session;
    robco::CommandProcessor shell;

    session.set_status_msg("Bienvenido a RobCo Pip-Boy BIOS. Escribe 'help' para comandos.");
    std::string input_line;
    bool should_exit = false;

    while (!should_exit) {
        robco::render_screen(session);

        if (!std::getline(std::cin, input_line)) {
            std::cout << "\n[EOF detectado - Finalizando sesión...]";
            break;
        }

        std::string result = shell.execute(session.get_dweller_mut(), input_line, should_exit);
        session.set_status_msg(result);

        if (should_exit) robco::render_screen(session);
    }

    return 0;
}
