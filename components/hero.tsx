'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=1600&q=80',
    tag: 'Ward 34 · Kannur Corporation',
    title: 'Welcome to\nDigital Ezhara',
    body: 'Your ward, your services — all in one place.',
    cta: { label: 'Join WhatsApp Channel', href: '#' },
    accent: '#60a5fa',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80',
    tag: 'Community Welfare',
    title: 'Every Service,\nSimplified.',
    body: 'Government services made accessible from your phone.',
    cta: { label: 'View All Services', href: '/services' },
    accent: '#34d399',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?w=1600&q=80',
    tag: 'Blood Bank Initiative',
    title: 'Donate Blood,\nSave Lives.',
    body: 'Register as a donor and help your community.',
    cta: { label: 'Register as Donor', href: '/services/blood-bank' },
    accent: '#f87171',
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDirection(1)
      setCurrent(c => (c + 1) % slides.length)
    }, 5000)
  }, [])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1)
    setCurrent(index)
    startTimer()
  }

  const slide = slides[current]

  return (
    <section
      className="w-full px-4 sm:px-6 lg:px-8 py-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ borderRadius: 20, height: 'clamp(300px, 52vw, 600px)' }}
      >
        {/* Slide images */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`img-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.30) 55%, rgba(0,0,0,0.05) 100%)',
          }}
        />

        {/* Text content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              {/* Tag pill */}
              <span
                className="inline-flex items-center mb-4"
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.85)',
                  background: 'rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.18)',
                  padding: '5px 12px',
                  borderRadius: 999,
                }}
              >
                {slide.tag}
              </span>

              {/* Title */}
              <h1
                className="text-white whitespace-pre-line"
                style={{
                  fontSize: 'clamp(1.7rem, 4.8vw, 3.6rem)',
                  fontWeight: 700,
                  lineHeight: 1.06,
                  letterSpacing: '-0.03em',
                  marginBottom: '0.6rem',
                }}
              >
                {slide.title}
              </h1>

              {/* Body + CTA */}
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">
                <p
                  style={{
                    fontSize: 'clamp(0.85rem, 1.3vw, 1rem)',
                    color: 'rgba(255,255,255,0.6)',
                    lineHeight: 1.65,
                    maxWidth: 400,
                    margin: 0,
                  }}
                >
                  {slide.body}
                </p>

                <Link href={slide.cta.href} style={{ flexShrink: 0 }}>
                  <button
                    className="group inline-flex items-center gap-2 font-semibold text-white rounded-full"
                    style={{
                      background: slide.accent,
                      padding: '11px 22px',
                      fontSize: 13,
                      letterSpacing: '-0.01em',
                      border: 'none',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'opacity 0.2s, transform 0.2s',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.88' }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1' }}
                  >
                    {slide.cta.label}
                    <ArrowRight style={{ width: 14, height: 14 }} />
                  </button>
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div
          className="absolute flex items-center gap-2"
          style={{ bottom: 20, left: '50%', transform: 'translateX(-50%)' }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? 26 : 7,
                height: 7,
                borderRadius: 999,
                background: i === current ? '#ffffff' : 'rgba(255,255,255,0.32)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'width 0.38s cubic-bezier(0.22,1,0.36,1), background 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,600;9..40,700&display=swap');
      `}</style>
    </section>
  )
}