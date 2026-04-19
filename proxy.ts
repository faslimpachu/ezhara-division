import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const protectedPaths = ['/services/file-complaint']

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path))

  if (isProtected && !request.cookies.get('sessionid')) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('next', `${pathname}${search}`)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/services/file-complaint/:path*'],
}
