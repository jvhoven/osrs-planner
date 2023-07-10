'use client'

import { Button } from '@/components/button'
import { Header } from '@/components/header'
import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { CreateCharacterModal } from './create-character-modal'
import { Hoverable } from '@/styles'

const CardContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  > * {
    margin-bottom: 1.5rem;
  }
`
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

type CardProps = {
  title: string
  illustration?: string
  body?: ReactNode
  footer?: ReactNode
  onClick: () => void
}

const Card: FunctionComponent<CardProps> = ({
  title,
  illustration,
  body,
  footer,
  onClick,
}) => {
  return (
    <CardContainer onClick={onClick}>
      <h3>{title}</h3>
      {illustration && (
        <Image src={illustration} width='300' height='250' alt='' />
      )}
      {body}
      {footer && <>{footer}</>}
    </CardContainer>
  )
}

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
          illustration='/osrs-planner/illustrations/maxed-nerd.svg'
          body={
            <p>
              Already have a RuneScape character? This will import your skills
              as well as boss statistics
            </p>
          }
          footer={
            <Button>
              <span>Import from HiScores</span>
            </Button>
          }
        />
        <Card
          title='From scratch'
          illustration='/osrs-planner/illustrations/noob.svg'
          onClick={() => {
            // @ts-expect-error React doesn't understand native modals yet
            document.getElementById('create').showModal()
          }}
          body={
            <p>
              Enables you to explore account builds, or plan out a new account
            </p>
          }
          footer={
            <Button>
              <span>Create from scratch</span>
            </Button>
          }
        />
      </CreateCharacterPage>
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
