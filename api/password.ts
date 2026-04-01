export const config = { runtime: 'edge' }

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let password: string
  try {
    const body = await request.json()
    password = body.password
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const correct = process.env.SITE_PASSWORD
  if (!correct) {
    return new Response(JSON.stringify({ error: 'Password not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  if (password !== correct) {
    return new Response(JSON.stringify({ error: 'Incorrect password.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const maxAge = 60 * 60 * 24 * 30
  return new Response(JSON.stringify({ ok: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `kairo-auth=granted; Path=/; Domain=.meetkairo.ai; Max-Age=${maxAge}; SameSite=Lax; Secure; HttpOnly`,
    },
  })
}
