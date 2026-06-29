'use client'
import { useState } from 'react'
import Link from 'next/link'
import { roadmaps } from '@/data/roadmaps'

const LEVEL_COLOR = {
  beginner:     { bg: '#dcfce7', color: '#16a34a', label: 'Beginner' },
  intermediate: { bg: '#fef9c3', color: '#ca8a04', label: 'Intermediate' },
  advanced:     { bg: '#fee2e2', color: '#dc2626', label: 'Advanced' },
}

export default function RoadmapPage() {
  const [activeId, setActiveId] = useState(roadmaps[0].id)
  const active = roadmaps.find((r) => r.id === activeId)

  return (
    <>
      <section className="first-page">
        <div className="container">
          <h2>Choose a career track and follow a structured path</h2>
          <h1>Learning Roadmaps</h1>
        </div>
      </section>

      <main className="roadmap-page">
        {/* Track selector */}
        <section className="roadmap-tracks">
          {roadmaps.map((r) => (
            <button
              key={r.id}
              className={`track-card ${activeId === r.id ? 'track-card--active' : ''}`}
              onClick={() => setActiveId(r.id)}
            >
              <span className="track-icon">{r.icon}</span>
              <span className="track-title">{r.title}</span>
              <span className="track-duration">{r.duration}</span>
            </button>
          ))}
        </section>

        {/* Active roadmap */}
        <section className="roadmap-detail">
          <div className="roadmap-detail-header">
            <span className="track-icon" style={{ fontSize: '2.5rem' }}>{active.icon}</span>
            <div>
              <h2>{active.title}</h2>
              <p>{active.description}</p>
            </div>
            <span className="roadmap-duration-badge">{active.duration}</span>
          </div>

          <div className="roadmap-steps">
            {active.steps.map((step, i) => {
              const lvl = LEVEL_COLOR[step.level]
              return (
                <div key={i} className="roadmap-step">
                  {/* connector line */}
                  {i < active.steps.length - 1 && <div className="step-connector" />}

                  {/* number bubble */}
                  <div className="step-number">{i + 1}</div>

                  {/* card */}
                  <div className="step-card">
                    <div className="step-card-top">
                      <span
                        className="step-level"
                        style={{ background: lvl.bg, color: lvl.color }}
                      >
                        {lvl.label}
                      </span>
                      <h3 className="step-title">{step.title}</h3>
                      <p className="step-desc">{step.description}</p>
                    </div>
                    <Link href={`/courses/${step.slug}`} className="step-cta">
                      Start lesson &rarr;
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>
    </>
  )
}
