"use client"

import { AccountNameContainer } from "@/components/account-name";
import { Button } from "@/components/button";
import { Header } from "@/components/header";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

    > li {
      width: 100%;
      margin-bottom: 1rem;
      display: block;
      list-style: none;
      border-radius: 8px;
      position: relative;

      &.active {
        button {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      }

      > button {
        text-align: left;
        width: 100%;
      }

      ul {
        position: relative;
          margin-bottom: 0;
    
        li {
          margin-bottom: 0;
          &:first-child {
              margin-top: 0px;
            button {
              border-top-left-radius: 0;
              border-top-right-radius: 0;
              border-top: 0;
            }
          }

          &:last-child {
            button {
              border-bottom-left-radius: 6px;
              border-bottom-right-radius: 6px;
            }
            }

          button {
              a {
                &:before {
                    content: '●';
                    font-size: 8px;
                    margin-right: 1rem;
                  }
                }
            }
        }
        
      }
    }
  }
`

const CharacterLayoutContainer = styled.div`
  width: 100%;

  ${AccountNameContainer} {
      margin-bottom: 1rem;
    }
`

export default function CharacterLayout({ children, params: { character } }: { children: ReactNode, params: { character: string } }) {
  const pathname = usePathname();

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
            <li className={pathname.match(/equipment/) !== null ? "active" : ""}>
              <Button>
                <Link href={`/characters/${character}/equipment`}>Equipment</Link>
              </Button>
              {pathname.match(/equipment/) !== null && (
                <ul>
                  <li>
                    <Button>
                      <Link href={`/characters/${character}/equipment/loadouts`}>Loadouts</Link>
                    </Button>
                  </li>
                </ul>
              )}
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
