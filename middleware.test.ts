import { NextRequest } from 'next/server'

import { proxy } from '@/proxy'

describe('proxy', () => {
  it('redirects protected routes without a session cookie', () => {
    const request = new NextRequest('http://localhost:3000/services/file-complaint')

    const response = proxy(request)

    expect(response?.status).toBe(307)
    expect(response?.headers.get('location')).toContain('/auth/login?next=%2Fservices%2Ffile-complaint')
  })

  it('allows protected routes with a session cookie', () => {
    const request = new NextRequest('http://localhost:3000/services/file-complaint', {
      headers: {
        cookie: 'sessionid=abc123',
      },
    })

    const response = proxy(request)

    expect(response?.status).toBe(200)
  })
})
