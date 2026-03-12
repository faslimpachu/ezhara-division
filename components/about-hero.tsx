'use client'

import { useEffect, useRef, useState } from 'react'
import {
  motion, useMotionValue, useSpring, useTransform,
  useScroll, AnimatePresence,
} from 'framer-motion'
import {
  MapPin, ArrowRight, Compass, Anchor,
  ChevronDown, Waves, TreePine, Building2,
} from 'lucide-react'

/* ─── tokens ─────────────────────────────────────── */
const CYAN  = '#0891b2'
const CYANL = '#06b6d4'
const INK   = '#0c1220'
const CREAM = '#fafaf7'

const sp = { type: 'spring', stiffness: 340, damping: 26 } as const

/* ─── Stats ─────────────────────────────────────── */
const stats = [
  { value: '12,400+', label: 'Residents',      icon: Building2 },
  { value: '6.2 km²', label: 'Total Area',     icon: Compass   },
  { value: '8',       label: 'Heritage Sites', icon: Anchor    },
  { value: '1912',    label: 'Established',    icon: TreePine  },
]

/* ─── Map feature tags ──────────────────────────── */
const features = [
  { label: 'Coastal Belt',       x: '18%', y: '28%', delay: 0.9  },
  { label: 'Heritage Zone',      x: '62%', y: '18%', delay: 1.05 },
  { label: 'Fishermen\'s Wharf', x: '12%', y: '68%', delay: 1.15 },
  { label: 'Ward Office',        x: '55%', y: '58%', delay: 1.25 },
]

/* ─── Animated grid lines (decorative) ─────────── */
function CoordGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <pattern id="cgrid" width="52" height="52" patternUnits="userSpaceOnUse">
          <path d="M 52 0 L 0 0 0 52" fill="none" stroke="rgba(8,145,178,0.07)" strokeWidth="0.75"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cgrid)" />
    </svg>
  )
}

/* ─── Animated wave SVG ─────────────────────────── */
function WaveDivider() {
  return (
    <div className="absolute bottom-0 inset-x-0 pointer-events-none overflow-hidden">
      <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg"
        className="w-full" style={{ display: 'block' }}>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, delay: 0.8, ease: 'easeInOut' }}
          d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z"
          fill={`${CYAN}0d`}
          stroke={`${CYAN}30`}
          strokeWidth="1"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.0, ease: 'easeInOut' }}
          d="M0,52 C400,20 800,70 1200,42 C1340,32 1400,48 1440,52"
          fill="none"
          stroke={`${CYAN}18`}
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

