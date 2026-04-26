'use client'

import SakshyapathramForm from '@/components/sakshyapathram-form'
import { useProtectedRoute } from '@/hooks/use-protected-route'

export default function SakshyapathramPage() {
  const { isLoading, user } = useProtectedRoute()

  if (isLoading || !user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-500 text-sm font-medium">Checking your session...</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <SakshyapathramForm />
    </main>
  )
}
