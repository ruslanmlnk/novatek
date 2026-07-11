import { NextRequest, NextResponse } from 'next/server'

import { defaultLocale, isLocale } from './lib/i18n'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const [, maybeLocale, ...rest] = pathname.split('/')
  const locale = isLocale(maybeLocale) ? maybeLocale : defaultLocale
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-novatek-locale', locale)

  if (isLocale(maybeLocale)) {
    const url = request.nextUrl.clone()
    const rewrittenPath = `/${rest.join('/')}` || '/'
    url.pathname = rewrittenPath === '/' ? '/' : rewrittenPath.replace(/\/$/, '')
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
  }

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|assets|media|admin).*)',
  ],
}
