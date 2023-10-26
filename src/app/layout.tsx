import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Providers from '@/store/Providers'
import RelayProvider from '@/RelayProvider'
import SkipLogin from '@/tools/SkipLogin'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Read Connect',
  description: 'Una biblioteca de libros',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`theme-light`} lang="en">
      <body className={inter.className}>
        <Providers>
          <RelayProvider>
            <SkipLogin />
            {children}
          </RelayProvider>
        </Providers>
      </body>
    </html>
  )
}
