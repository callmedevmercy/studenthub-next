import { NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/login', '/register']

export function middleware(request) {
  const { pathname } = request.nextUrl
  const isPublic = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))

  if (isPublic) return NextResponse.next()

  const token = request.cookies.get('sb-access-token')
  if (!token) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon\\.ico|images|.*\\.\\w+).*)'],
}
