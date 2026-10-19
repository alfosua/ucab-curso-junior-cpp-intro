#include "../include/ui.hpp"

int main() {
    robco::TerminalSession session;
    robco::VaultDweller dweller;

    robco::render_screen(dweller);
    robco::simulate_damage(dweller);
    robco::render_screen(dweller);
    robco::simulate_healing(dweller);
    robco::render_screen(dweller);

    return 0; // ~TerminalSession() se llama automáticamente
}
