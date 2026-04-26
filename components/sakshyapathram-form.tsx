'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Form, FormField, FormItem, FormControl, FormMessage,
} from '@/components/ui/form'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'
import {
  ArrowLeft, FileText, Heart, Users, Award, Lightbulb, ScrollText,
  Upload, CheckCircle2, AlertCircle, Loader2, X, ChevronRight,
  Shield, Info, Clock,
} from 'lucide-react'
import { createCertificateRequest } from '@/lib/services/certificates'

/* ── Schema ───────────────────────────────── */
const formSchema = z.object({
  certificateType: z.string().min(1, 'Please select a certificate type'),
  fullName:        z.string().min(3, 'Full name is required'),
  houseName:       z.string().min(2, 'House name/number is required'),
  ward:            z.string().default('Ezhara Division 34'),
  phone:           z.string().min(10, 'Valid phone number required'),
  aadhaar:         z.string().min(4, 'Aadhaar last 4 digits required'),
  purpose:         z.string().min(10, 'Purpose description required'),
  documents:       z.array(z.string()).optional(),
  declaration:     z.boolean().refine(v => v === true, { message: 'You must accept the declaration' }),
})
type FormValues = z.infer<typeof formSchema>

/* ── Certificate types ────────────────────── */
const certTypes = [
  { id: 'residential',  title: 'Residential Certificate',           sub: 'വസതി സർട്ടിഫിക്കറ്റ്',             icon: FileText,   accent: '#3b82f6' },
  { id: 'income',       title: 'Income Recommendation',             sub: 'വരുമാന ശുപാർശ',                     icon: Heart,      accent: '#10b981' },
  { id: 'life',         title: 'Life Certificate',                  sub: 'ജീവൻ്റെ സർട്ടിഫിക്കറ്റ്',          icon: Users,      accent: '#f59e0b' },
  { id: 'dependency',   title: 'Relationship / Dependency',         sub: 'ബന്ധം സർട്ടിഫിക്കറ്റ്',            icon: Award,      accent: '#8b5cf6' },
  { id: 'character',    title: 'Character / Conduct Certificate',   sub: 'ചരിത്ര സർട്ടിഫിക്കറ്റ്',           icon: Lightbulb,  accent: '#f97316' },
  { id: 'other',        title: 'General / Other Recommendation',    sub: 'മറ്റ് ശുപാർശ',                     icon: ScrollText, accent: '#06b6d4' },
]

/* ── Shared styles ────────────────────────── */
const inputCls = `
  h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-[14px] text-slate-800
  placeholder-slate-400 outline-none transition-all duration-200
  focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100
`.trim()

const labelCls = 'text-[11.5px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block'

