import type { HTMLAttributes } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CompleteProfilePage from '@/app/auth/complete-profile/page'
import { completeProfile } from '@/lib/services/auth'

const { push, replace, setUser, toast } = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  setUser: vi.fn(),
  toast: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace }),
}))

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ setUser }),
}))

vi.mock('@/hooks/use-toast', () => ({
  toast,
}))

vi.mock('@/lib/services/auth', async () => {
  const actual = await vi.importActual<typeof import('@/lib/services/auth')>('@/lib/services/auth')
  return {
    ...actual,
    completeProfile: vi.fn(),
  }
})

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}))

describe('CompleteProfilePage', () => {
  beforeEach(() => {
    push.mockReset()
    replace.mockReset()
    setUser.mockReset()
    toast.mockReset()
    vi.mocked(completeProfile).mockReset()
    sessionStorage.clear()
    sessionStorage.setItem('phone', '9876543210')
    window.history.replaceState({}, '', '/auth/complete-profile?next=/')
  })

  it('submits the profile and redirects home', async () => {
    vi.mocked(completeProfile).mockResolvedValue({
      success: true,
      user: {
        id: 1,
        username: 'john',
        phone_number: '+919876543210',
        first_name: 'John',
        last_name: 'Doe',
        is_customer: true,
      },
    })
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByPlaceholderText('First name'), 'John')
    await user.type(screen.getByPlaceholderText('Last name'), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    await waitFor(() => {
      expect(completeProfile).toHaveBeenCalledWith({
        phone: '9876543210',
        first_name: 'John',
        last_name: 'Doe',
      })
      expect(setUser).toHaveBeenCalled()
      expect(push).toHaveBeenCalledWith('/')
    })
  })

  it('shows an error when names are missing', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(completeProfile).not.toHaveBeenCalled()
    expect(toast).toHaveBeenCalled()
  })
})
