'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Heart, Shield, Users, TrendingUp, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react'

/* ── Stats ──────────────────────────────────────────── */
const stats = [
  { value: '500+', label: 'Students Supported', icon: Users,      color: '#8b5cf6' },
  { value: '₹50L+', label: 'Funds Distributed',  icon: TrendingUp, color: '#10b981' },
  { value: '98%',   label: 'Reach to Needy',     icon: Heart,      color: '#ef4444' },
]

/* ── Trust pillars ──────────────────────────────────── */
const trust = [
  { icon: Lock,         text: 'SSL-Secured Payments'      },
  { icon: Shield,       text: '100% Transparent Reporting' },
  { icon: CheckCircle2, text: 'Ward-Verified Disbursement' },
]

/* ── Donation amounts ───────────────────────────────── */
const amounts = [100, 250, 500, 1000]

export default function DonationBanner() {
  const [selected, setSelected] = useState<number | null>(500)
  const [custom, setCustom]     = useState('')

  return (
    <section
      className="relative overflow-hidden py-20 px-5 sm:px-8 lg:px-12"
      style={{ background: '#080810', fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      {/* ── Background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Central crimson haze */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.11) 0%, transparent 70%)' }} />
        {/* Top-right accent */}
        <div className="absolute -top-20 right-0 w-[500px] h-[400px] rounded-full blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, rgba(239,68,68,0.08) 0%, transparent 70%)' }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '52px 52px',
        }} />
        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px',
        }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      </div>

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section label ── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#ef4444,transparent)' }} />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em]"
            style={{ color: 'rgba(239,68,68,0.7)' }}>
            Community Fund
          </span>
        </motion.div>

        {/* ── Main layout: left copy + right donation card ── */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 lg:gap-14 items-start">

          {/* ─── LEFT: Copy ─── */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="text-white font-black leading-[0.95] mb-6"
              style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.8rem)', letterSpacing: '-0.055em' }}
            >
              Support the
              <br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(100deg, #fca5a5 0%, #ef4444 45%, #f97316 100%)' }}>
                Ezhara Vision.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="text-[15px] leading-relaxed mb-8 max-w-lg"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              Your contributions power our education and welfare programs.
              100% transparent, 100% local. Every rupee directly supports
              initiatives that transform lives across Ward 34.
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="flex flex-wrap gap-2.5 mb-12"
            >
              {trust.map(({ icon: Icon, text }, i) => (
                <div key={i}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[12px] font-semibold"
                  style={{
                    color: 'rgba(255,255,255,0.55)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                  }}>
                  <Icon className="w-3.5 h-3.5 text-green-400" />
                  {text}
                </div>
              ))}
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-3 gap-px rounded-2xl overflow-hidden"
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              {stats.map(({ value, label, icon: Icon, color }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.36 + i * 0.08 }}
                  className="flex flex-col items-center gap-2 py-6 px-4 text-center"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  <Icon className="w-4 h-4 mb-1" style={{ color }} />
                  <p className="font-black leading-none text-white"
                    style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', letterSpacing: '-0.04em' }}>
                    {value}
                  </p>
                  <p className="text-[11.5px] font-medium" style={{ color: 'rgba(255,255,255,0.35)' }}>
                    {label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: Donation card ─── */}
          <motion.div
            initial={{ opacity: 0, x: 28, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:sticky lg:top-24 rounded-3xl overflow-hidden"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(255,255,255,0.1)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {/* Card top bar */}
            <div className="h-[3px] w-full"
              style={{ background: 'linear-gradient(90deg, #ef4444, #f97316 60%, transparent)' }} />

            <div className="p-7">
              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)' }}>
                  <Heart className="w-5 h-5 text-red-400 fill-red-400/30" />
                </div>
                <div>
                  <p className="text-white font-bold text-[15px]" style={{ letterSpacing: '-0.02em' }}>
                    Make a Donation
                  </p>
                  <p className="text-[12px] mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Secure · Transparent · Local
                  </p>
                </div>
              </div>

              {/* Amount selector */}
              <div className="mb-5">
                <label className="text-[11px] font-bold uppercase tracking-[0.1em] block mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Select Amount (₹)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {amounts.map(amt => {
                    const isSelected = selected === amt && !custom
                    return (
                      <motion.button
                        key={amt}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setSelected(amt); setCustom('') }}
                        className="py-3 rounded-xl text-[13.5px] font-bold transition-all duration-200"
                        style={{
                          background: isSelected ? 'linear-gradient(135deg,#dc2626,#b91c1c)' : 'rgba(255,255,255,0.06)',
                          border: isSelected ? '1.5px solid transparent' : '1.5px solid rgba(255,255,255,0.1)',
                          color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.5)',
                          boxShadow: isSelected ? '0 4px 16px rgba(220,38,38,0.4)' : 'none',
                        }}
                      >
                        ₹{amt}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Custom input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13.5px] font-bold"
                    style={{ color: 'rgba(255,255,255,0.35)' }}>₹</span>
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={custom}
                    onChange={e => { setCustom(e.target.value); setSelected(null) }}
                    className="w-full h-11 pl-8 pr-4 rounded-xl text-[13.5px] font-semibold text-white placeholder-white/25 outline-none transition-all duration-200"
                    style={{
                      background: custom ? 'rgba(220,38,38,0.1)' : 'rgba(255,255,255,0.05)',
                      border: custom ? '1.5px solid rgba(220,38,38,0.5)' : '1.5px solid rgba(255,255,255,0.1)',
                    }}
                    onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(220,38,38,0.5)'; (e.currentTarget as HTMLElement).style.background = 'rgba(220,38,38,0.08)' }}
                    onBlur={e => { if (!custom) { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)' } }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="h-px my-5" style={{ background: 'rgba(255,255,255,0.07)' }} />

              {/* What your donation does */}
              <div className="mb-5">
                <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-3"
                  style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Your Impact
                </p>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected ?? custom}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-start gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.16)' }}
                  >
                    <Sparkles className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <p className="text-[12.5px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {(custom && Number(custom) >= 1000) || selected === 1000
                        ? 'Funds a full month of skill training for one local youth.'
                        : selected === 500 || (custom && Number(custom) >= 500)
                        ? 'Covers textbooks and materials for two students for a semester.'
                        : selected === 250 || (custom && Number(custom) >= 250)
                        ? 'Provides emergency grocery aid for one vulnerable family.'
                        : 'Supports one student with stationery and learning materials.'}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Donate button */}
              <motion.button
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className="group relative w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-[15.5px] text-white overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                  boxShadow: '0 10px 36px rgba(220,38,38,0.45)',
                }}
              >
                {/* Shimmer sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)' }} />
                <Heart className="w-5 h-5 fill-white/25 relative z-10" />
                <span className="relative z-10">
                  Donate {custom ? `₹${custom}` : selected ? `₹${selected}` : 'Now'}
                </span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </motion.button>

              {/* Fine print */}
              <p className="text-center mt-3.5 text-[11.5px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.2)' }}>
                Payments are processed securely. All funds are publicly reported.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>
    </section>
  )
}