'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import Header from '@/components/header'
import TrackComplaintForm from '@/components/track-complaint-form'
import Footer from '@/components/footer'
import {
  ArrowLeft, Search, Clock, CheckCircle2,
  AlertCircle, MapPin, ChevronRight, FileSearch,
  Zap, Shield
} from 'lucide-react'

const statusSteps = [
  { icon: AlertCircle,  label: 'Submitted',     color: '#ef4444' },
  { icon: FileSearch,   label: 'Under Review',  color: '#f97316' },
  { icon: MapPin,       label: 'In Progress',   color: '#3b82f6' },
  { icon: CheckCircle2, label: 'Resolved',      color: '#10b981' },
]

const faqs = [
  { q: 'Where do I find my tracking ID?',     a: 'It was sent to your phone/email when you submitted the complaint.' },
  { q: 'How long does resolution take?',       a: 'Most issues are resolved within 48 hours of submission.' },
  { q: 'Can I submit a new complaint?',        a: 'Yes — visit the File a Complaint page to report a new issue.' },
]

const recentStats = [
  { value: '48h',    label: 'Avg. resolution' },
  { value: '94%',    label: 'Resolved rate'   },
  { value: '1,200+', label: 'Total resolved'  },
]

export default function TrackComplaintPage() {
  return (
    <main
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}
    >
      <Header />

      {/* ── Clean white header ── */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-10">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-200 mb-7"
            >
              <span className="w-7 h-7 rounded-xl border border-slate-200 bg-slate-50 group-hover:bg-white group-hover:border-slate-300 flex items-center justify-center transition-all duration-200 group-hover:-translate-x-0.5">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-px w-5 bg-violet-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Ezhara Division 34 · Status Tracker
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
              >
                Track Your
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }}
                >
                  Complaint Status
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.45 }}
                className="text-slate-400 text-[15px] leading-relaxed max-w-md"
              >
                Enter your unique tracking ID to get real-time updates on your reported issue — from submission to resolution.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex flex-col gap-2.5 min-w-[180px]"
            >
              {recentStats.map((s, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-900 font-black text-[1.3rem] leading-none min-w-[52px]" style={{ letterSpacing: '-0.04em' }}>
                    {s.value}
                  </span>
                  <span className="text-slate-400 text-[11.5px] font-medium leading-tight">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Status step trail */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mt-8 flex items-center gap-0 overflow-x-auto scrollbar-none"
          >
            {statusSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl">
                    <div
                      className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${step.color}12`, border: `1px solid ${step.color}25` }}
                    >
                      <Icon className="w-3.5 h-3.5" style={{ color: step.color }} />
                    </div>
                    <p className="text-[12px] font-semibold text-slate-400">{step.label}</p>
                  </div>
                  {i < statusSteps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-200 mx-0.5 flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">

          {/* Main track form card */}
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
                <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                  <Search className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <p className="text-slate-900 font-bold text-[15px]">Enter Tracking ID</p>
                  <p className="text-slate-400 text-[12px]">Find your ID in the confirmation message</p>
                </div>
              </div>
            </div>

            <div className="px-7 py-7">
              <TrackComplaintForm />
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 sticky top-24"
          >
            {/* Status legend */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3.5">Status Types</p>
              <div className="flex flex-col gap-2.5">
                {statusSteps.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${step.color}12`, border: `1px solid ${step.color}22` }}
                      >
                        <Icon className="w-3.5 h-3.5" style={{ color: step.color }} />
                      </div>
                      <span className="text-slate-600 text-[12.5px] font-medium">{step.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3.5">Common Questions</p>
              <div className="flex flex-col gap-4">
                {faqs.map((faq, i) => (
                  <div key={i}>
                    <p className="text-slate-700 font-semibold text-[12.5px] mb-1 leading-snug">{faq.q}</p>
                    <p className="text-slate-400 text-[12px] leading-relaxed">{faq.a}</p>
                    {i < faqs.length - 1 && <div className="h-px bg-slate-100 mt-4" />}
                  </div>
                ))}
              </div>
            </div>

            {/* New complaint CTA */}
            <div className="bg-slate-900 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <p className="text-white font-bold text-[13px]">Report a new issue?</p>
              </div>
              <p className="text-white/50 text-[12px] mb-3 leading-relaxed">Submit a new civic complaint directly to the ward office.</p>
              <Link
                href="/services/file-complaint"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-slate-100 transition-colors duration-200"
              >
                File a Complaint
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile stats */}
            <div className="lg:hidden grid grid-cols-3 gap-2">
              {recentStats.map((s, i) => (
                <div key={i} className="flex flex-col gap-1 p-3.5 rounded-2xl bg-white border border-slate-100 text-center">
                  <span className="text-slate-900 font-black text-[1.2rem] leading-none" style={{ letterSpacing: '-0.04em' }}>{s.value}</span>
                  <span className="text-slate-400 text-[10px] font-medium leading-tight">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  )
}