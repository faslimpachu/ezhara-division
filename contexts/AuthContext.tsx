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
  updateProfile: (data: { first_name?: string; last_name?: string }) => Promise<void>
  showLoginModal: boolean
  setShowLoginModal: (show: boolean) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showLoginModal, setShowLoginModal] = useState(false)

  // Global callback for triggering login modal from any API call
  useEffect(() => {
    // @ts-ignore - global function for apiRequest
    window.triggerLoginModal = () => setShowLoginModal(true)

    // Global fetch interceptor for all API calls
    const originalFetch = window.fetch
    window.fetch = async (...args) => {
      const response = await originalFetch(...args)

      // Check if this is an API call to our backend
      const url = typeof args[0] === 'string' ? args[0] : args[0] instanceof URL ? args[0].href : args[0]?.url
      const isApiCall = url?.includes('/api/') || url?.includes('localhost:8000') || url?.includes('127.0.0.1:8000')

      // For API calls that return 401, trigger the login modal
      // This will work for any service that makes API calls, not just apiRequest
      if (isApiCall && response.status === 401) {
        setShowLoginModal(true)
      }

      return response
    }

    return () => {
      // @ts-ignore
      delete window.triggerLoginModal
      // Restore original fetch
      window.fetch = originalFetch
    }
  }, [])

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

  const updateProfile = async (data: { first_name?: string; last_name?: string }) => {
    // Simple implementation - in real would call PATCH /api/auth/me or similar
    const updatedUser = { ...user, ...data } as AuthUser
    setUser(updatedUser)
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
    <AuthContext.Provider value={{ user, isLoading, refreshUser, setUser, logout, updateProfile, showLoginModal, setShowLoginModal }}>
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
