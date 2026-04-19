'use client'

import { createContext, startTransition, useContext, useEffect, useState } from 'react'

import {
  AuthUser,
  fetchCSRFToken,
  getCurrentUser,
  logout as logoutRequest,
} from '@/lib/services/auth'

type AuthContextValue = {
  user: AuthUser | null
  isLoading: boolean
  refreshUser: () => Promise<AuthUser | null>
  setUser: (user: AuthUser | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const setUser = (nextUser: AuthUser | null) => {
    startTransition(() => {
      setUserState(nextUser)
    })
  }

  const refreshUser = async () => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
      return currentUser
    } catch {
      setUser(null)
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    await logoutRequest()
    setUser(null)
  }

  useEffect(() => {
    let isMounted = true

    const bootstrapAuth = async () => {
      try {
        await fetchCSRFToken()
        const currentUser = await getCurrentUser()
        if (isMounted) {
          setUser(currentUser)
        }
      } catch {
        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    bootstrapAuth()

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, refreshUser, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
