"use client"

import Image from "next/image"
import { BOSSES, FORMATTED_BOSS_NAMES } from "@/lib/constants"
import { Character } from "../../components/character"
import { AccountName } from "@/components/account-name"
import { Grid } from "@/components/grid"
import { Card } from "@/components/card"

export default function Page({ params }: { params: { character: string } }) {
  return (
    <Character rsn={params.character}>
      {({ gamemode, rsn, stats: { bosses } }) =>
        <>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <Grid $columns={3}>
            {Object.keys(bosses).map((boss) => (
              <Card
                key={boss}
                image={
                  <Image src={`/activities/bosses/${boss}.svg`} alt="" height="50" width="100" />
                }
                title={FORMATTED_BOSS_NAMES[boss as typeof BOSSES[number]]}
              />
            ))}
          </Grid>
        </>
      }
    </Character>
  )
}
