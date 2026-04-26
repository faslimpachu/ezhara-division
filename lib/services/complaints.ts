export type ComplaintPayload = {
  category: string
  area: string
  description: string
  photo?: File | null
  reporter_name?: string
  reporter_phone?: string
}

export type CreateComplaintResponse = {
  success: boolean
  tracking_id: string
}

export type ComplaintData = {
  id: number
  tracking_id: string
  category: string
  area: string
  description: string
  photo: string | null
  photo_url: string | null
  reporter_name: string | null
  reporter_phone: string | null
  status: string
  created_at: string
  updated_at: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000'

function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith('csrftoken='))
    ?.split('=')[1]
}

export async function createComplaint(payload: ComplaintPayload): Promise<CreateComplaintResponse> {
  const formData = new FormData()
  formData.append('category', payload.category)
  formData.append('area', payload.area)
  formData.append('description', payload.description)
  if (payload.photo) formData.append('photo', payload.photo)
  if (payload.reporter_name) formData.append('reporter_name', payload.reporter_name)
  if (payload.reporter_phone) formData.append('reporter_phone', payload.reporter_phone)

  const csrfToken = getCsrfToken()
  const headers: HeadersInit = csrfToken ? { 'X-CSRFToken': csrfToken } : {}

  const response = await fetch(`${BACKEND_URL}/api/complaints/`, {
    method: 'POST',
    body: formData,
    credentials: 'include',
    headers,
  })

  const data = await response.json()

  if (!response.ok) {
    const message = data?.message || data?.detail || 'Failed to submit complaint.'
    throw new Error(Array.isArray(message) ? String(message[0]) : String(message))
  }

  return data as CreateComplaintResponse
}

export async function getComplaint(trackingId: string): Promise<ComplaintData> {
  const response = await fetch(`${BACKEND_URL}/api/complaints/public/${trackingId}/`, {
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Complaint not found.')
  }

  return data as ComplaintData
}