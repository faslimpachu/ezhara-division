import { Metadata } from 'next'
import InitiativesHero from '@/components/initiatives-hero'
import InitiativesGrid from '@/components/initiatives-grid'
import DonationBanner from '@/components/donation-banner'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Councilor Initiatives - Ezhara Ward 34',
  description:
    'Explore flagship programs led by Councilor Faslim T.P. including startup incubation, skill development, welfare schemes, and environmental initiatives.',
}

export default function InitiativesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <InitiativesHero />
      <InitiativesGrid />
      <DonationBanner />
      <Footer />
    </main>
  )
}
