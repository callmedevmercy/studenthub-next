import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

const URL  = process.env.NEXT_PUBLIC_SUPABASE_URL
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function sbUser(token) {
  const res = await fetch(`${URL}/auth/v1/user`, {
    headers: { Authorization: `Bearer ${token}`, apikey: ANON },
  })
  return res.ok ? res.json() : null
}

export async function GET() {
  const token = cookies().get('sb-access-token')?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  const user = await sbUser(token)
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  return NextResponse.json({ user })
}

export async function PATCH(request) {
  const token = cookies().get('sb-access-token')?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { name } = await request.json()
  if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })

  const res = await fetch(`${URL}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      apikey: ANON,
    },
    body: JSON.stringify({ data: { name: name.trim() } }),
  })

  if (!res.ok) {
    const err = await res.json()
    return NextResponse.json({ error: err.message || 'Update failed' }, { status: 400 })
  }

  return NextResponse.json({ user: await res.json() })
}
