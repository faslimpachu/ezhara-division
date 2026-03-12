'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight, ArrowUpRight, Droplet, Users, Sparkles, Heart } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const highlights = [
  {
    id: 1,
    tag: 'Health Initiative',
    title: 'Blood Donation Drive',
    subtitle: 'Over 200 donors contributed this month alone — making Ward 34 one of the most active blood donation communities in Kannur.',
    stat: { value: '200+', label: 'Donors This Month' },
    icon: Droplet,
    from: '#1a0505',
    to: '#3b0a0a',
    accent: '#ef4444',
    orb1: '#7f1d1d',
    orb2: '#f87171',
    href: '/services/blood-bank',
    cta: 'Register as Donor',
  },
  {
    id: 2,
    tag: 'Community Event',
    title: 'Ezhara Celebrates Together',
    subtitle: 'Ward residents came together for our annual community day — hundreds joined the festivities, strengthening bonds across all neighborhoods.',
    stat: { value: '850+', label: 'Attendees' },
    icon: Users,
    from: '#040d1f',
    to: '#0c1f4a',
    accent: '#3b82f6',
    orb1: '#1e3a8a',
    orb2: '#60a5fa',
    href: '/about',
    cta: 'Learn More',
  },
  {
    id: 3,
    tag: 'Impact Report',
    title: '500+ Lives Impacted',
    subtitle: 'From emergency blood supply to welfare distributions, our community programs have touched over 500 families across Division 34 this year.',
    stat: { value: '500+', label: 'Lives Impacted' },
    icon: Heart,
    from: '#021a10',
    to: '#05341e',
    accent: '#10b981',
    orb1: '#064e3b',
    orb2: '#34d399',
    href: '/initiatives',
    cta: 'See All Programs',
  },
  {
    id: 4,
    tag: 'Welfare',
    title: 'Supporting Families in Need',
    subtitle: 'Our welfare programs distributed aid to 180+ families this quarter — ensuring no resident of Ward 34 is left without support.',
    stat: { value: '180+', label: 'Families Aided' },
    icon: Sparkles,
    from: '#0f0520',
    to: '#1e0a3d',
    accent: '#a855f7',
    orb1: '#4c1d95',
    orb2: '#c084fc',
    href: '/services/welfare-schemes',
    cta: 'Apply Now',
  },
]

