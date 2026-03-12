import { Metadata } from 'next'
import EmergencyDirectory from '@/components/emergency-directory'

export const metadata: Metadata = {
  title: 'Emergency Contacts | Ezhara Ward 34',
  description:
    '24/7 emergency contact directory for Ezhara Division 34. Police, Fire, Medical, Utilities, and more.',
}

export default function EmergencyContactsPage() {
  return (
    <main className="min-h-screen bg-background">
      <EmergencyDirectory />
    </main>
  )
}
