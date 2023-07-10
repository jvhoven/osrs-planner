'use client'

import { Button } from '@/components/button'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

const MainPageContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100svh;
  padding: 1rem 0;
  
  > * {
      margin-bottom: 1rem;
    }

  .banner {
    width: 90svw;
  }
`

export default function Page() {
  return (
    <MainPageContainer>
      <Image src='/logo.svg' width='250' height='125' alt='' />
      <h4>Making the forgettable unforgettable</h4>
      <Image className="banner" src='/create-character.svg' alt='' width='500' height='500' />
      <Button>
        <Link href='/characters/'>Get started</Link>
      </Button>
    </MainPageContainer>
  )
}
