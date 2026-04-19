import type { HTMLAttributes, ReactNode } from 'react'

import { act, fireEvent, render, screen } from '@testing-library/react'

import OTPPage from '@/app/auth/otp/page'
import { sendOTP, verifyOTP } from '@/lib/services/auth'

const { push, replace, toast, setUser } = vi.hoisted(() => ({
  push: vi.fn(),
  replace: vi.fn(),
  toast: vi.fn(),
  setUser: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push, replace }),
}))

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => <a href={href}>{children}</a>,
}))

vi.mock('@/components/ui/input-otp', () => ({
  InputOTP: ({
    value,
    onChange,
    maxLength,
  }: {
    value: string
    onChange: (value: string) => void
    maxLength: number
  }) => (
    <input
      aria-label="OTP"
      value={value}
      maxLength={maxLength}
      onChange={(event) => onChange(event.target.value)}
    />
  ),
  InputOTPGroup: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  InputOTPSlot: () => <span />,
}))

vi.mock('@/hooks/use-toast', () => ({
  toast,
}))

vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({ setUser }),
}))

vi.mock('@/lib/services/auth', async () => {
  const actual = await vi.importActual<typeof import('@/lib/services/auth')>('@/lib/services/auth')
  return {
    ...actual,
    sendOTP: vi.fn(),
    verifyOTP: vi.fn(),
  }
})

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: HTMLAttributes<HTMLDivElement>) => <div {...props}>{children}</div>,
  },
}))

describe('OTPPage', () => {
  beforeEach(() => {
    push.mockReset()
    replace.mockReset()
    toast.mockReset()
    vi.mocked(sendOTP).mockReset()
    vi.mocked(verifyOTP).mockReset()
    sessionStorage.clear()
    sessionStorage.setItem('phone', '9876543210')
    window.history.replaceState({}, '', '/auth/otp?next=/services/file-complaint')
  })

  it('verifies otp and routes to complete profile when profile is incomplete', async () => {
    vi.mocked(verifyOTP).mockResolvedValue({
      success: true,
      user: {
        id: 1,
        username: 'john',
        phone_number: '+919876543210',
        first_name: '',
        last_name: '',
        is_customer: true,
      },
      profile_complete: false,
    })
    render(<OTPPage />)

    fireEvent.change(screen.getByLabelText('OTP'), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }))

    await act(async () => {
      await Promise.resolve()
    })

    expect(verifyOTP).toHaveBeenCalledWith('9876543210', '123456')
    expect(push).toHaveBeenCalledWith('/auth/complete-profile?next=%2Fservices%2Ffile-complaint')
  })

  it('verifies otp and routes to dashboard when profile is complete', async () => {
    vi.mocked(verifyOTP).mockResolvedValue({
      success: true,
      user: {
        id: 1,
        username: 'john',
        phone_number: '+919876543210',
        first_name: 'John',
        last_name: 'Doe',
        is_customer: true,
      },
      profile_complete: true,
    })
    render(<OTPPage />)

    fireEvent.change(screen.getByLabelText('OTP'), { target: { value: '123456' } })
    fireEvent.click(screen.getByRole('button', { name: 'Verify' }))

    await act(async () => {
      await Promise.resolve()
    })

    expect(verifyOTP).toHaveBeenCalledWith('9876543210', '123456')
    expect(push).toHaveBeenCalledWith('/services/file-complaint')
  })

  it('allows resend after cooldown', async () => {
    vi.mocked(sendOTP).mockResolvedValue({ success: true, message: 'OTP sent' })
    render(<OTPPage />)

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1100))
    })

    fireEvent.click(screen.getByRole('button', { name: 'Resend OTP' }))

    await act(async () => {
      await Promise.resolve()
    })

    expect(sendOTP).toHaveBeenCalledWith('9876543210')
    expect(toast).toHaveBeenCalled()
  })
})
