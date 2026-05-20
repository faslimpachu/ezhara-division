'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { User, Phone } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { toast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth()
  const router = useRouter()
  const [firstName, setFirstName] = useState(user?.first_name || '')
  const [lastName, setLastName] = useState(user?.last_name || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setIsSubmitting(true)
      await updateProfile({
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      })
      toast({
        title: 'Profile updated',
        description: 'Your name has been saved successfully.',
      })
    } catch (error) {
      toast({
        title: 'Update failed',
        description: error instanceof Error ? error.message : 'Unable to update profile.',
        variant: 'destructive',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/auth/login')
  }

  if (!user) {
    return <div className="p-8 text-center">Loading...</div>
  }

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 py-12 bg-background">
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
                <User className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
              <p className="text-muted-foreground mt-2">
                Manage your personal information
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {/* Editable Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-base font-semibold">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    className="h-12 text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-base font-semibold">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="h-12 text-base"
                  />
                </div>
              </div>

              {/* Read-only Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-semibold flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Phone Number
                </Label>
                <Input
                  id="phone"
                  value={user.phone_number || ''}
                  disabled
                  className="h-12 text-base bg-muted/50 cursor-not-allowed"
                />
                <p className="text-xs text-muted-foreground">Phone number cannot be changed</p>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold"
              >
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </Button>

              <Button
                type="button"
                onClick={handleLogout}
                className="w-full h-12 text-base font-semibold bg-red-600 hover:bg-red-700 text-white"
              >
                Logout
              </Button>
            </form>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
