#include "../include/cmd.hpp"
#include <sstream>
#include <iostream>
#include <unistd.h>
#include <sys/wait.h>
#include <csignal>
#include <cstring>
#include <cerrno>
#include <utility>

namespace robco {
    CommandProcessor::CommandProcessor() {
        commands["stimpak"] = [](VaultDweller& d, const std::vector<std::string>&) -> std::string {
            if (d.use_stimpaks()) {
                return "Stimpak administrado (+30 HP, extremidades restauradas).";
            }
            return "No puedes usar un Stimpak (HP al máximo o sin Stimpaks).";
        };

        commands["damage"] = [](VaultDweller& d, const std::vector<std::string>& args) -> std::string {
            if (args.size() < 3) {
                return "Uso: damage <head|torso|larm|rarm|lleg|rleg> <cantidad>";
            }

            static const std::unordered_map<std::string, Limb> limb_map = {
                {"head", Limb::Head},
                {"torso", Limb::Torso},
                {"larm", Limb::LeftArm},
                {"rarm", Limb::RightArm},
                {"lleg", Limb::LeftLeg},
                {"rleg", Limb::RightLeg},
            };

            auto it = limb_map.find(args[1]);
            if (it == limb_map.end()) {
                return "Extremidad invalida. Usa: head, torso, larm, rarm, lleg, rleg.";
            }

            try {
                int dmg = std::stoi(args[2]); // Convierte std::string a int de forma segura
                if (dmg < 0) return "El daño debe ser un número positivo.";
                d.damage_limb(it->second, dmg);
                return "Recibiste " + std::to_string(dmg) + " pts de daño en '" + args[1] + '.';
            } catch (const std::exception&) {
                return "Error: '" + args[2] + "' no es un número valido.";
            }
        };

        commands["load"] = [this](VaultDweller& d, const std::vector<std::string>& args) -> std::string {
            if (args.size() < 2) {
                return "Uso: load <programa_linux> [argumentos...] (Ej: load ls -la)";
            }
            std::vector<std::string> cmd_args(args.begin() + 1, args.end());
            return runHolotape(d, std::move(cmd_args));
        };

        commands["help"] = [](VaultDweller&, const std::vector<std::string>&) -> std::string {
            return "Comandos: damage <limb> <dmg> | stimpak | help | exit";
        };
    }

    std::vector<std::string> CommandProcessor::tokenize(const std::string& input) const {
        std::istringstream stream(input);
        std::vector<std::string> tokens;
        std::string word;

        while (stream >> word) {
            tokens.push_back(word);
        }

        return tokens;
    }

    std::string CommandProcessor::execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const {
        std::vector<std::string> tokens = tokenize(rawInput);

        if (tokens.empty()) {
            return "Listo.";
        }

        const std::string& cmd_name = tokens[0];

        if (cmd_name == "exit" || cmd_name == "quit") {
            should_exit = true;
            return "Apagando terminal RobCo Pip-Boy...";
        }

        auto it = commands.find(cmd_name);
        if (it != commands.end()) {
            return it->second(dweller, tokens);
        }

        return "Comando desconocido: '" + cmd_name + "'. Escribe 'help' para ver opciones.";
    }

    std::string CommandProcessor::runHolotape(VaultDweller&, std::vector<std::string> args) const {
        std::cout << "\n─── [CARGANDO HOLOCINTA: " << args[0] << "] ────────────────────────────────────\n"
                  << std::flush;

        pid_t pid = fork();

        if (pid < 0) {
            return "Error critico del kernel: fallo en crear un subproceso.";
        }

        if (pid == 0) {
            // Restaurar Ctrl+C para poder detener holocinta
            std::signal(SIGINT, SIG_DFL);

            // Convertir argumentos en arreglo bidimencional de caracters de C
            std::vector<char*> argv;
            argv.reserve(args.size() + 1);
            for (std::string& arg : args) {
                argv.push_back(arg.data());
            }
            argv.push_back(nullptr);

            execvp(argv[0], argv.data());

            std::cerr << "[ROBCO OS ERROR]: No se pudo ejecutar '" << args[0] << "' (" << std::strerror(errno) << ")\n";
            _exit(127);
        }

        int status = 0;
        waitpid(pid, &status, 0);

        std::cout << "────────────────────────────────────────────────────────────────────────────\n"
              << "[Presiona ENTER para volver a la interfaz del Pip-Boy...]" << std::flush;

        std::string dummy;
        std::getline(std::cin, dummy);

        if (WIFEXITED(status)) {
            int exit_code = WEXITSTATUS(status);
            return "Holocinta '" + args[0] + "' finalizada (Exit Code: " + std::to_string(exit_code) + ").";
        } else if (WIFSIGNALED(status)) {
            int sig = WTERMSIG(status);
            return "Holocinta '" + args[0] + "' interrumpida por señal (SIG: " + std::to_string(sig) + ")";
        }

        return "Holocinta finalizada";
    }
}
