import type { RequestContext } from '@vercel/edge'

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.svg$|.*\\.ico$|manifest\\.json$|sw\\.js$).*)',
  ],
}

export default function middleware(request: Request, context: RequestContext) {
  const cookie = request.headers.get('cookie') || ''
  const hasAuth = cookie.split(';').some(c => c.trim() === 'kairo-auth=granted')

  if (!hasAuth) {
    return Response.redirect('https://meetkairo.ai/password', 302)
  }

  return
}
