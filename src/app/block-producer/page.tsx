import { Metadata } from 'next';
import BlockProducer from '@/components/BlockProducer';
import EndpointStatusCard from '@/components/EndpointStatusCard';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Block Producer - ChainInfra | XPR Network',
  description:
    'ChainInfra Block Producer on XPR Network. Secure, transparent, and community-focused block production with 99.9%+ uptime target and public verification.',
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
    'delegation services',
  ],
  openGraph: {
    title: 'Block Producer - ChainInfra | XPR Network',
    description:
      'ChainInfra Block Producer on XPR Network with secure, transparent block production and community engagement.',
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
    description:
      'ChainInfra Block Producer on XPR Network with secure, transparent block production.',
    images: ['/images/og-block-producer.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/block-producer`,
  },
};

export default function BlockProducerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* --- Page Header & Overview Section --- */}
        <BlockProducer />

        {/* --- Live Endpoint Status Cards --- */}
        <div className="mt-32 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
              Live Endpoint Status
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time monitoring of ChainInfra’s XPR Network and AtomicAssets infrastructure.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EndpointStatusCard
              name="Mainnet BP"
              type="Mainnet Block Producer"
              endpoint="https://mainnet-api.chaininfra.net"
              healthPath="/v1/chain/get_info"
            />
            <EndpointStatusCard
              name="Testnet BP"
              type="Testnet Block Producer"
              endpoint="https://testnet-api.chaininfra.net"
              healthPath="/v1/chain/get_info"
            />
            <EndpointStatusCard
              name="Mainnet AtomicAssets API"
              type="Mainnet AtomicAssets API"
              endpoint="https://xpr-atomic.chaininfra.net"
              healthPath="/health"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
