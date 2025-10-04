import { Metadata } from 'next';
import TrustTransparency from '@/components/TrustTransparency';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Transparency & Connection - ChainInfra | Metal Blockchain',
  description: 'Transparency builds trust. All metrics and operations are publicly accessible. Connect with ChainInfra validator through multiple channels and verify our profile on the Metal Blockchain Explorer.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'validator transparency',
    'blockchain trust',
    'validator communication',
    'community verification',
    'public metrics',
    'validator contact',
    'blockchain community',
    'validator support'
  ],
  openGraph: {
    title: 'Transparency & Connection - ChainInfra | Metal Blockchain',
    description: 'Transparency builds trust. All metrics and operations are publicly accessible. Connect with ChainInfra validator through multiple channels.',
    url: `${seoConfig.siteUrl}/trust-transparency`,
    type: 'website',
    images: [
      {
        url: '/images/og-trust-transparency.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Transparency & Connection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Transparency & Connection - ChainInfra | Metal Blockchain',
    description: 'Transparency builds trust. All metrics and operations are publicly accessible.',
    images: ['/images/og-trust-transparency.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/trust-transparency`,
  },
};

export default function TrustTransparencyPage() {
  return <TrustTransparency />;
}
