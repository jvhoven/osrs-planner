"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"
import { ITEM_SLOT } from "@/lib/constants"

import React, { FC, useState } from "react"
import Image from "next/image"
import { Grid } from "@/components/grid"
import { ArmourSetupContainer, InventoryContainer, InventoryPageContainer } from "./styled"
import { Item } from "@/lib/item";
import dynamic from "next/dynamic"

const ItemFinder = dynamic(() => import('@/components/item-finder'), { ssr: false });

type EquippableSlots = Exclude<Required<Item["equipment"]>["slot"], "2h">;
type ArmourSetupProps = {
  equipped: Record<EquippableSlots, Item | undefined>;
}

type InventoryProps = {
  items: Item[]
}

const INVENTORY_SIZE = 28;
const Inventory: FC<InventoryProps> = ({ items }) => {
  return (
    <InventoryContainer>
      <Grid $columns={4} $sizes="55px 55px 55px 55px">
        {Array.from({ length: INVENTORY_SIZE }, () => undefined).map((_, i) => <div key={i}>
          {items[i] !== undefined && <Image src={`data:image/jpeg;base64,${items[i].icon}`} unoptimized width="50" height="50" alt={items[i].name} />}
        </div>)}
      </Grid>
    </InventoryContainer>
  )
}

function calculateStats(equipped: ArmourSetupProps["equipped"]) {
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

const ArmourSetup: FC<ArmourSetupProps> = ({ equipped }) => {
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

export default function Page({ params }: { params: { character: string } }) {
  const [loadout, setLoadout] = useState<{
    equipped: ArmourSetupProps["equipped"]
    inventory: InventoryProps["items"]
  }>({
    equipped: {
      ammo: undefined,
      body: undefined,
      cape: undefined,
      feet: undefined,
      hands: undefined,
      head: undefined,
      legs: undefined,
      neck: undefined,
      ring: undefined,
      shield: undefined,
      weapon: undefined
    },
    inventory: []
  });

  const onSelect = async (item: Item) => {
    if (item.equipment === null) {
      setLoadout({ ...loadout, inventory: [...loadout.inventory, item] })
    } else {
      const dedicatedItemSlot: EquippableSlots = item.equipment!.slot === "2h" ? "weapon" : item.equipment!.slot!;
      shouldSendToInventory(item, dedicatedItemSlot, loadout.equipped)
        ? setLoadout({ ...loadout, inventory: [...loadout.inventory, item] })
        : setLoadout({ ...loadout, equipped: { ...loadout.equipped, [`${dedicatedItemSlot}`]: item } })
    }
  }

  return (
    <Character rsn={params.character}>
      {({ gamemode, rsn }) =>
        <InventoryPageContainer>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <ItemFinder onSelect={onSelect} />
          <div className="wrapper">
            <ArmourSetup equipped={loadout.equipped} />
            <Inventory items={loadout.inventory} />
          </div>
        </InventoryPageContainer>
      }
    </Character>
  )
}

function shouldSendToInventory(item: Item, slot: EquippableSlots, equippedItems: ArmourSetupProps["equipped"]) {
  if (item.equipment.slot === "shield" && hasTwoHandedWeaponEquipped(equippedItems.weapon)) {
    return true;
  }

  return alreadyHasItemInSlot(slot, equippedItems);
}

function hasTwoHandedWeaponEquipped(item: Item | undefined) {
  return item !== undefined && item.equipment.slot === "2h";
}

function alreadyHasItemInSlot(slot: EquippableSlots, equippedItems: ArmourSetupProps["equipped"]) {
  return equippedItems[slot] !== undefined
}

