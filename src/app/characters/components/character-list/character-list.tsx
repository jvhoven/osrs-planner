import { FunctionComponent } from 'react'
import Image from "next/image";
import { useLiveQuery } from 'dexie-react-hooks'
import styled from 'styled-components'

import { CharacterListItem } from './character-item'
import { db } from '@/models/db'
import { ContentStateContainer } from '@/components/content-state'
import { Wrapper } from "@/components/wrapper";
import { Button } from '@/components/button';
import Link from 'next/link';

const CharacterListContainer = styled.ul`
  width: 100%;
`

export const CharacterList: FunctionComponent = () => {
  const characters = useLiveQuery(() => db.characters.toArray(), [], [])

  return characters.length === 0 ? (
    <ContentStateContainer>
      <Wrapper>
        <Image
          src='/gnome-child.svg'
          alt=''
          width='350'
          height='350'
          style={{ opacity: '0.2', marginBottom: '1rem' }}
        />
        <h4>You have not created any characters yet</h4>
        <br />
        <Button>
          <Link href='/characters/create'>Create a character</Link>
        </Button>
      </Wrapper>
    </ContentStateContainer>
  ) : (
    <CharacterListContainer>
      {characters.map((character) => (
        <CharacterListItem key={character.rsn} {...character} />
      ))}
    </CharacterListContainer>
  )
}
