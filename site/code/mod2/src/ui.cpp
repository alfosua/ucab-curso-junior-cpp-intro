#include "../include/ui.hpp"
#include <iostream>
#include <iomanip>
#include <algorithm>

namespace robco {
    void clear_screen() {
        std::cout << "\033[2J\033[H";
    }

    void render_header(const VaultDweller& dweller) {
        std::cout << "┌─── STATS ─────────┬───────────────┬───────────────┬─────────────────────────┐\n"
                  << "│            LVL " << std::setw(2) << dweller.level
                  << " │ HP  " << std::setw(3) << dweller.hp << " / " << dweller.max_hp
                  << " │ AP  " << std::setw(3) << dweller.ap << " / " << dweller.max_ap
                  << " │ XP            " << std::setw(3) << dweller.xp << " / " << dweller.max_xp << " │\n";
    }

    std::string render_bar(int current, int max = 100, int width = 8) {
        int filled = std::clamp((current * width) / max, 0, width);
        std::string bar = "[";
        for (int i = 0; i < width; i++) {
            bar += (i < filled) ? "■" : " ";
        }
        bar += "]";
        return bar;
    }

    void render_vault_dweller(const VaultDweller& dweller) {
        std::string mouth = dweller.is_injured() ? "/---\\" : "\\___/";
        std::string head_bar = render_bar(dweller.condition.head);
        std::string torso_bar = render_bar(dweller.condition.torso);
        std::string left_arm_bar = render_bar(dweller.condition.left_arm);
        std::string right_arm_bar = render_bar(dweller.condition.right_arm);
        std::string left_leg_bar = render_bar(dweller.condition.left_leg);
        std::string right_leg_bar = render_bar(dweller.condition.right_leg);

        std::cout << "\n"
                  << "┌─────┐                           " << head_bar << "\n"
                  << "│ CND │                           ┌─────────"  << std::setw(31) << "Stimpak (" << dweller.stimpaks << ")\n"
                  << "└─────┘                               _.-~'~-._\n"
                  << "  RAD                                /  _   _  `-.\n"
                  << "                                    |  (•) (•)   |\n"
                  << "  EFF                               |   " << mouth << "   _╯\n"
                  << "                 " << left_arm_bar << "          \\         /          " << right_arm_bar << "\n"
                  << "                 ─────────┐    ╭╮     '._____.'     ╭╮    ┌─────────\n"
                  << "                         ╭─────╯╰──────╯     ╰──────╯╰─────╮\n"
                  << "                         ╰─────╮      " << torso_bar << "     ╭─────╯\n"
                  << "                               `─────┐         ┌─────'\n"
                  << "                                     │         │\n"
                  << "                                    /    ╭─╮    \\\n"
                  << "                                   /    /   \\    \\\n"
                  << "                 " << left_leg_bar << "       /    /     \\    \\       " << right_leg_bar << "\n"
                  << "                 ─────────┘      /    /       \\    \\      └─────────\n"
                  << "                            ╭───╯    /         \\    ╰───╮\n"
                  << "                            ╰───────╯           ╰───────╯\n"
                  << "                                " << dweller.name << " - Level " << dweller.level << "\n\n";
    }

    void render_footer() {
        std::cout << "│  ┏━━━━━━━━┓                                                                 │\n"
                  << "└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\n"
                  << std::flush;
    }

    void render_screen(const VaultDweller& dweller) {
        clear_screen();

        render_header(dweller);
        render_vault_dweller(dweller);
        render_footer();
    }

    void simulate_damage(VaultDweller& dweller) {
        std::cout << "\n\nPresiona ENTER para causar daño\n";
        std::cin.get();
        dweller.damage_limb(Limb::Head, 45);
        dweller.damage_limb(Limb::Torso, 100);
    }

    void simulate_healing(VaultDweller& dweller) {
        std::cout << "\n\nPresiona ENTER para curar\n";
        std::cin.get();
        dweller.use_stimpaks();
    }
}
