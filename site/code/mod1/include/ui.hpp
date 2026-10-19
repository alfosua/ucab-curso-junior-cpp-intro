#pragma once
#include <string>

namespace robco {
    void clear_screen();
    void render_header(int level, int hp, int maxHp, int ap, int maxAp, int xp, int maxXp);
    void render_vault_dweller(const std::string& name, int level, int stimpaks);
    void render_footer();
}
