"use client"

import { AccountName } from '@/components/account-name'
import { Character } from '../components/character'
import { useEffect } from 'react';

export default function Page({ params }: { params: { character: string } }) {
  return (
    <>
    <Character rsn={params.character}>
      {({ gamemode, rsn }) => 
        <>
          <AccountName rsn={rsn} gamemode={gamemode} />
        </>
      }
    </Character>
    </>
  )
}
