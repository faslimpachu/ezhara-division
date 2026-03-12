'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Facebook, Instagram, Twitter,
  MessageCircle, ExternalLink, ArrowUpRight,
  Quote, Star, Verified, Building2,
} from 'lucide-react'

/* ─── tokens ───────────────────────────────────── */
const CYAN  = '#0891b2'
const CYANL = '#06b6d4'
const INK   = '#0c1220'
const sp    = { type: 'spring', stiffness: 340, damping: 26 } as const

/* ─── Social links ─────────────────────────────── */
const socials = [
  { icon: Facebook,  label: 'Facebook',  href: '#', color: '#1877F2', bg: 'rgba(24,119,242,0.1)', border: 'rgba(24,119,242,0.25)' },
  { icon: Instagram, label: 'Instagram', href: '#', color: '#E1306C', bg: 'rgba(225,48,108,0.1)',  border: 'rgba(225,48,108,0.25)' },
  { icon: Twitter,   label: 'Twitter',   href: '#', color: '#1DA1F2', bg: 'rgba(29,161,242,0.1)', border: 'rgba(29,161,242,0.25)' },
]

/* ─── Term highlights ──────────────────────────── */
const achievements = [
  { num: '6',    label: 'Active Initiatives' },
  { num: '450+', label: 'Families Supported' },
  { num: '₹50L', label: 'Funds Deployed'     },
]

