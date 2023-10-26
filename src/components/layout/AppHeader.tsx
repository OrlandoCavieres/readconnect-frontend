'use client'

import Link from 'next/link'
import { MdPerson } from 'react-icons/md'
import useClickOutsideComponent from '@/hooks/useClickOutsideComponent'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import store from '@/store'
import { logoutAction } from '@/store/slices/UserInformation'


function ProfileMenu({ isVisible, setIsVisible }: { isVisible: boolean, setIsVisible: any }) {
  const menuRef = useRef<HTMLDivElement>(null)
  const clickOusideMenu = useClickOutsideComponent(menuRef)
  const router = useRouter()

  useEffect(() => {
    if (clickOusideMenu) {
      setIsVisible(false)
    }
  }, [isVisible, clickOusideMenu])

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

  return (
    <div className='appHeader_container'>
      <div className='appHeader_leftSide_container'>
        <Link href={'/app'}>
          Inicio
        </Link>

        <Link href={'/app/books'}>
          Buscar Libro
        </Link>

        <Link href={'/app/books/lists'}>
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
