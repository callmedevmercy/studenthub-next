'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { resources } from '@/data/resources'

const categories = ['design', 'productivity', 'coding', 'business', 'language']

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
      <h1>Learning Resources</h1>
      <p>Everything you need to learn, grow, and succeed. From coding tutorials to design masterclasses.</p>

      {q && (
        <p style={{ marginBottom: '0.5rem', color: '#555', fontSize: '0.95rem' }}>
          Showing results for <strong>&ldquo;{q}&rdquo;</strong>
          {' — '}
          <Link href="/resources" style={{ color: '#0EA5E9' }}>Clear search</Link>
        </p>
      )}

      <div className="filter-bar">
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'active' : ''}
              onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
            >
              {cat}
            </button>
          ))}
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

      <div className="card-grid">
        {filtered.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden' }}>
              <Image src={resource.image} alt={resource.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="resource-card-body">
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <span className={`level-badge ${resource.level}`}>
                {resource.level.charAt(0).toUpperCase() + resource.level.slice(1)}
              </span>
              <Link href={`/courses/${resource.slug}`} className="start-btn">
                Start learning
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', marginTop: '2rem', color: '#555' }}>
          No resources found{q ? ` for "${q}"` : ' for the selected filters'}.
        </p>
      )}
    </main>
  )
}

export default function ResourcesPage() {
  return (
    <Suspense fallback={<main className="resources-section"><p>Loading resources...</p></main>}>
      <ResourcesContent />
    </Suspense>
  )
}
