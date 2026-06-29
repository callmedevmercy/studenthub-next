'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { resources } from '@/data/resources'

const CATEGORIES = [
  { id: null,            label: 'All',          icon: '✦', color: '#6366f1' },
  { id: 'design',       label: 'Design',        icon: '🎨', color: '#d946ef' },
  { id: 'productivity', label: 'Productivity',  icon: '⚡', color: '#f59e0b' },
  { id: 'coding',       label: 'Coding',        icon: '💻', color: '#0EA5E9' },
  { id: 'business',     label: 'Business',      icon: '📊', color: '#16a34a' },
  { id: 'language',     label: 'Language',      icon: '🌐', color: '#f97316' },
]

const CAT_COLOR = Object.fromEntries(CATEGORIES.slice(1).map(c => [c.id, c.color]))

function ResourcesContent() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q')?.toLowerCase() || ''

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState('all')

  const filtered = resources.filter((r) => {
    const matchCat   = !selectedCategory || r.category === selectedCategory
    const matchLevel = selectedLevel === 'all' || r.level === selectedLevel
    const matchQuery = !q || r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q) || r.category.toLowerCase().includes(q)
    return matchCat && matchLevel && matchQuery
  })

  return (
    <main className="resources-section">
      {/* Hero */}
      <div className="resources-hero">
        <h1>Learning Resources</h1>
        <p>Everything you need to learn, grow, and succeed — curated for students.</p>
      </div>

      {q && (
        <p className="resources-query-notice">
          Showing results for <strong>&ldquo;{q}&rdquo;</strong>
          {' — '}
          <Link href="/resources">Clear search</Link>
        </p>
      )}

      {/* Filters */}
      <div className="filter-bar">
        <div className="filter-buttons">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id
            return (
              <button
                key={cat.label}
                className={`filter-pill ${isActive ? 'filter-pill--active' : ''}`}
                style={isActive ? { background: cat.color, borderColor: cat.color, color: 'white' } : { borderColor: cat.color, color: cat.color }}
                onClick={() => setSelectedCategory(cat.id)}
              >
                <span>{cat.icon}</span> {cat.label}
              </button>
            )
          })}
        </div>

        <select
          className="level-filter"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="all">All Levels</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {/* Cards */}
      <div className="card-grid">
        {filtered.map((resource) => {
          const accentColor = CAT_COLOR[resource.category] || '#6366f1'
          return (
            <div key={resource.id} className="resource-card">
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: accentColor, borderRadius: '16px 16px 0 0' }} />
              <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
                <Image src={resource.image} alt={resource.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
              </div>
              <div className="resource-card-body">
                <div className="resource-card-meta">
                  <span className="resource-cat-tag" style={{ background: `${accentColor}18`, color: accentColor }}>
                    {CATEGORIES.find(c => c.id === resource.category)?.icon} {resource.category}
                  </span>
                  <span className={`level-badge ${resource.level}`}>
                    {resource.level}
                  </span>
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <Link href={`/courses/${resource.slug}`} className="start-btn">
                  Start learning &rarr;
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <p className="resources-empty">
          No resources found{q ? ` for "${q}"` : ' for the selected filters'}.
        </p>
      )}
    </main>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<main className="resources-section"><p style={{ padding: '2rem', color: '#888' }}>Loading resources…</p></main>}>
      <ResourcesContent />
    </Suspense>
  )
}
