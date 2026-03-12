import { Metadata } from 'next'
import Header from '@/components/header'
import AboutHero from '@/components/about-hero'
import AboutStory from '@/components/about-story'
import AboutBentoGallery from '@/components/about-bento-gallery'
import AboutGeography from '@/components/about-geography'
import AboutCTA from '@/components/about-cta'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Experience Division 34 - Ezhara Ward',
  description: 'Discover the natural beauty, rich heritage, and progressive digital governance of Ezhara, Kannur Corporation.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <AboutHero />
      <AboutStory />
      <AboutBentoGallery />
      <AboutGeography />
      <AboutCTA />
      <Footer />
    </main>
  )
}
