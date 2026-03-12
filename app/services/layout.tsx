import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ezhara Digital Citizen Services | Ward Management',
  description: 'Access all services, programs, and useful links for Ezhara Ward 34. File complaints, apply for welfare schemes, blood bank services, and more.',
  openGraph: {
    title: 'Ezhara Digital Citizen Services',
    description: 'Comprehensive service hub for Ezhara Ward 34, Kannur Corporation',
    type: 'website',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  )
}
