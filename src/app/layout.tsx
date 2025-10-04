import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net'),
  title: {
    default: 'ChainInfra - Metal Blockchain Infrastructure & Staking',
    template: '%s | ChainInfra',
  },
  description: 'Professional Metal Blockchain validator providing secure staking services with >99.9% uptime, NVMe storage optimization, and 24/7 monitoring. Delegate $METAL and $XPR tokens for reliable rewards.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'blockchain staking',
    'METAL token delegation',
    'XPR token staking',
    'validator infrastructure',
    'blockchain node operations',
    'staking rewards',
    'validator transparency',
    'blockchain security'
  ],
  authors: [{ name: 'ChainInfra' }],
  creator: 'ChainInfra',
  publisher: 'ChainInfra',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net',
    siteName: 'ChainInfra',
    title: 'ChainInfra - Metal Blockchain Infrastructure & Staking',
    description: 'Professional Metal Blockchain validator providing secure staking services with >99.9% uptime and reliable rewards.',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Metal Blockchain Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainInfra - Metal Blockchain Infrastructure & Staking',
    description: 'Professional Metal Blockchain validator providing secure staking services with >99.9% uptime.',
    images: ['/images/og-image.png'],
    creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@chaininfra',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'ChainInfra',
    jobTitle: 'Blockchain Validator',
    affiliation: {
      '@type': 'Organization',
      name: 'Metal Blockchain',
    },
    knowsAbout: [
      'Blockchain Validation',
      'Metal Blockchain',
      'Node Operations',
      'Staking Infrastructure',
      'Blockchain Security',
      'Validator Operations'
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net',
    sameAs: [
      process.env.NEXT_PUBLIC_X_URL || 'https://x.com/chaininfra',
      process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/chaininfra',
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/chaininfra'
    ]
  };

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://chaininfra.dev" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body>
        <Providers>
          <div className="min-h-screen bg-background relative flex flex-col">
            <Navbar />
            <main className="relative z-10 flex-1 pt-16">
              {children}
            </main>
            <footer className="border-t border-border/60 py-6 mt-16">
              <div className="container mx-auto px-4 text-center">
                <p className="text-muted-foreground text-sm">
                  © 2025 ChainInfra. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}