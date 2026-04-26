import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import ComplaintForm from './complaint-form'
import * as complaintsService from '@/lib/services/complaints'

// Mock the service
vi.mock('@/lib/services/complaints', () => ({
  createComplaint: vi.fn(),
}))

describe('ComplaintForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the complaint form correctly', () => {
    render(<ComplaintForm />)
    expect(screen.getByText("Issue Type")).toBeDefined()
    expect(screen.getByText("Location / Area")).toBeDefined()
    expect(screen.getByText("Describe the Issue")).toBeDefined()
  })

  it('shows validation errors when submitting empty form', async () => {
    render(<ComplaintForm />)
    
    const submitButton = screen.getByText(/Submit Complaint/i)
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(screen.getByText(/Please select a category/i)).toBeDefined()
      expect(screen.getByText(/Please select an area/i)).toBeDefined()
      expect(screen.getByText(/Description must be at least 10 characters/i)).toBeDefined()
    })
  })
})
