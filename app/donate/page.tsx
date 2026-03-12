'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Heart,
  Zap,
  TrendingUp,
  Users,
  ArrowRight,
} from 'lucide-react'

const donationAmounts = [100, 500, 1000, 5000, 10000]

const impactAreas = [
  {
    icon: Zap,
    title: 'Smart Infrastructure',
    description: 'Street lights, digital services, public wifi',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Users,
    title: 'Youth Empowerment',
    description: 'EYIS Academy, skill training, scholarships',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: TrendingUp,
    title: 'Economic Growth',
    description: 'Startup support, job creation, livelihoods',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Heart,
    title: 'Community Welfare',
    description: 'Health services, relief, social programs',
    color: 'bg-red-50 text-red-600',
  },
]

const testimonials = [
  {
    name: 'Ramesh Kumar',
    role: 'Local Entrepreneur',
    text: 'My business thrived because of EYIS support. Donating back helps others achieve the same dream.',
    amount: '₹5,000',
  },
  {
    name: 'Priya Menon',
    role: 'School Teacher',
    text: "The scholarship program changed my student's life. Every donation makes a real difference.",
    amount: '₹2,000',
  },
  {
    name: 'Ahmed Hassan',
    role: 'Engineer',
    text: 'Smart Ezhara initiative is commendable. Happy to contribute to this transformation.',
    amount: '₹10,000',
  },
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(null)
  const [customAmount, setCustomAmount] = useState('')
  const [isDonating, setIsDonating] = useState(false)

  const handleDonate = async () => {
    const amount = selectedAmount || parseInt(customAmount)

    if (!amount || amount < 10) return

    setIsDonating(true)

    // Simulate payment delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsDonating(false)
    alert(`Thank you for donating ₹${amount}!`)
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Support Ezhara's Vision
          </Badge>

          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            Make Ezhara Extraordinary
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Your donation directly supports smart infrastructure, youth empowerment,
            and community welfare.
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">₹50L+</div>
              <p className="text-sm text-muted-foreground">Raised</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary">5,000+</div>
              <p className="text-sm text-muted-foreground">Donors</p>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-primary">95%</div>
              <p className="text-sm text-muted-foreground">to Programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <Card className="border border-border/50 p-8 sm:p-10 bg-card/95 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Choose Your Impact
            </h2>

            {/* Amount Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
              {donationAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => {
                    setSelectedAmount(amount)
                    setCustomAmount('')
                  }}
                  className={`p-4 rounded-lg font-semibold border-2 transition-all ${
                    selectedAmount === amount
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border/50 bg-muted hover:border-primary/50'
                  }`}
                >
                  ₹{amount}
                </button>
              ))}
            </div>

            {/* Custom Amount */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">
                Custom Amount
              </label>
              <input
                type="number"
                placeholder="Enter amount in rupees"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(null)
                }}
                className="w-full h-12 px-4 rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <Button
              onClick={handleDonate}
              disabled={
                isDonating ||
                (!selectedAmount && !customAmount) ||
                (customAmount && parseInt(customAmount) < 10)
              }
              className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold gap-2"
            >
              <Heart className="w-5 h-5" />
              {isDonating
                ? 'Processing...'
                : `Donate ₹${selectedAmount || customAmount || '0'}`}
            </Button>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">
          Join the Ezhara Movement
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 gap-2">
            <Heart className="w-5 h-5" />
            Donate Now
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/initiatives">
              Learn More <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}