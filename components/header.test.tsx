import type { ReactNode } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Header from '@/components/header'

const { push, toast, logout, useAuth } = vi.hoisted(() => ({
  push: vi.fn(),
  toast: vi.fn(),
  logout: vi.fn(),
  useAuth: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href, onClick }: { children: ReactNode; href: string; onClick?: () => void }) => (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  ),
}))

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => useAuth(),
}))

vi.mock('@/hooks/use-toast', () => ({
  toast,
}))

describe('Header', () => {
  beforeEach(() => {
    push.mockReset()
    toast.mockReset()
    logout.mockReset()
  })

  it('shows login when no user is authenticated', () => {
    useAuth.mockReturnValue({ user: null, logout })

    render(<Header />)

    expect(screen.getAllByText('Login')[0]).toBeInTheDocument()
  })

  it('shows the user name and logs out', async () => {
    useAuth.mockReturnValue({
      user: {
        id: 1,
        username: 'john',
        phone_number: '+919876543210',
        first_name: 'John',
        last_name: 'Doe',
        is_customer: true,
      },
      logout: logout.mockResolvedValue(undefined),
    })

    const user = userEvent.setup()
    render(<Header />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    await user.click(screen.getAllByText('Logout')[0])

    await waitFor(() => {
      expect(logout).toHaveBeenCalled()
      expect(push).toHaveBeenCalledWith('/auth/login')
    })
  })
})
