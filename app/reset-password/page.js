'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import EyeIcon from '@/components/EyeIcon'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Supabase JS SDK automatically reads the access_token from the URL hash
    // and sets a session when the recovery link is opened.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true)
      else setInvalid(true)
    })
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) { setError('Passwords do not match'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters'); return }
    setError('')
    setLoading(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)
    if (updateError) { setError(updateError.message); return }
    router.push('/login?reset=1')
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
            <p>Set a new password</p>
          </div>

          {invalid && (
            <div style={{ textAlign: 'center' }}>
              <div className="auth-error" style={{ marginBottom: '1.5rem' }}>
                This reset link is invalid or has expired.
              </div>
              <Link href="/forgot-password" className="auth-submit" style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}>
                Request a new link
              </Link>
            </div>
          )}

          {!ready && !invalid && (
            <p style={{ color: '#555', textAlign: 'center' }}>Verifying reset link&hellip;</p>
          )}

          {ready && (
            <>
              {error && <div className="auth-error">{error}</div>}
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="auth-field">
                  <label htmlFor="password">New password</label>
                  <div className="auth-password-wrap">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="Min. 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </div>

                <div className="auth-field">
                  <label htmlFor="confirm">Confirm new password</label>
                  <div className="auth-password-wrap">
                    <input
                      id="confirm"
                      type={showConfirm ? 'text' : 'password'}
                      required
                      placeholder="Repeat new password"
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                    />
                    <button type="button" className="auth-eye-btn" onClick={() => setShowConfirm(v => !v)} aria-label={showConfirm ? 'Hide password' : 'Show password'}>
                      <EyeIcon open={showConfirm} />
                    </button>
                  </div>
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? 'Updating password...' : 'Update password'}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
