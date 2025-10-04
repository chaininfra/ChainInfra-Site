// Dynamic validator configuration
export const validatorConfig = {
  // Validator Information
  validatorId: 'NodeID-eLiuwZsfPBud7FKK6zDfwDwU7Utwn3tH',
  validatorFee: 8, // Default fee percentage (can be updated dynamically)
  
  // Links
  explorerUrl: 'https://explorer.metalblockchain.org/validators/NodeID-eLiuwZsfPBud7FKK6zDfwDwU7Utwn3tH',
  webAuthStakeUrl: '', // To be configured later
  grafanaDashboardUrl: '', // To be configured later
  
  // Contact Information
  contactEmails: {
    primary: 'info@chaininfra.net',
    secondary: 'leenohs@metalblockchain.org'
  },
  
  // Social Links
  socialLinks: {
    twitter: 'https://x.com/lilreom',
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/chaininfra',
    github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/lucm9/ChainInfra',
  },
  
  // Hardware Specifications (minimum for clients)
  minimumSpecs: {
    cpu: '8 cores (Intel Xeon or AMD EPYC)',
    ram: '16 GB RAM',
    storage: '250 GB Storage',
    network: '1Gbps dedicated connection',
    uptime: '99.9%+ target'
  },
  
  // Polling Configuration
  pollingInterval: 15000, // 15 seconds
  metricsRefreshInterval: 30000 // 30 seconds
};

// Function to get dynamic validator fee (can be fetched from API)
export const getValidatorFee = async (): Promise<number> => {
  try {
    // In the future, this could fetch from an API
    // For now, return the default
    return validatorConfig.validatorFee;
  } catch (error) {
    console.error('Failed to fetch validator fee:', error);
    return validatorConfig.validatorFee;
  }
};
