'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { ArrowLeft, MessageCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import { toast } from '@/hooks/use-toast'
import { ApiError, sendOTP, verifyOTP } from '@/lib/services/auth'
import { useAuth } from '@/contexts/AuthContext'

const RESEND_COOLDOWN_SECONDS = process.env.NODE_ENV === 'test' ? 1 : 30

export default function OTPPage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const { setUser } = useAuth()
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [phone, setPhone] = useState('')
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN_SECONDS)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedPhone = sessionStorage.getItem('phone')
    if (storedPhone) {
      setPhone(storedPhone)
    } else {
      router.replace('/auth/login')
    }
  }, [router])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

const handleVerify = async () => {
    setError('')
    if (otp.length !== 6) {
      setError('Please enter the 6-digit OTP')
      return
    }

    setIsVerifying(true)
    try {
      const response = await verifyOTP(phone, otp)
      
      setUser(response.user)
      
      const next = typeof window !== 'undefined'
        ? new URLSearchParams(window.location.search).get('next')
        : null

      if (response.profile_complete) {
        router.push(next || '/')
      } else {
        const target = next
          ? `/auth/complete-profile?next=${encodeURIComponent(next)}`
          : '/auth/complete-profile'
        router.push(target)
      }
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Unable to verify OTP right now.'
      setError(message)
      setOtp('')
      toast({
        title: 'OTP verification failed',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setIsResending(true)
    try {
      await sendOTP(phone)
      setCanResend(false)
      setResendTimer(RESEND_COOLDOWN_SECONDS)
      setOtp('')
      toast({
        title: 'OTP resent',
        description: 'A fresh code has been sent to your phone.',
      })
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Unable to resend OTP right now.'
      setError(message)
      toast({
        title: 'Could not resend OTP',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setIsResending(false)
    }
  }

  const handleOtpChange = (value: string) => {
    setOtp(value)
    if (error) setError('')
  }

  const formattedPhone = phone ? `+91 ${phone.slice(0, 5)} ${phone.slice(5)}` : ''

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
            <Link
              href="/auth/login"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>

            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-4">
                <MessageCircle className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-bold text-foreground">Verify OTP</h1>
              <p className="text-muted-foreground mt-2">
                Enter the 6-digit code sent to
              </p>
              <p className="text-foreground font-medium mt-1">{formattedPhone}</p>
            </div>

            <div className="flex justify-center mb-4">
              <InputOTP
                ref={inputRef}
                maxLength={6}
                value={otp}
                onChange={handleOtpChange}
                className="gap-2"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={5} className="w-12 h-12 text-lg" />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 text-destructive text-sm mb-6 p-3 bg-destructive/10 rounded-lg"
              >
                <XCircle className="w-4 h-4" />
                {error}
              </motion.div>
            )}

            <Button
              onClick={handleVerify}
              disabled={otp.length !== 6 || isVerifying}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-base font-semibold"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>

            <div className="text-center mt-6">
              {canResend ? (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="text-primary hover:underline font-medium disabled:opacity-50"
                >
                  {isResending ? 'Sending...' : 'Resend OTP'}
                </button>
              ) : (
                <p className="text-muted-foreground">
                  Resend OTP in{' '}
                  <span className="text-foreground font-medium">{resendTimer}s</span>
                </p>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
