'use client'
import Link from 'next/link'
import Image from 'next/image'

export default function LandingPage() {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="landing-hero-overlay" />
        <div className="container landing-hero-content">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-7 text-center text-lg-start">
              <span className="badge-announcement mb-3 d-inline-block">
                ✨ Empowering 10,000+ students worldwide
              </span>
              <h1 className="hero-title">
                The Ultimate Hub for <br />
                <span className="gradient-text">Student Growth</span> &amp; Connection
              </h1>
              <p className="hero-description">
                Unlock your potential. Access curated study resources, follow structured career roadmaps, connect with top industry mentors, and join engaging student events — all in one unified platform.
              </p>
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mt-4">
                <Link href="/register" className="btn btn-landing-primary">
                  Get Started for Free
                </Link>
                <Link href="/login" className="btn btn-landing-outline">
                  Log In
                </Link>
              </div>
            </div>
            <div className="col-12 col-lg-5 d-none d-lg-block">
              <div className="hero-image-wrapper">
                <Image
                  src="/images/student_hub_pic.png"
                  alt="StudentHub Learning Ecosystem"
                  width={500}
                  height={500}
                  className="hero-image img-fluid"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="landing-stats">
        <div className="container">
          <div className="stats-glass-card">
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <div className="stat-number">30+</div>
                <div className="stat-label">Curated Resources</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-number">8+</div>
                <div className="stat-label">Expert Mentors</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-number">4+</div>
                <div className="stat-label">Career Roadmaps</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-number">Weekly</div>
                <div className="stat-label">Virtual &amp; Local Events</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="landing-features">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="section-title">Explore What You Can Do</h2>
            <p className="section-subtitle">Everything you need to learn, build, and succeed in your academic and professional career</p>
          </div>

          <div className="row g-4">
            {/* Feature 1: Resources */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-card f-resources">
                <div className="feature-icon">📚</div>
                <h3>Resources</h3>
                <p>Browse high-quality study materials, cheat sheets, and courses carefully curated for students across different skill categories.</p>
                <Link href="/resources" className="feature-link">
                  Explore Resources &rarr;
                </Link>
              </div>
            </div>

            {/* Feature 2: Roadmaps */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-card f-roadmaps">
                <div className="feature-icon">🗺️</div>
                <h3>Roadmaps</h3>
                <p>Follow structured, step-by-step pathways designed by professionals to guide you from absolute beginner to industry-ready.</p>
                <Link href="/roadmap" className="feature-link">
                  View Roadmaps &rarr;
                </Link>
              </div>
            </div>

            {/* Feature 3: Mentorship */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-card f-mentorship">
                <div className="feature-icon">🤝</div>
                <h3>Mentorship</h3>
                <p>Connect with experienced industry professionals for guidance on portfolio reviews, career advice, and interview prep.</p>
                <Link href="/mentorship" className="feature-link">
                  Find a Mentor &rarr;
                </Link>
              </div>
            </div>

            {/* Feature 4: Events */}
            <div className="col-12 col-md-6 col-lg-3">
              <div className="feature-card f-events">
                <div className="feature-icon">🎉</div>
                <h3>Events</h3>
                <p>Participate in virtual webinars, hands-on workshops, and physical meetups to build your network and skills with peers.</p>
                <Link href="/events" className="feature-link">
                  Discover Events &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose StudentHub */}
      <section className="landing-benefits">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-12 col-lg-6">
              <h2 className="benefits-title">Why Students Choose <span className="highlight-brand">StudentHub</span></h2>
              <p className="benefits-subtitle mb-4">We unify resources and community so you can focus on what matters: learning and growing.</p>

              <div className="benefit-item d-flex gap-3 mb-4">
                <div className="benefit-badge">&#10003;</div>
                <div>
                  <h4>Zero Noise, High Value</h4>
                  <p>Skip the endless searches. Our directory features only top-tier content vetted by senior student leaders and mentors.</p>
                </div>
              </div>

              <div className="benefit-item d-flex gap-3 mb-4">
                <div className="benefit-badge">&#10003;</div>
                <div>
                  <h4>Actionable Paths</h4>
                  <p>Knowing what to learn next is half the battle. Our roadmaps map directly to our curated courses, making learning seamless.</p>
                </div>
              </div>

              <div className="benefit-item d-flex gap-3">
                <div className="benefit-badge">&#10003;</div>
                <div>
                  <h4>Real-World Engagement</h4>
                  <p>Bridge the gap between theory and practice by registering for physical workshops and booking 1-on-1 sessions with mentors.</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="benefits-card-showcase p-4 p-md-5">
                <div className="showcase-header mb-4">
                  <div className="showcase-dot dot-red" />
                  <div className="showcase-dot dot-yellow" />
                  <div className="showcase-dot dot-green" />
                  <span className="ms-2 text-muted text-xs">Previewing StudentHub Dashboard</span>
                </div>
                <div className="showcase-body">
                  <div className="showcase-card mb-3">
                    <span className="badge bg-success-subtle text-success mb-1">Mentorship Program</span>
                    <h5>Sarah Johnson &bull; UX/UI Design</h5>
                    <p className="text-muted text-sm mb-0">Requested 1-on-1 session for portfolio review.</p>
                  </div>
                  <div className="showcase-card mb-3">
                    <span className="badge bg-primary-subtle text-primary mb-1">Active Course</span>
                    <h5>Introduction to React.js</h5>
                    <div className="progress mt-2" style={{ height: '6px' }}>
                      <div className="progress-bar" style={{ width: '70%', background: '#ab4fff' }} />
                    </div>
                  </div>
                  <div className="showcase-card">
                    <span className="badge bg-warning-subtle text-warning mb-1">Upcoming Event</span>
                    <h5>Code &amp; Chill Live Hackathon</h5>
                    <p className="text-muted text-sm mb-0">September 14, Campus Lab</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="landing-cta text-center">
        <div className="container">
          <div className="cta-box">
            <h2>Ready to Accelerate Your Career?</h2>
            <p className="mb-4">Join thousands of students building skills and connections. No credit card required.</p>
            <Link href="/register" className="btn btn-landing-primary btn-lg px-5">
              Create Your Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
