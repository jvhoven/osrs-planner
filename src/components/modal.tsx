import { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'
import { Button } from './button'

type ModalProps = {
  id: string
  title: string
  children?: ReactNode
}

const Dialog = styled.dialog`
  background-color: rgb(30, 30, 30);
  color: #fff;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 25px 50px -12px rgba(0, 0, 0, 0.25);
  margin: auto auto;
  padding: 1.6rem;
  max-width: 400px;
  min-width: 375px;
  border-radius: 8px;
  border: 1px solid #fff;

    button[type="submit"] { 
      margin-top: 1.4rem;
    }

  header {
    display: flex;
    align-items: center;

    h2 {
      flex: 1;
    }
  }
`

export const Modal: FunctionComponent<ModalProps> = ({
  title,
  id,
  children,
}) => {
  return (
    <Dialog id={id}>
      <form method='dialog'>
        <header>
          <h2>{title}</h2>
          <Button value='cancel' formMethod='dialog'>
            <span>X</span>
          </Button>
        </header>
      </form>
      {children}
    </Dialog>
  )
}