/* ── Success screen ───────────────────────── */
function SuccessScreen({ certTitle, referenceId }: { certTitle: string; referenceId: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex items-center justify-center px-5 py-16"
      style={{ background: '#f1f5f9', fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden text-center" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
          <div className="h-1.5 w-full bg-gradient-to-r from-indigo-400 to-blue-500" />
          <div className="p-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.15 }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-indigo-500" />
            </motion.div>

            <h3 className="text-slate-900 font-black mb-2" style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', letterSpacing: '-0.03em' }}>
              Application Submitted!
            </h3>
            <p className="text-slate-400 text-[14px] leading-relaxed max-w-xs mx-auto mb-8">
              Your <strong className="text-slate-600">{certTitle}</strong> application is with Councilor Faslim T.P. for verification.
            </p>

            {/* Reference ID */}
            <div className="flex flex-col items-center gap-1 py-5 px-6 rounded-2xl bg-slate-50 border border-slate-100 mb-3">
              <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Reference ID</span>
              <span className="text-slate-900 font-black text-[1.8rem]" style={{ letterSpacing: '0.06em' }}>{referenceId}</span>
              <span className="text-indigo-500 text-[11px] font-bold">Processing · 3–5 business days</span>
            </div>

            <p className="text-slate-400 text-[12px] mb-6">You'll receive an SMS with a download link once approved.</p>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => window.location.href = '/services'}
                className="w-full py-3.5 rounded-2xl text-[14px] font-bold text-white hover:-translate-y-px transition-all duration-200"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #4338ca)', boxShadow: '0 4px 16px rgba(79,70,229,0.3)' }}
              >
                Back to Services
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full py-3.5 rounded-2xl text-[14px] font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');`}</style>
    </motion.div>
  )
}

/* ── Main ─────────────────────────────────── */
export default function SakshyapathramForm() {
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted]   = useState(false)
  const [referenceId, setReferenceId]   = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { certificateType: '', fullName: '', houseName: '', ward: 'Ezhara Division 34', phone: '', aadhaar: '', purpose: '', documents: [], declaration: false },
  })

  const selectedCert = certTypes.find(c => c.id === selectedType)

  const onSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true)
      const res = await createCertificateRequest({
        certificate_type: values.certificateType,
        full_name: values.fullName,
        house_name: values.houseName,
        phone: values.phone,
        aadhaar: values.aadhaar,
        purpose: values.purpose,
      })
      setReferenceId(res.reference_id)
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting certificate request:', error)
      alert(error instanceof Error ? error.message : 'Failed to submit application')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length) setUploadedFiles(prev => [...prev, ...files])
  }

  const removeFile = (i: number) => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))

  if (isSubmitted) return <SuccessScreen certTitle={selectedCert?.title ?? 'Certificate'} referenceId={referenceId} />

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}>

      {/* ── White header ── */}
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
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.04 }} className="flex items-center gap-2 mb-4">
                <div className="h-px w-5 bg-indigo-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Ezhara Division 34 · Official Documents</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
              >
                Request
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #4f46e5, #7c3aed)' }}>
                  Sakshyapathram
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14, duration: 0.45 }} className="text-slate-400 text-[15px] leading-relaxed max-w-md">
                Apply for official certificates and recommendations from Councilor Faslim T.P. — digitally, in minutes.
              </motion.p>
            </div>

            {/* Info pills */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="hidden lg:flex flex-col gap-2 min-w-[190px]"
            >
              {[
                { icon: Clock,  label: '3–5 business days', sub: 'Processing time' },
                { icon: Shield, label: 'Digitally signed',  sub: 'By Councilor Faslim T.P.' },
                { icon: Info,   label: 'Free of charge',    sub: 'No fees required' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                    <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div>
                      <p className="text-slate-700 font-bold text-[12.5px] leading-none">{item.label}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                )
              })}
            </motion.div>
          </div>

          {/* Step indicator */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-7 flex items-center gap-2"
          >
            {['Select Type', 'Fill Details', 'Submit'].map((step, i) => {
              const stepNum = i + 1
              const active = selectedType ? (stepNum <= 2) : stepNum === 1
              const done   = selectedType && stepNum === 1
              return (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-300"
                      style={{
                        background: done ? '#4f46e5' : active ? '#4f46e510' : '#f1f5f9',
                        color: done ? 'white' : active ? '#4f46e5' : '#94a3b8',
                        border: `1.5px solid ${done ? '#4f46e5' : active ? '#4f46e530' : '#e2e8f0'}`,
                      }}
                    >
                      {done ? <CheckCircle2 className="w-3.5 h-3.5" /> : stepNum}
                    </div>
                    <span className="text-[12px] font-semibold hidden sm:block" style={{ color: active ? '#0f172a' : '#94a3b8' }}>
                      {step}
                    </span>
                  </div>
                  {i < 2 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <AnimatePresence mode="wait">

          {/* ═══ STEP 1: Certificate picker ═══ */}
          {!selectedType && (
            <motion.div
              key="picker"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[11.5px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-4">Choose certificate type</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {certTypes.map((cert, i) => {
                  const Icon = cert.icon
                  return (
                    <motion.button
                      key={cert.id}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.38, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4, scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => { setSelectedType(cert.id); form.setValue('certificateType', cert.id) }}
                      className="group relative flex flex-col text-left p-5 bg-white rounded-2xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
                      style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
                    >
                      {/* Top accent */}
                      <div
                        className="absolute top-0 left-0 right-0 h-[2.5px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                        style={{ background: `linear-gradient(90deg, ${cert.accent}, ${cert.accent}55)` }}
                      />

                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3"
                        style={{ background: `${cert.accent}12`, border: `1.5px solid ${cert.accent}28` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: cert.accent }} />
                      </div>

                      <p className="text-slate-900 font-bold text-[14px] leading-snug mb-1">{cert.title}</p>
                      <p className="text-slate-400 text-[12px] leading-snug flex-1">{cert.sub}</p>

                      <div
                        className="flex items-center gap-1 mt-4 text-[11.5px] font-bold group-hover:gap-2 transition-all duration-200"
                        style={{ color: cert.accent }}
                      >
                        Apply Now <ChevronRight className="w-3.5 h-3.5" />
                      </div>

                      {/* Hover wash */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: `radial-gradient(ellipse at 50% 110%, ${cert.accent}07, transparent 65%)` }}
                      />
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          )}

          {/* ═══ STEP 2: Application form ═══ */}
          {selectedType && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid lg:grid-cols-[1fr_260px] gap-8 items-start">

                {/* ── Form cards ── */}
                <div className="space-y-5">

                  {/* Change type button */}
                  <button
                    onClick={() => { setSelectedType(null); form.reset() }}
                    className="group flex items-center gap-2 text-[13px] font-semibold text-slate-400 hover:text-slate-700 transition-colors duration-200"
                  >
                    <span className="w-6 h-6 rounded-lg border border-slate-200 bg-slate-50 group-hover:bg-white flex items-center justify-center group-hover:-translate-x-0.5 transition-all duration-200">
                      <ArrowLeft className="w-3 h-3" />
                    </span>
                    Change certificate type
                  </button>

                  {/* Selected cert indicator */}
                  {selectedCert && (
                    <div
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl border"
                      style={{ background: `${selectedCert.accent}08`, borderColor: `${selectedCert.accent}25` }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: `${selectedCert.accent}15`, border: `1px solid ${selectedCert.accent}25` }}
                      >
                        <selectedCert.icon className="w-4 h-4" style={{ color: selectedCert.accent }} />
                      </div>
                      <div>
                        <p className="text-slate-900 font-bold text-[13px]">{selectedCert.title}</p>
                        <p className="text-slate-400 text-[11px]">{selectedCert.sub}</p>
                      </div>
                      <CheckCircle2 className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: selectedCert.accent }} />
                    </div>
                  )}

                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

                      {/* Personal details card */}
                      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                        <div className="flex items-center gap-3 px-7 pt-6 pb-5 border-b border-slate-100">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center">
                            <Users className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-slate-900 font-bold text-[15px]">Applicant Details</p>
                            <p className="text-slate-400 text-[12px]">Your personal information</p>
                          </div>
                        </div>
                        <div className="px-7 py-6 space-y-5">
                          <FormField control={form.control} name="fullName" render={({ field }) => (
                            <FormItem>
                              <label className={labelCls}>Full Name *</label>
                              <FormControl><input placeholder="Your full name" className={inputCls} {...field} /></FormControl>
                              <FormMessage className="text-[12px] text-red-500 mt-1" />
                            </FormItem>
                          )} />
                          <div className="grid sm:grid-cols-2 gap-5">
                            <FormField control={form.control} name="houseName" render={({ field }) => (
                              <FormItem>
                                <label className={labelCls}>House Name / Number *</label>
                                <FormControl><input placeholder="e.g. Sunrise Villa, 14B" className={inputCls} {...field} /></FormControl>
                                <FormMessage className="text-[12px] text-red-500 mt-1" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="ward" render={({ field }) => (
                              <FormItem>
                                <label className={labelCls}>Ward</label>
                                <FormControl>
                                  <input disabled className={`${inputCls} opacity-50 cursor-not-allowed`} {...field} />
                                </FormControl>
                              </FormItem>
                            )} />
                          </div>
                          <div className="grid sm:grid-cols-2 gap-5">
                            <FormField control={form.control} name="phone" render={({ field }) => (
                              <FormItem>
                                <label className={labelCls}>Phone Number *</label>
                                <FormControl><input type="tel" placeholder="+91 98765 43210" className={inputCls} {...field} /></FormControl>
                                <FormMessage className="text-[12px] text-red-500 mt-1" />
                              </FormItem>
                            )} />
                            <FormField control={form.control} name="aadhaar" render={({ field }) => (
                              <FormItem>
                                <label className={labelCls}>Aadhaar Last 4 Digits *</label>
                                <FormControl>
                                  <input placeholder="XXXX" maxLength={4} className={`${inputCls} tracking-[0.3em] text-center font-bold`} {...field} />
                                </FormControl>
                                <FormMessage className="text-[12px] text-red-500 mt-1" />
                              </FormItem>
                            )} />
                          </div>
                        </div>
                      </div>

                      {/* Purpose card */}
                      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                        <div className="flex items-center gap-3 px-7 pt-6 pb-5 border-b border-slate-100">
                          <div className="w-9 h-9 rounded-xl bg-violet-50 border border-violet-100 flex items-center justify-center">
                            <ScrollText className="w-4 h-4 text-violet-500" />
                          </div>
                          <div>
                            <p className="text-slate-900 font-bold text-[15px]">Purpose</p>
                            <p className="text-slate-400 text-[12px]">Why do you need this certificate?</p>
                          </div>
                        </div>
                        <div className="px-7 py-6">
                          <FormField control={form.control} name="purpose" render={({ field }) => (
                            <FormItem>
                              <label className={labelCls}>Explain briefly *</label>
                              <FormControl>
                                <textarea
                                  placeholder="e.g. For educational loan, pension application, job verification..."
                                  rows={4}
                                  className={`${inputCls} h-auto py-3 resize-none`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage className="text-[12px] text-red-500 mt-1" />
                            </FormItem>
                          )} />
                        </div>
                      </div>

                      {/* Documents card */}
                      <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden" style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04)' }}>
                        <div className="flex items-center gap-3 px-7 pt-6 pb-5 border-b border-slate-100">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center">
                            <Upload className="w-4 h-4 text-amber-500" />
                          </div>
                          <div>
                            <p className="text-slate-900 font-bold text-[15px]">Supporting Documents</p>
                            <p className="text-slate-400 text-[12px]">Aadhaar, Ration Card, ID Proof (optional)</p>
                          </div>
                        </div>
                        <div className="px-7 py-6">
                          <label className="flex flex-col items-center gap-3 p-8 rounded-2xl border-2 border-dashed border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40 transition-all duration-200 cursor-pointer group">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors duration-200">
                              <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors duration-200" />
                            </div>
                            <div className="text-center">
                              <p className="text-slate-700 font-semibold text-[13.5px]">Click to upload or drag & drop</p>
                              <p className="text-slate-400 text-[12px] mt-0.5">PDF, JPG, PNG — max 5MB each</p>
                            </div>
                            <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileUpload} className="hidden" />
                          </label>

                          {uploadedFiles.length > 0 && (
                            <div className="mt-4 space-y-2">
                              {uploadedFiles.map((file, i) => (
                                <div key={i} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-xl border border-slate-100">
                                  <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                                  <span className="flex-1 text-[12.5px] text-slate-600 font-medium truncate">{file.name}</span>
                                  <button type="button" onClick={() => removeFile(i)} className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 text-slate-300 hover:text-red-500 transition-all">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Declaration */}
                      <FormField control={form.control} name="declaration" render={({ field }) => (
                        <FormItem>
                          <div
                            className="flex items-start gap-3 p-5 rounded-2xl border cursor-pointer transition-all duration-200"
                            style={{
                              background: field.value ? '#4f46e508' : 'white',
                              borderColor: field.value ? '#4f46e530' : '#e2e8f0',
                            }}
                            onClick={() => form.setValue('declaration', !field.value, { shouldValidate: true })}
                          >
                            <div
                              className="w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center transition-all duration-200"
                              style={{
                                background: field.value ? '#4f46e5' : 'white',
                                border: `2px solid ${field.value ? '#4f46e5' : '#cbd5e1'}`,
                              }}
                            >
                              {field.value && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <div>
                              <p className="text-slate-700 font-semibold text-[13.5px] leading-snug">
                                I declare that all information provided is true and accurate to the best of my knowledge.
                              </p>
                              <p className="text-slate-400 text-[12px] mt-1">False declarations may result in rejection of your application.</p>
                            </div>
                          </div>
                          <FormMessage className="text-[12px] text-red-500 mt-1 ml-1" />
                        </FormItem>
                      )} />

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                        className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 disabled:opacity-60"
                        style={{
                          background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #4338ca)',
                          boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(79,70,229,0.35)',
                        }}
                      >
                        {isSubmitting
                          ? <><Loader2 className="w-4.5 h-4.5 animate-spin" /> Submitting…</>
                          : <><CheckCircle2 className="w-4.5 h-4.5" /> Submit Application <ChevronRight className="w-4 h-4" /></>
                        }
                      </motion.button>
                    </form>
                  </Form>
                </div>

                {/* ── Sidebar ── */}
                <div className="flex flex-col gap-4 sticky top-24">
                  {/* Info note */}
                  <div className="bg-indigo-50 rounded-2xl border border-indigo-100 p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-indigo-500 flex-shrink-0" />
                      <p className="text-indigo-700 font-bold text-[12.5px]">How it works</p>
                    </div>
                    <p className="text-indigo-600/70 text-[12px] leading-relaxed">
                      Once approved, you'll receive an SMS with a link to download your digitally signed Sakshyapathram. Physical copies can be collected from the Ward Office.
                    </p>
                  </div>

                  {/* What to bring */}
                  <div className="bg-white rounded-2xl border border-slate-100 p-5" style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400 mb-3">What you may need</p>
                    <ul className="space-y-2">
                      {['Aadhaar card (last 4 digits)', 'House name or number', 'Valid phone number', 'Purpose in clear words'].map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                          <span className="text-slate-500 text-[12.5px] leading-snug">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Contact card */}
                  <div className="bg-slate-900 rounded-2xl p-5">
                    <p className="text-white font-bold text-[13px] mb-1">Need assistance?</p>
                    <p className="text-white/50 text-[12px] mb-3 leading-relaxed">Call the ward office for help with your application.</p>
                    <a
                      href="tel:+919876543210"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-white text-slate-900 text-[13px] font-bold hover:bg-slate-100 transition-colors duration-200"
                    >
                      Call Ward Office
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
      `}</style>
    </div>
  )
}