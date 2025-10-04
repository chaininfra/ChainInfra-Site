import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'ChainInfra - Metal Blockchain Infrastructure',
    short_name: 'ChainInfra',
    description: 'Professional Metal Blockchain validator providing secure staking services with >99.9% uptime',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#1e40af',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    categories: ['technology', 'blockchain', 'finance'],
    lang: 'en-US',
    scope: '/',
  };
}
