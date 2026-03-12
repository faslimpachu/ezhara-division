'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const carouselImages = [
  {
    id: 1,
    title: 'Give Blood, Give Life',
    subtitle: 'Every donation saves lives in Ezhara',
  },
  {
    id: 2,
    title: 'Ezhara Life Savers',
    subtitle: 'Join our community of heroes',
  },
  {
    id: 3,
    title: 'Your Blood Can Save Three Lives',
    subtitle: 'Donate once, help multiple patients',
  },
]

export default function BloodBankHero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <section className="relative w-full h-[60vh] max-h-[500px] overflow-hidden">
      {/* Slides */}
      {carouselImages.map((image, index) => (
        <motion.div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-600/40 to-red-900/60" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  {image.title}
                </h1>
                <p className="text-lg sm:text-xl text-red-100">
                  {image.subtitle}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all backdrop-blur-sm"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'bg-white w-8 h-2 rounded-full'
                : 'bg-white/40 w-2 h-2 rounded-full hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  )
}
