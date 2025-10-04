import { Metadata } from 'next';
import BlockProducer from '@/components/BlockProducer';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Block Producer - ChainInfra | XPR Network',
  description: 'ChainInfra Block Producer on XPR Network. Secure, transparent, and community-focused block production with 99.9%+ uptime target and public verification.',
  keywords: [
    'XPR Network Block Producer',
    'ChainInfra Block Producer',
    'block production',
    'XPR staking',
    'blockchain infrastructure',
    'validator operations',
    'block producer transparency',
    'XPR Network',
    'blockchain security',
    'delegation services'
  ],
  openGraph: {
    title: 'Block Producer - ChainInfra | XPR Network',
    description: 'ChainInfra Block Producer on XPR Network with secure, transparent block production and community engagement.',
    url: `${seoConfig.siteUrl}/block-producer`,
    type: 'website',
    images: [
      {
        url: '/images/og-block-producer.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Block Producer on XPR Network',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Block Producer - ChainInfra | XPR Network',
    description: 'ChainInfra Block Producer on XPR Network with secure, transparent block production.',
    images: ['/images/og-block-producer.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/block-producer`,
  },
};

export default function BlockProducerPage() {
  return <BlockProducer />;
}
