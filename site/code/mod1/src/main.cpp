#include "../include/ui.hpp"
#include <iostream>

int main() {
    std::cout << "\033[38;5;46m";
    robco::clear_screen();
    robco::render_header(2, 99, 100, 55, 100, 10, 100);
    robco::render_vault_dweller("John Smith", 2, 6);
    robco::render_footer();
    std::cout << "\033[0m\n" << std::flush;
    return 0;
}
