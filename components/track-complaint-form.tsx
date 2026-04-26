'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  MessageSquare,
  RotateCcw,
} from 'lucide-react'

interface ComplaintData {
  id: string
  category: string
  location: string
  submittedDate: string
  image: string
  status: 'submitted' | 'assigned' | 'in-progress' | 'resolved'
  officialRemark: string
  assignedTeam: string
  assignedDate: string
}

// Mock data - In production, this would come from an API
const mockComplaints: Record<string, ComplaintData> = {
  'EZH-8472': {
    id: 'EZH-8472',
    category: 'Street Light Outage',
    location: 'Beach Road, Ward 34',
    submittedDate: 'Feb 24, 2026',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23e0f2fe" width="200" height="200"/%3E%3Ctext x="50%" y="50%" font-size="48" fill="%230284c7" text-anchor="middle" dominant-baseline="middle"%3E🔆%3C/text%3E%3C/svg%3E',
    status: 'in-progress',
    officialRemark:
      'The replacement LED bulb has been ordered and will be installed by tomorrow evening. - Ward 34 Admin Team',
    assignedTeam: 'KSEB Maintenance Team',
    assignedDate: 'Feb 25, 2026',
  },
  'EZH-5621': {
    id: 'EZH-5621',
    category: 'Road Damage/Potholes',
    location: 'Market Area, Ward 34',
    submittedDate: 'Feb 23, 2026',
    image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23fef3c7" width="200" height="200"/%3E%3Ctext x="50%" y="50%" font-size="48" fill="%23d97706" text-anchor="middle" dominant-baseline="middle"%3E🛣️%3C/text%3E%3C/svg%3E',
    status: 'resolved',
    officialRemark:
      'The pothole has been successfully filled and the road surface has been smoothed. Regular maintenance will continue. - Ward 34 Admin Team',
    assignedTeam: 'PWD Roads Division',
    assignedDate: 'Feb 24, 2026',
  },
}

const timelineSteps = [
  {
    id: 'submitted',
    label: 'Complaint Submitted',
    subtext: 'Received by Ward Office',
  },
  {
    id: 'assigned',
    label: 'Assigned to Field Officer',
    subtext: 'Team assigned to handle the issue',
  },
  {
    id: 'in-progress',
    label: 'In Progress',
    subtext: 'Team is working on the site',
  },
  {
    id: 'resolved',
    label: 'Resolved',
    subtext: 'Issue has been completed',
  },
]

const getStatusIndex = (status: string) => {
  const index = timelineSteps.findIndex((step) => step.id === status)
  return index !== -1 ? index : 0
}

