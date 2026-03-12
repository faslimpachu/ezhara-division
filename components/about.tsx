'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { MapPin, ArrowUpRight, Waves, TreePine, Building2, Users } from 'lucide-react'

const stats = [
  { value: '45,000+', label: 'Residents', icon: Users, accent: '#3b82f6' },
  { value: '2015', label: 'Established', icon: Building2, accent: '#10b981' },
  { value: '12 km²', label: 'Area', icon: TreePine, accent: '#f59e0b' },
  { value: '8 km', label: 'Coastline', icon: Waves, accent: '#06b6d4' },
]

const tags = ['Coastal Ward', 'Kannur District', 'Division 34', 'Kerala']

export default function About() {
  return (
    <section
      className="relative py-24 px-5 sm:px-8 lg:px-12 overflow-hidden bg-white"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Subtle background shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-100px] left-[-80px] w-[500px] h-[500px] rounded-full bg-blue-50 blur-3xl opacity-70" />
        <div className="absolute bottom-[-80px] right-[-60px] w-[400px] h-[400px] rounded-full bg-emerald-50 blur-3xl opacity-60" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto">

        {/* ── Section Label ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100">
                <MapPin className="w-3 h-3 text-blue-500" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-600">About the Ward</span>
              </div>
              <h2
                className="text-gray-900 font-black leading-tight"
                style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', letterSpacing: '-0.03em' }}
              >
                Know Your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                  Division
                </span>
              </h2>
            </div>
            <p className="text-gray-400 text-[14px] max-w-xs leading-relaxed sm:text-right">
              A coastal gem in Kannur — where tradition meets civic progress.
            </p>
          </div>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — Map card */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-gray-100 shadow-2xl shadow-blue-100/50 bg-gradient-to-br from-slate-50 to-blue-50/40" style={{ minHeight: 460 }}>

              {/* Map placeholder atmosphere */}
              <div className="absolute inset-0">
                {/* Grid lines mimicking a map */}
                <div className="absolute inset-0 opacity-[0.07]" style={{
                  backgroundImage: 'linear-gradient(rgba(30,58,138,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(30,58,138,0.8) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }} />
                {/* Decorative terrain blobs */}
                <div className="absolute top-[15%] left-[20%] w-32 h-20 rounded-full bg-emerald-200/50 blur-xl" />
                <div className="absolute top-[40%] right-[15%] w-24 h-24 rounded-full bg-blue-200/50 blur-xl" />
                <div className="absolute bottom-[20%] left-[35%] w-28 h-16 rounded-full bg-teal-200/40 blur-xl" />
                {/* Water hint bottom */}
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-cyan-100/60 to-transparent" />
              </div>

              {/* Center pin */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                {/* Pulsing pin */}
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-20 h-20 rounded-full bg-blue-500/10 animate-ping" style={{ animationDuration: '2.5s' }} />
                  <div className="absolute w-14 h-14 rounded-full bg-blue-500/15" />
                  <div className="relative w-14 h-14 rounded-full bg-white border-2 border-blue-200 shadow-xl shadow-blue-200/50 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-blue-600 fill-blue-100" />
                  </div>
                </div>

                {/* Label card */}
                <div className="bg-white/90 backdrop-blur-sm border border-gray-100 rounded-2xl px-5 py-3 shadow-lg text-center">
                  <p className="text-gray-900 font-bold text-[15px]">Ezhara Division 34</p>
                  <p className="text-gray-400 text-[12px] mt-0.5">Kannur Corporation · Kerala</p>
                </div>
              </div>

              {/* Tags top-left */}
              <div className="absolute top-5 left-5 flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-[10px] font-bold rounded-xl bg-white/80 backdrop-blur-sm border border-gray-100 text-gray-500 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* "Coming soon" badge */}
              <div className="absolute bottom-5 right-5">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/90 backdrop-blur-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span className="text-[11px] font-bold text-white">Interactive Map — Coming Soon</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Text + stats */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="flex flex-col gap-8"
          >
            {/* Body text */}
            <div className="space-y-4">
              <p className="text-gray-600 leading-[1.8] text-[15.5px]">
                Nestled in the serene backwaters of Kannur, <strong className="text-gray-900 font-bold">Ezhara</strong> is a vibrant coastal community known for its natural beauty, rich cultural heritage, and a deep-rooted sense of togetherness. Division 34 brings together a diverse population working toward a prosperous, inclusive ward.
              </p>
              <p className="text-gray-500 leading-[1.8] text-[15px]">
                From pristine coastal landscapes to growing business corridors, Ezhara balances tradition with progress — delivering modern civic services while honoring the values that have defined the community for generations.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex flex-col gap-2 p-5 rounded-2xl border border-gray-100 bg-gray-50/60 hover:bg-white hover:shadow-md hover:border-gray-200 transition-all duration-200"
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center"
                      style={{ background: `${stat.accent}15`, border: `1px solid ${stat.accent}25` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: stat.accent }} />
                    </div>
                    <div>
                      <p
                        className="font-black text-gray-900 leading-none"
                        style={{ fontSize: '1.6rem', letterSpacing: '-0.04em' }}
                      >
                        {stat.value}
                      </p>
                      <p className="text-gray-400 text-[12px] font-medium mt-1 uppercase tracking-wide">{stat.label}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <Link href="/about">
                <button className="group flex items-center gap-2 px-5 py-3 rounded-2xl text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-px">
                  Explore Ezhara
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </Link>
              <Link href="/contact">
                <button className="flex items-center gap-2 px-5 py-3 rounded-2xl text-[13px] font-semibold text-gray-500 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
                  Contact Ward
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </section>
  )
}