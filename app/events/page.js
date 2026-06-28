import Image from 'next/image'
import Link from 'next/link'

export const metadata = { title: 'StudentHub - Events' }

const events = [
  { id: 1, title: 'Code & Chill',     image: '/images/events/image 2.png', description: 'Learn HTML, CSS, and basic JavaScript while relaxing with your peers.', type: 'Physical', detailLink: '/events/physical', },
  { id: 2, title: 'Design Decode',    image: '/images/events/image 3.png', description: 'Break down real interfaces and learn how to design better user experiences.', type: 'Virtual', detailLink: '/events/virtual', },
  { id: 3, title: 'Dev Launchpad',    image: '/images/events/image 4.png', description: 'A 3-day bootcamp on frontend development using real-life examples.', type: 'Virtual', detailLink: '/events/virtual', },
  { id: 4, title: 'Data Drive',       image: '/images/events/image.png',   description: 'Discover the power of Python, Excel, and Google Data Studio.', type: 'Physical', detailLink: '/events/physical', },
  { id: 5, title: 'No Code Ninjas',   image: '/images/events/event.png',   description: 'Use tools like Glide, Notion, and Webflow to create working projects.', type: 'Virtual', detailLink: '/events/virtual', },
  { id: 6, title: 'Git Ready',        image: '/images/events/event 1.png', description: 'Learn how to manage and submit code like a pro.', type: 'Physical', detailLink: '/events/physical', },
]

export default function EventsPage() {
  return (
    <>
      <section className="first-page">
        <div className="container">
          <h2>Find your next experience</h2>
          <h1>Discover &amp; Promote Upcoming Events</h1>
        </div>
      </section>

      <section className="events-main-section">
        <div className="container mt-3 d-flex justify-content-between flex-wrap gap-2">
          <div className="d-flex gap-3">
            <Link className="btn my-btn" href="/events/virtual">Virtual Events</Link>
            <Link className="btn my-btn" href="/events/physical">Physical Events</Link>
          </div>
          <Link className="btn my-btn" href="#">All Events</Link>
        </div>

        <div className="container mt-4">
          <div className="row g-3">
            {events.map((event) => (
              <div key={event.id} className="col-12 col-md-6 col-lg-4">
                <div className="events-card-box h-100">
                  <div style={{ position: 'relative', height: '150px', borderRadius: '8px', overflow: 'hidden', boxShadow: '1px 2px 8px rgba(0,0,0,0.3)' }}>
                    <Image src={event.image} alt={event.title} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <h5 className="event-card-title">{event.title}</h5>
                  <p className="card-description">
                    {event.description}
                    <br /><br />
                    <span className="phy">{event.type} event</span>
                  </p>
                  <div className="d-flex justify-content-between px-3 mt-2">
                    <Link className="event-view-btn" href={event.detailLink}>View Details</Link>
                    <Link className="event-register-btn" href="/events/register">Register Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
