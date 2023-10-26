import Link from 'next/link'
import { ReactNode } from 'react'


export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className='mainContainer'>
      <div className='appHeader_container'>
        <div className='appHeader_leftSide_container'>
          Read Connect
        </div>

        <div className='appHeader_rightSide_container'>
          <Link href={'/login'}>
            Ingresar
          </Link>

          <Link href={'/register'}>
            Registro
          </Link>
        </div>
      </div>

      <div className='authLayoutContainer'>
        { children }
      </div>
    </main>
  )
}
