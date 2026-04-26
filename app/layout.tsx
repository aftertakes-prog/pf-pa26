import type { Metadata } from 'next'
import './globals.css'
import PenCursor from '@/components/ui/PenCursor'
import KiteCursor from '@/components/ui/KiteCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import ClientProviders from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: 'Pooja Koundal — UX Writer',
  description: 'UX writer. Creative strategist. I turn friction into flow and features into stories people actually remember.',
  openGraph: {
    title: 'Pooja Koundal — UX Writer',
    description: 'Words that make products feel human.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <KiteCursor />
        <PenCursor />
        <ScrollProgress />
        <ClientProviders />
        {children}
      </body>
    </html>
  )
}
