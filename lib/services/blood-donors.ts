export type BloodDonorPayload = {
  age: number
  blood_group: string
  district: string
  address: string
}

export type CreateBloodDonorResponse = {
  success: boolean
  donor_id: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000'

function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith('csrftoken='))
    ?.split('=')[1]
}

export async function createBloodDonor(payload: BloodDonorPayload): Promise<CreateBloodDonorResponse> {
  const csrfToken = getCsrfToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(csrfToken ? { 'X-CSRFToken': csrfToken } : {}),
  }

  const response = await fetch(`${BACKEND_URL}/api/blood-donors/`, {
    method: 'POST',
    body: JSON.stringify(payload),
    credentials: 'include',
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    const message = data?.message || data?.detail || 'Failed to register as blood donor.'
    throw new Error(Array.isArray(message) ? String(message[0]) : String(message))
  }

  return data as CreateBloodDonorResponse
}

export type BloodDonor = {
  id: number
  donor_id: string
  age: number
  blood_group: string
  district: string
  address: string
  status: string
  created_at: string
  name?: string
  phone?: string
}

export async function getBloodDonors(): Promise<BloodDonor[]> {
  const response = await fetch(`${BACKEND_URL}/api/blood-donors/`, {
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error('Failed to fetch donors')
  }

  return response.json()
}
