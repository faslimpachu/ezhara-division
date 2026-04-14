'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, ArrowRight, Droplet, Users, Heart, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    tag: 'Health Initiative',
    title: 'Blood Donation Drive',
    desc: 'Over 200 donors contributed this month — making Ward 34 one of the most active blood donation communities in Kannur.',
    stat: '200+',
    statLabel: 'Donors This Month',
    accent: '#e03131',
    bg: 'linear-gradient(135deg, #1a0505 0%, #3d0a0a 50%, #1a0000 100%)',
    iconBg: '#fee2e2',
    iconColor: '#e03131',
    icon: Droplet,
    cta: 'Register as Donor',
    href: '/services/blood-bank',
    num: '01',
  },
  {
    id: 2,
    tag: 'Community Event',
    title: 'Ezhara Celebrates Together',
    desc: 'Ward residents united for our annual community day — 850+ joined the festivities, strengthening bonds across all neighborhoods.',
    stat: '850+',
    statLabel: 'Attendees',
    accent: '#1971c2',
    bg: 'linear-gradient(135deg, #020b1a 0%, #0a1e45 50%, #020b1a 100%)',
    iconBg: '#dbeafe',
    iconColor: '#1971c2',
    icon: Users,
    cta: 'Learn More',
    href: '/about',
    num: '02',
  },
  {
    id: 3,
    tag: 'Impact Report',
    title: '500+ Lives Impacted',
    desc: 'From emergency blood supply to welfare distributions, our programs touched over 500 families across Division 34 this year.',
    stat: '500+',
    statLabel: 'Lives Impacted',
    accent: '#2f9e44',
    bg: 'linear-gradient(135deg, #011a0c 0%, #04351a 50%, #011a0c 100%)',
    iconBg: '#dcfce7',
    iconColor: '#2f9e44',
    icon: Heart,
    cta: 'See All Programs',
    href: '/initiatives',
    num: '03',
  },
  {
    id: 4,
    tag: 'Welfare',
    title: 'Supporting Families in Need',
    desc: 'Our welfare programs distributed aid to 180+ families this quarter — ensuring no resident of Ward 34 is left without support.',
    stat: '180+',
    statLabel: 'Families Aided',
    accent: '#7048e8',
    bg: 'linear-gradient(135deg, #100320 0%, #1e0840 50%, #100320 100%)',
    iconBg: '#ede9fe',
    iconColor: '#7048e8',
    icon: Sparkles,
    cta: 'Apply Now',
    href: '/services/welfare-schemes',
    num: '04',
  },
]

