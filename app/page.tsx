import Header from '@/components/header'
import Hero from '@/components/hero'
import QuickServices from '@/components/quick-services'
import CommunityHighlights from '@/components/community-highlights'
import About from '@/components/about'
import CouncilorSection from '@/components/councilor'
import UsefulLinks from '@/components/useful-links'
import Initiatives from '@/components/initiatives'
import BloodBank from '@/components/blood-bank'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <QuickServices />
      <CommunityHighlights />
      <About />
      <CouncilorSection />
      <UsefulLinks />
      <Initiatives />
      <BloodBank />
      <Footer />
    </main>
  )
}
