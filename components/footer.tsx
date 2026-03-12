'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Footer Grid */}
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* About Ezhara */}
          <div>
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
                E
              </div>
              Ezhara
            </h3>
            <p className="text-sm text-background/70 mb-4">
              Digital transformation initiative of Division 34, Kannur Corporation under the leadership of Councilor Faslim T.P.
            </p>
            <p className="text-xs text-background/50">
              Empowering our community through technology and responsive governance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Programs
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-background/70 hover:text-background transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h4 className="text-base font-semibold mb-6">Emergency Contacts</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3 text-background/70 hover:text-background transition-colors cursor-pointer">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <span>0497-XXXX XXXX</span>
              </li>
              <li className="flex items-center gap-3 text-background/70 hover:text-background transition-colors cursor-pointer">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@ezhara.gov.in</span>
              </li>
              <li className="flex items-center gap-3 text-background/70 hover:text-background transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span>Division 34, Kannur</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-base font-semibold mb-6">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors text-background"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors text-background"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors text-background"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-background/10 hover:bg-background/20 transition-colors text-background"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-background/50">
              Follow us for latest updates and announcements.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 pt-8 mt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-background/60">
            <p>
              © {currentYear} Ezhara Division 34, Kannur Corporation. All rights reserved.
            </p>
            <p className="text-center mt-4 sm:mt-0">
              100% Digital Ezhara Initiative. Designed for the Future.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
