import PublicHealthServices from '@/components/public-health-services'

export const metadata = {
  title: 'Public Health Services | Ezhara Ward',
  description: 'Access healthcare facilities, vaccination schedules, and sanitation services.',
}

export default function HealthServices() {
  return (
    <main className="min-h-screen bg-background">
      <PublicHealthServices />
    </main>
  )
}
