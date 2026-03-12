'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import {
  Rocket, Leaf, GraduationCap, Heart,
  Briefcase, Laptop, ArrowDownRight, Zap,
  TrendingUp, Users, MapPin,
} from 'lucide-react'

/* ─── Programs for the ticker ───────────────────────── */
const programs = [
  { icon: Rocket,        label: 'Make in Ezhara'         },
  { icon: Laptop,        label: 'Future Skill Academy'   },
  { icon: Leaf,          label: 'Green Ezhara'           },
  { icon: GraduationCap, label: 'Student Scholarships'   },
  { icon: Heart,         label: 'Family Welfare Fund'    },
  { icon: Briefcase,     label: 'Employment Board'       },
]

/* ─── Live stats ─────────────────────────────────────── */
const livePills = [
  { icon: Users,     value: '450+',  label: 'Active Beneficiaries', color: '#10b981' },
  { icon: TrendingUp,value: '6',     label: 'Running Programs',     color: '#3b82f6' },
  { icon: Zap,       value: '₹50L+', label: 'Funds Deployed',       color: '#f59e0b' },
]

/* ─── Count-up hook ──────────────────────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [v, setV] = useState(0)
  const started = useRef(false)
  useEffect(() => {
    if (started.current) return
    started.current = true
    const steps = Math.ceil(duration / 16)
    let step = 0
    const id = setInterval(() => {
      step++
      const e = 1 - Math.pow(1 - step / steps, 3)
      setV(Math.round(e * target))
      if (step >= steps) { clearInterval(id); setV(target) }
    }, 16)
    return () => clearInterval(id)
  }, [target, duration])
  return v
}

/* ─── Word scramble hook ─────────────────────────────── */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
function useScramble(text: string, delay = 0) {
  const [display, setDisplay] = useState(text)
  useEffect(() => {
    let frame = 0
    const timeout = setTimeout(() => {
      const id = setInterval(() => {
        setDisplay(
          text.split('').map((char, i) => {
            if (char === ' ') return ' '
            if (i < frame / 2) return char
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          }).join('')
        )
        frame++
        if (frame >= text.length * 2) { clearInterval(id); setDisplay(text) }
      }, 30)
    }, delay)
    return () => clearTimeout(timeout)
  }, [text, delay])
  return display
}

/* ─── Particle canvas ────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf: number

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      o: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.fill()
      })
      // Draw faint lines between close particles
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x
          const dy = pts[i].y - pts[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(pts[i].x, pts[i].y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.04 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
}

/* ─── Horizontal ticker ──────────────────────────────── */
function ProgramTicker() {
  const doubled = [...programs, ...programs, ...programs]
  return (
    <div className="relative overflow-hidden w-full py-3.5"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ['0%', '-33.33%'] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((p, i) => {
          const Icon = p.icon
          return (
            <div key={i} className="flex items-center gap-2.5 flex-shrink-0">
              <Icon className="w-3.5 h-3.5" style={{ color: 'rgba(255,255,255,0.3)' }} />
              <span className="text-[11.5px] font-bold uppercase tracking-[0.14em]"
                style={{ color: 'rgba(255,255,255,0.25)' }}>
                {p.label}
              </span>
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.1)' }}>✦</span>
            </div>
          )
        })}
      </motion.div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(90deg, #080810, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-20 pointer-events-none"
        style={{ background: 'linear-gradient(-90deg, #080810, transparent)' }} />
    </div>
  )
}

