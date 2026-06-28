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

async function updateMeta(token, data) {
  return fetch(`${URL}/auth/v1/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      apikey: ANON,
    },
    body: JSON.stringify({ data }),
  })
}

export async function GET() {
  const token = cookies().get('sb-access-token')?.value
  if (!token) return NextResponse.json({ completed: [] })
  const user = await sbUser(token)
  return NextResponse.json({ completed: user?.user_metadata?.completed_courses || [] })
}

export async function PATCH(request) {
  const token = cookies().get('sb-access-token')?.value
  if (!token) return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })

  const { slug } = await request.json()
  if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 })

  const user = await sbUser(token)
  if (!user) return NextResponse.json({ error: 'Invalid token' }, { status: 401 })

  const current = user.user_metadata?.completed_courses || []
  const isCompleted = current.includes(slug)
  const next = isCompleted ? current.filter(s => s !== slug) : [...current, slug]

  await updateMeta(token, { completed_courses: next })
  return NextResponse.json({ completed: next, nowCompleted: !isCompleted })
}
