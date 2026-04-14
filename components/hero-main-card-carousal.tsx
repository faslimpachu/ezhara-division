'use client'

import { useState, useEffect, useCallback } from 'react'
import { MessageCircle, ChevronLeft, ChevronRight, ArrowRight, Users, Heart, Zap } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    badge: 'Ward 34 · Kannur Corporation',
    title: 'Welcome to\nDigital Ezhara',
    subtitle: 'Your ward, your services — all in one place. Access welfare schemes, health programs, and civic tools built for your community.',
    cta: 'Join WhatsApp Channel',
    ctaHref: '#',
    secondaryCtaLabel: 'Explore Services',
    secondaryCtaHref: '/services',
    stats: [
      { icon: Users, value: '4,200+', label: 'Residents' },
      { icon: Heart, value: '120+', label: 'Blood Donors' },
      { icon: Zap, value: '18', label: 'Active Schemes' },
    ],
    accent: '#3b82f6',
    from: '#060d1f',
    to: '#0c2045',
    orb1: '#1e40af',
    orb2: '#0ea5e9',
  },
  {
    id: 2,
    badge: 'Community Welfare',
    title: 'Services That\nServe You',
    subtitle: 'From ration cards to health check-ups — every government service, simplified and accessible from your phone or doorstep.',
    cta: 'View All Services',
    ctaHref: '/services',
    secondaryCtaLabel: 'Learn More',
    secondaryCtaHref: '/about',
    stats: [
      { icon: Zap, value: '50+', label: 'Services' },
      { icon: Users, value: '1,800+', label: 'Beneficiaries' },
      { icon: Heart, value: '24/7', label: 'Support' },
    ],
    accent: '#10b981',
    from: '#021a10',
    to: '#042f1e',
    orb1: '#065f46',
    orb2: '#34d399',
  },
  {
    id: 3,
    badge: 'Blood Bank Initiative',
    title: 'Donate Blood,\nSave Lives',
    subtitle: 'Our ward runs one of Kannur\'s most active community blood banks. Register as a donor and be the reason someone lives to see tomorrow.',
    cta: 'Register as Donor',
    ctaHref: '/services/blood-bank',
    secondaryCtaLabel: 'Make a Donation',
    secondaryCtaHref: '/donate',
    stats: [
      { icon: Heart, value: '120+', label: 'Active Donors' },
      { icon: Users, value: '340+', label: 'Lives Saved' },
      { icon: Zap, value: '0-1hr', label: 'Response Time' },
    ],
    accent: '#ef4444',
    from: '#1a0505',
    to: '#2d0a0a',
    orb1: '#7f1d1d',
    orb2: '#f87171',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused] = useState(false)

  const goTo = useCallback((index: number, dir = 1) => {
    setDirection(dir)
    setCurrent(index)
    setPaused(true)
  }, [])

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, 1)
  }, [current, goTo])

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, -1)
  }, [current, goTo])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 6000)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = slides[current]

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 60, scale: 0.97 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d * -60, scale: 0.97 }),
  }

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '88vh', fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background layer */}
      <AnimatePresence initial={false}>
        <motion.div
          key={`bg-${current}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: 'easeInOut' }}
          style={{ background: `radial-gradient(ellipse at 20% 50%, ${slide.orb1}55 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${slide.orb2}33 0%, transparent 55%), linear-gradient(135deg, ${slide.from} 0%, ${slide.to} 100%)` }}
        />
      </AnimatePresence>

      {/* Grain overlay */}
      <div className="absolute inset-0 opacity-[0.035]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: '200px 200px',
      }} />

      {/* Grid lines */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
      }} />

      {/* Floating orbs */}
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: 500, height: 500, top: '-15%', right: '-10%', background: `${slide.orb2}22` }}
      />
      <motion.div
        className="absolute rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        style={{ width: 400, height: 400, bottom: '-10%', left: '-5%', background: `${slide.orb1}33` }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-center" style={{ minHeight: '88vh' }}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left */}
          <div>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${current}`}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[11px] font-bold uppercase tracking-[0.1em]"
                    style={{ borderColor: `${slide.accent}60`, background: `${slide.accent}18`, color: slide.accent }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: slide.accent }} />
                    {slide.badge}
                  </div>
                </div>

                {/* Title */}
                <h1 className="font-black text-white leading-[1.05] mb-5 whitespace-pre-line"
                  style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', letterSpacing: '-0.03em', textShadow: '0 2px 40px rgba(0,0,0,0.4)' }}>
                  {slide.title}
                </h1>

                {/* Subtitle */}
                <p className="text-white/60 leading-relaxed mb-8 max-w-lg" style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)' }}>
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-3 mb-12">
                  <Link href={slide.ctaHref}>
                    <button
                      className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-[14px] text-white transition-all duration-300 hover:-translate-y-px hover:shadow-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}cc)`,
                        boxShadow: `0 8px 32px ${slide.accent}50`,
                      }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      {slide.cta}
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </Link>
                  <Link href={slide.secondaryCtaHref}>
                    <button className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-[14px] text-white/80 hover:text-white border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
                      {slide.secondaryCtaLabel}
                    </button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 sm:gap-8">
                  {slide.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <stat.icon className="w-3.5 h-3.5" style={{ color: slide.accent }} />
                        <span className="text-white font-black text-[1.35rem]" style={{ letterSpacing: '-0.03em' }}>{stat.value}</span>
                      </div>
                      <span className="text-white/40 text-[11px] font-medium uppercase tracking-wide">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Decorative card */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${current}`}
                initial={{ opacity: 0, y: 30, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.94 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="relative"
              >
                {/* Glow */}
                <div className="absolute -inset-8 rounded-[40px] blur-3xl opacity-30" style={{ background: slide.accent }} />

                {/* Main card */}
                <div className="relative w-[340px] rounded-[28px] overflow-hidden border border-white/10 backdrop-blur-xl"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))' }}>

                  {/* Card header */}
                  <div className="px-6 pt-6 pb-4 border-b border-white/8">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/50 text-[11px] font-semibold uppercase tracking-widest">Ward Dashboard</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-green-400 text-[10px] font-bold">Live</span>
                      </div>
                    </div>
                    <p className="text-white font-bold text-[15px]">Ezhara Division 34</p>
                  </div>

                  {/* Metric rows */}
                  <div className="px-6 py-4 space-y-3">
                    {slide.stats.map((stat, i) => (
                      <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${slide.accent}25` }}>
                            <stat.icon className="w-4 h-4" style={{ color: slide.accent }} />
                          </div>
                          <span className="text-white/60 text-[13px] font-medium">{stat.label}</span>
                        </div>
                        <span className="text-white font-bold text-[15px]" style={{ letterSpacing: '-0.02em' }}>{stat.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Card footer */}
                  <div className="px-6 pb-6">
                    <div className="rounded-2xl overflow-hidden h-2 bg-white/10">
                      <motion.div
                        className="h-full rounded-2xl"
                        style={{ background: `linear-gradient(90deg, ${slide.accent}, ${slide.orb2})` }}
                        initial={{ width: '0%' }}
                        animate={{ width: '72%' }}
                        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <div className="flex justify-between mt-1.5">
                      <span className="text-white/30 text-[11px]">Community Progress</span>
                      <span className="text-white/50 text-[11px] font-bold">72%</span>
                    </div>
                  </div>
                </div>

                {/* Floating chips */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-4 -right-4 flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-white/15 backdrop-blur-xl"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="text-lg">🩸</span>
                  <div>
                    <p className="text-white text-[11px] font-bold leading-none">Blood Available</p>
                    <p className="text-white/50 text-[10px] mt-0.5">All groups · Updated now</p>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  className="absolute -bottom-4 -left-4 flex items-center gap-2 px-3.5 py-2 rounded-2xl border border-white/15 backdrop-blur-xl"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                >
                  <span className="text-lg">✅</span>
                  <div>
                    <p className="text-white text-[11px] font-bold leading-none">18 Schemes Active</p>
                    <p className="text-white/50 text-[10px] mt-0.5">Apply online now</p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom controls */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-white/8">
          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {slides.map((s, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                className="relative overflow-hidden rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 32 : 8,
                  height: 8,
                  background: i === current ? slide.accent : 'rgba(255,255,255,0.25)',
                }}
              >
                {i === current && (
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.4)' }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 6, ease: 'linear' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/15 bg-white/5 hover:bg-white/12 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 rounded-2xl flex items-center justify-center border border-white/15 bg-white/5 hover:bg-white/12 text-white/70 hover:text-white transition-all duration-200 backdrop-blur-sm"
            >
              <ChevronRight className="w-5 h-5" />
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