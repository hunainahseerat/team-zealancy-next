import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Extract country code from headers provided by edge hosting / proxies
  const country = request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-country-code') || ''

  // Optional: In development mode, allow all
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // If country header exists and is NOT Pakistan ('PK'), block access
  if (country && country !== 'PK') {
    return new NextResponse(
      '<h1>403 Forbidden</h1><p>Access to Team Zealancy is only available within Pakistan.</p>',
      {
        status: 403,
        headers: { 'content-type': 'text/html' },
      }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
