'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { resources } from '@/data/resources'

export default function CoursePage({ params }) {
  const course = resources.find((r) => r.slug === params.slug)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (!course) return
    const done = JSON.parse(localStorage.getItem('sh_completed') || '[]')
    setCompleted(done.includes(course.slug))
  }, [course])

  const toggleComplete = () => {
    const done = JSON.parse(localStorage.getItem('sh_completed') || '[]')
    const next = completed
      ? done.filter((s) => s !== course.slug)
      : [...done, course.slug]
    localStorage.setItem('sh_completed', JSON.stringify(next))
    setCompleted(!completed)
  }

  if (!course) {
    return (
      <div className="course-not-found">
        <h2>Course not found</h2>
        <Link href="/resources" className="course-back-btn">Back to Resources</Link>
      </div>
    )
  }

  const related = resources
    .filter((r) => r.category === course.category && r.slug !== course.slug)
    .slice(0, 3)

  const LEVEL_COLOR = {
    beginner:     { bg: '#dcfce7', color: '#16a34a' },
    intermediate: { bg: '#fef9c3', color: '#ca8a04' },
    advanced:     { bg: '#fee2e2', color: '#dc2626' },
  }
  const lvl = LEVEL_COLOR[course.level]

  return (
    <main className="course-page">
      {/* Breadcrumb */}
      <div className="course-breadcrumb">
        <Link href="/resources">Resources</Link>
        <span>/</span>
        <span>{course.title}</span>
      </div>

      {/* Main layout */}
      <div className="course-layout">

        {/* Left: video + content */}
        <div className="course-main">
          {/* Video */}
          <div className="course-video-wrap">
            <iframe
              src={course.youtube}
              title={course.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Title row */}
          <div className="course-title-row">
            <div>
              <span
                className="course-level-badge"
                style={{ background: lvl.bg, color: lvl.color }}
              >
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
              <h1 className="course-title">{course.title}</h1>
              <p className="course-desc">{course.description}</p>
            </div>
          </div>

          {/* What you'll learn */}
          {course.outcomes && (
            <div className="course-outcomes">
              <h2>What you&apos;ll learn</h2>
              <ul className="outcomes-grid">
                {course.outcomes.map((o, i) => (
                  <li key={i}>
                    <span className="outcome-check">✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related courses */}
          {related.length > 0 && (
            <div className="course-related">
              <h2>More in {course.category.charAt(0).toUpperCase() + course.category.slice(1)}</h2>
              <div className="related-grid">
                {related.map((r) => {
                  const rlvl = LEVEL_COLOR[r.level]
                  return (
                    <Link key={r.slug} href={`/courses/${r.slug}`} className="related-card">
                      <img src={r.image} alt={r.title} loading="lazy" />
                      <div className="related-card-body">
                        <span
                          className="course-level-badge"
                          style={{ background: rlvl.bg, color: rlvl.color, fontSize: '0.7rem' }}
                        >
                          {r.level}
                        </span>
                        <p className="related-card-title">{r.title}</p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: sticky info card */}
        <aside className="course-sidebar">
          <div className="course-info-card">
            <img src={course.image} alt={course.title} loading="lazy" className="course-thumb" />

            <div className="course-info-body">
              <div className="course-meta-row">
                <span className="meta-item">
                  <span className="meta-icon">📚</span>
                  <span style={{ textTransform: 'capitalize' }}>{course.category}</span>
                </span>
                <span className="meta-item">
                  <span className="meta-icon">🎯</span>
                  <span style={{ textTransform: 'capitalize' }}>{course.level}</span>
                </span>
              </div>

              <button
                className={`course-complete-btn ${completed ? 'completed' : ''}`}
                onClick={toggleComplete}
              >
                {completed ? '✓ Completed' : 'Mark as complete'}
              </button>

              <Link href="/roadmap" className="course-roadmap-link">
                View Learning Roadmap &rarr;
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  )
}
