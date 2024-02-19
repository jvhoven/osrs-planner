"use client"

import Image from "next/image"
import { BOSSES, FORMATTED_BOSS_NAMES } from "@/lib/constants"
import { Character } from "../../components/character"
import { AccountName } from "@/components/account-name"
import { Card, CardContainer } from "@/components/card"
import styled from "styled-components"

const StyledActivitiesPage = styled.div`
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(45%, 1fr));
    grid-auto-columns: minmax(45%, 1fr);
    grid-gap: 1rem;
  }

  ${CardContainer} {
    .image {
      border-bottom: 1px solid #fff;
    }

    &:hover {
      .image {
          border-bottom: 1px solid #000;
        }
    }
  }
`

export default function Page({ params }: { params: { character: number } }) {
  return (
    <Character id={params.character}>
      {({ gamemode, rsn, stats: { bosses } }) =>
        <StyledActivitiesPage>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <div className="grid">
            {Object.keys(bosses).map((boss) => (
              <Card
                key={boss}
                image={
                  <Image src={`/activities/bosses/${boss}.svg`} alt="" height="150" width="150" />
                }
              >
                <span>{FORMATTED_BOSS_NAMES[boss as typeof BOSSES[number]]}</span>
              </Card>
            ))}
          </div>
        </StyledActivitiesPage>
      }
    </Character>
  )
}
