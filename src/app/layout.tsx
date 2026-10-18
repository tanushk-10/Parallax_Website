import { copy as contentText } from '@/data/copy'; /** Root shell shares navigation, session intro, motion and footer across static routes. */
import type { Metadata, Viewport } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MotionProvider from '@/components/motion/MotionProvider';
import Preloader from '@/components/motion/Preloader';
import { site } from '@/data/site';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name + ' | Where Genius Meets Innovation.',
    template: '%s | Parallax Robotics',
  },
  description: contentText['app_layout']['studentled_vex_v5rc_robotics_from_edison'],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    siteName: site.name,
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
};
export const viewport: Viewport = { themeColor: '#101514' };
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  email: site.email,
  foundingDate: '2025',
  description: contentText['app_layout']['studentled_vex_v5_robotics_competition_team'],
  sameAs: [site.instagram.url, site.gofundme],
  location: {
    '@type': 'Place',
    name: 'Edison High School',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Edison',
      addressRegion: 'NJ',
      addressCountry: 'US',
    },
  },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/space-grotesk-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {contentText['app_layout']['skip_to_content']}
        </a>
        <MotionProvider>
          <Preloader />
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </body>
    </html>
  );
}
