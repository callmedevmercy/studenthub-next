import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('event_registrations')
    .select('event, count')
    .limit(100)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function POST(request) {
  const body = await request.json()
  const { name, email, phone, event } = body

  if (!name || !email || !event) {
    return NextResponse.json({ error: 'Name, email and event are required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('event_registrations')
    .insert([{ name, email, phone, event }])

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Registration successful', registeredFor: event }, { status: 201 })
}
