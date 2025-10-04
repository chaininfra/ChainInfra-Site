export const seoConfig = {
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'ChainInfra',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net',
  author: 'ChainInfra',
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE || '@lilreom',
  defaultImage: '/images/og-image.png',
  
  // Core keywords that appear across the site
  coreKeywords: [
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

  // Default metadata for pages
  defaultMetadata: {
    title: 'ChainInfra - Metal Blockchain Infrastructure & Staking',
    description: 'Professional Metal Blockchain validator providing secure staking services with >99.9% uptime, NVMe storage optimization, and 24/7 monitoring. Delegate $METAL and $XPR tokens for reliable rewards.',
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
  },

  // Social media links
  socialLinks: {
    x: process.env.NEXT_PUBLIC_X_URL || 'https://x.com/lilreom',
  },

  // Organization schema data
  organization: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'ChainInfra',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net'}/favicon.ico`,
    sameAs: [
      process.env.NEXT_PUBLIC_X_URL || 'https://x.com/lilreom',
    ]
  },

  // Person schema data for the author
  person: {
    name: 'ChainInfra',
    jobTitle: 'Blockchain Validator',
    affiliation: 'Metal Blockchain',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net'}/profile`,
    sameAs: [
      process.env.NEXT_PUBLIC_X_URL || 'https://x.com/lilreom',
    ],
    knowsAbout: [
      'Blockchain Validation',
      'Metal Blockchain',
      'Node Operations',
      'Staking Infrastructure',
      'Blockchain Security',
      'Validator Operations'
    ]
  }
};
