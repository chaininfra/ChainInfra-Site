import { Metadata } from 'next';
import { seoConfig } from '@/lib/seo-config';

interface GenerateMetadataProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: GenerateMetadataProps): Metadata {
  const metaTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultMetadata.title;
  const metaDescription = description || seoConfig.defaultMetadata.description;
  const metaImage = image || seoConfig.defaultImage;
  const metaUrl = url ? `${seoConfig.siteUrl}${url}` : seoConfig.siteUrl;
  const metaKeywords = [...seoConfig.coreKeywords, ...keywords];

  const metadata: Metadata = {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    authors: authors ? authors.map(name => ({ name })) : [{ name: seoConfig.author }],
    creator: seoConfig.author,
    publisher: seoConfig.siteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: metaUrl,
      siteName: seoConfig.siteName,
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: title || seoConfig.defaultMetadata.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: seoConfig.twitterHandle,
    },
    alternates: {
      canonical: metaUrl,
    },
  };

  // Add article-specific metadata
  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: authors || [seoConfig.author],
      tags,
    };
  }

  return metadata;
}

// Helper function to generate blog post metadata
export function generateBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  headerImage?: string;
  id: string;
}) {
  return generateMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    image: post.headerImage,
    url: `/blog/${post.id}`,
    type: 'article',
    publishedTime: new Date(post.date).toISOString(),
    modifiedTime: new Date(post.date).toISOString(),
    authors: [post.author],
    tags: post.tags,
  });
}
