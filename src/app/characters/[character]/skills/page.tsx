"use client"

import { AccountName } from "@/components/account-name";
import { SkillsOverview } from "@/components/skills/overview";
import { Character } from "../../components/character";

export default function Page({ params }: { params: { character: number } }) {
  return (
    <Character id={params.character}>
      {({ gamemode, rsn, stats }) =>
        <>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <SkillsOverview skills={stats.skills} />
        </>
      }
    </Character>
  )
}