const getStatusBadgeColor = (
  status: 'submitted' | 'assigned' | 'in-progress' | 'resolved'
) => {
  switch (status) {
    case 'submitted':
    case 'assigned':
      return 'bg-green-100 text-green-800'
    case 'in-progress':
      return 'bg-blue-100 text-blue-800'
    case 'resolved':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-muted text-muted-foreground'
  }
}

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`

export default function TrackComplaintForm() {
  const [trackingId, setTrackingId] = useState('')
  const [complaint, setComplaint] = useState<ComplaintData | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!trackingId.trim()) return

    setIsLoading(true)
    setNotFound(false)

    try {
      const res = await fetch(`${API_BASE_URL}/complaints/${trackingId.toUpperCase()}/`)
      if (!res.ok) {
        if (res.status === 404) {
          setNotFound(true)
          setComplaint(null)
          return
        }
        throw new Error('Failed to fetch complaint')
      }

      const data = await res.json()
      
      // Map backend to frontend interface
      const mapped: ComplaintData = {
        id: data.tracking_id,
        category: data.category,
        location: data.area,
        submittedDate: new Date(data.created_at).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        }),
        image: data.photo_url || '',
        status: (data.status === 'pending' ? 'submitted' : 
                 data.status === 'under_review' ? 'assigned' : 
                 data.status === 'action_taken' ? 'in-progress' : 'resolved') as any,
        officialRemark: data.remarks || 'Your complaint is currently under review by the ward office.',
        assignedTeam: data.assigned_team || 'Ward 34 Admin Team',
        assignedDate: new Date(data.updated_at).toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        })
      }
      
      setComplaint(mapped)
    } catch (err) {
      console.error(err)
      setNotFound(true)
      setComplaint(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleReset = () => {
    setTrackingId('')
    setComplaint(null)
    setNotFound(false)
  }

  const statusIndex = complaint ? getStatusIndex(complaint.status) : -1

  return (
    <div className="space-y-8">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="p-6 sm:p-8 border border-border/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="e.g., CMP-8472"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              className="h-12 text-base font-mono"
            />
            <Button
              onClick={handleSearch}
              disabled={!trackingId.trim() || isLoading}
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 gap-2 whitespace-nowrap px-8"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Track Status</span>
              <span className="sm:hidden">Track</span>
            </Button>
          </div>
          {notFound && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm mt-3"
            >
              No complaint found with ID: {trackingId}
            </motion.p>
          )}
        </Card>
      </motion.div>

      {/* Results */}
      {complaint && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Summary Card */}
          <Card className="p-6 sm:p-8 border border-border/50 bg-gradient-to-br from-slate-50/50 to-background">
            <div className="space-y-6">
              {/* Header with Badge */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Tracking ID
                  </p>
                  <h3 className="text-3xl font-bold font-mono text-foreground">
                    {complaint.id}
                  </h3>
                </div>
                <Badge className={`${getStatusBadgeColor(complaint.status)}`}>
                  {complaint.status === 'in-progress'
                    ? 'In Progress'
                    : complaint.status === 'submitted'
                      ? 'Submitted'
                      : complaint.status === 'assigned'
                        ? 'Assigned'
                        : 'Resolved'}
                </Badge>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-border/30">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Issue Type
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {complaint.category}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Location
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {complaint.location}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Submitted On
                  </p>
                  <p className="text-lg font-semibold text-foreground">
                    {complaint.submittedDate}
                  </p>
                </div>
              </div>

              {/* Evidence Image */}
              {complaint.image && (
                <div className="pt-4 border-t border-border/30">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">
                    Evidence Photo
                  </p>
                  <img
                    src={complaint.image}
                    alt="Evidence"
                    className="w-full h-48 object-cover rounded-lg border border-border/30"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Timeline */}
          <Card className="p-6 sm:p-8 border border-border/50">
            <h4 className="text-xl font-bold text-foreground mb-8">
              Status Timeline
            </h4>

            <div className="space-y-6">
              {timelineSteps.map((step, index) => {
                const isCompleted = index <= statusIndex
                const isActive = index === statusIndex
                const isNext = index === statusIndex + 1

                return (
                  <div key={step.id} className="flex gap-4 relative">
                    {/* Connector Line */}
                    {index < timelineSteps.length - 1 && (
                      <div
                        className={`absolute left-6 top-12 w-0.5 h-12 ${
                          isCompleted && !isActive
                            ? 'bg-primary'
                            : 'bg-border/30'
                        }`}
                      />
                    )}

                    {/* Icon Circle */}
                    <div className="relative flex-shrink-0 flex items-center justify-center">
                      <motion.div
                        initial={false}
                        animate={
                          isActive
                            ? { scale: [1, 1.1, 1] }
                            : { scale: 1 }
                        }
                        transition={{
                          duration: 2,
                          repeat: isActive ? Infinity : 0,
                        }}
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm ${
                          isCompleted
                            ? 'bg-primary text-primary-foreground'
                            : isNext
                              ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : isActive ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: 'linear',
                            }}
                          >
                            <Clock className="w-6 h-6" />
                          </motion.div>
                        ) : (
                          <span>{index + 1}</span>
                        )}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-1">
                      <h5
                        className={`font-semibold ${
                          isCompleted
                            ? 'text-foreground'
                            : 'text-muted-foreground'
                        }`}
                      >
                        {step.label}
                      </h5>
                      <p className="text-sm text-muted-foreground mt-1">
                        {step.subtext}
                      </p>

                      {/* Additional info for assigned step */}
                      {step.id === 'assigned' &&
                        complaint.status !== 'submitted' && (
                          <p className="text-sm text-foreground font-medium mt-2">
                            {complaint.assignedTeam}
                            <span className="text-muted-foreground">
                              {' '}
                              • {complaint.assignedDate}
                            </span>
                          </p>
                        )}
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          {/* Official Remarks */}
          <Card className="p-6 sm:p-8 border border-border/50 bg-gradient-to-br from-blue-50/50 to-background">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h5 className="font-semibold text-foreground mb-2">
                  Official Update
                </h5>
                <p className="text-muted-foreground leading-relaxed">
                  {complaint.officialRemark}
                </p>
                <p className="text-xs text-muted-foreground mt-3">
                  Last updated: {complaint.assignedDate}
                </p>
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleReset}
              className="gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Check Another Complaint
            </Button>
            {complaint.status !== 'resolved' && (
              <Button
                variant="outline"
                className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/5 border-destructive/30"
              >
                <AlertCircle className="w-4 h-4" />
                Issue Not Resolved? Reopen
              </Button>
            )}
          </div>
        </motion.div>
      )}

      {/* Demo Info */}
      {!complaint && !notFound && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-muted/30 border border-border/50 rounded-xl p-6 text-center text-muted-foreground"
        >
          <p className="mb-3">
            Try these demo tracking IDs: <span className="font-mono font-semibold text-foreground">CMP-8472</span> or{' '}
            <span className="font-mono font-semibold text-foreground">CMP-5621</span>
          </p>
          <p className="text-sm">
            Enter your tracking ID above to view real-time status updates
          </p>
        </motion.div>
      )}
    </div>
  )
}
