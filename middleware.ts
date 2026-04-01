import type { RequestContext } from '@vercel/edge'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\.ico|.*\.png$|.*\.jpg$|.*\.jpeg$|.*\.svg$|.*\.ico$|manifest\.json$|sw\.js$).*)',
  ],
}

export default function middleware(request: Request, context: RequestContext) {
  const { pathname } = new URL(request.url)

  // Let the password page and its API through unconditionally
  if (pathname === '/password' || pathname.startsWith('/api/password')) {
    return
  }

  // Password requirement temporarily disabled
  return
}
