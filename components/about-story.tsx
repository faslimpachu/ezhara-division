'use client'

import { motion } from 'framer-motion'
import { Waves, BookOpen, Landmark, Rocket } from 'lucide-react'

const pillars = [
  {
    icon: Waves,
    label: 'Coastal Serenity',
    desc: 'Experience the untouched beauty of the Ezhara coastline — a perfect escape right in our backyard.',
    accent: '#06b6d4',
    glow: 'rgba(6,182,212,0.12)',
  },
  {
    icon: BookOpen,
    label: 'Cultural Vibrancy',
    desc: 'Home to Sargotsav and dynamic community festivals celebrating the artistic brilliance of our residents.',
    accent: '#818cf8',
    glow: 'rgba(129,140,248,0.12)',
  },
  {
    icon: Landmark,
    label: 'Rich Heritage',
    desc: 'Centuries-old traditions and institutions that continue to define our community identity.',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.12)',
  },
  {
    icon: Rocket,
    label: 'Smart Ward',
    desc: 'Grassroots digital governance in action — setting a new standard for civic services in Kerala.',
    accent: '#34d399',
    glow: 'rgba(52,211,153,0.12)',
  },
]

const sp = { type: 'spring', stiffness: 380, damping: 28 } as const

export default function AboutStory() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#080810', fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif" }}
    >
      {/* ── Background layers ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-40 left-1/3 w-[700px] h-[600px]" style={{
          background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px]" style={{
          background: 'radial-gradient(ellipse, rgba(129,140,248,0.06) 0%, transparent 65%)',
          filter: 'blur(40px)',
        }} />
        <div className="absolute inset-0 opacity-[0.022]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }} />
        <div className="absolute inset-0 opacity-[0.032]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: '250px 250px',
        }} />
        <div className="absolute top-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent)' }} />
        <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent)' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 items-start">

          {/* ── LEFT: Story ── */}
          <div>
            {/* Section label */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="h-px w-8" style={{ background: 'linear-gradient(90deg,#06b6d4,transparent)' }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]"
                style={{ color: 'rgba(6,182,212,0.7)' }}>
                Our Story
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-black leading-[0.93] mb-10"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', letterSpacing: '-0.05em' }}
            >
              <span className="text-white">Where Heritage</span>
              <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(100deg,#a5f3fc 0%,#06b6d4 45%,#0891b2 100%)' }}
              >
                Meets Innovation.
              </span>
            </motion.h2>

            {/* Body paragraphs */}
            {[
              `Situated along the stunning coastline of Kannur Corporation, Ezhara (Division 34) is a community defined by its natural beauty, rich cultural heritage, and progressive spirit. From pristine beaches to esteemed institutions like Al Madrasathul Islahiya, Ezhara has always been a hub of community and learning.`,
              `Today, we're taking a bold step into the future. Under a new era of digital governance, we're transforming Ezhara into a Smart Ward — where civic services are just a click away, streets are fully illuminated, and our youth are empowered to lead.`,
              `Under the visionary leadership of Councilor Faslim T.P., Division 34 has emerged as a pioneer in digital governance, transforming civic services while preserving its rich cultural identity.`,
            ].map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.14 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="leading-relaxed mb-5 last:mb-0"
                style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.8 }}
              >
                {para}
              </motion.p>
            ))}

            {/* Quote pull */}
            <motion.blockquote
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-10 pl-5 relative"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full"
                style={{ background: 'linear-gradient(180deg,#06b6d4,rgba(6,182,212,0.1))' }} />
              <p className="font-semibold leading-relaxed"
                style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', letterSpacing: '-0.01em', lineHeight: 1.7 }}>
                "From sustainable fishing communities to world-class educational institutions — Ezhara is a testament to what dedicated local governance can achieve."
              </p>
            </motion.blockquote>
          </div>

          {/* ── RIGHT: Pillar cards ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-0"
            style={{
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.5rem',
              overflow: 'hidden',
            }}
          >
            {pillars.map((p, i) => {
              const Icon = p.icon
              const isRight = i % 2 === 1
              const isBottom = i >= 2
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.08 }}
                  className="group relative flex flex-col gap-5 p-7"
                  style={{
                    background: 'rgba(255,255,255,0.025)',
                    borderRight: !isRight ? '1px solid rgba(255,255,255,0.07)' : 'none',
                    borderBottom: !isBottom ? '1px solid rgba(255,255,255,0.07)' : 'none',
                  }}
                >
                  {/* Corner hover glow */}
                  <div
                    className="absolute top-0 left-0 w-20 h-20 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 0%,${p.glow.replace('0.12', '0.25')},transparent 60%)` }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0"
                    style={{
                      background: p.glow,
                      border: `1px solid ${p.accent}30`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color: p.accent }} />
                  </div>

                  {/* Text */}
                  <div>
                    <p
                      className="font-black mb-2 leading-tight"
                      style={{
                        fontSize: '1rem',
                        letterSpacing: '-0.025em',
                        background: `linear-gradient(120deg,#ffffff,${p.accent})`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {p.label}
                    </p>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}
                    >
                      {p.desc}
                    </p>
                  </div>

                  {/* Bottom shimmer line on hover */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg,transparent,${p.accent}60,transparent)` }}
                  />
                </motion.div>
              )
            })}
          </motion.div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}