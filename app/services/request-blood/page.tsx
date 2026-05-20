'use client'

import { useState } from 'react'
import Header from '@/components/header'
import BloodBankHero from '@/components/blood-bank-hero'
import BloodBankStats from '@/components/blood-bank-stats'
import BloodBankEmergencyBar from '@/components/blood-bank-emergency-bar'
import DonorDatabase from '@/components/donor-database'
import DonorRegistration from '@/components/donor-registration'
import { motion, AnimatePresence } from 'framer-motion'
import { Droplet, X, Heart, Users, Shield, Clock, Phone, ArrowRight } from 'lucide-react'
import { useProtectedRoute } from '@/hooks/use-protected-route'

/* ── Data ──────────────────────────────────────────── */
const bloodGroups = ['A+', 'A−', 'B+', 'B−', 'AB+', 'AB−', 'O+', 'O−']

const pillars = [
  { icon: Heart,  num: '3×',   title: 'Lives Saved',     desc: 'One donation saves up to three patients in need.' },
  { icon: Users,  num: '450+', title: 'Active Donors',    desc: 'Join a growing network of Ward 34 residents.' },
  { icon: Shield, num: '100%', title: 'Medically Safe',   desc: 'Supervised by certified healthcare staff.' },
  { icon: Clock,  num: '30m',  title: 'Your Time',        desc: 'Once every three months. That\'s all it takes.' },
]

const groupGlow: Record<string, string> = {
  'O+': '#ef4444', 'O−': '#dc2626',
  'A+': '#f97316', 'A−': '#ea580c',
  'B+': '#8b5cf6', 'B−': '#7c3aed',
  'AB+': '#0ea5e9', 'AB−': '#0284c7',
}

const sp = { type: 'spring', stiffness: 380, damping: 28 } as const

export default function BloodBankPage() {
  const { isLoading, user } = useProtectedRoute()

  if (isLoading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center" style={{ background: '#080810' }}>
        <p className="text-white/50 text-sm">Checking your session...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen" style={{ fontFamily: "'Plus Jakarta Sans', 'DM Sans', sans-serif", background: '#080810' }}>
      <Header />
      <BloodBankHero />
      <BloodBankStats />
      <BloodBankEmergencyBar />
      <DonorDatabase />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>
    </main>
  )
}
