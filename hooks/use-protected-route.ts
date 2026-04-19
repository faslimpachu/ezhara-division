'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAuth } from '@/contexts/AuthContext'

export function useProtectedRoute() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user) {
      const next = pathname || '/'
      router.replace(`/auth/login?next=${encodeURIComponent(next)}`)
    }
  }, [isLoading, pathname, router, user])

  return { user, isLoading }
}
