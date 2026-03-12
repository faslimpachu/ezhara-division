'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft, Award, Users, Zap, Waves, Droplet, Code,
  BookOpen, AlertTriangle, CheckCircle2, Loader2, ChevronRight,
  Sparkles, Heart,
} from 'lucide-react'

/* ── Schema ───────────────────────────────── */
const formSchema = z.object({
  fullName:     z.string().min(3, 'Full name is required'),
  mobile:       z.string().min(10, 'Valid phone number required'),
  email:        z.string().email('Valid email required'),
  dateOfBirth:  z.string().min(1, 'Date of birth required'),
  profession:   z.string().min(1, 'Please select your profession'),
  interests:    z.array(z.string()).min(1, 'Select at least one area'),
  availability: z.string().min(1, 'Please select availability'),
})
type FormValues = z.infer<typeof formSchema>

/* ── Data ─────────────────────────────────── */
const interestOptions = [
  { id: 'cleanup',  label: 'Beach/Ward Cleanups',       icon: Waves,         accent: '#06b6d4' },
  { id: 'blood',    label: 'Blood Donation Camps',       icon: Droplet,       accent: '#ef4444' },
  { id: 'tech',     label: 'Tech Support for Elderly',   icon: Code,          accent: '#8b5cf6' },
  { id: 'teaching', label: 'Teaching & Mentoring',       icon: BookOpen,      accent: '#f59e0b' },
  { id: 'disaster', label: 'Disaster Relief',            icon: AlertTriangle, accent: '#f97316' },
  { id: 'events',   label: 'Event Management',           icon: Zap,           accent: '#10b981' },
]

const perks = [
  { icon: Award,  title: 'Official Recognition', desc: 'Earn a digital certificate signed by Councilor Faslim T.P.', accent: '#f59e0b' },
  { icon: Users,  title: 'Build Connections',    desc: 'Meet like-minded residents and local leaders in Ward 34.',   accent: '#3b82f6' },
  { icon: Zap,    title: 'Real Impact',          desc: 'Directly contribute to Make in Ezhara and EYIS projects.',  accent: '#10b981' },
]

/* ── Shared field style ───────────────────── */
const inputCls = `
  h-11 rounded-xl border border-slate-200 bg-slate-50 px-4 text-[14px] text-slate-800
  placeholder-slate-400 outline-none
  focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100
  transition-all duration-200
`.trim()

const labelCls = 'text-[12px] font-bold text-slate-500 uppercase tracking-[0.08em] mb-1.5 block'

/* ── Success screen ───────────────────────── */
function SuccessScreen({ name }: { name: string }) {
  const id = `VOL-${Math.random().toString(9).substring(2, 8).toUpperCase()}`
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex items-center justify-center px-5 py-16"
      style={{ background: '#f1f5f9', fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="w-full max-w-md">
        <div
          className="bg-white rounded-3xl border border-slate-100 overflow-hidden text-center"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}
        >
          {/* Top green band */}
          <div className="h-1.5 w-full bg-gradient-to-r from-emerald-400 to-teal-500" />

          <div className="p-10">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </motion.div>

            <h3
              className="text-slate-900 font-black mb-2"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', letterSpacing: '-0.03em' }}
            >
              Welcome aboard, {name}!
            </h3>
            <p className="text-slate-400 text-[14px] leading-relaxed max-w-xs mx-auto mb-8">
              We've sent a WhatsApp message with your Digital Volunteer ID and next steps.
            </p>

            {/* ID card */}
            <div className="flex flex-col items-center gap-1 py-5 px-6 rounded-2xl bg-slate-50 border border-slate-100 mb-8">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Your Volunteer ID</span>
              <span className="text-slate-900 font-black text-[1.8rem] tracking-widest" style={{ letterSpacing: '0.08em' }}>
                {id}
              </span>
              <span className="text-emerald-500 text-[11px] font-bold">Active · Verified</span>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => window.location.href = 'https://chat.whatsapp.com/ezharavolunteers'}
                className="w-full py-3.5 rounded-2xl text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-px"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)', boxShadow: '0 4px 16px rgba(22,163,74,0.3)' }}
              >
                Join Volunteer WhatsApp Group
              </button>
              <button
                onClick={() => window.location.href = '/services'}
                className="w-full py-3.5 rounded-2xl text-[14px] font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200"
              >
                Back to Services
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');`}</style>
    </motion.div>
  )
}

