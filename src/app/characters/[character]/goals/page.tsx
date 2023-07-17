"use client"

import { AccountName } from "@/components/account-name"
import { Character } from "../../components/character"

export default function Page({ params }: { params: { character: number } }) {
  return (
    <Character id={params.character}>
      {({ gamemode, rsn }) =>
        <>
          <AccountName rsn={rsn} gamemode={gamemode} />
        </>
      }
    </Character>
  )
}
