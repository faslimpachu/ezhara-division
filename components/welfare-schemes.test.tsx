import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import WelfareSchemesPage from './welfare-schemes'

// Mock the fetch API
global.fetch = vi.fn()

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

    render(<WelfareSchemesPage />)
    expect(screen.getByText(/loading schemes/i)).toBeDefined()
  })

  it('renders schemes after fetching', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockSchemes)
    })

    render(<WelfareSchemesPage />)

    await waitFor(() => {
      expect(screen.getByText('Old Age Pension')).toBeDefined()
    })
    expect(screen.getAllByText('Pensions').length).toBeGreaterThan(0)
  })

  it('renders error state if fetch fails', async () => {
    ;(global.fetch as any).mockResolvedValue({
      ok: false
    })

    render(<WelfareSchemesPage />)

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch schemes/i)).toBeDefined()
    })
  })
})
