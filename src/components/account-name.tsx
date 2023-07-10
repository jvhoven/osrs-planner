import { Gamemode } from '@/lib/types'
import React from 'react'
import { FunctionComponent } from 'react'
import styled from 'styled-components'
import { AccountTypeIcon, AccountTypeIconContainer } from './account-type-icon'

export const AccountNameContainer = styled.div`
  display: flex;
    
  ${AccountTypeIconContainer} {
      display: flex;
      width: 50px;
      justify-content: center;
      align-items: center;
    }
  }
`

type Props = {
  rsn: string
  gamemode: Gamemode
  tag?: keyof JSX.IntrinsicElements
}

export const AccountName: FunctionComponent<Props> = ({
  tag = 'span',
  rsn,
  gamemode,
}) => {
  return (
    <AccountNameContainer>
      <AccountTypeIcon gamemode={gamemode} />
      {React.createElement(tag, { children: rsn, className: 'rsn' })}
    </AccountNameContainer>
  )
}
