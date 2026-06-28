import Link from 'next/link'

export const metadata = { title: 'StudentHub - Physical Events' }

const physicalEvents = [
  {
    id: 1,
    title: 'Code & Chill',
    image: '/images/events/image 2.png',
    date: 'Sept 14, 2025 | 10AM WAT',
    location: 'Campus Lab',
    description: 'Friendly beginner coding session in HTML/CSS/JS. Come with your laptop and notepad.',
  },
  {
    id: 2,
    title: 'Data Dive',
    image: '/images/events/event.png',
    date: 'Aug 15, 2025 | 12PM WAT',
    location: 'School Auditorium',
    description: 'Learn Python, Excel, and Data Studio for beginners. Come with your laptop and notepad.',
  },
  {
    id: 3,
    title: 'Git Ready',
    image: '/images/events/event 1.png',
    date: 'Oct 8, 2025 | 1PM WAT',
    location: 'School Auditorium',
    description: 'Learn Git & GitHub collaboration. Come with your laptop and notepad.',
  },
]

export default function PhysicalEventsPage() {
  return (
    <section className="events-detail-section">
      <div className="container pt-3">
        <Link href="/events" className="arrow-link" style={{ fontSize: '2rem' }}>&#8592; Back</Link>
      </div>

      <div className="container mt-3" id="physical-container">
        <h2 className="mb-0">Physical Events</h2>
        <p className="little-info">
          In-person events at campus and partner venues — show up, connect, and learn together.
        </p>
      </div>

      <div className="container mt-3">
        <button className="bordered">Physical Events</button>
      </div>

      <div className="container mt-4">
        <div className="d-flex flex-wrap justify-content-center gap-4">
          {physicalEvents.map((event) => (
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
