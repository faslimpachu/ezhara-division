import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import SakshyapathramForm from './sakshyapathram-form'

// Mock the service
vi.mock('@/lib/services/certificates', () => ({
  createCertificateRequest: vi.fn(),
}))

describe('SakshyapathramForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the certificate type picker initially', () => {
    render(<SakshyapathramForm />)
    expect(screen.getByText(/Choose certificate type/i)).toBeDefined()
    expect(screen.getByText(/Residential Certificate/i)).toBeDefined()
    expect(screen.getByText(/Income Recommendation/i)).toBeDefined()
  })

  it('moves to the form step when a type is selected', async () => {
    render(<SakshyapathramForm />)
    
    const residentialButton = screen.getByText(/Residential Certificate/i)
    fireEvent.click(residentialButton)

    await waitFor(() => {
      expect(screen.getByText(/Applicant Details/i)).toBeDefined()
      expect(screen.getByText(/Full Name/i)).toBeDefined()
    })
  })
})
