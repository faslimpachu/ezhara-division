import type { HTMLAttributes } from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginPage from '@/app/auth/login/page'
import { sendOTP } from '@/lib/services/auth'

const { push } = vi.hoisted(() => ({
  push: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push }),
}))

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}))

vi.mock('@/lib/services/auth', async () => {
  const actual = await vi.importActual<typeof import('@/lib/services/auth')>('@/lib/services/auth')
  return {
    ...actual,
    sendOTP: vi.fn(),
  }
})

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}))

describe('LoginPage', () => {
  beforeEach(() => {
    push.mockReset()
    vi.mocked(sendOTP).mockReset()
    sessionStorage.clear()
    window.history.replaceState({}, '', '/auth/login?next=/services/file-complaint')
  })

  it('submits a valid phone number and redirects to otp', async () => {
    vi.mocked(sendOTP).mockResolvedValue({ success: true, message: 'OTP sent' })
    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(screen.getByPlaceholderText('Enter 10-digit number'), '9876543210')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    await waitFor(() => {
      expect(sendOTP).toHaveBeenCalledWith('9876543210')
      expect(sessionStorage.getItem('phone')).toBe('9876543210')
      expect(push).toHaveBeenCalledWith('/auth/otp?next=%2Fservices%2Ffile-complaint')
    })
  })

  it('shows validation and blocks invalid phone submission', async () => {
    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(screen.getByPlaceholderText('Enter 10-digit number'), '1234')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(sendOTP).not.toHaveBeenCalled()
    expect(await screen.findByText('Enter a valid 10-digit number')).toBeInTheDocument()
  })
})
