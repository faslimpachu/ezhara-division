'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Phone, Search } from 'lucide-react'

interface Donor {
  id: string
  name: string
  bloodGroup: string
  age: number
  location: string
  lastDonated: string
  phone: string
}

const sampleDonors: Donor[] = [
  {
    id: 'EZH-B-1045',
    name: 'Rajesh Kumar',
    bloodGroup: 'O+',
    age: 32,
    location: 'Ezhara',
    lastDonated: '3 months ago',
    phone: '+91-9876543210',
  },
  {
    id: 'EZH-B-1046',
    name: 'Priya Sharma',
    bloodGroup: 'A+',
    age: 28,
    location: 'Chalad',
    lastDonated: '6 months ago',
    phone: '+91-9876543211',
  },
  {
    id: 'EZH-B-1047',
    name: 'Arjun Nair',
    bloodGroup: 'B+',
    age: 35,
    location: 'Edakkad',
    lastDonated: '1 month ago',
    phone: '+91-9876543212',
  },
  {
    id: 'EZH-B-1048',
    name: 'Anjali Das',
    bloodGroup: 'AB-',
    age: 26,
    location: 'Ezhara',
    lastDonated: '4 months ago',
    phone: '+91-9876543213',
  },
  {
    id: 'EZH-B-1049',
    name: 'Vikram Singh',
    bloodGroup: 'O-',
    age: 42,
    location: 'Chalad',
    lastDonated: '2 months ago',
    phone: '+91-9876543214',
  },
  {
    id: 'EZH-B-1050',
    name: 'Sneha Menon',
    bloodGroup: 'A-',
    age: 30,
    location: 'Ezhara',
    lastDonated: '5 months ago',
    phone: '+91-9876543215',
  },
]

export default function DonorDatabase() {
  const [searchTerm, setSearchTerm] = useState('')
  const [bloodGroup, setBloodGroup] = useState('all')
  const [location, setLocation] = useState('all')
  const [ageGroup, setAgeGroup] = useState('all')

  const filteredDonors = useMemo(() => {
    return sampleDonors.filter((donor) => {
      const matchesSearch =
        donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.id.includes(searchTerm.toUpperCase())

      const matchesBloodGroup = bloodGroup === 'all' || donor.bloodGroup === bloodGroup
      const matchesLocation = location === 'all' || donor.location === location
      const matchesAge =
        ageGroup === 'all' ||
        (ageGroup === '18-25' && donor.age >= 18 && donor.age <= 25) ||
        (ageGroup === '26-40' && donor.age >= 26 && donor.age <= 40) ||
        (ageGroup === '40+' && donor.age >= 40)

      return matchesSearch && matchesBloodGroup && matchesLocation && matchesAge
    })
  }, [searchTerm, bloodGroup, location, ageGroup])

  const isRecentDonor = (lastDonated: string) => {
    return lastDonated.includes('1 month') || lastDonated.includes('2 month')
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8">
            Search Donor Database
          </h2>

          {/* Filters */}
          <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-sm py-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 mb-8 border-b border-border/50">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Search */}
                <div className="lg:col-span-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search name or ID"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-11 text-base"
                    />
                  </div>
                </div>

                {/* Blood Group */}
                <Select value={bloodGroup} onValueChange={setBloodGroup}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Blood Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blood Groups</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                  </SelectContent>
                </Select>

                {/* Location */}
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Ezhara">Ezhara</SelectItem>
                    <SelectItem value="Chalad">Chalad</SelectItem>
                    <SelectItem value="Edakkad">Edakkad</SelectItem>
                  </SelectContent>
                </Select>

                {/* Age Group */}
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue placeholder="Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="18-25">18-25</SelectItem>
                    <SelectItem value="26-40">26-40</SelectItem>
                    <SelectItem value="40+">40+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <p className="text-sm text-muted-foreground mt-4">
                {filteredDonors.length} donor{filteredDonors.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-4 font-semibold text-foreground">Donor ID</th>
                  <th className="text-left p-4 font-semibold text-foreground">Name</th>
                  <th className="text-left p-4 font-semibold text-foreground">Blood Group</th>
                  <th className="text-left p-4 font-semibold text-foreground">Age</th>
                  <th className="text-left p-4 font-semibold text-foreground">Location</th>
                  <th className="text-left p-4 font-semibold text-foreground">Last Donated</th>
                  <th className="text-center p-4 font-semibold text-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDonors.map((donor, index) => (
                  <motion.tr
                    key={donor.id}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="border-b border-border hover:bg-muted/50 transition-colors"
                  >
                    <td className="p-4">
                      <span className="font-mono font-bold text-red-600">{donor.id}</span>
                    </td>
                    <td className="p-4 font-medium text-foreground">{donor.name}</td>
                    <td className="p-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-600 text-white font-bold text-sm">
                        {donor.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4 text-foreground">{donor.age}</td>
                    <td className="p-4 text-foreground">{donor.location}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isRecentDonor(donor.lastDonated)
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {donor.lastDonated}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <a href={`tel:${donor.phone.replace(/\D/g, '')}`}>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700 text-white gap-1">
                          <Phone className="w-4 h-4" />
                          Call
                        </Button>
                      </a>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {filteredDonors.map((donor, index) => (
              <motion.div
                key={donor.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 border border-border/50">
                  <div className="flex gap-4 mb-4">
                    {/* Blood Group Circle */}
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-600 text-white flex-shrink-0">
                      <span className="text-lg font-bold">{donor.bloodGroup}</span>
                    </div>

                    {/* Donor Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-foreground text-lg">{donor.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {donor.id}</p>
                      <p className="text-sm text-muted-foreground">Age: {donor.age}</p>
                      <p className="text-sm text-muted-foreground">{donor.location}</p>
                      <span
                        className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                          isRecentDonor(donor.lastDonated)
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {donor.lastDonated}
                      </span>
                    </div>
                  </div>

                  <a href={`tel:${donor.phone.replace(/\D/g, '')}`} className="block">
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white gap-2">
                      <Phone className="w-4 h-4" />
                      Call Donor
                    </Button>
                  </a>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredDonors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No donors found matching your criteria</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
