"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"
import { Item } from "@/lib/item"
import dynamic from "next/dynamic"
import React from "react"
import { InventoryPageContainer } from "./styled"
import { Inventory } from "@/components/inventory/inventory"
import { useLiveQuery } from "dexie-react-hooks"
import { db } from "@/models/db"

const ItemFinder = dynamic(() => import('@/components/item-finder'), { ssr: false });

export default function Page({ params }: { params: { character: number } }) {
  const inventory = useLiveQuery(
    () => db.inventories.get({ character_id: Number(params.character) }),
    [params.character]
  );

  const onSelect = (item: Item) => {
    if (inventory !== undefined) {
      db.inventories.update(inventory.id!, {
        items: [...inventory.items, item]
      })
    }
  }

  return (
    <Character id={params.character}>
      {({ gamemode, rsn }) =>
        <InventoryPageContainer>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <ItemFinder
            onSelect={onSelect}
            query={() => db.items
              .where('id')
              // @ts-expect-error
              .noneOf(...(inventory?.items ?? []).map(item => item.id))
              .and(item => item.equipable_by_player)
              .toArray()
            }
          />
          <div className="wrapper">
            <Inventory
              size={120}
              items={inventory?.items ?? []}
              columns={{
                count: 12,
                size: "55px 55px 55px 55px 55px 55px 55px 55px 55px 55px 55px 55px"
              }}
            />
          </div>
        </InventoryPageContainer>
      }
    </Character>
  )
}

