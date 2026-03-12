'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Rocket, Laptop, Leaf, GraduationCap,
  Heart, Briefcase, ArrowUpRight, Sparkles,
} from 'lucide-react'

const initiatives = [
  {
    id: 1,  num: '01', tag: 'EYIS Project',   icon: Rocket,
    title: 'Make in\nEzhara',          kicker: 'Startup Incubation',
    desc:  'Register your local business and access our Startup Incubator Desk, co-working spaces, and free Wi-Fi.',
    accent: '#1d4ed8', light: '#dbeafe', muted: '#eff6ff', href: '#',
  },
  {
    id: 2,  num: '02', tag: 'EYIS Project',   icon: Laptop,
    title: 'Future Skill\nAcademy',    kicker: 'Digital Skilling',
    desc:  'Computer courses, Spoken English, and a modern Mini Library — sharpen skills that open new doors.',
    accent: '#7c3aed', light: '#ede9fe', muted: '#f5f3ff', href: '#',
  },
  {
    id: 3,  num: '03', tag: 'Sustainability',  icon: Leaf,
    title: 'Green\nEzhara',            kicker: 'Environment & Farming',
    desc:  'Vertical farming, hydroponics training, and ward-wide zero-waste campaigns for a greener tomorrow.',
    accent: '#065f46', light: '#d1fae5', muted: '#ecfdf5', href: '#',
  },
  {
    id: 4,  num: '04', tag: 'Education',       icon: GraduationCap,
    title: 'Student\nScholarships',    kicker: 'Higher Education Fund',
    desc:  'Empowering the next generation through comprehensive scholarship support and mentorship.',
    accent: '#b45309', light: '#fef3c7', muted: '#fffbeb', href: '#',
    donate: { label: 'Donate for Education', href: '#donate-education' },
  },
  {
    id: 5,  num: '05', tag: 'Welfare',         icon: Heart,
    title: 'Family\nWelfare Fund',     kicker: 'Emergency Aid',
    desc:  'Medical and emergency financial support for vulnerable families when they need it most.',
    accent: '#be123c', light: '#ffe4e6', muted: '#fff1f2', href: '#',
    donate: { label: 'Donate for Families', href: '#donate-families' },
  },
  {
    id: 6,  num: '06', tag: 'Employment',      icon: Briefcase,
    title: 'Local\nEmployment Board',  kicker: 'Jobs & Placement',
    desc:  'Connecting local talent with local businesses through training camps and ward-level placement drives.',
    accent: '#1e3a5f', light: '#dbeafe', muted: '#f0f9ff', href: '#',
  },
]

