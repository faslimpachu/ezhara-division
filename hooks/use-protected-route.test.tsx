import { renderHook, waitFor } from '@testing-library/react'

import { useProtectedRoute } from '@/hooks/use-protected-route'

const { replace, useAuth } = vi.hoisted(() => ({
  replace: vi.fn(),
  useAuth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace }),
  usePathname: () => '/services/file-complaint',
}))

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => useAuth(),
}))

describe('useProtectedRoute', () => {
  beforeEach(() => {
    replace.mockReset()
  })

  it('redirects to login when no user is present', async () => {
    useAuth.mockReturnValue({ user: null, isLoading: false })

    renderHook(() => useProtectedRoute())

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/auth/login?next=%2Fservices%2Ffile-complaint')
    })
  })

  it('does not redirect while loading or when a user exists', async () => {
    useAuth.mockReturnValue({
      user: { id: 1, username: 'john' },
      isLoading: false,
    })

    renderHook(() => useProtectedRoute())

    await waitFor(() => {
      expect(replace).not.toHaveBeenCalled()
    })
  })
})
