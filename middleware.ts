import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const accessToken = process.env.ACCESS_TOKEN

  // Skip token check if no ACCESS_TOKEN is configured (local dev)
  if (!accessToken) {
    return NextResponse.next()
  }

  // Check for token in URL query params
  const url = request.nextUrl
  const tokenFromUrl = url.searchParams.get('token')

  // Check for token in cookie (for subsequent requests after initial auth)
  const tokenFromCookie = request.cookies.get('access_token')?.value

  // Valid if either URL token or cookie token matches
  const isValid = tokenFromUrl === accessToken || tokenFromCookie === accessToken

  if (!isValid) {
    // Redirect to access denied page
    return NextResponse.rewrite(new URL('/access-denied', request.url))
  }

  // If authenticated via URL token, set a cookie for future requests
  // This way the Pi doesn't need the token in every subsequent navigation
  if (tokenFromUrl === accessToken && !tokenFromCookie) {
    const response = NextResponse.next()
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  // Only run middleware on the main page, not on API routes or static files
  matcher: ['/', '/access-denied'],
}