function InitiativeCard({ item, i }: { item: typeof initiatives[0]; i: number }) {
  const [hovered, setHovered] = useState(false)
  const Icon = item.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl"
      style={{
        background: hovered ? item.muted : '#ffffff',
        border: `1.5px solid ${hovered ? item.accent + '35' : '#e2e8f0'}`,
        boxShadow: hovered
          ? `0 20px 56px ${item.accent}1a, 0 4px 16px rgba(0,0,0,0.06)`
          : '0 1px 4px rgba(0,0,0,0.05)',
        transition: 'background 0.3s, border-color 0.25s, box-shadow 0.35s',
      }}
    >
      {/* Corner diagonal wash */}
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none overflow-hidden"
        style={{ borderRadius: '0 1.5rem 0 0' }}>
        <motion.div
          animate={{ opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'absolute', top: 0, right: 0, width: '100%', height: '100%',
            background: `linear-gradient(225deg, ${item.accent}1e 0%, transparent 62%)`,
          }}
        />
      </div>

      {/* Top rule — slides in */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px]"
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        initial={{ scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: `linear-gradient(90deg, ${item.accent}, ${item.accent}55)`,
          transformOrigin: 'left',
        }}
      />

      <div className="relative z-10 flex flex-col h-full p-7 gap-4">
        {/* Tag + icon */}
        <div className="flex items-start justify-between">
          <span className="text-[10.5px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
            style={{ color: item.accent, background: item.light, border: `1px solid ${item.accent}22` }}>
            {item.tag}
          </span>
          <motion.div
            animate={{ rotate: hovered ? 10 : 0, scale: hovered ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 360, damping: 26 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              background: hovered ? item.accent : item.light,
              border: `1.5px solid ${hovered ? 'transparent' : item.accent + '30'}`,
              transition: 'background 0.2s, border-color 0.2s',
            }}
          >
            <Icon className="w-5 h-5 transition-colors duration-200"
              style={{ color: hovered ? '#fff' : item.accent }} />
          </motion.div>
        </div>

        {/* Big index number */}
        <div className="font-black tabular-nums select-none leading-none"
          style={{
            fontSize: '3.2rem',
            letterSpacing: '-0.07em',
            color: hovered ? `${item.accent}1e` : '#f1f5f9',
            transition: 'color 0.3s',
          }}>
          {item.num}
        </div>

        {/* Kicker + title */}
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] mb-2"
            style={{ color: item.accent }}>{item.kicker}</p>
          <h3 className="font-black leading-[1.04] text-slate-900"
            style={{ fontSize: 'clamp(1.3rem, 2.2vw, 1.6rem)', letterSpacing: '-0.04em', whiteSpace: 'pre-line' }}>
            {item.title}
          </h3>
        </div>

        {/* Divider */}
        <div className="h-px w-full transition-colors duration-300"
          style={{ background: hovered ? `${item.accent}28` : '#f1f5f9' }} />

        {/* Description */}
        <p className="text-[13.5px] leading-relaxed text-slate-500 flex-1">{item.desc}</p>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 mt-auto pt-1">
          {item.donate && (
            <a href={item.donate.href}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-bold transition-all duration-200"
              style={{ color: item.accent, border: `1.5px solid ${item.accent}30`, background: item.light }}>
              <Heart className="w-3.5 h-3.5 fill-current" />
              {item.donate.label}
            </a>
          )}
          <Link href={item.href}>
            <motion.div
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
              className="group/cta flex items-center justify-between w-full py-3 px-4 rounded-xl text-[13.5px] font-bold transition-all duration-200"
              style={{
                color: hovered ? '#fff' : item.accent,
                background: hovered ? item.accent : `${item.accent}0f`,
                border: `1.5px solid ${hovered ? item.accent : item.accent + '28'}`,
              }}
            >
              <span>Explore Initiative</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function InitiativesGrid() {
  return (
    <section className="relative overflow-hidden py-20 px-5 sm:px-8 lg:px-12"
      style={{ background: '#f8fafc', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Dot grid texture */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #cbd5e1 1px, transparent 0)',
          backgroundSize: '28px 28px', opacity: 0.45,
        }} />
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-slate-900" />
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
              Ward 34 · Active Programs
            </span>
          </div>
          <div className="grid lg:grid-cols-[1fr_auto] items-end gap-8">
            <h2 className="text-slate-900 font-black leading-[0.95]"
              style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', letterSpacing: '-0.055em' }}>
              Our Flagship<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(100deg, #1d4ed8 0%, #7c3aed 55%, #065f46 100%)' }}>
                Initiatives.
              </span>
            </h2>
            <div className="lg:text-right">
              <p className="text-[14px] text-slate-400 leading-relaxed lg:max-w-[220px]">
                {initiatives.length} active programs shaping the future of Ezhara.
              </p>
              <div className="flex lg:justify-end flex-wrap gap-1.5 mt-3">
                {['Startups', 'Green', 'Welfare', 'Education', 'Jobs'].map((tag, i) => (
                  <span key={i} className="text-[10.5px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {initiatives.map((item, i) => (
            <InitiativeCard key={item.id} item={item} i={i} />
          ))}
        </div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-5 px-7 py-5 rounded-2xl bg-white border border-slate-200"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 flex-shrink-0">
              <Sparkles className="w-5 h-5 text-slate-500" />
            </div>
            <div>
              <p className="text-slate-900 font-bold text-[14.5px]" style={{ letterSpacing: '-0.02em' }}>
                Have an idea for a new initiative?
              </p>
              <p className="text-slate-400 text-[12.5px] mt-0.5">
                Submit a proposal to the Ward Office or contact the Councilor directly.
              </p>
            </div>
          </div>
          <a href="#contact"
            className="group flex items-center gap-2.5 px-6 py-3 rounded-xl text-[13.5px] font-bold bg-slate-900 text-white flex-shrink-0 hover:bg-slate-700 transition-colors duration-200">
            Submit a Proposal
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </section>
  )
}