'use client'
import { usePathname } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'

const AUTH_PATHS = ['/login', '/register', '/forgot-password', '/reset-password']

export default function Shell({ children }) {
  const pathname = usePathname()
  const isAuth = AUTH_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
  return (
    <>
      {!isAuth && <Header />}
      <div style={{ flex: 1 }}>{children}</div>
      {!isAuth && <Footer />}
    </>
  )
}
