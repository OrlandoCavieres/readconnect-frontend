'use client'

import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'


export default function CheckAuth() {
  const token = useSelector((state: RootState) => state.user.token)
  const router = useRouter()
  const location = usePathname()

  useEffect(() => {
    if (!token && location.includes('/app')) {
      router.push('/')
    }
  }, [token]);

  return <></>
}
