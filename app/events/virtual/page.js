import Link from 'next/link'

export const metadata = { title: 'StudentHub - Virtual Events' }

const virtualEvents = [
  {
    id: 1,
    title: 'Dev Launchpad',
    image: '/images/events/image 2.png',
    date: 'Sept 15–17 | 6PM daily WAT',
    location: 'Zoom',
    description: 'Frontend bootcamp with live coding. Get set with your laptop and notepad.',
  },
  {
    id: 2,
    title: 'Design Decode',
    image: '/images/events/event.png',
    date: 'Oct 10 | 7PM – 12PM WAT',
    location: 'Zoom',
    description: 'UI/UX deconstruction & practice. Come with your laptop and notepad.',
  },
  {
    id: 3,
    title: 'No-Code Ninjas',
    image: '/images/events/event 1.png',
    date: 'Sept 24 | 8PM WAT',
    location: 'Demo on YouTube',
    description: 'Build projects using no-code tools (Webflow, Glide). Come with your laptop and notepad.',
  },
]

export default function VirtualEventsPage() {
  return (
    <section className="events-detail-section">
      <div className="container pt-3">
        <Link href="/events" className="arrow-link" style={{ fontSize: '2rem' }}>&#8592; Back</Link>
      </div>

      <div className="container mt-3" id="virtual-container">
        <h2 className="mb-0" style={{ color: 'white' }}>Virtual Events</h2>
        <p className="little-info" style={{ color: 'white' }}>
          Join our online events from anywhere — all you need is a laptop and internet connection.
        </p>
      </div>

      <div className="container mt-3">
        <button className="bordered">Virtual Events</button>
      </div>

      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {virtualEvents.map((event) => (
            <div key={event.id} className="card-container">
              <img
                src={event.image}
                className="image-card"
                alt={event.title}
                loading="lazy"
              />
              <h2 id="card-name">{event.title}</h2>
              <p className="description">
                📅 {event.date}
                <br /><br />
                <span className="extra-header">📍 {event.location}</span>
                <br /><br />
                <span className="extra-header" style={{ fontWeight: '500', fontSize: '14px', lineHeight: '1.4' }}>
                  {event.description}
                </span>
              </p>
              <Link className="register" href="/events/register">Register Now</Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
