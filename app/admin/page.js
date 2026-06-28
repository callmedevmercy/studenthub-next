'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const ADMIN_PIN = 'studenthub2025'

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [tab, setTab] = useState('events')
  const [events, setEvents] = useState([])
  const [mentorship, setMentorship] = useState([])
  const [loading, setLoading] = useState(true)

  const handleUnlock = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) { setUnlocked(true) }
    else { setPinError(true); setPin('') }
  }

  useEffect(() => {
    if (!unlocked) return
    async function fetchData() {
      const [{ data: ev }, { data: mt }] = await Promise.all([
        supabase.from('event_registrations').select('*').order('created_at', { ascending: false }),
        supabase.from('mentorship_requests').select('*').order('created_at', { ascending: false }),
      ])
      setEvents(ev || [])
      setMentorship(mt || [])
      setLoading(false)
    }
    fetchData()
  }, [unlocked])

  if (!unlocked) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <span className="logo" style={{ fontSize: '2rem' }}>StudentHub</span>
            <p>Admin access only</p>
          </div>
          {pinError && <div className="auth-error">Incorrect PIN. Try again.</div>}
          <form onSubmit={handleUnlock} className="auth-form">
            <div className="auth-field">
              <label htmlFor="pin">Admin PIN</label>
              <input
                id="pin"
                type="password"
                placeholder="Enter admin PIN"
                value={pin}
                onChange={(e) => { setPin(e.target.value); setPinError(false) }}
                required
              />
            </div>
            <button type="submit" className="auth-submit">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    )
  }

  const stats = [
    { label: 'Event Registrations', value: events.length,    color: '#0EA5E9' },
    { label: 'Mentorship Requests', value: mentorship.length, color: '#ab4fff' },
    { label: 'Total Submissions',   value: events.length + mentorship.length, color: '#16a34a' },
  ]

  return (
    <main className="admin-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>All submissions from StudentHub users</p>
      </div>

      {/* Stat cards */}
      <div className="admin-stats">
        {stats.map((s) => (
          <div key={s.label} className="admin-stat-card" style={{ borderTop: `4px solid ${s.color}` }}>
            <span className="admin-stat-value" style={{ color: s.color }}>{s.value}</span>
            <span className="admin-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`admin-tab ${tab === 'events' ? 'admin-tab--active' : ''}`}
          onClick={() => setTab('events')}
        >
          Event Registrations ({events.length})
        </button>
        <button
          className={`admin-tab ${tab === 'mentorship' ? 'admin-tab--active' : ''}`}
          onClick={() => setTab('mentorship')}
        >
          Mentorship Requests ({mentorship.length})
        </button>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        {loading ? (
          <p className="admin-empty">Loading data...</p>
        ) : tab === 'events' ? (
          events.length === 0 ? (
            <p className="admin-empty">No event registrations yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Event</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {events.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.phone || '—'}</td>
                    <td><span className="admin-badge">{r.event}</span></td>
                    <td>{new Date(r.created_at).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          mentorship.length === 0 ? (
            <p className="admin-empty">No mentorship requests yet.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mentorship.map((r, i) => (
                  <tr key={r.id}>
                    <td>{i + 1}</td>
                    <td>{r.name}</td>
                    <td>{r.email}</td>
                    <td>{r.subject || '—'}</td>
                    <td className="admin-message">{r.message}</td>
                    <td>{new Date(r.created_at).toLocaleDateString('en-GB')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </main>
  )
}
