import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  await supabase.auth.signOut()

  const response = NextResponse.json({ message: 'Logged out' }, { status: 200 })
  response.cookies.set('sb-access-token', '', { maxAge: 0, path: '/' })
  response.cookies.set('sb-logged-in', '', { maxAge: 0, path: '/' })
  return response
}
