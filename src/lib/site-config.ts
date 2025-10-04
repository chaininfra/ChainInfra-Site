/**
 * Site configuration for production and development environments
 */

export const siteConfig = {
  // Production domain
  productionUrl: 'https://chaininfra.net',
  
  // Development domain
  developmentUrl: 'http://localhost:3000',
  
  // Get current site URL based on environment
  getCurrentUrl: () => {
    if (typeof window !== 'undefined') {
      // Client-side: use window.location.origin
      return window.location.origin;
    }
    
    // Server-side: use environment variable or fallback
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net';
  },
  
  // Get production URL for email redirects
  getProductionUrl: () => {
    return process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net';
  },
  
  // Check if we're in production
  isProduction: () => {
    return process.env.NODE_ENV === 'production' || 
           process.env.NEXT_PUBLIC_SITE_URL?.includes('chaininfra.net');
  }
};

export default siteConfig;
