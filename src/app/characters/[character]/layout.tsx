"use client"

import Image from "next/image";

import { Button } from "@/components/button"
import { ContentStateContainer } from "@/components/content-state"
import { Wrapper } from "@/components/wrapper"
import { db } from "@/models/db"
import { useLiveQuery } from "dexie-react-hooks"
import Link from "next/link"
import { ReactNode } from "react"
import { Hoverable } from "@/styles";
import styled from "styled-components";
import { Header } from "@/components/header";
import { Character } from "@/lib/types";

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

export default function CharacterLayout({ children, params: { character } }: { children: ReactNode, params: { character: string } }) {
  return (
    <>
      <Header title='Character'>
        <Button>
          <Link href='/characters'>Back to characters</Link>
        </Button>
      </Header>
      <TwoColumn>
        <Menu>
          <ul>
            <li>Skills</li>
            <li>Items</li>
            <li>Goals</li>
            <li>
              <Button>
                <Link href={`/characters/${character}/activities`}>Activities</Link>
              </Button>
            </li>
          </ul>
        </Menu>
        <section>
          {children}
        </section>
      </TwoColumn>
    </>
  )
}
