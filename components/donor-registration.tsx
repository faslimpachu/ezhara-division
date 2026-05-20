'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion } from 'framer-motion'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Droplet, CheckCircle2, Copy } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.string().min(1, 'Age is required'),
  bloodGroup: z.string().min(1, 'Blood group is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  district: z.string().min(1, 'District is required'),
  address: z.string().min(5, 'Address must be at least 5 characters'),
})

type FormValues = z.infer<typeof formSchema>

export default function DonorRegistration() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [donorId, setDonorId] = useState<string | null>(null)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      age: '',
      bloodGroup: '',
      phone: '',
      district: '',
      address: '',
    },
  })

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const id = `EZH-B-${Math.random().toString().substring(2, 6)}`
      setDonorId(id)
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyDonorId = () => {
    if (donorId) {
      navigator.clipboard.writeText(donorId)
    }
  }

  if (donorId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-8 sm:p-12 border border-border/50 bg-gradient-to-br from-green-50/50 to-background">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="mb-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
            </motion.div>

            <h3 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Welcome, Hero!
            </h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
              Thank you for registering as a blood donor. Your contribution will save lives in
              Ezhara.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 inline-block">
              <p className="text-sm text-muted-foreground mb-2">Your Donor ID</p>
              <div className="flex items-center justify-center gap-3">
                <p className="text-3xl font-bold text-red-600 font-mono">{donorId}</p>
                <button
                  onClick={copyDonorId}
                  className="p-3 hover:bg-red-100 rounded-lg transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-5 h-5 text-red-600" />
                </button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">Save this ID for your records</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={() => {
                  setDonorId(null)
                  form.reset()
                }}
                className="px-6"
              >
                Register Another Donor
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 px-6">
                View Donor Guidelines
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="p-8 sm:p-10 border border-border/50">
        <div className="mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Droplet className="w-8 h-8 text-red-600" />
            Become a Blood Donor
          </h3>
          <p className="text-muted-foreground">
            Register now and join Ezhara's life-saving community
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">District</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your district"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your full address"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="bloodGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Blood Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 text-base">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="Your phone number"
                        className="h-12 text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-red-600 hover:bg-red-700 text-base font-semibold"
              >
                {isSubmitting ? 'Registering...' : 'Register as Donor'}
              </Button>
            </motion.div>

            <p className="text-xs text-muted-foreground text-center">
              You will receive a unique Donor ID after registration
            </p>
          </form>
        </Form>
      </Card>
    </motion.div>
  )
}
