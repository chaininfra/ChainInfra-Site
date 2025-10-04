import { Metadata } from 'next';
import LiveData from '@/components/LiveData';
import { seoConfig } from '@/lib/seo-config';

// Force this page to be dynamic with maximum cache prevention
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
export const runtime = 'nodejs';

// Force metadata to include no-cache directives
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Live Data - Blockchain Metrics & System Status | ChainInfra',
    description: 'Real-time blockchain metrics and system performance data for ChainInfra validator on Metal Blockchain. Monitor validator performance, delegation statistics, and infrastructure health.',
    keywords: [
      'Metal Blockchain validator',
      'ChainInfra validator',
      'validator metrics',
      'blockchain monitoring',
      'validator performance',
      'staking statistics',
      'real-time data',
      'validator dashboard',
      'blockchain infrastructure',
      'validator transparency'
    ],
    openGraph: {
      title: 'Live Data - Blockchain Metrics & System Status | ChainInfra',
      description: 'Real-time blockchain metrics and system performance data for ChainInfra validator on Metal Blockchain.',
      url: `${seoConfig.siteUrl}/live_data`,
      type: 'website',
      images: [
        {
          url: '/images/og-live-data.png',
          width: 1200,
          height: 630,
          alt: 'ChainInfra - Live Data Dashboard',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Live Data - Blockchain Metrics & System Status | ChainInfra',
      description: 'Real-time blockchain metrics and system performance data for ChainInfra validator.',
      images: ['/images/og-live-data.png'],
      creator: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: `${seoConfig.siteUrl}/live_data`,
    },
    other: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
    },
  };
}

export default function LiveDataPage() {
  return <LiveData />;
}