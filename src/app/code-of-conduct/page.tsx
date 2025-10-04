import { Metadata } from 'next';
import CodeOfConduct from '@/components/CodeOfConduct';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Code of Conduct - ChainInfra | Metal Blockchain',
  description: 'Our mission as a Block Producer for XPR ecosystem is to support this network and help maintain it in a secure way. Security is our priority.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'code of conduct',
    'block producer mission',
    'blockchain security',
    'validator independence',
    'emergency response',
    'transparency',
    'cooperation',
    'XPR network'
  ],
  openGraph: {
    title: 'Code of Conduct - ChainInfra | Metal Blockchain',
    description: 'Our mission as a Block Producer for XPR ecosystem is to support this network and help maintain it in a secure way.',
    url: `${seoConfig.siteUrl}/code-of-conduct`,
    type: 'website',
    images: [
      {
        url: '/images/og-code-of-conduct.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Code of Conduct',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Code of Conduct - ChainInfra | Metal Blockchain',
    description: 'Our mission as a Block Producer for XPR ecosystem is to support this network and help maintain it in a secure way.',
    images: ['/images/og-code-of-conduct.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/code-of-conduct`,
  },
};

export default function CodeOfConductPage() {
  return <CodeOfConduct />;
}

