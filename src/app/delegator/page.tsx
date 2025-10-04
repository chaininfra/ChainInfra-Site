import { Metadata } from 'next';
import Delegator from '@/components/Delegator';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Delegating $METAL & $XPR – ChainInfra | Metal Blockchain',
  description: 'Step-by-step guide to delegating $METAL and $XPR tokens to ChainInfra validator. Learn rewards, commission, and best practices for staking on Metal Blockchain.',
  keywords: [
    'Metal Blockchain delegation',
    'staking guide',
    'validator delegation',
    'METAL token staking',
    'XPR token staking',
    'ChainInfra validator',
    'blockchain staking',
    'staking rewards',
    'delegation instructions',
    'validator transparency'
  ],
  openGraph: {
    title: 'Delegating $METAL & $XPR – ChainInfra | Metal Blockchain',
    description: 'Step-by-step guide to safely delegate $METAL and $XPR tokens to ChainInfra validator on Metal Blockchain.',
    url: `${seoConfig.siteUrl}/delegator`,
    type: 'website',
    images: [
      {
        url: '/images/og-delegator.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Delegator Guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Delegating $METAL & $XPR – ChainInfra | Metal Blockchain',
    description: 'Step-by-step guide to safely delegate $METAL and $XPR tokens to ChainInfra validator.',
    images: ['/images/og-delegator.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/delegator`,
  },
};

export default function DelegatorPage() {
  return <Delegator />;
}
