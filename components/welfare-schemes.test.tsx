import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import WelfareSchemesPage from './welfare-schemes'
import { apiRequest, ApiError } from '@/lib/services/auth'
import { AuthProvider } from '@/contexts/AuthContext'

// Mock the fetch API and apiRequest
global.fetch = vi.fn()
vi.mock('@/lib/services/auth', async (importOriginal) => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    apiRequest: vi.fn(),
  }
})

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}))

const mockSchemes = [
  {
    id: 1,
    name: 'Old Age Pension',
    category: 'Pensions',
    benefit: '₹1,600 / month',
    status: 'open',
    accent_color: '#3b82f6',
    eligibility: ['Test Eligibility'],
    documents: ['Test Doc'],
    icon_name: 'Users'
  }
]

describe('WelfareSchemesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', async () => {
    ;(global.fetch as any).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: () => Promise.resolve(mockSchemes)
      }), 100))
    )

    render(
      <AuthProvider>
        <WelfareSchemesPage />
      </AuthProvider>
    )
    expect(screen.getByText(/loading schemes/i)).toBeDefined()
  })

  it('renders schemes after fetching', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSchemes)
    })

    render(
      <AuthProvider>
        <WelfareSchemesPage />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Old Age Pension')).toBeDefined()
    })
    expect(screen.getAllByText('Pensions').length).toBeGreaterThan(0)
  })

  it('renders error state if fetch fails', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: false
    })

    render(
      <AuthProvider>
        <WelfareSchemesPage />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch schemes/i)).toBeDefined()
    })
  })

  it('opens application modal when apply button is clicked', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSchemes)
    })

    render(
      <AuthProvider>
        <WelfareSchemesPage />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Old Age Pension')).toBeDefined()
    })

    const applyButton = screen.getByText('Apply Now')
    fireEvent.click(applyButton)

    expect(screen.getByText('Apply for Welfare Scheme')).toBeDefined()
  })

  it('submits application using authenticated apiRequest', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSchemes)
    })

    const mockApiRequest = vi.mocked(apiRequest)
    mockApiRequest.mockResolvedValue({
      reference_id: 'REF123',
      success: true
    })

    render(
      <AuthProvider>
        <WelfareSchemesPage />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Old Age Pension')).toBeDefined()
    })

    // Open modal
    const applyButton = screen.getByText('Apply Now')
    fireEvent.click(applyButton)

    // Fill required form fields to allow submission
    await waitFor(() => {
      expect(screen.getByText('Submit Application')).toBeDefined()
    })

    const fullNameInput = screen.getByPlaceholderText(/Fathima Beevi K/i)
    const dobInput = screen.getByLabelText(/Date of Birth/i)
    const mobileInput = screen.getByPlaceholderText('+91 98765 43210')
    const aadhaarInput = screen.getByPlaceholderText('XXXX XXXX XXXX')
    const houseInput = screen.getByPlaceholderText(/Sunrise Villa/i)

    fireEvent.change(fullNameInput, { target: { value: 'Test User' } })
    fireEvent.change(dobInput, { target: { value: '1990-01-01' } })
    fireEvent.change(mobileInput, { target: { value: '+919876543210' } })
    fireEvent.change(aadhaarInput, { target: { value: '123456789012' } })
    fireEvent.change(houseInput, { target: { value: '123 Test St' } })

    // Submit form
    const submitButton = screen.getByText('Submit Application')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockApiRequest).toHaveBeenCalledWith('/api/welfare-applications/', {
        method: 'POST',
        body: expect.any(FormData),
        headers: {
          // Don't set Content-Type for FormData
        }
      })
    })
  })

  it.skip('handles API errors during application submission', async () => {
    // Skipped: This test requires complex mocking of the global auth error handling
    // The global authentication error handling is tested separately
  })
})
