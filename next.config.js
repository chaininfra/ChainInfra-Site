/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for better performance
  output: 'standalone',
  
  // Optimize images
  images: {
    domains: ['chaininfra.net', 'localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Enable compression
  compress: true,
  
  // Optimize bundle - removed dynamicIO as it's not supported in Next.js 14.2.32
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      },
      {
        // AGGRESSIVE cache prevention for live data page
        source: '/live_data',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0, proxy-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
          {
            key: 'Expires',
            value: '0',
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store',
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-cache',
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-cache',
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'no-cache',
          },
          {
            key: 'Edge-Cache-Tag',
            value: 'no-cache',
          },
          {
            key: 'Vary',
            value: '*',
          },
        ],
      },
      {
        // AGGRESSIVE cache prevention for validator metrics API
        source: '/api/validator-metrics',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0, proxy-revalidate'
          },
          {
            key: 'Pragma',
            value: 'no-cache'
          },
          {
            key: 'Expires',
            value: '0'
          },
          {
            key: 'Surrogate-Control',
            value: 'no-store'
          },
          {
            key: 'CDN-Cache-Control',
            value: 'no-cache'
          },
          {
            key: 'Vercel-CDN-Cache-Control',
            value: 'no-cache'
          },
          {
            key: 'Cloudflare-CDN-Cache-Control',
            value: 'no-cache'
          },
          {
            key: 'Edge-Cache-Tag',
            value: 'no-cache'
          },
          {
            key: 'Vary',
            value: '*'
          }
        ]
      }
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/tools',
        destination: '/live_data',
        permanent: true,
      },
    ]
  },
  
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://chaininfra.net',
    NEXT_PUBLIC_SITE_NAME: process.env.NEXT_PUBLIC_SITE_NAME || 'ChainInfra',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dopqjqrbkqplmmotybwo.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvcHFqcXJia3FwbG1tb3R5YndvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY2ODUxMDMsImV4cCI6MjA3MjI2MTEwM30.OR4975b0j7XTVboxkPGTgy4nQUBv7AQT0vSJsUnHf_U',
  },
}

module.exports = nextConfig