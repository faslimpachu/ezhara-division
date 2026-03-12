'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Droplet, Users, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

interface StatCounter {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: number
  suffix: string
}

const stats: StatCounter[] = [
  {
    icon: Droplet,
    label: 'Total Donors',
    value: 2450,
    suffix: '+',
  },
  {
    icon: Heart,
    label: 'Lives Saved',
    value: 8720,
    suffix: '+',
  },
  {
    icon: Users,
    label: 'Active Requests',
    value: 142,
    suffix: '',
  },
]

function AnimatedCounter({
  from = 0,
  to,
  duration = 2,
}: {
  from?: number
  to: number
  duration?: number
}) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    let start: number
    let animationFrameId: number

    const animate = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / (duration * 1000), 1)
      setCount(Math.floor(from + (to - from) * progress))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrameId)
  }, [from, to, duration])

  return count
}

export default function BloodBank() {
  return (
    <section className="py-20 bg-gradient-to-r from-red-50 via-rose-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Droplet className="w-8 h-8 text-red-600" />
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
              Blood Bank & Impact
            </h2>
            <Droplet className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Save lives through blood donation. Every drop counts.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-full bg-red-100">
                    <Icon className="w-8 h-8 text-red-600" />
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl font-bold text-red-600 mb-2">
                  <AnimatedCounter to={stat.value} />
                  {stat.suffix}
                </div>
                <p className="text-lg text-foreground font-semibold">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-6 text-lg rounded-full"
          >
            <Droplet className="w-5 h-5 mr-2" />
            Request Blood
          </Button>
          <Button
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-full shadow-lg"
          >
            <Heart className="w-5 h-5 mr-2" />
            Donate Blood
          </Button>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 bg-white rounded-xl border-l-4 border-red-600 shadow-lg"
        >
          <p className="text-foreground font-semibold mb-2">
            🩸 Did you know?
          </p>
          <p className="text-muted-foreground">
            One blood donation can save up to three lives. Donate today and be a hero. Our blood bank operates 24/7 to serve emergency blood needs in Division 34.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
