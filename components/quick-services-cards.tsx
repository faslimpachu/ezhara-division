'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import {
  FileText,
  CheckCircle,
  HeartHandshake,
  Heart,
  Stethoscope,
  Users,
  BookOpen,
  Download,
  Bell,
} from 'lucide-react'

interface QuickService {
  id: string
  icon: React.ReactNode
  title: string
  description: string
  href: string
}

const quickServices: QuickService[] = [
  {
    id: 'complaint',
    icon: <FileText className="w-6 h-6" />,
    title: 'File a Complaint',
    description: 'Register grievances related to civic services and infrastructure',
    href: '/services/file-complaint',
  },
  {
    id: 'track-complaint',
    icon: <CheckCircle className="w-6 h-6" />,
    title: 'Track your Complaint',
    description: 'Monitor the status of your filed complaints in real-time',
    href: '/services/track-complaint',
  },
  {
    id: 'blood-bank',
    icon: <HeartHandshake className="w-6 h-6" />,
    title: 'Blood Bank & Emergency Directory',
    description: 'Access blood donation services and emergency contact details',
    href: '/services/emergency-contacts',
  },
  {
    id: 'welfare',
    icon: <Heart className="w-6 h-6" />,
    title: 'Apply Welfare Schemes',
    description: 'Explore and apply for various government welfare programs',
    href: '/services/welfare-schemes',
  },
  {
    id: 'health',
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Public Health Services',
    description: 'Access healthcare services and vaccination information',
    href: '/services/health',
  },
  {
    id: 'volunteer',
    icon: <Users className="w-6 h-6" />,
    title: 'Register as Volunteer',
    description: 'Join our community volunteer network and contribute to society',
    href: '/services/volunteer',
  },
  {
    id: 'sakshyapathram',
    icon: <BookOpen className="w-6 h-6" />,
    title: 'Request Sakshyapathram',
    description: 'Apply for character and conduct certificate online',
    href: '/services/sakshyapathram',
  },
  {
    id: 'certificates',
    icon: <Download className="w-6 h-6" />,
    title: 'Download Certificates',
    description: 'Get copies of important documents and certificates',
    href: '/services/certificates',
  },
  {
    id: 'announcements',
    icon: <Bell className="w-6 h-6" />,
    title: 'Announcements',
    description: 'Stay updated with latest news and announcements from the ward',
    href: '/services/announcements',
  },
]

interface QuickServicesCardsProps {
  filteredServices: QuickService[]
}

export default function QuickServicesCards({ filteredServices }: QuickServicesCardsProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <motion.div
            key={service.id}
            variants={itemVariants}
            whileHover={{ y: -6 }}
            className="group"
          >
            <Link href={service.href} className="block h-full">
              <Card className="h-full p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all backdrop-blur-sm flex flex-col cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    {service.icon}
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors group-hover:translate-x-1" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {service.description}
                </p>
              </Card>
            </Link>
          </motion.div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">No services found. Try a different search.</p>
        </div>
      )}
    </motion.div>
  )
}

export { quickServices }
