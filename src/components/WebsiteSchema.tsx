import React from 'react';

export default function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ChainInfra - Metal Blockchain Validator & XPR Block Producer',
    alternateName: 'ChainInfra',
    url: 'https://chaininfra.net',
    description: 'Professional Metal Blockchain validator providing secure staking services with >99.9% uptime, NVMe storage optimization, and 24/7 monitoring.',
    author: {
      '@type': 'Person',
      name: 'ChainInfra',
      jobTitle: 'Validator/BP',
      affiliation: {
        '@type': 'Organization',
        name: 'Metal Blockchain'
      },
      knowsAbout: [
        'Metal Blockchain',
        'Blockchain',
        'Staking',
        'Delegation',
        'Block Producer',
        'Validator'
      ],
      url: 'https://chaininfra.net/profile',
      sameAs: [
        process.env.NEXT_PUBLIC_X_URL || 'https://x.com/lilreom',
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: 'Metal Blockchain',
      url: 'https://metalblockchain.org',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chaininfra.net/favicon.ico'
      }
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://chaininfra.net/blog?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    },
    mainEntity: {
      '@type': 'Blog',
      name: 'ChainInfra Blog',
      description: 'Metal Blockchain Validator & Block Producer - staking services for delegators.',
      url: 'https://chaininfra.net/blog',
      author: {
        '@type': 'Person',
        name: 'ChainInfra'
      },
      publisher: {
        '@type': 'Organization',
        name: 'ChainInfra'
      }
    },
    sameAs: [
      process.env.NEXT_PUBLIC_X_URL || 'https://x.com/chaininfra',
      process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/chaininfra',
      process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/chaininfra'
    ],
    inLanguage: 'en-US'
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
