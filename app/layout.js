import { Inter } from 'next/font/google'
import './globals.css'
import Shell from '@/components/Shell'
import BootstrapJS from '@/components/BootstrapJS'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata = {
  title: 'StudentHub',
  description: 'Your one-stop platform for student resources, events and mentorship. Connect, Learn and Grow.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BootstrapJS />
        <Shell>{children}</Shell>
      </body>
    </html>
  )
}
