'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
  MessageCircle,
} from 'lucide-react'
import Link from 'next/link'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Ward Office Location',
    details: 'Ezhara Ward Office, Kannur Corporation Division 34, Kannur, Kerala 670001',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Phone,
    title: 'Phone Number',
    details: '+91 8547 123 456',
    link: 'tel:+918547123456',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Mail,
    title: 'Email Address',
    details: 'contact@ezhara-ward34.gov.in',
    link: 'mailto:contact@ezhara-ward34.gov.in',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Clock,
    title: 'Office Hours',
    details: 'Mon - Fri: 9:00 AM - 5:00 PM\nSat: 9:00 AM - 1:00 PM\nSunday: Closed',
    color: 'bg-green-50 text-green-600',
  },
]

const socialLinks = [
  { icon: Facebook, label: 'Facebook', color: 'bg-blue-100 hover:bg-blue-200 text-blue-600' },
  { icon: Instagram, label: 'Instagram', color: 'bg-pink-100 hover:bg-pink-200 text-pink-600' },
  { icon: Twitter, label: 'Twitter', color: 'bg-sky-100 hover:bg-sky-200 text-sky-600' },
  { icon: MessageCircle, label: 'WhatsApp', color: 'bg-green-100 hover:bg-green-200 text-green-600' },
]

export default function ContactInfo() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions or feedback? We're here to help. Reach out to us through any of the following channels.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {contactInfo.map((info, index) => {
            const Icon = info.icon
            return (
              <motion.div key={index} variants={itemVariants}>
                <Card className="p-8 border border-border/50 hover:border-primary/30 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-4 rounded-lg ${info.color} flex-shrink-0 w-fit`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <Link href={info.link}>
                          <p className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line">
                            {info.details}
                          </p>
                        </Link>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line">
                          {info.details}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Social Media Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-foreground mb-6">
            Follow Us on Social Media
          </h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  href="#"
                  className={`p-4 rounded-full ${social.color} transition-all`}
                  title={social.label}
                >
                  <Icon className="w-6 h-6" />
                </motion.a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
