#include "../include/cmd.hpp"
#include <sstream>

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
}
