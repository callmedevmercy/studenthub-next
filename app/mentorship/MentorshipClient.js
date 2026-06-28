'use client'
import { useState } from 'react'
import Image from 'next/image'

export default function MentorshipClient({ mentors }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' }) // type: 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const res = await fetch('/api/mentorship', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Failed to send request. Please try again.' })
        return
      }
      setStatus({ type: 'success', message: data.message || 'Mentorship request sent successfully!' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus({ type: 'error', message: 'Network error. Please check your connection and try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mentorship-section">
      <h1>Find <span className="highlight">Your Mentor</span></h1>
      <p className="mentorship-subtext">
        Connect with experienced professionals who can guide your academic and career journey and help you achieve your goals.
      </p>

      <div className="mentor-grid">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="mentor-card">
            <Image
              src={mentor.image}
              alt={mentor.name}
              width={60}
              height={60}
              className="mentor-img"
              style={{ objectFit: 'cover' }}
            />
            <h3>{mentor.name}</h3>
            <p><strong>Skill Area:</strong> {mentor.skill}</p>
            <p>{mentor.bio}</p>

            {/* Bootstrap modal trigger */}
            <button
              className="request-btn"
              data-bs-toggle="modal"
              data-bs-target="#mentorshipModal"
            >
              Request Mentorship
            </button>
          </div>
        ))}
      </div>

      {/* Mentorship Request Modal */}
      <div className="modal fade" id="mentorshipModal" tabIndex="-1" aria-labelledby="mentorshipModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#e0f0ff' }}>
              <h5 className="modal-title" id="mentorshipModalLabel" style={{ color: '#333' }}>Request Mentorship</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setStatus({ type: '', message: '' })}></button>
            </div>
            <div className="modal-body">
              {status.message && (
                <div 
                  className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-danger'}`}
                  style={{ fontSize: '0.9rem', marginBottom: '1rem' }}
                >
                  {status.message}
                </div>
              )}

              {status.type !== 'success' && (
                <form onSubmit={handleSubmit}>
                  <input 
                    className="modal-input" 
                    type="text" 
                    name="name" 
                    placeholder="Your Full Name" 
                    value={form.name}
                    onChange={handleChange}
                    required 
                  />
                  <input 
                    className="modal-input" 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    value={form.email}
                    onChange={handleChange}
                    required 
                  />
                  <input 
                    className="modal-input" 
                    type="text" 
                    name="subject" 
                    placeholder="Topic / Skill Area" 
                    value={form.subject}
                    onChange={handleChange}
                    required 
                  />
                  <textarea
                    className="modal-input"
                    name="message"
                    placeholder="Tell the mentor what you need help with..."
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                    style={{ resize: 'vertical' }}
                  />
                  <button
                    type="submit"
                    className="btn w-100"
                    disabled={loading}
                    style={{ backgroundColor: '#00aaff', color: 'white', fontWeight: '600' }}
                  >
                    {loading ? 'Sending Request...' : 'Send Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
