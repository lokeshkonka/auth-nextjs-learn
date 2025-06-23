import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublic = path === '/' || path === '/login' || path === '/signup'
  const isProtected = path === '/profile'
  const token = request.cookies.get('token')?.value || ''

  // If user is authenticated and tries to access public pages, redirect to profile
  if (isPublic && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user is not authenticated and tries to access protected page, redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/profile','/login','/signup'],
}






















