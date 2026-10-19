#pragma once
#include "structs.hpp"

namespace robco {
    class TerminalSession {
    private:
        VaultDweller dweller;
        std::string status_msg = "ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM";
    public:
        TerminalSession();
        ~TerminalSession();

        VaultDweller& get_dweller_mut() {
            return dweller;
        }

        const std::string& get_status_msg() const {
            return status_msg;
        }
        void set_status_msg(const std::string& new_status_msg) {
            status_msg = new_status_msg;
        }
    };

    void clear_screen();
    void render_screen(TerminalSession& session);
}
