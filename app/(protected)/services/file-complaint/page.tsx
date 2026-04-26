'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, AlertCircle, Clock, CheckCircle2, Shield, MapPin, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import ComplaintForm from '@/components/complaint-form'
import { useProtectedRoute } from '@/hooks/use-protected-route'

const steps = [
  { icon: AlertCircle,  label: 'Submit Issue',    desc: 'Fill the form below'        },
  { icon: Clock,        label: 'Under Review',    desc: 'Ward office verifies'       },
  { icon: MapPin,       label: 'Action Taken',    desc: 'Team dispatched on-site'    },
  { icon: CheckCircle2, label: 'Issue Resolved',  desc: 'Confirmation sent to you'   },
]

const stats = [
  { value: '48h',   label: 'Avg. Response Time' },
  { value: '94%',   label: 'Resolution Rate'    },
  { value: '1,200+', label: 'Issues Resolved'   },
]

export default function FileComplaintPage() {
  const router = useRouter()
  const { isLoading, user } = useProtectedRoute()

  if (isLoading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm font-medium">Checking your session...</p>
      </main>
    )
  }

  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}
    >

      {/* ── Hero header ── */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-10">

          {/* Back */}
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            onClick={() => router.back()}
            className="group flex items-center gap-2 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-200 mb-7"
          >
            <span className="w-7 h-7 rounded-xl border border-slate-200 bg-slate-50 group-hover:bg-white group-hover:border-slate-300 flex items-center justify-center transition-all duration-200 group-hover:-translate-x-0.5">
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            Back to Services
          </motion.button>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-px w-5 bg-red-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Ezhara Division 34 · Ward Services
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
              >
                Report an Issue
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #ef4444, #f97316)' }}>
                  in Ezhara
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.45 }}
                className="text-slate-400 text-[15px] leading-relaxed max-w-lg"
              >
                Help us keep our ward clean and safe. Submit infrastructure or civic issues directly to the councilor's office — we'll act fast.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-2.5 min-w-[180px]"
            >
              {stats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-900 font-black text-[1.3rem] leading-none min-w-[52px]" style={{ letterSpacing: '-0.04em' }}>{s.value}</span>
                  <span className="text-slate-400 text-[11.5px] font-medium leading-tight">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Process steps */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-8 flex items-center gap-0 overflow-x-auto scrollbar-none"
          >
            {steps.map((step, i) => {
              const Icon = step.icon
              const isFirst = i === 0
              return (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-all ${isFirst ? 'bg-red-50 border border-red-100' : 'bg-transparent'}`}>
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: isFirst ? '#ef444420' : '#f8fafc',
                        border: `1px solid ${isFirst ? '#ef444430' : '#e2e8f0'}`,
                      }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: isFirst ? '#ef4444' : '#94a3b8' }} />
                    </div>
                    <div>
                      <p className="text-[12px] font-bold leading-none" style={{ color: isFirst ? '#0f172a' : '#94a3b8' }}>
                        {step.label}
                      </p>
                      <p className="text-[10.5px] mt-0.5" style={{ color: isFirst ? '#ef4444' : '#cbd5e1' }}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                  {i < steps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-200 mx-1 flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Form + sidebar ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">

          {/* Form card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-3xl border border-slate-100 overflow-hidden"
            style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.05)' }}
          >
            {/* Card header */}
            <div className="px-7 pt-7 pb-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                  <AlertCircle className="w-4.5 h-4.5 text-red-500" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-[15px]">Complaint Details</p>
                  <p className="text-slate-400 text-[12px]">All fields marked * are required</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-7 py-7">
              <ComplaintForm />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 sticky top-24"
          >
            {/* Trust card */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-green-500" />
                <p className="text-[12px] font-bold text-slate-700 uppercase tracking-wide">Safe & Secure</p>
              </div>
              <p className="text-[12.5px] text-slate-400 leading-relaxed">
                Your complaint is handled confidentially. Personal details are only shared with the ward office.
              </p>
            </div>

            {/* What to report */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">What to report</p>
              <ul className="space-y-2.5">
                {['Broken roads or footpaths', 'Streetlight outages', 'Waste & sanitation issues', 'Waterlogging or drainage', 'Unauthorized construction', 'Other civic problems'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <span className="text-[12.5px] text-slate-500 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats mobile */}
            <div className="lg:hidden grid grid-cols-3 gap-2">
              {stats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1 p-3.5 rounded-2xl bg-white border border-slate-100 text-center">
                  <span className="text-slate-900 font-black text-[1.2rem] leading-none" style={{ letterSpacing: '-0.04em' }}>{s.value}</span>
                  <span className="text-slate-400 text-[10px] font-medium leading-tight">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Contact card */}
            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-white font-bold text-[13px] mb-1">Need urgent help?</p>
              <p className="text-white/50 text-[12px] mb-3 leading-relaxed">Call the ward office directly for emergencies.</p>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-slate-100 transition-colors duration-200"
              >
                Call Ward Office
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  )
}
