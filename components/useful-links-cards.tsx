'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { ExternalLink } from 'lucide-react'

interface UsefulLink {
  id: string
  name: string
  category: string
}

const usefulLinks: UsefulLink[] = [
  {
    id: 'events',
    name: 'Events and Campaigns Tracker',
    category: 'Local Services',
  },
  {
    id: 'welfare',
    name: 'Apply Social Welfare Schemes',
    category: 'Government Services',
  },
  {
    id: 'track-cert',
    name: 'Track Certificate',
    category: 'Document Services',
  },
  {
    id: 'aadhaar',
    name: 'Aadhaar Services',
    category: 'Identity Services',
  },
  {
    id: 'income-tax',
    name: 'Income Tax Portal',
    category: 'Tax Services',
  },
  {
    id: 'kms',
    name: 'Kerala Startup Mission',
    category: 'Business Services',
  },
  {
    id: 'startup-india',
    name: 'Startup India',
    category: 'National Business Services',
  },
  {
    id: 'info-center',
    name: 'Kerala Information Center',
    category: 'Government Resources',
  },
  {
    id: 'gov-india',
    name: 'Government of India Portal',
    category: 'Central Services',
  },
  {
    id: 'pms',
    name: 'Prime Minister Services',
    category: 'Central Government',
  },
  {
    id: 'state-portal',
    name: 'Kerala State Portal',
    category: 'State Government',
  },
  {
    id: 'municipal',
    name: 'Kannur Municipal Corporation',
    category: 'Local Government',
  },
]

interface UsefulLinksCardsProps {
  filteredLinks: UsefulLink[]
}

export default function UsefulLinksCards({ filteredLinks }: UsefulLinksCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      {filteredLinks.length > 0 ? (
        filteredLinks.map((link) => (
          <motion.div
            key={link.id}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="p-4 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group backdrop-blur-sm h-full flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {link.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {link.category}
                </p>
              </div>
              <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors ml-3 flex-shrink-0" />
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No links found. Try a different search.</p>
        </div>
      )}
    </motion.div>
  )
}

export { usefulLinks }
