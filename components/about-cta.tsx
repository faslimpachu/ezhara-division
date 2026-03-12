'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Users, Phone, ArrowRight, ArrowUpRight, Sparkles, ChevronRight } from 'lucide-react'

const sp = { type: 'spring', stiffness: 340, damping: 26 } as const

const CYAN  = '#06b6d4'
const TEAL  = '#0891b2'
const INK   = '#080810'

const cards = [
  {
    tag:     'Volunteer Program',
    title:   'Register as\na Volunteer',
    desc:    'Contribute your time and skills to active ward programs — community drives, events, and local initiatives.',
    icon:    Users,
    href:    '/services/volunteer',
    cta:     'Register Now',
    accent:  CYAN,
    glow:    'rgba(6,182,212,0.18)',
    bg:      'linear-gradient(135deg, #0e7490, #0891b2)',
    shadow:  'rgba(6,182,212,0.45)',
  },
  {
    tag:     'Ward Office',
    title:   'Contact Us\nDirectly',
    desc:    'Reach our team for complaints, queries, or general support. We respond within one working day.',
    icon:    Phone,
    href:    '/contact',
    cta:     'Get in Touch',
    accent:  '#10b981',
    glow:    'rgba(16,185,129,0.18)',
    bg:      'linear-gradient(135deg, #065f46, #059669)',
    shadow:  'rgba(16,185,129,0.45)',
  },
]

export default function AboutCTA() {
  return (
    <section
      className="relative overflow-hidden py-24 px-5 sm:px-8 lg:px-12"
      style={{ background: INK, fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      {/* ── Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.09) 0%, transparent 65%)' }} />
        <div className="absolute -top-20 -right-20 w-[500px] h-[400px] rounded-full blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, rgba(16,185,129,0.07) 0%, transparent 65%)' }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }} />
        <div className="absolute inset-0 opacity-[0.038]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }} />
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2.5 mb-6 px-4 py-2 rounded-full"
            style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}>
            <Sparkles className="w-3.5 h-3.5" style={{ color: CYAN }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: `${CYAN}cc` }}>
              Get Involved · Ward 34
            </span>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-4">
            <motion.h2
              initial={{ y: '100%' }}
              whileInView={{ y: '0%' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95]"
              style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)', letterSpacing: '-0.055em' }}
            >
              Ready to Make{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(100deg, #a5f3fc, ${CYAN} 45%, #0e7490)` }}>
                a Difference?
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="text-[15px] leading-relaxed max-w-xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.35)' }}
          >
            Join volunteers, innovators, and citizens working together to build
            a better Ezhara. There's a place for everyone here.
          </motion.p>
        </motion.div>

        {/* ── Dual action cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12">
          {cards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.14 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={sp}
                    className="group relative flex flex-col gap-5 p-7 rounded-3xl overflow-hidden cursor-pointer h-full"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      backdropFilter: 'blur(24px)',
                      WebkitBackdropFilter: 'blur(24px)',
                      border: `1.5px solid rgba(255,255,255,0.09)`,
                      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.border = `1.5px solid ${card.accent}40`
                      el.style.boxShadow = `0 16px 48px ${card.glow}`
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.border = '1.5px solid rgba(255,255,255,0.09)'
                      el.style.boxShadow = '0 4px 24px rgba(0,0,0,0.3)'
                    }}
                  >
                    {/* Hover ambient glow */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `radial-gradient(ellipse at 20% 0%, ${card.glow}, transparent 60%)` }} />

                    {/* Top accent rule */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400 pointer-events-none"
                      style={{ background: `linear-gradient(90deg, ${card.accent}, ${card.accent}44)`, transitionDuration: '0.4s' }} />

                    {/* Icon tile */}
                    <div className="relative z-10 flex items-start justify-between">
                      <motion.div
                        animate={{ rotate: 0 }}
                        whileHover={{ rotate: 8, scale: 1.1 }}
                        transition={sp}
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{ background: `${card.accent}18`, border: `1.5px solid ${card.accent}30` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: card.accent }} />
                      </motion.div>

                      <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
                        style={{ color: card.accent, background: `${card.accent}14`, border: `1px solid ${card.accent}25` }}>
                        {card.tag}
                      </span>
                    </div>

                    {/* Text */}
                    <div className="relative z-10 flex-1">
                      <h3 className="text-white font-black leading-[1.04] mb-3"
                        style={{ fontSize: 'clamp(1.35rem, 2.5vw, 1.7rem)', letterSpacing: '-0.04em', whiteSpace: 'pre-line' }}>
                        {card.title}
                      </h3>
                      <p className="text-[13.5px] leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.38)' }}>
                        {card.desc}
                      </p>
                    </div>

                    {/* CTA row */}
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={sp}
                      className="relative z-10 flex items-center justify-between pt-4"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                    >
                      <span className="font-bold text-[13.5px]" style={{ color: card.accent }}>
                        {card.cta}
                      </span>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{ background: `${card.accent}18`, border: `1px solid ${card.accent}30` }}>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ color: card.accent }} />
                      </div>
                    </motion.div>
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* ── Bottom micro-link row ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.38 }}
          className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
        >
          {[
            { label: 'View All Services',     href: '/services'    },
            { label: 'Welfare Schemes',        href: '/services/welfare' },
            { label: 'File a Complaint',       href: '/services/complaints' },
            { label: 'Ward Calendar',          href: '/calendar'   },
          ].map(({ label, href }) => (
            <Link key={label} href={href}
              className="group flex items-center gap-1.5 text-[13px] font-semibold transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.25)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.25)' }}
            >
              {label}
              <ChevronRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          ))}
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}