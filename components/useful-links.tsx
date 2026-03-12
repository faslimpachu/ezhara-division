'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink, ArrowUpRight, Link2 } from 'lucide-react'

const categories = [
  {
    label: 'Ward Services',
    accent: '#3b82f6',
    links: [
      { label: 'Events & Campaigns', emoji: '📅', href: '#', tag: 'Local' },
      { label: 'Social Welfare Schemes', emoji: '🤝', href: '#', tag: 'Benefits' },
      { label: 'Download Certificate', emoji: '📄', href: '#', tag: 'Docs' },
      { label: 'Track Certificate', emoji: '🔍', href: '#', tag: 'Status' },
    ],
  },
  {
    label: 'State Resources',
    accent: '#10b981',
    links: [
      { label: 'Aadhar Service', emoji: '🆔', href: '#', tag: 'UIDAI' },
      { label: 'Kerala Info Center', emoji: 'ℹ️', href: '#', tag: 'State' },
      { label: 'State Portal', emoji: '🌐', href: '#', tag: 'Official' },
      { label: 'Kerala Startup Mission', emoji: '🚀', href: '#', tag: 'Business' },
    ],
  },
  {
    label: 'National Portals',
    accent: '#f59e0b',
    links: [
      { label: 'Government of India', emoji: '🏛️', href: '#', tag: 'Central' },
      { label: 'Income Tax', emoji: '📊', href: '#', tag: 'Finance' },
      { label: 'Startup India', emoji: '💼', href: '#', tag: 'Business' },
      { label: 'Central Services', emoji: '⚙️', href: '#', tag: 'GOI' },
    ],
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

export default function UsefulLinks() {
  return (
    <section
      className="relative py-24 px-5 sm:px-8 lg:px-12 overflow-hidden bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-amber-50 blur-3xl opacity-70" />
        <div className="absolute bottom-[-60px] left-[-40px] w-[350px] h-[350px] rounded-full bg-blue-50 blur-3xl opacity-60" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200">
              <Link2 className="w-3 h-3 text-gray-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-gray-500">Quick Links</span>
            </div>
            <h2
              className="text-gray-900 font-black leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
            >
              Portals &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Resources
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-[14px] max-w-xs leading-relaxed sm:text-right">
            Government services, schemes, and official portals — all in one place.
          </p>
        </motion.div>

        {/* Category columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              {/* Category header */}
              <div className="flex items-center gap-2.5 mb-1">
                <div className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${cat.accent}60, transparent)` }} />
                <span
                  className="text-[11px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded-lg"
                  style={{ color: cat.accent, background: `${cat.accent}12`, border: `1px solid ${cat.accent}25` }}
                >
                  {cat.label}
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>

              {/* Links */}
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="flex flex-col gap-2"
              >
                {cat.links.map((link, li) => (
                  <motion.div key={li} variants={item}>
                    <Link href={link.href}>
                      <motion.div
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        className="group flex items-center gap-3 p-4 rounded-2xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        {/* Emoji */}
                        <div className="w-10 h-10 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[18px] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                          {link.emoji}
                        </div>

                        {/* Label + tag */}
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-800 font-semibold text-[13.5px] leading-tight group-hover:text-gray-900 transition-colors truncate">
                            {link.label}
                          </p>
                          <span
                            className="text-[10px] font-bold"
                            style={{ color: cat.accent }}
                          >
                            {link.tag}
                          </span>
                        </div>

                        {/* Arrow */}
                        <ExternalLink
                          className="w-3.5 h-3.5 flex-shrink-0 transition-all duration-200 opacity-0 group-hover:opacity-100"
                          style={{ color: cat.accent }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Footer row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100"
        >
          <p className="text-gray-400 text-[13px]">
            Can't find what you're looking for?
          </p>
          <div className="flex items-center gap-3">
            <Link href="/services">
              <button className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-md transition-all duration-200">
                Browse All Resources
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-md shadow-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-px">
                Contact Us
              </button>
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </section>
  )
}