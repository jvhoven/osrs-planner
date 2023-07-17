"use client"

import { Character } from '@/app/characters/components/character';
import { AccountName } from '@/components/account-name';
import { GearProps, Gear } from '@/components/inventory/gear';
import { InventoryProps, Inventory } from '@/components/inventory/inventory';
import { Item } from '@/lib/item';
import { EquippableSlots } from '@/lib/types';
import dynamic from 'next/dynamic';
import { InventoryPageContainer } from '../styled';
import { useState } from 'react';

const ItemFinder = dynamic(() => import('@/components/item-finder'), { ssr: false });

export default function Page({ params }: { params: { character: number } }) {
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
    <Character id={params.character}>
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

