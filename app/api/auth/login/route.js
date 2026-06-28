import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request) {
  const body = await request.json()
  const { email, password } = body

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 })
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  const maxAge = data.session?.expires_in ?? 3600
  const cookieOpts = {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  }

  const response = NextResponse.json({ message: 'Login successful', user: data.user }, { status: 200 })
  // httpOnly token for middleware; non-httpOnly flag for client-side UI
  response.cookies.set('sb-access-token', data.session.access_token, { ...cookieOpts, httpOnly: true })
  response.cookies.set('sb-logged-in', '1', cookieOpts)
  return response
}
