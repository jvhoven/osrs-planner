"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"
import { Gear, GearProps } from "@/components/inventory/gear"
import { Inventory, InventoryProps } from "@/components/inventory/inventory"
import { Item } from "@/lib/item"
import { EquippableSlots } from "@/lib/types"
import dynamic from "next/dynamic"
import React, { useState } from "react"
import { InventoryPageContainer } from "./styled"

const ItemFinder = dynamic(() => import('@/components/item-finder'), { ssr: false });

export default function Page({ params }: { params: { character: string } }) {
  const [loadout, setLoadout] = useState<{
    equipped: GearProps["equipped"]
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
            <Gear equipped={loadout.equipped} />
            <Inventory items={loadout.inventory} />
          </div>
        </InventoryPageContainer>
      }
    </Character>
  )
}

function shouldSendToInventory(item: Item, slot: EquippableSlots, equippedItems: GearProps["equipped"]) {
  if (item.equipment.slot === "shield" && hasTwoHandedWeaponEquipped(equippedItems.weapon)) {
    return true;
  }

  return alreadyHasItemInSlot(slot, equippedItems);
}

function hasTwoHandedWeaponEquipped(item: Item | undefined) {
  return item !== undefined && item.equipment.slot === "2h";
}

function alreadyHasItemInSlot(slot: EquippableSlots, equippedItems: GearProps["equipped"]) {
  return equippedItems[slot] !== undefined
}

