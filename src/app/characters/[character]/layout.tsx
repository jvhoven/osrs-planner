"use client"

import { AccountNameContainer } from "@/components/account-name";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import Link from "next/link";
import { ReactNode } from "react";
import styled from "styled-components";

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
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;

    li {
      width: 100%;
      margin-bottom: 1rem;
      display: block;
      list-style: none;
      border-radius: 8px;

      button {
        text-align: left;
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    ul {
      flex-direction: row;
    
      li {
        margin-right: 1rem;

        button {
            text-align: center;
          }

        &:last-child {
            margin-right: 0;
          }
      }
    }
  }
`

const CharacterLayoutContainer = styled.div`
  width: 100%;

  ${AccountNameContainer} {
      margin-bottom: 2rem;
    }
`

export default function CharacterLayout({ children, params: { character } }: { children: ReactNode, params: { character: string } }) {
  return (
    <CharacterLayoutContainer>
      <Header title='Character'>
        <Button>
          <Link href='/characters'>Back to characters</Link>
        </Button>
      </Header>
      <TwoColumn>
        <Menu>
          <ul>
            <li>
              <Button>
                <Link href={`/characters/${character}/skills`}>Skills</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link href={`/characters/${character}/items`}>Items</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link href={`/characters/${character}/goals`}>Goals</Link>
              </Button>
            </li>
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
    </CharacterLayoutContainer>
  )
}
