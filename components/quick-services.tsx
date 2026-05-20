'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FileText,
  CheckCircle,
  Droplet,
  Heart,
  Stethoscope,
  Users,
  Award,
  BookOpen,
  Bell,
  Download,
  HeartHandshake,
  PlusSquare,
  ArrowUpRight,
} from 'lucide-react'

const services = [
  {
    icon: FileText,
    label: 'File a Complaint',
    description: 'Submit civic issues directly',
    accent: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.18)',
    href: '/services/file-complaint',
  },
  {
    icon: CheckCircle,
    label: 'Track Complaint',
    description: 'Follow your case status',
    accent: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.18)',
    href: '/services/track-complaint',
  },
  {
    icon: HeartHandshake,
    label: 'Request Blood',
    description: 'Emergency blood requests',
    accent: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.18)',
    href: '/services/request-blood',
    badge: 'Urgent',
  },
  {
    icon: Droplet,
    label: 'Donate Blood',
    description: 'Register as a donor',
    accent: '#f43f5e',
    bg: 'rgba(244,63,94,0.08)',
    border: 'rgba(244,63,94,0.18)',
    href: '/services/blood-bank',
  },
  {
    icon: Heart,
    label: 'Welfare Schemes',
    description: 'Apply for benefits',
    accent: '#ec4899',
    bg: 'rgba(236,72,153,0.08)',
    border: 'rgba(236,72,153,0.18)',
    href: '/services/welfare-schemes',
  },
  {
    icon: Stethoscope,
    label: 'Health Services',
    description: 'Public health programs',
    accent: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.18)',
    href: '/services/health',
  },
  {
    icon: Users,
    label: 'Volunteer',
    description: 'Join our network',
    accent: '#06b6d4',
    bg: 'rgba(6,182,212,0.08)',
    border: 'rgba(6,182,212,0.18)',
    href: '/services/volunteer',
  },
  {
    icon: PlusSquare,
    label: 'Emergency Contact',
    description: '24/7 response helpline',
    accent: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.18)',
    href: '/services',
    badge: '24/7',
  },
  {
    icon: BookOpen,
    label: 'Sakshyapathram',
    description: 'Request certificates',
    accent: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
    border: 'rgba(99,102,241,0.18)',
    href: '/services/sakshyapathram',
  },
  {
    icon: Droplet,
    label: 'Blood Bank',
    description: 'Browse blood inventory',
    accent: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
    border: 'rgba(220,38,38,0.18)',
    href: '/services/blood-bank',
  },
  {
    icon: Download,
    label: 'Download Certificates',
    description: 'Official documents',
    accent: '#d97706',
    bg: 'rgba(217,119,6,0.08)',
    border: 'rgba(217,119,6,0.18)',
    href: '/services/certificates',
  },
  {
    icon: Bell,
    label: 'Announcements',
    description: 'Ward news & alerts',
    accent: '#0ea5e9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.18)',
    href: '/services/announcements',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

export default function QuickServices() {
  return (
    <section
      className="relative py-20 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc' }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-60" />
        <div className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] rounded-full bg-violet-50 blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-600">Quick Access</span>
              </div>
              <h2
                className="text-gray-900 font-black leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
              >
                All Services,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">
                  One Place
                </span>
              </h2>
            </div>
            <p className="text-gray-400 text-[15px] max-w-xs leading-relaxed sm:text-right">
              Every civic service available to Ward 34 residents — accessible in one click.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {services.map((svc, index) => {
            const Icon = svc.icon
            return (
              <motion.div key={index} variants={item}>
                <Link href={svc.href} className="group block h-full">
                  <motion.div
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="relative h-full flex flex-col gap-3 p-5 rounded-2xl border bg-white transition-shadow duration-300 group-hover:shadow-xl overflow-hidden"
                    style={{
                      borderColor: svc.border,
                      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Hover background wash */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                      style={{ background: svc.bg }}
                    />

                    {/* Content */}
                    <div className="relative flex items-start justify-between">
                      {/* Icon */}
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: svc.bg, border: `1px solid ${svc.border}` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: svc.accent }} />
                      </div>

                      {/* Arrow */}
                      <ArrowUpRight
                        className="w-4 h-4 text-gray-300 group-hover:text-gray-500 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0"
                      />
                    </div>

                    <div className="relative">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="font-bold text-[13.5px] text-gray-800 leading-snug">
                          {svc.label}
                        </p>
                        {svc.badge && (
                          <span
                            className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                            style={{ background: svc.bg, color: svc.accent, border: `1px solid ${svc.border}` }}
                          >
                            {svc.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-[12px] mt-0.5 leading-snug">{svc.description}</p>
                    </div>

                    {/* Bottom accent line */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left rounded-b-2xl"
                      style={{ background: `linear-gradient(90deg, ${svc.accent}, transparent)` }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gray-200" />
          <Link href="/services">
            <button className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-md transition-all duration-200">
              View all services
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gray-200" />
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </section>
  )
}