import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AdminDashboard from '@/app/(admin)/page'
import { useAuth } from '@/contexts/AuthContext'

vi.mock('@/contexts/AuthContext')
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
}))

describe('Admin Dashboard (new (admin) route group)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('shows access denied for non-staff', () => {
    ;(useAuth as any).mockReturnValue({ user: { is_staff: false } })
    render(<AdminDashboard />)
    expect(screen.getByText(/Access denied/)).toBeInTheDocument()
  })

  it('renders well organized admin dashboard for superusers', () => {
    ;(useAuth as any).mockReturnValue({ user: { is_staff: true } })
    render(<AdminDashboard />)
    expect(screen.getByText('Admin Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Pending Blood Donors')).toBeInTheDocument()
    expect(screen.getByText('Pending Complaints')).toBeInTheDocument()
  })
})
