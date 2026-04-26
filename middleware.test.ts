import { NextRequest } from 'next/server'
import { middleware } from './middleware'

describe('middleware', () => {
  const protectedRoutes = [
    '/services/file-complaint',
    '/services/welfare-schemes',
    '/services/volunteer'
  ]

  protectedRoutes.forEach(route => {
    it(`redirects ${route} without a session cookie`, () => {
      const request = new NextRequest(`http://localhost:3000${route}`)
      const response = middleware(request)

      expect(response?.status).toBe(307)
      expect(response?.headers.get('location')).toContain(`/auth/login?next=${encodeURIComponent(route)}`)
    })

    it(`allows ${route} with a session cookie`, () => {
      const request = new NextRequest(`http://localhost:3000${route}`, {
        headers: {
          cookie: 'sessionid=abc123',
        },
      })
      const response = middleware(request)
      // NextResponse.next() returns a 200 by default in tests if successful
      expect(response?.status).toBe(200)
    })
  })
})
