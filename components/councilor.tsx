'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MessageCircle, Mail, Phone, Facebook, Linkedin, ArrowUpRight, CheckCircle2, Star } from 'lucide-react'

const goals = [
  'Digital transformation of all ward services',
  'Sustainable environmental initiatives',
  'Economic empowerment through skill development',
  'Healthcare access for every resident',
  'Modern infrastructure & clean public spaces',
]

const achievements = [
  { value: '18+', label: 'Schemes Launched' },
  { value: '500+', label: 'Families Aided' },
  { value: '4 yrs', label: 'In Service' },
]

const socials = [
  { icon: Mail, label: 'Email', href: 'mailto:faslim@ezhara.in', color: '#3b82f6' },
  { icon: Phone, label: 'Phone', href: 'tel:+919876543210', color: '#10b981' },
  { icon: Facebook, label: 'Facebook', href: '#', color: '#1877f2' },
  { icon: Linkedin, label: 'LinkedIn', href: '#', color: '#0a66c2' },
]

export default function CouncilorSection() {
  return (
    <section
      className="relative py-24 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#0a0a0f' }}
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-80px] right-[-60px] w-[500px] h-[500px] rounded-full blur-3xl" style={{ background: 'rgba(59,130,246,0.07)' }} />
        <div className="absolute bottom-[-60px] left-[-40px] w-[400px] h-[400px] rounded-full blur-3xl" style={{ background: 'rgba(16,185,129,0.06)' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/5">
                <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50">Ward Leadership</span>
              </div>
              <h2
                className="text-white font-black leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
              >
                Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Councilor
                </span>
              </h2>
            </div>
            <p className="text-white/25 text-[14px] max-w-xs leading-relaxed sm:text-right">
              Elected to serve — committed to transform Division 34.
            </p>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-[420px_1fr] gap-8 lg:gap-12 items-start">

          {/* ── Portrait Card ── */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >
            {/* Photo */}
            <div className="relative rounded-3xl overflow-hidden border border-white/8 shadow-2xl" style={{ aspectRatio: '4/5', background: 'linear-gradient(135deg, #0f1f3d 0%, #1a3455 50%, #0d2038 100%)' }}>
              {/* Atmospheric glow */}
              <div className="absolute inset-0">
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-blue-900/60 to-transparent" />
                <div className="absolute top-[10%] left-[20%] w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
                <div className="absolute top-[20%] right-[10%] w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl" />
              </div>

              {/* Avatar placeholder */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-blue-500/20 blur-md" />
                  <div className="relative w-32 h-32 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur flex items-center justify-center">
                    <span className="text-5xl select-none">👤</span>
                  </div>
                </div>
                <p className="text-white/20 text-[11px] tracking-wider uppercase font-medium">Councilor Photo</p>
              </div>

              {/* Name overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <p className="text-white font-black text-[22px] leading-tight" style={{ letterSpacing: '-0.02em' }}>Faslim T.P.</p>
                <p className="text-blue-400 text-[13px] font-semibold mt-0.5">Councilor, Division 34</p>
              </div>

              {/* Verified badge */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-blue-600/90 backdrop-blur-sm border border-blue-400/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span className="text-[10px] font-bold text-white">Verified</span>
              </div>
            </div>

            {/* Quick contact row */}
            <div className="grid grid-cols-4 gap-2">
              {socials.map((s) => {
                const Icon = s.icon
                return (
                  <Link key={s.label} href={s.href}>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-white/8 bg-white/3 hover:bg-white/8 transition-colors cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${s.color}22`, border: `1px solid ${s.color}30` }}>
                        <Icon className="w-4 h-4" style={{ color: s.color }} />
                      </div>
                      <span className="text-[10px] text-white/30 font-medium">{s.label}</span>
                    </motion.div>
                  </Link>
                )
              })}
            </div>

            {/* WhatsApp CTA */}
            <Link href="#">
              <button className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-bold text-[14px] text-white transition-all duration-300 hover:-translate-y-px hover:shadow-xl hover:shadow-green-900/40"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 6px 24px rgba(22,163,74,0.3)' }}>
                <MessageCircle className="w-4.5 h-4.5" />
                Join WhatsApp Channel
                <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
          </motion.div>

          {/* ── Right — Info ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="flex flex-col gap-8 pt-2"
          >
            {/* Role badge */}
            <div className="inline-flex items-center gap-2 w-fit px-3.5 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-[12px] font-bold text-blue-400">Kannur Corporation · Ward 34</span>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <p className="text-white/60 leading-[1.8] text-[15.5px]">
                With a deep commitment to community development and civic welfare, <strong className="text-white font-bold">Councilor Faslim T.P.</strong> brings years of public service to Division 34. His vision is to transform Ezhara into a modern, inclusive, and sustainable ward where every resident thrives.
              </p>
              <p className="text-white/40 leading-[1.8] text-[15px]">
                Focused on education, healthcare, employment, and environmental sustainability — under his leadership, Ezhara has seen significant progress in infrastructure, digital services, and community initiatives.
              </p>
            </div>

            {/* Achievement stats */}
            <div className="grid grid-cols-3 gap-3">
              {achievements.map((a, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                  className="flex flex-col gap-1 p-4 rounded-2xl border border-white/8 bg-white/3"
                >
                  <span className="text-white font-black leading-none" style={{ fontSize: '1.6rem', letterSpacing: '-0.04em' }}>{a.value}</span>
                  <span className="text-white/35 text-[11px] font-semibold uppercase tracking-wide">{a.label}</span>
                </motion.div>
              ))}
            </div>

            {/* Vision & Goals */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6">
              <p className="text-white/70 text-[12px] font-bold uppercase tracking-[0.1em] mb-4">Vision & Goals</p>
              <ul className="space-y-3">
                {goals.map((goal, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}>
                      <CheckCircle2 className="w-3 h-3 text-blue-400" />
                    </div>
                    <span className="text-white/55 text-[14px] leading-snug">{goal}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Footer CTA */}
            <div className="flex items-center gap-3">
              <Link href="/about">
                <button className="group flex items-center gap-2 px-5 py-3 rounded-2xl text-[13px] font-bold text-white border border-white/12 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-200">
                  Full Profile
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[13px] font-semibold text-white/40 hover:text-white/70 transition-colors duration-200">
                  Get in Touch →
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </section>
  )
}