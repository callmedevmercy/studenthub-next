import { NextResponse } from 'next/server'

const ADMIN_PIN = process.env.ADMIN_PIN || 'studenthub2025'

export async function POST(request) {
  const { pin } = await request.json()
  if (!pin) return NextResponse.json({ error: 'PIN required' }, { status: 400 })
  if (pin === ADMIN_PIN) return NextResponse.json({ ok: true })
  return NextResponse.json({ error: 'Invalid PIN' }, { status: 401 })
}
