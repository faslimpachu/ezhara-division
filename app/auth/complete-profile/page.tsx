'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { UserRound } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'
import { completeProfile, ApiError } from '@/lib/services/auth'

export default function CompleteProfilePage() {
  const router = useRouter()
  const { setUser } = useAuth()
  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (!phone) {
      return
    }

    if (!firstName.trim() || !lastName.trim()) {
      toast({
        title: 'Missing details',
        description: 'First name and last name are required.',
        variant: 'destructive',
      })
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

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
                placeholder="First name"
                className="h-12"
              />
              <Input
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
                placeholder="Last name"
                className="h-12"
              />

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
