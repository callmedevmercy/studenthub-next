import { Inter } from 'next/font/google'
import './globals.css'
import Shell from '@/components/Shell'
import BootstrapJS from '@/components/BootstrapJS'

const inter = Inter({ subsets: ['latin'], weight: ['400', '600', '700'] })

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const OG_IMAGE = `${SITE_URL}/images/student_hub_pic.png`

export const metadata = {
  title: 'StudentHub',
  description: 'Your one-stop platform for student resources, events and mentorship. Connect, Learn and Grow.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">📚</text></svg>',
  },
  openGraph: {
    title: 'StudentHub',
    description: 'Your one-stop platform for student resources, events and mentorship.',
    url: SITE_URL,
    siteName: 'StudentHub',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'StudentHub' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StudentHub',
    description: 'Your one-stop platform for student resources, events and mentorship.',
    images: [OG_IMAGE],
  },
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
