import { Metadata } from 'next';
import { Suspense } from 'react';
import Layout from '@/components/Layout';
import HomeContent from '@/components/HomeContent';
import HomeSkeleton from '@/components/HomeSkeleton';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'ChainInfra - Metal Blockchain Validator & XPR Block Producer',
  description: 'Secure, transparent, and community-focused blockchain infrastructure. Delegate your $METAL to our Metal Blockchain validator or stake $XPR for our Block Producer using WebAuth.',
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
  openGraph: {
    title: 'ChainInfra - Metal Blockchain Validator & XPR Block Producer',
    description: 'Secure, transparent, and community-focused blockchain infrastructure. Delegate your $METAL to our Metal Blockchain validator or stake $XPR for our Block Producer using WebAuth.',
    url: seoConfig.siteUrl,
    type: 'website',
    images: [
      {
        url: '/images/og-home.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Metal Blockchain Infrastructure',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChainInfra - Metal Blockchain Validator & XPR Block Producer',
    description: 'Secure, transparent, and community-focused blockchain infrastructure. Delegate your $METAL to our Metal Blockchain validator or stake $XPR for our Block Producer using WebAuth.',
    images: ['/images/og-home.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: seoConfig.siteUrl,
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={<HomeSkeleton />}>
      <HomeContent />
    </Suspense>
  );
}