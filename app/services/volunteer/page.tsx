import VolunteerRegistration from '@/components/volunteer-registration'

export const metadata = {
  title: 'Join as Volunteer | Ezhara Ward',
  description: 'Be the change in Division 34. Register to volunteer with us.',
}

export default function VolunteerPage() {
  return (
    <main className="min-h-screen bg-background">
      <VolunteerRegistration />
    </main>
  )
}
