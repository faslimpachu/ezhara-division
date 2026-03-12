'use client'

import { useState } from 'react'
import Header from '@/components/header'
import BloodBankHero from '@/components/blood-bank-hero'
import BloodBankStats from '@/components/blood-bank-stats'
import BloodBankEmergencyBar from '@/components/blood-bank-emergency-bar'
import DonorDatabase from '@/components/donor-database'
import DonorRegistration from '@/components/donor-registration'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplet, X, Heart, Users, Shield, Clock, Phone, ArrowRight } from 'lucide-react'

/* ── Data ──────────────────────────────────────────── */
const bloodGroups = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']

const pillars = [
  { icon: Heart,  num: '3×',   title: 'Lives Saved',     desc: 'One donation saves up to three patients in need.' },
  { icon: Users,  num: '450+', title: 'Active Donors',    desc: 'Join a growing network of Ward 34 residents.' },
  { icon: Shield, num: '100%', title: 'Medically Safe',   desc: 'Supervised by certified healthcare staff.' },
  { icon: Clock,  num: '30m',  title: 'Your Time',        desc: 'Once every three months. That\'s all it takes.' },
]

const groupGlow: Record<string, string> = {
  'O+': '#ef4444', 'O−': '#dc2626',
  'A+': '#f97316', 'A−': '#ea580c',
  'B+': '#8b5cf6', 'B−': '#7c3aed',
  'AB+': '#0ea5e9', 'AB−': '#0284c7',
}

const sp = { type: 'spring', stiffness: 380, damping: 28 } as const

