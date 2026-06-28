import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BootstrapJS from '@/components/BootstrapJS'

export const metadata = {
  title: 'StudentHub',
  description: 'Your one-stop platform for student resources, events and mentorship. Connect, Learn and Grow.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BootstrapJS />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
