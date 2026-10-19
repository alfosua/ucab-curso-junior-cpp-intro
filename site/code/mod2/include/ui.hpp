#pragma once
#include "structs.hpp"
#include <string>
#include <iostream>

namespace robco {
    void clear_screen();
    void render_screen(const VaultDweller& dweller);
    void simulate_damage(VaultDweller& dweller);
    void simulate_healing(VaultDweller& dweller);

    class TerminalSession {
    public:
        TerminalSession() {
            std::cout << "\033[38;5;46m";
        }
        ~TerminalSession() {
            std::cout << "\033[0m\n" << std::flush;
        }
    };
}