/* ── Main component ───────────────────────── */
export default function VolunteerRegistration() {
  const [submitted, setSubmitted]     = useState(false)
  const [isSubmitting, setSubmitting] = useState(false)
  const [volunteerName, setName]      = useState('')

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { fullName: '', mobile: '', email: '', dateOfBirth: '', profession: '', interests: [], availability: '' },
  })

  const selectedInterests = form.watch('interests') ?? []

  const toggleInterest = (id: string) => {
    const curr = form.getValues('interests')
    form.setValue('interests', curr.includes(id) ? curr.filter(i => i !== id) : [...curr, id], { shouldValidate: true })
  }

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true)
    setName(values.fullName)
    await new Promise(r => setTimeout(r, 1500))
    setSubmitting(false)
    setSubmitted(true)
  }

  if (submitted) return <SuccessScreen name={volunteerName} />

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}>

      {/* ── Clean white header ── */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-10">

          {/* Back */}
          <motion.div initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-200 mb-7"
            >
              <span className="w-7 h-7 rounded-xl border border-slate-200 bg-slate-50 group-hover:bg-white group-hover:border-slate-300 flex items-center justify-center transition-all duration-200 group-hover:-translate-x-0.5">
                <ArrowLeft className="w-3.5 h-3.5" />
              </span>
              Back to Services
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.04 }}
                className="flex items-center gap-2 mb-4"
              >
                <div className="h-px w-5 bg-cyan-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Ezhara Division 34 · Volunteer Force
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
              >
                Join the Ezhara
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4, #3b82f6)' }}>
                  Volunteer Force
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.14, duration: 0.45 }}
                className="text-slate-400 text-[15px] leading-relaxed max-w-md"
              >
                Whether you have 2 hours a month or 2 hours a week — your skills can make our ward cleaner, smarter, and safer.
              </motion.p>
            </div>

            {/* Perk pills desktop */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex flex-col gap-2 min-w-[200px]"
            >
              {perks.map((p, i) => {
                const Icon = p.icon
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}22` }}>
                      <Icon className="w-4 h-4" style={{ color: p.accent }} />
                    </div>
                    <span className="text-slate-600 font-semibold text-[12.5px]">{p.title}</span>
                  </div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">

          {/* ── Registration form ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                {/* Personal details card */}
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center gap-3 px-7 pt-6 pb-5 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                      <Users className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-[15px]">Personal Details</p>
                      <p className="text-slate-400 text-[12px]">Your basic information</p>
                    </div>
                  </div>

                  <div className="px-7 py-6 space-y-5">
                    <FormField control={form.control} name="fullName" render={({ field }) => (
                      <FormItem>
                        <label className={labelCls}>Full Name *</label>
                        <FormControl>
                          <input placeholder="Your full name" className={inputCls} {...field} />
                        </FormControl>
                        <FormMessage className="text-[12px] text-red-500 mt-1" />
                      </FormItem>
                    )} />

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="mobile" render={({ field }) => (
                        <FormItem>
                          <label className={labelCls}>Mobile Number *</label>
                          <FormControl>
                            <input type="tel" placeholder="+91 98765 43210" className={inputCls} {...field} />
                          </FormControl>
                          <FormMessage className="text-[12px] text-red-500 mt-1" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <label className={labelCls}>Email Address *</label>
                          <FormControl>
                            <input type="email" placeholder="you@example.com" className={inputCls} {...field} />
                          </FormControl>
                          <FormMessage className="text-[12px] text-red-500 mt-1" />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                        <FormItem>
                          <label className={labelCls}>Date of Birth *</label>
                          <FormControl>
                            <input type="date" className={inputCls} {...field} />
                          </FormControl>
                          <FormMessage className="text-[12px] text-red-500 mt-1" />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="profession" render={({ field }) => (
                        <FormItem>
                          <label className={labelCls}>Profession *</label>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className={`${inputCls} w-full`}>
                                <SelectValue placeholder="Select profession" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {['Student','Employed','Business Owner','Retired','Homemaker','Other'].map(v => (
                                <SelectItem key={v} value={v.toLowerCase().replace(' ', '-')}>{v}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[12px] text-red-500 mt-1" />
                        </FormItem>
                      )} />
                    </div>
                  </div>
                </div>

                {/* Interests card */}
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center gap-3 px-7 pt-6 pb-5 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-violet-500" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-[15px]">Areas of Interest</p>
                      <p className="text-slate-400 text-[12px]">Select at least one</p>
                    </div>
                  </div>

                  <div className="px-7 py-6">
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {interestOptions.map((opt) => {
                        const Icon = opt.icon
                        const active = selectedInterests.includes(opt.id)
                        return (
                          <motion.button
                            key={opt.id}
                            type="button"
                            whileHover={{ scale: 1.015 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                            onClick={() => toggleInterest(opt.id)}
                            className="flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all duration-200"
                            style={{
                              background: active ? `${opt.accent}10` : '#f8fafc',
                              borderColor: active ? `${opt.accent}35` : '#e2e8f0',
                              boxShadow: active ? `0 2px 12px ${opt.accent}18` : 'none',
                            }}
                          >
                            <div
                              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                              style={{
                                background: active ? `${opt.accent}18` : 'white',
                                border: `1px solid ${active ? opt.accent + '30' : '#e2e8f0'}`,
                              }}
                            >
                              <Icon className="w-4 h-4" style={{ color: active ? opt.accent : '#94a3b8' }} />
                            </div>
                            <span
                              className="text-[13px] font-semibold"
                              style={{ color: active ? '#0f172a' : '#64748b' }}
                            >
                              {opt.label}
                            </span>
                            {active && (
                              <div
                                className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ background: opt.accent }}
                              >
                                <CheckCircle2 className="w-3 h-3 text-white" />
                              </div>
                            )}
                          </motion.button>
                        )
                      })}
                    </div>
                    {form.formState.errors.interests && (
                      <p className="text-[12px] text-red-500 mt-3">{form.formState.errors.interests.message}</p>
                    )}
                  </div>
                </div>

                {/* Availability card */}
                <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center gap-3 px-7 pt-6 pb-5 border-b border-slate-100">
                    <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-amber-500" />
                    </div>
                    <div>
                      <p className="text-slate-900 font-bold text-[15px]">Your Availability</p>
                      <p className="text-slate-400 text-[12px]">How much time can you give?</p>
                    </div>
                  </div>
                  <div className="px-7 py-6">
                    <FormField control={form.control} name="availability" render={({ field }) => (
                      <FormItem>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className={`${inputCls} w-full`}>
                              <SelectValue placeholder="Select your availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="weekends">Weekends Only</SelectItem>
                            <SelectItem value="fewHours">A few hours a week</SelectItem>
                            <SelectItem value="emergency">On-call for emergencies</SelectItem>
                            <SelectItem value="flexible">Flexible schedule</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-[12px] text-red-500 mt-1" />
                      </FormItem>
                    )} />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                  className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 disabled:opacity-60"
                  style={{
                    background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #0284c7, #0369a1)',
                    boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(2,132,199,0.35)',
                  }}
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4.5 h-4.5 animate-spin" /> Submitting…</>
                  ) : (
                    <><Sparkles className="w-4.5 h-4.5" /> Count Me In!  <ChevronRight className="w-4 h-4" /></>
                  )}
                </motion.button>
              </form>
            </Form>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-4 sticky top-24"
          >
            {/* Perks */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-4">Why volunteer?</p>
              <div className="flex flex-col gap-4">
                {perks.map((p, i) => {
                  const Icon = p.icon
                  return (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${p.accent}12`, border: `1px solid ${p.accent}22` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: p.accent }} />
                      </div>
                      <div>
                        <p className="text-slate-700 font-bold text-[12.5px] mb-0.5">{p.title}</p>
                        <p className="text-slate-400 text-[12px] leading-relaxed">{p.desc}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Selection summary */}
            <AnimatePresence>
              {selectedInterests.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl border border-slate-100 p-5 overflow-hidden"
                  style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">Selected ({selectedInterests.length})</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInterests.map(id => {
                      const opt = interestOptions.find(o => o.id === id)!
                      return (
                        <span key={id} className="px-2.5 py-1 rounded-xl text-[11.5px] font-semibold" style={{ background: `${opt.accent}12`, color: opt.accent, border: `1px solid ${opt.accent}22` }}>
                          {opt.label}
                        </span>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CTA contact */}
            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-white font-bold text-[13px] mb-1">Have questions?</p>
              <p className="text-white/50 text-[12px] mb-3 leading-relaxed">Reach out to the ward volunteer coordinator directly.</p>
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-slate-100 transition-colors duration-200"
              >
                Call Coordinator
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </div>
  )
}