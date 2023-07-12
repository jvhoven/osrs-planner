"use client"

import { BOSSES, FORMATTED_BOSS_NAMES } from "@/lib/constants"
import { Character } from "../../components/character"
import { AccountName } from "@/components/account-name"

export default function Page({ params }: { params: { character: string } }) {
  return (
    <>
      <Character rsn={params.character}>
        {({ gamemode, rsn, stats: {bosses} }) =>
          <>
            <AccountName rsn={rsn} gamemode={gamemode} />
            {Object.keys(bosses).map((boss)=> (
              <div>{FORMATTED_BOSS_NAMES[boss as typeof BOSSES[number]]}</div>
            ))}
          </>
        }
      </Character>
    </>
  )
}
