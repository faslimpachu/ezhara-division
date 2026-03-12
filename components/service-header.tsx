'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'

interface ServiceHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export default function ServiceHeader({ searchQuery, onSearchChange }: ServiceHeaderProps) {
  return (
    <div className="relative w-full bg-gradient-to-b from-primary/5 to-transparent pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3 text-balance">
            Ezhara Digital Citizen Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need, categorized and one click away
          </p>
        </motion.div>

        {/* Smart Search Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search for certificates, programs, or useful links..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 py-3 text-base border-border/50 focus:border-primary shadow-lg hover:shadow-xl transition-shadow rounded-xl bg-white/80 backdrop-blur-sm"
            />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
