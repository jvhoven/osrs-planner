"use client"

import Image from "next/image"
import { BOSSES, FORMATTED_BOSS_NAMES } from "@/lib/constants"
import { Character } from "../../components/character"
import { AccountName } from "@/components/account-name"
import styled from "styled-components"
import { Hoverable } from "@/styles"

const GridContainer = styled.section<{ $columns: number }>`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33.33%, 1fr));

  width: calc(100% - ${props => props.$columns} * 1fr);
  gap: 1rem 1rem;


  @media only screen and (max-width: 800px) {
    grid-template-columns: repeat(auto-fit, minmax(100%, 1fr));
  }
  
  @media only screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fit, minmax(50%, 1fr));
  }
`

const ActivityContainer = styled.div`
  ${Hoverable}

  width: 100%;
  border: 1px solid white;
  box-sizing: border-box;
  border-radius: 6px;

  .image {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem 0;
      width: 100%;
      height: 175px;
      border-bottom: 1px solid white;
    }

  img {
    width: auto;
    height: 100%;
  }

  .content {
    padding: 1rem;
  }

  &:hover {
    .image {
        border-bottom: 1px solid black;
      }

      border: 1px solid black;
  }
`

export default function Page({ params }: { params: { character: string } }) {
  return (
    <Character rsn={params.character}>
      {({ gamemode, rsn, stats: { bosses } }) =>
        <>
          <AccountName rsn={rsn} gamemode={gamemode} />
          <GridContainer $columns={3}>
            {Object.keys(bosses).map((boss) => (
              <ActivityContainer>
                <div className="image">
                  <Image src={`/activities/bosses/${boss}.svg`} alt="" height="50" width="100" />
                </div>
                <div className="content">
                  {FORMATTED_BOSS_NAMES[boss as typeof BOSSES[number]]}
                </div>
              </ActivityContainer>
            ))}
          </GridContainer>
        </>
      }
    </Character>
  )
}