/* ─── Floating coordinate pin ───────────────────── */
function CoordPin({ label, x, y, delay }: { label: string; x: string; y: string; delay: number }) {
  const [tip, setTip] = useState(false)
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22, delay }}
      className="absolute group"
      style={{ left: x, top: y, transform: 'translate(-50%,-50%)' }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      {/* Pulse ring */}
      <motion.div
        className="absolute -inset-2 rounded-full"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
        transition={{ duration: 2.8, repeat: Infinity, delay: delay * 0.5 }}
        style={{ background: `${CYAN}28` }}
      />
      {/* Dot */}
      <div className="relative w-2.5 h-2.5 rounded-full"
        style={{ background: CYAN, boxShadow: `0 0 8px ${CYANL}` }} />
      {/* Tooltip */}
      <AnimatePresence>
        {tip && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap text-white text-[11px] font-bold px-2.5 py-1.5 rounded-lg pointer-events-none z-20"
            style={{ background: INK, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

/* ─── Main ──────────────────────────────────────── */
export default function AboutHero() {
  const wrapRef  = useRef<HTMLElement>(null)
  const imgRef   = useRef<HTMLDivElement>(null)

  /* Mouse parallax */
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const smx = useSpring(mx, { stiffness: 22, damping: 28 })
  const smy = useSpring(my, { stiffness: 22, damping: 28 })
  const imgX = useTransform(smx, [0,1], ['-2%','2%'])
  const imgY = useTransform(smy, [0,1], ['-2%','2%'])
  const o1x  = useTransform(smx, [0,1], ['-4%','4%'])
  const o1y  = useTransform(smy, [0,1], ['-3%','3%'])
  const o2x  = useTransform(smx, [0,1], ['3%','-3%'])
  const o2y  = useTransform(smy, [0,1], ['2%','-2%'])

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth)
      my.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [])

  /* Scroll-driven parallax on image block */
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end start'] })
  const imgParallax = useTransform(scrollYProgress, [0,1], ['0%','18%'])
  const textFade    = useTransform(scrollYProgress, [0, 0.45], [1, 0])

  return (
    <section
      ref={wrapRef}
      className="relative w-full min-h-screen flex flex-col overflow-hidden"
      style={{ background: CREAM, fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      {/* ── Backgrounds ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <CoordGrid />

        {/* Reactive orbs — light mode cyan washes */}
        <motion.div style={{ x: o1x, y: o1y }}
          className="absolute -top-40 -right-24 w-[700px] h-[600px]">
          <div className="w-full h-full rounded-full"
            style={{ background: `radial-gradient(ellipse, ${CYAN}0f 0%, transparent 65%)`, filter: 'blur(40px)' }} />
        </motion.div>
        <motion.div style={{ x: o2x, y: o2y }}
          className="absolute -bottom-32 -left-20 w-[600px] h-[500px]">
          <div className="w-full h-full rounded-full"
            style={{ background: `radial-gradient(ellipse, ${CYAN}0a 0%, transparent 65%)`, filter: 'blur(36px)' }} />
        </motion.div>

        {/* Subtle top vignette */}
        <div className="absolute top-0 inset-x-0 h-48"
          style={{ background: `linear-gradient(to bottom, rgba(8,145,178,0.04), transparent)` }} />

        {/* Paper grain */}
        <div className="absolute inset-0 opacity-[0.028]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '220px 220px',
        }} />
      </div>

      {/* ── Page rule ── */}
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: 0.1, ease: [0.16,1,0.3,1] }}
        className="relative z-10 h-[3px] origin-left mx-5 sm:mx-8 lg:mx-12 mt-[82px] rounded-full"
        style={{ background: `linear-gradient(90deg, ${CYAN}, ${CYANL}55)` }}
      />

      {/* ── Main content ── */}
      <motion.div
        style={{ opacity: textFade }}
        className="relative z-10 flex-1 grid lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_500px] gap-0 max-w-7xl mx-auto w-full px-5 sm:px-8 lg:px-12 pt-10 pb-8 items-center"
      >
        {/* ─── LEFT: Typography block ─── */}
        <div className="flex flex-col justify-center pr-0 lg:pr-12 xl:pr-20 py-4">

          {/* Location label */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="flex items-center gap-2.5 mb-8"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border"
              style={{ borderColor: `${CYAN}35`, background: `${CYAN}0a` }}>
              <MapPin className="w-3 h-3" style={{ color: CYAN }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em]"
                style={{ color: CYAN }}>
                Kannur Corp. · Ward 01
              </span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 bg-white/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Active Ward
              </span>
            </div>
          </motion.div>

          {/* Main headline — asymmetric stagger */}
          <div className="overflow-hidden mb-2">
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.75, delay: 0.36, ease: [0.16,1,0.3,1] }}
              className="font-black leading-none"
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.1rem)',
                letterSpacing: '0.22em',
                color: 'rgba(12,18,32,0.3)',
                textTransform: 'uppercase',
              }}
            >
              About
            </motion.p>
          </div>

          <div className="overflow-hidden mb-1">
            <motion.h1
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.85, delay: 0.42, ease: [0.16,1,0.3,1] }}
              className="font-black leading-[0.9] text-slate-900"
              style={{ fontSize: 'clamp(4rem, 10vw, 8.5rem)', letterSpacing: '-0.065em' }}
            >
              Ezhara
            </motion.h1>
          </div>

          <div className="overflow-hidden mb-8">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.85, delay: 0.54, ease: [0.16,1,0.3,1] }}
              className="font-black leading-[0.88] text-transparent bg-clip-text"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 5rem)',
                letterSpacing: '-0.055em',
                backgroundImage: `linear-gradient(100deg, #a5f3fc 0%, ${CYAN} 45%, #0e7490 100%)`,
              }}
            >
              The Heart of<br />Kannur.
            </motion.div>
          </div>

          {/* Body copy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="leading-relaxed mb-10 max-w-[440px]"
            style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)', color: 'rgba(12,18,32,0.45)', letterSpacing: '-0.005em' }}
          >
            Where coastal serenity, rich cultural heritage, and forward-thinking
            digital governance converge. Ezhara is not just a ward — it's a
            living, breathing community built on centuries of tradition and a
            vision for the future.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.84 }}
            className="flex flex-wrap items-center gap-3"
          >
            <motion.button
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={sp}
              className="group relative flex items-center gap-2.5 px-7 py-4 rounded-2xl font-bold text-[15px] text-white overflow-hidden"
              style={{
                background: `linear-gradient(135deg, #0e7490, ${CYAN})`,
                boxShadow: `0 8px 32px ${CYAN}35`,
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)' }} />
              <span className="relative z-10">Explore Ward</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={sp}
              className="flex items-center gap-2.5 px-7 py-4 rounded-2xl font-semibold text-[15px] transition-all duration-200 border"
              style={{ color: INK, borderColor: 'rgba(12,18,32,0.14)', background: 'rgba(12,18,32,0.03)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(12,18,32,0.07)'
                el.style.borderColor = 'rgba(12,18,32,0.22)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'rgba(12,18,32,0.03)'
                el.style.borderColor = 'rgba(12,18,32,0.14)'
              }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>

        {/* ─── RIGHT: Map image block ─── */}
        <motion.div
          initial={{ opacity: 0, x: 36, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.46, ease: [0.16,1,0.3,1] }}
          className="relative hidden lg:block"
          style={{ height: '540px' }}
        >
          {/* Outer border frame */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            style={{ border: `1.5px solid ${CYAN}22`, boxShadow: `inset 0 1px 0 rgba(255,255,255,0.9)` }} />

          {/* Image container with parallax */}
          <motion.div
            ref={imgRef}
            style={{ x: imgX, y: imgParallax }}
            className="absolute inset-0 rounded-3xl overflow-hidden"
          >
            {/* Placeholder map background */}
            <div className="absolute inset-0"
              style={{
                background: `
                  radial-gradient(ellipse at 30% 40%, ${CYAN}16 0%, transparent 50%),
                  radial-gradient(ellipse at 70% 70%, #0e749020 0%, transparent 45%),
                  linear-gradient(165deg, #e0f2fe 0%, #f0fdf4 40%, #ecfeff 100%)
                `,
              }} />

            {/* Topographic lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.18]" aria-hidden>
              {[0,1,2,3,4,5].map(i => (
                <ellipse key={i}
                  cx="45%" cy="48%"
                  rx={`${18 + i * 9}%`} ry={`${10 + i * 5}%`}
                  fill="none" stroke={CYAN} strokeWidth="0.8"
                  strokeDasharray={`${4 + i} ${3 + i}`}
                />
              ))}
            </svg>

            {/* Crosshair center */}
            <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="relative w-8 h-8">
                <div className="absolute inset-x-0 top-1/2 h-px" style={{ background: `${CYAN}60` }} />
                <div className="absolute inset-y-0 left-1/2 w-px" style={{ background: `${CYAN}60` }} />
                <div className="absolute inset-2 rounded-full border"
                  style={{ borderColor: `${CYAN}80` }} />
              </div>
            </div>

            {/* Coordinate pins */}
            {features.map(f => (
              <CoordPin key={f.label} {...f} />
            ))}

            {/* Compass rose — bottom right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="absolute bottom-5 right-5 w-12 h-12 flex items-center justify-center rounded-full"
              style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(8px)', border: `1px solid ${CYAN}28` }}
            >
              <Compass className="w-6 h-6" style={{ color: CYAN }} />
            </motion.div>

            {/* Water shimmer strips */}
            <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
              style={{ background: `linear-gradient(to top, ${CYAN}14, transparent)` }} />

            <Waves className="absolute bottom-3 left-4 w-5 h-5 opacity-20" style={{ color: CYAN }} />
          </motion.div>

          {/* ── Floating stat chips on corners of image ── */}
          {[
            { stat: stats[0], pos: 'top-3 left-3' },
            { stat: stats[2], pos: 'top-3 right-3' },
            { stat: stats[3], pos: 'bottom-3 right-3' },
          ].map(({ stat, pos }, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1, type: 'spring', stiffness: 300, damping: 22 }}
                className={`absolute ${pos} z-20 flex items-center gap-2 px-3 py-2 rounded-xl`}
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(12px)',
                  border: `1px solid ${CYAN}22`,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                }}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: CYAN }} />
                <span className="font-black text-[13px] text-slate-900" style={{ letterSpacing: '-0.03em' }}>
                  {stat.value}
                </span>
                <span className="text-[10.5px] font-semibold text-slate-400">{stat.label}</span>
              </motion.div>
            )
          })}
        </motion.div>
      </motion.div>

      {/* ── Stats bar — mobile/tablet only ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.92 }}
        className="relative z-10 lg:hidden grid grid-cols-2 sm:grid-cols-4 mx-5 sm:mx-8 mb-4 rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(12,18,32,0.1)' }}
      >
        {stats.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={s.label}
              className="group relative flex flex-col gap-1.5 px-5 py-4 bg-white"
              style={{ borderRight: i < 3 ? '1px solid rgba(12,18,32,0.08)' : 'none' }}
            >
              <Icon className="w-4 h-4 mb-0.5" style={{ color: CYAN }} />
              <span className="font-black leading-none text-slate-900"
                style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', letterSpacing: '-0.04em' }}>
                {s.value}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">
                {s.label}
              </span>
            </div>
          )
        })}
      </motion.div>

      {/* ── Wave divider ── */}
      <WaveDivider />

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-1.5 pb-8 mt-auto"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-300">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4" style={{ color: `${CYAN}70` }} />
        </motion.div>
      </motion.div>

      {/* ── Coordinate watermark (decorative) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-16 left-5 sm:left-8 lg:left-12 z-10 pointer-events-none hidden sm:block"
      >
        <p className="text-[10px] font-mono font-bold tracking-wider"
          style={{ color: 'rgba(8,145,178,0.22)' }}>
          11.8745° N · 75.3704° E
        </p>
      </motion.div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}