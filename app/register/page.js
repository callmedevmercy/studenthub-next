'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import EyeIcon from '@/components/EyeIcon'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) { setError('Passwords do not match'); return }
    if (form.password.length < 8) { setError('Password must be at least 8 characters'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Registration failed'); return }
      router.push('/login?registered=1')
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
            <p>Create your free account</p>
          </div>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" required placeholder="Your full name" value={form.name} onChange={handleChange} />
            </div>

            <div className="auth-field">
              <label htmlFor="email">Email address</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange} />
            </div>

            <div className="auth-field">
              <label htmlFor="password">Password</label>
              <div className="auth-password-wrap">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required placeholder="Min. 8 characters" value={form.password} onChange={handleChange} />
                <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>
            </div>

            <div className="auth-field">
              <label htmlFor="confirm">Confirm password</label>
              <div className="auth-password-wrap">
                <input id="confirm" name="confirm" type={showConfirm ? 'text' : 'password'} required placeholder="Repeat your password" value={form.confirm} onChange={handleChange} />
                <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm(v => !v)} aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                  <EyeIcon open={showConfirm} />
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={loading}>
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link href="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