/* ─── Main hero ──────────────────────────────────────── */
export default function InitiativesHero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] })
  const y    = useTransform(scrollYProgress, [0, 1], ['0%', '24%'])
  const fade = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const word1 = useScramble('TRANSFORMING', 400)
  const word2 = useScramble('EZHARA', 700)

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: '#080810', fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      {/* ── Layered atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep left glow */}
        <div className="absolute -top-40 -left-32 w-[900px] h-[700px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(ellipse, rgba(29,78,216,0.12) 0%, transparent 70%)' }} />
        {/* Center warm haze */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 65%)' }} />
        {/* Right orange */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[500px] rounded-full blur-[140px]"
          style={{ background: 'radial-gradient(ellipse, rgba(249,115,22,0.07) 0%, transparent 70%)' }} />

        {/* Fine grid */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '56px 56px',
        }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px',
        }} />
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* ── Top bar ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 lg:px-14 pt-8 pb-0"
      >
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[11px] font-bold uppercase tracking-[0.14em]"
            style={{ color: 'rgba(255,255,255,0.35)' }}>
            Live · Division 34 Programs
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] font-semibold"
          style={{ color: 'rgba(255,255,255,0.2)' }}>
          <MapPin className="w-3 h-3" />
          Ezhara, Kannur
        </div>
      </motion.div>

      {/* ── Main content ── */}
      <motion.div
        style={{ y, opacity: fade }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-14 pt-16 pb-8"
      >
        <div className="max-w-7xl mx-auto w-full">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="h-px w-10"
              style={{ background: 'linear-gradient(90deg,#3b82f6,#7c3aed)' }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.18em]"
              style={{ color: 'rgba(255,255,255,0.35)' }}>
              Flagship Initiatives · 2024–25
            </span>
          </motion.div>

          {/* MASSIVE headline — word-by-word staggered */}
          <div className="mb-6 overflow-hidden">
            {/* Line 1 — scramble effect */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-black leading-[0.92] text-white select-none"
                style={{
                  fontSize: 'clamp(3.2rem, 10vw, 9rem)',
                  letterSpacing: '-0.065em',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {word1}
              </span>
            </motion.div>

            {/* Line 2 — gradient fill + scramble */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-black leading-[0.92] text-transparent bg-clip-text select-none"
                style={{
                  fontSize: 'clamp(3.2rem, 10vw, 9rem)',
                  letterSpacing: '-0.065em',
                  backgroundImage: 'linear-gradient(100deg, #93c5fd 0%, #3b82f6 30%, #7c3aed 65%, #f97316 100%)',
                }}
              >
                {word2}
              </span>
            </motion.div>

            {/* Line 3 — outline text */}
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.56, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="block font-black leading-[0.92] select-none"
                style={{
                  fontSize: 'clamp(3.2rem, 10vw, 9rem)',
                  letterSpacing: '-0.065em',
                  WebkitTextStroke: '1.5px rgba(255,255,255,0.18)',
                  color: 'transparent',
                }}
              >
                VISION
              </span>
            </motion.div>
          </div>

          {/* Bottom row: subtitle + live pills + CTA */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mt-10">

            {/* Left: subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
            >
              <p className="text-[15px] leading-relaxed max-w-lg mb-6"
                style={{ color: 'rgba(255,255,255,0.38)' }}>
                Explore the flagship initiatives led by{' '}
                <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  Councilor Faslim T.P.
                </span>{' '}
                — designed to empower youth, support families, and build a sustainable future for Ward 34.
              </p>

              {/* Live stat pills */}
              <div className="flex flex-wrap gap-2.5">
                {livePills.map(({ icon: Icon, value, label, color }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.82 + i * 0.08, type: 'spring', stiffness: 320, damping: 24 }}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.09)',
                    }}
                  >
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center"
                      style={{ background: `${color}22`, border: `1px solid ${color}33` }}>
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <div>
                      <span className="text-white font-black text-[14px]" style={{ letterSpacing: '-0.03em' }}>
                        {value}
                      </span>
                      <span className="text-[11px] ml-1.5 font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {label}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: CTA + target badge */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.78 }}
              className="flex flex-col items-start lg:items-end gap-4"
            >
              {/* Target badge */}
              <div
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl"
                style={{
                  background: 'rgba(251,191,36,0.08)',
                  border: '1px solid rgba(251,191,36,0.2)',
                }}
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-[12px] font-bold" style={{ color: 'rgba(251,191,36,0.85)' }}>
                  Target: Zero Unemployment Zone
                </span>
              </div>

              {/* Scroll CTA */}
              <motion.button
                whileHover={{ y: 3 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                onClick={() => window.scrollBy({ top: window.innerHeight * 0.9, behavior: 'smooth' })}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-2xl font-bold text-[14px] text-white transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(124,58,237,0.2))',
                  border: '1.5px solid rgba(59,130,246,0.3)',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,rgba(59,130,246,0.3),rgba(124,58,237,0.3))' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg,rgba(59,130,246,0.2),rgba(124,58,237,0.2))' }}
              >
                <span>Explore Initiatives</span>
                <motion.div
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ArrowDownRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* ── Program ticker ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="relative z-10 mt-auto"
      >
        <ProgramTicker />
      </motion.div>

      {/* ── Floating councilor card (desktop) ── */}
      <motion.div
        initial={{ opacity: 0, x: 40, scale: 0.92 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute right-10 top-1/2 -translate-y-1/2 z-20 hidden xl:flex flex-col gap-0 rounded-3xl overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
          width: '220px',
        }}
      >
        <div className="h-[2px]" style={{ background: 'linear-gradient(90deg,#3b82f6,#7c3aed)' }} />
        <div className="p-5">
          {/* Avatar placeholder */}
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 font-black text-[1.4rem] text-white"
            style={{ background: 'linear-gradient(135deg,#1d4ed8,#7c3aed)', letterSpacing: '-0.04em' }}>
            FT
          </div>
          <p className="text-white font-bold text-[14px] leading-snug" style={{ letterSpacing: '-0.02em' }}>
            Faslim T.P.
          </p>
          <p className="text-[11.5px] mt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Ward Councilor
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.22)' }}>
            Division 34 · Ezhara
          </p>
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10.5px] font-semibold" style={{ color: 'rgba(255,255,255,0.3)' }}>
                2020 – Present
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}