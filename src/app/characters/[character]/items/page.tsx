"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"
import { styled } from "styled-components"
import { ITEM_SLOT } from "@/lib/constants"
import { Hoverable } from "@/styles"

import head from "@/lib/items/head"
import { Item } from "@/lib/types"
import React, { FC, useState } from "react"
import { Modal } from "@/components/modal"
import { useForm, SubmitHandler } from "react-hook-form"
import { Button } from "@/components/button"
import { FormBlock } from "@/components/forms/form-block"
import { Form } from "@/components/forms/form"
import Image from "next/image"
import body from "@/lib/items/body"
import weapon from "@/lib/items/weapon"
import twoHanded from "@/lib/items/two-handed"
import cape from "@/lib/items/cape"
import neck from "@/lib/items/neck"
import ring from "@/lib/items/ring"
import gloves from "@/lib/items/gloves"
import legs from "@/lib/items/legs"
import feet from "@/lib/items/feet"
import shield from "@/lib/items/shield"
import ammunition from "@/lib/items/ammunition"

const InventoryContainer = styled.div`
width: 100px;
  display: grid;
  grid-template-areas:
    'head head head'
    'cape neck ammunition'
    'weapon body shield'
    'legs legs legs'
    'gloves feet ring';

  gap: 10px;

  > div {
    display: flex;
    justify-content: center;
    align-items: center;
      ${Hoverable}
      width: 50px;
      height: 50px;
      border: 1px solid white;
      border-radius: 6px;

      img {
          width: 25px;
          height: auto;
        }
    }

  .head, .legs {
      align-self: center;
      justify-self: center;
    }
`

type InventoryProps = {
  equipped?: Partial<Record<typeof ITEM_SLOT[number], Item>>;
}

const ItemSetForSlot: Record<Exclude<typeof ITEM_SLOT[number], "two-handed">, Item[]> = {
  "head": head,
  "body": body,
  "weapon": [...weapon, ...twoHanded],
  "cape": cape,
  "feet": feet,
  "legs": legs,
  "neck": neck,
  "ring": ring,
  "gloves": gloves,
  "ammunition": ammunition,
  "shield": shield,
}

const Inventory: FC<InventoryProps> = ({ equipped = {} }) => {
  const [items, setItems] = React.useState<Partial<Record<Exclude<typeof ITEM_SLOT[number], "two-handed">, Item>>>(
    equipped
  );

  return (
    <>
      <InventoryContainer>
        {(ITEM_SLOT.filter(slot => slot !== "two-handed") as Exclude<typeof ITEM_SLOT[number], "two-handed">[]).map(slot =>
          <>
            <div
              key={slot}
              className={slot}
              style={{ gridArea: slot }}
              onClick={() => {
                // @ts-expect-error React doesn't understand native modals yet
                document.getElementById(`search-${slot}`)?.showModal()
              }}
            >
              {items[slot] !== undefined && <Image src={items[slot]?.image ?? ""} width="50" height="50" alt={items[slot]?.name ?? ""} />}
            </div>
            <ItemSearchModal
              slot={slot}
              onSelect={(item: Item) => {
                setItems({
                  ...items,
                  [`${slot}`]: item
                })
              }}
              itemList={ItemSetForSlot[slot]}
            />
          </>
        )}
      </InventoryContainer>
    </>
  );
}

const ItemSearchModal: FC<{ slot: typeof ITEM_SLOT[number], onSelect: (item: Item) => void, itemList: Item[] }> = ({ slot, onSelect, itemList }) => {
  const [searchResults, setSearchResults] = useState<Item[] | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ item: string }>()

  const onSubmit: SubmitHandler<{ item: string }> = (data) => {
    setSearchResults(itemList.filter(item => item.name.match(data.item) !== null))
  }

  return (
    <Modal id={`search-${slot}`} title={`Search for ${slot}`}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormBlock>
          <label htmlFor='item'>
            Item name
          </label>
          <input type='text' {...register('item', { required: true })} />
          {errors.item && <span>This field is required</span>}
        </FormBlock>
        <Button type='submit'>
          <span>
            Search
          </span>
        </Button>
        {searchResults?.length === 0 && (<span>Couldn&apos;t find any head item with your criteria</span>)}
        {searchResults !== undefined && searchResults.length > 0 && (
          <ul>
            {searchResults.map(item => <li onClick={() => {
              onSelect(item);
              setSearchResults(undefined);

              // @ts-expect-error niet zo zeiken
              document.getElementById(`search-${slot}`)?.close()
            }} key={item.name}>{item.name}</li>)}
          </ul>
        )}
      </Form>
    </Modal>
  )
}

export default function Page({ params }: { params: { character: string } }) {
  return (
    <Character rsn={params.character}>
      {({ gamemode, rsn }) =>
        <>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <Inventory />
        </>
      }
    </Character>
  )
}
