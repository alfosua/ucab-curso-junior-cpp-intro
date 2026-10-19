#include "../include/ui.hpp"
#include <iostream>
#include <iomanip>
#include <algorithm>
#include <csignal>

namespace robco {
    TerminalSession::TerminalSession() {
        // Ignora Ctrl+C en el proceso padre
        std::signal(SIGINT, SIG_IGN);
        std::cout << "\033[38;5;46m";
    }
    TerminalSession::~TerminalSession() {
        std::signal(SIGINT, SIG_DFL);
        std::cout << "\033[0m\n" << std::flush;
    }

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
                  << "└──┫ Status ┣─── S.P.E.C.I.A.L. ──── Skills ──────── Perks ─────── General ───┘\n";
    }

    void render_prompt(const TerminalSession& session) {
        std::cout << "\n [STATUS]: " << session.get_status_msg() << "\n"
                  << " dweller@pipboy:~$ " << std::flush;
    }

    void render_screen(TerminalSession& session) {
        clear_screen();

        render_header(session.get_dweller_mut());
        render_vault_dweller(session.get_dweller_mut());
        render_footer();

        render_prompt(session);
    }
}
