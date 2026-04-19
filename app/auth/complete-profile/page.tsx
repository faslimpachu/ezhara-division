'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'
import { completeProfile, ApiError } from '@/lib/services/auth'

interface FormErrors {
  firstName?: string
  lastName?: string
}

export default function CompleteProfilePage() {
  const router = useRouter()
  const { setUser } = useAuth()
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateField = (name: string, value: string): string | undefined => {
    if (!value.trim()) {
      return `${name === 'firstName' ? 'First name' : 'Last name'} is required`
    }
    if (value.trim().length < 2) {
      return `${name === 'firstName' ? 'First name' : 'Last name'} must be at least 2 characters`
    }
    return undefined
  }

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const value = field === 'firstName' ? firstName : lastName
    const error = validateField(field, value)
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleFirstNameChange = (value: string) => {
    setFirstName(value)
    if (touched.firstName) {
      const error = validateField('firstName', value)
      setErrors((prev) => ({ ...prev, firstName: error }))
    }
  }

  const handleLastNameChange = (value: string) => {
    setLastName(value)
    if (touched.lastName) {
      const error = validateField('lastName', value)
      setErrors((prev) => ({ ...prev, lastName: error }))
    }
  }

  useEffect(() => {
    const storedPhone = sessionStorage.getItem('phone')
    if (!storedPhone) {
      router.replace('/auth/login')
      return
    }

    setPhone(storedPhone)
  }, [router])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const firstNameError = validateField('firstName', firstName)
    const lastNameError = validateField('lastName', lastName)
    
    setTouched({ firstName: true, lastName: true })
    setErrors({ firstName: firstNameError, lastName: lastNameError })

    if (firstNameError || lastNameError) {
      return
    }

    if (!phone) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await completeProfile({
        phone,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      })

      setUser(response.user)
      sessionStorage.removeItem('phone')
      toast({
        title: 'Profile completed',
        description: 'You are now signed in.',
      })
      const next =
        typeof window !== 'undefined'
          ? new URLSearchParams(window.location.search).get('next') || '/'
          : '/'
      router.push(next)
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Unable to complete your profile right now.'
      toast({
        title: 'Profile update failed',
        description: message,
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
                <UserRound className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Complete Profile</h1>
              <p className="text-muted-foreground mt-2">
                Add your name to finish signing in.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-base font-semibold">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(event) => handleFirstNameChange(event.target.value)}
                  onBlur={() => handleBlur('firstName')}
                  placeholder="Enter your first name"
                  className={`h-12 ${errors.firstName && touched.firstName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  aria-invalid={!!errors.firstName && touched.firstName}
                  aria-describedby={errors.firstName && touched.firstName ? 'firstName-error' : undefined}
                />
                {errors.firstName && touched.firstName && (
                  <p id="firstName-error" className="text-sm text-destructive" role="alert">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-base font-semibold">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(event) => handleLastNameChange(event.target.value)}
                  onBlur={() => handleBlur('lastName')}
                  placeholder="Enter your last name"
                  className={`h-12 ${errors.lastName && touched.lastName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  aria-invalid={!!errors.lastName && touched.lastName}
                  aria-describedby={errors.lastName && touched.lastName ? 'lastName-error' : undefined}
                />
                {errors.lastName && touched.lastName && (
                  <p id="lastName-error" className="text-sm text-destructive" role="alert">
                    {errors.lastName}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base font-semibold">
                {isSubmitting ? 'Completing profile...' : 'Continue'}
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
