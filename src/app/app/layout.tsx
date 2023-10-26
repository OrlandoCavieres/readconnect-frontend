import { ReactNode } from "react"
import AppHeader from '@/components/layout/AppHeader'
import CheckAuth from '@/tools/CheckAuth'


export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <main className='mainContainer'>
      <AppHeader />
      <CheckAuth />
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        { children }
      </div>
    </main>
  )
}
