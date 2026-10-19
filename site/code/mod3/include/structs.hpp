#pragma once
#include <string>

namespace robco {
    enum class Limb {
        Head,
        Torso,
        LeftArm,
        RightArm,
        LeftLeg,
        RightLeg
    };

    struct BodyCondition {
        int head      = 100;
        int torso     = 100;
        int left_arm  = 100;
        int right_arm = 100;
        int left_leg  = 100;
        int right_leg = 100;
    };

    struct VaultDweller {
        std::string name = "John Smith";
        int level  = 2;
        int hp     = 100;
        int max_hp = 100;
        int ap     = 100;
        int max_ap = 100;
        int xp     = 100;
        int max_xp = 100;
        int stimpaks = 6;
        BodyCondition condition;

        void damage_limb(Limb target, int damage);
        bool use_stimpaks();

        bool is_injured() const; // método de solo lectura

    private:
        int* get_limb_ptr(Limb target);
    };
}
