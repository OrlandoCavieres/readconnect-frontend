'use client'

import RelayEnvironment from '@/RelayEnvironment'
import { RelayEnvironmentProvider } from 'react-relay'
import { ReactNode } from 'react'

export default function RelayProvider({ children }: { children: ReactNode }) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      { children }
    </RelayEnvironmentProvider>
  )
}
