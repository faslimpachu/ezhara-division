'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Heart, 
  UserCheck,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  Filter,
  ExternalLink,
  Loader2,
  ArrowLeft
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useProtectedRoute } from '@/hooks/use-protected-route'
import { fetchDashboardData } from '@/lib/services/dashboard'
import { format } from 'date-fns'

type Application = {
  id: number
  reference_id?: string
  tracking_id?: string
  volunteer_id?: string
  status: string
  created_at: string
  [key: string]: any
}

export default function DashboardPage() {
  const { isLoading: isAuthLoading, user } = useProtectedRoute()
  const [data, setData] = useState<{
    welfare: any[]
    certificates: any[]
    complaints: any[]
    volunteer: any[]
  } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'welfare' | 'certificates' | 'complaints' | 'volunteer'>('all')
  const [selectedItem, setSelectedItem] = useState<Application | null>(null)

  useEffect(() => {
    if (user) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      setIsLoading(true)
      const res = await fetchDashboardData()
      setData(res)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isAuthLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    )
  }

  const allApplications = data ? [
    ...data.welfare.map(i => ({ ...i, type: 'Welfare' })),
    ...data.certificates.map(i => ({ ...i, type: 'Certificate' })),
    ...data.complaints.map(i => ({ ...i, type: 'Complaint' })),
    ...data.volunteer.map(i => ({ ...i, type: 'Volunteer' })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) : []

  const filteredApps = activeTab === 'all' 
    ? allApplications 
    : allApplications.filter(app => {
        const type = app.type.toLowerCase()
        const tabToType: Record<string, string> = {
          'welfare': 'welfare',
          'certificates': 'certificate',
          'complaints': 'complaint',
          'volunteer': 'volunteer'
        }
        return type === tabToType[activeTab]
      })

  const stats = {
    total: allApplications.length,
    pending: allApplications.filter(a => a.status.toLowerCase() === 'pending').length,
    resolved: allApplications.filter(a => ['approved', 'resolved', 'completed'].includes(a.status.toLowerCase())).length,
  }

  return (
    <main className="min-h-screen bg-slate-50/50 pb-20" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200/60 pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <a 
                  href="/" 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all border border-slate-100"
                  title="Back to Home"
                >
                  <ArrowLeft className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2">
                  <div className="h-px w-5 bg-primary/40" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Personal Command Center</span>
                </div>
              </div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                Welcome back, <span className="text-primary">{user.first_name}</span>
              </h1>
              <p className="text-slate-500 text-sm">Track your interactions with Ezhara Ward Office.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center gap-4">
                <div className="text-center px-4 border-r border-slate-200">
                  <p className="text-xl font-black text-slate-900">{stats.total}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Applied</p>
                </div>
                <div className="text-center px-4 border-r border-slate-200">
                  <p className="text-xl font-black text-amber-500">{stats.pending}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Pending</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-xl font-black text-emerald-500">{stats.resolved}</p>
                  <p className="text-[10px] font-bold uppercase text-slate-400">Resolved</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-6">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-2xl mb-8 shadow-sm overflow-x-auto no-scrollbar">
          {(['all', 'welfare', 'certificates', 'complaints', 'volunteer'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                px-5 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200 capitalize whitespace-nowrap
                ${activeTab === tab 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              {tab}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-24 bg-white rounded-2xl animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : filteredApps.length > 0 ? (
          <div className="grid gap-4">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app, idx) => (
                <motion.div
                  key={`${app.type}-${app.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card 
                    className="group p-5 border border-slate-200/60 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer bg-white"
                    onClick={() => setSelectedItem(app)}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Icon */}
                      <div className={`
                        w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                        ${app.type === 'Welfare' ? 'bg-rose-50 text-rose-500' : ''}
                        ${app.type === 'Certificate' ? 'bg-indigo-50 text-indigo-500' : ''}
                        ${app.type === 'Complaint' ? 'bg-amber-50 text-amber-500' : ''}
                        ${app.type === 'Volunteer' ? 'bg-emerald-50 text-emerald-500' : ''}
                      `}>
                        {app.type === 'Welfare' && <Heart className="w-5 h-5" />}
                        {app.type === 'Certificate' && <FileText className="w-5 h-5" />}
                        {app.type === 'Complaint' && <MessageSquare className="w-5 h-5" />}
                        {app.type === 'Volunteer' && <UserCheck className="w-5 h-5" />}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{app.type}</span>
                          <div className="w-1 h-1 rounded-full bg-slate-200" />
                          <span className="text-[11px] font-bold text-slate-400">{format(new Date(app.created_at), 'MMM dd, yyyy')}</span>
                        </div>
                        <h4 className="text-slate-900 font-bold text-[15px] group-hover:text-primary transition-colors">
                          {app.scheme_name || app.certificate_type || app.category || 'Volunteer Registration'}
                        </h4>
                        <p className="text-slate-400 text-xs font-mono mt-1">
                          ID: {app.reference_id || app.tracking_id || app.volunteer_id}
                        </p>
                      </div>

                      {/* Status */}
                      <div className="flex items-center justify-between sm:justify-end gap-6">
                        <div className={`
                          px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider
                          ${['pending', 'review'].includes(app.status.toLowerCase()) ? 'bg-amber-50 text-amber-600 border border-amber-100' : ''}
                          ${['approved', 'resolved', 'completed'].includes(app.status.toLowerCase()) ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : ''}
                          ${['rejected', 'closed'].includes(app.status.toLowerCase()) ? 'bg-rose-50 text-rose-600 border border-rose-100' : ''}
                        `}>
                          {app.status}
                        </div>
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-3xl p-20 text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <LayoutDashboard className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No applications yet</h3>
            <p className="text-slate-400 text-sm max-w-xs mx-auto mb-8">You haven't submitted any forms yet. Explore our services to get started.</p>
            <Button asChild className="rounded-2xl px-8 h-12 shadow-lg shadow-primary/20">
              <a href="/services">Browse Services</a>
            </Button>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center
                      ${selectedItem.type === 'Welfare' ? 'bg-rose-50 text-rose-500' : ''}
                      ${selectedItem.type === 'Certificate' ? 'bg-indigo-50 text-indigo-500' : ''}
                      ${selectedItem.type === 'Complaint' ? 'bg-amber-50 text-amber-500' : ''}
                      ${selectedItem.type === 'Volunteer' ? 'bg-emerald-50 text-emerald-500' : ''}
                    `}>
                      {selectedItem.type === 'Welfare' && <Heart className="w-6 h-6" />}
                      {selectedItem.type === 'Certificate' && <FileText className="w-6 h-6" />}
                      {selectedItem.type === 'Complaint' && <MessageSquare className="w-6 h-6" />}
                      {selectedItem.type === 'Volunteer' && <UserCheck className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight">Application Details</h3>
                      <p className="text-slate-400 text-sm">Ref: {selectedItem.reference_id || selectedItem.tracking_id || selectedItem.volunteer_id}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(null)}
                    className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Status Card */}
                  <div className="p-6 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Current Status</span>
                      <div className={`
                        px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider
                        ${['pending', 'review'].includes(selectedItem.status.toLowerCase()) ? 'bg-amber-100 text-amber-700' : ''}
                        ${['approved', 'resolved', 'completed'].includes(selectedItem.status.toLowerCase()) ? 'bg-emerald-100 text-emerald-700' : ''}
                        ${['rejected', 'closed'].includes(selectedItem.status.toLowerCase()) ? 'bg-rose-100 text-rose-700' : ''}
                      `}>
                        {selectedItem.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-slate-300" />
                      <p className="text-sm text-slate-600 font-medium">Applied on {format(new Date(selectedItem.created_at), 'MMMM dd, yyyy')}</p>
                    </div>
                  </div>

                  {/* Submitted Data Grid */}
                  <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                    {Object.entries(selectedItem).map(([key, value]) => {
                      if (['id', 'user', 'status', 'created_at', 'updated_at', 'reference_id', 'tracking_id', 'volunteer_id', 'type', 'photo', 'photo_url'].includes(key)) return null
                      if (value === null || value === undefined || value === '') return null
                      
                      return (
                        <div key={key}>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{key.replace(/_/g, ' ')}</p>
                          <p className="text-slate-800 font-semibold text-[14px]">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </p>
                        </div>
                      )
                    })}
                  </div>

                  {/* Photo Evidence if any */}
                  {selectedItem.photo_url && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Evidence Photo</p>
                      <img src={selectedItem.photo_url} alt="Evidence" className="w-full h-48 object-cover rounded-2xl border border-slate-100" />
                    </div>
                  )}

                  {/* Remarks */}
                  {selectedItem.remarks && (
                    <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-blue-500" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">Ward Office Remarks</span>
                      </div>
                      <p className="text-blue-800 text-[13px] leading-relaxed italic">"{selectedItem.remarks}"</p>
                    </div>
                  )}
                </div>

                <div className="mt-10 flex gap-3">
                  <Button className="flex-1 h-12 rounded-2xl font-bold tracking-tight shadow-lg shadow-primary/20">
                    Track Progress
                  </Button>
                  <Button variant="outline" className="flex-1 h-12 rounded-2xl font-bold text-slate-600 tracking-tight" onClick={() => setSelectedItem(null)}>
                    Close Details
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  )
}
