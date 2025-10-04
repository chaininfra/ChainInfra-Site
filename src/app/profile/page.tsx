import { Metadata } from 'next';
import Profile from '@/components/Profile';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Robust Infrastructure – Sustainable Operations | ChainInfra',
  description: 'Discover ChainInfra validator infrastructure: multi-node setup with >99.9% uptime, NVMe storage optimization, 24/7 monitoring, and industry-leading security practices on Metal Blockchain.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'blockchain infrastructure',
    'validator operations',
    'block producer',
    'staking infrastructure',
    'node operations',
    'validator transparency',
    'blockchain security',
    'validator monitoring'
  ],
  openGraph: {
    title: 'Robust Infrastructure – Sustainable Operations | ChainInfra',
    description: 'Discover ChainInfra validator infrastructure with multi-node setup, NVMe storage, 24/7 monitoring, and industry-leading security.',
    url: `${seoConfig.siteUrl}/profile`,
    type: 'profile',
    images: [
      {
        url: '/images/og-profile.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Validator & Block Producer Profile',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Robust Infrastructure – Sustainable Operations | ChainInfra',
    description: 'Discover ChainInfra validator infrastructure with multi-node setup and 24/7 monitoring.',
    images: ['/images/og-profile.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/profile`,
  },
};

export default function ProfilePage() {
  return <Profile />;
}
