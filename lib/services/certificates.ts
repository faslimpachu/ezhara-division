const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000'

export type CertificateRequestPayload = {
  certificate_type: string
  full_name: string
  house_name: string
  phone: string
  aadhaar: string
  purpose: string
}

export type CertificateRequestResponse = {
  success: boolean
  reference_id: string
}

function getCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined
  return document.cookie
    .split('; ')
    .find((c) => c.startsWith('csrftoken='))
    ?.split('=')[1]
}

export async function createCertificateRequest(payload: CertificateRequestPayload): Promise<CertificateRequestResponse> {
  const csrfToken = getCsrfToken()
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  if (csrfToken) {
    headers['X-CSRFToken'] = csrfToken
  }

  const response = await fetch(`${BACKEND_URL}/api/certificate-requests/`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    credentials: 'include',
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(data?.message || 'Failed to submit certificate request.')
  }

  return data as CertificateRequestResponse
}
