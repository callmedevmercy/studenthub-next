export const metadata = { title: 'StudentHub - Mentorship' }

const mentors = [
  { id: 1, name: 'Dr Mark Johnson',      skill: 'Paramedic',                          bio: 'A dedicated and quick-thinking Paramedic with 12 years of experience in emergency care.',                          image: '/images/Mentorship page/istockphoto-1214252768-170667a.jpg' },
  { id: 2, name: 'Sarah Johnson',        skill: 'UX/UI Designer',                     bio: 'Senior UX Designer at Google with 8+ years of experience. Passionate about inclusive and accessible design.',       image: '/images/Mentorship page/clay-elliot-mpDV4xaFP8c-unsplash.jpg' },
  { id: 3, name: 'James Thompson',       skill: 'Product Manager',                    bio: 'VP of Product at Spotify. Experienced in product strategy, user research, and cross-functional leadership.',        image: '/images/Mentorship page/alexander-hipp-iEEBWgY_6lA-unsplash.jpg' },
  { id: 4, name: 'Alexa Rodriguez',      skill: 'Data Scientist',                     bio: 'Principal Data Scientist at Netflix. Expert in machine learning and turning complex data into business insights.',  image: '/images/Mentorship page/alex-starnes-WYE2UhXsU1Y-unsplash.jpg' },
  { id: 5, name: 'Prof. Maria Campbell', skill: 'Software Engineer & Researcher',     bio: 'Principal researcher at CyberGuard. Focuses on mitigating software vulnerabilities and secure system design.',    image: '/images/Mentorship page/tran-nhu-tuan-rlLnCS7jIQM-unsplash.jpg' },
  { id: 6, name: 'Emily Chen',           skill: 'Software Engineer',                  bio: 'Expert in AI and ML. Proficient in Python, TensorFlow, and natural language processing applications.',            image: '/images/Mentorship page/higher-landing-empowerher.jpg' },
  { id: 7, name: 'Dr. Emily Carter',     skill: 'Molecular Biology, CRISPR, PCR',    bio: 'PhD from Stanford. Focuses on genetic-based disease treatments and cutting-edge biomedical research.',            image: '/images/Mentorship page/andrew-neel-QLqNalPe0RA-unsplash.jpg' },
  { id: 8, name: 'Dr Emeka Obi',         skill: 'Electrical Engineer & Researcher',   bio: 'Expert in energy systems and smart grid technology. PhD from University of Ibadan.',                             image: '/images/Mentorship page/nith-in-w1N1WmLDyHU-unsplash.jpg' },
]

export default function MentorshipPage() {
  return (
    <main className="mentorship-section">
      <h1>Find <span className="highlight">Your Mentor</span></h1>
      <p className="mentorship-subtext">
        Connect with experienced professionals who can guide your academic and career journey and help you achieve your goals.
      </p>

      <div className="mentor-grid">
        {mentors.map((mentor) => (
          <div key={mentor.id} className="mentor-card">
            <img
              src={mentor.image}
              alt={mentor.name}
              className="mentor-img"
              loading="lazy"
            />
            <h3>{mentor.name}</h3>
            <p><strong>Skill Area:</strong> {mentor.skill}</p>
            <p>{mentor.bio}</p>

            {/* Bootstrap modal trigger */}
            <button
              className="request-btn"
              data-bs-toggle="modal"
              data-bs-target="#mentorshipModal"
            >
              Request Mentorship
            </button>
          </div>
        ))}
      </div>

      {/* Mentorship Request Modal */}
      <div className="modal fade" id="mentorshipModal" tabIndex="-1" aria-labelledby="mentorshipModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header" style={{ backgroundColor: '#e0f0ff' }}>
              <h5 className="modal-title" id="mentorshipModalLabel">Request Mentorship</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action="/api/mentorship" method="POST">
                <input className="modal-input" type="text"   name="name"    placeholder="Your Full Name"    required />
                <input className="modal-input" type="email"  name="email"   placeholder="Your Email"        required />
                <input className="modal-input" type="text"   name="subject" placeholder="Topic / Skill Area" required />
                <textarea
                  className="modal-input"
                  name="message"
                  placeholder="Tell the mentor what you need help with..."
                  rows="4"
                  required
                  style={{ resize: 'vertical' }}
                />
                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: '#00aaff', color: 'white', fontWeight: '600' }}
                >
                  Send Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
