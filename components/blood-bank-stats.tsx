'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Droplet, Heart, AlertCircle } from 'lucide-react'

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: number
  suffix: string
}

function StatCard({ icon, label, value, suffix }: StatCardProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="p-8 text-center border border-border/50 bg-white hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <p className="text-4xl sm:text-5xl font-bold text-red-600 mb-2">
          {count.toLocaleString()}{suffix}
        </p>
        <p className="text-lg font-semibold text-foreground">{label}</p>
      </Card>
    </motion.div>
  )
}

export default function BloodBankStats() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatCard
            icon={<Droplet className="w-12 h-12 text-red-600" />}
            label="Active Donors"
            value={450}
            suffix="+"
          />
          <StatCard
            icon={<Heart className="w-12 h-12 text-red-600" />}
            label="Lives Saved"
            value={1200}
            suffix="+"
          />
          <StatCard
            icon={<AlertCircle className="w-12 h-12 text-red-600" />}
            label="Urgent Requests"
            value={3}
            suffix=""
          />
        </div>
      </div>
    </section>
  )
}
