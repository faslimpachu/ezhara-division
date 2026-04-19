'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
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
import { Card } from '@/components/ui/card'
import { Phone } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { ApiError, sendOTP } from '@/lib/services/auth'

const phoneSchema = z.object({
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Enter a valid 10-digit number'),
})

type PhoneFormValues = z.infer<typeof phoneSchema>

export default function LoginPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    mode: 'onSubmit',
    defaultValues: {
      phone: '',
    },
  })

  const onSubmit = async (values: PhoneFormValues) => {
    setIsSubmitting(true)
    try {
      await sendOTP(values.phone)
      sessionStorage.setItem('phone', values.phone)
      const next =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('next')
          : null
      const target = next ? `/auth/otp?next=${encodeURIComponent(next)}` : '/auth/otp'
      router.push(target)
    } catch (error) {
      const description =
        error instanceof ApiError ? error.message : 'Unable to send OTP right now.'

      toast({
        title: 'Could not send OTP',
        description,
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border border-border/50 bg-card/95 backdrop-blur-xl shadow-xl">
          <div className="p-8 sm:p-10">
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
                <Phone className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Welcome</h1>
              <p className="text-muted-foreground mt-2">
                Enter your phone number to continue
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                            +91
                          </div>
                          <Input
                            type="tel"
                            inputMode="numeric"
                            placeholder="Enter 10-digit number"
                            className="h-12 text-base pl-12"
                            maxLength={10}
                            {...field}
                            onChange={(event) =>
                              field.onChange(event.target.value.replace(/\D/g, '').slice(0, 10))
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending OTP...' : 'Continue'}
                </Button>
              </form>
            </Form>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
