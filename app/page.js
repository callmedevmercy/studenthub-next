import { cookies } from 'next/headers'
import HomeClient from './HomeClient'
import LandingPage from './LandingPage'

export const metadata = { title: 'StudentHub - Connect, Learn & Grow' }

function isExpired(token) {
  try {
    const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
    return payload.exp < Math.floor(Date.now() / 1000)
  } catch {
    return true
  }
}

export default function HomePage() {
  const token = cookies().get('sb-access-token')?.value
  const loggedIn = token && !isExpired(token)

  if (loggedIn) {
    return <HomeClient />
  }

  return <LandingPage />
}
