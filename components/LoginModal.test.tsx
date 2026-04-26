import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LoginModal } from '@/components/LoginModal'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock next/navigation
const mockPush = vi.fn()
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

// Mock useAuth to control the modal state
const mockUseAuth = vi.fn()
vi.mock('@/contexts/AuthContext', async () => {
  const actual = await vi.importActual('@/contexts/AuthContext')
  return {
    ...actual,
    useAuth: () => mockUseAuth(),
  }
})

describe('LoginModal', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })

  it('renders modal when showLoginModal is true', () => {
    mockUseAuth.mockReturnValue({
      showLoginModal: true,
      setShowLoginModal: vi.fn(),
    })

    render(<LoginModal />)

    expect(screen.getByText('Authentication Required')).toBeInTheDocument()
    expect(screen.getByText('You need to be logged in to access this feature. Please sign in to continue.')).toBeInTheDocument()
  })

  it('does not render modal content when showLoginModal is false', () => {
    mockUseAuth.mockReturnValue({
      showLoginModal: false,
      setShowLoginModal: vi.fn(),
    })

    render(<LoginModal />)

    expect(screen.queryByText('Authentication Required')).not.toBeInTheDocument()
  })

  it('displays correct content when modal is open', () => {
    mockUseAuth.mockReturnValue({
      showLoginModal: true,
      setShowLoginModal: vi.fn(),
    })

    render(<LoginModal />)

    expect(screen.getByText('Authentication Required')).toBeInTheDocument()
    expect(screen.getByText('You need to be logged in to access this feature. Please sign in to continue.')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
  })

  it('navigates to login page and closes modal when Login button is clicked', async () => {
    const mockSetShowLoginModal = vi.fn()
    mockUseAuth.mockReturnValue({
      showLoginModal: true,
      setShowLoginModal: mockSetShowLoginModal,
    })

    const user = userEvent.setup()
    render(<LoginModal />)

    const loginButton = screen.getByText('Login')
    await user.click(loginButton)

    expect(mockSetShowLoginModal).toHaveBeenCalledWith(false)
    expect(mockPush).toHaveBeenCalledWith('/auth/login')
  })

  it('closes modal when Cancel button is clicked', async () => {
    const mockSetShowLoginModal = vi.fn()
    mockUseAuth.mockReturnValue({
      showLoginModal: true,
      setShowLoginModal: mockSetShowLoginModal,
    })

    const user = userEvent.setup()
    render(<LoginModal />)

    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)

    expect(mockSetShowLoginModal).toHaveBeenCalledWith(false)
  })
})