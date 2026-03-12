'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield, Flame, Phone, Heart, AlertTriangle, Stethoscope,
  AlertCircle, Building2, Eye, Zap, Droplet, Mail, Users,
  Building, CloudRain, Search, ArrowLeft, PhoneCall, X,
} from 'lucide-react'
import {
  emergencyContacts, categories,
  type ContactCategory,
} from '@/lib/emergency-contacts-data'

/* ── Icon map ───────────────────────────── */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Flame, Phone, Heart, AlertTriangle, Stethoscope,
  AlertCircle, Building2, Eye, Zap, Droplet, Mail, Users, Building, CloudRain,
}

/* ── Color system ───────────────────────── */
const colorSystem: Record<string, { accent: string; light: string; text: string }> = {
  red:    { accent: '#ef4444', light: 'rgba(239,68,68,0.10)',    text: '#ef4444' },
  green:  { accent: '#10b981', light: 'rgba(16,185,129,0.10)',   text: '#10b981' },
  blue:   { accent: '#3b82f6', light: 'rgba(59,130,246,0.10)',   text: '#3b82f6' },
  purple: { accent: '#8b5cf6', light: 'rgba(139,92,246,0.10)',   text: '#8b5cf6' },
  orange: { accent: '#f97316', light: 'rgba(249,115,22,0.10)',   text: '#f97316' },
}

const categoryLabels: Record<ContactCategory, string> = {
  'police-fire': 'Critical Emergencies',
  medical:       'Medical & Ambulance',
  utilities:     'Utilities & Civic',
  officials:     'Ward Officials',
  disaster:      'Disaster Management',
}

const categoryAccents: Record<ContactCategory, string> = {
  'police-fire': '#ef4444',
  medical:       '#10b981',
  utilities:     '#3b82f6',
  officials:     '#8b5cf6',
  disaster:      '#f97316',
}

