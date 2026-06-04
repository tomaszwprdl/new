import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '@/context/LanguageContext'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
  themeColor: '#1A2B49',
}

export const metadata: Metadata = {
  title: {
    template: '%s | NowRent',
    default: 'Wynajem auta bez kaucji Alicante i Costa Blanca | NowRent',
  },
  description: 'Wynajem auta na Lotnisku Alicante, w Torrevieja i Costa Blanca. Bez kaucji, pełne ubezpieczenie w cenie, bez limitu kilometrów w Hiszpanii i elastyczny odbiór.',
  metadataBase: new URL('https://nowrent.eu'),
  alternates: {
    canonical: 'https://nowrent.eu',
  },
  keywords: [
    'wynajem auta Alicante',
    'wynajem samochodu bez kaucji',
    'wynajem auta Lotnisko Alicante',
    'wynajem auta Costa Blanca',
    'wypożyczalnia samochodów Alicante',
    'wynajem auta Torrevieja',
    'car rental Alicante Airport',
    'no deposit car rental',
    'car rental Costa Blanca South',
    'car rental Torrevieja',
    'car rental Orihuela Costa',
    'car rental San Pedro del Pinatar',
    'full insurance car rental',
    'unlimited mileage car rental Spain',
  ],
  authors: [{ name: 'NowRent' }],
  creator: 'NowRent',
  publisher: 'NowRent',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    title: 'Wynajem auta bez kaucji Alicante i Costa Blanca | NowRent',
    description: 'Wynajem auta na Lotnisku Alicante, w Torrevieja i Costa Blanca. Bez kaucji, pełne ubezpieczenie w cenie, bez limitu kilometrów w Hiszpanii i elastyczny odbiór.',
    url: 'https://nowrent.eu',
    siteName: 'NowRent',
    locale: 'pl_PL',
    alternateLocale: ['en_US'],
    type: 'website',
    images: [
      {
        url: 'https://nowrent.eu/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NowRent — wynajem auta bez kaucji w okolicach Lotniska Alicante i Costa Blanca',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wynajem auta bez kaucji Alicante i Costa Blanca | NowRent',
    description: 'Wynajem auta na Lotnisku Alicante, w Torrevieja i Costa Blanca. Bez kaucji, pełne ubezpieczenie w cenie, bez limitu kilometrów w Hiszpanii i elastyczny odbiór.',
    images: ['https://nowrent.eu/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          type="image/svg+xml"
          href="/images/logo.svg"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1A2B49" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoRental',
              name: 'NowRent',
              description: 'Local car rental around Alicante Airport and Costa Blanca South. No deposit, no credit card required, full insurance and unlimited mileage in Spain.',
              url: 'https://nowrent.eu',
              logo: 'https://nowrent.eu/images/logo.svg',
              image: 'https://nowrent.eu/og-image.jpg',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ES',
                addressRegion: 'Alicante / Costa Blanca South',
              },
              areaServed: [
                { '@type': 'Place', name: 'Alicante Airport' },
                { '@type': 'Place', name: 'Torrevieja' },
                { '@type': 'Place', name: 'Orihuela Costa' },
                { '@type': 'Place', name: 'San Pedro del Pinatar' },
                { '@type': 'Place', name: 'Costa Blanca South' },
              ],
              priceRange: '€',
              telephone: '+34 694 229 035',
              email: 'nowrentes@gmail.com',
              sameAs: [
                'https://www.facebook.com/people/NowRent/61574868050559/',
              ],
              hasMap: 'https://maps.google.com/maps?q=Costa%20Blanca',
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  )
} 