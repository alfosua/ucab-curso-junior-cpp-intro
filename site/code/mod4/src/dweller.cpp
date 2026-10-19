#include "../include/structs.hpp"
#include <algorithm>

namespace robco {
    int* VaultDweller::get_limb_ptr(Limb target) {
        switch (target) {
            case Limb::Head:     return &condition.head;
            case Limb::Torso:    return &condition.torso;
            case Limb::LeftArm:  return &condition.left_arm;
            case Limb::RightArm: return &condition.right_arm;
            case Limb::LeftLeg:  return &condition.left_leg;
            case Limb::RightLeg: return &condition.right_leg;
            default: return nullptr;
        }
    }

    void VaultDweller::damage_limb(Limb target, int damage) {
        int* limb_ptr = get_limb_ptr(target);
        if (limb_ptr == nullptr) return; // en caso de intento de caso no soportado

        *limb_ptr = std::max(0, *limb_ptr - damage);
        hp = std::max(0, hp - (damage / 2));
    }

    bool VaultDweller::use_stimpaks() {
        if (stimpaks <= 0 || hp >= max_hp) {
            return false;
        }

        stimpaks--;

        hp = std::min(max_hp, hp + 30);

        condition.head = std::min(100, condition.head + 40);
        condition.torso = std::min(100, condition.torso + 40);
        condition.left_arm = std::min(100, condition.left_arm + 40);
        condition.right_arm = std::min(100, condition.right_arm + 40);
        condition.left_leg = std::min(100, condition.left_leg + 40);
        condition.right_leg = std::min(100, condition.right_leg + 40);

        return true;
    }

    bool VaultDweller::is_injured() const {
        return condition.head <= 0
            || condition.torso <= 0
            || condition.left_arm <= 0
            || condition.right_arm <= 0
            || condition.left_leg <= 0
            || condition.right_leg <= 0;
    }
}
