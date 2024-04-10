import { NextResponse } from 'next/server'
 

export function middleware(request) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/register'

  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/profile', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/homepage', request.nextUrl))
  }
    
}

 
// Matching Paths
export const config = {
  matcher: [
    '/profile',
    '/blogs',
    '/login',
    '/register',
  ]
}