import Image from "next/image";
import { ITEM_SLOT } from "@/lib/constants";
import { Item } from "@/lib/item";
import { FC } from "react";

import { ArmourSetupContainer } from "./styles";

type EquippableSlots = Exclude<Required<Item["equipment"]>["slot"], "2h">;
export type GearProps = {
  equipped: Record<EquippableSlots, Item | undefined>;
}

function calculateStats(equipped: GearProps["equipped"]) {
  return Object.entries(equipped).reduce((prev, [, item]) => {
    if (item === undefined || item.equipment === null) {
      return prev;
    } else {
      return {
        ...prev,
        attack: {
          stab: prev.attack.stab + item.equipment.attack_stab!,
          slash: prev.attack.slash + item.equipment.attack_slash!,
          crush: prev.attack.crush + item.equipment.attack_crush!,
          magic: prev.attack.magic + item.equipment.attack_magic!,
          range: prev.attack.range + item.equipment.attack_ranged!
        },
        defence: {
          stab: prev.defence.stab + item.equipment.defence_stab!,
          slash: prev.defence.slash + item.equipment.defence_slash!,
          crush: prev.defence.crush + item.equipment.defence_crush!,
          magic: prev.defence.magic + item.equipment.defence_magic!,
          range: prev.defence.range + item.equipment.defence_ranged!
        },
        other: {
          strength: prev.other.strength + item.equipment.melee_strength!,
          rangedStrength: prev.other.rangedStrength + item.equipment.ranged_strength!,
          prayer: prev.other.prayer + item.equipment.prayer!,
          magicDamage: prev.other.magicDamage + item.equipment.magic_damage!,
          weight: prev.other.weight + item.weight
        }
      }
    }
  }, {
    attack: {
      stab: 0,
      slash: 0,
      crush: 0,
      magic: 0,
      range: 0
    },
    defence: {
      stab: 0,
      slash: 0,
      crush: 0,
      magic: 0,
      range: 0
    },
    other: {
      strength: 0,
      rangedStrength: 0,
      prayer: 0,
      magicDamage: 0,
      weight: 0
    }
  }
  )
}

export const Gear: FC<GearProps> = ({ equipped }) => {
  const stats = calculateStats(equipped);

  return (
    <ArmourSetupContainer>
      <div className="items">
        {(ITEM_SLOT.filter(slot => slot !== "2h") as EquippableSlots[]).map(slot =>
          <div
            key={slot}
            className={slot}
            style={{ gridArea: slot }}
          >
            {equipped[slot] !== undefined && <Image src={`data:image/jpeg;base64,${equipped[slot]!.icon}`} unoptimized width="50" height="50" alt={equipped[slot]!.name} />}
          </div>
        )}
      </div>
      <div className="stats">
        {Object.entries(stats).map(([category, statsPerCategory]) => (
          <div key={category}>
            <h4>{category}</h4>
            <ul>
              {Object.entries(statsPerCategory).map(([label, bonus]) => (
                <li key={`${category}-${label}`}>{label}: {bonus}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

    </ArmourSetupContainer>

  );
}
