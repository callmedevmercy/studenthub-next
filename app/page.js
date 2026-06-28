import Link from 'next/link'

export const metadata = {
  title: 'StudentHub',
}

const FEATURES = [
  {
    href: '/resources',
    title: 'Resources',
    desc: 'Browse courses and study materials curated for students.',
    accent: '#0EA5E9',
  },
  {
    href: '/events',
    title: 'Events',
    desc: 'Discover upcoming virtual and in-person student events.',
    accent: '#d946ef',
  },
  {
    href: '/roadmap',
    title: 'Roadmap',
    desc: 'Follow structured learning paths to master your track.',
    accent: '#ab4fff',
  },
  {
    href: '/mentorship',
    title: 'Mentorship',
    desc: 'Connect with experienced mentors in your field.',
    accent: '#16a34a',
  },
]

export default function HomePage() {
  return (
    <main className="hub-page">
      <div className="hub-welcome">
        <h1>Welcome to StudentHub</h1>
        <p>Your learning hub. Where would you like to go today?</p>
      </div>

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
    </main>
  )
}
