'use client'

import { useState, useMemo, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search, Zap, Lightbulb, Link2, X, ChevronRight,
  ArrowUpRight, Users, Heart, Globe, FileText,
  CheckCircle, Droplet, Stethoscope, PlusSquare,
  BookOpen, Bell, Download, HeartHandshake,
  BookMarked, Briefcase, Leaf, Gift, ExternalLink,
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const quickServices = [
  { icon: FileText,      title: 'File a Complaint',       description: 'Submit civic issues directly to the ward office.', accent: '#3b82f6', tag: 'Civic',    href: '/services/file-complaint' },
  { icon: CheckCircle,   title: 'Track Complaint',        description: 'Follow up on your submitted complaints live.',      accent: '#8b5cf6', tag: 'Status',   href: '/services/track-complaint' },
  { icon: HeartHandshake,title: 'Request Blood',          description: 'Emergency blood requests, responded within 1hr.',   accent: '#ef4444', tag: 'Urgent',   href: '/services/blood-bank', badge: 'Urgent' },
  { icon: Droplet,       title: 'Donate Blood',           description: 'Register as a donor and save lives.',               accent: '#f43f5e', tag: 'Health',   href: '/services/blood-bank' },
  { icon: Heart,         title: 'Welfare Schemes',        description: 'Apply for government benefit programs.',             accent: '#ec4899', tag: 'Benefits', href: '/services/welfare-schemes' },
  { icon: Stethoscope,   title: 'Health Services',        description: 'Public health programs and consultations.',          accent: '#10b981', tag: 'Health',   href: '/services/health' },
  { icon: Users,         title: 'Volunteer',              description: 'Join the Ezhara volunteer community.',              accent: '#06b6d4', tag: 'Community',href: '/services/volunteer' },
  { icon: PlusSquare,    title: 'Emergency Contact',      description: '24/7 ward emergency helpline.',                     accent: '#f97316', tag: '24/7',     href: '/services/emergency-contacts', badge: '24/7' },
  { icon: BookMarked,    title: 'Sakshyapathram',         description: 'Request official ward certificates.',               accent: '#6366f1', tag: 'Docs',     href: '/services/sakshyapathram' },
  { icon: Droplet,       title: 'Blood Bank',             description: 'Browse live blood inventory by type.',              accent: '#dc2626', tag: 'Health',   href: '/services/blood-bank' },
  { icon: Download,      title: 'Download Certificates',  description: 'Access and download official documents.',           accent: '#d97706', tag: 'Docs',     href: '/services/certificates' },
  { icon: Bell,          title: 'Announcements',          description: 'Ward news, updates and alerts.',                   accent: '#0ea5e9', tag: 'News',     href: '/services/announcements' },
]

const initiatives = [
  { icon: Zap,        title: 'Make in Ezhara',        subtitle: 'Startup Programs',      description: 'Register your business and access startup support, mentorship, and funding.', accent: '#f59e0b', href: '#' },
  { icon: BookOpen,   title: 'Apply Scholarship',     subtitle: 'Education Support',     description: 'Financial assistance for students pursuing higher education.', accent: '#6366f1', href: '#' },
  { icon: Users,      title: 'Register as Volunteer', subtitle: 'Community Service',     description: 'Join our volunteer network and contribute to community development.', accent: '#06b6d4', href: '#' },
  { icon: Heart,      title: 'Financial Assistance',  subtitle: 'Support Programs',      description: 'Get aid for emergency situations, medical expenses and personal hardships.', accent: '#f43f5e', href: '#' },
  { icon: Leaf,       title: 'Environmental Programs',subtitle: 'Green Ezhara',          description: 'Plantation drives, clean-up campaigns and sustainable initiatives.', accent: '#10b981', href: '#' },
  { icon: Briefcase,  title: 'Jobs & Training',       subtitle: 'Employment',            description: 'Explore job openings and professional training programs in Kannur.', accent: '#f97316', href: '#' },
  { icon: Zap,        title: 'Future Skill Academy',  subtitle: 'Professional Dev',      description: 'Advanced training in emerging tech to prepare youth for tomorrow.', accent: '#a855f7', href: '#' },
  { icon: Gift,       title: 'Donate for a Cause',    subtitle: 'Community Support',     description: 'Every contribution makes a real difference in Ward 34.', accent: '#3b82f6', href: '/donate' },
]

const usefulLinksData = [
  { name: 'Events & Campaigns',     category: 'Ward Services',    emoji: '📅', href: '#' },
  { name: 'Social Welfare Schemes', category: 'Ward Services',    emoji: '🤝', href: '#' },
  { name: 'Download Certificate',   category: 'Ward Services',    emoji: '📄', href: '#' },
  { name: 'Track Certificate',      category: 'Ward Services',    emoji: '🔍', href: '#' },
  { name: 'Aadhar Service',         category: 'State Resources',  emoji: '🆔', href: '#' },
  { name: 'Kerala Info Center',     category: 'State Resources',  emoji: 'ℹ️', href: '#' },
  { name: 'State Portal',           category: 'State Resources',  emoji: '🌐', href: '#' },
  { name: 'Kerala Startup Mission', category: 'State Resources',  emoji: '🚀', href: '#' },
  { name: 'Government of India',    category: 'National Portals', emoji: '🏛️', href: '#' },
  { name: 'Income Tax',             category: 'National Portals', emoji: '📊', href: '#' },
  { name: 'Startup India',          category: 'National Portals', emoji: '💼', href: '#' },
  { name: 'Central Services',       category: 'National Portals', emoji: '⚙️', href: '#' },
]

/* ─────────────────────────────────────────────
   TAB CONFIG
───────────────────────────────────────────── */
const tabs = [
  { id: 'quick-services', label: 'Quick Services', shortLabel: 'Services',   icon: Zap,       accent: '#3b82f6', description: 'Essential civic services for every resident' },
  { id: 'initiatives',    label: 'Initiatives',    shortLabel: 'Initiatives',icon: Lightbulb, accent: '#a855f7', description: 'Programs led by Councilor Faslim T.P.' },
  { id: 'useful-links',   label: 'Useful Links',   shortLabel: 'Links',      icon: Link2,     accent: '#10b981', description: 'Government portals & official resources' },
]

const heroStats = [
  { icon: Zap,   value: '50+',    label: 'Services'  },
  { icon: Users, value: '4,200+', label: 'Residents' },
  { icon: Heart, value: '120+',   label: 'Donors'    },
  { icon: Globe, value: '18',     label: 'Schemes'   },
]

/* ─────────────────────────────────────────────
   CARD COMPONENTS
───────────────────────────────────────────── */

/** Quick Services — horizontal list-style rows */
function QuickServiceRow({ s, i }: { s: typeof quickServices[0]; i: number }) {
  const Icon = s.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={s.href}>
        <motion.div
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="group flex items-center gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-200 cursor-pointer"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          {/* Icon */}
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
            style={{ background: `${s.accent}12`, border: `1px solid ${s.accent}25` }}
          >
            <Icon className="w-5 h-5" style={{ color: s.accent }} />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-slate-800 font-bold text-[13.5px] leading-snug">{s.title}</p>
              {s.badge && (
                <span
                  className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-lg"
                  style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}25` }}
                >
                  {s.badge}
                </span>
              )}
            </div>
            <p className="text-slate-400 text-[12px] mt-0.5 truncate">{s.description}</p>
          </div>

          {/* Tag + arrow */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span
              className="hidden sm:block text-[10px] font-bold px-2 py-0.5 rounded-lg"
              style={{ background: `${s.accent}10`, color: s.accent }}
            >
              {s.tag}
            </span>
            <ArrowUpRight
              className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

/** Initiatives — compact card grid */
function InitiativeCard({ init, i }: { init: typeof initiatives[0]; i: number }) {
  const Icon = init.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={init.href} className="block h-full">
        <motion.div
          whileHover={{ y: -4, scale: 1.015 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 380, damping: 24 }}
          className="group relative flex flex-col h-full bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
          style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
        >
          {/* Top accent bar that slides in */}
          <div
            className="absolute top-0 left-0 right-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
            style={{ background: `linear-gradient(90deg, ${init.accent}, ${init.accent}55)` }}
          />

          <div className="p-5 flex flex-col flex-1 gap-3">
            {/* Icon row */}
            <div className="flex items-start justify-between">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                style={{ background: `${init.accent}12`, border: `1.5px solid ${init.accent}28` }}
              >
                <Icon className="w-5 h-5" style={{ color: init.accent }} />
              </div>
              <span
                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
                style={{ color: init.accent, background: `${init.accent}10`, border: `1px solid ${init.accent}20` }}
              >
                {init.subtitle}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="text-slate-900 font-bold text-[14px] leading-snug mb-1.5">{init.title}</h3>
              <p className="text-slate-400 text-[12px] leading-relaxed">{init.description}</p>
            </div>

            {/* CTA */}
            <div
              className="flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-200 text-[12px] font-bold mt-1"
              style={{ color: init.accent }}
            >
              Know More
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          {/* Hover bottom wash */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ background: `radial-gradient(ellipse at 50% 110%, ${init.accent}08, transparent 65%)` }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

/** Useful Links — grouped by category */
function UsefulLinksGrid({ links }: { links: typeof usefulLinksData }) {
  const categoryAccents: Record<string, string> = {
    'Ward Services':    '#3b82f6',
    'State Resources':  '#10b981',
    'National Portals': '#f59e0b',
  }
  const grouped = links.reduce<Record<string, typeof usefulLinksData>>((acc, l) => {
    if (!acc[l.category]) acc[l.category] = []
    acc[l.category].push(l)
    return acc
  }, {})

  if (links.length === 0) return null

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {Object.entries(grouped).map(([cat, items], ci) => {
        const accent = categoryAccents[cat] ?? '#3b82f6'
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: ci * 0.08 }}
          >
            {/* Category header */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${accent}60, transparent)` }} />
              <span
                className="text-[10px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-xl"
                style={{ color: accent, background: `${accent}10`, border: `1px solid ${accent}22` }}
              >
                {cat}
              </span>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            {/* Link rows */}
            <div className="flex flex-col gap-2">
              {items.map((link, li) => (
                <motion.div
                  key={li}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: ci * 0.06 + li * 0.04 }}
                >
                  <Link href={link.href}>
                    <motion.div
                      whileHover={{ x: 3 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="group flex items-center gap-3 p-3.5 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-[16px] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        {link.emoji}
                      </div>
                      <span className="flex-1 text-slate-700 font-semibold text-[13px]">{link.name}</span>
                      <ExternalLink
                        className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        style={{ color: accent }}
                      />
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState('quick-services')
  const [searchQuery, setSearchQuery] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)
  const active = tabs.find(t => t.id === activeTab)!

  const filteredQuick = useMemo(() => {
    if (!searchQuery.trim()) return quickServices
    const q = searchQuery.toLowerCase()
    return quickServices.filter(s =>
      s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredInit = useMemo(() => {
    if (!searchQuery.trim()) return initiatives
    const q = searchQuery.toLowerCase()
    return initiatives.filter(i =>
      i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.subtitle.toLowerCase().includes(q)
    )
  }, [searchQuery])

  const filteredLinks = useMemo(() => {
    if (!searchQuery.trim()) return usefulLinksData
    const q = searchQuery.toLowerCase()
    return usefulLinksData.filter(l => l.name.toLowerCase().includes(q) || l.category.toLowerCase().includes(q))
  }, [searchQuery])

  const countMap: Record<string, number> = {
    'quick-services': filteredQuick.length,
    initiatives: filteredInit.length,
    'useful-links': filteredLinks.length,
  }

  function switchTab(id: string) {
    setActiveTab(id)
    setSearchQuery('')
    setTimeout(() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  return (
    <main className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}>
      <Header />

      {/* ══════════ HEADER — flat, clean, no gradient ══════════ */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-12 pb-10">

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px w-6 bg-slate-300" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Ezhara Division 34 · Citizen Services
                </span>
              </div>

              {/* Headline */}
              <h1
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', letterSpacing: '-0.04em' }}
              >
                All Services,{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-transparent bg-clip-text"
                    style={{ backgroundImage: `linear-gradient(90deg, ${active.accent}, ${active.accent}99)` }}
                  >
                    One Place
                  </motion.span>
                </AnimatePresence>
              </h1>

              <p className="text-slate-400 text-[15px] max-w-lg leading-relaxed mb-7">
                Every government scheme, welfare program, and civic service for Ward 34 — organized and one click away.
              </p>

              {/* Search */}
              <div className="max-w-xl group">
                <div
                  className="relative flex items-center rounded-2xl border bg-slate-50 overflow-hidden transition-all duration-300 border-slate-200 group-focus-within:border-slate-300 group-focus-within:bg-white group-focus-within:shadow-lg"
                >
                  <Search className="absolute left-4 w-4 h-4 text-slate-400 pointer-events-none flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search services, programs, portals…"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent pl-11 pr-4 py-3.5 text-[14px] text-slate-800 placeholder-slate-400 outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mr-3 flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-400 hover:text-slate-700 border border-slate-200 hover:border-slate-300 bg-white transition-all"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>

                {/* Quick pills */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  <span className="text-slate-400 text-[11px] self-center">Try:</span>
                  {['Blood Bank', 'Scholarship', 'Welfare', 'Certificates', 'Volunteer'].map(pill => (
                    <button
                      key={pill}
                      onClick={() => setSearchQuery(pill)}
                      className="px-2.5 py-1 rounded-xl text-[11px] font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200"
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats — desktop only */}
            <div className="hidden lg:grid grid-cols-2 gap-2.5 min-w-[220px]">
              {heroStats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    className="flex flex-col gap-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                  >
                    <Icon className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-900 font-black text-[1.4rem] leading-none" style={{ letterSpacing: '-0.04em' }}>
                      {stat.value}
                    </span>
                    <span className="text-slate-400 text-[10px] font-semibold uppercase tracking-widest">{stat.label}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ CONTENT AREA ══════════ */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8">
        <div className="flex gap-8 items-start">

          {/* ── Sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-1.5 w-[210px] flex-shrink-0 sticky top-[88px]">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 px-3 mb-1">Browse by</p>

            {tabs.map(tab => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => switchTab(tab.id)}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 28 }}
                  className="relative flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left transition-all duration-200"
                  style={{
                    background: isActive ? `${tab.accent}10` : 'transparent',
                    border: isActive ? `1px solid ${tab.accent}25` : '1px solid transparent',
                  }}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-r-full" style={{ background: tab.accent }} />
                  )}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: isActive ? `${tab.accent}18` : '#f8fafc',
                      border: `1px solid ${isActive ? tab.accent + '28' : '#e2e8f0'}`,
                    }}
                  >
                    <Icon className="w-4 h-4" style={{ color: isActive ? tab.accent : '#94a3b8' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold" style={{ color: isActive ? '#0f172a' : '#64748b' }}>
                      {tab.label}
                    </p>
                    <p className="text-[11px] text-slate-400">{countMap[tab.id]} available</p>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: tab.accent, opacity: isActive ? 1 : 0 }} />
                </motion.button>
              )
            })}

            <div className="h-px bg-slate-200 my-2 mx-2" />

            <div className="mx-0.5 p-4 rounded-2xl bg-white border border-slate-200">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide mb-1.5">Need help?</p>
              <p className="text-[12px] text-slate-400 leading-relaxed mb-2.5">Can't find a service? Contact the ward office.</p>
              <Link href="/contact" className="flex items-center gap-1.5 text-[12px] font-bold" style={{ color: active.accent }}>
                Get in touch <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Mobile tab pills */}
            <div className="lg:hidden flex items-center gap-2 overflow-x-auto scrollbar-none mb-6 pb-1">
              {tabs.map(tab => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => switchTab(tab.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl whitespace-nowrap border transition-all duration-200 flex-shrink-0"
                    style={{
                      background: isActive ? `${tab.accent}10` : 'white',
                      border: isActive ? `1.5px solid ${tab.accent}35` : '1.5px solid #e2e8f0',
                      boxShadow: isActive ? `0 2px 12px ${tab.accent}18` : '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color: isActive ? tab.accent : '#94a3b8' }} />
                    <span className="text-[12.5px] font-semibold" style={{ color: isActive ? '#0f172a' : '#64748b' }}>
                      {tab.shortLabel}
                    </span>
                    <span
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                      style={{ background: isActive ? `${tab.accent}15` : '#f1f5f9', color: isActive ? tab.accent : '#94a3b8' }}
                    >
                      {countMap[tab.id]}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Content header */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab + '-head'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-between mb-5"
              >
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <active.icon className="w-3.5 h-3.5" style={{ color: active.accent }} />
                    <span className="text-[11px] font-bold uppercase tracking-[0.1em]" style={{ color: active.accent }}>
                      {active.label}
                    </span>
                  </div>
                  <h2 className="text-slate-900 font-black" style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)', letterSpacing: '-0.03em' }}>
                    {active.description}
                  </h2>
                </div>
                {searchQuery && (
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-[12px] text-slate-400">
                      <strong className="text-slate-600">{countMap[activeTab]}</strong> for "{searchQuery}"
                    </span>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg border border-slate-200 bg-white transition-all"
                    >
                      <X className="w-3 h-3" /> Clear
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                {countMap[activeTab] === 0 ? (
                  <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-4 text-2xl">🔍</div>
                    <h3 className="text-slate-800 font-bold text-[16px] mb-1.5">No results found</h3>
                    <p className="text-slate-400 text-[13px] max-w-[260px]">
                      Nothing in <strong className="text-slate-600">{active.label}</strong> matched "{searchQuery}".
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="mt-4 px-5 py-2.5 rounded-xl text-[13px] font-semibold text-slate-600 border border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm transition-all"
                    >
                      Clear search
                    </button>
                  </div>
                ) : activeTab === 'quick-services' ? (
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {filteredQuick.map((s, i) => <QuickServiceRow key={i} s={s} i={i} />)}
                  </div>
                ) : activeTab === 'initiatives' ? (
                  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3.5">
                    {filteredInit.map((init, i) => <InitiativeCard key={i} init={init} i={i} />)}
                  </div>
                ) : (
                  <UsefulLinksGrid links={filteredLinks} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  )
}