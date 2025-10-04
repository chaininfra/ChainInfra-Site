import React from 'react';

interface BlogPostSchemaProps {
  post: {
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    tags: string[];
    headerImage?: string;
    id: string;
  };
}

export default function BlogPostSchema({ post }: BlogPostSchemaProps) {
  const imageUrl = post.headerImage
    ? (post.headerImage.startsWith('http')
        ? post.headerImage
        : `https://chaininfra.net${post.headerImage}`)
    : 'https://chaininfra.net/images/og-blog-default.png';

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [imageUrl],
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://chaininfra.net/profile',
      sameAs: [
        process.env.NEXT_PUBLIC_X_URL || 'https://x.com/lilreom'
      ]
    },
    publisher: {
      '@type': 'Organization',
      name: 'ChainInfra',
      url: 'https://chaininfra.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://chaininfra.net/favicon.ico'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://chaininfra.net/blog/${post.id}`
    },
    keywords: post.tags.join(', '),
    articleSection: 'Metal Blockchain Validator Operations',
    inLanguage: 'en-US',
    url: `https://chaininfra.net/blog/${post.id}`,
    wordCount: post.content.split(' ').length,
    genre: ['Technology', 'Blockchain', 'Validator Operations', 'Metal Blockchain', 'Staking'],
    about: {
      '@type': 'Thing',
      name: 'Metal Blockchain Validator Operations',
      sameAs: 'https://en.wikipedia.org/wiki/Blockchain'
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
