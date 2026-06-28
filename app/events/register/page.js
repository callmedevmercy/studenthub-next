'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', event: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Failed to register. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="form-area">
        <div className="form-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
          <h2>&#10003; Registration Successful!</h2>
          <p style={{ color: 'white', textAlign: 'center' }}>
            You have registered for <strong>{form.event || 'the event'}</strong>. We&apos;ll send details to {form.email}.
          </p>
          <button
            className="form-submit-button"
            style={{ margin: 0 }}
            onClick={() => router.push('/events')}
          >
            Back to Events
          </button>
        </div>
      </div>
    )
  }

  return (
    <section className="form-area">
      <div className="form-box">
        <button
          onClick={() => router.back()}
          style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.5rem', cursor: 'pointer', alignSelf: 'flex-end', marginBottom: '0.5rem' }}
          aria-label="Go back"
        >
          ✕
        </button>

        <h2>Event Registration</h2>

        {error && <div className="auth-error" style={{ marginBottom: '1rem', color: '#ff6b6b', background: 'rgba(255, 107, 107, 0.1)', padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.9rem' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-input-box">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Full name"
              className="form-input-tags"
              minLength={7}
              maxLength={60}
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className="form-input-tags"
            />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone number"
              minLength={11}
              maxLength={11}
              required
              className="form-input-tags"
            />
            <select
              name="event"
              value={form.event}
              onChange={handleChange}
              required
              className="form-input-tags"
            >
              <option value="" disabled>Select an event</option>
              <option value="Code & Chill">Code &amp; Chill (Physical)</option>
              <option value="Design Decode">Design Decode (Virtual)</option>
              <option value="Dev Launchpad">Dev Launchpad (Virtual)</option>
              <option value="Data Drive">Data Drive (Physical)</option>
              <option value="No Code Ninjas">No Code Ninjas (Virtual)</option>
              <option value="Git Ready">Git Ready (Physical)</option>
            </select>
          </div>
          <button className="form-submit-button" type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Now'}
          </button>
        </form>
      </div>
    </section>
  )
}
