import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  metadataBase: new URL('https://nowrent.com'),
  title: 'NowRent - Car Rental in Spain',
  description: 'Premium car rental service in Spain. Choose from our wide range of vehicles including economy, compact, SUV, and luxury cars. Best prices and 24/7 support.',
  keywords: 'car rental, Spain, vehicle hire, car hire, rental cars, Spain car rental, luxury car rental, economy car rental',
  authors: [{ name: 'NowRent' }],
  openGraph: {
    title: 'NowRent - Car Rental in Spain',
    description: 'Premium car rental service in Spain. Choose from our wide range of vehicles including economy, compact, SUV, and luxury cars.',
    url: 'https://nowrent.com',
    siteName: 'NowRent',
    images: [
      {
        url: '/images/hero image.jpg',
        width: 1200,
        height: 630,
        alt: 'NowRent Car Rental Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NowRent - Car Rental in Spain',
    description: 'Premium car rental service in Spain. Choose from our wide range of vehicles.',
    images: ['/images/hero image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/logo.svg"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#1A2B49" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'CarRental',
              name: 'NowRent',
              description: 'Premium car rental service in Spain',
              url: 'https://nowrent.com',
              logo: 'https://nowrent.com/images/logo.svg',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ES',
              },
              areaServed: {
                '@type': 'Country',
                name: 'Spain',
              },
              priceRange: '€€',
              openingHours: 'Mo-Su 00:00-24:00',
              telephone: '+34-XXX-XXX-XXX',
              sameAs: [
                'https://www.facebook.com/nowrent',
                'https://www.instagram.com/nowrent',
                'https://www.tiktok.com/@nowrent',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <Header />
          <MobileNavigation />
          <main className="min-h-screen bg-white">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  )
} 