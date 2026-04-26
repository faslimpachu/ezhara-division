import {
  ApiError,
  getCookie,
  getCurrentUser,
  logout,
  sendOTP,
  verifyOTP,
} from '@/lib/services/auth'

describe('auth service', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    document.cookie = 'csrftoken=test-token'
  })

  it('adds csrf header for post requests', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ success: true, message: 'OTP sent' }), { status: 200 }),
    )

    await sendOTP('9876543210')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://localhost:8000/api/auth/send-otp/',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: expect.any(Headers),
      }),
    )

    const [, init] = fetchMock.mock.calls[0]
    expect((init?.headers as Headers).get('X-CSRFToken')).toBe('test-token')
  })

  it('does not add csrf header for get requests', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ id: 1, username: 'john' }), { status: 200 }),
    )

    await getCurrentUser()

    const [, init] = fetchMock.mock.calls[0]
    expect((init?.headers as Headers).get('X-CSRFToken')).toBeNull()
  })

  it('parses verification responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(
        JSON.stringify({
          success: true,
          user: {
            id: 1,
            username: 'john',
            phone_number: '+919876543210',
            first_name: 'John',
            last_name: 'Doe',
            is_customer: true,
          },
        }),
        { status: 200 },
      ),
    )

    const result = await verifyOTP('9876543210', '123456')

    expect(result.user.first_name).toBe('John')
  })

  it('throws ApiError on failed responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ message: 'Invalid OTP.' }), { status: 401 }),
    )

    await expect(logout()).rejects.toEqual(
      expect.objectContaining({
        name: 'ApiError',
        message: 'Invalid OTP.',
        status: 401,
      }),
    )
  })

  it('reads cookies by name', () => {
    document.cookie = 'sessionid=abc123'

    expect(getCookie('sessionid')).toBe('abc123')
  })

  it('apiRequest throws ApiError on 401 responses', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ detail: 'Authentication credentials were not provided.' }), { status: 401 }),
    )

    await expect(getCurrentUser()).rejects.toEqual(
      expect.objectContaining({
        name: 'ApiError',
        message: 'Authentication credentials were not provided.',
        status: 401,
      }),
    )
  })
})
