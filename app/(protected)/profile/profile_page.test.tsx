import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProfilePage from '@/app/(protected)/profile/page'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'

vi.mock('@/contexts/AuthContext')
vi.mock('@/hooks/use-toast')

const mockUpdateProfile = vi.fn()
const mockUser = {
  first_name: 'John',
  last_name: 'Doe',
  phone_number: '+91 98765 43210',
}

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useAuth as any).mockReturnValue({
      user: mockUser,
      updateProfile: mockUpdateProfile,
    })
  })

  it('renders profile form with read-only phone and editable names', () => {
    render(<ProfilePage />)

    expect(screen.getByText('Your Profile')).toBeInTheDocument()
    expect(screen.getByLabelText('First Name')).toHaveValue('John')
    expect(screen.getByLabelText('Last Name')).toHaveValue('Doe')
    expect(screen.getByLabelText('Phone Number')).toBeDisabled()
    expect(screen.getByLabelText('Phone Number')).toHaveValue('+91 98765 43210')
  })

  it('calls updateProfile on save', async () => {
    render(<ProfilePage />)

    fireEvent.change(screen.getByLabelText('First Name'), { target: { value: 'Jane' } })
    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }))

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        first_name: 'Jane',
        last_name: 'Doe',
      })
    })
  })

  it('shows success toast after update', async () => {
    mockUpdateProfile.mockResolvedValueOnce({})
    render(<ProfilePage />)

    fireEvent.click(screen.getByRole('button', { name: 'Save Changes' }))

    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith({
        title: 'Profile updated',
        description: 'Your name has been saved successfully.',
      })
    })
  })
})
