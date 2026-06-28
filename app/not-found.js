import Link from 'next/link'

export const metadata = { title: 'StudentHub - Page Not Found' }

export default function NotFound() {
  return (
    <main className="notfound-page">
      <div className="notfound-code">404</div>
      <h1 className="notfound-title">Page not found</h1>
      <p className="notfound-desc">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="notfound-btn">Go back home</Link>
    </main>
  )
}