export default function CommunityHighlights() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500)
  }, [])

  const goTo = useCallback(
    (idx: number, dir = 1) => {
      setDirection(dir)
      setCurrent((idx + slides.length) % slides.length)
      resetTimer()
    },
    [resetTimer]
  )

  const next = useCallback(() => goTo(current + 1, 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1, -1), [current, goTo])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  const slide = slides[current]
  const Icon = slide.icon

  const textVariants = {
    enter: (d: number) => ({ opacity: 0, y: d > 0 ? 18 : -18 }),
    center: { opacity: 1, y: 0 },
    exit: (d: number) => ({ opacity: 0, y: d > 0 ? -18 : 18 }),
  }

  return (
    <section
      className="py-16 px-5 sm:px-8 lg:px-12"
      style={{ background: '#ffffff', fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-8 gap-4 flex-wrap"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900 animate-pulse opacity-40" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                Community Highlights
              </span>
            </div>
            <h2
              className="font-black text-neutral-900 leading-[1.08]"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.6rem)', letterSpacing: '-0.04em' }}
            >
              Stories from
              <br />
              <span className="text-neutral-300">Division 34</span>
            </h2>
          </div>

          <div className="flex flex-col items-end gap-2.5">
            <span className="text-[13px] font-semibold tabular-nums text-neutral-300" style={{ letterSpacing: '0.06em' }}>
              {slide.num} / {String(slides.length).padStart(2, '0')}
            </span>
            <div className="flex gap-2">
              {[
                { fn: prev, Ic: ChevronLeft },
                { fn: next, Ic: ChevronRight },
              ].map(({ fn, Ic }, i) => (
                <button
                  key={i}
                  onClick={fn}
                  className="w-[38px] h-[38px] rounded-full border-[1.5px] border-neutral-200 bg-white flex items-center justify-center text-neutral-400 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white transition-all duration-200"
                >
                  <Ic className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Main hero card ── */}
        <div
          className="relative rounded-3xl overflow-hidden mb-3"
          style={{ minHeight: 500 }}
        >
          {/* BG crossfade */}
          <AnimatePresence initial={false}>
            <motion.div
              key={`bg-${current}`}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{ background: slide.bg }}
            />
          </AnimatePresence>

          {/* Orbs */}
          <div
            className="absolute top-[-80px] right-[-60px] w-[380px] h-[380px] rounded-full pointer-events-none"
            style={{ background: slide.accent, opacity: 0.13, transition: 'background 0.5s' }}
          />
          <div
            className="absolute bottom-[40px] left-[30px] w-[220px] h-[220px] rounded-full pointer-events-none"
            style={{ background: slide.accent, opacity: 0.1, transition: 'background 0.5s' }}
          />

          {/* Veil */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(160deg, transparent 25%, rgba(0,0,0,0.62) 100%)' }}
          />

          {/* Watermark number */}
          <div
            className="absolute top-6 right-8 font-black leading-none select-none pointer-events-none"
            style={{
              fontSize: 'clamp(5rem, 14vw, 10rem)',
              color: 'rgba(255,255,255,0.06)',
              letterSpacing: '-0.06em',
            }}
          >
            {slide.num}
          </div>

          {/* Content */}
          <div
            className="relative z-10 flex flex-col justify-end h-full p-10 sm:p-12"
            style={{ minHeight: 500 }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`content-${current}`}
                custom={direction}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Tag */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm mb-5 w-fit">
                  <Icon className="w-3 h-3 text-white/80" />
                  <span className="text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/90">
                    {slide.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="text-white font-black leading-[1.08] mb-3"
                  style={{
                    fontSize: 'clamp(1.9rem, 4vw, 3.1rem)',
                    letterSpacing: '-0.04em',
                    maxWidth: '15ch',
                  }}
                >
                  {slide.title}
                </h3>

                {/* Desc */}
                <p
                  className="leading-[1.7] mb-8"
                  style={{
                    color: 'rgba(255,255,255,0.58)',
                    fontSize: '15px',
                    maxWidth: '46ch',
                  }}
                >
                  {slide.desc}
                </p>

                {/* Stat + CTA */}
                <div className="flex items-end justify-between gap-6 flex-wrap">
                  <div>
                    <div
                      className="font-black leading-none mb-1.5 tabular-nums text-white"
                      style={{
                        fontSize: 'clamp(2.6rem, 5vw, 4rem)',
                        letterSpacing: '-0.05em',
                      }}
                    >
                      {slide.stat}
                    </div>
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/35">
                      {slide.statLabel}
                    </div>
                  </div>

                  <Link href={slide.href}>
                    <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-neutral-900 text-[13px] font-bold hover:-translate-y-0.5 hover:scale-[1.02] transition-all duration-150 whitespace-nowrap">
                      {slide.cta}
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                    </button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 5.5, ease: 'linear' }}
              key={`prog-${current}`}
            />
          </div>
        </div>

        {/* ── Thumbnail strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {slides.map((s, i) => {
            const SIcon = s.icon
            const isActive = i === current
            return (
              <motion.button
                key={s.id}
                onClick={() => goTo(i, i > current ? 1 : -1)}
                whileHover={{ scale: isActive ? 1 : 1.02, y: isActive ? 0 : -1 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="relative text-left rounded-[18px] overflow-hidden p-[18px] transition-all duration-200"
                style={{
                  background: isActive ? '#fff' : '#fafafa',
                  border: `1.5px solid ${isActive ? s.accent : '#ebebeb'}`,
                  boxShadow: isActive ? '0 4px 24px -4px rgba(0,0,0,0.10)' : 'none',
                }}
              >
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-[11px] flex items-center justify-center mb-3 transition-all duration-200"
                  style={{ background: isActive ? s.iconBg : '#f3f4f6' }}
                >
                  <SIcon
                    className="w-4 h-4 transition-colors duration-200"
                    style={{ color: isActive ? s.iconColor : '#bbb' }}
                  />
                </div>

                {/* Text */}
                <div
                  className="text-[12.5px] font-bold leading-tight mb-1 transition-colors duration-200"
                  style={{ color: isActive ? '#111' : '#888' }}
                >
                  {s.title}
                </div>
                <div
                  className="text-[11px] font-semibold transition-colors duration-200"
                  style={{ color: isActive ? s.accent : '#ccc' }}
                >
                  {s.stat} {s.statLabel}
                </div>

                {/* Progress */}
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-100">
                  {isActive && (
                    <motion.div
                      className="h-full"
                      style={{ background: s.accent }}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 5.5, ease: 'linear' }}
                      key={`tp-${current}`}
                    />
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}