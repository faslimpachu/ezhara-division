import { Metadata } from 'next'
import Header from '@/components/header'
import ContactForm from '@/components/contact-form'
import ContactInfo from '@/components/contact-info'
import Footer from '@/components/footer'

export const metadata: Metadata = {
  title: 'Contact Us - Ezhara Ward 34',
  description: 'Get in touch with Ezhara Ward 34 office. We are here to help with your queries, complaints, and feedback.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Contact Ward 34 Ezhara
          </h1>
          <p className="text-lg text-muted-foreground">
            We're here to listen. Share your feedback, complaints, or inquiries with us.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Send us a Message
          </h2>
          <ContactForm />
        </div>
      </section>

      {/* Contact Info Section */}
      <ContactInfo />

      {/* Embedded Map Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
            Find Us on the Map
          </h2>
          <div className="w-full h-96 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
            <iframe
              title="Ezhara Ward Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.5555444444444!2d75.6!3d12!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba68e0000000001%3A0x0!2sEzhara%20Ward%2034!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
