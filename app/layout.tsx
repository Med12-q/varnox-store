import type { Metadata, Viewport } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { LanguageProvider } from '@/lib/language-context'
import { AuthProvider } from '@/lib/auth-context'
import { OrdersProvider } from '@/lib/orders-context'
import { AdminProvider } from '@/lib/admin-context'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FloatingContacts } from '@/components/floating-contacts'
import { LiveNotifications } from '@/components/live-notifications'
import { LiveStats } from '@/components/live-stats'
import { OnlineVisitors } from '@/components/online-visitors'
import { PromoBanner } from '@/components/promo-banner'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'VARNOX STORE | Premium Scripts & Bots',
  description: 'Discover our exclusive collection of WhatsApp bots, Telegram bots and professional automation tools. Premium automation solutions for your business.',
  keywords: ['WhatsApp Bot', 'Telegram Bot', 'Automation', 'Scripts', 'AI Chatbot', 'VARNOX'],
  authors: [{ name: 'VARNOX PRIME TECH OFFICIAL' }],
  creator: 'VARNOX PRIME TECH OFFICIAL',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'VARNOX STORE | Premium Scripts & Bots',
    description: 'Premium automation tools and bots for WhatsApp, Telegram and more.',
    siteName: 'VARNOX STORE',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#dc2626',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${geistMono.variable} bg-background`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <AuthProvider>
          <LanguageProvider>
            <OrdersProvider>
              <AdminProvider>
                <PromoBanner />
                <Header />
                <main className="flex-1 pt-10">{children}</main>
                <Footer />
                <FloatingContacts />
                <LiveNotifications />
                <LiveStats />
                <OnlineVisitors />
              </AdminProvider>
            </OrdersProvider>
          </LanguageProvider>
        </AuthProvider>
        </body>
    </html>
  )
}
