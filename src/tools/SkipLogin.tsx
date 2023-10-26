'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'


export default function SkipLogin() {
  const token = useSelector((state: RootState) => state.user.token)
  const router = useRouter()
  const location = usePathname()
  const autoLocations = ['/', '/login', '/register']

  useEffect(() => {
    if (token && autoLocations.includes(location)) {
      router.push('/app')
    }
  }, [token]);

  return <></>
}
