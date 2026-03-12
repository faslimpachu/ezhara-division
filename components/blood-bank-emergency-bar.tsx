'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Ambulance } from 'lucide-react'

const emergencyHospitals = [
  {
    id: 1,
    name: 'Kannur District Hospital',
    phone: '+91-497-2782000',
    address: 'Kannur, Kerala',
  },
  {
    id: 2,
    name: 'Ezhara Primary Health Centre',
    phone: '+91-497-2886000',
    address: 'Ezhara, Kannur',
  },
  {
    id: 3,
    name: 'District Blood Bank',
    phone: '+91-497-2785555',
    address: 'Blood Bank Road, Kannur',
  },
]

export default function BloodBankEmergencyBar() {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-red-50 border-y border-red-200">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-red-900 flex items-center gap-2">
            <Ambulance className="w-8 h-8" />
            Nearest Emergency Services
          </h3>
          <p className="text-red-700 mt-2">Call immediately in case of medical emergency</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {emergencyHospitals.map((hospital) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: hospital.id * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 border-2 border-red-200 bg-white hover:shadow-lg transition-all">
                <h4 className="text-lg font-bold text-foreground mb-2">{hospital.name}</h4>
                <p className="text-sm text-muted-foreground mb-4">{hospital.address}</p>
                <a href={`tel:${hospital.phone.replace(/\D/g, '')}`}>
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2">
                    <Phone className="w-4 h-4" />
                    Call Ambulance
                  </Button>
                </a>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
