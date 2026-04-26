import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DashboardPage from './page'
import * as dashboardService from '@/lib/services/dashboard'
import * as protectedRouteHook from '@/hooks/use-protected-route'

// Mock the hooks and services
vi.mock('@/hooks/use-protected-route', () => ({
  useProtectedRoute: vi.fn()
}))

vi.mock('@/lib/services/dashboard', () => ({
  fetchDashboardData: vi.fn()
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}))

const mockUser = {
  id: 1,
  first_name: 'Test',
  last_name: 'User',
  phone_number: '+919876543210'
}

const mockData = {
  welfare: [{ id: 1, scheme_name: 'Welfare 1', status: 'pending', created_at: '2026-04-26T10:00:00Z' }],
  certificates: [{ id: 2, certificate_type: 'Certificate 1', status: 'approved', created_at: '2026-04-26T11:00:00Z' }],
  complaints: [{ id: 3, category: 'Complaint 1', status: 'pending', created_at: '2026-04-26T12:00:00Z' }],
  volunteer: [{ id: 4, volunteer_id: 'V1', status: 'approved', created_at: '2026-04-26T13:00:00Z' }]
}

describe('DashboardPage', () => {
  it('renders all applications by default and filters correctly', async () => {
    vi.mocked(protectedRouteHook.useProtectedRoute).mockReturnValue({
      isLoading: false,
      user: mockUser,
      isAuthenticated: true
    } as any)

    vi.mocked(dashboardService.fetchDashboardData).mockResolvedValue(mockData)

    render(<DashboardPage />)

    // Wait for data to load
    expect(await screen.findByText('Welfare 1')).toBeDefined()
    expect(screen.getByText('Certificate 1')).toBeDefined()
    expect(screen.getByText('Complaint 1')).toBeDefined()
    expect(screen.getByText('Volunteer Registration')).toBeDefined()

    // Filter by Complaints
    const complaintsTab = screen.getByRole('button', { name: /complaints/i })
    fireEvent.click(complaintsTab)

    // Should only show complaints
    expect(screen.getByText('Complaint 1')).toBeDefined()
    expect(screen.queryByText('Welfare 1')).toBeNull()
    expect(screen.queryByText('Certificate 1')).toBeNull()
    
    // Filter by Certificates
    const certificatesTab = screen.getByRole('button', { name: /certificates/i })
    fireEvent.click(certificatesTab)
    
    expect(screen.getByText('Certificate 1')).toBeDefined()
    expect(screen.queryByText('Complaint 1')).toBeNull()
  })
})
