import { Metadata } from 'next';
import { Suspense } from 'react';
import BlogContent from '@/components/BlogContent';
import BlogSkeleton from '@/components/BlogSkeleton';
import { getPublishedBlogPosts } from '@/services/blogService';
import { seoConfig } from '@/lib/seo-config';

export const metadata: Metadata = {
  title: 'Blog / Updates – ChainInfra | Metal Blockchain',
  description: 'Stay updated with technical analysis, staking guides, and community developments. Categories: Ops & Upgrades, Community & Governance, Education.',
  keywords: [
    'Metal Blockchain validator',
    'ChainInfra validator',
    'validator insights',
    'blockchain technology',
    'staking information',
    'validator operations',
    'blockchain ecosystem',
    'validator updates',
    'blockchain analysis',
    'validator transparency'
  ],
  openGraph: {
    title: 'Blog / Updates – ChainInfra | Metal Blockchain',
    description: 'Stay updated with technical analysis, staking guides, and community developments. Categories: Ops & Upgrades, Community & Governance, Education.',
    url: `${seoConfig.siteUrl}/blog`,
    type: 'website',
    images: [
      {
        url: '/images/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'ChainInfra Blog - Updates & Insights',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog / Updates – ChainInfra | Metal Blockchain',
    description: 'Stay updated with technical analysis, staking guides, and community developments. Categories: Ops & Upgrades, Community & Governance, Education.',
    images: ['/images/og-blog.png'],
    creator: seoConfig.twitterHandle,
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/blog`,
  },
};

// Client component that fetches data
export default function BlogPage({ 
  searchParams 
}: { 
  searchParams: { tag?: string; search?: string } 
}) {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <BlogContent 
        initialPosts={[]} 
        initialTag={searchParams.tag}
        initialSearch={searchParams.search}
      />
    </Suspense>
  );
}