export default function AboutGeography() {
  const [mapLoaded, setMapLoaded] = useState(false)

  return (
    <section
      className="relative overflow-hidden py-20 px-5 sm:px-8 lg:px-12"
      style={{ background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      {/* ── Dot grid background ── */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
          backgroundSize: '28px 28px',
          opacity: 0.4,
        }} />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: `linear-gradient(90deg, ${CYAN}, transparent)` }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em]"
              style={{ color: `${CYAN}b3` }}>
              Location & Leadership
            </span>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] items-end gap-4">
            <h2 className="text-slate-900 font-black leading-[0.95]"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.6rem)', letterSpacing: '-0.05em' }}>
              Division 34 &{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(100deg, #a5f3fc, ${CYAN} 55%, #0e7490)` }}>
                Your Councilor.
              </span>
            </h2>
            <p className="text-slate-400 text-[14px] leading-relaxed lg:max-w-[200px] lg:text-right">
              Ezhara Ward,<br />Kannur Corporation
            </p>
          </div>
        </motion.div>

        {/* ── Main two-column grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-5">

          {/* ─── LEFT: MAP PANEL ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden"
            style={{
              height: '520px',
              border: `1.5px solid ${CYAN}28`,
              boxShadow: `0 4px 24px ${CYAN}12, 0 1px 4px rgba(0,0,0,0.06)`,
            }}
          >
            {/* Loading skeleton */}
            <AnimatePresence>
              {!mapLoaded && (
                <motion.div
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-10 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #e0f2fe, #ecfeff)' }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                      className="w-8 h-8 rounded-full border-2 border-t-transparent"
                      style={{ borderColor: `${CYAN}50`, borderTopColor: CYAN }}
                    />
                    <span className="text-[12px] font-semibold" style={{ color: `${CYAN}80` }}>
                      Loading map…
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* iframe */}
            <iframe
              title="Ezhara Division 34 Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5555444444444!2d75.6!3d12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba68e0000000001%3A0x0!2sEzhara!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onLoad={() => setMapLoaded(true)}
            />

            {/* ── Overlays ── */}

            {/* Top-left location badge */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl"
              style={{
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(12px)',
                border: `1px solid ${CYAN}28`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
              }}
            >
              <div className="w-7 h-7 rounded-xl flex items-center justify-center"
                style={{ background: `${CYAN}18`, border: `1px solid ${CYAN}30` }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: CYAN }} />
              </div>
              <div>
                <p className="text-slate-900 font-bold text-[12.5px] leading-none">Ezhara · Division 34</p>
                <p className="text-slate-400 text-[10.5px] mt-0.5">Kannur Corporation</p>
              </div>
            </motion.div>

            {/* Bottom-right coordinate chip */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-4 right-4 z-20 px-3 py-2 rounded-xl"
              style={{
                background: 'rgba(8,18,32,0.72)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
            >
              <p className="text-[10.5px] font-mono font-bold tracking-wider"
                style={{ color: 'rgba(255,255,255,0.55)' }}>
                11.8745° N · 75.3704° E
              </p>
            </motion.div>

            {/* Bottom-left open-in-maps link */}
            <motion.a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11.5px] font-bold transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.88)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${CYAN}28`,
                color: CYAN,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.88)' }}
            >
              <ExternalLink className="w-3 h-3" />
              Open in Maps
            </motion.a>

            {/* Gradient vignette at bottom */}
            <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none z-10"
              style={{ background: 'linear-gradient(to top, rgba(248,250,252,0.3), transparent)' }} />
          </motion.div>

          {/* ─── RIGHT: COUNCILOR CARD ─── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4"
          >

            {/* ── Profile card ── */}
            <div
              className="relative rounded-3xl overflow-hidden flex-1"
              style={{
                background: '#ffffff',
                border: '1.5px solid #e2e8f0',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}
            >
              {/* Cyan top accent */}
              <div className="h-[3px] w-full"
                style={{ background: `linear-gradient(90deg, ${CYAN}, ${CYANL}66)` }} />

              {/* Header strip */}
              <div className="relative px-7 pt-7 pb-5 flex items-center gap-5"
                style={{ borderBottom: '1px solid #f1f5f9' }}>

                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={sp}
                  className="relative flex-shrink-0"
                >
                  <div
                    className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-white text-[1.6rem] select-none"
                    style={{
                      background: `linear-gradient(135deg, #0e7490, ${CYAN})`,
                      letterSpacing: '-0.04em',
                      boxShadow: `0 8px 28px ${CYAN}35`,
                    }}
                  >
                    FT
                  </div>
                  {/* Verified badge */}
                  <div
                    className="absolute -bottom-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ background: CYAN, boxShadow: '0 2px 8px rgba(8,145,178,0.4)' }}
                  >
                    <Verified className="w-3.5 h-3.5 text-white" />
                  </div>
                </motion.div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-slate-900 font-black text-[1.2rem]"
                      style={{ letterSpacing: '-0.03em' }}>
                      Faslim T.P.
                    </h3>
                  </div>
                  <p className="text-[13px] font-semibold" style={{ color: CYAN }}>
                    Ward Councilor
                  </p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <p className="text-slate-400 text-[12px]">
                      Kannur Corporation · Division 34
                    </p>
                  </div>
                </div>

                {/* Term badge */}
                <div className="flex-shrink-0 hidden sm:flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Term
                  </span>
                  <span className="font-black text-slate-900 text-[13px]"
                    style={{ letterSpacing: '-0.03em' }}>
                    2020–25
                  </span>
                  <span className="flex items-center gap-1 text-[10.5px] font-bold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </span>
                </div>
              </div>

              {/* Quote / bio */}
              <div className="px-7 pt-5 pb-4">
                <div className="flex gap-3">
                  <Quote className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: `${CYAN}55` }} />
                  <p className="text-slate-500 text-[13.5px] leading-relaxed italic">
                    My vision is to bring governance directly to your fingertips — fully digitalising ward services, establishing EYIS, and championing sustainable infrastructure for a transparent, future-ready community.
                  </p>
                </div>
              </div>

              {/* Stat chips */}
              <div className="px-7 pb-6">
                <div className="grid grid-cols-3 gap-2">
                  {achievements.map((a, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.07, type: 'spring', stiffness: 320, damping: 24 }}
                      className="flex flex-col gap-0.5 px-3 py-3 rounded-2xl text-center"
                      style={{
                        background: `${CYAN}08`,
                        border: `1px solid ${CYAN}18`,
                      }}
                    >
                      <span className="font-black text-[1.1rem] leading-none"
                        style={{ color: CYAN, letterSpacing: '-0.04em' }}>
                        {a.num}
                      </span>
                      <span className="text-[10.5px] font-semibold text-slate-400 leading-snug">
                        {a.label}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Social row ── */}
            <div
              className="rounded-3xl p-5 flex items-center justify-between gap-4"
              style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <span className="text-[12px] font-bold uppercase tracking-[0.1em] text-slate-400">
                Follow
              </span>
              <div className="flex items-center gap-2">
                {socials.map(({ icon: Icon, label, href, color, bg, border }) => (
                  <motion.a
                    key={label}
                    href={href}
                    whileHover={{ y: -2, scale: 1.08 }}
                    whileTap={{ scale: 0.93 }}
                    transition={sp}
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200"
                    style={{ background: bg, border: `1.5px solid ${border}` }}
                    title={label}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 14px ${color}28` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}
                  >
                    <Icon className="w-4.5 h-4.5" style={{ color }} />
                  </motion.a>
                ))}
              </div>
              <motion.a
                href="#"
                whileHover={{ x: 2 }}
                transition={sp}
                className="group flex items-center gap-1.5 text-[12.5px] font-bold transition-colors duration-200"
                style={{ color: CYAN }}
              >
                All profiles
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </motion.a>
            </div>

            {/* ── WhatsApp CTA ── */}
            <motion.a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              transition={sp}
              className="group relative flex items-center justify-between gap-3 px-6 py-4.5 rounded-3xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #16a34a, #15803d)',
                boxShadow: '0 8px 28px rgba(22,163,74,0.35)',
                textDecoration: 'none',
              }}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }} />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white/15 backdrop-blur-sm">
                  <MessageCircle className="w-5 h-5 text-white fill-white/20" />
                </div>
                <div>
                  <p className="text-white font-bold text-[14.5px] leading-none" style={{ letterSpacing: '-0.02em' }}>
                    Join Official WhatsApp Channel
                  </p>
                  <p className="text-white/60 text-[11.5px] mt-0.5">
                    Stay updated with ward announcements
                  </p>
                </div>
              </div>

              <ArrowUpRight className="w-5 h-5 text-white/60 relative z-10 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}