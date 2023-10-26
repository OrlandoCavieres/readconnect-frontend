import Link from 'next/link'
import { ReactNode } from 'react'
import Image from 'next/image'
import Logo from '%/Logo.png'


export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className='mainContainer'>
      <div className='appHeader_container'>
        <div className='appHeader_leftSide_container'>
          <Link href={'/'} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 60, height: 60, position: 'relative' }}>
              <Image src={Logo} alt={'Logo'} fill />
            </div>
            Read Connect
          </Link>
        </div>

        <div className='appHeader_rightSide_container'>
          <Link href={'/login'} className='linkMenuLand'>
            Ingresar
          </Link>

          <Link href={'/register'} className='linkMenuLand'>
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
