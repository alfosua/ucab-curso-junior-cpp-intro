#pragma once
#include "structs.hpp"
#include <string>
#include <vector>
#include <unordered_map>
#include <functional>

namespace robco {
    class CommandProcessor {
    public:
        using CommandHandler = std::function<std::string(VaultDweller&, const std::vector<std::string>&)>;

        CommandProcessor();

        std::vector<std::string> tokenize(const std::string& input) const;

        std::string execute(VaultDweller& dweller, const std::string& rawInput, bool& should_exit) const;

        std::string runHolotape(VaultDweller& dweller, std::vector<std::string> args) const;

    private:
        std::unordered_map<std::string, CommandHandler> commands;
    };
}
