'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useRouter } from 'next/navigation'

interface AdminItem {
  id: number | string
  title: string
  status: string
  type: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [pendingDonors, setPendingDonors] = useState<AdminItem[]>([])
  const [pendingComplaints, setPendingComplaints] = useState<AdminItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user && !user.is_staff) {
      router.push('/dashboard')
      return
    }

    const fetchData = async () => {
      try {
        setPendingDonors([
          { id: 1, title: 'Blood Donor #EZH-B-XYZ1', status: 'pending', type: 'blood-donor' },
        ])
        setPendingComplaints([
          { id: 1, title: 'Complaint #CMP-001', status: 'pending', type: 'complaint' },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user, router])

  if (!user?.is_staff) {
    return <div className="p-8 text-center">Access denied. Superuser only.</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage and approve requests across the platform</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Blood Donors */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Pending Blood Donors</h2>
            <Badge variant="secondary">{pendingDonors.length}</Badge>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : pendingDonors.length === 0 ? (
            <p className="text-muted-foreground">No pending donors</p>
          ) : (
            <div className="space-y-4">
              {pendingDonors.map((item) => (
                <div key={item.id} className="flex items-center justify-between border rounded-xl p-4">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Status: {item.status}</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Complaints */}
        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Pending Complaints</h2>
            <Badge variant="secondary">{pendingComplaints.length}</Badge>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : pendingComplaints.length === 0 ? (
            <p className="text-muted-foreground">No pending complaints</p>
          ) : (
            <div className="space-y-4">
              {pendingComplaints.map((item) => (
                <div key={item.id} className="flex items-center justify-between border rounded-xl p-4">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Status: {item.status}</p>
                  </div>
                  <Button size="sm" variant="outline">Review</Button>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        Admin access restricted to superusers created via <code>python manage.py createsuperuser</code>
      </div>
    </div>
  )
}
