"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"
import { styled } from "styled-components"
import { ITEM_SLOT } from "@/lib/constants"
import { Hoverable } from "@/styles"

import { Item } from "@/lib/types"
import React, { FC, useState } from "react"
import { Autocomplete } from "@/components/forms"
import Image from "next/image"
import allItems from "@/lib/items";
import { Grid } from "@/components/grid"

const InventoryPageContainer = styled.div`
  .wrapper {
    display: flex; 
    flex-direction: row;
    justify-content: space-between;
  }
`

const InventoryContainer = styled.div`
  flex: 0.5;

  ${Grid} {
     div {
      display: flex;
      justify-content: center;
      align-items: center;

        ${Hoverable}
        width: 100%;
        height: 75px;
        border: 1px solid white;
        border-radius: 6px;

        img {
          width: auto;
            height: 50px;
          }
      }
  }
`

const ArmourSetupContainer = styled.div`
  width: 250px;
  display: grid;
  grid-template-areas:
    'head head head'
    'cape neck ammunition'
    'weapon body shield'
    'legs legs legs'
    'gloves feet ring';

  gap: 1rem;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
      ${Hoverable}
      width: 75px;
      height: 75px;
      border: 1px solid white;
      border-radius: 6px;

      img {
          object-fit: contain;
          width: auto;
          height: 50px;;
        }
    }

  .head, .legs {
    align-self: center;
    justify-self: center;
  }
`

type EquippableSlots = Exclude<typeof ITEM_SLOT[number], "two-handed">;
type ArmourSetupProps = {
  equipped?: Partial<Record<EquippableSlots, Item>>;
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
          {items[i] !== undefined && <Image src={items[i].image} width="50" height="50" alt={items[i].name} />}
        </div>)}
      </Grid>
    </InventoryContainer>
  )
}

const ArmourSetup: FC<ArmourSetupProps> = ({ equipped = {} }) => {
  return (
    <ArmourSetupContainer>
      {(ITEM_SLOT.filter(slot => slot !== "two-handed") as Exclude<typeof ITEM_SLOT[number], "two-handed">[]).map(slot =>
        <>
          <div
            key={slot}
            className={slot}
            style={{ gridArea: slot }}
          >
            {equipped[slot] !== undefined && <Image src={equipped[slot]?.image ?? ""} width="50" height="50" alt={equipped[slot]?.name ?? ""} />}
          </div>
        </>
      )}
    </ArmourSetupContainer>
  );
}


export default function Page({ params }: { params: { character: string } }) {
  const [loadout, setLoadout] = useState<{
    equipped: ArmourSetupProps["equipped"]
    inventory: InventoryProps["items"]
  }>({
    equipped: {},
    inventory: []
  });

  return (
    <Character rsn={params.character}>
      {({ gamemode, rsn }) =>
        <InventoryPageContainer>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <Autocomplete<Item>
            suggestions={allItems}
            searchOn="name"
            onSelect={(item: Item) => {
              if (Object.keys(loadout?.equipped ?? {}).includes(item.slot)) {
                console.log("Already got item in that slot, send to inventory!")
                setLoadout({ ...loadout, inventory: [...loadout.inventory, item] })
              } else {
                console.log("Do not have slot equipped, equip it!")
                setLoadout({ ...loadout, equipped: { ...loadout.equipped, [`${item.slot}`]: item } })
              }
            }}
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
