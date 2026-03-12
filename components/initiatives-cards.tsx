'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Lightbulb, Zap, BookOpen, Heart, Leaf, Briefcase } from 'lucide-react'

interface Initiative {
  id: string
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  image: string
  featured?: boolean
}

const initiatives: Initiative[] = [
  {
    id: 'make-ezhara',
    icon: <Lightbulb className="w-8 h-8" />,
    title: 'Make in Ezhara',
    subtitle: 'Startup & Business Registration',
    description: 'Register your startup or business and access mentorship, funding opportunities, and networking with other entrepreneurs.',
    image: 'bg-gradient-to-br from-yellow-50 to-orange-50',
  },
  {
    id: 'eyis',
    icon: <Zap className="w-8 h-8" />,
    title: 'Ezhara Youth Innovation & Skill Hub',
    subtitle: 'EYIS - Professional Development',
    description: 'Advanced training programs in emerging technologies, professional skills, and career development for youth.',
    image: 'bg-gradient-to-br from-purple-50 to-pink-50',
    featured: true,
  },
  {
    id: 'scholarships',
    icon: <BookOpen className="w-8 h-8" />,
    title: 'Apply Scholarships',
    subtitle: 'Education Fund',
    description: 'Financial assistance and scholarship programs for deserving students pursuing higher education.',
    image: 'bg-gradient-to-br from-blue-50 to-cyan-50',
  },
  {
    id: 'financial-assistance',
    icon: <Heart className="w-8 h-8" />,
    title: 'Financial Assistance',
    subtitle: 'Support Programs',
    description: 'Get financial aid for emergency situations, medical expenses, and personal hardships through welfare programs.',
    image: 'bg-gradient-to-br from-rose-50 to-pink-50',
  },
  {
    id: 'environment',
    icon: <Leaf className="w-8 h-8" />,
    title: 'Environmental Programs',
    subtitle: 'Green Ezhara Initiative',
    description: 'Sustainable environmental conservation initiatives, tree plantation drives, and community clean-up campaigns.',
    image: 'bg-gradient-to-br from-green-50 to-emerald-50',
  },
  {
    id: 'jobs-training',
    icon: <Briefcase className="w-8 h-8" />,
    title: 'Jobs and Training',
    subtitle: 'Employment Opportunities',
    description: 'Explore job openings and professional training programs to enhance your career prospects.',
    image: 'bg-gradient-to-br from-amber-50 to-orange-50',
  },
]

interface InitiativesCardsProps {
  filteredInitiatives: Initiative[]
}

export default function InitiativesCards({ filteredInitiatives }: InitiativesCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredInitiatives.length > 0 ? (
        filteredInitiatives.map((initiative) => (
          <motion.div
            key={initiative.id}
            variants={itemVariants}
            whileHover={{ y: -10 }}
            className={initiative.featured ? 'md:col-span-2 lg:col-span-2' : ''}
          >
            <Card className="h-full overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all flex flex-col backdrop-blur-sm">
              {/* Featured Badge */}
              {initiative.featured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge className="bg-secondary text-secondary-foreground">Featured</Badge>
                </div>
              )}

              {/* Image Area */}
              <div className={`h-48 ${initiative.image} flex items-center justify-center border-b border-border/30 relative`}>
                <div className="p-6 rounded-lg bg-white/40 backdrop-blur-sm">
                  <div className="text-primary/60">{initiative.icon}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-1">
                    {initiative.title}
                  </h3>
                  <p className="text-xs text-primary font-semibold uppercase tracking-wide">
                    {initiative.subtitle}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">
                  {initiative.description}
                </p>

                <Link href="/initiatives" className="block w-full">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg"
                    size="sm"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No initiatives found. Try a different search.</p>
        </div>
      )}
    </motion.div>
  )
}

export { initiatives }
