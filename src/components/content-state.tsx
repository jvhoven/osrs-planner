import { Component, ReactNode } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

import { Wrapper } from './wrapper'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'

// Error boundaries currently have to be a class component.
class ErrorBoundary extends Component<{
  fallback: ReactNode
  children: ReactNode
}> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error: string) {
    return {
      hasError: true,
      error,
    }
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export const ContentStateContainer = styled.section`
  width: 100%;

  img {
    filter: grayscale(100%);
  }

  ${Wrapper} {
    justify-content: space-between;
    min-height: 50vh;
  }
`

type Props<T> = {
  query: typeof useLiveQuery;
  error: string;
  emptyContent: string;
  children: (data: T) => ReactNode
}

export function ContentState<T>(props: Props<T>) {
  return (
    <ErrorBoundary
      fallback={
        <ContentStateContainer>
          <Wrapper>
            <Image
              src='/gnome-child.svg'
              alt=''
              width='350'
              height='350'
              style={{ opacity: '0.2', marginBottom: '1rem' }}
            />
            <h4>{props.error}</h4>
          </Wrapper>
        </ContentStateContainer>
      }
    >
    </ErrorBoundary>
  )
}
