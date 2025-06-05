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
    template: '%s | NowRent - Car Rental in Spain',
    default: 'NowRent - Premium Car Rental in Alicante, Spain',
  },
  description: 'Premium car rental service in Alicante, Spain. Wide selection of vehicles from economy to luxury. Free delivery, 24/7 support, and transparent pricing. Book your perfect car today!',
  metadataBase: new URL('https://nowrent.com'),
  alternates: {
    canonical: 'https://nowrent.com',
    languages: {
      'en-US': 'https://nowrent.com/en',
      'pl-PL': 'https://nowrent.com/pl',
    },
  },
  keywords: [
    'car rental',
    'rent a car',
    'Alicante',
    'Spain',
    'Costa Blanca',
    'luxury cars',
    'economy cars',
    'vehicle rental',
    'car hire',
    'free delivery',
    'transparent pricing',
    '24/7 support',
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
    title: 'NowRent - Premium Car Rental in Alicante, Spain',
    description: 'Premium car rental service in Alicante, Spain. Wide selection of vehicles, free delivery, and 24/7 support. Experience hassle-free car rental with NowRent.',
    url: 'https://nowrent.com',
    siteName: 'NowRent',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://nowrent.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NowRent - Premium Car Rental Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NowRent - Premium Car Rental in Alicante',
    description: 'Premium car rental service in Alicante, Spain. Experience hassle-free car rental with NowRent.',
    images: ['https://nowrent.com/twitter-image.jpg'],
    creator: '@nowrent',
    site: '@nowrent',
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
  verification: {
    google: 'your-google-verification-code',
  },
}

// Preload critical assets
const preloadAssets = [
  { rel: 'preload', href: '/Untitled design.png', as: 'image' },
  { rel: 'preload', href: '/images/graphics/Beep Beep - Medium Vehicle (3).svg', as: 'image' },
  { rel: 'preload', href: '/images/graphics/Beep Beep - Medium Vehicle (4).svg', as: 'image' },
  { rel: 'preload', href: '/images/graphics/Beep Beep - Medium Vehicle (5).svg', as: 'image' },
  { rel: 'preload', href: '/images/graphics/Beep Beep - Medium Vehicle.png', as: 'image' },
]

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/app/layout.css"
          as="style"
        />
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          as="style"
        />
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
              '@type': 'CarRental',
              name: 'NowRent',
              description: 'Premium car rental service in Alicante, Spain',
              url: 'https://nowrent.com',
              logo: 'https://nowrent.com/images/logo.svg',
              image: 'https://nowrent.com/og-image.jpg',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'ES',
                addressRegion: 'Alicante',
                addressLocality: 'Alicante',
                postalCode: '03001',
                streetAddress: 'Your Street Address',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '38.3452',
                longitude: '-0.4815',
              },
              areaServed: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: '38.3452',
                  longitude: '-0.4815',
                },
                geoRadius: '100000',
              },
              priceRange: '€€',
              openingHours: 'Mo-Su 00:00-24:00',
              telephone: '+34-XXX-XXX-XXX',
              email: 'nowrentes@gmail.com',
              sameAs: [
                'https://www.facebook.com/nowrent',
                'https://www.instagram.com/nowrent',
                'https://www.tiktok.com/@nowrent',
              ],
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'EUR',
                lowPrice: '29',
                highPrice: '75',
                offerCount: '5',
              },
              hasMap: 'https://maps.google.com/maps?q=Costa%20Blanca',
              potentialAction: {
                '@type': 'RentAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://nowrent.com/#booking',
                  actionPlatform: [
                    'http://schema.org/DesktopWebPlatform',
                    'http://schema.org/MobileWebPlatform',
                  ],
                },
                result: {
                  '@type': 'RentAction',
                  name: 'Car Rental Booking',
                },
              },
            }),
          }}
        />
        {/* Add preload tags for critical assets */}
        {preloadAssets.map((asset, index) => (
          <link key={index} {...asset} />
        ))}
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