export default function CommunityHighlights() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number, dir = 1) => {
    setDirection(dir)
    setCurrent(index)
    setPaused(true)
  }, [])

  const next = useCallback(() => goTo((current + 1) % highlights.length, 1), [current, goTo])
  const prev = useCallback(() => goTo((current - 1 + highlights.length) % highlights.length, -1), [current, goTo])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5500)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = highlights[current]
  const Icon = slide.icon

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 28 : -28 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -28 : 28 }),
  }

  return (
    <section
      className="relative py-20 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#0a0a0f' }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
      >
        <div>
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50">Community Highlights</span>
          </div>
          <h2
            className="text-white font-black leading-tight"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
          >
            Stories That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 to-white/40">
              Define Us
            </span>
          </h2>
        </div>
        <p className="text-white/30 text-[14px] max-w-xs leading-relaxed">
          Real impact, real people — the heart of Division 34.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_360px] gap-4 lg:gap-6 items-stretch">

          {/* ── Main Showcase Panel ── */}
          <div className="relative rounded-3xl overflow-hidden" style={{ minHeight: 480 }}>

            {/* Animated BG */}
            <AnimatePresence initial={false}>
              <motion.div
                key={`bg-${current}`}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  background: `radial-gradient(ellipse at 15% 60%, ${slide.orb1}88 0%, transparent 55%), radial-gradient(ellipse at 80% 15%, ${slide.orb2}44 0%, transparent 50%), linear-gradient(135deg, ${slide.from} 0%, ${slide.to} 100%)`,
                }}
              />
            </AnimatePresence>

            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.04]" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
            }} />

            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }} />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-between h-full p-8 sm:p-10" style={{ minHeight: 480 }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`content-${current}`}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col gap-6 flex-1 justify-between"
                >
                  {/* Top */}
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: `${slide.accent}22`, border: `1px solid ${slide.accent}44` }}
                      >
                        <Icon className="w-4.5 h-4.5" style={{ color: slide.accent }} />
                      </div>
                      <span
                        className="text-[11px] font-bold uppercase tracking-[0.1em] px-3 py-1 rounded-full"
                        style={{ background: `${slide.accent}18`, color: slide.accent, border: `1px solid ${slide.accent}30` }}
                      >
                        {slide.tag}
                      </span>
                    </div>

                    <h3
                      className="text-white font-black leading-tight mb-4"
                      style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.03em' }}
                    >
                      {slide.title}
                    </h3>
                    <p className="text-white/50 leading-relaxed max-w-lg" style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1rem)' }}>
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* Bottom row */}
                  <div className="flex items-end justify-between gap-4">
                    {/* Stat */}
                    <div>
                      <div
                        className="text-5xl font-black leading-none mb-1"
                        style={{ color: slide.accent, letterSpacing: '-0.04em' }}
                      >
                        {slide.stat.value}
                      </div>
                      <div className="text-white/40 text-[12px] font-semibold uppercase tracking-widest">{slide.stat.label}</div>
                    </div>

                    {/* CTA */}
                    <Link href={slide.href}>
                      <button
                        className="group flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-[13px] text-white transition-all duration-300 hover:-translate-y-px hover:shadow-xl"
                        style={{
                          background: `linear-gradient(135deg, ${slide.accent}dd, ${slide.accent}99)`,
                          boxShadow: `0 6px 24px ${slide.accent}40`,
                        }}
                      >
                        {slide.cta}
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── Side Thumbnail Stack ── */}
          <div className="flex flex-row lg:flex-col gap-3">
            {highlights.map((h, i) => {
              const HIcon = h.icon
              const isActive = i === current
              return (
                <motion.button
                  key={h.id}
                  onClick={() => goTo(i, i > current ? 1 : -1)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="relative flex-1 lg:flex-none text-left rounded-2xl overflow-hidden border transition-all duration-300"
                  style={{
                    borderColor: isActive ? `${h.accent}60` : 'rgba(255,255,255,0.06)',
                    background: isActive
                      ? `linear-gradient(135deg, ${h.from}, ${h.to})`
                      : 'rgba(255,255,255,0.03)',
                    padding: '14px 16px',
                    minHeight: 90,
                  }}
                >
                  {/* Active glow */}
                  {isActive && (
                    <div
                      className="absolute inset-0 opacity-30 rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 30% 50%, ${h.orb1}, transparent)` }}
                    />
                  )}

                  <div className="relative flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: `${h.accent}22`,
                        border: `1px solid ${h.accent}${isActive ? '55' : '30'}`,
                      }}
                    >
                      <HIcon className="w-4 h-4" style={{ color: h.accent }} />
                    </div>
                    <div className="overflow-hidden">
                      <p
                        className="font-bold text-[12.5px] leading-tight truncate"
                        style={{ color: isActive ? '#fff' : 'rgba(255,255,255,0.45)' }}
                      >
                        {h.title}
                      </p>
                      <p className="text-[11px] mt-0.5 truncate" style={{ color: isActive ? `${h.accent}` : 'rgba(255,255,255,0.25)' }}>
                        {h.stat.value} {h.stat.label}
                      </p>
                    </div>
                  </div>

                  {/* Progress bar on active */}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 rounded-b-2xl overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ background: h.accent }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5.5, ease: 'linear' }}
                        key={`prog-${current}`}
                      />
                    </div>
                  )}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Controls row */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-white/20 text-[12px] font-medium">
            {current + 1} / {highlights.length} stories
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </section>
  )
}