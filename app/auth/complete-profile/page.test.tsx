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

  it('renders the complete profile form with required labels', () => {
    render(<CompleteProfilePage />)

    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument()
    expect(screen.getAllByText('*')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument()
  })

  it('shows error when first name is empty on submit', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('First name is required')).toBeInTheDocument()
    expect(completeProfile).not.toHaveBeenCalled()
  })

  it('shows error when last name is empty on submit', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('Last name is required')).toBeInTheDocument()
    expect(completeProfile).not.toHaveBeenCalled()
  })

  it('shows error when both names are empty on submit', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('First name is required')).toBeInTheDocument()
    expect(screen.getByText('Last name is required')).toBeInTheDocument()
    expect(completeProfile).not.toHaveBeenCalled()
  })

  it('shows error when first name is too short', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/First Name/), 'J')
    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument()
    expect(completeProfile).not.toHaveBeenCalled()
  })

  it('shows error when last name is too short', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.type(screen.getByLabelText(/Last Name/), 'D')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByText('Last name must be at least 2 characters')).toBeInTheDocument()
    expect(completeProfile).not.toHaveBeenCalled()
  })

  it('shows error on blur when first name is empty', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    const firstNameInput = screen.getByLabelText(/First Name/)
    await user.click(firstNameInput)
    await user.tab()

    expect(screen.getByText('First name is required')).toBeInTheDocument()
  })

  it('shows error on blur when last name is empty', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    const lastNameInput = screen.getByLabelText(/Last Name/)
    await user.click(lastNameInput)
    await user.tab()

    expect(screen.getByText('Last name is required')).toBeInTheDocument()
  })

  it('validates on change after field is touched', async () => {
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    const firstNameInput = screen.getByLabelText(/First Name/)
    await user.click(firstNameInput)
    await user.tab()
    expect(screen.getByText('First name is required')).toBeInTheDocument()

    await user.type(firstNameInput, 'J')
    expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument()

    await user.clear(firstNameInput)
    await user.type(firstNameInput, 'John')
    expect(screen.queryByText('First name is required')).not.toBeInTheDocument()
    expect(screen.queryByText('First name must be at least 2 characters')).not.toBeInTheDocument()
  })

  it('submits the profile and redirects to home', async () => {
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

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    await waitFor(() => {
      expect(completeProfile).toHaveBeenCalledWith({
        phone: '9876543210',
        first_name: 'John',
        last_name: 'Doe',
      })
    })
    await waitFor(() => {
      expect(setUser).toHaveBeenCalled()
    })
    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/')
    })
  })

  it('submits the profile and redirects to next URL', async () => {
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
    window.history.replaceState({}, '', '/auth/complete-profile?next=/services/file-complaint')

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/services/file-complaint')
    })
  })

  it('shows toast error on API failure', async () => {
    vi.mocked(completeProfile).mockRejectedValue(new Error('Server error'))
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Profile update failed',
          variant: 'destructive',
        })
      )
    })
  })

  it('redirects to login when phone is not in sessionStorage', async () => {
    sessionStorage.clear()

    render(<CompleteProfilePage />)

    await waitFor(() => {
      expect(replace).toHaveBeenCalledWith('/auth/login')
    })
  })

  it('shows success toast on successful profile completion', async () => {
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

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Profile completed',
        description: 'You are now signed in.',
      })
    })
  })

  it('disables submit button while submitting', async () => {
vi.mocked(completeProfile).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({
        success: true,
        user: {
          id: 1,
          username: 'john',
          phone_number: '+919876543210',
          first_name: 'John',
          last_name: 'Doe',
          is_customer: true,
        },
      }), 100))
    )
    const user = userEvent.setup()

    render(<CompleteProfilePage />)

    await user.type(screen.getByLabelText(/First Name/), 'John')
    await user.type(screen.getByLabelText(/Last Name/), 'Doe')
    await user.click(screen.getByRole('button', { name: 'Continue' }))

    expect(screen.getByRole('button', { name: 'Completing profile...' })).toBeDisabled()
  })
})