'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { resources } from '@/data/resources'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState('')
  const [completedSlugs, setCompletedSlugs] = useState([])

  useEffect(() => {
    Promise.all([
      fetch('/api/auth/user').then(r => r.json()),
      fetch('/api/auth/progress').then(r => r.json()),
    ]).then(([userData, progressData]) => {
      if (userData.user) {
        setUser(userData.user)
        setName(userData.user.user_metadata?.name || '')
      }
      setCompletedSlugs(progressData.completed || [])
    }).catch(() => {})
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSaveError('')
    setSaved(false)
    const res = await fetch('/api/auth/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    })
    const data = await res.json()
    setSaving(false)
    if (!res.ok) { setSaveError(data.error || 'Save failed'); return }
    setUser(data.user)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const completedCourses = resources.filter(r => completedSlugs.includes(r.slug))
  const initial = (name || user?.email || '?').charAt(0).toUpperCase()
  const memberSince = user ? new Date(user.created_at).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : ''

  if (!user) {
    return <main className="profile-page"><p className="profile-loading">Loading profile…</p></main>
  }

  return (
    <main className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar">{initial}</div>
        <div className="profile-hero-info">
          <h1 className="profile-name">{name || user.email}</h1>
          <p className="profile-email">{user.email}</p>
          <p className="profile-since">Member since {memberSince}</p>
        </div>
      </div>

      <div className="profile-grid">
        {/* Account details */}
        <section className="profile-card">
          <h2>Account Details</h2>
          {saveError && <div className="auth-error">{saveError}</div>}
          {saved && <div className="auth-success">Name updated!</div>}
          <form onSubmit={handleSave} className="auth-form" style={{ marginTop: '1rem' }}>
            <div className="auth-field">
              <label htmlFor="p-name">Full name</label>
              <input
                id="p-name"
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="auth-field">
              <label>Email address</label>
              <input type="email" value={user.email} readOnly className="profile-readonly" />
            </div>
            <button type="submit" className="auth-submit" disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </form>
        </section>

        {/* Course progress */}
        <section className="profile-card">
          <h2>Course Progress</h2>
          <div className="progress-stat">
            <span className="progress-count">{completedCourses.length}</span>
            <span className="progress-total">/ {resources.length}</span>
            <span className="progress-label">courses completed</span>
          </div>

          {completedCourses.length > 0 ? (
            <ul className="completed-list">
              {completedCourses.map(r => (
                <li key={r.slug}>
                  <Link href={`/courses/${r.slug}`} className="completed-link">{r.title}</Link>
                  <span className={`level-badge ${r.level}`}>{r.level}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="profile-empty">
              No courses completed yet.{' '}
              <Link href="/resources">Start learning →</Link>
            </p>
          )}
        </section>
      </div>
    </main>
  )
}
