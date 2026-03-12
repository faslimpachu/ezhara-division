'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, LogIn, Gift, Droplet, Menu, X, Globe } from 'lucide-react'

export default function Header() {
  const [languageOpen, setLanguageOpen] = useState(false)
  const [language, setLanguage] = useState('EN')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const langRef = useRef<HTMLDivElement>(null)

  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLanguageOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const navigationLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Programs', href: '/initiatives' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      {/* Top accent bar */}
      {/* <div className="h-[3px] w-full bg-gradient-to-r from-blue-700 via-sky-500 to-blue-600" /> */}

      <header
        style={{
          fontFamily: "'DM Sans', 'Outfit', sans-serif",
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className={`sticky top-0 z-50 w-full ${
          scrolled
            ? 'bg-white/90 dark:bg-[#0b0f1a]/90 backdrop-blur-3xl shadow-[0_2px_30px_rgba(0,0,0,0.06)]'
            : 'bg-white dark:bg-[#0b0f1a]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between h-[70px]">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3.5 group select-none">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-2xl bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-[42px] h-[42px] rounded-[13px] bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg shadow-blue-900/30">
                  <span
                    style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}
                    className="text-white font-black text-[18px]"
                  >
                    E
                  </span>
                </div>
              </div>
              <div className="flex flex-col -space-y-0.5">
                <span className="text-[14px] font-bold text-gray-900 dark:text-white tracking-[-0.02em]">
                  Ezhara Div-34
                </span>
                <span className="text-[11px] font-medium text-gray-400 tracking-[0.04em] uppercase">
                  Kannur Corporation
                </span>
              </div>
            </Link>

            {/* Nav Links — pill group */}
            <nav className="hidden lg:flex items-center">
              <div className="flex items-center gap-0.5 bg-gray-100/70 dark:bg-white/5 rounded-2xl px-2 py-2 border border-gray-200/60 dark:border-white/8">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all duration-200 ${
                      pathname === link.href
                        ? 'bg-white dark:bg-white/10 text-blue-700 dark:text-blue-400 shadow-sm shadow-blue-100 dark:shadow-black/20'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/5'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* Right Controls */}
            <div className="flex items-center gap-2">

              {/* Blood Bank pill */}
              <Link
                href="/services/blood-bank"
                className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[12px] font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/40 transition-all duration-200"
              >
                <Droplet className="w-3.5 h-3.5 fill-current" />
                Blood Bank
              </Link>

              <div className="hidden lg:block w-px h-6 bg-gray-200 dark:bg-white/10 mx-1" />

              {/* Language */}
              <div ref={langRef} className="relative hidden sm:block">
                <button
                  onClick={() => setLanguageOpen(!languageOpen)}
                  className="flex items-center gap-1.5 h-9 px-3 rounded-xl text-[12px] font-semibold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-white/10"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span className="tracking-wider uppercase text-[11px]">{language}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${languageOpen ? 'rotate-180' : ''}`} />
                </button>
                {languageOpen && (
                  <div
                    style={{ animation: 'fadeSlideDown 0.18s cubic-bezier(0.16,1,0.3,1)' }}
                    className="absolute top-full mt-2 right-0 w-[150px] bg-white dark:bg-[#131929] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden z-50"
                  >
                    {[['EN', 'English', '🇬🇧'], ['മലയാളം', 'Malayalam', '🇮🇳']].map(([val, label, flag]) => (
                      <button
                        key={val}
                        onClick={() => { setLanguage(val); setLanguageOpen(false) }}
                        className={`w-full flex items-center gap-2.5 px-4 py-3 text-[13px] font-medium hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                          language === val ? 'text-blue-600 dark:text-blue-400' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{flag}</span>
                        {label}
                        {language === val && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Login */}
              <Link href="/auth/login" className="hidden sm:block">
                <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200">
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Login</span>
                </button>
              </Link>

              {/* Donate CTA */}
              <Link href="/donate">
                <button className="flex items-center gap-2 h-9 px-4 rounded-xl text-[13px] font-bold text-white relative overflow-hidden group/btn transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-px">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 group-hover/btn:from-blue-500 group-hover/btn:to-blue-600 transition-all duration-300" />
                  <span className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out" />
                  <Gift className="w-3.5 h-3.5 relative z-10" />
                  <span className="relative z-10">Donate</span>
                </button>
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden relative flex items-center justify-center w-9 h-9 rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-all duration-200 ml-1"
                aria-label="Toggle menu"
              >
                <Menu className={`w-4 h-4 absolute transition-all duration-300 ${mobileOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`} />
                <X className={`w-4 h-4 absolute transition-all duration-300 ${mobileOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        <div
          style={{
            maxHeight: mobileOpen ? '500px' : '0',
            transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s',
            opacity: mobileOpen ? 1 : 0,
          }}
          className="lg:hidden overflow-hidden border-t border-gray-100 dark:border-white/8"
        >
          <div className="px-5 pt-3 pb-5 space-y-1 bg-white dark:bg-[#0b0f1a]">
            {navigationLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center h-11 px-4 rounded-xl text-[14px] font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/services/blood-bank"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 h-11 px-4 rounded-xl text-[14px] font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              <Droplet className="w-4 h-4 fill-current" />
              Blood Bank
            </Link>
            <div className="h-px bg-gray-100 dark:bg-white/8 my-2" />
            <div className="flex gap-2 pt-1">
              <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex-1">
                <button className="w-full h-11 rounded-xl text-[13px] font-medium text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  Login
                </button>
              </Link>
              <Link href="/donate" onClick={() => setMobileOpen(false)} className="flex-1">
                <button className="w-full h-11 rounded-xl text-[13px] font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md shadow-blue-500/20">
                  Donate
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Outfit:wght@700;900&display=swap');
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  )
}