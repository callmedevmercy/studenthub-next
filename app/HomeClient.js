'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { resources } from '@/data/resources'

const FEATURES = [
  { href: '/resources', title: 'Resources',   desc: 'Browse courses and study materials curated for students.', accent: '#0EA5E9' },
  { href: '/events',    title: 'Events',      desc: 'Discover upcoming virtual and in-person student events.',  accent: '#d946ef' },
  { href: '/roadmap',   title: 'Roadmap',     desc: 'Follow structured learning paths to master your track.',   accent: '#ab4fff' },
  { href: '/mentorship',title: 'Mentorship',  desc: 'Connect with experienced mentors in your field.',          accent: '#16a34a' },
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
      <div className="hub-welcome">
        <h1>
          Welcome to StudentHub
          {firstName && <span className="hub-username">, {firstName}</span>}
        </h1>
        <p>Your learning hub. Where would you like to go today?</p>
      </div>

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

      <section>
        <h2 className="hub-section-label">Explore</h2>
        <div className="hub-grid">
          {FEATURES.map(({ href, title, desc, accent }) => (
            <Link key={href} href={href} className="hub-card">
              <span className="hub-card-accent" style={{ background: accent }} />
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className="hub-card-cta">Explore &rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