export default function EmergencyDirectory() {
  const [searchQuery, setSearchQuery]     = useState('')
  const [selectedCategory, setCategory]  = useState<ContactCategory | 'all'>('all')

  const filteredContacts = useMemo(() =>
    emergencyContacts.filter(c => {
      const q = searchQuery.toLowerCase()
      const matchSearch = c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) || c.phone.includes(q)
      const matchCat = selectedCategory === 'all' || c.category === selectedCategory
      return matchSearch && matchCat
    }), [searchQuery, selectedCategory])

  const grouped = useMemo(() => {
    const g: Record<ContactCategory, typeof emergencyContacts> = {
      'police-fire': [], medical: [], utilities: [], officials: [], disaster: [],
    }
    filteredContacts.forEach(c => g[c.category].push(c))
    return g
  }, [filteredContacts])

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}
    >

      {/* ══════════ HEADER ══════════ */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-8">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-200 mb-7"
            >
              <span className="w-7 h-7 rounded-xl border border-slate-200 bg-slate-50 group-hover:bg-white group-hover:border-slate-300 flex items-center justify-center transition-all duration-200 group-hover:-translate-x-0.5">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-6 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-px w-5 bg-red-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Ezhara Division 34 · Emergency Directory
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
              >
                Emergency
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #ef4444, #f97316)' }}>
                  Contacts
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.45 }}
                className="text-slate-400 text-[15px] max-w-md leading-relaxed"
              >
                24/7 essential numbers for Ward 34. Tap any card to call immediately.
              </motion.p>
            </div>

            {/* SOS panel — desktop */}
            <motion.a
              href="tel:112"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.12, duration: 0.45 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="hidden lg:flex flex-col items-center gap-2 p-6 rounded-2xl text-white cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                boxShadow: '0 8px 32px rgba(220,38,38,0.4)',
                minWidth: 150,
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center mb-1"
              >
                <PhoneCall className="w-6 h-6" />
              </motion.div>
              <span className="font-black text-[2rem] leading-none" style={{ letterSpacing: '-0.04em' }}>112</span>
              <span className="text-white/70 text-[11px] font-bold uppercase tracking-widest">SOS · Police</span>
            </motion.a>
          </div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            className="mt-7 max-w-xl group"
          >
            <div className="relative flex items-center rounded-2xl border bg-slate-50 overflow-hidden transition-all duration-300 border-slate-200 group-focus-within:border-slate-300 group-focus-within:bg-white group-focus-within:shadow-lg">
              <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Police, Ambulance, Hospital…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent pl-11 pr-4 py-3.5 text-[14px] text-slate-800 placeholder-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 w-6 h-6 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </motion.div>
        </div>

        {/* Category filter strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.22 }}
          className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pb-0"
        >
          <div className="flex gap-1.5 overflow-x-auto scrollbar-none border-t border-slate-100 pt-4 pb-0">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id
              const accent = cat.id === 'all' ? '#64748b' : categoryAccents[cat.id as ContactCategory] ?? '#64748b'
              return (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id as ContactCategory | 'all')}
                  className="relative flex-shrink-0 px-4 py-3 text-[12.5px] font-semibold transition-colors duration-200 whitespace-nowrap"
                  style={{ color: isActive ? '#0f172a' : '#94a3b8' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="cat-underline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full"
                      style={{ background: accent }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {cat.label}
                </button>
              )
            })}
          </div>
        </motion.div>
      </div>

      {/* ══════════ CONTACT CARDS ══════════ */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <AnimatePresence mode="wait">
          {filteredContacts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 text-2xl">🔍</div>
              <h3 className="text-slate-800 font-bold text-[16px] mb-1.5">No contacts found</h3>
              <p className="text-slate-400 text-[13px] max-w-[260px]">Try a different search term or clear the filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setCategory('all') }}
                className="mt-4 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm transition-all"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {Object.entries(grouped).map(([catKey, contacts]) => {
                if (contacts.length === 0) return null
                const cat = catKey as ContactCategory
                const catAccent = categoryAccents[cat]

                return (
                  <div key={cat} className="mb-10">
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${catAccent}50, transparent)` }} />
                      <span
                        className="text-[11px] font-black uppercase tracking-[0.1em] px-3 py-1 rounded-xl flex-shrink-0"
                        style={{ color: catAccent, background: `${catAccent}12`, border: `1px solid ${catAccent}22` }}
                      >
                        {categoryLabels[cat]}
                      </span>
                      <div className="h-px flex-1 bg-slate-200" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {contacts.map((contact, i) => {
                        const Icon = iconMap[contact.icon]
                        const col = colorSystem[contact.color] ?? colorSystem.blue

                        return (
                          <motion.a
                            key={contact.id}
                            href={`tel:${contact.phone}`}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                            style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
                          >
                            {/* Left accent strip */}
                            <div
                              className="absolute left-0 top-0 bottom-0 w-[3px]"
                              style={{ background: col.accent }}
                            />

                            {/* Top bar on hover */}
                            <div
                              className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                              style={{ background: `linear-gradient(90deg, ${col.accent}, transparent)` }}
                            />

                            <div className="pl-6 pr-5 py-5 flex flex-col flex-1 gap-3">
                              {/* Icon + name */}
                              <div className="flex items-start gap-3">
                                <div
                                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                                  style={{ background: col.light, border: `1px solid ${col.accent}25` }}
                                >
                                  {Icon && <Icon className="w-5 h-5" style={{ color: col.accent } as React.CSSProperties} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-slate-900 font-bold text-[13.5px] leading-snug">{contact.name}</p>
                                  <p className="text-slate-400 text-[11.5px] mt-0.5 leading-snug">{contact.description}</p>
                                </div>
                              </div>

                              {/* Phone number */}
                              <div
                                className="py-3 border-y flex items-center gap-2"
                                style={{ borderColor: `${col.accent}18` }}
                              >
                                <PhoneCall className="w-4 h-4 flex-shrink-0" style={{ color: col.accent }} />
                                <span
                                  className="font-black text-[1.55rem] leading-none tracking-tight"
                                  style={{ color: col.accent, letterSpacing: '-0.02em' }}
                                >
                                  {contact.phone}
                                </span>
                              </div>

                              {/* Call CTA */}
                              <div
                                className="flex items-center gap-1.5 text-[12px] font-bold transition-all duration-200 group-hover:gap-2.5"
                                style={{ color: col.accent }}
                              >
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: col.accent }} />
                                Tap to call
                              </div>
                            </div>
                          </motion.a>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Floating SOS FAB — mobile ── */}
      <motion.a
        href="tel:112"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-7 right-7 z-50 lg:hidden flex flex-col items-center gap-1"
      >
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="px-2.5 py-1 rounded-xl text-[11px] font-bold text-white"
          style={{ background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)' }}
        >
          SOS · 112
        </motion.span>

        <div className="relative">
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ background: 'rgba(220,38,38,0.3)' }}
          />
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-white"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              boxShadow: '0 8px 32px rgba(220,38,38,0.5)',
            }}
          >
            <PhoneCall className="w-7 h-7" />
          </motion.div>
        </div>
      </motion.a>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}