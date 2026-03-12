'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft, Users, Heart, Home, Leaf, Download, ExternalLink,
  FileText, BadgeCheck, Banknote, ChevronDown, ChevronRight,
  CheckCircle2, Clock, XCircle, Info, Phone, X, Upload,
  ShieldCheck, Loader2, Sparkles,
} from 'lucide-react'
import {
  Dialog, DialogContent, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

/* ── Data ─────────────────────────────────────────── */
const schemes = [
  {
    id: 1, name: 'Old Age Pension (Sevana)', category: 'Pensions', icon: Users, status: 'open',
    benefit: '₹1,600 / month', accent: '#3b82f6',
    eligibility: ['Age 60 years or above', 'Kerala resident for minimum 3 years', 'Annual income below ₹1 Lakh'],
    documents: ['Aadhaar Card', 'Birth Certificate', 'Income Certificate', 'Bank Passbook'],
  },
  {
    id: 2, name: 'Widow Pension', category: 'Pensions', icon: Heart, status: 'open',
    benefit: '₹1,600 / month', accent: '#f43f5e',
    eligibility: ['Widow aged 30 years or above', 'Resident of Kerala', 'Annual income below ₹1 Lakh'],
    documents: ['Aadhaar Card', 'Marriage Certificate', 'Death Certificate', 'Income Certificate'],
  },
  {
    id: 3, name: 'LIFE Mission Housing', category: 'Housing', icon: Home, status: 'open',
    benefit: 'Free Housing', accent: '#10b981',
    eligibility: ['Homeless or substandard housing', 'Annual income below specified limits', 'Registered in PMAY or LIS'],
    documents: ['Aadhaar Card', 'Income Certificate', 'Property Documents', 'House Verification'],
  },
  {
    id: 4, name: 'PM Kisan Samman Nidhi', category: 'Farmer', icon: Leaf, status: 'open',
    benefit: '₹6,000 / year', accent: '#16a34a',
    eligibility: ['Landholding farmers', 'Land up to 2 hectares', 'All eligible farmers irrespective of income'],
    documents: ['Aadhaar Card', 'Land Records', 'Bank Passbook'],
  },
  {
    id: 5, name: 'Ayushman Bharat Health', category: 'Health', icon: Heart, status: 'open',
    benefit: '₹5 Lakh coverage', accent: '#ef4444',
    eligibility: ['Below poverty line families', 'APL families (state determined)', 'Beneficiaries in SECC'],
    documents: ['Aadhaar Card', 'BPL Certificate', 'Ration Card'],
  },
  {
    id: 6, name: 'SC/ST Student Scholarship', category: 'Education', icon: FileText, status: 'closed',
    benefit: '₹5,000 – ₹20,000', accent: '#8b5cf6',
    eligibility: ['SC/ST caste students', 'Studying in recognized institutions', 'Annual income below specified limits'],
    documents: ['Aadhaar Card', 'Caste Certificate', 'Income Certificate', 'Student ID'],
  },
]

const processSteps = [
  { icon: FileText,  title: 'Gather Docs',          desc: 'Collect all required documents' },
  { icon: Home,      title: 'Submit',               desc: 'At Akshaya or Ward Office' },
  { icon: BadgeCheck,title: 'Verification',         desc: 'Councilor reviews application' },
  { icon: Banknote,  title: 'Disbursement',         desc: 'Funds transferred directly' },
]

const categoryAccents: Record<string, string> = {
  All: '#64748b', Pensions: '#3b82f6', Housing: '#10b981',
  Farmer: '#16a34a', Health: '#ef4444', Education: '#8b5cf6',
}

const allSchemeOptions = [
  'Old Age Pension (Sevana)',
  'Widow Pension',
  'Disability Pension',
  'LIFE Mission Housing',
  'PM Kisan Samman Nidhi',
  'Ayushman Bharat Health',
  'SC/ST Student Scholarship',
  'Minority Welfare Scholarship',
  'General / Other Scheme',
]

/* ── Input style ──────────────────────────────────── */
const inputCls = `
  w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-[13.5px] text-slate-800
  placeholder-slate-400 outline-none transition-all duration-200
  focus:bg-white focus:border-slate-300 focus:ring-2 focus:ring-slate-100
`.trim()

/* ── Scheme card ──────────────────────────────────── */
function SchemeCard({ scheme, i, onApply }: { scheme: typeof schemes[0]; i: number; onApply: (name: string) => void }) {
  const [openSection, setOpenSection] = useState<string | null>(null)
  const Icon = scheme.icon
  const isOpen = scheme.status === 'open'

  const toggle = (sec: string) => setOpenSection(prev => prev === sec ? null : sec)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
      style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
    >
      {/* Left accent strip */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px]" style={{ background: scheme.accent }} />

      {/* Top slide bar on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        style={{ background: `linear-gradient(90deg, ${scheme.accent}, ${scheme.accent}44)` }}
      />

      <div className="pl-6 pr-5 pt-5 pb-5 flex flex-col flex-1 gap-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-200 group-hover:scale-110"
              style={{ background: `${scheme.accent}12`, border: `1.5px solid ${scheme.accent}28` }}
            >
              <Icon className="w-5 h-5" style={{ color: scheme.accent }} />
            </div>
            <div>
              <h3 className="text-slate-900 font-bold text-[14px] leading-snug">{scheme.name}</h3>
              <p className="text-slate-400 text-[11.5px] mt-0.5">{scheme.category}</p>
            </div>
          </div>
          <span
            className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-xl flex-shrink-0"
            style={{
              color: isOpen ? '#16a34a' : '#94a3b8',
              background: isOpen ? '#dcfce7' : '#f1f5f9',
              border: `1px solid ${isOpen ? '#bbf7d0' : '#e2e8f0'}`,
            }}
          >
            {isOpen
              ? <><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />Open</>
              : <><XCircle className="w-3 h-3" />Closed</>
            }
          </span>
        </div>

        {/* Benefit pill */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{ background: `${scheme.accent}08`, border: `1px solid ${scheme.accent}18` }}
        >
          <Banknote className="w-4 h-4 flex-shrink-0" style={{ color: scheme.accent }} />
          <div>
            <p className="text-slate-400 text-[10.5px] font-semibold uppercase tracking-wider">Benefit</p>
            <p className="font-black text-[1.1rem] leading-tight" style={{ color: scheme.accent, letterSpacing: '-0.02em' }}>
              {scheme.benefit}
            </p>
          </div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-1.5">
          {[
            { key: 'eligibility', label: 'Who can apply?',       items: scheme.eligibility, dotColor: scheme.accent },
            { key: 'documents',   label: 'Documents Required',   items: scheme.documents,   dotColor: scheme.accent },
          ].map(({ key, label, items, dotColor }) => (
            <div key={key} className="rounded-xl border border-slate-100 overflow-hidden">
              <button
                onClick={() => toggle(key)}
                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-50 transition-colors duration-150"
              >
                <span className="text-[12.5px] font-semibold text-slate-700">{label}</span>
                <motion.div animate={{ rotate: openSection === key ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openSection === key && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-1 flex flex-col gap-2">
                      {items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: dotColor }} />
                          <span className="text-slate-500 text-[12.5px] leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Actions */}
        {isOpen ? (
          <div className="flex gap-2 mt-auto pt-2">
            <button className="group/btn flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12.5px] font-semibold border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-slate-600 hover:text-slate-900 transition-all duration-200">
              <Download className="w-3.5 h-3.5" /> Download Form
            </button>
            <button
              onClick={() => onApply(scheme.name)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12.5px] font-bold text-white transition-all duration-200 hover:-translate-y-px"
              style={{ background: `linear-gradient(135deg, ${scheme.accent}, ${scheme.accent}cc)`, boxShadow: `0 3px 12px ${scheme.accent}30` }}
            >
              <ExternalLink className="w-3.5 h-3.5" /> Apply Now
            </button>
          </div>
        ) : (
          <div className="mt-auto pt-2 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-100">
            <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="text-slate-400 text-[12px] font-medium">Applications currently closed. Check back soon.</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Application Modal ────────────────────────────── */
function ApplicationModal({
  open, onClose, preselectedScheme,
}: { open: boolean; onClose: () => void; preselectedScheme: string }) {
  const [selectedScheme, setSelectedScheme] = useState(preselectedScheme)
  const [isSubmitting, setIsSubmitting]     = useState(false)
  const [isSuccess, setIsSuccess]           = useState(false)
  const [uploadedFile, setUploadedFile]     = useState<File | null>(null)
  const [isDragging, setIsDragging]         = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Sync preselected scheme when modal opens with a new scheme
  const handleOpenChange = (o: boolean) => {
    if (!o) { onClose(); setIsSuccess(false); setSelectedScheme(preselectedScheme) }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) setUploadedFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(r => setTimeout(r, 1800))
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="p-0 border-0 bg-transparent shadow-none max-w-lg w-full"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="relative bg-white rounded-3xl overflow-hidden"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.06)' }}
            >
              {/* Gradient top bar */}
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)' }} />

              {/* Header */}
              <div className="px-7 pt-6 pb-5 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div>
                    <DialogTitle className="text-slate-900 font-black text-[1.2rem] leading-tight" style={{ letterSpacing: '-0.03em' }}>
                      Apply for Welfare Scheme
                    </DialogTitle>
                    <DialogDescription className="text-slate-400 text-[12.5px] mt-1 leading-relaxed">
                      Submit your details and our ward office will assist with final processing.
                    </DialogDescription>
                  </div>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-xl text-slate-400 hover:text-slate-700 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-white transition-all duration-200 flex-shrink-0 ml-4 mt-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable form body */}
              <div className="overflow-y-auto max-h-[70vh]">
                <form onSubmit={handleSubmit}>
                  <div className="px-7 py-6 space-y-5">

                    {/* Scheme select */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">
                        Selected Scheme *
                      </label>
                      <Select value={selectedScheme} onValueChange={setSelectedScheme}>
                        <SelectTrigger className={`${inputCls} flex items-center gap-2`}>
                          <SelectValue placeholder="Choose a scheme" />
                        </SelectTrigger>
                        <SelectContent>
                          {allSchemeOptions.map(s => (
                            <SelectItem key={s} value={s}>{s}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {selectedScheme && (
                        <motion.div
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                          <span className="text-blue-600 text-[12px] font-semibold">{selectedScheme} — auto-selected</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-[10.5px] font-bold text-slate-300 uppercase tracking-widest">Applicant Details</span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    {/* Full name */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">Full Name (as per Aadhaar) *</label>
                      <input required placeholder="e.g. Fathima Beevi K" className={inputCls} />
                    </div>

                    {/* DOB + Mobile */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">Date of Birth *</label>
                        <input required type="date" className={inputCls} />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">Mobile Number *</label>
                        <div className="relative">
                          <input required type="tel" placeholder="+91 98765 43210" className={inputCls} />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors">
                            Send OTP
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Aadhaar */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">Aadhaar Number *</label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          placeholder="XXXX  XXXX  XXXX"
                          maxLength={14}
                          className={`${inputCls} tracking-[0.2em] font-bold`}
                        />
                        <ShieldCheck className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                      </div>
                      <p className="text-slate-400 text-[11px] mt-1">Your Aadhaar is securely processed and never stored.</p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-[10.5px] font-bold text-slate-300 uppercase tracking-widest">Address</span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    {/* House + Ward */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">House Name / Number *</label>
                        <input required placeholder="e.g. Sunrise Villa, 14B" className={inputCls} />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">Division / Ward</label>
                        <input
                          disabled
                          value="Ezhara Division 34"
                          className={`${inputCls} opacity-50 cursor-not-allowed`}
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-100" />
                      <span className="text-[10.5px] font-bold text-slate-300 uppercase tracking-widest">Document Upload</span>
                      <div className="h-px flex-1 bg-slate-100" />
                    </div>

                    {/* Drag & drop upload */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-400 mb-1.5 block">Aadhaar / Ration Card Copy (Optional)</label>
                      <div
                        onDragOver={e => { e.preventDefault(); setIsDragging(true) }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => fileRef.current?.click()}
                        className="flex flex-col items-center gap-2 p-5 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200"
                        style={{
                          borderColor: isDragging ? '#3b82f6' : '#e2e8f0',
                          background: isDragging ? 'rgba(59,130,246,0.04)' : '#f8fafc',
                        }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${isDragging ? 'bg-blue-100' : 'bg-slate-100'}`}>
                          <Upload className={`w-4.5 h-4.5 transition-colors duration-200 ${isDragging ? 'text-blue-500' : 'text-slate-400'}`} />
                        </div>
                        {uploadedFile ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                            <span className="text-slate-700 font-semibold text-[12.5px]">{uploadedFile.name}</span>
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); setUploadedFile(null) }}
                              className="text-slate-400 hover:text-red-500 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <p className="text-slate-600 font-semibold text-[13px]">Drop file here or click to upload</p>
                            <p className="text-slate-400 text-[11.5px]">PDF, JPG, PNG — max 5MB</p>
                          </>
                        )}
                        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden"
                          onChange={e => { const f = e.target.files?.[0]; if (f) setUploadedFile(f) }} />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-7 pb-7 pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || !selectedScheme}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl text-[15px] font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        background: isSubmitting ? '#94a3b8' : 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 60%, #6366f1 100%)',
                        boxShadow: isSubmitting ? 'none' : '0 6px 28px rgba(59,130,246,0.4), 0 2px 8px rgba(6,182,212,0.3)',
                      }}
                    >
                      {isSubmitting
                        ? <><Loader2 className="w-5 h-5 animate-spin" />Submitting…</>
                        : <><Sparkles className="w-4.5 h-4.5" />Submit Application</>
                      }
                    </motion.button>
                    <p className="text-center text-slate-400 text-[11.5px] mt-3 leading-relaxed">
                      By submitting, you consent to the ward office contacting you regarding this application.
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            /* ── Success state ── */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="bg-white rounded-3xl overflow-hidden text-center"
              style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.2)' }}
            >
              <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #10b981, #06b6d4)' }} />
              <div className="p-10">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
                  className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-emerald-50 border border-emerald-100 mb-5"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </motion.div>
                <h3 className="text-slate-900 font-black text-[1.5rem] mb-2" style={{ letterSpacing: '-0.03em' }}>Application Submitted!</h3>
                <p className="text-slate-400 text-[13.5px] leading-relaxed max-w-xs mx-auto mb-6">
                  Your <strong className="text-slate-600">{selectedScheme}</strong> application has been received by the ward office.
                </p>
                <div className="flex flex-col items-center gap-1 py-4 px-6 rounded-2xl bg-slate-50 border border-slate-100 mb-6">
                  <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-400">Reference ID</span>
                  <span className="text-slate-900 font-black text-[1.7rem]" style={{ letterSpacing: '0.06em' }}>
                    WLF-{Math.random().toString(9).substring(2, 8).toUpperCase()}
                  </span>
                  <span className="text-emerald-500 text-[11px] font-bold">Processing · 5–7 business days</span>
                </div>
                <button
                  onClick={() => { onClose(); setIsSuccess(false) }}
                  className="w-full py-3.5 rounded-2xl text-[14px] font-bold text-white transition-all duration-200 hover:-translate-y-px"
                  style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 4px 16px rgba(5,150,105,0.3)' }}
                >
                  Done
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  )
}

/* ── Main page ────────────────────────────────────── */
export default function WelfareSchemesPage() {
  const [selectedCategory, setCategory] = useState('All')
  const [modalOpen, setModalOpen]       = useState(false)
  const [activeScheme, setActiveScheme] = useState('')

  const openModal = (schemeName: string) => { setActiveScheme(schemeName); setModalOpen(true) }

  const categories = ['All', ...Array.from(new Set(schemes.map(s => s.category)))]
  const filtered = selectedCategory === 'All' ? schemes : schemes.filter(s => s.category === selectedCategory)

  const openCount  = filtered.filter(s => s.status === 'open').length
  const totalCount = filtered.length

  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans', sans-serif", background: '#f1f5f9' }}>

      {/* ── White header ── */}
      <div className="bg-white border-b border-slate-100" style={{ boxShadow: '0 1px 0 rgba(0,0,0,0.04)' }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 pt-8 pb-10">

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
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 }} className="flex items-center gap-2 mb-4">
                <div className="h-px w-5 bg-emerald-400" />
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">Ezhara Division 34 · Government Schemes</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="text-slate-900 font-black leading-[1.02] mb-3"
                style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', letterSpacing: '-0.04em' }}
              >
                Welfare Schemes
                <br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #059669, #10b981)' }}>
                  & Pensions
                </span>
              </motion.h1>

              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.14 }} className="text-slate-400 text-[15px] leading-relaxed max-w-md">
                Financial assistance and pension schemes from State and Central Government — find what you're eligible for.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="hidden lg:grid grid-cols-2 gap-2.5 min-w-[200px]"
            >
              {[
                { value: `${openCount}`, label: 'Open Schemes', color: '#10b981' },
                { value: `${totalCount}`,  label: 'Total Schemes', color: '#3b82f6' },
                { value: '5', label: 'Categories',       color: '#8b5cf6' },
                { value: '24h', label: 'Response Time',  color: '#f59e0b' },
              ].map((s, i) => (
                <div key={i} className="flex flex-col gap-1 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="font-black text-[1.3rem] leading-none" style={{ color: s.color, letterSpacing: '-0.04em' }}>{s.value}</span>
                  <span className="text-slate-400 text-[10.5px] font-semibold uppercase tracking-wider leading-tight">{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Process steps trail */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 flex items-center gap-0 overflow-x-auto scrollbar-none"
          >
            {processSteps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="flex items-center flex-shrink-0">
                  <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl">
                    <div className="w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
                      <Icon className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-[11.5px] font-bold text-slate-600 leading-none">{step.title}</p>
                      <p className="text-[10.5px] text-slate-400 mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                  {i < processSteps.length - 1 && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-200 flex-shrink-0" />
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* Category filter underline tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.24 }}
            className="mt-6 flex gap-0 overflow-x-auto scrollbar-none border-t border-slate-100 pt-2"
          >
            {categories.map(cat => {
              const isActive = selectedCategory === cat
              const accent = categoryAccents[cat] ?? '#64748b'
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className="relative flex-shrink-0 px-4 py-3 text-[12.5px] font-semibold transition-colors duration-200 whitespace-nowrap"
                  style={{ color: isActive ? '#0f172a' : '#94a3b8' }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="welfare-tab"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] rounded-t-full"
                      style={{ background: accent }}
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  {cat}
                </button>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* ── Schemes grid ── */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[12.5px] font-semibold text-slate-400">
            <strong className="text-slate-700">{filtered.length}</strong> scheme{filtered.length !== 1 ? 's' : ''} in{' '}
            <strong className="text-slate-700">{selectedCategory}</strong>
            {' · '}
            <span className="text-emerald-600 font-bold">{openCount} open</span>
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-4"
          >
            {filtered.map((scheme, i) => (
              <SchemeCard key={scheme.id} scheme={scheme} i={i} onApply={openModal} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Help banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-5 bg-white rounded-2xl border border-slate-100"
          style={{ boxShadow: '0 1px 6px rgba(0,0,0,0.04)' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0">
              <Info className="w-4.5 h-4.5 text-emerald-600" />
            </div>
            <div>
              <p className="text-slate-800 font-bold text-[13.5px]">Need help applying?</p>
              <p className="text-slate-400 text-[12.5px]">Visit the Councilor Office (Division 34) or call us directly.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <a
              href="tel:+919876543210"
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold text-white transition-all duration-200 hover:-translate-y-px"
              style={{ background: 'linear-gradient(135deg, #059669, #047857)', boxShadow: '0 3px 12px rgba(5,150,105,0.28)' }}
            >
              <Phone className="w-3.5 h-3.5" /> Call Ward Office
            </a>
            <Link
              href="/services"
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-slate-500 hover:text-slate-800 border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all duration-200"
            >
              All Services <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Application Modal ── */}
      <ApplicationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        preselectedScheme={activeScheme}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,900&display=swap');
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}