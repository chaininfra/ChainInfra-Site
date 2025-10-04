import { Metadata } from 'next';
import Services from '@/components/Services';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'We Build Metal Nodes | ChainInfra',
  description: 'We help teams stand up ChainInfra validator nodes—from hardware sizing to secure production rollout. End-to-end node setup, observability, operations playbooks, and cost/capacity guidance.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'validator infrastructure',
    'ChainInfra validator',
    'blockchain node setup',
    'MetalGo installation',
    'blockchain node services',
    'validator configuration',
    'blockchain infrastructure',
    'validator operations',
    'Metal node observability',
    'validator monitoring',
    'blockchain operations playbooks'
  ],
  openGraph: {
    title: 'We Build Metal Nodes | ChainInfra',
    description: 'We help teams stand up ChainInfra validator nodes—from hardware sizing to secure production rollout. End-to-end node setup, observability, operations playbooks, and cost/capacity guidance.',
    url: `${seoConfig.siteUrl}/services`,
    type: 'website',
    images: [
      {
        url: '/images/og-services.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - We Build Metal Nodes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Build Metal Nodes | ChainInfra',
    description: 'We help teams stand up ChainInfra validator nodes—from hardware sizing to secure production rollout.',
    images: ['/images/og-services.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/services`,
  },
};

export default function ServicesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Metal Blockchain Validator Node Setup Services",
    "description": "Professional ChainInfra validator node setup services including end-to-end configuration, observability, operations playbooks, and cost/capacity guidance.",
    "provider": {
      "@type": "Organization",
      "name": "ChainInfra",
      "url": seoConfig.siteUrl,
      "logo": `${seoConfig.siteUrl}/images/logo.png`,
      "sameAs": [
        seoConfig.socialLinks.x
      ]
    },
    "serviceType": "Blockchain Infrastructure Services",
    "areaServed": "Global",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Metal Node Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "End-to-End Node Setup",
            "description": "OS hardening, MetalGo install/config, pruning strategy"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Observability",
            "description": "Prometheus exporters, Grafana dashboards, alerting"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Operations Playbooks",
            "description": "upgrades, backups/restore, incident procedures"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Cost/Capacity Guidance",
            "description": "sizing, cloud vs. bare-metal tradeoffs"
          }
        }
      ]
    },
    "url": `${seoConfig.siteUrl}/services`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Services />
    </>
  );
}