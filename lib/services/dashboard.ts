const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000'

export async function fetchDashboardData() {
  const fetchOptions = {
    credentials: 'include' as const,
  }

  const [welfare, certificates, complaints, volunteer] = await Promise.all([
    fetch(`${BACKEND_URL}/api/welfare-applications/`, fetchOptions).then(r => r.json()),
    fetch(`${BACKEND_URL}/api/certificate-requests/`, fetchOptions).then(r => r.json()),
    fetch(`${BACKEND_URL}/api/complaints/`, fetchOptions).then(r => r.json()),
    fetch(`${BACKEND_URL}/api/volunteers/`, fetchOptions).then(r => r.json()),
  ])

  return {
    welfare: Array.isArray(welfare) ? welfare : [],
    certificates: Array.isArray(certificates) ? certificates : [],
    complaints: Array.isArray(complaints) ? complaints : [],
    volunteer: Array.isArray(volunteer) ? volunteer : [],
  }
}
