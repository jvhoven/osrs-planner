"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"
import { ITEM_SLOT } from "@/lib/constants"
import useSWR from "swr/immutable";

import React, { FC, useState } from "react"
import { AutoComplete } from "@/components/forms"
import Image from "next/image"
import { Grid } from "@/components/grid"
import { ArmourSetupContainer, InventoryContainer, InventoryPageContainer } from "./styled"
import { Item } from "@/lib/item";

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
      <Grid $columns={4} $sizes="75px 75px 75px 75px">
        {Array.from({ length: INVENTORY_SIZE }, () => undefined).map((_, i) => <div key={i}>
          {items[i] !== undefined && <Image src={`data:image/jpeg;base64,${items[i].icon}`} unoptimized width="50" height="50" alt={items[i].name} />}
        </div>)}
      </Grid>
    </InventoryContainer>
  )
}

const ArmourSetup: FC<ArmourSetupProps> = ({ equipped }) => {
  return (
    <ArmourSetupContainer>
      {(ITEM_SLOT.filter(slot => slot !== "2h") as EquippableSlots[]).map(slot =>
        <div
          key={slot}
          className={slot}
          style={{ gridArea: slot }}
        >
          {equipped[slot] !== undefined && <Image src={`data:image/jpeg;base64,${equipped[slot]!.icon}`} unoptimized width="50" height="50" alt={equipped[slot]!.name} />}
        </div>
      )}
    </ArmourSetupContainer>
  );
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data;
}

export default function Page({ params }: { params: { character: string } }) {
  const { data } = useSWR<Item[], { message: string }>("/api/items", fetcher);
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

  const onSelect = (item: Pick<Item, "name" | "id">) => {
    // TODO: fetch more data information through another endpoint 
    console.log(item);

    // const dedicatedItemSlot: EquippableSlots = item.equipment!.slot === "2h" ? "weapon" : item.equipment!.slot!;
    // shouldSendToInventory(item, dedicatedItemSlot, loadout.equipped)
    //   ? setLoadout({ ...loadout, inventory: [...loadout.inventory, item] })
    //   : setLoadout({ ...loadout, equipped: { ...loadout.equipped, [`${dedicatedItemSlot}`]: item } })
  }

  return (
    <Character rsn={params.character}>
      {({ gamemode, rsn }) =>
        <InventoryPageContainer>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <AutoComplete<Pick<Item, "name" | "id">>
            suggestions={data ?? []}
            keyFor={(item) => `${item.id}`}
            indexFor={(item) => item.name}
            onSelect={onSelect}
          />
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

