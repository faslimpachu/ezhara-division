'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { ArrowLeft, MessageCircle, RotateCcw, CheckCircle2, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function OTPPage() {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [otp, setOtp] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [phone, setPhone] = useState('')
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const storedPhone = sessionStorage.getItem('phone')
    if (storedPhone) {
      setPhone(storedPhone)
    } else {
      router.push('/auth/login')
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
    await new Promise((resolve) => setTimeout(resolve, 1500))

    if (otp === '123456') {
      sessionStorage.removeItem('phone')
      router.push('/')
    } else {
      setError('Invalid OTP. Please try again.')
      setOtp('')
      setIsVerifying(false)
    }
  }

  const handleResend = async () => {
    setCanResend(false)
    setResendTimer(30)
    setError('')
    setOtp('')
    await new Promise((resolve) => setTimeout(resolve, 1000))
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
                  className="text-primary hover:underline font-medium"
                >
                  Resend OTP
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