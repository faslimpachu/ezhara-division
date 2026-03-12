'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  ChevronLeft,
  MapPin,
  Clock,
  Phone,
  Megaphone,
  Calendar,
  Bug,
  Droplet,
  AlertTriangle,
  Bell,
  Laptop,
  Stethoscope,
  Users,
  Home,
  Pill,
} from 'lucide-react'

export default function PublicHealthServices() {
  const [selectedTab, setSelectedTab] = useState('facilities')

  const facilities = [
    {
      name: 'Ezhara Primary Health Centre (PHC)',
      type: 'Government Hospital',
      timing: '9:00 AM - 2:00 PM',
      services: ['General OPD', 'Pharmacy', 'Maternal Health', 'Immunization'],
      phone: '+91-497-2234567',
      address: 'Ezhara, Kannur District',
    },
    {
      name: '24/7 Jan Aushadhi Kendra',
      type: 'Medicine Store',
      timing: 'Open 24/7',
      services: ['Discounted Medicines', 'Generic Drugs'],
      phone: '+91-497-2245678',
      address: 'Market Area, Ezhara',
    },
    {
      name: 'Anganwadi Center - Zone A',
      type: 'Nutrition Center',
      timing: '10:00 AM - 4:00 PM',
      services: ['Nutrition for kids', 'Pregnant women support', 'Health awareness'],
      phone: '+91-497-2256789',
      address: 'Residential Zone A, Ezhara',
    },
  ]

  const vaccinations = [
    {
      date: 'Mar 15',
      title: 'Polio Drops Drive',
      description: 'Immunization for children 0-5 years',
      location: 'Ezhara UP School Ground',
      time: '9:00 AM - 12:00 PM',
    },
    {
      date: 'Mar 20',
      title: 'Routine Child Immunization',
      description: 'DPT, MMR, Chickenpox vaccines',
      location: 'Ezhara PHC',
      time: '10:00 AM - 2:00 PM',
    },
    {
      date: 'Mar 25',
      title: 'Medical Camp - Eye & Dental',
      description: 'Free eye checkup and dental screening',
      location: 'Ezhara UP School',
      time: '9:00 AM - 5:00 PM',
    },
  ]

  const sanitationActions = [
    {
      icon: Bug,
      title: 'Request Mosquito Fogging',
      description: 'Dengue & Malaria prevention',
    },
    {
      icon: AlertTriangle,
      title: 'Report Stagnant Water',
      description: 'Report waste dumps and water issues',
    },
    {
      icon: Droplet,
      title: 'Drinking Water Testing',
      description: 'Request water quality testing',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="py-8 sm:py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Public Health & Sanitation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Access local healthcare facilities, vaccination schedules, and ward sanitation services.
          </p>

          {/* Urgent Alert */}
          <Alert className="mt-8 border-orange-200 bg-orange-50">
            <Megaphone className="h-4 w-4 text-orange-600" />
            <AlertDescription className="ml-3">
              <p className="font-semibold text-orange-900 mb-2">
                Mega Medical Camp this Sunday
              </p>
              <p className="text-orange-800 mb-3">
                Free Eye & Dental checkup at Ezhara UP School. 9:00 AM onwards.
              </p>
              <Button size="sm" className="gap-2">
                <Calendar className="w-4 h-4" />
                Register Now
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-20 z-40 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent h-auto p-0">
              <TabsTrigger
                value="facilities"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-4 gap-2"
              >
                <Home className="w-4 h-4" />
                Local Facilities
              </TabsTrigger>
              <TabsTrigger
                value="vaccinations"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-4 gap-2"
              >
                <Stethoscope className="w-4 h-4" />
                Vaccinations & Camps
              </TabsTrigger>
              <TabsTrigger
                value="sanitation"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-4 gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                Sanitation
              </TabsTrigger>
              <TabsTrigger
                value="telemedicine"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary px-6 py-4 gap-2"
              >
                <Laptop className="w-4 h-4" />
                Telemedicine
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Facilities Tab */}
          {selectedTab === 'facilities' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {facilities.map((facility, idx) => (
                <Card key={idx} className="p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {facility.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {facility.type}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {facility.timing}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <a
                        href={`tel:${facility.phone}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        {facility.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <p className="text-sm text-foreground">
                        {facility.address}
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-sm font-medium text-foreground mb-3">
                      Services Available
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {facility.services.map((service, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-primary/10 text-primary hover:bg-primary/20"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2"
                  >
                    <MapPin className="w-4 h-4" />
                    Get Directions
                  </Button>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Vaccinations Tab */}
          {selectedTab === 'vaccinations' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {vaccinations.map((vac, idx) => (
                <Card
                  key={idx}
                  className="p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <Badge className="bg-primary text-primary-foreground py-3 px-4 text-lg font-bold">
                        {vac.date}
                      </Badge>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {vac.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {vac.description}
                      </p>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{vac.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className="text-foreground">{vac.time}</span>
                        </div>
                      </div>

                      <Button size="sm" className="gap-2">
                        <Bell className="w-4 h-4" />
                        Set Reminder
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {/* Sanitation Tab */}
          {selectedTab === 'sanitation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 border border-border/50 mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Disease Prevention & Ward Cleanliness
                </h3>
                <p className="text-lg text-muted-foreground mb-8">
                  Help us prevent Dengue and Malaria. Request ward-level sanitation services.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sanitationActions.map((action, idx) => {
                    const Icon = action.icon
                    return (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          className="w-full h-auto p-6 flex flex-col items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                          <Icon className="w-8 h-8" />
                          <div className="text-center">
                            <p className="font-semibold">
                              {action.title}
                            </p>
                            <p className="text-sm opacity-90">
                              {action.description}
                            </p>
                          </div>
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Telemedicine Tab */}
          {selectedTab === 'telemedicine' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-8 sm:p-12 border border-border/50 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                  <Laptop className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-bold text-foreground mb-3">
                  e-Sanjeevani: National Telemedicine Service
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Connect with government doctors online for free. Get expert medical advice from home.
                </p>

                <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
                  <Stethoscope className="w-5 h-5" />
                  Consult a Doctor Online for Free
                </Button>

                <p className="text-sm text-muted-foreground mt-6">
                  Available 24/7 • No registration fee • Government certified doctors
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom Banner */}
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
            Need Blood or Emergency Help?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white gap-2"
              onClick={() => window.location.href = '/services/blood-bank'}
            >
              <Droplet className="w-5 h-5" />
              Ezhara Blood Bank
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => window.location.href = '/services/emergency-contacts'}
            >
              <AlertTriangle className="w-5 h-5" />
              Emergency Directory
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
