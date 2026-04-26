import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const protectedPaths = [
  '/services/file-complaint',
  '/services/welfare-schemes',
  '/services/volunteer'
]

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  // In Next.js, sessionid is typically set after login
  if (isProtected && !request.cookies.get('sessionid')) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/services/file-complaint/:path*',
    '/services/welfare-schemes/:path*',
    '/services/volunteer/:path*'
  ],
}
