'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { resources } from '@/data/resources'

const FEATURES = [
  { href: '/resources',  title: 'Resources',  desc: 'Browse courses and study materials curated for students.', color: '#0EA5E9', bg: '#e0f2fe', icon: '📚' },
  { href: '/events',     title: 'Events',     desc: 'Discover upcoming virtual and in-person student events.',  color: '#d946ef', bg: '#fdf4ff', icon: '🎉' },
  { href: '/roadmap',    title: 'Roadmap',    desc: 'Follow structured learning paths to master your track.',   color: '#ab4fff', bg: '#f5f3ff', icon: '🗺️' },
  { href: '/mentorship', title: 'Mentorship', desc: 'Connect with experienced mentors in your field.',          color: '#16a34a', bg: '#f0fdf4', icon: '🤝' },
]

const STATS = [
  { label: 'Resources', value: '31' },
  { label: 'Events',    value: '6'  },
  { label: 'Mentors',   value: '8'  },
  { label: 'Tracks',    value: '4'  },
]

export default function HomeClient() {
  const [name, setName] = useState(null)
  const [completedSlugs, setCompletedSlugs] = useState([])
  const [lastCourse, setLastCourse] = useState(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sh_last_course')
      if (stored) setLastCourse(JSON.parse(stored))
    } catch {}

    Promise.all([
      fetch('/api/auth/user').then(r => r.json()),
      fetch('/api/auth/progress').then(r => r.json()),
    ]).then(([userData, progressData]) => {
      const fullName = userData.user?.user_metadata?.name || userData.user?.email?.split('@')[0] || ''
      setName(fullName)
      setCompletedSlugs(progressData.completed || [])
    }).catch(() => setName(''))
  }, [])

  const firstName = name?.split(' ')[0] || name || ''
  const completedCourses = resources.filter(r => completedSlugs.includes(r.slug))
  const showContinue = lastCourse || completedCourses.length > 0

  return (
    <main className="hub-page">

      {/* Hero welcome */}
      <div className="hub-welcome">
        <p className="hub-greeting">
          {firstName ? `Hey, ${firstName} 👋` : 'Welcome back 👋'}
        </p>
        <h1>
          Welcome to <span className="hub-username">StudentHub</span>
        </h1>
        <p className="hub-subtitle">Your learning hub — where would you like to go today?</p>

        {/* Stats */}
        <div className="hub-stats">
          {STATS.map(s => (
            <div key={s.label} className="hub-stat">
              <span className="hub-stat-value">{s.value}</span>
              <span className="hub-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Continue learning */}
      {showContinue && (
        <section className="hub-continue-section">
          <h2 className="hub-section-label">Continue Learning</h2>
          <div className="hub-continue-list">
            {lastCourse && !completedSlugs.includes(lastCourse.slug) && (
              <Link href={`/courses/${lastCourse.slug}`} className="hub-continue-card">
                <div className="hub-continue-info">
                  <span className="hub-continue-tag">Last visited</span>
                  <p className="hub-continue-title">{lastCourse.title}</p>
                  <span className="hub-continue-cat">{lastCourse.category}</span>
                </div>
                <span className="hub-continue-arrow">Continue &rarr;</span>
              </Link>
            )}
            {completedCourses.slice(0, 2).map(r => (
              <Link key={r.slug} href={`/courses/${r.slug}`} className="hub-continue-card hub-continue-card--done">
                <div className="hub-continue-info">
                  <span className="hub-continue-tag">&#10003; Completed</span>
                  <p className="hub-continue-title">{r.title}</p>
                  <span className="hub-continue-cat">{r.category}</span>
                </div>
                <span className="hub-continue-arrow">Review &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Feature cards */}
      <section>
        <h2 className="hub-section-label">Explore</h2>
        <div className="hub-grid">
          {FEATURES.map(({ href, title, desc, color, bg, icon }) => (
            <Link key={href} href={href} className="hub-card" style={{ background: bg }}>
              <div className="hub-card-icon" style={{ background: `${color}22` }}>
                <span style={{ fontSize: '1.6rem' }}>{icon}</span>
              </div>
              <h3 style={{ color }}>{title}</h3>
              <p>{desc}</p>
              <span className="hub-card-cta" style={{ color }}>Explore &rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
