import { Metadata } from 'next';
import LoginForm from '@/components/LoginForm';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Login - ChainInfra',
  description: 'Access your ChainInfra validator account to manage staking operations and view analytics.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'validator login',
    'staking account',
    'validator dashboard',
    'blockchain authentication',
    'validator access',
    'staking management'
  ],
  openGraph: {
    title: 'Login - ChainInfra',
    description: 'Access your ChainInfra validator account to manage staking operations and view analytics.',
    url: `${seoConfig.siteUrl}/login`,
    type: 'website',
    images: [
      {
        url: '/images/og-login.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra - Login',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login - ChainInfra',
    description: 'Access your ChainInfra validator account to manage staking operations.',
    images: ['/images/og-login.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/login`,
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return <LoginForm />;
}