export default function BloodBankPage() {
  const [showForm, setShowForm]   = useState(false)
  const [hovered, setHovered]     = useState<string | null>(null)

  return (
    <main className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif", background: '#080810' }}>
      <Header />
      <BloodBankHero />
      <BloodBankStats />
      <BloodBankEmergencyBar />
      <DonorDatabase />

      {/* ══════════════════════════════════════════════
          BECOME A DONOR
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden" style={{ background: '#080810' }}>

        {/* Background layers */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute -top-40 -left-20 w-[900px] h-[700px] rounded-full blur-[180px]"
            style={{ background: 'radial-gradient(ellipse, rgba(185,28,28,0.13) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full blur-[140px]"
            style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.07) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.022]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '250px 250px',
          }} />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <AnimatePresence mode="wait">

            {/* ══ CTA STATE ══ */}
            {!showForm && (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="pt-24 pb-20"
              >
                {/* Section label */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#ef4444,transparent)' }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: 'rgba(239,68,68,0.7)' }}>
                    Blood Donation Program
                  </span>
                </motion.div>

                {/* Headline row */}
                <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-16">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white font-black leading-[0.95]"
                    style={{ fontSize: 'clamp(2.6rem,6vw,5rem)', letterSpacing: '-0.055em' }}
                  >
                    Become a Hero.
                    <br />
                    <span className="text-transparent bg-clip-text"
                      style={{ backgroundImage: 'linear-gradient(100deg,#fca5a5 0%,#ef4444 45%,#f97316 100%)' }}>
                      Register as a Donor.
                    </span>
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.18 }}
                    className="text-[14.5px] leading-relaxed lg:max-w-[240px] lg:text-right"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                  >
                    Your blood can save three lives. Join Ezhara's growing community of life-savers.
                  </motion.p>
                </div>

                {/* Pillar cards — borderless segmented strip */}
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-4 mb-10"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', borderRadius: '1.5rem', overflow: 'hidden' }}
                >
                  {pillars.map((p, i) => {
                    const Icon = p.icon
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                        className="group relative flex flex-col gap-4 p-7"
                        style={{
                          background: 'rgba(255,255,255,0.025)',
                          borderRight: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                        }}
                      >
                        {/* Corner ambient glow */}
                        <div className="absolute top-0 left-0 w-16 h-16 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: 'radial-gradient(ellipse at 0% 0%,rgba(239,68,68,0.2),transparent 55%)' }} />

                        {/* Icon */}
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                          <Icon className="w-5 h-5 text-red-400" />
                        </div>

                        {/* Large stat number */}
                        <div className="font-black leading-none"
                          style={{
                            fontSize: '2rem', letterSpacing: '-0.04em',
                            background: 'linear-gradient(120deg,#fca5a5,#ef4444)',
                            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                          }}>
                          {p.num}
                        </div>

                        <div>
                          <p className="text-white font-bold text-[14px] mb-1.5">{p.title}</p>
                          <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.32)' }}>{p.desc}</p>
                        </div>

                        {/* Bottom shimmer line */}
                        <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                          style={{ background: 'linear-gradient(90deg,transparent,rgba(239,68,68,0.5),transparent)' }} />
                      </motion.div>
                    )
                  })}
                </motion.div>

                {/* Blood groups + CTA row */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="flex flex-col lg:flex-row items-center justify-between gap-8"
                >
                  {/* Groups */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.1em] mr-1"
                      style={{ color: 'rgba(255,255,255,0.2)' }}>All groups needed:</span>
                    {bloodGroups.map(g => {
                      const isH = hovered === g
                      const gc  = groupGlow[g] ?? '#ef4444'
                      return (
                        <motion.button
                          key={g}
                          onHoverStart={() => setHovered(g)}
                          onHoverEnd={() => setHovered(null)}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          transition={sp}
                          className="relative w-11 h-11 rounded-xl flex items-center justify-center text-[12.5px] font-black overflow-hidden transition-colors duration-200"
                          style={{
                            background: isH ? `${gc}20` : 'rgba(255,255,255,0.04)',
                            border: `1.5px solid ${isH ? `${gc}50` : 'rgba(255,255,255,0.08)'}`,
                            color: isH ? gc : 'rgba(255,255,255,0.35)',
                            boxShadow: isH ? `0 4px 16px ${gc}28` : 'none',
                          }}
                        >
                          {g}
                          {isH && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                              className="absolute inset-0 pointer-events-none"
                              style={{ background: `radial-gradient(ellipse at 50% 110%,${gc}16,transparent 60%)` }} />
                          )}
                        </motion.button>
                      )
                    })}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
                    <motion.button
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      transition={sp}
                      onClick={() => setShowForm(true)}
                      className="group relative flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-[15px] text-white overflow-hidden"
                      style={{ background: 'linear-gradient(135deg,#dc2626,#b91c1c)', boxShadow: '0 8px 36px rgba(220,38,38,0.45)' }}
                    >
                      {/* Shimmer sweep */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                        style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }} />
                      <Droplet className="w-5 h-5 fill-white/20 relative z-10" />
                      <span className="relative z-10">Register as Donor</span>
                      <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.button>

                    <a
                      href="tel:+919876543210"
                      className="flex items-center gap-2.5 px-7 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200"
                      style={{ color: 'rgba(255,255,255,0.5)', border: '1.5px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = 'rgba(255,255,255,0.9)'
                        el.style.borderColor = 'rgba(255,255,255,0.2)'
                        el.style.background = 'rgba(255,255,255,0.08)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.color = 'rgba(255,255,255,0.5)'
                        el.style.borderColor = 'rgba(255,255,255,0.1)'
                        el.style.background = 'rgba(255,255,255,0.04)'
                      }}
                    >
                      <Phone className="w-4 h-4" />
                      Emergency Request
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ══ FORM STATE ══ */}
            {showForm && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="py-20"
              >
                <div className="max-w-2xl mx-auto">
                  {/* Back */}
                  <button
                    onClick={() => setShowForm(false)}
                    className="group flex items-center gap-2 mb-8 text-[13px] font-semibold transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)' }}
                  >
                    <span className="w-7 h-7 rounded-xl flex items-center justify-center border transition-all duration-200 group-hover:-translate-x-0.5"
                      style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}>
                      <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                    </span>
                    Back to Blood Bank
                  </button>

                  {/* Glassmorphism form card */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="rounded-3xl overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      backdropFilter: 'blur(28px)',
                      WebkitBackdropFilter: 'blur(28px)',
                      border: '1px solid rgba(255,255,255,0.09)',
                      boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    {/* Gradient top cap */}
                    <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg,#ef4444,#f97316 60%,transparent)' }} />

                    {/* Header */}
                    <div className="flex items-center justify-between px-8 pt-7 pb-6"
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ background: 'rgba(239,68,68,0.14)', border: '1px solid rgba(239,68,68,0.25)' }}>
                          <Droplet className="w-5 h-5 text-red-400 fill-red-400/25" />
                        </div>
                        <div>
                          <p className="text-white font-bold text-[15.5px]" style={{ letterSpacing: '-0.02em' }}>
                            Donor Registration
                          </p>
                          <p className="text-[12px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>All fields are required</p>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
                        onClick={() => setShowForm(false)}
                        className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{ color: 'rgba(255,255,255,0.35)', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.8)'; el.style.background = 'rgba(255,255,255,0.1)' }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.color = 'rgba(255,255,255,0.35)'; el.style.background = 'rgba(255,255,255,0.04)' }}
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div className="px-8 py-8">
                      <DonorRegistration />
                    </div>
                  </motion.div>

                  <p className="text-center mt-5 text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    Your information is encrypted and used solely for donor coordination.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Floating Action Button ── */}
      <AnimatePresence>
        {!showForm && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ delay: 0.6, type: 'spring', stiffness: 280, damping: 22 }}
            className="fixed bottom-7 right-7 z-50 flex flex-col items-end gap-2"
          >
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[12px] font-bold text-white"
              style={{ background: 'rgba(10,10,20,0.8)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Register as Donor
            </motion.div>

            <div className="relative">
              <motion.div className="absolute inset-0 rounded-2xl"
                animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: 'rgba(220,38,38,0.28)' }} />
              <motion.div className="absolute inset-0 rounded-2xl"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{ background: 'rgba(220,38,38,0.22)' }} />

              <motion.button
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.92 }}
                transition={sp}
                onClick={() => { setShowForm(true); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }) }}
                className="relative w-16 h-16 rounded-2xl flex items-center justify-center z-10"
                style={{ background: 'linear-gradient(135deg,#dc2626,#991b1b)', boxShadow: '0 10px 40px rgba(220,38,38,0.55), 0 2px 8px rgba(0,0,0,0.4)' }}
              >
                <Droplet className="w-7 h-7 text-white fill-white/20" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </main>
  )
}