#include "../include/ui.hpp"
#include <iostream>
#include <iomanip>

namespace robco {
    void clear_screen() {
        std::cout << "\033[2J\033[H";
    }

    void render_header(int level, int hp, int maxHp, int ap, int maxAp, int xp, int maxXp) {
        std::cout << "┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\n"
                  << "│            LVL " << std::setw(2) << level
                  << " │ HP  " << std::setw(3) << hp << " / " << maxHp
                  << " │ AP  " << std::setw(3) << ap << " / " << maxAp
                  << " │ XP            " << std::setw(3) << xp << " / " << maxXp << " │\n";
    }

    void render_vault_dweller(const std::string& name, int level, int stimpaks) {
        std::cout << "\n"
                  << "┌─────┐                           [■■■■■■■■]\n"
                  << "│ CND │                           ┌─────────"  << std::setw(31) << "Stimpak (" << stimpaks << ")\n";
        std::cout << R"(└─────┘                               _.-~'~-._
  RAD                                /  _   _  `-.
                                    |  (•) (•)   |
  EFF                               |   \___/   _╯
                 [■■■■■■■■]          \         /          [■■■■■■■■]
                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────
                         ╭─────╯╰──────╯     ╰──────╯╰─────╮
                         ╰─────╮      [■■■■■■■]      ╭─────╯
                               `─────┐         ┌─────'
                                     │         │
                                    /    ╭─╮    \
                                   /    /   \    \
                 [■■■■■■■■]       /    /     \    \       [■■■■■■■■]
                 ─────────┘      /    /       \    \      └─────────
                            ╭───╯    /         \    ╰───╮
                            ╰───────╯           ╰───────╯
)" << std::endl;
        std::cout << "                                " << name << " - Level " << level << "\n\n";
    }

    void render_footer() {
        std::cout << "│  ┏━━━━━━━━┓                                                                 │\n"
                  << "└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\n"
                  << std::flush;
    }
}
