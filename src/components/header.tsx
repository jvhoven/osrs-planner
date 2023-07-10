import Image from 'next/image'
import Link from 'next/link'
import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 80px;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;

  .title {
    height: 70px;
    display: flex;
    flex: 1;

    .container {
      display: flex;
      justify-content: space-between;
      align-items: center;

      img {
        width: 71px;
        height: auto;
        margin-right: 1rem;
      }
    }
  }

  border-bottom: 1px solid lightgray;
`

type Props = {
  title: string
  children?: ReactNode
}

export const Header: FunctionComponent<Props> = ({ title, children }) => {
  return (
    <HeaderContainer>
      <section className='title'>
        <section className='container'>
          <Link href='/'>
            <Image src='/osrs-planner/logo.svg' alt='' width='120' height='100' />
          </Link>
          <h2>{title}</h2>
        </section>
      </section>
      {children}
    </HeaderContainer>
  )
}
