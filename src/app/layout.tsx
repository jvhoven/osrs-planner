import { Main } from '@/components/main'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Wrapper } from '@/components/wrapper'
import { StyledComponentsRegistry } from './registry'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OSRS Planner',
  description: 'Make RuneScape great again',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Main>
            <Wrapper>
              {children}
            </Wrapper>
          </Main>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
