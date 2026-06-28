import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="footer-bar">
        <span className="logo footer-logo">StudentHub</span>

        <nav className="footer-nav">
          <Link href="/">Home</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/events">Events</Link>
          <Link href="/roadmap">Roadmap</Link>
          <Link href="/mentorship">Mentorship</Link>
        </nav>

        <div className="social-icons">
          <a href="#" aria-label="Instagram"><Image src="/images/instagram_1409946.png" alt="Instagram" width={22} height={22} /></a>
          <a href="#" aria-label="Facebook"><Image src="/images/facebook.png" alt="Facebook" width={22} height={22} /></a>
          <a href="#" aria-label="LinkedIn"><Image src="/images/linkden.png" alt="LinkedIn" width={22} height={22} /></a>
          <a href="#" aria-label="Twitter"><Image src="/images/twitter.png" alt="Twitter" width={22} height={22} /></a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 StudentHub Inc. All rights reserved.</p>
        <div className="footer-policies">
          <Link href="#">Privacy</Link>
          <Link href="#">Terms</Link>
          <Link href="#">Cookies</Link>
        </div>
      </div>
    </footer>
  )
}
