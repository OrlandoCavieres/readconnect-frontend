'use client'

import Link from 'next/link'
import Logo from '%/Logo.png'
import { MdPerson } from 'react-icons/md'
import useClickOutsideComponent from '@/hooks/useClickOutsideComponent'
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import store from '@/store'
import { logoutAction } from '@/store/slices/UserInformation'
import Image from 'next/image'


function ProfileMenu({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: any }) {
  const menuRef = useRef<HTMLDivElement>(null)
  const clickOusideMenu = useClickOutsideComponent(menuRef)
  const router = useRouter()

  useEffect(() => {
    if (clickOusideMenu) {
      setIsVisible(false)
    }
  }, [isVisible, clickOusideMenu, setIsVisible])

  const logout = () => {
    store.dispatch(logoutAction({ exit: true }))
    router.push('/')
  }

  return (
    <div ref={menuRef} className='appHeader_profileDropdownContainer'>
      <Link href={'/app/profile'} onClick={() => setIsVisible(false)}>
        Mi perfil
      </Link>

      <div className='separator' />

      <div style={{ cursor: 'pointer' }} onClick={() => logout()}>
        Salir
      </div>
    </div>
  )
}


export default function AppHeader() {
  const [profileDropdownVisible, setProfileDropdownVisible] = useState(false);
  const location = usePathname()

  return (
    <div className='appHeader_container'>
      <div className='appHeader_leftSide_container'>
        <Link href={'/app'} className='linkLogoContainer'>
          <div style={{ width: 60, height: 60, position: 'relative' }}>
            <Image src={Logo} alt={'Logo'} fill />
          </div>
          <div className={`appHeader_link${location === '/app' ? '_active' : ''}`}>
            Inicio
          </div>
        </Link>

        <Link href={'/app/books'} className={`appHeader_link${location === '/app/books' ? '_active' : ''}`}>
          Buscar Libro
        </Link>

        <Link href={'/app/books/lists'} className={`appHeader_link${location === '/app/books/lists' ? '_active' : ''}`}>
          Mis Listas
        </Link>
      </div>

      <div className='appHeader_rightSide_container'>
        <div style={{ position: 'relative' }}>
          <div className='appHeader_iconButton' onClick={() => setProfileDropdownVisible(!profileDropdownVisible)}>
            <MdPerson style={{ fontSize: 32 }} />
          </div>

          {profileDropdownVisible && <ProfileMenu isVisible={profileDropdownVisible} setIsVisible={setProfileDropdownVisible} />}
        </div>
      </div>
    </div>
  )
}
