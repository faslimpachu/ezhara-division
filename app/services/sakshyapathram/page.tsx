import SakshyapathramForm from '@/components/sakshyapathram-form'

export const metadata = {
  title: 'Request Sakshyapathram | Ezhara Ward',
  description: 'Apply for official certificates and recommendations from Councilor Faslim T.P.',
}

export default function SakshyapathramPage() {
  return (
    <main className="min-h-screen bg-background">
      <SakshyapathramForm />
    </main>
  )
}
