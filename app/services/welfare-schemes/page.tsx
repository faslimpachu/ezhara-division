import WelfareSchemesPage from '@/components/welfare-schemes'

export const metadata = {
  title: 'Welfare Schemes & Pensions | Ezhara Ward',
  description: 'Explore financial assistance and pension schemes. Check eligibility and apply.',
}

export default function WelfareSchemes() {
  return (
    <main className="min-h-screen bg-background">
      <WelfareSchemesPage />
    </main>
  )
}
