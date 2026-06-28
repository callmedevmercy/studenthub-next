'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Something went wrong'); return }
      setSent(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-split">
      <div className="auth-image-panel">
        <Image src="/images/student_hub_pic.png" alt="Students in library" fill sizes="50vw" style={{ objectFit: 'cover', objectPosition: 'center' }} priority />
      </div>

      <div className="auth-form-panel">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="logo" style={{ fontSize: '2rem' }}>StudentHub</span>
            <p>Reset your password</p>
          </div>

          {sent ? (
            <div style={{ textAlign: 'center' }}>
              <div className="auth-success" style={{ marginBottom: '1.5rem' }}>
                Check your inbox — a reset link has been sent to <strong>{email}</strong>.
              </div>
              <Link href="/login" className="auth-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Back to Log in
              </Link>
            </div>
          ) : (
            <>
              {error && <div className="auth-error">{error}</div>}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>
              <p className="auth-switch">
                Remember your password? <Link href="/login">Log in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
