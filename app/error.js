'use client'
import Link from 'next/link'

export default function Error({ reset }) {
  return (
    <main className="notfound-page">
      <div className="notfound-code" style={{ fontSize: '3rem' }}>Oops</div>
      <h1 className="notfound-title">Something went wrong</h1>
      <p className="notfound-desc">
        An unexpected error occurred. You can try again or head back home.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="notfound-btn" onClick={reset}>Try again</button>
        <Link href="/" className="notfound-btn" style={{ background: '#6b7280' }}>Go home</Link>
      </div>
    </main>
  )
}
