'use client'

import { CharacterList } from './components/character-list/character-list'
import { Header } from '@/components/header'
import { Button } from '@/components/button'
import Link from 'next/link'

export default function () {
  return (
    <>
      <Header title='Characters'>
        <Button>
          <Link href='/characters/create'>Create a character</Link>
        </Button>
      </Header>
      <CharacterList />
    </>
  )
}
