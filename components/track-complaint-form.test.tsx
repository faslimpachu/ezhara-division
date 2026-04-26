import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import TrackComplaintForm from './track-complaint-form'

// Mock the fetch API
global.fetch = vi.fn()

describe('TrackComplaintForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the search input initially', () => {
    render(<TrackComplaintForm />)
    expect(screen.getByPlaceholderText(/e.g., CMP-8472/i)).toBeDefined()
    expect(screen.getByText(/Track Status/i)).toBeDefined()
  })

  it('shows error if complaint not found', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: false,
      status: 404,
      json: () => Promise.resolve({ success: false, message: 'Not found' })
    })

    render(<TrackComplaintForm />)
    
    const input = screen.getByPlaceholderText(/e.g., CMP-8472/i)
    fireEvent.change(input, { target: { value: 'CMP-9999' } })
    
    const button = screen.getByText(/Track Status/i)
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/No complaint found with ID: CMP-9999/i)).toBeDefined()
    })
  })

  it('shows complaint details on successful fetch', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({
        tracking_id: 'CMP-00001',
        category: 'Street Light',
        area: 'Ward 34',
        status: 'pending',
        created_at: '2026-02-24T10:00:00Z',
        updated_at: '2026-02-24T10:00:00Z',
        remarks: 'In queue',
        assigned_team: 'KSEB'
      })
    })

    render(<TrackComplaintForm />)
    
    const input = screen.getByPlaceholderText(/e.g., CMP-8472/i)
    fireEvent.change(input, { target: { value: 'CMP-00001' } })
    
    const button = screen.getByText(/Track Status/i)
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('CMP-00001')).toBeDefined()
      expect(screen.getByText('Street Light')).toBeDefined()
      expect(screen.getByText('Ward 34')).toBeDefined()
    })
  })
})
