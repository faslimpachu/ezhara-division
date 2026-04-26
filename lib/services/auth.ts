export type AuthUser = {
  id: number
  username: string
  phone_number: string
  first_name: string
  last_name: string
  is_customer: boolean
}

export type CompleteProfilePayload = {
  phone: string
  first_name: string
  last_name: string
}

type ApiSuccess<T> = T

type ApiErrorResponse = {
  message?: string
  detail?: string
  [key: string]: unknown
}

export class ApiError extends Error {
  status: number
  data: ApiErrorResponse | null

  constructor(message: string, status: number, data: ApiErrorResponse | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.data = data
  }
}

const BACKEND_URL = (process.env.NEXT_PUBLIC_BACKEND_URL ?? 'http://localhost:8000').replace(/\/$/, '')

export function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') {
    return undefined
  }

  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${name}=`))
    ?.split('=')
    .slice(1)
    .join('=')
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<ApiSuccess<T>> {
  const method = init.method?.toUpperCase() ?? 'GET'
  const headers = new Headers(init.headers)

  // Don't set Content-Type for FormData, let the browser handle it
  if (!headers.has('Content-Type') && init.body && !(init.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json')
  }

  if (method !== 'GET' && method !== 'HEAD') {
    const csrfToken = getCookie('csrftoken')
    if (csrfToken) {
      headers.set('X-CSRFToken', csrfToken)
    }
  }

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...init,
    method,
    headers,
    credentials: 'include',
  })

  const rawText = await response.text()
  const data = rawText ? safeParseJson(rawText) : null

  if (!response.ok) {
    const message =
      data?.message ||
      data?.detail ||
      (typeof data === 'object' && data !== null ? Object.values(data)[0] : undefined) ||
      'Something went wrong.'

    throw new ApiError(
      Array.isArray(message) ? String(message[0]) : String(message),
      response.status,
      data,
    )
  }

  return data as T
}

function safeParseJson(rawText: string) {
  try {
    return JSON.parse(rawText) as ApiErrorResponse
  } catch {
    return null
  }
}

export async function fetchCSRFToken() {
  return apiRequest<{ csrfToken: string | null }>('/api/auth/csrf/')
}

export async function sendOTP(phone: string) {
  return apiRequest<{ success: boolean; message: string }>('/api/auth/send-otp/', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  })
}

export async function verifyOTP(phone: string, otp: string) {
  return apiRequest<{
    success: boolean
    user: AuthUser
    profile_complete: boolean
  }>('/api/auth/verify-otp/', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  })
}

export async function completeProfile(payload: CompleteProfilePayload) {
  return apiRequest<{ success: boolean; user: AuthUser }>('/api/auth/complete-profile/', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export async function getCurrentUser() {
  return apiRequest<AuthUser>('/api/auth/me/')
}

export async function logout() {
  return apiRequest<{ success: boolean }>('/api/auth/logout/', {
    method: 'POST',
    body: JSON.stringify({}),
  })
}
