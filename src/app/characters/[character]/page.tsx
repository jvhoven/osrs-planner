'use client'
import { useLiveQuery } from 'dexie-react-hooks'
import Image from 'next/image'

import { Header } from '@/components/header'
import { db } from '@/models/db'
import styled from 'styled-components'
import { Button } from '@/components/button'
import Link from 'next/link'
import { ContentState, ContentStateContainer } from '@/components/content-state'
import type { Character } from '@/lib/types'
import { ReactNode } from 'react'
import { AccountName, AccountNameContainer } from '@/components/account-name'
import { SkillsOverview } from '@/components/skills/overview'
import { Hoverable } from '@/styles'
import { Wrapper } from '@/components/wrapper'

const CharacterPageContainer = styled.section`
  width: 100%;
  ${AccountNameContainer} {
    margin-bottom: 1rem;
  }
`

const TwoColumn = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;

  aside {
    flex: 0.2;
  }

  section {
    flex: 0.75;
  }

  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`

const Menu = styled.aside`
  ul {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    li {
      list-style: none;
      padding: 1rem;
      border: 1px solid white;
      border-radius: 8px;
      margin-bottom: 1rem;

      ${Hoverable}
    }
  }

  @media only screen and (max-width: 600px) {
    ul {
      flex-direction: row;

      li {
        margin-right: 1rem;
      }
    }
  }
`

export default function Page({ params }: { params: { character: string } }) {
  const character = useLiveQuery(
    () => db.characters.get({ rsn: params.character }),
    [params.character],
  )

  return (
    <CharacterPageContainer>
      <Header title='Character'>
        <Button>
          <Link href='/characters'>Back to characters</Link>
        </Button>
      </Header>
      {character === undefined ? (
        <ContentStateContainer>
          <Wrapper>
            <Image
              src='/gnome-child.svg'
              alt=''
              width='350'
              height='350'
              style={{ opacity: '0.2', marginBottom: '1rem' }}
            />
            <h4>This character does not exist</h4>
            <Button>
              <Link href='/characters'>Back to characters</Link>
            </Button>
          </Wrapper>
        </ContentStateContainer>
      ) : (
        <TwoColumn>
          <Menu>
            <ul>
              <li>Skills</li>
              <li>Items</li>
              <li>Goals</li>
              <li>Bosses</li>
            </ul>
          </Menu>
          <section>
            <AccountName
              rsn={character.rsn}
              gamemode={character.gamemode}
              tag='h4'
            />
            <SkillsOverview skills={character.stats.skills} />
          </section>
        </TwoColumn>
      )}
    </CharacterPageContainer>
  )
}
