'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const cookies = document.cookie.split(';').map(c => c.trim())
    setIsLoggedIn(cookies.some(c => c.startsWith('sb-logged-in=')))
  }, [pathname])

  const isActive = (path) =>
    path === '/' ? pathname === '/' : pathname.startsWith(path)

  const closeMenu = () => setMenuOpen(false)

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setIsLoggedIn(false)
    closeMenu()
    router.push('/login')
  }

  return (
    <header>
      <Link href="/" className="logo" onClick={closeMenu}>StudentHub</Link>

      <form className="search-form" action="#" method="get">
        <div className="search-wrapper">
          <Image src="/images/search icon.png" alt="Search" width={20} height={20} className="search-icon" />
          <input type="text" placeholder="Explore by Skill or Mentor..." name="q" />
        </div>
      </form>

      {/* Hamburger button — mobile only */}
      <button
        className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation"
      >
        <span />
        <span />
        <span />
      </button>

      {/* Nav — collapses on mobile */}
      <nav className={`main-nav ${menuOpen ? 'main-nav--open' : ''}`}>
        <Link href="/"           className={isActive('/')           ? 'active' : ''} onClick={closeMenu}>Home</Link>
        <Link href="/resources"  className={isActive('/resources')  ? 'active' : ''} onClick={closeMenu}>Resources</Link>
        <Link href="/events"     className={isActive('/events')     ? 'active' : ''} onClick={closeMenu}>Events</Link>
        <Link href="/roadmap"    className={isActive('/roadmap')    ? 'active' : ''} onClick={closeMenu}>Roadmap</Link>
        <Link href="/mentorship" className={isActive('/mentorship') ? 'active' : ''} onClick={closeMenu}>Mentorship</Link>

        {/* Auth buttons inside nav on mobile */}
        <div className="auth-buttons auth-buttons--mobile">
          {isLoggedIn ? (
            <button className="signup-btn" onClick={handleLogout}>Log out</button>
          ) : (
            <>
              <Link href="/login"    className="login-btn"  onClick={closeMenu}>Log in</Link>
              <Link href="/register" className="signup-btn" onClick={closeMenu}>Sign up</Link>
            </>
          )}
        </div>
      </nav>

      {/* Auth buttons — desktop only */}
      <div className="auth-buttons auth-buttons--desktop">
        {isLoggedIn ? (
          <button className="signup-btn" onClick={handleLogout}>Log out</button>
        ) : (
          <>
            <Link href="/login"    className="login-btn">Log in</Link>
            <Link href="/register" className="signup-btn">Sign up</Link>
          </>
        )}
      </div>
    </header>
  )
}
