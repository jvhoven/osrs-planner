'use client'

import Image from "next/image";
import { Button } from '@/components/button'
import { Header } from '@/components/header'
import Link from 'next/link'
import styled from 'styled-components'
import { CreateCharacterModal } from './create-character-modal'
import { Hoverable } from '@/styles'
import { Card, CardContainer } from '@/components/card'

const CreateCharacterPage = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-around;

  ${CardContainer} {
    flex: 0.3;
    text-align: center;
    border: 1px solid #fff;
    border-radius: 6px;
    padding: 1rem;

    ${Hoverable}

    &:hover {
      button {
        background-color: var(--primary-glow);
        border: 1px solid #000;

        > span, > a {
          color: #000;
        }
      }
    }
  }

  @media only screen and (max-width: 800px) {
    flex-direction: column;
    
    ${CardContainer} {
        margin-bottom: 1rem;
      }
  }
`

export default function Page() {
  return (
    <>
      <Header title='New character'>
        <Button>
          <Link href='/characters'>Back to characters</Link>
        </Button>
      </Header>
      <CreateCharacterPage>
        <Card
          onClick={() => {
            // @ts-expect-error React doesn't understand native modals yet
            document.getElementById('import').showModal()
          }}
          title='Import from HiScores'
          image={<Image src='/illustrations/maxed-nerd.svg' alt="lmao look at this noob" width="325" height="250" />}
          footer={
            <Button>
              <span>Import from HiScores</span>
            </Button>
          }
        >
          <p>
            Already have a RuneScape character? This will import your skills
            as well as boss statistics
          </p>
        </Card>
        <Card
          title='From scratch'
          image={<Image src='/illustrations/noob.svg' alt="lmao look at this noob" width="325" height="250" />}
          onClick={() => {
            // @ts-expect-error React doesn't understand native modals yet
            document.getElementById('create').showModal()
          }}
          footer={
            <Button>
              <span>Create from scratch</span>
            </Button>
          }
        >
          <p>
            Enables you to explore account builds, or plan out a new account
          </p>
        </Card>
      </CreateCharacterPage >
      <CreateCharacterModal
        mode='import'
        id='import'
        title='Import from HiScores'
      />
      <CreateCharacterModal
        mode='create'
        id='create'
        title='Create from scratch'
      />
    </>
  )
}
