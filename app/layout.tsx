import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Geist_Mono, Noto_Sans_Malayalam } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/toaster'
import { AuthProvider } from '@/contexts/AuthContext'
import { LoginModal } from '@/components/LoginModal'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });
const notoSansMalayalam = Noto_Sans_Malayalam({ subsets: ["malayalam"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Ezhara Ward 34 - Kannur Corporation',
  description: 'Digital Ezhara - Your Ward Management System. Services, Programs, Blood Bank, and more. Councilor Faslim T.P.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakarta.className} antialiased bg-background text-foreground`}>
        <AuthProvider>
          {children}
          <LoginModal />
          <Toaster />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
