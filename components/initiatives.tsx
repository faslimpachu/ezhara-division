'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Lightbulb, BookOpen, Zap, Leaf, Users, Briefcase, Heart, Gift, ArrowUpRight, Sparkles } from 'lucide-react'

const initiatives = [
  {
    icon: Lightbulb,
    title: 'Make in Ezhara',
    subtitle: 'Startup Programs',
    description: 'Register your business and access startup support, mentorship, funding, and resources for entrepreneurs.',
    accent: '#f59e0b',
    tag: 'Business',
    href: '#',
  },
  {
    icon: BookOpen,
    title: 'Apply Scholarship',
    subtitle: 'Education Support',
    description: 'Financial assistance for deserving students pursuing higher education through multiple eligible schemes.',
    accent: '#6366f1',
    tag: 'Education',
    href: '#',
  },
  {
    icon: Users,
    title: 'Register as Volunteer',
    subtitle: 'Community Service',
    description: 'Join our volunteer network and contribute to community development. Make a meaningful impact in Ezhara.',
    accent: '#06b6d4',
    tag: 'Community',
    href: '#',
  },
  {
    icon: Heart,
    title: 'Financial Assistance',
    subtitle: 'Support Programs',
    description: 'Get financial aid for emergencies, medical expenses, and personal hardships through welfare programs.',
    accent: '#f43f5e',
    tag: 'Welfare',
    href: '#',
  },
  {
    icon: Leaf,
    title: 'Environmental Programs',
    subtitle: 'Green Ezhara',
    description: 'Sustainable initiatives for environmental conservation, tree plantation drives, and clean-up campaigns.',
    accent: '#10b981',
    tag: 'Environment',
    href: '#',
  },
  {
    icon: Briefcase,
    title: 'Jobs & Training',
    subtitle: 'Employment',
    description: 'Explore job openings and professional training programs to enhance your career prospects in Kannur.',
    accent: '#f97316',
    tag: 'Career',
    href: '#',
  },
  {
    icon: Zap,
    title: 'Future Skill Academy',
    subtitle: 'Professional Development',
    description: 'Advanced training in emerging technologies and professional skills to prepare youth for tomorrow\'s jobs.',
    accent: '#a855f7',
    tag: 'Skills',
    href: '#',
  },
  {
    icon: Gift,
    title: 'Donate for a Cause',
    subtitle: 'Community Support',
    description: 'Support our initiatives and help those in need. Every contribution makes a real difference here.',
    accent: '#3b82f6',
    tag: 'Donate',
    href: '/donate',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
}

export default function Initiatives() {
  return (
    <section
      className="relative py-24 px-5 sm:px-8 lg:px-12 overflow-hidden"
      style={{ fontFamily: "'DM Sans', sans-serif", background: '#f8fafc' }}
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-violet-50 blur-3xl opacity-70" />
        <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-cyan-50 blur-3xl opacity-60" />
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
            <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-violet-50 border border-violet-100">
              <Sparkles className="w-3 h-3 text-violet-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-violet-600">Councilor Initiatives</span>
            </div>
            <h2
              className="text-gray-900 font-black leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
            >
              Programs Built{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-purple-500">
                For You
              </span>
            </h2>
          </div>
          <p className="text-gray-400 text-[14px] max-w-xs leading-relaxed sm:text-right">
            Key programs and opportunities led by Councilor Faslim T.P. for Division 34 residents.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {initiatives.map((init, i) => {
            const Icon = init.icon
            return (
              <motion.div key={i} variants={item}>
                <Link href={init.href}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                    className="group relative flex flex-col h-full rounded-2xl border bg-white overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                    style={{ borderColor: `${init.accent}22` }}
                  >
                    {/* Top accent bar */}
                    <div
                      className="h-[3px] w-full scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                      style={{ background: `linear-gradient(90deg, ${init.accent}, transparent)` }}
                    />

                    {/* Icon area */}
                    <div
                      className="relative flex items-center justify-center h-[100px] overflow-hidden"
                      style={{ background: `${init.accent}0e` }}
                    >
                      {/* Radial glow behind icon */}
                      <div
                        className="absolute w-24 h-24 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                        style={{ background: init.accent }}
                      />
                      <div
                        className="relative w-14 h-14 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: `${init.accent}18`, border: `1.5px solid ${init.accent}30` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: init.accent }} />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-5 gap-3">
                      {/* Tag */}
                      <span
                        className="self-start text-[10px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded-lg"
                        style={{ color: init.accent, background: `${init.accent}12`, border: `1px solid ${init.accent}22` }}
                      >
                        {init.tag}
                      </span>

                      {/* Title */}
                      <div>
                        <h3 className="text-gray-900 font-bold text-[14.5px] leading-snug group-hover:text-gray-800 transition-colors">
                          {init.title}
                        </h3>
                        <p className="text-[11px] font-semibold mt-0.5" style={{ color: init.accent }}>
                          {init.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-gray-400 text-[12.5px] leading-relaxed flex-1">
                        {init.description}
                      </p>

                      {/* CTA */}
                      <div
                        className="flex items-center gap-1.5 text-[12px] font-bold mt-1 transition-all duration-200 group-hover:gap-2.5"
                        style={{ color: init.accent }}
                      >
                        Know More
                        <ArrowUpRight
                          className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>
                    </div>

                    {/* Hover bg wash */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 50% 0%, ${init.accent}08, transparent 70%)` }}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-gray-200" />
          <Link href="/initiatives">
            <button className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl text-[13px] font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-white hover:shadow-md transition-all duration-200">
              View all initiatives
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </Link>
          <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-gray-200" />
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </section>
  )
}