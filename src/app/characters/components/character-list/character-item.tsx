import styled from 'styled-components'
import { FunctionComponent } from 'react'
import { Character } from '@/lib/types'
import Link from 'next/link'
import { AccountName, AccountNameContainer } from '@/components/account-name'

const ProfileListItemContainer = styled.li`
  display: flex;
  list-style: none;
  padding: 1.5rem;
  border-radius: 5px;
  border: 1px solid lightgray;
  font-weight: 700;
  width: 100%;
  margin-bottom: 1rem;
  transition-duration: 0.15s;
  transition-property: border-color, background, color, transform, box-shadow;
  transition-timing-function: ease

  align-items: center;
  
  color: rgb(255, 255, 255);
  letter-spacing: -1px;
  border-radius: 6px;
  border: 1px solid white;

  &:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    border: 1px solid rgb(0, 0, 0);
    cursor: pointer;
  }

  ${AccountNameContainer} {
    flex: 100;
  }
`

export const CharacterListItem: FunctionComponent<Character> = ({
  rsn,
  gamemode,
  stats,
}) => {
  return (
    <Link href={`/characters/${rsn}`}>
      <ProfileListItemContainer>
        <AccountName rsn={rsn} gamemode={gamemode} />
        xp {new Intl.NumberFormat('en-GB').format(stats.skills.overall.xp)}
      </ProfileListItemContainer>
    </Link>
  )
}
